// THE CHESTERFIELD - Animations JS - University level

// 1. Scroll reveal observer
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('active');
    }
  });
},{threshold:0.15});

document.querySelectorAll('.section, .prod, .test-card, .gallery img').forEach(el=>{
  el.classList.add('reveal');
  observer.observe(el);
});

// Add left/right reveal for grid-2
document.querySelectorAll('.grid-2 > div:first-child').forEach(el=>{
  el.classList.add('reveal-left');
  observer.observe(el);
});
document.querySelectorAll('.grid-2 > img, .grid-2 > div:last-child').forEach(el=>{
  if(el.tagName==='IMG'){
    el.classList.add('reveal-right');
    observer.observe(el);
  }
});

// 2. Navbar scroll effect
window.addEventListener('scroll',()=>{
  const header=document.querySelector('header');
  if(window.scrollY>50) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

// 3. Parallax for hero image
window.addEventListener('scroll',()=>{
  const scrolled = window.pageYOffset;
  const heroImg = document.querySelector('.hero-img img');
  if(heroImg && scrolled < window.innerHeight){
    heroImg.style.setProperty('--parallax-y', scrolled*0.3+'px');
    heroImg.style.transform = `translateY(${scrolled*0.15}px) scale(${1+scrolled*0.0002})`;
  }
});

// 4. Re-trigger card animations when filtering menu
const originalFilterMenu = window.filterMenu;
if(originalFilterMenu){
  window.filterMenu = function(cat,el,gridId,tabsId){
    originalFilterMenu(cat,el,gridId,tabsId);
    // re-animate
    setTimeout(()=>{
      document.querySelectorAll('#'+gridId+' .prod').forEach((card,i)=>{
        card.style.animation='none';
        card.offsetHeight; // trigger reflow
        card.style.animation=`cardIn 0.6s ease forwards ${i*0.1}s`;
      });
    },50);
  }
}

// 5. Smooth active nav on scroll (for home long page)
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('nav a');
window.addEventListener('scroll',()=>{
  if(document.getElementById('page-home').classList.contains('active')){
    let current='';
    sections.forEach(sec=>{
      if(window.scrollY >= sec.offsetTop-200) current=sec.querySelector('h2')?.innerText||'';
    });
  }
});

// 6. Button click ripple
document.querySelectorAll('.btn-gold, .btn-outline, .tab').forEach(btn=>{
  btn.addEventListener('click',function(e){
    let ripple=document.createElement('span');
    ripple.style.position='absolute';
    ripple.style.width='20px';ripple.style.height='20px';
    ripple.style.background='rgba(255,255,255,.3)';
    ripple.style.borderRadius='50%';
    ripple.style.transform='translate(-50%,-50%)';
    ripple.style.left=e.offsetX+'px';ripple.style.top=e.offsetY+'px';
    ripple.style.animation='ripple 0.6s linear';
    this.style.position='relative';this.style.overflow='hidden';
    this.appendChild(ripple);
    setTimeout(()=>ripple.remove(),600);
  });
});

// Add ripple keyframes dynamically
const style=document.createElement('style');
style.innerHTML=`@keyframes ripple{to{transform:translate(-50%,-50%) scale(10);opacity:0}}`;
document.head.appendChild(style);

console.log('Chesterfield Animations Loaded - University Level');