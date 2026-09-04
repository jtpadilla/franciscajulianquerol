# TODO.md — tareas pendientes

Numeradas `T-nn`. Se citan en los commits al resolverlas y el resultado se anota en `NOTES.md`.

---

## Abiertas

### T-01 · El quinto proyecto
Falta el proyecto que el usuario tiene pendiente. Cuando esté: clonarlo en `~/IdeaProjects/`, añadir
su función de recuento a `tools/metriques.py`, regenerar `content/metriques.json`, copiar una portada
a `content/imatges/` y escribir `content/projectes/5-<slug>.yaml`. El procedimiento completo está en
`CLAUDE.md`, «Cómo añadir un proyecto». No hay que tocar ninguna plantilla.

### T-02 · Publicar el repositorio y encender Pages
Crear `jtpadilla/franciscajulianquerol` público, empujar `main` y poner Pages con origen **GitHub
Actions**. Comprobar después que la subruta `/franciscajulianquerol/` funciona y que la 404 se sirve.

### T-03 · Que la autora valide su biografía y las licencias
`content/autora.*.md` se ha escrito a partir de lo que ella contó en el blog, pero conviene que lo
lea. Lo mismo con la licencia CC BY-NC-ND 4.0 del contenido, que en los proyectos hermanos también
está pendiente de que la confirme.

### T-04 · Riesgo: las cifras se pueden quedar atrás sin avisar
El CI no tiene los repositorios hermanos, así que no puede ejecutar `metriques.py --comprova`. Si un
proyecto crece y nadie vuelve a ejecutar el guion en local, la portada publica cifras viejas y no
salta ningún aviso. Opciones si algún día molesta:
- un `git hook` local de `pre-commit` que ejecute `--comprova` cuando existan los clones;
- una acción programada que clone los cuatro repositorios y abra una incidencia si el JSON desfasa.
De momento se deja como está: recalcular a mano cuando se toque un proyecto hermano.

### T-05 · Enlace de vuelta desde los proyectos hermanos
Los cuatro sitios se enlazan entre ellos, pero ninguno enlaza todavía a esta portada. Añadir el
enlace en el pie de los cuatro (`ramblacelumbres`, `santjoans`, `masosdemorella`, `lesmeuescoses`) una
vez esté publicada (depende de T-02).

### T-06 · Imagen de Open Graph
Las páginas no llevan `og:image`: al compartirlas no sale ninguna imagen. Falta decidir cuál (el
retrato es lo obvio para la portada) y generarla con el recorte y el tamaño que piden las redes.

### T-07 · Ilustraciones y comentarios, ¿se enseñan?
`metriques.json` ya trae `illustracions` (7) y `comentaris` (38), que ahora mismo no aparecen en
ninguna parte. Decidir si merecen un hueco en la banda de cifras o si se quedan solo en el JSON.
