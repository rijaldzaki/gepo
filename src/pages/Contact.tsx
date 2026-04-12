import { useState } from "react";
import { Mail, User } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import emailjs from "@emailjs/browser";
import { useLang } from "../context/LanguageContext";

const EMAILJS_SERVICE_ID = "gepo_123";
const EMAILJS_TEMPLATE_ID = "Gepo_123";
const EMAILJS_PUBLIC_KEY = "YM3uVOvYgRSi7gFSk";

interface FormData {
    nama: string;
    email: string;
    pesan: string;
}

interface FormErrors {
    nama?: string;
    email?: string;
    pesan?: string;
}

export default function Contact() {
    const { t, tr } = useLang();
    const c = tr.contact;

    const [formData, setFormData] = useState<FormData>({
        nama: "",
        email: "",
        pesan: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const validate = (): boolean => {
        const e: FormErrors = {};
        if (!formData.nama.trim()) e.nama = t(c.errName);
        if (!formData.email.trim()) e.email = t(c.errEmailReq);
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
            e.email = t(c.errEmailFmt);
        if (!formData.pesan.trim()) e.pesan = t(c.errMessage);
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors])
            setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    from_name: formData.nama,
                    from_email: formData.email,
                    message: formData.pesan,
                },
                EMAILJS_PUBLIC_KEY
            );
            setSubmitted(true);
        } catch (err) {
            console.error("EmailJS error:", err);
            alert(
                "Gagal mengirim pesan. Silakan coba lagi atau hubungi kami langsung."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white text-gray-900">
            {/* ── HERO ── */}
            <section className="relative text-white overflow-hidden h-[50vh] flex items-end justify-center pb-0">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/contact-bg.jpg')" }}
                />
                <div className="absolute inset-0 bg-gray-900/50" />

                <div className="relative z-10 flex flex-col items-center justify-center text-center px-8 w-full h-full">
                    <h1 className="text-2xl sm:text-4xl font-bold tracking-tight mb-2">
                        {t(c.heroTitle1)}
                    </h1>
                    <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
                        {t(c.heroTitle2)}
                    </h2>
                    <p className="text-gray-300 text-xs sm:text-sm md:text-base max-w-xl mb-6 sm:mb-10 leading-relaxed">
                        {t(c.heroSubtitle)}
                    </p>

                    {/* Contact pills */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a
                            href="https://wa.me/6285292261294"
                            className="flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-sm text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 no-underline text-xs sm:text-sm font-medium w-max"
                        >
                            <FaWhatsapp className="w-4 h-4 flex-shrink-0" />
                            +62 852-9226-1294
                        </a>
                        <a
                            href="mailto:info@gepoenergy.co.id"
                            className="flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-sm text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 no-underline text-xs sm:text-sm font-medium w-max"
                        >
                            <Mail className="w-4 h-4 flex-shrink-0" />
                            info@gepoenergy.co.id
                        </a>
                    </div>
                </div>
            </section>

            {/* ── FORM ── */}
            <section className="bg-white py-10 sm:py-14 md:py-16">
                <div className="max-w-2xl mx-auto px-8">
                    {/* Header */}
                    <div className="flex flex-col items-center gap-2 sm:gap-3 mb-8 sm:mb-10">
                        <h2 className="text-center text-lg sm:text-2xl md:text-3xl font-bold text-black tracking-tight">
                            {t(c.formTitle)}
                        </h2>
                        <p className="text-center text-gray-500 text-xs sm:text-sm md:text-base max-w-sm">
                            {t(c.formDesc)}
                        </p>
                    </div>

                    {/* Card */}
                    <div className="bg-gray-50/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg border border-gray-100">
                        {submitted ? (
                            <div className="text-center py-10 sm:py-12">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                    <svg
                                        className="w-7 h-7 sm:w-8 sm:h-8 text-green-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                                    {t(c.successTitle)}
                                </h3>
                                <p className="text-gray-500 text-sm">{t(c.successDesc)}</p>
                                <button
                                    onClick={() => {
                                        setSubmitted(false);
                                        setFormData({ nama: "", email: "", pesan: "" });
                                    }}
                                    className="mt-5 sm:mt-6 text-blue-600 text-sm underline hover:no-underline"
                                >
                                    {t(c.sendAgain)}
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="flex flex-col gap-3 sm:gap-4">
                                    {/* Nama */}
                                    <div>
                                        <div
                                            className={`flex items-center gap-3 border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 bg-white transition-colors ${
                                                errors.nama
                                                    ? "border-red-400"
                                                    : "border-gray-200 focus-within:border-[#FFD700] focus-within:border-2"
                                            }`}
                                        >
                                            <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                            <input
                                                type="text"
                                                name="nama"
                                                value={formData.nama}
                                                onChange={handleChange}
                                                placeholder={t(c.fieldName)}
                                                className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent min-w-0"
                                            />
                                        </div>
                                        {errors.nama && (
                                            <p className="text-red-500 text-xs mt-1 ml-1">
                                                {errors.nama}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <div
                                            className={`flex items-center gap-3 border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 bg-white transition-colors ${
                                                errors.email
                                                    ? "border-red-400"
                                                    : "border-gray-200 focus-within:border-[#FFD700] focus-within:border-2"
                                            }`}
                                        >
                                            <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder={t(c.fieldEmail)}
                                                className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent min-w-0"
                                            />
                                        </div>
                                        {errors.email && (
                                            <p className="text-red-500 text-xs mt-1 ml-1">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    {/* Pesan */}
                                    <div>
                                        <div
                                            className={`flex gap-3 border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 bg-white transition-colors ${
                                                errors.pesan
                                                    ? "border-red-400"
                                                    : "border-gray-200 focus-within:border-[#FFD700] focus-within:border-2"
                                            }`}
                                            style={{ minHeight: "160px" }}
                                        >
                                            <textarea
                                                name="pesan"
                                                value={formData.pesan}
                                                onChange={handleChange}
                                                placeholder={t(c.fieldMessage)}
                                                rows={5}
                                                className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent resize-y w-full"
                                            />
                                        </div>
                                        {errors.pesan && (
                                            <p className="text-red-500 text-xs mt-1 ml-1">
                                                {errors.pesan}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Submit */}
                                <div className="mt-4 sm:mt-6 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-black hover:bg-[#FFD700] disabled:opacity-60 text-white hover:text-black font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg transition-all hover:scale-105 duration-500 text-sm w-full sm:w-auto"
                                    >
                                        {loading ? t(c.sending) : t(c.submitBtn)}
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