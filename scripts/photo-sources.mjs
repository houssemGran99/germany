/**
 * Photo manifest.
 *
 * Each entry maps a photo id (referenced from `src/data/destinations/*.ts`)
 * to an English Wikipedia article; the script pulls that article's lead image
 * from Wikimedia Commons together with its author and licence, then downloads
 * and optimises it into `public/images/destinations/`.
 *
 * To add a photo: add an id here, run `npm run images`, and reference the id
 * from a destination's `photos` array.
 */
export const photoSources = [
  // --- Bavaria ---------------------------------------------------------
  { id: "neuschwanstein-hero", article: "Neuschwanstein Castle" },
  { id: "neuschwanstein-2", article: "Hohenschwangau Castle" },
  { id: "neuschwanstein-3", article: "Alpsee" },

  { id: "koenigssee-hero", article: "Berchtesgaden National Park" },
  { id: "koenigssee-2", article: "St. Bartholomew's Church, Berchtesgaden" },
  { id: "koenigssee-3", article: "Königssee" },

  { id: "rothenburg-hero", article: "Rothenburg ob der Tauber" },
  { id: "rothenburg-2", article: "Nördlingen" },
  { id: "rothenburg-3", article: "Dinkelsbühl" },

  { id: "bamberg-hero", article: "Bamberg" },
  { id: "bamberg-2", article: "Bamberg Cathedral" },
  { id: "bamberg-3", article: "Michaelsberg Abbey, Bamberg" },

  // --- Southwest -------------------------------------------------------
  { id: "black-forest-hero", article: "Black Forest" },
  { id: "black-forest-2", article: "Titisee" },
  { id: "black-forest-3", article: "Triberg Waterfalls" },

  { id: "heidelberg-hero", article: "Heidelberg Castle" },
  { id: "heidelberg-2", article: "Heidelberg" },
  { id: "heidelberg-3", article: "Old Bridge (Heidelberg)" },

  { id: "lake-constance-hero", article: "Überlingen" },
  { id: "lake-constance-2", article: "Mainau" },
  { id: "lake-constance-3", article: "Lindau" },

  // --- West ------------------------------------------------------------
  { id: "rhine-valley-hero", article: "Rhine Gorge" },
  { id: "rhine-valley-2", article: "Lorelei" },
  { id: "rhine-valley-3", article: "Pfalzgrafenstein Castle" },

  { id: "moselle-hero", article: "Moselle" },
  { id: "moselle-2", article: "Bernkastel-Kues" },
  { id: "moselle-3", article: "Eltz Castle" },

  { id: "cologne-hero", article: "Cologne" },
  { id: "cologne-2", article: "Hohenzollern Bridge" },
  { id: "cologne-3", article: "Cologne Cathedral" },

  // --- East ------------------------------------------------------------
  { id: "berlin-hero", article: "Brandenburg Gate" },
  { id: "berlin-2", article: "Museum Island" },
  { id: "berlin-3", article: "Berlin" },

  { id: "dresden-hero", article: "Dresden" },
  { id: "dresden-2", article: "Semperoper" },
  { id: "dresden-3", article: "Dresden Frauenkirche" },

  { id: "saxon-switzerland-hero", article: "Bastei" },
  { id: "saxon-switzerland-2", article: "Saxon Switzerland" },
  { id: "saxon-switzerland-3", article: "Königstein Fortress" },

  // --- North -----------------------------------------------------------
  { id: "hamburg-hero", article: "Speicherstadt" },
  { id: "hamburg-2", article: "Elbphilharmonie" },
  { id: "hamburg-3", article: "Hamburg" },

  { id: "ruegen-hero", article: "Jasmund National Park" },
  { id: "ruegen-2", article: "Sellin" },
  { id: "ruegen-3", article: "Binz" },

  { id: "harz-hero", article: "Wernigerode Castle" },
  { id: "harz-2", article: "Quedlinburg" },
  { id: "harz-3", article: "Brocken" },
];
