import Link from 'next/link';
import cn from 'classnames';

export default function Header() {
  const image = (
    <img
      src='https://mamalagels.com/wp-content/uploads/2019/04/mamalagels-notag.png?fit=400%2C200&ssl=1'
      alt='Mamalagels'
      width='175'
    />
  );
  return (
    <nav className='mx-auto px-5 py-5 flex items-center justify-between flex-wrap fixed top-0 z-10'>
      <div className='flex items-center flex-shrink-0 text-black mr-6'>
        <Link href='/'>
          <a>{image}</a>
        </Link>
      </div>

      <div className='mt-4 text-sm flex-grow md:text-right md:mt-0'>
        <Link href='/bagels'>
          <a className='pr-4 pl-4 pt-2 pb-2 md:inline-block md:mt-0 font-serif font-bold leading-tight text-lg text-black-500 border-white hover:text-black border-4 border-m-yellow'>
            Bagels
          </a>
        </Link>
      </div>

      <div className='mt-4 text-sm flex-grow md:text-right md:mt-0 mx-4'>
        <Link href='/special-request'>
          <a className='pr-4 pl-4 pt-2 pb-2 md:inline-block md:mt-0 font-serif font-bold leading-tight text-lg text-black-500 border-white hover:text-black border-4 border-m-yellow'>
            Special Request
          </a>
        </Link>
      </div>
    </nav>
  );
}
