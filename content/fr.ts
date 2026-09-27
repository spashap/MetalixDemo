import type { Dict } from "./en";

const fr: Dict = {
  meta: {
    title: "Metalix — Du dessin à la pièce finie",
    description:
      "Le système de CFAO tôlerie leader mondial : imbrication, découpe, poinçonnage, pliage, robotique et intégration ERP/MES pour l’usine de tôlerie intelligente.",
  },
  ui: {
    tagline: "La CFAO qui parle votre langue",
    brandLine: "Solutions de CFAO pour la tôlerie",
    language: "Langue",
    explore: "Explorer",
    close: "Fermer",
    contact: "Contact",
    scroll: "Faites défiler pour explorer",
    section: "Section",
    play: "Lecture",
    pause: "Pause",
    replay: "Rejouer",
    illustrative: "Animation illustrative — pas de données mesurées",
    shortcut: "Appuyez sur / pour aller n’importe où",
    backToTop: "Haut de page",
  },
  nav: {
    hero: "Accueil",
    about: "À propos",
    factory: "Usine intelligente",
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
    hero: "Du dessin à la pièce finie",
    about: "Plus de 30 000 clients dans plus de 100 pays",
    factory: "Un seul flux de données, de la commande à la livraison",
    cnckad: "Programmation poinçonnage & découpe",
    mbend: "Programmation & simulation de pliage",
    mrobot: "Programmation hors ligne de cellules de pliage robotisées",
    mtube: "Conception & programmation de tubes",
    nesting: "Imbrication avancée en forme réelle",
    estimation: "Chiffrage à partir des trajectoires réelles",
    mes: "Programmation sans opérateur & suivi",
    erp: "Intégration système approfondie",
    service: "Déploiement & support locaux",
  },
  hero: {
    eyebrow: ["Usine de tôlerie intelligente", "Solutions numériques intégrées"],
    title: ["Du dessin", "à la pièce finie"],
    lead:
      "Le système de CFAO tôlerie leader mondial, couvrant l’imbrication, la découpe, le poinçonnage, le pliage, la robotique et l’intégration à la gestion — pour aider les usines à améliorer l’utilisation matière et à réduire les temps de programmation et de production.",
    cta: "Explorer la plateforme",
    cta2: "Suivre le flux de données",
    hud: ["Imbrication", "Découpe", "Poinçonnage", "Pliage"],
  },
  about: {
    eyebrow: "À propos de Metalix",
    title: "À propos de Metalix",
    lead:
      "Metalix est un fournisseur de premier plan de systèmes de CFAO pour l’industrie de la tôlerie, avec des solutions complètes de découpe, de poinçonnage et de pliage : import de plans 3D/2D, imbrication haute productivité, simulation CN graphique et calcul des coûts — pour aider les usines du monde entier à réduire sans cesse les temps de production et les chutes de matière.",
    stats: [
      { value: "100+", label: "Pays et régions", text: "Des clients sur tous les continents" },
      { value: "30000+", label: "Clients dans le monde", text: "Un parc installé en croissance continue" },
      { value: "Toutes", label: "Les grandes machines compatibles", text: "Passez de l’une à l’autre sur une seule plateforme" },
      { value: "5 étoiles", label: "Réputation formation & service", text: "Déploiement et support locaux" },
    ],
    quote: {
      text: "Excellent moteur d’imbrication — forte utilisation matière et chutes minimales.",
      by: "METALFORMERS · Client international vérifié",
    },
    whyTitle: "Pourquoi choisir Metalix",
    why: [
      {
        title: "Une solution tout-en-un",
        text: "De l’import de conception 3D/2D à l’imbrication, de la programmation découpe/poinçonnage au pliage et au reporting — tout dans l’écosystème Metalix, édité dans une seule fenêtre de CFAO.",
      },
      {
        title: "Optimisé pour vos machines",
        text: "Temps de découpe le plus court, usure minimale des outils de poinçonnage avec la meilleure utilisation matière, réglages d’outils de pliage optimaux — tout le potentiel de vos équipements.",
      },
      {
        title: "Simple à apprendre · Rapide à démarrer",
        text: "Les nouveaux opérateurs programment après seulement quelques heures de formation ; les fonctions automatiques multiplient par plus de 3 la qualité et la vitesse de poinçonnage, et gèrent sans effort plus de 100 000 pièces imbriquées.",
      },
      {
        title: "Intégration ouverte · Un investissement protégé",
        text: "API ouverte et complète avec connexion ERP CSV/SAP ; CAD Link relie en toute fluidité Creo, SOLIDWORKS, Tekla, Inventor, AutoCAD et EPLAN.",
      },
    ],
    machinesTitle: "Compatible avec tous les grands types de machines",
    machines: [
      "Laser",
      "Poinçonneuse CN",
      "Plasma",
      "Oxycoupage",
      "Jet d’eau",
      "Combinée poinçonnage-laser",
      "Combinée poinçonnage-cisaillage",
      "Ligne de découpe en bobine",
      "Poinçonnage & pliage de barres",
      "Perceuses-fraiseuses",
    ],
  },
  factory: {
    eyebrow: "Usine de tôlerie intelligente",
    title: "Usine de tôlerie intelligente · Un seul flux de données",
    lead:
      "Un plan entre dans Metalix et tout le processus devient numérique : commandes, programmation, usinage et suivi circulent automatiquement entre l’ERP/MES et les machines de l’atelier, bouclant la boucle de la conception à la livraison.",
    steps: [
      {
        title: "Import des commandes et des plans",
        text: "Les commandes arrivent automatiquement de l’ERP/MES ; les plans STEP/IGES et DXF/DWG s’importent en un clic via CAD Link, avec matière, épaisseur et paramètres de pliage.",
      },
      {
        title: "Imbrication intelligente",
        text: "AutoNest Pro imbrique automatiquement en forme réelle avec découpe en ligne commune, remplissage pièce-dans-pièce et réemploi des chutes — pour tirer le maximum de chaque tôle.",
      },
      {
        title: "Programmation découpe & poinçonnage",
        text: "cncKad couvre laser, plasma, oxycoupage, jet d’eau, poinçonneuses et machines combinées ; après la simulation CN graphique, les programmes partent directement vers les machines via DNC.",
      },
      {
        title: "Chiffrage intelligent",
        text: "Estimation calcule en quelques secondes les coûts matière, main-d’œuvre et énergie à partir des trajectoires réelles — pour chiffrer en toute confiance.",
      },
      {
        title: "Pliage & robotique",
        text: "MBend génère automatiquement les séquences de pliage et les montages d’outils ; MRobot programme les cellules de pliage robotisées avec simulation complète de la manipulation, du pliage et de la palettisation.",
      },
      {
        title: "Suivi & remontée",
        text: "JobTrack suit commandes, pièces et consommation matière ; résultats d’imbrication, informations CN et temps d’usinage remontent automatiquement vers l’ERP/MES.",
      },
    ],
    kpis: [
      { title: "Utilisation matière ↑", text: "Imbrication en forme réelle + lignes communes + réemploi des chutes" },
      { title: "Temps de programmation ↓", text: "Programmation automatique + simulation graphique" },
      { title: "Zéro rupture de données", text: "CAO → FAO → ERP/MES entièrement connectés" },
    ],
    flow: [
      { title: "Commande ERP/MES", text: "Réception des commandes & import des plans · Un clic via CAD Link" },
      { title: "Découpe laser / poinçonnage", text: "Programmation automatique cncKad · CN directement à la machine" },
      { title: "Pliage sur presse plieuse", text: "Simulation de séquence MBend · Pièce finie prête à expédier" },
    ],
  },
  cnckad: {
    eyebrow: "cncKad · Programmation poinçonnage / découpe",
    title: "cncKad, plateforme de programmation poinçonnage & découpe",
    lead:
      "La plateforme centrale de CFAO tôlerie 2D : dessin, import, paramétrage du procédé, génération et simulation CN dans une seule fenêtre — pour machines laser, plasma, oxycoupage, jet d’eau, poinçonneuses, combinées et cisailles.",
    media: ["Poinçonnage CN", "Découpe laser"],
    groups: [
      {
        title: "Couverture complète des procédés",
        items: [
          "Programmation laser / plasma / oxycoupage / jet d’eau",
          "Poinçonnage CN et usinage combiné poinçonnage-laser",
          "Tables technologiques par matière et épaisseur",
          "Optimisation de l’ordre de découpe et des déplacements",
          "Chanfreinage / extensions avancées 5 axes",
          "Marquage, gravure et identifiants auxiliaires",
        ],
      },
      {
        title: "Préparation des pièces en CAO",
        items: [
          "Dessin 2D et édition géométrique",
          "Import de plans DXF / DWG",
          "Calques découpe / marquage / construction",
          "Contrôle des contours : lignes ouvertes, doublons",
          "Nettoyage et réparation de la géométrie",
          "Propriétés des pièces : nom / matière / épaisseur",
        ],
      },
      {
        title: "Fonctions spécifiques au poinçonnage",
        items: [
          "Bibliothèque d’outils / gestion des stations de tourelle",
          "Implantation d’outils automatique et manuelle",
          "Grignotage des longues rainures et des contours",
          "Persiennes / fraisures / emboutis",
          "Évitement des pinces et repositionnement",
          "Usinage multi-procédés par couches",
        ],
      },
    ],
    oneStep: {
      title: "Du plan au programme CN en une seule étape",
      items: [
        "Formats de programme par directeur de commande",
        "Simulation CN graphique des trajectoires",
        "Contrôle des risques de collision et de procédé",
        "Transfert des programmes par DNC / dossier partagé",
        "Rapports d’usinage et modèles personnalisés",
      ],
    },
    kpis: [
      { value: "3×", label: "Qualité & vitesse de poinçonnage ×3", text: "Grâce à la programmation automatique" },
      { value: "Heures", label: "Pour que les débutants programment", text: "Une prise en main facile" },
      { value: "Semaines", label: "Retour sur investissement prouvé", text: "Laser Mitsubishi + cncKad" },
    ],
    note: "La bibliothèque de post-processeurs cncKad couvre les principales poinçonneuses et machines de découpe laser, plasma et oxycoupage",
    demo: {
      title: "Simulation de trajectoire",
      laser: "Laser",
      punch: "Poinçon",
      readout: ["Contour", "Frappes", "Amorce"],
      tool: "Outil",
      leads: ["Arc", "Droite"],
      tools: ["Rond Ø14", "Carré 14", "Rectangulaire 30×8"],
    },
  },
  mbend: {
    eyebrow: "MBend · Programmation de pliage CN",
    title: "MBend, programmation & simulation de pliage",
    lead:
      "Programmation hors ligne des presses plieuses CN : calcul automatique de la séquence de pliage, choix des outils et positionnement des butées, simulation dynamique 3D complète, collisions résolues à l’avance — des programmes et instructions de travail directement exécutables par la machine.",
    mediaCaption: "MBend · Simulation de pliage 3D",
    groups: [
      {
        title: "Import 3D & dépliage",
        items: [
          "Import de pièces 3D STEP / IGES",
          "Développés 2D avec définition des plis",
          "CAD Link vers les principaux logiciels de CAO",
          "Dépliage selon l’épaisseur et les paramètres matière",
          "Détection des lignes et propriétés de pliage",
          "Données pièces partagées avec cncKad",
        ],
      },
      {
        title: "Planification automatique du procédé",
        items: [
          "Bibliothèques de poinçons / matrices / montages",
          "Choix automatique des outils selon le procédé",
          "Calcul automatique de la séquence de pliage",
          "Positionnement et ajustement automatiques des butées",
          "Mouvements de dégagement et de retrait calculés",
          "Séquences ajustables manuellement",
        ],
      },
      {
        title: "Simulation & sortie",
        items: [
          "Simulation dynamique 3D du pliage",
          "Contrôle des collisions pièce / outil / butée",
          "Génération des programmes CN de presse plieuse",
          "Édition des instructions de pliage",
          "Traitement par lots de plusieurs pièces",
          "Tables de compensation & montages multiples",
        ],
      },
    ],
    banner: {
      title: "Plier au bureau des méthodes, produire sur la machine",
      text: "Fini les essais qui immobilisent la machine — séquence, outils, butées et collisions sont validés hors ligne, ce qui réduit fortement le temps de changement pour les nouveaux produits.",
    },
    kpis: [
      { value: "Automatique", text: "Séquence de pliage & choix des outils · Calculés automatiquement, ajustables à la main" },
      { value: "3D", text: "Simulation dynamique de tout le procédé · Risques de collision résolus à l’avance" },
      { value: "Par lots", text: "Plusieurs pièces traitées à la suite · Instructions de travail éditées en parallèle" },
    ],
    coreTitle: "Fonctions clés de pliage",
    core: [
      { title: "Séquençage automatique des plis", text: "Étapes d’outillage planifiées automatiquement selon la géométrie et les interférences" },
      { title: "Choix automatique des outils & butées", text: "Sélection intelligente dans la bibliothèque d’outils de la machine, moins de tâtonnements" },
      { title: "Simulation dynamique 3D", text: "Tout le mouvement de pliage simulé, collisions résolues en amont" },
      { title: "Compensation du retour élastique", text: "Tables de pliage et paramètres de compensation gérés de façon centralisée pour une précision stable" },
    ],
    demo: {
      title: "Séquence de pliage — en 3D",
      hint: "Glissez pour pivoter · choisissez un pli",
      bend: "Pli",
      flat: "À plat",
      done: "Pièce finie",
    },
  },
  mrobot: {
    eyebrow: "MRobot · Cellule de pliage robotisée",
    title: "MRobot, programmation hors ligne du pliage robotisé",
    lead:
      "Programmation et simulation des cellules de pliage robotisées : définir l’implantation de la cellule, calculer les plans de préhension, générer des programmes coordonnés robot et presse plieuse — toute la cellule tourne d’abord en virtuel.",
    groups: [
      {
        title: "Configuration de la cellule",
        items: [
          "Robot / presse plieuse / préhenseur / palette",
          "Composants des équipements périphériques",
          "L’environnement hors ligne reproduit l’implantation réelle",
          "Préhension par ventouses, pinces ou mixte",
          "Lien avec les plans de pliage MBend",
          "Assistance à l’étalonnage de la cellule",
        ],
      },
      {
        title: "Trajectoires & simulation",
        items: [
          "Points et modes de préhension calculés automatiquement",
          "Trajectoires de prise / chargement / pliage / retournement",
          "Règles de palette de sortie et d’empilage",
          "Simulation des mouvements robot / pièce / machine",
          "Vérification des interférences et collisions",
          "Programmes coordonnés en un clic",
        ],
      },
      {
        title: "Valeur prouvée",
        items: [
          "Étalonnage de cellule breveté, rapide et simple",
          "Calcul automatique de la préhension et des trajectoires",
          "Temps et coût de programmation fortement réduits",
          "Validé sur des cellules Trumpf+Kuka",
          "Références : Durma+Yaskawa",
          "Mise en service et réglage sur site",
        ],
      },
    ],
    kpis: [
      { title: "Pliage sans opérateur", text: "Prise, pliage, retournement, palettisation — entièrement programmés" },
      { title: "Coût de programmation ↓", text: "La programmation hors ligne n’immobilise pas le robot" },
      { title: "Retour rapide", text: "Les clients amortissent vite leur cellule — démontré en pratique" },
    ],
    stepsTitle: "Une cellule de pliage robotisée opérationnelle en quatre étapes",
    steps: [
      { title: "Définir l’implantation", text: "Placer robot et presse plieuse dans un environnement virtuel" },
      { title: "Calculer la préhension", text: "Choix du préhenseur et positions de prise planifiés automatiquement" },
      { title: "Simuler tout le procédé", text: "Contrôle des interférences et du temps de cycle pour révéler les risques tôt" },
      { title: "Déployer les programmes", text: "Programmes coordonnés robot et presse plieuse en un clic" },
    ],
  },
  mtube: {
    eyebrow: "MTube · Découpe de tubes intelligente",
    title: "MTube, conception & programmation de tubes",
    lead:
      "MTube couvre la conception de pièces tubulaires, l’import de modèles de tubes, la préparation des données et tout le flux logiciel de découpe de tubes : créez facilement des tubes 3D, importez plans et assemblages STEP, IGES et autres formats depuis Inventor, SOLIDWORKS, Creo et plus — sans logiciel de conception supplémentaire, jusqu’au programme de découpe.",
    media: ["MTube · Conception de tube 3D", "cncKad · Simulation de découpe de tube"],
    compareHint: "Glissez pour comparer conception et simulation de découpe",
    cards: [
      {
        tag: "MT-01 · MT-03",
        title: "Modélisation 3D & import",
        text: "Créer et modifier des tubes 3D ; importer des modèles de tubes ou des assemblages externes ; prise en charge des formats 3D courants comme STEP et IGES.",
      },
      {
        tag: "MT-04 · MT-05",
        title: "Propriétés du tube & préparation de coupe",
        text: "Définir type de tube, matière, section, longueur et épaisseur de paroi ; préparer intersections, perçages et coupes d’extrémité pour l’usinage.",
      },
      {
        tag: "MT-06 · MT-07",
        title: "Vers cncKad & l’imbrication",
        text: "Les données tube passent à cncKad pour la préparation de l’usinage ; fonctionne avec AutoNest pour optimiser et imbriquer la matière tube.",
      },
    ],
    flowTitle: "Du tube 3D au programme de découpe",
    flow: [
      { title: "Modéliser / importer", text: "Créer des tubes 3D ou importer des assemblages CAO" },
      { title: "Préparer les données", text: "Définir les propriétés, traiter intersections et coupes d’extrémité" },
      { title: "Imbriquer & optimiser", text: "Optimiser l’usage de la matière tube avec AutoNest" },
      { title: "Sortie CN", text: "Post-traiter les programmes pour les machines cibles" },
    ],
    extras: [
      {
        title: "Découpe pour pliage de tubes rectangulaires",
        text: "Exclusivité MTube : génère les trajectoires de découpe en vue du pliage des tubes rectangulaires, pour les cas d’usage typiques.",
      },
      {
        title: "Rapports & sortie programmes",
        text: "Fournit les graphiques et informations de procédé nécessaires à l’usinage des tubes ; génère directement les programmes via post-processeurs pour les machines de découpe de tubes cibles.",
      },
    ],
  },
  nesting: {
    eyebrow: "AutoNesting Pro · Imbrication avancée",
    title: "AutoNesting Pro, imbrication avancée",
    lead:
      "Un moteur d’imbrication automatique en forme réelle : imbrication automatique de lots de commandes, optimisation multi-tôles et gestion complète du cycle de vie des chutes — une utilisation matière visible.",
    groups: [
      {
        title: "Moteur d’imbrication intelligent",
        items: [
          "Import de pièces par lots / import de tâches de commande",
          "Imbrication en forme réelle + rectangulaire",
          "Placement multi-tôles, choix de formats multiples",
          "Petites pièces placées dans les ajours des grandes",
          "Réoptimisation et comparaison des taux d’utilisation",
          "Planification par date de livraison / priorité",
        ],
      },
      {
        title: "Gestion matière & chutes",
        items: [
          "Création automatique des chutes, gestion des chutes irrégulières",
          "Les chutes sont réutilisées en priorité ensuite",
          "Lignes communes dynamiques, moins de perçages",
          "Statistiques d’utilisation / taux de rebut",
          "Rapports de consommation en nombre de tôles et en poids",
          "Tâches regroupées automatiquement par matière et épaisseur",
        ],
      },
      {
        title: "Sorties & intégration système",
        items: [
          "Programmes CN en un clic pour chaque machine",
          "Plans d’imbrication / listes de pièces / listes de chutes",
          "Résultats remontés vers JobTrack / ERP / MES",
          "Paramètres de procédé partagés avec cncKad",
          "Contraintes : rotation / sens de laminage / espacement",
          "Ajustement manuel : déplacer / pivoter / réimbriquer",
        ],
      },
    ],
    exclusive: {
      title: "Fonctions exclusives d’AutoNest Pro",
      text: "Imbrication en réseau puissante et efficace pour poinçonnage/laser, avec simulation en temps réel ; Smart Cut ajuste intelligemment les amorces et ajoute des micro-attaches ; SubNest pris en charge pour un usinage sûr.",
    },
    proven: {
      title: "Plébiscité par les clients",
      text: "« Superbe moteur d’imbrication, chutes minimales » — confirmé par des utilisateurs du monde entier : le résultat d’imbrication détermine directement le coût tôle, et Metalix fait compter chaque millimètre.",
    },
    kpis: [
      { value: "100K+", label: "Pièces imbriquées sans effort", text: "Même les gros travaux" },
      { value: "Utilisation ↑", label: "Forme réelle + réemploi des chutes", text: "Coût tôle directement réduit" },
      { value: "Automatique", label: "Importez des lots, obtenez l’imbrication", text: "L’humain ne traite que les exceptions" },
    ],
    note: "Imbrication multi-procédés laser / plasma / oxycoupage / poinçonnage — un seul calcul planifie plusieurs machines",
    demo: {
      title: "Imbriquez vous-même",
      rect: "Rectangulaire",
      true: "Forme réelle",
      run: "Lancer l’imbrication",
      utilization: "Utilisation de la tôle",
      parts: "Pièces placées",
    },
  },
  estimation: {
    eyebrow: "Estimation · Chiffrage",
    title: "Estimation, chiffrage intelligent / analyse des coûts",
    lead:
      "Un chiffrage fondé sur les trajectoires réelles : matière, main-d’œuvre, perçages et énergie calculés d’un coup — une base solide pour les devis, la revue des commandes et l’évaluation de la capacité. Fini les prix au doigt mouillé.",
    factors: [
      { title: "Coût matière", text: "Estimé selon la matière, l’épaisseur, les dimensions, le poids et le prix unitaire, avec valorisation des chutes réutilisées." },
      { title: "Temps d’usinage", text: "Heures machine réelles estimées à partir de la vitesse machine, de la longueur de trajectoire et des paramètres de procédé." },
      { title: "Perçages & longueur de coupe", text: "Nombre de perçages, longueur de coupe et déplacements à vide entrent dans le modèle — le gain des lignes communes apparaît directement." },
      { title: "Énergie & gaz", text: "Estime l’électricité, le gaz laser et les autres consommables à partir des paramètres de procédé." },
      { title: "Main-d’œuvre de pliage", text: "Estime le temps et le coût de pliage à partir des séquences, des outils et des conditions de procédé." },
      { title: "Modèles de devis & revue des commandes", text: "Édite les devis au format de vos clients ; appuie par les données les décisions de commande, la comptabilité analytique et l’évaluation de la capacité." },
    ],
    uses: [
      { title: "Devis commerciaux rapides", text: "Importez un plan, obtenez les coûts en quelques minutes — la réactivité commerciale fait gagner les commandes." },
      { title: "Base de revue des commandes", text: "Connaître coûts et heures avant d’accepter — évitez les commandes à perte et les conflits de capacité." },
      { title: "Analyse capacité & marge", text: "Estimez la charge et la marge brute par machine — décidez avec des données quoi accepter et comment planifier." },
    ],
    quote: {
      text: "Fini les estimations au jugé — coûts d’acier, de main-d’œuvre et de gaz pour chaque commande, calculés par le système.",
      by: "Revue des commandes · Devis · Comptabilité analytique · Prévision de capacité, au même endroit",
    },
    stepsTitle: "Du plan au devis en quatre étapes",
    steps: [
      { title: "Importer le modèle", text: "Lit directement la CAO 3D, détecte automatiquement les caractéristiques tôlerie" },
      { title: "Calcul des coûts", text: "Matière, main-d’œuvre, perçages et énergie calculés poste par poste" },
      { title: "Lien avec la capacité", text: "Évaluer délais et goulets d’étranglement au regard de la capacité machine" },
      { title: "Éditer le devis", text: "Générer le devis en un clic, répondre vite aux demandes" },
    ],
    demo: {
      title: "Comment réagit le modèle de coût",
      quantity: "Quantité",
      thickness: "Épaisseur",
      material: "Matière",
      materials: ["Acier doux", "Inox", "Aluminium"],
      parts: ["Matière", "Usinage", "Perçages", "Énergie & gaz", "Pliage"],
      total: "Coût relatif par pièce",
    },
  },
  mes: {
    eyebrow: "MES · Programmation sans opérateur / JobTrack",
    title: "MESApp, programmation sans opérateur × JobTrack, suivi de production",
    lead:
      "Les commandes entrent, les programmes sortent : de la réception de commande ERP à la génération des programmes CN, entièrement automatique — les programmeurs ne traitent que les exceptions ; JobTrack transforme commandes, pièces, matières et historique d’usinage en patrimoine de données de votre usine.",
    pipeline: {
      title: "Chaîne de programmation entièrement automatique (propulsée par l’API Metalix)",
      steps: [
        "Recevoir commandes & plans ERP/MES",
        "Créer automatiquement les tâches FAO",
        "Charger automatiquement pièces & quantités",
        "Imbrication automatique par règles",
        "Générer automatiquement CN & rapports",
        "Remonter les résultats aux systèmes amont",
      ],
      note: "Pour les produits régis par des règles, la programmation paramétrique est disponible : saisissez les paramètres, obtenez les programmes — idéal pour les portes, ascenseurs, barres de distribution, CVC et secteurs similaires.",
    },
    tracking: {
      title: "Suivi des données de production",
      items: [
        "Fiches pièces : informations de base & historique d’usinage",
        "Fiches commandes : tâches, quantités, statut",
        "Fiches sous-imbrications : utilisation des tôles",
        "Consommation matière : chutes, surface, utilisation",
        "Historique de production : recherche par pièce & tâche",
        "Suivi du statut : par commande / pièce / tâche",
      ],
    },
    stats: {
      title: "Statistiques & traçabilité",
      items: [
        "Filtrer par date, client, matière, épaisseur",
        "Utilisation matière / charge machine / volume de tâches",
        "Export des données pour interfaces et rapports",
        "Base de données centrale, partage multi-utilisateur",
        "Associée aux droits d’accès et aux sauvegardes",
        "Un socle de données pour l’amélioration continue",
      ],
    },
    reports: {
      title: "Centre de rapports · Un seul jeu de modèles pour tout le processus",
      items: [
        "Rapports d’usinage des pièces",
        "Rapports d’imbrication & d’utilisation",
        "Listes de programmes CN",
        "Rapports de consommation matière",
        "Instructions de pliage",
        "Rapports d’usinage de tubes",
        "Rapports de suivi de production",
        "Modèles personnalisés à votre format",
      ],
    },
    master: {
      title: "Base de données de référence de l’usine",
      text: "Pièces / tôles / chutes / machines / outils / matrices / tables technologiques / modèles de rapports gérés de façon centralisée — multi-utilisateur, avec droits d’accès et sauvegardes : le socle de données de l’usine intelligente.",
    },
    benefitsTitle: "Trois bénéfices de la production sans opérateur",
    benefits: [
      { title: "Fini les heures sup’ de programmation", text: "Les commandes entrent, les programmes sortent — les programmeurs ne gèrent que les exceptions" },
      { title: "Traçabilité totale", text: "Commandes, pièces, matières et historique d’usinage entièrement enregistrés" },
      { title: "La donnée comme actif", text: "Le savoir-faire s’accumule et se réutilise — les nouveaux arrivants sont vite opérationnels" },
    ],
    before: "Avant : les programmes s’accumulent chez les ingénieurs, les machines attendent la CN à l’arrêt",
    after: "Après : les commandes entrent, les programmes sortent — les machines tournent vraiment en continu",
    kpi: { value: "-90%", label: "Attente de programmation" },
    toggle: ["Avant", "Après"],
    machinesLabel: ["Laser 1", "Laser 2", "Poinçonneuse", "Presse plieuse"],
    idle: "À l’arrêt — attente CN",
  },
  erp: {
    eyebrow: "ERP / MES / API · Intégration système",
    title: "Intégration approfondie ERP / MES / API",
    lead:
      "Pivot FAO de l’usine intelligente, Metalix reçoit commandes et données de l’ERP/MES en amont et pilote les machines et l’atelier en aval — un flux de données bidirectionnel relie planification et exécution, avec des intégrations SAP et autres réalisées dans des entreprises du monde entier.",
    receive: {
      title: "Réception · ERP → Metalix",
      items: [
        "Données articles matière / nomenclatures",
        "Commandes clients & ordres de fabrication",
        "Chemins, versions & propriétés des plans",
        "Stocks de tôles & chutes par lot",
        "Opérations d’usinage, échéances & priorités",
      ],
    },
    writeBack: {
      title: "Remontée · Metalix → ERP/MES",
      items: [
        "Résultats d’imbrication / utilisation / placements",
        "Noms, chemins & versions des programmes CN",
        "Consommation matière & chutes créées",
        "Temps d’usinage / perçages / longueur de coupe",
        "Déclarations atelier, fins d’ordre & anomalies",
      ],
    },
    hub: "Pivot FAO Metalix",
    shopFloor: "Machines & atelier",
    methods: {
      title: "Six méthodes d’interface pour tout environnement informatique",
      items: [
        "Échange de fichiers CSV / TXT / XML / JSON",
        "Tables intermédiaires ou vues de base de données",
        "Interface temps réel par API REST",
        "Service web (SOAP)",
        "API Metalix pour l’automatisation poussée & la programmation paramétrique",
        "Applications métier (portes / ascenseurs / CVC / barres / tubes)",
      ],
    },
    cadLink: {
      title: "Connexion transparente CAO / conception électrique (CAD Link)",
      text: "Récupérez matière, épaisseur et paramètres de pliage justes en quelques clics",
    },
    proven: {
      title: "Des intégrations éprouvées dans le monde entier",
      text: "Schneider Electric a intégré cncKad à SAP ERP ; de nombreuses entreprises ont supprimé les retards de planification grâce à l’intégration CSV / base de données, réduisant les erreurs manuelles et obtenant un flux de données de bout en bout.",
    },
    fourSteps: {
      title: "Mise en place d’interface en quatre étapes",
      steps: ["Conception du mappage des champs", "Développement de l’interface", "Tests bidirectionnels conjoints", "Suivi après mise en production"],
      text: "Des journaux d’anomalies avec retours de réapprovisionnement matière et de reprise garantissent la fiabilité.",
    },
    openTitle: "Capacités d’intégration ouvertes",
    open: [
      { title: "Interface API REST", text: "Appels bidirectionnels pour commandes, plans, programmes et statuts" },
      { title: "Base de données & tables intermédiaires", text: "Connexion directe faiblement couplée à l’ERP / MES, échange automatique" },
      { title: "Échange automatique de fichiers", text: "DXF / XML / JSON envoyés et reçus selon un calendrier, compatible avec l’existant" },
      { title: "Méthode de déploiement éprouvée", text: "Intégrations SAP et autres ERP réalisées dans des entreprises du monde entier" },
    ],
  },
  service: {
    eyebrow: "Service · Déploiement local",
    title: "Construisons ensemble votre usine de tôlerie intelligente",
    lead:
      "Le logiciel n’est qu’un début. Metalix propose un cycle de service complet — audit, déploiement, formation et après-vente — pour que chaque système porte réellement ses fruits dans votre atelier.",
    pathTitle: "Parcours de déploiement standard",
    path: [
      "Audit avant-vente",
      "Configuration de la solution",
      "Installation du logiciel",
      "Post-processeurs & validation sur pièces types",
      "Réglage des paramètres de procédé",
      "Développement d’interfaces & tests conjoints",
      "Formation des utilisateurs",
      "Accompagnement de la marche à blanc",
      "Optimisation continue & support après-vente",
    ],
    cards: [
      {
        title: "Déploiement local",
        text: "Post-processeurs et paramètres configurés pour vos marques de machines, commandes numériques et habitudes de travail ; livrés après validation sur pièces types.",
      },
      {
        title: "Développements sur mesure",
        text: "API ouverte + solutions adaptées : applications paramétriques, flux automatisés et outils métier, itérés rapidement selon vos besoins.",
      },
      {
        title: "Formation & après-vente",
        text: "Formations par niveau pour la programmation, les méthodes, l’atelier et l’informatique ; support à distance, aide aux mises à jour et optimisation continue.",
      },
    ],
    contact: {
      title: "Bureau METALIX Chine",
      company: "Shanghai Hymore Mechanical & Electrical Equipment Co., Ltd.",
      telLabel: "Tél.",
      emailLabel: "E-mail",
      wechat: "Scannez pour nous suivre sur WeChat",
      web: "Visiter metalix.net",
    },
  },
  footer: {
    line: "Solutions numériques pour l’usine de tôlerie intelligente",
    demo: "Édition interactive de la brochure Metalix « Usine de tôlerie intelligente ».",
    views: "Vues",
    unique: "Visiteurs uniques",
  },
};

export default fr;
