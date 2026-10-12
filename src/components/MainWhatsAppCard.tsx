import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { STORE_CONFIG } from '../constants/storeConfig';

/**
 * Card Principal (WhatsApp) — Destaque máximo de atendimento rápido
 */
export const MainWhatsAppCard: React.FC = () => {
  return (
    <section className="w-full max-w-md mx-auto px-4 pt-4 pb-2 select-none">
      <div 
        className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#0F2042] via-[#0B1730] to-[#071124] border border-[#1E3A6E]/70 p-5 sm:p-6 text-white shadow-[0_12px_32px_rgba(3,7,17,0.9),inset_0_1px_0_rgba(255,255,255,0.15)]"
      >
        {/* Brilho sutil na borda superior */}
        <div 
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E11D2E]/80 to-transparent" 
          aria-hidden="true" 
        />

        {/* Topo do Card: Ícone da marca + Jacobs + Atendimento rápido */}
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#E11D2E] flex items-center justify-center text-white shadow-[0_2px_8px_rgba(225,29,46,0.6)]">
              <Zap className="w-4 h-4 fill-white" />
            </div>
            <span className="font-display text-sm font-bold tracking-wider text-white uppercase">
              Jacobs
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#102B48] border border-[#1E3A6E] text-[11px] font-semibold text-blue-200 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Atendimento rápido</span>
          </div>
        </div>

        {/* Título em duas linhas: Parte branca + Parte vermelha em fonte display */}
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase leading-none tracking-tight mb-2">
          <span className="text-white block">Precisou de reparo?</span>
          <span className="text-[#E11D2E] italic block">Chame a Jacobs.</span>
        </h2>

        {/* Texto de apoio curto */}
        <p className="text-xs sm:text-sm text-[#A8B0BA] font-normal leading-relaxed mb-5">
          Orçamentos imediatos, materiais a pronta entrega e atendimento técnico com especialistas da Tijuca.
        </p>

        {/* BOTÃO PRINCIPAL 3D EM LARGURA TOTAL COM EMBLEMA ORIGINAL DO WHATSAPP */}
        <a
          href={STORE_CONFIG.links.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-bouncy btn-glossy group relative w-full flex items-center justify-between px-5 py-4 rounded-xl font-display font-extrabold text-base sm:text-lg tracking-wider uppercase text-white bg-gradient-to-b from-[#25D366] via-[#1EBE5D] to-[#128C7E] border-t border-white/40 border-b border-[#0D6559] shadow-[0_6px_0_#0D6559,0_14px_24px_rgba(37,211,102,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          {/* Reflexo de brilho passando na superfície do botão */}
          <div 
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            aria-hidden="true"
          />

          <div className="flex items-center gap-3">
            {/* Emblema Original do WhatsApp em SVG */}
            <svg 
              className="w-6 h-6 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] shrink-0" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2Z" 
                fill="#FFFFFF" 
              />
              <path 
                d="M17.52 14.33C17.22 14.18 15.76 13.46 15.49 13.36C15.22 13.26 15.02 13.21 14.83 13.51C14.63 13.81 14.07 14.47 13.89 14.67C13.72 14.87 13.55 14.9 13.25 14.75C12.95 14.6 11.98 14.28 10.84 13.26C9.94 12.46 9.34 11.48 9.16 11.18C8.99 10.88 9.14 10.72 9.29 10.57C9.43 10.43 9.6 10.21 9.75 10.04C9.9 9.87 9.95 9.74 10.05 9.54C10.15 9.34 10.1 9.17 10.02 9.02C9.95 8.87 9.35 7.4 9.1 6.8C8.86 6.22 8.61 6.3 8.43 6.29C8.26 6.28 8.06 6.28 7.86 6.28C7.66 6.28 7.34 6.36 7.07 6.65C6.79 6.95 6.02 7.68 6.02 9.14C6.02 10.6 7.09 12.01 7.24 12.21C7.39 12.41 9.33 15.4 12.3 16.69C13.01 17 13.56 17.18 13.99 17.32C14.71 17.55 15.36 17.52 15.88 17.44C16.46 17.35 17.66 16.71 17.91 16.01C18.16 15.31 18.16 14.71 18.08 14.58C18.01 14.46 17.82 14.48 17.52 14.33Z" 
                fill="#128C7E" 
              />
            </svg>
            <span className="drop-shadow-sm">Chamar no WhatsApp</span>
          </div>

          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
};
