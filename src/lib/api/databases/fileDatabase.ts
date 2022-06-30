import fs from "fs";
import { join } from "path";
import { RawFile } from "@api/interfaces/rawFile";

/**
 * Get a file.
 *
 * @param {string} filename - The file name.
 * @param {string} fileDirectory - The file directory.
 * @returns {RawFile} The file.
 */
export function getFile(filename: string, fileDirectory: string): RawFile {
  const path: string = join(fileDirectory, filename);
  const content: string = fs.readFileSync(path, "utf8");
  return {
    name: filename,
    content: content,
  };
}

/**
 * Get the filenames of a directory.
 *
 * @param {string} fileDirectory - The file directory.
 * @throws {Error} The file directory must not be empty.
 * @returns {string[]} The filenames.
 */
export function getFilenames(fileDirectory: string): string[] {
  const filenames: string[] = fs.readdirSync(fileDirectory);
  if (filenames.length === 0)
    throw new Error(`${fileDirectory} folder is empty`);
  return filenames;
}
