/** @constant {Intl.DateTimeFormatOptions} The date format option */
export const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

/**
 * Get a locale date string.
 *
 * @param {string} dateLocale - The date locale.
 * @param {string} dateString - The date string.
 * @returns {string} The locale date string.
 */
export function getLocaleDate(dateLocale: string, dateString: string): string {
  const date: Date = new Date(dateString);
  return date.toLocaleDateString(dateLocale, DATE_FORMAT_OPTIONS);
}
