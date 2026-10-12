import React, { useEffect, useRef } from 'react';

interface WaterDripEdgeProps {
  inverted?: boolean;
  bgColor?: string;
  topColor?: string;
}

interface DripData {
  xc: number;
  r: number;
  nw: number;
  big: boolean;
  min: number;
  max: number;
  d: number;
  t0: number;
  dur: number;
  per: number;
  ph: number;
  state: 'grow' | 'retract';
  rt?: number;
}

/**
 * Borda de água escorrendo e pingando animada em SVG + requestAnimationFrame
 * - Duas famílias de gotas intercaladas:
 *   (a) Grandes e bulbosas (largura 28-46px) que alongam e soltam gotinhas
 *   (b) Pequenas e curtas (largura 12-20px) que apenas pulsam
 * - Brilho inclinado translúcido dentro de cada bulbo
 * - Fio de luz (rim) na borda do líquido
 * - Gotinha cai com física de gravidade por cima do card com z-index elevado
 * - 1 a cada ~6 gotinhas é vermelha
 * - Suporta inversão espelhada para o rodapé
 * - Respeita prefers-reduced-motion
 */
export const WaterDripEdge: React.FC<WaterDripEdgeProps> = ({
  inverted = false,
  bgColor = "#050B18",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const rainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;
    const rain = rainRef.current;
    if (!container || !svg || !rain) return;

    const NS = "http://www.w3.org/2000/svg";
    const H = 84;
    const base = 22; // Altura do SVG e linha-base da borda
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);

    // Limpa filhos anteriores
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    // 1) Corpo escuro (preenchimento da página)
    const body = document.createElementNS(NS, "path");
    body.setAttribute("fill", bgColor);

    // 2) Fio de luz na borda do líquido
    const rim = document.createElementNS(NS, "path");
    rim.setAttribute("fill", "none");
    rim.setAttribute("stroke", "rgba(255, 255, 255, 0.18)");
    rim.setAttribute("stroke-width", "1");

    svg.append(body, rim);

    let W = container.clientWidth || 400;
    let drips: DripData[] = [];
    let shines: SVGEllipseElement[] = [];
    let animId: number;

    /* ---------- Cria as gotas, de dois tipos intercalados ---------- */
    const build = () => {
      if (!container || !svg) return;
      W = container.clientWidth || 400;
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

      shines.forEach((s) => s.remove());
      drips = [];
      shines = [];

      let x = 10;
      while (x < W - 28) {
        const big = Math.random() < 0.55; // GRANDE (bulbosa) ou PEQUENA
        const r = big ? rnd(14, 23) : rnd(6, 10); // raio do bulbo
        const nw = r * (big ? 1.05 : 1.25); // largura do pescoço (mais fino que o bulbo)
        const min = r * 2 + (big ? 4 : 2); // comprimento em repouso
        const max = big ? rnd(36, 56) : min + rnd(4, 10); // comprimento máximo
        const xc = x + r + 12;

        drips.push({
          xc,
          r,
          nw,
          big,
          min,
          max,
          d: min,
          t0: performance.now() + rnd(0, 4000),
          dur: rnd(3200, 7000),
          per: rnd(900, 1800),
          ph: rnd(0, 6),
          state: 'grow',
        });

        x = xc + r + 12 + rnd(8, 34); // espaço entre gotas
      }

      drips.forEach(() => {
        // Brilho elíptico dentro de cada gota
        const e = document.createElementNS(NS, "ellipse");
        e.setAttribute("fill", "#FFFFFF");
        svg.appendChild(e);
        shines.push(e);
      });
    };

    /* ---------- Desenha uma gota: pescoço fino + bulbo redondo (lágrima) ---------- */
    const shape = (n: DripData) => {
      const { xc, r, nw } = n;
      const nl = xc - nw / 2;
      const nr = xc + nw / 2;
      const cy = Math.max(base + 14 + r * 0.7, base + n.d - r); // centro do bulbo

      return {
        cy,
        d:
          `H${nl - 12} Q${nl} ${base} ${nl} ${base + 12} L${nl} ${cy - r * 0.6} ` +
          `C${nl} ${cy - r * 0.1} ${xc - r} ${cy - r * 0.5} ${xc - r} ${cy} ` +
          `A${r} ${r} 0 0 0 ${xc + r} ${cy} ` +
          `C${xc + r} ${cy - r * 0.5} ${nr} ${cy - r * 0.1} ${nr} ${cy - r * 0.6} ` +
          `L${nr} ${base + 12} Q${nr} ${base} ${nr + 12} ${base} `,
      };
    };

    /* ---------- Solta a gotinha que cai por cima de tudo com aceleração ---------- */
    const release = (n: DripData) => {
      if (reduce || !rain || !container) return;
      const size = Math.max(7, Math.min(11, n.r * 0.5));
      const f = document.createElement("div");
      const isRed = Math.random() < 1 / 6; // 1 a cada ~6 é vermelha

      f.className = `fall ${isRed ? "red" : ""}`;
      f.style.width = `${size}px`;
      f.style.height = `${size * 1.25}px`;

      const p = container.getBoundingClientRect();
      const s = svg.getBoundingClientRect();

      f.style.left = `${n.xc - size / 2}px`;
      if (!inverted) {
        f.style.top = `${s.top - p.top + base + n.d - 2}px`;
      } else {
        f.style.bottom = `${base + n.d - 2}px`;
      }

      rain.appendChild(f);

      const dist = rnd(120, 170);
      if (!inverted) {
        f.animate(
          [
            { transform: 'translateY(0)', opacity: 1, offset: 0 },
            { transform: `translateY(${dist * 0.75}px)`, opacity: 1, offset: 0.7 },
            { transform: `translateY(${dist}px) scale(0.85)`, opacity: 0, offset: 1 },
          ],
          {
            duration: rnd(1000, 1350),
            easing: 'cubic-bezier(0.5, 0, 1, 0.65)',
            fill: 'forwards',
          }
        ).onfinish = () => f.remove();
      } else {
        // Invertido (no rodapé cai para baixo saindo da borda invertida)
        f.animate(
          [
            { transform: 'translateY(0)', opacity: 1, offset: 0 },
            { transform: `translateY(${dist * 0.75}px)`, opacity: 1, offset: 0.7 },
            { transform: `translateY(${dist}px) scale(0.85)`, opacity: 0, offset: 1 },
          ],
          {
            duration: rnd(1000, 1350),
            easing: 'cubic-bezier(0.5, 0, 1, 0.65)',
            fill: 'forwards',
          }
        ).onfinish = () => f.remove();
      }
    };

    /* ---------- Loop de animação contínua ---------- */
    const frame = (now: number) => {
      let line = '';
      let i = 0;

      for (const n of drips) {
        if (reduce) {
          n.d = n.big ? n.max * 0.55 : (n.min + n.max) / 2;
        } else if (!n.big) {
          // Pequenas: só pulsam levemente, sem soltar gotinha
          n.d = n.min + (n.max - n.min) * (0.5 + 0.5 * Math.sin(now / n.per + n.ph));
        } else if (n.state === 'grow') {
          // Grandes: alongam devagar (ease-in) e, ao esticar, soltam a gotinha
          const k = (now - n.t0) / n.dur;
          n.d = k < 0 ? n.min : n.min + (n.max - n.min) * Math.min(k, 1) ** 2;
          if (k >= 1) {
            release(n);
            n.state = 'retract';
            n.rt = now;
          }
        } else {
          // A gota-mãe recua rápido com leve efeito elástico e recomeça
          const q = Math.min((now - (n.rt || now)) / 450, 1);
          n.d = n.max * (1 - q) + n.min * q + Math.sin(q * Math.PI * 3) * 3 * (1 - q);
          if (q >= 1) {
            n.state = 'grow';
            n.t0 = now + rnd(0, 1500);
            n.dur = rnd(3200, 7000);
            n.max = rnd(36, 56);
          }
        }

        const s = shape(n);
        line += s.d;

        const e = shines[i++];
        if (e) {
          // Brilho inclinado dentro do bulbo
          e.setAttribute("cx", (n.xc - n.r * 0.35).toString());
          e.setAttribute("cy", (s.cy - n.r * 0.1).toString());
          e.setAttribute("rx", (n.r * 0.18).toString());
          e.setAttribute("ry", (n.r * 0.4).toString());
          e.setAttribute("transform", `rotate(-15 ${n.xc - n.r * 0.35} ${s.cy - n.r * 0.1})`);
          e.setAttribute("opacity", Math.min(0.6, n.d / 22).toString());
        }
      }

      body.setAttribute("d", `M0 ${H}V${base}${line}H${W}V${H}Z`);
      rim.setAttribute("d", `M0 ${base}${line}H${W}`);

      if (!reduce) {
        animId = requestAnimationFrame(frame);
      }
    };

    build();
    animId = requestAnimationFrame(frame);

    const handleResize = () => {
      build();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [bgColor, inverted]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[84px] overflow-visible pointer-events-none select-none ${
        inverted ? "transform -scale-y-100 -mb-[1px] z-20" : "-bottom-[1px] z-20"
      }`}
      aria-hidden="true"
    >
      {/* SVG com sombra suave (drop-shadow) para profundidade de líquido */}
      <svg
        ref={svgRef}
        className="absolute left-0 bottom-0 w-full h-[84px] overflow-visible block filter drop-shadow-[0_8px_12px_rgba(0,0,0,0.5)]"
        preserveAspectRatio="none"
      />

      {/* Camada das gotinhas que se soltam e caem por cima de tudo */}
      <div 
        ref={rainRef} 
        className="rain absolute inset-0 z-30 pointer-events-none overflow-visible" 
      />
    </div>
  );
};
