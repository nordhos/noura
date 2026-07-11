'use client';

import { useState } from 'react';

/**
 * Tracks whether a masked currency value is currently revealed.
 * Kept as local component state (not global) since the screenshot shows
 * each card's eye icon toggling independently.
 */
export function useReveal(initial = false) {
  const [visible, setVisible] = useState(initial);
  const toggle = () => setVisible((v) => !v);
  return { visible, toggle };
}
