import { useState, useEffect, useRef, Fragment } from "react";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";
import { MdOutlineEnergySavingsLeaf, MdOutlineRemoveRedEye } from "react-icons/md";
import { TbBuildingFactory, TbTargetArrow } from "react-icons/tb";
import { FaSolarPanel } from "react-icons/fa6";
import { LuTrees } from "react-icons/lu";
import { IconType } from "react-icons";

// ── DATA ──────────────────────────────────────────────────────────────────────

const stats: { value: number; decimal: number; suffix: string; label: string; icon: IconType }[] = [
    { value: 3,     decimal: 0, suffix: "",           label: "proyek",        icon: FaSolarPanel },
    { value: 10,    decimal: 0, suffix: " kWh",       label: "energi hijau",  icon: MdOutlineEnergySavingsLeaf },
    { value: 11.49, decimal: 2, suffix: " ton/years", label: "CO₂ terhindar", icon: TbBuildingFactory },
    { value: 523,   decimal: 0, suffix: "",           label: "pohon ditanam", icon: LuTrees },
];

const partners = [
    { name: "UGM",                   logo: "/images/partners/ugm.png" },
    { name: "Pertamina",             logo: "/images/partners/pertamina.png" },
    { name: "Pertamina Foundation",  logo: "/images/partners/pertamina_foundation.png" },
    { name: "Pertamuda",             logo: "/images/partners/pertamuda.png" },
    { name: "Astra Innovlab",        logo: "/images/partners/astra_innovlab.png" },
    { name: "Suzuki",                logo: "/images/partners/suzuki.png" },
    { name: "Instellar",             logo: "/images/partners/instellar.png" },
    { name: "Komdigi",               logo: "/images/partners/komdigi.png" },
    { name: "Nexus",                 logo: "/images/partners/nexus.png" },
    { name: "DIY",                   logo: "/images/partners/DIY.png" },
    { name: "Shell",                 logo: "/images/partners/shell.png" },
    { name: "Sonus",                 logo: "/images/partners/sonushub.png" },
    { name: "Wakaf Energi",          logo: "/images/partners/wakaf_energi.png" },
];

// Sertifikasi — NIB punya 3 slides, yang lain 1 slide
const sertifikasi = [
    {
        id: "nib",
        title: "NIB",
        subtitle: "Nomor Induk Berusaha",
        desc: "Sertifikat Perizinan Usaha Berbasis Risiko yang valid dan diakui pemerintah.",
        slides: [
            "/images/sertifikat/nib-1.jpg",
            "/images/sertifikat/nib-2.jpg",
            "/images/sertifikat/nib-3.jpg",
        ],
    },
    {
        id: "sk",
        title: "SK Kemenkumham",
        subtitle: "Surat Keputusan",
        desc: "Surat Keputusan pengesahan badan hukum dari Kementerian Hukum dan HAM Republik Indonesia.",
        slides: ["/images/sertifikat/sk-kemenkumham.jpg"],
    },
    {
        id: "iso",
        title: "ISO 9001:2015",
        subtitle: "Manajemen Mutu",
        desc: "Sertifikasi sistem manajemen mutu internasional yang memastikan standar kualitas produk dan layanan.",
        slides: ["/images/sertifikat/iso-9001.jpg"],
    },
];

const advisors = [
    {
        name: "Ahmad Agus Setiawan, S.T., M.Sc., Ph.D.",
        role: "Engineering Advisor",
        photo: "/images/team/AAS.png",
        desc: (
            <ul className="list-disc list-outside ml-5 space-y-2 text-gray-800">
                <li>Former Special Staff to the President of the Republic of Indonesia for Renewable Energy (2019–2024)</li>
                <li>Head of the DTNTF-UGM Renewable Energy Laboratory</li>
            </ul>
        ),
        reverse: false,
    },
    {
        name: "Ir. Galuh Adi Insani, S,Pt., MSc., IPM.",
        role: "Business Advisor",
        photo: "/images/team/Galuh.png",
        desc: (
            <ul className="list-disc list-outside ml-5 space-y-2 text-gray-800">
                <li>Founder & Former Commissioner of Broiler-C (2020-2024)</li>
                <li>Data Consultant at Indico by Telkomsel</li>
            </ul>
        ),
        reverse: true,
    },
];

const leaders = [
    {
        name: "Maulana Istar, S.T.",
        role: "Chief Executive Officer",
        photo: "/images/team/MaulanaIstar.png",
        desc: (
            <ul className="list-disc list-outside ml-5 space-y-2">
                <li>Former Data Coordinator at PT Grafika in Decontamination Cs-137 Cikande</li>
                <li>Former Store Manager at Zaflan Frozen Food</li>
                <li>Outstanding Student at Universitas Gadjah Mada</li>
            </ul>
        ),
    },
    {
        name: "Muhammad Rafif Taqiyuddin, S.T.",
        role: "Chief Marketing Officer",
        photo: "/images/team/Rafif.png",
        desc: (
            <ul className="list-disc list-outside ml-5 space-y-2">
                <li>Shell LiveWire Energy Solution Winner 2024</li>
                <li>Pertamuda Winner 2022</li>
                <li>Outstanding Student at Faculty of Engineering Universitas Gadjah Mada</li>
            </ul>
        ),
    },
];

// ── MARQUEE ───────────────────────────────────────────────────────────────────
// Kunci seamless:
// 1. Render item DUA kali dalam satu flex row tanpa padding/gap di luar
// 2. Setiap item punya margin kanan yang seragam (gap diganti mx)
// 3. Animasi geser tepat -50% (lebar set pertama = set kedua)
// 4. will-change: transform agar GPU yang handle, tidak patah-patah

const ITEM_GAP = 54; // px — jarak antar logo (ubah di sini jika perlu)

function Marquee() {
    // Durasi: makin banyak item, makin lambat agar tidak terlalu cepat
    const duration = partners.length * 1; // detik

    return (
        <div className="overflow-hidden relative w-full">
            {/* Fade kiri */}
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to right, white 40%, transparent)" }} />
            {/* Fade kanan */}
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to left, white 40%, transparent)" }} />

            {/* Track — satu baris, dua set identik, tidak ada padding luar */}
            <div
                className="flex"
                style={{
                    willChange: "transform",
                    animation: `marquee-scroll ${duration}s linear infinite`,
                }}
            >
                {/* Set A */}
                {partners.map((p, i) => (
                    <div
                        key={`a-${i}`}
                        className="flex-shrink-0 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300"
                        style={{
                            height: "96px",
                            marginRight: `${ITEM_GAP}px`,
                        }}
                    >
                        <img
                            src={p.logo}
                            alt={p.name}
                            className="h-16 w-auto max-w-[120px] object-contain"
                            onError={(e) => {
                                // Tampilkan nama teks jika logo belum ada
                                const el = e.target as HTMLImageElement;
                                el.style.display = "none";
                                const span = document.createElement("span");
                                span.textContent = p.name;
                                span.style.cssText = "font-size:12px;font-weight:700;color:#9ca3af;white-space:nowrap;";
                                el.parentElement?.appendChild(span);
                            }}
                        />
                    </div>
                ))}
                {/* Set B — identik persis dengan Set A */}
                {partners.map((p, i) => (
                    <div
                        key={`b-${i}`}
                        className="flex-shrink-0 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300"
                        style={{
                            height: "96px",
                            marginRight: `${ITEM_GAP}px`,
                        }}
                    >
                        <img
                            src={p.logo}
                            alt={p.name}
                            className="h-16 w-auto max-w-[120px] object-contain"
                            onError={(e) => {
                                const el = e.target as HTMLImageElement;
                                el.style.display = "none";
                                const span = document.createElement("span");
                                span.textContent = p.name;
                                span.style.cssText = "font-size:12px;font-weight:700;color:#9ca3af;white-space:nowrap;";
                                el.parentElement?.appendChild(span);
                            }}
                        />
                    </div>
                ))}
            </div>

            <style>{`
                @keyframes marquee-scroll {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </div>
    );
}

// ── STAT ──────────────────────────────────────────────────────────────────────
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

function StatCard({ stat, started }: { stat: typeof stats[0]; started: boolean }) {
    const count = useCountUp(stat.value, 1800, stat.decimal, started);
    const display = stat.decimal > 0 ? count.toFixed(stat.decimal) : Math.floor(count).toString();
    const Icon = stat.icon;
    return (
        <div className="flex items-center gap-3 py-2 w-fit">
            <div className="flex-shrink-0 w-15 h-15 flex items-center justify-center">
                <Icon className="w-12 h-12 text-gray-800" />
            </div>
            <div className="flex flex-col justify-center leading-tight">
                <div className="flex items-baseline gap-1">
                    <span className="text-xl sm:text-3xl font-bold text-black">{display}</span>
                    {stat.suffix && <span className="text-sm sm:text-lg font-bold text-black">{stat.suffix}</span>}
                </div>
                <div className="text-xs sm:text-sm text-black/60 font-medium">{stat.label}</div>
            </div>
        </div>
    );
}

function StatsRow() {
    const [started, setStarted] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);
    return (
        <div ref={ref} className="grid grid-cols-2 sm:flex sm:flex-row sm:items-center sm:justify-center gap-y-8 gap-x-4 sm:gap-6 w-full">
            {stats.map((s, i) => (
                <Fragment key={i}>
                    <div className="flex justify-center sm:block">
                        <StatCard stat={s} started={started} />
                    </div>
                    {i !== stats.length - 1 && (
                        <div className="hidden sm:block w-[2px] h-12 bg-black/15 rounded-full flex-shrink-0 self-center" />
                    )}
                </Fragment>
            ))}
        </div>
    );
}

// ── CERT CARD — portrait A4 + slider ─────────────────────────────────────────
function CertCard({ cert }: { cert: typeof sertifikasi[0] }) {
    const [slide, setSlide] = useState(0);
    const [imgError, setImgError] = useState(false);
    const hasMultiple = cert.slides.length > 1;

    const prev = () => { setImgError(false); setSlide((s) => (s - 1 + cert.slides.length) % cert.slides.length); };
    const next = () => { setImgError(false); setSlide((s) => (s + 1) % cert.slides.length); };

    return (
        <div className="flex flex-col rounded-2xl overflow-hidden border border-gray-200 bg-white hover:shadow-xl transition-shadow duration-300">

            {/* Foto area — rasio A4 (1 : √2 ≈ 1 : 1.414) */}
            <div className="relative w-full bg-gray-50" style={{ aspectRatio: "1 / 1.414" }}>
                {!imgError ? (
                    <img
                        key={cert.slides[slide]}
                        src={cert.slides[slide]}
                        alt={`${cert.title} halaman ${slide + 1}`}
                        className="absolute inset-0 w-full h-full object-contain p-4"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-300">
                        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-xs font-medium">{cert.title}</span>
                    </div>
                )}

                {/* Prev / Next buttons */}
                {hasMultiple && (
                    <>
                        <button onClick={prev}
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center transition-all duration-200 z-10 border border-gray-100">
                            <ChevronLeft className="w-4 h-4 text-gray-700" />
                        </button>
                        <button onClick={next}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center transition-all duration-200 z-10 border border-gray-100">
                            <ChevronRight className="w-4 h-4 text-gray-700" />
                        </button>

                        {/* Page counter */}
                        <span className="absolute top-2 right-2 text-xs font-bold bg-black/50 text-white px-2 py-0.5 rounded-full z-10">
                            {slide + 1} / {cert.slides.length}
                        </span>

                        {/* Dot indicators */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                            {cert.slides.map((_, i) => (
                                <button key={i} onClick={() => { setImgError(false); setSlide(i); }}
                                    className="rounded-full transition-all duration-200"
                                    style={{
                                        width: slide === i ? "18px" : "6px",
                                        height: "6px",
                                        background: slide === i ? "#FFD700" : "rgba(0,0,0,0.2)",
                                    }}
                                    aria-label={`Halaman ${i + 1}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Info area */}
            <div className="p-5 border-t border-gray-100">
                <h3 className="font-extrabold text-gray-900 text-base mb-0.5">{cert.title}</h3>
                <p className="text-xs font-bold text-[#b59a00] uppercase tracking-wider mb-2">{cert.subtitle}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{cert.desc}</p>
            </div>
        </div>
    );
}

// ── COMPONENT ─────────────────────────────────────────────────────────────────
export default function About() {
    return (
        <div className="bg-white text-gray-900">

            {/* ── HERO ── */}
            <section className="relative bg-gray-900 text-white text-center overflow-hidden h-[50vh] flex items-center justify-center">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/about-bg.png')" }} />
                <div className="absolute inset-0 bg-gray-900/20" />
                <div className="relative z-10 max-w-3xl mx-auto px-4">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Tentang Gepo Energy</h1>
                </div>
            </section>

            {/* ── STATS ── */}
            <section className="border-b-2 border-gray-100">
                <div className="max-w-5xl mx-auto px-8 sm:px-6 lg:px-16 py-14 sm:py-16">
                    <StatsRow />
                </div>
            </section>

            {/* ── OVERVIEW ── */}
            <section className="py-14 sm:py-16">
                <div className="max-w-6xl mx-auto px-8">
                    <div className="mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">Gepo Energy</h2>
                        <h2 className="text-xl sm:text-2xl font-semibold italic text-[#FFD700] text-center">Powering Your Life</h2>
                    </div>
                    <div className="text-black text-sm sm:text-base space-y-5 text-justify leading-relaxed">
                        <p><strong>Gepo Energy</strong> adalah perusahaan Engineering, Procurement, Construction (EPC) serta Operation & Maintenance (O&M) energi surya di Indonesia yang didirikan pada tahun 2023 (PT Gepo Energy Indonesia Nusantara – AHU-0070029.AH.01.09).</p>
                        <p>Kami merancang dan menghadirkan sistem energi surya yang andal, efisien, serta berorientasi pada kinerja jangka panjang, dimulai dari tahap rekayasa teknis yang tepat hingga operasional yang berkelanjutan.</p>
                        <p>Solusi kami membantu klien menurunkan biaya energi sekaligus mencapai tujuan keberlanjutan serta ESG (Environmental, Social, and Governance) melalui produk dan layanan berkualitas tinggi.</p>
                    </div>
                </div>
            </section>

            {/* ── PARTNER ── */}
            <section className="py-14 sm:py-16 px-8">
                <p className="text-center text-2xl sm:text-3xl font-bold text-black mb-16 tracking-tight">
                    Partner & <span className="text-[#FFD700] font-bold">Kolaborasi</span>
                </p>
                <Marquee />
            </section>

            {/* ── VISI & MISI ── */}
            <section className="py-14 sm:py-16 bg-white px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-gray-50/50 rounded-3xl p-10 md:p-16 shadow-lg border border-gray-100">
                        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
                            <div className="flex-1 md:w-2/5">
                                <div className="flex items-center gap-3 mb-6">
                                    <MdOutlineRemoveRedEye className="w-10 h-10 text-[#FFD700] bg-[#FFD700]/20 p-1 rounded-lg" />
                                    <span className="text-xs font-bold tracking-widest text-[#FFD700] uppercase">VISI KAMI</span>
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-semibold text-black mb-6 tracking-tighter">Visi</h3>
                                <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
                                    Menjadi perusahaan energi terbarukan yang berkomitmen mendukung transformasi energi bersih dan berkelanjutan di Indonesia.
                                </p>
                            </div>
                            <div className="flex-1 md:w-3/5">
                                <div className="flex items-center gap-3 mb-6">
                                    <TbTargetArrow className="w-10 h-10 text-[#FFD700] bg-[#FFD700]/20 p-1 rounded-lg" />
                                    <span className="text-xs font-bold tracking-widest text-[#FFD700] uppercase">MISI KAMI</span>
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-semibold text-black mb-6 tracking-tighter">Misi</h3>
                                <ul className="space-y-4">
                                    {[
                                        "Menyediakan solusi energi terbarukan yang berkualitas, andal, pada kebutuhan pelanggan dan pemangku proses.",
                                        "Mengakselerasi penerapan energi terbarukan guna mewujudkan kedaulatan energi masa depan.",
                                        "Menjalankan kegiatan usaha yang berwawasan lingkungan.",
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-gray-800 font-medium text-justify leading-relaxed">
                                            <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#FFD700] text-white flex items-center justify-center text-sm font-bold">{i + 1}</span>
                                            <span className="leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SERTIFIKASI & LEGALITAS ── */}
            <section className="py-14 sm:py-16 bg-gray-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-2">Sertifikasi & Legalitas</h2>
                    <p className="text-center text-gray-500 text-sm mb-10">
                        Dokumen resmi yang memvalidasi operasional dan standar mutu perusahaan
                    </p>
                    {/* Grid 3 kolom — kartu portrait A4 */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
                        {sertifikasi.map((cert) => (
                            <CertCard key={cert.id} cert={cert} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── COMPANY PROFILE CTA ── */}
            <section className="py-14 sm:py-16 bg-black">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">
                        Jelajahi Profil Perusahaan Kami
                    </h2>
                    <p className="text-white/70 mb-8 leading-relaxed">
                        Unduh profil perusahaan kami untuk menjalajahi perjalanan, misi, dan nilai-nilai inti kami.
                        Pelajari tentang cerita kami, apa yang mendorong kami, dan bagaimana kami berusaha memberikan dampak yang lebih baik.
                    </p>
                    <a href="/files/company-profile.pdf" download
                        className="inline-flex items-center gap-2 border border-white hover:bg-white text-white hover:text-black font-semibold px-7 py-3 rounded-full transition-all duration-300 no-underline">
                        <Download className="w-4 h-4" />Unduh
                    </a>
                </div>
            </section>

            {/* ── BOARD OF ADVISORY ── */}
            {advisors.map((advisor, i) => (
                <section key={i} className="py-14 sm:py-16 bg-white">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className={`flex flex-col ${advisor.reverse ? "md:flex-row-reverse" : "md:flex-row"} gap-10 sm:gap-16 items-center`}>
                            <div className="flex-shrink-0 w-full md:w-72">
                                <div className="rounded-2xl overflow-hidden bg-gray-200 aspect-[3/4]">
                                    <img src={advisor.photo} alt={advisor.name} className="w-full h-full object-cover"
                                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                                </div>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold tracking-widest uppercase text-[#b59a00] mb-2">{advisor.role}</p>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">{advisor.name}</h2>
                                <div className="text-gray-600 leading-relaxed">{advisor.desc}</div>
                            </div>
                        </div>
                    </div>
                </section>
            ))}

            {/* ── C-LEVEL — foto atas, teks bawah, benar-benar terpisah ── */}
            <section className="py-16 sm:py-24 bg-gray-50 text-black">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-12">C-Level Gepo Energy</h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        {leaders.map((leader, i) => (
                            <div key={i}
                                className="flex flex-col rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:ring-2 hover:ring-[#FFD700] transition-all duration-300 bg-white w-full sm:w-[320px] lg:w-[300px]"
                            >
                                {/* ── FOTO — sesuaikan aspect ratio di sini ── */}
                                {/*
                                    Untuk mengubah ukuran foto:
                                    - Ganti nilai aspectRatio, misal "1/1" untuk kotak, "3/4" untuk portrait
                                    - object-top = foto rata atas (cocok untuk foto orang)
                                    - object-center = foto rata tengah
                                */}
                                <div
                                    className="w-full overflow-hidden bg-gray-100"
                                    style={{ aspectRatio: "3 / 4" }}
                                >
                                    <img
                                        src={leader.photo}
                                        alt={leader.name}
                                        className="w-full h-full object-cover object-top"
                                        onError={(e) => {
                                            const el = e.target as HTMLImageElement;
                                            el.style.display = "none";
                                            if (el.parentElement) {
                                                el.parentElement.style.display = "flex";
                                                el.parentElement.style.alignItems = "center";
                                                el.parentElement.style.justifyContent = "center";
                                                el.parentElement.style.color = "#9ca3af";
                                                el.parentElement.style.fontSize = "13px";
                                                el.parentElement.innerText = "[ Foto ]";
                                            }
                                        }}
                                    />
                                </div>

                                {/* ── TEKS — sepenuhnya di bawah foto, tidak overlap ── */}
                                <div className="p-5 border-t border-gray-100">
                                    <div className="border-l-4 border-[#FFD700] pl-3 mb-3">
                                        <h3 className="font-bold text-gray-900 text-base leading-snug">{leader.name}</h3>
                                        <p className="text-[#b59a00] text-sm font-semibold mt-0.5">{leader.role}</p>
                                    </div>
                                    <div className="text-gray-600 text-sm leading-relaxed">
                                        {leader.desc}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}