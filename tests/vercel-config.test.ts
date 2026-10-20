import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const config = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8')) as {
  headers: { source: string; headers: { key: string; value: string }[] }[];
  redirects: { source: string; destination: string; statusCode: number }[];
};

const headerMap = new Map(config.headers[0]?.headers.map((header) => [header.key, header.value]));

describe('vercel.json', () => {
  it('define las cabeceras de seguridad pedidas', () => {
    expect(headerMap.get('Content-Security-Policy')).toContain("frame-ancestors 'none'");
    expect(headerMap.get('Strict-Transport-Security')).toMatch(/max-age=\d+/);
    expect(headerMap.get('Referrer-Policy')).toBe('strict-origin-when-cross-origin');
    expect(headerMap.get('Permissions-Policy')).toContain('camera=()');
    expect(headerMap.get('Content-Security-Policy')).not.toContain('unsafe-inline');
    expect(headerMap.get('Content-Security-Policy')).not.toContain('unsafe-eval');
  });

  it('redirige con 301 las rutas viejas de WordPress', () => {
    const sources = config.redirects.map((redirect) => redirect.source);
    for (const path of [
      '/quienes-somos/',
      '/galeria/',
      '/cursos/',
      '/contacto/',
      '/noticias',
      '/tienda',
      '/carrito',
      '/mi-cuenta',
      '/eb-courses',
    ]) {
      expect(sources).toContain(path);
    }
    expect(config.redirects.every((redirect) => redirect.statusCode === 301)).toBe(true);
    expect(config.redirects.every((redirect) => redirect.destination.startsWith('/'))).toBe(true);
  });
});

describe('entorno de ejemplo', () => {
  it('deja vacíos los identificadores de analítica', () => {
    const example = readFileSync(new URL('../.env.example', import.meta.url), 'utf8');
    expect(example).toMatch(/PUBLIC_GA4_MEASUREMENT_ID=\s*(?:\n|$)/);
    expect(example).toMatch(/PUBLIC_META_PIXEL_ID=\s*(?:\n|$)/);
  });
});
