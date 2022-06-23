export class Episode {
  public slug: string;
  public markdown: string;
  public id: number;
  public title: string;
  public date: string;
  public excerpt: string;
  public readTime: string;

  /**
   * @constructor
   * @access public
   * @param {string} slug - The episode slug.
   * @param {string} markdown - The episode markdown.
   * @param {number} id - The episode Id.
   * @param {string} title - The episode title.
   * @param {string} date - The episode date.
   * @param {string} excerpt - The episode excerpt.
   * @param {string} readTime - The episode read time.
   */
  public constructor(
    slug: string,
    markdown: string,
    id: number,
    title: string,
    date: string,
    excerpt: string,
    readTime: string
  ) {
    this.slug = slug;
    this.markdown = markdown;
    this.id = id;
    this.title = title;
    this.date = date;
    this.excerpt = excerpt;
    this.readTime = readTime;
  }
}
