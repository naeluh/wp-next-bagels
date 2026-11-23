'use client';
import React, { useEffect } from 'react';
import styles from './modal.module.css';
import Button from './Button';
import Link from 'next/link';

type Props = {
  button?: string;
  title?: string;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  children?: React.ReactNode;
  hideButton?: boolean;
  hideCloseButton?: boolean;
  z?: string;
};

const Modal = ({
  button,
  title,
  showModal,
  setShowModal,
  children,
  hideButton,
  hideCloseButton,
  z,
}: Props) => {
  useEffect(() => {
    document.body.classList.toggle('modal-open', !!showModal);
    return () => {
      document.body.classList.remove('modal-open');
    };
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
            role='alertdialog'
            aria-labelledby='dialog_label'
            aria-modal='true'
            className={`${styles.wrapperClass} fixed ${z ? z : `z-40`}`}
          >
            <div className={``}>
              <div
                className={`border-0 relative flex flex-col w-full h-screen bg-white outline-hidden focus:outline-hidden`}
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
                      className='p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-hidden focus:outline-hidden font-serif'
                      onClick={() => setShowModal(false)}
                    >
                      <span
                        className={[
                          'bg-transparent text-black h-6 w-6 text-2xl block outline-hidden focus:outline-hidden font-serif',
                          styles.closeButton,
                        ].join(' ')}
                      ></span>
                    </button>
                  )}
                </div>

                <div className={`${styles.maxheight} relative p-6 flex-auto `}>
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
