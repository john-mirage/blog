export class Post {
  public slug: string;
  public markdown: string;
  public title: string;
  public date: string;
  public excerpt: string;
  public tags: string[];
  public readTime: string;

  /**
   * @constructor
   * @access public
   * @param {string} slug - The post slug.
   * @param {string} markdown - The post markdown.
   * @param {string} title - The post title.
   * @param {string} date - The post date.
   * @param {string} excerpt - The post excerpt.
   * @param {string[]} tags - The post tags.
   * @param {string} readTime - The post read time.
   */
  public constructor(
    slug: string,
    markdown: string,
    title: string,
    date: string,
    excerpt: string,
    tags: string[],
    readTime: string
  ) {
    this.slug = slug;
    this.markdown = markdown;
    this.title = title;
    this.date = date;
    this.excerpt = excerpt;
    this.tags = tags;
    this.readTime = readTime;
  }
}
