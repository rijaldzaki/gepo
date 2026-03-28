import { useState, useEffect, useRef, Fragment } from "react";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";
import { MdOutlineEnergySavingsLeaf, MdOutlineRemoveRedEye } from "react-icons/md";
import { TbBuildingFactory, TbTargetArrow } from "react-icons/tb";
import { FaSolarPanel } from "react-icons/fa6";
import { LuTrees } from "react-icons/lu";
import { IconType } from "react-icons";

// DATA
const stats: { value: number; decimal: number; suffix: string; label: string; icon: IconType }[] = [
    { value: 3,     decimal: 0, suffix: "",           label: "proyek",        icon: FaSolarPanel },
    { value: 10,    decimal: 0, suffix: " kWh",       label: "energi hijau",  icon: MdOutlineEnergySavingsLeaf },
    { value: 11.49, decimal: 2, suffix: " ton/years", label: "CO₂ terhindar", icon: TbBuildingFactory },
    { value: 523,   decimal: 0, suffix: "",           label: "pohon ditanam", icon: LuTrees },
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

// Sertifikasi
const sertifikasi = [
    {
        id: "nib",
        title: "Nomor Induk Berusaha (NIB)",
        subtitle: "",
        desc: "Perizinan Berusaha Berbasis Risiko",
        slides: [
            "/images/nib.jpeg",
            "/images/nib2.jpeg",
        ],
    },
    {
        id: "sk",
        title: "SK Kemenkumham",
        subtitle: "",
        desc: "Pengesahan Pendirian Badan Hukum Perseroan Terbatas",
        slides: ["/images/kemhumham.jpeg"],
    },
    {
        id: "iso",
        title: "ISO 9001:2015",
        subtitle: "",
        desc: "Sistem Manajemen Mutu",
        slides: ["/images/iso.jpeg"],
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
        name: "Ir. Galuh Adi Insani, S.Pt., MSc., IPM.",
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

// MARQUEE
const ITEM_W   = 148;
const ITEM_GAP = 54;
const SET_PX   = partners.length * (ITEM_W + ITEM_GAP);

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

// STAT
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

// CERT
function CertCard({ cert }: { cert: typeof sertifikasi[0] }) {
    const [slide, setSlide] = useState(0);
    const hasMultiple = cert.slides.length > 1;
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Auto-slide setiap 3 detik — hanya jika lebih dari 1 slide
    useEffect(() => {
        if (!hasMultiple) return;
        timerRef.current = setInterval(() => {
            setSlide((s) => (s + 1) % cert.slides.length);
        }, 5000);
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [cert.slides.length, hasMultiple]);

    const goTo = (i: number) => {
        if (timerRef.current) clearInterval(timerRef.current);
        setSlide(i);
        if (hasMultiple) {
            timerRef.current = setInterval(() => {
                setSlide((s) => (s + 1) % cert.slides.length);
            }, 5000);
        }
    };

    const prev = () => goTo((slide - 1 + cert.slides.length) % cert.slides.length);
    const next = () => goTo((slide + 1) % cert.slides.length);

    return (
        <div className="flex flex-col rounded-2xl overflow-hidden bg-white shadow-lg h-full hover:scale-103 transition-all duration-300">
            <div className="relative w-full bg-white overflow-hidden" style={{ aspectRatio: "1 / 1.414" }}>
                <div
                    className="absolute inset-0 flex"
                    style={{
                        width: `${cert.slides.length * 100}%`,
                        transform: `translateX(-${slide * (100 / cert.slides.length)}%)`,
                        transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                >
                    {cert.slides.map((src, i) => (
                        <div
                            key={i}
                            className="relative flex-shrink-0 flex items-center justify-center p-4"
                            style={{ width: `${100 / cert.slides.length}%`, height: "100%" }}
                        >
                            <img
                                src={src}
                                alt={`${cert.title} halaman ${i + 1}`}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    ))}
                </div>
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

                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                            {cert.slides.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goTo(i)}
                                    className="rounded-full transition-all duration-300"
                                    style={{
                                        width: slide === i ? "18px" : "6px",
                                        height: "6px",
                                        background: slide === i ? "#FFD700" : "rgba(0,0,0,0.25)",
                                    }}
                                    aria-label={`Halaman ${i + 1}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
            <div className="p-5 border-t border-gray-100">
                <h3 className="font-extrabold text-black text-base mb-0.5">{cert.title}</h3>
                <p className="text-xs font-bold text-[#b59a00] uppercase tracking-wider mb-2">{cert.subtitle}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{cert.desc}</p>
            </div>
        </div>
    );
}

// COMPONENT
export default function About() {
    return (
        <div className="bg-white text-gray-900">

            {/*HERO*/}
            <section className="relative bg-gray-900 text-white text-center overflow-hidden h-screen sm:h-[50vh] flex items-center justify-center">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/about-bg.png')" }} />
                <div className="absolute inset-0 bg-gray-900/50" />
                <div className="relative z-10 max-w-3xl mx-auto px-4">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Tentang Gepo Energy</h1>
                </div>
            </section>

            {/*STATS*/}
            <section className="border-b-2 border-gray-100">
                <div className="max-w-5xl mx-auto px-8 sm:px-6 lg:px-16 py-14 sm:py-16">
                    <StatsRow />
                </div>
            </section>

            {/*OVERVIEW*/}
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

            {/*PARTNER*/}
            <section className="py-14 sm:py-16 px-8">
                <p className="text-center text-2xl sm:text-3xl font-bold text-black mb-16 tracking-tight">
                    Partner & <span className="text-[#FFD700] font-bold">Kolaborasi</span>
                </p>
                <Marquee />
            </section>

            {/*VISI & MISI*/}
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

            {/*SERTIFIKASI & LEGALITAS*/}
            <section className="py-14 sm:py-16 bg-gray-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-10">Sertifikat & <span className="text-[#FFD700]">Legalitas</span></h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-stretch">
                        {sertifikasi.map((cert) => (
                            <CertCard key={cert.id} cert={cert} />
                        ))}
                    </div>
                </div>
            </section>

            {/*COMPANY PROFILE CTA*/}
            <section className="py-14 sm:py-16 bg-black">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">
                        Jelajahi Profil Perusahaan Kami
                    </h2>
                    <p className="text-white/70 mb-8 leading-relaxed">
                        Unduh profil perusahaan kami untuk menjalajahi perjalanan, misi, dan nilai-nilai inti kami.
                        Pelajari tentang cerita kami, apa yang mendorong kami, dan bagaimana kami berusaha memberikan dampak yang lebih baik.
                    </p>
                    <a href="/files/compro.pdf" download
                        className="inline-flex items-center gap-2 border border-white hover:bg-white text-white hover:text-black font-semibold px-7 py-3 rounded-full transition-all duration-300 no-underline">
                        <Download className="w-4 h-4" />Unduh
                    </a>
                </div>
            </section>

            {/*BOARD OF ADVISORY*/}
            {advisors.map((advisor, i) => (
                <section key={i} className="py-14 sm:py-16 bg-white">
                    <div className="max-w-5xl  mx-auto px-8 sm:px-6">
                        <div className={`flex flex-col ${advisor.reverse ? "md:flex-row-reverse" : "md:flex-row"} gap-10 sm:gap-16 items-center`}>
                            <div className="flex-shrink-0 w-full md:w-72">
                                <div className="rounded-2xl overflow-hidden bg-gray-200 aspect-[3/4] shadow-lg transition-all duration-500 hover:scale-105">
                                    <img src={advisor.photo} alt={advisor.name} className="w-full h-full object-cover"
                                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                                </div>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold tracking-widest uppercase text-[#FFD700] mb-2">{advisor.role}</p>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">{advisor.name}</h2>
                                <div className="text-gray-600 leading-relaxed">{advisor.desc}</div>
                            </div>
                        </div>
                    </div>
                </section>
            ))}

            {/*C-LEVEL*/}
            <section className="py-16 sm:py-24 bg-gray-50 text-black">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-12">C-Level Gepo Energy</h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        {leaders.map((leader, i) => (
                            <div key={i}
                                className="flex flex-col rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:ring-2 hover:ring-[#FFD700] hover:scale-101 transition-all duration-500 w-full sm:w-[320px] lg:w-[300px]"
                            >
                                <div
                                    className="w-full overflow-hidden"
                                    style={{ aspectRatio: "3 / 4" }}
                                >
                                    <img
                                        src={leader.photo}
                                        alt={leader.name}
                                        className="w-full h-full object-cover object-top scale-[1.01]"
                                        onError={(e) => {
                                            const el = e.target as HTMLImageElement;
                                            el.style.display = "none";
                                            if (el.parentElement) {
                                                el.parentElement.style.display = "flex";
                                                el.parentElement.style.alignItems = "center";
                                                el.parentElement.style.justifyContent = "center";
                                                el.parentElement.style.backgroundColor = "#000"; // Fallback jika foto error
                                                el.parentElement.style.color = "#fff";
                                                el.parentElement.style.fontSize = "13px";
                                                el.parentElement.innerText = "[ Foto ]";
                                            }
                                        }}
                                    />
                                </div>
                                <div className="p-5 bg-black flex-1"> 
                                    <div className="border-l-4 border-[#FFD700] pl-3 mb-3">
                                        <h3 className="font-bold text-white text-base leading-snug">{leader.name}</h3>
                                        <p className="text-[#FFD700] text-sm font-semibold mt-0.5">{leader.role}</p>
                                    </div>
                                    <div className="text-white text-sm leading-relaxed">
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