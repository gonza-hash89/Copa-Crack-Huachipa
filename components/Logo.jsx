import Image from 'next/image';

export default function Logo({ size = 56, className = '', alt = "Escudo Oficial Copa Crack Perú" }) {
  return (
    <Image
      src="/logo.png"
      alt={alt}
      width={size}
      height={size}
      priority
      className={className}
      unoptimized={size > 200}
    />
  );
}