// =====================================================================
//  TEAM PAGE CONTENT — edit this file to update the site.
//  Everything on the page comes from here. Save, commit, push, done.
// =====================================================================

const TEAM = {
  name: "Chiefs",
  league: "Flag Football 2026 · Ages 6–8 · Team 1",
  // Primary + accent colors (any CSS color)
  colors: { primary: "#c8102e", accent: "#ffb81c" },
  contact: "", // optional footer line, e.g. "Questions? Text Coach at ..."
};

// Newest first. Set pinned: true to keep one at the top.
const ANNOUNCEMENTS = [
  {
    date: "2026-11-02",
    title: "Picture day — Thursday, November 19",
    body: "Time TBD. We'll post the time here once it's set.",
    pinned: true,
  },
];

// One entry per park. Field keys are referenced by the schedule below.
// Add the street address to enable the Directions button.
const FIELDS = {
  sportspark: {
    name: "Sports Park NP",
    address: "",
    notes: "Wednesday practices on Field 4. 6:00 PM games on the New Fields.",
  },
  citizens: {
    name: "Citizens Park",
    address: "",
    notes: "Saturday 10:00 AM games (Fields 2 and 4).",
  },
};

// Field maps shown under Field Locations. Put images in the images/ folder.
const MAPS = [
  {
    title: "Sports Park — New Side",
    image: "images/sports-park-map.jpg",
    caption: "Fields 1–4. Wednesday practices are on Field 4 (bottom left).",
  },
];

// type: "game", "practice", or "event" (events use title instead of opponent).
// spot: which field within the park (optional). field is optional for events.
// home: true/false is optional — leave it out to just show "vs".
// Add result like "W 28–14" or "L 7–21" once a game is played.
const SCHEDULE = [
  // Games — Team 1 (Chiefs)
  { date: "2026-11-18", time: "18:00", type: "game", opponent: "Bears", field: "sportspark", spot: "New Fields – Soccer West" },
  { date: "2026-11-21", time: "10:00", type: "game", opponent: "Bills", field: "citizens", spot: "Field 2" },
  { date: "2026-12-05", time: "10:00", type: "game", opponent: "Raiders", field: "citizens", spot: "Field 2" },
  { date: "2026-12-09", time: "18:00", type: "game", opponent: "Bears", field: "sportspark", spot: "New Fields – Football Middle/West" },
  { date: "2026-12-12", time: "10:00", type: "game", opponent: "Bills", field: "citizens", spot: "Field 4" },
  { date: "2026-12-19", time: "10:00", type: "game", opponent: "Raiders", field: "citizens", spot: "Field 4" },

  // Team events
  { date: "2026-11-19", time: "TBD", type: "event", title: "Picture Day" },

  // Practices — Wednesdays at 6:00 PM, Sports Park Field 4
  // (Nov 18 and Dec 9 dropped — games those nights)
  { date: "2026-11-11", time: "18:00", type: "practice", field: "sportspark", spot: "Field 4" },
  { date: "2026-11-25", time: "18:00", type: "practice", field: "sportspark", spot: "Field 4" },
  { date: "2026-12-02", time: "18:00", type: "practice", field: "sportspark", spot: "Field 4" },
  { date: "2026-12-16", time: "18:00", type: "practice", field: "sportspark", spot: "Field 4" },
];

// Spanish versions of the text above, used by the "Español" button.
// Left side must match the English text exactly. Anything not listed stays in English.
const SPANISH = {
  "Flag Football 2026 · Ages 6–8 · Team 1": "Flag Football 2026 · 6 a 8 años · Equipo 1",
  "Picture day — Thursday, November 19": "Día de fotos — jueves 19 de noviembre",
  "Time TBD. We'll post the time here once it's set.": "Hora por confirmar. Publicaremos la hora aquí cuando esté definida.",
  "Wednesday practices on Field 4. 6:00 PM games on the New Fields.": "Prácticas los miércoles en el Campo 4. Partidos de las 6:00 p.m. en los Campos Nuevos.",
  "Saturday 10:00 AM games (Fields 2 and 4).": "Partidos los sábados a las 10:00 a.m. (Campos 2 y 4).",
  "Sports Park — New Side": "Sports Park — Lado Nuevo",
  "Fields 1–4. Wednesday practices are on Field 4 (bottom left).": "Campos 1–4. Las prácticas de los miércoles son en el Campo 4 (abajo a la izquierda).",
  "Picture Day": "Día de fotos",
  "Field 2": "Campo 2",
  "Field 4": "Campo 4",
  "New Fields – Soccer West": "Campos Nuevos – Fútbol Oeste",
  "New Fields – Football Middle/West": "Campos Nuevos – Fútbol Americano Centro/Oeste",
};
