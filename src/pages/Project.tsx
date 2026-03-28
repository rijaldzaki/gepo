import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaMapMarkerAlt } from "react-icons/fa";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLang } from "../context/LanguageContext";

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const radarIcon = new L.DivIcon({
    className: "",
    html: `<span class="radar-wrapper"><span class="radar-ring radar-ring-1"></span><span class="radar-ring radar-ring-2"></span><span class="radar-core"></span></span>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20],
});

// Static project data (coords, capacity, type, photos never change)
const projectsStatic = [
    { id: 1, lat: -7.817, lng: 110.456, capacity: "300 Wp", tipe: "Hybrid", panel: "Monofacial", photos: ["/images/projects/tamanan1.jpeg", "/images/projects/tamanan2.png"] },
    { id: 2, lat: -7.503, lng: 111.458, capacity: "3000 Wp", tipe: "Hybrid", panel: "Monofacial", photos: ["/images/projects/pitu1.jpeg", "/images/projects/pitu2.png"] },
    { id: 3, lat: -7.953, lng: 110.432, capacity: "2500 Wp", tipe: "Hybrid", panel: "Monofacial", photos: ["/images/projects/dlingo1.jpeg", "/images/projects/dlingo2.jpeg"] },
];

function ProjectPopup({ projectIndex }: { projectIndex: number }) {
    const { t, tr } = useLang();
    const p = tr.project;
    const sp = projectsStatic[projectIndex];

    const titles = [t(p.p1Title), t(p.p2Title), t(p.p3Title)];
    const locations = [t(p.p1Location), t(p.p2Location), t(p.p3Location)];
    const descs = [t(p.p1Desc), t(p.p2Desc), t(p.p3Desc)];

    const [slide, setSlide] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const hasMultiple = sp.photos.length > 1;

    useEffect(() => {
        if (!hasMultiple) return;
        timerRef.current = setInterval(() => setSlide((s) => (s + 1) % sp.photos.length), 3000);
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [sp.photos.length, hasMultiple]);

    const goTo = (i: number) => {
        if (timerRef.current) clearInterval(timerRef.current);
        setSlide(i);
        if (hasMultiple) timerRef.current = setInterval(() => setSlide((s) => (s + 1) % sp.photos.length), 3000);
    };

    const prev = () => goTo((slide - 1 + sp.photos.length) % sp.photos.length);
    const next = () => goTo((slide + 1) % sp.photos.length);

    return (
        <div style={{ width: "350px", fontFamily: "inherit" }}>
            <div style={{ background: "#FFD700", color: "#fff", padding: "14px 16px", borderRadius: "10px 10px 0 0" }}>
                <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 700 }}>{titles[projectIndex]}</h3>
                <p style={{ margin: "4px 0 0", fontSize: "13px", fontWeight: 500, display: "flex", alignItems: "center", gap: "4px" }}>
                    <FaMapMarkerAlt style={{ width: "14px", height: "14px" }} />
                    {locations[projectIndex]}
                </p>
            </div>
            <div style={{ height: "160px", background: "#e5e7eb", overflow: "hidden", position: "relative" }}>
                <div style={{ display: "flex", width: `${sp.photos.length * 100}%`, height: "100%", transform: `translateX(-${slide * (100 / sp.photos.length)}%)`, transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)" }}>
                    {sp.photos.map((src, i) => (
                        <div key={i} style={{ width: `${100 / sp.photos.length}%`, height: "100%", flexShrink: 0 }}>
                            <img
                                src={src}
                                alt={`foto ${i + 1}`}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                onError={(e) => {
                                    const img = e.target as HTMLImageElement;
                                    const parent = img.parentElement;
                                    img.style.display = "none";
                                    if (!parent) return;
                                    parent.style.display = "flex";
                                    parent.style.alignItems = "center";
                                    parent.style.justifyContent = "center";
                                    parent.style.fontSize = "13px";
                                    parent.innerText = "[ Foto Proyek ]";
                                }}
                            />
                        </div>
                    ))}
                </div>
                {hasMultiple && (
                    <>
                        <button
                            onClick={prev}
                            style={{
                                position: "absolute",
                                left: "6px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                width: "28px",
                                height: "28px",
                                borderRadius: "50%",
                                background: "rgba(255,255,255,0.9)",
                                border: "1px solid #e5e7eb",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                zIndex: 10,
                            }}
                        >
                            <ChevronLeft style={{ width: "14px", height: "14px", color: "#374151" }} />
                        </button>
                        <button
                            onClick={next}
                            style={{
                                position: "absolute",
                                right: "6px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                width: "28px",
                                height: "28px",
                                borderRadius: "50%",
                                background: "rgba(255,255,255,0.9)",
                                border: "1px solid #e5e7eb",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                zIndex: 10,
                            }}
                        >
                            <ChevronRight style={{ width: "14px", height: "14px", color: "#374151" }} />
                        </button>
                        <div style={{ position: "absolute", bottom: "8px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "5px", zIndex: 10 }}>
                            {sp.photos.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goTo(i)}
                                    style={{
                                        width: slide === i ? "16px" : "6px",
                                        height: "6px",
                                        borderRadius: "9999px",
                                        background: slide === i ? "#FFD700" : "rgba(255,255,255,0.6)",
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
            <div style={{ padding: "14px 16px", background: "#fff" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px", paddingBottom: "14px", borderBottom: "1px solid #f3f4f6" }}>
                    <div style={{ background: "#fffbebda", borderRadius: "8px", padding: "10px 12px" }}>
                        <p style={{ margin: 0, fontSize: "11px", color: "#FFD700", fontWeight: 600, textTransform: "uppercase" }}>{t(tr.project.kapasitas)}</p>
                        <p style={{ margin: "4px 0 0", fontSize: "12px", fontWeight: 700, color: "#111827" }}>{sp.capacity}</p>
                    </div>
                    <div style={{ background: "#fffbebda", borderRadius: "8px", padding: "10px 12px" }}>
                        <p style={{ margin: 0, fontSize: "11px", color: "#FFD700", fontWeight: 600, textTransform: "uppercase" }}>{t(tr.project.tipe)}</p>
                        <p style={{ margin: "4px 0 0", fontSize: "12px", fontWeight: 700, color: "#111827" }}>{sp.tipe}</p>
                    </div>
                </div>
                <p style={{ margin: 0, fontSize: "12px", color: "#4b5563", lineHeight: "1.7" }}>{descs[projectIndex]}</p>
            </div>
        </div>
    );
}

const leafletStyle = `
    .leaflet-popup-content-wrapper { padding:0!important;border-radius:10px!important;overflow:hidden;box-shadow:0 12px 48px rgba(0,0,0,0.18)!important;border:1px solid #fff; }
    .leaflet-popup-content { margin:0!important;width:auto!important; }
    .leaflet-popup-tip-container { margin-top:-1px; }
    .leaflet-container { font-family:inherit;z-index:0; }
    .leaflet-popup-close-button { width:28px!important;height:28px!important;top:8px!important;right:8px!important;font-size:18px!important;font-weight:700!important;color:#fff!important;background:rgba(0,0,0,0.25)!important;border-radius:6px!important;border:1px solid #fff!important;display:flex!important;align-items:center!important;justify-content:center!important;line-height:1!important; }
    .leaflet-popup-close-button:hover { background:rgba(0,0,0,0.5)!important; }
    .radar-wrapper { position:relative;display:block;width:24px;height:24px; }
    .radar-core { position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:14px;height:14px;background:#FFD700;border:2.5px solid #fff;border-radius:50%;box-shadow:0 0 0 2px #FFD700;z-index:2; }
    .radar-ring { position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) scale(0);border-radius:50%;background:rgba(245,158,11,0.35);animation:radar-pulse 5s ease-out infinite; }
    .radar-ring-1 { width:24px;height:24px;animation-delay:0s; }
    .radar-ring-2 { width:24px;height:24px;animation-delay:0.8s; }
    @keyframes radar-pulse { 0% { transform:translate(-50%,-50%) scale(0.3);opacity:0.8; } 100% { transform:translate(-50%,-50%) scale(2.2);opacity:0; } }
    .leaflet-bottom.leaflet-right { bottom:16px;right:16px; }
    .leaflet-control-zoom { border:1px solid #e5e7eb!important;border-radius:8px!important;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1)!important; }
    .leaflet-control-zoom a { width:32px!important;height:32px!important;line-height:32px!important;font-size:18px!important;color:#000!important; }
`;

export default function Project() {
    const { t, tr } = useLang();
    const p = tr.project;

    useEffect(() => {
        const style = document.createElement("style");
        style.innerHTML = leafletStyle;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <div className="bg-white text-black">
            <section className="relative bg-white text-white text-center overflow-hidden h-screen sm:h-[50vh] flex items-center justify-center">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/project-bg.png')" }} />
                <div className="absolute inset-0 bg-gray-900/50" />
                <div className="relative z-10 max-w-3xl mx-auto px-4">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{t(p.heroTitle)}</h1>
                </div>
            </section>

            <section className="py-14 px-4 sm:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-8 text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-2">{t(p.mapTitle)}</h2>
                        <p className="text-gray-500 text-sm sm:text-base">{t(p.mapSubtitle)}</p>
                    </div>
                    <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg" style={{ height: "600px", position: "relative", zIndex: 0 }}>
                        <MapContainer center={[-7.5, 110.5]} zoom={8} style={{ width: "100%", height: "100%" }} scrollWheelZoom={false} zoomControl={false}>
                            <TileLayer
                                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
                            />
                            <ZoomControl position="bottomright" />
                            {projectsStatic.map((proj, i) => (
                                <Marker key={proj.id} position={[proj.lat, proj.lng]} icon={radarIcon}>
                                    <Popup maxWidth={350} minWidth={350}>
                                        <ProjectPopup projectIndex={i} />
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