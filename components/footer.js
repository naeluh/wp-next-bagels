import Container from './container';
import { EXAMPLE_PATH } from '../lib/constants';
import Link from 'next/link';

export default function Footer() {
  const image = (
    <img
      src='https://mamalagels.com/wp-content/uploads/2019/04/mamalagels-notag.png?fit=400%2C200&ssl=1'
      alt='Mamalagels'
      width='175'
    />
  );
  return (
    <footer className='bg-accent-1 border-t border-accent-2'>
      <Container>
        <div className='py-28 flex flex-col lg:flex-row items-center'>
          <h3 className='text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2'>
            <Link href='/'>
              <a>{image}</a>
            </Link>
          </h3>
          <div className='flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2'>
            {/* <a
              href='https://nextjs.org/docs/basic-features/pages'
              className='mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0'
            ></a>
            <a
              href={`https://github.com/zeit/next.js/tree/canary/examples/${EXAMPLE_PATH}`}
              className='mx-3 font-bold hover:underline'
            ></a> */}
          </div>
        </div>
      </Container>
    </footer>
  );
}
