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
    date: "2026-11-18",
    title: "Tonight's game vs. Bears is canceled due to weather",
    body: "Today's 6:00 PM game against the Bears at Sports Park is canceled due to weather. Picture day is still on for tomorrow, Thursday, November 19 at 6:30 PM — please arrive by 6:20 PM. Uniform: Chiefs jersey with black shorts or black sweats.",
    pinned: true,
  },
  {
    date: "2026-11-11",
    title: "Picture day — Thursday, November 19 at 6:30 PM",
    body: "Our team photo is at 6:30 PM in the California Room at the Community Center. Please arrive by 6:20 PM — photos are taken at the scheduled time whether or not everyone is there. Parents must wait outside the room until pictures are over. Bring the correct amount in an envelope; change may not be available. No cleats! Uniform: Chiefs jersey with black shorts or black sweats.",
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
  { date: "2026-11-18", time: "18:00", type: "game", opponent: "Bears", field: "sportspark", spot: "New Fields – Soccer West", result: "Canceled (weather)" },
  { date: "2026-11-21", time: "10:00", type: "game", opponent: "Bills", field: "citizens", spot: "Field 2" },
  { date: "2026-12-05", time: "10:00", type: "game", opponent: "Raiders", field: "citizens", spot: "Field 2" },
  { date: "2026-12-09", time: "18:00", type: "game", opponent: "Bears", field: "sportspark", spot: "New Fields – Football Middle/West" },
  { date: "2026-12-12", time: "10:00", type: "game", opponent: "Bills", field: "citizens", spot: "Field 4" },
  { date: "2026-12-19", time: "10:00", type: "game", opponent: "Raiders", field: "citizens", spot: "Field 4" },

  // Team events
  { date: "2026-11-19", time: "18:30", type: "event", title: "Picture Day – Community Center, California Room (arrive 6:20 PM) · Wear Chiefs jersey + black shorts or black sweats" },

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
  "Tonight's game vs. Bears is canceled due to weather": "El partido de esta noche contra los Bears se canceló por el clima",
  "Today's 6:00 PM game against the Bears at Sports Park is canceled due to weather. Picture day is still on for tomorrow, Thursday, November 19 at 6:30 PM — please arrive by 6:20 PM. Uniform: Chiefs jersey with black shorts or black sweats.": "El partido de hoy a las 6:00 p.m. contra los Bears en Sports Park se canceló por el clima. El día de fotos sigue siendo mañana, jueves 19 de noviembre a las 6:30 p.m. — por favor lleguen a las 6:20 p.m. Uniforme: camiseta de los Chiefs con shorts negros o pants deportivos negros.",
  "Canceled (weather)": "Cancelado (clima)",
  "Flag Football 2026 · Ages 6–8 · Team 1": "Flag Football 2026 · 6 a 8 años · Equipo 1",
  "Picture day — Thursday, November 19 at 6:30 PM": "Día de fotos — jueves 19 de noviembre a las 6:30 p.m.",
  "Our team photo is at 6:30 PM in the California Room at the Community Center. Please arrive by 6:20 PM — photos are taken at the scheduled time whether or not everyone is there. Parents must wait outside the room until pictures are over. Bring the correct amount in an envelope; change may not be available. No cleats! Uniform: Chiefs jersey with black shorts or black sweats.": "Nuestra foto de equipo es a las 6:30 p.m. en el California Room del Centro Comunitario. Por favor lleguen a las 6:20 p.m. — las fotos se toman a la hora programada aunque no estén todos. Los padres deben esperar afuera del salón hasta que terminen las fotos. Traigan la cantidad exacta en un sobre; es posible que no haya cambio. ¡No se permiten tacos (cleats)! Uniforme: camiseta de los Chiefs con shorts negros o pants deportivos negros.",
  "Wednesday practices on Field 4. 6:00 PM games on the New Fields.": "Prácticas los miércoles en el Campo 4. Partidos de las 6:00 p.m. en los Campos Nuevos.",
  "Saturday 10:00 AM games (Fields 2 and 4).": "Partidos los sábados a las 10:00 a.m. (Campos 2 y 4).",
  "Sports Park — New Side": "Sports Park — Lado Nuevo",
  "Fields 1–4. Wednesday practices are on Field 4 (bottom left).": "Campos 1–4. Las prácticas de los miércoles son en el Campo 4 (abajo a la izquierda).",
  "Picture Day – Community Center, California Room (arrive 6:20 PM) · Wear Chiefs jersey + black shorts or black sweats": "Día de fotos – Centro Comunitario, California Room (llegar a las 6:20 p.m.) · Usar camiseta de los Chiefs + shorts negros o pants deportivos negros",
  "Field 2": "Campo 2",
  "Field 4": "Campo 4",
  "New Fields – Soccer West": "Campos Nuevos – Fútbol Oeste",
  "New Fields – Football Middle/West": "Campos Nuevos – Fútbol Americano Centro/Oeste",
};
