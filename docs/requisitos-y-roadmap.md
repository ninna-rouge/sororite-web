# Requisitos y roadmap

> El archivo original `requisitos-y-roadmap.md` no estaba en el repositorio ni en el entorno de trabajo al armar esta base. Este documento recoge el encargo de la versión 1, los estándares de calidad y seguridad pedidos, y el roadmap de las versiones 2 y 3. Si aparece el original, hay que sustituir este texto por ese archivo.

## Qué es el sitio

Sororité es una academia chilena de cosmética natural. Vende cursos en línea, hoy a través de Hotmart, y también informa de instancias presenciales. El sitio nuevo reemplaza al WordPress de sororite.cl.

La versión 1 es un sitio estático. No tiene cuentas, formulario con backend, pasarela propia, puntos ni aula.

## Alcance de la v1

Páginas:

- Inicio, con un hero de marca
- Quiénes somos
- Cursos, listado y ficha `/cursos/[slug]`
- Galería
- Contacto, con enlace a WhatsApp y correo, sin formulario
- Política de privacidad y términos, en borrador y marcados para revisión legal (Ley 21.719)
- 404

Los cursos viven en una colección de contenido con esquema: título, slug, modalidad (`online` o `presencial`), precio visible, URL de checkout de Hotmart, imagen, resumen y preguntas frecuentes. Hay dos fichas de ejemplo, marcadas como tales.

## Marca y accesibilidad

- Titulares en Contrail One y texto en Nunito, alojadas en el propio sitio
- Color y tono tomados del logo y del sitio vigente, hasta incorporar el mockup aprobado
- WCAG 2.2 nivel AA: contraste, foco visible, nombres accesibles, HTML semántico, navegación con teclado y diseño responsive

## SEO

- Título, descripción, canónica y Open Graph por página
- `Organization` en todo el sitio y `Course` en cada ficha
- Sitemap, `robots.txt` y redirecciones 301 de las URLs del WordPress anterior
- Las fichas con `example: true` usan `noindex` para no posicionar cursos falsos

## Analítica y privacidad

- Google Analytics 4 y el píxel de Meta solo después del consentimiento
- Los identificadores llegan por variables de entorno (`PUBLIC_GA4_MEASUREMENT_ID`, `PUBLIC_META_PIXEL_ID`)
- No se versionan secretos

## Seguridad

Cabeceras en `vercel.json`:

- Content-Security-Policy, incluida `frame-ancestors 'none'`
- HSTS
- Referrer-Policy
- Permissions-Policy
- `X-Content-Type-Options: nosniff` y `X-Frame-Options: DENY` como refuerzo

La CSP no permite `unsafe-inline` ni `unsafe-eval` en scripts. La analítica se carga desde el módulo propio del sitio.

## Calidad

- TypeScript estricto
- ESLint, Prettier, Vitest, Playwright con axe
- Lighthouse CI con meta de 90 o más en rendimiento, accesibilidad, buenas prácticas y SEO
- GitHub Actions en los pull requests: lint, tipos, tests y build
- Dependabot para npm y GitHub Actions

## Roadmap

### v1 (esta base)

Sitio estático, catálogo en Markdown, checkout externo en Hotmart, contacto por WhatsApp y correo.

### v2

- Autenticación con Supabase
- Pasarela de pago propia, con precios y webhooks solo en el servidor
- Algunas rutas dejan de ser estáticas. El resto sigue pre-renderizado

### v3

- Puntos de fidelización, como un libro de movimientos y no como un número editable a mano
- Aula (LMS): lecciones, progreso y rutas protegidas

El detalle de cómo se enchufan esas versiones está en `docs/arquitectura.md`.

## Fuera de alcance ahora

- Conectar o desplegar una cuenta real de hosting, analytics, Hotmart o Supabase
- Dar por cerrado el copy, la galería fotográfica o los textos legales
- Migrar el aula de Edwiser / WordPress
