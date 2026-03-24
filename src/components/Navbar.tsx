import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useLang, type Lang } from "../context/LanguageContext";

// ── NAV ITEMS (bilingual) ─────────────────────────────────────────────────────
const navItems = [
  { to: "/",        ID: "Beranda",          EN: "Home"       },
  { to: "/about",   ID: "Tentang Kami",     EN: "About Us"   },
  { to: "/product", ID: "Produk & Layanan", EN: "Products"   },
  { to: "/project", ID: "Proyek",           EN: "Projects"   },
  { to: "/contact", ID: "Kontak",           EN: "Contact"    },
];

// ── LANG DROPDOWN (komponen tersendiri dengan ref-nya sendiri) ────────────────
function LangDropdown({ scrolled }: { scrolled: boolean }) {
  const { lang, setLang } = useLang();
  const [open, setOpen]   = useState(false);
  const ref               = useRef<HTMLDivElement>(null);

  // Tutup kalau klik di luar — pakai 'click' bukan 'mousedown'
  // agar tidak konflik dengan event klik pilihan bahasa
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    // setTimeout agar handler tidak langsung trigger saat tombol diklik
    const id = setTimeout(() => document.addEventListener("click", handler), 0);
    return () => {
      clearTimeout(id);
      document.removeEventListener("click", handler);
    };
  }, [open]);

  const select = (l: Lang) => {
    setLang(l);
    setOpen(false);
  };

  const triggerStyle = {
    color:  scrolled ? "#4b5563" : "rgba(255,255,255,0.90)",
    border: scrolled ? "1px solid rgba(0,0,0,0.12)" : "1px solid rgba(255,255,255,0.35)",
    fontWeight: 600,
  };

  return (
    <div ref={ref} className="relative">
      {/* Tombol trigger */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all duration-300 bg-transparent"
        style={triggerStyle}
      >
        {lang}
        <ChevronDown
          className="w-3 h-3 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 mt-2 w-36 rounded-2xl overflow-hidden shadow-2xl z-[100]"
          style={{
            background: "rgba(255,255,255,0.98)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          {(["ID", "EN"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => select(l)}
              className="w-full text-left px-4 py-3 transition-colors duration-150 hover:bg-gray-50 flex flex-col gap-0.5"
            >
              <span className="text-xs font-bold text-gray-400">
                {l === "ID" ? "ID" : "GB"}
              </span>
              <span
                className="text-sm font-bold"
                style={{ color: lang === l ? "#111827" : "#6b7280" }}
              >
                {l === "ID" ? "Indonesia" : "English"}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── NAVBAR ────────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const location                     = useLocation();
  const { lang }                     = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    document.body.style.overflow = "";
  }, [location.pathname]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => {
      document.body.style.overflow = !prev ? "hidden" : "";
      return !prev;
    });
  }, []);

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  const getPillStyle = (active: boolean) => {
    if (active) return {
      background: scrolled ? "#ffd700" : "#ffffff",
      color: "#000000",
      border: scrolled ? "1px solid #ffd700" : "1px solid rgba(255,255,255,1)",
      fontWeight: 600,
      boxShadow: "0 1px 6px rgba(0,0,0,0.10)",
    };
    if (scrolled) return {
      background: "transparent",
      color: "#4b5563",
      border: "1px solid rgba(0,0,0,0.12)",
      fontWeight: 500,
      boxShadow: "none",
    };
    return {
      background: "transparent",
      color: "rgba(255,255,255,0.90)",
      border: "1px solid rgba(255,255,255,0.35)",
      fontWeight: 500,
      boxShadow: "none",
    };
  };

  return (
    <nav
      className="w-full fixed top-0 z-50 transition-all duration-500"
      style={{
        background:     scrolled ? "#ffffff" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom:   scrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
        boxShadow:      scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
      }}
      role="navigation"
      aria-label="Main Navigation"
    >

      <div className="px-4 sm:px-6 lg:px-10 max-w-screen mx-auto">
        <div className="flex items-center justify-between h-18 sm:h-20">

          {/* ── Logo: putih saat transparan, hitam saat scroll ── */}
          <Link to="/" aria-label="Home" className="no-underline flex-shrink-0">
            <img
              className="h-8 sm:h-10 w-auto transition-all duration-500"
              src={
                scrolled
                  ? "/images/logo/logo-tagline-black.png"
                  : "/images/logo/logo-tagline-white.png"
              }
              alt="Gepo Energy Logo"
              loading="eager"
            />
          </Link>

          {/* ── Desktop Nav pills ── */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={active ? "page" : undefined}
                  className="no-underline px-4 py-1.5 rounded-full text-sm transition-all duration-300"
                  style={getPillStyle(active)}
                  onMouseEnter={(e) => {
                    if (!active) {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = scrolled ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.15)";
                      el.style.color = scrolled ? "#111827" : "#ffffff";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      const el = e.currentTarget as HTMLElement;
                      const s = getPillStyle(false);
                      el.style.background = s.background;
                      el.style.color = s.color;
                    }
                  }}
                >
                  {item[lang]}
                </Link>
              );
            })}
          </div>

          {/* ── Right: Lang dropdown (desktop) ── */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <LangDropdown scrolled={scrolled} />
          </div>

          {/* ── Mobile: lang + hamburger ── */}
          <div className="md:hidden flex items-center gap-2">
            <LangDropdown scrolled={scrolled} />
            <button
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
              className="p-2 rounded-lg"
              style={{ color: scrolled ? "#374151" : "#ffffff" }}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isMenuOpen ? "400px" : "0px",
          opacity: isMenuOpen ? 1 : 0,
          background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(17,24,39,0.93)",
          backdropFilter: "blur(12px)",
          borderTop: scrolled ? "1px solid rgba(0,0,0,0.06)" : "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="px-4 py-4 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 no-underline"
                style={{
                  background: active ? "#FFD700" : "transparent",
                  color: active ? "#111827" : scrolled ? "#374151" : "rgba(255,255,255,0.85)",
                  fontWeight: active ? 600 : 500,
                  border: active ? "none" : scrolled ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(255,255,255,0.12)",
                  marginBottom: "4px",
                }}
              >
                {item[lang]}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}