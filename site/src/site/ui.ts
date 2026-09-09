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
    'Nació en Cinctorres en 1945, trabajó treinta y cinco años en el mercado de Sant Antoni de Castelló y, ya jubilada, se matriculó en la Universitat per a Majors. Desde entonces ha escrito un libro sobre la vida en los masos, ha estudiado el pavimento cerámico de una casa del pueblo, ha recorrido una rambla identificando lo que crece y lo que vuela, ha llevado un blog durante dieciséis años y ha dejado en el ordenador muchos más escritos que ahora salen a la luz. Y sigue escribiendo, a un ritmo más pausado.',
  saberMes: 'Conocer a la autora',
  veureObra: 'Ver la obra',

  // -------------------------------------------------------------------- cifras
  xifresTitol: 'Lo que hay, contado',
  /** Enlaza a «Sobre esta página», que explica que las cifras las cuenta un guion. */
  xifresPeu: (data: string) => `contadas el ${data}`,
  metriques: {
    projectes: ['proyecto', 'proyectos'],
    textos: ['texto', 'textos'],
    paraules: ['palabra', 'palabras'],
    fotografies: ['fotografía', 'fotografías'],
    peces: ['pieza cerámica', 'piezas cerámicas'],
  } as Record<string, [string, string]>,

  // --------------------------------------------------------------------- indice
  indexTitol: 'La obra',
  indexIntro:
    'Seis proyectos, cada uno en su repositorio y con su propio sitio. Se recuperan y se publican por orden de antigüedad de la obra, no de la edición.',
  anarAlLloc: 'Ir al sitio',
  codiFont: 'Repositorio',
  rol: 'Su papel',

  tipus: {
    llibre: 'Libro',
    estudi: 'Estudio',
    guia: 'Guía de campo',
    blog: 'Blog',
    inedits: 'Inéditos',
  } as Record<string, string>,

  unitats: {
    capitols: ['capítulo', 'capítulos'],
    guies: ['guía', 'guías'],
    entrades: ['entrada', 'entradas'],
    peces: ['pieza', 'piezas'],
    escrits: ['escrito', 'escritos'],
  } as Record<string, [string, string]>,

  posicions: (n: string) => `${n} posiciones en el pavimento`,
  idiomes: (n: string) => `${n} idiomas`,
  obres: ['obra', 'obras'] as [string, string],
  fitxes: (n: string) => `${n} fichas del catálogo`,

  // ---------------------------------------------------------------- novedades
  novetatsTitol: 'Novedades',
  /** La cabecera de la portada, junto a la novedad de obra más reciente. */
  ultimaNovetat: 'Última novedad',
  /** La banda de la portada, cuando la última ya va en la cabecera. */
  novetatsAnteriors: 'Novedades anteriores',
  novetatsResum:
    'Cada proyecto que se incorpora y cada vez que uno crece, con su fecha. La lista la escribe el recuento, no una persona.',
  novetatsExplicacio:
    'La autora sigue escribiendo, y los proyectos crecen cuando llega algo nuevo. Cada vez que se recalculan las cifras, el guion compara el recuento con el anterior y anota aquí lo que ha cambiado: un proyecto nuevo, o textos, fotografías o piezas de más en uno que ya estaba. Las correcciones pequeñas no cuentan.',
  novetatsTotes: 'Todas las novedades',
  novetatsCap: 'Todavía no hay novedades.',
  /** «Masos de Morella se incorpora a la portada» */
  novetatNou: (titol: string) => `${titol} se incorpora a la portada`,
  /** «Les meues coses crece: +2 entradas · +1.200 palabras» */
  novetatCreix: (titol: string, canvis: string) => `${titol} crece: ${canvis}`,
  /** La etiqueta de la ficha mientras la novedad es reciente. */
  novetatEtiqueta: { nou: 'Nuevo', creix: 'Ampliado' } as Record<string, string>,
  /** Nombres de las cifras que pueden crecer y que no tienen ya su plural mas arriba. */
  canvis: {
    illustracions: ['ilustración', 'ilustraciones'],
    fitxes: ['ficha del catálogo', 'fichas del catálogo'],
    comentaris: ['comentario', 'comentarios'],
  } as Record<string, [string, string]>,

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
    "Va nàixer a Cinctorres el 1945, va treballar trenta-cinc anys al mercat de Sant Antoni de Castelló i, ja jubilada, es va matricular a la Universitat per a Majors. Des d'aleshores ha escrit un llibre sobre la vida als masos, ha estudiat el paviment ceràmic d'una casa del poble, ha recorregut una rambla identificant el que hi creix i el que hi vola, ha portat un blog durant setze anys i ha deixat a l'ordinador molts més escrits que ara ixen a la llum. I continua escrivint, a un ritme més pausat.",
  saberMes: "Conéixer l'autora",
  veureObra: "Veure l'obra",

  xifresTitol: 'El que hi ha, comptat',
  xifresPeu: (data: string) => `comptades el ${data}`,
  metriques: {
    projectes: ['projecte', 'projectes'],
    textos: ['text', 'textos'],
    paraules: ['paraula', 'paraules'],
    fotografies: ['fotografia', 'fotografies'],
    peces: ['peça ceràmica', 'peces ceràmiques'],
  },

  indexTitol: "L'obra",
  indexIntro:
    "Sis projectes, cadascú al seu repositori i amb el seu lloc. Es recuperen i es publiquen per ordre d'antiguitat de l'obra, no de l'edició.",
  anarAlLloc: 'Anar al lloc',
  codiFont: 'Repositori',
  rol: 'El seu paper',

  tipus: {
    llibre: 'Llibre',
    estudi: 'Estudi',
    guia: 'Guia de camp',
    blog: 'Blog',
    inedits: 'Inèdits',
  },

  unitats: {
    capitols: ['capítol', 'capítols'],
    guies: ['guia', 'guies'],
    entrades: ['entrada', 'entrades'],
    peces: ['peça', 'peces'],
    escrits: ['escrit', 'escrits'],
  },

  posicions: (n: string) => `${n} posicions al paviment`,
  idiomes: (n: string) => `${n} idiomes`,
  obres: ['obra', 'obres'] as [string, string],
  fitxes: (n: string) => `${n} fitxes del catàleg`,

  novetatsTitol: 'Novetats',
  ultimaNovetat: 'Última novetat',
  novetatsAnteriors: 'Novetats anteriors',
  novetatsResum:
    'Cada projecte que s\'incorpora i cada vegada que un creix, amb la seua data. La llista l\'escriu el recompte, no una persona.',
  novetatsExplicacio:
    "L'autora continua escrivint, i els projectes creixen quan arriba alguna cosa nova. Cada vegada que es recalculen les xifres, el guió compara el recompte amb l'anterior i anota ací el que ha canviat: un projecte nou, o textos, fotografies o peces de més en un que ja hi era. Les correccions xicotetes no compten.",
  novetatsTotes: 'Totes les novetats',
  novetatsCap: 'Encara no hi ha novetats.',
  novetatNou: (titol: string) => `${titol} s'incorpora a la portada`,
  novetatCreix: (titol: string, canvis: string) => `${titol} creix: ${canvis}`,
  novetatEtiqueta: { nou: 'Nou', creix: 'Ampliat' },
  canvis: {
    illustracions: ['il·lustració', 'il·lustracions'],
    fitxes: ['fitxa del catàleg', 'fitxes del catàleg'],
    comentaris: ['comentari', 'comentaris'],
  },

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
  if (m.obres) linies.push(compta(m.obres, t.obres, lang));
  if (m.paraules > 0) linies.push(compta(m.paraules, t.metriques.paraules!, lang));
  if (m.peces) linies.push(compta(m.peces, t.metriques.peces!, lang));
  if (m.posicions) linies.push(t.posicions(xifra(m.posicions, lang)));
  if (m.fotografies) linies.push(compta(m.fotografies, t.metriques.fotografies!, lang));
  if (m.fitxes) linies.push(t.fitxes(xifra(m.fitxes, lang)));
  if (m.idiomes) linies.push(t.idiomes(xifra(m.idiomes, lang)));
  return linies;
}

/**
 * «+2 entradas · +1.200 palabras»: los cambios de una novedad «creix», en el orden del JSON.
 * El nombre de `textos` es la unidad del proyecto (entradas, escritos...), como en la ficha.
 */
export function textCanvis(canvis: Record<string, number>, m: MetriquesProjecte, lang: Lang): string {
  const t = ui(lang);
  const nom = (camp: string): [string, string] | undefined =>
    camp === 'textos' ? t.unitats[m.unitat] : camp === 'obres' ? t.obres : t.metriques[camp] ?? t.canvis[camp];
  return Object.entries(canvis)
    .filter(([camp, n]) => n > 0 && nom(camp))
    .map(([camp, n]) => `+${compta(n, nom(camp)!, lang)}`)
    .join(' · ');
}
