import { Serie } from "@api/interfaces/serie";
import { Frontmatter } from "@api/interfaces/markdownFile";

export interface SerieFrontmatter {
  excerpt: string;
  lastUpdate: string;
  title: string;
}

/**
 * Sort the series by last update.
 *
 * @param {Serie[]} series - The series to order.
 * @param {string} serieOrder - The serie order.
 * @returns {Serie[]} The ordered series.
 */
export function sortSeriesByLastUpdate(
  series: Serie[],
  serieOrder: string
): Serie[] {
  return series.sort((serieA: Serie, serieB: Serie) => {
    switch (serieOrder) {
      case "descending": {
        return serieA.lastUpdate > serieB.lastUpdate ? -1 : 1;
      }
      case "ascending": {
        return serieA.lastUpdate < serieB.lastUpdate ? -1 : 1;
      }
      default: {
        throw new Error("The order is invalid");
      }
    }
  });
}

/**
 * get the serie frontmatter.
 *
 * @param {string} serieFilename - The serie filename.
 * @param {Frontmatter} frontmatter - The frontmatter.
 * @throws {Error} Frontmatter must contain all the required fields.
 * @returns {SerieFrontmatter} The frontmatter of the serie.
 */
export function getSerieFrontmatter(
  serieFilename: string,
  frontmatter: Frontmatter
): SerieFrontmatter {
  if (frontmatter.excerpt && frontmatter.lastUpdate && frontmatter.title) {
    return {
      excerpt: frontmatter.excerpt,
      lastUpdate: frontmatter.lastUpdate,
      title: frontmatter.title,
    };
  }
  throw new Error(`One or more fields are missing in ${serieFilename}`);
}
