/**
 * ============================================================================
 * CONFIGURAÇÃO GERAL DO BIOSITE — JACOBS ELÉTRICA E HIDRÁULICA
 * Edição de fácil manutenção: todos os links, textos e horários estão aqui.
 * ============================================================================
 */

export const STORE_CONFIG = {
  // Identificação da Empresa
  name: "Jacobs Elétrica e Hidráulica",
  tagline: "Elétrica e Hidráulica com quem entende",
  subTagline: "Soluções que conectam energia, água e confiança.",
  
  // Logotipo Oficial 3D em destaque
  logoUrl: "https://i.postimg.cc/43xpF9Jj/Logotipo-3D-Jacobs-Eletrica-e-Hidraulica.png",

  // Endereço Oficial
  address: {
    street: "Rua São Francisco Xavier, 175",
    neighborhood: "Tijuca",
    city: "Rio de Janeiro",
    state: "RJ",
    zipCode: "20550-010",
    full: "Rua São Francisco Xavier, 175 - Tijuca, Rio de Janeiro - RJ, 20550-010",
  },

  // Credenciais de Wi-Fi da Loja
  wifi: {
    ssid: "JACOBS", // Tudo maiúsculo
    password: "Castelonegro12", // Tudo junto, apenas o C maiúsculo
    qrPayload: "WIFI:T:WPA;S:JACOBS;P:Castelonegro12;;",
  },

  // Links Oficiais e Navegação
  links: {
    storeWebsite: "https://silvertech-mobile-store.my.canva.site/hidraulica-e-eletrica",
    whatsapp: "https://wa.link/qemsza",
    instagram: "https://instagram.com/jacobs_eh?vrfl=MTdoc3llNWc0ZGF5bg%3D%3D",
    googleReview: "https://search.google.com/local/writereview?placeid=ChIJB9vWNpt_mQARvx3Y8oG9S-4",
    locationShare: "https://maps.app.goo.gl/6mdnvUnSnuwPU8kZ6",
    
    // Rotas de GPS codificadas
    googleMapsDirections: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      "Rua São Francisco Xavier, 175 - Tijuca, Rio de Janeiro - RJ, 20550-010"
    )}`,
    wazeDirections: `https://waze.com/ul?q=${encodeURIComponent(
      "Rua São Francisco Xavier, 175 - Tijuca, Rio de Janeiro - RJ, 20550-010"
    )}&navigate=yes`,
    uberDirections: `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=${encodeURIComponent(
      "Rua São Francisco Xavier, 175 - Tijuca, Rio de Janeiro - RJ, 20550-010"
    )}`,
  },

  // Paleta de Cores do Biosite
  colors: {
    top1: "#3B82F6", // Azul vivo
    top2: "#1747A0", // Azul marinho vivo
    bgDark: "#050B18", // Azul-quase-preto
    cardBg: "#0B1730", // Azul marinho escuro translúcido
    redAccent: "#E11D2E", // Vermelho de destaque da marca
    steelBorder: "#1E3A6E", // Borda sutil de aço
  },

  // Horários de Funcionamento (fuso de Brasília America/Sao_Paulo)
  // seg a qui 08:00-17:00 | sex 08:00-17:30 | sáb 08:00-14:00 | dom fechado
  schedule: {
    monThu: { open: "08:00", close: "17:00", openMins: 8 * 60, closeMins: 17 * 60, closeDisplay: "17h" },
    fri: { open: "08:00", close: "17:30", openMins: 8 * 60, closeMins: 17 * 60 + 30, closeDisplay: "17h30" },
    sat: { open: "08:00", close: "14:00", openMins: 8 * 60, closeMins: 14 * 60, closeDisplay: "14h" },
    sun: null, // fechado
  },

  // Carrossel de Produtos e Serviços com mensagens automáticas para o WhatsApp
  carouselSlides: [
    {
      id: 1,
      image: "https://i.postimg.cc/sfnhLXBS/Whats-App-Image-2026-10-11-at-16-27-30-(1).jpg",
      title: "Materiais Elétricos & Iluminação",
      description: "Cabos normatizados, disjuntores DIN, interruptores, painéis de comando e lâmpadas LED de alta eficiência.",
      whatsappMessage: "Olá. Vi no seu biosite os materiais elétricos e iluminação. Gostaria de saber se tem disponível e o valor do produto.",
    },
    {
      id: 2,
      image: "https://i.postimg.cc/y6fZGdJZ/Whats-App-Image-2026-10-11-at-16-27-30-(2).jpg",
      title: "Conexões & Tubulações Hidráulicas",
      description: "Tubos e conexões soldáveis e roscáveis em PVC, registros gaveta, válvulas de retenção, torneiras e reparos.",
      whatsappMessage: "Olá. Vi no seu biosite as conexões e tubulações hidráulicas. Gostaria de saber se tem disponível e o valor do produto.",
    },
    {
      id: 3,
      image: "https://i.postimg.cc/fWH9PL3S/Whats-App-Image-2026-10-11-at-16-27-30-(3).jpg",
      title: "Ferramentas & Acessórios Profissionais",
      description: "Alicates universais e decapadores, chaves isoladas 1000V, multímetros digitais e itens para instaladores.",
      whatsappMessage: "Olá. Vi no seu biosite as ferramentas e acessórios profissionais. Gostaria de saber se tem disponível e o valor do produto.",
    },
    {
      id: 4,
      image: "https://i.postimg.cc/c1DnzHKg/Whats-App-Image-2026-10-11-at-16-27-30-(4).jpg",
      title: "Bombas D'Água & Pressurizadores",
      description: "Sistemas para pressurização hidráulica, bombas centrífugas e submersas, boias automáticas e reposição.",
      whatsappMessage: "Olá. Vi no seu biosite as bombas d'água e pressurizadores. Gostaria de saber se tem disponível e o valor do produto.",
    },
    {
      id: 5,
      image: "https://i.postimg.cc/CMvq21ZR/Whats-App-Image-2026-10-11-at-16-27-30-(5).jpg",
      title: "Proteção & Quadros de Distribuição",
      description: "Dispositivos DPS contra surtos e raios, interruptores diferenciais DR contra choques e caixas seguras.",
      whatsappMessage: "Olá. Vi no seu biosite a proteção e quadros de distribuição. Gostaria de saber se tem disponível e o valor do produto.",
    },
    {
      id: 6,
      image: "https://i.postimg.cc/7PB2R6Cb/Whats-App-Image-2026-10-11-at-16-27-30-(6).jpg",
      title: "Metais & Reparos Sanitários",
      description: "Chuveiros elétricos blindados, duchas higiênicas, torneiras com filtro, sifões articulados e vedações.",
      whatsappMessage: "Olá. Vi no seu biosite os metais e reparos sanitários. Gostaria de saber se tem disponível e o valor do produto.",
    },
    {
      id: 7,
      image: "https://i.postimg.cc/c1DnzHKs/Whats-App-Image-2026-10-11-at-16-27-30-(7).jpg",
      title: "Atendimento Técnico de Balcão",
      description: "Consultoria rápida para profissionais, condomínios e clientes finais. Tire dúvidas com nossa equipe.",
      whatsappMessage: "Olá. Vi no seu biosite o atendimento técnico de balcão. Gostaria de saber se tem disponível e tirar dúvidas sobre materiais e valores.",
    },
  ],
} as const;
