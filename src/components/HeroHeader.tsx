import React, { useState, useEffect } from 'react';
import { STORE_CONFIG } from '../constants/storeConfig';
import { calculateStoreStatus, StoreStatusResult } from '../utils/storeHours';
import { WaterDripEdge } from './WaterDripEdge';

/**
 * Topo (Hero) com efeito de água pingando animada, logo em destaque,
 * título de impacto e selo ao vivo (aberto/fechado)
 */
export const HeroHeader: React.FC = () => {
  const [storeStatus, setStoreStatus] = useState<StoreStatusResult>(() => calculateStoreStatus());

  useEffect(() => {
    const timer = setInterval(() => {
      setStoreStatus(calculateStoreStatus());
    }, 20000); // Atualiza com precisão

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="relative w-full pt-8 pb-0 text-center select-none bg-gradient-to-b from-[#2F6FD6] via-[#1B4B96] to-[#0F2A5C] shadow-[0_16px_36px_rgba(5,11,24,0.9)] overflow-visible">
      
      {/* Brilho e halo sutil no topo */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-36 bg-gradient-to-b from-white/20 to-transparent filter blur-2xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="relative z-10 max-w-md mx-auto px-4 flex flex-col items-center">
        {/* LOGO EM DESTAQUE MÁXIMO AMPLIADA (OCUPANDO O LUGAR DO TEXTO INSTITUCIONAL) */}
        <div className="relative my-2 sm:my-3 transition-transform duration-300 hover:scale-[1.03] flex items-center justify-center">
          {/* Halo vermelho sutil atrás da logo */}
          <div 
            className="absolute inset-0 bg-[#E11D2E]/25 rounded-full filter blur-3xl scale-125 pointer-events-none" 
            aria-hidden="true" 
          />
          {/* Halo azul de iluminação */}
          <div 
            className="absolute inset-0 bg-white/25 rounded-full filter blur-2xl scale-110 pointer-events-none" 
            aria-hidden="true" 
          />
          <img
            src={STORE_CONFIG.logoUrl}
            alt="Jacobs Elétrica e Hidráulica"
            className="relative h-48 sm:h-56 md:h-64 w-auto max-w-[95vw] object-contain filter drop-shadow-[0_14px_32px_rgba(0,0,0,0.85)] drop-shadow-[0_0_20px_rgba(47,111,214,0.4)]"
            loading="eager"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* SELO AO VIVO (ABERTO / FECHADO) COM GLOW PULSANTE DE 1.6s */}
        <div
          role="status"
          aria-live="polite"
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0B1730] border border-[#1E3A6E] shadow-[0_4px_14px_rgba(0,0,0,0.45)] backdrop-blur-md mt-1 mb-3"
        >
          {/* Ponto com glow pulsante (box-shadow que expande e some em ciclo de ~1,6s) */}
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${
              storeStatus.isOpen ? 'dot-pulse-green' : 'dot-pulse-red'
            }`}
          />

          {/* Texto de Status Calculado */}
          <span className="text-xs sm:text-sm font-bold tracking-wider text-white uppercase font-display">
            {storeStatus.statusText}
          </span>
        </div>
      </div>

      {/* BORDA DE ÁGUA PINGANDO ANIMADA (ASSINATURA VISUAL) */}
      <WaterDripEdge 
        topColor={STORE_CONFIG.colors.top2}
        bgColor={STORE_CONFIG.colors.bgDark}
      />
    </header>
  );
};
