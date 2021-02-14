import Container from './Container';
import { EXAMPLE_PATH } from '../lib/constants';
import Link from 'next/link';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

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
      <Container classes='container mx-auto px-5 py-12 bg-accent-1'>
        <div className='flex flex-col lg:flex-row'>
          <div className='w-full flex flex-col lg:flex-column justify-start items-start lg:w-1/2'>
            <Link href='/'>
              <a>{image}</a>
            </Link>
            <ContactInfo />
          </div>
          <span className='mama-border-bottom lg:mama-border-none'></span>
          <div className='w-full flex flex-col lg:flex-row justify-end items-center lg:pl-4 lg:w-1/2'>
            <ContactForm />
          </div>
        </div>
      </Container>
    </footer>
  );
}
