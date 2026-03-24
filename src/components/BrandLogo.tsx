import { useState } from "react";

type Props = {
  name: string;
  slug?: string;
  domain?: string;
  size?: number;
  title?: string;
  className?: string;
  priority?: 'simple' | 'clearbit';
};

function Initials({ name, size, className }: { name: string; size: number; className?: string }) {
  const initials = name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
  return (
    <div
      className={className}
      style={{ width: size, height: size, fontSize: size * 0.38, lineHeight: 1 }}
      aria-label={`${name} logo`}
      title={name}
    >
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1e293b', borderRadius: 8, color: '#fff', fontWeight: 700 }}>
        {initials}
      </div>
    </div>
  );
}

export default function BrandLogo({ name, slug, domain, size = 48, title, className, priority = 'clearbit' }: Props) {
  const clear = domain ? `https://logo.clearbit.com/${domain}` : undefined;
  const sources = [clear].filter(Boolean) as string[];
  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState(false);

  const src = sources[idx];

  if (!src || failed) return <Initials name={name} size={size} className={className} />;

  return (
    <img
      src={src}
      alt={`${name} logo`}
      title={title ?? name}
      loading="lazy"
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size, objectFit: "contain", filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))" }}
      onError={() => {
        if (idx < sources.length - 1) setIdx(idx + 1);
        else setFailed(true);
      }}
      crossOrigin="anonymous"
      referrerPolicy="no-referrer"
    />
  );
}
