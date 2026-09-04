import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** Texto con una version en cada idioma del sitio. */
const bilingue = z.object({ es: z.string(), ca: z.string() });

export const collections = {
  /**
   * Las fichas del indice, una por proyecto, en ../content/projectes (fuera del proyecto Astro).
   * Anadir un proyecto = anadir un fichero aqui; no hay que tocar ninguna plantilla.
   */
  projectes: defineCollection({
    loader: glob({ pattern: '*.yaml', base: '../content/projectes' }),
    schema: ({ image }) =>
      z.object({
        slug: z.string(),
        ordre: z.number(),
        titol: z.string(),
        tipus: z.enum(['llibre', 'estudi', 'guia', 'blog']),
        anys: z.string(),
        rol: bilingue,
        subtitol: bilingue,
        descripcio: bilingue,
        url: z.string().url(),
        repositori: z.string().url(),
        portada: image(),
        portadaAlt: bilingue,
      }),
  }),

  /** Las paginas de prosa: autora.<lang>.md y edicio.<lang>.md, en ../content. */
  pagines: defineCollection({
    loader: glob({ pattern: '*.md', base: '../content' }),
    schema: ({ image }) =>
      z.object({
        key: z.enum(['autora', 'edicio']),
        lang: z.enum(['es', 'ca']),
        title: z.string(),
        resum: z.string(),
        retrat: image().optional(),
      }),
  }),
};

