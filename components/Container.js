export default function Container({
  children,
  classes = 'container mx-auto px-5 mt-32',
}) {
  return <div className={`${classes}`}>{children}</div>;
}
