// ═══════════════════════════════════════════════════════════════
// /api/inquiry.js — Receptor del webhook "Check My Date" (Opción B)
// ═══════════════════════════════════════════════════════════════
// Función serverless estilo Vercel/Next.js (carpeta /api o /pages/api).
// Qué hace hoy:
//   1. Valida el payload del formulario
//   2. Te notifica al instante por Telegram con los datos de la consulta
//   3. Deja el gancho listo para el Paso 2 (agente de respuesta)
//
// Variables de entorno necesarias (en Vercel → Settings → Env Vars):
//   TELEGRAM_BOT_TOKEN  → créalo hablando con @BotFather en Telegram
//   TELEGRAM_CHAT_ID    → tu chat id (habla con @userinfobot para verlo)
//
// Nota: si prefieres la Opción A (n8n/Make), NO necesitas este archivo —
// apunta WEBHOOK_URL del formulario directo al webhook de n8n y replica
// esta misma lógica en nodos visuales.
// ═══════════════════════════════════════════════════════════════

const REQUIRED = ["name", "email", "event_type", "event_date", "venue"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  // CORS: permite el POST desde tu dominio (ajusta al dominio real)
  res.setHeader("Access-Control-Allow-Origin", "https://xolosax.com");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const data = req.body || {};

  // ── 1. Validación ────────────────────────────────────────────
  const missing = REQUIRED.filter(
    (k) => !data[k] || String(data[k]).trim() === ""
  );
  if (missing.length) {
    return res.status(400).json({ error: "Missing fields", fields: missing });
  }
  if (!EMAIL_RE.test(data.email)) {
    return res.status(400).json({ error: "Invalid email" });
  }
  const eventDate = new Date(data.event_date + "T00:00:00");
  if (isNaN(eventDate) || eventDate < new Date().setHours(0, 0, 0, 0)) {
    return res.status(400).json({ error: "Invalid or past date" });
  }

  // Normaliza lo que usará el cotizador (Paso 3)
  const inquiry = {
    name: String(data.name).trim().slice(0, 120),
    email: String(data.email).trim().toLowerCase(),
    phone: data.phone ? String(data.phone).trim().slice(0, 40) : null,
    event_type: String(data.event_type).slice(0, 40),
    event_date: data.event_date, // YYYY-MM-DD
    day_of_week: eventDate.toLocaleDateString("en-AU", { weekday: "long" }),
    venue: String(data.venue).trim().slice(0, 160),
    duration: data.duration || "Not sure yet",
    source: data.source || null,
    vision: data.vision ? String(data.vision).trim().slice(0, 1000) : null,
    received_at: new Date().toISOString(),
  };

  // ── 2. Notificación inmediata a tu Telegram ──────────────────
  try {
    await notifyTelegram(inquiry);
  } catch (err) {
    // La notificación nunca debe tumbar la consulta del cliente
    console.error("Telegram notify failed:", err);
  }

  // ── 3. Gancho para el Paso 2: el agente de respuesta ─────────
  // Aquí irá la llamada al agente (API de Claude + reglas de precio
  // + envío del email vía Resend). Mientras lo construyes, respondes
  // tú manualmente al recibir la notificación — Wizard of Oz.
  //
  // await runResponseAgent(inquiry);

  return res.status(200).json({ ok: true });
}

// ────────────────────────────────────────────────────────────────
async function notifyTelegram(q) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const lines = [
    "🎷 *Nueva consulta — Xolosax*",
    "",
    `*${q.name}* — ${q.event_type}`,
    `📅 ${q.event_date} (${q.day_of_week}) · ⏱ ${q.duration}`,
    `📍 ${q.venue}`,
    `✉️ ${q.email}${q.phone ? " · 📞 " + q.phone : ""}`,
    q.source ? `🔎 Vía: ${q.source}` : null,
    q.vision ? `\n💭 "${q.vision}"` : null,
  ].filter(Boolean);

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: lines.join("\n"),
      parse_mode: "Markdown",
    }),
  });
}
