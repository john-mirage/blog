import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { getPost, getPostSlugs } from "@api/controllers/postController";
import { getHtmlFromMarkdown } from "@utils/newMarkdownFormatter";
import { getLocaleDate } from "@utils/dateFormatter";
import { Post } from "@api/interfaces/post";
import Head from "next/head";

interface PostDTO {
  html: string;
  title: string;
  date: string;
}

interface Props {
  post: PostDTO;
}

function PostPage({ post }: Props) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <div dangerouslySetInnerHTML={{ __html: post.html || "" }} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const postSlug = String(params?.slug);
  const post: Post = getPost(postSlug);
  const postDate: string = getLocaleDate("fr-FR", post.date);
  const postHtml: string = getHtmlFromMarkdown(post.markdown);
  const postDTO: PostDTO = {
    title: post.title,
    date: postDate,
    html: postHtml,
  };
  return {
    props: {
      post: postDTO,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postSlugs: string[] = getPostSlugs();
  return {
    paths: postSlugs.map((postSlug: string) => {
      return {
        params: {
          slug: postSlug,
        },
      };
    }),
    fallback: false,
  };
};

export default PostPage;
