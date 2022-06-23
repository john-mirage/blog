import { Post } from '@api/models/post';

const POST = {
  slug: 'name-of-the-post',
  markdown: '# markdown content of the post',
  title: 'Title of the post',
  date: '2021-09-15',
  excerpt: 'Short description of the post',
  tags: ['tag1', 'tag2'],
  readTime: '5 minutes',
};

describe('Post: constructor', () => {
  it('should build a new post', () => {
    const post = new Post(
      POST.slug,
      POST.markdown,
      POST.title,
      POST.date,
      POST.excerpt,
      POST.tags,
      POST.readTime
    );
    expect(post).toEqual(POST);
  });
});
