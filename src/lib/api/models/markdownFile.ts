export interface Frontmatter {
  date?: string;
  excerpt?: string;
  id?: number;
  lastUpdate?: string;
  readTime?: string;
  title?: string;
  tags?: string[];
}

export class MarkdownFile {
  public name: string;
  public frontmatter: Frontmatter;
  public markdown: string;

  /**
   * @constructor
   * @access public
   * @param {string} name - The name of the Markdown file.
   * @param {Frontmatter} frontmatter - The frontmatter of the Markdown file.
   * @param {string} markdown - The Markdown content of the Markdown file.
   */
  public constructor(name: string, frontmatter: Frontmatter, markdown: string) {
    this.name = name;
    this.frontmatter = frontmatter;
    this.markdown = markdown;
  }
}
