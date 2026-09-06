# TODO.md — tareas pendientes

Numeradas `T-nn`. Se citan en los commits al resolverlas y el resultado se anota en `NOTES.md`.

---

## Abiertas

### T-10 · Enlace de vuelta de los hermanos al dominio nuevo
Los cinco sitios (T-05) enlazan a `jtpadilla.github.io/franciscajulianquerol/`, que GitHub redirige
al dominio. Cambiarlo a `https://franciscajulianquerol.es/` en cada repositorio (en franciscaineditos
está en `GERMANS`, `site/src/site/config.ts`).

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

### T-09 · Dominio propio franciscajulianquerol.es · 2026-09-06
Publicado en **https://franciscajulianquerol.es/** la noche del 06/09: `base: '/'`, `site` y
`LLOC.url` al dominio, `site/public/CNAME`; zona DNS en DonDominio (`@` con las cuatro A de Pages,
`www` con `CNAME jtpadilla.github.io`, aparcado desactivado); dominio declarado en Pages. Red.es
publicó la delegación a las 22:13, una hora después del registro; el certificado de GitHub no
arrancó hasta quitar y volver a poner el dominio en Pages (22:20), y a las 22:21 estaba aprobado y
el HTTPS forzado. Las seis páginas responden 200; `http`, `www` y la dirección antigua de github.io
redirigen al dominio. Queda T-10.

