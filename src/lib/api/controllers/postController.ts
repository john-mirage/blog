import { getPostFromMarkdownFile, getPostDirectory } from '@api/databases/postDatabase';
import { Post } from '@api/models/post';
import { getFilenameWithExtension, removeFilenameExtension } from '@api/helpers/fileHelper';
import { sortPostsByDate, filterPostsByTags } from '@api/helpers/postHelper';
import { getMarkdownFilenames } from '@api/databases/markdownDatabase';

/** @constant The default post order */
const DEFAULT_POST_ORDER = 'descending';

/**
 * Get a post.
 *
 * @param {string} postSlug - The post slug.
 * @returns {Post} The post.
 */
export function getPost(postSlug: string): Post {
  const postDirectory: string = getPostDirectory();
  const postFilenames: string[] = getMarkdownFilenames(postDirectory);
  const postFilename: string = getFilenameWithExtension(
    postSlug,
    postFilenames
  );
  return getPostFromMarkdownFile(postFilename, postDirectory);
}

/**
 * Get all the posts.
 *
 * @param {string} [postOrder=DEFAULT_POST_ORDER] - The post order.
 * @returns {Post[]} The posts.
 */
export function getAllPosts(postOrder: string = DEFAULT_POST_ORDER): Post[] {
  const postDirectory: string = getPostDirectory();
  const postFilenames: string[] = getMarkdownFilenames(postDirectory);
  const posts: Post[] = postFilenames.map((postFilename: string) => {
    return getPostFromMarkdownFile(postFilename, postDirectory);
  });
  return sortPostsByDate(posts, postOrder);
}

/**
 * Get the posts corresponding to some slugs.
 *
 * @param {string[]} postSlugs - The post slugs.
 * @param {string} [postOrder=DEFAULT_POST_ORDER] - The post order.
 * @returns {Post[]} The posts.
 */
export function getPostsBySlugs(
  postSlugs: string[],
  postOrder: string = DEFAULT_POST_ORDER
): Post[] {
  const postDirectory: string = getPostDirectory();
  const postFilenames: string[] = getMarkdownFilenames(postDirectory);
  const posts: Post[] = postSlugs.map((postSlug: string) => {
    const postFilename: string = getFilenameWithExtension(
      postSlug,
      postFilenames
    );
    return getPostFromMarkdownFile(postFilename, postDirectory);
  });
  return sortPostsByDate(posts, postOrder);
}

/**
 * Get the posts corresponding to some tags.
 *
 * @param {string[]} postTags - The posts tags.
 * @param {string} [postOrder=DEFAULT_POST_ORDER] - The post order.
 * @returns {Post[]} The posts.
 */
export function getPostsByTags(
  postTags: string[],
  postOrder: string = DEFAULT_POST_ORDER
): Post[] {
  const postDirectory: string = getPostDirectory();
  const postFilenames: string[] = getMarkdownFilenames(postDirectory);
  let posts: Post[] = postFilenames.map((postFilename: string) => {
    return getPostFromMarkdownFile(postFilename, postDirectory);
  });
  posts = filterPostsByTags(posts, postTags);
  return sortPostsByDate(posts, postOrder);
}

/**
 * Get the post slugs.
 *
 * @returns {string[]} The post slugs.
 */
export function getPostSlugs(): string[] {
  const postDirectory: string = getPostDirectory();
  const postFilenames: string[] = getMarkdownFilenames(postDirectory);
  return postFilenames.map((postFilename: string) =>
    removeFilenameExtension(postFilename)
  );
}
