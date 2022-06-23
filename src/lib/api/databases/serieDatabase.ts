import { Serie } from '@api/models/serie';
import { MarkdownFile } from '@api/models/markdownFile';
import { getMarkdownFile, getMarkdownDirectory } from '@api/databases/markdownDatabase';
import { checkISODate } from '@api/helpers/dateHelper';
import { join } from 'path';
import { checkFileDirectory, removeFilenameExtension } from '@api/helpers/fileHelper';
import { getSerieFrontmatter, SerieFrontmatter } from '@api/helpers/serieHelper';

/** @constant The serie directory */
export const SERIE_DIRECTORY = 'series';

/**
 * Get a serie from a Markdown file.
 *
 * @param {string} serieFilename - The serie filename.
 * @param {string} serieDirectory - The serie directory.
 * @returns {Serie} The serie.
 */
export function getSerieFromMarkdownFile(
  serieFilename: string,
  serieDirectory: string
): Serie {
  const markdownFile: MarkdownFile = getMarkdownFile(
    serieFilename,
    serieDirectory
  );
  const frontmatter: SerieFrontmatter = getSerieFrontmatter(
    serieFilename,
    markdownFile.frontmatter
  );
  checkISODate(frontmatter.lastUpdate);
  const serieSlug: string = removeFilenameExtension(markdownFile.name);
  return new Serie(
    serieSlug,
    markdownFile.markdown,
    frontmatter.title,
    frontmatter.excerpt,
    frontmatter.lastUpdate
  );
}

/**
 * Get the serie directory.
 *
 * @returns {string} The serie directory.
 */
export function getSerieDirectory(): string {
  const markdownDirectory: string = getMarkdownDirectory();
  const serieDirectory: string = join(markdownDirectory, SERIE_DIRECTORY);
  checkFileDirectory(serieDirectory);
  return serieDirectory;
}
