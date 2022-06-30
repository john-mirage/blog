import {
  getTagFromMarkdownFile,
  getTagDirectory,
} from "@api/databases/tagDatabase";
import { Tag } from "@api/interfaces/tag";
import { getFilenameWithExtension } from "@api/helpers/fileHelper";
import { sortTagsByTitle } from "@api/helpers/tagHelper";
import { getMarkdownFilenames } from "@api/databases/markdownDatabase";

/** @constant {string} The default tag order */
const DEFAULT_TAG_ORDER = "descending";

/**
 * Get a tag.
 *
 * @param {string} tagSlug - The tag slug.
 * @returns {Tag} The tag.
 */
export function getTag(tagSlug: string): Tag {
  const tagDirectory: string = getTagDirectory();
  const tagFilenames: string[] = getMarkdownFilenames(tagDirectory);
  const tagFilename: string = getFilenameWithExtension(tagSlug, tagFilenames);
  return getTagFromMarkdownFile(tagFilename, tagDirectory);
}

/**
 * Get all the tags.
 *
 * @param {string} [tagOrder=DEFAULT_TAG_ORDER] - The tag order.
 * @param {number} [tagLimit=DEFAULT_TAG_LIMIT] - The tag number limit (0 = no limit).
 * @returns {Tag[]} The tags.
 */
export function getAllTags(tagOrder: string = DEFAULT_TAG_ORDER): Tag[] {
  const tagDirectory: string = getTagDirectory();
  const tagFilenames: string[] = getMarkdownFilenames(tagDirectory);
  const tags: Tag[] = tagFilenames.map((tagFilename: string) => {
    return getTagFromMarkdownFile(tagFilename, tagDirectory);
  });
  return sortTagsByTitle(tags, tagOrder);
}
