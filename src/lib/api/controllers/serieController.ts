import { getSerieFromMarkdownFile, getSerieDirectory } from '@api/databases/serieDatabase';
import { Serie } from '@api/models/serie';
import { getFilenameWithExtension } from '@api/helpers/fileHelper';
import { sortSeriesByLastUpdate } from '@api/helpers/serieHelper';
import { getMarkdownFilenames } from '@api/databases/markdownDatabase';

/** @constant {string} The default serie order */
const DEFAULT_SERIE_ORDER = 'descending';

/**
 * Get a serie.
 *
 * @param {string} serieSlug - The serie name.
 * @returns {Serie} The serie.
 */
export function getSerie(serieSlug: string): Serie {
  const serieDirectory: string = getSerieDirectory();
  const serieFilenames: string[] = getMarkdownFilenames(serieDirectory);
  const serieFilename: string = getFilenameWithExtension(
    serieSlug,
    serieFilenames
  );
  return getSerieFromMarkdownFile(serieFilename, serieDirectory);
}

/**
 * Get all the series.
 *
 * @param {string} [serieOrder=DEFAULT_SERIE_ORDER] - The serie order.
 * @returns {Serie[]} The series.
 */
export function getAllSeries(
  serieOrder: string = DEFAULT_SERIE_ORDER
): Serie[] {
  const serieDirectory: string = getSerieDirectory();
  const serieFilenames: string[] = getMarkdownFilenames(serieDirectory);
  const series: Serie[] = serieFilenames.map((serieFilename: string) => {
    return getSerieFromMarkdownFile(serieFilename, serieDirectory);
  });
  return sortSeriesByLastUpdate(series, serieOrder);
}
