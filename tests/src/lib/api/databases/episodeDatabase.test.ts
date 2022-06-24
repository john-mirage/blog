import {
  getEpisodeFromMarkdownFile,
  getEpisodeDirectory,
} from '@api/databases/episodeDatabase';
import {
  getMarkdownDirectory,
  getMarkdownFile,
} from '@api/databases/markdownDatabase';
import { checkISODate } from '@api/helpers/dateHelper';
import { SERIE_DIRECTORY } from '@api/databases/serieDatabase';
import { join } from 'path';
import {
  checkFileDirectory,
  removeFilenameExtension,
} from '@api/helpers/fileHelper';
import { getEpisodeFrontmatter } from '@api/helpers/episodeHelper';

jest.mock('@api/databases/markdownDatabase', () => {
  return { getMarkdownFile: jest.fn(), getMarkdownDirectory: jest.fn() };
});

jest.mock('@api/helpers/dateHelper', () => {
  return { checkISODate: jest.fn() };
});

jest.mock('path', () => {
  return { join: jest.fn() };
});

jest.mock('@api/helpers/fileHelper', () => {
  return { removeFilenameExtension: jest.fn(), checkFileDirectory: jest.fn() };
});

jest.mock('@api/helpers/episodeHelper', () => {
  return { getEpisodeFrontmatter: jest.fn() };
});

const getMarkdownFileMock = <jest.MockedFunction<typeof getMarkdownFile>>(
  getMarkdownFile
);
const getMarkdownDirectoryMock = <jest.MockedFunction<typeof getMarkdownDirectory>>getMarkdownDirectory;
const checkISODateMock = <jest.MockedFunction<typeof checkISODate>>checkISODate;
const joinMock = <jest.MockedFunction<typeof join>>join;
const removeFilenameExtensionMock = <jest.MockedFunction<typeof removeFilenameExtension>>removeFilenameExtension;
const checkFileDirectoryMock = <jest.MockedFunction<typeof checkFileDirectory>>(checkFileDirectory);
const getEpisodeFrontmatterMock = <jest.MockedFunction<typeof getEpisodeFrontmatter>>getEpisodeFrontmatter;

const MARKDOWN_FILE = {
  name: 'name-of-the-markdown-file-1.md',
  markdown: '# markdown content of the markdown file 1',
  frontmatter: {
    id: 1,
    title: 'title of the entity 1',
    date: '2021-09-15',
    excerpt: 'short description of the entity 1',
    readTime: '5 minutes',
  },
};

const EPISODE_SLUG = 'name-of-the-markdown-file-1';

const EPISODE = {
  slug: EPISODE_SLUG,
  markdown: MARKDOWN_FILE.markdown,
  id: MARKDOWN_FILE.frontmatter.id,
  title: MARKDOWN_FILE.frontmatter.title,
  date: MARKDOWN_FILE.frontmatter.date,
  excerpt: MARKDOWN_FILE.frontmatter.excerpt,
  readTime: MARKDOWN_FILE.frontmatter.readTime,
};

const SERIE_NAME = 'name-of-the-serie';

describe('episodeDatabase: getEpisode', () => {
  const FILENAME = MARKDOWN_FILE.name + '.md';
  const FILE_DIRECTORY = '/markdown/series';

  afterEach(() => {
    getMarkdownFileMock.mockClear();
    checkISODateMock.mockClear();
    getEpisodeFrontmatterMock.mockClear();
    removeFilenameExtensionMock.mockClear();
  });

  it('should return a new episode', () => {
    getMarkdownFileMock.mockReturnValueOnce(MARKDOWN_FILE);
    getEpisodeFrontmatterMock.mockReturnValueOnce(MARKDOWN_FILE.frontmatter);
    removeFilenameExtensionMock.mockReturnValueOnce(EPISODE_SLUG);
    const episode = getEpisodeFromMarkdownFile(FILENAME, FILE_DIRECTORY);
    expect(episode).toEqual(EPISODE);
    expect(getMarkdownFileMock).toHaveBeenCalledTimes(1);
    expect(getMarkdownFileMock).toHaveBeenCalledWith(FILENAME, FILE_DIRECTORY);
    expect(getEpisodeFrontmatterMock).toHaveBeenCalledTimes(1);
    expect(getEpisodeFrontmatterMock).toHaveBeenCalledWith(
      FILENAME,
      MARKDOWN_FILE.frontmatter
    );
    expect(checkISODateMock).toHaveBeenCalledTimes(1);
    expect(checkISODateMock).toHaveBeenCalledWith(
      MARKDOWN_FILE.frontmatter.date
    );
    expect(removeFilenameExtensionMock).toHaveBeenCalledTimes(1);
    expect(removeFilenameExtensionMock).toHaveBeenCalledWith(
      MARKDOWN_FILE.name
    );
  });
});

describe('episodeDatabase: getEpisodeDirectory', () => {
  afterEach(() => {
    getMarkdownDirectoryMock.mockClear();
    joinMock.mockClear();
    checkFileDirectoryMock.mockClear();
  });

  it('should return the episode directory', () => {
    const MARKDOWN_DIRECTORY = '/markdown';
    const EPISODE_DIRECTORY_PATH = `${MARKDOWN_DIRECTORY}/${SERIE_DIRECTORY}/${SERIE_NAME}`;
    getMarkdownDirectoryMock.mockReturnValueOnce(MARKDOWN_DIRECTORY);
    joinMock.mockReturnValueOnce(EPISODE_DIRECTORY_PATH);
    const episodeDirectory = getEpisodeDirectory(SERIE_NAME);
    expect(episodeDirectory).toBe(EPISODE_DIRECTORY_PATH);
    expect(getMarkdownDirectoryMock).toHaveBeenCalledTimes(1);
    expect(joinMock).toHaveBeenCalledTimes(1);
    expect(joinMock).toHaveBeenCalledWith(
      MARKDOWN_DIRECTORY,
      SERIE_DIRECTORY,
      SERIE_NAME
    );
    expect(checkFileDirectoryMock).toHaveBeenCalledTimes(1);
    expect(checkFileDirectoryMock).toHaveBeenCalledWith(EPISODE_DIRECTORY_PATH);
  });
});
