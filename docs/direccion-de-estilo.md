# Dirección de estilo

Referencia: hero v8, aprobado por el equipo de diseño (octubre 2026). El archivo de trabajo era `hero.html` con la fotografía, el logo y Always Classy. Esta guía es la que debe seguir cualquier página nueva. La muestra viva, no indexada, está en `/estilo`.

## Concepto

Pastelería botánica. Un campo de color blush, un bodegón de productos entre flores y una voz cercana que habla de ciencia sin ponerse dura. El sitio se siente amplio: mucho aire, pocos bordes, una sola acción rosa por zona. La fotografía hace el trabajo decorativo. No se le suman texturas, ilustraciones nuevas ni una segunda paleta.

La frase de marca es «Eres tu mejor inversión». Se escribe en Nunito, no en la script: Always Classy no tiene tildes.

## Paleta

| Nombre        | Token         | Hex       | Sobre qué va                         | Contraste                               |
| ------------- | ------------- | --------- | ------------------------------------ | --------------------------------------- |
| Blush         | `--blush`     | `#F4BEBC` | Fondo de la página                   | —                                       |
| Crema         | `--cream`     | `#FFF8F2` | Tarjetas, pastilla, aviso de cookies | —                                       |
| Tinta         | `--ink`       | `#303236` | Texto, pie, botón Ingresar           | 7.91:1 sobre blush, 12.21:1 sobre crema |
| Tinta suave   | `--ink-soft`  | `#3E4044` | Bajadas y microcopy                  | 6.40:1 sobre blush, 9.87:1 sobre crema  |
| Rosa          | `--rose`      | `#E06A78` | Botón principal                      | Blanco encima: 3.23:1                   |
| Rosa profundo | `--rose-deep` | `#B5606C` | Círculo del ícono de reproducción    | Blanco encima: 4.33:1                   |
| Rosa tinta    | `--rose-ink`  | `#7E434B` | Rótulos pequeños y notas TODO        | 7.15:1 sobre crema, 4.63:1 sobre blush  |
| Hoja          | `--leaf`      | `#536E58` | Firma en script                      | 5.34:1 sobre crema, 3.46:1 sobre blush  |

El blanco sobre `#E06A78` solo cumple AA como texto grande: 19px y peso 800, que es el botón `.btn-primary`. No se usa ese rosa para texto de cuerpo, enlaces ni rótulos chicos. Para eso está `--rose-ink`.

`--leaf` no se usa como texto sobre blush salvo en un titular grande. La firma «Ven, te enseño.» va dentro de la pastilla crema.

El foco visible es un anillo de 3px en tinta, o en crema cuando el fondo es el pie oscuro.

## Tipografía

Todas self-hosted, con `font-display: swap`. No se llama a Google Fonts.

- **Nunito** (300, 400, 600, 700, 800). Titulares en 300, con tracking `-0.02em`. Navegación y botones en 700–800. Cuerpo en 400, 17px, interlineado 1.6.
- **Contrail One**. Solo cifras, precios y las cuatro palabras cortas de la fila de datos del hero.
- **Always Classy**. Una o dos palabras, nunca una frase. El archivo está en `src/fonts/AlwaysClassy.woff2`. El juego es ASCII: no tiene á, é, í, ó, ú ni ñ. «naturales» puede ir en script. «Ven, te enseño.» usa la script y dibuja la virgulilla de la eñe en CSS, con el texto real en un equivalente para el lector de pantalla.

Escala de la portada, tomada del mockup en 1440px: titular 40px, script 74px, bajada 16px, ceja 11.5px con tracking `0.26em`. En móvil el titular baja a 30px y la script a 54px.

## Espaciado, radios y sombra

- Escenario: `--stage: 90rem` (el lienzo de 1440px).
- Columna: `--content: 76rem`.
- Margen: `--gutter: clamp(1.375rem, 7.8vw, 7rem)`. En 1440px son 112px, el margen del mockup.
- Cabecera: 112px en escritorio, 72px bajo 1080px.
- Secciones: `clamp(3.5rem, 8vw, 6.5rem)` arriba y abajo. Se alterna blush y crema. No se apilan cajas sin aire.
- Radios: píldora `99px` en botones, navegación y campos. Tarjetas `1.5rem`.
- Sombra del botón rosa: `0 16px 30px -12px rgb(224 106 120 / 65%)`.
- Sombra de tarjeta y pastilla: `0 10px 24px -16px rgb(48 50 54 / 30%)`.
- Líneas: 22% y 14% de tinta. No sustituyen el contraste de un control.

## Fotografía

- Escritorio: `fondo.jpg`, bodegón completo, `object-fit: cover`, sin recorte que tape el texto. El texto vive en la zona rosa de la izquierda.
- Móvil: `podios.jpg`, altura 300px, máscara que se desvanece arriba y abajo, anclada hacia la derecha (`68% 70%`).
- Retrato de Camila: `camila.jpg`. En la pastilla es un círculo de 48px con `object-position: center 14%`. En Quiénes somos es un retrato 4:5.
- Hoja lineal: `public/brand/rama.svg`, decorativa, girada −14°, solo en escritorio.
- No se publican fotos de alumnas, de talleres ni de stock mientras no haya autorización. El hueco se marca con TODO.
- Open Graph: `public/og/hero.jpg`, derivado del bodegón.

## Componentes

Misma pieza en todas las páginas. No se recrean en la hoja de cada vista.

- `Button`: `primary` (rosa), `ink` (Ingresar), `line` (secundario con borde), `text` (subrayado). Acepta `utm` y arma `utm_content` sin perder el ancla.
- `SectionHeading`: ceja, título en el slot y bajada.
- `Separator`: filete horizontal.
- `Todo`: nota con la palabra TODO. Es el único modo de marcar un dato que falta.
- `Reveal`: envuelve una tarjeta para el revelado al scroll.
- `CatalogGrid`: las seis tarjetas del catálogo real.

## Movimiento

Un solo lenguaje, corto y fácil de apagar.

- **Intro.** El logo aparece en 0.8 segundos (opacidad y 6px). No hay velo a pantalla completa. La foto del hero no se anima, para no retrasar el LCP. En la navegación siguiente del cliente no se repite (`intro-done`).
- **Scroll.** `[data-reveal]` entra 16px más abajo, en 0.7s, sin bajar la opacidad: un fundido dejaría el texto bajo el contraste mínimo a mitad de camino. `IntersectionObserver` añade `.is-in`. En una grilla, el segundo, tercero y cuarto elemento esperan 80ms más cada uno. Sin JavaScript el bloque se ve igual (`@media (scripting: none)`).
- **Páginas.** `<ClientRouter />` funde la vista: 180ms la que sale, 280ms la que entra, en la hoja global. No se nombra la transición de un elemento, porque Astro inyectaría un `<style>` y la CSP no permite estilo en línea. El aviso de cookies persiste entre páginas.
- **Hover.** El botón rosa sube 2px. Las tarjetas de una grilla, 3px. Nada más.

`prefers-reduced-motion: reduce` deja todo quieto y visible: sin intro, sin revelado, sin fundido, sin hover.

## Qué hacer

- Usar los tokens. Si hace falta un color nuevo, se agrega aquí y en `/estilo` antes de usarlo en una página.
- Dejar una sola acción rosa por bloque. Lo demás es tinta, subrayado o borde.
- Marcar con TODO precios, URLs, fechas, nombres y fotos que no estén confirmados.
- Poner `utm_content` en cada llamado a la acción, con el id del copy.
- Medir el contraste si el texto cambia de tamaño o de fondo. El rosa del botón no perdona un cuerpo de 16px.
- Optimizar fotos con `astro:assets`, con ancho y alto explícitos.

## Qué no hacer

- No volver a la paleta salvia, bosque o mantequilla del primer armado, salvo el aviso legal, que sigue en amarillo para distinguirse.
- No usar Always Classy en frases con tilde o eñe.
- No poner texto blanco sobre `#E06A78` por debajo de 19px en peso 800.
- No animar la imagen principal ni cubrirla con una intro.
- No agregar librerías de animación, contadores, promesas de ingresos ni precios que no estén en el copy.
- No publicar una foto de alumna sin autorización, ni un video con un botón de play que no reproduce nada.
- No cargar fuentes ni scripts de terceros. La analítica sigue detrás del aviso de cookies.
