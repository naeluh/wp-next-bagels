export default function PostTitle({ children }) {
  return (
    <h1
      className='border-b-8 border-m-black text-4xl md:text-5xl lg:text-6xl font-bold font-serif tracking-tighter leading-tight md:leading-none mb-12 pb-4 text-center'
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
}
