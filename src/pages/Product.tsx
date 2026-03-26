import { useState } from "react";
import { ChevronRight, Zap, Sun, Layers, Cpu, ClipboardList, Wrench, Activity } from "lucide-react";
import { Link } from "react-router-dom";

// ── DATA ──────────────────────────────────────────────────────────────────────

const products = [
    {
        id: "monofacial",
        icon: Sun,
        badge: "Paling Populer",
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
        photo: "/images/products/monofacial.jpg",
        accent: "#FFD700",
    },
    {
        id: "bifacial",
        icon: Layers,
        badge: "Produksi Ekstra",
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
        photo: "/images/products/bifacial.jpg",
        accent: "#3b82f6",
    },
    {
        id: "rooftile",
        icon: Zap,
        badge: "Premium",
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
        photo: "/images/products/rooftile.jpg",
        accent: "#10b981",
    },
    {
        id: "smartcontrol",
        icon: Cpu,
        badge: "IoT",
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
        photo: "/images/products/smartcontrol.jpg",
        accent: "#8b5cf6",
    },
];

const services = [
    {
        num: "01",
        icon: ClipboardList,
        title: "Studi Kelayakan dan Desain Teknis",
        desc: "Pada tahap awal, Gepo Energy akan melakukan studi kelayakan melalui survey langsung ke lokasi maupun berdasarkan kondisi kelistrikan klien. Setelah itu, kami membuat desain sistem PLTS berdasarkan hasil studi tersebut — mencakup informasi sistem komponen PLTS, sambungan kelistrikan, serta tata letak yang disesuaikan dengan kebutuhan dan aspek keselamatan. Kami juga melakukan pengajuan perizinan PLTS sesuai aturan yang berlaku, dan mengolah data menjadi proposal berisi estimasi produksi listrik, penghematan tagihan, serta dokumen teknis pendukung.",
        photo: "/images/services/survey.jpg",
    },
    {
        num: "02",
        icon: Wrench,
        title: "Instalasi dan Pengujian Kinerja",
        desc: "Gepo Energy menangani seluruh proses instalasi PLTS mulai dari pengadaan komponen, konstruksi, hingga perizinan. Kami menyediakan berbagai jenis panel surya dan komponen pendukung yang dapat menyesuaikan kebutuhan klien secara tepat. Instalasi disesuaikan dengan sistem on-grid, off-grid, maupun hybrid. Setelah sistem terpasang, kami melakukan pengujian kinerja berdasarkan standar yang telah ditetapkan untuk memastikan sistem PLTS bekerja aman dan optimal.",
        photo: "/images/services/instalasi.jpg",
    },
    {
        num: "03",
        icon: Activity,
        title: "Operasional dan Pemeliharaan",
        desc: "Gepo Energy menyediakan sistem IoT yang dapat diintegrasikan sesuai kebutuhan klien untuk pemantauan performa dan pemeliharaan sistem PLTS. Klien dapat memantau secara daring dan real-time 24/7 untuk memastikan produksi listrik PLTS berjalan secara maksimal.",
        photo: "/images/services/monitoring.jpg",
    },
];

// ── PRODUCT CARD (tab content) ───────────────────────────────────────────────

function ProductCard({ product }: { product: typeof products[0] }) {
    const Icon = product.icon;
    return (
        <div className="grid md:grid-cols-5 gap-0 rounded-3xl overflow-hidden shadow-xl border border-gray-100">
            {/* Left — info */}
            {/* Mengambil 3 dari 5 kolom pada layar medium ke atas (60% width) */}
            <div className="md:col-span-3 flex flex-col justify-between p-8 sm:p-10 bg-white">
                {/* Badge */}
                <div>
                    <span
                        className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-5"
                        style={{ background: product.accent + "20", color: product.accent }}
                    >
                        {product.badge}
                    </span>

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

                    {/* Keunggulan */}
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

                {/* CTA note */}
                <p className="text-sm text-gray-500 italic border-l-4 pl-4 mt-2" style={{ borderColor: product.accent }}>
                    {product.cta}
                </p>
            </div>

            {/* Right — photo */}
            {/* Mengambil 2 dari 5 kolom pada layar medium ke atas (40% width) */}
            <div className="md:col-span-2 relative bg-gray-50 min-h-[260px] md:min-h-0 flex items-center justify-center p-8">
                {/* Gradient overlay bottom (tetap dipertahankan sebagai background) */}
                <div
                    className="absolute inset-0 opacity-40 z-0"
                    style={{ background: `linear-gradient(to top, ${product.accent}60, transparent)` }}
                />

                <img
                    src={product.photo}
                    alt={product.name}
                    className="relative z-10 w-full h-full object-contain max-h-[400px] drop-shadow-2xl transition-transform hover:scale-105 duration-300"
                    onError={(e) => {
                        // Tambahkan "as HTMLImageElement" di baris ini
                        const el = e.target as HTMLImageElement; 
                        
                        el.style.display = "none";
                        if (el.parentElement) {
                            el.parentElement.style.display = "flex";
                            el.parentElement.style.alignItems = "center";
                            el.parentElement.style.justifyContent = "center";
                        }
                    }}
                />
            </div>
        </div>
    );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────

export default function Product() {
    const [activeTab, setActiveTab] = useState(products[0].id);

    const activeProduct = products.find((p) => p.id === activeTab)!;

    return (
        <div className="bg-white text-gray-900">

            {/* ── HERO ── */}
            <section className="relative bg-gray-950 text-white overflow-hidden py-24 sm:py-32">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#FFD700]/8 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FFD700]/5 rounded-full blur-2xl" />
                    {/* subtle grid */}
                    <div
                        className="absolute inset-0 opacity-5"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(255,215,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.3) 1px, transparent 1px)",
                            backgroundSize: "60px 60px",
                        }}
                    />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#FFD700] bg-[#FFD700]/10 px-3 py-1 rounded-full mb-6">
                        Produk & Layanan
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight max-w-3xl">
                        Solusi Energi Surya{" "}
                        <span className="text-[#FFD700]">Terbaik</span>{" "}
                        untuk Anda
                    </h1>
                    <p className="mt-5 text-gray-400 text-lg sm:text-xl max-w-2xl leading-relaxed">
                        Kami menyediakan produk dan layanan energi surya terbaik sesuai dengan kebutuhan listrik Anda
                    </p>

                    {/* Sub-taglines */}
                    <div className="mt-10 flex flex-col sm:flex-row gap-4">
                        <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-4 max-w-xs">
                            <Zap className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Panel surya bukan lagi sekadar pilihan, melainkan <strong className="text-white">investasi cerdas</strong> yang dapat membantu menghemat listrik dan meningkatkan nilai properti.
                            </p>
                        </div>
                        <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-4 max-w-xs">
                            <Sun className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Gepo Energy hadir dengan <strong className="text-white">teknologi unggulan</strong> yang dapat menyesuaikan kebutuhan listrik Anda.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── PRODUCTS ── */}
            <section className="py-20 sm:py-28 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#FFD700] bg-[#FFD700]/10 px-3 py-1 rounded-full mb-4">
                            Produk Unggulan
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Teknologi Panel Surya Kami</h2>
                        <p className="mt-3 text-gray-500 max-w-xl mx-auto">
                            Pilih teknologi yang paling sesuai dengan kebutuhan, anggaran, dan estetika Anda
                        </p>
                    </div>

                    {/* Tab selector */}
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
                                            ? "bg-gray-900 text-white border-gray-900 shadow-lg"
                                            : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                                    }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {p.name.replace("Panel Surya ", "")}
                                </button>
                            );
                        })}
                    </div>

                    {/* Active product card */}
                    <div key={activeProduct.id}>
                        <ProductCard product={activeProduct} />
                    </div>
                </div>
            </section>

            {/* ── CTA — Mana Solusi yang Tepat ── */}
            <section className="py-20 bg-[#FFD700]">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
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
                                Konsultasi Gratis
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                            <Link
                                to="/project"
                                className="inline-flex items-center justify-center gap-2 border-2 border-gray-900/30 hover:border-gray-900 text-gray-900 font-bold px-6 py-3 rounded-full transition-all duration-300 no-underline text-sm"
                            >
                                Lihat Portofolio
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SERVICES ── */}
            <section className="py-20 sm:py-28 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#FAAD04] bg-[#FFD700]/10 px-3 py-1 rounded-full mb-4">
                            Solusi Lengkap Kami
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                            Dari Studi hingga Operasional
                        </h2>
                        <p className="mt-3 text-gray-500 max-w-xl mx-auto">
                            Gepo Energy hadir di setiap tahap — mulai dari perencanaan, instalasi, hingga pemeliharaan jangka panjang
                        </p>
                    </div>

                    <div className="space-y-16">
                        {services.map((service, i) => {
                            const Icon = service.icon;
                            const isReverse = i % 2 !== 0;
                            return (
                                <div
                                    key={service.num}
                                    className={`flex flex-col ${isReverse ? "md:flex-row-reverse" : "md:flex-row"} gap-10 sm:gap-16 items-center`}
                                >
                                    {/* Photo */}
                                    <div className="w-full md:w-1/2 flex-shrink-0">
                                        <div className="rounded-3xl overflow-hidden bg-gray-100 aspect-video relative">
                                            <img
                                                src={service.photo}
                                                alt={service.title}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    const el = e.target as HTMLImageElement;
                                                    el.style.display = "none";
                                                    if (el.parentElement) {
                                                        el.parentElement.style.display = "flex";
                                                        el.parentElement.style.alignItems = "center";
                                                        el.parentElement.style.justifyContent = "center";
                                                        el.parentElement.style.color = "#9ca3af";
                                                        el.parentElement.style.fontSize = "14px";
                                                        el.parentElement.innerText = "[ Foto Layanan ]";
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Text */}
                                    <div className="flex-1">
                                        {/* Step number */}
                                        <div className="flex items-center gap-4 mb-5">
                                            <span className="text-6xl font-extrabold text-gray-100 leading-none select-none">
                                                {service.num}
                                            </span>
                                            <div className="w-10 h-10 rounded-xl bg-[#FFD700]/15 flex items-center justify-center">
                                                <Icon className="w-5 h-5 text-[#b59a00]" />
                                            </div>
                                        </div>

                                        <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 leading-snug">
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