# Arquitectura

## Decisiones de la v1

El sitio usa Astro 7 con TypeScript estricto y salida estática. La integración de React queda instalada para islas futuras, pero la v1 no hidrata ninguna: el aviso de cookies es HTML más un módulo empaquetado por Astro (`src/components/CookieBanner.astro`). Así la CSP no necesita `unsafe-inline`. `assetsInlineLimit: 0` evita que Vite incruste ese módulo (o las fuentes) dentro del HTML. El menú móvil es un `<details>` y no necesita JavaScript.

Eso mantiene el HTML en el servidor de build, el paquete del cliente chico y un camino claro para hidratar más adelante únicamente lo que haga falta.

`astro.config.ts` fija `output: 'static'` y `site: 'https://sororite.cl'`. Cada página exporta `prerender = true`. Cuando exista un adapter, esas páginas siguen siendo estáticas aunque el modo de salida pase a servidor.

## Contenido

`src/content.config.ts` define la colección `cursos` con el cargador `glob` y el esquema de `src/content/curso-schema.ts`. Astro valida el frontmatter en el build. Vitest vuelve a validar los Markdown para que un curso mal formado falle aunque nadie abra el sitio.

La ficha `/cursos/[slug]` sale de `getStaticPaths`. El slug lo declara el frontmatter y debe coincidir con el archivo.

`example: true` hace tres cosas: muestra un aviso visible, pone `noindex` y omite la oferta del JSON-LD. El objeto `Course` igual se emite, para tener el marcado listo. Con `example: false` la ficha se indexa y, si corresponde, incluye `Offer`.

Los textos que no son un curso están en `src/data/` y, en la portada, en los componentes de la landing. El catálogo real de seis cursos está en `src/data/catalog.ts`. No entra a la colección de contenido porque el esquema exige una URL `https` de Hotmart y esas URLs todavía no existen. Las dos fichas Markdown siguen siendo el fixture del esquema.

## SEO y redirecciones

`src/layouts/BaseLayout.astro` arma título, descripción, canónica, Open Graph y un grafo schema.org. La organización va en todas las páginas. La ficha de curso agrega `Course`.

`@astrojs/sitemap` genera el sitemap. Quedan fuera las fichas cuyo slug empieza por `ejemplo-`, los borradores legales, `/estilo` y `/ingresar`, porque esas páginas van con `noindex`. Un curso real no debe usar ese prefijo. `public/robots.txt` declara el sitemap.

`vercel.json` responde 301 a las rutas del WordPress que estaba en producción el 20 de octubre de 2026 (páginas, productos, cursos de Edwiser, categorías y dos noticias). El inventario pedido (`inventario-wp.md`) no estaba entre los archivos del entorno: el mapa salió del sitemap público de sororite.cl.

Mientras el catálogo nuevo no exista, los productos y los cursos viejos caen en `/cursos`, no en una ficha concreta. `/mi-cuenta`, `/user-account` y `/eb-my-courses` caen en `/contacto`, porque todavía no hay sesión. Cuando haya fichas reales, esas reglas se afinan una a una.

## Analítica

`src/lib/analytics.ts` solo crea los scripts si el identificador cumple un patrón (`G-`… o dígitos) y si la persona eligió «Aceptar». La decisión queda en `localStorage` (`sororite-consent`). Rechazar no bloquea la navegación. Cambiar de opinión recarga la página para soltar scripts que ya se hubieran inyectado.

No hay píxel en `<noscript>`: eso dispararía analítica sin consentimiento.

## Cabeceras

La CSP permite los dominios de Google Analytics y del píxel de Meta porque el navegador las aplica igual, haya o no consentimiento. El consentimiento decide si el script se inserta. `frame-ancestors 'none'` evita que el sitio se embeba. HSTS pide dos años e incluye subdominios; no se manda el token `preload` para no comprometer el dominio antes de revisarlo.

`payment=()` en Permissions-Policy cierra la API de pagos del navegador en la v1. Hay que revisarla cuando exista la pasarela propia.

## Cómo se enchufa la v2

1. Instalar `@astrojs/vercel` o `@astrojs/node`.
2. Cambiar `output` a `'server'` en `astro.config.ts`.
3. Dejar `export const prerender = true` en las páginas de marketing. Ya está.
4. Crear rutas bajo demanda con `export const prerender = false`, por ejemplo `src/pages/api/checkout.ts` o `src/pages/cuenta/`.
5. Guardar secretos solo en el entorno del servidor: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE`, secreto del webhook. Nada de eso lleva prefijo `PUBLIC_`.
6. El precio que se cobra lo lee el servidor desde la colección o desde la base. El cliente no lo fija.
7. El webhook verifica la firma antes de marcar un pago.

Supabase puede guardar usuarias y compras. La colección de cursos sigue siendo el catálogo público.

## Cómo se enchufa la v3

- Puntos: una tabla de movimientos (suma y resta), no un saldo que se edite directo. El saldo se calcula.
- LMS: otra colección, por ejemplo `lecciones`, separada de la ficha comercial. El progreso vive en Supabase y las rutas del aula usan `prerender = false` con la sesión de la v2.

Esas piezas no están esbozadas en código para no dejar endpoints vacíos que parezcan activos.

## Sistema de diseño

La referencia es el hero v8 (`hero.html` del equipo de diseño). `src/styles/global.css` declara los tokens y `docs/direccion-de-estilo.md` explica cómo usarlos. La página `/estilo` los muestra y va con `noindex`; el sitemap también la excluye, igual que `/ingresar`.

Tokens principales:

| Token        | Valor     | Uso                                                                                                      |
| ------------ | --------- | -------------------------------------------------------------------------------------------------------- |
| `--blush`    | `#F4BEBC` | Fondo                                                                                                    |
| `--cream`    | `#FFF8F2` | Tarjetas, pastilla del video, selección                                                                  |
| `--ink`      | `#303236` | Texto, botón Ingresar, pie                                                                               |
| `--ink-soft` | `#3E4044` | Bajadas                                                                                                  |
| `--rose`     | `#E06A78` | CTA principal, solo con texto blanco grande (19px, peso 800): contraste 3.23:1, válido como texto grande |
| `--rose-ink` | `#7E434B` | Microtexto. Sobre crema da 7.15:1 y sobre blush 4.63:1                                                   |
| `--leaf`     | `#536E58` | Script sobre crema (5.34:1). No va sobre blush en texto chico                                            |

El escenario mide `90rem` (1440px) y el contenido `76rem`, con un margen `--gutter` de `clamp(1.375rem, 7.8vw, 7rem)`. En 1440px ese margen es 112px, el mismo del mockup.

Tipografía, self-hosted y con `font-display: swap`: Nunito (300, 400, 600, 700, 800) para texto y titulares, Contrail One para cifras, Always Classy en `src/fonts/AlwaysClassy.woff2` para una o dos palabras sin tilde. La fuente script no trae eñe ni acentos.

Las fotos (`src/assets/hero/`) pasan por `getImage` de `astro:assets` (WebP y AVIF, medidas explícitas). El hero de escritorio usa el bodegón completo; el móvil recorta los podios. No se anima la foto: es el candidato a LCP.

## Movimiento

Tres gestos, el mismo en todas las páginas:

1. Intro del logo, 0.8s, solo CSS, solo en la primera carga. No tapa la fotografía.
2. Revelado al entrar en pantalla: `IntersectionObserver` en `src/scripts/motion.ts` añade `.is-in` a `[data-reveal]`. El gesto es un desplazamiento de 16px, sin fundido, para que el texto no pierda contraste a mitad de la animación. Sin JavaScript el contenido sigue visible (`scripting: none`).
3. Transición entre páginas con `<ClientRouter />` de Astro, fundido de 180–280ms definido en la hoja global. No se nombra una transición por elemento: eso inyectaría un `<style>` y chocaría con la CSP. El aviso de cookies usa `transition:persist`.

`prefers-reduced-motion: reduce` anula animaciones y transiciones. La clase `intro-done` evita que el logo se vuelva a animar en cada navegación del cliente.

Componentes compartidos: `Button`, `SectionHeading`, `Separator`, `Todo`, `Reveal` y `CatalogGrid`.
