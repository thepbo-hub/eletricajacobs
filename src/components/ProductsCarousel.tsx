import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { STORE_CONFIG } from '../constants/storeConfig';

const WHATSAPP_PHONE = '5521995398081';

/**
 * Carrossel de Produtos e Serviços
 * - Botão saltante e brilhoso em cada foto para envio de mensagem automática pré-configurada no WhatsApp
 * - Botão de consulta em cada card
 * - Sem auto-scroll invasivo para não puxar o cursor ou rolar a página inesperadamente
 * - Suporte completo a swipe no toque, setas e paginação por bolinhas
 */
export const ProductsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const slides = STORE_CONFIG.carouselSlides;

  // Rola estritamente o container interno horizontalmente, sem mover o scroll da página ou puxar o cursor
  const scrollToSlide = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const card = container.querySelectorAll<HTMLElement>('.carousel-card')[index];
    if (card) {
      container.scrollTo({
        left: card.offsetLeft - container.offsetLeft,
        behavior: 'smooth',
      });
    }
  };

  // Sincroniza o índice quando o usuário rola manualmente com o dedo
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = container.querySelector('.carousel-card')?.clientWidth || 280;
    const scrollLeft = container.scrollLeft;
    const newIndex = Math.round(scrollLeft / (cardWidth + 16));
    if (newIndex >= 0 && newIndex < slides.length && newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  const handleNext = () => {
    const next = (currentIndex + 1) % slides.length;
    setCurrentIndex(next);
    scrollToSlide(next);
  };

  const handlePrev = () => {
    const prev = (currentIndex - 1 + slides.length) % slides.length;
    setCurrentIndex(prev);
    scrollToSlide(prev);
  };

  return (
    <section 
      aria-label="Nossos Serviços e Produtos"
      className="w-full max-w-md mx-auto px-4 py-6 select-none overflow-hidden"
    >
      {/* Cabeçalho */}
      <div className="flex items-end justify-between mb-4">
        <div className="text-left">
          <span className="block text-[11px] font-extrabold text-[#E11D2E] uppercase tracking-widest font-display">
            NOSSOS SERVIÇOS E PRODUTOS
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-tight leading-none">
            Veja o que fazemos
          </h2>
          <p className="text-xs text-[#A8B0BA] font-medium mt-1">
            Qualidade, estoque variado e soluções completas.
          </p>
        </div>

        {/* Botões manuais de navegação saltantes */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handlePrev}
            className="btn-bouncy w-8 h-8 rounded-full bg-[#102B48] border border-[#1E3A6E] flex items-center justify-center text-white hover:bg-[#1C4380] transition-all cursor-pointer shadow-md"
            aria-label="Slide anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="btn-bouncy w-8 h-8 rounded-full bg-[#102B48] border border-[#1E3A6E] flex items-center justify-center text-white hover:bg-[#1C4380] transition-all cursor-pointer shadow-md"
            aria-label="Próximo slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Carrossel Horizontal com Scroll-Snap */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-2 pt-1 -mx-4 px-4 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {slides.map((item, idx) => {
          const itemWhatsAppUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(
            item.whatsappMessage
          )}`;

          return (
            <div
              key={item.id}
              className="carousel-card snap-start shrink-0 w-[86%] sm:w-[320px] rounded-2xl bg-gradient-to-b from-[#0F2042] via-[#0B1730] to-[#071124] border border-[#1E3A6E]/80 p-3.5 shadow-[0_8px_24px_rgba(3,8,18,0.7)] flex flex-col justify-between"
            >
              {/* Foto com proporção elegante e botão de WhatsApp sobreposto */}
              <div className="relative w-full h-52 sm:h-56 rounded-xl overflow-hidden bg-[#050B18] mb-3.5 group">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Degradê de contraste na parte inferior da foto */}
                <div 
                  className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0B1730] via-[#0B1730]/60 to-transparent pointer-events-none" 
                  aria-hidden="true" 
                />

                {/* NÚMERO GIGANTE EM VERMELHO SOBREPOSTO */}
                <span className="font-display text-5xl sm:text-6xl font-black text-[#E11D2E] absolute bottom-1 left-3 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] select-none leading-none">
                  {String(idx + 1).padStart(2, '0')}
                </span>

                {/* BOTÃO SALTANTE E BRILHOSO NA FOTO PARA ENVIAR MENSAGEM AUTOMÁTICA AO WHATSAPP */}
                <a
                  href={itemWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-bouncy btn-glossy absolute top-3 right-3 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-display font-extrabold uppercase tracking-wider border-t border-white/50 border-b border-emerald-950 shadow-[0_4px_12px_rgba(0,0,0,0.6),0_0_12px_rgba(16,185,129,0.5)] cursor-pointer"
                  title="Enviar mensagem sobre este item no WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white shrink-0" />
                  <span>Pedir no WhatsApp</span>
                </a>
              </div>

              {/* Conteúdo textual */}
              <div className="text-left flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wider text-white mb-1.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#A8B0BA] font-normal leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Tag informativa de balcão */}
                <div className="mt-3 pt-2.5 border-t border-[#1E3A6E]/40 flex items-center justify-between text-[11px] text-blue-200">
                  <span className="font-semibold uppercase tracking-wider text-[#E11D2E]">Pronta entrega</span>
                  <span className="text-slate-400">Garantia Jacobs</span>
                </div>

                {/* BOTÃO 3D SALTANTE E BRILHOSO NO CARD PARA MENSAGEM AUTOMÁTICA */}
                <a
                  href={itemWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-bouncy btn-glossy mt-3 w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-b from-[#25D366] via-[#1EBE5D] to-[#128C7E] border-t border-white/40 border-b-2 border-[#0D6559] text-white font-display text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-[0_4px_0_#0D6559,0_8px_16px_rgba(37,211,102,0.35)] cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white shrink-0" />
                  <span>Consultar Disponibilidade</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Indicadores (Bolinhas, com a ativa alongada em vermelho) */}
      <div className="flex items-center justify-center gap-1.5 mt-4 mb-5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setCurrentIndex(idx);
              scrollToSlide(idx);
            }}
            className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
              currentIndex === idx
                ? 'w-6 bg-[#E11D2E] shadow-[0_0_8px_#E11D2E]'
                : 'w-2 bg-[#1E3A6E] hover:bg-blue-400'
            }`}
            aria-label={`Ir para slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* BOTÃO LARGO ABAIXO DO CARROSSEL: "Falar com a Jacobs" (WhatsApp) — Saltante e Brilhoso */}
      <a
        href={STORE_CONFIG.links.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-bouncy btn-glossy group relative w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-display font-extrabold text-base sm:text-lg tracking-wider uppercase text-white bg-gradient-to-b from-[#25D366] via-[#1EBE5D] to-[#128C7E] border-t border-white/50 border-b-2 border-[#0D6559] shadow-[0_6px_0_#0D6559,0_14px_24px_rgba(37,211,102,0.4)] focus-visible:outline-none cursor-pointer"
      >
        <MessageCircle className="w-5 h-5 fill-white shrink-0" />
        <span>Falar com a Jacobs</span>
      </a>
    </section>
  );
};
