export interface Frontmatter {
  date?: string;
  excerpt?: string;
  id?: number;
  lastUpdate?: string;
  readTime?: string;
  title?: string;
  tags?: string[];
}

export interface MarkdownFile {
  name: string;
  frontmatter: Frontmatter;
  markdown: string;
}
