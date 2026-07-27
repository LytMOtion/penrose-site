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
document.querySelectorAll('[data-product]').forEach(product=>{
  const image=product.querySelector('[data-product-image]');
  const name=product.querySelector('[data-color-name]');
  product.querySelectorAll('[data-image]').forEach(button=>button.addEventListener('click',()=>{
    product.querySelectorAll('[data-image]').forEach(item=>item.classList.remove('active'));
    button.classList.add('active');image.style.opacity='0';
    const preload=new Image();preload.onload=()=>{image.src=button.dataset.image;image.alt=`${button.dataset.product} in ${button.dataset.color}`;name.textContent=button.dataset.color;image.style.opacity='1'};preload.src=button.dataset.image;
  }));
});
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

const themeToggle=document.querySelector('.theme-toggle');
if(localStorage.getItem('penrose-theme')==='dark')document.documentElement.dataset.theme='dark';
const syncTheme=()=>{const dark=document.documentElement.dataset.theme==='dark';if(themeToggle){themeToggle.textContent=dark?'Light':'Dark';themeToggle.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode')}};
syncTheme();
themeToggle?.addEventListener('click',()=>{const dark=document.documentElement.dataset.theme!=='dark';if(dark)document.documentElement.dataset.theme='dark';else delete document.documentElement.dataset.theme;localStorage.setItem('penrose-theme',dark?'dark':'light');syncTheme()});
