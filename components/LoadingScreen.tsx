import Image from 'next/image';

/** Full-screen logo + message shown while order data loads (or fails). */
export default function LoadingScreen({ error }: { error?: boolean }) {
  return (
    <div className='fixed inset-0 z-50 bg-white flex flex-col justify-center items-center'>
      <Image
        src='/static/images/mamalagels-notag.png'
        alt='Mamalagels'
        width={175}
        height={88}
        priority
      />
      {error ? (
        <p className=' text-3xl font-serif mt-6 font-black text-m-red'>
          Error 🥯
        </p>
      ) : (
        <p className=' text-3xl mt-6 font-black font-serif'>Loading... 🥯</p>
      )}
    </div>
  );
}
