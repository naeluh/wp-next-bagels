import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { CMS_NAME } from '../lib/constants';
import Container from '../components/Container';
import Header from '../components/Header';
import Layout from '../components/Layout';
import { getAllPostsWithSlug, getPostAndMorePosts } from '../lib/api';
import PostTitle from '../components/PostTitle';
import PostBody from '../components/PostBody';

export default function Page({ post, preview }) {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout
      preview={false}
      title={`${CMS_NAME} 🥯 ${post?.title}`}
      desc={`${CMS_NAME} Mămălagels 🥯 ${post?.title} Page`}
    >
      <Header />
      <Container>
        <div className='max-w-4xl mx-auto mt-20'>
          <PostTitle>{post?.title}</PostTitle>
          <PostBody content={post?.content} />
        </div>
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const data = await getPostAndMorePosts(params.slug, preview, previewData);

  return {
    props: {
      preview,
      post: data.post,
      posts: data.posts,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();

  return {
    paths: allPosts.edges.map(({ node }) => `/${node.slug}`) || [],
    fallback: true,
  };
}
