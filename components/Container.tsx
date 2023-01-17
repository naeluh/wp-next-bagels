import React from 'react';

export default function Container({
  children,
  classes = 'container mx-auto px-5 mb-24 lg:mb-20',
}: {
  children?: React.ReactNode;
  classes?: string;
}) {
  return <article className={`${classes}`}>{children}</article>;
}
