import React, { useState } from 'react';
import { ExternalLink, Star } from 'lucide-react';
import { STORE_CONFIG } from '../constants/storeConfig';
import { WifiBottomSheet } from './WifiBottomSheet';

/**
 * Botões de Links — Estilo 3D Alto Relevo, Saltantes e Brilhosos
 * Com Emblemas Oficiais e Ações Rápidas
 */
export const LinkButtons: React.FC = () => {
  const [wifiSheetOpen, setWifiSheetOpen] = useState(false);

  return (
    <>
      <section 
        aria-label="Links rápidos da loja"
        className="w-full max-w-md mx-auto px-4 py-3 flex flex-col gap-3.5 select-none"
      >
        {/* ========================================================
            1. SITE OFICIAL (Emblema de Globo) — Bouncy & Glossy
            ======================================================== */}
        <a
          href={STORE_CONFIG.links.storeWebsite}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-bouncy btn-glossy group relative flex items-center justify-between px-5 py-3.5 rounded-xl text-white bg-gradient-to-b from-[#163668] via-[#0E2448] to-[#071328] border-t border-white/40 border-x border-[#1E3A6E] border-b-2 border-[#040C1A] shadow-[0_5px_0_#030914,0_12px_22px_rgba(3,8,18,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        >
          {/* Filete de destaque vermelho sutil no topo-esquerdo */}
          <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-[#E11D2E] shadow-[0_0_6px_#E11D2E]" />

          <div className="flex items-center gap-3.5 pl-2">
            {/* Emblema Original de Globo em SVG com gradiente metálico */}
            <div className="w-10 h-10 rounded-lg bg-gradient-to-b from-[#1C4380] to-[#0B1A33] border border-[#2F6FD6]/50 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </div>

            <div className="text-left">
              <span className="block font-display text-base sm:text-lg font-bold tracking-wider uppercase text-white leading-tight">
                Conheça Nossa Loja
              </span>
              <span className="block text-[11px] text-[#A8B0BA] font-normal leading-tight">
                Catálogo online e estoque de materiais
              </span>
            </div>
          </div>

          <ExternalLink className="w-4 h-4 text-[#A8B0BA] group-hover:text-white transition-colors shrink-0" />
        </a>

        {/* ========================================================
            2. INSTAGRAM (Emblema Oficial em Gradiente) — Bouncy & Glossy
            ======================================================== */}
        <a
          href={STORE_CONFIG.links.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-bouncy btn-glossy group relative flex items-center justify-between px-5 py-3.5 rounded-xl text-white bg-gradient-to-b from-[#163668] via-[#0E2448] to-[#071328] border-t border-white/40 border-x border-[#1E3A6E] border-b-2 border-[#040C1A] shadow-[0_5px_0_#030914,0_12px_22px_rgba(3,8,18,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
        >
          <div className="flex items-center gap-3.5">
            {/* Emblema Oficial do Instagram com gradiente */}
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-[#FFDC80] via-[#F56040] via-[#FD1D1D] to-[#833AB4] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </div>

            <div className="text-left">
              <span className="block font-display text-base sm:text-lg font-bold tracking-wider uppercase text-white leading-tight">
                Instagram Oficial
              </span>
              <span className="block text-[11px] text-[#A8B0BA] font-normal leading-tight">
                @jacobs_eh · Novidades e fotos da loja
              </span>
            </div>
          </div>

          <ExternalLink className="w-4 h-4 text-[#A8B0BA] group-hover:text-white transition-colors shrink-0" />
        </a>

        {/* ========================================================
            3. AVALIAR NO GOOGLE (G Colorido Oficial + 5 Estrelas) — Bouncy & Glossy
            ======================================================== */}
        <a
          href={STORE_CONFIG.links.googleReview}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-bouncy btn-glossy group relative flex items-center justify-between px-5 py-3.5 rounded-xl text-white bg-gradient-to-b from-[#163668] via-[#0E2448] to-[#071328] border-t border-white/40 border-x border-[#1E3A6E] border-b-2 border-[#040C1A] shadow-[0_5px_0_#030914,0_12px_22px_rgba(3,8,18,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <div className="flex items-center gap-3.5">
            {/* Emblema Original Google G */}
            <div className="w-10 h-10 rounded-lg bg-white p-2 flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
              <svg className="w-full h-full" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            </div>

            <div className="text-left">
              <span className="block font-display text-base sm:text-lg font-bold tracking-wider uppercase text-white leading-tight">
                Avalie Nossa Loja
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <div className="flex items-center text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                </div>
                <span className="text-[10px] text-amber-200 font-bold ml-1">5.0 no Google</span>
              </div>
            </div>
          </div>

          <ExternalLink className="w-4 h-4 text-[#A8B0BA] group-hover:text-white transition-colors shrink-0" />
        </a>

        {/* ========================================================
            4. WI-FI (Abre Bottom Sheet com QR Code e Cópia) — Bouncy & Glossy
            ======================================================== */}
        <button
          type="button"
          onClick={() => setWifiSheetOpen(true)}
          className="btn-bouncy btn-glossy group relative flex items-center justify-between px-5 py-3.5 rounded-xl text-white bg-gradient-to-b from-[#163668] via-[#0E2448] to-[#071328] border-t border-white/40 border-x border-[#1E3A6E] border-b-2 border-[#040C1A] shadow-[0_5px_0_#030914,0_12px_22px_rgba(3,8,18,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-b from-[#2F6FD6] to-[#0F2A5C] border border-[#2F6FD6]/50 flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform text-white">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                <line x1="12" y1="20" x2="12.01" y2="20" />
              </svg>
            </div>

            <div className="text-left">
              <span className="block font-display text-base sm:text-lg font-bold tracking-wider uppercase text-white leading-tight">
                Conectar ao Wi-Fi
              </span>
              <span className="block text-[11px] text-[#A8B0BA] font-normal leading-tight">
                Rede JACOBS · Toque para ver senha e QR Code
              </span>
            </div>
          </div>

          <span className="px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#102B48] text-blue-200 border border-[#1E3A6E] group-hover:bg-[#1C4380] transition-colors">
            Acessar
          </span>
        </button>
      </section>

      {/* MODAL / BOTTOM SHEET DE WI-FI */}
      <WifiBottomSheet 
        isOpen={wifiSheetOpen} 
        onClose={() => setWifiSheetOpen(false)} 
      />
    </>
  );
};
