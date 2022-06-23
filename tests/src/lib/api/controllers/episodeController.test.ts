import { getEpisode, getAllEpisodes } from '@api/controllers/episodeController';
import {
  getEpisodeFromMarkdownFile,
  getEpisodeDirectory,
} from '@api/databases/episodeDatabase';
import { getFilenameWithExtension } from '@api/helpers/fileHelper';
import { sortEpisodesById } from '@api/helpers/episodeHelper';
import { getMarkdownFilenames } from '@api/databases/markdownDatabase';

jest.mock('@api/databases/episodeDatabase', () => {
  return {
    getEpisodeFromMarkdownFile: jest.fn(),
    getEpisodeDirectory: jest.fn(),
  };
});

jest.mock('@api/databases/markdownDatabase', () => {
  return { getMarkdownFilenames: jest.fn() };
});

jest.mock('@api/helpers/fileHelper', () => {
  return { getFilenameWithExtension: jest.fn() };
});

jest.mock('@api/helpers/episodeHelper', () => {
  return { sortEpisodesById: jest.fn() };
});

const EPISODE1 = {
  slug: 'slug-of-the-episode-1',
  markdown: '# markdown content of the episode 1',
  id: 2,
  title: 'title of the episode 1',
  date: '2021-09-15',
  excerpt: 'short description of the episode 1',
  readTime: '5 minutes',
};
const EPISODE2 = {
  slug: 'slug-of-the-episode-2',
  markdown: '# markdown content of the episode 2',
  id: 3,
  title: 'title of the episode 2',
  date: '2021-09-17',
  excerpt: 'short description of the episode 2',
  readTime: '30 minutes',
};
const EPISODE3 = {
  slug: 'slug-of-the-episode-3',
  markdown: '# markdown content of the episode 3',
  id: 1,
  title: 'title of the episode 3',
  date: '2021-09-16',
  excerpt: 'short description of the episode 3',
  readTime: '20 minutes',
};
const EPISODES = [EPISODE1, EPISODE2, EPISODE3];
const EPISODE_FILENAME1 = `${EPISODE1.slug}.md`;
const EPISODE_FILENAME2 = `${EPISODE2.slug}.md`;
const EPISODE_FILENAME3 = `${EPISODE3.slug}.md`;
const EPISODE_FILENAMES = [
  EPISODE_FILENAME1,
  EPISODE_FILENAME2,
  EPISODE_FILENAME3,
];
const SERIE_SLUG = 'slug-of-the-serie';
const EPISODE_DIRECTORY = `/home/work/project/${SERIE_SLUG}`;
const EPISODE_ORDER = 'descending';

const getEpisodeDirectoryMock = <
  jest.MockedFunction<typeof getEpisodeDirectory>
>getEpisodeDirectory;
const getMarkdownFilenamesMock = <
  jest.MockedFunction<typeof getMarkdownFilenames>
>getMarkdownFilenames;
const getFilenameWithExtensionMock = <
  jest.MockedFunction<typeof getFilenameWithExtension>
>getFilenameWithExtension;
const getEpisodeFromMarkdownFileMock = <
  jest.MockedFunction<typeof getEpisodeFromMarkdownFile>
>getEpisodeFromMarkdownFile;
const sortEpisodesByIdMock = <jest.MockedFunction<typeof sortEpisodesById>>(
  sortEpisodesById
);

describe('episodeController: getEpisode', () => {
  afterEach(() => {
    getEpisodeDirectoryMock.mockClear();
    getMarkdownFilenamesMock.mockClear();
    getFilenameWithExtensionMock.mockClear();
    getEpisodeFromMarkdownFileMock.mockClear();
  });

  it('should return an episode', () => {
    getEpisodeDirectoryMock.mockReturnValue(EPISODE_DIRECTORY);
    getMarkdownFilenamesMock.mockReturnValue(EPISODE_FILENAMES);
    getFilenameWithExtensionMock.mockReturnValue(EPISODE_FILENAME1);
    getEpisodeFromMarkdownFileMock.mockReturnValue(EPISODE1);
    const episode = getEpisode(EPISODE1.slug, SERIE_SLUG);
    expect(episode).toEqual(EPISODE1);
    expect(getEpisodeDirectoryMock).toHaveBeenCalledTimes(1);
    expect(getEpisodeDirectoryMock).toHaveBeenCalledWith(SERIE_SLUG);
    expect(getMarkdownFilenamesMock).toHaveBeenCalledTimes(1);
    expect(getMarkdownFilenamesMock).toHaveBeenCalledWith(EPISODE_DIRECTORY);
    expect(getFilenameWithExtensionMock).toHaveBeenCalledTimes(1);
    expect(getFilenameWithExtensionMock).toHaveBeenCalledWith(
      EPISODE1.slug,
      EPISODE_FILENAMES
    );
    expect(getEpisodeFromMarkdownFileMock).toHaveBeenCalledTimes(1);
    expect(getEpisodeFromMarkdownFileMock).toHaveBeenCalledWith(
      EPISODE_FILENAME1,
      EPISODE_DIRECTORY
    );
  });
});

describe('episodeController: getAllEpisodes', () => {
  const ORDERED_EPISODES = [EPISODE2, EPISODE1, EPISODE3];

  afterEach(() => {
    getEpisodeDirectoryMock.mockClear();
    getMarkdownFilenamesMock.mockClear();
    getEpisodeFromMarkdownFileMock.mockClear();
    sortEpisodesByIdMock.mockClear();
  });

  it('should return all the episodes', () => {
    getEpisodeDirectoryMock.mockReturnValue(EPISODE_DIRECTORY);
    getMarkdownFilenamesMock.mockReturnValue(EPISODE_FILENAMES);
    getEpisodeFromMarkdownFileMock.mockReturnValueOnce(EPISODE1);
    getEpisodeFromMarkdownFileMock.mockReturnValueOnce(EPISODE2);
    getEpisodeFromMarkdownFileMock.mockReturnValueOnce(EPISODE3);
    sortEpisodesByIdMock.mockReturnValue(ORDERED_EPISODES);
    const episodes = getAllEpisodes(SERIE_SLUG, EPISODE_ORDER);
    expect(episodes).toEqual(ORDERED_EPISODES);
    expect(getEpisodeDirectoryMock).toHaveBeenCalledTimes(1);
    expect(getEpisodeDirectoryMock).toHaveBeenCalledWith(SERIE_SLUG);
    expect(getMarkdownFilenamesMock).toHaveBeenCalledTimes(1);
    expect(getMarkdownFilenamesMock).toHaveBeenCalledWith(EPISODE_DIRECTORY);
    expect(getEpisodeFromMarkdownFileMock).toHaveBeenCalledTimes(3);
    expect(getEpisodeFromMarkdownFileMock).toHaveBeenNthCalledWith(
      1,
      EPISODE_FILENAME1,
      EPISODE_DIRECTORY
    );
    expect(getEpisodeFromMarkdownFileMock).toHaveBeenNthCalledWith(
      2,
      EPISODE_FILENAME2,
      EPISODE_DIRECTORY
    );
    expect(getEpisodeFromMarkdownFileMock).toHaveBeenNthCalledWith(
      3,
      EPISODE_FILENAME3,
      EPISODE_DIRECTORY
    );
    expect(sortEpisodesByIdMock).toHaveBeenCalledTimes(1);
    expect(sortEpisodesByIdMock).toHaveBeenCalledWith(EPISODES, EPISODE_ORDER);
  });
});
