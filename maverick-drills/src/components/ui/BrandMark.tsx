export default function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path d="M0,0 L84,0 L100,16 L100,100 L0,100 Z" fill="#e31e24" />
      <path
        d="M25,30 L50,45 L75,30"
        stroke="#ffffff"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M25,48 L50,63 L75,48"
        stroke="#ffffff"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M25,66 L50,81 L75,66"
        stroke="#ffffff"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
