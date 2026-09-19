import type { Destination } from "../types";

export const southwest: Destination[] = [
  {
    slug: "black-forest",
    name: { en: "The Black Forest", de: "Der Schwarzwald" },
    tagline: {
      en: "Dark firs, open valleys and a very long silence",
      de: "Dunkle Tannen, offene Täler und eine sehr lange Stille",
    },
    region: "baden-wuerttemberg",
    themes: ["forests", "wine"],
    bestSeasons: ["autumn", "summer"],
    coords: [48.2, 8.2],
    featured: true,
    story: {
      en: [
        "The Romans called it Silva Nigra because the canopy was too dense for light to reach the floor, and parts of it still are. The Black Forest runs 160 kilometres down Germany's southwestern corner, a plateau of spruce and fir cut by steep valleys, waterfalls and moorland lakes the colour of strong tea.",
        "It is a working landscape more than a wilderness. Farmhouses with vast hipped roofs sit alone on south-facing slopes, built so that hay, cattle and family lived under one span of thatch through the winter. The clockmaking that made the region famous began in those same kitchens in the eighteenth century, carved by farmers who needed something to do between November and March.",
        "Walk the Westweg ridge trail and the forest opens unexpectedly onto grazing meadows and views that reach to the Vosges across the Rhine on clear days. In autumn the beeches along the lower valleys turn copper against the black conifers, the mist sits in the hollows until mid-morning, and the whole place looks precisely as the Grimms described it.",
      ],
      de: [
        "Die Römer nannten ihn Silva Nigra, weil das Kronendach zu dicht war, als dass Licht den Boden erreicht hätte — und teilweise ist es das noch immer. Der Schwarzwald zieht sich 160 Kilometer durch Deutschlands Südwestecke: ein Hochland aus Fichten und Tannen, zerschnitten von steilen Tälern, Wasserfällen und Moorseen in der Farbe starken Tees.",
        "Er ist eher Kulturlandschaft als Wildnis. Höfe mit gewaltigen Walmdächern stehen einzeln an südexponierten Hängen, gebaut, damit Heu, Vieh und Familie den Winter unter einem Dach überstanden. Die Uhrmacherei, die die Region berühmt machte, begann im 18. Jahrhundert in genau diesen Stuben — geschnitzt von Bauern, die zwischen November und März etwas zu tun brauchten.",
        "Auf dem Höhenweg Westweg öffnet sich der Wald unerwartet auf Weiden und Ausblicke, die an klaren Tagen über den Rhein bis in die Vogesen reichen. Im Herbst färben sich die Buchen der unteren Täler kupfern vor den schwarzen Nadelbäumen, der Nebel liegt bis zum späten Vormittag in den Senken, und alles sieht genau so aus, wie die Brüder Grimm es beschrieben haben.",
      ],
    },
    highlights: {
      en: [
        "Triberg waterfalls, the highest in Germany",
        "Lake Titisee and the Feldberg summit",
        "Gutach open-air museum farmhouses",
        "The Westweg long-distance ridge trail",
      ],
      de: [
        "Triberger Wasserfälle, die höchsten Deutschlands",
        "Titisee und der Gipfel des Feldbergs",
        "Schwarzwälder Freilichtmuseum Vogtsbauernhof",
        "Der Fernwanderweg Westweg",
      ],
    },
    gettingThere: {
      en: "Freiburg and Offenburg are the main gateways on the Frankfurt–Basel line. The Schwarzwaldbahn from Offenburg to Konstanz is one of the great scenic rail rides in Europe.",
      de: "Freiburg und Offenburg sind die Hauptzugänge an der Strecke Frankfurt–Basel. Die Schwarzwaldbahn von Offenburg nach Konstanz ist eine der schönsten Bahnstrecken Europas.",
    },
    nearby: ["lake-constance", "heidelberg"],
    photos: ["black-forest-hero", "black-forest-2", "black-forest-3"],
  },
  {
    slug: "heidelberg",
    name: { en: "Heidelberg", de: "Heidelberg" },
    tagline: {
      en: "A ruined castle, a river, and 600 years of students",
      de: "Eine Schlossruine, ein Fluss und 600 Jahre Studenten",
    },
    region: "baden-wuerttemberg",
    themes: ["cities", "castles"],
    bestSeasons: ["spring", "autumn"],
    coords: [49.4106, 8.7156],
    featured: true,
    story: {
      en: [
        "Heidelberg is a city that has been loved into legend. Germany's oldest university opened here in 1386, the Romantics arrived four hundred years later and decided the half-collapsed castle above the Neckar was the most beautiful ruin in Europe, and ever since the town has been carrying the weight of that reputation remarkably lightly.",
        "The castle earned its state honestly: struck by lightning twice, sacked in two wars, and then deliberately left unrestored because the ruin was judged more moving than the building. Red sandstone walls stand open to the sky above terraces of roses, and from the great terrace the whole old town lies below you in one long russet line along the river.",
        "Cross the Alte Brücke and climb the Philosophenweg on the north bank. It is a stiff ten minutes, and then the path levels into gardens where almonds and figs ripen in the mild valley air. Hegel walked here. So did Goethe, and Mark Twain, who wrote that the ruin looked as if it had been built for the express purpose of being gazed at.",
      ],
      de: [
        "Heidelberg ist eine Stadt, die man zur Legende geliebt hat. Deutschlands älteste Universität öffnete hier 1386, vierhundert Jahre später kamen die Romantiker und erklärten die halb eingestürzte Burg über dem Neckar zur schönsten Ruine Europas — und seither trägt die Stadt dieses Erbe bemerkenswert leicht.",
        "Das Schloss hat seinen Zustand redlich verdient: zweimal vom Blitz getroffen, in zwei Kriegen geplündert und anschließend bewusst nicht wiederaufgebaut, weil man die Ruine für ergreifender hielt als das Gebäude. Rote Sandsteinmauern stehen offen zum Himmel über Rosenterrassen, und von der großen Terrasse liegt die ganze Altstadt als eine lange rostrote Linie am Fluss.",
        "Überqueren Sie die Alte Brücke und steigen Sie am Nordufer den Philosophenweg hinauf. Zehn steile Minuten, dann ebnet sich der Pfad zu Gärten, in denen Mandeln und Feigen in der milden Talluft reifen. Hegel ging hier. Ebenso Goethe — und Mark Twain, der schrieb, die Ruine wirke, als sei sie eigens zum Angeschautwerden gebaut worden.",
      ],
    },
    highlights: {
      en: [
        "Heidelberg Castle terrace and the Great Vat",
        "The Philosophers' Walk above the north bank",
        "Alte Brücke and its baroque gate towers",
        "The old university and the Student Prison",
      ],
      de: [
        "Schlossterrasse und das Große Fass",
        "Der Philosophenweg über dem Nordufer",
        "Alte Brücke mit ihrem barocken Brückentor",
        "Alte Universität und Studentenkarzer",
      ],
    },
    gettingThere: {
      en: "Ten minutes by regional train from Mannheim, which sits on every north–south ICE line. Frankfurt Airport is 50 minutes away by direct train.",
      de: "Zehn Minuten mit der Regionalbahn ab Mannheim, das an allen Nord-Süd-ICE-Linien liegt. Der Frankfurter Flughafen ist mit dem Direktzug in 50 Minuten erreichbar.",
    },
    nearby: ["black-forest", "rhine-valley"],
    photos: ["heidelberg-hero", "heidelberg-2", "heidelberg-3"],
  },
  {
    slug: "lake-constance",
    name: { en: "Lake Constance", de: "Bodensee" },
    tagline: {
      en: "Three countries, one shoreline, and Alpine light on water",
      de: "Drei Länder, ein Ufer und Alpenlicht auf dem Wasser",
    },
    region: "baden-wuerttemberg",
    themes: ["alps", "wine"],
    bestSeasons: ["summer", "spring"],
    coords: [47.6779, 9.1732],
    story: {
      en: [
        "The Bodensee is the closest Germany gets to a Mediterranean climate. Sixty-three kilometres long, shared with Austria and Switzerland, it holds enough water to moderate its own weather — which is why palms, figs and vineyards grow on shores that sit only an hour's drive from Alpine snowfields.",
        "Each corner of it feels like a different country, because it partly is. Konstanz has a Gothic minster and a university crowd; Meersburg across the water is all vine terraces and a castle that has been continuously inhabited since the seventh century; Lindau sits on its own island with a harbour guarded by a stone lion and a lighthouse. On the Swiss and Austrian shores the mountains come right down to the waterline.",
        "The signature experience is simple: rent a bike and ride part of the 260-kilometre lakeside path. It is flat, well signposted, and on a clear early-summer morning the Säntis massif stands up across the water so sharply that the whole lake seems tilted towards it.",
      ],
      de: [
        "Der Bodensee ist das Mediterranste, was Deutschland zu bieten hat. Dreiundsechzig Kilometer lang, geteilt mit Österreich und der Schweiz, hält er genug Wasser, um sein eigenes Klima zu mildern — weshalb Palmen, Feigen und Reben an Ufern wachsen, die nur eine Autostunde von alpinen Schneefeldern entfernt liegen.",
        "Jede Ecke wirkt wie ein anderes Land, weil sie es teilweise ist. Konstanz hat ein gotisches Münster und ein studentisches Publikum; Meersburg gegenüber besteht aus Rebterrassen und einer Burg, die seit dem siebten Jahrhundert durchgehend bewohnt ist; Lindau liegt auf einer eigenen Insel, den Hafen bewacht von Steinlöwe und Leuchtturm. Am Schweizer und österreichischen Ufer reichen die Berge bis an die Wasserlinie.",
        "Das prägende Erlebnis ist einfach: ein Rad leihen und ein Stück des 260 Kilometer langen Bodensee-Radwegs fahren. Er ist flach, gut ausgeschildert, und an einem klaren Frühsommermorgen steht das Säntis-Massiv so scharf über dem Wasser, dass der ganze See darauf zuzulaufen scheint.",
      ],
    },
    highlights: {
      en: [
        "Mainau, the island garden of palms and roses",
        "Meersburg's vine terraces and old castle",
        "Lindau harbour with its lion and lighthouse",
        "The 260 km cycle path around the whole lake",
      ],
      de: [
        "Die Blumeninsel Mainau mit Palmen und Rosen",
        "Meersburgs Rebterrassen und die Alte Burg",
        "Der Lindauer Hafen mit Löwe und Leuchtturm",
        "Der 260 km lange Bodensee-Radweg",
      ],
    },
    gettingThere: {
      en: "Konstanz is the terminus of the Schwarzwaldbahn from Offenburg; Friedrichshafen and Lindau connect to Munich and Stuttgart. Passenger ferries link every major town on the lake.",
      de: "Konstanz ist Endpunkt der Schwarzwaldbahn ab Offenburg; Friedrichshafen und Lindau sind an München und Stuttgart angebunden. Kursschiffe verbinden alle größeren Orte am See.",
    },
    nearby: ["black-forest", "koenigssee"],
    photos: ["lake-constance-hero", "lake-constance-2", "lake-constance-3"],
  },
];
