# Sororité

Base estática del sitio [sororite.cl](https://sororite.cl): academia chilena de cosmética natural. Los cursos se venden, por ahora, en Hotmart. Esta versión no tiene cuentas, formulario ni pasarela propia.

## Requisitos

- Node.js 22 o superior

```bash
npm install
npm run dev
```

El sitio queda en `http://127.0.0.1:4321`.

## Scripts

| Comando             | Para qué                                                    |
| ------------------- | ----------------------------------------------------------- |
| `npm run dev`       | Servidor local                                              |
| `npm run typecheck` | Tipos de Astro y TypeScript                                 |
| `npm run lint`      | ESLint                                                      |
| `npm run format`    | Prettier                                                    |
| `npm test`          | Vitest: esquema de cursos, analítica y `vercel.json`        |
| `npm run build`     | Sitio estático en `dist/`                                   |
| `npm run preview`   | Sirve `dist/`                                               |
| `npm run test:e2e`  | Playwright y axe. Hace build y levanta el preview           |
| `npm run lhci`      | Lighthouse CI local. Antes hay que tener `dist/` construido |

## Sistema de diseño

La dirección visual sale del hero v8 aprobado. Los tokens (color, tipo, espaciado, radios y sombras) están en `src/styles/global.css`. La guía está en `docs/direccion-de-estilo.md` y se puede ver, sin indexar, en `/estilo`.

Botones, títulos de sección, tarjetas, separadores y notas TODO son componentes en `src/components/`. La intro del logo, el revelado al scroll y las transiciones de Astro se apagan con `prefers-reduced-motion`.

## Editar el contenido

La portada usa el copy de `src/components/Landing.astro`, `src/components/Hero.astro` y el catálogo de `src/data/catalog.ts`. Quiénes somos está en `src/pages/quienes-somos.astro`. El teléfono, el correo, el RUT de la empresa y las redes se cambian en `src/data/site.ts`.

Lo que falta (precios individuales, URLs de Hotmart, fotos de alumnas, video, calendario) está marcado con `TODO`. No se inventan precios ni datos.

Las fotos del hero y el retrato de Camila viven en `src/assets/` y se publican con `astro:assets`. El logo oficial también está en `public/brand/` para el favicon y el esquema.

Cada curso es un Markdown en `src/content/cursos/`. El esquema exige:

- `title`
- `slug` (igual al nombre del archivo, sin `.md`)
- `modality`: `online` o `presencial`
- `priceDisplay` (texto, por ejemplo `$30.000`)
- `hotmartCheckoutUrl` (URL `https`)
- `image` (ruta pública, por ejemplo `/cursos/foto.webp`)
- `summary`
- `faq` (lista de `question` y `answer`)
- `example`: `true` mientras sea una ficha de prueba; `false` cuando el curso sea real

Las dos fichas actuales son datos de ejemplo. No uses sus enlaces de pago: apuntan a `example.com`. Una ficha con `example: true` se publica con `noindex` para no indexar un curso falso. Al pasar a `example: false`, la ficha queda indexable y el JSON-LD incluye la oferta.

Las imágenes de marca van en `src/assets/` y se optimizan en el build. Un archivo suelto en `public/` solo hace falta si la URL tiene que ser estable, como el favicon o la imagen de Open Graph.

## Analítica

Copia `.env.example` a `.env` y completa, si corresponde:

```bash
PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXX
PUBLIC_META_PIXEL_ID=0000000000
```

Si quedan vacíos, no se carga ningún script. Aunque tengan valor, Google y Meta solo se inyectan después de pulsar «Aceptar» en el aviso de cookies. No subas `.env` al repositorio.

## Despliegue

El build es estático (`output: 'static'`) y `vercel.json` trae cabeceras de seguridad y redirecciones 301 del sitio WordPress anterior. No hay un proyecto de hosting conectado desde este repositorio: el despliegue se hace aparte, cuando se decida el dominio y la cuenta.

`npm run build` genera `dist/`. En un hosting estático hay que publicar esa carpeta y aplicar las mismas redirecciones y cabeceras si no se usa Vercel. El mapa está en `vercel.json` y se explica en `docs/arquitectura.md`.

## Calidad

Antes de pedir revisión:

```bash
npm run lint && npm run format:check && npm run typecheck && npm test && npm run build
```

La integración continua corre esos pasos en cada pull request. Un segundo job corre Playwright. Lighthouse CI queda configurado con meta 90 en las cuatro categorías y no se ejecuta en GitHub para no depender de un servicio externo.

## Documentos

- `docs/direccion-de-estilo.md`
- `docs/requisitos-y-roadmap.md`
- `docs/arquitectura.md`
- `CONTRIBUTING.md`
