/**
 * Check the ISO date string.
 *
 * @param {string} ISODateString - The ISO formated date as a string.
 * @throws {Error} The ISO date string must be valid.
 */
export function checkISODate(ISODateString: string): void {
  const ISODateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
  if (ISODateString.search(ISODateRegex) === -1) {
    throw new Error(`The ISO date (${ISODateString}) is not valid`);
  }
}
