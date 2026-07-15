(function () {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

  if (typeof ScrollyVideo === 'function' && document.getElementById('scrolly-video')) {
    new ScrollyVideo({
      scrollyVideoContainer: 'scrolly-video',
      src: 'video/v1.mp4',
      cover: true,
      sticky: true,
      full: true,
      trackScroll: true,
      lockScroll: false,
      transitionSpeed: 8,
      frameThreshold: 0.1,
      useWebCodecs: true,
      debug: false
    });
  }

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const scrollySection = document.getElementById('scrolly');
  if (scrollySection) {
    const scrollyObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        const hideNav = entry.isIntersecting && entry.intersectionRatio > 0.15;
        navbar.classList.toggle('nav-hidden', hideNav);
        if (hideNav) {
          mobileMenu.classList.remove('open');
          toggle.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }, { threshold: [0, 0.15, 0.35, 0.6, 1] });

    scrollyObs.observe(scrollySection);
  }

  toggle.addEventListener('click', function () {
    const open = mobileMenu.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  const observerNav = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      document.querySelectorAll('.nav-links a').forEach(function (a) {
        a.classList.toggle('active', a.getAttribute('href') === '#' + id);
      });
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

  document.querySelectorAll('#about, #products, #consortium, #projects, #contact, #pillars, #scrolly').forEach(function (el) {
    observerNav.observe(el);
  });

  const reveals = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(function (el) { revealObs.observe(el); });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      formStatus.textContent = 'لطفاً تمامی فیلدهای الزامی را تکمیل کنید.';
      formStatus.style.color = '#dc2626';
      return;
    }
    formStatus.textContent = 'درخواست شما ثبت شد. همکاران فنی در اسرع وقت با شما تماس خواهند گرفت.';
    formStatus.style.color = '#15803d';
    form.reset();
  });
})();
