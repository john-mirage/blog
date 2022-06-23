import { MarkdownFile } from '@api/models/markdownFile';

const MARKDOWN_FILE = {
  name: 'name-of-the-markdown-file',
  frontmatter: {
    title: 'Title of the entity',
    id: 1,
  },
  markdown: '# Markdown Content',
};

describe('MarkdownFile: constructor', () => {
  it('should build a new Markdown file', () => {
    const markdownFile = new MarkdownFile(
      MARKDOWN_FILE.name,
      MARKDOWN_FILE.frontmatter,
      MARKDOWN_FILE.markdown
    );
    expect(markdownFile).toEqual(MARKDOWN_FILE);
  });
});
