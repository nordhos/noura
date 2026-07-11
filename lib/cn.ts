import { clsx, type ClassValue } from 'clsx';

/** Thin wrapper around clsx so components import one thing for conditional classes. */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
