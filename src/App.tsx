import React from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { RealisticIndustrialBackground } from './components/RealisticIndustrialBackground';
import { HeroHeader } from './components/HeroHeader';
import { MainWhatsAppCard } from './components/MainWhatsAppCard';
import { LinkButtons } from './components/LinkButtons';
import { HowToGetThereSection } from './components/HowToGetThereSection';
import { ProductsCarousel } from './components/ProductsCarousel';
import { Footer } from './components/Footer';

/**
 * BIOSITE PROFISSIONAL — JACOBS ELÉTRICA E HIDRÁULICA
 * Mobile-first (máximo 480px centralizado no desktop),
 * Topo com borda de água pingando, corpo escuro azul-quase-preto,
 * botões 3D brilhosos, carrossel de fotos e gotejamento espelhado no rodapé.
 */
export default function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen w-full bg-[#050B18] text-white flex justify-center items-start selection:bg-[#E11D2E]/40 selection:text-white relative">
        
        {/* Background com elementos industriais realistas e faíscas elétricas */}
        <RealisticIndustrialBackground />

        {/* Container Mobile-First (Largura máxima ~480px centralizada no desktop) */}
        <div className="w-full max-w-[480px] min-h-screen flex flex-col justify-between relative z-10 bg-[#050B18]/95 shadow-[0_0_50px_rgba(0,0,0,0.9)] border-x border-[#1E3A6E]/30">
          
          {/* 1) TOPO COM LOGO, TÍTULO, SELO AO VIVO E BORDA DE ÁGUA PINGANDO */}
          <HeroHeader />

          {/* ÁREA CENTRAL DO CONTEÚDO */}
          <main className="w-full flex-1 flex flex-col">
            {/* 2) CARD PRINCIPAL DO WHATSAPP */}
            <MainWhatsAppCard />

            {/* 3) BOTÕES DE LINKS (SITE, INSTAGRAM, GOOGLE, LOCALIZAÇÃO, WI-FI) */}
            <LinkButtons />

            {/* 4) SEÇÃO COMO CHEGAR (MAPA, INFOS, GOOGLE MAPS, WAZE, UBER) */}
            <HowToGetThereSection />

            {/* 5) CARROSSEL DE PRODUTOS E SERVIÇOS (7 FOTOS + BOTÃO WHATSAPP) */}
            <ProductsCarousel />
          </main>

          {/* 6) RODAPÉ COM GOTEJAMENTO ESPELHADO */}
          <Footer />
        </div>
      </div>
    </ErrorBoundary>
  );
}
