import React, { useEffect, FC } from 'react';
import { maxheight, wrapperClass, closeButton } from './modal.module.css';
import Button from './Button';
import Link from 'next/link';

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
  useEffect(() => {
    if (showModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [showModal]);

  return <>
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
        <div className={`${wrapperClass} fixed ${z ? z : `z-40`}`}>
          <div className={``}>
            <div
              className={`border-0 relative flex flex-col w-full h-screen bg-white outline-none focus:outline-none`}
            >
              <div className='flex items-baseline justify-between p-6 border-b border-solid border-gray-300'>
                <h3 className='text-3xl font-bold font-serif capitalize'>
                  {' '}
                  {title ? title : `Title`}
                </h3>
                {hideCloseButton && (
                  <Link href='/' className='text-3xl font-bold font-serif'>
                    Back
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
  </>;
};

export default Modal;
