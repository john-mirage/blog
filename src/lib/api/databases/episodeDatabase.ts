import { Episode } from '@api/models/episode';
import { MarkdownFile } from '@api/models/markdownFile';
import { getMarkdownDirectory, getMarkdownFile } from '@api/databases/markdownDatabase';
import { checkISODate } from '@api/helpers/dateHelper';
import { SERIE_DIRECTORY } from '@api/databases/serieDatabase';
import { join } from 'path';
import { checkFileDirectory, removeFilenameExtension } from '@api/helpers/fileHelper';
import { EpisodeFrontmatter, getEpisodeFrontmatter } from '@api/helpers/episodeHelper';

/**
 * Get an episode from a Markdown file.
 *
 * @param {string} episodeFilename - The episode filename.
 * @param {string} episodeDirectory - The episode directory.
 * @returns {Episode} The episode.
 */
export function getEpisodeFromMarkdownFile(
  episodeFilename: string,
  episodeDirectory: string
): Episode {
  const markdownFile: MarkdownFile = getMarkdownFile(
    episodeFilename,
    episodeDirectory
  );
  const frontmatter: EpisodeFrontmatter = getEpisodeFrontmatter(
    episodeFilename,
    markdownFile.frontmatter
  );
  checkISODate(frontmatter.date);
  const episodeSlug: string = removeFilenameExtension(markdownFile.name);
  return new Episode(
    episodeSlug,
    markdownFile.markdown,
    frontmatter.id,
    frontmatter.title,
    frontmatter.date,
    frontmatter.excerpt,
    frontmatter.readTime
  );
}

/**
 * Get the episode directory.
 *
 * @param {string} serieName - The serie name.
 * @returns {string} The episode directory.
 */
export function getEpisodeDirectory(serieName: string): string {
  const markdownDirectory: string = getMarkdownDirectory();
  const episodeDirectory: string = join(
    markdownDirectory,
    SERIE_DIRECTORY,
    serieName
  );
  checkFileDirectory(episodeDirectory);
  return episodeDirectory;
}
