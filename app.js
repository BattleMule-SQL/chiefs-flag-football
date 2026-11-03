// Renders the page from data.js. You shouldn't need to edit this file.

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// Page labels in each language. Content text is translated via SPANISH in data.js.
const UI = {
  en: {
    locale: "en-US", toggle: "Español", toggleLabel: "Ver en español",
    announcements: "Announcements", schedule: "Schedule", fields: "Fields", fieldLocations: "Field Locations",
    nextUp: "Next up", today: "Today", tomorrow: "Tomorrow", inDays: (n) => `In ${n} days`,
    pinned: "Pinned", noAnnouncements: "No announcements right now.", record: "Record",
    practice: "Practice", event: "Event", home: "Home", away: "Away", game: "Game",
    tbd: "TBD", directions: "Directions", tapToEnlarge: "Tap to enlarge.", fieldMap: "field map",
  },
  es: {
    locale: "es-US", toggle: "English", toggleLabel: "View in English",
    announcements: "Anuncios", schedule: "Calendario", fields: "Campos", fieldLocations: "Ubicación de los campos",
    nextUp: "Próximo", today: "Hoy", tomorrow: "Mañana", inDays: (n) => `En ${n} días`,
    pinned: "Fijado", noAnnouncements: "No hay anuncios por ahora.", record: "Récord",
    practice: "Práctica", event: "Evento", home: "Local", away: "Visitante", game: "Partido",
    tbd: "Por confirmar", directions: "Cómo llegar", tapToEnlarge: "Toca para ampliar.", fieldMap: "mapa de campos",
  },
};

const getLang = () => {
  const q = new URLSearchParams(location.search).get("lang");
  if (q === "es" || q === "en") return q;
  try { return localStorage.getItem("lang") === "es" ? "es" : "en"; } catch { return "en"; }
};
let lang = getLang();
let L = UI[lang];

// Translate a content string; falls back to English when no Spanish version exists.
const tr = (s) => (lang === "es" && typeof SPANISH !== "undefined" && SPANISH[s]) || s;

const parseDate = (d) => new Date(d + "T00:00:00");
const fmtLong = (d) => parseDate(d).toLocaleDateString(L.locale, { weekday: "long", month: "long", day: "numeric" });
const fmtShort = (d) => parseDate(d).toLocaleDateString(L.locale, { month: "short", day: "numeric", year: "numeric" });
const fmtTime = (t) => {
  if (!/^\d{1,2}:\d{2}$/.test(t)) return !t || t === "TBD" ? L.tbd : t;
  const [h, m] = t.split(":").map(Number);
  return new Date(2000, 0, 1, h, m).toLocaleTimeString(L.locale, { hour: "numeric", minute: "2-digit" });
};
const mapUrl = (addr) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(addr);

const today = new Date();
today.setHours(0, 0, 0, 0);

if (TEAM.colors) {
  document.documentElement.style.setProperty("--primary", TEAM.colors.primary);
  document.documentElement.style.setProperty("--accent", TEAM.colors.accent);
}

const eventTitle = (e) =>
  e.type === "practice" ? L.practice
  : e.type === "event" ? esc(tr(e.title))
  : `${e.home === false ? "@" : "vs"} ${esc(tr(e.opponent))}`;
const eventTag = (e) =>
  e.type === "practice" ? L.practice : e.type === "event" ? L.event
  : e.home === true ? L.home : e.home === false ? L.away : L.game;
const fieldLink = (key) => {
  const f = FIELDS[key];
  if (!f) return "";
  return f.address ? `<a href="${mapUrl(f.address)}" target="_blank" rel="noopener">${esc(tr(f.name))}</a>` : esc(tr(f.name));
};
const where = (e) => fieldLink(e.field) + (e.spot ? ` – ${esc(tr(e.spot))}` : "");

function render() {
  L = UI[lang];
  document.documentElement.lang = lang;

  // Header, static labels, footer
  document.title = TEAM.name;
  $("team-name").textContent = TEAM.name;
  $("team-league").textContent = tr(TEAM.league);
  $("team-contact").textContent = tr(TEAM.contact || "");
  document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = L[el.dataset.i18n]; });
  const btn = $("lang-toggle");
  btn.textContent = L.toggle;
  btn.setAttribute("aria-label", L.toggleLabel);

  // Next up
  const schedule = [...SCHEDULE].sort((a, b) => a.date.localeCompare(b.date));
  const next = schedule.find((e) => parseDate(e.date) >= today);
  if (next) {
    const f = FIELDS[next.field];
    const days = Math.round((parseDate(next.date) - today) / 86400000);
    const when = days === 0 ? L.today : days === 1 ? L.tomorrow : L.inDays(days);
    $("next-up").innerHTML = `
      <div class="label">${L.nextUp} · ${when}</div>
      <h3>${eventTitle(next)}</h3>
      <p>${fmtLong(next.date)} · ${esc(fmtTime(next.time))}</p>
      ${f ? `<p>${where(next)}${f.address ? " · " + esc(f.address) : ""}</p>` : ""}`;
    $("next-up").hidden = false;
  }

  // Announcements
  const anns = [...ANNOUNCEMENTS].sort((a, b) =>
    (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || b.date.localeCompare(a.date));
  $("announcement-list").innerHTML = anns.map((a) => `
    <article class="card announcement">
      <time datetime="${esc(a.date)}">${fmtShort(a.date)}</time>${a.pinned ? `<span class="pin">📌 ${L.pinned}</span>` : ""}
      <h3>${esc(tr(a.title))}</h3>
      <p>${esc(tr(a.body))}</p>
    </article>`).join("") || `<p class="card">${L.noAnnouncements}</p>`;

  // Record
  let w = 0, l = 0, t = 0;
  for (const e of schedule) {
    const r = (e.result || "").trim().toUpperCase();
    if (r.startsWith("W")) w++; else if (r.startsWith("L")) l++; else if (r.startsWith("T")) t++;
  }
  $("record").textContent = w + l + t ? `${L.record}: ${w}–${l}${t ? "–" + t : ""}` : "";

  // Schedule
  $("schedule-list").innerHTML = schedule.map((e) => {
    const d = parseDate(e.date);
    const past = d < today;
    const r = (e.result || "").trim();
    const rc = /^w/i.test(r) ? "w" : /^l/i.test(r) ? "l" : "";
    return `
    <div class="card event${past ? " past" : ""}">
      <div class="date">
        <span class="m">${d.toLocaleDateString(L.locale, { month: "short" }).replace(".", "")}</span>
        <span class="d">${d.getDate()}</span>
      </div>
      <div class="info">
        <div class="title">${eventTitle(e)}<span class="tag">${eventTag(e)}</span></div>
        <div class="meta">${d.toLocaleDateString(L.locale, { weekday: "short" })} · ${esc(fmtTime(e.time))}${e.field ? " · " + where(e) : ""}</div>
      </div>
      ${r ? `<div class="result ${rc}">${esc(r)}</div>` : ""}
    </div>`;
  }).join("");

  // Fields
  $("field-list").innerHTML = Object.values(FIELDS).map((f) => `
    <div class="card field">
      <h3>${esc(tr(f.name))}</h3>
      ${f.address ? `<p>${esc(f.address)}</p>` : ""}
      ${f.notes ? `<p>${esc(tr(f.notes))}</p>` : ""}
      ${f.address ? `<a class="btn" href="${mapUrl(f.address)}" target="_blank" rel="noopener">${L.directions} ↗</a>` : ""}
    </div>`).join("");

  // Field maps
  $("map-list").innerHTML = (typeof MAPS === "undefined" ? [] : MAPS).map((m) => `
    <figure class="card map">
      <h3>${esc(tr(m.title))}</h3>
      <a href="${esc(m.image)}" target="_blank" rel="noopener">
        <img src="${esc(m.image)}" alt="${esc(tr(m.title))} — ${L.fieldMap}" loading="lazy">
      </a>
      ${m.caption ? `<figcaption>${esc(tr(m.caption))} ${L.tapToEnlarge}</figcaption>` : ""}
    </figure>`).join("");
}

$("lang-toggle").addEventListener("click", () => {
  lang = lang === "es" ? "en" : "es";
  try { localStorage.setItem("lang", lang); } catch {}
  const url = new URL(location.href);
  url.searchParams.set("lang", lang);
  history.replaceState(null, "", url);
  render();
});

render();
