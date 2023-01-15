import Avatar from './Avatar';
import Date from './Date';
import CoverImage from '../components/CoverImage';
import Link from 'next/link';

export default function HeroPost({ title, date, excerpt, slug }) {
  return (
    <section>
      <div className='mb-8 md:mb-16'></div>
      <div className='md:grid md:grid-cols-2 md:col-gap-16 lg:col-gap-8 mb-20 md:mb-28'>
        <div>
          <h3 className='mb-4 text-4xl lg:text-6xl leading-tight'>
            <Link
              as={`/posts/${slug}`}
              href='/posts/[slug]'
              className='hover:underline'
              dangerouslySetInnerHTML={{ __html: title }}>

            </Link>
          </h3>
          <div className='mb-4 md:mb-0 text-lg'>
            <Date dateString={date} />
          </div>
        </div>
        <div>
          <div
            className='text-lg leading-relaxed mb-4'
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
        </div>
      </div>
    </section>
  );
}
