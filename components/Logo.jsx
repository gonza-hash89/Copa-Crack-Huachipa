export default function Logo({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label="Logo Copa Crack Perú">
      <defs>
        <linearGradient id="ccp-neon" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFEB00" />
          <stop offset="30%" stopColor="#FFD700" />
          <stop offset="60%" stopColor="#FFEB00" />
          <stop offset="100%" stopColor="#FFB300" />
        </linearGradient>
        <linearGradient id="ccp-phosphor" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF073A" />
          <stop offset="100%" stopColor="#FF2D4A" />
        </linearGradient>
        <filter id="logo-neon-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx="50" cy="50" r="46" fill="#050202" stroke="url(#ccp-neon)" strokeWidth="4" filter="url(#logo-neon-glow)" />

      <path
        d="M50 15 L78 30 V70 C78 82 62 88 40 88 C18 88 2 82 2 70 V30 Z"
        fill="none"
        stroke="url(#ccp-neon)"
        strokeWidth="2.5"
        opacity="0.7"
        filter="url(#logo-neon-glow)"
      />

      <path
        d="M50 15 L78 30 V48"
        fill="url(#ccp-phosphor)"
        opacity="0.4"
      />

      <ellipse cx="50" cy="48" rx="24" ry="14" fill="none" stroke="url(#ccp-neon)" strokeWidth="1.5" opacity="0.6" />

      <text x="50" y="52" textAnchor="middle" fontFamily="Bebas Neue, Impact, sans-serif" fontSize="22" fill="url(#ccp-neon)" fontWeight="bold" letterSpacing="1.5" filter="url(#logo-neon-glow)">CCP</text>

      <text x="50" y="70" textAnchor="middle" fontFamily="Bebas Neue, Impact, sans-serif" fontSize="9" fill="#FFEB00" letterSpacing="2" filter="drop-shadow(0 0 3px #FFEB00)">FÚTBOL FORMATIVO</text>

      <text x="50" y="82" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7" fill="#FFD700" letterSpacing="1">HUACHIPA · LIMA</text>

      <path d="M50 54 L50 60" stroke="url(#ccp-neon)" strokeWidth="1" opacity="0.6" strokeLinecap="round" />
      <path d="M38 57 L62 57" stroke="url(#ccp-neon)" strokeWidth="1" opacity="0.6" strokeLinecap="round" />
    </svg>
  );
}