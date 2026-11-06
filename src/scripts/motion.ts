/**
 * Revela al hacer scroll y cierra el menú al cambiar de página.
 * No tapa el contenido ni espera un tiempo mínimo.
 * prefers-reduced-motion deja el contenido quieto y visible.
 */
export {};

document.documentElement.classList.add('js', 'is-ready');

function closeMenu() {
  document.querySelectorAll('details.nav-mobile[open]').forEach((menu) => {
    menu.removeAttribute('open');
  });
}

function tagReveals() {
  document
    .querySelectorAll<HTMLElement>(
      'main .section-head, main section > .shell > h2, main .section img, main .card-grid',
    )
    .forEach((el) => {
      if (
        el.closest('.hero-home') ||
        el.closest('.cierre-flora') ||
        (el.closest('[data-reveal]:not(.section-head)') && !el.matches('img'))
      )
        return;
      if (el.matches('img') && el.closest('[data-reel]')) return;
      if (el.matches('img')) el.dataset.revealKind = 'mask';
      if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', '');
    });
  document.querySelectorAll<HTMLElement>('.stagger').forEach((grid) => {
    Array.from(grid.children).forEach((child, i) =>
      (child as HTMLElement).style.setProperty('--i', String(i)),
    );
  });
}

function initParallax() {
  const formas = document.querySelectorAll<HTMLElement>('.atmosfera .forma:not(.forma-arco)');
  if (!formas.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let ticking = false;
  const update = () => {
    const y = window.scrollY;
    formas.forEach((f, i) =>
      f.style.setProperty('--px', `${(y * (i ? -0.04 : 0.06)).toFixed(1)}px`),
    );
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
}

function initReveal() {
  tagReveals();
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
    { threshold: 0.2, rootMargin: '0px 0px -5% 0px' },
  );

  nodes.forEach((node) => {
    node.dataset.bound = 'true';
    observer.observe(node);
  });
}

function boot() {
  closeMenu();
  document.documentElement.classList.add('is-ready');
  initReveal();
}

initParallax();

boot();
document.addEventListener('astro:page-load', boot);
document.addEventListener('astro:before-swap', () => {
  document.documentElement.classList.add('intro-done', 'is-ready');
  closeMenu();
});
