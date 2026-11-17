import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import {
  getAllPostsWithSlug,
  getNavItems,
  getPostAndMorePosts,
} from '../../lib/api';
import { CMS_NAME } from '../../lib/constants';
import Container from '../../components/Container';
import Header from '../../components/Header';
import PostTitle from '../../components/PostTitle';
import PostBody from '../../components/PostBody';
import RemoveModalOpenClass from '../../components/RemoveModalOpenClass';

export const revalidate = 10;

export async function generateStaticParams() {
  const allPosts = await getAllPostsWithSlug();
  return (
    allPosts?.edges?.map(({ node }: { node: { slug: string } }) => ({
      slug: node.slug,
    })) ?? []
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPostAndMorePosts(slug, false, undefined);
  const title = data?.post?.title ?? slug;
  return {
    title: `${CMS_NAME} 🥯 ${title}`,
    description: `${CMS_NAME} Mămălagels 🥯 ${title} Page`,
  };
}

export default async function PostPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview_id?: string; preview_status?: string }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const draft = await draftMode();
  const preview = draft.isEnabled;

  let previewData:
    | { post: { id: number; slug: string; status: string } }
    | undefined;
  if (preview && sp.preview_id) {
    previewData = {
      post: {
        id: Number(sp.preview_id),
        slug,
        status: sp.preview_status ?? 'draft',
      },
    };
  }

  const data = await getPostAndMorePosts(slug, preview, previewData);

  if (!data?.post?.slug) {
    notFound();
  }

  const post = data.post;
  const { navItems } = await getNavItems(preview);

  return (
    <>
      <RemoveModalOpenClass />
      <Header navItems={navItems} />
      <Container>
        <div className='max-w-4xl mx-auto mt-20'>
          <PostTitle>{post.title}</PostTitle>
          <PostBody content={post.content} />
        </div>
      </Container>
    </>
  );
}
