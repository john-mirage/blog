import { getTag, getAllTags } from '@api/controllers/tagController';
import {
  getTagFromMarkdownFile,
  getTagDirectory,
  TAG_DIRECTORY,
} from '@api/databases/tagDatabase';
import { getMarkdownFilenames } from '@api/databases/markdownDatabase';
import { getFilenameWithExtension } from '@api/helpers/fileHelper';
import { sortTagsByTitle } from '@api/helpers/tagHelper';

jest.mock('@api/databases/tagDatabase', () => {
  return { getTagFromMarkdownFile: jest.fn(), getTagDirectory: jest.fn() };
});

jest.mock('@api/databases/markdownDatabase', () => {
  return { getMarkdownFilenames: jest.fn() };
});

jest.mock('@api/helpers/fileHelper', () => {
  return { getFilenameWithExtension: jest.fn() };
});

jest.mock('@api/helpers/tagHelper', () => {
  return { sortTagsByTitle: jest.fn() };
});

const TAG1 = {
  slug: 'slug-of-the-tag-1c',
  markdown: '# markdown content of the tag 1',
  title: 'title of the tag 1',
  excerpt: 'short description of the tag 1',
};
const TAG2 = {
  slug: 'slug-of-the-tag-2a',
  markdown: '# markdown content of the tag 2',
  title: 'title of the tag 2',
  excerpt: 'short description of the tag 2',
};
const TAG3 = {
  slug: 'slug-of-the-tag-3b',
  markdown: '# markdown content of the tag 3',
  title: 'title of the tag 3',
  excerpt: 'short description of the tag 3',
};
const TAGS = [TAG1, TAG2, TAG3];
const TAG_FILENAME1 = `${TAG1.slug}.md`;
const TAG_FILENAME2 = `${TAG2.slug}.md`;
const TAG_FILENAME3 = `${TAG3.slug}.md`;
const TAG_FILENAMES = [TAG_FILENAME1, TAG_FILENAME2, TAG_FILENAME3];
const TAG_DIRECTORY_PATH = `/home/work/project/${TAG_DIRECTORY}`;
const TAG_ORDER = 'descending';

const getTagDirectoryMock = <jest.MockedFunction<typeof getTagDirectory>>(
  getTagDirectory
);
const getMarkdownFilenamesMock = <
  jest.MockedFunction<typeof getMarkdownFilenames>
>getMarkdownFilenames;
const getFilenameWithExtensionMock = <
  jest.MockedFunction<typeof getFilenameWithExtension>
>getFilenameWithExtension;
const getTagFromMarkdownFileMock = <
  jest.MockedFunction<typeof getTagFromMarkdownFile>
>getTagFromMarkdownFile;
const sortTagsByTitleMock = <jest.MockedFunction<typeof sortTagsByTitle>>(
  sortTagsByTitle
);

describe('tagController: getTag', () => {
  afterEach(() => {
    getTagDirectoryMock.mockClear();
    getMarkdownFilenamesMock.mockClear();
    getFilenameWithExtensionMock.mockClear();
    getTagFromMarkdownFileMock.mockClear();
  });

  it('should return a tag', () => {
    getTagDirectoryMock.mockReturnValue(TAG_DIRECTORY_PATH);
    getMarkdownFilenamesMock.mockReturnValue(TAG_FILENAMES);
    getFilenameWithExtensionMock.mockReturnValue(TAG_FILENAME1);
    getTagFromMarkdownFileMock.mockReturnValue(TAG1);
    const tag = getTag(TAG1.slug);
    expect(tag).toEqual(TAG1);
    expect(getTagDirectoryMock).toHaveBeenCalledTimes(1);
    expect(getMarkdownFilenamesMock).toHaveBeenCalledTimes(1);
    expect(getMarkdownFilenamesMock).toHaveBeenCalledWith(TAG_DIRECTORY_PATH);
    expect(getFilenameWithExtensionMock).toHaveBeenCalledTimes(1);
    expect(getFilenameWithExtensionMock).toHaveBeenCalledWith(
      TAG1.slug,
      TAG_FILENAMES
    );
    expect(getTagFromMarkdownFileMock).toHaveBeenCalledTimes(1);
    expect(getTagFromMarkdownFileMock).toHaveBeenCalledWith(
      TAG_FILENAME1,
      TAG_DIRECTORY_PATH
    );
  });
});

describe('tagController: getAllTags', () => {
  const ORDERED_TAGS = [TAG1, TAG3, TAG2];

  afterEach(() => {
    getTagDirectoryMock.mockClear();
    getMarkdownFilenamesMock.mockClear();
    getTagFromMarkdownFileMock.mockClear();
    sortTagsByTitleMock.mockClear();
  });

  it('should return all the tags', () => {
    getTagDirectoryMock.mockReturnValue(TAG_DIRECTORY_PATH);
    getMarkdownFilenamesMock.mockReturnValue(TAG_FILENAMES);
    getTagFromMarkdownFileMock.mockReturnValueOnce(TAG1);
    getTagFromMarkdownFileMock.mockReturnValueOnce(TAG2);
    getTagFromMarkdownFileMock.mockReturnValueOnce(TAG3);
    sortTagsByTitleMock.mockReturnValue(ORDERED_TAGS);
    const tags = getAllTags(TAG_ORDER);
    expect(tags).toEqual(ORDERED_TAGS);
    expect(getTagDirectoryMock).toHaveBeenCalledTimes(1);
    expect(getMarkdownFilenamesMock).toHaveBeenCalledTimes(1);
    expect(getMarkdownFilenamesMock).toHaveBeenCalledWith(TAG_DIRECTORY_PATH);
    expect(getTagFromMarkdownFileMock).toHaveBeenCalledTimes(3);
    expect(getTagFromMarkdownFileMock).toHaveBeenNthCalledWith(
      1,
      TAG_FILENAME1,
      TAG_DIRECTORY_PATH
    );
    expect(getTagFromMarkdownFileMock).toHaveBeenNthCalledWith(
      2,
      TAG_FILENAME2,
      TAG_DIRECTORY_PATH
    );
    expect(getTagFromMarkdownFileMock).toHaveBeenNthCalledWith(
      3,
      TAG_FILENAME3,
      TAG_DIRECTORY_PATH
    );
    expect(sortTagsByTitleMock).toHaveBeenCalledTimes(1);
    expect(sortTagsByTitleMock).toHaveBeenCalledWith(TAGS, TAG_ORDER);
  });
});
