import { Post } from "@api/interfaces/post";
import { Frontmatter } from "@api/interfaces/markdownFile";

export interface PostFrontmatter {
  date: string;
  excerpt: string;
  readTime: string;
  tags: string[];
  title: string;
}

/**
 * Sort the posts by date.
 *
 * @param {Post[]} posts - The posts to order.
 * @param {string} postOrder - The order.
 * @returns {Post[]} The ordered posts.
 */
export function sortPostsByDate(posts: Post[], postOrder: string): Post[] {
  return posts.sort((postA: Post, postB: Post) => {
    switch (postOrder) {
      case "descending": {
        return postA.date > postB.date ? -1 : 1;
      }
      case "ascending": {
        return postA.date < postB.date ? -1 : 1;
      }
      default: {
        throw new Error("The order is invalid");
      }
    }
  });
}

/**
 * Filter the posts by tags.
 *
 * @param {Post[]} posts - The posts to filter.
 * @param {string[]} postTags - The post tags.
 * @returns {Post[]} The filtered posts.
 */
export function filterPostsByTags(posts: Post[], postTags: string[]): Post[] {
  return posts.filter((post: Post) => {
    return post.tags.some((tag: string) => postTags.includes(tag));
  });
}

/**
 * get the post frontmatter.
 *
 * @param {string} postFilename - The post filename.
 * @param {Frontmatter} frontmatter - The frontmatter.
 * @throws {Error} Frontmatter must contain all the required fields.
 * @returns {PostFrontmatter} The frontmatter of the post.
 */
export function getPostFrontmatter(
  postFilename: string,
  frontmatter: Frontmatter
): PostFrontmatter {
  if (
    frontmatter.date &&
    frontmatter.excerpt &&
    frontmatter.readTime &&
    frontmatter.tags &&
    frontmatter.title
  ) {
    return {
      date: frontmatter.date,
      excerpt: frontmatter.excerpt,
      readTime: frontmatter.readTime,
      tags: frontmatter.tags,
      title: frontmatter.title,
    };
  }
  throw new Error(`One or more fields are missing in ${postFilename}`);
}
