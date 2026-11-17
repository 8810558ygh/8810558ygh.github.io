'use strict';

const yearElement = document.getElementById('currentYear');
if (yearElement) yearElement.textContent = new Date().getFullYear();

const revealElements = document.querySelectorAll('.reveal');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reducedMotion || !('IntersectionObserver' in window)) {
  revealElements.forEach(element => element.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px',
  });

  revealElements.forEach(element => observer.observe(element));
}

const toast = document.getElementById('downloadToast');
let toastTimer = 0;

document.querySelectorAll('.download-link').forEach(link => {
  link.addEventListener('click', () => {
    if (!toast) return;
    const name = link.dataset.download || '文件';
    toast.textContent = `正在打开${name}下载…`;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2600);
  });
});
