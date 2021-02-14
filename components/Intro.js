import { BAGEL_BUYERS_GUIDE_INTRO } from '../lib/constants';

export default function Intro({}) {
  return (
    <section className='flex-col md:flex-column flex md:justify-between mb-16 md:mb-12'>
      <h3 className='text-4xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8 font-serif mb-4 text-black'>
        {BAGEL_BUYERS_GUIDE_INTRO}
      </h3>
      <ol className='list-decimal text-2xl md:text-2xl font-hairline tracking-tighter leading-tight md:pr-8 font-serif mb-4 text-black px-5'>
        <li>Select a date that work to pickup your bagels.</li>
        <li>
          Select the amount of dozens or half dozens you would like to purchase.
        </li>
        <li>
          Select the bagels you would like in the dozens or half dozens (mix and
          match!).
        </li>
        <li>
          Verify that you have the bagels that you would like to purchase.
        </li>
        <li>Use our secure checkout and get ready to enjoy your bagels!</li>
      </ol>
    </section>
  );
}
