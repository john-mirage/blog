import { Tag } from '@api/interfaces/tag';
import { MarkdownFile } from '@api/interfaces/markdownFile';
import { getMarkdownFile, getMarkdownDirectory } from '@api/databases/markdownDatabase';
import { join } from 'path';
import { checkFileDirectory, removeFilenameExtension } from '@api/helpers/fileHelper';
import { getTagFrontmatter, TagFrontmatter } from '@api/helpers/tagHelper';

/** @constant The tag directory */
export const TAG_DIRECTORY = 'tags';

/**
 * Get a tag from a Markdown file.
 *
 * @param {string} tagFilename - The tag filename.
 * @param {string} tagDirectory - The tag directory.
 * @returns {Tag} The tag.
 */
export function getTagFromMarkdownFile(
  tagFilename: string,
  tagDirectory: string
): Tag {
  const markdownFile: MarkdownFile = getMarkdownFile(tagFilename, tagDirectory);
  const frontmatter: TagFrontmatter = getTagFrontmatter(
    tagFilename,
    markdownFile.frontmatter
  );
  const tagSlug: string = removeFilenameExtension(markdownFile.name);
  return {
    slug: tagSlug,
    markdown: markdownFile.markdown,
    title: frontmatter.title,
    excerpt: frontmatter.excerpt,
  }
}

/**
 * Get the tag directory.
 *
 * @returns {string} The tag directory.
 */
export function getTagDirectory(): string {
  const markdownDirectory: string = getMarkdownDirectory();
  const tagDirectory: string = join(markdownDirectory, TAG_DIRECTORY);
  checkFileDirectory(tagDirectory);
  return tagDirectory;
}
