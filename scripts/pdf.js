// @flow
import * as fs from 'fs';
import * as os from 'os';
import { PdfWriter, PDFGenerator } from '../common';
import { Base64Encode } from 'base64-stream';

export async function generatePDF(
  songsToPdf: Array<SongToPdf>,
  opts: ExportToPdfOptions
) {
  const folder = os.tmpdir();

  const pdfPath = opts.createIndex
    ? `${folder}/iResucito${opts.fileSuffix}.pdf`
    : `${folder}/${songsToPdf[0].song.titulo}.pdf`;

  const ttf = fs.readFileSync(
    './assets/fonts/Franklin Gothic Medium.ttf',
    'base64'
  );

  var writer = new PdfWriter(Buffer.from(ttf, 'base64'), new Base64Encode());
  const base64 = await PDFGenerator(songsToPdf, opts, writer);
  if (base64) {
    fs.writeFileSync(pdfPath, Buffer.from(base64, 'base64'));
    return pdfPath;
  }
}