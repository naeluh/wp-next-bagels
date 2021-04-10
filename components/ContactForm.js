// Customize this 'myform.js' script and add it to your JS bundle.
// Then import it with 'import MyForm from "./myform.js"'.
// Finally, add a <MyForm/> element whereever you wish to display the form.

import React, { useState } from 'react';
import { formStyles } from './contactForm.module.css';
import Button from './Button';

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
      className={`w-full ${formStyles} lg:max-w-xs`}
    >
      <h4 className='text-xl font-bold tracking-tighter leading-tight md:pr-8 font-serif mb-4 border-bottom pb-4'>
        Questions ?
      </h4>
      <fieldset>
        <input
          aria-label='Email'
          placeholder={`Email`}
          type='email'
          name='email'
          required
        />
      </fieldset>
      <fieldset>
        <textarea
          aria-label='Message'
          name='message'
          placeholder={`Message`}
          required
        ></textarea>
      </fieldset>

      {status === 'SUCCESS' ? (
        <p>Thanks!</p>
      ) : (
        <Button
          type={'submit'}
          text={'Submit'}
          style={{ transition: 'all .15s ease' }}
          disabled={false}
          fullWidth
        />
      )}
      {status === 'ERROR' && <p>Ooops! There was an error.</p>}
    </form>
  );
};

export default ContactForm;
