type CasesArrowProps = {
  direction?: 'right' | 'down';
  className?: string;
};

export default function CasesArrow({ direction = 'right', className = '' }: CasesArrowProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`${direction === 'down' ? 'rotate-90' : ''} ${className}`}
    >
      <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
