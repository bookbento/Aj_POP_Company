// Run everything after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // ===== PRELOADER ANIMATION =====
    const preloader = document.getElementById('preloader');
    const preCanvas = document.getElementById('pre-canvas');
    const bar = document.querySelector('.loader-bar span');
    const percentLabel = document.querySelector('.loader-percent');
    const tips = [
      'Igniting build pipeline…',
      'Warming up containers…',
      'Syncing branches…',
      'Compiling shaders…',
      'Indexing logs…',
      'Priming cache…'
    ];
    const tipEl = document.querySelector('.loader-tip');
  
    // Tiny particles on preloader
    const pctx = preCanvas.getContext('2d');
    function fitPre() {
      preCanvas.width = innerWidth;
      preCanvas.height = innerHeight;
    }
    fitPre(); addEventListener('resize', fitPre);
    let P = Array.from({length: 80}, () => ({
      x: Math.random()*preCanvas.width,
      y: Math.random()*preCanvas.height,
      r: Math.random()*2 + .5,
      vx: (Math.random()-.5)*0.6,
      vy: (Math.random()-.5)*0.6
    }));
    function preLoop(){
      pctx.clearRect(0,0,preCanvas.width, preCanvas.height);
      pctx.fillStyle = 'rgba(170,240,255,.65)';
      for(const p of P){
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>preCanvas.width) p.vx*=-1;
        if(p.y<0||p.y>preCanvas.height) p.vy*=-1;
        pctx.beginPath(); pctx.arc(p.x,p.y,p.r,0,Math.PI*2); pctx.fill();
      }
      requestAnimationFrame(preLoop);
    }
    preLoop();
  
    let pct = 0;
    const preTimer = setInterval(() => {
      pct += Math.floor(Math.random()*10) + 5; // speedy wow
      if (pct > 100) pct = 100;
      bar.style.width = pct + '%';
      percentLabel.textContent = pct + '%';
      tipEl.textContent = tips[pct % tips.length];
  
      if (pct === 100) {
        clearInterval(preTimer);
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity .6s ease';
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 600);
      }
    }, 180);
  
    // ===== NAV: smooth scroll + active link =====
    const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
    navLinks.forEach(a=>{
      a.addEventListener('click', e=>{
        e.preventDefault();
        document.querySelectorAll('.nav a').forEach(x=>x.classList.remove('active'));
        a.classList.add('active');
        document.querySelector(a.getAttribute('href')).scrollIntoView({behavior:'smooth', block:'start'});
      });
    });
  
    // Back to top + active section
    const st = document.getElementById('scrolltop');
    window.addEventListener('scroll', ()=>{
      st.classList.toggle('show', window.scrollY > 600);
      const ids = ['home','about','works','team','contact'];
      let cur = 'home';
      for(const id of ids){
        const el = document.getElementById(id);
        if(el && el.getBoundingClientRect().top <= 120) cur = id;
      }
      document.querySelectorAll('.nav a').forEach(x=>x.classList.toggle('active', x.getAttribute('href')==='#'+cur));
    });
    st.addEventListener('click', ()=>window.scrollTo({top:0, behavior:'smooth'}));
    document.getElementById('y').textContent = new Date().getFullYear();
  
    // ===== REVEAL ON SCROLL =====
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, {threshold:.12});
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  
    // ===== HERO CANVASES =====
    const stars = document.getElementById('stars');
    const grid = document.getElementById('grid');
    const DPR = Math.min(2, window.devicePixelRatio || 1);
  
    function fit(c){ c.width = innerWidth*DPR; c.height = innerHeight*DPR; c.style.width='100%'; c.style.height='100%'; }
    function resize(){ fit(stars); fit(grid); initStars(); }
    resize(); addEventListener('resize', resize);
  
    const sctx = stars.getContext('2d'), gctx = grid.getContext('2d');
  
    let starArr=[];
    function initStars(){
      starArr = [];
      const count = Math.round((innerWidth+innerHeight)/5);
      for(let i=0;i<count;i++){
        starArr.push({ x: Math.random()*stars.width, y: Math.random()*stars.height, z: Math.random()*1.2+.2, r: Math.random()*1.8+.3 });
      }
    }
    initStars();
  
    function drawStars(){
      sctx.clearRect(0,0,stars.width,stars.height);
      for(const s of starArr){
        sctx.beginPath();
        sctx.arc(s.x, s.y, s.r*DPR, 0, Math.PI*2);
        sctx.fillStyle = `rgba(170,240,255, ${0.3 + s.z*0.5})`;
        sctx.fill();
        s.x += (0.2 + s.z)*DPR;
        if(s.x>stars.width){ s.x=0; s.y=Math.random()*stars.height; }
      }
    }
  
    let t=0;
    function drawGrid(){
      gctx.clearRect(0,0,grid.width,grid.height);
      const w=grid.width, h=grid.height;
      gctx.strokeStyle = 'rgba(34,211,238,.25)';
      gctx.lineWidth = 1*DPR;
      const gap = 32*DPR, offset = (t*0.6)%gap;
      for(let y=h*0.55; y<h; y+=gap){
        gctx.beginPath(); gctx.moveTo(0, y+offset); gctx.lineTo(w, y+offset); gctx.stroke();
      }
      gctx.strokeStyle = 'rgba(167,139,250,.18)';
      for(let x=0; x<w; x+=gap){
        gctx.beginPath(); gctx.moveTo(x+offset, h*0.55); gctx.lineTo(x+offset, h); gctx.stroke();
      }
      t++;
    }
  
    (function loop(){ drawStars(); drawGrid(); requestAnimationFrame(loop); })();
  
    // ===== TEAM TILT =====
    document.querySelectorAll('.person').forEach(card=>{
      card.addEventListener('mousemove', (e)=>{
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left)/r.width, y=(e.clientY - r.top)/r.height;
        card.style.transform = `rotateX(${(0.5 - y)*6}deg) rotateY(${(x-0.5)*6}deg)`;
      });
      card.addEventListener('mouseleave', ()=> card.style.transform = '');
    });
  
    // ===== PORTFOLIO MODALS (6 members) =====
    const portfolios = {
      a: {name:'Ada K.', html: `
        <p><b>Specialty:</b> POS core, checkout flows, RBAC, data models.</p>
        <ul>
          <li><b>ForgePOS</b> — checkout + stock + promos (Node, Postgres)</li>
          <li><b>BranchSync</b> — near-real-time replication across stores</li>
          <li><b>TillGuard</b> — audit trails & exception reports</li>
        </ul>`},
      b: {name:'Juno T.', html: `
        <p><b>Specialty:</b> Frontend performance, micro-interactions, WebGL candy.</p>
        <p>Built component libraries and motion systems for dashboards & POS tablets.</p>`},
      c: {name:'Rami M.', html: `
        <p><b>Specialty:</b> Data pipelines & forecasting.</p>
        <p>Demand models, ROP alerts, anomaly detection for sales dips.</p>`},
      d: {name:'Nora V.', html: `
        <p><b>Specialty:</b> Cloud infra, CI/CD, observability.</p>
        <p>Blue-green, autoscaling, zero-downtime rollouts, SLOs that matter.</p>`},
      e: {name:'Leo C.', html: `
        <p><b>Specialty:</b> Mobile + payments.</p>
        <p>Tap-to-pay, QR flows, PCI-minded integrations, offline receipts.</p>`},
      f: {name:'Emma M.', html: `
        <p><b>Specialty:</b> Product & delivery.</p>
        <p>Roadmaps, scope slicing, stakeholder alignment, ship dates kept honest.</p>`},
    };
  
    function openModal(key){
      const t = document.getElementById('tmpl-modal');
      const node = t.content.cloneNode(true);
      node.querySelector('.who').textContent = portfolios[key].name;
      node.querySelector('.content').innerHTML = portfolios[key].html;
      const back = node.querySelector('.modal-backdrop');
      back.addEventListener('click', (e)=>{ if(e.target===back) back.remove(); });
      back.querySelector('[data-close]').addEventListener('click', ()=> back.remove());
      document.body.appendChild(node);
    }
  
    document.querySelectorAll('[data-open]').forEach(btn=>{
      btn.addEventListener('click', ()=> openModal(btn.dataset.open));
    });
  
    // ===== CONTACT FAKE SENDER =====
    window.fakeSend = function(form){
      const s = document.getElementById('formStatus');
      s.textContent = 'Sending…';
      setTimeout(()=>{ s.innerHTML = 'Sent! We’ll get back shortly.'; }, 900);
      form.reset();
    };
  });
  