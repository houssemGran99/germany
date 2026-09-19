import type { Destination } from "../types";

export const east: Destination[] = [
  {
    slug: "berlin",
    name: {
      en: "Berlin — Brandenburg Gate & Museum Island",
      de: "Berlin — Brandenburger Tor & Museumsinsel",
    },
    tagline: {
      en: "A capital that keeps rewriting itself in public",
      de: "Eine Hauptstadt, die sich öffentlich immer neu schreibt",
    },
    region: "berlin-brandenburg",
    themes: ["cities"],
    bestSeasons: ["summer", "spring"],
    coords: [52.5163, 13.3777],
    featured: true,
    story: {
      en: [
        "No other European capital wears its history this openly. The Brandenburg Gate was a customs barrier, then a Prussian triumphal arch, then the backdrop to Nazi torchlight parades, then a sealed no-man's-land inside the death strip, and since 1989 the place where Berlin celebrates. All of that is legible if you stand there long enough, and the city has made a point of not tidying it away.",
        "A few hundred metres east, five great museums share a sandbank in the Spree. Museum Island holds the Pergamon Altar, the bust of Nefertiti and a Babylonian processional gate reassembled brick by glazed brick, gathered in the nineteenth century with an acquisitive confidence that the institutions themselves now examine in public.",
        "But the city's real texture is elsewhere: in Kreuzberg courtyards, in the Tiergarten on a Sunday, in the double line of cobbles that traces the Wall across streets and squares, in a Späti at two in the morning. Berlin is not beautiful in the way Heidelberg is beautiful. It is something better — unfinished, argumentative and completely alive.",
      ],
      de: [
        "Keine andere europäische Hauptstadt trägt ihre Geschichte so offen. Das Brandenburger Tor war Zollschranke, dann preußischer Triumphbogen, dann Kulisse für Fackelzüge der Nationalsozialisten, dann abgeriegeltes Niemandsland im Todesstreifen — und seit 1989 der Ort, an dem Berlin feiert. All das ist lesbar, wenn man lange genug davorsteht, und die Stadt hat bewusst darauf verzichtet, es wegzuräumen.",
        "Wenige hundert Meter östlich teilen sich fünf große Museen eine Sandbank in der Spree. Die Museumsinsel beherbergt den Pergamonaltar, die Büste der Nofretete und ein babylonisches Prozessionstor, Ziegel für glasierten Ziegel wieder zusammengesetzt — im 19. Jahrhundert mit einem Erwerbsstolz zusammengetragen, den die Häuser heute selbst öffentlich untersuchen.",
        "Die eigentliche Textur der Stadt liegt aber anderswo: in Kreuzberger Hinterhöfen, im Tiergarten an einem Sonntag, in der doppelten Pflasterlinie, die den Mauerverlauf über Straßen und Plätze zieht, in einem Späti um zwei Uhr nachts. Berlin ist nicht schön, wie Heidelberg schön ist. Es ist etwas Besseres — unfertig, streitbar und vollkommen lebendig.",
      ],
    },
    highlights: {
      en: [
        "Brandenburg Gate and the Reichstag glass dome",
        "Museum Island: Pergamon, Neues Museum, Alte Nationalgalerie",
        "East Side Gallery and the Wall memorial at Bernauer Straße",
        "Sunday at the Tiergarten or Tempelhofer Feld",
      ],
      de: [
        "Brandenburger Tor und die Reichstagskuppel",
        "Museumsinsel: Pergamon, Neues Museum, Alte Nationalgalerie",
        "East Side Gallery und die Mauergedenkstätte Bernauer Straße",
        "Sonntag im Tiergarten oder auf dem Tempelhofer Feld",
      ],
    },
    gettingThere: {
      en: "BER airport connects to the centre in 30 minutes by regional train. ICE services reach Hamburg in 1h45 and Munich in under four hours.",
      de: "Der Flughafen BER ist mit dem Regionalexpress in 30 Minuten mit dem Zentrum verbunden. ICE-Verbindungen erreichen Hamburg in 1:45 und München in unter vier Stunden.",
    },
    nearby: ["dresden", "harz"],
    photos: ["berlin-hero", "berlin-2", "berlin-3"],
  },
  {
    slug: "dresden",
    name: { en: "Dresden", de: "Dresden" },
    tagline: {
      en: "A baroque skyline rebuilt stone by numbered stone",
      de: "Eine barocke Silhouette, Stein für nummerierten Stein",
    },
    region: "saxony",
    themes: ["cities"],
    bestSeasons: ["spring", "winter"],
    coords: [51.0533, 13.7383],
    featured: true,
    story: {
      en: [
        "Canaletto painted Dresden from the far bank of the Elbe in the 1740s, and the view he recorded — domes, spires, sandstone turned honey-coloured by low sun — is the view you get today. That continuity is not an accident of survival. It is the result of a rebuilding effort that lasted longer than most people's working lives.",
        "The Frauenkirche was left as a mound of rubble for forty-five years, first as a war memorial and then simply because the GDR had other priorities. Reconstruction began in 1994; archaeologists catalogued and numbered more than 8,000 original stones from the heap, and those darkened blocks are set back into the pale new sandstone exactly where they stood. The façade reads like a map of what was lost and what was kept.",
        "Around it the Zwinger, the Semper Opera and the Residenzschloss hold collections assembled by Saxon electors with more taste than restraint — the Green Vault alone contains a treasury of jewelled miniatures that has no parallel in Europe. Walk the Brühl Terrace at dusk, when the river goes silver and the whole ensemble lights up, and the word 'rebuilt' stops feeling like a qualifier.",
      ],
      de: [
        "Canaletto malte Dresden in den 1740er Jahren vom anderen Elbufer, und die Ansicht, die er festhielt — Kuppeln, Türme, vom tiefen Licht honigfarbener Sandstein — ist die Ansicht von heute. Diese Kontinuität ist kein Zufall des Überlebens. Sie ist das Ergebnis eines Wiederaufbaus, der länger dauerte als die meisten Berufsleben.",
        "Die Frauenkirche blieb fünfundvierzig Jahre ein Trümmerberg, zuerst als Mahnmal, dann schlicht, weil die DDR andere Prioritäten hatte. 1994 begann der Wiederaufbau; Archäologen katalogisierten und nummerierten über 8.000 Originalsteine aus dem Haufen, und diese dunklen Blöcke sitzen heute exakt dort im hellen neuen Sandstein, wo sie einst standen. Die Fassade liest sich wie eine Karte des Verlorenen und des Bewahrten.",
        "Ringsum halten Zwinger, Semperoper und Residenzschloss Sammlungen, die sächsische Kurfürsten mit mehr Geschmack als Zurückhaltung zusammentrugen — allein das Grüne Gewölbe birgt einen Schatz an juwelenbesetzten Miniaturen ohne Vergleich in Europa. Wer in der Dämmerung über die Brühlsche Terrasse geht, wenn der Fluss silbern wird und das Ensemble aufleuchtet, für den verliert das Wort „wiederaufgebaut“ seine Einschränkung.",
      ],
    },
    highlights: {
      en: [
        "Frauenkirche and its dome viewing gallery",
        "The Green Vault treasury in the Residenzschloss",
        "Zwinger courtyard and the Old Masters gallery",
        "Brühl Terrace above the Elbe at sunset",
      ],
      de: [
        "Frauenkirche und die Aussichtsplattform der Kuppel",
        "Das Grüne Gewölbe im Residenzschloss",
        "Zwingerhof und die Gemäldegalerie Alte Meister",
        "Brühlsche Terrasse über der Elbe bei Sonnenuntergang",
      ],
    },
    gettingThere: {
      en: "Two hours by ICE from Berlin, just over an hour from Leipzig. The old town is a 15-minute walk or one tram stop from the main station.",
      de: "Zwei Stunden mit dem ICE ab Berlin, gut eine Stunde ab Leipzig. Die Altstadt liegt 15 Gehminuten oder eine Straßenbahnstation vom Hauptbahnhof entfernt.",
    },
    nearby: ["saxon-switzerland", "berlin"],
    photos: ["dresden-hero", "dresden-2", "dresden-3"],
  },
  {
    slug: "saxon-switzerland",
    name: {
      en: "Saxon Switzerland & the Bastei",
      de: "Sächsische Schweiz & die Bastei",
    },
    tagline: {
      en: "Sandstone towers in the mist, half an hour from Dresden",
      de: "Sandsteintürme im Nebel, eine halbe Stunde von Dresden",
    },
    region: "saxony",
    themes: ["forests", "castles"],
    bestSeasons: ["autumn", "spring"],
    coords: [50.9614, 14.0733],
    featured: true,
    story: {
      en: [
        "A hundred million years ago this was a shallow sea. What it left behind is a plateau of soft sandstone that water and frost have been carving ever since into free-standing towers, gorges and mesas — a landscape so unlike the rest of central Europe that eighteenth-century Swiss painters named it after home.",
        "The Bastei is its centrepiece: a wall of pinnacles standing 194 metres above the Elbe, linked since 1851 by a slim sandstone bridge that steps from rock to rock across the void. Get there before eight on an autumn morning and you may find the classic condition — the valley filled with cloud, the towers standing out of it like islands, the sun arriving edge-on over the Czech border.",
        "Beyond the viewpoint the park is quieter than its reputation suggests. Over 1,100 kilometres of marked trails run through ravines where ladders are bolted into the rock, past the ruins of a rock castle, and out onto tabletop summits where the wind smells of pine and warm stone. Climbers have their own century-old ethic here: no chalk, no metal protection, just knotted slings and bare hands.",
      ],
      de: [
        "Vor hundert Millionen Jahren war dies ein flaches Meer. Zurück blieb ein Plateau aus weichem Sandstein, das Wasser und Frost seither zu freistehenden Türmen, Schluchten und Tafelbergen ausgearbeitet haben — eine Landschaft, so unähnlich dem übrigen Mitteleuropa, dass Schweizer Maler des 18. Jahrhunderts sie nach ihrer Heimat benannten.",
        "Die Bastei ist ihr Herzstück: eine Felsnadelwand, 194 Meter über der Elbe, seit 1851 durch eine schmale Sandsteinbrücke verbunden, die von Fels zu Fels über die Leere setzt. Wer an einem Herbstmorgen vor acht Uhr dort ist, trifft womöglich den klassischen Zustand — das Tal voller Wolken, die Türme wie Inseln darüber, die Sonne flach über der tschechischen Grenze.",
        "Jenseits des Aussichtspunkts ist der Park stiller, als sein Ruf vermuten lässt. Über 1.100 Kilometer markierte Wege führen durch Schluchten mit in den Fels geschlagenen Leitern, vorbei an den Resten einer Felsenburg und hinauf auf Tafelgipfel, wo der Wind nach Kiefern und warmem Stein riecht. Kletterer haben hier ihre eigene, hundertjährige Ethik: kein Magnesia, keine Metallsicherung, nur Knotenschlingen und bloße Hände.",
      ],
    },
    highlights: {
      en: [
        "The Bastei bridge above the Elbe bend",
        "Königstein fortress on its tabletop rock",
        "Schrammsteine ridge walk and the Affensteine",
        "Autumn inversion fog from a pre-dawn start",
      ],
      de: [
        "Die Basteibrücke über der Elbschleife",
        "Festung Königstein auf ihrem Tafelfelsen",
        "Gratweg über die Schrammsteine und Affensteine",
        "Herbstliche Inversionsnebel bei Aufbruch vor Sonnenaufgang",
      ],
    },
    gettingThere: {
      en: "S-Bahn line S1 from Dresden to Rathen (40 minutes), then the ferry across the Elbe and a 20-minute climb. No car needed at all.",
      de: "S-Bahn-Linie S1 von Dresden nach Rathen (40 Minuten), dann die Fähre über die Elbe und ein 20-minütiger Aufstieg. Ein Auto ist völlig überflüssig.",
    },
    nearby: ["dresden", "harz"],
    photos: ["saxon-switzerland-hero", "saxon-switzerland-2", "saxon-switzerland-3"],
  },
];
