"use client";

import { motion } from "framer-motion";

const SERIF = "var(--font-display), Georgia, serif";
const SAIRA = "'Saira', -apple-system, sans-serif";

const CASES = [
  {
    name: "Marro's",
    location: "Italian Trattoria · Chicago, IL",
    stat: "+565%",
    statLabel: "more reviews",
    before: 47,
    after: 312,
    starsBefore: 4.1,
    starsAfter: 4.8,
    period: "4 months",
    quote: "We put the card next to the check. That's it. Didn't ask anyone anything. The reviews just started coming in.",
    owner: "Tony M., Owner",
  },
  {
    name: "The Brunch Club",
    location: "Café & Brunch · Austin, TX",
    stat: "+612%",
    statLabel: "more reviews",
    before: 89,
    after: 634,
    starsBefore: 3.9,
    starsAfter: 4.7,
    period: "6 months",
    quote: "We were below 4 stars for two years. Six months later we're at 4.7. The weekend wait is now 45 minutes.",
    owner: "Sarah K., Co-owner",
  },
  {
    name: "Koi Garden",
    location: "Modern Japanese · Los Angeles, CA",
    stat: "+630%",
    statLabel: "more reviews",
    before: 122,
    after: 891,
    starsBefore: 4.2,
    starsAfter: 4.9,
    period: "8 months",
    quote: "Every table has a card. My staff doesn't mention it. The taps just happen. Last month — 891 reviews.",
    owner: "David L., Owner",
  },
];

function StarRow({ rating, bright }: { rating: number; bright: boolean }) {
  return (
    <span style={{ display: "inline-flex", gap: 3 }}>
      {[1,2,3,4,5].map((s) => (
        <svg key={s} width="12" height="12" viewBox="0 0 12 12">
          <polygon
            points="6,1 7.5,4.5 11.5,4.9 8.6,7.5 9.5,11.5 6,9.5 2.5,11.5 3.4,7.5 0.5,4.9 4.5,4.5"
            fill={s <= Math.round(rating)
              ? (bright ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.2)")
              : "rgba(255,255,255,0.08)"}
          />
        </svg>
      ))}
      <span style={{
        fontFamily: SAIRA, fontSize: 11,
        color: bright ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.22)",
        marginLeft: 4, letterSpacing: "0.03em",
      }}>{rating}</span>
    </span>
  );
}

export function CaseStudies() {
  return (
    <section
      id="results"
      data-section="results"
      style={{ padding: "120px 24px", background: "#08080a", borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div style={{ maxWidth: 1060, margin: "0 auto" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 80 }}
        >
          <p style={{
            fontFamily: SAIRA, fontSize: 10, fontWeight: 600,
            letterSpacing: "0.32em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.22)", marginBottom: 16,
          }}>Results</p>
          <h2 style={{
            fontFamily: SERIF,
            fontSize: "clamp(36px, 5vw, 58px)",
            fontWeight: 400, color: "white", margin: 0,
            lineHeight: 1.05, letterSpacing: "-0.01em",
          }}>
            Real restaurants.<br />Real numbers.
          </h2>
        </motion.div>

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {CASES.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1px 1fr 1px 1fr",
                alignItems: "center",
                gap: 0,
                padding: "40px 0",
                borderBottom: i < CASES.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}
            >
              {/* Col 1: Restaurant + quote */}
              <div style={{ paddingRight: 40 }}>
                <div style={{
                  fontFamily: SERIF, fontSize: 22, fontWeight: 400,
                  color: "white", marginBottom: 4,
                }}>{c.name}</div>
                <div style={{
                  fontFamily: SAIRA, fontSize: 11, letterSpacing: "0.06em",
                  color: "rgba(255,255,255,0.28)", marginBottom: 20,
                }}>{c.location}</div>
                <p style={{
                  fontFamily: SERIF, fontSize: 14, fontStyle: "italic",
                  color: "rgba(255,255,255,0.5)", lineHeight: 1.7,
                  margin: "0 0 10px",
                }}>"{c.quote}"</p>
                <div style={{
                  fontFamily: SAIRA, fontSize: 10, letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.25)", textTransform: "uppercase",
                }}>— {c.owner}</div>
              </div>

              {/* Divider */}
              <div style={{ height: "100%", background: "rgba(255,255,255,0.06)", alignSelf: "stretch" }} />

              {/* Col 2: Before → After */}
              <div style={{ padding: "0 40px", display: "flex", alignItems: "center", gap: 28 }}>
                {/* Before */}
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    fontFamily: SAIRA, fontSize: 9, letterSpacing: "0.25em",
                    textTransform: "uppercase", color: "rgba(255,255,255,0.22)",
                    marginBottom: 10,
                  }}>Before</div>
                  <div style={{
                    fontFamily: SERIF, fontSize: 42, fontWeight: 300,
                    color: "rgba(255,255,255,0.3)", lineHeight: 1,
                    marginBottom: 6,
                  }}>{c.before}</div>
                  <StarRow rating={c.starsBefore} bright={false} />
                </div>

                {/* Arrow */}
                <svg width="28" height="12" viewBox="0 0 28 12" fill="none" style={{ flexShrink: 0, opacity: 0.3 }}>
                  <path d="M0 6h24M20 2l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

                {/* After */}
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    fontFamily: SAIRA, fontSize: 9, letterSpacing: "0.25em",
                    textTransform: "uppercase", color: "rgba(255,255,255,0.5)",
                    marginBottom: 10,
                  }}>After</div>
                  <div style={{
                    fontFamily: SERIF, fontSize: 42, fontWeight: 400,
                    color: "white", lineHeight: 1, marginBottom: 6,
                  }}>{c.after}</div>
                  <StarRow rating={c.starsAfter} bright={true} />
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: "100%", background: "rgba(255,255,255,0.06)", alignSelf: "stretch" }} />

              {/* Col 3: Big stat */}
              <div style={{ paddingLeft: 40, textAlign: "center" }}>
                <div style={{
                  fontFamily: SERIF,
                  fontSize: "clamp(48px, 5vw, 68px)",
                  fontWeight: 300, color: "white",
                  lineHeight: 1, letterSpacing: "-0.02em",
                  marginBottom: 8,
                }}>{c.stat}</div>
                <div style={{
                  fontFamily: SAIRA, fontSize: 11, letterSpacing: "0.14em",
                  textTransform: "uppercase", color: "rgba(255,255,255,0.3)",
                  marginBottom: 16,
                }}>{c.statLabel}</div>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "5px 14px", borderRadius: 999,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.35)" }} />
                  <span style={{ fontFamily: SAIRA, fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}>{c.period}</span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
