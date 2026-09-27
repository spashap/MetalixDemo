// English source text, transcribed from Metalix_SheetMetal_SmartFactory_Brochure_12p_EN.pdf.
// Every other language file must have exactly this shape (enforced by the `Dict` type
// and by scripts/check-i18n.mjs).

const en = {
  meta: {
    title: "Metalix — From One Drawing to a Finished Part",
    description:
      "The world-leading sheet metal CAD/CAM system: nesting, cutting, punching, bending, robotics and ERP/MES integration for the smart sheet metal factory.",
  },
  ui: {
    tagline: "CAD/CAM that speaks your language",
    brandLine: "Sheet Metal CAD/CAM Solutions",
    language: "Language",
    explore: "Explore",
    close: "Close",
    contact: "Contact",
    scroll: "Scroll to explore",
    section: "Section",
    play: "Play",
    pause: "Pause",
    replay: "Replay",
    illustrative: "Illustrative animation — not measured data",
    shortcut: "Press / to jump anywhere",
    backToTop: "Back to top",
  },
  nav: {
    hero: "Start",
    about: "About Metalix",
    factory: "Smart Factory",
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
    hero: "From one drawing to a finished part",
    about: "30000+ customers in 100+ countries",
    factory: "One data flow from order to delivery",
    cnckad: "Punch & cutting programming",
    mbend: "Bending programming & simulation",
    mrobot: "Robotic bending offline programming",
    mtube: "Tube design & programming",
    nesting: "True-shape advanced nesting",
    estimation: "Costing from real toolpaths",
    mes: "Unmanned programming & tracking",
    erp: "Deep system integration",
    service: "Local implementation & support",
  },
  hero: {
    eyebrow: ["Smart Sheet Metal Factory", "Integrated Digital Solutions"],
    title: ["From One Drawing", "to a Finished Part"],
    lead:
      "The world-leading sheet metal CAD/CAM system, covering nesting, cutting, punching, bending, robotics and management integration — helping factories increase material utilization and shorten programming and production time.",
    cta: "Explore the platform",
    cta2: "Follow the data flow",
    hud: ["Nesting", "Cutting", "Punching", "Bending"],
  },
  about: {
    eyebrow: "About Metalix",
    title: "About Metalix",
    lead:
      "Metalix is a leading supplier of CAD/CAM systems for the sheet metal industry, delivering complete solutions for cutting, punching and bending: import 3D/2D drawings, high-productivity nesting, graphical NC simulation and cost calculation — helping factories worldwide continuously reduce production time and material waste.",
    stats: [
      { value: "100+", label: "Countries & Regions", text: "Customers around the globe" },
      { value: "30000+", label: "Customers Worldwide", text: "Installations keep growing" },
      { value: "All Major", label: "Machine Compatibility", text: "Switch easily on one platform" },
      { value: "5-Star", label: "Training & Service Reputation", text: "Localized implementation & support" },
    ],
    quote: {
      text: "Excellent nesting engine — high material utilization and minimal waste.",
      by: "METALFORMERS · Verified Global Customer",
    },
    whyTitle: "Why Choose Metalix",
    why: [
      {
        title: "All-in-One Solution",
        text: "From 3D/2D design import, nesting and cutting/punching programming to bending and reporting — everything inside the Metalix ecosystem, edited in a single CAD/CAM window.",
      },
      {
        title: "Optimized for Your Machines",
        text: "Shortest cutting time, minimal punch wear with the best material utilization, optimal bending tool setups — fully unleashing your equipment's capability.",
      },
      {
        title: "Easy to Learn · Fast to Start",
        text: "New operators program after just a few hours of training; automatic functions boost punch quality and speed by over 3×, handling 100,000+ nested parts with ease.",
      },
      {
        title: "Open Integration · Protecting Your Investment",
        text: "Open full-featured API with CSV/SAP ERP connectivity; CAD Link seamlessly connects Creo, SOLIDWORKS, Tekla, Inventor, AutoCAD and EPLAN.",
      },
    ],
    machinesTitle: "Supports All Major Machine Types",
    machines: [
      "Laser",
      "CNC Punch",
      "Plasma",
      "Flame",
      "Waterjet",
      "Punch-Laser Combo",
      "Punch-Shear Combo",
      "Coil Fed Cutting Line",
      "Busbar Punching & Bending",
      "Drilling-Milling Machines",
    ],
  },
  factory: {
    eyebrow: "Smart Sheet Metal Factory",
    title: "Smart Sheet Metal Factory · One Data Flow",
    lead:
      "One drawing enters Metalix and the entire process goes digital: orders, programming, machining and tracking data flow automatically between ERP/MES and shop-floor machines, closing the loop from design to delivery.",
    steps: [
      {
        title: "Order & Design Import",
        text: "Orders arrive automatically from ERP/MES; STEP/IGES and DXF/DWG drawings import in one click via CAD Link, with material, thickness and bending parameters carried over.",
      },
      {
        title: "Smart Nesting",
        text: "AutoNest Pro nests true shapes automatically with common-line cutting, part-in-hole filling and remnant reuse, squeezing the most out of every sheet.",
      },
      {
        title: "Cutting & Punch Programming",
        text: "cncKad covers laser, plasma, flame, waterjet, punch and combo machines; graphical NC simulation then sends programs straight to the machines via DNC.",
      },
      {
        title: "Smart Costing",
        text: "Estimation calculates material, labor and energy costs in seconds based on real toolpaths — quote with confidence.",
      },
      {
        title: "Bending & Robotics",
        text: "MBend auto-generates bend sequences and tool setups; MRobot programs robotic bending cells with full simulation of part handling, bending and palletizing.",
      },
      {
        title: "Tracking & Write-Back",
        text: "JobTrack tracks orders, parts and material consumption; nesting results, NC info and machining time are written back to ERP/MES automatically.",
      },
    ],
    kpis: [
      { title: "Material Utilization ↑", text: "True-shape nesting + common lines + remnant reuse" },
      { title: "Programming Time ↓", text: "Automatic programming + graphical simulation" },
      { title: "Zero Data Gaps", text: "CAD → CAM → ERP/MES fully connected" },
    ],
    flow: [
      { title: "ERP/MES Order", text: "Order intake & drawing import · One click via CAD Link" },
      { title: "Laser/Punch Cutting", text: "cncKad auto programming · NC straight to the machine" },
      { title: "Press Brake Bending", text: "MBend bend-sequence simulation · Finished part ready to ship" },
    ],
  },
  cnckad: {
    eyebrow: "cncKad · Punch / Cutting Programming",
    title: "cncKad Punch & Cutting Programming Platform",
    lead:
      "The core 2D sheet metal CAD/CAM programming platform: drawing, import, process setup, NC generation and simulation in one window — covering laser, plasma, flame, waterjet, punch, combo and shear machines.",
    media: ["CNC punching", "Laser cutting"],
    groups: [
      {
        title: "Full Process Coverage",
        items: [
          "Laser / plasma / flame / waterjet programming",
          "CNC punch and punch-laser combo machining",
          "Process tables by material & thickness",
          "Cutting sequence and lead travel optimization",
          "Beveling / 5-axis advanced extensions",
          "Marking, engraving and auxiliary IDs",
        ],
      },
      {
        title: "CAD Part Preparation",
        items: [
          "2D drawing and geometry editing",
          "DXF / DWG drawing import",
          "Layers for cutting / marking / construction",
          "Contour checks: open, duplicate lines",
          "Geometry cleanup and repair",
          "Part properties: name / material / thickness",
        ],
      },
      {
        title: "Punch-Specific Capabilities",
        items: [
          "Tool library / turret station management",
          "Automatic and manual tool layout",
          "Nibbling of long slots and contours",
          "Louvers / countersinks / forming",
          "Clamp avoidance and repositioning",
          "Multi-process layered machining",
        ],
      },
    ],
    oneStep: {
      title: "From Drawing to NC in One Step",
      items: [
        "Program formats per machine controller",
        "Graphical NC simulation of toolpaths",
        "Collision and process risk checks",
        "DNC / shared-folder program transfer",
        "Machining reports and custom report templates",
      ],
    },
    kpis: [
      { value: "3×", label: "Punch quality & speed ×3", text: "Powered by automatic programming" },
      { value: "Hours", label: "New operators program after training", text: "Low barrier to start" },
      { value: "Weeks", label: "Proven payback period", text: "Mitsubishi laser + cncKad" },
    ],
    note: "The cncKad post-processor library covers mainstream punch, laser, plasma and flame cutting machines",
    demo: {
      title: "Toolpath simulation",
      laser: "Laser",
      punch: "Punch",
      readout: ["Contour", "Hits", "Lead-in"],
      tool: "Tool",
      leads: ["Arc", "Straight"],
      tools: ["Round Ø14", "Square 14", "Rectangular 30×8"],
    },
  },
  mbend: {
    eyebrow: "MBend · CNC Bending Programming",
    title: "MBend Bending Programming & Simulation",
    lead:
      "Offline programming for CNC press brakes: automatic bend-sequence calculation, tool selection and gauge positioning, full 3D dynamic simulation, collisions resolved in advance — programs and work instructions the machine can run directly.",
    mediaCaption: "MBend · 3D Bending Simulation",
    groups: [
      {
        title: "3D Import & Unfolding",
        items: [
          "STEP / IGES 3D part import",
          "2D flat patterns with bend definitions",
          "CAD Link to mainstream CAD systems",
          "Unfolding by material thickness & parameters",
          "Bend line and bend property detection",
          "Shares part data with cncKad",
        ],
      },
      {
        title: "Automatic Process Planning",
        items: [
          "Punch / die / tool assembly libraries",
          "Automatic tool selection by process conditions",
          "Automatic bend-sequence calculation",
          "Automatic gauge positioning and adjustment",
          "Part removal and retraction moves computed",
          "Sequences manually adjustable",
        ],
      },
      {
        title: "Simulation & Output",
        items: [
          "3D dynamic simulation of the bending process",
          "Part / tool / gauge collision checks",
          "Press brake NC program generation",
          "Bending work instruction output",
          "Multi-part batch processing",
          "Bend compensation tables & multi-setup support",
        ],
      },
    ],
    banner: {
      title: "Bend in the Programming Office, Produce on the Machine",
      text: "No more trial-and-error occupying the machine — sequence, tools, gauges and collisions are all verified offline, drastically cutting new-product changeover time.",
    },
    kpis: [
      { value: "Automatic", text: "Bend sequence & tool selection · Computed automatically, adjustable by hand" },
      { value: "3D", text: "Full-process dynamic simulation · Collision risks resolved in advance" },
      { value: "Batch", text: "Multiple parts processed continuously · Work instructions output in sync" },
    ],
    coreTitle: "Core Bending Capabilities",
    core: [
      { title: "Automatic Bend Sequencing", text: "Tool steps scheduled automatically from part geometry and interference" },
      { title: "Automatic Tool & Gauge Selection", text: "Intelligently matched from the machine tool library, less guesswork" },
      { title: "3D Dynamic Simulation", text: "Full bending motion simulated, collision risks resolved early" },
      { title: "Springback Compensation", text: "Bend tables and compensation parameters managed centrally for stable precision" },
    ],
    demo: {
      title: "Bend sequence — live 3D",
      hint: "Drag to orbit · pick a bend",
      bend: "Bend",
      flat: "Flat",
      done: "Finished part",
    },
  },
  mrobot: {
    eyebrow: "MRobot · Robotic Bending Cell",
    title: "MRobot Robotic Bending Offline Programming",
    lead:
      "Programming and simulation for robotic bending cells: define the cell layout, compute gripping plans, generate coordinated robot and press brake programs — run the whole cell virtually first.",
    groups: [
      {
        title: "Cell Configuration",
        items: [
          "Robot / press brake / gripper / pallet",
          "Peripheral equipment components",
          "Offline environment mirrors the real layout",
          "Vacuum / gripper / combined tooling support",
          "Links with MBend bending plans",
          "Cell calibration workflow support",
        ],
      },
      {
        title: "Paths & Simulation",
        items: [
          "Grip points and grip methods computed automatically",
          "Pick / feed / bend / flip paths",
          "Output pallet and stacking rules",
          "Robot / part / machine motion simulation",
          "Interference and collision verification",
          "Coordinated programs in one click",
        ],
      },
      {
        title: "Proven Value",
        items: [
          "Fast, simple patented cell calibration",
          "Automatic gripping and trajectory computation",
          "Programming time and cost greatly reduced",
          "Validated on Trumpf+Kuka cells",
          "Success cases: Durma+Yaskawa",
          "On-site commissioning and tuning support",
        ],
      },
    ],
    kpis: [
      { title: "Unmanned Bending", text: "Pick, bend, flip, palletize — fully programmed" },
      { title: "Programming Cost ↓", text: "Offline programming does not occupy robot hours" },
      { title: "Fast Payback", text: "Customers recover the cell investment quickly — proven in practice" },
    ],
    stepsTitle: "Robotic Bending Cell, Live in Four Steps",
    steps: [
      { title: "Define Cell Layout", text: "Lay out robot and press brake stations in a virtual environment" },
      { title: "Compute Grip Plan", text: "Gripper selection and part gripping poses planned automatically" },
      { title: "Full-Process Simulation", text: "Interference checks and cycle-time assessment surface risks early" },
      { title: "Deploy Programs", text: "Robot and press brake coordinated programs in one click" },
    ],
  },
  mtube: {
    eyebrow: "MTube · Smart Tube Cutting",
    title: "MTube Tube Design & Programming",
    lead:
      "MTube covers tube part design, tube model import, tube data preparation and the complete tube-cutting software workflow: easily create 3D tube parts, import tube drawings and assemblies in STEP, IGES and other formats from Inventor, SOLIDWORKS, Creo and more — no extra design software needed, all the way to tube cutting programs.",
    media: ["MTube · 3D Tube Design", "cncKad · Tube Cutting Simulation"],
    compareHint: "Drag to compare design and cutting simulation",
    cards: [
      {
        tag: "MT-01 · MT-03",
        title: "3D Modeling & Import",
        text: "Create and edit 3D tube parts; import external tube models or assembly data; supports mainstream 3D formats such as STEP and IGES.",
      },
      {
        tag: "MT-04 · MT-05",
        title: "Tube Properties & Cut Preparation",
        text: "Define tube type, material, size, length and wall thickness; prepare tube intersections, holes and end cuts for machining.",
      },
      {
        tag: "MT-06 · MT-07",
        title: "Feeds cncKad & Nesting",
        text: "Tube data passes to cncKad for machining preparation; works with AutoNest for tube material optimization and nesting.",
      },
    ],
    flowTitle: "From 3D Tube Part to Cutting Program",
    flow: [
      { title: "Model / Import", text: "Create 3D tube parts or import CAD assemblies" },
      { title: "Data Preparation", text: "Define properties, handle intersections and end cuts" },
      { title: "Nest & Optimize", text: "Optimize tube material usage with AutoNest" },
      { title: "NC Output", text: "Post-process programs for target machines" },
    ],
    extras: [
      {
        title: "Rectangular Tube Bend-Cutting",
        text: "An MTube exclusive: generates bend-cutting paths for rectangular tubes, covering typical rectangular tube scenarios.",
      },
      {
        title: "Reports & Program Output",
        text: "Outputs the graphics and process info required for tube machining; generates programs directly via post-processors for target tube cutting machines.",
      },
    ],
  },
  nesting: {
    eyebrow: "AutoNesting Pro · Advanced Nesting",
    title: "AutoNesting Pro Advanced Nesting",
    lead:
      "A True Shape automatic nesting engine: batch order auto-nesting, multi-sheet optimization and full remnant lifecycle management — material utilization you can see.",
    groups: [
      {
        title: "Intelligent Nesting Engine",
        items: [
          "Batch part import / order task import",
          "True-shape + rectangular nesting",
          "Multi-sheet layout, multi-spec sheet selection",
          "Small parts fill holes of large parts",
          "Re-optimization and utilization comparison",
          "Scheduling by delivery date / order priority",
        ],
      },
      {
        title: "Material & Remnant Management",
        items: [
          "Automatic remnant creation, irregular remnant management",
          "Remnants reused in subsequent tasks first",
          "Dynamic common lines, fewer piercings",
          "Utilization / scrap rate statistics",
          "Sheet quantity and weight consumption reports",
          "Tasks auto-grouped by material & thickness",
        ],
      },
      {
        title: "Output & System Integration",
        items: [
          "One-click NC programs for every machine",
          "Nesting drawings / part lists / remnant lists",
          "Results written back to JobTrack / ERP / MES",
          "Shares process parameters with cncKad",
          "Process constraints: rotation / grain / spacing",
          "Manual adjustment: move / rotate / re-nest",
        ],
      },
    ],
    exclusive: {
      title: "Exclusive AutoNest Pro Capabilities",
      text: "Powerful, high-efficiency punch/laser array nesting with real-time array simulation; Smart Cut intelligently adjusts part lead-ins and adds bridges; SubNest supported for safe machining.",
    },
    proven: {
      title: "Proven by Customers",
      text: "“Superb nesting engine, minimal material waste” — verified by users worldwide: nesting results directly determine sheet cost, and Metalix makes every millimeter count.",
    },
    kpis: [
      { value: "100K+", label: "Parts nested with ease", text: "Large jobs handled effortlessly" },
      { value: "Utilization ↑", label: "True-shape nesting + remnant reuse", text: "Sheet cost directly reduced" },
      { value: "Fully Automatic", label: "Import batches, get nesting results", text: "People only handle exceptions" },
    ],
    note: "Mixed-process nesting for laser / plasma / flame / punch — one run schedules multiple machines",
    demo: {
      title: "Nest it yourself",
      rect: "Rectangular",
      true: "True shape",
      run: "Run nesting",
      utilization: "Sheet utilization",
      parts: "Parts placed",
    },
  },
  estimation: {
    eyebrow: "Estimation · Costing",
    title: "Estimation Intelligent Costing / Cost Analysis",
    lead:
      "Cost estimation based on real toolpaths: material, labor, piercing and energy calculated at once — a solid basis for quotations, order review and capacity assessment. No more gut-feel pricing.",
    factors: [
      { title: "Material Cost", text: "Estimated by material, thickness, size, weight and unit price, with remnant reuse pricing." },
      { title: "Machining Time", text: "Real machining hours estimated from machine speed, path length and process parameters." },
      { title: "Piercing & Cutting Length", text: "Piercing count, cutting length and air moves all enter the cost model — common-line benefits show up directly." },
      { title: "Energy & Gases", text: "Estimates electricity, laser gas and other consumables from process parameters." },
      { title: "Bending Labor", text: "Estimates bending time and labor cost from bend sequences, tools and process conditions." },
      { title: "Quote Templates & Order Review", text: "Outputs quotations in your customer's format; supports order decisions, cost accounting and capacity assessment with data." },
    ],
    uses: [
      { title: "Fast Sales Quoting", text: "Import a drawing, get costs in minutes — sales response speed wins orders." },
      { title: "Order Review Basis", text: "Know cost and hours before accepting orders — avoid loss-making jobs and capacity conflicts." },
      { title: "Capacity & Profit Analysis", text: "Estimate machine load and gross margin per machine — decide what to take and how to schedule with data." },
    ],
    quote: {
      text: "No more experience-based guesswork — steel, labor and gas costs for every order, calculated by the system.",
      by: "Order Review · Quoting · Cost Accounting · Capacity Forecast, All in One Place",
    },
    stepsTitle: "From Drawing to Quote in Four Steps",
    steps: [
      { title: "Import Model", text: "Reads 3D CAD directly, auto-detects sheet metal features" },
      { title: "Cost Calculation", text: "Material, labor, piercing and energy computed item by item" },
      { title: "Capacity Link", text: "Assess delivery dates and bottlenecks against machine capacity" },
      { title: "Output Quote", text: "Generate quotations in one click, respond to inquiries fast" },
    ],
    demo: {
      title: "How the cost model reacts",
      quantity: "Quantity",
      thickness: "Thickness",
      material: "Material",
      materials: ["Mild steel", "Stainless", "Aluminium"],
      parts: ["Material", "Machining", "Piercing", "Energy & gas", "Bending"],
      total: "Relative cost per part",
    },
  },
  mes: {
    eyebrow: "MES · Unmanned Programming / JobTrack",
    title: "MESApp Unmanned Programming × JobTrack Production Tracking",
    lead:
      "Orders in, programs out: from ERP order intake to NC program generation, fully automatic — programmers only handle exceptions; JobTrack turns orders, parts, materials and machining history into your factory's data assets.",
    pipeline: {
      title: "Fully Automatic Programming Pipeline (Powered by Metalix API)",
      steps: [
        "Receive ERP/MES orders & drawings",
        "Auto-create CAM tasks",
        "Auto-load parts & quantities",
        "Rule-based auto-nesting",
        "Auto-generate NC & reports",
        "Results written back to upstream systems",
      ],
      note: "For rule-based products, parametric programming is available: enter parameters, get programs — ideal for doors, elevators, busbars, HVAC and similar industries.",
    },
    tracking: {
      title: "Production Data Tracking",
      items: [
        "Part records: basic info & machining history",
        "Order records: tasks, quantities, status",
        "Sub-nest records: sheet usage results",
        "Material consumption: remnants, area, utilization",
        "Production history: part & task lookup",
        "Status tracking: by order / part / task",
      ],
    },
    stats: {
      title: "Statistics & Traceability",
      items: [
        "Filter by date, customer, material, thickness",
        "Material utilization / machine load / task volume",
        "Data export for interfaces and reports",
        "Central database, multi-user sharing",
        "Combined with permissions and backup policies",
        "A data foundation for continuous improvement",
      ],
    },
    reports: {
      title: "Report Center · One Template Set for the Whole Process",
      items: [
        "Part machining reports",
        "Nesting & utilization reports",
        "NC program lists",
        "Material consumption reports",
        "Bending work instructions",
        "Tube machining reports",
        "Production tracking reports",
        "Custom templates in your format",
      ],
    },
    master: {
      title: "Factory Master Database",
      text: "Parts / sheets / remnants / machines / tools / dies / process tables / report templates managed centrally — multi-user, permission-controlled and backup-ready: the data foundation of the smart factory.",
    },
    benefitsTitle: "Three Benefits of Unmanned Production",
    benefits: [
      { title: "No More Programming Overtime", text: "Orders in, programs out — programmers only handle exceptions" },
      { title: "Fully Traceable", text: "Orders, parts, materials and machining history fully recorded" },
      { title: "Data as Assets", text: "Process knowledge accumulates and is reused — new staff get up to speed fast" },
    ],
    before: "Before: programs queued behind engineers, machines idle waiting for NC",
    after: "After: orders in, programs out — machines truly run continuously",
    kpi: { value: "-90%", label: "Programming wait time" },
    toggle: ["Before", "After"],
    machinesLabel: ["Laser 1", "Laser 2", "Punch", "Press brake"],
    idle: "Idle — waiting for NC",
  },
  erp: {
    eyebrow: "ERP / MES / API · System Integration",
    title: "Deep ERP / MES / API Integration",
    lead:
      "As the CAM hub of the smart factory, Metalix takes orders and data from ERP/MES upstream and drives machines and the shop floor downstream — bidirectional data flow connects planning and execution layers, with SAP and other integrations delivered at companies worldwide.",
    receive: {
      title: "Receive · ERP → Metalix",
      items: [
        "Material master data / BOM structures",
        "Sales & production orders",
        "Drawing paths, versions & properties",
        "Sheet & remnant stock batches",
        "Machining operations, due dates & priorities",
      ],
    },
    writeBack: {
      title: "Write Back · Metalix → ERP/MES",
      items: [
        "Nesting results / utilization / layouts",
        "NC program names, paths & versions",
        "Material consumption & remnant creation",
        "Machining time / piercings / cutting length",
        "Shop-floor reporting, completion & exceptions",
      ],
    },
    hub: "Metalix CAM hub",
    shopFloor: "Machines & shop floor",
    methods: {
      title: "Six Interface Methods for Any IT Environment",
      items: [
        "CSV / TXT / XML / JSON file exchange",
        "Database intermediate tables or views",
        "REST API real-time interface",
        "Web Service (SOAP)",
        "Metalix API deep automation & parametric programming",
        "Industry-specific apps (doors / elevators / HVAC / busbar / tubes)",
      ],
    },
    cadLink: {
      title: "Seamless CAD / Electrical Design Connectivity (CAD Link)",
      text: "Bring in the right material, thickness and bending parameters with minimal clicks",
    },
    proven: {
      title: "Proven Integrations Worldwide",
      text: "Schneider Electric integrated cncKad with SAP ERP; many companies eliminated order-scheduling delays through CSV / database integration, reducing manual errors and achieving end-to-end data flow.",
    },
    fourSteps: {
      title: "Interface Implementation in Four Steps",
      steps: ["Field mapping design", "Interface development", "Joint bidirectional testing", "Go-live monitoring"],
      text: "Exception logs with material-replenishment and rework feedback keep it reliable.",
    },
    openTitle: "Open Integration Capabilities",
    open: [
      { title: "REST API Interface", text: "Bidirectional calls for orders, drawings, programs and status" },
      { title: "Database & Intermediate Tables", text: "Loosely coupled direct connection to ERP / MES, automatic data exchange" },
      { title: "Automatic File Exchange", text: "DXF / XML / JSON sent and received on schedule, legacy-friendly" },
      { title: "Proven Implementation Method", text: "SAP and other ERP integrations delivered at companies worldwide" },
    ],
  },
  service: {
    eyebrow: "Service · Local Implementation",
    title: "Building Your Smart Sheet Metal Factory Together",
    lead:
      "Software is just the start. Metalix provides a complete service loop from assessment, implementation and training to after-sales support, ensuring every system truly delivers on your shop floor.",
    pathTitle: "Standard Implementation Path",
    path: [
      "Pre-sales assessment",
      "Solution configuration",
      "Software installation",
      "Post-processors & sample-part validation",
      "Process parameter setup",
      "Interface development & joint testing",
      "User training",
      "Pilot-run coaching",
      "Continuous optimization & after-sales support",
    ],
    cards: [
      {
        title: "Localized Implementation",
        text: "Post-processors and parameters configured for your machine brands, controllers and process habits; delivered after sample-part validation.",
      },
      {
        title: "Custom Development",
        text: "Open API + tailored solutions: parametric apps, automated workflows and industry-specific tools, iterated quickly to your needs.",
      },
      {
        title: "Training & After-Sales",
        text: "Tiered training for programming, process, shop-floor and IT staff; remote support, upgrade assistance and application optimization throughout.",
      },
    ],
    contact: {
      title: "METALIX China Office",
      company: "Shanghai Hymore Mechanical & Electrical Equipment Co., Ltd.",
      telLabel: "Tel",
      emailLabel: "Email",
      wechat: "Scan to follow us on WeChat",
      web: "Visit metalix.net",
    },
  },
  footer: {
    line: "Digital Solutions for the Smart Sheet Metal Factory",
    demo: "Interactive edition of the Metalix Smart Sheet Metal Factory brochure.",
  },
};

export default en;
export type Dict = typeof en;
