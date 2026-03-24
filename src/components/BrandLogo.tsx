import { useState } from "react";

type Props = {
  name: string;
  id?: string;
  domain?: string;
  size?: number;
  title?: string;
  className?: string;
  priority?: string;
};

export default function BrandLogo({ name, id, domain, size = 48, title, className }: Props) {
  const sources = [
    id && `/logos/${id}.png`,
    id && `/logos/${id}.jpeg`,
    id && `/logos/${id}.svg`,
    domain && `https://logo.clearbit.com/${domain}`,
  ].filter(Boolean) as string[];

  const [idx, setIdx] = useState(0);

  const src = sources[idx];

  if (!src) return (
    <div className={className} style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1e293b', borderRadius: 8, color: '#fff', fontWeight: 700, fontSize: size * 0.38 }}>
      {name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()}
    </div>
  );

  return (
    <img
      src={src}
      alt={`${name} logo`}
      title={title ?? name}
      loading="lazy"
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size, objectFit: "contain" }}
      onError={() => {
        if (idx < sources.length - 1) setIdx(idx + 1);
      }}
    />
  );
}
