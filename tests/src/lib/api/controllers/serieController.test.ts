import { getSerie, getAllSeries } from "@api/controllers/serieController";
import {
  getSerieFromMarkdownFile,
  getSerieDirectory,
  SERIE_DIRECTORY,
} from "@api/databases/serieDatabase";
import { getMarkdownFilenames } from "@api/databases/markdownDatabase";
import { getFilenameWithExtension } from "@api/helpers/fileHelper";
import { sortSeriesByLastUpdate } from "@api/helpers/serieHelper";

jest.mock("@api/databases/serieDatabase", () => {
  return { getSerieFromMarkdownFile: jest.fn(), getSerieDirectory: jest.fn() };
});

jest.mock("@api/databases/markdownDatabase", () => {
  return { getMarkdownFilenames: jest.fn() };
});

jest.mock("@api/helpers/fileHelper", () => {
  return { getFilenameWithExtension: jest.fn() };
});

jest.mock("@api/helpers/serieHelper", () => {
  return { sortSeriesByLastUpdate: jest.fn() };
});

const SERIE1 = {
  slug: "slug-of-the-serie-1",
  markdown: "# markdown content of the serie 1",
  title: "title of the serie 1",
  excerpt: "short description of the serie 1",
  lastUpdate: "2021-09-15",
};
const SERIE2 = {
  slug: "slug-of-the-serie-2",
  markdown: "# markdown content of the serie 2",
  title: "title of the serie 2",
  excerpt: "short description of the serie 2",
  lastUpdate: "2021-09-17",
};
const SERIE3 = {
  slug: "slug-of-the-serie-3",
  markdown: "# markdown content of the serie 3",
  title: "title of the serie 3",
  excerpt: "short description of the serie 3",
  lastUpdate: "2021-09-14",
};
const SERIES = [SERIE1, SERIE2, SERIE3];
const SERIE_FILENAME1 = `${SERIE1.slug}.md`;
const SERIE_FILENAME2 = `${SERIE2.slug}.md`;
const SERIE_FILENAME3 = `${SERIE3.slug}.md`;
const SERIE_FILENAMES = [SERIE_FILENAME1, SERIE_FILENAME2, SERIE_FILENAME3];
const SERIE_DIRECTORY_PATH = `/home/work/project/${SERIE_DIRECTORY}`;
const SERIE_ORDER = "descending";

const getSerieDirectoryMock = <jest.MockedFunction<typeof getSerieDirectory>>(
  getSerieDirectory
);
const getMarkdownFilenamesMock = <
  jest.MockedFunction<typeof getMarkdownFilenames>
>getMarkdownFilenames;
const getFilenameWithExtensionMock = <
  jest.MockedFunction<typeof getFilenameWithExtension>
>getFilenameWithExtension;
const getSerieFromMarkdownFileMock = <
  jest.MockedFunction<typeof getSerieFromMarkdownFile>
>getSerieFromMarkdownFile;
const sortSeriesByLastUpdateMock = <
  jest.MockedFunction<typeof sortSeriesByLastUpdate>
>sortSeriesByLastUpdate;

describe("serieController: getSerie", () => {
  afterEach(() => {
    getSerieDirectoryMock.mockClear();
    getMarkdownFilenamesMock.mockClear();
    getFilenameWithExtensionMock.mockClear();
    getSerieFromMarkdownFileMock.mockClear();
  });

  it("should return a serie", () => {
    getSerieDirectoryMock.mockReturnValue(SERIE_DIRECTORY_PATH);
    getMarkdownFilenamesMock.mockReturnValue(SERIE_FILENAMES);
    getFilenameWithExtensionMock.mockReturnValue(SERIE_FILENAME1);
    getSerieFromMarkdownFileMock.mockReturnValue(SERIE1);
    const serie = getSerie(SERIE1.slug);
    expect(serie).toEqual(SERIE1);
    expect(getSerieDirectoryMock).toHaveBeenCalledTimes(1);
    expect(getMarkdownFilenamesMock).toHaveBeenCalledTimes(1);
    expect(getMarkdownFilenamesMock).toHaveBeenCalledWith(SERIE_DIRECTORY_PATH);
    expect(getFilenameWithExtensionMock).toHaveBeenCalledTimes(1);
    expect(getFilenameWithExtensionMock).toHaveBeenCalledWith(
      SERIE1.slug,
      SERIE_FILENAMES
    );
    expect(getSerieFromMarkdownFileMock).toHaveBeenCalledTimes(1);
    expect(getSerieFromMarkdownFileMock).toHaveBeenCalledWith(
      SERIE_FILENAME1,
      SERIE_DIRECTORY_PATH
    );
  });
});

describe("serieController: getAllSeries", () => {
  const ORDERED_SERIES = [SERIE2, SERIE1, SERIE3];

  afterEach(() => {
    getSerieDirectoryMock.mockClear();
    getMarkdownFilenamesMock.mockClear();
    getSerieFromMarkdownFileMock.mockClear();
    sortSeriesByLastUpdateMock.mockClear();
  });

  it("should return all the series", () => {
    getSerieDirectoryMock.mockReturnValue(SERIE_DIRECTORY_PATH);
    getMarkdownFilenamesMock.mockReturnValue(SERIE_FILENAMES);
    getSerieFromMarkdownFileMock.mockReturnValueOnce(SERIE1);
    getSerieFromMarkdownFileMock.mockReturnValueOnce(SERIE2);
    getSerieFromMarkdownFileMock.mockReturnValueOnce(SERIE3);
    sortSeriesByLastUpdateMock.mockReturnValue(ORDERED_SERIES);
    const series = getAllSeries(SERIE_ORDER);
    expect(series).toEqual(ORDERED_SERIES);
    expect(getSerieDirectoryMock).toHaveBeenCalledTimes(1);
    expect(getMarkdownFilenamesMock).toHaveBeenCalledTimes(1);
    expect(getMarkdownFilenamesMock).toHaveBeenCalledWith(SERIE_DIRECTORY_PATH);
    expect(getSerieFromMarkdownFileMock).toHaveBeenCalledTimes(3);
    expect(getSerieFromMarkdownFileMock).toHaveBeenNthCalledWith(
      1,
      SERIE_FILENAME1,
      SERIE_DIRECTORY_PATH
    );
    expect(getSerieFromMarkdownFileMock).toHaveBeenNthCalledWith(
      2,
      SERIE_FILENAME2,
      SERIE_DIRECTORY_PATH
    );
    expect(getSerieFromMarkdownFileMock).toHaveBeenNthCalledWith(
      3,
      SERIE_FILENAME3,
      SERIE_DIRECTORY_PATH
    );
    expect(sortSeriesByLastUpdateMock).toHaveBeenCalledTimes(1);
    expect(sortSeriesByLastUpdateMock).toHaveBeenCalledWith(
      SERIES,
      SERIE_ORDER
    );
  });
});
