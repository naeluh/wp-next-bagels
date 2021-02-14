// Customize this 'myform.js' script and add it to your JS bundle.
// Then import it with 'import MyForm from "./myform.js"'.
// Finally, add a <MyForm/> element whereever you wish to display the form.

import React, { useState } from 'react';
import styles from './contactForm.module.css';

const ContactForm = () => {
  const [status, setStatus] = useState('');

  const submitForm = ev => {
    ev.preventDefault();
    const form = ev.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        setStatus('SUCCESS');
      } else {
        setStatus('ERROR');
      }
    };
    xhr.send(data);
  };

  return (
    <form
      onSubmit={submitForm}
      action='https://formspree.io/f/xzbkgnpk'
      method='POST'
      className={`w-full ${styles.formStyles} lg:max-w-xs`}
    >
      <h4 className='text-xl font-bold tracking-tighter leading-tight md:pr-8 font-serif mb-4 border-bottom pb-4'>
        Questions ?
      </h4>
      <fieldset>
        <label>Email:</label>
        <input type='email' name='email' />
      </fieldset>
      <fieldset>
        <label>Message:</label>
        <textarea name='message'></textarea>
      </fieldset>

      {status === 'SUCCESS' ? (
        <p>Thanks!</p>
      ) : (
        <button type='submit'>Submit</button>
      )}
      {status === 'ERROR' && <p>Ooops! There was an error.</p>}
    </form>
  );
};

export default ContactForm;
