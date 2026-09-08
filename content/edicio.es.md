---
key: edicio
lang: es
title: Sobre esta página
resum: "Qué es esta portada, cómo se cuentan las cifras y con qué licencia se publica todo."
---

Esta página es la puerta de entrada a los proyectos de recuperación de la obra de **Francisca Julián
Querol**. No añade obra nueva: solo presenta a la autora, cuenta lo que hay y lleva a cada sitio.

Los seis proyectos son una iniciativa **familiar y sin ánimo de lucro**, sin publicidad y sin
cookies. Los ha preparado **Juan Tadeo Padilla Julián**, hijo de la autora, que es también el
contacto para cualquier corrección a través del repositorio de cada proyecto.

Todos siguen el mismo criterio: el material se guarda en **formatos abiertos y duraderos** —texto
plano y JPEG— versionados en git, y esos ficheros, no los sitios web, son el original. Los sitios son
solo una manera de leerlos, y se construyen enteros como páginas estáticas: sin base de datos, sin
servidor y sin nada que mantener en marcha.

## De dónde salen las cifras

Las cifras de esta página **no están escritas a mano**: las cuenta el guion `tools/metriques.py` de
este repositorio, que lee los seis repositorios de los proyectos y deja el resultado en
`content/metriques.json`. Las definiciones son estas:

- **Textos**: los ficheros de contenido de la autora —capítulos de los dos libros, capítulos de la guía,
  entradas del blog y escritos inéditos—. No cuentan las traducciones.
- **Palabras**: las del cuerpo de esos textos, sin el frontmatter, sin los pies de foto y sin las
  etiquetas HTML. De la guía de la rambla se cuenta solo el castellano, la lengua en que la escribió;
  contar también el valenciano, el inglés y el chino cuadruplicaría la misma obra.
- **Fotografías**: las imágenes originales de los cinco proyectos de texto, a tamaño completo. No se
  cuentan las variantes que generan los sitios al construirse, ni los iconos que los documentos de
  los inéditos arrastraban de la web.
- **Piezas cerámicas**: las piezas distintas del pavimento de Santjoans que se digitalizaron. Cada
  una se guarda en tres tamaños; se cuenta la pieza, no el fichero. Las veintinueve fichas del
  catálogo del libro de Santjoans son su cifra propia y no se suman a las piezas.

## Las novedades

La lista de [novedades](/novedades/) tampoco la escribe nadie: cada vez que se recalculan las
cifras, el guion compara el recuento nuevo con el anterior y anota lo que ha cambiado, con fecha.
Un proyecto que no estaba es una novedad; y también lo es uno que ya estaba y que ha crecido en
textos, fotografías o piezas, o en cien palabras o más. Las correcciones pequeñas no cuentan. La
ficha de un proyecto lleva la etiqueta «Nuevo» o «Ampliado» durante los dos meses siguientes.

## Licencias

- **Textos y fotografías:** © Francisca Julián Querol, Tadeo Julián Querol y archivo familiar, cada
  cual de lo suyo. **CC BY-NC-ND 4.0**: se pueden copiar y compartir citando a los autores, sin uso
  comercial y sin modificarlos. Las imágenes del pavimento de Santjoans van con **CC BY-NC 3.0**, la
  licencia con la que se publicaron en 2010.
- **Código:** **MIT**.
