import React from 'react';
import { STORE_CONFIG } from '../constants/storeConfig';
import { calculateStoreStatus } from '../utils/storeHours';

/**
 * Rodapé Limpo — Jacobs Elétrica e Hidráulica
 * Sem gotas reversas, fundo azul marinho profundo elegante,
 * logo oficial, endereço, horário de atendimento e copyright.
 */
export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const status = calculateStoreStatus();

  return (
    <footer className="relative w-full mt-8 text-white select-none">
      {/* Linha Divisória de Transição Sutil */}
      <div className="w-full flex items-center justify-center gap-2 mb-0" aria-hidden="true">
        <div className="w-20 h-px bg-gradient-to-r from-transparent to-[#1E3A6E]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" />
        <div className="w-20 h-px bg-gradient-to-l from-transparent to-[#1E3A6E]" />
      </div>

      {/* Conteúdo Centralizado */}
      <div className="w-full bg-gradient-to-b from-[#0B1A36] via-[#071328] to-[#040B17] px-5 pt-8 pb-12 text-center flex flex-col items-center border-t border-[#1E3A6E]/30">
        <div className="w-full max-w-md mx-auto flex flex-col items-center">
          
          {/* Logo Oficial Centralizada */}
          <div className="mb-3 transition-transform duration-300 hover:scale-102">
            <img
              src={STORE_CONFIG.logoUrl}
              alt="Jacobs Elétrica e Hidráulica"
              className="h-16 sm:h-20 w-auto object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Nome da Empresa */}
          <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wider text-white mb-1">
            {STORE_CONFIG.name}
          </h3>

          {/* Endereço Completo */}
          <p className="text-xs text-[#A8B0BA] max-w-xs mx-auto leading-relaxed mb-3">
            {STORE_CONFIG.address.full}
          </p>

          {/* Horário do dia */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#050B18]/70 border border-[#1E3A6E] text-[11px] font-semibold text-blue-200 mb-6">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                status.isOpen ? 'bg-emerald-400' : 'bg-[#E11D2E]'
              }`}
            />
            <span>{status.todayScheduleText}</span>
          </div>

          {/* Linha Divisória Fina */}
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#E11D2E] to-transparent mb-4" />

          {/* Copyright 2026 */}
          <p className="text-[11px] text-[#A8B0BA]/70 font-normal">
            © 2026 Jacobs Elétrica e Hidráulica. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
