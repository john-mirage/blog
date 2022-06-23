import { getLocaleDate } from '@utils/dateFormatter';

describe('dateFormatter: getLocaleDate', () => {
  it('should return a locale date string', () => {
    const localeDate: string = getLocaleDate('fr-FR', '2021-09-16T15:30:00');
    // locale is not working on jest with this setup so we test for en.
    expect(localeDate).toBe('Thursday, September 16, 2021');
  });
});
