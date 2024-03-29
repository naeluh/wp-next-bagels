import Avatar from './Avatar';
import Date from './Date';
import CoverImage from './CoverImage';
import Link from 'next/link';

export default function PostPreview({
  title,

  date,
  excerpt,

  slug,
}) {
  return (
    <div>
      <div className='mb-5'></div>
      <h3 className='text-3xl mb-3 leading-snug'>
        <Link
          as={`/posts/${slug}`}
          href='/posts/[slug]'
          className='hover:underline'
          dangerouslySetInnerHTML={{ __html: title }}>

        </Link>
      </h3>
      <div className='text-lg mb-4'>
        <Date dateString={date} />
      </div>
      <div
        className='text-lg leading-relaxed mb-4'
        dangerouslySetInnerHTML={{ __html: excerpt }}
      />
    </div>
  );
}
