# FRANCISCA JULIÁN QUEROL

Portada de la obra de **Francisca Julián Querol** («Paquita»), de Cinctorres: quién es, cuánto ha
escrito y dónde leerlo.

**https://jtpadilla.github.io/franciscajulianquerol/**

> «Les meues coses quiere decir MIS COSAS. Escribo en castellano y en mi lengua materna el valenciano,
> me gusta todo lo que despierta mi curiosidad. Este vicio los años no lo curan.»
>
> — presentación de su blog, de la autora

Esta página no añade obra nueva: presenta a la autora, cuenta lo que hay y lleva a cada proyecto. Es
la puerta de entrada a las cinco ediciones digitales que ha preparado la familia, y está en
**castellano y valenciano**. La autora sigue escribiendo, a un ritmo más pausado: lo nuevo llega al
blog y a los escritos inéditos, y las cifras se recalculan cuando llega.

## Los proyectos

| | Qué es | Papel de la autora | Sitio |
|---|---|---|---|
| **Masos de Morella** (2006–2016) | Su libro sobre la vida en la Dena dels Llivis, publicado por la UJI y revisado por ella | Autora | [jtpadilla.github.io/masosdemorella](https://jtpadilla.github.io/masosdemorella/) |
| **Santjoans** (2010–2012) | El estudio del pavimento cerámico zoomórfico del Palau Santjoans | Autora del estudio | [santjoans.es](https://santjoans.es/) |
| **Rambla Celumbres** (2014–2016) | Guía de biodiversidad de la rambla, con las fotografías de su hermano Tadeo | Autora de los textos | [ramblacelumbres.org](https://ramblacelumbres.org/) |
| **Les meues coses** (2010–2026) | Dieciséis años de blog, en valenciano y en castellano | Autora | [jtpadilla.github.io/lesmeuescoses](https://jtpadilla.github.io/lesmeuescoses/) |
| **Escrits inèdits** (2006–2026) | Los textos que quedaban en su ordenador, elegidos uno a uno: memorias, mundo rural, poemas, relatos, trabajos de curso | Autora | [jtpadilla.github.io/franciscaineditos](https://jtpadilla.github.io/franciscaineditos/) |

Añadir un proyecto es escribir un fichero en `content/projectes/` y una función de recuento en
`tools/metriques.py`; no hay que tocar ninguna plantilla.

## Qué hay aquí

| | |
|---|---|
| `content/projectes/` | **Una ficha por proyecto** (`*.yaml`): título, años, papel de la autora, descripción en los dos idiomas, portada y enlaces. |
| `content/autora.*.md` | La biografía de la autora, en castellano y en valenciano. |
| `content/edicio.*.md` | «Sobre esta página»: cómo se cuentan las cifras y con qué licencia se publica todo. |
| `content/imatges/` | El retrato y las cinco portadas, copiadas de los repositorios de origen. |
| `content/metriques.json` | **Las cifras, generadas**, no escritas a mano. Sale de `tools/metriques.py`. |
| `site/` | El sitio web (Astro 7). Se publica en GitHub Pages con cada push a `main`. |
| `tools/metriques.py` | El recuento: lee los cinco repositorios hermanos y escribe `content/metriques.json`. |
| `CLAUDE.md` | Cómo está montado todo y las convenciones del proyecto. |
| `NOTES.md` / `TODO.md` | Decisiones tomadas y tareas pendientes (`T-nn`). |

## Las cifras

Las métricas de la portada **no se escriben a mano**: las cuenta un guion que lee los repositorios de
los cinco proyectos, clonados al lado de este (en la carpeta que contiene este repositorio, o la
que se indique con `--arrel`).

```bash
git clone git@github.com:jtpadilla/masosdemorella.git     ../masosdemorella
git clone git@github.com:jtpadilla/santjoans.git          ../santjoans
git clone git@github.com:jtpadilla/ramblacelumbres.git    ../ramblacelumbres
git clone git@github.com:jtpadilla/lesmeuescoses.git      ../lesmeuescoses
git clone git@github.com:jtpadilla/franciscaineditos.git  ../franciscaineditos

python3 tools/metriques.py              # recuenta y escribe content/metriques.json
python3 tools/metriques.py --comprova   # no escribe: falla si el fichero está desfasado
```

El resultado se **versiona**: construir el sitio no necesita los clones ni conexión a la red. Cuando
un proyecto hermano crece, se vuelve a ejecutar el guion y se commitea el JSON. Las definiciones de
cada cifra están en `NOTES.md` y explicadas al público en la página «Sobre esta página».

## El sitio

```bash
cd site
npm install
npm run dev       # http://localhost:4321/franciscajulianquerol/
npm run build     # genera dist/
npm run preview   # sirve dist/
```

Astro 7, sin JavaScript de cliente: siete páginas estáticas (portada, autora y «sobre esta página»,
en los dos idiomas, más la 404). Requiere Node ≥ 22.12.

## Licencias

- **Textos y fotografías:** © Francisca Julián Querol, Tadeo Julián Querol y archivo familiar.
  **CC BY-NC-ND 4.0** — se pueden copiar y compartir citando a los autores, sin uso comercial y sin
  modificarlos (ver `LICENSE-CONTINGUT.md`). Las imágenes del pavimento de Santjoans van con
  CC BY-NC 3.0, la licencia con la que se publicaron en 2010.
- **Código** (`tools/` y `site/`): **MIT** (ver `LICENSE`).

Edición digital a cargo de **Juan Tadeo Padilla Julián**, hijo de la autora, que es también el
contacto para cualquier corrección a través de este repositorio.
