export default function Logo({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label="Logo Copa Crack Perú">
      <defs>
        <linearGradient id="ccp-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffd700" />
          <stop offset="50%" stopColor="#e8c547" />
          <stop offset="100%" stopColor="#ff8c00" />
        </linearGradient>
        <linearGradient id="ccp-red" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c0392b" />
          <stop offset="100%" stopColor="#e74c3c" />
        </linearGradient>
      </defs>

      <circle cx="50" cy="50" r="46" fill="#080404" stroke="url(#ccp-g)" strokeWidth="4" />

      <path
        d="M50 15 L78 30 V70 C78 82 62 88 40 88 C18 88 2 82 2 70 V30 Z"
        fill="none"
        stroke="url(#ccp-g)"
        strokeWidth="2.5"
        opacity="0.6"
      />

      <path
        d="M50 15 L78 30 V48"
        fill="url(#ccp-red)"
        opacity="0.3"
      />

      <ellipse cx="50" cy="48" rx="24" ry="14" fill="none" stroke="url(#ccp-g)" strokeWidth="1.5" opacity="0.5" />

      <text x="50" y="52" textAnchor="middle" fontFamily="Bebas Neue, Impact, sans-serif" fontSize="22" fill="url(#ccp-g)" fontWeight="bold" letterSpacing="1.5">CCP</text>

      <text x="50" y="70" textAnchor="middle" fontFamily="Bebas Neue, Impact, sans-serif" fontSize="9" fill="#e8c547" letterSpacing="2">FÚTBOL FORMATIVO</text>

      <text x="50" y="82" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7" fill="#b89530" letterSpacing="1">HUACHIPA · LIMA</text>

      <path d="M50 54 L50 60" stroke="url(#ccp-g)" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
      <path d="M38 57 L62 57" stroke="url(#ccp-g)" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
    </svg>
  );
}