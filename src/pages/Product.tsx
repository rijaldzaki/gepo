import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Diamond, Layers2, Grid3X3, Cpu, ClipboardList, Wrench, Activity } from "lucide-react";
import { Link } from "react-router-dom";

// DATA
const products = [
    {
        id: "monofacial",
        icon: Diamond,
        name: "Panel Surya Monofacial",
        tagline: "Pilihan Terpercaya & Terjangkau",
        subtitle: "Hemat Listrik Cepat & Mudah",
        desc: "Teknologi panel surya paling populer di Indonesia. Panel ini menangkap matahari hanya dari sisi depan dengan efisiensi tinggi, tersedia dalam berbagai ukuran daya yang dapat menyesuaikan kebutuhan listrik Anda.",
        keunggulan: [
            "Biaya awal rendah",
            "Payback period cepat",
            "Instalasi mudah dan sederhana",
            "Penghematan tagihan listrik hingga 70%",
        ],
        cta: "Cocok untuk Anda yang ingin mulai menggunakan PLTS tanpa ribet.",
        photos: [
            "/images/products/monofacial1.jpg",
        ],
        accent: "#FFD700",
    },
    {
        id: "bifacial",
        icon: Layers2,
        name: "Panel Surya Bifacial",
        tagline: "Teknologi Dua Sisi",
        subtitle: "Produksi Listrik Ekstra hingga 30%",
        desc: "Panel surya bifacial menyerap cahaya dari sisi depan dan belakang, memanfaatkan pantulan cahaya untuk menghasilkan hingga 30% energi lebih banyak dibanding panel monofacial.",
        keunggulan: [
            "Output energi jauh lebih tinggi",
            "Efisiensi lebih baik di cuaca panas dan kondisi reflektif",
            "Desain tahan lama dengan panel dua sisi",
        ],
        cta: "Pilih bifacial jika Anda ingin maksimalkan hasil investasi dan memanfaatkan setiap sinar matahari.",
        photos: [
            "/images/products/bifacial1.png",
        ],
        accent: "#E38E00",
    },
    {
        id: "rooftile",
        icon: Grid3X3,
        name: "Panel Surya Rooftile",
        tagline: "Elegan & Terintegrasi",
        subtitle: "Atap Jadi Pembangkit Listrik Indah",
        desc: "Building Integrated Photovoltaic (BIPV) menggantikan atap genteng konvensional. Dengan tampilan seamless, modern, dan estetis — atap Anda langsung menjadi sumber energi hijau.",
        keunggulan: [
            "Estetika premium, cocok untuk rumah mewah, villa, hotel, gedung perkantoran",
            "Fungsi ganda: atap + pembangkit listrik",
            "Nilai jangka panjang tak tertandingi",
        ],
        cta: "Investasi lebih tinggi, tapi energi bersih + desain futuristik + kontribusi nyata keberlanjutan.",
        photos: [
            "/images/products/rooftile1.png",
            "/images/products/rooftile2.png",
        ],
        accent: "#D25738",
    },
    {
        id: "smartcontrol",
        icon: Cpu,
        name: "Smart Control System",
        tagline: "Sistem Pintar di Balik PLTS Anda",
        subtitle: "Monitor & Kontrol Real-Time 24/7",
        desc: "Kombinasi inverter canggih, baterai, dan sistem IoT yang membuat PLTS Anda lebih pintar, efisien, dan mandiri. Dapat disesuaikan dengan kebutuhan dan keinginan Anda.",
        keunggulan: [
            "Pantau produksi PLTS secara real-time 24/7 di mana saja",
            "Kelola dan atur penggunaan energi Anda",
            "Integrasi penuh dengan komponen sistem PLTS",
        ],
        cta: "Kendalikan energi Anda dari genggaman tangan.",
        photos: [
            "/images/products/smart-control.png",
        ],
        accent: "#9D3115",
    },
];

const services = [
    {
        num: "01",
        icon: ClipboardList,
        title: "Studi Kelayakan dan Desain Teknis",
        desc: "Pada tahap awal, Gepo Energy akan melakukan studi kelayakan, baik itu melalui survey langsung ke lokasi maupun berdasarkan kondisi kelistrikan klien. Setelah itu, kami akan mambuat desain sistem PLTS berdasarkan hasil studi tersebut dengan informasi sistem komponen PLTS, sambungan kelistrikan, serta tata letak yang disesuaikan dengan kebutuhan dan keinginan klien berdasrkan aspek keselamatan dan keamanan. Pararel dengan hal-hal tersebut, kami juga melakukan proses pengajuan perizinan PLTS sesuai dengan aturan ada yang dibuka pada rentang bulan Januari dan Juli. Hasil data-data tersebut akan kami olah menjadi proposal berisi estimasi produksi listrik PLTS, penghematan tagihan listrik, serta dokumen-dokumen teknis pendukung sesuai dengan kebutuhan klien.",
        photos: [
            "/images/products/study1.png",
            "/images/products/study2.png",
            "/images/products/study3.png",
            "/images/products/study4.png",
        ],
    },
    {
        num: "02",
        icon: Wrench,
        title: "Instalasi dan Pengujian Kinerja",
        desc: "Gepo Energy menangani seluruh proses instalasi PLTS mulai dari pengadaan komponen, konstruksi, hingga perizinan. Kami menyediakan berbagai jenis produk panel surya dan komponen pendukungnya yang dapat menyesuaikan kebutuhan listrik klien secara tepat dan akurat. Instalasi disesuaikan dengan sistem pemasangan baik itu on-grid, off-grid, maupun hybrid sesuai dengan kebutuhan klien. Setelah sistem terpasang, kami akan melakukan pengujian kinerja berdasarkan standar pengujian yang telah disesuaikan untuk memastikan sistem PLTS bekerja secara aman dan optimal. Kami memastikan menyediakan produk dan layanan terbaik.",
        photos: [
            "/images/products/installation1.jpeg",
            "/images/products/installation2.jpeg",
            "/images/products/installation3.jpeg",
            "/images/products/installation4.jpeg",
        ],
    },
    {
        num: "03",
        icon: Activity,
        title: "Operasional dan Pemeliharaan",
        desc: "Gepo Energy menyediakan sistem IoT yang dapat diintegasikan sesuai dengan kebutuhan klien guna melakukan pemantauan performa sistem PLTS dan pemeliharaan sistem. Klien dapat memantau secara daring dan real-time 24/7 untuk memastikan produksi listrik PLTS secara maksimal.",
        photos: [
            "/images/products/operational1.png",
        ],
    },
];

// FALLBACK IMAGE
function ImgWithFallback({
    src,
    alt,
    className,
    style,
    fallbackText = "Foto",
}: {
    src: string;
    alt: string;
    className?: string;
    style?: React.CSSProperties;
    fallbackText?: string;
}) {
    const [failed, setFailed] = useState(false);

    if (failed) {
        return (
            <div
                className={className}
                style={{
                    ...style,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#f3f4f6",
                    color: "#9ca3af",
                    fontSize: "13px",
                    fontWeight: 500,
                }}
            >
                [ {fallbackText} ]
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            style={style}
            onError={() => setFailed(true)}
        />
    );
}

function ServicePhotoSlider({ service }: { service: typeof services[0] }) {
    const [slide, setSlide] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const hasMultiple = service.photos.length > 1;

    useEffect(() => {
        if (!hasMultiple) return;
        timerRef.current = setInterval(() => {
            setSlide((s) => (s + 1) % service.photos.length);
        }, 5000);
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [service.num, service.photos.length, hasMultiple]);

    const goTo = (i: number) => {
        if (timerRef.current) clearInterval(timerRef.current);
        setSlide(i);
        if (hasMultiple) {
            timerRef.current = setInterval(() => {
                setSlide((s) => (s + 1) % service.photos.length);
            }, 5000);
        }
    };
    const prev = () => goTo((slide - 1 + service.photos.length) % service.photos.length);
    const next = () => goTo((slide + 1) % service.photos.length);

    return (
        <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-[4/3] relative shadow-md">
            <div
                style={{
                    display: "flex",
                    width: `${service.photos.length * 100}%`,
                    height: "100%",
                    transform: `translateX(-${slide * (100 / service.photos.length)}%)`,
                    transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "absolute",
                    inset: 0,
                }}
            >
                {service.photos.map((src, i) => (
                    <div
                        key={i}
                        style={{
                            width: `${100 / service.photos.length}%`,
                            height: "100%",
                            flexShrink: 0,
                        }}
                    >
                        <ImgWithFallback
                            src={src}
                            alt={`${service.title} foto ${i + 1}`}
                            fallbackText="Foto Layanan"
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>

            {hasMultiple && (
                <>
                    <button
                        onClick={prev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                        style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.3)" }}
                    >
                        <ChevronLeft className="w-4 h-4 text-white" />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                        style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.3)" }}
                    >
                        <ChevronRight className="w-4 h-4 text-white" />
                    </button>

                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                        {service.photos.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                style={{
                                    width: slide === i ? "18px" : "6px",
                                    height: "6px",
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

// PRODUCT CARD
function ProductCard({ product }: { product: typeof products[0] }) {
    const Icon = product.icon;
    const [slide, setSlide] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const hasMultiple = product.photos.length > 1;

    // Reset slide ke 0 setiap ganti produk
    useEffect(() => { setSlide(0); }, [product.id]);

    // Auto-slide setiap 5 detik
    useEffect(() => {
        if (!hasMultiple) return;
        timerRef.current = setInterval(() => {
            setSlide((s) => (s + 1) % product.photos.length);
        }, 3000);
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [product.id, product.photos.length, hasMultiple]);

    const goTo = (i: number) => {
        if (timerRef.current) clearInterval(timerRef.current);
        setSlide(i);
        if (hasMultiple) {
            timerRef.current = setInterval(() => {
                setSlide((s) => (s + 1) % product.photos.length);
            }, 3000);
        }
    };
    const prev = () => goTo((slide - 1 + product.photos.length) % product.photos.length);
    const next = () => goTo((slide + 1) % product.photos.length);

    return (
        <div className="grid md:grid-cols-5 gap-0 rounded-3xl overflow-hidden shadow-xl border border-gray-100 items-stretch" style={{ minHeight: "420px" }}>
            {/* Left — info */}
            <div className="md:col-span-3 flex flex-col justify-between p-8 sm:p-10 bg-white">
                <div>
                    <div className="flex items-start gap-4 mb-4">
                        <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                            style={{ background: product.accent + "15" }}
                        >
                            <Icon className="w-6 h-6" style={{ color: product.accent }} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-400 leading-none">{product.tagline}</p>
                            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-tight mt-1">
                                {product.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-0.5">{product.subtitle}</p>
                        </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">{product.desc}</p>
                    <div className="space-y-2 mb-6">
                        <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3">Keunggulan</p>
                        {product.keunggulan.map((k, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div
                                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                                    style={{ background: product.accent }}
                                >
                                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-sm text-gray-700 leading-relaxed">{k}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="text-sm text-gray-500 italic border-l-4 pl-4 mt-2" style={{ borderColor: product.accent }}>
                    {product.cta}
                </p>
            </div>

            {/*Right — photo slider*/}
            <div className="md:col-span-2 relative overflow-hidden aspect-square md:aspect-auto md:min-h-full">
                <div
                    style={{
                        display: "flex",
                        width: `${product.photos.length * 100}%`,
                        height: "100%",
                        transform: `translateX(-${slide * (100 / product.photos.length)}%)`,
                        transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                        position: "absolute",
                        inset: 0,
                    }}
                >
                    {product.photos.map((src, i) => (
                        <div
                            key={i}
                            style={{
                                width: `${100 / product.photos.length}%`,
                                height: "100%",
                                flexShrink: 0,
                                background: "#f3f4f6",
                            }}
                        >
                            <ImgWithFallback
                                src={src}
                                alt={`${product.name} ${i + 1}`}
                                fallbackText={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>

                <div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                        background: `linear-gradient(to top, ${product.accent}30 0%, transparent 30%)`,
                    }}
                />

                {hasMultiple && (
                    <>
                        <button
                            onClick={prev}
                            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                            style={{
                                background: "rgba(0,0,0,0.35)",
                                border: "1px solid rgba(255,255,255,0.3)",
                            }}
                        >
                            <ChevronLeft className="w-4 h-4 text-white" />
                        </button>
                        <button
                            onClick={next}
                            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                            style={{
                                background: "rgba(0,0,0,0.35)",
                                border: "1px solid rgba(255,255,255,0.3)",
                            }}
                        >
                            <ChevronRight className="w-4 h-4 text-white" />
                        </button>

                        {/* Dots */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                            {product.photos.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goTo(i)}
                                    className="rounded-full transition-all duration-300"
                                    style={{
                                        width: slide === i ? "18px" : "6px",
                                        height: "6px",
                                        background: slide === i ? "#fff" : "rgba(255,255,255,0.45)",
                                        border: "none",
                                        cursor: "pointer",
                                        padding: 0,
                                    }}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

// MAIN PAGE
export default function Product() {
    const [activeTab, setActiveTab] = useState(products[0].id);

    return (
        <div className="bg-white text-gray-900">
            {/*HERO*/}
            <section className="relative bg-white text-white text-center overflow-hidden h-screen sm:h-[50vh] flex items-center justify-center">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/product-bg.png')" }}
                />
                <div className="absolute inset-0 bg-gray-900/50" />
                <div className="relative z-10 max-w-4xl mx-auto px-4">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Produk & Layanan</h1>
                    <p className="mt-3 text-white/75 text-sm sm:text-base max-w-4xl mx-auto leading-relaxed">
                        Kami menyediakan produk dan layanan energi surya terbaik sesuai dengan kebutuhan listrik Anda
                    </p>
                    <div className="mt-5 flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-4">
                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                            Panel surya bukan lagi sekadar pilihan, melainkan investasi cerdas yang dapat membantu menghemat listrik dan meningkatkan nilai properti. 
                            Gepo Energy hadir dengan teknologi unggulan yang dapat menyesuaikan kebutuhan listrik Anda.
                        </p>
                    </div>
                </div>
            </section>

            {/*PRODUCTS*/}
            <section className="py-14 sm:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/*Tab selector */}
                    <div className="flex flex-wrap justify-center gap-3 mb-10">
                        {products.map((p) => {
                            const Icon = p.icon;
                            const isActive = activeTab === p.id;
                            return (
                                <button
                                    key={p.id}
                                    onClick={() => setActiveTab(p.id)}
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 ${
                                        isActive
                                            ? "bg-black text-white border-black shadow-lg"
                                            : "bg-white text-gray-600 border-black hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {p.name.replace("Panel Surya ", "")}
                                </button>
                            );
                        })}
                    </div>

                    <div style={{ display: "grid" }}>
                        {products.map((p) => (
                            <div
                                key={p.id}
                                style={{
                                    gridArea: "1 / 1",
                                    opacity: activeTab === p.id ? 1 : 0,
                                    visibility: activeTab === p.id ? "visible" : "hidden",
                                    transition: "opacity 0.5s ease, transform 0.5s ease",
                                    transform: activeTab === p.id ? "translateY(0)" : "translateY(8px)",
                                    pointerEvents: activeTab === p.id ? "auto" : "none",
                                }}
                            >
                                <ProductCard product={p} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/*CTA*/}
            <section className="py-20 bg-[#FFD700]">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-black leading-snug">
                                Mana Solusi yang Tepat untuk Anda?
                            </h2>
                            <p className="mt-2 text-gray-800 max-w-lg">
                                Dapatkan konsultasi gratis: hitung penghematan, ROI, dan desain sistem custom bersama tim Gepo Energy.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 no-underline text-sm"
                            >
                                Konsultasi Gratis <ChevronRight className="w-4 h-4" />
                            </Link>
                            <Link
                                to="/project"
                                className="inline-flex items-center justify-center gap-2 border-2 border-black text-black hover:bg-black hover:text-white font-bold px-6 py-3 rounded-full transition-all duration-300 no-underline text-sm"
                            >
                                Lihat Portofolio
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/*SERVICES*/}
            <section className="py-14 sm:py-16 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                            Solusi Lengkap Kami
                        </h2>
                        <p className="mt-3 text-gray-500 max-w-xl mx-auto">
                            Gepo Energy hadir di setiap tahap — mulai dari perencanaan, instalasi, hingga pemeliharaan jangka panjang
                        </p>
                    </div>

                    <div className="space-y-14">
                        {services.map((service, i) => {
                            const Icon = service.icon;
                            const isReverse = i % 2 !== 0;
                            return (
                                <div
                                    key={service.num}
                                    className={`flex flex-col ${isReverse ? "md:flex-row-reverse" : "md:flex-row"} gap-10 sm:gap-14 items-center`}
                                >
                                    <div className="w-full md:w-2/5 flex-shrink-0">
                                        <ServicePhotoSlider service={service} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-5">
                                            <span className="text-6xl font-extrabold text-gray-300 leading-none select-none">
                                                {service.num}
                                            </span>
                                            <div className="w-10 h-10 rounded-xl bg-[#FFD700]/10 flex items-center justify-center">
                                                <Icon className="w-5 h-5 text-[#FFD700]" />
                                            </div>
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-extrabold text-black mb-4 leading-snug">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">{service.desc}</p>
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