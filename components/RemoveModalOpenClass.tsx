'use client';

import { useEffect } from 'react';

/** Removes `modal-open` from body (legacy modal stacking). */
export default function RemoveModalOpenClass() {
  useEffect(() => {
    document.body.classList.remove('modal-open');
  }, []);
  return null;
}
