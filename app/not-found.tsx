import type { Metadata } from 'next';
import Image from 'next/image';
import Container from '../components/Container';
import { CMS_NAME } from '../lib/constants';

export const metadata: Metadata = { title: `${CMS_NAME} 🥯 Page Not Found` };

export default function NotFound() {
  return (
    <Container>
      <div className='flex flex-col justify-center items-center w-full h-screen absolute top-0 left-0'>
        <Image
          src='/static/images/mamalagels-notag.png'
          alt='Mamalagels'
          width={175}
          height={88}
          priority
        />
        <p className=' text-3xl mt-6 font-black font-serif'>
          🥯 Whoops ! Page not found ! 🥯
        </p>
      </div>
    </Container>
  );
}
