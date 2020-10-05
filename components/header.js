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
      <div class='w-full block flex-grow lg:flex lg:items-center lg:w-auto'>
        <div class='text-sm lg:flex-grow'>
          <a
            href='#responsive-header'
            class='block mt-4 lg:inline-block lg:mt-0 text-yellow-500 hover:text-black mr-4'
          >
            Docs
          </a>
          <a
            href='#responsive-header'
            class='block mt-4 lg:inline-block lg:mt-0 text-yellow-500 hover:text-black mr-4'
          >
            Examples
          </a>
          <a
            href='#responsive-header'
            class='block mt-4 lg:inline-block lg:mt-0 text-yellow-500 hover:text-black'
          >
            Blog
          </a>
        </div>
        <div>
          <a
            href='#'
            class='inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:text-yellow-500 hover:bg-black mt-4 lg:mt-0'
          >
            Download
          </a>
        </div>
      </div>
    </nav>
  );
}
