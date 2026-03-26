import React from 'react';
import { Mail, Phone } from "lucide-react";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa6";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-12 w-full px-6 md:px-16 font-['Montserrat']">
      <div className="max-w-[1400px] mx-auto">
        {/* Main grid: Logo | Alamat (lebar) | Kontak | Social Media */}
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto_auto] gap-8 md:gap-10 md:items-start">
          {/* 1. Logo */}
          <div className="flex items-start md:items-center md:self-center">
            <img
              src="/images/logo/logo-tagline-white.png"
              alt="Gepo Energy Logo"
              className="h-12 w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://via.placeholder.com/150x60/001a4d/ffffff?text=GEPO+ENERGY";
              }}
            />
          </div>

          {/* 2. Alamat — header di atas, isi dalam 2-kolom grid */}
          <div>
            <h3 className="font-bold text-lg mb-4">Alamat</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
              {/* Kantor Pusat */}
              <div>
                <p className="font-bold mb-1">Kantor Pusat:</p>
                <p className="text-sm leading-relaxed opacity-90">
                  Jl. Ngadinegaran Blok MJ III No.144, Mantrijeron, Kecamatan Mantrijeron,
                  Kota Yogyakarta, Daerah Istimewa Yogyakarta 55143
                </p>
              </div>

              {/* Kantor Operasional */}
              <div>
                <p className="font-bold mb-1">Kantor Operasional:</p>
                <p className="text-sm leading-relaxed opacity-90">
                  Jl. Pogung Lor No.1008 blok e, Pogung Lor, Sinduadi, Kec. Mlati,
                  Kabupaten Sleman, Daerah Istimewa Yogyakarta 55284
                </p>
              </div>
            </div>
          </div>

          {/* 3. Kontak */}
          <div>
            <h3 className="font-bold text-lg mb-4">Kontak</h3>
            <div className="space-y-2">
              <a href="tel:+6285292261294" className="flex items-center gap-3 text-sm hover:text-blue-300 transition">
                <Phone size={18} />
                <span className="whitespace-nowrap">+62 852-9226-1294</span>
              </a>
              <a href="mailto:info@gepoenergy.co.id" className="flex items-center gap-3 text-sm hover:text-blue-300 transition">
                <Mail size={18} />
                <span className="whitespace-nowrap">info@gepoenergy.co.id</span>
              </a>
            </div>
          </div>

          {/* 4. Social Media */}
          <div>
            <h3 className="font-bold text-lg mb-4">Social Media</h3>
            <div className="flex flex-row gap-3">
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition inline-flex items-center justify-center">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition inline-flex items-center justify-center">
                <FaLinkedinIn className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-10 py-6  border-t border-white/20 text-center">
          <p className="text-sm opacity-80">
            ©2025 Gepo Energy • All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;