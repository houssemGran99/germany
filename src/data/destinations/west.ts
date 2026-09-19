import type { Destination } from "../types";

export const west: Destination[] = [
  {
    slug: "rhine-valley",
    name: { en: "Rhine Valley & the Loreley", de: "Mittelrheintal & Loreley" },
    tagline: {
      en: "Sixty-five kilometres of castles above a working river",
      de: "Fünfundsechzig Kilometer Burgen über einem Arbeitsfluss",
    },
    region: "rhineland-palatinate",
    themes: ["wine", "castles"],
    bestSeasons: ["autumn", "summer"],
    coords: [50.1392, 7.7286],
    featured: true,
    story: {
      en: [
        "Between Bingen and Koblenz the Rhine cuts a gorge so narrow that for centuries anyone with a hilltop and a chain could tax the traffic below. The result is the highest density of medieval castles anywhere in the world — more than forty of them in sixty-five kilometres, some restored, some romantically wrecked, one built on an island in midstream purely to make escape impossible.",
        "The slopes on either side are terraced to a degree that looks like an error of judgement until you taste the wine. Riesling has grown on this slate since Roman times; the stone holds the day's heat and releases it overnight, and the steepest parcels are still worked by hand because no machine can hold the gradient.",
        "At the narrowest point the river bends around the Loreley, a 130-metre slate rock where the current runs fast and treacherous. The legend of the golden-haired woman who lured boatmen onto the shoals is only two centuries old — Clemens Brentano invented her in 1801 — but stand on the viewing platform at sunset with barges threading the bend below, and you understand why it took.",
      ],
      de: [
        "Zwischen Bingen und Koblenz schneidet der Rhein eine so enge Schlucht, dass jahrhundertelang jeder mit einem Hügel und einer Kette den Verkehr darunter besteuern konnte. Das Ergebnis ist die höchste Burgendichte der Welt — über vierzig auf fünfundsechzig Kilometern, manche restauriert, manche romantisch verfallen, eine mitten im Strom auf einer Insel gebaut, um Flucht unmöglich zu machen.",
        "Die Hänge beidseitig sind so weit terrassiert, dass es nach einem Fehlurteil aussieht — bis man den Wein probiert. Riesling wächst auf diesem Schiefer seit römischer Zeit; der Stein speichert die Tageswärme und gibt sie nachts ab, und die steilsten Parzellen werden noch immer von Hand bewirtschaftet, weil keine Maschine die Neigung hält.",
        "An der engsten Stelle biegt der Fluss um die Loreley, einen 130 Meter hohen Schieferfelsen, an dem die Strömung schnell und tückisch läuft. Die Sage von der goldhaarigen Frau, die Schiffer auf die Untiefen lockte, ist erst zweihundert Jahre alt — Clemens Brentano erfand sie 1801. Doch wer bei Sonnenuntergang auf der Aussichtskanzel steht, während unten Frachter die Kurve fädeln, versteht, warum sie sich hielt.",
      ],
    },
    highlights: {
      en: [
        "The Loreley rock and viewing platform",
        "Marksburg, the only never-destroyed hill castle",
        "Pfalzgrafenstein toll castle midstream",
        "Riesling tasting in Bacharach and Oberwesel",
      ],
      de: [
        "Der Loreleyfelsen und die Aussichtskanzel",
        "Marksburg, die einzige nie zerstörte Höhenburg",
        "Die Zollburg Pfalzgrafenstein im Strom",
        "Rieslingprobe in Bacharach und Oberwesel",
      ],
    },
    gettingThere: {
      en: "Regional trains run along both banks between Koblenz and Mainz, stopping at every village. The KD river boats are slower and far better — take the left bank train out and the boat back.",
      de: "Regionalzüge fahren an beiden Ufern zwischen Koblenz und Mainz und halten in jedem Dorf. Die KD-Schiffe sind langsamer und weit schöner — hin mit der Bahn am linken Ufer, zurück mit dem Schiff.",
    },
    nearby: ["moselle", "cologne"],
    photos: ["rhine-valley-hero", "rhine-valley-2", "rhine-valley-3"],
  },
  {
    slug: "moselle",
    name: { en: "The Moselle Vineyards", de: "Die Moselweinberge" },
    tagline: {
      en: "The steepest vineyards in Europe, wrapped around a river",
      de: "Europas steilste Weinberge, um einen Fluss gelegt",
    },
    region: "rhineland-palatinate",
    themes: ["wine", "forests"],
    bestSeasons: ["autumn", "spring"],
    coords: [49.9167, 7.0667],
    featured: true,
    story: {
      en: [
        "The Moselle does not flow so much as meander obsessively, doubling back on itself so often that a journey of 100 kilometres downstream covers barely half that distance as the crow flies. Every bend produces another south-facing slope, and every south-facing slope is planted — including the Calmont near Bremm, at 65 degrees the steepest working vineyard in Europe, where pickers still use ropes.",
        "The villages between Trier and Koblenz are small, half-timbered and built entirely around the harvest. Bernkastel-Kues has a market square so crooked it looks drawn by hand; Cochem sits under a castle restored in the nineteenth century by a Berlin businessman with an unlimited budget and firm opinions about what a castle should look like.",
        "Come in October, when the vines turn gold and the whole valley smells faintly of fermentation, and try the wine where it is made. Moselle Riesling is light, low in alcohol and sharply mineral — slate, green apple, and a line of acidity that makes everything else on the table taste better.",
      ],
      de: [
        "Die Mosel fließt nicht, sie mäandert zwanghaft und wendet sich so oft zurück, dass hundert Flusskilometer kaum die halbe Luftlinie zurücklegen. Jede Schleife erzeugt einen weiteren Südhang, und jeder Südhang ist bepflanzt — auch der Calmont bei Bremm, mit 65 Grad der steilste bewirtschaftete Weinberg Europas, wo noch immer mit Seilen gelesen wird.",
        "Die Dörfer zwischen Trier und Koblenz sind klein, fachwerkgebaut und vollständig um die Lese herum organisiert. Bernkastel-Kues hat einen Marktplatz, so schief, dass er von Hand gezeichnet scheint; Cochem liegt unter einer Burg, die im 19. Jahrhundert ein Berliner Kaufmann mit unbegrenztem Budget und festen Vorstellungen davon, wie eine Burg auszusehen hat, wiederaufbauen ließ.",
        "Kommen Sie im Oktober, wenn sich die Reben golden färben und das ganze Tal schwach nach Gärung riecht, und probieren Sie den Wein dort, wo er entsteht. Moselriesling ist leicht, alkoholarm und scharf mineralisch — Schiefer, grüner Apfel und eine Säurelinie, die alles andere auf dem Tisch besser schmecken lässt.",
      ],
    },
    highlights: {
      en: [
        "The Calmont via ferrata above Bremm",
        "Bernkastel-Kues market square and Doctor vineyard",
        "Burg Eltz, hidden in a side valley",
        "Trier's Roman Porta Nigra, upstream",
      ],
      de: [
        "Der Calmont-Klettersteig über Bremm",
        "Marktplatz von Bernkastel-Kues und die Lage Doctor",
        "Burg Eltz, versteckt in einem Seitental",
        "Die römische Porta Nigra in Trier, flussaufwärts",
      ],
    },
    gettingThere: {
      en: "The Moselle railway runs Koblenz–Cochem–Trier along the valley floor. Buses and cycle ferries link the wine villages; the riverside cycle path is flat the whole way.",
      de: "Die Moselstrecke verbindet Koblenz–Cochem–Trier entlang der Talsohle. Busse und Radfähren erschließen die Weindörfer; der Moselradweg ist durchgehend flach.",
    },
    nearby: ["rhine-valley", "cologne"],
    photos: ["moselle-hero", "moselle-2", "moselle-3"],
  },
  {
    slug: "cologne",
    name: { en: "Cologne Cathedral", de: "Kölner Dom" },
    tagline: {
      en: "632 years to finish, and worth the wait",
      de: "632 Jahre Bauzeit — und jede davon wert",
    },
    region: "north-rhine-westphalia",
    themes: ["cities", "castles"],
    bestSeasons: ["winter", "spring"],
    coords: [50.9413, 6.9583],
    story: {
      en: [
        "You do not find the Dom; it finds you. Step out of Cologne's main station and it is simply there, filling the entire field of vision, 157 metres of blackened Gothic stone standing on a plaza that is never empty. It took 632 years to build — begun in 1248, abandoned for three centuries with a crane left standing on the half-finished south tower, and completed in 1880 using the original medieval plans, which had turned up in an attic.",
        "Inside, the scale stops conversation. The nave is 43 metres high, the stained glass runs from the thirteenth century to Gerhard Richter's 2007 window of 11,500 randomly arranged coloured squares, and behind the high altar sits the Shrine of the Three Kings, the largest reliquary in the Western world and the reason the cathedral was built at this size in the first place.",
        "Climb the 533 steps of the south tower for the view over the Rhine and the Hohenzollern Bridge. Then go down to a brewhouse, order a Kölsch in its narrow 200ml glass, and let the Köbes keep replacing it until you put your beermat on top — the only accepted way to say you have had enough.",
      ],
      de: [
        "Man findet den Dom nicht; er findet einen. Man tritt aus dem Kölner Hauptbahnhof, und da steht er, füllt das gesamte Blickfeld: 157 Meter geschwärzter gotischer Stein auf einem Platz, der nie leer ist. 632 Jahre dauerte der Bau — begonnen 1248, drei Jahrhunderte unterbrochen, mit einem Kran auf dem halbfertigen Südturm, und 1880 vollendet nach den originalen mittelalterlichen Plänen, die auf einem Dachboden wiederaufgetaucht waren.",
        "Innen lässt die Dimension die Gespräche verstummen. Das Mittelschiff ist 43 Meter hoch, die Glasfenster reichen vom 13. Jahrhundert bis zu Gerhard Richters Fenster von 2007 aus 11.500 zufällig angeordneten Farbquadraten, und hinter dem Hochaltar steht der Dreikönigenschrein, das größte Reliquiar des Abendlandes — und der Grund, weshalb der Dom überhaupt in dieser Größe gebaut wurde.",
        "Steigen Sie die 533 Stufen des Südturms hinauf für den Blick über den Rhein und die Hohenzollernbrücke. Gehen Sie danach in ein Brauhaus, bestellen Sie ein Kölsch im schmalen Zweihundert-Milliliter-Glas und lassen Sie den Köbes nachschenken, bis Sie den Deckel aufs Glas legen — die einzig anerkannte Art, genug zu sagen.",
      ],
    },
    highlights: {
      en: [
        "The Shrine of the Three Kings behind the high altar",
        "Richter's abstract south transept window",
        "533 steps up the south tower for the Rhine view",
        "Kölsch in a traditional old-town brewhouse",
      ],
      de: [
        "Der Dreikönigenschrein hinter dem Hochaltar",
        "Richters abstraktes Querhausfenster im Süden",
        "533 Stufen auf den Südturm für den Rheinblick",
        "Kölsch in einem traditionellen Altstadt-Brauhaus",
      ],
    },
    gettingThere: {
      en: "Cologne Hauptbahnhof is one of Europe's busiest junctions and the cathedral is 50 metres from the exit. Direct ICE and Thalys links to Brussels, Paris and Amsterdam.",
      de: "Der Kölner Hauptbahnhof ist einer der meistfrequentierten Knoten Europas, der Dom liegt 50 Meter vom Ausgang. Direkte ICE- und Thalys-Verbindungen nach Brüssel, Paris und Amsterdam.",
    },
    nearby: ["rhine-valley", "moselle"],
    photos: ["cologne-hero", "cologne-2", "cologne-3"],
  },
];
