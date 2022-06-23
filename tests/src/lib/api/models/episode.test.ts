import { Episode } from '@api/models/episode';

const EPISODE = {
  slug: 'name-of-the-episode',
  markdown: '# markdown content of the episode',
  id: 1,
  title: 'Title of the episode',
  date: '2021-09-15',
  excerpt: 'Short description of the episode',
  readTime: '5 minutes',
};

describe('Episode: constructor', () => {
  it('should build a new episode', () => {
    const episode = new Episode(
      EPISODE.slug,
      EPISODE.markdown,
      EPISODE.id,
      EPISODE.title,
      EPISODE.date,
      EPISODE.excerpt,
      EPISODE.readTime
    );
    expect(episode).toEqual(EPISODE);
  });
});
