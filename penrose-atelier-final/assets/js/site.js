const header=document.querySelector('.site-header');
const progress=document.querySelector('.progress');
const menu=document.querySelector('.menu');
const sync=()=>{
  header?.classList.toggle('scrolled',scrollY>40);
  if(progress){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${max>0?scrollY/max*100:0}%`}
};
addEventListener('scroll',sync,{passive:true});sync();
menu?.addEventListener('click',()=>{
  const open=document.body.classList.toggle('locked');
  menu.textContent=open?'Close':'Menu';menu.setAttribute('aria-expanded',String(open));
  header?.classList.toggle('scrolled',open||scrollY>40);
});
document.querySelectorAll('.site-nav a').forEach(a=>a.addEventListener('click',()=>document.body.classList.remove('locked')));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(e=>io.observe(e));
const accessForm=document.querySelector('#access-form');
accessForm?.addEventListener('submit',async event=>{
  event.preventDefault();
  const button=accessForm.querySelector('button[type="submit"]');
  const status=document.querySelector('#form-status');
  button.disabled=true;button.textContent='Requesting…';status.textContent='Sending your request.';
  const data=Object.fromEntries(new FormData(accessForm));
  try{
    const response=await fetch('/api/access',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
    if(!response.ok)throw new Error('Request failed');
    accessForm.reset();status.textContent='Access requested. You will hear from PENROSE when allocation opens.';button.textContent='Request received';
  }catch(error){
    status.textContent='We could not send the request. Please try again or email inquire@penroseatelier.com.';
    button.disabled=false;button.textContent='Request access';
  }
});
