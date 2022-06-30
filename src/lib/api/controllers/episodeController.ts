import {
  getEpisodeFromMarkdownFile,
  getEpisodeDirectory,
} from "@api/databases/episodeDatabase";
import { Episode } from "@api/interfaces/episode";
import { getFilenameWithExtension } from "@api/helpers/fileHelper";
import { sortEpisodesById } from "@api/helpers/episodeHelper";
import { getMarkdownFilenames } from "@api/databases/markdownDatabase";

/** @constant {string} The default episode order */
const DEFAULT_EPISODE_ORDER = "descending";

/**
 * Get an episode.
 *
 * @param {string} episodeSlug - The episode slug.
 * @param {string} serieSlug - The serie slug.
 * @returns {Episode} The episode.
 */
export function getEpisode(episodeSlug: string, serieSlug: string): Episode {
  const episodeDirectory: string = getEpisodeDirectory(serieSlug);
  const episodeFilenames: string[] = getMarkdownFilenames(episodeDirectory);
  const episodeFilename: string = getFilenameWithExtension(
    episodeSlug,
    episodeFilenames
  );
  return getEpisodeFromMarkdownFile(episodeFilename, episodeDirectory);
}

/**
 * Get all the episodes.
 *
 * @param {string} serieSlug - The serie slug.
 * @param {string} [episodeOrder=DEFAULT_EPISODE_ORDER] - The episode order.
 * @returns {Episode[]} The episodes.
 */
export function getAllEpisodes(
  serieSlug: string,
  episodeOrder: string = DEFAULT_EPISODE_ORDER
): Episode[] {
  const episodeDirectory: string = getEpisodeDirectory(serieSlug);
  const episodeFilenames: string[] = getMarkdownFilenames(episodeDirectory);
  const episodes: Episode[] = episodeFilenames.map(
    (episodeFilename: string) => {
      return getEpisodeFromMarkdownFile(episodeFilename, episodeDirectory);
    }
  );
  return sortEpisodesById(episodes, episodeOrder);
}
