import React from 'react';
import styles from './modal.module.css';
import Button from './Button';

export default function Modal({
  button,
  title,
  showModal,
  setShowModal,
  children,
}) {
  return (
    <>
      <Button
        type={'button'}
        style={{ transition: 'all .15s ease' }}
        text={button ? button : `Open`}
        disabled={false}
        onClick={() => setShowModal(true)}
        fullWidth={false}
      />
      {showModal ? (
        <>
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none'>
            <div
              className={`${styles.fullscreen} relative w-auto my-6 mx-auto max-w-5xl`}
            >
              <div className='border-0  shadow-lg relative flex flex-col w-full h-screen bg-white outline-none focus:outline-none'>
                <div className='flex items-start justify-between p-6 border-b border-solid border-gray-300 rounded-t'>
                  <h3 className='text-3xl font-semibold font-serif'>
                    {' '}
                    {title ? title : `Title`}
                  </h3>
                  <button
                    className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                    onClick={() => setShowModal(false)}
                  >
                    <span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                      ×
                    </span>
                  </button>
                </div>

                <div className={`${styles.maxheight} relative p-6 flex-auto `}>
                  <div className='my-4 text-gray-600 text-lg leading-relaxed'>
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      ) : null}
    </>
  );
}
