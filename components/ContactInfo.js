import React from 'react';
import styles from './contactInfo.module.css';

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
        </ul>
      </div>
    </div>
  );
};

export default ContactInfo;
