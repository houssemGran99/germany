import type { Destination } from "../types";

export const north: Destination[] = [
  {
    slug: "hamburg",
    name: {
      en: "Hamburg — Speicherstadt & Elbphilharmonie",
      de: "Hamburg — Speicherstadt & Elbphilharmonie",
    },
    tagline: {
      en: "Brick warehouses, tidal water and a glass wave",
      de: "Backsteinspeicher, Tidewasser und eine gläserne Welle",
    },
    region: "hamburg-north",
    themes: ["cities", "coasts"],
    bestSeasons: ["summer", "autumn"],
    coords: [53.5413, 9.9841],
    featured: true,
    story: {
      en: [
        "Hamburg has more bridges than Venice, Amsterdam and London combined, and a harbour that has been the city's entire argument for eight hundred years. The Speicherstadt is the purest expression of it: the largest warehouse district in the world, neo-Gothic brick gables standing on oak piles driven into the marsh, built in the 1880s to store coffee, spices and oriental carpets in bonded, tax-free darkness.",
        "At its western tip the Elbphilharmonie rises out of an old cocoa warehouse — a glass wave of 1,100 individually curved panels set on top of the original brick like a ship's superstructure. The public Plaza at 37 metres is free to enter and runs right around the building, which means anyone can stand where the city meets the river and watch container ships come up on the tide.",
        "The rest of Hamburg is quieter than its port suggests. The Alster lakes sit in the middle of town with sailing dinghies on them; Sunday begins at five in the morning at the Fischmarkt, where the auctioneers still shout and a brass band plays in a hall built in 1896; and the Elbe beaches at Övelgönne offer the strange northern pleasure of sitting on sand with a coffee while 400-metre freighters slide past.",
      ],
      de: [
        "Hamburg hat mehr Brücken als Venedig, Amsterdam und London zusammen — und einen Hafen, der seit achthundert Jahren das gesamte Argument der Stadt ist. Die Speicherstadt ist dessen reinster Ausdruck: der größte Lagerhauskomplex der Welt, neugotische Backsteingiebel auf Eichenpfählen im Marschboden, in den 1880er Jahren gebaut, um Kaffee, Gewürze und Orientteppiche in zollfreier Dunkelheit zu lagern.",
        "An ihrer Westspitze erhebt sich die Elbphilharmonie aus einem alten Kakaospeicher — eine gläserne Welle aus 1.100 einzeln gebogenen Elementen, dem Backstein aufgesetzt wie der Aufbau eines Schiffs. Die öffentliche Plaza auf 37 Metern ist frei zugänglich und läuft rings um das Gebäude; jeder kann dort stehen, wo die Stadt auf den Fluss trifft, und zusehen, wie Containerschiffe mit der Flut heraufkommen.",
        "Das übrige Hamburg ist stiller, als der Hafen vermuten lässt. Die Alster liegt mitten in der Stadt, mit Segeljollen darauf; der Sonntag beginnt um fünf Uhr früh auf dem Fischmarkt, wo die Auktionatoren noch immer rufen und in einer Halle von 1896 eine Blaskapelle spielt; und die Elbstrände bei Övelgönne bieten das merkwürdig nordische Vergnügen, mit einem Kaffee im Sand zu sitzen, während 400-Meter-Frachter vorbeigleiten.",
      ],
    },
    highlights: {
      en: [
        "The free Elbphilharmonie Plaza at 37 metres",
        "Speicherstadt canals at blue hour",
        "Sunday Fischmarkt from five in the morning",
        "A harbour ferry on line 62 to Övelgönne",
      ],
      de: [
        "Die frei zugängliche Elbphilharmonie-Plaza auf 37 Metern",
        "Die Fleete der Speicherstadt zur blauen Stunde",
        "Sonntags Fischmarkt ab fünf Uhr früh",
        "Hafenfähre Linie 62 nach Övelgönne",
      ],
    },
    gettingThere: {
      en: "Hamburg Hbf is 1h45 from Berlin by ICE and under two hours from Copenhagen. The HVV day ticket covers the harbour ferries, which are public transport, not tourist boats.",
      de: "Hamburg Hbf ist mit dem ICE 1:45 von Berlin und unter zwei Stunden von Kopenhagen entfernt. Die HVV-Tageskarte gilt auch für die Hafenfähren — sie sind öffentlicher Nahverkehr, keine Touristenboote.",
    },
    nearby: ["ruegen", "berlin"],
    photos: ["hamburg-hero", "hamburg-2", "hamburg-3"],
  },
  {
    slug: "ruegen",
    name: { en: "Rügen's Chalk Cliffs", de: "Rügens Kreidefelsen" },
    tagline: {
      en: "White cliffs, ancient beeches and the cold Baltic",
      de: "Weiße Felsen, alte Buchen und die kalte Ostsee",
    },
    region: "mecklenburg",
    themes: ["coasts", "forests"],
    bestSeasons: ["summer", "spring"],
    coords: [54.5714, 13.6533],
    featured: true,
    story: {
      en: [
        "Caspar David Friedrich painted the chalk cliffs of Rügen in 1818 and fixed them permanently in the German imagination: a white gash in a green coast, figures peering over an edge that drops straight into cold blue water. The cliffs are still there, still white, and still falling — a section of the Königsstuhl collapsed into the sea as recently as 2005, which is a useful reminder that this is a living coastline.",
        "Behind them stands something rarer. The beech forest of Jasmund is one of the last unmanaged old-growth stands in Europe and part of a UNESCO site spanning twelve countries. In spring, before the canopy closes, the floor turns entirely to wood anemone; in high summer the light coming through is green and underwater-ish and the wind off the sea never quite reaches the ground.",
        "The rest of the island is gentler: white-painted seaside resorts with wrought-iron verandas, piers reaching out over shallow water, chains of shallow lagoons the locals call Bodden, and long empty beaches where a Strandkorb — the hooded wicker chair invented on this coast for exactly this weather — is not an affectation but a practical necessity.",
      ],
      de: [
        "Caspar David Friedrich malte 1818 die Kreidefelsen von Rügen und schrieb sie damit dauerhaft in die deutsche Vorstellungswelt ein: ein weißer Riss in einer grünen Küste, Figuren, die über eine Kante blicken, die senkrecht ins kalte Blau stürzt. Die Felsen stehen noch, sind noch weiß — und stürzen noch immer: Ein Teil des Königsstuhls rutschte 2005 ins Meer, eine nützliche Erinnerung daran, dass dies eine lebende Küste ist.",
        "Dahinter steht etwas Selteneres. Der Buchenwald von Jasmund gehört zu den letzten unbewirtschafteten Urwaldresten Europas und ist Teil eines UNESCO-Gebiets über zwölf Länder. Im Frühling, bevor sich das Kronendach schließt, wird der Boden vollständig zu Buschwindröschen; im Hochsommer fällt das Licht grün und unterwasserhaft ein, und der Wind von der See erreicht den Boden nie ganz.",
        "Der Rest der Insel ist sanfter: weiß getünchte Seebäder mit schmiedeeisernen Veranden, Seebrücken über flachem Wasser, Ketten seichter Lagunen, die man hier Bodden nennt, und lange leere Strände, an denen ein Strandkorb — der an dieser Küste für genau dieses Wetter erfundene Korbsessel — keine Marotte ist, sondern praktische Notwendigkeit.",
      ],
    },
    highlights: {
      en: [
        "Königsstuhl and the Victoria viewpoint",
        "Jasmund's old-growth beech forest in spring",
        "Binz and Sellin seaside architecture",
        "The narrow-gauge Rasender Roland steam train",
      ],
      de: [
        "Königsstuhl und die Viktoriasicht",
        "Jasmunds alter Buchenwald im Frühling",
        "Bäderarchitektur in Binz und Sellin",
        "Die Schmalspurbahn Rasender Roland",
      ],
    },
    gettingThere: {
      en: "Direct ICE from Hamburg and Berlin to Binz via the Rügen causeway. From Binz, bus or the Rasender Roland to Sassnitz for the national park.",
      de: "Direkte ICE-Verbindungen aus Hamburg und Berlin nach Binz über den Rügendamm. Ab Binz mit Bus oder dem Rasenden Roland nach Sassnitz zum Nationalpark.",
    },
    nearby: ["hamburg", "berlin"],
    photos: ["ruegen-hero", "ruegen-2", "ruegen-3"],
  },
  {
    slug: "harz",
    name: { en: "The Harz Mountains", de: "Der Harz" },
    tagline: {
      en: "Witches, fog and steam trains on the Brocken",
      de: "Hexen, Nebel und Dampfzüge auf den Brocken",
    },
    region: "harz-lower-saxony",
    themes: ["forests", "castles"],
    bestSeasons: ["winter", "autumn"],
    coords: [51.7994, 10.6156],
    story: {
      en: [
        "The Harz is northern Germany's only real mountain range, rising out of flat farmland with no warning at all, and it has been collecting superstitions for as long as anyone has lived near it. The Brocken, its 1,141-metre summit, is fogbound on roughly 300 days a year, holds an Arctic-grade climate on its plateau, and is where Goethe put the witches' sabbath in Faust — Walpurgis Night, 30 April, still celebrated with fires across the whole range.",
        "Steam trains still climb it. The Harzer Schmalspurbahnen run narrow-gauge locomotives built in the 1950s up a gradient of one in thirty-three, and on a winter morning with rime ice on the spruce and steam flattening back over the carriages, the experience is not nostalgic so much as simply correct.",
        "Around the range sit some of Germany's most intact old towns. Quedlinburg has more than 1,300 half-timbered houses spanning six centuries and an abbey church on a sandstone ridge above them. Goslar grew rich on the silver in the mountain behind it and spent the money visibly. Both were on the eastern side of the border until 1990, which is much of the reason they were never modernised.",
      ],
      de: [
        "Der Harz ist Norddeutschlands einziges echtes Mittelgebirge, erhebt sich ohne Vorwarnung aus flachem Ackerland und sammelt Aberglauben, solange dort Menschen leben. Der Brocken, sein 1.141 Meter hoher Gipfel, liegt an rund 300 Tagen im Jahr im Nebel, trägt auf seinem Plateau ein arktisches Klima und ist der Ort, an dem Goethe im Faust den Hexensabbat ansiedelte — die Walpurgisnacht am 30. April wird bis heute im ganzen Gebirge mit Feuern begangen.",
        "Dampfzüge fahren noch immer hinauf. Die Harzer Schmalspurbahnen bringen Lokomotiven aus den 1950er Jahren eine Steigung von eins zu dreiunddreißig hinauf, und an einem Wintermorgen mit Raureif auf den Fichten und flach zurückgedrücktem Dampf wirkt das weniger nostalgisch als schlicht richtig.",
        "Rund um das Gebirge liegen einige der unversehrtesten Altstädte Deutschlands. Quedlinburg hat über 1.300 Fachwerkhäuser aus sechs Jahrhunderten und darüber auf einem Sandsteinfelsen die Stiftskirche. Goslar wurde reich durch das Silber im Berg dahinter und gab das Geld sichtbar aus. Beide lagen bis 1990 östlich der Grenze — ein wesentlicher Grund, weshalb sie nie modernisiert wurden.",
      ],
    },
    highlights: {
      en: [
        "Steam up the Brocken on the narrow-gauge railway",
        "Quedlinburg's 1,300 half-timbered houses",
        "Goslar's Imperial Palace and mining museum",
        "Walpurgis Night bonfires on 30 April",
      ],
      de: [
        "Mit Dampf auf den Brocken über die Schmalspurbahn",
        "Quedlinburgs 1.300 Fachwerkhäuser",
        "Goslarer Kaiserpfalz und Bergbaumuseum",
        "Walpurgisfeuer in der Nacht zum 1. Mai",
      ],
    },
    gettingThere: {
      en: "Wernigerode and Goslar are the usual bases, both reachable by regional train from Hannover in about 90 minutes. The steam railway starts in Wernigerode town centre.",
      de: "Wernigerode und Goslar sind die üblichen Ausgangspunkte, beide mit der Regionalbahn ab Hannover in etwa 90 Minuten erreichbar. Die Dampfbahn startet im Zentrum von Wernigerode.",
    },
    nearby: ["berlin", "dresden"],
    photos: ["harz-hero", "harz-2", "harz-3"],
  },
];
