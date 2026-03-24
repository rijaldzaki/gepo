import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// FIX LEAFLET DEFAULT ICON (Vite issue)
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// CUSTOM BLUE CIRCLE MARKER
const blueCircleIcon = new L.DivIcon({
    className: "",
    html: `<span style="
        display: block;
        width: 18px;
        height: 18px;
        background: #2563eb;
        border: 3px solid #fff;
        border-radius: 50%;
        box-shadow: 0 0 0 2px #2563eb, 0 2px 6px rgba(0,0,0,0.3);
    "></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -12],
});

interface Project {
    id: number;
    title: string;
    location: string;
    capacity: string;
    lat: number;
    lng: number;
    gridType: string;
    description: string;
    photo: string;
}

const projects: Project[] = [
    {
        id: 1,
        title: "Dusun Tamanan",
        location: "D.I Yogyakarta",
        capacity: "300 Wp",
        lat: -7.817,
        lng: 110.456,
        gridType: "Rooftop Hybrid",
        description:
            "Gepo Energy bekerja sama dengan Dewan Energi Mahasiswa UGM (DEM UGM) melakukan instalasi Genting Photovoltaic (GEPO) sebanyak 30 unit dengan kapasitas 300 Wp sistem hybrid. Daya digunakan untuk pompa air pengairan kebun lidah buaya dan fasilitas umum.",
        photo: "/images/projects/tamanan.jpg",
    },
    {
        id: 2,
        title: "Desa Pitu",
        location: "Ngawi, Jawa Timur",
        capacity: "3000 Wp",
        lat: -7.503,
        lng: 111.458,
        gridType: "Rooftop Hybrid",
        description:
            "Bekerja sama dengan Pertamina Foundation, Gepo Energy melakukan instalasi Genting Photovoltaic (GEPO) sebanyak 300 unit (3000 Wp) pada fasilitas rumah kompos terintegrasi dengan sistem hybrid untuk proses produksi kompos.",
        photo: "/images/projects/pitu.jpg",
    },
    {
        id: 3,
        title: "Dlingo",
        location: "Bantul, D.I Yogyakarta",
        capacity: "2500 Wp",
        lat: -7.953,
        lng: 110.432,
        gridType: "Rooftop Hybrid",
        description:
            "Bekerja sama dengan BEM KM UGM, Gepo Energy melakukan instalasi panel surya monofacial hybrid sebesar 2500 Wp pada atap parkiran di pekarangan masjid. Daya digunakan untuk ketersediaan air bersih warga sekitar.",
        photo: "/images/projects/dlingo.jpg",
    },
];

function ProjectPopup({ project }: { project: Project }) {
    return (
        <div style={{ width: "260px", fontFamily: "inherit" }}>
            <div
                style={{
                    background: "#2563eb",
                    color: "#fff",
                    padding: "12px 14px",
                    borderRadius: "8px 8px 0 0",
                    marginTop: "-1px",
                }}
            >
                <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 700 }}>
                    {project.title}
                </h3>
                <p
                    style={{
                        margin: "4px 0 0",
                        fontSize: "12px",
                        opacity: 0.9,
                    }}
                >
                    📍 {project.location}
                </p>
            </div>

            <div style={{ height: "140px", background: "#e5e7eb", overflow: "hidden" }}>
                <img
                    src={project.photo}
                    alt={project.title}
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
                        parent.style.fontSize = "12px";
                        parent.innerText = "[ Foto Proyek ]";
                    }}
                />
            </div>

            <div style={{ padding: "12px 14px", background: "#fff" }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        paddingBottom: "10px",
                        borderBottom: "1px solid #f3f4f6",
                        marginBottom: "10px",
                    }}
                >
                    <div
                        style={{
                            width: "32px",
                            height: "32px",
                            background: "#eff6ff",
                            borderRadius: "6px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "16px",
                            flexShrink: 0,
                        }}
                    >
                        ⚡
                    </div>
                    <div>
                        <p style={{ margin: 0, fontSize: "11px", color: "#6b7280" }}>
                            Grid Type
                        </p>
                        <p
                            style={{
                                margin: 0,
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "#111827",
                            }}
                        >
                            {project.gridType} · {project.capacity}
                        </p>
                    </div>
                </div>

                <p
                    style={{
                        margin: 0,
                        fontSize: "12px",
                        color: "#4b5563",
                        lineHeight: "1.6",
                    }}
                >
                    {project.description}
                </p>
            </div>
        </div>
    );
}

const leafletStyle = `
    .leaflet-popup-content-wrapper {
        padding: 0 !important;
        border-radius: 8px !important;
        overflow: hidden;
        box-shadow: 0 10px 40px rgba(0,0,0,0.18) !important;
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
    }
`;

export default function Project() {
    useEffect(() => {
        const style = document.createElement("style");
        style.innerHTML = leafletStyle;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <div className="bg-white text-gray-900">
            <section className="py-10 text-center border-b border-gray-100">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-widest uppercase text-gray-900">
                    Portfolio of Projects
                </h1>
            </section>

            <section
                className="w-full"
                style={{ height: "calc(100vh - 130px)", minHeight: "500px" }}
            >
                <MapContainer
                    center={[-2.5, 118.0]}
                    zoom={5}
                    style={{ width: "100%", height: "100%" }}
                    scrollWheelZoom={true}
                    zoomControl={true}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    />

                    {projects.map((project) => (
                        <Marker
                            key={project.id}
                            position={[project.lat, project.lng]}
                            icon={blueCircleIcon}
                        >
                            <Popup maxWidth={260} minWidth={260}>
                                <ProjectPopup project={project} />
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </section>
        </div>
    );
}