import dades from '../../../content/metriques.json';

export type Lang = 'es' | 'ca';
export const LANGS = ['es', 'ca'] as const satisfies readonly Lang[];
export const LANG_PER_DEFECTE: Lang = 'es';
export const CODI_IDIOMA: Record<Lang, string> = { es: 'es', ca: 'ca' };

/** Texto con una version por idioma. */
export type T = Record<Lang, string>;

export const LLOC = {
  url: 'https://franciscajulianquerol.es/',
  nom: 'Francisca Julián Querol',
  titol: {
    es: 'Francisca Julián Querol',
    ca: 'Francisca Julián Querol',
  } as T,
  lema: {
    es: 'Un libro, un estudio, una guía de campo, dieciséis años de blog y los escritos que quedaban en el ordenador, de Cinctorres a Castelló',
    ca: "Un llibre, un estudi, una guia de camp, setze anys de blog i els escrits que quedaven a l'ordinador, de Cinctorres a Castelló",
  } as T,
  descripcio: {
    es: 'La obra de Francisca Julián Querol («Paquita»), de Cinctorres: el libro «Masos de Morella», el estudio del pavimento cerámico del Palau Santjoans, la guía de biodiversidad de la rambla de Celumbres, el blog «Les meues coses» y los escritos inéditos que quedaban en su ordenador. Sigue escribiendo, a un ritmo más pausado. Cinco ediciones digitales familiares, sin publicidad y sin cookies.',
    ca: "L'obra de Francisca Julián Querol («Paquita»), de Cinctorres: el llibre «Masos de Morella», l'estudi del paviment ceràmic del Palau Santjoans, la guia de biodiversitat de la rambla de Celumbres, el blog «Les meues coses» i els escrits inèdits que quedaven al seu ordinador. Continua escrivint, a un ritme més pausat. Cinc edicions digitals familiars, sense publicitat i sense galetes.",
  } as T,
  locale: { es: 'es-ES', ca: 'ca-ES' } as T,
  repositori: 'https://github.com/jtpadilla/franciscajulianquerol',
  editor: 'Juan Tadeo Padilla Julián',
  /** Primer proyecto publicado (Masies de Morella, UJI) y ano de esta portada. */
  anys: [2006, 2026] as const,
};

// --------------------------------------------------------------------------- metricas

/** Cifras de un proyecto, tal como las cuenta tools/metriques.py. */
export interface MetriquesProjecte {
  textos: number;
  unitat: 'capitols' | 'guies' | 'entrades' | 'peces' | 'escrits';
  paraules: number;
  /** Escritos ineditos: en cuantas obras se agrupan los textos. */
  obres?: number;
  fotografies?: number;
  illustracions?: number;
  traduccions?: number;
  idiomes?: number;
  comentaris?: number;
  peces?: number;
  posicions?: number;
  resolucions?: number;
  fitxers_imatge?: number;
}

export interface Metriques {
  generat: string;
  arrel: string;
  projectes: Record<string, MetriquesProjecte>;
  totals: {
    projectes: number;
    textos: number;
    paraules: number;
    fotografies: number;
    illustracions: number;
    peces: number;
    traduccions: number;
    comentaris: number;
    obres: number;
  };
}

/** Las cifras NO se escriben a mano: salen de `python3 tools/metriques.py`. */
export const METRIQUES = dades as Metriques;

// ------------------------------------------------------------------------------- urls

/** Base del sitio, sin la barra final ('/franciscajulianquerol'). */
export const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** El castellano va en la raiz; el valenciano, bajo /ca/. */
export const prefix = (lang: Lang) => `${BASE}${lang === LANG_PER_DEFECTE ? '' : `/${lang}`}`;

export type PaginaKey = 'autora' | 'edicio';

export const PAGINES: Record<PaginaKey, { slug: T; nom: T }> = {
  autora: {
    slug: { es: 'la-autora', ca: 'l-autora' },
    nom: { es: 'La autora', ca: "L'autora" },
  },
  edicio: {
    slug: { es: 'esta-pagina', ca: 'esta-pagina' },
    nom: { es: 'Sobre esta página', ca: 'Sobre esta pàgina' },
  },
};

export const PAGINA_KEYS = Object.keys(PAGINES) as PaginaKey[];

export const urlInici = (lang: Lang) => `${prefix(lang)}/`;
export const urlPagina = (lang: Lang, key: PaginaKey) => `${prefix(lang)}/${PAGINES[key].slug[lang]}/`;
export const urlPublic = (fitxer: string) => `${BASE}/${fitxer}`;

/** La misma pagina en cada idioma, para el selector y los hreflang. */
export type Alternatives = Record<Lang, string>;
export const alternativesInici = (): Alternatives => ({ es: urlInici('es'), ca: urlInici('ca') });
export const alternativesPagina = (key: PaginaKey): Alternatives => ({
  es: urlPagina('es', key),
  ca: urlPagina('ca', key),
});

// ------------------------------------------------------------------------------ numeros

/**
 * 70265 -> «70.265» en castellano y en valenciano. `useGrouping: 'always'` porque, sin el, el
 * castellano deja los numeros de cuatro cifras sin punto («8104») y quedan al lado de «27.170».
 */
export const xifra = (n: number, lang: Lang) =>
  n.toLocaleString(LLOC.locale[lang], { useGrouping: 'always' });
