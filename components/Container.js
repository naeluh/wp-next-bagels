export default function Container({
  children,
  classes = 'container mx-auto px-5',
}) {
  return <div className={`${classes}`}>{children}</div>;
}
