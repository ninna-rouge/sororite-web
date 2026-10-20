# Cómo contribuir

La revisión de este repositorio la hace Giannina antes de integrar cambios en `main`. No agregues colaboradores desde el repositorio ni dejes nombres de bots en el código, en los mensajes de commit ni en la descripción de un pull request.

## Ramas

- Parte siempre de `main` actualizado.
- Una rama por cambio, con un nombre corto que diga de qué se trata.
- Prefiere pull requests pequeños: una página, un ajuste de contenido o un fix. Es más fácil de revisar que un cambio que mezcla diseño, cursos y configuración.

## Antes de abrir el pull request

```bash
npm run lint
npm run format:check
npm run typecheck
npm test
npm run build
```

Si el cambio se ve en el navegador, recorre también la página en móvil y en escritorio. `npm run test:e2e` cubre un humo de accesibilidad con axe.

## Qué no va en el repositorio

- `.env`, identificadores reales de analítica ni llaves de ninguna cuenta.
- Datos de pago, de alumnas o de Hotmart que no sean el enlace público de checkout.
- Trailers de coautoría ni usuarios invitados como colaboradores.

## Contenido

Los textos todavía se están definiendo. Si cambias una frase, hazlo en `src/data/` o en el Markdown del curso, no la dejes duplicada en varios componentes. Una ficha de curso nueva tiene que cumplir el esquema de `src/content/curso-schema.ts`.

Los borradores de privacidad y términos no se publican como texto definitivo. Si los tocas, deja visible que siguen pendientes de revisión legal.
