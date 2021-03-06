// @flow
import { SongsParser } from '../../SongsParser';

const FontSizes = {
  Notas: '10pt',
  Texto: '12pt',
  Titulo: '19pt',
  Fuente: '10pt',
};

export const WebStyles: SongStyles = {
  title: { color: '#ff0000', fontSize: FontSizes.Titulo },
  source: { color: '#777777', fontSize: FontSizes.Fuente, marginBottom: 16 },
  clampLine: { color: '#ff0000', fontSize: FontSizes.Notas, marginBottom: 16 },
  indicator: { color: '#ff0000', fontSize: FontSizes.Texto },
  notesLine: { color: '#ff0000', fontSize: FontSizes.Notas },
  specialNoteTitle: { color: '#ff0000', fontSize: FontSizes.Texto },
  specialNote: { color: '#444444', fontSize: FontSizes.Texto },
  notesMarginLine: { color: '#ff0000', fontSize: FontSizes.Notas },
  normalLine: { color: '#000000', fontSize: FontSizes.Texto },
  pageNumber: { color: '#000000' },
  prefix: { color: '#777777', fontSize: FontSizes.Texto },
};

export const WebParser = new SongsParser(WebStyles);
