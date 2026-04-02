document.addEventListener('DOMContentLoaded', function () {
  var burger = document.getElementById('burger-btn');
  var nav    = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', isOpen);
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); });
    });
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !burger.contains(e.target)) { nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
    });
  }
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(function (a) {
    if (a.getAttribute('href') === path || (path === '' && a.getAttribute('href') === 'index.html')) a.classList.add('active');
  });
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.07 });
    document.querySelectorAll('.reveal').forEach(function (el) { obs.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('visible'); });
  }
  var form = document.getElementById('form-contact');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll('[required]').forEach(function (f) {
        if (f.type === 'checkbox' && !f.checked) ok = false;
        else if (f.type !== 'checkbox' && !f.value.trim()) ok = false;
      });
      if (!ok) { alert('Merci de compléter tous les champs obligatoires.'); return; }
      var s = document.getElementById('form-success');
      if (s) s.style.display = 'block';
      var btn = form.querySelector('.btn-submit');
      if (btn) { btn.disabled = true; btn.textContent = 'Message envoyé ✓'; }
    });
  }
});
