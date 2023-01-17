import React, { useEffect, useRef } from 'react';
import { maxheight, wrapperClass, closeButton } from './modal.module.css';
import Button from './Button';
import Link from 'next/link';

import { createFocusTrap } from 'focus-trap';

const Modal = ({
  button,
  title,
  showModal,
  setShowModal,
  children,
  hideButton,
  hideCloseButton,
  z,
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const focusTrap = createFocusTrap(modalRef.current, {
      onActivate: () => modalRef.current.classList.add('is-active'),
      onDeactivate: () => modalRef.current.classList.remove('is-active'),
    });

    if (showModal) {
      focusTrap.activate;
      document.body.classList.add('modal-open');
    } else {
      focusTrap.deactivate;
      document.body.classList.remove('modal-open');
    }
  }, [showModal]);

  return (
    <>
      {!hideButton && (
        <Button
          type={'button'}
          style={{ transition: 'all .15s ease' }}
          text={button ? button : `Open`}
          disabled={false}
          onClick={() => setShowModal(true)}
          fullWidth={false}
        />
      )}
      {showModal ? (
        <>
          <div
            ref={modalRef}
            role='alertdialog'
            aria-labelledby='dialog_label'
            aria-modal='true'
            className={`${wrapperClass} fixed ${z ? z : `z-40`}`}
          >
            <div className={``}>
              <div
                className={`border-0 relative flex flex-col w-full h-screen bg-white outline-none focus:outline-none`}
              >
                <div className='flex items-baseline justify-between p-6 border-b border-solid border-gray-300'>
                  <h3
                    id='dialog_label'
                    className='text-3xl font-bold font-serif capitalize'
                  >
                    {' '}
                    {title ? title : `Title`}
                  </h3>
                  {hideCloseButton && (
                    <Link href='/' className='text-3xl font-bold font-serif'>
                      <Button
                        type={'button'}
                        style={{ transition: 'all .15s ease' }}
                        text={`Close`}
                        disabled={false}
                        fullWidth={false}
                      />
                    </Link>
                  )}
                  {!hideCloseButton && (
                    <button
                      className='p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none font-serif'
                      onClick={() => setShowModal(false)}
                    >
                      <span
                        className={[
                          'bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none font-serif',
                          closeButton,
                        ].join(' ')}
                      ></span>
                    </button>
                  )}
                </div>

                <div className={`${maxheight} relative p-6 flex-auto `}>
                  <div className='my-4 text-gray-600 text-lg leading-relaxed'>
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
