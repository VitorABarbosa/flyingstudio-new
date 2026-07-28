// src/lib/utils.ts
// cn() combines clsx (conditional classes) + tailwind-merge (conflict resolution).
// Use in every component that accepts external className props or uses conditional classes.
// Example: cn('px-4 py-2', isActive && 'bg-blue-500', className)
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
