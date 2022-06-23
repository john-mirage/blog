export class Tag {
  public slug: string;
  public markdown: string;
  public title: string;
  public excerpt: string;

  /**
   * @constructor
   * @access public
   * @param {string} slug - The serie slug.
   * @param {string} markdown - The serie markdown.
   * @param {string} title - The serie title.
   * @param {string} excerpt - The serie excerpt.
   */
  public constructor(
    slug: string,
    markdown: string,
    title: string,
    excerpt: string
  ) {
    this.slug = slug;
    this.markdown = markdown;
    this.title = title;
    this.excerpt = excerpt;
  }
}
