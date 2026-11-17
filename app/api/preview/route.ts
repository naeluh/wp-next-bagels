import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';
import { getPreviewPost } from '../../../lib/api';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get('secret');
  const id = searchParams.get('id');
  const slug = searchParams.get('slug');

  if (
    !process.env.WORDPRESS_PREVIEW_SECRET ||
    secret !== process.env.WORDPRESS_PREVIEW_SECRET ||
    (!id && !slug)
  ) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  const post = await getPreviewPost(id || slug!, id ? 'DATABASE_ID' : 'SLUG');

  if (!post) {
    return NextResponse.json({ message: 'Post not found' }, { status: 401 });
  }

  const draft = await draftMode();
  await draft.enable();

  const pathSlug = post.slug || String(post.databaseId);
  const dest = new URL(`/${pathSlug}`, req.url);
  dest.searchParams.set('preview_id', String(post.databaseId));
  dest.searchParams.set('preview_status', post.status ?? 'draft');

  return NextResponse.redirect(dest);
}
