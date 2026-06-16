"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface TapCardProps {
  variant: "oak" | "platinum";
  size?: "hero" | "normal";
}

/* ── Continuously sweeping light streak ── */
function Shimmer({ isOak }: { isOak: boolean }) {
  return (
    <motion.div
      style={{
        position: "absolute", inset: 0,
        borderRadius: "inherit",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 8,
      }}
      initial={false}
    >
      <motion.div
        style={{ position: "absolute", top: 0, bottom: 0, width: "55%", left: "-55%" }}
        animate={{ left: ["−55%", "120%"] }}
        transition={{ duration: 2.8, ease: [0.4, 0, 0.6, 1], repeat: Infinity, repeatDelay: 2.0 }}
      >
        <div style={{
          width: "100%", height: "100%",
          background: isOak
            ? "linear-gradient(105deg, transparent 0%, rgba(255,210,100,0.0) 30%, rgba(255,220,130,0.32) 50%, rgba(255,210,100,0.0) 70%, transparent 100%)"
            : "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.0) 30%, rgba(255,255,255,0.38) 50%, rgba(255,255,255,0.0) 70%, transparent 100%)",
          transform: "skewX(-15deg)",
        }} />
      </motion.div>
    </motion.div>
  );
}

/* ── Precision etched border (Amex-style) ── */
function EtchedBorder({ w, h, isOak }: { w: number; h: number; isOak: boolean }) {
  const gold = "rgba(200,155,60,0.7)";
  const silver = "rgba(180,180,190,0.6)";
  const c = isOak ? gold : silver;
  const c2 = isOak ? "rgba(255,200,80,0.25)" : "rgba(255,255,255,0.2)";
  const r = 20;

  /* Corner ornament paths */
  const corners = [
    { tx: 0, ty: 0, sx: 1, sy: 1 },
    { tx: w, ty: 0, sx: -1, sy: 1 },
    { tx: 0, ty: h, sx: 1, sy: -1 },
    { tx: w, ty: h, sx: -1, sy: -1 },
  ];

  return (
    <svg
      style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 9, overflow: "visible" }}
      width={w} height={h} viewBox={`0 0 ${w} ${h}`}
    >
      {/* Outer frame */}
      <rect x="4" y="4" width={w - 8} height={h - 8} rx={r} ry={r}
        fill="none" stroke={c} strokeWidth="1" />
      {/* Inner frame */}
      <rect x="9" y="9" width={w - 18} height={h - 18} rx={r - 5} ry={r - 5}
        fill="none" stroke={c2} strokeWidth="0.6" />

      {/* Corner ornaments */}
      {corners.map(({ tx, ty, sx, sy }, i) => (
        <g key={i} transform={`translate(${tx},${ty}) scale(${sx},${sy})`}>
          <line x1="12" y1="4" x2="22" y2="4" stroke={c} strokeWidth="1" strokeLinecap="round" />
          <line x1="4" y1="12" x2="4" y2="22" stroke={c} strokeWidth="1" strokeLinecap="round" />
          <circle cx="4" cy="4" r="0" fill="none" />
          <circle cx="12" cy="12" r="1.8" fill="none" stroke={c} strokeWidth="0.8" />
          <circle cx="12" cy="12" r="0.7" fill={c} />
        </g>
      ))}

      {/* Mid-edge ticks */}
      {[
        [w / 2 - 5, 4, w / 2 + 5, 4],
        [w / 2 - 5, h - 4, w / 2 + 5, h - 4],
        [4, h / 2 - 5, 4, h / 2 + 5],
        [w - 4, h / 2 - 5, w - 4, h / 2 + 5],
      ].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={c} strokeWidth="0.9" strokeLinecap="round" />
      ))}
    </svg>
  );
}

/* ── Five-star row ── */
function Stars({ size, isOak }: { size: "hero" | "normal"; isOak: boolean }) {
  const s = size === "hero" ? 16 : 13;
  const gap = size === "hero" ? 9 : 7;
  const fill = isOak ? "rgba(255,195,80,0.85)" : "rgba(210,210,220,0.8)";
  return (
    <div style={{ display: "flex", gap, alignItems: "center" }}>
      {[1,2,3,4,5].map((i) => (
        <svg key={i} width={s} height={s} viewBox="0 0 20 20">
          <polygon
            points="10,1.5 12.5,7.3 18.8,7.9 14.2,12.1 15.7,18.5 10,15.2 4.3,18.5 5.8,12.1 1.2,7.9 7.5,7.3"
            fill={fill}
            style={{ filter: `drop-shadow(0 0 ${size === "hero" ? 3 : 2}px ${isOak ? "rgba(255,180,40,0.6)" : "rgba(200,200,255,0.4)"})` }}
          />
        </svg>
      ))}
    </div>
  );
}

/* ── NFC tap icon ── */
function NfcIcon({ size, isOak }: { size: "hero" | "normal"; isOak: boolean }) {
  const s = size === "hero" ? 1 : 0.82;
  const stroke = isOak ? "rgba(255,195,80,0.7)" : "rgba(200,210,255,0.65)";
  return (
    <svg width={44 * s} height={36 * s} viewBox="0 0 44 36" fill="none">
      <rect x="2" y="1" width="19" height="34" rx="3.5" ry="3.5"
        stroke={stroke} strokeWidth="1.6" fill="none" />
      <rect x="2" y="28" width="19" height="7" rx="0 0 3.5 3.5" fill={`${stroke.replace("0.7", "0.12").replace("0.65", "0.1")}`} />
      <rect x="8.5" y="3.5" width="6" height="1.4" rx="0.7" fill={stroke} opacity="0.6" />
      <path d="M29 18 Q33 13.5 33 18 Q33 22.5 29 18" stroke={stroke} strokeWidth="1.7" fill="none" strokeLinecap="round"/>
      <path d="M32.5 18 Q38 11.5 38 18 Q38 24.5 32.5 18" stroke={stroke} strokeWidth="1.7" fill="none" strokeLinecap="round" opacity="0.7"/>
      <path d="M36 18 Q43 9 43 18 Q43 27 36 18" stroke={stroke} strokeWidth="1.7" fill="none" strokeLinecap="round" opacity="0.4"/>
    </svg>
  );
}

/* ── CARD FRONT ── */
function CardFront({ w, h, isOak, size }: { w: number; h: number; isOak: boolean; size: "hero" | "normal" }) {
  const br = size === "hero" ? 22 : 17;

  return (
    <div style={{ position: "absolute", inset: 0, borderRadius: br, overflow: "hidden" }}>

      {/* ── Base material ── */}
      {isOak ? (
        <>
          {/* Deep dark walnut base */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(145deg, #1c0d04 0%, #2a1208 25%, #1a0c05 50%, #231009 75%, #150a04 100%)" }} />
          {/* Warm grain lines */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `repeating-linear-gradient(178deg,
              transparent 0px, transparent 5px,
              rgba(255,150,40,0.04) 5px, rgba(255,150,40,0.04) 6px,
              transparent 6px, transparent 11px,
              rgba(0,0,0,0.08) 11px, rgba(0,0,0,0.08) 12px)`,
          }} />
          {/* Wavy grain depth */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `repeating-linear-gradient(172deg,
              transparent 0px, transparent 18px,
              rgba(180,80,20,0.05) 18px, rgba(180,80,20,0.05) 19px)`,
          }} />
          {/* Dramatic top-left warm light pool */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 70% 55% at 20% 15%, rgba(255,160,40,0.18) 0%, rgba(255,120,20,0.06) 50%, transparent 75%)",
          }} />
          {/* Bottom right dark vignette */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 60% 50% at 85% 88%, rgba(0,0,0,0.55) 0%, transparent 70%)",
          }} />
        </>
      ) : (
        <>
          {/* Deep gunmetal base */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(145deg, #0d0d12 0%, #171720 25%, #0f0f16 50%, #1a1a22 75%, #0a0a10 100%)" }} />
          {/* Fine horizontal brushed lines */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `repeating-linear-gradient(90deg,
              transparent 0px, transparent 2px,
              rgba(255,255,255,0.025) 2px, rgba(255,255,255,0.025) 3px)`,
          }} />
          {/* Diagonal micro-brush */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `repeating-linear-gradient(135deg,
              transparent 0px, transparent 8px,
              rgba(255,255,255,0.012) 8px, rgba(255,255,255,0.012) 9px)`,
          }} />
          {/* Dramatic top-left cool light pool */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 75% 55% at 15% 12%, rgba(160,175,255,0.14) 0%, rgba(120,140,255,0.04) 55%, transparent 80%)",
          }} />
          {/* Subtle centre glow */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 50% 40% at 55% 52%, rgba(255,255,255,0.03) 0%, transparent 70%)",
          }} />
          {/* Bottom right vignette */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 55% 45% at 90% 90%, rgba(0,0,0,0.7) 0%, transparent 70%)",
          }} />
        </>
      )}

      {/* ── Card content ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 4,
        display: "flex", flexDirection: "column",
        justifyContent: "space-between",
        padding: size === "hero" ? "28px 36px 28px 36px" : "20px 26px 22px 26px",
      }}>

        {/* Top row: wordmark + subtle chip outline */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <span style={{
            fontFamily: "'Saira', -apple-system, sans-serif",
            fontSize: size === "hero" ? 13 : 10,
            fontWeight: 700,
            letterSpacing: "0.42em",
            color: isOak ? "rgba(255,190,70,0.65)" : "rgba(180,190,220,0.55)",
            textTransform: "uppercase",
          }}>TAP</span>

          {/* EMV chip silhouette */}
          <div style={{
            width: size === "hero" ? 34 : 27,
            height: size === "hero" ? 26 : 21,
            border: `1px solid ${isOak ? "rgba(255,180,60,0.3)" : "rgba(180,190,220,0.25)"}`,
            borderRadius: 4,
            background: isOak
              ? "linear-gradient(135deg, rgba(180,100,20,0.25) 0%, rgba(120,60,10,0.15) 100%)"
              : "linear-gradient(135deg, rgba(140,150,200,0.15) 0%, rgba(80,90,140,0.08) 100%)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr 1fr",
            gap: "2px",
            padding: "4px 4px",
          }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{
                background: isOak ? "rgba(200,130,40,0.18)" : "rgba(160,170,220,0.15)",
                borderRadius: 1,
              }} />
            ))}
          </div>
        </div>

        {/* Centre: main message */}
        <div style={{ textAlign: "center" }}>
          <div style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: size === "hero" ? 17.5 : 13.5,
            fontWeight: 400,
            letterSpacing: "0.03em",
            color: isOak ? "rgba(255,220,160,0.9)" : "rgba(220,225,255,0.88)",
            marginBottom: size === "hero" ? 8 : 6,
            textShadow: isOak
              ? "0 0 18px rgba(255,150,40,0.25), 0 1px 2px rgba(0,0,0,0.6)"
              : "0 0 18px rgba(150,170,255,0.2), 0 1px 2px rgba(0,0,0,0.7)",
          }}>
            Thank you for dining with us.
          </div>
          <div style={{
            fontFamily: "'Saira', -apple-system, sans-serif",
            fontSize: size === "hero" ? 10.5 : 8.5,
            fontWeight: 400,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: isOak ? "rgba(200,155,70,0.5)" : "rgba(160,170,220,0.45)",
            marginBottom: size === "hero" ? 14 : 10,
          }}>
            Tap your phone to leave a review
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Stars size={size} isOak={isOak} />
          </div>
        </div>

        {/* Bottom row: NFC icon + subtle text */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{
            fontFamily: "'Saira', -apple-system, sans-serif",
            fontSize: size === "hero" ? 8.5 : 7,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: isOak ? "rgba(200,140,50,0.35)" : "rgba(140,150,200,0.3)",
          }}>
            NFC · Enabled
          </div>
          <NfcIcon size={size} isOak={isOak} />
        </div>
      </div>

      <Shimmer isOak={isOak} />
      <EtchedBorder w={w} h={h} isOak={isOak} />

      {/* Metallic rim */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "inherit",
        pointerEvents: "none", zIndex: 10,
        boxShadow: isOak
          ? "inset 0 1px 0 rgba(255,200,80,0.45), inset 0 -1px 0 rgba(60,20,0,0.8), inset 1px 0 0 rgba(255,180,60,0.25), inset -1px 0 0 rgba(40,10,0,0.6)"
          : "inset 0 1px 0 rgba(200,210,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.9), inset 1px 0 0 rgba(160,175,255,0.18), inset -1px 0 0 rgba(0,0,0,0.7)",
      }} />
    </div>
  );
}

/* ── CARD BACK ── */
function CardBack({ w, h, isOak, size }: { w: number; h: number; isOak: boolean; size: "hero" | "normal" }) {
  const br = size === "hero" ? 22 : 17;
  const stripH = Math.round(h * 0.18);
  const stripTop = Math.round(h * 0.19);

  return (
    <div style={{ position: "absolute", inset: 0, borderRadius: br, overflow: "hidden" }}>
      {/* Same dark base */}
      {isOak ? (
        <>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(145deg, #1c0d04 0%, #2a1208 30%, #1a0c05 60%, #150a04 100%)" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: `repeating-linear-gradient(178deg, transparent 0px, transparent 5px, rgba(255,150,40,0.04) 5px, rgba(255,150,40,0.04) 6px)` }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 55% at 80% 15%, rgba(255,140,30,0.14) 0%, transparent 70%)" }} />
        </>
      ) : (
        <>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(145deg, #0d0d12 0%, #171720 30%, #0f0f16 60%, #0a0a10 100%)" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: `repeating-linear-gradient(90deg, transparent 0px, transparent 2px, rgba(255,255,255,0.025) 2px, rgba(255,255,255,0.025) 3px)` }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 85% 12%, rgba(140,160,255,0.12) 0%, transparent 70%)" }} />
        </>
      )}

      {/* Magnetic strip */}
      <div style={{
        position: "absolute",
        top: stripTop, left: 0, right: 0,
        height: stripH,
        background: "linear-gradient(180deg, #0a0a0a 0%, #050505 50%, #111 100%)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.8), 0 -1px 0 rgba(255,255,255,0.04)",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `repeating-linear-gradient(90deg, transparent 0px, transparent 2px, rgba(255,255,255,0.018) 2px, rgba(255,255,255,0.018) 3px)`,
        }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 30%, rgba(0,0,0,0.3) 100%)" }} />
      </div>

      {/* Content area below strip */}
      <div style={{
        position: "absolute",
        top: stripTop + stripH + Math.round(h * 0.07),
        left: Math.round(w * 0.05),
        right: Math.round(w * 0.05),
        display: "flex",
        alignItems: "center",
        gap: Math.round(w * 0.04),
      }}>
        {/* Signature strip */}
        <div style={{
          flex: 1,
          height: Math.round(h * 0.14),
          background: "rgba(255,255,255,0.88)",
          borderRadius: 3,
          overflow: "hidden",
          display: "flex", alignItems: "center",
          paddingLeft: 8,
          position: "relative",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `repeating-linear-gradient(45deg, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0.04) 1px, transparent 1px, transparent 4px)`,
          }} />
          <span style={{
            fontFamily: "Georgia, serif",
            fontSize: Math.round(h * 0.055),
            color: "rgba(0,0,0,0.22)",
            letterSpacing: "0.06em",
            position: "relative",
            fontStyle: "italic",
          }}>TAP Cards</span>
        </div>

        {/* CVV box */}
        <div style={{
          width: Math.round(w * 0.18),
          height: Math.round(h * 0.14),
          background: "rgba(255,255,255,0.88)",
          borderRadius: 3,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{
            fontFamily: "'Saira', monospace",
            fontSize: Math.round(h * 0.058),
            fontWeight: 600,
            color: "rgba(0,0,0,0.5)",
            letterSpacing: "0.12em",
          }}>•••</span>
        </div>
      </div>

      {/* NFC antenna hint (subtle circle) */}
      <div style={{
        position: "absolute",
        bottom: Math.round(h * 0.1),
        right: Math.round(w * 0.07),
        width: Math.round(h * 0.22),
        height: Math.round(h * 0.22),
        borderRadius: "50%",
        border: `1px solid ${isOak ? "rgba(255,180,60,0.18)" : "rgba(160,170,220,0.15)"}`,
        boxShadow: `0 0 0 ${Math.round(h * 0.035)}px ${isOak ? "rgba(255,170,50,0.08)" : "rgba(140,155,220,0.07)"}`,
      }}>
        <div style={{
          position: "absolute", inset: "20%",
          borderRadius: "50%",
          border: `1px solid ${isOak ? "rgba(255,180,60,0.12)" : "rgba(160,170,220,0.1)"}`,
        }} />
      </div>

      {/* Bottom text */}
      <div style={{
        position: "absolute",
        bottom: Math.round(h * 0.09),
        left: 0, right: 0,
        textAlign: "center",
        fontFamily: "'Saira', -apple-system, sans-serif",
        fontSize: Math.round(h * 0.04),
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: isOak ? "rgba(200,140,50,0.3)" : "rgba(140,150,200,0.28)",
      }}>
        NFC · Tap to Review
      </div>

      <Shimmer isOak={isOak} />
      <EtchedBorder w={w} h={h} isOak={isOak} />

      {/* Metallic rim */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "inherit",
        pointerEvents: "none", zIndex: 10,
        boxShadow: isOak
          ? "inset 0 1px 0 rgba(255,200,80,0.45), inset 0 -1px 0 rgba(60,20,0,0.8), inset 1px 0 0 rgba(255,180,60,0.25), inset -1px 0 0 rgba(40,10,0,0.6)"
          : "inset 0 1px 0 rgba(200,210,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.9), inset 1px 0 0 rgba(160,175,255,0.18), inset -1px 0 0 rgba(0,0,0,0.7)",
      }} />
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
export function TapCard({ variant, size = "normal" }: TapCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rawRX = useTransform(my, [-0.5, 0.5], [9, -9]);
  const rawRY = useTransform(mx, [-0.5, 0.5], [-12, 12]);
  const rotateX = useSpring(rawRX, { stiffness: 280, damping: 30 });
  const rotateY = useSpring(rawRY, { stiffness: 280, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (flipped) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { mx.set(0); my.set(0); };

  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    window.addEventListener("resize", update);
    update();
    return () => window.removeEventListener("resize", update);
  }, []);

  const isOak = variant === "oak";
  const baseW = size === "hero" ? 440 : 340;
  const baseH = size === "hero" ? 278 : 214;
  const scale = Math.min(1, (vw - 40) / baseW);
  const w = Math.round(baseW * scale);
  const h = Math.round(baseH * scale);
  const br = Math.round((size === "hero" ? 22 : 17) * scale);

  const dropShadow = isOak
    ? "0 70px 140px rgba(0,0,0,0.9), 0 30px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(200,130,30,0.2), 0 0 40px rgba(180,100,20,0.08)"
    : "0 70px 140px rgba(0,0,0,0.95), 0 30px 60px rgba(0,0,0,0.75), 0 0 0 1px rgba(140,155,220,0.15), 0 0 40px rgba(100,120,255,0.05)";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        ref={containerRef}
        style={{ width: w, height: h, perspective: 1400, cursor: "pointer" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setFlipped((f) => !f)}
      >
        <motion.div
          style={{
            width: "100%", height: "100%",
            rotateX: flipped ? 0 : rotateX,
            transformStyle: "preserve-3d",
            borderRadius: br,
            position: "relative",
            boxShadow: dropShadow,
          }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* FRONT */}
          <div style={{
            position: "absolute", inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}>
            <CardFront w={w} h={h} isOak={isOak} size={size} />
          </div>

          {/* BACK */}
          <div style={{
            position: "absolute", inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}>
            <CardBack w={w} h={h} isOak={isOak} size={size} />
          </div>
        </motion.div>
      </div>

      {/* Flip hint */}
      <div style={{
        marginTop: 14,
        fontFamily: "'Saira', -apple-system, sans-serif",
        fontSize: 9,
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.18)",
        userSelect: "none",
      }}>
        {flipped ? "← flip to front" : "click to flip →"}
      </div>
    </div>
  );
}
