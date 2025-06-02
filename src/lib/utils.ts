import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines Tailwind CSS classes and merges them for utility.
 * @param {ClassValue[]} inputs - Class values to combine.
 * @returns {string} The combined and merged CSS class string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
