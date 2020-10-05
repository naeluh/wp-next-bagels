import Head from 'next/head';
import Container from '../components/container';
import MoreStories from '../components/more-stories';
import HeroPost from '../components/hero-post';
import Header from '../components/header';
import Intro from '../components/intro';
import Layout from '../components/layout';
import { getAllPostsForHome, getHomePageData } from '../lib/api';
import { CMS_NAME } from '../lib/constants';

export default function Index({ allPosts: { edges }, preview }) {
  const heroPost = edges[0]?.node;
  const morePosts = edges.slice(1);

  return (
    <Layout preview={preview}>
      <Head>
        <title>Next.js Blog Example with {CMS_NAME}</title>
      </Head>
      <Container>
        {' '}
        <Header />
        <Intro />
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            date={heroPost.date}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const homeData = await getHomePageData();
  const allPosts = await getAllPostsForHome(preview);
  console.log(homeData);
  return {
    props: { allPosts, preview },
  };
}
