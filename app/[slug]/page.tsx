import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Container from '../../components/Container';
import PostBody from '../../components/PostBody';
import PostTitle from '../../components/PostTitle';
import { getAllPostsWithSlug, getPost } from '../../lib/api';
import { CMS_NAME } from '../../lib/constants';

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 10;

export async function generateStaticParams() {
  const posts = await getAllPostsWithSlug();
  return posts.map(({ node }) => ({ slug: node.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug);
  return {
    title: `${CMS_NAME} 🥯 ${post?.title}`,
    description: `${CMS_NAME} Mămălagels 🥯 ${post?.title} Page`,
  };
}

export default async function Page({ params }: Props) {
  const post = await getPost((await params).slug);
  if (!post?.slug) notFound();

  return (
    <Container>
      <div className='max-w-4xl mx-auto mt-20'>
        <PostTitle>{post.title}</PostTitle>
        <PostBody content={post.content} />
      </div>
    </Container>
  );
}
