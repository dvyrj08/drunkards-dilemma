import BrandLogo from "./BrandLogo";
import { BRANDS } from "../lib/logos";

export default function BrandGridRemote() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
      gap: "16px",
      alignItems: "center",
    }}>
      {BRANDS.map((b) => (
        <div key={b.name} style={{
          display: "grid",
          gap: "8px",
          placeItems: "center",
          padding: "10px",
          borderRadius: "12px",
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(6px)",
        }}>
          <BrandLogo name={b.name} slug={b.slug} domain={b.domain} size={56} />
          <div style={{ fontSize: "0.9rem", opacity: 0.8, textAlign: "center" }}>{b.name}</div>
        </div>
      ))}
    </div>
  );
}
