import { Serie } from '@api/models/serie';

const SERIE = {
  slug: 'slug-of-the-serie',
  markdown: '# markdown content of the serie',
  title: 'Title of the serie',
  excerpt: 'Short description of the serie',
  lastUpdate: '2021-10-02',
};

describe('Serie: constructor', () => {
  it('should build a new serie', () => {
    const serie = new Serie(
      SERIE.slug,
      SERIE.markdown,
      SERIE.title,
      SERIE.excerpt,
      SERIE.lastUpdate
    );
    expect(serie).toEqual(SERIE);
  });
});
