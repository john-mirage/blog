import {
  getSerieFromMarkdownFile,
  getSerieDirectory,
  SERIE_DIRECTORY,
} from '@api/databases/serieDatabase';
import {
  getMarkdownFile,
  getMarkdownDirectory,
} from '@api/databases/markdownDatabase';
import { checkISODate } from '@api/helpers/dateHelper';
import { join } from 'path';
import {
  checkFileDirectory,
  removeFilenameExtension,
} from '@api/helpers/fileHelper';
import { getSerieFrontmatter } from '@api/helpers/serieHelper';

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

jest.mock('@api/helpers/serieHelper', () => {
  return { getSerieFrontmatter: jest.fn() };
});

const getMarkdownFileMock = <jest.MockedFunction<typeof getMarkdownFile>>(getMarkdownFile);
const getMarkdownDirectoryMock = <jest.MockedFunction<typeof getMarkdownDirectory>>getMarkdownDirectory;
const checkISODateMock = <jest.MockedFunction<typeof checkISODate>>checkISODate;
const joinMock = <jest.MockedFunction<typeof join>>join;
const removeFilenameExtensionMock = <jest.MockedFunction<typeof removeFilenameExtension>>removeFilenameExtension;
const checkFileDirectoryMock = <jest.MockedFunction<typeof checkFileDirectory>>(checkFileDirectory);
const getSerieFrontmatterMock = <jest.MockedFunction<typeof getSerieFrontmatter>>getSerieFrontmatter;

const MARKDOWN_FILE = {
  name: 'name-of-the-markdown-file-1.md',
  markdown: '# markdown content of the markdown file 1',
  frontmatter: {
    title: 'title of the entity 1',
    excerpt: 'short description of the entity 1',
    lastUpdate: '2021-09-15',
  },
};

const SERIE_SLUG = 'name-of-the-markdown-file-1.md';

const SERIE = {
  slug: SERIE_SLUG,
  markdown: MARKDOWN_FILE.markdown,
  title: MARKDOWN_FILE.frontmatter.title,
  excerpt: MARKDOWN_FILE.frontmatter.excerpt,
  lastUpdate: MARKDOWN_FILE.frontmatter.lastUpdate,
};

describe('serieDatabase: getSerie', () => {
  const FILENAME = MARKDOWN_FILE.name + '.md';
  const FILE_DIRECTORY = '/markdown/series';

  afterEach(() => {
    getMarkdownFileMock.mockClear();
    checkISODateMock.mockClear();
    getSerieFrontmatterMock.mockClear();
    removeFilenameExtensionMock.mockClear();
  });

  it('should return a new serie', () => {
    getMarkdownFileMock.mockReturnValueOnce(MARKDOWN_FILE);
    getSerieFrontmatterMock.mockReturnValueOnce(MARKDOWN_FILE.frontmatter);
    removeFilenameExtensionMock.mockReturnValueOnce(SERIE_SLUG);
    const serie = getSerieFromMarkdownFile(FILENAME, FILE_DIRECTORY);
    expect(serie).toEqual(SERIE);
    expect(getMarkdownFileMock).toHaveBeenCalledTimes(1);
    expect(getMarkdownFileMock).toHaveBeenCalledWith(FILENAME, FILE_DIRECTORY);
    expect(getSerieFrontmatterMock).toHaveBeenCalledTimes(1);
    expect(getSerieFrontmatterMock).toHaveBeenCalledWith(
      FILENAME,
      MARKDOWN_FILE.frontmatter
    );
    expect(checkISODateMock).toHaveBeenCalledTimes(1);
    expect(checkISODateMock).toHaveBeenCalledWith(
      MARKDOWN_FILE.frontmatter.lastUpdate
    );
    expect(removeFilenameExtensionMock).toHaveBeenCalledTimes(1);
    expect(removeFilenameExtensionMock).toHaveBeenCalledWith(
      MARKDOWN_FILE.name
    );
  });
});

describe('serieDatabase: getSerieDirectory', () => {
  afterEach(() => {
    getMarkdownDirectoryMock.mockClear();
    joinMock.mockClear();
    checkFileDirectoryMock.mockClear();
  });

  it('should return the serie directory', () => {
    const MARKDOWN_DIRECTORY = '/markdown';
    const SERIE_DIRECTORY_PATH = `${MARKDOWN_DIRECTORY}/${SERIE_DIRECTORY}`;
    getMarkdownDirectoryMock.mockReturnValueOnce(MARKDOWN_DIRECTORY);
    joinMock.mockReturnValueOnce(SERIE_DIRECTORY_PATH);
    const serieDirectory = getSerieDirectory();
    expect(serieDirectory).toBe(SERIE_DIRECTORY_PATH);
    expect(getMarkdownDirectoryMock).toHaveBeenCalledTimes(1);
    expect(joinMock).toHaveBeenCalledTimes(1);
    expect(joinMock).toHaveBeenCalledWith(MARKDOWN_DIRECTORY, SERIE_DIRECTORY);
    expect(checkFileDirectoryMock).toHaveBeenCalledTimes(1);
    expect(checkFileDirectoryMock).toHaveBeenCalledWith(SERIE_DIRECTORY_PATH);
  });
});
