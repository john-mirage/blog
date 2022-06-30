import matter, { GrayMatterFile } from "gray-matter";
import { MarkdownFile } from "@api/interfaces/markdownFile";
import { getFile, getFilenames } from "@api/databases/fileDatabase";
import { RawFile } from "@api/interfaces/rawFile";
import { join } from "path";

/** @constant The markdown directory */
export const MARKDOWN_DIRECTORY = "markdown";

/** @constant The Markdown file extensions */
export const MARKDOWN_EXTENSIONS: string[] = ["md", "markdown"];

/**
 * Get a Markdown file.
 *
 * @param {string} filename - The file name.
 * @param {string} fileDirectory - The file directory.
 * @returns {MarkdownFile} - The Markdown file.
 */
export function getMarkdownFile(
  filename: string,
  fileDirectory: string
): MarkdownFile {
  const rawFile: RawFile = getFile(filename, fileDirectory);
  const { data, content }: GrayMatterFile<string> = matter(rawFile.content);
  return {
    name: filename,
    frontmatter: data,
    markdown: content,
  };
}

/**
 * Get the Markdown filenames.
 *
 * @param {string} fileDirectory - The file directory.
 * @throws {Error} The file directory must contains at least one Markdown file.
 * @returns {string[]} The Markdown filenames.
 */
export function getMarkdownFilenames(fileDirectory: string): string[] {
  const filenames: string[] = getFilenames(fileDirectory);
  const markdownFilenames: string[] = filenames.filter((filename: string) => {
    return MARKDOWN_EXTENSIONS.some((fileExtension: string) => {
      return filename.endsWith(`.${fileExtension}`);
    });
  });
  if (markdownFilenames.length === 0)
    throw new Error(`There is no Markdown files in ${fileDirectory}`);
  return markdownFilenames;
}

/**
 * Get the Markdown directory.
 *
 * @returns {string} The markdown directory.
 */
export function getMarkdownDirectory(): string {
  return join(process.cwd(), MARKDOWN_DIRECTORY);
}
