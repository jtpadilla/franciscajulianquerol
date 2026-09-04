import { type Lang, type MetriquesProjecte, xifra } from './config';

const es = {
  idioma: 'Castellano',
  idiomaCurt: 'ES',
  idiomaEtiqueta: 'Idioma',
  saltar: 'Saltar al contenido',
  menu: 'Menú',
  inici: 'Portada',

  // ------------------------------------------------------------------ portada
  entradeta:
    'Nació en Cinctorres en 1945, trabajó treinta y cinco años en el mercado de Sant Antoni de Castelló y, ya jubilada, se matriculó en la Universitat per a Majors. Desde entonces ha escrito un libro sobre la vida en los masos, ha estudiado el pavimento cerámico de una casa del pueblo, ha recorrido una rambla identificando lo que crece y lo que vuela, y ha llevado un blog durante dieciséis años.',
  saberMes: 'Conocer a la autora',
  veureObra: 'Ver la obra',

  // -------------------------------------------------------------------- cifras
  xifresTitol: 'Lo que hay, contado',
  xifresPeu: (data: string) =>
    `Cifras contadas por «tools/metriques.py» sobre los repositorios de los cuatro proyectos, el ${data}. No están escritas a mano.`,
  metriques: {
    projectes: ['proyecto', 'proyectos'],
    textos: ['texto', 'textos'],
    paraules: ['palabra', 'palabras'],
    fotografies: ['fotografía', 'fotografías'],
    peces: ['pieza cerámica', 'piezas cerámicas'],
    traduccions: ['texto traducido', 'textos traducidos'],
  } as Record<string, [string, string]>,

  // --------------------------------------------------------------------- indice
  indexTitol: 'La obra',
  indexIntro:
    'Cuatro proyectos, cada uno en su repositorio y con su propio sitio. Se recuperan y se publican por orden de antigüedad de la obra, no de la edición.',
  anarAlLloc: 'Ir al sitio',
  codiFont: 'Repositorio',
  rol: 'Su papel',

  tipus: {
    llibre: 'Libro',
    estudi: 'Estudio',
    guia: 'Guía de campo',
    blog: 'Blog',
  } as Record<string, string>,

  unitats: {
    capitols: ['capítulo', 'capítulos'],
    guies: ['guía', 'guías'],
    entrades: ['entrada', 'entradas'],
    peces: ['pieza', 'piezas'],
  } as Record<string, [string, string]>,

  posicions: (n: string) => `${n} posiciones en el pavimento`,
  idiomes: (n: string) => `${n} idiomas`,

  // ------------------------------------------------------------------------ pie
  peuNota:
    'Iniciativa familiar sin ánimo de lucro, sin publicidad y sin cookies, para que el trabajo de Paquita siga a la vista de quien quiera mirarlo.',
  peuEdicio: (editor: string) => `Edición digital a cargo de ${editor}`,
  peuCorreccions: 'Para cualquier corrección, abrir una incidencia en el repositorio del proyecto.',
  aquestaPagina: 'Esta página',
  projectes: 'Proyectos',

  // ------------------------------------------------------------------------ 404
  noTrobada: 'Página no encontrada',
  noTrobadaText: 'La dirección que buscas no existe en esta portada.',
  tornar: 'Volver a la portada',
};

const ca: typeof es = {
  idioma: 'Valencià',
  idiomaCurt: 'VA',
  idiomaEtiqueta: 'Idioma',
  saltar: 'Passar al contingut',
  menu: 'Menú',
  inici: 'Portada',

  entradeta:
    "Va nàixer a Cinctorres el 1945, va treballar trenta-cinc anys al mercat de Sant Antoni de Castelló i, ja jubilada, es va matricular a la Universitat per a Majors. Des d'aleshores ha escrit un llibre sobre la vida als masos, ha estudiat el paviment ceràmic d'una casa del poble, ha recorregut una rambla identificant el que hi creix i el que hi vola, i ha portat un blog durant setze anys.",
  saberMes: "Conéixer l'autora",
  veureObra: "Veure l'obra",

  xifresTitol: 'El que hi ha, comptat',
  xifresPeu: (data: string) =>
    `Xifres comptades per «tools/metriques.py» sobre els repositoris dels quatre projectes, el ${data}. No estan escrites a mà.`,
  metriques: {
    projectes: ['projecte', 'projectes'],
    textos: ['text', 'textos'],
    paraules: ['paraula', 'paraules'],
    fotografies: ['fotografia', 'fotografies'],
    peces: ['peça ceràmica', 'peces ceràmiques'],
    traduccions: ['text traduït', 'textos traduïts'],
  },

  indexTitol: "L'obra",
  indexIntro:
    "Quatre projectes, cadascú al seu repositori i amb el seu lloc. Es recuperen i es publiquen per ordre d'antiguitat de l'obra, no de l'edició.",
  anarAlLloc: 'Anar al lloc',
  codiFont: 'Repositori',
  rol: 'El seu paper',

  tipus: {
    llibre: 'Llibre',
    estudi: 'Estudi',
    guia: 'Guia de camp',
    blog: 'Blog',
  },

  unitats: {
    capitols: ['capítol', 'capítols'],
    guies: ['guia', 'guies'],
    entrades: ['entrada', 'entrades'],
    peces: ['peça', 'peces'],
  },

  posicions: (n: string) => `${n} posicions al paviment`,
  idiomes: (n: string) => `${n} idiomes`,

  peuNota:
    'Iniciativa familiar sense ànim de lucre, sense publicitat i sense galetes, perquè el treball de la Paquita continue a la vista de qui vulga mirar-lo.',
  peuEdicio: (editor: string) => `Edició digital a cura de ${editor}`,
  peuCorreccions: 'Per a qualsevol correcció, obrir una incidència al repositori del projecte.',
  aquestaPagina: 'Esta pàgina',
  projectes: 'Projectes',

  noTrobada: 'Pàgina no trobada',
  noTrobadaText: "L'adreça que busques no existix en esta portada.",
  tornar: 'Tornar a la portada',
};

const TEXTOS: Record<Lang, typeof es> = { es, ca };
export const ui = (lang: Lang) => TEXTOS[lang];

/** «34.991 palabras» / «1 palabra»: el plural lo decide el numero, no el idioma. */
export const compta = (n: number, [singular, plural]: [string, string], lang: Lang) =>
  `${xifra(n, lang)} ${n === 1 ? singular : plural}`;

/**
 * Las cifras que se muestran en la ficha de un proyecto, en el orden en que se leen.
 * Sale de lo que trae metriques.json: un proyecto sin fotografias, por ejemplo, no las menciona.
 */
export function xifresProjecte(m: MetriquesProjecte, lang: Lang): string[] {
  const t = ui(lang);
  const linies: string[] = [];
  if (m.textos > 0) linies.push(compta(m.textos, t.unitats[m.unitat]!, lang));
  if (m.paraules > 0) linies.push(compta(m.paraules, t.metriques.paraules!, lang));
  if (m.peces) linies.push(compta(m.peces, t.metriques.peces!, lang));
  if (m.posicions) linies.push(t.posicions(xifra(m.posicions, lang)));
  if (m.fotografies) linies.push(compta(m.fotografies, t.metriques.fotografies!, lang));
  if (m.idiomes) linies.push(t.idiomes(xifra(m.idiomes, lang)));
  return linies;
}
