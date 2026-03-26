import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Sun, Layers, Zap, Cpu  } from "lucide-react";
import { MdOutlineEnergySavingsLeaf } from "react-icons/md";
import { TbBuildingFactory } from "react-icons/tb";
import { FaSolarPanel } from "react-icons/fa6";
import { LuTrees } from "react-icons/lu";
import { IconType } from "react-icons";

// ── DATA ──────────────────────────────────────────────────────────────────────

const stats: { value: number; decimal: number; suffix: string; label: string; icon: IconType }[] = [
    { value: 3,     decimal: 0, suffix: "",           label: "proyek",        icon: FaSolarPanel },
    { value: 10,    decimal: 0, suffix: " kWh",       label: "energi hijau",  icon: MdOutlineEnergySavingsLeaf },
    { value: 11.49, decimal: 2, suffix: " ton/years", label: "CO₂ terhindar", icon: TbBuildingFactory },
    { value: 523,   decimal: 0, suffix: "",           label: "pohon ditanam", icon: LuTrees  },
];

const partners = [
    { name: "UGM",                  logo: "/images/partners/ugm.png" },
    { name: "Pertamina",            logo: "/images/partners/pertamina.png" },
    { name: "Pertamina Foundation", logo: "/images/partners/pertamina_foundation.png" },
    { name: "Pertamuda",            logo: "/images/partners/pertamuda.png" },
    { name: "Nexus",                logo: "/images/partners/nexus.png" },
    { name: "Shell",                logo: "/images/partners/shell.png" },
    { name: "Suzuki",               logo: "/images/partners/suzuki.png" },
    { name: "Instellar",            logo: "/images/partners/instellar.png" },
    { name: "Komdigi",              logo: "/images/partners/komdigi.png" },
    { name: "Astra Innovlab",       logo: "/images/partners/astra_innovlab.png" },
    { name: "DIY",                  logo: "/images/partners/DIY.png" },
    { name: "Sonus",                logo: "/images/partners/sonushub.png" },
    { name: "Wakaf Energi",         logo: "/images/partners/wakaf_energi.png" },
];

const products = [
    {
        id: "ongrid",
        label: "ONGRID",
        title: "Panel Surya Monofacial",
        subtitle: "Pilihan Terpercaya & Terjangkau",
        desc: "Teknologi panel surya paling populer di Indonesia. Panel ini menangkap sinar matahari dari sisi depan dengan efisiensi tinggi, tersedia dalam berbagai ukuran daya yang menyesuaikan kebutuhan listrik Anda.",
        photo: "/images/products/mono1.jpg",
        icon: Sun,
    },
    {
        id: "offgrid",
        label: "OFF GRID",
        title: "Panel Surya Bifacial",
        subtitle: "Produksi Listrik Ekstra hingga 30%",
        desc: "Panel surya bifacial menyerap cahaya dari sisi depan dan belakang, memanfaatkan pantulan cahaya untuk menghasilkan hingga 30% energi lebih banyak dibanding panel monofacial.",
        photo: "/images/products/bifacial1.png",
        icon: Layers,
    },
    {
        id: "hybrid",
        label: "HYBRID",
        title: "Panel Surya Rooftile",
        subtitle: "Elegan & Terintegrasi",
        desc: "Building Integrated Photovoltaic (BIPV) menggantikan atap genteng konvensional. Tampilan seamless, modern, dan estetis — atap Anda langsung menjadi sumber energi hijau.",
        photo: "/images/products/rooftile1.png",
        icon: Zap,
    },
    {
        id: "smartcontrol",
        label: "SMART CONTROL",
        title: "Smart Control System",
        subtitle: "Pantau & Kontrol Real-Time 24/7",
        desc: "Kombinasi inverter canggih, baterai, dan sistem IoT yang membuat PLTS Anda lebih pintar, efisien, dan mandiri. Dapat disesuaikan dengan kebutuhan dan keinginan Anda.",
        photo: "/images/products/smartcontrol.jpg",
        icon: Cpu,
    },
];

const certs = [
    {
        title: "NIB",
        desc: "Sertifikat Perizinan Usaha Berbasis Risiko yang valid dan diakui pemerintah.",
        logo: "/images/sertifikat/nib.jpg",
    },
    {
        title: "Sertifikat SNI",
        desc: "Lulus uji ketahanan sertifikasi standar nasional Indonesia.",
        logo: "/images/sertifikat/sni.jpg",
    },
];

// ── COUNTING HOOK ─────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, decimal = 0, started = false) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!started) return;
        let startTime: number | null = null;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(parseFloat((eased * target).toFixed(decimal)));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [target, duration, decimal, started]);

    return count;
}

// ── STAT CARD ─────────────────────────────────────────────────────────────────
function StatCard({ stat, started }: { stat: typeof stats[0]; started: boolean }) {
    const count = useCountUp(stat.value, 1800, stat.decimal, started);
    const display = stat.decimal > 0 ? count.toFixed(stat.decimal) : Math.floor(count).toString();
    const Icon = stat.icon;

    return (
        <div
            className="flex items-center gap-3 px-4 py-4 rounded-xl"
            style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
        >
            {/* Icon */}
            <div
                className="flex-shrink-0 w-7 h-7 sm:w-10 sm:h-10 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,215,0,0.18)" }}
            >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD700]" />
            </div>

            {/* Text */}
            <div className="text-left">
                <div className="flex items-baseline gap-0.5">
                    <span className="text-sm sm:text-xl font-extrabold text-white leading-none">
                        {display}
                    </span>
                    {stat.suffix && (
                        <span className="text-xs font-bold text-white ml-1 leading-none">
                            {stat.suffix.trim()}
                        </span>
                    )}
                </div>
                <div className="text-xs text-white/60 mt-1 leading-none">{stat.label}</div>
            </div>
        </div>
    );
}

// ── STATS ROW (with intersection observer trigger) ────────────────────────────
function StatsRow() {
    const [started, setStarted] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStarted(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-auto"
        >
            {stats.map((s, i) => (
                <StatCard key={i} stat={s} started={started} />
            ))}
        </div>
    );
}

// ── MARQUEE ───────────────────────────────────────────────────────────────────
// Teknik: fixed width per slot + pixel translation
// Tidak bergantung pada ukuran gambar → tidak ada layout shift → benar-benar infinity
const ITEM_W   = 148; // px — lebar slot tiap logo  (ubah jika perlu)
const ITEM_GAP = 54;  // px — jarak antar slot       (ubah jika perlu)
const SET_PX   = partners.length * (ITEM_W + ITEM_GAP); // lebar tepat satu set

function PartnerSlot({ p }: { p: typeof partners[0] }) {
    const [err, setErr] = useState(false);
    return (
        <div
            className="flex-shrink-0 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-300"
            style={{ width: `${ITEM_W}px`, height: "96px", marginRight: `${ITEM_GAP}px` }}
        >
            {!err ? (
                <img
                    src={p.logo}
                    alt={p.name}
                    style={{ maxHeight: "64px", maxWidth: `${ITEM_W}px`, objectFit: "contain" }}
                    onError={() => setErr(true)}
                />
            ) : (
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", textAlign: "center", lineHeight: "1.3" }}>
                    {p.name}
                </span>
            )}
        </div>
    );
}

function Marquee() {
    const duration = partners.length * 2.8; // detik

    return (
        <div className="overflow-hidden relative w-full" style={{ height: "96px" }}>
            {/* Fade kiri */}
            <div className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to right, white 50%, transparent)" }} />
            {/* Fade kanan */}
            <div className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to left, white 50%, transparent)" }} />

            {/* Track — lebar pasti 2× set, geser tepat 1 set (px) lalu reset — seamless */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    display: "flex",
                    width: `${SET_PX * 2}px`,
                    willChange: "transform",
                    animation: `mq-infinite ${duration}s linear infinite`,
                }}
            >
                {[...partners, ...partners].map((p, i) => (
                    <PartnerSlot key={i} p={p} />
                ))}
            </div>

            <style>{`
                @keyframes mq-infinite {
                    from { transform: translateX(0px); }
                    to   { transform: translateX(-${SET_PX}px); }
                }
            `}</style>
        </div>
    );
}

// ── PRODUCT SLIDER ────────────────────────────────────────────────────────────
function ProductSlider() {
    const [active, setActive] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const startTimer = () => {
        timerRef.current = setInterval(() => {
            setActive((prev) => (prev + 1) % products.length);
        }, 4000);
    };

    useEffect(() => {
        startTimer();
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, []);

    const handleTab = (i: number) => {
        if (timerRef.current) clearInterval(timerRef.current);
        setActive(i);
        startTimer();
    };

    const p = products[active];
    const Icon = p.icon;

    return (
        <div>
            <div className="grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-lg border border-[#1a2744]/10 bg-[#1a2744]">
                <div className="flex flex-col justify-between p-8 sm:p-10">
                    <div>
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-9 h-9 rounded-xl bg-[#FFD700]/20 flex items-center justify-center">
                                <Icon className="w-4 h-4 text-[#FFD700]" />
                            </div>
                            <span className="text-xs font-bold tracking-widest text-[#FFD700] uppercase">{p.label}</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug mb-2">{p.title}</h3>
                        <p className="text-[#FFD700]/80 text-sm font-semibold mb-4">{p.subtitle}</p>
                        <div className="bg-[#FFD700]/10 border border-[#FFD700]/20 rounded-2xl p-5 mb-6">
                            <p className="text-sm text-white/80 leading-relaxed">
                                Temukan bagaimana teknologi surya inovatif kami mengubah lanskap energi terbarukan.
                            </p>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                    </div>
                    <Link
                        to="/product"
                        className="mt-6 inline-flex items-center gap-2 bg-[#FFD700] hover:bg-[#FFD700]/80 text-gray-900 font-bold text-sm px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105 no-underline w-max"
                    >
                        Selengkapnya <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
                <div className="relative bg-[#0f1a30] min-h-[240px] md:min-h-0 flex items-center justify-center overflow-hidden">
                    <img
                        key={p.id}
                        src={p.photo}
                        alt={p.title}
                        className="w-full h-full object-cover absolute inset-0"
                        style={{ transition: "opacity 0.5s ease" }}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#1a2744]/40" />
                </div>
            </div>

            <div className="flex gap-0 mt-4 border-b border-gray-200">
                {products.map((prod, i) => (
                    <button
                        key={prod.id}
                        onClick={() => handleTab(i)}
                        className={`relative flex-1 text-xs font-bold tracking-wider uppercase pb-3 pt-2 transition-colors duration-200 ${
                            active === i ? "text-[#1a2744]" : "text-gray-400 hover:text-gray-600"
                        }`}
                    >
                        {prod.label}
                        {active === i && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1a2744] rounded-full" />}
                    </button>
                ))}
            </div>

            <div className="h-0.5 bg-gray-100 rounded-full mt-0 overflow-hidden">
                <div
                    key={active}
                    className="h-full bg-[#FFD700] rounded-full"
                    style={{ animation: "progress 4s linear forwards" }}
                />
                <style>{`@keyframes progress { from { width: 0%; } to { width: 100%; } }`}</style>
            </div>
        </div>
    );
}

// ── HOME PAGE ─────────────────────────────────────────────────────────────────
export default function Home() {
    return (
        <div className="bg-white text-gray-900">

            {/* ── HERO ── */}
            <section className="relative min-h-screen flex flex-col items-center justify-center text-center text-white overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/hero-bg.png')" }}
                />
                <div className="absolute inset-0 bg-gray-900/20" />

                <div className="relative z-10 max-w-4xl mx-auto px-8 flex flex-col items-center">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-semibold mb-5 text-white leading-snug">
                        Let's Start the Green Energy Era{" "}
                        with <span className="text-[#FFD700] font-bold">Gepo Energy</span>
                    </h1>
                    <p className="text-white text-base sm:text-lg max-w-3xl mb-9 leading-relaxed">
                        Solusi energi surya yang efisien, ramah lingkungan, dan terjangkau untuk masa depan energi Indonesia yang berkelanjutan
                    </p>
                    <Link
                        to="/product"
                        className="bg-black hover:bg-[#FFD700] text-white hover:text-black font-semibold text-sm sm:text-sm tracking-widest uppercase px-8 py-5 rounded-full transition-all duration-300 no-underline"
                    >
                        Jelajahi Solusi Kami
                    </Link>

                    {/* ── STATS CARDS ── */}
                    <StatsRow />
                </div>
            </section>

            {/* ── PARTNER ── */}
            <section className="py-14 sm:py-16 px-8">
                <p className="text-center text-2xl sm:text-3xl font-bold text-black mb-16 tracking-tight">
                    Partner & <span className="text-[#FFD700] font-bold">Kolaborasi</span>
                </p>
                <Marquee />
            </section>

            {/* ── TENTANG GEPO ENERGY ── */}
            <section className="py-12 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 sm:gap-20 items-center">
                        <div>
                            <span className="inline-flex items-center gap-2 bg-[#1a2744] text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
                                <span>⚡</span> Tentang Gepo Energy
                            </span>
                            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-5">
                                Gepo Energy menghadirkan solusi energi terbarukan dengan panel surya inovatif, sekaligus{" "}
                                <span className="text-[#1a2744]">menghemat biaya listrik anda.</span>
                            </h2>
                            <p className="text-gray-500 text-base leading-relaxed mb-8">
                                Gepo Energy adalah perusahaan EPC dan O&M energi surya di Indonesia yang didirikan tahun 2023. Kami merancang dan menghadirkan sistem energi surya yang andal, efisien, serta berorientasi kinerja jangka panjang — membantu klien menurunkan biaya energi dan mencapai tujuan keberlanjutan ESG.
                            </p>
                            <Link
                                to="/about"
                                className="inline-flex items-center gap-2 bg-[#1a2744] hover:bg-[#1a2744]/80 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 no-underline text-sm"
                            >
                                Selengkapnya <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="rounded-3xl overflow-hidden bg-gray-100 aspect-[4/3] shadow-xl">
                                <img
                                    src="/images/about-illustration.jpg"
                                    alt="Tentang Gepo Energy"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        const el = e.target as HTMLImageElement;
                                        el.style.display = "none";
                                        if (el.parentElement) {
                                            el.parentElement.style.background = "#f3f4f6";
                                            el.parentElement.style.display = "flex";
                                            el.parentElement.style.alignItems = "center";
                                            el.parentElement.style.justifyContent = "center";
                                        }
                                    }}
                                />
                            </div>
                            <div className="absolute -top-4 -right-4 bg-[#FFD700] text-gray-900 text-xs font-extrabold px-4 py-2 rounded-full shadow-lg">
                                Energi Surya ☀️
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── PRODUK ── */}
            <section className="py-20 sm:py-28 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
                        <div>
                            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#FFD700] bg-[#FFD700]/10 px-3 py-1 rounded-full mb-4">
                                Produk Kami
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Our Solutions</h2>
                            <p className="mt-2 text-gray-500 text-base max-w-md">
                                Teknologi unggulan yang dapat menyesuaikan kebutuhan listrik Anda
                            </p>
                        </div>
                        <Link
                            to="/product"
                            className="inline-flex items-center gap-2 border-2 border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900 font-bold text-sm px-5 py-2.5 rounded-full transition-all duration-300 no-underline flex-shrink-0"
                        >
                            Semua Produk <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <ProductSlider />
                </div>
            </section>

            {/* ── SERTIFIKASI & LEGALITAS ── */}
            <section className="py-20 sm:py-28 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
                        <span className="font-extrabold">Tersertifikasi</span>{" "}
                        <span className="font-light text-gray-500">& Legal</span>
                    </h2>
                    <p className="text-gray-500 mb-12 max-w-md mx-auto">
                        Beroperasi dengan standar hukum dan mutu yang terverifikasi
                    </p>
                    <div className="grid sm:grid-cols-2 gap-6 text-left">
                        {certs.map((cert, i) => (
                            <div key={i} className="flex items-center gap-6 bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
                                <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                                    <img
                                        src={cert.logo}
                                        alt={cert.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            const el = e.target as HTMLImageElement;
                                            el.style.display = "none";
                                            if (el.parentElement) el.parentElement.textContent = cert.title;
                                        }}
                                    />
                                </div>
                                <div>
                                    <h3 className="font-extrabold text-gray-900 text-lg mb-1">{cert.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{cert.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8">
                        <Link
                            to="/about"
                            className="inline-flex items-center gap-2 bg-[#FFD700] hover:bg-[#FFD700]/80 text-gray-900 font-bold px-7 py-3 rounded-full transition-all duration-300 hover:scale-105 no-underline text-sm"
                        >
                            Tentang Gepo Energy
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── CTA BANNER ── */}
            <section className="relative py-28 sm:py-36 text-white text-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/cta-solar-bg.jpg')" }}
                />
                <div className="absolute inset-0 bg-gray-900/65" />
                <div className="relative z-10 max-w-2xl mx-auto px-4">
                    <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-8">
                        Beralih ke Energi Hijau Bersama Gepo Energy
                    </h2>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 bg-[#FFD700] hover:bg-[#FFD700]/80 text-gray-900 font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 no-underline text-base"
                    >
                        Hubungi Kami
                    </Link>
                </div>
            </section>

        </div>
    );
}