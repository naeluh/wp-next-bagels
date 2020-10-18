import Link from 'next/link';
import cn from 'classnames';

export default function Header() {
  const image = (
    <img
      src='https://mamalagels.com/wp-content/uploads/2019/04/mamalagels-notag.png?fit=400%2C200&ssl=1'
      alt='Mamalagels'
      width='225'
    />
  );
  return (
    <nav class='flex items-center justify-between flex-wrap pt-6 pb-6'>
      <div class='flex items-center flex-shrink-0 text-black mr-6'>
        <Link href='/'>
          <a>{image}</a>
        </Link>
      </div>

      {/* <div class='mt-4 text-sm flex-grow md:text-right md:mt-0'>
        <Link href='/about'>
          <a class='pr-4 pl-4 pt-2 pb-2 md:inline-block md:mt-0 font-serif font-bold leading-tight text-lg text-black-500 border-white hover:text-black border-4 hover:border-yellow-500'>
            About
          </a>
        </Link>
      </div> */}
    </nav>
  );
}
