import {
  getPost,
  getAllPosts,
  getPostsBySlugs,
  getPostsByTags,
  getPostSlugs,
} from "@api/controllers/postController";
import {
  getPostFromMarkdownFile,
  getPostDirectory,
  POST_DIRECTORY,
} from "@api/databases/postDatabase";
import { getMarkdownFilenames } from "@api/databases/markdownDatabase";
import {
  getFilenameWithExtension,
  removeFilenameExtension,
} from "@api/helpers/fileHelper";
import { sortPostsByDate, filterPostsByTags } from "@api/helpers/postHelper";

jest.mock("@api/databases/postDatabase", () => {
  return { getPostFromMarkdownFile: jest.fn(), getPostDirectory: jest.fn() };
});

jest.mock("@api/databases/markdownDatabase", () => {
  return { getMarkdownFilenames: jest.fn() };
});

jest.mock("@api/helpers/fileHelper", () => {
  return {
    getFilenameWithExtension: jest.fn(),
    removeFilenameExtension: jest.fn(),
  };
});

jest.mock("@api/helpers/postHelper", () => {
  return { sortPostsByDate: jest.fn(), filterPostsByTags: jest.fn() };
});

const POST1 = {
  slug: "slug-of-the-post-1",
  markdown: "# markdown content of the post 1",
  title: "title of the post 1",
  date: "2021-09-15",
  excerpt: "short description of the post 1",
  tags: ["tag1", "tag2"],
  readTime: "5 minutes",
};
const POST2 = {
  slug: "slug-of-the-post-2",
  markdown: "# markdown content of the post 2",
  title: "title of the post 2",
  date: "2021-09-14",
  excerpt: "short description of the post 2",
  tags: ["tag3", "tag4"],
  readTime: "20 minutes",
};
const POST3 = {
  slug: "slug-of-the-post-3",
  markdown: "# markdown content of the post 3",
  title: "title of the post 3",
  date: "2021-09-16",
  excerpt: "short description of the post 3",
  tags: ["tag1", "tag3"],
  readTime: "10 minutes",
};
const POSTS = [POST1, POST2, POST3];
const POST_FILENAME1 = `${POST1.slug}.md`;
const POST_FILENAME2 = `${POST2.slug}.md`;
const POST_FILENAME3 = `${POST3.slug}.md`;
const POST_FILENAMES = [POST_FILENAME1, POST_FILENAME2, POST_FILENAME3];
const POST_DIRECTORY_PATH = `/home/work/project/${POST_DIRECTORY}`;
const POST_ORDER = "descending";

const getPostDirectoryMock = <jest.MockedFunction<typeof getPostDirectory>>(
  getPostDirectory
);
const getMarkdownFilenamesMock = <
  jest.MockedFunction<typeof getMarkdownFilenames>
>getMarkdownFilenames;
const getFilenameWithExtensionMock = <
  jest.MockedFunction<typeof getFilenameWithExtension>
>getFilenameWithExtension;
const getPostFromMarkdownFileMock = <
  jest.MockedFunction<typeof getPostFromMarkdownFile>
>getPostFromMarkdownFile;
const sortPostsByDateMock = <jest.MockedFunction<typeof sortPostsByDate>>(
  sortPostsByDate
);
const filterPostsByTagsMock = <jest.MockedFunction<typeof filterPostsByTags>>(
  filterPostsByTags
);
const removeFilenameExtensionMock = <
  jest.MockedFunction<typeof removeFilenameExtension>
>removeFilenameExtension;

describe("postController: getPost", () => {
  afterEach(() => {
    getPostDirectoryMock.mockClear();
    getMarkdownFilenamesMock.mockClear();
    getFilenameWithExtensionMock.mockClear();
    getPostFromMarkdownFileMock.mockClear();
  });

  it("should return a post", () => {
    getPostDirectoryMock.mockReturnValue(POST_DIRECTORY_PATH);
    getMarkdownFilenamesMock.mockReturnValue(POST_FILENAMES);
    getFilenameWithExtensionMock.mockReturnValue(POST_FILENAME1);
    getPostFromMarkdownFileMock.mockReturnValue(POST1);
    const post = getPost(POST1.slug);
    expect(post).toEqual(POST1);
    expect(getPostDirectoryMock).toHaveBeenCalledTimes(1);
    expect(getMarkdownFilenamesMock).toHaveBeenCalledTimes(1);
    expect(getMarkdownFilenamesMock).toHaveBeenCalledWith(POST_DIRECTORY_PATH);
    expect(getFilenameWithExtensionMock).toHaveBeenCalledTimes(1);
    expect(getFilenameWithExtensionMock).toHaveBeenCalledWith(
      POST1.slug,
      POST_FILENAMES
    );
    expect(getPostFromMarkdownFileMock).toHaveBeenCalledTimes(1);
    expect(getPostFromMarkdownFileMock).toHaveBeenCalledWith(
      POST_FILENAME1,
      POST_DIRECTORY_PATH
    );
  });
});

describe("PostController: getAllPosts", () => {
  const ORDERED_POSTS = [POST3, POST1, POST2];

  afterEach(() => {
    getPostDirectoryMock.mockClear();
    getMarkdownFilenamesMock.mockClear();
    getPostFromMarkdownFileMock.mockClear();
    sortPostsByDateMock.mockClear();
  });

  it("should return all the posts", () => {
    getPostDirectoryMock.mockReturnValue(POST_DIRECTORY_PATH);
    getMarkdownFilenamesMock.mockReturnValue(POST_FILENAMES);
    getPostFromMarkdownFileMock.mockReturnValueOnce(POST1);
    getPostFromMarkdownFileMock.mockReturnValueOnce(POST2);
    getPostFromMarkdownFileMock.mockReturnValueOnce(POST3);
    sortPostsByDateMock.mockReturnValue(ORDERED_POSTS);
    const posts = getAllPosts(POST_ORDER);
    expect(posts).toEqual(ORDERED_POSTS);
    expect(getPostDirectoryMock).toHaveBeenCalledTimes(1);
    expect(getMarkdownFilenamesMock).toHaveBeenCalledTimes(1);
    expect(getMarkdownFilenamesMock).toHaveBeenCalledWith(POST_DIRECTORY_PATH);
    expect(getPostFromMarkdownFileMock).toHaveBeenCalledTimes(3);
    expect(getPostFromMarkdownFileMock).toHaveBeenNthCalledWith(
      1,
      POST_FILENAME1,
      POST_DIRECTORY_PATH
    );
    expect(getPostFromMarkdownFileMock).toHaveBeenNthCalledWith(
      2,
      POST_FILENAME2,
      POST_DIRECTORY_PATH
    );
    expect(getPostFromMarkdownFileMock).toHaveBeenNthCalledWith(
      3,
      POST_FILENAME3,
      POST_DIRECTORY_PATH
    );
    expect(sortPostsByDateMock).toHaveBeenCalledTimes(1);
    expect(sortPostsByDateMock).toHaveBeenCalledWith(POSTS, POST_ORDER);
  });
});

describe("PostController: getPostsBySlugs", () => {
  const POST_SLUGS = [POST1.slug, POST2.slug];
  const ORDERED_POSTS = [POST1, POST2];

  afterEach(() => {
    getPostDirectoryMock.mockClear();
    getMarkdownFilenamesMock.mockClear();
    getFilenameWithExtensionMock.mockClear();
    getPostFromMarkdownFileMock.mockClear();
    sortPostsByDateMock.mockClear();
  });

  it("should return the posts corresponding to one or more slugs", () => {
    getPostDirectoryMock.mockReturnValue(POST_DIRECTORY_PATH);
    getMarkdownFilenamesMock.mockReturnValue(POST_FILENAMES);
    getFilenameWithExtensionMock.mockReturnValueOnce(POST_FILENAME1);
    getFilenameWithExtensionMock.mockReturnValueOnce(POST_FILENAME2);
    getPostFromMarkdownFileMock.mockReturnValueOnce(POST1);
    getPostFromMarkdownFileMock.mockReturnValueOnce(POST2);
    sortPostsByDateMock.mockReturnValue(ORDERED_POSTS);
    const posts = getPostsBySlugs(POST_SLUGS, POST_ORDER);
    expect(posts).toEqual(ORDERED_POSTS);
    expect(getPostDirectoryMock).toHaveBeenCalledTimes(1);
    expect(getMarkdownFilenamesMock).toHaveBeenCalledTimes(1);
    expect(getMarkdownFilenamesMock).toHaveBeenCalledWith(POST_DIRECTORY_PATH);
    expect(getFilenameWithExtensionMock).toHaveBeenCalledTimes(2);
    expect(getFilenameWithExtensionMock).toHaveBeenNthCalledWith(
      1,
      POST1.slug,
      POST_FILENAMES
    );
    expect(getFilenameWithExtensionMock).toHaveBeenNthCalledWith(
      2,
      POST2.slug,
      POST_FILENAMES
    );
    expect(getPostFromMarkdownFileMock).toHaveBeenCalledTimes(2);
    expect(getPostFromMarkdownFileMock).toHaveBeenNthCalledWith(
      1,
      POST_FILENAME1,
      POST_DIRECTORY_PATH
    );
    expect(getPostFromMarkdownFileMock).toHaveBeenNthCalledWith(
      2,
      POST_FILENAME2,
      POST_DIRECTORY_PATH
    );
    expect(sortPostsByDateMock).toHaveBeenCalledTimes(1);
    expect(sortPostsByDateMock).toHaveBeenCalledWith(
      [POST1, POST2],
      POST_ORDER
    );
  });
});

describe("PostController: getPostsByTags", () => {
  const POST_TAGS = ["tag1"];

  afterEach(() => {
    getPostDirectoryMock.mockClear();
    getMarkdownFilenamesMock.mockClear();
    getPostFromMarkdownFileMock.mockClear();
    filterPostsByTagsMock.mockClear();
    sortPostsByDateMock.mockClear();
  });

  it("should return the posts corresponding to one or more tags", () => {
    getPostDirectoryMock.mockReturnValue(POST_DIRECTORY_PATH);
    getMarkdownFilenamesMock.mockReturnValue(POST_FILENAMES);
    getPostFromMarkdownFileMock.mockReturnValueOnce(POST1);
    getPostFromMarkdownFileMock.mockReturnValueOnce(POST2);
    getPostFromMarkdownFileMock.mockReturnValueOnce(POST3);
    filterPostsByTagsMock.mockReturnValue([POST1, POST3]);
    sortPostsByDateMock.mockReturnValue([POST3, POST1]);
    const posts = getPostsByTags(POST_TAGS, POST_ORDER);
    expect(posts).toEqual([POST3, POST1]);
    expect(getPostDirectoryMock).toHaveBeenCalledTimes(1);
    expect(getMarkdownFilenamesMock).toHaveBeenCalledTimes(1);
    expect(getMarkdownFilenamesMock).toHaveBeenCalledWith(POST_DIRECTORY_PATH);
    expect(getPostFromMarkdownFileMock).toHaveBeenCalledTimes(3);
    expect(getPostFromMarkdownFileMock).toHaveBeenNthCalledWith(
      1,
      POST_FILENAME1,
      POST_DIRECTORY_PATH
    );
    expect(getPostFromMarkdownFileMock).toHaveBeenNthCalledWith(
      2,
      POST_FILENAME2,
      POST_DIRECTORY_PATH
    );
    expect(getPostFromMarkdownFileMock).toHaveBeenNthCalledWith(
      3,
      POST_FILENAME3,
      POST_DIRECTORY_PATH
    );
    expect(filterPostsByTagsMock).toHaveBeenCalledTimes(1);
    expect(filterPostsByTagsMock).toHaveBeenCalledWith(POSTS, POST_TAGS);
    expect(sortPostsByDateMock).toHaveBeenCalledTimes(1);
    expect(sortPostsByDateMock).toHaveBeenCalledWith(
      [POST1, POST3],
      POST_ORDER
    );
  });
});

describe("postController: getPostSlugs", () => {
  it("should return all the post slugs", () => {
    getPostDirectoryMock.mockReturnValue(POST_DIRECTORY_PATH);
    getMarkdownFilenamesMock.mockReturnValue(POST_FILENAMES);
    removeFilenameExtensionMock.mockReturnValueOnce(POST1.slug);
    removeFilenameExtensionMock.mockReturnValueOnce(POST2.slug);
    removeFilenameExtensionMock.mockReturnValueOnce(POST3.slug);
    const postSlugs = getPostSlugs();
    expect(postSlugs).toEqual([POST1.slug, POST2.slug, POST3.slug]);
    expect(getPostDirectoryMock).toHaveBeenCalledTimes(1);
    expect(getMarkdownFilenamesMock).toHaveBeenCalledTimes(1);
    expect(getMarkdownFilenamesMock).toHaveBeenCalledWith(POST_DIRECTORY_PATH);
    expect(removeFilenameExtensionMock).toHaveBeenCalledTimes(3);
    expect(removeFilenameExtensionMock).toHaveBeenNthCalledWith(
      1,
      POST_FILENAME1
    );
    expect(removeFilenameExtensionMock).toHaveBeenNthCalledWith(
      2,
      POST_FILENAME2
    );
    expect(removeFilenameExtensionMock).toHaveBeenNthCalledWith(
      3,
      POST_FILENAME3
    );
  });
});
