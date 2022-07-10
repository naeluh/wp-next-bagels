export default function Container({
  children,
  classes = 'container mx-auto px-5 mb-24 lg:mb-20',
}) {
  return <div className={`${classes}`}>{children}</div>;
}
