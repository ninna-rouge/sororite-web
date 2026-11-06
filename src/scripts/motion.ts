/**
 * La carga espera tipografía, logo y póster del hero.
 * Al soltarla parte la entrada de la página. En la navegación siguiente no se repite.
 * prefers-reduced-motion deja el contenido quieto y visible.
 */
function waitImage(img: Element | null) {
  if (!(img instanceof HTMLImageElement) || img.complete) return Promise.resolve();
  return new Promise<void>((resolve) => {
    img.addEventListener('load', () => resolve(), { once: true });
    img.addEventListener('error', () => resolve(), { once: true });
  });
}

function waitHero() {
  const film = document.querySelector('.hero-film');
  if (!(film instanceof HTMLVideoElement)) return Promise.resolve();
  const poster = film.getAttribute('poster');
  const posterReady = poster
    ? new Promise<void>((resolve) => {
        const pic = new Image();
        pic.onload = () => resolve();
        pic.onerror = () => resolve();
        pic.src = poster;
      })
    : Promise.resolve();
  const meta =
    film.readyState >= 1
      ? Promise.resolve()
      : new Promise<void>((resolve) => {
          film.addEventListener('loadedmetadata', () => resolve(), { once: true });
          film.addEventListener('error', () => resolve(), { once: true });
        });
  return Promise.all([posterReady, meta]);
}

function releaseCarga(veil: HTMLElement | null) {
  const root = document.documentElement;
  root.classList.add('is-ready', 'intro-done');
  if (!veil) return;
  veil.classList.add('carga-sale');
  const drop = () => {
    veil.remove();
  };
  veil.addEventListener('transitionend', drop, { once: true });
  window.setTimeout(drop, 800);
}

function initCarga() {
  const root = document.documentElement;
  const veil = document.getElementById('carga');
  if (root.classList.contains('intro-done')) {
    root.classList.add('is-ready');
    veil?.remove();
    return;
  }
  if (!(veil instanceof HTMLElement) || veil.dataset.armed === 'true') return;
  veil.dataset.armed = 'true';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    releaseCarga(veil);
    return;
  }

  const started = performance.now();
  const fonts = document.fonts?.ready ?? Promise.resolve();
  const critical = Promise.all([
    fonts,
    waitHero(),
    waitImage(document.querySelector('.carga-logo')),
    waitImage(document.querySelector('.brand img')),
  ]);
  const limit = new Promise<void>((resolve) => {
    window.setTimeout(resolve, 3200);
  });

  void Promise.race([critical.then(() => undefined), limit]).then(() => {
    const rest = Math.max(0, 2600 - (performance.now() - started));
    window.setTimeout(() => releaseCarga(veil), rest);
  });
}
function closeMenu() {
  document.querySelectorAll('details.nav-mobile[open]').forEach((menu) => {
    menu.removeAttribute('open');
  });
}

function tagReveals() {
  document.querySelectorAll<HTMLElement>('main .section-head, main section > .shell > h2, main .section img, main .card-grid').forEach((el) => {
    if (el.closest('.hero-home') || el.closest('.cierre-flora') || el.closest('[data-reveal]:not(.section-head)') && !el.matches('img')) return;
    if (el.matches('img') && el.closest('[data-reel]')) return;
    if (el.matches('img')) el.dataset.revealKind = 'mask';
    if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', '');
  });
  document.querySelectorAll<HTMLElement>('.stagger').forEach((grid) => {
    Array.from(grid.children).forEach((child, i) => (child as HTMLElement).style.setProperty('--i', String(i)));
  });
}

function initParallax() {
  const formas = document.querySelectorAll<HTMLElement>('.atmosfera .forma:not(.forma-arco)');
  if (!formas.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let ticking = false;
  const update = () => {
    const y = window.scrollY;
    formas.forEach((f, i) => f.style.setProperty('--px', `${(y * (i ? -0.04 : 0.06)).toFixed(1)}px`));
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
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
  initCarga();
  initReveal();
}

initParallax();

boot();
document.addEventListener('astro:page-load', boot);
document.addEventListener('astro:before-swap', () => {
  document.documentElement.classList.add('intro-done', 'is-ready');
  closeMenu();
});
