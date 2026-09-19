import type { Fact, Region, Season, Theme } from "./types";

export const regions: Region[] = [
  {
    id: "bavaria",
    name: { en: "Bavaria", de: "Bayern" },
    blurb: {
      en: "Alpine lakes, royal castles and walled towns in Germany's largest state.",
      de: "Alpenseen, Königsschlösser und Mauerstädte im größten Bundesland.",
    },
    coords: [48.7904, 11.4979],
  },
  {
    id: "baden-wuerttemberg",
    name: { en: "Baden-Württemberg", de: "Baden-Württemberg" },
    blurb: {
      en: "Deep forest, a warm lake shared with two countries, and a ruined castle above the Neckar.",
      de: "Tiefer Wald, ein warmer See mit zwei Nachbarländern und eine Schlossruine über dem Neckar.",
    },
    coords: [48.6616, 9.3501],
  },
  {
    id: "rhineland-palatinate",
    name: { en: "Rhineland-Palatinate", de: "Rheinland-Pfalz" },
    blurb: {
      en: "Two river valleys, forty castles and the steepest vineyards in Europe.",
      de: "Zwei Flusstäler, vierzig Burgen und Europas steilste Weinberge.",
    },
    coords: [49.9129, 7.45],
  },
  {
    id: "north-rhine-westphalia",
    name: { en: "North Rhine-Westphalia", de: "Nordrhein-Westfalen" },
    blurb: {
      en: "Germany's most populous state, anchored by a cathedral that took six centuries.",
      de: "Das bevölkerungsreichste Bundesland, verankert an einem Dom mit sechs Jahrhunderten Bauzeit.",
    },
    coords: [51.4332, 7.6616],
  },
  {
    id: "berlin-brandenburg",
    name: { en: "Berlin & Brandenburg", de: "Berlin & Brandenburg" },
    blurb: {
      en: "A capital that argues with itself, ringed by lakes and pine forest.",
      de: "Eine Hauptstadt im Selbstgespräch, umgeben von Seen und Kiefernwald.",
    },
    coords: [52.4, 13.2],
  },
  {
    id: "hamburg-north",
    name: { en: "Hamburg & the North", de: "Hamburg & der Norden" },
    blurb: {
      en: "Brick warehouses, tidal water and more bridges than Venice.",
      de: "Backsteinspeicher, Tidewasser und mehr Brücken als Venedig.",
    },
    coords: [53.5511, 9.9937],
  },
  {
    id: "saxony",
    name: { en: "Saxony", de: "Sachsen" },
    blurb: {
      en: "Baroque Dresden and a sandstone wilderness half an hour upstream.",
      de: "Barockes Dresden und eine Sandsteinwildnis eine halbe Stunde flussaufwärts.",
    },
    coords: [51.1045, 13.2017],
  },
  {
    id: "mecklenburg",
    name: {
      en: "Mecklenburg-Western Pomerania",
      de: "Mecklenburg-Vorpommern",
    },
    blurb: {
      en: "Chalk cliffs, old-growth beech and the cold clear Baltic.",
      de: "Kreidefelsen, alter Buchenwald und die kalte klare Ostsee.",
    },
    coords: [53.9, 12.7],
  },
  {
    id: "harz-lower-saxony",
    name: { en: "Harz & Lower Saxony", de: "Harz & Niedersachsen" },
    blurb: {
      en: "Fog, witches and steam trains on northern Germany's only real mountains.",
      de: "Nebel, Hexen und Dampfzüge auf Norddeutschlands einzigem echten Gebirge.",
    },
    coords: [51.8, 10.6],
  },
];

export const themes: Theme[] = [
  {
    id: "castles",
    name: { en: "Castles & Fairytales", de: "Burgen & Märchen" },
    blurb: {
      en: "Turrets above gorges, ruins left unrestored on purpose.",
      de: "Türme über Schluchten, absichtlich unrestaurierte Ruinen.",
    },
    cover: "neuschwanstein",
  },
  {
    id: "alps",
    name: { en: "Alps & Lakes", de: "Alpen & Seen" },
    blurb: {
      en: "Vertical rock, electric boats and water the colour of bottle glass.",
      de: "Senkrechter Fels, Elektroboote und Wasser in Flaschengrün.",
    },
    cover: "koenigssee",
  },
  {
    id: "forests",
    name: { en: "Forests & Nature", de: "Wälder & Natur" },
    blurb: {
      en: "Spruce plateaus, sandstone towers and mist that stays until noon.",
      de: "Fichtenhochland, Sandsteintürme und Nebel bis in den Mittag.",
    },
    cover: "black-forest",
  },
  {
    id: "cities",
    name: { en: "Historic Cities", de: "Historische Städte" },
    blurb: {
      en: "Baroque skylines, brick harbours and squares that survived the century.",
      de: "Barocke Silhouetten, Backsteinhäfen und Plätze, die das Jahrhundert überstanden.",
    },
    cover: "dresden",
  },
  {
    id: "coasts",
    name: { en: "Coasts & Islands", de: "Küsten & Inseln" },
    blurb: {
      en: "White cliffs, wicker beach chairs and long northern light.",
      de: "Weiße Felsen, Strandkörbe und langes nordisches Licht.",
    },
    cover: "ruegen",
  },
  {
    id: "wine",
    name: { en: "Wine & Villages", de: "Wein & Dörfer" },
    blurb: {
      en: "Slate terraces, crooked market squares and Riesling at the source.",
      de: "Schieferterrassen, schiefe Marktplätze und Riesling an der Quelle.",
    },
    cover: "moselle",
  },
];

export const seasons: Season[] = [
  {
    id: "spring",
    name: { en: "Spring", de: "Frühling" },
    months: { en: "March – May", de: "März – Mai" },
    blurb: {
      en: "Anemones on the forest floor before the canopy closes, wisteria on half-timbered walls, and castle terraces you can have almost to yourself.",
      de: "Buschwindröschen auf dem Waldboden, bevor sich das Kronendach schließt, Blauregen an Fachwerkwänden und Schlossterrassen fast für sich allein.",
    },
    cover: "heidelberg",
    accent: ["#6f8f4e", "#9fc178"],
  },
  {
    id: "summer",
    name: { en: "Summer", de: "Sommer" },
    months: { en: "June – August", de: "Juni – August" },
    blurb: {
      en: "Light until ten at night, swimming in Alpine lakes, harbour ferries, and every village square set with tables.",
      de: "Licht bis zehn Uhr abends, Baden in Alpenseen, Hafenfähren und jeder Dorfplatz voller Tische.",
    },
    cover: "lake-constance",
    accent: ["#2f7d86", "#69bcc4"],
  },
  {
    id: "autumn",
    name: { en: "Autumn", de: "Herbst" },
    months: { en: "September – November", de: "September – November" },
    blurb: {
      en: "Harvest in the vineyards, copper beeches against black firs, and inversion fog filling the valleys until mid-morning.",
      de: "Lese in den Weinbergen, kupferne Buchen vor schwarzen Tannen und Inversionsnebel in den Tälern bis zum späten Vormittag.",
    },
    cover: "moselle",
    accent: ["#a7681a", "#e0a13f"],
  },
  {
    id: "winter",
    name: { en: "Winter", de: "Winter" },
    months: { en: "December – February", de: "Dezember – Februar" },
    blurb: {
      en: "Christmas markets in walled towns, rime ice on the spruce, steam trains, and castles standing in snow with nobody else there.",
      de: "Weihnachtsmärkte in Mauerstädten, Raureif auf Fichten, Dampfzüge und Schlösser im Schnee, ganz ohne andere Menschen.",
    },
    cover: "rothenburg",
    accent: ["#3f5d7a", "#8fb0cc"],
  },
];

export const facts: Fact[] = [
  {
    id: "castles",
    value: { en: "25,000+", de: "über 25.000" },
    label: {
      en: "castles and palaces, more than any other country in Europe",
      de: "Burgen und Schlösser — mehr als in jedem anderen Land Europas",
    },
  },
  {
    id: "forest",
    value: { en: "One third", de: "Ein Drittel" },
    label: {
      en: "of Germany is covered in forest — around 11 million hectares",
      de: "Deutschlands ist bewaldet — rund 11 Millionen Hektar",
    },
  },
  {
    id: "unesco",
    value: { en: "54", de: "54" },
    label: {
      en: "UNESCO World Heritage Sites, from Roman gates to Bauhaus housing",
      de: "UNESCO-Welterbestätten, von römischen Toren bis zu Bauhaussiedlungen",
    },
  },
  {
    id: "bread",
    value: { en: "3,200", de: "3.200" },
    label: {
      en: "registered bread varieties — an intangible cultural heritage of its own",
      de: "registrierte Brotsorten — ein eigenes immaterielles Kulturerbe",
    },
  },
  {
    id: "rail",
    value: { en: "33,000 km", de: "33.000 km" },
    label: {
      en: "of railway, enough to reach nearly every village in this guide",
      de: "Schienennetz — genug, um fast jeden Ort in diesem Führer zu erreichen",
    },
  },
];

export const regionById = new Map(regions.map((r) => [r.id, r]));
export const themeById = new Map(themes.map((t) => [t.id, t]));
export const seasonById = new Map(seasons.map((s) => [s.id, s]));
