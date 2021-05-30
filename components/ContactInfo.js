import React from 'react';
import styles from './contactInfo.module.css';
import { SocialIcon } from 'react-social-icons';

const ContactInfo = () => {
  return (
    <div className={styles.contactInfoContainer}>
      <h4 className='text-xl font-bold tracking-tighter leading-tight md:pr-8 font-serif my-4 pb-4 border-m-black'>
        Contact Information
      </h4>
      <div>
        <ul>
          <li>Youngstown, Ohio</li>
          <li>
            Email:
            <a href='mailto:sales@mamalagels.com'> sales@mamalagels.com</a>
          </li>
          <li>
            <div className='mt-3'>
              <a
                href='https://www.facebook.com/mamalagelsbagels/'
                target='_blank'
                rel='noreferrer'
                className='inline-block mr-3'
                aria-label='facebook'
              >
                <SocialIcon
                  url='https://www.facebook.com/mamalagelsbagels/'
                  bgColor='#333333'
                />
              </a>
              <a
                href='https://www.instagram.com/mamalagelsbagels/'
                target='_blank'
                rel='noreferrer'
                className='inline-block mr-3'
                aria-label='instagram'
              >
                <SocialIcon
                  url='https://www.instagram.com/mamalagelsbagels/'
                  bgColor='#333333'
                />
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactInfo;
