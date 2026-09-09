export function BrandMark({ className = "" }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <path
        d="M20 4C11 12 6 19 6 26a14 14 0 0 0 28 0c0-7-5-14-14-22Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M20 34c0-8 0-14 0-22M20 18c-3-2-5-3-9-4M20 24c3-2 5-3 9-4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
