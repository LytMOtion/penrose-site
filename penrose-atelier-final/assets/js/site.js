const toggle=document.querySelector('.menu-toggle');
toggle?.addEventListener('click',()=>{
  const open=document.body.classList.toggle('menu-open');
  toggle.setAttribute('aria-expanded',String(open));
  toggle.textContent=open?'Close':'Menu';
});
document.querySelectorAll('header nav a').forEach(a=>a.addEventListener('click',()=>{
  document.body.classList.remove('menu-open');
  if(toggle){toggle.setAttribute('aria-expanded','false');toggle.textContent='Menu'}
}));
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target)}
  })
},{threshold:.12});
document.querySelectorAll('[data-reveal]').forEach(el=>observer.observe(el));
