interface LogomarkProps {
  size?: number;
  className?: string;
}

/**
 * Two-tone "N" logomark. This is a best-effort recreation of the brand mark
 * (white left stroke, orange right stroke) — swap for the real SVG/logo
 * asset when one is available rather than relying on this approximation.
 */
export function Logomark({ size = 30, className }: LogomarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M6 24V6h3.2l11.6 15.4V6"
        stroke="white"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.2 8.5 20.8 24" className="stroke-accent" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}
