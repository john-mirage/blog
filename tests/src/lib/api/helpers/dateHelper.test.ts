import { checkISODate } from '@api/helpers/dateHelper';

describe('dateHelper: checkISODate', () => {
  it('should not return if the ISO date is valid', () => {
    expect(checkISODate('2021-09-09T15:30:00')).toBeUndefined();
  });

  it('should throw an error if the ISO date is not valid', () => {
    expect(() => {
      checkISODate('badISODate');
    }).toThrow('The ISO date (badISODate) is not valid');
  });
});
