import {
  getPostFromMarkdownFile,
  getPostDirectory,
  POST_DIRECTORY,
} from "@api/databases/postDatabase";
import {
  getMarkdownFile,
  getMarkdownDirectory,
} from "@api/databases/markdownDatabase";
import { checkISODate } from "@api/helpers/dateHelper";
import { join } from "path";
import {
  checkFileDirectory,
  removeFilenameExtension,
} from "@api/helpers/fileHelper";
import { getPostFrontmatter } from "@api/helpers/postHelper";

jest.mock("@api/databases/markdownDatabase", () => {
  return { getMarkdownFile: jest.fn(), getMarkdownDirectory: jest.fn() };
});

jest.mock("@api/helpers/dateHelper", () => {
  return { checkISODate: jest.fn() };
});

jest.mock("path", () => {
  return { join: jest.fn() };
});

jest.mock("@api/helpers/fileHelper", () => {
  return { removeFilenameExtension: jest.fn(), checkFileDirectory: jest.fn() };
});

jest.mock("@api/helpers/postHelper", () => {
  return { getPostFrontmatter: jest.fn() };
});

const getMarkdownFileMock = <jest.MockedFunction<typeof getMarkdownFile>>(
  getMarkdownFile
);
const getMarkdownDirectoryMock = <
  jest.MockedFunction<typeof getMarkdownDirectory>
>getMarkdownDirectory;
const checkISODateMock = <jest.MockedFunction<typeof checkISODate>>checkISODate;
const joinMock = <jest.MockedFunction<typeof join>>join;
const removeFilenameExtensionMock = <
  jest.MockedFunction<typeof removeFilenameExtension>
>removeFilenameExtension;
const checkFileDirectoryMock = <jest.MockedFunction<typeof checkFileDirectory>>(
  checkFileDirectory
);
const getPostFrontmatterMock = <jest.MockedFunction<typeof getPostFrontmatter>>(
  getPostFrontmatter
);

const MARKDOWN_FILE = {
  name: "name-of-the-markdown-file-1.md",
  markdown: "# markdown content of the markdown file 1",
  frontmatter: {
    title: "title of the entity 1",
    date: "2021-09-15",
    excerpt: "short description of the entity 1",
    tags: ["tag1", "tag2"],
    readTime: "5 minutes",
  },
};

const POST_SLUG = "name-of-the-markdown-file-1";

const POST = {
  slug: POST_SLUG,
  markdown: MARKDOWN_FILE.markdown,
  title: MARKDOWN_FILE.frontmatter.title,
  date: MARKDOWN_FILE.frontmatter.date,
  excerpt: MARKDOWN_FILE.frontmatter.excerpt,
  tags: MARKDOWN_FILE.frontmatter.tags,
  readTime: MARKDOWN_FILE.frontmatter.readTime,
};

describe("postDatabase: getPost", () => {
  const FILENAME = MARKDOWN_FILE.name + ".md";
  const FILE_DIRECTORY = "/markdown/posts";

  afterEach(() => {
    getMarkdownFileMock.mockClear();
    checkISODateMock.mockClear();
    getPostFrontmatterMock.mockClear();
    removeFilenameExtensionMock.mockClear();
  });

  it("should return a new post", () => {
    getMarkdownFileMock.mockReturnValueOnce(MARKDOWN_FILE);
    getPostFrontmatterMock.mockReturnValueOnce(MARKDOWN_FILE.frontmatter);
    removeFilenameExtensionMock.mockReturnValueOnce(POST_SLUG);
    const post = getPostFromMarkdownFile(FILENAME, FILE_DIRECTORY);
    expect(post).toEqual(POST);
    expect(getMarkdownFileMock).toHaveBeenCalledTimes(1);
    expect(getMarkdownFileMock).toHaveBeenCalledWith(FILENAME, FILE_DIRECTORY);
    expect(getPostFrontmatterMock).toHaveBeenCalledTimes(1);
    expect(getPostFrontmatterMock).toHaveBeenCalledWith(
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

describe("postDatabase: getPostDirectory", () => {
  afterEach(() => {
    getMarkdownDirectoryMock.mockClear();
    joinMock.mockClear();
    checkFileDirectoryMock.mockClear();
  });

  it("should return the post directory", () => {
    const MARKDOWN_DIRECTORY = "/markdown";
    const POST_DIRECTORY_PATH = `${MARKDOWN_DIRECTORY}/${POST_DIRECTORY}`;
    getMarkdownDirectoryMock.mockReturnValueOnce(MARKDOWN_DIRECTORY);
    joinMock.mockReturnValueOnce(POST_DIRECTORY_PATH);
    const postDirectory = getPostDirectory();
    expect(postDirectory).toBe(POST_DIRECTORY_PATH);
    expect(getMarkdownDirectoryMock).toHaveBeenCalledTimes(1);
    expect(joinMock).toHaveBeenCalledTimes(1);
    expect(joinMock).toHaveBeenCalledWith(MARKDOWN_DIRECTORY, POST_DIRECTORY);
    expect(checkFileDirectoryMock).toHaveBeenCalledTimes(1);
    expect(checkFileDirectoryMock).toHaveBeenCalledWith(POST_DIRECTORY_PATH);
  });
});
