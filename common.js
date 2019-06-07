// @flow
// Utilerias comunes (no atadas a react-native ni a NodeJS)
const PDFDocument = require('./pdfkit.standalone.js');
import normalize from 'normalize-strings';
import langs from 'langs';
import I18n from './translations';

export const cleanChordsRegex = /\[|\]|\(|\)|#|\*|5|6|7|9|b|-|\+|\/|\u2013|\u2217|aum|dim|m|is|IS/g;

export const getChordsScale = (locale: string): Array<string> => {
  return I18n.t('chords.scale', { locale }).split(' ');
};

export const getPropertyLocale = (obj: any, rawLoc: string) => {
  if (obj.hasOwnProperty(rawLoc)) {
    return rawLoc;
  } else {
    const locale = rawLoc.split('-')[0];
    if (obj.hasOwnProperty(locale)) {
      return locale;
    }
  }
};

export const getLocalesForPicker = (
  defaultLocale: string
): Array<PickerLocale> => {
  var locales = [
    {
      label: `${I18n.t('ui.default')} (${defaultLocale})`,
      value: 'default'
    }
  ];
  for (var code in I18n.translations) {
    var l = langs.where('1', code.split('-')[0]);
    locales.push({ label: `${l.local} (${code})`, value: code });
  }
  return locales;
};

export const getValidatedLocale = (
  availableLocales: Array<PickerLocale>,
  locale: string
): ?PickerLocale => {
  const loc = locale.split('-')[0];
  const best = availableLocales.find(
    l => l.value === locale || l.value === loc
  );
  return best;
};

var pdfVars = {
  marginLeft: 25,
  marginTop: 19,
  widthHeightPixels: 598, // 21,1 cm
  songTitle: { FontSize: 19, Spacing: 19 },
  songSource: { FontSize: 10, Spacing: 20 },
  songText: { FontSize: 12, Spacing: 11 },
  songNote: { FontSize: 10 },
  songIndicatorSpacing: 18,
  songParagraphSpacing: 9,
  indexTitle: { FontSize: 16, Spacing: 14 },
  bookTitle: { FontSize: 80, Spacing: 10 },
  bookSubtitle: { FontSize: 14 },
  indexSubtitle: { FontSize: 12, Spacing: 4 },
  indexText: { FontSize: 11, Spacing: 3 },
  indexExtraMarginLeft: 25,
  primerColumnaX: 0,
  segundaColumnaX: 0,
  primerColumnaIndexX: 0,
  segundaColumnaIndexX: 0
};

pdfVars.primerColumnaX = pdfVars.marginLeft;
pdfVars.segundaColumnaX =
  pdfVars.widthHeightPixels / 2 + pdfVars.primerColumnaX;
pdfVars.primerColumnaIndexX = pdfVars.marginLeft + pdfVars.indexExtraMarginLeft;
pdfVars.segundaColumnaIndexX =
  pdfVars.widthHeightPixels / 2 + pdfVars.indexExtraMarginLeft;

export const pdfValues = pdfVars;

export const asyncForEach = async (array: Array<any>, callback: Function) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export const getAlphaWithSeparators = (
  songsToPdf: Array<SongToPdf>
): Array<string> => {
  // Alfabetico
  var items = songsToPdf.map(data => {
    const sameName = songsToPdf.filter(d => d.song.titulo === data.song.titulo);
    return sameName.length > 1 ? data.song.nombre : data.song.titulo;
  });
  var i = 0;
  var letter = normalize(items[i][0]);
  while (i < items.length) {
    const curLetter = normalize(items[i][0]);
    if (curLetter !== letter) {
      letter = curLetter;
      items.splice(i, 0, '');
    }
    i++;
  }
  return items;
};

export const wayStages = [
  'precatechumenate',
  'liturgy',
  'catechumenate',
  'election'
];

export const getGroupedByStage = (songsToPdf: Array<SongToPdf>): any => {
  // Agrupados por stage
  return songsToPdf.reduce((groups, data) => {
    const groupKey = data.song.stage;
    groups[groupKey] = groups[groupKey] || [];
    const sameName = songsToPdf.filter(d => d.song.titulo === data.song.titulo);
    const title = sameName.length > 1 ? data.song.nombre : data.song.titulo;
    groups[groupKey].push(title);
    return groups;
  }, {});
};

export const liturgicTimes = [
  'advent',
  'christmas',
  'lent',
  'easter',
  'pentecost'
];

export const getGroupedByLiturgicTime = (songsToPdf: Array<SongToPdf>): any => {
  // Agrupados por tiempo liturgico
  return songsToPdf.reduce((groups, data) => {
    var times = liturgicTimes.filter(t => data.song[t] === true);
    times.forEach(t => {
      groups[t] = groups[t] || [];
      const sameName = songsToPdf.filter(
        d => d.song.titulo === data.song.titulo
      );
      const title = sameName.length > 1 ? data.song.nombre : data.song.titulo;
      groups[t].push(title);
    });
    return groups;
  }, {});
};

export const liturgicOrder = [
  'signing to the virgin',
  /* eslint-disable quotes */
  "children's songs",
  /* eslint-enable quotes */
  'lutes and vespers',
  'entrance',
  'peace and offerings',
  'fraction of bread',
  'communion',
  'exit'
];

export const getGroupedByLiturgicOrder = (
  songsToPdf: Array<SongToPdf>
): any => {
  // Agrupados por tiempo liturgico
  return songsToPdf.reduce((groups, data) => {
    var times = liturgicOrder.filter(t => data.song[t] === true);
    times.forEach(t => {
      groups[t] = groups[t] || [];
      const sameName = songsToPdf.filter(
        d => d.song.titulo === data.song.titulo
      );
      const title = sameName.length > 1 ? data.song.nombre : data.song.titulo;
      groups[t].push(title);
    });
    return groups;
  }, {});
};

export const PdfStyles: SongStyles = {
  title: { color: '#ff0000' },
  source: { color: '#777777' },
  clampLine: { color: '#ff0000' },
  indicator: { color: '#ff0000' },
  notesLine: { color: '#ff0000' },
  specialNoteTitle: { color: '#ff0000' },
  specialNote: { color: '#444444' },
  notesMarginLine: { color: '#ff0000' },
  normalLine: { color: '#000000' },
  pageNumber: { color: '#000000' },
  prefix: { color: '#777777' }
};

export class PdfWriter {
  pos: ExportToPdfCoord;
  pageNumber: number;
  resetY: number;
  limiteHoja: number;
  primerFilaY: number;
  doc: any;
  base64Transform: any;

  constructor(fontBuf: any, base64Transform: any) {
    this.limiteHoja = pdfValues.widthHeightPixels - pdfValues.marginTop * 2;
    this.primerFilaY = pdfValues.marginTop;
    this.pageNumber = 1;
    this.pos = {
      x: 0,
      y: 0
    };
    this.doc = new PDFDocument({
      bufferPages: true,
      autoFirstPage: false,
      size: [pdfValues.widthHeightPixels, pdfValues.widthHeightPixels]
    });
    if (fontBuf) {
      this.doc.registerFont('thefont', fontBuf);
      this.doc.font('thefont');
    } else {
      this.doc.font('Times-Roman');
    }
    this.base64Transform = base64Transform;
  }

  checkLimitsCore(height: number) {
    return this.pos.y + height >= this.limiteHoja;
  }

  createPage() {
    this.doc.addPage();
  }

  positionIndex() {
    this.pos = {
      x: pdfValues.primerColumnaIndexX,
      y: this.primerFilaY
    };
  }

  positionSong() {
    this.pos = {
      x: pdfValues.primerColumnaX,
      y: this.primerFilaY
    };
  }

  positionStartLine() {
    this.pos = {
      x: pdfValues.primerColumnaX,
      y: this.pos.y
    };
  }

  async writePageNumber() {
    this.pos.x = pdfValues.widthHeightPixels / 2;
    this.pos.y = this.limiteHoja;
    this.writeTextCore(
      this.pageNumber.toString(),
      PdfStyles.pageNumber.color,
      pdfValues.songText.FontSize
    );
  }

  async checkLimits(height: number, firstCol: number, secondCol: number) {
    if (this.checkLimitsCore(height)) {
      if (this.pos.x == secondCol) {
        await this.writePageNumber();
        this.pageNumber++;
        this.pos.x = firstCol;
        this.resetY = this.primerFilaY;
        this.createPage();
      } else {
        this.pos.x = secondCol;
      }
      this.pos.y = this.resetY;
    }
  }

  async writeTextCentered(text: string, color: any, size: number) {
    var saveX = this.pos.x;
    this.pos.x = await this.getCenteringX(text, size);
    await this.writeTextCore(text, color, size);
    this.pos.x = saveX;
  }

  moveToNextLine(height: number) {
    this.pos.y += height;
  }

  setNewColumnY(height: number) {
    this.resetY = this.pos.y + height;
  }

  async getCenteringX(text: string, size: number) {
    const width = this.doc.fontSize(size).widthOfString(text);
    return parseInt((pdfValues.widthHeightPixels - width) / 2);
  }

  async getCenteringY(text: string, size: number) {
    const height = this.doc.fontSize(size).heightOfString(text);
    return parseInt((pdfValues.widthHeightPixels - height) / 2);
  }

  async writeTextCore(
    text: string,
    color: any,
    size: number,
    xOffset?: number
  ): Promise<number> {
    const x = xOffset ? this.pos.x + xOffset : this.pos.x;
    this.doc
      .fillColor(color)
      .fontSize(size)
      .text(text, x, this.pos.y, {
        lineBreak: false
      });
    return this.doc.fontSize(size).widthOfString(text) + x;
  }

  async drawLineText(line: ExportToPdfLineText, size: number) {
    this.doc
      .moveTo(line.x, line.startY)
      .lineTo(line.x, line.endY)
      .stroke(line.color);
    const middle = (line.endY - line.startY) / 2;
    this.doc
      .fillColor(line.color)
      .fontSize(size)
      .text(line.text, line.x + 10, line.startY + middle - size, {
        lineBreak: false
      });
  }

  async save() {
    return new Promise((resolve, reject) => {
      var stream = this.doc.pipe(this.base64Transform);
      var str = '';
      stream.on('error', err => {
        reject(err);
      });
      stream.on('data', data => {
        str += data;
      });
      stream.on('finish', () => {
        resolve(str);
      });
      this.doc.end();
    });
  }

  async generateListing(title: string, items: any) {
    const height =
      pdfValues.indexSubtitle.FontSize + pdfValues.indexSubtitle.Spacing;
    await this.checkLimits(
      height,
      pdfValues.primerColumnaIndexX,
      pdfValues.segundaColumnaIndexX
    );
    await this.writeTextCore(
      title.toUpperCase(),
      PdfStyles.title.color,
      pdfValues.indexSubtitle.FontSize
    );
    this.moveToNextLine(height);
    if (items) {
      const itemHeight =
        pdfValues.indexText.FontSize + pdfValues.indexText.Spacing;
      await asyncForEach(items, async str => {
        if (str !== '') {
          await this.checkLimits(
            itemHeight,
            pdfValues.primerColumnaIndexX,
            pdfValues.segundaColumnaIndexX
          );
          await this.writeTextCore(
            str,
            PdfStyles.normalLine.color,
            pdfValues.indexText.FontSize
          );
        }
        this.moveToNextLine(itemHeight);
      });
      if (this.pos.y !== this.primerFilaY) {
        this.moveToNextLine(itemHeight);
      }
    }
  }
}

export const PDFGenerator = async (
  songsToPdf: Array<SongToPdf>,
  opts: ExportToPdfOptions,
  writer: PdfWriter
) => {
  try {
    if (opts.createIndex) {
      // Portada
      writer.createPage();
      const title = I18n.t('ui.export.songs book title').toUpperCase();
      const subtitle = I18n.t('ui.export.songs book subtitle').toUpperCase();

      // Escalar titulo - en español "Resucitó" (9 letras) (A) => pdfValues.bookTitle.FontSize (B)
      // Para otra longitud, cual seria el font size? "Er ist auferstanden" (19 letras) (C) => (X)
      // Regla de 3 inversa X = A * B / C

      const A = I18n.t('ui.export.songs book title', {
        locale: 'es'
      }).length;
      const B = pdfValues.bookTitle.FontSize;
      const C = title.length;
      const X = (A * B) / C;

      const titleFontSize = Math.trunc(X);

      // Titulo
      writer.pos.x = await writer.getCenteringX(title, titleFontSize);
      writer.pos.y = await writer.getCenteringY(
        title,
        titleFontSize +
          pdfValues.bookTitle.Spacing +
          pdfValues.bookSubtitle.FontSize
      );
      writer.writeTextCore(title, PdfStyles.title.color, titleFontSize);

      writer.moveToNextLine(titleFontSize + pdfValues.bookTitle.Spacing);

      // Subtitulo
      writer.pos.x = await writer.getCenteringX(
        subtitle,
        pdfValues.bookSubtitle.FontSize
      );
      writer.writeTextCore(
        subtitle,
        PdfStyles.normalLine.color,
        pdfValues.bookSubtitle.FontSize
      );

      //Indice
      writer.createPage();
      writer.positionIndex();
      const height =
        pdfValues.indexTitle.FontSize + pdfValues.indexTitle.Spacing;
      await writer.writeTextCentered(
        I18n.t('ui.export.songs index').toUpperCase(),
        PdfStyles.title.color,
        pdfValues.indexTitle.FontSize
      );
      writer.moveToNextLine(height);
      writer.setNewColumnY(0);

      // Alfabetico
      var items = getAlphaWithSeparators(songsToPdf);
      await writer.generateListing(I18n.t('search_title.alpha'), items);

      // Agrupados por stage
      var byStage = getGroupedByStage(songsToPdf);
      await asyncForEach(wayStages, async stage => {
        await writer.generateListing(
          I18n.t(`search_title.${stage}`),
          byStage[stage]
        );
      });

      // Agrupados por tiempo liturgico
      var byTime = getGroupedByLiturgicTime(songsToPdf);
      await asyncForEach(liturgicTimes, async (time, i) => {
        var title = I18n.t(`search_title.${time}`);
        if (i === 0) {
          title = I18n.t('search_title.liturgical time') + ` - ${title}`;
        }
        await writer.generateListing(title, byTime[time]);
      });

      // Agrupados por orden liturgico
      var byOrder = getGroupedByLiturgicOrder(songsToPdf);
      await asyncForEach(liturgicOrder, async order => {
        var title = I18n.t(`search_title.${order}`);
        await writer.generateListing(title, byOrder[order]);
      });
      await writer.writePageNumber();
    }

    // Cantos
    await asyncForEach(songsToPdf, async (data: SongToPdf) => {
      const { song, render } = data;
      const { items, indicators } = render;
      writer.createPage();
      writer.positionSong();

      // Titulo del canto
      await writer.writeTextCentered(
        song.titulo.toUpperCase(),
        PdfStyles.title.color,
        pdfValues.songTitle.FontSize
      );

      // Fuente
      writer.moveToNextLine(pdfValues.songTitle.Spacing);
      await writer.writeTextCentered(
        song.fuente,
        PdfStyles.source.color,
        pdfValues.songSource.FontSize
      );

      writer.positionStartLine();
      writer.moveToNextLine(pdfValues.songSource.Spacing);
      writer.setNewColumnY(pdfValues.songParagraphSpacing);
      var lines: Array<ExportToPdfLineText> = [];
      var blockIndicator;
      var blockY;
      var maxX = 0;
      await asyncForEach(items, async (it: SongLine, i: number) => {
        var lastWidth: number = 0;
        if (it.inicioParrafo) {
          writer.moveToNextLine(pdfValues.songParagraphSpacing);
        }
        if (it.tituloEspecial) {
          writer.moveToNextLine(pdfValues.songParagraphSpacing * 2);
        }
        if (indicators.find(r => r.start === i)) {
          blockIndicator = indicators.find(r => r.start === i);
          blockY = writer.pos.y;
        }
        if (blockIndicator && blockIndicator.end === i) {
          var text = '';
          var color = PdfStyles.indicator.color;
          if (blockIndicator.type == 'repeat') {
            text = I18n.t('songs.repeat');
          } else if (blockIndicator.type == 'footnote') {
            text = '*';
          }
          lines.push({
            startY: blockY,
            endY: writer.pos.y,
            x: maxX,
            text,
            color
          });
          blockIndicator = null;
          blockY = 0;
        }
        var alturaExtra = 0;
        if (it.notas) {
          alturaExtra =
            pdfValues.songNote.FontSize + pdfValues.songText.Spacing;
        }
        await writer.checkLimits(
          alturaExtra,
          pdfValues.primerColumnaX,
          pdfValues.segundaColumnaX
        );
        if (it.notas === true) {
          lastWidth = await writer.writeTextCore(
            it.texto,
            PdfStyles.notesLine.color,
            pdfValues.songNote.FontSize,
            pdfValues.songIndicatorSpacing
          );
          writer.moveToNextLine(pdfValues.songText.Spacing);
        } else if (it.canto === true) {
          lastWidth = await writer.writeTextCore(
            it.texto,
            PdfStyles.normalLine.color,
            pdfValues.songText.FontSize,
            pdfValues.songIndicatorSpacing
          );
          writer.moveToNextLine(pdfValues.songText.Spacing);
        } else if (it.cantoConIndicador === true) {
          lastWidth = await writer.writeTextCore(
            it.prefijo,
            PdfStyles.prefix.color,
            pdfValues.songText.FontSize
          );
          if (it.tituloEspecial === true) {
            lastWidth = await writer.writeTextCore(
              it.texto,
              PdfStyles.specialNoteTitle.color,
              pdfValues.songText.FontSize,
              pdfValues.songIndicatorSpacing
            );
          } else if (it.textoEspecial === true) {
            lastWidth = await writer.writeTextCore(
              it.texto,
              PdfStyles.specialNote.color,
              pdfValues.songText.FontSize - 3,
              pdfValues.songIndicatorSpacing
            );
          } else {
            lastWidth = await writer.writeTextCore(
              it.texto,
              PdfStyles.normalLine.color,
              pdfValues.songText.FontSize,
              pdfValues.songIndicatorSpacing
            );
          }
          writer.moveToNextLine(pdfValues.songText.Spacing);
        }
        maxX = Math.trunc(Math.max(writer.pos.x + lastWidth, maxX));
      });
      await asyncForEach(lines, async (line: ExportToPdfLineText) => {
        await writer.drawLineText(line, pdfValues.songText.FontSize);
      });
      if (opts.pageNumbers) {
        await writer.writePageNumber();
      }
    });
    return await writer.save();
  } catch (err) {
    console.log('generatePDF ERROR', err);
  }
};
