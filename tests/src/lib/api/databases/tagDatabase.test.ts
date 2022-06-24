import {
  getTagFromMarkdownFile,
  getTagDirectory,
  TAG_DIRECTORY,
} from '@api/databases/tagDatabase';
import {
  getMarkdownFile,
  getMarkdownDirectory,
} from '@api/databases/markdownDatabase';
import { join } from 'path';
import {
  checkFileDirectory,
  removeFilenameExtension,
} from '@api/helpers/fileHelper';
import { getTagFrontmatter } from '@api/helpers/tagHelper';

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

jest.mock('@api/helpers/tagHelper', () => {
  return { getTagFrontmatter: jest.fn() };
});

const getMarkdownFileMock = <jest.MockedFunction<typeof getMarkdownFile>>(
  getMarkdownFile
);
const getMarkdownDirectoryMock = <jest.MockedFunction<typeof getMarkdownDirectory>>getMarkdownDirectory;
const joinMock = <jest.MockedFunction<typeof join>>join;
const removeFilenameExtensionMock = <jest.MockedFunction<typeof removeFilenameExtension>>removeFilenameExtension;
const checkFileDirectoryMock = <jest.MockedFunction<typeof checkFileDirectory>>(checkFileDirectory);
const getTagFrontmatterMock = <jest.MockedFunction<typeof getTagFrontmatter>>(getTagFrontmatter);

const MARKDOWN_FILE = {
  name: 'name-of-the-markdown-file-1.md',
  markdown: '# markdown content of the markdown file 1',
  frontmatter: {
    title: 'title of the entity 1',
    excerpt: 'short description of the entity 1',
  },
};

const TAG_SLUG = 'name-of-the-markdown-file-1';

const TAG = {
  slug: TAG_SLUG,
  markdown: MARKDOWN_FILE.markdown,
  title: MARKDOWN_FILE.frontmatter.title,
  excerpt: MARKDOWN_FILE.frontmatter.excerpt,
};

describe('tagDatabase: getTag', () => {
  const FILENAME = MARKDOWN_FILE.name + '.md';
  const FILE_DIRECTORY = '/markdown/tags';

  afterEach(() => {
    getMarkdownFileMock.mockClear();
    getTagFrontmatterMock.mockClear();
    removeFilenameExtensionMock.mockClear();
  });

  it('should return a new tag', () => {
    getMarkdownFileMock.mockReturnValueOnce(MARKDOWN_FILE);
    getTagFrontmatterMock.mockReturnValueOnce(MARKDOWN_FILE.frontmatter);
    removeFilenameExtensionMock.mockReturnValueOnce(TAG_SLUG);
    const tag = getTagFromMarkdownFile(FILENAME, FILE_DIRECTORY);
    expect(tag).toEqual(TAG);
    expect(getMarkdownFileMock).toHaveBeenCalledTimes(1);
    expect(getMarkdownFileMock).toHaveBeenCalledWith(FILENAME, FILE_DIRECTORY);
    expect(getTagFrontmatterMock).toHaveBeenCalledTimes(1);
    expect(getTagFrontmatterMock).toHaveBeenCalledWith(
      FILENAME,
      MARKDOWN_FILE.frontmatter
    );
    expect(removeFilenameExtensionMock).toHaveBeenCalledTimes(1);
    expect(removeFilenameExtensionMock).toHaveBeenCalledWith(
      MARKDOWN_FILE.name
    );
  });
});

describe('tagDatabase: getTagDirectory', () => {
  afterEach(() => {
    getMarkdownDirectoryMock.mockClear();
    joinMock.mockClear();
    checkFileDirectoryMock.mockClear();
  });

  it('should return the tag directory', () => {
    const MARKDOWN_DIRECTORY = '/markdown';
    const TAG_DIRECTORY_PATH = `${MARKDOWN_DIRECTORY}/${TAG_DIRECTORY}`;
    getMarkdownDirectoryMock.mockReturnValueOnce(MARKDOWN_DIRECTORY);
    joinMock.mockReturnValueOnce(TAG_DIRECTORY_PATH);
    const tagDirectory = getTagDirectory();
    expect(tagDirectory).toBe(TAG_DIRECTORY_PATH);
    expect(getMarkdownDirectoryMock).toHaveBeenCalledTimes(1);
    expect(joinMock).toHaveBeenCalledTimes(1);
    expect(joinMock).toHaveBeenCalledWith(MARKDOWN_DIRECTORY, TAG_DIRECTORY);
    expect(checkFileDirectoryMock).toHaveBeenCalledTimes(1);
    expect(checkFileDirectoryMock).toHaveBeenCalledWith(TAG_DIRECTORY_PATH);
  });
});
