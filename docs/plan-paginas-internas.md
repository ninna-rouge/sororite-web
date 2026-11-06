# Plan: diseño de las páginas internas

Objetivo: que Cursos, Quiénes somos, Contacto, Galería, Ingresar, la ficha de curso, el 404 y los legales tengan el mismo nivel que la página de inicio. Mismo lenguaje, mismas piezas, mismo cuidado.

La regla es una: **no se inventa un estilo nuevo por página. Se reutilizan los componentes de la home y se arma cada página con ellos.**

---

## 1. Diagnóstico

### Qué hace premium a la home

| Elemento                                                                        | Dónde está hoy                         |
| ------------------------------------------------------------------------------- | -------------------------------------- |
| Titular con palabra destacada (`hl-coral`, `hl-hoja`, `hl-durazno`, `hl-brush`) | Todas las secciones de `Landing.astro` |
| Cards perla: degradado crema, borde fino, sombra rosada suave                   | Pack, mitos, cursos, cierre            |
| Tres tonos por tarjeta: coral, hoja, durazno                                    | `CatalogGrid`, `TrustBoard`, mitos     |
| Íconos lineales de 24 px, trazo 1.5, dentro de un círculo de tono suave         | `TrustBoard`, pack, temario de cursos  |
| Botánica de marca: `marca-hojas.svg`, kit del cierre, pétalo y palma de fondo   | Cierre, fondo, reverso de cursos       |
| Fotos y video reales en marcos con borde interior crema                         | Hero, cursos, respaldo, creaciones     |
| Interacción con sentido: giro de card, lista con vista previa, carrusel         | Mitos, pack, cursos, creaciones        |
| Ritmo: secciones alternas `band-cream` con aire generoso                        | Toda la home                           |

### Qué falla en el resto

| Página                  | Problema principal                                                                                                                                                                                                      |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Quiénes somos           | Una pared de texto: seis párrafos seguidos en "Nuestra historia". El retrato es chico. Las cards de misión, valores y metodología son genéricas, sin íconos ni tono. No hay ninguna foto del taller ni de la comunidad. |
| Cursos                  | El encabezado es solo texto. Abajo aparece un bloque de "fichas de ejemplo del esquema" que es interno y no debería verse.                                                                                              |
| Ficha de curso `[slug]` | Usa una imagen SVG de ejemplo. No tiene temario visual, ni para quién es, ni precio destacado, ni cierre.                                                                                                               |
| Contacto                | Una lista con RUT y giro mezclada con los canales. Talleres es una card plana, sin fechas. No hay mapa, horario ni foto.                                                                                                |
| Galería                 | Página vacía a propósito, sin diseño de espera.                                                                                                                                                                         |
| Ingresar                | Un título y dos botones. No explica los pasos.                                                                                                                                                                          |
| 404                     | Texto y dos botones, sin marca.                                                                                                                                                                                         |
| Legales                 | Texto largo sin índice ni navegación.                                                                                                                                                                                   |

Causa técnica de fondo: `global.css` tiene más de 5.500 líneas con capas superpuestas ("v1", "v2", "v3"). Las páginas internas heredan reglas pensadas para la home y es difícil tocarlas sin romper algo.

---

## 2. Sistema común (se hace primero)

Son piezas nuevas en `src/components/`, construidas con los estilos que ya existen en la home.

| Componente    | Qué es                                                                                                                                                                                                        | Reutiliza                                            |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `PageHero`    | Encabezado interno: eyebrow, H1 con palabra destacada, lede, miga de pan, foto o video a la derecha en marco perla y una pieza botánica que sale del marco. Variante `compacta` para Ingresar, 404 y legales. | Marco de `course-stage`, `hl-*`, botánica del cierre |
| `FeatureGrid` | Grilla de 2 a 4 cards con ícono, kicker, título y texto, en los tres tonos.                                                                                                                                   | `TrustBoard` (`tb-note`, `tb-ico`)                   |
| `MediaSplit`  | Foto o video a un lado y texto al otro, con número de sección y cita opcional. Se puede invertir.                                                                                                             | `#camila` de la home                                 |
| `Timeline`    | Línea de tiempo horizontal en escritorio y vertical en móvil. Cada hito tiene año, título, una línea y un punto del tono. Se revela al hacer scroll.                                                          | `data-reveal`, tonos                                 |
| `QuoteBand`   | Franja de cita grande, con comillas en Always Classy (sin tildes), firma y hoja de marca de fondo.                                                                                                            | `hl-brush`, `marca-hojas.svg`                        |
| `StatStrip`   | 3 o 4 cifras (3.500 estudiantes, desde 2018, ISP N° 2931/22, 6 cursos).                                                                                                                                       | `hero-side .stat`                                    |
| `CtaCierre`   | El cierre "Eres tu mejor inversión" extraído de la home, para usarlo al final de cada página.                                                                                                                 | `#cierre` de `Landing.astro`                         |
| `ChannelCard` | Card de canal de contacto: ícono, canal, dato, acción y tiempo de respuesta.                                                                                                                                  | Botones y tonos                                      |
| `FaqList`     | Acordeón de preguntas, el mismo de la home, alimentado por datos.                                                                                                                                             | FAQ de la home                                       |
| `EmptyState`  | Estado de espera con marco floral, mensaje y acción. Para Galería y secciones sin datos todavía.                                                                                                              | `marco-floral.svg`                                   |
| `ImageSlot`   | Espacio reservado para una imagen que falta: mismo marco y proporción que la final, fondo de tono e ícono. Sin etiqueta de pendiente en el sitio. Se cambia por la foto sin tocar el diseño.                  | Marco de foto                                        |

Reglas del sistema:

1. Un H1 por página, con una sola palabra destacada.
2. Una acción rosa por bloque. El resto va como línea o texto.
3. Secciones alternas: normal y `band-cream`.
4. Iconos: un solo set de 24×24, trazo 1.5, en `src/data/icons.ts`. Hoy están copiados en `TrustBoard`, `Footer` y `CatalogGrid`; se unifican ahí.
5. Sin estilos en línea: la CSP solo permite `style-src 'self'`.
6. Cada componente trae su CSS en un archivo propio (`src/styles/kit/*.css`; lo propio de una página va en `src/styles/paginas/*.css`) para no seguir creciendo `global.css`.

---

## 3. Plan por página

### 3.1 Quiénes somos (prioridad alta)

Orden propuesto:

1. **`PageHero`**: "Una historia de _autonomía_, ciencia y empoderamiento femenino." Foto: `11-cuatro-mujeres-riendo-circulo.jpg`. Ramo del kit saliendo del borde.
2. **`StatStrip`**: 3.500 estudiantes · Desde 2018 · Laboratorio ISP N° 2931/22 · Capital Abeja 2023.
3. **`MediaSplit` "Nuestra historia"**: retrato grande de Camila (`camila.jpg`) y solo dos párrafos. El resto de la historia pasa al punto 4.
4. **`Timeline`**: 2015 Lahuen · 2016 Sororité.cl · 2018 capacitaciones · 2021 formalización y resolución sanitaria · 2023 velas y aromaterapia · 2026 3.500 estudiantes.
5. **`FeatureGrid` "Propósito"**: Misión, Visión y Promesa, con íconos (brújula, horizonte, manos) y los tres tonos.
6. **`QuoteBand`**: «Invertir en ti no es egoísmo: es el primer paso para transformar tu vida y la de tu familia.» — Camila.
7. **"Cómo enseñamos"**: tres cards que giran como las de mitos. Frente: Ciencia / Naturaleza / Emprendimiento con foto. Reverso: el detalle. Fotos: `10-proceso-corte-jabon-taller.jpg`, `Skincare_products_on_stone_surface…`, `04-duo-bolsas-mural.png`.
8. **"Valores"**: cuatro cards con ícono (sin tóxicos, IFRA/ECOCERT, proveedores locales, sororidad).
9. **"En medios"**: logos o nombres en tinta suave: Radio U. de Chile, LUN, TVN, Sercotec.
10. **`CtaCierre`**.

### 3.2 Cursos (prioridad alta)

1. **`PageHero`** con video (`/hero/atelier.mp4` o `cosmetica.mp4`): "Elige el curso que _más te mueva_ hoy."
2. **Filtro por objetivo**: chips Empezar · Formular · Vender · Formalizar. Filtran la grilla con animación y sin recargar.
3. **`CatalogGrid`** actual, con las cards que giran al temario.
4. **Banda del pack**: versión corta del bloque `#oferta` (precio, ahorro, CTA).
5. **"¿Cómo funciona la compra?"**: tres pasos con ícono (eliges → pagas en Hotmart → te llega el acceso al correo).
6. **`FaqList`** de compra y acceso.
7. **`CtaCierre`**.
8. Las "fichas de ejemplo del esquema" se quitan de la página pública.

### 3.3 Ficha de curso `[slug]` (prioridad media)

1. **`PageHero`** con el video del curso, la miga de pan y la meta (modalidad, duración, nivel).
2. **Columna fija de compra** en escritorio: precio, CTA de Hotmart, "pago seguro" y garantía de 7 días. En móvil, una barra inferior.
3. **"Para quién es"** y **"Qué vas a lograr"** con `FeatureGrid`.
4. **Temario** como acordeón por módulos, con los mismos íconos del reverso de las cards.
5. **Camila** en `MediaSplit` corto.
6. **Testimonios** del curso (componente de la home).
7. **`FaqList`** y **`CtaCierre`**.

### 3.4 Contacto y talleres (prioridad alta)

1. **`PageHero` compacto**: "Conversemos. Te respondemos por el _mismo canal_."
2. **Dos `ChannelCard`** grandes: WhatsApp y correo, con el tiempo de respuesta y un botón que abre el canal con un mensaje listo.
3. **"Talleres presenciales"** en `MediaSplit`: foto `06-proceso-taller-mural.png`, sedes Providencia y Puente Alto en dos cards con ícono de ubicación y un espacio `ImageSlot` para el calendario de fechas.
4. **"Antes de escribir"**: `FaqList` corta (acceso a cursos, pagos, talleres).
5. **Datos legales** (razón social, RUT, giro) en una línea pequeña al final, fuera de los canales.

### 3.5 Galería (prioridad media)

1. **`PageHero` compacto**: "Hecho por _nuestras alumnas_."
2. **Grilla mosaico** con filtros (Jabones · Cosmética · Velas · Talleres) y visor a pantalla completa con teclado (flechas y Escape).
3. Mientras no haya fotos autorizadas: **`EmptyState`** con marco floral y llamado "¿Hiciste un producto en un curso? Envíanos tu foto".
4. Opcional, si Camila lo autoriza: una sección "En el taller" con las fotos de comunidad que ya existen.

### 3.6 Ingresar (prioridad baja)

1. **`PageHero` compacto**: "Tu acceso llega _por correo_."
2. **Tres pasos con ícono**: compras → Hotmart te envía el correo → entras al aula.
3. Card "¿No te llegó?": revisa spam y promociones, y un botón a WhatsApp.
4. Botón del aula de Hotmart cuando exista la URL.

### 3.7 404 (prioridad baja)

Marco floral, logo, "Esta página _no existe_", buscador de cursos con tres accesos rápidos (Cursos, Quiénes somos, Contacto) y la hoja de marca animada suave.

### 3.8 Legales (prioridad baja)

Términos y Privacidad: índice fijo a la izquierda en escritorio, secciones numeradas, fecha de versión y el aviso legal en una card amarilla (la única excepción de color, como ya dice la guía de estilo).

---

## 4. Imágenes

### Disponibles y dónde van

| Archivo                                       | Uso propuesto                            |
| --------------------------------------------- | ---------------------------------------- |
| `assets/hero/camila.jpg`                      | Quiénes somos (historia), ficha de curso |
| `fotos…/11-cuatro-mujeres-riendo-circulo.jpg` | Hero de Quiénes somos                    |
| `fotos…/12-seis-mujeres-circulo-negro.jpg`    | Banda de comunidad, Quiénes somos        |
| `fotos…/06-proceso-taller-mural.png`          | Talleres en Contacto                     |
| `fotos…/10-proceso-corte-jabon-taller.jpg`    | "Cómo enseñamos": Ciencia                |
| `fotos…/Skincare_products_on_stone_surface…`  | "Cómo enseñamos": Naturaleza             |
| `fotos…/04-duo-bolsas-mural.png`              | "Cómo enseñamos": Emprendimiento         |
| `fotos…/02-equipo-mural-circulo.png`          | Valores: sororidad                       |
| `assets/creaciones/01…04`                     | Ficha de curso: "Así se ve una clase"    |
| `public/cursos/*.mp4` y pósteres              | Hero de Cursos y de cada ficha           |
| `public/brand/pack/*`                         | Banda del pack en Cursos                 |
| `public/brand/botanica/*` y kit `cierre/`     | Bordes, separadores, estados vacíos      |

### Por generar (se deja el `ImageSlot` con esta medida)

| Imagen                               | Página                    | Proporción | Indicación                                                               |
| ------------------------------------ | ------------------------- | ---------- | ------------------------------------------------------------------------ |
| Laboratorio con resolución sanitaria | Quiénes somos, Valores    | 4:3        | Mesa de trabajo limpia, frascos ámbar, luz natural, paleta blush y crema |
| Materias primas en flat lay          | Quiénes somos, Naturaleza | 1:1        | Arcillas, aceites, hojas secas sobre travertino                          |
| Sede Providencia y sede Puente Alto  | Contacto                  | 16:9       | Fotos reales del espacio; no se generan con IA                           |
| Aula en pantalla (mockup)            | Ingresar                  | 16:10      | Laptop con una clase en pausa, mano con frasco al lado                   |
| Portada por curso para la ficha      | `[slug]`                  | 16:9       | Misma dirección de arte que los pósteres de video                        |
| Productos de alumnas                 | Galería                   | 4:5        | Solo fotos reales y autorizadas                                          |

Regla: las fotos de personas, sedes y alumnas son reales. Solo se generan bodegones, texturas y mockups.

---

## 5. Interacción y movimiento

1. Entrada por scroll con `data-reveal`, una vez y en 0.7 s, como en la home.
2. Giro de card solo donde haya frente y reverso con sentido (Cómo enseñamos, cursos).
3. Filtros con transición de opacidad y posición, sin recargar la página.
4. Hover: sube 3 px y el borde toma el tono. Nada más.
5. Todo funciona con teclado (Tab, Enter y Escape) y respeta `prefers-reduced-motion`.
6. Sin JavaScript, el contenido se lee completo: las cards giratorias muestran frente y reverso uno debajo del otro.

---

## 6. Fases

| Fase | Contenido                                                                      | Resultado                                   |
| ---- | ------------------------------------------------------------------------------ | ------------------------------------------- |
| 0    | Íconos en `icons.ts`, CSS por componente, `CtaCierre` extraído de la home      | Base ordenada, sin cambios visibles         |
| 1    | `PageHero`, `FeatureGrid`, `MediaSplit`, `QuoteBand`, `StatStrip`, `ImageSlot` | Kit listo y visible en `/estilo`            |
| 2    | Quiénes somos                                                                  | Primera página nueva, se valida el lenguaje |
| 3    | Cursos y ficha de curso                                                        | Páginas de venta                            |
| 4    | Contacto y talleres                                                            | Canales claros                              |
| 5    | Galería, Ingresar, 404, legales                                                | Cierre del sitio                            |
| 6    | Revisión de contraste, móvil a 390 px, teclado y rendimiento                   | Entrega                                     |

Cada fase se revisa en el navegador en escritorio (1440) y móvil (390) antes de pasar a la siguiente.

## 7. Criterios de aceptación por página

- Se reconoce como Sororité sin ver el logo: tonos, botánica, titular destacado.
- Ningún bloque de texto pasa de tres párrafos seguidos sin un elemento visual.
- Cada sección tiene una idea y una acción.
- El contraste del texto cumple AA.
- El LCP no empeora: la imagen principal no se anima ni se oculta.
- Los datos sin confirmar no se publican ni se inventan. Quedan en `docs/plan-de-validacion.md`.

## 8. Decisiones (21-10-2026)

1. Las fotos de comunidad y del taller **se pueden usar** en Galería, Quiénes somos y Contacto.
2. Las sedes **todavía no tienen dirección**: las cards de Providencia y Puente Alto muestran solo la comuna. La dirección, si se confirma, va en `docs/plan-de-validacion.md` y después al sitio.
3. Las imágenes de la tabla 4 **no se generan por ahora**: quedan como `ImageSlot`.
4. El filtro de Cursos va **por objetivo**: Empezar · Formular · Vender · Formalizar.
