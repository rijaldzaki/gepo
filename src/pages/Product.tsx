import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Diamond, Layers2, Grid3X3, Cpu, ClipboardList, Wrench, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";

// ── STATIC ────────────────────────────────────────────────────────────────────
const productStatic = [
    { id: "monofacial", icon: Diamond, accent: "#FFD700", photos: ["/images/products/monofacial1.jpg"] },
    { id: "bifacial", icon: Layers2, accent: "#E38E00", photos: ["/images/products/bifacial1.png"] },
    { id: "rooftile", icon: Grid3X3, accent: "#D25738", photos: ["/images/products/rooftile1.png", "/images/products/rooftile2.png"] },
    { id: "smartcontrol", icon: Cpu, accent: "#9D3115", photos: ["/images/products/smart-control.png"] },
];

const serviceStatic = [
    { num: "01", icon: ClipboardList, photos: ["/images/products/study1.png", "/images/products/study2.png", "/images/products/study3.png", "/images/products/study4.png"] },
    { num: "02", icon: Wrench, photos: ["/images/products/installation1.jpeg", "/images/products/installation2.jpeg", "/images/products/installation3.jpeg", "/images/products/installation4.jpeg"] },
    { num: "03", icon: Activity, photos: ["/images/products/operational1.png"] },
];

// ── FALLBACK IMAGE ────────────────────────────────────────────────────────────
function ImgFallback({
    src,
    alt,
    className,
    fallbackText = "Foto",
}: {
    src: string;
    alt: string;
    className?: string;
    fallbackText?: string;
}) {
    const [failed, setFailed] = useState(false);
    if (failed) {
        return (
            <div
                className={className}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#f3f4f6",
                    color: "#9ca3af",
                    fontSize: "13px",
                }}
            >
                [{fallbackText}]
            </div>
        );
    }
    return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />;
}

// ── SERVICE PHOTO SLIDER ──────────────────────────────────────────────────────
function ServicePhotoSlider({ svc }: { svc: typeof serviceStatic[0] }) {
    const [slide, setSlide] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const hasMultiple = svc.photos.length > 1;

    useEffect(() => {
        if (!hasMultiple) return;
        timerRef.current = setInterval(() => setSlide((s) => (s + 1) % svc.photos.length), 5000);
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [svc.num, svc.photos.length, hasMultiple]);

    const goTo = (i: number) => {
        if (timerRef.current) clearInterval(timerRef.current);
        setSlide(i);
        if (hasMultiple) timerRef.current = setInterval(() => setSlide((s) => (s + 1) % svc.photos.length), 5000);
    };

    return (
        <div className="rounded-xl sm:rounded-2xl overflow-hidden bg-gray-100 aspect-[4/3] relative shadow-md">
            <div
                style={{
                    display: "flex",
                    width: `${svc.photos.length * 100}%`,
                    height: "100%",
                    transform: `translateX(-${slide * (100 / svc.photos.length)}%)`,
                    transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
                    position: "absolute",
                    inset: 0,
                }}
            >
                {svc.photos.map((src, i) => (
                    <div
                        key={i}
                        style={{
                            width: `${100 / svc.photos.length}%`,
                            height: "100%",
                            flexShrink: 0,
                        }}
                    >
                        <ImgFallback
                            src={src}
                            alt={`foto ${i + 1}`}
                            fallbackText="Foto Layanan"
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>
            {hasMultiple && (
                <>
                    <button
                        onClick={() => goTo((slide - 1 + svc.photos.length) % svc.photos.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.3)" }}
                    >
                        <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </button>
                    <button
                        onClick={() => goTo((slide + 1) % svc.photos.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.3)" }}
                    >
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </button>
                    <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                        {svc.photos.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                style={{
                                    width: slide === i ? "16px" : "5px",
                                    height: "5px",
                                    borderRadius: "9999px",
                                    background: slide === i ? "#FFD700" : "rgba(255,255,255,0.5)",
                                    border: "none",
                                    cursor: "pointer",
                                    padding: 0,
                                    transition: "all 0.3s",
                                }}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

// ── PRODUCT CARD ──────────────────────────────────────────────────────────────
function ProductCard({
    staticData,
    name,
    tagline,
    subtitle,
    desc,
    keunggulan,
    cta,
}: {
    staticData: typeof productStatic[0];
    name: string;
    tagline: string;
    subtitle: string;
    desc: string;
    keunggulan: string[];
    cta: string;
}) {
    const Icon = staticData.icon;
    const [slide, setSlide] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const hasMultiple = staticData.photos.length > 1;

    useEffect(() => {
        setSlide(0);
    }, [staticData.id]);

    useEffect(() => {
        if (!hasMultiple) return;
        timerRef.current = setInterval(() => setSlide((s) => (s + 1) % staticData.photos.length), 3000);
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [staticData.id, staticData.photos.length, hasMultiple]);

    const goTo = (i: number) => {
        if (timerRef.current) clearInterval(timerRef.current);
        setSlide(i);
        if (hasMultiple) timerRef.current = setInterval(() => setSlide((s) => (s + 1) % staticData.photos.length), 3000);
    };

    return (
        <div className="flex flex-col md:grid md:grid-cols-5 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-gray-100">
            {/* Foto — tampil PERTAMA di mobile (atas), kolom kanan di desktop */}
            <div
                className="md:col-span-2 relative overflow-hidden aspect-square md:aspect-auto order-1 md:order-2"
                style={{ minHeight: "0" }}
            >
                <div
                    style={{
                        display: "flex",
                        width: `${staticData.photos.length * 100}%`,
                        height: "100%",
                        transform: `translateX(-${slide * (100 / staticData.photos.length)}%)`,
                        transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
                        position: "absolute",
                        inset: 0,
                    }}
                >
                    {staticData.photos.map((src, i) => (
                        <div
                            key={i}
                            style={{
                                width: `${100 / staticData.photos.length}%`,
                                height: "100%",
                                flexShrink: 0,
                                background: "#f3f4f6",
                            }}
                        >
                            <ImgFallback
                                src={src}
                                alt={`${name} ${i + 1}`}
                                fallbackText={name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
                <div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{ background: `linear-gradient(to top, ${staticData.accent}30 0%, transparent 30%)` }}
                />
                {hasMultiple && (
                    <>
                        <button
                            onClick={() => goTo((slide - 1 + staticData.photos.length) % staticData.photos.length)}
                            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center"
                            style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.3)" }}
                        >
                            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </button>
                        <button
                            onClick={() => goTo((slide + 1) % staticData.photos.length)}
                            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center"
                            style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.3)" }}
                        >
                            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </button>
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                            {staticData.photos.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goTo(i)}
                                    style={{
                                        width: slide === i ? "16px" : "5px",
                                        height: "5px",
                                        borderRadius: "9999px",
                                        background: slide === i ? "#fff" : "rgba(255,255,255,0.45)",
                                        border: "none",
                                        cursor: "pointer",
                                        padding: 0,
                                        transition: "all 0.3s",
                                    }}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Info — order-2 di mobile (bawah foto), order-1 di desktop (kiri) */}
            <div className="md:col-span-3 flex flex-col justify-between p-6 sm:p-8 md:p-10 bg-white order-2 md:order-1">
                <div>
                    {/* Icon + nama */}
                    <div className="flex items-start gap-3 sm:gap-4 mb-4">
                        <div
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0"
                            style={{ background: staticData.accent + "15" }}
                        >
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: staticData.accent }} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-semibold text-gray-400 leading-none">{tagline}</p>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-900 leading-tight mt-1">
                                {name}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{subtitle}</p>
                        </div>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4 sm:mb-6">{desc}</p>

                    {/* Keunggulan */}
                    <div className="space-y-2 mb-4 sm:mb-6">
                        <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-2 sm:mb-3">Keunggulan</p>
                        {keunggulan.map((k, i) => (
                            <div key={i} className="flex items-start gap-2 sm:gap-3">
                                <div
                                    className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center mt-0.5"
                                    style={{ background: staticData.accent }}
                                >
                                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-xs sm:text-sm text-gray-700 leading-relaxed">{k}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <p
                    className="text-xs sm:text-sm text-gray-500 italic border-l-4 pl-3 sm:pl-4"
                    style={{ borderColor: staticData.accent }}
                >
                    {cta}
                </p>
            </div>
        </div>
    );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function Product() {
    const { t, tr } = useLang();
    const p = tr.product;
    const [activeTab, setActiveTab] = useState(productStatic[0].id);

    const products = [
        {
            ...productStatic[0],
            name: t(p.p1Name),
            tagline: t(p.p1Tagline),
            subtitle: t(p.p1Subtitle),
            desc: t(p.p1Desc),
            keunggulan: [t(p.p1K1), t(p.p1K2), t(p.p1K3), t(p.p1K4)],
            cta: t(p.p1Cta),
            tabLabel: "Monofacial",
        },
        {
            ...productStatic[1],
            name: t(p.p2Name),
            tagline: t(p.p2Tagline),
            subtitle: t(p.p2Subtitle),
            desc: t(p.p2Desc),
            keunggulan: [t(p.p2K1), t(p.p2K2), t(p.p2K3)],
            cta: t(p.p2Cta),
            tabLabel: "Bifacial",
        },
        {
            ...productStatic[2],
            name: t(p.p3Name),
            tagline: t(p.p3Tagline),
            subtitle: t(p.p3Subtitle),
            desc: t(p.p3Desc),
            keunggulan: [t(p.p3K1), t(p.p3K2), t(p.p3K3)],
            cta: t(p.p3Cta),
            tabLabel: "Rooftile",
        },
        {
            ...productStatic[3],
            name: t(p.p4Name),
            tagline: t(p.p4Tagline),
            subtitle: t(p.p4Subtitle),
            desc: t(p.p4Desc),
            keunggulan: [t(p.p4K1), t(p.p4K2), t(p.p4K3)],
            cta: t(p.p4Cta),
            tabLabel: "Smart",
        },
    ];

    const services = [
        { ...serviceStatic[0], title: t(p.svc1Title), desc: t(p.svc1Desc) },
        { ...serviceStatic[1], title: t(p.svc2Title), desc: t(p.svc2Desc) },
        { ...serviceStatic[2], title: t(p.svc3Title), desc: t(p.svc3Desc) },
    ];

    const activeProduct = products.find((pr) => pr.id === activeTab)!;

    return (
        <div className="bg-white text-gray-900">
            {/* ── HERO ── */}
            <section className="relative text-white text-center overflow-hidden h-[50vh] flex items-center justify-center">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/product-bg.png')" }} />
                <div className="absolute inset-0 bg-gray-900/50" />
                <div className="relative z-10 max-w-4xl mx-auto px-8">
                    <h1 className="text-2xl sm:text-4xl font-bold tracking-tight mb-3">{t(p.heroTitle)}</h1>
                    <p className="text-white/75 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-4 sm:mb-5">
                        {t(p.heroSubtitle)}
                    </p>
                    <div className="bg-white/5 border border-white/10 rounded-xl px-4 sm:px-5 py-3 sm:py-4 max-w-xl mx-auto">
                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{t(p.heroTag)}</p>
                    </div>
                </div>
            </section>

            {/* ── PRODUCTS ── */}
            <section className="py-10 sm:py-14 md:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-8">
                    {/* Tab selector — scrollable di mobile */}
                    <div className="flex gap-2 sm:gap-3 mb-8 sm:mb-10 overflow-x-auto pb-1 scrollbar-none">
                        {products.map((prod) => {
                            const Icon = prod.icon;
                            const isActive = activeTab === prod.id;
                            return (
                                <button
                                    key={prod.id}
                                    onClick={() => setActiveTab(prod.id)}
                                    className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold border transition-all duration-300 flex-shrink-0 ${
                                        isActive
                                            ? "bg-black text-white border-black shadow-lg"
                                            : "bg-white text-gray-600 border-black hover:bg-gray-100"
                                    }`}
                                >
                                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    {prod.tabLabel}
                                </button>
                            );
                        })}
                    </div>

                    {/* Product card — fade transition */}
                    <div style={{ display: "grid" }}>
                        {products.map((prod) => (
                            <div
                                key={prod.id}
                                style={{
                                    gridArea: "1 / 1",
                                    opacity: activeTab === prod.id ? 1 : 0,
                                    visibility: activeTab === prod.id ? "visible" : "hidden",
                                    transition: "opacity 0.4s ease, transform 0.4s ease",
                                    transform: activeTab === prod.id ? "translateY(0)" : "translateY(8px)",
                                    pointerEvents: activeTab === prod.id ? "auto" : "none",
                                }}
                            >
                                <ProductCard
                                    staticData={prod}
                                    name={prod.name}
                                    tagline={prod.tagline}
                                    subtitle={prod.subtitle}
                                    desc={prod.desc}
                                    keunggulan={prod.keunggulan}
                                    cta={prod.cta}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-12 sm:py-16 md:py-20 bg-[#FFD700]">
                <div className="max-w-5xl mx-auto px-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 sm:gap-8">
                        <div>
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-black leading-snug">
                                {t(p.ctaTitle)}
                            </h2>
                            <p className="mt-2 text-gray-800 text-sm sm:text-base max-w-lg">{t(p.ctaDesc)}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 hover:scale-105 no-underline text-sm"
                            >
                                {t(p.ctaBtn1)} <ChevronRight className="w-4 h-4" />
                            </Link>
                            <Link
                                to="/project"
                                className="inline-flex items-center justify-center gap-2 border-2 border-black text-black hover:bg-black hover:text-white font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 no-underline text-sm"
                            >
                                {t(p.ctaBtn2)}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SERVICES ── */}
            <section className="py-10 sm:py-14 md:py-16 bg-white">
                <div className="max-w-6xl mx-auto px-8">
                    <div className="text-center mb-10 sm:mb-16">
                        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">{t(p.svcTitle)}</h2>
                        <p className="mt-2 sm:mt-3 text-gray-500 text-sm sm:text-base max-w-xl mx-auto">{t(p.svcDesc)}</p>
                    </div>

                    <div className="space-y-12 sm:space-y-14">
                        {services.map((svc, i) => {
                            const Icon = svc.icon;
                            const isReverse = i % 2 !== 0;
                            return (
                                <div
                                    key={svc.num}
                                    className={`flex flex-col ${isReverse ? "md:flex-row-reverse" : "md:flex-row"} gap-6 sm:gap-10 md:gap-14 items-start md:items-center`}
                                >
                                    {/* Foto — selalu di atas di mobile */}
                                    <div className="w-full md:w-2/5 flex-shrink-0 order-1">
                                        <ServicePhotoSlider svc={svc} />
                                    </div>

                                    {/* Teks */}
                                    <div className="flex-1 order-2">
                                        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-5">
                                            <span className="text-4xl sm:text-6xl font-extrabold text-gray-200 leading-none select-none">
                                                {svc.num}
                                            </span>
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#FFD700]/10 flex items-center justify-center">
                                                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD700]" />
                                            </div>
                                        </div>
                                        <h3 className="text-base sm:text-xl md:text-2xl font-extrabold text-black mb-3 sm:mb-4 leading-snug">
                                            {svc.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{svc.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}