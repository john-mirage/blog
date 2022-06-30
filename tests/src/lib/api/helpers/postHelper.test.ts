import {
  sortPostsByDate,
  filterPostsByTags,
  getPostFrontmatter,
} from "@api/helpers/postHelper";
import { Post } from "@api/interfaces/post";

describe("postHelper: sortPostsByDate", () => {
  const POST1 = { date: "2021-09-15T15:30:00" };
  const POST2 = { date: "2021-09-13T15:30:00" };
  const POST3 = { date: "2021-09-16T15:30:00" };

  it("should return the posts sorted by id with descending order", () => {
    const POSTS = <Post[]>[POST1, POST2, POST3];
    const sortedPosts = sortPostsByDate(POSTS, "descending");
    expect(sortedPosts).toEqual([POST3, POST1, POST2]);
  });

  it("should return the posts sorted by id with ascending order", () => {
    const POSTS = <Post[]>[POST1, POST2, POST3];
    const sortedPosts = sortPostsByDate(POSTS, "ascending");
    expect(sortedPosts).toEqual([POST2, POST1, POST3]);
  });

  it("should throw an error if the order is invalid", () => {
    const POSTS = <Post[]>[POST1, POST2, POST3];
    expect(() => {
      sortPostsByDate(POSTS, "badOrder");
    }).toThrow("The order is invalid");
  });
});

describe("postHelper: filterPostsByTags", () => {
  const POSTS = <Post[]>[
    { tags: ["windows", "macos"] },
    { tags: ["linux", "android"] },
    { tags: ["macos", "ios"] },
  ];

  const POST_TAGS = ["windows", "macos"];

  it("should filter the posts by tags", () => {
    const filteredPosts = filterPostsByTags(POSTS, POST_TAGS);
    expect(filteredPosts).toEqual([POSTS[0], POSTS[2]]);
  });
});

describe("PostHelper: getPostFrontmatter", () => {
  interface TestedFrontmatter {
    date: string;
    excerpt: string;
    readTime: string;
    tags: string[];
    title?: string;
  }

  const FRONTMATTER: TestedFrontmatter = {
    date: "date",
    excerpt: "excerpt",
    readTime: "readTime",
    tags: ["tag1", "tag2"],
    title: "title",
  };

  const FILENAME = "post.md";

  it("should extract the post data of the frontmatter", () => {
    const postFrontmatter = getPostFrontmatter(FILENAME, FRONTMATTER);
    expect(postFrontmatter).toEqual({
      date: FRONTMATTER.date,
      excerpt: FRONTMATTER.excerpt,
      readTime: FRONTMATTER.readTime,
      tags: FRONTMATTER.tags,
      title: FRONTMATTER.title,
    });
  });

  it("should throw an error if one or more post data are missing", () => {
    delete FRONTMATTER.title;
    expect(() => {
      getPostFrontmatter(FILENAME, FRONTMATTER);
    }).toThrow(`One or more fields are missing in ${FILENAME}`);
  });
});
