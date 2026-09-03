'use strict';

/* Появление блоков при прокрутке */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = document.querySelectorAll('.reveal');

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealEls.forEach(el => el.classList.add('is-visible'));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
}

/* Форма предзаказа (демо) */
const form = document.getElementById('preorderForm');
const hint = document.getElementById('formHint');
const emailInput = document.getElementById('emailInput');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!valid) {
    hint.textContent = 'Проверьте адрес почты — похоже, в нём опечатка';
    hint.className = 'cta__hint cta__hint--err';
    emailInput.focus();
    return;
  }
  hint.textContent = 'Место занято! Это демо — данные никуда не отправлены 🌱';
  hint.className = 'cta__hint cta__hint--ok';
  form.reset();
});
