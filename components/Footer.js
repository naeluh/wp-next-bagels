import Container from './Container';
import Image from 'next/image';
import Link from 'next/link';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import FooterLinks from './FooterLinks';

export default function Footer() {
  const image = (
    <Image
      src='/static/images/mamalagels-notag.png'
      alt='Mamalagels'
      fixed='true'
      width={175}
      height={88}
      priority
    />
  );
  return (
    <footer className='bg-accent-1 border-t border-accent-2'>
      <Container classes='container mx-auto px-5 py-12 bg-accent-1'>
        <div className='flex flex-col lg:flex-row'>
          <div className='w-full flex flex-col lg:flex-column justify-start items-start lg:w-1/2 lg:mr-4'>
            <Link href='/'>{image}</Link>
            <ContactInfo />
          </div>
          <div className='w-full lg:w-1/2 lg:mx-4'>
            <FooterLinks />
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
