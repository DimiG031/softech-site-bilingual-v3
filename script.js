
// ---------- PUZZLE INTRO LOGIC ----------
(function(){
  const pieceW = 80, pieceH = 80;
  function chooseGrid(){
    if (window.innerWidth < 480) return { rows: 2, cols: 3 };
    if (window.innerWidth < 992) return { rows: 3, cols: 4 };
    return { rows: 3, cols: 5 };
  }
  let GRID = chooseGrid();
  function isDirectImageUrl(url){ return /\.(png|jpg|jpeg|webp|gif|svg)(\?.*)?$/i.test(url || ''); }
  function createPuzzle(logoUrl){
    const container = document.getElementById('logoContainer');
    if(!container) return;
    const sheetW = GRID.cols * pieceW, sheetH = GRID.rows * pieceH;
    container.style.width = sheetW + 'px'; container.style.height = sheetH + 'px';
    container.style.setProperty('--sheet-w', sheetW + 'px');
    container.style.setProperty('--sheet-h', sheetH + 'px');
    container.style.setProperty('--logo-img', isDirectImageUrl(logoUrl) ? `url('${logoUrl}')` : 'none');
    container.innerHTML='';
    const vw = window.innerWidth, vh = window.innerHeight;
    const rand = (min,max)=>Math.random()*(max-min)+min;
    for(let r=0;r<GRID.rows;r++){
      for(let c=0;c<GRID.cols;c++){
        const piece = document.createElement('div');
        piece.className = 'puzzle-piece mask-none';
        if (r > 0 && (c%2)===0) piece.classList.add('mask-T');
        if (r < GRID.rows-1 && (c%2)===1) piece.classList.add('mask-B');
        if (c > 0 && (r%2)===1) piece.classList.add('mask-L');
        if (c < GRID.cols-1 && (r%2)===0) piece.classList.add('mask-R');
        piece.style.setProperty('--bx', (-(c*pieceW))+'px');
        piece.style.setProperty('--by', (-(r*pieceH))+'px');
        piece.style.left = (c*pieceW)+'px';
        piece.style.top = (r*pieceH)+'px';
        const tx = rand(-vw*.5, vw*.5), ty = rand(-vh*.5, vh*.5), rot = rand(-70,70);
        piece.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg)`;
        piece.style.zIndex = String(100 + Math.floor(rand(0, 50)));
        container.appendChild(piece);
      }
    }
  }
  function assemblePuzzle(){
    document.querySelectorAll('.puzzle-piece').forEach(p=>{
      const delay = (Math.random()*420)|0;
      setTimeout(()=>{ p.style.transform = 'translate(0px,0px) rotate(0deg)'; }, delay);
    });
  }
  function startAnimation(){
    const ac = document.getElementById('animationContainer');
    const lc = document.getElementById('logoContainer');
    if(!ac || !lc) return;
    setTimeout(()=>{ assemblePuzzle(); lc.classList.add('assembled'); }, 700);
    setTimeout(()=>{}, 3200);
    setTimeout(()=>{ lc.classList.add('move-to-header'); }, 3600);
    setTimeout(()=>{ ac.classList.add('hidden'); }, 5000);
    setTimeout(()=>{ ac.style.display='none'; }, 5600);
  }
  function fastFinishIntro(){
    const ac = document.getElementById('animationContainer');
    if (!ac) return;
    ac.style.display = 'none';
  }
  window.addEventListener('load', () => {
  GRID = chooseGrid();

  const ac = document.getElementById('animationContainer');
  const lc = document.getElementById('logoContainer');

  if (ac && lc) {
    // resetujemo stanje, za svaki slucaj
    ac.style.display = 'flex';
    ac.classList.remove('hidden');

    lc.classList.remove('assembled', 'move-to-header');
    lc.innerHTML = '';

    createPuzzle('assets/logo2.jpg');
    startAnimation();
  }
});

  document.getElementById('skipIntro')?.addEventListener('click', fastFinishIntro);
})();

// ---------- THEME TOGGLE ----------
const themeBtn = document.getElementById('themeBtn');
const applyTheme = (t)=>{
  document.documentElement.classList.toggle('light', t==='light');
  localStorage.setItem('theme', t);
  document.querySelector('.navbar').classList.toggle('light', t==='light');
};
(function(){
  const saved = localStorage.getItem('theme') || 'dark';
  applyTheme(saved);
  themeBtn.addEventListener('click', ()=>{
    const next = document.documentElement.classList.contains('light') ? 'dark' : 'light';
    applyTheme(next);
  });
})();

// ---------- i18n ----------
const dict = {
  sr:{'nav.about':'O nama','nav.services':'Usluge','nav.showcase':'Projekti','nav.contact':'Kontakt','nav.cta':'Kontaktiraj nas',
      'hero.badge':'Mi rešavamo kompleksne sisteme','hero.title':"Gradimo pametna rešenja za <span style='color:var(--primary)'>povezani</span> svet.",
'hero.lead':'SofTech Resolve isporučuje kompletan razvoj web, desktop i cloud softvera. Gradimo poslovne aplikacije, web sajtove, kontrolne table i interne alate — uz fokus na Java/JavaFX i JavaScript/TypeScript (React, Next.js) stack.',
      'hero.ctaStart':'Započni projekat','hero.ctaWork':'Pogledaj radove',
      'build.title':'Šta pravimo',
      'build.sub':'Pomažemo timovima da ideje pretvore u konkretne alate — od prvog prototipa do produkcije.',
      'build.web.title':'Web sajtovi & landing stranice',
      'build.web.text':'Moderne, responzivne stranice sa fokusom na jasnu poruku, brzinu i SEO — spremne za globalnu publiku.',
      'build.apps.title':'Web aplikacije & SaaS',
      'build.apps.text':'Poslovne aplikacije, klijentski portali i SaaS sistemi sa loginom, pretplatama, rolama i integracijama.',
      'build.desktop.title':'Desktop alati',
      'build.desktop.text':'Java / JavaFX alati sa installerima, automatskim ažuriranjem, štampom i offline radom.',
      'build.integrations.title':'Integracije & automatizacija',
      'build.integrations.text':'Povezivanje postojećih sistema, API integracije, import/export podataka i automatizacija ponavljajućih zadataka.',
      'about.title':'O kompaniji','about.sub':'Inženjerski studio fokusiran na pouzdanost, jasnoću i brzinu.',
      'about.card1.title':'Engineering first','about.card1.text':'Čista arhitektura, snažni domen modeli i automatizovani testovi. Gradimo sisteme koje je lako održavati.',
      'about.card2.title':'UX with purpose','about.card2.text':'Moderni UI sa fokusom na jasnoću i produktivnost. Dark/light teme, prečice i offline obrasci.',
      'about.card3.title':'Secure by design','about.card3.text':'RBAC, audit logovi, enkripcija u miru i prenosu. Bezbednost od prvog dana.',
      'services.title':'Usluge','services.sub':'Od ideje do produkcije – i dalje.',
      'services.card1.title':'Web & SaaS','services.card1.text':'Next.js/TypeScript aplikacije sa pretplatama, multi‑tenant arhitekturom i admin konzolama.',
      'services.card2.title':'Desktop','services.card2.text':'Java/JavaFX alati, installeri (jpackage + WiX), auto‑update i štampa.',
      'services.card3.title':'APIs & Data','services.card3.text':'Prisma & PostgreSQL, pozadinski poslovi, izveštaji, PDF/Excel tokovi i analitika.',
      'services.card4.title':'3D & Mape','services.card4.text':'Three.js, Blender pipeline i interaktivne geovizualizacije.',
      'showcase.title':'Projekti','showcase.sub':'Moment-izvodi sa skorijih projekata.',
      'showcase.s1.title':'Transport Suite','showcase.s1.text':'Vozači, vozila, dozvole i podsetnici sa audit logovima i dashboardima.',
      'showcase.s2.title':'Logbook Pro','showcase.s2.text':'Ture vozača, koordinate, carinski punktovi i offline unos.',
      'showcase.s3.title':'Reminder Desktop','showcase.s3.text':'JavaFX sa system tray‑om, notifikacijama i PDF izveštajima.',
      'clients.title':'Klijenti & Partneri','clients.sub':'Ponosni na saradnju sa ozbiljnim timovima i organizacijama.',
      'cta.title':'Imate ideju?','cta.text':'Prototip za nedelju dana, iterativna isporuka po sprintovima — jasan obim i rokovi.','cta.button':'Zakaži sastanak',
      'contact.title':'Kontakt','contact.sub':'Napišite nam o ideji — javljamo se u roku od 24h.','contact.name':'Ime i prezime','contact.email':'Email','contact.message':'Poruka','contact.send':'Pošalji','contact.openMail':'Otvaram vaš email klijent...',
      'contact.capabilities':'Mogućnosti','contact.stack':'Tehnologije',
      'footer.blurb':'SofTech Resolve gradi pouzdan softver za timove koji isporučuju. Pretvaramo kompleksne procese u jasne, upotrebljive alate.',
      'footer.company':'Kompanija','footer.products':'Proizvodi','footer.contact':'Kontakt'
  },
  en:{'nav.about':'About','nav.services':'Services','nav.showcase':'Showcase','nav.contact':'Contact','nav.cta':'Get in touch',
      'hero.badge':'We solve complex systems','hero.title':"Building smart solutions for a <span style='color:var(--primary)'>connected</span> world.",
      'hero.lead':'SofTech Resolve delivers end-to-end web, desktop and cloud software. We build business applications, websites, dashboards and internal tools — with a focus on Java/JavaFX and JavaScript/TypeScript (React, Next.js).',
      'hero.ctaStart':'Start a project','hero.ctaWork':'See our work',
      'build.title':'What we build',
      'build.sub':'We help teams turn ideas into concrete tools — from first prototype to production.',
      'build.web.title':'Websites & landing pages',
      'build.web.text':'Modern, responsive sites focused on clear messaging, speed and SEO — ready for a global audience.',
      'build.apps.title':'Web apps & SaaS',
      'build.apps.text':'Business applications, client portals and SaaS platforms with logins, subscriptions, roles and integrations.',
      'build.desktop.title':'Desktop tools',
      'build.desktop.text':'Java / JavaFX desktop tools with installers, auto-update, printing and offline capabilities.',
      'build.integrations.title':'Integrations & automation',
      'build.integrations.text':'Connecting existing systems, API integrations, data import/export and automation of repetitive workflows.',
      'about.title':'About SofTech','about.sub':'An engineering studio focused on reliability, clarity and speed.',
      'about.card1.title':'Engineering first','about.card1.text':'Clean architecture, strong domain models and automated tests. We build systems that are easy to maintain.',
      'about.card2.title':'UX with purpose','about.card2.text':'Modern UI focused on clarity and operator productivity. Dark/light themes, shortcuts and offline patterns.',
      'about.card3.title':'Secure by design','about.card3.text':'RBAC, audit logs, encryption at rest and in transit. Security from day one.',
      'services.title':'Services','services.sub':'From idea to production — and beyond.',
      'services.card1.title':'Web & SaaS','services.card1.text':'Next.js/TypeScript apps with subscriptions, multi‑tenant architecture and admin consoles.',
      'services.card2.title':'Desktop','services.card2.text':'Java/JavaFX tools, installers (jpackage + WiX), auto‑update and printing.',
      'services.card3.title':'APIs & Data','services.card3.text':'Prisma & PostgreSQL, background jobs, reporting, PDF/Excel pipelines and analytics.',
      'services.card4.title':'3D & Maps','services.card4.text':'Three.js, Blender pipelines and interactive geo‑visualizations.',
      'showcase.title':'Showcase','showcase.sub':'Snapshots from recent projects.',
      'showcase.s1.title':'Transport Suite','showcase.s1.text':'Drivers, vehicles, permits & reminders with audit logs and dashboards.',
      'showcase.s2.title':'Logbook Pro','showcase.s2.text':'Driver tours, coordinates, customs points and offline capture.',
      'showcase.s3.title':'Reminder Desktop','showcase.s3.text':'JavaFX with system tray, notifications and PDF reports.',
      'clients.title':'Clients & Partners','clients.sub':'Proud to work with solid teams and organizations.',
      'cta.title':'Have a project in mind?','cta.text':'Prototype in a week and ship in sprints — clear scope, clear milestones.','cta.button':'Schedule a call',
      'contact.title':'Contact','contact.sub':'Tell us about your idea — we’ll reply within 24h.','contact.name':'Name','contact.email':'Email','contact.message':'Message','contact.send':'Send','contact.openMail':'Opening your email client...',
      'contact.capabilities':'Capabilities','contact.stack':'Tech stack',
      'footer.blurb':'SofTech Resolve builds reliable software for teams that ship. We turn complex processes into clear, usable tools.',
      'footer.company':'Company','footer.products':'Products','footer.contact':'Contact'
  }
};
const i18n = { current:'sr', t(k){ return (dict[this.current]&&dict[this.current][k])||k; }, apply(){
  document.documentElement.lang = this.current;
  document.querySelectorAll('[data-i18n]').forEach(el=>{ const k=el.getAttribute('data-i18n'); const html=i18n.t(k); if(html) el.innerHTML=html; });
  localStorage.setItem('lang', this.current);
  document.getElementById('langBtn').classList.toggle('active', this.current==='en');
}};
(function(){
  const saved = localStorage.getItem('lang'); if(saved) i18n.current = saved; i18n.apply();
  document.getElementById('langBtn').addEventListener('click', ()=>{
    i18n.current = i18n.current==='sr' ? 'en' : 'sr'; i18n.apply();
  });
})();

// ---------- Carousel ----------
let index = 0; const track = document.getElementById('track');
function render(){ track.style.transform = `translateX(-${index*100}%)`; }
function next(){ index = (index + 1) % track.children.length; render(); }
function prev(){ index = (index - 1 + track.children.length) % track.children.length; render(); }
setInterval(next, 5000);

// ---------- Contact (backend optional) ----------
const CONTACT_ENDPOINT = ""; // set to your API endpoint to enable POST
async function sendViaBackend(payload){
  if(!CONTACT_ENDPOINT) return false;
  try{ const res = await fetch(CONTACT_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}); return res.ok; }
  catch(e){ return false; }
}
async function sendMail(form){
  const data = new FormData(form);
  const subject = encodeURIComponent('[SofTech Inquiry] ' + data.get('name'));
  const body = encodeURIComponent(`${data.get('message')}

--
${data.get('name')}
${data.get('email')}`);
  const payload = { name:data.get('name'), email:data.get('email'), message:data.get('message') };
  const status = document.getElementById('formStatus');
  const ok = await sendViaBackend(payload);
  if(ok){ status.textContent = i18n.current==='sr' ? 'Poruka poslata. Hvala!' : 'Message sent. Thank you!'; return false; }
  const email = 'contact@softechrs.com';
  const href = `mailto:${email}?subject=${subject}&body=${body}`;
  status.textContent = i18n.t('contact.openMail');
  window.location.href = href;
  return false;
}

// ---------- Auto year in footer ----------
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
