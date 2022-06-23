import { getFile, getFilenames } from '@api/databases/fileDatabase';
import { join } from 'path';
import fs from 'fs';
import { RawFile } from '@api/models/rawFile';

jest.mock('path', () => {
  return {
    join: jest.fn(),
  };
});

jest.mock('fs', () => {
  return {
    readFileSync: jest.fn(),
    readdirSync: jest.fn(),
  };
});

jest.mock('@api/models/rawFile', () => {
  return {
    RawFile: jest.fn(),
  };
});

const joinMock = <jest.MockedFunction<typeof join>>join;
const readFileSyncMock = <jest.MockedFunction<typeof fs.readFileSync>>(
  fs.readFileSync
);
const readdirSyncMock = <jest.MockedFunction<typeof fs.readdirSync>>(
  fs.readdirSync
);
const RawFileMock = <jest.Mock<RawFile>>RawFile;

const FILE_DIRECTORY = '/home/work/project';

describe('fileDatabase: getFile', () => {
  afterEach(() => {
    joinMock.mockClear();
    readFileSyncMock.mockClear();
    RawFileMock.mockClear();
  });

  it('should return a file', () => {
    const RAW_FILE = {
      name: 'filename.md',
      content: '# Markdown content',
    };
    const FILE_PATH = `${FILE_DIRECTORY}/${RAW_FILE.name}`;
    joinMock.mockReturnValueOnce(FILE_PATH);
    readFileSyncMock.mockReturnValueOnce(RAW_FILE.content);
    RawFileMock.mockReturnValueOnce(RAW_FILE);
    expect(getFile(RAW_FILE.name, FILE_DIRECTORY)).toEqual(RAW_FILE);
  });
});

describe('fileDatabase: getFilenames', () => {
  afterEach(() => {
    readdirSyncMock.mockClear();
  });

  it('should return the filenames if the file directory is not empty', () => {
    const FILENAMES = ['filename1.md', 'filename2.md', 'filename3.md'];
    readdirSyncMock.mockReturnValueOnce(FILENAMES as any);
    expect(getFilenames(FILE_DIRECTORY)).toEqual(FILENAMES);
    expect(readdirSyncMock).toHaveBeenCalledTimes(1);
    expect(readdirSyncMock).toHaveBeenCalledWith(FILE_DIRECTORY);
  });

  it('should throw an error if the file directory is empty', () => {
    readdirSyncMock.mockReturnValueOnce([]);
    expect(() => {
      getFilenames(FILE_DIRECTORY);
    }).toThrow(FILE_DIRECTORY + ' folder is empty');
    expect(readdirSyncMock).toHaveBeenCalledTimes(1);
    expect(readdirSyncMock).toHaveBeenCalledWith(FILE_DIRECTORY);
  });
});
