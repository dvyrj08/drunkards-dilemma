/* Rick in dynamic flying pose — diagonal, holding portal gun */
function RickFlyingSVG() {
  return (
    <svg viewBox="0 0 170 250" fill="none" style={{ filter: 'drop-shadow(0 0 16px rgba(57,255,20,0.6))' }}>
      {/* ── Spiky white hair ── */}
      <polygon points="48,72 32,28 56,60" fill="#D8D8D8" stroke="#AAA" strokeWidth="1.5"/>
      <polygon points="60,66 50,16 70,56" fill="#E0E0E0" stroke="#BBB" strokeWidth="1.5"/>
      <polygon points="72,63 66,8 82,54" fill="#D4D4D4" stroke="#AAA" strokeWidth="1.5"/>
      <polygon points="84,66 82,14 94,56" fill="#DCDCDC" stroke="#BBB" strokeWidth="1.5"/>
      <polygon points="96,72 98,30 106,62" fill="#D8D8D8" stroke="#AAA" strokeWidth="1.5"/>

      {/* ── Head ── */}
      <ellipse cx="75" cy="95" rx="40" ry="42" fill="#F5C87E" stroke="#2A2A2A" strokeWidth="2.5"/>

      {/* ── Eyebrows ── */}
      <path d="M43 78 Q57 70 70 76" stroke="#999" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
      <path d="M80 76 Q93 70 107 78" stroke="#999" strokeWidth="3.5" strokeLinecap="round" fill="none"/>

      {/* ── Left eye ── */}
      <ellipse cx="57" cy="92" rx="13" ry="14" fill="white" stroke="#2A2A2A" strokeWidth="2"/>
      <circle cx="58" cy="93" r="9" fill="#2A5C2A"/>
      <circle cx="59" cy="91" r="5" fill="#111"/>
      <circle cx="61" cy="89" r="2" fill="white"/>

      {/* ── Right eye ── */}
      <ellipse cx="93" cy="92" rx="13" ry="14" fill="white" stroke="#2A2A2A" strokeWidth="2"/>
      <circle cx="94" cy="93" r="9" fill="#2A5C2A"/>
      <circle cx="95" cy="91" r="5" fill="#111"/>
      <circle cx="97" cy="89" r="2" fill="white"/>

      {/* ── Nose ── */}
      <path d="M66 104 Q75 116 84 104" stroke="#C08855" strokeWidth="2.5" fill="none" strokeLinecap="round"/>

      {/* ── Open shouting mouth ── */}
      <path d="M52 122 Q75 142 98 122" fill="#CC5533" stroke="#2A2A2A" strokeWidth="2"/>
      <path d="M52 122 Q75 132 98 122" fill="#882211"/>
      <rect x="61" y="120" width="12" height="9" fill="white" rx="2"/>
      <rect x="75" y="120" width="12" height="9" fill="white" rx="2"/>

      {/* ── Drool ── */}
      <path d="M64 128 Q62 144 63 162 Q64 172 61 180" stroke="#AADDFF" strokeWidth="5" fill="none" strokeLinecap="round"/>
      <ellipse cx="60" cy="184" rx="8" ry="9" fill="#AADDFF"/>

      {/* ── Neck ── */}
      <rect x="60" y="134" width="30" height="18" fill="#F5C87E"/>

      {/* ── Right arm — extended back/down ── */}
      <line x1="22" y1="170" x2="5" y2="148" stroke="#F5C87E" strokeWidth="15" strokeLinecap="round"/>

      {/* ── Lab coat body ── */}
      <path d="M8 152 L142 152 L139 250 L11 250 Z" fill="#F2F2F2" stroke="#CCC" strokeWidth="2"/>
      {/* ── Blue shirt ── */}
      <path d="M44 152 L106 152 L104 200 L46 200 Z" fill="#5588CC"/>
      {/* ── Lapels ── */}
      <path d="M8 152 L48 152 L68 178 L10 196 Z" fill="#EEEEEE" stroke="#CCC" strokeWidth="1.5"/>
      <path d="M142 152 L102 152 L82 178 L140 196 Z" fill="#EEEEEE" stroke="#CCC" strokeWidth="1.5"/>
      {/* ── Belt ── */}
      <rect x="44" y="198" width="62" height="10" fill="#774422" rx="2"/>
      <rect x="65" y="196" width="20" height="14" fill="#CCAA44" rx="1.5"/>

      {/* ── Left arm — extended forward with portal gun ── */}
      <line x1="130" y1="168" x2="158" y2="148" stroke="#F5C87E" strokeWidth="15" strokeLinecap="round"/>
      {/* Portal gun */}
      <rect x="148" y="118" width="18" height="38" rx="4" fill="#7A7A7A" stroke="#444" strokeWidth="2" transform="rotate(20,157,137)"/>
      <rect x="142" y="128" width="30" height="16" rx="5" fill="#888" stroke="#555" strokeWidth="1.5" transform="rotate(20,157,136)"/>
      <circle cx="172" cy="122" r="5" fill="#DD2222"/>
      <circle cx="165" cy="134" r="4" fill="#00CC44" opacity="0.9"/>
      <rect x="155" y="130" width="14" height="10" rx="2" fill="#AAA" transform="rotate(20,162,135)"/>

      {/* ── Legs trailing behind (angled up) ── */}
      <line x1="44" y1="248" x2="18" y2="214" stroke="#774422" strokeWidth="18" strokeLinecap="round"/>
      <line x1="96" y1="248" x2="72" y2="210" stroke="#774422" strokeWidth="18" strokeLinecap="round"/>
      {/* Shoes */}
      <ellipse cx="12" cy="208" rx="16" ry="9" fill="#222" stroke="#111" strokeWidth="2" transform="rotate(-30,12,208)"/>
      <ellipse cx="65" cy="205" rx="16" ry="9" fill="#222" stroke="#111" strokeWidth="2" transform="rotate(-20,65,205)"/>
    </svg>
  )
}

/* Morty tumbling/screaming — arms and legs splayed out in panic */
function MortyFlyingSVG() {
  return (
    <svg viewBox="-25 0 175 210" fill="none" style={{ filter: 'drop-shadow(0 0 12px rgba(57,255,20,0.35))' }}>
      {/* ── Hair ── */}
      <path d="M18 58 Q12 28 28 16 Q42 6 60 8 Q78 6 92 16 Q108 28 102 58 Q88 40 60 38 Q32 40 18 58Z"
        fill="#8B6914" stroke="#6B4A10" strokeWidth="1.5"/>

      {/* ── Head ── */}
      <ellipse cx="60" cy="76" rx="35" ry="37" fill="#F5C87E" stroke="#2A2A2A" strokeWidth="2.5"/>

      {/* ── Ears ── */}
      <ellipse cx="26" cy="76" rx="9" ry="12" fill="#F5C87E" stroke="#2A2A2A" strokeWidth="2"/>
      <ellipse cx="94" cy="76" rx="9" ry="12" fill="#F5C87E" stroke="#2A2A2A" strokeWidth="2"/>
      <ellipse cx="26" cy="76" rx="5" ry="7" fill="#E8A870"/>
      <ellipse cx="94" cy="76" rx="5" ry="7" fill="#E8A870"/>

      {/* ── Worried eyebrows ── */}
      <path d="M28 52 Q40 43 52 49" stroke="#7A5810" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <path d="M68 49 Q80 43 92 52" stroke="#7A5810" strokeWidth="4" strokeLinecap="round" fill="none"/>

      {/* ── Left eye — huge scared ── */}
      <ellipse cx="44" cy="73" rx="15" ry="17" fill="white" stroke="#2A2A2A" strokeWidth="2.5"/>
      <circle cx="45" cy="74" r="11" fill="#553311"/>
      <circle cx="46" cy="72" r="7" fill="#111"/>
      <circle cx="48" cy="70" r="2.5" fill="white"/>

      {/* ── Right eye — huge scared ── */}
      <ellipse cx="76" cy="73" rx="15" ry="17" fill="white" stroke="#2A2A2A" strokeWidth="2.5"/>
      <circle cx="77" cy="74" r="11" fill="#553311"/>
      <circle cx="78" cy="72" r="7" fill="#111"/>
      <circle cx="80" cy="70" r="2.5" fill="white"/>

      {/* ── Screaming O-mouth ── */}
      <ellipse cx="60" cy="105" rx="15" ry="13" fill="#AA4422" stroke="#2A2A2A" strokeWidth="2.5"/>
      <ellipse cx="60" cy="103" rx="11" ry="9" fill="#771A0A"/>

      {/* ── Neck ── */}
      <rect x="47" y="112" width="26" height="14" fill="#F5C87E"/>

      {/* ── Left arm — flung up-left in panic ── */}
      <line x1="16" y1="140" x2="-18" y2="112" stroke="#F5C87E" strokeWidth="14" strokeLinecap="round"/>
      <circle cx="-22" cy="109" r="10" fill="#F5C87E" stroke="#2A2A2A" strokeWidth="2"/>

      {/* ── Yellow shirt ── */}
      <path d="M5 126 L115 126 L112 210 L8 210 Z" fill="#E8C940" stroke="#C8A920" strokeWidth="2"/>
      {/* ── V collar ── */}
      <path d="M34 126 L60 150 L86 126" fill="#F5C87E" stroke="#2A2A2A" strokeWidth="2"/>
      {/* ── Sleeves ── */}
      <path d="M5 126 L5 154 L24 154 L24 126" fill="#D4B030" stroke="#C8A920" strokeWidth="1.5"/>
      <path d="M115 126 L115 154 L96 154 L96 126" fill="#D4B030" stroke="#C8A920" strokeWidth="1.5"/>

      {/* ── Right arm — flung up-right in panic ── */}
      <line x1="104" y1="140" x2="138" y2="112" stroke="#F5C87E" strokeWidth="14" strokeLinecap="round"/>
      <circle cx="142" cy="109" r="10" fill="#F5C87E" stroke="#2A2A2A" strokeWidth="2"/>

      {/* ── Left leg — kicked out diagonally ── */}
      <line x1="30" y1="208" x2="6" y2="180" stroke="#8B7355" strokeWidth="17" strokeLinecap="round"/>
      <ellipse cx="2" cy="175" rx="15" ry="9" fill="#4455AA" stroke="#334488" strokeWidth="2" transform="rotate(-25,2,175)"/>

      {/* ── Right leg — kicked out diagonally ── */}
      <line x1="90" y1="208" x2="114" y2="180" stroke="#8B7355" strokeWidth="17" strokeLinecap="round"/>
      <ellipse cx="118" cy="175" rx="15" ry="9" fill="#4455AA" stroke="#334488" strokeWidth="2" transform="rotate(25,118,175)"/>
    </svg>
  )
}

export default function RMBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>

      {/* ── Portal vortex base (radial glow) ── */}
      <div className="rm-portal-base" />

      {/* ── Swirl layers at different speeds ── */}
      <div className="rm-swirl-1" />
      <div className="rm-swirl-2" />
      <div className="rm-swirl-3" />

      {/* ── Bright center bloom ── */}
      <div className="rm-portal-bloom" />

      {/* ── Ooze blobs at edges ── */}
      <div className="rm-ooze rm-ooze-tl" />
      <div className="rm-ooze rm-ooze-tr" />
      <div className="rm-ooze rm-ooze-bl" />
      <div className="rm-ooze rm-ooze-br" />
      <div className="rm-ooze rm-ooze-ml" />
      <div className="rm-ooze rm-ooze-mr" />

      {/* ── White dot debris (floating in portal) ── */}
      <div className="rm-dot rm-dot-1" />
      <div className="rm-dot rm-dot-2" />
      <div className="rm-dot rm-dot-3" />
      <div className="rm-dot rm-dot-4" />
      <div className="rm-dot rm-dot-5" />

      {/* ── Rick — bottom-left, flying up into portal ── */}
      <div className="rm-rick-wrap">
        <RickFlyingSVG />
      </div>

      {/* ── Morty — right side, tumbling ── */}
      <div className="rm-morty-wrap">
        <MortyFlyingSVG />
      </div>

    </div>
  )
}
