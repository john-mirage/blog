import { RawFile } from '@api/models/rawFile';

const RAW_FILE = {
  name: 'name-of-the-file.md',
  content: '# Markdown Content',
};

describe('RawFile: constructor', () => {
  it('should build a new raw file', () => {
    const rawFile = new RawFile(RAW_FILE.name, RAW_FILE.content);
    expect(rawFile).toEqual(RAW_FILE);
  });
});
