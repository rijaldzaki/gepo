import { useState } from "react";
import { Phone, Mail, User, MapPin, MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

// ── TYPES ─────────────────────────────────────────────────────────────────────

interface FormData {
    nama: string;
    email: string;
    telepon: string;
    alamat: string;
    pesan: string;
}

interface FormErrors {
    nama?: string;
    email?: string;
    pesan?: string;
}

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function Contact() {
    const [formData, setFormData] = useState<FormData>({
        nama: "",
        email: "",
        telepon: "",
        alamat: "",
        pesan: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const validate = (): boolean => {
        const newErrors: FormErrors = {};
        if (!formData.nama.trim()) newErrors.nama = "Nama lengkap wajib diisi.";
        if (!formData.email.trim()) {
            newErrors.email = "Email wajib diisi.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Format email tidak valid.";
        }
        if (!formData.pesan.trim()) newErrors.pesan = "Pesan wajib diisi.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        // Simulasi pengiriman — ganti dengan logika API aktual
        await new Promise((res) => setTimeout(res, 1200));
        setLoading(false);
        setSubmitted(true);
    };

    return (
        <div className="bg-white text-gray-900">
            {/* ── HERO ── */}
            <section className="relative text-white overflow-hidden h-[50vh]" style={{ minHeight: "280px" }}>
                {/* Background image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/contact-bg.jpg')" }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gray-900/65" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-20 sm:py-28">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Let’s Start Green Energy Era </h1>
                    <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4">Hubungi Kami </h1>
                    <p className="text-gray-300 text-sm sm:text-base max-w-4xl mb-10">
                        Konsultasi gratis, simulasi penghematan, dan penawaran lebih lanjut. Hubungi kami sekarang dan wujudkan penghematan listrik dan masa depan energi yang berkelanjutan! 
                    </p>

                    {/* Contact pills */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href="https://wa.me/6285292261294"
                            className="flex items-center gap-3 bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full transition-all duration-300 no-underline text-sm font-medium"
                        >
                            <FaWhatsapp className="w-4 h-4" />
                            +62 852-9226-1294
                        </a>
                        <a
                            href="mailto: info@gepoenergy.co.id"
                            className="flex items-center gap-3 bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full transition-all duration-300 no-underline text-sm font-medium"
                        >
                            <Mail className="w-4 h-4" />
                            info@gepoenergy.co.id
                        </a>
                    </div>
                </div>
            </section>

            {/* ── FORM SECTION ── */}
            <section className="bg-gray-100 py-16 sm:py-20">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h2 className="text-center text-2xl sm:text-3xl font-bold text-black mb-16 tracking-tight">
                            Connect with us for the best offer
                        </h2>
                        <p className="mt-2 text-gray-500 text-sm sm:text-base">
                            Kami siap membantu Anda dengan solusi energi terbaik untuk kebutuhan Anda
                        </p>
                    </div>

                    {/* Card */}
                    <div className="bg-gray-50/50 rounded-3xl p-10 md:p-16 shadow-lg border border-gray-100">
                        {submitted ? (
                            /* ── SUCCESS STATE ── */
                            <div className="text-center py-12">
                                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Pesan Terkirim!</h3>
                                <p className="text-gray-500 text-sm">
                                    Terima kasih telah menghubungi kami. Tim kami akan segera merespons Anda.
                                </p>
                                <button
                                    onClick={() => {
                                        setSubmitted(false);
                                        setFormData({ nama: "", email: "", telepon: "", alamat: "", pesan: "" });
                                    }}
                                    className="mt-6 text-blue-600 text-sm underline hover:no-underline"
                                >
                                    Kirim pesan lain
                                </button>
                            </div>
                        ) : (
                            /* ── FORM ── */
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Nama Lengkap */}
                                    <div>
                                        <div className={`flex items-center gap-3 border rounded-lg px-4 py-3 bg-white transition-colors ${errors.nama ? "border-red-400" : "border-gray-200 focus-within:border-blue-500"}`}>
                                            <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                            <input
                                                type="text"
                                                name="nama"
                                                value={formData.nama}
                                                onChange={handleChange}
                                                placeholder="Nama Lengkap *"
                                                className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
                                            />
                                        </div>
                                        {errors.nama && <p className="text-red-500 text-xs mt-1 ml-1">{errors.nama}</p>}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <div className={`flex items-center gap-3 border rounded-lg px-4 py-3 bg-white transition-colors ${errors.email ? "border-red-400" : "border-gray-200 focus-within:border-blue-500"}`}>
                                            <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Email *"
                                                className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
                                            />
                                        </div>
                                        {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
                                    </div>

                                    {/* Telepon */}
                                    <div>
                                        <div className="flex items-center gap-3 border border-gray-200 focus-within:border-blue-500 rounded-lg px-4 py-3 bg-white transition-colors">
                                            <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                            <input
                                                type="tel"
                                                name="telepon"
                                                value={formData.telepon}
                                                onChange={handleChange}
                                                placeholder="Telepon"
                                                className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
                                            />
                                        </div>
                                    </div>

                                    {/* Alamat */}
                                    <div>
                                        <div className="flex items-center gap-3 border border-gray-200 focus-within:border-blue-500 rounded-lg px-4 py-3 bg-white transition-colors">
                                            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                            <input
                                                type="text"
                                                name="alamat"
                                                value={formData.alamat}
                                                onChange={handleChange}
                                                placeholder="Alamat"
                                                className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
                                            />
                                        </div>
                                    </div>

                                    {/* Pesan — full width */}
                                    <div className="sm:col-span-2">
                                        <div className={`flex gap-3 border rounded-lg px-4 py-3 bg-white transition-colors ${errors.pesan ? "border-red-400" : "border-gray-200 focus-within:border-blue-500"}`}>
                                            <MessageCircle className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                            <textarea
                                                name="pesan"
                                                value={formData.pesan}
                                                onChange={handleChange}
                                                placeholder="Ceritakan kebutuhan Anda..."
                                                rows={5}
                                                className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent resize-y"
                                            />
                                        </div>
                                        {errors.pesan && <p className="text-red-500 text-xs mt-1 ml-1">{errors.pesan}</p>}
                                    </div>
                                </div>

                                {/* Submit */}
                                <div className="mt-6 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-blue-700 hover:bg-blue-800 disabled:opacity-60 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 text-sm"
                                    >
                                        {loading ? "Mengirim..." : "Kirim Pesan"}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
