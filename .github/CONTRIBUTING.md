# Cómo colaborar

Este repositorio es la **portada** de la obra de Francisca Julián Querol: presenta a la autora,
cuenta lo que hay y enlaza a los cuatro proyectos. No contiene la obra en sí.

## Correcciones

- Si el error está en **esta portada** (la biografía, una descripción, una cifra, un enlace), abre
  una incidencia aquí.
- Si está **dentro** de un proyecto —una frase del libro, un pie de foto de la guía, una entrada del
  blog, una pieza del pavimento—, ábrela en el repositorio de ese proyecto. Los enlaces están en el
  formulario de incidencias.

No se inventa nada para tapar un hueco: si un dato no se puede confirmar, se pregunta a la autora o
se deja anotado.

## Cambios en el código

Antes de tocar nada, leer `CLAUDE.md`: explica cómo está montado el sitio, qué decisiones ya están
tomadas y cómo se añade un proyecto nuevo.

Dos cosas que se olvidan con facilidad:

1. **Las cifras se cuentan, no se escriben.** Si cambias algo del recuento, ejecuta
   `python3 tools/metriques.py` **en local** (necesita los cuatro repositorios clonados al lado de
   este) y commitea `content/metriques.json`. El CI no puede recalcularlas.
2. **Todos los enlaces internos pasan por `BASE`.** El sitio vive en una subruta
   (`/franciscajulianquerol/`): un `href="/algo/"` a pelo lo rompe. Usa las funciones de
   `site/src/site/config.ts`.

Antes de proponer un cambio, `cd site && npm run build` tiene que terminar limpio.
