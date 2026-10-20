/**
 * El preview local es HTTP, así que la auditoría is-on-https no aplica aquí.
 * En producción el sitio va por HTTPS y vercel.json envía HSTS.
 * Los cursos de ejemplo están en noindex: no se auditan para no bajar SEO a propósito.
 */
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run preview -- --host 127.0.0.1 --port 4321',
      url: [
        'http://127.0.0.1:4321/',
        'http://127.0.0.1:4321/quienes-somos',
        'http://127.0.0.1:4321/cursos',
        'http://127.0.0.1:4321/galeria',
        'http://127.0.0.1:4321/contacto',
      ],
      numberOfRuns: 1,
      settings: {
        chromeFlags: '--no-sandbox --headless',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'is-on-https': 'off',
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci',
    },
  },
};
