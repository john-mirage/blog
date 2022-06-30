import {
  getMarkdownFile,
  getMarkdownFilenames,
  getMarkdownDirectory,
  MARKDOWN_DIRECTORY,
} from "@api/databases/markdownDatabase";
import { getFile, getFilenames } from "@api/databases/fileDatabase";
import matter, { GrayMatterFile } from "gray-matter";
import { join } from "path";

jest.mock("@api/databases/fileDatabase", () => {
  return { getFile: jest.fn(), getFilenames: jest.fn() };
});

jest.mock("gray-matter", () => {
  return jest.fn();
});

jest.mock("path", () => {
  return { join: jest.fn() };
});

const getFileMock = <jest.MockedFunction<typeof getFile>>getFile;
const getFilenamesMock = <jest.MockedFunction<typeof getFilenames>>getFilenames;
const matterMock = <jest.MockedFunction<typeof matter>>matter;
const joinMock = <jest.MockedFunction<typeof join>>join;

const RAW_FILE = {
  name: "name-of-the-markdown-file-1.md",
  content: "# markdown content of the markdown file 1",
};

const MARKDOWN_FILE = {
  name: RAW_FILE.name,
  markdown: RAW_FILE.content,
  frontmatter: {
    title: "title of the entity 1",
    date: "2021-09-15",
    excerpt: "short description of the entity 1",
    tags: ["tag1", "tag2"],
    readTime: "5 minutes",
  },
};

const FILE_DIRECTORY = "/path/of/the/file";

describe("markdownDatabase: getMarkdownFile", () => {
  afterEach(() => {
    getFileMock.mockClear();
    matterMock.mockClear();
  });

  it("should return a new Markdown file", () => {
    getFileMock.mockReturnValueOnce(RAW_FILE);
    matterMock.mockReturnValueOnce({
      data: MARKDOWN_FILE.frontmatter,
      content: RAW_FILE.content,
    } as any);
    const markdownFile = getMarkdownFile(RAW_FILE.name, FILE_DIRECTORY);
    expect(markdownFile).toEqual(MARKDOWN_FILE);
    expect(getFileMock).toHaveBeenCalledTimes(1);
    expect(getFileMock).toHaveBeenCalledWith(RAW_FILE.name, FILE_DIRECTORY);
    expect(matterMock).toHaveBeenCalledTimes(1);
    expect(matterMock).toHaveBeenCalledWith(RAW_FILE.content);
  });
});

describe("markdownDatabase: getMarkdownFilenames", () => {
  afterEach(() => {
    getFilenamesMock.mockClear();
  });

  it("should return the filenames of the Markdown files when they are present", () => {
    const FILENAMES = [
      "filename1.md",
      "filename2.mp3",
      "filename3.avi",
      "filename4.md",
    ];
    const MARKDOWN_FILENAMES = ["filename1.md", "filename4.md"];
    getFilenamesMock.mockReturnValueOnce(FILENAMES);
    const markdownFilenames = getMarkdownFilenames(FILE_DIRECTORY);
    expect(markdownFilenames).toEqual(MARKDOWN_FILENAMES);
    expect(getFilenamesMock).toHaveBeenCalledTimes(1);
    expect(getFilenamesMock).toHaveBeenCalledWith(FILE_DIRECTORY);
  });

  it("should throw an error if their is no Markdown files", () => {
    const FILENAMES = [
      "filename1.asd",
      "filename2.mp3",
      "filename3.avi",
      "filename4.mp4",
    ];
    getFilenamesMock.mockReturnValueOnce(FILENAMES);
    expect(() => {
      getMarkdownFilenames(FILE_DIRECTORY);
    }).toThrow("There is no Markdown files in " + FILE_DIRECTORY);
  });
});

describe("markdownDatabase: getMarkdownDirectory", () => {
  afterEach(() => {
    joinMock.mockClear();
  });

  it("should return the Markdown file directory", () => {
    const ROOT_DIRECTORY_PATH = "/home/work/project";
    const MARKDOWN_DIRECTORY_PATH = ROOT_DIRECTORY_PATH + MARKDOWN_DIRECTORY;
    const cwdSpy = jest.spyOn(process, "cwd");
    cwdSpy.mockReturnValueOnce(ROOT_DIRECTORY_PATH);
    joinMock.mockReturnValueOnce(MARKDOWN_DIRECTORY_PATH);
    const markdownDirectory = getMarkdownDirectory();
    expect(markdownDirectory).toBe(MARKDOWN_DIRECTORY_PATH);
    expect(cwdSpy).toHaveBeenCalledTimes(1);
    expect(joinMock).toHaveBeenCalledTimes(1);
    expect(joinMock).toHaveBeenCalledWith(
      ROOT_DIRECTORY_PATH,
      MARKDOWN_DIRECTORY
    );
    cwdSpy.mockRestore();
  });
});
