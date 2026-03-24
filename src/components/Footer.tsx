import React from 'react';
import { Mail, Phone } from "lucide-react";
import {  FaLinkedinIn, FaInstagram } from "react-icons/fa6";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12 w-full px-6 md:px-16 font-['Montserrat']">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* 1. Logo Section */}
          <div className="md:col-span-3">
            <img 
              src="/images/logo/logo-tagline-white.png" 
              alt="Gepo Energy Logo"
              className="h-20 w-auto object-contain"
              onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/150x60/001a4d/ffffff?text=BATARI+ENERGY";
              }}
            />
          </div>

          {/* 2. Alamat Section (Cimahi & Makassar) */}
          <div className="md:col-span-3 space-y-8">
            <h3 className="font-bold text-lg mb-4">Alamat</h3>           
            <div>
              <p className="font-bold mb-2">Kantor Pusat:</p>
              <p className="text-sm leading-relaxed opacity-90">
                Jl. Ngadinegaran Blok MJ III No.144, Mantrijeron, Kecamatan Mantrijeron, 
                Kota Yogyakarta, Daerah Istimewa Yogyakarta 55143
              </p>
            </div>
          </div>

          {/* 3. Alamat Section (Bekasi & Bali) */}
          <div className="md:col-span-3 pt-11 space-y-8">
            <div>
              <p className="font-bold mb-2">Kantor Operasional: </p>
              <p className="text-sm leading-relaxed opacity-90">
                Jl. Pogung Lor No.1008 blok e, Pogung Lor, Sinduadi, Kec. Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55284
              </p>
            </div>
          </div>

          {/* 4. Kontak & Social Media */}
          <div className="flex flex-row items-start gap-8 md:gap-8"> 
            {/* Bagian Kontak */}
            <div className="flex-1 min-w-max">
              <h3 className="font-bold text-lg mb-4">Kontak</h3>
              <div className="space-y-3">
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

            {/* Bagian Social Media */}
            <div className="flex-1 min-w-max">
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
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-5 border-t border-white/20 text-center">
          <p className="text-sm opacity-80">
            ©2025 Gepo Energy • All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;