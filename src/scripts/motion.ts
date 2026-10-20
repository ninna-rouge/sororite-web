/**
 * Entrada al hacer scroll. La intro del logo es solo CSS.
 * prefers-reduced-motion deja el contenido quieto y visible.
 */
function closeMenu() {
  document.querySelectorAll('details.nav-mobile[open]').forEach((menu) => {
    menu.removeAttribute('open');
  });
}

function initReveal() {
  const nodes = document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-bound])');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    nodes.forEach((node) => {
      node.classList.add('is-in');
      node.dataset.bound = 'true';
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const target = entry.target as HTMLElement;
        target.classList.add('is-in');
        observer.unobserve(target);
      }
    },
    { threshold: 0, rootMargin: '0px 0px -8% 0px' },
  );

  nodes.forEach((node) => {
    node.dataset.bound = 'true';
    observer.observe(node);
  });
}

function boot() {
  closeMenu();
  initReveal();
}

boot();
document.addEventListener('astro:page-load', boot);
document.addEventListener('astro:before-swap', () => {
  document.documentElement.classList.add('intro-done');
  closeMenu();
});
