// Renders the page from data.js. You shouldn't need to edit this file.

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const parseDate = (d) => new Date(d + "T00:00:00");
const fmtLong = (d) => parseDate(d).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
const fmtShort = (d) => parseDate(d).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
const fmtTime = (t) => {
  if (!/^\d{1,2}:\d{2}$/.test(t)) return t || "TBD";
  const [h, m] = t.split(":").map(Number);
  return new Date(2000, 0, 1, h, m).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
};
const mapUrl = (addr) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(addr);

const today = new Date();
today.setHours(0, 0, 0, 0);

// Header, colors, footer
document.title = TEAM.name;
$("team-name").textContent = TEAM.name;
$("team-league").textContent = TEAM.league;
$("team-contact").textContent = TEAM.contact || "";
if (TEAM.colors) {
  document.documentElement.style.setProperty("--primary", TEAM.colors.primary);
  document.documentElement.style.setProperty("--accent", TEAM.colors.accent);
}

const eventTitle = (e) =>
  e.type === "practice" ? "Practice"
  : e.type === "event" ? esc(e.title)
  : `${e.home === false ? "@" : "vs"} ${esc(e.opponent)}`;
const eventTag = (e) =>
  e.type === "practice" ? "Practice" : e.type === "event" ? "Event"
  : e.home === true ? "Home" : e.home === false ? "Away" : "Game";
const fieldLink = (key) => {
  const f = FIELDS[key];
  if (!f) return "";
  return f.address ? `<a href="${mapUrl(f.address)}" target="_blank" rel="noopener">${esc(f.name)}</a>` : esc(f.name);
};
const where = (e) => fieldLink(e.field) + (e.spot ? ` – ${esc(e.spot)}` : "");

// Next up
const schedule = [...SCHEDULE].sort((a, b) => a.date.localeCompare(b.date));
const next = schedule.find((e) => parseDate(e.date) >= today);
if (next) {
  const f = FIELDS[next.field];
  const days = Math.round((parseDate(next.date) - today) / 86400000);
  const when = days === 0 ? "Today" : days === 1 ? "Tomorrow" : `In ${days} days`;
  $("next-up").innerHTML = `
    <div class="label">Next up · ${when}</div>
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
    <time datetime="${esc(a.date)}">${fmtShort(a.date)}</time>${a.pinned ? '<span class="pin">📌 Pinned</span>' : ""}
    <h3>${esc(a.title)}</h3>
    <p>${esc(a.body)}</p>
  </article>`).join("") || `<p class="card">No announcements right now.</p>`;

// Record
let w = 0, l = 0, t = 0;
for (const e of schedule) {
  const r = (e.result || "").trim().toUpperCase();
  if (r.startsWith("W")) w++; else if (r.startsWith("L")) l++; else if (r.startsWith("T")) t++;
}
$("record").textContent = w + l + t ? `Record: ${w}–${l}${t ? "–" + t : ""}` : "";

// Schedule
$("schedule-list").innerHTML = schedule.map((e) => {
  const d = parseDate(e.date);
  const past = d < today;
  const r = (e.result || "").trim();
  const rc = /^w/i.test(r) ? "w" : /^l/i.test(r) ? "l" : "";
  const tag = eventTag(e);
  return `
  <div class="card event${past ? " past" : ""}">
    <div class="date">
      <span class="m">${d.toLocaleDateString(undefined, { month: "short" })}</span>
      <span class="d">${d.getDate()}</span>
    </div>
    <div class="info">
      <div class="title">${eventTitle(e)}<span class="tag">${tag}</span></div>
      <div class="meta">${d.toLocaleDateString(undefined, { weekday: "short" })} · ${esc(fmtTime(e.time))}${e.field ? " · " + where(e) : ""}</div>
    </div>
    ${r ? `<div class="result ${rc}">${esc(r)}</div>` : ""}
  </div>`;
}).join("");

// Fields
$("field-list").innerHTML = Object.values(FIELDS).map((f) => `
  <div class="card field">
    <h3>${esc(f.name)}</h3>
    ${f.address ? `<p>${esc(f.address)}</p>` : ""}
    ${f.notes ? `<p>${esc(f.notes)}</p>` : ""}
    ${f.address ? `<a class="btn" href="${mapUrl(f.address)}" target="_blank" rel="noopener">Directions ↗</a>` : ""}
  </div>`).join("");

// Field maps
$("map-list").innerHTML = (typeof MAPS === "undefined" ? [] : MAPS).map((m) => `
  <figure class="card map">
    <h3>${esc(m.title)}</h3>
    <a href="${esc(m.image)}" target="_blank" rel="noopener">
      <img src="${esc(m.image)}" alt="${esc(m.title)} field map" loading="lazy">
    </a>
    ${m.caption ? `<figcaption>${esc(m.caption)} Tap to enlarge.</figcaption>` : ""}
  </figure>`).join("");
