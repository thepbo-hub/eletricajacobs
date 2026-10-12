import React, { useState } from 'react';
import { Copy, Check, MessageCircle, Clock, MapPin, Navigation } from 'lucide-react';
import { STORE_CONFIG } from '../constants/storeConfig';
import { calculateStoreStatus } from '../utils/storeHours';

/**
 * Seção "Como Chegar" — Mapa Interativo, Dados Oficiais e Botões de Rota 3D
 */
export const HowToGetThereSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const status = calculateStoreStatus();

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(STORE_CONFIG.address.full);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    STORE_CONFIG.address.full
  )}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <section 
      aria-label="Como Chegar"
      className="w-full max-w-md mx-auto px-4 py-4 select-none"
    >
      {/* Cabeçalho da Seção */}
      <div className="text-left mb-3">
        <span className="block text-[11px] font-extrabold text-[#E11D2E] uppercase tracking-widest font-display">
          FICA PERTINHO
        </span>
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-tight leading-none">
          Como Chegar
        </h2>
        <p className="text-xs text-[#A8B0BA] font-medium mt-1">
          Toque no mapa e a rota abre direto no seu celular.
        </p>
      </div>

      {/* Card do Mapa com Botão Sobreposto */}
      <div className="relative w-full h-52 sm:h-56 rounded-2xl overflow-hidden border border-[#1E3A6E] bg-[#071328] shadow-[0_8px_24px_rgba(2,5,12,0.85)] mb-3.5 group">
        <iframe
          title="Mapa de Localização da Jacobs Elétrica e Hidráulica"
          src={mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full filter contrast-[1.1] brightness-[0.85] group-hover:brightness-[0.95] transition-all"
        />

        {/* Pílula Escura com Borda Vermelha sobreposta ao mapa */}
        <a
          href={STORE_CONFIG.links.googleMapsDirections}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-bouncy btn-glossy absolute bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#050B18]/90 border border-[#E11D2E] text-white text-xs font-display font-bold uppercase tracking-wider shadow-[0_4px_16px_rgba(225,29,46,0.6)] backdrop-blur-md hover:bg-[#E11D2E] hover:border-white transition-all cursor-pointer whitespace-nowrap"
        >
          <Navigation className="w-3.5 h-3.5 text-[#E11D2E] group-hover:text-white" />
          <span>Traçar rota até a loja</span>
        </a>
      </div>

      {/* Card de Informações com Linhas e Divisórias Finas */}
      <div className="rounded-2xl bg-gradient-to-b from-[#0F2042] to-[#08152B] border border-[#1E3A6E]/80 p-4 text-white shadow-[0_8px_24px_rgba(3,8,18,0.7)] mb-4">
        {/* Linha 1: Endereço completo + Botão Copiar */}
        <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-[#1E3A6E]/50">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#102B48] border border-[#1E3A6E] flex items-center justify-center text-red-400 shrink-0 mt-0.5">
              <MapPin className="w-4 h-4 text-[#E11D2E]" />
            </div>
            <div className="text-left">
              <span className="block text-[10px] font-bold text-[#A8B0BA] uppercase tracking-wider font-display">
                Endereço
              </span>
              <p className="text-xs sm:text-sm text-white font-medium leading-snug">
                {STORE_CONFIG.address.full}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopyAddress}
            className="btn-bouncy inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#102B48] hover:bg-[#1C4380] text-white border border-[#1E3A6E] transition-all cursor-pointer shrink-0"
            title="Copiar endereço"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#A8B0BA]" />
                <span>Copiar</span>
              </>
            )}
          </button>
        </div>

        {/* Linha 2: Horário de funcionamento do dia */}
        <div className="flex items-center justify-between gap-3 py-3 border-b border-[#1E3A6E]/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#102B48] border border-[#1E3A6E] flex items-center justify-center text-blue-300 shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="block text-[10px] font-bold text-[#A8B0BA] uppercase tracking-wider font-display">
                Horário Hoje
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white">
                {status.todayScheduleText}
              </span>
            </div>
          </div>

          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
              status.isOpen
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/50'
                : 'bg-red-950 text-red-300 border border-red-600/50'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                status.isOpen ? 'bg-emerald-400' : 'bg-red-500'
              }`}
            />
            <span>{status.isOpen ? 'Aberto agora' : 'Fechado'}</span>
          </span>
        </div>

        {/* Linha 3: WhatsApp + Botão Chamar */}
        <div className="flex items-center justify-between gap-3 pt-3.5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-950/80 border border-emerald-600/40 flex items-center justify-center text-emerald-400 shrink-0">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="block text-[10px] font-bold text-[#A8B0BA] uppercase tracking-wider font-display">
                WhatsApp da Loja
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white">
                Atendimento Rápido
              </span>
            </div>
          </div>

          <a
            href={STORE_CONFIG.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-bouncy btn-glossy inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_2px_8px_rgba(16,185,129,0.4)] transition-all cursor-pointer"
          >
            <span>Chamar</span>
          </a>
        </div>
      </div>

      {/* Três Botões 3D Lado a Lado: Google Maps, Waze e Uber (Saltantes e Brilhosos) */}
      <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
        {/* Google Maps (Destacado) */}
        <a
          href={STORE_CONFIG.links.googleMapsDirections}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-bouncy btn-glossy group relative flex flex-col items-center justify-center p-3 rounded-xl text-white bg-gradient-to-b from-[#1C4E8C] via-[#10376B] to-[#0B254A] border-t border-white/50 border-x border-[#2F6FD6]/60 border-b-2 border-[#05152D] shadow-[0_4px_0_#05152D,0_8px_16px_rgba(47,111,214,0.4)] focus-visible:outline-none"
        >
          {/* Logo Oficial Google Maps */}
          <svg className="w-6 h-6 mb-1 filter drop-shadow" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" fill="#FFFFFF" />
          </svg>
          <span className="font-display text-xs font-bold uppercase tracking-wider text-white">
            Google Maps
          </span>
          <span className="text-[9px] text-blue-200 uppercase font-semibold">Destacado</span>
        </a>

        {/* Waze */}
        <a
          href={STORE_CONFIG.links.wazeDirections}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-bouncy btn-glossy group relative flex flex-col items-center justify-center p-3 rounded-xl text-white bg-gradient-to-b from-[#163668] via-[#0E2448] to-[#071328] border-t border-white/35 border-x border-[#1E3A6E] border-b-2 border-[#040C1A] shadow-[0_4px_0_#030914,0_8px_16px_rgba(3,8,18,0.7)] focus-visible:outline-none"
        >
          {/* Logo Waze */}
          <div className="w-6 h-6 mb-1 rounded-full bg-[#33CCFF] flex items-center justify-center text-slate-900 font-extrabold text-[11px] shadow-sm">
            W
          </div>
          <span className="font-display text-xs font-bold uppercase tracking-wider text-white">
            Waze
          </span>
          <span className="text-[9px] text-[#A8B0BA] uppercase">Navegar</span>
        </a>

        {/* Uber */}
        <a
          href={STORE_CONFIG.links.uberDirections}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-bouncy btn-glossy group relative flex flex-col items-center justify-center p-3 rounded-xl text-white bg-gradient-to-b from-[#163668] via-[#0E2448] to-[#071328] border-t border-white/35 border-x border-[#1E3A6E] border-b-2 border-[#040C1A] shadow-[0_4px_0_#030914,0_8px_16px_rgba(3,8,18,0.7)] focus-visible:outline-none"
        >
          {/* Logo Uber */}
          <div className="w-6 h-6 mb-1 rounded-full bg-black border border-white/30 flex items-center justify-center text-white font-extrabold text-[9px] tracking-tighter shadow-sm">
            UBER
          </div>
          <span className="font-display text-xs font-bold uppercase tracking-wider text-white">
            Uber
          </span>
          <span className="text-[9px] text-[#A8B0BA] uppercase">Pedir Carro</span>
        </a>
      </div>
    </section>
  );
};
