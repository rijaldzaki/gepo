import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import { ChevronLeft, ChevronRight } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// FIX LEAFLET DEFAULT ICON
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ANIMATED RADAR ICON — kuning/orange
const radarIcon = new L.DivIcon({
    className: "",
    html: `
        <span class="radar-wrapper">
            <span class="radar-ring radar-ring-1"></span>
            <span class="radar-ring radar-ring-2"></span>
            <span class="radar-core"></span>
        </span>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20],
});

interface Project {
    id: number;
    title: string;
    location: string;
    capacity: string;
    tipe: string;
    panel: string;
    lat: number;
    lng: number;
    description: string;
    photos: string[];
}

const projects: Project[] = [
    {
        id: 1,
        title: "Dusun Tamanan",
        location: "D.I Yogyakarta",
        capacity: "300 Wp",
        tipe: "Hybrid",
        panel: "Monofacial",
        lat: -7.817,
        lng: 110.456,
        description: "...",
        photos: [
            "/images/projects/tamanan.jpg",
            "/images/projects/tamanan2.jpg",
            "/images/projects/tamanan3.jpg",
        ],
    },
    {
        id: 2,
        title: "Desa Pitu",
        location: "Ngawi, Jawa Timur",
        capacity: "3000 Wp",
        tipe: "Hybrid",
        panel: "Monofacial",
        lat: -7.503,
        lng: 111.458,
        description:
            "Bekerja sama dengan Pertamina Foundation, Gepo Energy melakukan instalasi Genting Photovoltaic (GEPO) sebanyak 300 unit (3000 Wp) pada fasilitas rumah kompos terintegrasi dengan sistem hybrid untuk proses produksi kompos.",
        photos: [
            "/images/projects/pitu.jpg",
            "/images/projects/pitu2.jpg",
            "/images/projects/pitu3.jpg",
        ],
    },
    {
        id: 3,
        title: "Dlingo",
        location: "Bantul, D.I Yogyakarta",
        capacity: "2500 Wp",
        tipe: "Hybrid",
        panel: "Monofacial",
        lat: -7.953,
        lng: 110.432,
        description:
            "Bekerja sama dengan BEM KM UGM, Gepo Energy melakukan instalasi panel surya monofacial hybrid sebesar 2500 Wp pada atap parkiran di pekarangan masjid. Daya digunakan untuk ketersediaan air bersih warga sekitar.",
        photos: [
            "/images/projects/dlingo.jpg",
            "/images/projects/dlingo2.jpg",
            "/images/projects/dlingo3.jpg",
        ],
    },
];

function ProjectPopup({ project }: { project: Project }) {
    const [slide, setSlide] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const hasMultiple = project.photos.length > 1;

    useEffect(() => {
        if (!hasMultiple) return;
        timerRef.current = setInterval(() => {
            setSlide((s) => (s + 1) % project.photos.length);
        }, 5000);
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [project.photos.length, hasMultiple]);

    const goTo = (i: number) => {
        if (timerRef.current) clearInterval(timerRef.current);
        setSlide(i);
        if (hasMultiple) {
            timerRef.current = setInterval(() => {
                setSlide((s) => (s + 1) % project.photos.length);
            }, 5000);
        }
    };
    const prev = () => goTo((slide - 1 + project.photos.length) % project.photos.length);
    const next = () => goTo((slide + 1) % project.photos.length);

    return (
        <div style={{ width: "320px", fontFamily: "inherit" }}>
            {/* Header */}
            <div style={{
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                color: "#fff",
                padding: "14px 16px",
                borderRadius: "10px 10px 0 0",
            }}>
                <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 700 }}>{project.title}</h3>
                <p style={{ margin: "4px 0 0", fontSize: "13px", opacity: 0.9 }}>📍 {project.location}</p>
            </div>

            {/* Foto — slider */}
            <div style={{ height: "160px", background: "#e5e7eb", overflow: "hidden", position: "relative" }}>
                {/* Track slide */}
                <div style={{
                    display: "flex",
                    width: `${project.photos.length * 100}%`,
                    height: "100%",
                    transform: `translateX(-${slide * (100 / project.photos.length)}%)`,
                    transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                }}>
                    {project.photos.map((src, i) => (
                        <div key={i} style={{
                            width: `${100 / project.photos.length}%`,
                            height: "100%",
                            flexShrink: 0,
                        }}>
                            <img
                                src={src}
                                alt={`${project.title} foto ${i + 1}`}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                onError={(e) => {
                                    const img = e.target as HTMLImageElement;
                                    const parent = img.parentElement;
                                    img.style.display = "none";
                                    if (!parent) return;
                                    parent.style.display = "flex";
                                    parent.style.alignItems = "center";
                                    parent.style.justifyContent = "center";
                                    parent.style.color = "#9ca3af";
                                    parent.style.fontSize = "13px";
                                    parent.innerText = "[ Foto Proyek ]";
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* Prev / Next */}
                {hasMultiple && (
                    <>
                        <button onClick={prev} style={{
                            position: "absolute", left: "6px", top: "50%", transform: "translateY(-50%)",
                            width: "28px", height: "28px", borderRadius: "50%",
                            background: "rgba(255,255,255,0.9)", border: "1px solid #e5e7eb",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "pointer", zIndex: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                        }}>
                            <ChevronLeft style={{ width: "14px", height: "14px", color: "#374151" }} />
                        </button>
                        <button onClick={next} style={{
                            position: "absolute", right: "6px", top: "50%", transform: "translateY(-50%)",
                            width: "28px", height: "28px", borderRadius: "50%",
                            background: "rgba(255,255,255,0.9)", border: "1px solid #e5e7eb",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "pointer", zIndex: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                        }}>
                            <ChevronRight style={{ width: "14px", height: "14px", color: "#374151" }} />
                        </button>

                        {/* Dots */}
                        <div style={{
                            position: "absolute", bottom: "8px", left: "50%",
                            transform: "translateX(-50%)", display: "flex", gap: "5px", zIndex: 10,
                        }}>
                            {project.photos.map((_, i) => (
                                <button key={i} onClick={() => goTo(i)} style={{
                                    width: slide === i ? "16px" : "6px",
                                    height: "6px", borderRadius: "9999px",
                                    background: slide === i ? "#f59e0b" : "rgba(255,255,255,0.6)",
                                    border: "none", cursor: "pointer", padding: 0,
                                    transition: "all 0.3s",
                                }} />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Body — sama seperti sebelumnya */}
            <div style={{ padding: "14px 16px", background: "#fff" }}>
                <div style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr",
                    gap: "10px", marginBottom: "14px",
                    paddingBottom: "14px", borderBottom: "1px solid #f3f4f6",
                }}>
                    <div style={{ background: "#fffbeb", borderRadius: "8px", padding: "10px 12px" }}>
                        <p style={{ margin: 0, fontSize: "11px", color: "#92400e", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Kapasitas</p>
                        <p style={{ margin: "4px 0 0", fontSize: "15px", fontWeight: 700, color: "#111827" }}>{project.capacity}</p>
                    </div>
                    <div style={{ background: "#fffbeb", borderRadius: "8px", padding: "10px 12px" }}>
                        <p style={{ margin: 0, fontSize: "11px", color: "#92400e", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Tipe</p>
                        <p style={{ margin: "4px 0 0", fontSize: "15px", fontWeight: 700, color: "#111827" }}>{project.tipe}</p>
                    </div>
                </div>
                <p style={{ margin: 0, fontSize: "14px", color: "#4b5563", lineHeight: "1.7" }}>
                    {project.description}
                </p>
            </div>
        </div>
    );
}

const leafletStyle = `
    /* Popup wrapper */
    .leaflet-popup-content-wrapper {
        padding: 0 !important;
        border-radius: 10px !important;
        overflow: hidden;
        box-shadow: 0 12px 48px rgba(0,0,0,0.18) !important;
        border: 1px solid #e5e7eb;
    }
    .leaflet-popup-content {
        margin: 0 !important;
        width: auto !important;
    }
    .leaflet-popup-tip-container {
        margin-top: -1px;
    }
    .leaflet-container {
        font-family: inherit;
        z-index: 0;
    }

    /* Close button — lebih besar + border box */
    .leaflet-popup-close-button {
        width: 28px !important;
        height: 28px !important;
        top: 8px !important;
        right: 8px !important;
        font-size: 18px !important;
        font-weight: 700 !important;
        color: #fff !important;
        background: rgba(0,0,0,0.25) !important;
        border-radius: 6px !important;
        border: 1px solid rgba(255,255,255,0.4) !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        line-height: 1 !important;
        transition: background 0.2s !important;
    }
    .leaflet-popup-close-button:hover {
        background: rgba(0,0,0,0.5) !important;
        color: #fff !important;
    }

    /* Radar icon animation */
    .radar-wrapper {
        position: relative;
        display: block;
        width: 36px;
        height: 36px;
    }
    .radar-core {
        position: absolute;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        width: 14px; height: 14px;
        background: #f59e0b;
        border: 2.5px solid #fff;
        border-radius: 50%;
        box-shadow: 0 0 0 2px #f59e0b;
        z-index: 2;
    }
    .radar-ring {
        position: absolute;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%) scale(0);
        border-radius: 50%;
        background: rgba(245, 158, 11, 0.35);
        animation: radar-pulse 2s ease-out infinite;
    }
    .radar-ring-1 { width: 36px; height: 36px; animation-delay: 0s; }
    .radar-ring-2 { width: 36px; height: 36px; animation-delay: 0.8s; }
    @keyframes radar-pulse {
        0%   { transform: translate(-50%, -50%) scale(0.3); opacity: 0.8; }
        100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
    }

    /* Zoom control — kanan bawah */
    .leaflet-bottom.leaflet-right { bottom: 16px; right: 16px; }
    .leaflet-control-zoom {
        border: 1px solid #e5e7eb !important;
        border-radius: 8px !important;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
    }
    .leaflet-control-zoom a {
        width: 32px !important;
        height: 32px !important;
        line-height: 32px !important;
        font-size: 18px !important;
        color: #374151 !important;
    }
    .leaflet-control-zoom a:hover { background: #f9fafb !important; }
`;

export default function Project() {
    useEffect(() => {
        const style = document.createElement("style");
        style.innerHTML = leafletStyle;
        document.head.appendChild(style);
        return () => { document.head.removeChild(style); };
    }, []);

    return (
        <div className="bg-white text-gray-900">
            {/* ── HERO ── */}
            <section className="relative bg-gray-900 text-white text-center overflow-hidden h-[50vh] flex items-center justify-center">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/about-bg.png')" }} />
                <div className="absolute inset-0 bg-gray-900/20" />
                <div className="relative z-10 max-w-3xl mx-auto px-4">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Proyek</h1>
                </div>
            </section>

            {/* ── HEADING SEBARAN PROYEK ── */}
            <section className="py-14 px-4 sm:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-8 text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Sebaran Proyek</h2>
                        <p className="text-gray-500 text-sm sm:text-base">Lokasi energi surya yang telah kami kerjakan</p>
                    </div>

                    {/* MAP dalam bordered box */}
                    <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg" style={{ height: "520px", position: "relative", zIndex: 0 }}>
                        <MapContainer
                            center={[-7.5, 110.5]}
                            zoom={7}
                            style={{ width: "100%", height: "100%" }}
                            scrollWheelZoom={false}
                            zoomControl={false}
                        >
                            {/* Light gray tile — CartoDB Positron */}
                            <TileLayer
                                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
                            />

                            {/* Zoom control di kanan bawah */}
                            <ZoomControl position="bottomright" />

                            {projects.map((project) => (
                                <Marker key={project.id} position={[project.lat, project.lng]} icon={radarIcon}>
                                    <Popup maxWidth={320} minWidth={320}>
                                        <ProjectPopup project={project} />
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>
                </div>
            </section>
        </div>
    );
}