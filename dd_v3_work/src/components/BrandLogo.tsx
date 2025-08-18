import { useState } from "react";
import { buildLogoUrls } from "../lib/logos";

type Props = {
  name: string;
  slug?: string;
  domain?: string;
  size?: number;
  title?: string;
  className?: string;
  priority?: 'simple' | 'clearbit';
};

export default function BrandLogo({ name, slug, domain, size = 48, title, className, priority = 'clearbit' }: Props) {
  // Build sources in the requested priority order
  const simple = slug ? `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug.toLowerCase()}.svg` : undefined;
  const clear = domain ? `https://logo.clearbit.com/${domain}` : undefined;
  const sources = (priority === 'simple')
    ? [simple, clear].filter(Boolean) as string[]
    : [clear, simple].filter(Boolean) as string[];
  const [idx, setIdx] = useState(0);

  const src = sources[idx];

  if (!src) return <div style={{ width: size, height: size }} aria-label={`${name} logo`} />;

  return (
    <img
      src={src}
      alt={`${name} logo`}
      title={title ?? name}
      loading="lazy"
      width={size}
      height={size}
      className={className}
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))",
      }}
      onError={() => {
        if (idx < sources.length - 1) setIdx(idx + 1);
      }}
      crossOrigin="anonymous"
      referrerPolicy="no-referrer"
    />
  );
}
