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

function Initials({ name, size, className }: { name: string; size: number; className?: string }) {
  const initials = name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
  return (
    <div className={className} style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0ede8', borderRadius: 8, color: '#555', fontWeight: 700, fontSize: size * 0.38 }}>
      {initials}
    </div>
  );
}

export default function BrandLogo({ name, id, domain, size = 48, title, className }: Props) {
  const sources = [
    id && `/logos/${id}.png`,
    id && `/logos/${id}.jpeg`,
    id && `/logos/${id}.svg`,
    domain && `https://logo.clearbit.com/${domain}`,
  ].filter(Boolean) as string[];

  const [idx, setIdx] = useState(0);
  const [allFailed, setAllFailed] = useState(false);

  if (allFailed || sources.length === 0) return <Initials name={name} size={size} className={className} />;

  const src = sources[idx];

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
        else setAllFailed(true);
      }}
    />
  );
}
