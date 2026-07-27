const toggle=document.querySelector('.menu-toggle');
const themeToggle=document.querySelector('.theme-toggle');
const savedTheme=localStorage.getItem('penrose-theme');
if(savedTheme==='light')document.documentElement.dataset.theme='light';
const syncTheme=()=>{
  const light=document.documentElement.dataset.theme==='light';
  if(themeToggle){
    themeToggle.textContent=light?'Dark':'Light';
    themeToggle.setAttribute('aria-label',light?'Switch to dark mode':'Switch to light mode');
  }
};
syncTheme();
themeToggle?.addEventListener('click',()=>{
  const light=document.documentElement.dataset.theme!=='light';
  if(light)document.documentElement.dataset.theme='light';
  else delete document.documentElement.dataset.theme;
  localStorage.setItem('penrose-theme',light?'light':'dark');
  syncTheme();
});
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
