import { useState, useEffect, useRef, Fragment } from "react";
import { Download } from "lucide-react";
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
    { value: 523,   decimal: 0, suffix: "",           label: "pohon ditanam", icon: LuTrees  },
];

const partners = [
    { name: "UGM", logo: "/images/partners/ugm.png" },
    { name: "UGM", logo: "/images/partners/ugm.png" },
    { name: "UGM", logo: "/images/partners/ugm.png" },
    { name: "UGM", logo: "/images/partners/ugm.png" },
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
const PartnerItem = ({ p }: { p: typeof partners[0] }) => (
    <div className="flex-shrink-0 flex items-center justify-center h-32 px-4 transition-all duration-300 opacity-60 hover:opacity-100">
        <img src={p.logo} alt={p.name} className="h-24 sm:h-28 w-auto object-contain" />
    </div>
);

function Marquee() {
    return (
        <div className="overflow-hidden relative w-full">
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />
            <div className="flex w-max animate-marquee-infinite">
                <div className="flex gap-12 items-center px-5">
                    {partners.map((p, i) => <PartnerItem key={`a-${i}`} p={p} />)}
                </div>
                <div className="flex gap-12 items-center px-5">
                    {partners.map((p, i) => <PartnerItem key={`b-${i}`} p={p} />)}
                </div>
            </div>
            <style>{`
                .animate-marquee-infinite { animation: marquee 5s linear infinite; }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </div>
    );
}

// ── STAT CARD ─────────────────────────────────────────────────────────────────
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

function StatCard({ stat, started }: { stat: typeof stats[0]; started: boolean }) {
    const count = useCountUp(stat.value, 1800, stat.decimal, started);
    const display = stat.decimal > 0 ? count.toFixed(stat.decimal) : Math.floor(count).toString();
    const Icon = stat.icon;

return (
        <div
            className="flex items-center gap-3 py-2 w-fit"
            style={{ background: "transparent" }} // Hilangkan border kotak jika ingin tampilan bersih seperti di gambar
        >
            {/* Icon Container - Beri ukuran tetap agar tidak goyang */}
            <div className="flex-shrink-0 w-15 h-15 flex items-center justify-center">
                <Icon className="w-12 h-12 text-gray-800" />
            </div>

            {/* Text Container */}
            <div className="flex flex-col justify-center leading-tight">
                <div className="flex items-baseline gap-1">
                    <span className="text-xl sm:text-3xl font-bold text-black">
                        {display}
                    </span>
                    {stat.suffix && (
                        <span className="text-sm sm:text-lg font-bold text-black">
                            {stat.suffix}
                        </span>
                    )}
                </div>
                <div className="text-xs sm:text-sm text-black/60 font-medium">
                    {stat.label}
                </div>
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
            className="grid grid-cols-2 sm:flex sm:flex-row sm:items-center sm:justify-center gap-y-8 gap-x-4 sm:gap-6 w-full"
        >
            {stats.map((s, i) => (
                <Fragment key={i}>
                    {/* Pembungkus agar Card di mobile tetap rapi di tengah kolom grid */}
                    <div className="flex justify-center sm:block">
                        <StatCard stat={s} started={started} />
                    </div>
                    
                        {i !== stats.length - 1 && (
                            <div className="hidden sm:block w-[2px] h-12 bg-[#000000]/15 rounded-full flex-shrink-0 self-center" />
                        )}
                </Fragment>
            ))}
        </div>
    );
}

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function About() {
    return (
        <div className="bg-white text-gray-900">
            {/* ── HERO ── */}
            <section className="relative bg-gray-900 text-white text-center overflow-hidden h-[50vh] flex items-center justify-center">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/about-bg.png')" }}
                />
                <div className="absolute inset-0 bg-gray-900/20" />
                <div className="relative z-10 max-w-3xl mx-auto px-4">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                        Tentang Gepo Energy
                    </h1>
                </div>
            </section>

            {/* ── STATS ── */}
            <section className="border-b-2 border-gray-100">
                <div className="max-w-5xl mx-auto px-8 sm:px-6 lg:px-16 py-14 sm:py-16">
                    <StatsRow />
                </div>
            </section>

            {/* ── OVERVIEW COMPANY ── */}
            <section className="py-14 sm:py-16">
                <div className="max-w-6xl mx-auto px-8">
                    <div className="intem-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">Gepo Energy</h2>
                        <h2 className="text-xl sm:text-2xl font-semibold italic text-[#FFD700] text-center">Powering Your Life </h2>
                    </div>
                    <div className="text-black text-sm sm:text-base space-y-5 text-justify leading-relaxed">
                        <p>
                            <strong>Gepo Energy</strong> adalah perusahaan Engineering, Procurement, Construction (EPC) serta
                            Operation & Maintenance (O&M) energi surya di Indonesia yang didirikan pada tahun 2023
                            (PT Gepo Energy Indonesia Nusantara – AHU-0070029.AH.01.09).
                        </p>
                        <p>
                            Kami merancang dan menghadirkan sistem energi surya yang andal, efisien, serta berorientasi
                            pada kinerja jangka panjang, dimulai dari tahap rekayasa teknis yang tepat hingga operasional
                            yang berkelanjutan.
                        </p>
                        <p>
                            Solusi kami membantu klien menurunkan biaya energi sekaligus mencapai tujuan keberlanjutan
                            serta ESG (Environmental, Social, and Governance) melalui produk dan layanan berkualitas tinggi.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── PARTNER ── */}
            <section className="py-14 sm:py-16 px-8">
                <p className="text-center text-2xl sm:text-3xl font-bold text-black mb-16 tracking-tight">
                    Partner & <span className="text-[#FFD700] font-bold">Kolaborasi</span>{" "}
                </p>
                <Marquee />
            </section>

            {/* ── VISI & MISI ── */}
            <section className="py-14 sm:py-16 bg-white px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-gray-50/50 rounded-3xl p-10 md:p-16 shadow-lg border border-gray-100">
                        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
                            
                            {/* ── KOLOM VISI ── */}
                            <div className="flex-1 md:w-2/5">
                                {/* Header: Label + Ikon + Border Kiri */}
                                <div className="flex items-center gap-3 mb-6">
                                    
                                    <MdOutlineRemoveRedEye className="w-10 h-10 text-[#FFD700] bg-[#FFD700]/20 p-1 rounded-lg" />
                                    
                                    {/* Label Atas */}
                                    <span className="text-xs font-bold tracking-widest text-[#FFD700] uppercase">
                                        VISI KAMI
                                    </span>
                                </div>
                                
                                {/* Judul Utama */}
                                <h3 className="text-2xl sm:text-3xl font-semibold text-black mb-6 tracking-tighter">
                                    Visi
                                </h3>
                                
                                {/* Teks Deskripsi */}
                                <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
                                    Menjadi perusahaan energi terbarukan yang berkomitmen mendukung transformasi energi bersih dan berkelanjutan di Indonesia. 
                                </p>
                            </div>

                            {/* ── KOLOM MISI ── */}
                            <div className="flex-1 md:w-3/5">
                                {/* Header: Label + Ikon + Border Kiri */}
                                <div className="flex items-center gap-3 mb-6">
                                    
                                    <TbTargetArrow className="w-10 h-10 text-[#FFD700] bg-[#FFD700]/20 p-1 rounded-lg" />
                                    
                                    {/* Label Atas */}
                                    <span className="text-xs font-bold tracking-widest text-[#FFD700] uppercase">
                                        MISI KAMI
                                    </span>
                                </div>
                                
                                {/* Judul Utama */}
                                <h3 className="text-2xl sm:text-3xl font-semibold text-black mb-6 tracking-tighter">
                                    Misi
                                </h3>
                                {/* Teks Deskripsi (Diubah menjadi Paragraf utuh agar rapi seperti di gambar) */}
                                <ul className="space-y-4">
                                    {[
                                            "Menyediakan solusi energi terbarukan yang berkualitas, andal, pada kebutuhan pelanggan dan pemangku proses.",
                                            "Mengakselerasi penerapan energi terbarukan guna mewujudkan kedaulatan energi masa depan.",
                                            "Menjalankan kegiatan usaha yang berwawasan lingkungan.",
                                            ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-gray-800 font-medium text-justify leading-relaxed">
                                                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#FFD700] text-white flex items-center justify-center text-sm font-bold">
                                                    {i + 1}
                                                </span>
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
            <section className="py-14 sm:py-16">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-10">
                        Sertifikasi & Legalitas
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {[
                            {
                                img: "/images/sertifikat/nib.jpg",
                                alt: "Sertifikat NIB",
                                title: "Sertifikat Perizinan Usaha Berbasis Risiko (NIB)",
                                desc: "Nikosi usaha yang valid, membantu klien kami mendapatkan layanan yang diakui pemerintah.",
                            },
                            {
                                img: "/images/sertifikat/sni.jpg",
                                alt: "Sertifikat SNI",
                                title: "Sertifikat Standar (Sertifikat SNI)",
                                desc: "Lulus uji ketahanan pada sertifikasi standar yang memastikan pemenuhan sertifikasi yang semestinya.",
                            },
                        ].map((cert, i) => (
                            <div
                                key={i}
                                className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="bg-gray-100 h-52 w-full overflow-hidden flex items-center justify-center text-black text-sm">
                                    <img
                                        src={cert.img}
                                        alt={cert.alt}
                                        className="h-full w-full object-cover"
                                        onError={(e) => {
                                            const el = e.target as HTMLImageElement;
                                            el.style.display = "none";
                                            if (el.parentElement) el.parentElement.textContent = `[ ${cert.alt} ]`;
                                        }}
                                    />
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-black mb-1">{cert.title}</h3>
                                    <p className="text-sm text-black">{cert.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── COMPANY PROFILE CTA ── */}
            <section className="py-14 sm:py-16 bg-black">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 tracking-tight">
                        Jelajahi Profil Perusahaan Kami
                    </h2>
                    <p className="text-white mb-8 leading-relaxed">
                        Unduh profil perusahaan kami untuk menjalajahi perjalanan, misi, dan nilai-nilai inti kami.
                        Pelajari tentang cerita kami, apa yang mendorong kami, dan bagaimana kami berusaha memberikan dampak yang lebih baik.
                    </p>
                    <a
                        href="/files/company-profile.pdf"
                        download
                        className="inline-flex items-center gap-2 border border-white hover:bg-white text-white hover:text-black font-semibold px-7 py-3 rounded-full transition-all duration-300 font-montserrat no-underline"
                    >
                        <Download className="w-4 h-4" />
                        Unduh
                    </a>
                </div>
            </section>

            {/* ── BOARD OF ADVISORY ── */}
            {advisors.map((advisor, i) => (
                <section key={i} className="py-14 sm:py-16 bg-white">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div
                            className={`flex flex-col ${
                                advisor.reverse ? "md:flex-row-reverse" : "md:flex-row"
                            } gap-10 sm:gap-16 items-center`}
                        >
                            {/* Photo */}
                            <div className="flex-shrink-0 w-full md:w-72">
                                <div className="rounded-2xl overflow-hidden bg-gray-200 aspect-[3/4]">
                                    <img
                                        src={advisor.photo}
                                        alt={advisor.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = "none";
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Text */}
                            <div className="flex-1">
                                <p className="text-sm font-bold tracking-widest uppercase text-[#b59a00] mb-2">
                                    {advisor.role}
                                </p>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">
                                    {advisor.name}
                                </h2>
                                <p className="text-gray-600 leading-relaxed">{advisor.desc}</p>
                            </div>
                        </div>
                    </div>
                </section>
            ))}

            {/* ── TEAM LEADERS ── */}
            {/* ── TEAM LEADERS ── */}
            <section className="py-16 sm:py-24 bg-gray-50 text-black">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-12">
                        C-Level Gepo Energy
                    </h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        {leaders.map((leader, i) => (
                            <div
                                key={i}
                                className="flex flex-col bg-black rounded-2xl overflow-hidden hover:ring-2 hover:ring-[#FFD700] transition-all duration-300 w-full sm:min-w-[320px] lg:min-w-[280px] max-w-[350px]"
                            >
                                {/* Photo */}
                                <div className="bg-gray-700 aspect-[3/3] w-full overflow-hidden">
                                    <img
                                        src={leader.photo}
                                        alt={leader.name}
                                        className="w-full h-full object-cover object-top"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = "none";
                                        }}
                                    />
                                </div>
                                {/* Info */}
                                <div className="p-6 flex-1 text-left">
                                    <div className="border-l-4 border-[#FFD700] pl-3 mb-4">
                                        <h3 className="font-bold text-white text-base leading-snug">{leader.name}</h3>
                                        <p className="text-[#FFD700] text-sm font-medium mt-0.5">{leader.role}</p>
                                    </div>
                                    <div className="text-gray-400 text-sm leading-relaxed">
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
