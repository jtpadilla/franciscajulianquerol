# TODO.md — tareas pendientes

Numeradas `T-nn`. Se citan en los commits al resolverlas y el resultado se anota en `NOTES.md`.

---

## Abiertas

### T-03 · Que la autora valide su biografía y las licencias
`content/autora.*.md` se ha escrito a partir de lo que ella contó en el blog, pero conviene que lo
lea. Lo mismo con la licencia CC BY-NC-ND 4.0 del contenido, que en los proyectos hermanos también
está pendiente de que la confirme.

### T-04 · Riesgo: las cifras se pueden quedar atrás sin avisar
El CI no tiene los repositorios hermanos, así que no puede ejecutar `metriques.py --comprova`. Si un
proyecto crece y nadie vuelve a ejecutar el guion en local, la portada publica cifras viejas y no
salta ningún aviso. Opciones si algún día molesta:
- un `git hook` local de `pre-commit` que ejecute `--comprova` cuando existan los clones;
- una acción programada que clone los cinco repositorios y abra una incidencia si el JSON desfasa.
De momento se deja como está: recalcular a mano cuando se toque un proyecto hermano.

### T-05 · Enlace de vuelta desde los proyectos hermanos
Los sitios se enlazan entre ellos, pero solo `franciscaineditos` enlaza ya a esta portada (en su lista
«Els altres llocs de l'autora» y en su página «L'autora»). Falta añadir el enlace en el pie de los
otros cuatro (`ramblacelumbres`, `santjoans`, `masosdemorella`, `lesmeuescoses`).

### T-06 · Imagen de Open Graph
Las páginas no llevan `og:image`: al compartirlas no sale ninguna imagen. Falta decidir cuál (el
retrato es lo obvio para la portada) y generarla con el recorte y el tamaño que piden las redes.

### T-07 · Cifras que se cuentan pero no se enseñan
`metriques.json` trae `illustracions` (7), `comentaris` (38) y `traduccions` (69), que no aparecen
en ninguna parte del sitio. Las traducciones salieron de la banda a propósito (ver `NOTES.md`); de
las otras dos falta decidir si merecen un hueco o si se quedan solo en el JSON.

### T-08 · Solapes entre los inéditos y los otros proyectos
Algunos escritos de `franciscaineditos` son versiones de cosas que ya están en otro proyecto: las
entradas de Listo (pulidas para su libro) también están en el blog, y las fotos y parte de los textos
de «Natura» son la base de ramblacelumbres. Hoy se cuentan en los dos sitios, porque son ficheros
distintos en repositorios distintos, y así está explicado en `NOTES.md`. Si algún día molesta, habría
que decidir una regla de desempate y escribirla en «Sobre esta página».

---

## Resueltas

### T-01 · El quinto proyecto · 2026-09-06
`franciscaineditos` («Escrits inèdits»), clonado al lado de este. Función `franciscaineditos()` en
`tools/metriques.py`, ficha `content/projectes/5-franciscaineditos.yaml`, portada (la boda de hacia
1940 delante de la casa Santjoans), tipo `inedits` y unidad `escrits` en el sitio, y los textos que
decían «cuatro proyectos» pasados a cinco. Detalle en `NOTES.md`.

### T-02 · Publicar el repositorio y encender Pages · 2026-09-04
Repositorio público `jtpadilla/franciscajulianquerol` con `main` empujado, Pages con origen **GitHub
Actions** (`build_type=workflow`) y HTTPS forzado. Las siete páginas responden 200 y `/no-existe/`
da 404. **https://jtpadilla.github.io/franciscajulianquerol/**
