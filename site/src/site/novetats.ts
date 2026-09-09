import dades from '../../../content/novetats.json';
import { LLOC, type Lang, type T } from './config';

/**
 * Las novedades: lo que anota `tools/metriques.py` cada vez que un proyecto se incorpora («nou») o
 * crece («creix»), mas las notas escritas a mano («nota»). El fichero solo crece; ver CLAUDE.md.
 */
export interface Novetat {
  data: string;
  tipus: 'nou' | 'creix' | 'nota';
  /** slug del proyecto (= clave en metriques.json); las notas pueden no tenerlo */
  projecte?: string;
  /** solo «creix»: cifra -> cuanto ha subido */
  canvis?: Record<string, number>;
  /** solo «nota»: el texto, en los dos idiomas */
  nota?: T;
  /** solo «nota»: a donde lleva, si lleva a algun sitio */
  url?: string;
}

/** Todas, de la mas reciente a la mas antigua (en el fichero van al reves). */
export const NOVETATS: Novetat[] = [...(dades as { novetats: Novetat[] }).novetats].reverse();

/**
 * La ultima novedad de obra (un proyecto nuevo o uno que crece), que la cabecera de la portada
 * ensena con su fecha: quien vuelve de tarde en tarde sabe de un vistazo si hay algo desde la
 * ultima visita. Las notas (dominio, estreno...) no cuentan aqui: van a la banda y a /novedades/.
 */
export const NOVETAT_ULTIMA: Novetat | undefined = NOVETATS.find((n) => n.tipus !== 'nota');

/** Cuantas ensena la banda de la portada, sin contar la que ya va en la cabecera. */
export const NOVETATS_PORTADA = 3;

/** Dias durante los que la ficha de un proyecto lleva la etiqueta «Nuevo» o «Ampliado». */
export const DIES_RECENT = 90;

/** La novedad mas reciente de un proyecto, si la tiene y no es mas vieja que DIES_RECENT dias. */
export function novetatRecent(slug: string, avui = new Date()): Novetat | undefined {
  const n = NOVETATS.find((x) => x.projecte === slug && x.tipus !== 'nota');
  if (!n) return undefined;
  const dies = (avui.getTime() - new Date(n.data).getTime()) / 86_400_000;
  return dies <= DIES_RECENT ? n : undefined;
}

/** «8 de septiembre de 2026» */
export const dataLlarga = (iso: string, lang: Lang) =>
  new Date(iso).toLocaleDateString(LLOC.locale[lang], { day: 'numeric', month: 'long', year: 'numeric' });
