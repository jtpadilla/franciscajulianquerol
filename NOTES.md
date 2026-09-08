# NOTES.md — decisiones y hallazgos

Lo que se ha decidido y lo que se ha encontrado al montar esta portada. Las tareas pendientes están
en `TODO.md`.

---

## 2026-09-04 · Arranque del proyecto

### Tecnología

Se eligió **Astro 7** por coherencia con los tres sitios de contenido de la familia
(`astro@^7.2.10`, Node ≥ 22.12, `sharp`, `@astrojs/sitemap`), que permiten reutilizar el layout, los
tokens de color claro/oscuro, el patrón de i18n y el workflow de despliegue sin reinventar nada.

Descartados: React/Next (no hay interactividad que lo justifique), HTML a mano (perdería la
infraestructura ya escrita) y 11ty/Hugo (rompería la convención de la familia sin ganar nada).
Tampoco se usa Pagefind, que sí llevan masosdemorella y lesmeuescoses: con cinco fichas no hay nada
que buscar.

### Decisiones con el usuario

- **URL**: subruta `/franciscajulianquerol/` de GitHub Pages, sin dominio propio.
- **Idiomas**: castellano (raíz) y valenciano (`/ca/`), con selector.
- **Métricas**: guion reproducible + JSON versionado, no números a mano ni submódulos.

### El recuento

`tools/metriques.py` lee los cuatro repositorios clonados en `~/IdeaProjects/`. Las definiciones,
que hay que mantener alineadas con lo que dice al público `content/edicio.*.md`:

- **Textos**: ficheros de contenido de la autora. `content/*.md` en masosdemorella (12 capítulos),
  `src/content/articulos/es/*.md` en ramblacelumbres (23 guías) y `content/entrades/*.md` en
  lesmeuescoses (72 entradas). Total **107**.
- **Palabras**: del cuerpo del Markdown, quitando frontmatter, sintaxis de imagen con su pie,
  comentarios HTML, etiquetas HTML y marcas de Markdown. Total **70.265**.
- **Fotografías**: imágenes originales a tamaño completo. Total **486**.
- **Piezas cerámicas**: **434** piezas distintas de Santjoans.
- **Traducciones**: **69** ficheros (23 guías × ca, en, zh). Se cuentan, pero **no se enseñan**:
  ver abajo.

### Lo que NO se suma, y por qué

1. **Las traducciones no cuentan como palabras.** Los cuatro idiomas de ramblacelumbres suman 27.936
   palabras, pero son la misma obra cuatro veces. Se cuenta solo el castellano (8.104), que es la
   lengua en que la autora escribió las guías. El valenciano, el inglés y el chino son trabajo de
   esa edición.
2. **Las piezas de Santjoans no cuentan como fotografías.** El repositorio tiene 1.302 JPEG bajo
   `piezes/`, pero son 434 piezas guardadas en tres tamaños (60, 360 y 550 px). Sumarlas triplicaría
   el recuento y además mezclaría cosas distintas: se cuenta la pieza, no el fichero, y va en su
   propia cifra.
3. **El retrato de la autora no cuenta como fotografía del blog.** `blogger-export/images/` tiene 142
   ficheros; uno es la foto de perfil, que se excluye. Quedan **141**, que es lo que dice el README de
   lesmeuescoses.
4. **Las ilustraciones no son fotografías.** Los seis SVG de masosdemorella (el mapa dels Ports
   redibujado y cinco ilustraciones de esa edición) y el mapa de ramblacelumbres van en
   `illustracions`, y de momento no se enseñan en la portada.

### Diferencias con las cifras de los README hermanos

- masosdemorella dice «~27.657 palabras» contando el Markdown en bruto; aquí salen **27.170** al
  quitar los anclajes `<a id="pN" class="pag">` y los pies de foto.
- lesmeuescoses dice «~29.300 palabras» en su `CLAUDE.md`, que era el recuento del **HTML original de
  Blogger** antes del repaso editorial; sobre los masters ya corregidos salen **34.991**.

No son errores de nadie: son definiciones distintas. La de aquí está escrita en `tools/metriques.py`
y explicada al público en «Sobre esta página».

### El CI no puede recalcular

El workflow de GitHub Actions no tiene los repositorios hermanos, así que **no se puede enganchar
`metriques.py --comprova` al despliegue**, a diferencia de `comprova.py` en lesmeuescoses. El JSON
versionado es la única fuente en el build; si alguien cambia el recuento y no lo ejecuta en local,
las cifras publicadas se quedan atrás en silencio. Está anotado como riesgo en `TODO.md` (T-04).

### Material reutilizado

- Retrato: `lesmeuescoses/blogger-export/images/perfil/01-IMG_0923.JPG` (1600×1200), la misma foto de
  perfil que usaba el blog. En `santjoans-web/public/proyecto/FranciscaJulian.jpg` está la misma
  imagen, pero diminuta.
- Portadas: el Mas de Julian (masosdemorella), un azulejo con una liebre (santjoans), la rambla desde
  el cortado (ramblacelumbres) y el cobrellit con la ropa antigua (lesmeuescoses).
- La biografía se ha escrito a partir de `lesmeuescoses/content/autora.md`, que a su vez sale de lo
  que la autora contó en sus entradas; se enlazan las entradas concretas.

### Detalles técnicos que conviene recordar

- El castellano deja sin punto los números de cuatro cifras (`toLocaleString('es-ES')` da «8104»),
  y al lado de «27.170» quedaba raro. `xifra()` fuerza `useGrouping: 'always'`.
- En un `<dl>`, el `<dt>` tiene que ir antes que el `<dd>`; la banda de cifras enseña el número
  encima de la etiqueta con `flex-direction: column-reverse`, no cambiando el orden del HTML.
- Los identificadores del cargador `glob` de Astro no son fiables con nombres como `autora.es.md`,
  así que cada página de prosa lleva un `key` explícito en el frontmatter y se busca por `key` +
  `lang`, no por id.

---

## 2026-09-04 · Las traducciones salen de la banda de cifras

La banda enseñaba «69 textos traducidos» junto a los proyectos, los textos, las palabras, las
fotografías y las piezas. Se quita, a petición del usuario, por dos razones:

- **No son obra de la autora.** Las traducciones al valenciano, al inglés y al chino son trabajo de
  la edición digital de ramblacelumbres. La banda se lee como «lo que ha producido Paquita», y esa
  columna desentonaba con las otras cinco.
- **No son obra adicional.** Las 23 guías originales ya están dentro de los 107 textos; los 69 son
  esas mismas guías otras tres veces.

La información no se pierde: la ficha de Rambla Celumbres sigue diciendo «4 idiomas», que es lo que
le interesa al lector. La cifra se sigue contando y sigue en `content/metriques.json`
(`totals.traduccions`), por si algún día se usa.

---

## 2026-09-06 · El quinto proyecto: franciscaineditos

El repositorio [jtpadilla/franciscaineditos](https://github.com/jtpadilla/franciscaineditos) («Escrits
inèdits», https://jtpadilla.github.io/franciscaineditos/) recoge los textos de la autora que nunca
habían salido de su ordenador, seleccionados a mano por tandas. Su master es `md/<obra>/<documento>/index.md`
con las imágenes en `img/`; el site de Astro lee esa carpeta directamente.

### Qué se cuenta

- **Escritos** (`textos`, unidad nueva `escrits`): un `index.md` por documento. **144**, en **12 obras**
  (`obres`, campo nuevo que la ficha enseña como «12 obras»).
- **Palabras**: el cuerpo de los `index.md` con la misma función `cos()` que los demás (fuera el
  frontmatter, donde van las notas de edición). **201.163**. Es casi el triple de lo que sumaban los
  otros cuatro proyectos: el libro de memorias y el trabajo sobre la agricultura son largos.
- **Fotografías**: los ficheros de `img/`, **378**. Se excluyen dos PNG de 15×11 px (iconos que pandoc
  extrajo de un docx), leyendo la cabecera de cada imagen con `mida()`, sin dependencias.

Los totales pasan a **251 textos · 271.502 palabras · 864 fotografías**, con las 434 piezas igual.

### Solapes que se aceptan (T-08)

Algunos escritos son otra versión de algo que ya está en otro proyecto: las 17 entradas de Listo son
las del blog pulidas para su libro, y «Natura» (6 documentos, 128 imágenes) es el trabajo de
biodiversidad del que salió ramblacelumbres. Se cuentan en los dos sitios porque son ficheros
distintos en repositorios distintos y la definición de «Sobre esta página» habla de ficheros. Queda
anotado en `TODO.md` por si algún día se quiere una regla de desempate.

### Decisiones

- **Título de la ficha** en valenciano, «Escrits inèdits», como el nombre del site, igual que «Les
  meues coses» conserva el suyo. Tipo nuevo `inedits` («Inéditos» / «Inèdits»), años **2006 – 2026**:
  el texto fechado más antiguo es la presentación del libro de los masos en Morella (agosto de 2006)
  y el más reciente, el libro de memorias de 2026.
- **Portada**: la foto de una boda hacia 1940 delante de la casa Santjoans de Cinctorres, con sus
  padres a la izquierda (`md/Memoria familiar/Fotos antiguas/img/boda.jpeg`), la fotografía más
  antigua del fondo. Se barajó la tapa que ella hizo para el libro de memorias (los balcones de
  Cinctorres), que queda como alternativa.
- **La biografía** gana una sección corta, «Lo que quedaba en el ordenador», escrita solo con lo que
  dice el propio repositorio de inéditos: no añade datos biográficos.
- **La ruta de los clones** deja de estar fijada a `~/IdeaProjects/`: el guion usa por defecto la
  carpeta que contiene este repositorio (hoy `~/IdeaProjects/francisca/`), que es donde están los
  cinco hermanos. `--arrel` sigue valiendo.

---

## 2026-09-06 · Dominio propio: franciscajulianquerol.es

Se revierte la decisión del 2026-09-04 de quedarse en la subruta de GitHub Pages: el usuario compró
`franciscajulianquerol.es` y el sitio pasa a la raíz de ese dominio, con el mismo montaje que
ramblacelumbres.org (cuatro A en el ápice, `www` como `CNAME` a `jtpadilla.github.io`, dominio
declarado en Pages, `public/CNAME` en el sitio). La subruta sigue funcionando porque GitHub redirige
`jtpadilla.github.io/franciscajulianquerol/` al dominio.

Cambios en el repositorio: `base: '/'` y `site` en `astro.config.mjs`, `LLOC.url` en `config.ts`,
`site/public/CNAME`, `README.md` y `CLAUDE.md`. Como todos los enlaces salían de `BASE`, ninguna
plantilla cambia: con `base: '/'`, `BASE` vale la cadena vacía y los `href` quedan como `/ca/`. Las
canónicas y los `hreflang` ya salen con el dominio. Los pasos que se hacen fuera del repositorio
están en T-09.

Cronología de la publicación (06/09): DNS en DonDominio a las 21:10 (había que desactivar el
aparcado y borrar el ANAME de la raíz y el comodín, que apuntaban a él); dominio en Pages y push a
las 21:23; Red.es publicó la delegación a las 22:13; el certificado no se emitió hasta quitar y
volver a declarar el dominio en Pages (22:20), aprobado a las 22:21 con HTTPS forzado. El resolver
del sistema y los DNS externos no responden desde el sandbox: se comprobó con DNS sobre HTTPS de
Cloudflare y Google, y con `gh api repos/jtpadilla/franciscajulianquerol/pages/health`.

---

## 2026-09-08 · El sexto proyecto (santjoanslibro) y las novedades (T-11)

### santjoanslibro

El texto del estudio de Santjoans, reconstruido desde el PDF de julio de 2010 como masosdemorella.
Va **en tercer lugar, detrás de santjoans**: son el mismo trabajo, el visor y el texto, y el índice va
por antigüedad de la obra. Tipo `llibre`, años 2010 – 2012, título el del libro digital («Paviment
ceràmic de la casa Santjoans», que es el de la edición de la Diputació). Portada: la fachada de la
casa (`assets/images/05-facana-casa-santjoans.jpg`), para no repetir un azulejo como en santjoans.

Qué se cuenta: **5 capítulos** (pròleg, tres capítulos y bibliografía), **4.001 palabras** (la prosa;
el catálogo es `cataleg.yaml`, datos, y no entra), **13 fotografías** (las del texto) y **29 fichas**
del catálogo como cifra propia `fitxes`, que la ficha enseña como «29 fichas del catálogo». No se
suman a `peces` (las 434 rajoles digitalizadas ya las cuenta santjoans) ni a `textos`. Las once fotos
del acto de presentación de 2012 (`assets/presentacio/`) retratan a la autora, no son obra suya, y
quedan fuera, como las de perfil del blog.

Totales: **6 proyectos · 256 textos · 275.503 palabras · 877 fotografías · 434 piezas**.

### Las novedades

Petición: que la portada acumule las novedades (proyectos nuevos, contenido nuevo en los hermanos)
sin perder su papel de portada. Decisión: **las escribe el recuento**, igual que las cifras.
`metriques.py` lee el `metriques.json` anterior antes de sobrescribirlo, compara proyecto a proyecto
y anota en `content/novetats.json`:
- `nou`: un proyecto que no estaba.
- `creix`: subida en alguna de `COMPTABLES` (textos, obres, paraules, fotografies, illustracions,
  peces, fitxes, comentaris), con la diferencia. Si solo suben las palabras y no llegan a 100, no es
  novedad (erratas). Las bajadas se ignoran.
- Si el mismo día ya hay una entrada del mismo proyecto, se funden: ejecutar el guion dos veces no
  duplica nada.
- `nota`: a mano, con `nota: {es, ca}` y `url` opcional. Se usó para sembrar el historial: el
  estreno de la portada con cuatro proyectos (04/09) y el dominio propio (06/09). El estreno se puso
  como una sola nota y no como cuatro `nou` para que las cuatro fichas no salieran todas con «Nuevo».

En el sitio: `src/site/novetats.ts` carga el JSON (de la más reciente a la más antigua); la banda
`Novetats.astro` enseña las tres últimas en una línea bajo las cifras; `/novedades/` y
`/ca/novetats/` (vista `Novetats.astro`, clave `novetats` en `PAGINES`, con tipo `PaginaProsaKey`
para las dos páginas que sí salen de un `.md`) las enseñan todas; y `Fitxa.astro` pone «Nuevo» o
«Ampliado» si la última novedad del proyecto tiene menos de 60 días (`novetatRecent`, contados
respecto a la fecha del build). Una novedad de un proyecto que ya no esté en el índice no se pinta.
Los textos («+2 entradas · +1.200 palabras») salen de `textCanvis()` en `ui.ts`, con la unidad de
cada proyecto. 9 páginas.

Descartado: un RSS (nadie se suscribiría a esto y obligaría a fechas con hora) y un fichero de
novedades escrito a mano (envejece como las cifras escritas a mano).
