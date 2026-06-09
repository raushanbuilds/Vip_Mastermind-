/* Vip Mastermind — Interactions */
(function(){
  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Navbar scroll effect
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 12);
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Mobile nav toggle
  const toggle = document.getElementById('navToggle');
  const links = document.querySelector('.nav-links');
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

  // Floating particles
  const pWrap = document.getElementById('particles');
  const COUNT = 22;
  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    const size = Math.random() * 10 + 4;
    p.style.width = p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.animationDuration = (Math.random() * 14 + 10) + 's';
    p.style.animationDelay = (-Math.random() * 18) + 's';
    p.style.opacity = (Math.random() * .35 + .25).toFixed(2);
    pWrap.appendChild(p);
  }

  // Countdown — resets daily at midnight
  const hEl = document.getElementById('hours');
  const mEl = document.getElementById('minutes');
  const sEl = document.getElementById('seconds');
  const pad = n => String(n).padStart(2,'0');
  function tick(){
    const now = new Date();
    const end = new Date(now); end.setHours(23,59,59,999);
    const diff = Math.max(0, end - now);
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    hEl.textContent = pad(h); mEl.textContent = pad(m); sEl.textContent = pad(s);
  }
  tick(); setInterval(tick, 1000);

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }});
  }, {threshold:.12});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Payment modal
  const modal = document.getElementById('payModal');
  const planLine = document.getElementById('modalPlanLine');
  const open = (plan, price) => {
    planLine.innerHTML = `Plan: <b>${plan}</b> · <b>₹${Number(price).toLocaleString('en-IN')}</b>`;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  };
  document.querySelectorAll('.open-pay').forEach(btn => {
    btn.addEventListener('click', () => open(btn.dataset.plan, btn.dataset.price));
  });
  modal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  // Pay option demo feedback
  modal.querySelectorAll('.pay-option').forEach(b => {
    b.addEventListener('click', () => {
      b.style.transform = 'scale(.98)';
      setTimeout(() => b.style.transform = '', 150);
      alert('Redirecting to secure payment gateway…');
    });
  });
})();