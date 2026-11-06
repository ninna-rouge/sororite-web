/**
 * Carrusel de proceso y producto. El desplazamiento es nativo (scroll-snap);
 * el script sincroniza la leyenda, los segmentos y el avance automático.
 * El avance se detiene con hover, foco, fuera de pantalla o con el botón de pausa,
 * y no existe con prefers-reduced-motion.
 */
const SWAP = 240;
const DWELL = 3500;

function initReel(root: HTMLElement) {
  root.dataset.bound = 'true';
  const track = root.querySelector<HTMLElement>('[data-reel-track]');
  if (!track) return;
  const slides = Array.from(track.querySelectorAll<HTMLElement>('.reel-slide'));
  const dots = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-reel-dot]'));
  const caption = root.querySelector<HTMLElement>('[data-reel-caption]');
  const field = (name: string) => root.querySelector<HTMLElement>(`[data-reel-${name}]`);
  const current = field('current');
  const chapter = field('chapter');
  const title = field('title');
  const script = field('script');
  const text = field('text');
  const toggle = root.querySelector<HTMLButtonElement>('[data-reel-toggle]');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let index = 0;
  let playing = !reduce;
  let inView = false;
  let held = false;
  let programmatic = false;
  let swapTimer = 0;
  let scrollFrame = 0;
  let autoTimer = 0;
  let moveTimer = 0;

  root.classList.add('is-ready');
  if (reduce && toggle) toggle.hidden = true;

  const fill = (i: number) => dots[i]?.querySelector<HTMLElement>('.reel-step-fill');

  const restartFill = () => {
    dots.forEach((dot) => dot.classList.remove('is-running'));
    const el = fill(index);
    if (!el || !playing) return;
    void el.offsetWidth;
    dots[index].classList.add('is-running');
  };

  const syncHold = () => {
    root.classList.toggle('is-held', held || !inView);
    restartFill();
    armAuto();
  };

  const writeCaption = (slide: HTMLElement) => {
    if (current) current.textContent = String(index + 1).padStart(2, '0');
    if (chapter) chapter.textContent = slide.dataset.chapter ?? '';
    if (title) title.textContent = slide.dataset.title ?? '';
    if (script) script.textContent = slide.dataset.script ?? '';
    if (text) text.textContent = slide.dataset.text ?? '';
  };

  const setActive = (next: number, announce: boolean) => {
    if (next === index && slides[next].classList.contains('is-active')) return;
    index = next;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-past', i < index);
      if (i === index) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
    caption?.setAttribute('aria-live', announce ? 'polite' : 'off');

    window.clearTimeout(swapTimer);
    if (reduce || !caption) {
      writeCaption(slides[index]);
    } else {
      caption.classList.add('is-out');
      swapTimer = window.setTimeout(() => {
        writeCaption(slides[index]);
        caption.classList.remove('is-out');
      }, SWAP);
    }
    restartFill();
  };

  const armAuto = () => {
    window.clearTimeout(autoTimer);
    if (!playing || held || !inView || reduce) return;
    autoTimer = window.setTimeout(() => {
      if (playing && !held && inView) goTo(index + 1, false);
    }, DWELL);
  };

  const offsetOf = (i: number) => slides[i].offsetLeft - slides[0].offsetLeft;

  const goTo = (target: number, announce = true) => {
    const next = (target + slides.length) % slides.length;
    window.clearTimeout(autoTimer);
    window.clearTimeout(moveTimer);
    programmatic = true;
    setActive(next, announce);
    const left = offsetOf(next);
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(moveTimer);
      track.scrollLeft = left;
      track.style.scrollSnapType = '';
      programmatic = false;
      armAuto();
    };
    if (reduce || Math.abs(track.scrollLeft - left) < 2) {
      finish();
      return;
    }
    track.style.scrollSnapType = 'none';
    const from = track.scrollLeft;
    const started = performance.now();
    const duration = 480;
    const step = () => {
      if (!programmatic) return;
      const progress = Math.min(1, (performance.now() - started) / duration);
      const eased = 1 - (1 - progress) ** 3;
      track.scrollLeft = from + (left - from) * eased;
      if (progress < 1) moveTimer = window.setTimeout(step, 16);
      else finish();
    };
    moveTimer = window.setTimeout(step, 16);
  };

  const nearest = () => {
    const left = track.scrollLeft;
    let best = 0;
    let gap = Infinity;
    slides.forEach((_, i) => {
      const d = Math.abs(offsetOf(i) - left);
      if (d < gap) {
        gap = d;
        best = i;
      }
    });
    return best;
  };

  track.addEventListener(
    'scroll',
    () => {
      if (programmatic) return;
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => setActive(nearest(), true));
    },
    { passive: true },
  );
  track.addEventListener('scrollend', () => {
    if (programmatic) return;
    setActive(nearest(), true);
    armAuto();
  });

  root.querySelector('[data-reel-prev]')?.addEventListener('click', () => goTo(index - 1));
  root.querySelector('[data-reel-next]')?.addEventListener('click', () => goTo(index + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
  slides.forEach((slide, i) =>
    slide.addEventListener('click', () => {
      if (i !== index) goTo(i);
    }),
  );

  track.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(index + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(index - 1);
    }
  });

  toggle?.addEventListener('click', () => {
    playing = !playing;
    root.classList.toggle('is-paused', !playing);
    toggle.setAttribute('aria-pressed', String(!playing));
    toggle.setAttribute('aria-label', playing ? 'Pausar el carrusel' : 'Reanudar el carrusel');
    restartFill();
    armAuto();
  });

  const releaseMove = () => {
    window.clearTimeout(moveTimer);
    programmatic = false;
    track.style.scrollSnapType = '';
  };

  root.addEventListener('pointerenter', () => {
    releaseMove();
    held = true;
    syncHold();
  });
  root.addEventListener('pointerleave', () => {
    held = root.contains(document.activeElement);
    syncHold();
  });
  root.addEventListener('focusin', () => {
    held = true;
    syncHold();
  });
  root.addEventListener('focusout', (event) => {
    if (!root.contains(event.relatedTarget as Node | null)) {
      held = root.matches(':hover');
      syncHold();
    }
  });

  if ('IntersectionObserver' in window) {
    const stage = root.querySelector('.reel-stage') ?? root;
    new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        root.classList.toggle('is-visible', inView);
        syncHold();
      },
      { threshold: 0 },
    ).observe(stage);
  } else {
    inView = true;
  }

  if (reduce) root.classList.add('is-paused');
  syncHold();
  restartFill();
}

function boot() {
  document.querySelectorAll<HTMLElement>('[data-reel]:not([data-bound])').forEach(initReel);
}

boot();
document.addEventListener('astro:page-load', boot);
