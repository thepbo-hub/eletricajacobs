import React from 'react';

/**
 * Elementos Industriais Realistas de Fundo:
 * Tubulações de cobre e PVC, válvulas metálicas, fios e cabos elétricos,
 * disjuntores DIN e faíscas/arcos elétricos sutis em baixa opacidade.
 */
export const RealisticIndustrialBackground: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Tubulação de Cobre com Cotovelo e Reflexos Metálicos */}
      <svg 
        className="absolute -top-12 -right-16 w-80 h-96 opacity-[0.11] filter blur-[0.4px]"
        viewBox="0 0 300 360" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Cobre Polido */}
          <linearGradient id="copperPipe" x1="0" y1="0" x2="60" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4A1E0D" />
            <stop offset="25%" stopColor="#B85D36" />
            <stop offset="50%" stopColor="#E59866" />
            <stop offset="75%" stopColor="#A04018" />
            <stop offset="100%" stopColor="#3E1508" />
          </linearGradient>
          {/* Válvula de Latão */}
          <radialGradient id="brassValve" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F9E79F" />
            <stop offset="50%" stopColor="#D4AC0D" />
            <stop offset="85%" stopColor="#7D6608" />
            <stop offset="100%" stopColor="#3E3304" />
          </radialGradient>
        </defs>
        
        {/* Tubo vertical de cobre */}
        <rect x="180" y="0" width="36" height="280" fill="url(#copperPipe)" rx="4" />
        
        {/* Curva / Conexão em T */}
        <circle cx="198" cy="280" r="28" fill="#B85D36" />
        
        {/* Tubo horizontal de cobre */}
        <rect x="0" y="262" width="200" height="36" fill="url(#copperPipe)" rx="4" />
        
        {/* Volante de Registro Metálico */}
        <circle cx="198" cy="140" r="38" fill="none" stroke="url(#brassValve)" strokeWidth="10" />
        <line x1="160" y1="140" x2="236" y2="140" stroke="url(#brassValve)" strokeWidth="6" />
        <line x1="198" y1="102" x2="198" y2="178" stroke="url(#brassValve)" strokeWidth="6" />
        <circle cx="198" cy="140" r="8" fill="#E11D2E" />
      </svg>

      {/* 2. Tubulação PVC e Cabos Elétricos Trançados na Esquerda */}
      <svg 
        className="absolute top-[38%] -left-14 w-72 h-96 opacity-[0.09] filter blur-[0.4px]"
        viewBox="0 0 280 380" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pvcPipe" x1="0" y1="0" x2="44" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1B4F72" />
            <stop offset="40%" stopColor="#2E86C1" />
            <stop offset="65%" stopColor="#85C1E9" />
            <stop offset="100%" stopColor="#154360" />
          </linearGradient>
          <linearGradient id="cableRed" x1="0" y1="0" x2="10" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#781017" />
            <stop offset="50%" stopColor="#E11D2E" />
            <stop offset="100%" stopColor="#50080E" />
          </linearGradient>
          <linearGradient id="cableBlue" x1="0" y1="0" x2="10" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0B2F68" />
            <stop offset="50%" stopColor="#2F6FD6" />
            <stop offset="100%" stopColor="#061B3C" />
          </linearGradient>
        </defs>

        {/* Tubo de PVC de alta pressão com bolsa */}
        <rect x="20" y="40" width="44" height="340" fill="url(#pvcPipe)" rx="6" />
        <rect x="16" y="180" width="52" height="26" fill="#2E86C1" rx="4" />

        {/* Feixe de cabos flexíveis elétricos com curvas sinuosas */}
        <path d="M 64 60 C 130 90, 150 180, 110 240 C 80 290, 120 340, 160 380" stroke="url(#cableRed)" strokeWidth="9" fill="none" strokeLinecap="round" />
        <path d="M 74 75 C 140 105, 160 195, 120 255 C 90 305, 130 355, 170 395" stroke="url(#cableBlue)" strokeWidth="9" fill="none" strokeLinecap="round" />
      </svg>

      {/* 3. Disjuntor DIN e Ferramentas Metálicas no Fundo Inferior */}
      <svg 
        className="absolute -bottom-10 right-4 w-64 h-80 opacity-[0.08] filter blur-[0.3px]"
        viewBox="0 0 240 300" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Corpo do Disjuntor DIN */}
        <rect x="80" y="60" width="70" height="130" rx="8" fill="#1C2833" stroke="#566573" strokeWidth="2" />
        <rect x="95" y="80" width="40" height="50" rx="4" fill="#0E161D" />
        {/* Manopla Vermelha do Disjuntor */}
        <rect x="104" y="90" width="22" height="24" rx="3" fill="#E11D2E" />
        {/* Bornes de parafuso metálicos */}
        <circle cx="115" cy="35" r="9" fill="#95A5A6" stroke="#2C3E50" strokeWidth="2" />
        <circle cx="115" cy="215" r="9" fill="#95A5A6" stroke="#2C3E50" strokeWidth="2" />
      </svg>

      {/* ========================================================
          FAÍSCAS E ARCOS ELÉTRICOS AZUL-BRANCO COM BRILHO VERMELHO
          ======================================================== */}
      {/* Faísca 1 (lado direito superior) */}
      <div 
        className="absolute top-28 right-[12%] w-6 h-6 pointer-events-none"
        style={{ animation: 'sparkFlash1 6.5s infinite ease-in-out' }}
      >
        <svg viewBox="0 0 32 32" fill="none" className="w-full h-full filter drop-shadow-[0_0_8px_rgba(225,29,46,0.8)]">
          <path d="M16 2L18 12L28 14L19 18L21 28L14 20L4 19L13 14Z" fill="#E8F4FD" />
          <circle cx="16" cy="16" r="3" fill="#FFFFFF" />
          <path d="M11 7L16 16L21 24" stroke="#65D5FF" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Faísca 2 (lado esquerdo inferior) */}
      <div 
        className="absolute top-[62%] left-[8%] w-5 h-5 pointer-events-none"
        style={{ animation: 'sparkFlash2 8.5s infinite ease-in-out', animationDelay: '2.5s' }}
      >
        <svg viewBox="0 0 28 28" fill="none" className="w-full h-full filter drop-shadow-[0_0_8px_rgba(47,111,214,0.8)]">
          <path d="M14 2L16 10L24 12L17 16L18 24L12 18L3 17L11 12Z" fill="#FFFFFF" />
          <circle cx="14" cy="14" r="2.5" fill="#E11D2E" />
          <path d="M6 10L14 14L22 18" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};
