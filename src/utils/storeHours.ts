/**
 * Utilitário de status de funcionamento em tempo real
 * Fuso horário: America/Sao_Paulo (Horário de Brasília)
 *
 * Horários:
 * - Seg a Qui: 08:00 às 17:00
 * - Sex: 08:00 às 17:30
 * - Sáb: 08:00 às 14:00
 * - Dom: Fechado
 */

export interface StoreStatusResult {
  isOpen: boolean;
  statusText: string;
  dotColor: "green" | "red";
  todayScheduleText: string;
  timeFormatted: string;
}

export function getBrasiliaTime(date: Date = new Date()): {
  dayOfWeek: number; // 0 = Dom, 1 = Seg, ..., 6 = Sáb
  hours: number;
  minutes: number;
  totalMinutes: number;
  timeFormatted: string;
} {
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Sao_Paulo",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const parts = formatter.formatToParts(date);
    const hourVal = parts.find((p) => p.type === "hour")?.value ?? "0";
    const minVal = parts.find((p) => p.type === "minute")?.value ?? "0";

    const hours = parseInt(hourVal, 10);
    const minutes = parseInt(minVal, 10);
    const totalMinutes = hours * 60 + minutes;

    const dateStr = date.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" });
    const parsedDate = new Date(dateStr);
    const dayOfWeek = isNaN(parsedDate.getDay()) ? date.getUTCDay() : parsedDate.getDay();

    const pad = (n: number) => n.toString().padStart(2, "0");
    const timeFormatted = `${pad(hours)}:${pad(minutes)}`;

    return { dayOfWeek, hours, minutes, totalMinutes, timeFormatted };
  } catch {
    // Fallback UTC-3 seguro
    const utcTimestamp = date.getTime() + date.getTimezoneOffset() * 60000;
    const spTimestamp = utcTimestamp - 3 * 3600000;
    const fallbackDate = new Date(spTimestamp);

    const hours = fallbackDate.getHours();
    const minutes = fallbackDate.getMinutes();
    const dayOfWeek = fallbackDate.getDay();
    const totalMinutes = hours * 60 + minutes;

    const pad = (n: number) => n.toString().padStart(2, "0");
    const timeFormatted = `${pad(hours)}:${pad(minutes)}`;

    return { dayOfWeek, hours, minutes, totalMinutes, timeFormatted };
  }
}

/**
 * Retorna o status calculado exato de acordo com as regras solicitadas:
 */
export function calculateStoreStatus(date: Date = new Date()): StoreStatusResult {
  const { dayOfWeek, totalMinutes, timeFormatted } = getBrasiliaTime(date);

  // Minutos de abertura padrão: 08:00 = 480 min
  const OPEN_MINS = 8 * 60; // 480

  // 1. Domingo (dayOfWeek === 0)
  if (dayOfWeek === 0) {
    return {
      isOpen: false,
      statusText: "FECHADO · Abre segunda-feira às 08h",
      dotColor: "red",
      todayScheduleText: "Domingo: fechado",
      timeFormatted,
    };
  }

  // 2. Segunda a Quinta (dayOfWeek 1..4)
  if (dayOfWeek >= 1 && dayOfWeek <= 4) {
    const CLOSE_MINS = 17 * 60; // 1020 (17:00)

    if (totalMinutes < OPEN_MINS) {
      return {
        isOpen: false,
        statusText: "FECHADO · Abre hoje às 08h",
        dotColor: "red",
        todayScheduleText: "Hoje: 08h às 17h",
        timeFormatted,
      };
    }

    if (totalMinutes >= OPEN_MINS && totalMinutes < CLOSE_MINS) {
      return {
        isOpen: true,
        statusText: "ABERTO · Fecha às 17h",
        dotColor: "green",
        todayScheduleText: "Hoje: 08h às 17h",
        timeFormatted,
      };
    }

    // Após 17h00
    return {
      isOpen: false,
      statusText: "FECHADO · Abre amanhã às 08h",
      dotColor: "red",
      todayScheduleText: "Hoje: 08h às 17h",
      timeFormatted,
    };
  }

  // 3. Sexta-feira (dayOfWeek === 5)
  if (dayOfWeek === 5) {
    const CLOSE_MINS = 17 * 60 + 30; // 1050 (17:30)

    if (totalMinutes < OPEN_MINS) {
      return {
        isOpen: false,
        statusText: "FECHADO · Abre hoje às 08h",
        dotColor: "red",
        todayScheduleText: "Hoje: 08h às 17h30",
        timeFormatted,
      };
    }

    if (totalMinutes >= OPEN_MINS && totalMinutes < CLOSE_MINS) {
      return {
        isOpen: true,
        statusText: "ABERTO · Fecha às 17h30",
        dotColor: "green",
        todayScheduleText: "Hoje: 08h às 17h30",
        timeFormatted,
      };
    }

    // Após 17h30 na sexta-feira: "FECHADO · Abre amanhã (sábado) às 08h"
    return {
      isOpen: false,
      statusText: "FECHADO · Abre amanhã (sábado) às 08h",
      dotColor: "red",
      todayScheduleText: "Hoje: 08h às 17h30",
      timeFormatted,
    };
  }

  // 4. Sábado (dayOfWeek === 6)
  if (dayOfWeek === 6) {
    const CLOSE_MINS = 14 * 60; // 840 (14:00)

    if (totalMinutes < OPEN_MINS) {
      return {
        isOpen: false,
        statusText: "FECHADO · Abre hoje às 08h",
        dotColor: "red",
        todayScheduleText: "Hoje: 08h às 14h",
        timeFormatted,
      };
    }

    if (totalMinutes >= OPEN_MINS && totalMinutes < CLOSE_MINS) {
      return {
        isOpen: true,
        statusText: "ABERTO · Fecha às 14h",
        dotColor: "green",
        todayScheduleText: "Hoje: 08h às 14h",
        timeFormatted,
      };
    }

    // Após 14h00 no sábado: "FECHADO · Abre segunda-feira às 08h"
    return {
      isOpen: false,
      statusText: "FECHADO · Abre segunda-feira às 08h",
      dotColor: "red",
      todayScheduleText: "Hoje: 08h às 14h",
      timeFormatted,
    };
  }

  // Fallback seguro
  return {
    isOpen: false,
    statusText: "FECHADO · Abre às 08h",
    dotColor: "red",
    todayScheduleText: "Seg a Sex: 08h às 17h",
    timeFormatted,
  };
}
