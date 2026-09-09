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

### T-12 · Enlaces de vuelta del libro nuevo · 2026-09-09
`santjoanslibro` enlaza a esta portada en el pie de todas sus páginas (la misma línea que
`masosdemorella`); `santjoans` tiene un tercer botón en su presentación, «Leer el estudio», en los
cuatro idiomas; `masosdemorella` enlaza al libro en el pie («L'altre llibre de l'autora») y en
«L'autora». Los tres apuntan a `jtpadilla.github.io/santjoanslibro/`: si el libro estrena dominio,
hay que cambiarlos y la ficha `3-santjoanslibro.yaml`.

### T-13 · La portada para quien vuelve · 2026-09-09
La última novedad de obra, con su fecha, en la cabecera; las cifras en una sola línea; fuera la
banda de novedades que había bajo las cifras; la etiqueta de la ficha a 90 días.
Detalle en `NOTES.md`.

### T-11 · El sexto proyecto, santjoanslibro, y las novedades · 2026-09-08
`santjoanslibro()` en el recuento (5 capítulos, 4.001 palabras, 13 fotografías y la cifra propia
`fitxes`, 29, que no se suma a las piezas), ficha `3-santjoanslibro.yaml` con la fachada de la casa
como portada, las tres fichas siguientes renumeradas, los textos de «cinco» a «seis», y el mecanismo
de novedades (`content/novetats.json`, banda en la portada, `/novedades/`, etiqueta en la ficha).
Fusionado en `main` y publicado. Queda en los hermanos, como T-12.

### T-10 · Enlace de vuelta de los hermanos al dominio nuevo · 2026-09-06
Los cinco sitios enlazan ya a `https://franciscajulianquerol.es/` (con `/ca/` donde el sitio está en
valenciano): un commit en cada repositorio la misma noche del cambio de dominio.

### T-09 · Dominio propio franciscajulianquerol.es · 2026-09-06
Publicado en **https://franciscajulianquerol.es/** la noche del 06/09: `base: '/'`, `site` y
`LLOC.url` al dominio, `site/public/CNAME`; zona DNS en DonDominio (`@` con las cuatro A de Pages,
`www` con `CNAME jtpadilla.github.io`, aparcado desactivado); dominio declarado en Pages. Red.es
publicó la delegación a las 22:13, una hora después del registro; el certificado de GitHub no
arrancó hasta quitar y volver a poner el dominio en Pages (22:20), y a las 22:21 estaba aprobado y
el HTTPS forzado. Las seis páginas responden 200; `http`, `www` y la dirección antigua de github.io
redirigen al dominio. Queda T-10.

### T-06 · Imagen de Open Graph · 2026-09-06
Todas las páginas llevan `og:image`: el retrato recortado a 1200×630 con `getImage` en `Base.astro`,
anclado arriba para que la cara quede dentro, más `og:image:width`, `og:image:height`, `og:image:alt`
y `twitter:card` de imagen grande. Se genera en el build; no hay ningún fichero derivado en el repo.
Una página puede pasar otra imagen con la prop `imatge`, como hasta ahora.

### T-05 · Enlace de vuelta desde los proyectos hermanos · 2026-09-06
Los cinco sitios enlazan ya a esta portada: `franciscaineditos` en su lista de otros sitios y en
«L'autora»; `masosdemorella` y `lesmeuescoses` en una línea del pie; `ramblacelumbres` en la columna
«Sobre el sitio» del pie, en los cuatro idiomas; `santjoans` con un botón junto a «Información del
proyecto», en los cuatro idiomas. Los sitios bilingües o multilingües llevan al valenciano en `/ca/`
y al castellano en la raíz.

### T-01 · El quinto proyecto · 2026-09-06
`franciscaineditos` («Escrits inèdits»), clonado al lado de este. Función `franciscaineditos()` en
`tools/metriques.py`, ficha `content/projectes/5-franciscaineditos.yaml`, portada (la boda de hacia
1940 delante de la casa Santjoans), tipo `inedits` y unidad `escrits` en el sitio, y los textos que
decían «cuatro proyectos» pasados a cinco. Detalle en `NOTES.md`.

### T-02 · Publicar el repositorio y encender Pages · 2026-09-04
Repositorio público `jtpadilla/franciscajulianquerol` con `main` empujado, Pages con origen **GitHub
Actions** (`build_type=workflow`) y HTTPS forzado. Las siete páginas responden 200 y `/no-existe/`
da 404. **https://jtpadilla.github.io/franciscajulianquerol/**
