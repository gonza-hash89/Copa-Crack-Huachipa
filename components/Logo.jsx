export default function Logo({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label="Logo Copa Crack">
      <defs>
        <linearGradient id="cc-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f59e0b" />
          <stop offset="1" stopColor="#10b981" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="#07140d" stroke="url(#cc-g)" strokeWidth="4" />
      <polygon points="50,22 72,38 64,64 36,64 28,38" fill="none" stroke="#f59e0b" strokeWidth="3" />
      <path d="M50 22V10M72 38l12-5M64 64l8 10M36 64l-8 10M28 38l-12-5" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
      <text x="50" y="55" textAnchor="middle" fontFamily="Impact, sans-serif" fontSize="20" fill="#e7f5ee">CC</text>
    </svg>
  );
}
