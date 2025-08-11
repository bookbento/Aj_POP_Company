(() => {
    // small helpers
    const $ = sel => document.querySelector(sel);
    const $$ = sel => Array.from(document.querySelectorAll(sel));
  
    // set year
    $('#year').textContent = new Date().getFullYear();
  
    // theme toggle
    const themeBtn = $('#themeToggle');
    const root = document.documentElement;
    const saved = localStorage.getItem('theme');
    if(saved) root.setAttribute('data-theme', saved);
    themeBtn.addEventListener('click', ()=>{
      const cur = root.getAttribute('data-theme');
      const next = cur === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      themeBtn.textContent = next === 'dark' ? '🌙' : '☀️';
    });
  
    // typed subtitle (simple)
    const typedEl = document.getElementById('typed');
    const words = ['designer','developer','student','animator'];
    let wi=0, ci=0;
    function typeNext(){
      const w = words[wi%words.length];
      typedEl.textContent = w.slice(0,++ci);
      if(ci===w.length){setTimeout(()=>{ci=0;wi++;typeNext()},900)} else setTimeout(typeNext,120);
    }
    typeNext();
  
    // reveal on scroll
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting) e.target.classList.add('visible');
      })
    },{threshold:0.12});
    $$('.card, .about-card, .contact-card').forEach(el=>obs.observe(el));
  
    // carousel simple logic (drag + buttons)
    const carousel = $('#carousel');
    let idx=0;
    const cards = $$('.card');
    function snap(){
      const w = cards[0].offsetWidth + 18;
      carousel.scrollTo({left: idx*w, behavior:'smooth'});
    }
    $('#next').addEventListener('click', ()=>{ idx = Math.min(idx+1, cards.length-1); snap(); });
    $('#prev').addEventListener('click', ()=>{ idx = Math.max(idx-1,0); snap(); });
  
    // drag
    let isDown=false,startX,scrollLeft;
    carousel.addEventListener('mousedown', (e)=>{isDown=true;carousel.classList.add('dragging');startX=e.pageX - carousel.offsetLeft;scrollLeft=carousel.scrollLeft;});
    window.addEventListener('mouseup', ()=>{isDown=false;carousel.classList.remove('dragging');});
    carousel.addEventListener('mousemove', (e)=>{if(!isDown) return; e.preventDefault(); const x=e.pageX - carousel.offsetLeft; const walk=(x-startX)*1.2; carousel.scrollLeft = scrollLeft - walk;});
  
    // copy email + toast
    const toast = $('#toast');
    function showToast(msg){toast.textContent=msg;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2000)}
    $('#copyEmail').addEventListener('click', ()=>{
      const txt = $('#email').textContent;
      navigator.clipboard?.writeText(txt).then(()=>showToast('Copied email ✅'), ()=>showToast('Copy failed'));
    });
  
    // contact demo toast
    $('#demoToast').addEventListener('click', ()=>showToast('This is a demo. Replace with backend to send.'));
  
    // contact quick modal (using alert as simple demo)
    $('#contactBtn').addEventListener('click', ()=>{showToast('Open contact form below 👋');document.getElementById('contact').scrollIntoView({behavior:'smooth'});});
  
    // mouse parallax on hero-art
    const art = document.querySelector('.hero-art');
    if(art){window.addEventListener('mousemove',(e)=>{
      const r = art.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width - 0.5;
      const cy = (e.clientY - r.top) / r.height - 0.5;
      art.style.transform = `translate3d(${cx*8}px,${cy*8}px,0) rotate(${cx*2}deg)`;
    })}
  
    // accessibility: allow keyboard carousel
    document.addEventListener('keydown',(e)=>{
      if(e.key==='ArrowRight') { $('#next').click(); }
      if(e.key==='ArrowLeft') { $('#prev').click(); }
    });
  
  })();
  
  // Smooth scroll override for all mouse/keyboard scroll
(function() {
    let scrollTime = 0.5;  // ระยะเวลาเลื่อน (วินาที)
    let scrollDistance = 180; // ระยะเลื่อนต่อ 1 step ของเมาส์
  
    window.addEventListener("wheel", function(e) {
      e.preventDefault();
      const scrollAmount = e.deltaY > 0 ? scrollDistance : -scrollDistance;
      gsap.to(window, { 
        duration: scrollTime, 
        scrollTo: window.scrollY + scrollAmount, 
        ease: "power2.out" 
      });
    }, { passive: false });
  
    window.addEventListener("keydown", function(e) {
      const code = e.code;
      let amount = 0;
      if (code === "PageDown") amount = window.innerHeight * 0.9;
      if (code === "PageUp") amount = -window.innerHeight * 0.9;
      if (code === "Space") amount = e.shiftKey ? -window.innerHeight * 0.9 : window.innerHeight * 0.9;
  
      if (amount !== 0) {
        e.preventDefault();
        gsap.to(window, { 
          duration: scrollTime, 
          scrollTo: window.scrollY + amount, 
          ease: "power2.out" 
        });
      }
    });
  })();
  
// Smooth scroll with GSAP
document.querySelectorAll('.hero-cta a, #contactBtn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetID = btn.getAttribute('href') || '#contact';
      const target = document.querySelector(targetID);
      if (target) {
        gsap.to(window, {
          duration: 1.2, // ความช้า-เร็ว
          scrollTo: { y: target, offsetY: 60 },
          ease: "power2.inOut"
        });
      }
    });
  });
  
const video = document.getElementById('myVideo');
const pauseBtn = document.getElementById('pauseBtn');

pauseBtn.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    pauseBtn.textContent = '⏸️'; // เปลี่ยนเป็นปุ่ม pause
  } else {
    video.pause();
    pauseBtn.textContent = '▶️'; // เปลี่ยนเป็นปุ่มเล่น
  }
});
