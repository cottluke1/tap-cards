"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const SERIF = "var(--font-display), Georgia, serif";
const SAIRA = "'Saira', -apple-system, sans-serif";

/* ─── Data ─── */
const LOCATIONS = ["Marro's – Chicago", "Marro's – Oak Park", "Marro's – Evanston"];

const TABLE_DATA = [
  { id: "T1",  taps: 148, reviews: 54, pct: 100 },
  { id: "T2",  taps: 131, reviews: 47, pct: 89  },
  { id: "T4",  taps: 119, reviews: 41, pct: 80  },
  { id: "T7",  taps: 104, reviews: 38, pct: 70  },
  { id: "T3",  taps: 98,  reviews: 33, pct: 66  },
  { id: "T9",  taps: 87,  reviews: 29, pct: 59  },
  { id: "T6",  taps: 76,  reviews: 24, pct: 51  },
  { id: "T11", taps: 68,  reviews: 21, pct: 46  },
  { id: "T5",  taps: 61,  reviews: 18, pct: 41  },
  { id: "T8",  taps: 52,  reviews: 14, pct: 35  },
  { id: "T10", taps: 44,  reviews: 11, pct: 30  },
  { id: "T12", taps: 31,  reviews:  7, pct: 21  },
];

const VELOCITY = [
  { month: "Aug",  reviews: 28  },
  { month: "Sep",  reviews: 44  },
  { month: "Oct",  reviews: 67  },
  { month: "Nov",  reviews: 89  },
  { month: "Dec",  reviews: 103 },
  { month: "Jan",  reviews: 131 },
  { month: "Feb",  reviews: 119 },
  { month: "Mar",  reviews: 152 },
  { month: "Apr",  reviews: 178 },
  { month: "May",  reviews: 194 },
  { month: "Jun",  reviews: 210 },
  { month: "Jul",  reviews: 231 },
];

const STAR_TREND = [
  { month: "Aug", rating: 4.1 },
  { month: "Sep", rating: 4.1 },
  { month: "Oct", rating: 4.2 },
  { month: "Nov", rating: 4.3 },
  { month: "Dec", rating: 4.4 },
  { month: "Jan", rating: 4.5 },
  { month: "Feb", rating: 4.6 },
  { month: "Mar", rating: 4.6 },
  { month: "Apr", rating: 4.7 },
  { month: "May", rating: 4.8 },
  { month: "Jun", rating: 4.8 },
  { month: "Jul", rating: 4.8 },
];

const REVIEWS = [
  {
    id: 1,
    name: "Jessica R.",
    stars: 5,
    time: "2h ago",
    text: "Best carbonara I've had outside Rome. Service was warm without being over the top. We'll be back next week.",
    reply: "Thank you so much, Jessica — that means the world to us. We use imported Pecorino and guanciale for that carbonara, so it's great to know it comes through. See you next week!",
    approved: false,
  },
  {
    id: 2,
    name: "Marcus T.",
    stars: 5,
    time: "5h ago",
    text: "Came for a anniversary dinner. Perfect atmosphere, the tiramisu was unreal. Staff remembered our names by dessert.",
    reply: "Happy anniversary, Marcus! Evenings like that are exactly why we do this. The tiramisu is made fresh every morning — we're glad it landed. Thank you for celebrating with us.",
    approved: false,
  },
  {
    id: 3,
    name: "Priya N.",
    stars: 4,
    time: "Yesterday",
    text: "Great food, slightly long wait on a Tuesday which was surprising. The arancini starter was exceptional though.",
    reply: "Thanks for the honest note, Priya. Tuesday's usually calmer — we had a private event in the back that slowed things. The arancini is a team favorite too. Come back soon and we'll make it up to you.",
    approved: true,
  },
];

const CHIPS = [
  { id: "T1",  status: "active",       lastSeen: "2m ago"    },
  { id: "T2",  status: "active",       lastSeen: "4m ago"    },
  { id: "T3",  status: "active",       lastSeen: "12m ago"   },
  { id: "T4",  status: "active",       lastSeen: "8m ago"    },
  { id: "T5",  status: "active",       lastSeen: "1m ago"    },
  { id: "T6",  status: "active",       lastSeen: "6m ago"    },
  { id: "T7",  status: "active",       lastSeen: "3m ago"    },
  { id: "T8",  status: "active",       lastSeen: "19m ago"   },
  { id: "T9",  status: "active",       lastSeen: "7m ago"    },
  { id: "T10", status: "active",       lastSeen: "11m ago"   },
  { id: "T11", status: "unresponsive", lastSeen: "3 days ago" },
  { id: "T12", status: "active",       lastSeen: "22m ago"   },
];

/* ─── Small helpers ─── */
function StarRow({ n, color = "#facc15" }: { n: number; color?: string }) {
  return (
    <span style={{ display: "inline-flex", gap: 1 }}>
      {[1,2,3,4,5].map((s) => (
        <svg key={s} width="10" height="10" viewBox="0 0 10 10">
          <polygon points="5,1 6.2,3.8 9.5,4 7.2,6 8,9.2 5,7.5 2,9.2 2.8,6 0.5,4 3.8,3.8" fill={s <= n ? color : "rgba(255,255,255,0.12)"} />
        </svg>
      ))}
    </span>
  );
}

/* ─── Line chart (SVG) ─── */
function LineChart({
  data, yMin, yMax, color, fmt,
}: {
  data: { month: string; value: number }[];
  yMin: number; yMax: number;
  color: string;
  fmt?: (v: number) => string;
}) {
  const W = 560; const H = 120; const PAD = { l: 8, r: 8, t: 12, b: 28 };
  const iW = W - PAD.l - PAD.r;
  const iH = H - PAD.t - PAD.b;

  const pts = data.map((d, i) => ({
    x: PAD.l + (i / (data.length - 1)) * iW,
    y: PAD.t + (1 - (d.value - yMin) / (yMax - yMin)) * iH,
    ...d,
  }));

  const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const areaD = `${pathD} L${pts[pts.length - 1].x},${H - PAD.b} L${pts[0].x},${H - PAD.b} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: 120, overflow: "visible" }}>
      <defs>
        <linearGradient id={`grad-${color.replace(/[^a-z]/gi,"")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#grad-${color.replace(/[^a-z]/gi,"")})`} />
      <path d={pathD} stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="2.5" fill={color} opacity={i === pts.length - 1 ? 1 : 0} />
          <text x={p.x} y={H - 6} textAnchor="middle" fill="rgba(255,255,255,0.22)" fontSize="9" fontFamily="Saira, sans-serif">{p.month}</text>
        </g>
      ))}
      {/* Last value label */}
      <text x={pts[pts.length-1].x + 4} y={pts[pts.length-1].y - 6} fill={color} fontSize="10" fontFamily="Saira, sans-serif" fontWeight="600">
        {fmt ? fmt(pts[pts.length-1].value) : pts[pts.length-1].value}
      </text>
    </svg>
  );
}

/* ─── Tabs ─── */
const TABS = ["Overview", "Tables", "Reviews", "Chips"] as const;
type Tab = typeof TABS[number];

/* ─── Main Component ─── */
export function DashboardDemo() {
  const [tab, setTab]       = useState<Tab>("Overview");
  const [location, setLoc]  = useState(0);
  const [reviews, setReviews] = useState(REVIEWS);
  const [approved, setApproved] = useState<Set<number>>(new Set([3]));

  const approveReply = (id: number) => setApproved(prev => new Set([...prev, id]));

  return (
    <section
      id="demo"
      data-section="demo"
      style={{ padding: "100px 24px", background: "#08080a", borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 48 }}
        >
          <p style={{ fontFamily: SAIRA, fontSize: 11, fontWeight: 500, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 14 }}>Dashboard</p>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, color: "white", margin: "0 0 12px" }}>Everything you need to see.</h2>
          <p style={{ fontFamily: SAIRA, fontSize: 14, color: "rgba(255,255,255,0.35)", margin: 0, maxWidth: 420 }}>Your TAP dashboard shows you exactly what's happening — in real time.</p>
        </motion.div>

        {/* Dashboard shell */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            background: "#0f0f12",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          {/* Top bar */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "14px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            background: "#0c0c0f",
          }}>
            {/* Window dots */}
            <div style={{ display: "flex", gap: 6 }}>
              {["#ff5f57","#febc2e","#28c840"].map((c,i) => <div key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: c, opacity: 0.8 }} />)}
            </div>

            {/* Location switcher */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {LOCATIONS.map((loc, i) => (
                <button key={i} onClick={() => setLoc(i)} style={{
                  fontFamily: SAIRA, fontSize: 11, fontWeight: i === location ? 600 : 400,
                  color: i === location ? "white" : "rgba(255,255,255,0.3)",
                  background: i === location ? "rgba(255,255,255,0.1)" : "transparent",
                  border: "none", borderRadius: 6, padding: "4px 10px", cursor: "pointer",
                  transition: "all .15s",
                }}>{loc}</button>
              ))}
            </div>

            <div style={{ fontFamily: SAIRA, fontSize: 11, color: "rgba(255,255,255,0.25)" }}>July 2025</div>
          </div>

          {/* Tab bar */}
          <div style={{
            display: "flex", gap: 0,
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            padding: "0 20px",
          }}>
            {TABS.map((t) => (
              <button key={t} onClick={() => setTab(t)} style={{
                fontFamily: SAIRA, fontSize: 12, fontWeight: tab === t ? 600 : 400,
                color: tab === t ? "white" : "rgba(255,255,255,0.35)",
                background: "transparent", border: "none",
                borderBottom: tab === t ? "2px solid white" : "2px solid transparent",
                padding: "12px 16px", cursor: "pointer",
                transition: "all .15s", marginBottom: -1,
              }}>{t}</button>
            ))}
          </div>

          {/* Tab content */}
          <div style={{ padding: "24px 20px", minHeight: 480 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={tab + location}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
              >

                {/* ── OVERVIEW ── */}
                {tab === "Overview" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    {/* KPI row */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                      {[
                        { label: "Taps this month",  value: "1,247", sub: "+18% vs last month", color: "white"                      },
                        { label: "Reviews generated", value: "424",   sub: "34% conversion rate", color: "rgba(130,200,160,0.9)"    },
                        { label: "Current rating",   value: "4.8★",  sub: "Was 4.1 in August",   color: "rgba(250,204,21,0.9)"     },
                        { label: "Avg taps / day",   value: "40.2",  sub: "Peak: 67 on Saturday", color: "rgba(190,190,190,0.85)"  },
                      ].map((k, i) => (
                        <div key={i} style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          borderRadius: 12, padding: "16px 14px",
                        }}>
                          <div style={{ fontFamily: SAIRA, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: 8 }}>{k.label}</div>
                          <div style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 400, color: k.color, lineHeight: 1, marginBottom: 6 }}>{k.value}</div>
                          <div style={{ fontFamily: SAIRA, fontSize: 10, color: "rgba(255,255,255,0.25)" }}>{k.sub}</div>
                        </div>
                      ))}
                    </div>

                    {/* Charts row */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      {/* Velocity */}
                      <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "16px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
                          <div style={{ fontFamily: SAIRA, fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.6)", letterSpacing: "0.05em" }}>Review velocity</div>
                          <div style={{ fontFamily: SAIRA, fontSize: 10, color: "rgba(255,255,255,0.25)" }}>past 12 months</div>
                        </div>
                        <LineChart
                          data={VELOCITY.map(d => ({ month: d.month, value: d.reviews }))}
                          yMin={0} yMax={250}
                          color="rgba(130,200,160,0.9)"
                          fmt={(v) => `${v}`}
                        />
                      </div>

                      {/* Star trend */}
                      <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "16px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
                          <div style={{ fontFamily: SAIRA, fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.6)", letterSpacing: "0.05em" }}>Google star rating</div>
                          <div style={{ fontFamily: SAIRA, fontSize: 10, color: "rgba(255,255,255,0.25)" }}>past 12 months</div>
                        </div>
                        <LineChart
                          data={STAR_TREND.map(d => ({ month: d.month, value: d.rating }))}
                          yMin={3.8} yMax={5.0}
                          color="rgba(250,204,21,0.85)"
                          fmt={(v) => `${v}★`}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* ── TABLES ── */}
                {tab === "Tables" && (
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                      <p style={{ fontFamily: SAIRA, fontSize: 12, color: "rgba(255,255,255,0.35)", margin: 0 }}>Sorted by total taps · July 2025</p>
                      <p style={{ fontFamily: SAIRA, fontSize: 11, color: "rgba(255,255,255,0.2)", margin: 0 }}>12 tables · 1,019 total taps</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {TABLE_DATA.map((t, i) => (
                        <div key={i} style={{
                          display: "grid", gridTemplateColumns: "48px 1fr 80px 72px",
                          alignItems: "center", gap: 12,
                          padding: "10px 14px",
                          background: "rgba(255,255,255,0.025)",
                          border: "1px solid rgba(255,255,255,0.055)",
                          borderRadius: 10,
                        }}>
                          <div style={{ fontFamily: SAIRA, fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.55)", textAlign: "center" }}>{t.id}</div>
                          <div style={{ position: "relative", height: 4, background: "rgba(255,255,255,0.07)", borderRadius: 2 }}>
                            <div style={{
                              position: "absolute", top: 0, left: 0, bottom: 0,
                              width: `${t.pct}%`,
                              borderRadius: 2,
                              background: t.pct > 70
                                ? "rgba(130,200,160,0.7)"
                                : t.pct > 40
                                ? "rgba(250,204,21,0.6)"
                                : "rgba(255,255,255,0.2)",
                            }} />
                          </div>
                          <div style={{ fontFamily: SAIRA, fontSize: 11, color: "rgba(255,255,255,0.5)", textAlign: "right" }}>{t.taps} taps</div>
                          <div style={{ fontFamily: SAIRA, fontSize: 11, color: "rgba(130,200,160,0.8)", textAlign: "right" }}>{t.reviews} reviews</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── REVIEWS ── */}
                {tab === "Reviews" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {/* Notification feed header */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(130,200,160,0.9)", boxShadow: "0 0 8px rgba(130,200,160,0.5)" }} />
                      <span style={{ fontFamily: SAIRA, fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em" }}>3 new reviews today · AI replies ready</span>
                    </div>

                    {REVIEWS.map((r) => {
                      const isApproved = approved.has(r.id);
                      return (
                        <div key={r.id} style={{
                          background: "rgba(255,255,255,0.025)",
                          border: `1px solid ${isApproved ? "rgba(130,200,160,0.2)" : "rgba(255,255,255,0.07)"}`,
                          borderRadius: 14, padding: "18px 18px",
                          transition: "border-color .3s",
                        }}>
                          {/* Review header */}
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <div style={{
                                width: 32, height: 32, borderRadius: "50%",
                                background: `hsl(${r.id * 80},30%,30%)`,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontFamily: SAIRA, fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.6)",
                              }}>{r.name[0]}</div>
                              <div>
                                <div style={{ fontFamily: SAIRA, fontSize: 12, fontWeight: 600, color: "white" }}>{r.name}</div>
                                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                                  <StarRow n={r.stars} color="#facc15" />
                                  <span style={{ fontFamily: SAIRA, fontSize: 10, color: "rgba(255,255,255,0.25)" }}>{r.time}</span>
                                </div>
                              </div>
                            </div>
                            {isApproved && (
                              <div style={{
                                fontFamily: SAIRA, fontSize: 10, letterSpacing: "0.1em",
                                color: "rgba(130,200,160,0.9)",
                                background: "rgba(130,200,160,0.1)",
                                border: "1px solid rgba(130,200,160,0.2)",
                                padding: "3px 10px", borderRadius: 999,
                              }}>Published</div>
                            )}
                          </div>

                          {/* Review text */}
                          <p style={{ fontFamily: SAIRA, fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, margin: "0 0 14px" }}>{r.text}</p>

                          {/* AI reply block */}
                          <div style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            borderRadius: 10, padding: "12px 14px",
                          }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M6 1L7.2 4.2H10.5L7.9 6.2L8.9 9.5L6 7.6L3.1 9.5L4.1 6.2L1.5 4.2H4.8L6 1Z" fill="rgba(190,190,190,0.6)"/>
                              </svg>
                              <span style={{ fontFamily: SAIRA, fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>AI-suggested reply</span>
                            </div>
                            <p style={{ fontFamily: SAIRA, fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, margin: "0 0 12px" }}>{r.reply}</p>
                            {!isApproved ? (
                              <div style={{ display: "flex", gap: 8 }}>
                                <button
                                  onClick={() => approveReply(r.id)}
                                  style={{
                                    fontFamily: SAIRA, fontSize: 11, fontWeight: 600,
                                    color: "#08080a", background: "white",
                                    border: "none", borderRadius: 6, padding: "6px 16px",
                                    cursor: "pointer",
                                  }}
                                >Approve & post</button>
                                <button style={{
                                  fontFamily: SAIRA, fontSize: 11,
                                  color: "rgba(255,255,255,0.35)",
                                  background: "transparent",
                                  border: "1px solid rgba(255,255,255,0.1)",
                                  borderRadius: 6, padding: "6px 14px", cursor: "pointer",
                                }}>Edit</button>
                              </div>
                            ) : (
                              <div style={{ fontFamily: SAIRA, fontSize: 11, color: "rgba(130,200,160,0.7)" }}>✓ Reply posted to Google</div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* ── CHIPS ── */}
                {tab === "Chips" && (
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                      <div style={{ display: "flex", gap: 16 }}>
                        {[
                          { label: "11 Active",       color: "rgba(130,200,160,0.9)" },
                          { label: "1 Unresponsive",  color: "rgba(250,120,80,0.85)" },
                        ].map((s, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <div style={{ width: 7, height: 7, borderRadius: "50%", background: s.color, boxShadow: `0 0 6px ${s.color}` }} />
                            <span style={{ fontFamily: SAIRA, fontSize: 11, color: "rgba(255,255,255,0.45)" }}>{s.label}</span>
                          </div>
                        ))}
                      </div>
                      <span style={{ fontFamily: SAIRA, fontSize: 10, color: "rgba(255,255,255,0.2)" }}>Last synced 2m ago</span>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
                      {CHIPS.map((chip, i) => {
                        const active = chip.status === "active";
                        return (
                          <div key={i} style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            padding: "12px 14px",
                            background: active ? "rgba(130,200,160,0.04)" : "rgba(250,120,80,0.05)",
                            border: `1px solid ${active ? "rgba(130,200,160,0.12)" : "rgba(250,120,80,0.2)"}`,
                            borderRadius: 10,
                          }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <div style={{
                                width: 8, height: 8, borderRadius: "50%",
                                background: active ? "rgba(130,200,160,0.9)" : "rgba(250,120,80,0.9)",
                                boxShadow: `0 0 6px ${active ? "rgba(130,200,160,0.5)" : "rgba(250,120,80,0.5)"}`,
                              }} />
                              <span style={{ fontFamily: SAIRA, fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.65)" }}>Table {chip.id.replace("T","")}</span>
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <div style={{ fontFamily: SAIRA, fontSize: 10, color: active ? "rgba(130,200,160,0.7)" : "rgba(250,120,80,0.8)", marginBottom: 1 }}>
                                {active ? "Active" : "Unresponsive"}
                              </div>
                              <div style={{ fontFamily: SAIRA, fontSize: 9, color: "rgba(255,255,255,0.2)" }}>{chip.lastSeen}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Alert for dead chip */}
                    <div style={{
                      marginTop: 16, padding: "14px 16px",
                      background: "rgba(250,120,80,0.06)",
                      border: "1px solid rgba(250,120,80,0.2)",
                      borderRadius: 10,
                      display: "flex", alignItems: "flex-start", gap: 12,
                    }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(250,120,80,0.15)", border: "1px solid rgba(250,120,80,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                        <span style={{ fontSize: 10, color: "rgba(250,120,80,0.9)" }}>!</span>
                      </div>
                      <div>
                        <div style={{ fontFamily: SAIRA, fontSize: 12, fontWeight: 600, color: "rgba(250,120,80,0.9)", marginBottom: 3 }}>Table 11 chip unresponsive for 3 days</div>
                        <div style={{ fontFamily: SAIRA, fontSize: 11, color: "rgba(255,255,255,0.3)", lineHeight: 1.5 }}>We've detected no taps from T11. This is likely physical damage or displacement. A replacement chip ships free — <span style={{ color: "rgba(190,190,190,0.7)", cursor: "pointer", textDecoration: "underline" }}>request one here</span>.</div>
                      </div>
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
