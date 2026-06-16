"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const sections = [
  { label: "Cards",        id: "cards"        },
  { label: "How It Works", id: "how-it-works" },
  { label: "Results",      id: "results"      },
  { label: "Demo",         id: "demo"         },
  { label: "Pricing",      id: "pricing"      },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      const els = document.querySelectorAll("[data-section]");
      els.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          setActiveSection(el.getAttribute("data-section") || "");
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        height: 64,
        background: scrolled ? "rgba(5,5,5,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
        transition: "background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease",
      }}
    >
      <div className="flex items-center justify-between h-full px-8 max-w-7xl mx-auto">
        {/* Logo */}
        <span
          style={{
            fontFamily: "'Futura', 'Century Gothic', 'Trebuchet MS', sans-serif",
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: "0.35em",
            color: "white",
          }}
        >
          TAP
        </span>

        {/* Center nav — BILT style pills that appear on scroll */}
        <AnimatePresence>
          {scrolled && (
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute left-1/2 -translate-x-1/2 flex items-center"
            >
              <div
                className="flex items-center gap-1 rounded-full px-1.5 py-1"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {sections.map(({ label, id }) => {
                  const active = activeSection === id;
                  return (
                    <button
                      key={id}
                      onClick={() => scrollTo(id)}
                      style={{
                        fontFamily: "'Futura', 'Century Gothic', sans-serif",
                        fontSize: 13,
                        fontWeight: active ? 600 : 400,
                        letterSpacing: "0.05em",
                        color: active ? "white" : "rgba(255,255,255,0.45)",
                        background: active ? "rgba(255,255,255,0.12)" : "transparent",
                        border: "none",
                        borderRadius: 999,
                        padding: "6px 16px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

        {/* CTA */}
        <button
          style={{
            fontFamily: "'Futura', 'Century Gothic', sans-serif",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: "#050505",
            background: "white",
            border: "none",
            borderRadius: 999,
            padding: "10px 24px",
            cursor: "pointer",
          }}
        >
          Order Now
        </button>
      </div>
    </header>
  );
}
