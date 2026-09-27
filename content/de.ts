import type { Dict } from "./en";

const de: Dict = {
  meta: {
    title: "Metalix — Von der Zeichnung zum fertigen Teil",
    description:
      "Das weltweit führende CAD/CAM-System für die Blechbearbeitung: Nesting, Schneiden, Stanzen, Biegen, Robotik und ERP/MES-Integration für die smarte Blechfabrik.",
  },
  ui: {
    tagline: "CAD/CAM, das Ihre Sprache spricht",
    brandLine: "CAD/CAM-Lösungen für die Blechbearbeitung",
    language: "Sprache",
    explore: "Entdecken",
    close: "Schließen",
    contact: "Kontakt",
    scroll: "Scrollen und entdecken",
    section: "Abschnitt",
    play: "Abspielen",
    pause: "Pause",
    replay: "Wiederholen",
    illustrative: "Illustrative Animation — keine Messdaten",
    shortcut: "Drücken Sie /, um überallhin zu springen",
    backToTop: "Nach oben",
  },
  nav: {
    hero: "Start",
    about: "Über Metalix",
    factory: "Smarte Fabrik",
    cnckad: "cncKad",
    mbend: "MBend",
    mrobot: "MRobot",
    mtube: "MTube",
    nesting: "AutoNesting Pro",
    estimation: "Estimation",
    mes: "MESApp × JobTrack",
    erp: "ERP / MES / API",
    service: "Service",
  },
  navHints: {
    hero: "Von der Zeichnung zum fertigen Teil",
    about: "30000+ Kunden in über 100 Ländern",
    factory: "Ein Datenfluss vom Auftrag bis zur Lieferung",
    cnckad: "Stanz- und Schneidprogrammierung",
    mbend: "Biegeprogrammierung & Simulation",
    mrobot: "Offline-Programmierung von Roboter-Biegezellen",
    mtube: "Rohrkonstruktion & Programmierung",
    nesting: "Echtform-Nesting der nächsten Stufe",
    estimation: "Kalkulation auf Basis realer Werkzeugwege",
    mes: "Mannlose Programmierung & Rückverfolgung",
    erp: "Tiefe Systemintegration",
    service: "Implementierung & Support vor Ort",
  },
  hero: {
    eyebrow: ["Smarte Blechfabrik", "Integrierte digitale Lösungen"],
    title: ["Von der Zeichnung", "zum fertigen Teil"],
    lead:
      "Das weltweit führende CAD/CAM-System für die Blechbearbeitung — für Nesting, Schneiden, Stanzen, Biegen, Robotik und Management-Integration. Es hilft Fabriken, die Materialausnutzung zu steigern und Programmier- und Fertigungszeiten zu verkürzen.",
    cta: "Plattform entdecken",
    cta2: "Dem Datenfluss folgen",
    hud: ["Nesting", "Schneiden", "Stanzen", "Biegen"],
  },
  about: {
    eyebrow: "Über Metalix",
    title: "Über Metalix",
    lead:
      "Metalix ist ein führender Anbieter von CAD/CAM-Systemen für die Blechindustrie und liefert Komplettlösungen für Schneiden, Stanzen und Biegen: Import von 3D/2D-Zeichnungen, hochproduktives Nesting, grafische NC-Simulation und Kostenkalkulation — damit Fabriken weltweit Fertigungszeit und Materialverschnitt kontinuierlich senken.",
    stats: [
      { value: "100+", label: "Länder & Regionen", text: "Kunden rund um den Globus" },
      { value: "30000+", label: "Kunden weltweit", text: "Installationen wachsen stetig" },
      { value: "Alle gängigen", label: "Maschinen kompatibel", text: "Einfacher Wechsel auf einer Plattform" },
      { value: "5 Sterne", label: "Ruf für Schulung & Service", text: "Lokale Implementierung & Betreuung" },
    ],
    quote: {
      text: "Hervorragende Nesting-Engine — hohe Materialausnutzung und minimaler Verschnitt.",
      by: "METALFORMERS · Verifizierter globaler Kunde",
    },
    whyTitle: "Warum Metalix",
    why: [
      {
        title: "Alles aus einer Hand",
        text: "Vom 3D/2D-Konstruktionsimport über Nesting und Schneid-/Stanzprogrammierung bis zu Biegen und Reporting — alles im Metalix-Ökosystem, bearbeitet in einem einzigen CAD/CAM-Fenster.",
      },
      {
        title: "Optimiert für Ihre Maschinen",
        text: "Kürzeste Schneidzeit, minimaler Stempelverschleiß bei bester Materialausnutzung, optimale Biegewerkzeug-Rüstungen — das volle Potenzial Ihrer Anlagen.",
      },
      {
        title: "Leicht zu lernen · Schnell startklar",
        text: "Neue Bediener programmieren schon nach wenigen Schulungsstunden; Automatikfunktionen steigern Stanzqualität und -geschwindigkeit um mehr als das Dreifache und bewältigen mühelos über 100.000 verschachtelte Teile.",
      },
      {
        title: "Offene Integration · Ihre Investition geschützt",
        text: "Offene, voll ausgestattete API mit CSV/SAP-ERP-Anbindung; CAD Link verbindet nahtlos Creo, SOLIDWORKS, Tekla, Inventor, AutoCAD und EPLAN.",
      },
    ],
    machinesTitle: "Unterstützt alle gängigen Maschinentypen",
    machines: [
      "Laser",
      "CNC-Stanze",
      "Plasma",
      "Autogen",
      "Wasserstrahl",
      "Stanz-Laser-Kombi",
      "Stanz-Scher-Kombi",
      "Coil-Schneidanlage",
      "Stromschienen-Stanzen & -Biegen",
      "Bohr-Fräsmaschinen",
    ],
  },
  factory: {
    eyebrow: "Smarte Blechfabrik",
    title: "Smarte Blechfabrik · Ein Datenfluss",
    lead:
      "Eine Zeichnung geht in Metalix hinein, und der gesamte Prozess wird digital: Auftrags-, Programmier-, Bearbeitungs- und Rückmeldedaten fließen automatisch zwischen ERP/MES und den Maschinen in der Werkstatt — ein geschlossener Kreislauf von der Konstruktion bis zur Auslieferung.",
    steps: [
      {
        title: "Auftrags- & Konstruktionsimport",
        text: "Aufträge kommen automatisch aus ERP/MES; STEP/IGES- und DXF/DWG-Zeichnungen werden per CAD Link mit einem Klick importiert — samt Material-, Dicken- und Biegeparametern.",
      },
      {
        title: "Smartes Nesting",
        text: "AutoNest Pro verschachtelt Echtformen automatisch mit Common-Line-Schnitt, Teil-in-Teil-Füllung und Restblechnutzung — und holt das Maximum aus jeder Tafel.",
      },
      {
        title: "Schneid- & Stanzprogrammierung",
        text: "cncKad deckt Laser, Plasma, Autogen, Wasserstrahl, Stanz- und Kombimaschinen ab; nach der grafischen NC-Simulation gehen die Programme per DNC direkt an die Maschinen.",
      },
      {
        title: "Smarte Kalkulation",
        text: "Estimation berechnet Material-, Arbeits- und Energiekosten in Sekunden auf Basis realer Werkzeugwege — Angebote mit Sicherheit.",
      },
      {
        title: "Biegen & Robotik",
        text: "MBend erzeugt Biegefolgen und Werkzeugrüstungen automatisch; MRobot programmiert Roboter-Biegezellen mit vollständiger Simulation von Teilehandling, Biegen und Palettieren.",
      },
      {
        title: "Rückverfolgung & Rückmeldung",
        text: "JobTrack verfolgt Aufträge, Teile und Materialverbrauch; Nesting-Ergebnisse, NC-Informationen und Bearbeitungszeiten werden automatisch an ERP/MES zurückgemeldet.",
      },
    ],
    kpis: [
      { title: "Materialausnutzung ↑", text: "Echtform-Nesting + Common Lines + Restblechnutzung" },
      { title: "Programmierzeit ↓", text: "Automatische Programmierung + grafische Simulation" },
      { title: "Keine Datenlücken", text: "CAD → CAM → ERP/MES vollständig verbunden" },
    ],
    flow: [
      { title: "ERP/MES-Auftrag", text: "Auftragseingang & Zeichnungsimport · Ein Klick über CAD Link" },
      { title: "Laser-/Stanzbearbeitung", text: "Automatische Programmierung mit cncKad · NC direkt an die Maschine" },
      { title: "Biegen an der Abkantpresse", text: "Biegefolgen-Simulation mit MBend · Fertiges Teil versandbereit" },
    ],
  },
  cnckad: {
    eyebrow: "cncKad · Stanz- / Schneidprogrammierung",
    title: "cncKad Plattform für Stanz- & Schneidprogrammierung",
    lead:
      "Die zentrale 2D-CAD/CAM-Programmierplattform für Blech: Zeichnen, Import, Prozesseinrichtung, NC-Erzeugung und Simulation in einem Fenster — für Laser-, Plasma-, Autogen-, Wasserstrahl-, Stanz-, Kombi- und Schermaschinen.",
    media: ["CNC-Stanzen", "Laserschneiden"],
    groups: [
      {
        title: "Vollständige Prozessabdeckung",
        items: [
          "Programmierung für Laser / Plasma / Autogen / Wasserstrahl",
          "CNC-Stanzen und Stanz-Laser-Kombibearbeitung",
          "Technologietabellen nach Material & Dicke",
          "Optimierung von Schneidreihenfolge und Leerwegen",
          "Fasen / erweiterte 5-Achs-Funktionen",
          "Markieren, Gravieren und Hilfskennzeichnungen",
        ],
      },
      {
        title: "CAD-Teilevorbereitung",
        items: [
          "2D-Zeichnen und Geometriebearbeitung",
          "Import von DXF- / DWG-Zeichnungen",
          "Layer für Schneiden / Markieren / Konstruktion",
          "Konturprüfung: offene und doppelte Linien",
          "Geometriebereinigung und -reparatur",
          "Teileeigenschaften: Name / Material / Dicke",
        ],
      },
      {
        title: "Stanzspezifische Funktionen",
        items: [
          "Werkzeugbibliothek / Revolverstationsverwaltung",
          "Automatische und manuelle Werkzeugbelegung",
          "Nibbeln langer Schlitze und Konturen",
          "Kiemen / Senkungen / Umformungen",
          "Pratzenvermeidung und Umsetzen",
          "Mehrstufige, geschichtete Bearbeitung",
        ],
      },
    ],
    oneStep: {
      title: "Von der Zeichnung zum NC-Programm in einem Schritt",
      items: [
        "Programmformate je Maschinensteuerung",
        "Grafische NC-Simulation der Werkzeugwege",
        "Prüfung von Kollisions- und Prozessrisiken",
        "Programmübertragung per DNC / Netzwerkordner",
        "Bearbeitungsberichte und eigene Berichtsvorlagen",
      ],
    },
    kpis: [
      { value: "3×", label: "Stanzqualität & -tempo ×3", text: "Dank automatischer Programmierung" },
      { value: "Stunden", label: "Bis neue Bediener programmieren", text: "Niedrige Einstiegshürde" },
      { value: "Wochen", label: "Nachgewiesene Amortisation", text: "Mitsubishi-Laser + cncKad" },
    ],
    note: "Die cncKad-Postprozessor-Bibliothek deckt gängige Stanz-, Laser-, Plasma- und Autogen-Schneidmaschinen ab",
    demo: {
      title: "Werkzeugweg-Simulation",
      laser: "Laser",
      punch: "Stanzen",
      readout: ["Kontur", "Hübe", "Anschnitt"],
      tool: "Werkzeug",
      leads: ["Bogen", "Gerade"],
      tools: ["Rund Ø14", "Quadrat 14", "Rechteck 30×8"],
    },
  },
  mbend: {
    eyebrow: "MBend · CNC-Biegeprogrammierung",
    title: "MBend Biegeprogrammierung & Simulation",
    lead:
      "Offline-Programmierung für CNC-Abkantpressen: automatische Berechnung der Biegefolge, Werkzeugauswahl und Anschlagpositionierung, vollständige dynamische 3D-Simulation, Kollisionen vorab gelöst — Programme und Arbeitsanweisungen, die die Maschine direkt ausführen kann.",
    mediaCaption: "MBend · 3D-Biegesimulation",
    groups: [
      {
        title: "3D-Import & Abwicklung",
        items: [
          "Import von STEP- / IGES-3D-Teilen",
          "2D-Abwicklungen mit Biegedefinitionen",
          "CAD Link zu gängigen CAD-Systemen",
          "Abwicklung nach Materialdicke & Parametern",
          "Erkennung von Biegelinien und -eigenschaften",
          "Teiledaten gemeinsam mit cncKad",
        ],
      },
      {
        title: "Automatische Prozessplanung",
        items: [
          "Bibliotheken für Oberwerkzeug / Matrize / Werkzeugsätze",
          "Automatische Werkzeugwahl nach Prozessbedingungen",
          "Automatische Berechnung der Biegefolge",
          "Automatische Anschlagpositionierung und -korrektur",
          "Entnahme- und Rückzugsbewegungen berechnet",
          "Biegefolgen manuell anpassbar",
        ],
      },
      {
        title: "Simulation & Ausgabe",
        items: [
          "Dynamische 3D-Simulation des Biegeprozesses",
          "Kollisionsprüfung Teil / Werkzeug / Anschlag",
          "Erzeugung von NC-Programmen für Abkantpressen",
          "Ausgabe von Biege-Arbeitsanweisungen",
          "Stapelverarbeitung mehrerer Teile",
          "Biegekorrekturtabellen & Mehrfachrüstungen",
        ],
      },
    ],
    banner: {
      title: "Im Programmierbüro biegen, an der Maschine produzieren",
      text: "Kein Ausprobieren mehr, das die Maschine blockiert — Biegefolge, Werkzeuge, Anschläge und Kollisionen werden offline geprüft, und die Umrüstzeit für neue Produkte sinkt drastisch.",
    },
    kpis: [
      { value: "Automatisch", text: "Biegefolge & Werkzeugwahl · Automatisch berechnet, manuell anpassbar" },
      { value: "3D", text: "Dynamische Simulation des gesamten Prozesses · Kollisionsrisiken vorab gelöst" },
      { value: "Stapel", text: "Mehrere Teile fortlaufend verarbeitet · Arbeitsanweisungen synchron ausgegeben" },
    ],
    coreTitle: "Zentrale Biegefunktionen",
    core: [
      { title: "Automatische Biegefolge", text: "Werkzeugstationen automatisch aus Teilgeometrie und Kollisionen geplant" },
      { title: "Automatische Werkzeug- & Anschlagwahl", text: "Intelligent aus der Werkzeugbibliothek der Maschine gewählt, weniger Rätselraten" },
      { title: "Dynamische 3D-Simulation", text: "Gesamte Biegebewegung simuliert, Kollisionsrisiken früh gelöst" },
      { title: "Rückfederungskompensation", text: "Biegetabellen und Korrekturparameter zentral verwaltet — für stabile Präzision" },
    ],
    demo: {
      title: "Biegefolge — live in 3D",
      hint: "Ziehen zum Drehen · Biegung wählen",
      bend: "Biegung",
      flat: "Flach",
      done: "Fertiges Teil",
    },
  },
  mrobot: {
    eyebrow: "MRobot · Roboter-Biegezelle",
    title: "MRobot Offline-Programmierung für Roboter-Biegezellen",
    lead:
      "Programmierung und Simulation für Roboter-Biegezellen: Zellenlayout festlegen, Greifpläne berechnen, abgestimmte Roboter- und Abkantpressenprogramme erzeugen — die ganze Zelle läuft zuerst virtuell.",
    groups: [
      {
        title: "Zellenkonfiguration",
        items: [
          "Roboter / Abkantpresse / Greifer / Palette",
          "Komponenten der Peripherie",
          "Offline-Umgebung spiegelt das reale Layout",
          "Unterstützt Vakuum-, Backen- und Kombigreifer",
          "Verknüpft mit MBend-Biegeplänen",
          "Unterstützung beim Kalibrieren der Zelle",
        ],
      },
      {
        title: "Bahnen & Simulation",
        items: [
          "Greifpunkte und Greifarten automatisch berechnet",
          "Bahnen für Aufnehmen / Zuführen / Biegen / Wenden",
          "Regeln für Ablagepalette und Stapelung",
          "Bewegungssimulation von Roboter / Teil / Maschine",
          "Prüfung von Störkonturen und Kollisionen",
          "Abgestimmte Programme mit einem Klick",
        ],
      },
      {
        title: "Nachgewiesener Nutzen",
        items: [
          "Schnelle, einfache patentierte Zellenkalibrierung",
          "Automatische Greif- und Bahnberechnung",
          "Programmierzeit und -kosten stark reduziert",
          "Validiert an Trumpf+Kuka-Zellen",
          "Erfolgsbeispiele: Durma+Yaskawa",
          "Inbetriebnahme und Feinabstimmung vor Ort",
        ],
      },
    ],
    kpis: [
      { title: "Mannloses Biegen", text: "Aufnehmen, Biegen, Wenden, Palettieren — vollständig programmiert" },
      { title: "Programmierkosten ↓", text: "Offline-Programmierung belegt keine Roboterstunden" },
      { title: "Schnelle Amortisation", text: "Kunden holen die Investition in die Zelle schnell herein — in der Praxis belegt" },
    ],
    stepsTitle: "Die Roboter-Biegezelle in vier Schritten live",
    steps: [
      { title: "Zellenlayout festlegen", text: "Roboter- und Abkantpressenstationen in einer virtuellen Umgebung anordnen" },
      { title: "Greifplan berechnen", text: "Greiferauswahl und Greifposen automatisch geplant" },
      { title: "Simulation des Gesamtprozesses", text: "Kollisionsprüfung und Taktzeitbewertung decken Risiken früh auf" },
      { title: "Programme ausrollen", text: "Abgestimmte Roboter- und Abkantpressenprogramme mit einem Klick" },
    ],
  },
  mtube: {
    eyebrow: "MTube · Smartes Rohrschneiden",
    title: "MTube Rohrkonstruktion & Programmierung",
    lead:
      "MTube deckt Rohrteilkonstruktion, Import von Rohrmodellen, Datenaufbereitung und den gesamten Software-Workflow des Rohrschneidens ab: 3D-Rohrteile einfach erstellen, Rohrzeichnungen und Baugruppen im STEP-, IGES- und weiteren Formaten aus Inventor, SOLIDWORKS, Creo und anderen importieren — ohne zusätzliche Konstruktionssoftware, bis hin zum Rohrschneidprogramm.",
    media: ["MTube · 3D-Rohrkonstruktion", "cncKad · Rohrschneid-Simulation"],
    compareHint: "Ziehen, um Konstruktion und Schneidsimulation zu vergleichen",
    cards: [
      {
        tag: "MT-01 · MT-03",
        title: "3D-Modellierung & Import",
        text: "3D-Rohrteile erstellen und bearbeiten; externe Rohrmodelle oder Baugruppendaten importieren; unterstützt gängige 3D-Formate wie STEP und IGES.",
      },
      {
        tag: "MT-04 · MT-05",
        title: "Rohreigenschaften & Schnittvorbereitung",
        text: "Rohrtyp, Material, Abmessung, Länge und Wandstärke festlegen; Durchdringungen, Bohrungen und Endschnitte für die Bearbeitung vorbereiten.",
      },
      {
        tag: "MT-06 · MT-07",
        title: "Übergabe an cncKad & Nesting",
        text: "Rohrdaten gehen zur Bearbeitungsvorbereitung an cncKad; arbeitet mit AutoNest für Materialoptimierung und Nesting von Rohren.",
      },
    ],
    flowTitle: "Vom 3D-Rohrteil zum Schneidprogramm",
    flow: [
      { title: "Modellieren / Importieren", text: "3D-Rohrteile erstellen oder CAD-Baugruppen importieren" },
      { title: "Datenaufbereitung", text: "Eigenschaften festlegen, Durchdringungen und Endschnitte bearbeiten" },
      { title: "Verschachteln & Optimieren", text: "Rohrmaterialeinsatz mit AutoNest optimieren" },
      { title: "NC-Ausgabe", text: "Programme per Postprozessor für die Zielmaschinen erzeugen" },
    ],
    extras: [
      {
        title: "Biegeschneiden von Rechteckrohren",
        text: "Exklusiv in MTube: erzeugt Schneidbahnen zum anschließenden Biegen von Rechteckrohren und deckt typische Rechteckrohr-Anwendungen ab.",
      },
      {
        title: "Berichte & Programmausgabe",
        text: "Gibt die für die Rohrbearbeitung nötigen Grafiken und Prozessinformationen aus; erzeugt Programme direkt über Postprozessoren für die Ziel-Rohrschneidmaschinen.",
      },
    ],
  },
  nesting: {
    eyebrow: "AutoNesting Pro · Erweitertes Nesting",
    title: "AutoNesting Pro Erweitertes Nesting",
    lead:
      "Eine automatische Echtform-Nesting-Engine: automatisches Verschachteln ganzer Auftragsstapel, Optimierung über mehrere Tafeln und vollständiges Lebenszyklus-Management von Restblechen — Materialausnutzung, die man sieht.",
    groups: [
      {
        title: "Intelligente Nesting-Engine",
        items: [
          "Stapelimport von Teilen / Auftragsaufgaben",
          "Echtform- + Rechteck-Nesting",
          "Mehrtafel-Layout, Auswahl mehrerer Tafelformate",
          "Kleine Teile füllen Ausschnitte großer Teile",
          "Neuoptimierung und Vergleich der Ausnutzung",
          "Planung nach Liefertermin / Auftragspriorität",
        ],
      },
      {
        title: "Material- & Restblechverwaltung",
        items: [
          "Automatische Restblecherzeugung, Verwaltung unregelmäßiger Reste",
          "Restbleche werden in Folgeaufträgen zuerst genutzt",
          "Dynamische Common Lines, weniger Einstiche",
          "Statistiken zu Ausnutzung / Ausschussquote",
          "Berichte zu Tafelanzahl und Gewichtsverbrauch",
          "Aufgaben automatisch nach Material & Dicke gruppiert",
        ],
      },
      {
        title: "Ausgabe & Systemintegration",
        items: [
          "NC-Programme für jede Maschine mit einem Klick",
          "Nesting-Zeichnungen / Teilelisten / Restblechlisten",
          "Ergebnisse zurück an JobTrack / ERP / MES",
          "Gemeinsame Prozessparameter mit cncKad",
          "Prozessvorgaben: Drehung / Walzrichtung / Abstand",
          "Manuelle Anpassung: verschieben / drehen / neu verschachteln",
        ],
      },
    ],
    exclusive: {
      title: "Exklusive Funktionen von AutoNest Pro",
      text: "Leistungsstarkes, hocheffizientes Array-Nesting für Stanze und Laser mit Echtzeit-Array-Simulation; Smart Cut passt Anschnitte intelligent an und fügt Stege hinzu; SubNest für sichere Bearbeitung.",
    },
    proven: {
      title: "Von Kunden bestätigt",
      text: "„Hervorragende Nesting-Engine, minimaler Verschnitt“ — bestätigt von Anwendern weltweit: Das Nesting-Ergebnis bestimmt direkt die Blechkosten, und Metalix lässt jeden Millimeter zählen.",
    },
    kpis: [
      { value: "100K+", label: "Teile mühelos verschachtelt", text: "Große Aufträge ohne Aufwand" },
      { value: "Ausnutzung ↑", label: "Echtform-Nesting + Restblechnutzung", text: "Blechkosten direkt gesenkt" },
      { value: "Vollautomatisch", label: "Stapel importieren, Nesting erhalten", text: "Menschen kümmern sich nur um Ausnahmen" },
    ],
    note: "Mischprozess-Nesting für Laser / Plasma / Autogen / Stanze — ein Lauf plant mehrere Maschinen",
    demo: {
      title: "Selbst verschachteln",
      rect: "Rechteckig",
      true: "Echtform",
      run: "Nesting starten",
      utilization: "Tafelausnutzung",
      parts: "Platzierte Teile",
    },
  },
  estimation: {
    eyebrow: "Estimation · Kalkulation",
    title: "Estimation Intelligente Kalkulation / Kostenanalyse",
    lead:
      "Kostenkalkulation auf Basis realer Werkzeugwege: Material, Arbeit, Einstiche und Energie auf einmal berechnet — eine solide Grundlage für Angebote, Auftragsprüfung und Kapazitätsbewertung. Schluss mit Preisen nach Bauchgefühl.",
    factors: [
      { title: "Materialkosten", text: "Ermittelt aus Material, Dicke, Abmessung, Gewicht und Stückpreis — inklusive Bewertung genutzter Restbleche." },
      { title: "Bearbeitungszeit", text: "Reale Maschinenstunden aus Maschinengeschwindigkeit, Weglänge und Prozessparametern." },
      { title: "Einstiche & Schnittlänge", text: "Anzahl der Einstiche, Schnittlänge und Leerwege fließen ins Kostenmodell ein — der Vorteil von Common Lines wird direkt sichtbar." },
      { title: "Energie & Gase", text: "Schätzt Strom, Lasergas und weitere Verbrauchsmaterialien aus den Prozessparametern." },
      { title: "Biegeaufwand", text: "Schätzt Biegezeit und Arbeitskosten aus Biegefolgen, Werkzeugen und Prozessbedingungen." },
      { title: "Angebotsvorlagen & Auftragsprüfung", text: "Gibt Angebote im Format Ihrer Kunden aus; unterstützt Auftragsentscheidungen, Kostenrechnung und Kapazitätsbewertung mit Daten." },
    ],
    uses: [
      { title: "Schnelle Vertriebsangebote", text: "Zeichnung importieren, Kosten in Minuten — schnelle Reaktion gewinnt Aufträge." },
      { title: "Grundlage für die Auftragsprüfung", text: "Kosten und Stunden kennen, bevor Sie zusagen — verlustbringende Aufträge und Kapazitätskonflikte vermeiden." },
      { title: "Kapazitäts- & Ertragsanalyse", text: "Maschinenauslastung und Deckungsbeitrag je Maschine abschätzen — datenbasiert entscheiden, was Sie annehmen und wie Sie planen." },
    ],
    quote: {
      text: "Schluss mit Schätzungen aus dem Bauch — Stahl-, Arbeits- und Gaskosten für jeden Auftrag, berechnet vom System.",
      by: "Auftragsprüfung · Angebot · Kostenrechnung · Kapazitätsprognose — alles an einem Ort",
    },
    stepsTitle: "Von der Zeichnung zum Angebot in vier Schritten",
    steps: [
      { title: "Modell importieren", text: "Liest 3D-CAD direkt, erkennt Blechmerkmale automatisch" },
      { title: "Kostenberechnung", text: "Material, Arbeit, Einstiche und Energie Position für Position berechnet" },
      { title: "Kapazitätsabgleich", text: "Liefertermine und Engpässe gegen die Maschinenkapazität prüfen" },
      { title: "Angebot ausgeben", text: "Angebote mit einem Klick erzeugen, schnell auf Anfragen reagieren" },
    ],
    demo: {
      title: "So reagiert das Kostenmodell",
      quantity: "Stückzahl",
      thickness: "Dicke",
      material: "Material",
      materials: ["Baustahl", "Edelstahl", "Aluminium"],
      parts: ["Material", "Bearbeitung", "Einstiche", "Energie & Gas", "Biegen"],
      total: "Relative Kosten pro Teil",
    },
  },
  mes: {
    eyebrow: "MES · Mannlose Programmierung / JobTrack",
    title: "MESApp Mannlose Programmierung × JobTrack Fertigungsverfolgung",
    lead:
      "Aufträge rein, Programme raus: vom ERP-Auftragseingang bis zur NC-Programmerzeugung vollautomatisch — Programmierer kümmern sich nur noch um Ausnahmen; JobTrack macht Aufträge, Teile, Materialien und Bearbeitungshistorie zum Datenkapital Ihrer Fabrik.",
    pipeline: {
      title: "Vollautomatische Programmier-Pipeline (auf Basis der Metalix API)",
      steps: [
        "ERP/MES-Aufträge & Zeichnungen empfangen",
        "CAM-Aufgaben automatisch anlegen",
        "Teile & Mengen automatisch laden",
        "Regelbasiertes Auto-Nesting",
        "NC-Programme & Berichte automatisch erzeugen",
        "Ergebnisse an vorgelagerte Systeme zurückmelden",
      ],
      note: "Für regelbasierte Produkte gibt es die parametrische Programmierung: Parameter eingeben, Programme erhalten — ideal für Türen, Aufzüge, Stromschienen, Lüftungstechnik und ähnliche Branchen.",
    },
    tracking: {
      title: "Fertigungsdaten verfolgen",
      items: [
        "Teiledatensätze: Stammdaten & Bearbeitungshistorie",
        "Auftragsdatensätze: Aufgaben, Mengen, Status",
        "Sub-Nest-Datensätze: Ergebnisse der Tafelnutzung",
        "Materialverbrauch: Restbleche, Fläche, Ausnutzung",
        "Fertigungshistorie: Suche nach Teil & Aufgabe",
        "Statusverfolgung: nach Auftrag / Teil / Aufgabe",
      ],
    },
    stats: {
      title: "Statistik & Rückverfolgbarkeit",
      items: [
        "Filtern nach Datum, Kunde, Material, Dicke",
        "Materialausnutzung / Maschinenauslastung / Auftragsvolumen",
        "Datenexport für Schnittstellen und Berichte",
        "Zentrale Datenbank, Mehrbenutzerbetrieb",
        "Kombiniert mit Berechtigungen und Backup-Richtlinien",
        "Eine Datenbasis für kontinuierliche Verbesserung",
      ],
    },
    reports: {
      title: "Berichtszentrale · Ein Vorlagensatz für den gesamten Prozess",
      items: [
        "Teile-Bearbeitungsberichte",
        "Nesting- & Ausnutzungsberichte",
        "NC-Programmlisten",
        "Materialverbrauchsberichte",
        "Biege-Arbeitsanweisungen",
        "Rohrbearbeitungsberichte",
        "Fertigungsverfolgungsberichte",
        "Eigene Vorlagen in Ihrem Format",
      ],
    },
    master: {
      title: "Zentrale Stammdatenbank der Fabrik",
      text: "Teile / Tafeln / Restbleche / Maschinen / Werkzeuge / Matrizen / Technologietabellen / Berichtsvorlagen zentral verwaltet — mehrbenutzerfähig, rechtegesteuert und backupfähig: die Datenbasis der smarten Fabrik.",
    },
    benefitsTitle: "Drei Vorteile der mannlosen Fertigung",
    benefits: [
      { title: "Keine Programmier-Überstunden mehr", text: "Aufträge rein, Programme raus — Programmierer kümmern sich nur um Ausnahmen" },
      { title: "Lückenlos rückverfolgbar", text: "Aufträge, Teile, Materialien und Bearbeitungshistorie vollständig erfasst" },
      { title: "Daten als Kapital", text: "Prozesswissen sammelt sich an und wird wiederverwendet — neue Mitarbeiter sind schnell produktiv" },
    ],
    before: "Vorher: Programme stauen sich bei den Ingenieuren, Maschinen warten ungenutzt auf NC-Programme",
    after: "Nachher: Aufträge rein, Programme raus — die Maschinen laufen wirklich durch",
    kpi: { value: "-90%", label: "Wartezeit auf Programme" },
    toggle: ["Vorher", "Nachher"],
    machinesLabel: ["Laser 1", "Laser 2", "Stanze", "Abkantpresse"],
    idle: "Stillstand — wartet auf NC",
  },
  erp: {
    eyebrow: "ERP / MES / API · Systemintegration",
    title: "Tiefe ERP- / MES- / API-Integration",
    lead:
      "Als CAM-Drehscheibe der smarten Fabrik übernimmt Metalix Aufträge und Daten aus dem vorgelagerten ERP/MES und steuert nachgelagert Maschinen und Werkstatt — der bidirektionale Datenfluss verbindet Planungs- und Ausführungsebene, mit SAP- und weiteren Integrationen bei Unternehmen weltweit.",
    receive: {
      title: "Empfangen · ERP → Metalix",
      items: [
        "Materialstammdaten / Stücklistenstrukturen",
        "Kunden- und Fertigungsaufträge",
        "Zeichnungspfade, Versionen & Eigenschaften",
        "Tafel- & Restblechbestände nach Charge",
        "Arbeitsgänge, Liefertermine & Prioritäten",
      ],
    },
    writeBack: {
      title: "Rückmelden · Metalix → ERP/MES",
      items: [
        "Nesting-Ergebnisse / Ausnutzung / Layouts",
        "Namen, Pfade & Versionen der NC-Programme",
        "Materialverbrauch & erzeugte Restbleche",
        "Bearbeitungszeit / Einstiche / Schnittlänge",
        "Werkstattrückmeldung, Fertigmeldung & Ausnahmen",
      ],
    },
    hub: "Metalix CAM-Drehscheibe",
    shopFloor: "Maschinen & Werkstatt",
    methods: {
      title: "Sechs Schnittstellenarten für jede IT-Umgebung",
      items: [
        "Dateiaustausch per CSV / TXT / XML / JSON",
        "Datenbank-Zwischentabellen oder Views",
        "REST-API-Echtzeitschnittstelle",
        "Web Service (SOAP)",
        "Metalix API für tiefe Automatisierung & parametrische Programmierung",
        "Branchen-Apps (Türen / Aufzüge / Lüftung / Stromschienen / Rohre)",
      ],
    },
    cadLink: {
      title: "Nahtlose Anbindung an CAD / Elektrokonstruktion (CAD Link)",
      text: "Übernimmt die richtigen Material-, Dicken- und Biegeparameter mit wenigen Klicks",
    },
    proven: {
      title: "Weltweit bewährte Integrationen",
      text: "Schneider Electric hat cncKad in SAP ERP integriert; viele Unternehmen haben Verzögerungen in der Auftragsplanung durch CSV- / Datenbank-Integration beseitigt, manuelle Fehler reduziert und einen durchgängigen Datenfluss erreicht.",
    },
    fourSteps: {
      title: "Schnittstellen-Einführung in vier Schritten",
      steps: ["Feldzuordnung konzipieren", "Schnittstelle entwickeln", "Gemeinsamer bidirektionaler Test", "Überwachung nach dem Go-live"],
      text: "Ausnahmeprotokolle mit Rückmeldungen zu Materialnachschub und Nacharbeit sorgen für Zuverlässigkeit.",
    },
    openTitle: "Offene Integrationsfähigkeiten",
    open: [
      { title: "REST-API-Schnittstelle", text: "Bidirektionale Aufrufe für Aufträge, Zeichnungen, Programme und Status" },
      { title: "Datenbank & Zwischentabellen", text: "Lose gekoppelte Direktanbindung an ERP / MES, automatischer Datenaustausch" },
      { title: "Automatischer Dateiaustausch", text: "DXF / XML / JSON zeitgesteuert gesendet und empfangen, auch für Altsysteme" },
      { title: "Bewährte Einführungsmethode", text: "SAP- und weitere ERP-Integrationen bei Unternehmen weltweit umgesetzt" },
    ],
  },
  service: {
    eyebrow: "Service · Implementierung vor Ort",
    title: "Gemeinsam Ihre smarte Blechfabrik aufbauen",
    lead:
      "Software ist nur der Anfang. Metalix bietet einen vollständigen Servicekreislauf — von Analyse, Implementierung und Schulung bis zum After-Sales-Support —, damit jedes System in Ihrer Werkstatt wirklich Wirkung zeigt.",
    pathTitle: "Standard-Implementierungspfad",
    path: [
      "Analyse vor dem Kauf",
      "Lösungskonfiguration",
      "Softwareinstallation",
      "Postprozessoren & Validierung mit Musterteilen",
      "Einrichtung der Prozessparameter",
      "Schnittstellenentwicklung & gemeinsamer Test",
      "Anwenderschulung",
      "Begleitung des Probebetriebs",
      "Kontinuierliche Optimierung & After-Sales-Support",
    ],
    cards: [
      {
        title: "Lokale Implementierung",
        text: "Postprozessoren und Parameter werden für Ihre Maschinenmarken, Steuerungen und Arbeitsweisen konfiguriert; Übergabe nach Validierung mit Musterteilen.",
      },
      {
        title: "Individuelle Entwicklung",
        text: "Offene API + maßgeschneiderte Lösungen: parametrische Apps, automatisierte Workflows und Branchenwerkzeuge, schnell auf Ihre Anforderungen weiterentwickelt.",
      },
      {
        title: "Schulung & After-Sales",
        text: "Gestufte Schulungen für Programmierung, Prozess, Werkstatt und IT; Fernsupport, Unterstützung bei Upgrades und laufende Anwendungsoptimierung.",
      },
    ],
    contact: {
      title: "METALIX Büro China",
      company: "Shanghai Hymore Mechanical & Electrical Equipment Co., Ltd.",
      telLabel: "Tel.",
      emailLabel: "E-Mail",
      wechat: "Scannen und uns auf WeChat folgen",
      web: "metalix.net besuchen",
    },
  },
  footer: {
    line: "Digitale Lösungen für die smarte Blechfabrik",
    demo: "Interaktive Ausgabe der Metalix-Broschüre „Smarte Blechfabrik“.",
    views: "Aufrufe",
    unique: "Eindeutige Besucher",
  },
};

export default de;
