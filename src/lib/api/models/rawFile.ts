export class RawFile {
  public name: string;
  public content: string;

  /**
   * @constructor
   * @access public
   * @param {string} name - The file name.
   * @param {string} content - The file content.
   */
  public constructor(name: string, content: string) {
    this.name = name;
    this.content = content;
  }
}
