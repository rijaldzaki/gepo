import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { MdOutlineEnergySavingsLeaf } from "react-icons/md";
import { TbBuildingFactory } from "react-icons/tb";
import { FaSolarPanel } from "react-icons/fa6";
import { LuTrees } from "react-icons/lu";
import { IconType } from "react-icons";
import { useLang } from "../context/LanguageContext";

// ── STATIC DATA (tidak perlu terjemah) ───────────────────────────────────────

const statIcons: IconType[] = [FaSolarPanel, MdOutlineEnergySavingsLeaf, TbBuildingFactory, LuTrees];
const statValues = [
    { value: 3, decimal: 0, suffix: "" },
    { value: 10, decimal: 0, suffix: " kWh" },
    { value: 11.49, decimal: 2, suffix: " ton/years" },
    { value: 523, decimal: 0, suffix: "" },
];

const partners = [
    { name: "UGM", logo: "/images/partners/ugm.png" },
    { name: "Pertamina", logo: "/images/partners/pertamina.png" },
    { name: "Pertamina Foundation", logo: "/images/partners/pertamina_foundation.png" },
    { name: "Pertamuda", logo: "/images/partners/pertamuda.png" },
    { name: "Nexus", logo: "/images/partners/nexus.png" },
    { name: "Shell", logo: "/images/partners/shell.png" },
    { name: "Suzuki", logo: "/images/partners/suzuki.png" },
    { name: "Instellar", logo: "/images/partners/instellar.png" },
    { name: "Komdigi", logo: "/images/partners/komdigi.png" },
    { name: "Astra Innovlab", logo: "/images/partners/astra_innovlab.png" },
    { name: "DIY", logo: "/images/partners/DIY.png" },
    { name: "Sonus", logo: "/images/partners/sonushub.png" },
    { name: "Wakaf Energi", logo: "/images/partners/wakaf_energi.png" },
];

const productPhotos = [
    "/images/products/monofacial1.jpg",
    "/images/products/bifacial1.png",
    "/images/products/rooftile1.png",
    "/images/products/smart-control.png",
];
const productAccent = "#FFD700";

const servicePhotos = [
    "/images/products/study3.png",
    "/images/products/installation1.jpeg",
    "/images/products/operational1.png",
];

// ── MARQUEE ───────────────────────────────────────────────────────────────────

const ITEM_W = 148;
const ITEM_GAP = 54;
const SET_PX = partners.length * (ITEM_W + ITEM_GAP);

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
                <span
                    style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "#9ca3af",
                        textAlign: "center",
                        lineHeight: "1.3",
                    }}
                >
                    {p.name}
                </span>
            )}
        </div>
    );
}

function Marquee() {
    const duration = partners.length * 2.8;
    return (
        <div className="overflow-hidden relative w-full" style={{ height: "96px" }}>
            <div
                className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to right, white 50%, transparent)" }}
            />
            <div
                className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to left, white 50%, transparent)" }}
            />
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    display: "flex",
                    width: `${SET_PX * 2}px`,
                    willChange: "transform",
                    animation: `mq-home ${duration}s linear infinite`,
                }}
            >
                {[...partners, ...partners].map((p, i) => (
                    <PartnerSlot key={i} p={p} />
                ))}
            </div>
            <style>{`@keyframes mq-home { from { transform: translateX(0px); } to { transform: translateX(-${SET_PX}px); } }`}</style>
        </div>
    );
}

// ── COUNT UP ──────────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1800, decimal = 0, started = false) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!started) return;
        let startTime: number | null = null;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(parseFloat((eased * target).toFixed(decimal)));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [target, duration, decimal, started]);
    return count;
}

function StatCard({
    value,
    decimal,
    suffix,
    label,
    icon: Icon,
    started,
}: {
    value: number;
    decimal: number;
    suffix: string;
    label: string;
    icon: IconType;
    started: boolean;
}) {
    const count = useCountUp(value, 1800, decimal, started);
    const display = decimal > 0 ? count.toFixed(decimal) : Math.floor(count).toString();
    return (
        <div
            className="flex items-center gap-3 px-4 py-4 rounded-xl"
            style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.1)",
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
                    {suffix && (
                        <span className="text-xs font-bold text-white ml-1 leading-none">
                            {suffix.trim()}
                        </span>
                    )}
                </div>
                <div className="text-xs text-white/60 mt-1 leading-none">{label}</div>
            </div>
        </div>
    );
}

function StatsRow() {
    const { t, tr } = useLang();
    const h = tr.home;
    const [started, setStarted] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const labels = [t(h.stat1Label), t(h.stat2Label), t(h.stat3Label), t(h.stat4Label)];

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
        <div ref={ref} className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-auto">
            {statValues.map((s, i) => (
                <StatCard
                    key={i}
                    {...s}
                    label={labels[i]}
                    icon={statIcons[i]}
                    started={started}
                />
            ))}
        </div>
    );
}

// ── PRODUCT SLIDER ────────────────────────────────────────────────────────────

function ProductSlider() {
    const { t, tr } = useLang();
    const h = tr.home;
    const [active, setActive] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const products = [
        {
            label: t(h.prod1Label),
            title: t(h.prod1Title),
            subtitle: t(h.prod1Subtitle),
            desc: t(h.prod1Desc),
        },
        {
            label: t(h.prod2Label),
            title: t(h.prod2Title),
            subtitle: t(h.prod2Subtitle),
            desc: t(h.prod2Desc),
        },
        {
            label: t(h.prod3Label),
            title: t(h.prod3Title),
            subtitle: t(h.prod3Subtitle),
            desc: t(h.prod3Desc),
        },
        {
            label: t(h.prod4Label),
            title: t(h.prod4Title),
            subtitle: t(h.prod4Subtitle),
            desc: t(h.prod4Desc),
        },
    ];

    const startTimer = () => {
        timerRef.current = setInterval(
            () => setActive((prev) => (prev + 1) % products.length),
            4000
        );
    };

    useEffect(() => {
        startTimer();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const handleTab = (i: number) => {
        if (timerRef.current) clearInterval(timerRef.current);
        setActive(i);
        startTimer();
    };

    const p = products[active];

    return (
        <div className="rounded-3xl overflow-hidden bg-black">
            <div className="flex flex-col md:flex-row min-h-[380px]">
                <div className="relative flex flex-col justify-between p-8 sm:p-10 md:flex-1 bg-black">
                    {products.map((_, i) => (
                        <img
                            key={i}
                            src={productPhotos[i]}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                            style={{ opacity: active === i ? 0.08 : 0, transition: "opacity 0.8s ease" }}
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = "none";
                            }}
                        />
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/80 pointer-events-none" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <span
                                className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                                style={{
                                    background: productAccent + "20",
                                    color: productAccent,
                                    border: `1px solid ${productAccent}40`,
                                }}
                            >
                                {p.label}
                            </span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug mb-3">
                            {p.title}
                        </h3>
                        <p className="text-sm font-semibold mb-4" style={{ color: productAccent }}>
                            {p.subtitle}
                        </p>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">{p.desc}</p>
                    </div>
                </div>
                <div className="relative md:w-80 lg:w-96 aspect-square md:aspect-auto flex-shrink-0 flex items-center justify-center p-5">
                    {products.map((_, i) => (
                        <img
                            key={i}
                            src={productPhotos[i]}
                            alt={products[i].title}
                            className="rounded-2xl object-contain w-full h-full"
                            style={{
                                opacity: active === i ? 1 : 0,
                                transition: "",
                                position: active === i ? "relative" : "absolute",
                                maxWidth: "100%",
                                maxHeight: "100%",
                            }}
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = "none";
                            }}
                        />
                    ))}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: `linear-gradient(to right, black 0%, transparent 30%), linear-gradient(to top, ${productAccent}15 0%, transparent 50%)`,
                        }}
                    />
                </div>
            </div>
            <div className="flex border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                {products.map((prod, i) => (
                    <button
                        key={i}
                        onClick={() => handleTab(i)}
                        className="relative flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300"
                        style={{
                            color: active === i ? productAccent : "rgba(255,255,255,0.53)",
                            background: active === i ? "#ffd90017" : "transparent",
                        }}
                    >
                        {prod.label}
                        {active === i && (
                            <span
                                key={active}
                                className="absolute bottom-0 left-0 h-0.5 rounded-full"
                                style={{
                                    background: productAccent,
                                    animation: "progress-bar 4s linear forwards",
                                }}
                            />
                        )}
                    </button>
                ))}
                <style>{`@keyframes progress-bar { from { width: 0%; } to { width: 100%; } }`}</style>
            </div>
        </div>
    );
}

// ── HOME PAGE ─────────────────────────────────────────────────────────────────

export default function Home() {
    const { t, tr } = useLang();
    const h = tr.home;

    const serviceLabels = [t(h.svc1Label), t(h.svc2Label), t(h.svc3Label)];

    return (
        <div className="bg-white">
            {/* HERO */}
            <section className="relative min-h-screen flex flex-col items-center justify-center text-center text-white overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/hero-bg.png')" }}
                />
                <div className="absolute inset-0 bg-gray-900/50" />
                <div className="relative z-10 max-w-4xl mx-auto px-8 flex flex-col items-center">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-semibold mb-5 text-white leading-snug">
                        {t(h.heroTitle)}{" "}
                        <span className="text-[#FFD700] font-bold">{t(h.heroBrand)}</span>
                    </h1>
                    <p className="text-white text-base sm:text-lg max-w-3xl mb-9 leading-relaxed">
                        {t(h.heroSubtitle)}
                    </p>
                    <Link
                        to="/product"
                        className="bg-black hover:bg-[#FFD700] text-white hover:text-black font-semibold text-sm sm:text-sm tracking-widest uppercase px-8 py-5 rounded-full hover:scale-105 transition-all duration-500 no-underline"
                    >
                        {t(h.heroCta)}
                    </Link>
                    <StatsRow />
                </div>
            </section>

            {/* PARTNER */}
            <section className="py-14 sm:py-16 px-8">
                <p className="text-center text-2xl sm:text-3xl font-bold text-black mb-16 tracking-tight">
                    {t(h.partnerTitle)}{" "}
                    <span className="text-[#FFD700] font-bold">{t(h.partnerSpan)}</span>
                </p>
                <Marquee />
            </section>

            {/* TENTANG */}
            <section className="py-14 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 sm:gap-20 items-center">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold italic text-black leading-tight mb-5">
                                {t(h.aboutTitle)}
                            </h2>
                            <p className="text-gray-500 text-base leading-relaxed mb-8">
                                {t(h.aboutDesc)}
                            </p>
                            <Link
                                to="/about"
                                className="inline-flex items-center gap-2 bg-black hover:bg-[#FFD700] text-white hover:text-black font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 no-underline text-sm"
                            >
                                {t(h.aboutBtn)} <ChevronRight className="w-4 h-4" />
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

            {/* PRODUK */}
            <section className="py-14 sm:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-black max-w-max leading-snug">
                            {t(h.productTitle)}
                        </h2>
                        <Link
                            to="/product"
                            className="inline-flex items-center gap-2 border border-black hover:bg-gray-900 hover:text-white text-black font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-300 no-underline flex-shrink-0"
                        >
                            {t(h.productBtn)} <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <ProductSlider />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
                        {servicePhotos.map((photo, i) => (
                            <div
                                key={i}
                                className="relative rounded-2xl overflow-hidden flex items-end"
                                style={{ height: "300px" }}
                            >
                                <img
                                    src={photo}
                                    alt={serviceLabels[i]}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    onError={(e) => {
                                        const el = e.target as HTMLImageElement;
                                        el.style.display = "none";
                                        if (el.parentElement) el.parentElement.style.background = "#111827";
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="relative z-10 px-5 pb-5 flex items-end justify-between w-full">
                                    <p className="text-white text-sm font-bold leading-snug">
                                        {serviceLabels[i]}
                                    </p>
                                    <span
                                        className="text-3xl font-extrabold leading-none select-none"
                                        style={{ color: "#ffd90076" }}
                                    >
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* VIDEO */}
            <section className="py-14 sm:py-16 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-black leading-snug">
                            {t(h.videoTitle)}
                        </h2>
                    </div>
                    <div
                        className="relative rounded-3xl overflow-hidden shadow-2xl"
                        style={{
                            border: "1px solid rgba(255,215,0,0.15)",
                            background: "#0a0a0a",
                        }}
                    >
                        <div
                            className="absolute top-0 left-0 right-0 h-0.5 z-10"
                            style={{
                                background: "linear-gradient(to right, transparent, #FFD700, transparent)",
                            }}
                        />
                        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src="https://www.youtube.com/embed/CDc2dDFcqmg?rel=0&modestbranding=1&autoplay=1&mute=1"
                                title="Gepo Energy — Company Video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{ border: "none" }}
                            />
                        </div>
                        <div
                            className="absolute bottom-0 left-0 right-0 h-0.5 z-10"
                            style={{
                                background: "linear-gradient(to right, transparent, #FFD700, transparent)",
                            }}
                        />
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative py-14 sm:py-16 text-white text-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/home-bt.png')" }}
                />
                <div className="absolute inset-0 bg-gray-900/80" />
                <div className="relative z-10 max-w-xl mx-auto px-4">
                    <h2 className="text-2xl sm:text-3xl font-semibold leading-tight mb-8">
                        {t(h.ctaTitle1)}{" "}
                        <span className="font-bold">{t(h.ctaTitle2)}</span>
                    </h2>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 bg-[#FFD700] hover:bg-[#FFD700]/80 text-black font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 no-underline text-sm"
                    >
                        {t(h.ctaBtn)} <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </div>
    );
}