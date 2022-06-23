import { Tag } from '@api/models/tag';
import { Frontmatter } from '@api/models/markdownFile';

export interface TagFrontmatter {
  excerpt: string;
  title: string;
}

/**
 * Sort the tags by title.
 *
 * @param {Tag[]} tags - The tags to order.
 * @param {string} tagOrder - The tag order.
 * @returns {Tag[]} The ordered tags.
 */
export function sortTagsByTitle(tags: Tag[], tagOrder: string): Tag[] {
  return tags.sort((tagA: Tag, tagB: Tag) => {
    switch (tagOrder) {
      case 'descending': {
        return tagA.title > tagB.title ? -1 : 1;
      }
      case 'ascending': {
        return tagA.title < tagB.title ? -1 : 1;
      }
      default: {
        throw new Error('The order is invalid');
      }
    }
  });
}

/**
 * get the tag frontmatter.
 *
 * @param {string} tagFilename - The tag filename.
 * @param {Frontmatter} frontmatter - The frontmatter.
 * @throws {Error} Frontmatter must contain all the required fields.
 * @returns {TagFrontmatter} The frontmatter of the tag.
 */
export function getTagFrontmatter(
  tagFilename: string,
  frontmatter: Frontmatter
): TagFrontmatter {
  if (frontmatter.excerpt && frontmatter.title) {
    return {
      excerpt: frontmatter.excerpt,
      title: frontmatter.title,
    };
  }
  throw new Error(`One or more fields are missing in ${tagFilename}`);
}
