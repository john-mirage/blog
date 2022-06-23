import { Tag } from '@api/models/tag';

const TAG = {
  slug: 'slug-of-the-tag',
  markdown: '# markdown content of the tag',
  title: 'Title of the tag',
  excerpt: 'Short description of the tag',
};

describe('Tag: constructor', () => {
  it('should build a new tag', () => {
    const tag = new Tag(TAG.slug, TAG.markdown, TAG.title, TAG.excerpt);
    expect(tag).toEqual(TAG);
  });
});
