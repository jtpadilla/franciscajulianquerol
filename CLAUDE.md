# CLAUDE.md — Proyecto franciscajulianquerol

Punto de entrada para Claude Code en cualquier sesión y en cualquier máquina.
Leer este fichero completo antes de tocar nada.

---

## Qué es este proyecto

**La portada** de la obra de **Francisca Julián Querol** («Paquita», Cinctorres, 1945): una página
que la presenta, cuenta cuánto ha producido y lleva a cada uno de los proyectos donde se puede leer.

Es el **quinto repositorio** de la familia y el único que no recupera obra: no añade texto ni
fotografías de la autora más allá de su biografía. Su trabajo es indexar y dar contexto.

Publicado en **https://jtpadilla.github.io/franciscajulianquerol/** (repositorio público
`jtpadilla/franciscajulianquerol`, Pages con origen GitHub Actions).

### Proyectos hermanos (misma familia, mismo modelo)

| Repositorio | Qué es | Papel de la autora | Sitio |
|---|---|---|---|
| [jtpadilla/masosdemorella](https://github.com/jtpadilla/masosdemorella) | El libro «Masos de Morella» reconstruido desde el PDF de 2016 | Autora | jtpadilla.github.io/masosdemorella |
| [jtpadilla/santjoans](https://github.com/jtpadilla/santjoans) | Visor del pavimento del Palau Santjoans (React 19, reescrito desde GWT) | Autora del estudio | santjoans.es |
| [jtpadilla/ramblacelumbres](https://github.com/jtpadilla/ramblacelumbres) | Guía de biodiversidad migrada desde WordPress; es/ca/en/zh | Autora de los textos | ramblacelumbres.org |
| [jtpadilla/lesmeuescoses](https://github.com/jtpadilla/lesmeuescoses) | El blog «Les meues coses» recuperado del canal de Blogger | Autora | jtpadilla.github.io/lesmeuescoses |

Los cuatro están clonados en `~/IdeaProjects/` junto a este, y **`tools/metriques.py` los necesita**.
Consultar sus `CLAUDE.md` antes de reinventar decisiones: el patrón de i18n y el catch-all de rutas
vienen de ramblacelumbres; la separación `content/` (raíz) + `site/` (Astro), de lesmeuescoses.

Idioma de trabajo con el usuario: **castellano**. Idiomas del sitio: **castellano y valenciano**.

---

## Estado actual (2026-09-04)

**Hecho, en la primera sesión:**
1. Repositorio, `README.md`, licencias, `.github/` y este fichero.
2. `tools/metriques.py` y `content/metriques.json`: el recuento de los cuatro proyectos.
3. Las cuatro fichas (`content/projectes/*.yaml`) y las cuatro páginas de prosa
   (`content/autora.*.md`, `content/edicio.*.md`), escritas en castellano y en valenciano.
4. Sitio Astro 7 bilingüe en `site/`: portada (retrato, cifras, índice), «La autora» y «Sobre esta
   página», más la 404. `npm run build` limpio: **7 páginas**.

**Por dónde seguir** (detalle en `TODO.md`): el **quinto proyecto**, que el usuario tiene pendiente.

---

## Decisiones tomadas (no volver a plantearlas)

- **Sin dominio propio.** Se queda en la subruta `/franciscajulianquerol/` de GitHub Pages, como
  lesmeuescoses y masosdemorella (y a diferencia de ramblacelumbres.org y santjoans.es). Decidido con
  el usuario el 2026-09-04. Consecuencia: **todos los enlaces internos pasan por `BASE`**
  (`src/site/config.ts`); un `href="/algo/"` a pelo rompe el sitio.
- **Bilingüe castellano + valenciano**, castellano por defecto en la raíz y valenciano bajo `/ca/`.
  No hay inglés ni chino: eso es de ramblacelumbres, que sí tiene contenido que lo justifique.
- **Las cifras se cuentan, no se escriben.** `tools/metriques.py` → `content/metriques.json`,
  versionado. Se descartaron los números a mano (envejecen sin avisar) y los submódulos git de los
  cuatro repositorios (cientos de MB y un CI frágil).
- **Astro 7**, la misma versión que los tres sitios de contenido. Sin Pagefind: con cinco fichas no
  hay nada que buscar. Sin JavaScript de cliente.
- **Sin barra de navegación por proyecto:** el índice es la portada. Las únicas páginas aparte son la
  biografía y «Sobre esta página».

---

## Estructura del repositorio

```
tools/metriques.py          el recuento. Lee ~/IdeaProjects/<hermano> y escribe content/metriques.json.
                            `python3 tools/metriques.py` | `--comprova` (no escribe, falla si desfasa)
                            | `--arrel DIR`. Solo biblioteca estándar.
content/metriques.json      SALIDA DEL RECUENTO. Se versiona: el build no necesita los clones ni red.
content/projectes/*.yaml    UNA FICHA POR PROYECTO. `<ordre>-<slug>.yaml`. Campos: slug (= clave en
                            metriques.json), ordre, titol, tipus, anys, rol{es,ca}, subtitol{es,ca},
                            descripcio{es,ca}, url, repositori, portada, portadaAlt{es,ca}.
content/autora.{es,ca}.md   biografía de la autora. Frontmatter: key, lang, title, resum, retrat.
content/edicio.{es,ca}.md   «Sobre esta página»: definiciones de las cifras y licencias.
content/imatges/            retrato + 4 portadas, copiadas de los repositorios de origen. Optimizadas
                            por astro:assets en el build; los originales no se tocan.
site/                       proyecto Astro 7 (npm run dev | build | preview)
  src/site/config.ts        idiomas, LLOC (textos del sitio), tipos y carga de metriques.json, BASE y
                            TODAS las URL. Aquí se añaden páginas nuevas.
  src/site/ui.ts            los textos de interfaz en los dos idiomas + `xifresProjecte()`, que decide
                            qué cifras enseña la ficha de cada proyecto según lo que traiga el JSON.
  src/content.config.ts     colecciones `projectes` (yaml) y `pagines` (md), ambas fuera de site/.
  src/pages/[...ruta].astro TODAS las páginas de los dos idiomas salen de aquí. 404.astro aparte.
  src/vistes/               Inici.astro (portada) y Pagina.astro (prosa: autora y edició).
  src/components/           Capcalera, Peu, Marca, Xifres (la banda de números), Fitxa (la tarjeta).
  src/styles/global.css     todo el CSS, con tokens claro/oscuro. No hay CSS por componente.
.github/workflows/deploy.yml  build + publicación en Pages con cada push a main.
```

---

## Cómo añadir un proyecto

1. Clonar su repositorio en `~/IdeaProjects/`.
2. Añadir una función de recuento en `tools/metriques.py` y registrarla en `PROJECTES`.
   Ojo con lo que **no** se debe sumar: ver el comentario de `santjoans()`.
3. `python3 tools/metriques.py` y commitear `content/metriques.json`.
4. Copiar una portada a `content/imatges/` y escribir `content/projectes/<n>-<slug>.yaml`.
   El `slug` tiene que coincidir con la clave del JSON.
5. Si el proyecto trae una unidad de contenido nueva (algo que no sea capítulos, guías, entradas o
   piezas), añadirla a `unitats` en `src/site/ui.ts` y al tipo `MetriquesProjecte`.
6. `cd site && npm run build`. No hay que tocar ninguna plantilla.

---

## Convenciones

- Commits y ficheros en castellano; el contenido, en los dos idiomas del sitio.
- Todo hallazgo o decisión va a `NOTES.md`; las tareas, a `TODO.md` numeradas `T-nn`, y se citan en
  los commits al resolverlas.
- Nada derivado (`dist/`, `node_modules/`, webp) al repositorio. `content/metriques.json` **sí** se
  versiona aunque sea generado: es la única manera de que el build no dependa de los clones.
- **El CI no puede recalcular las cifras**: los repositorios hermanos no están en el runner. Si se
  cambia el recuento, hay que ejecutar el guion **en local** y commitear el JSON, o las cifras
  publicadas se quedarán atrás sin que nadie avise.
- Los textos de la biografía se apoyan en lo que la autora escribió en su blog y enlazan a las
  entradas concretas. No inventar datos biográficos: si falta uno, se pregunta.
