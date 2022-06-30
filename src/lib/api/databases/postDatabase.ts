import { Post } from "@api/interfaces/post";
import { MarkdownFile } from "@api/interfaces/markdownFile";
import {
  getMarkdownFile,
  getMarkdownDirectory,
} from "@api/databases/markdownDatabase";
import { checkISODate } from "@api/helpers/dateHelper";
import { join } from "path";
import {
  checkFileDirectory,
  removeFilenameExtension,
} from "@api/helpers/fileHelper";
import { getPostFrontmatter, PostFrontmatter } from "@api/helpers/postHelper";

/** @constant The post directory */
export const POST_DIRECTORY = "posts";

/**
 * Get a post from a Markdown file.
 *
 * @param {string} postFilename - The post filename.
 * @param {string} postDirectory - The post directory.
 * @returns {Post} The post.
 */
export function getPostFromMarkdownFile(
  postFilename: string,
  postDirectory: string
): Post {
  const markdownFile: MarkdownFile = getMarkdownFile(
    postFilename,
    postDirectory
  );
  const frontmatter: PostFrontmatter = getPostFrontmatter(
    postFilename,
    markdownFile.frontmatter
  );
  checkISODate(frontmatter.date);
  const postSlug: string = removeFilenameExtension(markdownFile.name);
  return {
    slug: postSlug,
    markdown: markdownFile.markdown,
    title: frontmatter.title,
    date: frontmatter.date,
    excerpt: frontmatter.excerpt,
    tags: frontmatter.tags,
    readTime: frontmatter.readTime,
  };
}

/**
 * Get the post directory.
 *
 * @returns {string} The post directory.
 */
export function getPostDirectory(): string {
  const markdownDirectory: string = getMarkdownDirectory();
  const postDirectory: string = join(markdownDirectory, POST_DIRECTORY);
  checkFileDirectory(postDirectory);
  return postDirectory;
}
