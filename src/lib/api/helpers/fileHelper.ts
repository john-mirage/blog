import fs from "fs";

/**
 * Check if the file directory path exists on the system.
 *
 * @param {string} fileDirectory - The file directory to test.
 * @throws {Error} The file directory must exist on the system.
 */
export function checkFileDirectory(fileDirectory: string): void {
  if (!fs.existsSync(fileDirectory)) {
    throw new Error(`${fileDirectory} does not exist on your system`);
  }
}

/**
 * Find the file extension corresponding to a filename without extension.
 *
 * @param {string} filenameWithoutExt - The filename without extension.
 * @param {string[]} filenames - The filenames with extension.
 * @throws {Error} The filename without extension must correspond to a filename.
 * @returns {string} The filename with extension.
 */
export function getFilenameWithExtension(
  filenameWithoutExt: string,
  filenames: string[]
): string {
  const filename: string | undefined = filenames.find((filename) => {
    const regex = new RegExp(`^${filenameWithoutExt}\\.[A-Za-z0-9]+$`);
    return filename.search(regex) !== -1;
  });
  if (!filename)
    throw new Error(
      `${filenameWithoutExt} does not correspond to any filenames`
    );
  return filename;
}

/**
 * Remove the file extension of a filename.
 *
 * @param {string} filename - The filename.
 * @returns {string} The filename without the extension.
 */
export function removeFilenameExtension(filename: string): string {
  const regex = /(?<=^.+)\.[A-Za-z0-9]+$/;
  if (filename.search(regex) === -1) {
    throw new Error(`${filename} does not include a file extension`);
  }
  return filename.replace(regex, "");
}
