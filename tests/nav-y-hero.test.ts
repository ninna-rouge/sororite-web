import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { headerNav, mobileNav } from '../src/data/site';

describe('navegación', () => {
  it('incluye Galería en escritorio y en móvil, una sola vez', () => {
    const desktop = headerNav.filter((item) => item.href === '/galeria');
    const mobile = mobileNav.filter((item) => item.href === '/galeria');
    expect(desktop).toHaveLength(1);
    expect(mobile).toHaveLength(1);
  });
});

describe('hero', () => {
  const source = readFileSync(new URL('../src/components/Hero.astro', import.meta.url), 'utf8');

  it('pinta el póster en el HTML y no descarga el video al parsear', () => {
    expect(source).toContain('fetchpriority="high"');
    expect(source).toContain('preload="none"');
    expect(source).toContain('data-src="/hero/atelier.mp4"');
    expect(source).not.toMatch(/<video[^>]*\sautoplay/);
    expect(source).toContain('prefers-reduced-motion');
  });
});

describe('respaldo', () => {
  const source = readFileSync(
    new URL('../src/components/TrustBoard.astro', import.meta.url),
    'utf8',
  );

  it('sigue apuntando al video público del taller, no a una foto sustituta', () => {
    expect(source).toContain('src="/respaldo/taller.mp4"');
    expect(source).toContain('poster="/respaldo/taller-poster.jpg"');
  });
});
