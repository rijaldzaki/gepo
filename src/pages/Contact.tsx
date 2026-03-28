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
        } catch (error) {
            console.error("EmailJS error:", error);
            alert(
                "Gagal mengirim pesan. Silakan coba lagi atau hubungi kami langsung."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white text-gray-900">
            {/* HERO */}
            <section
                className="relative text-white overflow-hidden h-screen sm:h-[50vh]"
                style={{ minHeight: "280px" }}
            >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/contact-bg.jpg')" }}
                />
                <div className="absolute inset-0 bg-gray-900/50" />
                <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-20 sm:py-28">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                        {t(c.heroTitle1)}
                    </h1>
                    <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
                        {t(c.heroTitle2)}
                    </h1>
                    <p className="text-gray-300 text-sm sm:text-base max-w-4xl mb-10">
                        {t(c.heroSubtitle)}
                    </p>
                    <div className="flex flex-col items-center sm:flex-row sm:justify-center gap-4">
                        <a
                            href="https://wa.me/6285292261294"
                            className="flex items-center gap-3 bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full transition-all duration-300 no-underline text-sm font-medium w-fit"
                        >
                            <FaWhatsapp className="w-4 h-4" />
                            +62 852-9226-1294
                        </a>
                        <a
                            href="mailto:info@gepoenergy.co.id"
                            className="flex items-center gap-3 bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full transition-all duration-300 no-underline text-sm font-medium w-fit"
                        >
                            <Mail className="w-4 h-4" />
                            info@gepoenergy.co.id
                        </a>
                    </div>
                </div>
            </section>

            {/* FORM */}
            <section className="bg-white py-14 sm:py-16">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center gap-3 mb-10">
                        <h2 className="text-center text-2xl sm:text-3xl font-bold text-black tracking-tight">
                            {t(c.formTitle)}
                        </h2>
                        <p className="text-center text-gray-500 text-sm sm:text-base">
                            {t(c.formDesc)}
                        </p>
                    </div>
                    <div className="bg-gray-50/50 rounded-3xl p-8 md:p-10 shadow-lg border border-gray-100">
                        {submitted ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                    <svg
                                        className="w-8 h-8 text-green-500"
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
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {t(c.successTitle)}
                                </h3>
                                <p className="text-gray-500 text-sm">{t(c.successDesc)}</p>
                                <button
                                    onClick={() => {
                                        setSubmitted(false);
                                        setFormData({ nama: "", email: "", pesan: "" });
                                    }}
                                    className="mt-6 text-blue-600 text-sm underline hover:no-underline"
                                >
                                    {t(c.sendAgain)}
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <div
                                            className={`flex items-center gap-3 border rounded-lg px-4 py-3 bg-white transition-colors ${
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
                                                className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
                                            />
                                        </div>
                                        {errors.nama && (
                                            <p className="text-red-500 text-xs mt-1 ml-1">
                                                {errors.nama}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <div
                                            className={`flex items-center gap-3 border rounded-lg px-4 py-3 bg-white transition-colors ${
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
                                                className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
                                            />
                                        </div>
                                        {errors.email && (
                                            <p className="text-red-500 text-xs mt-1 ml-1">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <div
                                            className={`flex gap-3 min-h-[240px] border rounded-lg px-4 py-3 bg-white transition-colors ${
                                                errors.pesan
                                                    ? "border-red-400"
                                                    : "border-gray-200 focus-within:border-[#FFD700] focus-within:border-2"
                                            }`}
                                        >
                                            <textarea
                                                name="pesan"
                                                value={formData.pesan}
                                                onChange={handleChange}
                                                placeholder={t(c.fieldMessage)}
                                                rows={5}
                                                className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent resize-y"
                                            />
                                        </div>
                                        {errors.pesan && (
                                            <p className="text-red-500 text-xs mt-1 ml-1">
                                                {errors.pesan}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-black hover:bg-[#FFD700] disabled:opacity-60 text-white hover:text-black font-semibold px-8 py-3 rounded-lg transition-all hover:scale-105 duration-500 text-sm"
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