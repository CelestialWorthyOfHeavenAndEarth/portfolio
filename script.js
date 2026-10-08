const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('.mobile-nav');
const header = document.querySelector('.site-header');
menuButton?.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  menuButton.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.mobile-nav a').forEach(link => link.addEventListener('click', () => {
  mobileNav.classList.remove('open'); menuButton.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false');
}));

const sections = document.querySelectorAll('.section-observe');
const railItems = document.querySelectorAll('.rail-item');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.dataset.section;
    railItems.forEach(item => item.classList.toggle('active', item.dataset.section === id));
  });
}, { rootMargin: '-38% 0px -52% 0px', threshold: 0 });
sections.forEach(section => observer.observe(section));

const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 32);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
  const target = document.querySelector(link.getAttribute('href'));
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
}));

const orb = document.querySelector('.cursor-orb');
if (window.matchMedia('(pointer:fine)').matches && orb) {
  window.addEventListener('pointermove', event => { orb.style.left = `${event.clientX}px`; orb.style.top = `${event.clientY}px`; orb.style.opacity = '1'; });
  document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('mouseenter', () => orb.classList.add('big'));
    element.addEventListener('mouseleave', () => orb.classList.remove('big'));
  });
}
