'use client';

type BrandMarkProps = {
  className?: string;
};

export default function BrandMark({ className }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="10" width="28" height="28" rx="4" fill="var(--theme-accent)" />
      <path d="M8 34L28 14" stroke="white" strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="36" cy="8" r="6" fill="var(--theme-panel-soft)" />
    </svg>
  );
}
