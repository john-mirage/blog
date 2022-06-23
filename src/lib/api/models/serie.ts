export class Serie {
  public slug: string;
  public markdown: string;
  public title: string;
  public excerpt: string;
  public lastUpdate: string;

  /**
   * @constructor
   * @access public
   * @param {string} slug - The serie slug.
   * @param {string} markdown - The serie markdown.
   * @param {string} title - The serie title.
   * @param {string} lastUpdate - The serie last update.
   */
  public constructor(
    slug: string,
    markdown: string,
    title: string,
    excerpt: string,
    lastUpdate: string
  ) {
    this.slug = slug;
    this.markdown = markdown;
    this.title = title;
    this.excerpt = excerpt;
    this.lastUpdate = lastUpdate;
  }
}
