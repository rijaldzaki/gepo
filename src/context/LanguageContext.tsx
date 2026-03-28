import { createContext, useContext, useState, type ReactNode } from "react";
import { translations } from "../translations";

export type Lang = "ID" | "EN";

interface LangContextType {
    lang: Lang;
    setLang: (l: Lang) => void;
    t: (obj: { ID: string; EN: string }) => string;
    tr: typeof translations;
}

const LangContext = createContext<LangContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Lang>("ID");
    const t = (obj: { ID: string; EN: string }) => obj[lang];
    return (
        <LangContext.Provider value={{ lang, setLang, t, tr: translations }}>
            {children}
        </LangContext.Provider>
    );
}

export function useLang() {
    const ctx = useContext(LangContext);
    if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
    return ctx;
}