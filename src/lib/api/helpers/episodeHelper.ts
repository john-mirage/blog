import { Episode } from '@api/models/episode';
import { Frontmatter } from '@api/models/markdownFile';

export interface EpisodeFrontmatter {
  date: string;
  excerpt: string;
  id: number;
  readTime: string;
  title: string;
}

/**
 * Sort the episodes by id.
 *
 * @param {Episode[]} episodes - The episodes to order.
 * @param {string} episodeOrder - The episode order.
 * @returns {Episode[]} The ordered episodes.
 */
export function sortEpisodesById(
  episodes: Episode[],
  episodeOrder: string
): Episode[] {
  return episodes.sort((episodeA: Episode, episodeB: Episode) => {
    switch (episodeOrder) {
      case 'descending': {
        return episodeA.id > episodeB.id ? -1 : 1;
      }
      case 'ascending': {
        return episodeA.id < episodeB.id ? -1 : 1;
      }
      default: {
        throw new Error('The order is invalid');
      }
    }
  });
}

/**
 * get the episode frontmatter.
 *
 * @param {string} episodeFilename - The episode filename.
 * @param {Frontmatter} frontmatter - The frontmatter.
 * @throws {Error} Frontmatter must contain all the required fields.
 * @returns {EpisodeFrontmatter} The frontmatter of the episode.
 */
export function getEpisodeFrontmatter(
  episodeFilename: string,
  frontmatter: Frontmatter
): EpisodeFrontmatter {
  if (
    frontmatter.date &&
    frontmatter.excerpt &&
    frontmatter.id &&
    frontmatter.readTime &&
    frontmatter.title
  ) {
    return {
      date: frontmatter.date,
      excerpt: frontmatter.excerpt,
      id: frontmatter.id,
      readTime: frontmatter.readTime,
      title: frontmatter.title,
    };
  }
  throw new Error(`One or more fields are missing in ${episodeFilename}`);
}
