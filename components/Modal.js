import React, { useEffect } from 'react';
import { fullscreen, maxheight, wrapperClass } from './modal.module.css';
import Button from './Button';

const Modal = ({
  button,
  title,
  showModal,
  setShowModal,
  children,
  hideButton,
}) => {
  useEffect(() => {
    if (showModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [showModal]);
  // justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none
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
          <div className={`${wrapperClass} fixed z-50`}>
            <div className={``}>
              <div
                className={`border-0 relative flex flex-col w-full h-screen bg-white outline-none focus:outline-none`}
              >
                <div
                  className='flex justify-between p-6 border-b border-solid border-gray-300'
                  style={{ minHeight: '85px' }}
                >
                  <h3 className='text-3xl font-semibold font-serif'>
                    {' '}
                    {title ? title : `Title`}
                  </h3>
                  <button
                    className='p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none font-serif'
                    onClick={() => setShowModal(false)}
                  >
                    <span className='bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none font-serif'>
                      x
                    </span>
                  </button>
                </div>

                <div className={`${maxheight} relative p-6 flex-auto `}>
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
};

export default Modal;
