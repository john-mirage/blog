import { sortTagsByTitle, getTagFrontmatter } from '@api/helpers/tagHelper';
import { Tag } from '@api/models/tag';

const TAG1 = { title: 'title of the tag 1' };
const TAG2 = { title: 'title of the tag 2' };
const TAG3 = { title: 'title of the tag 3' };

describe('tagHelper: sortTagsByTitle', () => {
  it('should return the tags sorted by title with descending order', () => {
    const TAGS = <Tag[]>[TAG1, TAG2, TAG3];
    const sortedTags = sortTagsByTitle(TAGS, 'descending');
    expect(sortedTags).toEqual([TAG3, TAG2, TAG1]);
  });

  it('should return the tags sorted by title with ascending order', () => {
    const TAGS = <Tag[]>[TAG1, TAG2, TAG3];
    const sortedTags = sortTagsByTitle(TAGS, 'ascending');
    expect(sortedTags).toEqual([TAG1, TAG2, TAG3]);
  });

  it('should throw an error if the order is invalid', () => {
    const TAGS = <Tag[]>[TAG1, TAG2, TAG3];
    expect(() => {
      sortTagsByTitle(TAGS, 'badOrder');
    }).toThrow('The order is invalid');
  });
});

describe('TagHelper: getTagFrontmatter', () => {
  interface testedFrontmatter {
    excerpt: string;
    title?: string;
  }

  const FRONTMATTER: testedFrontmatter = {
    excerpt: 'excerpt',
    title: 'title',
  };

  const FILENAME = 'tag.md';

  it('should extract the tag data of the frontmatter', () => {
    const tagFrontmatter = getTagFrontmatter(FILENAME, FRONTMATTER);
    expect(tagFrontmatter).toEqual({
      excerpt: FRONTMATTER.excerpt,
      title: FRONTMATTER.title,
    });
  });

  it('should throw an error if one or more tag data are missing', () => {
    delete FRONTMATTER.title;
    expect(() => {
      getTagFrontmatter(FILENAME, FRONTMATTER);
    }).toThrow(`One or more fields are missing in ${FILENAME}`);
  });
});
