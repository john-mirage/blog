import {
  checkFileDirectory,
  getFilenameWithExtension,
  removeFilenameExtension,
} from "@api/helpers/fileHelper";
import fs from "fs";

jest.mock("fs", () => {
  return { existsSync: jest.fn() };
});

const existsSyncMock = <jest.MockedFunction<typeof fs.existsSync>>fs.existsSync;

describe("fileHelper: checkFileDirectory", () => {
  const FILE_DIRECTORY = "/home/images";

  afterEach(() => {
    existsSyncMock.mockClear();
  });

  it("should not return if the path exist", () => {
    existsSyncMock.mockReturnValueOnce(true);
    expect(checkFileDirectory(FILE_DIRECTORY)).toBeUndefined();
    expect(existsSyncMock).toHaveBeenCalledTimes(1);
    expect(existsSyncMock).toHaveBeenCalledWith(FILE_DIRECTORY);
  });

  it("should throw an error if the path does not exist", () => {
    existsSyncMock.mockReturnValueOnce(false);
    expect(() => {
      checkFileDirectory(FILE_DIRECTORY);
    }).toThrow("/home/images does not exist on your system");
    expect(existsSyncMock).toHaveBeenCalledTimes(1);
    expect(existsSyncMock).toHaveBeenCalledWith(FILE_DIRECTORY);
  });
});

describe("fileHelper: getFilenameWithExtension", () => {
  const FILENAMES = ["entity-name-1.markdown", "entity-name-2.markdown"];

  it("should return the filename with extension if the filename is valid", () => {
    expect(getFilenameWithExtension("entity-name-1", FILENAMES)).toBe(
      "entity-name-1.markdown"
    );
  });

  it("should throw an error if the filename is not found", () => {
    expect(() => {
      getFilenameWithExtension("entity-name-3", FILENAMES);
    }).toThrow("entity-name-3 does not correspond to any filenames");
  });
});

describe("fileHelper: removeFilenameExtension", () => {
  it("should return the filename without its extension", () => {
    const VALID_FILENAME = "markdown_file-1.md";
    const filenameWithoutExt = removeFilenameExtension(VALID_FILENAME);
    expect(filenameWithoutExt).toBe("markdown_file-1");
  });

  it("should throw an error if the filename does not include a file extension", () => {
    const INVALID_FILENAME = ".babelrc";
    expect(() => {
      removeFilenameExtension(INVALID_FILENAME);
    }).toThrow(".babelrc does not include a file extension");
  });
});
