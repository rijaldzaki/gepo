import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { MdOutlineEnergySavingsLeaf } from "react-icons/md";
import { TbBuildingFactory } from "react-icons/tb";
import { FaSolarPanel } from "react-icons/fa6";
import { LuTrees } from "react-icons/lu";
import { IconType } from "react-icons";

// DATA

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

// Tambah data ini di bagian DATA
const homeProducts = [
    {
        id: "monofacial",
        label: "Monofacial",
        num: "01",
        title: "Panel Surya Monofacial",
        subtitle: "Pilihan Terpercaya & Terjangkau",
        desc: "Teknologi panel surya paling populer di Indonesia dengan efisiensi tinggi dan harga terjangkau.",
        photo: "/images/products/monofacial1.jpg",
        accent: "#FFD700",
    },
    {
        id: "bifacial",
        label: "Bifacial",
        num: "02",
        title: "Panel Surya Bifacial",
        subtitle: "Produksi Listrik Ekstra hingga 30%",
        desc: "Menyerap cahaya dari dua sisi untuk menghasilkan energi hingga 30% lebih banyak.",
        photo: "/images/products/bifacial1.png",
        accent: "#E38E00",
    },
    {
        id: "rooftile",
        label: "Rooftile",
        num: "03",
        title: "Panel Surya Rooftile",
        subtitle: "Elegan & Terintegrasi",
        desc: "Atap genteng sekaligus pembangkit listrik — estetis, modern, dan fungsional.",
        photo: "/images/products/rooftile1.png",
        accent: "#D25738",
    },
    {
        id: "smartcontrol",
        label: "Smart Control",
        num: "04",
        title: "Smart Control System",
        subtitle: "Pantau & Kontrol Real-Time 24/7",
        desc: "Sistem IoT canggih untuk memantau dan mengelola PLTS Anda dari mana saja.",
        photo: "/images/products/smart-control.png",
        accent: "#9D3115",
    },
];

const homeServices = [
    { label: "Studi & Desain",       photo: "/images/products/study1.png" },
    { label: "Instalasi & Uji",      photo: "/images/products/installation1.jpeg" },
    { label: "Operasi & Pemeliharaan", photo: "/images/products/operational1.png" },
];

// COUNTING HOOK
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

// STAT CARD
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
            <div
                className="flex-shrink-0 w-7 h-7 sm:w-10 sm:h-10 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,215,0,0.18)" }}
            >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD700]" />
            </div>

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

// STATS ROW
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
            className="flex-shrink-0 flex items-center justify-center opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300"
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

function ProductSlider() {
    const [active, setActive] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const startTimer = () => {
        timerRef.current = setInterval(() => {
            setActive((prev) => (prev + 1) % homeProducts.length);
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

    const p = homeProducts[active];

    return (
        <div className="rounded-3xl overflow-hidden bg-black">
            {/* ── Main area ── */}
            <div className="flex flex-col md:flex-row min-h-[380px]">
                {/* Kiri — Info produk */}
                <div className="relative flex flex-col justify-between p-8 sm:p-10 md:flex-1 bg-black">
                    {/* Subtle background foto — opacity sangat rendah sebagai tekstur */}
                    {homeProducts.map((prod, i) => (
                        <img
                            key={prod.id}
                            src={prod.photo}
                            alt={prod.title}
                            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                            style={{
                                opacity: active === i ? 0.08 : 0,
                                transition: "opacity 0.8s ease",
                            }}
                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/80 pointer-events-none" />

                    <div className="relative z-10">
                        {/* Nomor & label */}
                        <div className="flex items-center gap-3 mb-6">
                            <span
                                className="text-5xl font-extrabold leading-none select-none"
                                style={{ color: p.accent + "30" }}
                            >
                                {p.num}
                            </span>
                            <span
                                className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                                style={{ background: p.accent + "20", color: p.accent, border: `1px solid ${p.accent}40` }}
                            >
                                {p.label}
                            </span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug mb-3">
                            {p.title}
                        </h3>
                        <p className="text-sm font-semibold mb-4" style={{ color: p.accent }}>
                            {p.subtitle}
                        </p>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                            {p.desc}
                        </p>
                    </div>
                </div>

                {/* Kanan — Foto 1:1 */}
                <div className="relative md:w-80 lg:w-96 aspect-square md:aspect-auto flex-shrink-0 bg-gray-900 flex items-center justify-center p-5">
                    {homeProducts.map((prod, i) => (
                        <img
                            key={prod.id}
                            src={prod.photo}
                            alt={prod.title}
                            className="rounded-2xl object-contain w-full h-full"
                            style={{
                                opacity: active === i ? 1 : 0,
                                transition: "",
                                position: active === i ? "relative" : "absolute",
                                maxWidth: "100%",
                                maxHeight: "100%",
                            }}
                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />
                    ))}
                    {/* Subtle gradient overlay kiri */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: `linear-gradient(to right, black 0%, transparent 30%), linear-gradient(to top, ${p.accent}15 0%, transparent 50%)` }}
                    />
                </div>

            </div>

            {/* ── Tab bar bawah ── */}
            <div
                className="flex border-t"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
                {homeProducts.map((prod, i) => (
                    <button
                        key={prod.id}
                        onClick={() => handleTab(i)}
                        className="relative flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300"
                        style={{
                            color: active === i ? prod.accent : "rgba(255,255,255,0.35)",
                            background: active === i ? "rgba(255,255,255,0.05)" : "transparent",
                        }}
                    >
                        {prod.label}
                        {/* Progress bar */}
                        {active === i && (
                            <span
                                key={active}
                                className="absolute bottom-0 left-0 h-0.5 rounded-full"
                                style={{
                                    background: prod.accent,
                                    animation: "progress-bar 4s linear forwards",
                                }}
                            />
                        )}
                    </button>
                ))}
                <style>{`
                    @keyframes progress-bar {
                        from { width: 0%; }
                        to   { width: 100%; }
                    }
                `}</style>
            </div>
        </div>
    );
}

// ── HOME PAGE ─────────────────────────────────────────────────────────────────
export default function Home() {
    return (
        <div className="bg-white text-gray-900">
            {/*HERO*/}
            <section className="relative min-h-screen flex flex-col items-center justify-center text-center text-white overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/hero-bg.png')" }}
                />
                <div className="absolute inset-0 bg-gray-900/50" />

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

                    {/*STATS CARDS*/}
                    <StatsRow />
                </div>
            </section>

            {/*PARTNER*/}
            <section className="py-14 sm:py-16 px-8">
                <p className="text-center text-2xl sm:text-3xl font-bold text-black mb-16 tracking-tight">
                    Partner & <span className="text-[#FFD700] font-bold">Kolaborasi</span>
                </p>
                <Marquee />
            </section>

            {/*TENTANG GEPO ENERGY*/}
            <section className="py-14 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 sm:gap-20 items-center">
                        <div>
                            <h2 className="text-2xl sm:text-4xl font-extrabold italic text-black leading-tight mb-5">
                                Powering Your Life{" "}
                            </h2>
                            <p className="text-gray-500 text-base leading-relaxed mb-8">
                                Gepo Energy adalah perusahaan EPC dan O&M energi surya di Indonesia yang didirikan tahun 2023. Kami merancang dan menghadirkan sistem energi surya yang andal, efisien, serta berorientasi kinerja jangka panjang. </p>
                            <Link
                                to="/about"
                                className="inline-flex items-center gap-2 bg-black hover:bg-[#FFD700] text-white hover:text-black font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 no-underline text-sm"
                            >
                                Selengkapnya <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="rounded-3xl overflow-hidden aspect-[1/1]">
                                <img
                                    src="/images/home1.png"
                                    alt="Tentang Gepo Energy"
                                    className="max-w-full max-h-full object-cover"
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
                        </div>
                    </div>
                </div>
            </section>

            {/*PRODUK*/}
            <section className="py-14 sm:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
                        <div>
                            <p className="text-xs font-bold tracking-widest uppercase text-[#FFD700] mb-2">Produk & Layanan</p>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 max-w-sm leading-snug">
                                Teknologi unggulan untuk kebutuhan listrik Anda
                            </h2>
                        </div>
                        <Link
                            to="/product"
                            className="inline-flex items-center gap-2 border border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900 font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-300 no-underline flex-shrink-0"
                        >
                            Selengkapnya <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Product slider */}
                    <ProductSlider />

                    {/* Service strip — di bawah, 3 card berjajar */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                        {homeServices.map((svc, i) => (
                            <div
                                key={i}
                                className="relative rounded-2xl overflow-hidden flex items-end"
                                style={{ height: "160px" }}
                            >
                                <img
                                    src={svc.photo}
                                    alt={svc.label}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    onError={(e) => {
                                        const el = e.target as HTMLImageElement;
                                        el.style.display = "none";
                                        if (el.parentElement) el.parentElement.style.background = "#111827";
                                    }}
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                {/* Nomor + label */}
                                <div className="relative z-10 px-5 pb-5 flex items-end justify-between w-full">
                                    <p className="text-white text-sm font-bold leading-snug">{svc.label}</p>
                                    <span
                                        className="text-3xl font-extrabold leading-none select-none"
                                        style={{ color: "rgba(255,255,255,0.12)" }}
                                    >
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/*CTA BANNER*/}
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