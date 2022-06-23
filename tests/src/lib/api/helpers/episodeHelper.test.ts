import {
  sortEpisodesById,
  getEpisodeFrontmatter,
} from '@api/helpers/episodeHelper';
import { Episode } from '@api/models/episode';

const EPISODE1 = { id: 2 };
const EPISODE2 = { id: 1 };
const EPISODE3 = { id: 3 };

describe('episodeHelper: sortEpisodesById', () => {
  it('should return the episodes sorted by id with descending order', () => {
    const EPISODES = <Episode[]>[EPISODE1, EPISODE2, EPISODE3];
    const sortedEpisodes = sortEpisodesById(EPISODES, 'descending');
    expect(sortedEpisodes).toEqual([EPISODE3, EPISODE1, EPISODE2]);
  });

  it('should return the episodes sorted by id with ascending order', () => {
    const EPISODES = <Episode[]>[EPISODE1, EPISODE2, EPISODE3];
    const sortedEpisodes = sortEpisodesById(EPISODES, 'ascending');
    expect(sortedEpisodes).toEqual([EPISODE2, EPISODE1, EPISODE3]);
  });

  it('should throw an error if the order is invalid', () => {
    const EPISODES = <Episode[]>[EPISODE1, EPISODE2, EPISODE3];
    expect(() => {
      sortEpisodesById(EPISODES, 'badOrder');
    }).toThrow('The order is invalid');
  });
});

describe('episodeHelper: getEpisodeFrontmatter', () => {
  interface TestedFrontmatter {
    date: string;
    excerpt: string;
    id: number;
    readTime: string;
    title?: string;
  }

  const FRONTMATTER: TestedFrontmatter = {
    date: 'date',
    excerpt: 'excerpt',
    id: 1,
    readTime: 'readTime',
    title: 'title',
  };

  const FILENAME = 'episode.md';

  it('should extract the episode data of the frontmatter', () => {
    const episodeFrontmatter = getEpisodeFrontmatter(FILENAME, FRONTMATTER);
    expect(episodeFrontmatter).toEqual({
      date: FRONTMATTER.date,
      excerpt: FRONTMATTER.excerpt,
      id: FRONTMATTER.id,
      readTime: FRONTMATTER.readTime,
      title: FRONTMATTER.title,
    });
  });

  it('should throw an error if one or more episode data are missing', () => {
    delete FRONTMATTER.title;
    expect(() => {
      getEpisodeFrontmatter(FILENAME, FRONTMATTER);
    }).toThrow(`One or more fields are missing in ${FILENAME}`);
  });
});
