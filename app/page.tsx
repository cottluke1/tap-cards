"use client";

import React from "react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CaseStudies } from "@/components/case-studies";

const SERIF = "var(--font-display), Georgia, serif";
const SAIRA = "'Saira', -apple-system, sans-serif";

/* ─── Nav ─── */
const NAV_LINKS = [
  { label: "Cards",        id: "cards"        },
  { label: "How It Works", id: "how-it-works" },
  { label: "Results",      id: "results"      },
  { label: "Demo",         id: "demo"         },
  { label: "Inquire",      id: "inquire"      },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      document.querySelectorAll<HTMLElement>("[data-section]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= 120 && r.bottom >= 120) setActive(el.dataset.section ?? "");
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      height: 60,
      background: scrolled ? "rgba(8,8,10,0.9)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      transition: "background .3s, border-color .3s",
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto", height: "100%",
        padding: "0 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "relative",
      }}>
        <span style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 400, letterSpacing: "0.22em", color: "white" }}>TAP</span>

        <button
          onClick={() => document.getElementById("inquire")?.scrollIntoView({ behavior: "smooth" })}
          style={{ fontFamily: SAIRA, fontSize: 12, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 999, padding: "7px 18px", cursor: "pointer" }}
        >Inquire</button>
      </div>
    </header>
  );
}

/* ─── Headline ─── */
function AnimatedHeadline() {
  const FS = "clamp(52px, 7vw, 88px)";
  return (
    <h1 style={{ fontFamily: SERIF, fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", color: "white", margin: 0, textAlign: "center" }}>
      <span style={{ display: "block", fontSize: FS }}>More reviews.</span>
      <span style={{ display: "block", fontSize: FS }}>On autopilot.</span>
    </h1>
  );
}

/* ─── Card tile ─── */
function CardTile({ variant, name, material, color, accent, border, features, imageSrc }: {
  variant: "oak" | "platinum"; name: string; material: string;
  color: string; accent: string; border: string; features: string[]; imageSrc: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: accent, border: `1px solid ${border}`,
        borderRadius: 20, padding: "44px 36px",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 32,
      }}
    >
      {/* Product photo */}
      <img
        src={imageSrc}
        alt={name}
        style={{
          width: "100%", display: "block",
          filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.8)) drop-shadow(0 8px 20px rgba(0,0,0,0.5))",
        }}
      />

      <div style={{ width: "100%", textAlign: "center" }}>
        <div style={{ fontFamily: SAIRA, fontSize: 10, fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color, marginBottom: 8 }}>{material}</div>
        <h3 style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 400, color: "white", margin: "0 0 24px" }}>{name}</h3>

        <div style={{ textAlign: "left", marginBottom: 28 }}>
          {features.map((f, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "9px 0",
              borderBottom: i < features.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              fontFamily: SAIRA, fontSize: 13, color: "rgba(255,255,255,0.5)",
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l2.5 2.5L10 3.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {f}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Inquire Form ─── */
function InquireSection() {
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const field = (name: string) => ({
    width: "100%", fontFamily: SAIRA, fontSize: 15, color: "white",
    background: "transparent", border: "none",
    borderBottom: `1px solid ${focused === name ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.1)"}`,
    borderRadius: 0, padding: "16px 0", outline: "none",
    transition: "border-color 0.2s",
    caretColor: "white",
  } as React.CSSProperties);

  const label = {
    fontFamily: SAIRA, fontSize: 9, letterSpacing: "0.28em",
    textTransform: "uppercase" as const, color: "rgba(255,255,255,0.28)",
    display: "block", marginBottom: 2,
  };

  return (
    <section id="inquire" data-section="inquire" style={{
      background: "#08080a",
      borderTop: "1px solid rgba(255,255,255,0.05)",
    }}>
      <div style={{ maxWidth: 1060, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 600 }}>

        {/* Left: headline + trust */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            padding: "100px 60px 100px 24px",
            display: "flex", flexDirection: "column", justifyContent: "center",
            borderRight: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <p style={{ fontFamily: SAIRA, fontSize: 9, fontWeight: 600, letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginBottom: 24 }}>Get in touch</p>
          <h2 style={{
            fontFamily: SERIF,
            fontSize: "clamp(38px, 5vw, 64px)",
            fontWeight: 400, lineHeight: 1.04,
            color: "white", margin: "0 0 28px",
            letterSpacing: "-0.015em",
          }}>
            Let&apos;s put a card<br />on every table.
          </h2>
          <p style={{ fontFamily: SAIRA, fontSize: 13, color: "rgba(255,255,255,0.3)", lineHeight: 1.75, margin: "0 0 56px", maxWidth: 360 }}>
            Tell us about your restaurant. We&apos;ll follow up within one business day with pricing and a setup guide.
          </p>
          {/* Trust signals */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              "No contracts. Cancel anytime.",
              "Cards ship in 3–5 business days.",
              "One-on-one setup support included.",
            ].map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6.5" stroke="rgba(255,255,255,0.12)"/>
                  <path d="M4 7l2 2 4-4" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ fontFamily: SAIRA, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{t}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: form */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{ padding: "100px 24px 100px 60px", display: "flex", flexDirection: "column", justifyContent: "center" }}
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: "center", padding: "40px 0" }}
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ marginBottom: 24 }}>
                <circle cx="24" cy="24" r="23" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                <path d="M15 24l7 7 12-14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3 style={{ fontFamily: SERIF, fontSize: 32, fontWeight: 400, color: "white", margin: "0 0 12px" }}>We&apos;ll be in touch.</h3>
              <p style={{ fontFamily: SAIRA, fontSize: 13, color: "rgba(255,255,255,0.28)", margin: 0 }}>Expect a reply within one business day.</p>
            </motion.div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: 36 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
                <div>
                  <label style={label}>Restaurant</label>
                  <input required placeholder="Marro's" style={field("restaurant")} onFocus={() => setFocused("restaurant")} onBlur={() => setFocused(null)} />
                </div>
                <div>
                  <label style={label}>Your name</label>
                  <input required placeholder="Tony M." style={field("name")} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
                <div>
                  <label style={label}>Email</label>
                  <input required type="email" placeholder="tony@marros.com" style={field("email")} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
                </div>
                <div>
                  <label style={label}>Tables</label>
                  <input required type="number" min="1" placeholder="12" style={field("tables")} onFocus={() => setFocused("tables")} onBlur={() => setFocused(null)} />
                </div>
              </div>
              <div style={{ paddingTop: 8 }}>
                <button type="submit" style={{
                  width: "100%", fontFamily: SAIRA, fontSize: 13, fontWeight: 600,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "#08080a", background: "white",
                  border: "none", borderRadius: 8,
                  padding: "18px 0", cursor: "pointer",
                }}>Send inquiry</button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Page ─── */
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [cardScrollY, setCardScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) setCardScrollY(window.scrollY * 0.25);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main style={{ background: "#08080a", color: "white", overflowX: "hidden" }}>
      <Navbar />

      {/* ━━━━━ HERO ━━━━━ */}
      <section ref={heroRef} style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column", alignItems: "center",
        paddingTop: 60, position: "relative", overflow: "hidden",
        background: "linear-gradient(180deg, #0e0e10 0%, #08080a 60%)",
      }}>
        {/* Ambient glow behind card */}
        <div style={{
          position: "absolute", top: "8%", left: "50%", transform: "translateX(-50%)",
          width: 700, height: 400, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(200,200,220,0.055) 0%, transparent 70%)",
          filter: "blur(40px)", pointerEvents: "none", zIndex: 1,
        }} />

        {/* Product photo */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "relative", zIndex: 10,
            marginTop: 80,
            transform: `translateY(${cardScrollY}px)`,
            width: "min(520px, calc(100vw - 48px))",
          }}
        >
          <img
            src="/tap-card.jpg"
            alt="TAP — brushed steel NFC review card"
            style={{
              width: "100%", display: "block",
              filter: "drop-shadow(0 60px 120px rgba(0,0,0,0.95)) drop-shadow(0 20px 40px rgba(0,0,0,0.7))",
            }}
          />
        </motion.div>

        {/* Text block */}
        <div style={{ textAlign: "center", marginTop: 60, padding: "0 24px", maxWidth: 580 }}>
          <AnimatedHeadline />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            style={{
              fontFamily: SAIRA, fontSize: 16, fontWeight: 400,
              lineHeight: 1.65, color: "rgba(255,255,255,0.42)",
              margin: "22px auto 34px", maxWidth: 400,
            }}
          >
            A premium NFC card on every table. Customers tap, leave a review, done. No asking. No awkwardness.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.5 }}
            style={{ display: "flex", gap: 10, justifyContent: "center" }}
          >
            <button
              onClick={() => document.getElementById("inquire")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                fontFamily: SAIRA, fontSize: 14, fontWeight: 600, letterSpacing: "0.03em",
                color: "#08080a", background: "white", border: "none",
                borderRadius: 7, padding: "13px 28px", cursor: "pointer",
              }}>Get started</button>
            <button
              onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                fontFamily: SAIRA, fontSize: 14, fontWeight: 400,
                color: "rgba(255,255,255,0.6)",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 7, padding: "13px 28px", cursor: "pointer",
              }}>See how it works</button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.25, duration: 0.5 }}
            style={{ fontFamily: SAIRA, fontSize: 11, color: "rgba(255,255,255,0.18)", marginTop: 18, letterSpacing: "0.05em" }}
          >
            Free shipping · Lifetime chip warranty · Cancel anytime
          </motion.p>
        </div>

      </section>

      {/* ━━━━━ CARDS ━━━━━ */}
      <section id="cards" data-section="cards" style={{ padding: "100px 24px", background: "#08080a" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: 60 }}
          >
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 400, color: "white", margin: "0 0 14px" }}>Two materials. One purpose.</h2>
            <p style={{ fontFamily: SAIRA, fontSize: 14, color: "rgba(255,255,255,0.32)", margin: 0, maxWidth: 360, marginLeft: "auto", marginRight: "auto", lineHeight: 1.65 }}>
              Every card is laser-engraved and ships with your Google Review link pre-programmed.
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            <CardTile
              variant="oak" name="Oak" material="Real wood veneer"
              color="rgba(210,155,60,0.9)" accent="rgba(255,255,255,0.03)" border="rgba(180,180,180,0.14)"
              imageSrc="/tap-card1.jpg"
              features={["Real oak wood veneer", "Laser-engraved text & stars", "Embedded NFC chip", "Tap analytics included", "Custom link — update anytime"]}
            />
            <CardTile
              variant="platinum" name="Platinum" material="Brushed stainless steel"
              color="rgba(180,180,180,0.85)" accent="rgba(255,255,255,0.03)" border="rgba(180,180,180,0.14)"
              imageSrc="/tap-card.jpg"
              features={["Brushed stainless steel", "Laser-engraved text & stars", "Embedded NFC chip", "Tap analytics included", "Custom link — update anytime"]}
            />
          </div>

        </div>
      </section>

      {/* ━━━━━ HOW IT WORKS ━━━━━ */}
      <section id="how-it-works" data-section="how-it-works" style={{
        padding: "120px 24px", background: "#0d0d10",
        borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ fontFamily: SERIF, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, color: "white", textAlign: "center", margin: "0 0 80px" }}
          >How it works</motion.h2>

          {/* Two-column layout */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 80, alignItems: "start" }}>

            {/* ── LEFT: destination visual ── */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* How it works photo */}
              <img
                src="/how.jpg"
                alt="TAP card on a restaurant table"
                style={{
                  width: "100%", display: "block", marginBottom: 36,
                  filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.8))",
                }}
              />

              {/* Link destinations */}
              <div>
                <p style={{ fontFamily: SAIRA, fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginBottom: 28 }}>
                  Links to anywhere you want
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  {[
                    { name: "Google", sub: "Business Profile", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="rgba(255,255,255,0.7)"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="rgba(255,255,255,0.55)"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="rgba(255,255,255,0.4)"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="rgba(255,255,255,0.6)"/></svg> },
                    { name: "Instagram", sub: "Profile or post", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8"/><circle cx="12" cy="12" r="4.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8"/><circle cx="17.5" cy="6.5" r="1.2" fill="rgba(255,255,255,0.6)"/></svg> },
                    { name: "Yelp", sub: "Restaurant listing", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-.5 14.5c-.28.48-.88.64-1.36.37l-3-1.73c-.48-.28-.64-.88-.37-1.36l2-3.46c.27-.48.88-.64 1.36-.37l3 1.73c.48.28.64.88.37 1.36l-2 3.46zm5-2.87l-2.5.89c-.52.18-1.08-.09-1.27-.61-.18-.52.09-1.08.61-1.27l2.5-.89c.52-.18 1.08.09 1.27.61.19.52-.09 1.08-.61 1.27zm-1-5.5l-2 3.46c-.28.48-.88.64-1.36.37-.48-.28-.64-.88-.37-1.36l2-3.46c.28-.48.88-.64 1.36-.37.49.28.65.88.37 1.36z" fill="rgba(255,255,255,0.6)"/></svg> },
                    { name: "TripAdvisor", sub: "Hotel & restaurant", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="7" cy="13" r="3.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.6"/><circle cx="17" cy="13" r="3.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.6"/><path d="M4 9h16M7 9c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="rgba(255,255,255,0.45)" strokeWidth="1.6" strokeLinecap="round"/><circle cx="7" cy="13" r="1.2" fill="rgba(255,255,255,0.6)"/><circle cx="17" cy="13" r="1.2" fill="rgba(255,255,255,0.6)"/></svg> },
                    { name: "Facebook", sub: "Page or post", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> },
                    { name: "Your Website", sub: "Any URL you choose", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8"/><path d="M2 12h20M12 2c-2.76 3.33-4 6.67-4 10s1.24 6.67 4 10M12 2c2.76 3.33 4 6.67 4 10s-1.24 6.67-4 10" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" strokeLinecap="round"/></svg> },
                  ].map((dest, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.07 }}
                      style={{
                        display: "flex", alignItems: "center", gap: 14,
                        padding: "20px 18px",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: 12,
                      }}
                    >
                      <div style={{ flexShrink: 0 }}>{dest.icon}</div>
                      <div>
                        <div style={{ fontFamily: SAIRA, fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.8)", letterSpacing: "0.02em" }}>{dest.name}</div>
                        <div style={{ fontFamily: SAIRA, fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>{dest.sub}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <p style={{ fontFamily: SAIRA, fontSize: 11, color: "rgba(255,255,255,0.18)", marginTop: 24, lineHeight: 1.7 }}>
                  One card. One tap. We program it to whatever you need — and you can change the destination at any time, no new card required.
                </p>
              </div>
            </motion.div>

            {/* ── RIGHT: steps ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
              {[
                { n: "1", title: "We place a card on every table", body: "Premium NFC cards arrive laser-engraved and pre-programmed. Just set them next to the check presenter or salt shaker — no training, no app, no setup for your staff." },
                { n: "2", title: "Customer taps their phone", body: "One tap — no app download, no QR code squinting. Works instantly on every iPhone and Android. They're on your review page in under two seconds." },
                { n: "3", title: "Review goes live in 30 seconds", body: "The rating posts directly to Google, Yelp, TripAdvisor, or wherever you point it. Change the destination any time from your dashboard — no new card needed." },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.12 }}
                  style={{ display: "flex", gap: 24 }}
                >
                  <div style={{ fontFamily: SERIF, fontSize: 56, fontWeight: 300, color: "rgba(255,255,255,0.07)", lineHeight: 1, flexShrink: 0, width: 40, textAlign: "right" }}>{step.n}</div>
                  <div style={{ paddingTop: 4 }}>
                    <h3 style={{ fontFamily: SAIRA, fontSize: 15, fontWeight: 600, color: "white", margin: "0 0 10px", letterSpacing: "0.02em" }}>{step.title}</h3>
                    <p style={{ fontFamily: SAIRA, fontSize: 13, color: "rgba(255,255,255,0.32)", lineHeight: 1.75, margin: 0 }}>{step.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      <CaseStudies />

      {/* ━━━━━ INQUIRE ━━━━━ */}
      <InquireSection />

      {/* ━━━━━ FOOTER ━━━━━ */}
      <footer style={{
        padding: "28px 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}>
        <span style={{ fontFamily: SAIRA, fontWeight: 700, letterSpacing: "0.35em", fontSize: 12, color: "rgba(255,255,255,0.3)" }}>TAP</span>
        <span style={{ fontFamily: SAIRA, fontSize: 11, color: "rgba(255,255,255,0.16)" }}>© 2025 TAP Cards</span>
      </footer>
    </main>
  );
}
