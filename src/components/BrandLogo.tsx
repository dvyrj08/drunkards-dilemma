import { useState } from "react";

type Props = {
  name: string;
  id?: string;
  domain?: string;
  bg?: string;
  size?: number;
  title?: string;
  className?: string;
  priority?: string;
};

const DEFAULT_BG = 'hsl(215, 18%, 22%)';

export default function BrandLogo({ name, id, domain, bg, size = 48, title, className }: Props) {
  const sources = [
    id && `/logos/${id}.png`,
    id && `/logos/${id}.jpeg`,
    id && `/logos/${id}.svg`,
    domain && `https://logo.clearbit.com/${domain}`,
  ].filter(Boolean) as string[];

  const [idx, setIdx] = useState(0);
  const [allFailed, setAllFailed] = useState(false);

  const bgColor = bg || DEFAULT_BG;

  if (allFailed || sources.length === 0) {
    const initials = name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
    return (
      <div className={className} style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', background: bgColor, borderRadius: 8, color: '#fff', fontWeight: 700, fontSize: size * 0.38 }}>
        {initials}
      </div>
    );
  }

  return (
    <div className={className} style={{ width: size, height: size, background: bgColor, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <img
        src={sources[idx]}
        alt={`${name} logo`}
        title={title ?? name}
        loading="lazy"
        style={{ width: '85%', height: '85%', objectFit: 'contain' }}
        onError={() => {
          if (idx < sources.length - 1) setIdx(idx + 1);
          else setAllFailed(true);
        }}
      />
    </div>
  );
}
