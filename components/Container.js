export default function Container({
  children,
  classes = 'container mx-auto px-5 mb-24 lg:mb-20',
}) {
  return <article className={`${classes}`}>{children}</article>;
}
