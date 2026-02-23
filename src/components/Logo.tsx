interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className, size = 32 }: LogoProps) {
  return (
    <svg
      width={size * 3.2}
      height={size}
      viewBox="0 0 160 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Mifro logo"
      role="img"
    >
      {/* Icona: quadrato arrotondato con "M" stilizzata */}
      <rect x="2" y="5" width="40" height="40" rx="8" fill="#162d4a" />
      <path
        d="M12 33V17l8 10 8-10v16"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Testo "MIFRO" */}
      <text
        x="52"
        y="35"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="28"
        letterSpacing="1"
        fill="#162d4a"
      >
        MIFRO
      </text>
    </svg>
  );
}
