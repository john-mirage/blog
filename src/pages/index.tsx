import Head from "next/head";
import { GetStaticProps } from "next";
import { getAllPosts } from "@api/controllers/postController";
import { getLocaleDate } from "@utils/dateFormatter";
import { Post } from "@api/interfaces/post";
import Link from "next/link";

interface PostDTO {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

interface Props {
  posts: PostDTO[];
}

function IndexPage({ posts }: Props) {
  return (
    <>
      <Head>
        <title>Les articles</title>
      </Head>
      <ul>
        {posts.map((post) => (
          <li key={post.title}>
            <Link href={`/posts/${post.slug}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts: Post[] = getAllPosts();
  const postDTOs: PostDTO[] = posts.map((post: Post) => {
    const postDate: string = getLocaleDate("fr-Fr", post.date);
    const postDTO: PostDTO = {
      slug: post.slug,
      title: post.title,
      date: postDate,
      excerpt: post.excerpt,
      tags: post.tags,
    };
    return postDTO;
  });
  return {
    props: {
      posts: postDTOs,
    },
  };
};

export default IndexPage;
