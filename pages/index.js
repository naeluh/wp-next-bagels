import Head from 'next/head';
import Container from '../components/container';
import MoreStories from '../components/more-stories';
import HeroPost from '../components/hero-post';
import Header from '../components/header';
import Intro from '../components/intro';
import Layout from '../components/layout';
import FeaturedBagel from '../components/featuredBagel';
import BagelDefinition from '../components/bagelDefinition';
import { getAllPostsForHome, getHomePageData } from '../lib/api';
import { CMS_NAME } from '../lib/constants';

export default function Index({ allPosts: { edges }, preview, homeData }) {
  console.log(homeData);
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
        <FeaturedBagel
          title={homeData.featuredBagel.bagelTitle}
          subtitle={homeData.featuredBagel.bagelSubtitle}
          desc={homeData.featuredBagel.bagelDescription}
        />
        <BagelDefinition
          title={homeData.bagelDefinition.bagelTitle}
          quote={homeData.bagelDefinition.bagelQuote}
          desc={homeData.bagelDefinition.bagelDescription}
        />
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
  // console.log(homeData);
  return {
    props: { allPosts, preview, homeData },
  };
}
