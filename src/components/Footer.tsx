import React from 'react';
import { Mail, Phone } from "lucide-react";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa6";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-10 sm:pt-12 w-full font-['Montserrat']">
      <div className="max-w-[1400px] mx-auto px-8 sm:px-10 md:px-16">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[auto_1fr_auto_auto] gap-8 md:gap-10 md:items-start">

          {/* 1. Logo — full width di mobile */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1 flex items-start md:items-center md:self-center">
            <img
              src="/images/logo/logo-tagline-white.png"
              alt="Gepo Energy Logo"
              className="h-10 sm:h-12 w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://via.placeholder.com/150x60/001a4d/ffffff?text=GEPO+ENERGY";
              }}
            />
          </div>

          {/* 2. Alamat — full width di mobile & sm */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Alamat</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 sm:gap-y-6">
              <div>
                <p className="font-bold text-sm mb-1">Kantor Pusat:</p>
                <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                  Jl. Ngadinegaran Blok MJ III No.144, Mantrijeron, Kecamatan Mantrijeron,
                  Kota Yogyakarta, Daerah Istimewa Yogyakarta 55143
                </p>
              </div>
              <div>
                <p className="font-bold text-sm mb-1">Kantor Operasional:</p>
                <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                  Jl. Pogung Lor No.1008 blok e, Pogung Lor, Sinduadi, Kec. Mlati,
                  Kabupaten Sleman, Daerah Istimewa Yogyakarta 55284
                </p>
              </div>
            </div>
          </div>

          {/* 3. Kontak */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Kontak</h3>
            <div className="space-y-2.5">
              <a href="tel:+6285292261294"
                className="flex items-center gap-2.5 text-xs sm:text-sm hover:text-yellow-300 transition no-underline text-white">
                <Phone size={16} className="flex-shrink-0" />
                <span>+62 852-9226-1294</span>
              </a>
              <a href="mailto:info@gepoenergy.co.id"
                className="flex items-center gap-2.5 text-xs sm:text-sm hover:text-yellow-300 transition no-underline text-white">
                <Mail size={16} className="flex-shrink-0" />
                <span className="break-all sm:whitespace-nowrap">info@gepoenergy.co.id</span>
              </a>
            </div>
          </div>

          {/* 4. Social Media */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Social Media</h3>
            <div className="flex flex-row gap-3">
              <a href="#" aria-label="Instagram"
                className="bg-white/10 hover:bg-white/20 p-2 sm:p-2.5 rounded-full transition inline-flex items-center justify-center">
                <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" aria-label="LinkedIn"
                className="bg-white/10 hover:bg-white/20 p-2 sm:p-2.5 rounded-full transition inline-flex items-center justify-center">
                <FaLinkedinIn className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-8 sm:mt-10 py-5 sm:py-6 border-t border-white/20 text-center">
          <p className="text-xs sm:text-sm opacity-80">
            ©2025 Gepo Energy • All Rights Reserved
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;