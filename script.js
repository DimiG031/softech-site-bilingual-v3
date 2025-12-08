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
    container.style.width = sheetW + 'px';
    container.style.height = sheetH + 'px';
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
  ac.classList.add('hidden');
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

    // HARD SAFETY TIMEOUT: i ako se nešto desi sa animacijama,
    // intro sigurno nestaje posle ~7s
    setTimeout(() => {
      if (ac.style.display !== 'none') {
        fastFinishIntro();
      }
    }, 7000);
  }
});

document.getElementById('skipIntro')?.addEventListener('click', fastFinishIntro);
})();



// ---------- i18n ----------
const dict = {
  sr:{
      'nav.about':'O nama',
      'nav.services':'Usluge',
      'nav.showcase':'Projekti',
      'nav.contact':'Kontakt',
      'nav.cta':'Kontaktiraj nas',

      'hero.badge':'Mi rešavamo kompleksne sisteme',
      'hero.title':"Razmišljaj pametno. <span style='color:var(--primary)'>Gradi još pametnije.</span>",
      'hero.lead':'SofTechRS isporučuje kompletan razvoj web, desktop i cloud softvera. Od poslovnih platformi i internih alata do specijalizovanih sistema — gradimo stabilne i skalabilne proizvode.',
      'hero.ctaStart':'Započni projekat',
      'hero.ctaWork':'Pogledaj radove',

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

      'about.title':'O kompaniji',
      'about.sub':'Inženjerski studio fokusiran na pouzdanost, jasnoću i brzinu.',
      'about.card1.title':'Engineering first',
      'about.card1.text':'Čista arhitektura, snažni domen modeli i automatizovani testovi. Gradimo sisteme koje je lako održavati.',
      'about.card2.title':'UX with purpose',
      'about.card2.text':'Moderni UI sa fokusom na jasnoću i produktivnost. Dark/light teme, prečice i offline obrasci.',
      'about.card3.title':'Secure by design',
      'about.card3.text':'RBAC, audit logovi, enkripcija u miru i prenosu. Bezbednost od prvog dana.',

      'services.title':'Usluge',
      'services.sub':'Od ideje do produkcije – i dalje.',
      'services.card1.title':'Web & SaaS',
      'services.card1.text':'Next.js/TypeScript aplikacije sa pretplatama, multi-tenant arhitekturom i admin konzolama.',
      'services.card2.title':'Desktop',
      'services.card2.text':'Java/JavaFX alati, installeri (jpackage + WiX), auto-update i štampa.',
      'services.card3.title':'APIs & Data',
      'services.card3.text':'Prisma & PostgreSQL, pozadinski poslovi, izveštaji, PDF/Excel tokovi i analitika.',
      'services.card4.title':'3D & Mape',
      'services.card4.text':'Three.js, Blender pipeline i interaktivne geovizualizacije.',

      'showcase.title':'Projekti',
      'showcase.sub':'Moment-izvodi sa skorijih projekata.',
      'showcase.s1.title':'Transport Suite',
      'showcase.s1.text':'Vozači, vozila, dozvole i podsetnici sa audit logovima i dashboardima.',
      'showcase.s2.title':'Logbook Pro',
      'showcase.s2.text':'Ture vozača, koordinate, carinski punktovi i offline unos.',
      'showcase.s3.title':'Reminder Desktop',
      'showcase.s3.text':'JavaFX sa system tray-om, notifikacijama i PDF izveštajima.',

      'ts.title':'Transport Suite',
      'ts.sub':'SaaS platforma za transportne i logističke kompanije — vozači, vozila, ture, dozvole i podsetnici na jednom mestu.',

      'ts.ops.title':'Operativa & ture',
      'ts.ops.text':'Evidencija tura, država, gradova, utovara i istovara, kilometraže i trajanja — sa filtriranjem po vozaču, vozilu i klijentu.',
      'ts.ops.li1':'Ture vozača sa detaljima rute',
      'ts.ops.li2':'Pregled po danu, nedelji, mesecu',
      'ts.ops.li3':'Export u PDF / Excel',

      'ts.compliance.title':'Dozvole & usklađenost',
      'ts.compliance.text':'Registracije, tehnički pregledi, PP aparati, dozvole i dokumenti — sa podsetnicima pre isteka.',
      'ts.compliance.li1':'Podsetnici za isteke dokumenata',
      'ts.compliance.li2':'Pregled po vozaču ili vozilu',
      'ts.compliance.li3':'Audit log ključnih promena',

      'ts.tech.title':'Tehnologija & integracije',
      'ts.tech.text':'Moderni stack sa fokusom na stabilnost i širenje — spreman za nove module, integracije i API-je.',
      'ts.tech.li1':'Next.js / TypeScript frontend',
      'ts.tech.li2':'Prisma & PostgreSQL backend',
      'ts.tech.li3':'Stripe pretplate i role (RBAC)',

      'ts.cta.main':'Zakaži demo / konsultacije',
      'ts.cta.note':'Kratak online sastanak, prolazimo kroz potrebe vaše firme i dogovaramo naredne korake.',

      'clients.title':'Klijenti & Partneri',
      'clients.sub':'Ponosni na saradnju sa ozbiljnim timovima i organizacijama.',

      'cta.title':'Imate ideju?',
      'cta.text':'Prototip za nedelju dana, iterativna isporuka po sprintovima — jasan obim i rokovi.',
      'cta.button':'Zakaži sastanak',

      'contact.title':'Kontakt',
      'contact.sub':'Napišite nam o ideji — javljamo se u roku od 24h.',
      'contact.name':'Ime i prezime',
      'contact.email':'Email',
      'contact.message':'Poruka',
      'contact.send':'Pošalji',
      'contact.openMail':'Otvaram vaš email klijent...',
      'contact.capabilities':'Mogućnosti',
      'contact.stack':'Tehnologije',

      'footer.blurb':'SofTechRS razvija pouzdan softver za moderne kompanije. Kompleksne procese pretvaramo u jasna i efikasna digitalna rešenja.',
      'footer.company':'Kompanija',
      'footer.products':'Proizvodi',
      'footer.contact':'Kontakt'
  },
  en:{
      'nav.about':'About',
      'nav.services':'Services',
      'nav.showcase':'Showcase',
      'nav.contact':'Contact',
      'nav.cta':'Get in touch',

      'hero.badge':'We solve complex systems',
      'hero.title':"Think smart. <span style='color:var(--primary)'>Build smarter.</span>",
      'hero.lead':'SofTechRS delivers end-to-end web, desktop and cloud software. From business platforms and internal tools to specialized systems — we build stable and scalable products.',
      'hero.ctaStart':'Start a project',
      'hero.ctaWork':'See our work',

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

      'about.title':'About SofTech',
      'about.sub':'An engineering studio focused on reliability, clarity and speed.',
      'about.card1.title':'Engineering first',
      'about.card1.text':'Clean architecture, strong domain models and automated tests. We build systems that are easy to maintain.',
      'about.card2.title':'UX with purpose',
      'about.card2.text':'Modern UI focused on clarity and operator productivity. Dark/light themes, shortcuts and offline patterns.',
      'about.card3.title':'Secure by design',
      'about.card3.text':'RBAC, audit logs, encryption at rest and in transit. Security from day one.',

      'services.title':'Services',
      'services.sub':'From idea to production — and beyond.',
      'services.card1.title':'Web & SaaS',
      'services.card1.text':'Next.js/TypeScript apps with subscriptions, multi-tenant architecture and admin consoles.',
      'services.card2.title':'Desktop',
      'services.card2.text':'Java/JavaFX tools, installers (jpackage + WiX), auto-update and printing.',
      'services.card3.title':'APIs & Data',
      'services.card3.text':'Prisma & PostgreSQL, background jobs, reporting, PDF/Excel pipelines and analytics.',
      'services.card4.title':'3D & Maps',
      'services.card4.text':'Three.js, Blender pipelines and interactive geo-visualizations.',

      'showcase.title':'Showcase',
      'showcase.sub':'Snapshots from recent projects.',
      'showcase.s1.title':'Transport Suite',
      'showcase.s1.text':'Drivers, vehicles, permits & reminders with audit logs and dashboards.',
      'showcase.s2.title':'Logbook Pro',
      'showcase.s2.text':'Driver tours, coordinates, customs points and offline capture.',
      'showcase.s3.title':'Reminder Desktop',
      'showcase.s3.text':'JavaFX with system tray, notifications and PDF reports.',

      'ts.title':'Transport Suite',
      'ts.sub':'A SaaS platform for transport and logistics companies — drivers, vehicles, tours, permits and reminders in one place.',

      'ts.ops.title':'Operations & tours',
      'ts.ops.text':'Track tours, countries, cities, loading/unloading points, mileage and duration — with filtering by driver, vehicle and client.',
      'ts.ops.li1':'Driver tours with route details',
      'ts.ops.li2':'Daily, weekly and monthly overviews',
      'ts.ops.li3':'Export to PDF / Excel',

      'ts.compliance.title':'Compliance & permits',
      'ts.compliance.text':'Registrations, technical checks, fire extinguishers, permits and documents — with reminders before expiry.',
      'ts.compliance.li1':'Reminders for document expirations',
      'ts.compliance.li2':'Views grouped by driver or vehicle',
      'ts.compliance.li3':'Audit log of critical changes',

      'ts.tech.title':'Technology & integrations',
      'ts.tech.text':'Modern stack focused on stability and growth — ready for new modules, integrations and APIs.',
      'ts.tech.li1':'Next.js / TypeScript frontend',
      'ts.tech.li2':'Prisma & PostgreSQL backend',
      'ts.tech.li3':'Stripe subscriptions and roles (RBAC)',

      'ts.cta.main':'Book a demo / consultation',
      'ts.cta.note':'A short online call to understand your needs and define the next steps.',

      'clients.title':'Clients & Partners',
      'clients.sub':'Proud to work with solid teams and organizations.',

      'cta.title':'Have a project in mind?',
      'cta.text':'Prototype in a week and ship in sprints — clear scope, clear milestones.',
      'cta.button':'Schedule a call',

      'contact.title':'Contact',
      'contact.sub':'Tell us about your idea — we’ll reply within 24h.',
      'contact.name':'Name',
      'contact.email':'Email',
      'contact.message':'Message',
      'contact.send':'Send',
      'contact.openMail':'Opening your email client...',
      'contact.capabilities':'Capabilities',
      'contact.stack':'Tech stack',

      'footer.blurb':'SofTechRS builds reliable software for modern companies. We turn complex processes into clear and efficient digital solutions.',
      'footer.company':'Company',
      'footer.products':'Products',
      'footer.contact':'Contact'
  }
};

const i18n = {
  current:'sr',
  t(k){
    return (dict[this.current] && dict[this.current][k]) || k;
  },
  apply(){
    document.documentElement.lang = this.current;
    document
      .querySelectorAll('[data-i18n]')
      .forEach(el=>{
        const k = el.getAttribute('data-i18n');
        const html = i18n.t(k);
        if(html) el.innerHTML = html;
      });
    localStorage.setItem('lang', this.current);
    document.getElementById('langBtn').classList.toggle('active', this.current==='en');
  }
};

(function(){
  const saved = localStorage.getItem('lang');
  if(saved) i18n.current = saved;
  i18n.apply();
  document.getElementById('langBtn').addEventListener('click', ()=>{
    i18n.current = i18n.current==='sr' ? 'en' : 'sr';
    i18n.apply();
  });
})();

// ---------- Carousel ----------
let index = 0;
const track = document.getElementById('track');

function render(){
  if (!track) return;
  track.style.transform = `translateX(-${index*100}%)`;
}

function next(){
  if (!track || !track.children.length) return;
  index = (index + 1) % track.children.length;
  render();
}

function prev(){
  if (!track || !track.children.length) return;
  index = (index - 1 + track.children.length) % track.children.length;
  render();
}

// Auto slide (ako postoji track)
if (track && track.children.length > 1) {
  setInterval(next, 5000);
}

// Touch / swipe podrška na mobilnim uređajima
if (track) {
  let startX = null;

  track.addEventListener('touchstart', (e) => {
    if (!e.touches || !e.touches.length) return;
    startX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const endX = e.changedTouches && e.changedTouches.length
      ? e.changedTouches[0].clientX
      : startX;
    const diff = endX - startX;

    // prag ~60px da bi swipe bio "nameran"
    if (Math.abs(diff) > 60) {
      if (diff > 0) {
        prev();
      } else {
        next();
      }
    }
    startX = null;
  });
}


// ---------- Contact (backend optional) ----------
const CONTACT_ENDPOINT = ""; // set to your API endpoint to enable POST

async function sendViaBackend(payload){
  if(!CONTACT_ENDPOINT) return false;
  try{
    const res = await fetch(CONTACT_ENDPOINT,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(payload)
    });
    return res.ok;
  }catch(e){
    return false;
  }
}

async function sendMail(form){
  const data = new FormData(form);

  const name    = (data.get('name')    || '').trim();
  const email   = (data.get('email')   || '').trim();
  const message = (data.get('message') || '').trim();

  const status = document.getElementById('formStatus');
  if (status) {
    status.classList.add('visible');
  }

  // Osnovna validacija emaila
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !emailOk || !message) {
    if (status) {
      status.textContent = i18n.current === 'sr'
        ? 'Molimo popunite ime, ispravan email i poruku.'
        : 'Please fill in your name, a valid email and a message.';
    }
    return false;
  }

  const subject = encodeURIComponent('[SofTech Inquiry] ' + name);
  const body = encodeURIComponent(
`${message}

--
${name}
${email}`
  );

  const payload = { name, email, message };

  const ok = await sendViaBackend(payload);
  if(ok){
    if (status) {
      status.textContent = i18n.current==='sr'
        ? 'Poruka poslata. Hvala!'
        : 'Message sent. Thank you!';
    }
    // ne osvežavamo stranicu
    return false;
  }

  const mailTo = 'contact@softechrs.com';
  const href = `mailto:${mailTo}?subject=${subject}&body=${body}`;
  if (status) {
    status.textContent = i18n.t('contact.openMail');
  }
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

// ---------- Navbar scroll state + scroll progress ----------
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const progressBar = document.querySelector('.scroll-progress-bar');

  function updateNavbarOnScroll(){
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }

  function updateScrollProgress(){
    if (!progressBar) return;
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop || 0;
    const scrollMax = (doc.scrollHeight - doc.clientHeight) || 1;
    const pct = scrollTop / scrollMax;
    progressBar.style.width = (pct * 100) + '%';
  }

  // inicijalno stanje
  updateNavbarOnScroll();
  updateScrollProgress();

  window.addEventListener('scroll', () => {
    updateNavbarOnScroll();
    updateScrollProgress();
  });

  window.addEventListener('resize', updateScrollProgress);
});




// ============= AI MEGA BACKGROUND SCROLL BLEND =============
document.addEventListener('DOMContentLoaded', () => {
  const brain = document.querySelector('.ai-bg-brain');
  const data  = document.querySelector('.ai-bg-data');
  const city  = document.querySelector('.ai-bg-city');

  if (!brain || !data || !city) return;

  const lerp = (a, b, t) => a + (b - a) * t;

  function updateBgByScroll() {
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || window.pageYOffset || 0;
    const scrollMax = (doc.scrollHeight - doc.clientHeight) || 1;
    const p = scrollTop / scrollMax; // 0 = vrh stranice, 1 = dno

    let brainO = 0, dataO = 0, cityO = 0;

    // Segmenti:
    // 0.00–0.25  -> čisti brain
    // 0.25–0.40  -> blend brain -> data
    // 0.40–0.60  -> čisti data
    // 0.60–0.75  -> blend data -> city
    // 0.75–1.00  -> čisti city

    if (p <= 0.25) {
      // gornjih ~25% stranice
      brainO = 1;
      dataO  = 0;
      cityO  = 0;
    } else if (p <= 0.40) {
      // prelaz brain -> data
      const t = (p - 0.25) / 0.15; // 0 → 1
      brainO = lerp(1, 0, t);
      dataO  = lerp(0, 1, t);
      cityO  = 0;
    } else if (p <= 0.60) {
      // sredina – podaci / serveri
      brainO = 0;
      dataO  = 1;
      cityO  = 0;
    } else if (p <= 0.75) {
      // prelaz data -> city
      const t = (p - 0.60) / 0.15; // 0 → 1
      brainO = 0;
      dataO  = lerp(1, 0, t);
      cityO  = lerp(0, 1, t);
    } else {
      // donji deo – futuristički grad / finalni proizvod
      brainO = 0;
      dataO  = 0;
      cityO  = 1;
    }

    brain.style.opacity = brainO.toFixed(3);
    data.style.opacity  = dataO.toFixed(3);
    city.style.opacity  = cityO.toFixed(3);
  }

  // Pozovi odmah (za slučaj da nije skrol na samom vrhu)
  updateBgByScroll();

  window.addEventListener('scroll', updateBgByScroll, { passive: true });
  window.addEventListener('resize', updateBgByScroll);
});


// ---------- Back to Top dugme ----------
document.addEventListener('DOMContentLoaded', () => {
  const backBtn = document.getElementById('backToTop');

  function toggleBackToTop() {
    if (window.scrollY > 300) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggleBackToTop);

  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});


// ---------- Responsive navbar (hamburger) ----------
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  if (!navToggle || !navLinks) return;

  function closeNav(){
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  function toggleNav(){
    const willOpen = !navLinks.classList.contains('open');
    navLinks.classList.toggle('open', willOpen);
    navToggle.classList.toggle('open', willOpen);
    navToggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
  }

  navToggle.addEventListener('click', toggleNav);

  // Kada korisnik klikne na neki link – zatvori meni
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      closeNav();
    });
  });
});


const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    // ...
  });
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const scrollBar = document.getElementById('scrollProgressBar');
if (scrollBar) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollBar.style.width = progress + '%';
  });
}
