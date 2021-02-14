import Avatar from './avatar';
import Date from './date';
import CoverImage from '../components/cover-image';
import PostTitle from './PostTitle';
import Categories from './categories';

export default function PostHeader({
  title,

  date,

  categories,
}) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className='hidden md:block md:mb-12'></div>
      <div className='mb-8 md:mb-16 -mx-5 sm:mx-0'></div>
      <div className='max-w-2xl mx-auto'>
        <div className='block md:hidden mb-6'></div>
        <div className='mb-6 text-lg'>
          Posted <Date dateString={date} />
        </div>
      </div>
    </>
  );
}
