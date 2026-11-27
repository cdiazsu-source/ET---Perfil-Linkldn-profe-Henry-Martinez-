/* ==========================================================================
   Guía de perfil de LinkedIn · Henry Martínez Sarmiento (UIFCE - UNAL)
   Solo copiar y pegar · ES / EN · JavaScript vainilla
   ========================================================================== */
(() => {
  'use strict';

  const STORAGE_KEY = 'hms-linkedin-guia-v1';
  const PROFILE_URL = 'https://www.linkedin.com/in/henry-mart%C3%ADnez-sarmiento-aab963144/';
  const UIFCE_URL = 'https://www.linkedin.com/in/uifce/';

  /* Monitores UIFCE 2026-2 (fuente: MejoraTuPerfilUIFCE). k = nivel */
  const TEAM = [
    {"n": "Lina Fernanda Sanabria Muñoz", "k": 0, "l": "https://www.linkedin.com/in/lina-fernanda-sanabria-munoz-97ab9b2a4"},
    {"n": "David Santiago Parra Herrera", "k": 0, "l": "https://www.linkedin.com/in/santiago-parra-herrera-08b277341/"},
    {"n": "Brayan Santiago Maldonado Aparicio", "k": 1, "l": "https://www.linkedin.com/in/brayan-maldonado-549336276"},
    {"n": "Sebastian Stiff Quiroga Rios", "k": 2, "l": "https://www.linkedin.com/in/sebastian-stiff-quiroga-rios-546aa5430/"},
    {"n": "Ángela Lucía Fierro Aponte", "k": 2, "l": "https://www.linkedin.com/in/angela-lucia-fierro-aponte-992548386"},
    {"n": "Diego Fernando López Abril", "k": 2, "l": "https://www.linkedin.com/in/diegoloabril/"},
    {"n": "Cesar Steven Diaz Suarez", "k": 2, "l": "https://www.linkedin.com/in/cesar-steven-diaz-suarez-744b82250/"},
    {"n": "Juan Esteban Laguna Beltrán", "k": 2, "l": "https://www.linkedin.com/in/juan-esteban-laguna-beltr%C3%A1n-312b4829a"},
    {"n": "Yony Sebastian Chaparro Mesa", "k": 2, "l": "https://www.linkedin.com/in/yony-sebastian-chaparro-mesa-7a69b8215/"},
    {"n": "Laura Angélica Cárdenas Cely", "k": 3, "l": "https://www.linkedin.com/in/ang%C3%A9lica-c%C3%A1rdenas-657a692b4/"},
    {"n": "Juan David Delgado Moreno", "k": 3, "l": "https://www.linkedin.com/in/juan-david-delgado-moreno-701b20412/"},
    {"n": "Paula Sofia Bocarejo Alberto", "k": 3, "l": "https://www.linkedin.com/in/paula-sofia-bocarejo-alberto"},
    {"n": "Angel Stiven Gutierrez Diaz", "k": 3, "l": "https://www.linkedin.com/in/angel-stiven-gutierrez-diaz"},
    {"n": "Jean Carlos Baquero Garcia", "k": 3, "l": "https://www.linkedin.com/in/jean-carlos-baquero-garcia-a048a33a8"},
    {"n": "Diego Alejandro Garnica Mamanché", "k": 3, "l": "https://www.linkedin.com/in/alejandro-garnica-125a86309"},
    {"n": "María Fernanda Celis Mora", "k": 3, "l": "https://www.linkedin.com/in/mar%C3%ADa-fernanda-celis-mora-673b44291/"},
    {"n": "Camilo Alejandro Lagos Malaver", "k": 3, "l": "https://www.linkedin.com/in/camilo-alejandro-lagos-malaver"},
    {"n": "Diego Fernando Mellizo Pedraza", "k": 3, "l": "https://www.linkedin.com/in/diego-fernando-mellizo-pedraza-5083782b3"},
    {"n": "Nicolas Daniel Ramirez Camargo", "k": 3, "l": "https://www.linkedin.com/in/nicol%C3%A1s-daniel-ram%C3%ADrez-camargo-353836432"},
    {"n": "Jeferson David Anzola Grajales", "k": 3, "l": "https://www.linkedin.com/in/jeferson-david-anzola-grajales-b55aa4375"},
    {"n": "Angel David Ruiz Barbosa", "k": 3, "l": "https://www.linkedin.com/in/angel-ruiz-96314a192/"},
    {"n": "Deivid Farid Ardila Herrera", "k": 3, "l": "https://www.linkedin.com/in/faridardila/"},
    {"n": "Joel Santiago Rodríguez Guzmán", "k": 4, "l": "https://www.linkedin.com/in/joel-santiago-rodriguez-guzman-2b9892432/"},
    {"n": "Keller Joseph Guzmán Ariza", "k": 4, "l": "https://www.linkedin.com/in/keller-guzm%C3%A1n-365526366"}
  ];
  const RANK = {
    es: ['Coordinador/a', 'Líder de Desarrollo', 'Monitor/a Máster', 'Monitor/a Junior', 'Monitor/a Junior ad honorem'],
    en: ['Unit Coordinator', 'Software Development Lead', 'Team Lead', 'Student Fellow', 'Student Fellow (Volunteer)']
  };
  const COVERS = [
    { f: 'portada-1-esquina-ventanales', es: 'Esquina de ventanales', en: 'Window corner' },
    { f: 'portada-2-patio-escultura', es: 'Patio y escultura', en: 'Courtyard & sculpture' },
    { f: 'portada-3-plaza-estudiantil', es: 'Plaza estudiantil', en: 'Student plaza' },
    { f: 'portada-4-fachada-blanca-panoramica', es: 'Fachada blanca (panorámica)', en: 'White façade (panoramic)' },
    { f: 'portada-5-fachada-blanca', es: 'Fachada blanca', en: 'White façade' },
    { f: 'portada-6-entrada-ladrillo', es: 'Entrada de ladrillo', en: 'Brick entrance' },
    { f: 'portada-7-entrada-jardin', es: 'Entrada con árbol', en: 'Entrance with tree' },
    { f: 'portada-8-campus-panoramico', es: 'Campus panorámico', en: 'Campus panorama' },
    { f: 'portada-9-unal-cesped', es: '#UNAL en el césped', en: '#UNAL on the lawn' },
    { f: 'portada-10-edificio-303b', es: 'Edificio 303 B', en: 'Building 303 B' },
    { f: 'portada-11-plaza-torre', es: 'Plaza y torre', en: 'Plaza & tower' },
    { f: 'portada-12-terrazas-ladrillo', es: 'Terrazas de ladrillo', en: 'Brick terraces' },
    { f: 'portada-13-unal-campus', es: '#UNAL y el campus', en: '#UNAL & campus' },
    { f: 'portada-14-cielo-y-ladrillo', es: 'Cielo y ladrillo', en: 'Sky & brick' }
  ];
  const coverSrc = (i, grad) => grad
    ? `portadas/${COVERS[i].f}.jpg`
    : `portadas/sin-degradado/${COVERS[i].f}-sin-degradado.jpg`;

  /* Textos del perfil (versión sin métricas) */
  const DATA = {
    "es": {
      "headline": "Director Unidad de Informática FCE y Profesor Asociado - Universidad Nacional de Colombia | Gobierno de TI, Cloud, IA y Analítica de Datos | Transformación Digital Educativa & Enablement Engineering",
      "about": "¿Tu equipo técnico o educativo sigue dependiendo de consultores para resolver sus bloqueos del día a día? El verdadero cuello de botella organizativo no es la falta de talento, sino la falta de autonomía: cuando las personas reciben respuestas prefabricadas en lugar de desarrollar la capacidad de resolver problemas de forma independiente, la escalabilidad de tu organización se detiene.\n\nA lo largo de mi trayectoria en la intersección entre ingeniería de software, gestión de infraestructura y pedagogía técnica (Enablement Engineering), me he dedicado a transformar equipos altamente dependientes en células autosuficientes mediante metodologías de aprendizaje activo (Aprendizaje Basado en Indagación y ABP) e ingeniería de plataformas de autoservicio.\n\nSoy Administrador de Empresas y Magíster en Administración de Empresas de la Universidad Nacional de Colombia, donde me desempeño como profesor asociado de tiempo completo en la Escuela de Gestión y Contaduría Pública. Como Director de la Unidad de Informática de la Facultad de Ciencias Económicas (UIFCE), lidero la gobernanza de TI, la continuidad operativa, la ciberseguridad y la adopción de tecnologías emergentes (Cloud, Analítica de Datos e Inteligencia Artificial) al servicio de la docencia, la investigación y la extensión.\n\nHitos destacados:\n• Creación e implementación integral del Área de Virtualización y e-Learning con ecosistemas LMS escalables.\n• Dirección de proyectos de virtualización para diversas entidades, como DIAN, Ministerio de Salud y Protección Social, SENA, INPEC, CORTOLIMA y Facultad de Derecho.\n• Optimización de procesos administrativos y migración a la nube de servicios institucionales de alta demanda.\n• Conferencista del Programa de Educación Continua U.N. y consultor empresarial.\n\n¿Listo para escalar la tecnología y la autonomía digital de tu entorno académico o empresarial sin fricción? Conectemos. Y te invito a seguir a la UIFCE en LinkedIn: linkedin.com/in/uifce",
      "exp": {
        "title": "Director de la Unidad de Informática (UIFCE)",
        "hitos": [
          "Creación e implementación integral del Área de Virtualización Académica y e-Learning, con un ecosistema LMS escalable (Moodle / Canvas) proyectado hacia programas de posgrado, que amplió la oferta de cursos virtuales y el acceso de estudiantes a la formación en línea.",
          "Optimización de los tiempos de respuesta en procesos digitales mediante migración a la nube, destacando el aplicativo de solicitudes y certificados para cursos libres, que agilizó la entrega de certificados y mejoró la experiencia de los usuarios.",
          "Aseguramiento de la alta disponibilidad, la ciberseguridad y el rendimiento de plataformas académicas y administrativas críticas, incluyendo gestión de licenciamiento y soporte continuo.",
          "Formación de profesionales y estudiantes bajo metodologías de indagación y ABP («aprender a pescar»), reduciendo la dependencia de terceros en proyectos de desarrollo."
        ]
      },
      "role": [
        "Profesor Asociado de Tiempo Completo",
        "Escuela de Gestión y Contaduría Pública · Facultad de Ciencias Económicas, UNAL"
      ],
      "follow": "¡Hola! Te invito a seguir el perfil de la Unidad de Informática de la Facultad de Ciencias Económicas (UIFCE) de la Universidad Nacional de Colombia en LinkedIn. Allí compartimos proyectos de transformación digital, e-learning, analítica de datos e inteligencia artificial, además de eventos y microtalleres para la comunidad.\n\n👉 https://www.linkedin.com/in/uifce/",
      "skills": [
        "Aprendizaje Basado en Problemas (ABP) y Proyectos (ABPro)",
        "Diseño Instruccional y Creación de Entornos Virtuales (E-learning)",
        "Desarrollo de Autonomía y Metacognición en Estudiantes",
        "Formación de Formadores (Train the Trainers)",
        "Método Socrático y Facilitación del Aprendizaje",
        "Evaluación por Competencias y Coevaluación",
        "Gestión y Gobierno de TI (ITIL / COBIT)",
        "Transformación Digital e Institucional",
        "Arquitectura de Infraestructura Cloud y On-Premise (AWS / Azure)",
        "Implementación y Gestión de Ecosistemas LMS (Moodle / Canvas)",
        "Ciberseguridad y Continuidad Operativa (Uptime)",
        "Optimización de Procesos y Eliminación de Cuellos de Botella"
      ]
    },
    "en": {
      "headline": "IT Unit Director & Associate Professor, School of Economic Sciences - National University of Colombia | IT Governance, Cloud, AI & Data Analytics | Higher Ed Digital Transformation & Enablement Engineering",
      "about": "Does your technical or academic team still rely on external consultants to resolve day-to-day bottlenecks? The real organizational bottleneck isn't a lack of talent—it's a lack of autonomy. When people are handed pre-packaged answers instead of developing the capability to solve problems independently, organizational scalability stalls.\n\nThroughout my career at the intersection of software engineering, infrastructure management, and technical pedagogy (Enablement Engineering), I have focused on transforming high-dependency teams into self-sufficient units through active learning methodologies (Inquiry-Based Learning and PBL) and self-service platform engineering.\n\nI hold a Bachelor's degree in Business Administration and an MBA from the National University of Colombia, where I serve as a full-time Associate Professor in the Department of Management and Public Accounting. As Director of the IT Unit at the School of Economic Sciences (UIFCE), I lead IT governance, operational continuity, cybersecurity, and the adoption of emerging technologies (Cloud, Data Analytics, and Artificial Intelligence) to empower teaching, research, and institutional outreach.\n\nKey Highlights:\n• End-to-end creation and deployment of the Academic Virtualization & e-Learning Unit featuring scalable LMS ecosystems.\n• Project Director for course virtualization initiatives across multiple organizations, including DIAN, the Ministry of Health and Social Protection, SENA, INPEC, CORTOLIMA, and the School of Law.\n• Administrative workflow optimization and cloud migration for high-demand institutional services.\n• Speaker for the U.N. Continuing Education Program and business consultant.\n\nReady to scale technology and digital autonomy across your academic or enterprise ecosystem without friction? Let's connect—and follow UIFCE on LinkedIn: linkedin.com/in/uifce",
      "exp": {
        "title": "IT Unit Director (UIFCE)",
        "hitos": [
          "Built and launched the Academic Virtualization & e-Learning Unit end to end, with a scalable LMS ecosystem (Moodle / Canvas) designed to support graduate programs—expanding the virtual course portfolio and broadening student access to online learning.",
          "Cut digital process response times through cloud migration—most notably the request and certificate platform for open courses, which streamlined certificate delivery and improved the user experience.",
          "Ensured high availability, cybersecurity, and performance for mission-critical academic and administrative platforms, including license management and continuous support.",
          "Trained professionals and students through inquiry-based learning and PBL (“teach them to fish”), reducing reliance on third parties in software development projects."
        ]
      },
      "role": [
        "Full-Time Associate Professor",
        "Department of Management and Public Accounting · School of Economic Sciences, UNAL"
      ],
      "follow": "Hi! I invite you to follow the IT Unit of the School of Economic Sciences (UIFCE), National University of Colombia, on LinkedIn. We share digital transformation, e-learning, data analytics and AI projects, plus events and micro-workshops for the community.\n\n👉 https://www.linkedin.com/in/uifce/",
      "skills": [
        "Problem-Based Learning (PBL) & Project-Based Learning",
        "Instructional Design & Virtual Learning Environments (e-Learning)",
        "Learner Autonomy & Metacognition Development",
        "Train the Trainer & Technical Enablement",
        "Socratic Method & Inquiry-Based Facilitation",
        "Competency-Based Assessment & Peer Evaluation",
        "IT Governance & Service Management (ITIL / COBIT)",
        "Enterprise & Higher Ed Digital Transformation",
        "Cloud & Hybrid Infrastructure Architecture (AWS / Azure)",
        "LMS Ecosystem Implementation & Administration (Moodle / Canvas)",
        "Cybersecurity & Business Continuity (High Availability / Uptime)",
        "Process Optimization & Bottleneck Elimination"
      ]
    }
  };

  DATA.es.prof = {
    title: 'Profesor Asociado de Tiempo Completo',
    desc: 'Profesor asociado de tiempo completo en la Escuela de Gestión y Contaduría Pública de la Facultad de Ciencias Económicas.\n\n• Director de proyectos de virtualización para diversas entidades.\n• Conferencista del Programa de Educación Continua U.N.\n• Consultor empresarial.'
  };
  DATA.en.prof = {
    title: 'Full-time Associate Professor',
    desc: 'Full-time Associate Professor in the Department of Management and Public Accounting, School of Economic Sciences.\n\n• Project Director for course virtualization initiatives across multiple organizations.\n• Speaker for the U.N. Continuing Education Program.\n• Business consultant.'
  };

  /* Interfaz */
  const UI = {
    es: {
      kicker: 'Misión UIFCE · 8 pasos · unos 25 minutos',
      title: 'Profe, arregla tu perfil de LinkedIn',
      intro: 'Tu perfil dice «Docente de gestión» y un banner gris… y tú diriges la informática de toda una Facultad. Aquí ya está todo escrito: solo copia, pega y marca cada paso como hecho.',
      bubble: '¡Profe, sin excusas! Ya te lo dejé todo listo 😎',
      cheers: ['¡Arrancamos, profe! 💪', '¡Eso, profe! Va tomando forma.', '¡Vamos por la mitad! 🔥', '¡Ya casi, profe! Últimos detalles.', '¡Perfil arreglado! 🎉'],
      finishTitle: '¡Listo, profe! Perfil arreglado 🎉',
      finishText: 'Ahora sí: tu perfil cuenta lo que haces. Revísalo una vez más y compártelo con tus colegas.',
      finishLink: 'Ver cómo quedó mi perfil ↗',
      openProfile: 'Abrir mi perfil de LinkedIn ↗',
      enNote: 'Estos textos son para tu perfil en inglés. Créalo así: en tu perfil, a la derecha, «Añadir perfil en otro idioma» → English. Luego sigue los mismos pasos.',
      where: 'Dónde:',
      tip: '<strong>Esto es lo sugerido.</strong> ¿Quieres algo más específico u otro enfoque? Pídeselo al Máster de Estrategias Tecnológicas de la UIFCE.',
      copy: 'Copiar', copied: '¡Copiado!', done: 'Hecho', progress: (n, t) => `${n} de ${t} pasos hechos`,
      toast: 'Copiado. Ahora pégalo en LinkedIn (Ctrl + V).', fail: 'No se pudo copiar. Selecciona el texto y cópialo a mano.',
      langAria: 'Idioma de los textos',
      steps: {
        cover: { t: 'Elige y cambia la foto de portada', w: 'Elige una de las 14 fotos de la Facultad y descárgala. Luego, en tu perfil, pulsa el ícono de cámara ( 📷 ) arriba a la derecha de la portada → «Cambiar foto» → sube la imagen → «Aplicar».', dl: 'Descargar esta portada', grad: 'Con degradado azul', noGrad: 'Sin degradado', gradAria: 'Estilo de la portada', pick: 'Toca una foto para elegirla:', sel: 'Elegida' },
        headline: { t: 'Adiós a «Docente de gestión»: pega el titular', w: 'En tu perfil, pulsa el lápiz ( ✎ ) a la derecha de tu foto → campo «Titular» → borra el texto anterior y pega → «Guardar».' },
        about: { t: 'Cuenta tu historia en «Acerca de»', w: 'En tu perfil, sección «Acerca de» → lápiz ( ✎ ) → borra el texto anterior y pega → «Guardar». Si no tienes la sección: «Añadir sección» → «Acerca de».' },
        exp: { t: 'Experiencia: Director de la UIFCE', w: 'En tu perfil, sección «Experiencia» → «+» → «Añadir cargo» (o el lápiz si ya existe). Copia y pega cada campo → «Guardar».' },
        prof: { t: 'Experiencia: Profesor Asociado', w: 'Igual que el paso anterior: «Experiencia» → «+» → «Añadir cargo». Copia y pega cada campo → «Guardar».' },
        skills: { t: 'Presume tus 12 aptitudes', w: 'En tu perfil, sección «Aptitudes» → «+» → pega una aptitud → «Guardar». Repite con cada una (la que copias queda marcada).' },
        follow: { t: 'Sigue a la UIFCE y compártela', w: 'Abre el perfil de la UIFCE y pulsa «Seguir». Después, si quieres, copia esta invitación y envíala a tus contactos.', open: 'Abrir perfil de la UIFCE ↗' },
        team: { t: 'Remate: sigue a tus monitores UIFCE 2026-2', w: 'Son los estudiantes que hacen posible la UIFCE este semestre. Abre cada perfil y pulsa «Seguir» (o «Conectar»). Cada perfil que abras queda marcado.', follow: 'Seguir', count: (n, t) => `${n} de ${t} monitores visitados` }
      },
      f: { title: 'Cargo', type: 'Tipo de empleo', typeV: 'Jornada completa (elígelo de la lista)', org: 'Empresa', loc: 'Ubicación', desc: 'Descripción', invite: 'Invitación' },
      orgV: 'Universidad Nacional de Colombia', locV: 'Bogotá, D.C., Colombia',
      footer: 'Unidad de Informática · Facultad de Ciencias Económicas · Universidad Nacional de Colombia'
    },
    en: {
      kicker: 'UIFCE mission · 8 steps · about 25 minutes',
      title: 'Prof, fix your LinkedIn profile',
      intro: 'Your profile says “Management Lecturer” with a gray banner… and you run IT for an entire School. Everything is already written here: just copy, paste and mark each step as done.',
      bubble: 'No excuses, Prof! I got it all ready for you 😎',
      cheers: ['Let’s go, Prof! 💪', 'Nice, Prof! It’s taking shape.', 'Halfway there! 🔥', 'Almost there, Prof! Final touches.', 'Profile fixed! 🎉'],
      finishTitle: 'Done, Prof! Profile fixed 🎉',
      finishText: 'Now your profile tells what you really do. Give it one last look and share it with your colleagues.',
      finishLink: 'See how my profile looks ↗',
      openProfile: 'Open my LinkedIn profile ↗',
      enNote: 'These texts are for your English profile. Create it like this: on your profile, on the right, “Add profile in another language” → English. Then follow the same steps.',
      where: 'Where:',
      tip: '<strong>This is our suggestion.</strong> Want something more specific or a different angle? Ask the UIFCE Tech Strategy Master.',
      copy: 'Copy', copied: 'Copied!', done: 'Done', progress: (n, t) => `${n} of ${t} steps done`,
      toast: 'Copied. Now paste it on LinkedIn (Ctrl + V).', fail: 'Copy failed. Select the text and copy it manually.',
      langAria: 'Text language',
      steps: {
        cover: { t: 'Pick and change the cover photo', w: 'Pick one of the 14 School photos and download it. Then, on your profile, click the camera icon ( 📷 ) at the top right of the cover → “Change photo” → upload the image → “Apply”.', dl: 'Download this cover', grad: 'With blue gradient', noGrad: 'No gradient', gradAria: 'Cover style', pick: 'Tap a photo to pick it:', sel: 'Selected' },
        headline: { t: 'Bye “Management Lecturer”: paste the headline', w: 'On your profile, click the pencil ( ✎ ) to the right of your photo → “Headline” field → delete the old text and paste → “Save”.' },
        about: { t: 'Tell your story in “About”', w: 'On your profile, “About” section → pencil ( ✎ ) → delete the old text and paste → “Save”. If you don’t have it: “Add section” → “About”.' },
        exp: { t: 'Experience: UIFCE Director', w: 'On your profile, “Experience” section → “+” → “Add position” (or the pencil if it already exists). Copy and paste each field → “Save”.' },
        prof: { t: 'Experience: Associate Professor', w: 'Same as the previous step: “Experience” → “+” → “Add position”. Copy and paste each field → “Save”.' },
        skills: { t: 'Show off your 12 skills', w: 'On your profile, “Skills” section → “+” → paste one skill → “Save”. Repeat for each one (the one you copy gets checked).' },
        follow: { t: 'Follow UIFCE and share it', w: 'Open the UIFCE profile and click “Follow”. Then, if you like, copy this invitation and send it to your contacts.', open: 'Open the UIFCE profile ↗' },
        team: { t: 'Final touch: follow your UIFCE student team 2026-2', w: 'These are the students who make UIFCE happen this semester. Open each profile and click “Follow” (or “Connect”). Every profile you open gets checked.', follow: 'Follow', count: (n, t) => `${n} of ${t} team members visited` }
      },
      f: { title: 'Title', type: 'Employment type', typeV: 'Full-time (pick it from the list)', org: 'Company', loc: 'Location', desc: 'Description', invite: 'Invitation' },
      orgV: 'National University of Colombia', locV: 'Bogotá, D.C., Colombia',
      footer: 'IT Unit · School of Economic Sciences · National University of Colombia'
    }
  };

  const STEP_IDS = ['cover', 'headline', 'about', 'exp', 'prof', 'skills', 'follow', 'team'];

  /* Estado */
  let state = { lang: 'es', done: {}, skills: {}, mates: {}, cover: 1, grad: true };
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (saved) state = {
      lang: saved.lang === 'en' ? 'en' : 'es', done: saved.done || {}, skills: saved.skills || {}, mates: saved.mates || {},
      cover: Number.isInteger(saved.cover) && saved.cover >= 0 && saved.cover < COVERS.length ? saved.cover : 1,
      grad: saved.grad !== false
    };
  } catch (e) { /* sin almacenamiento */ }
  const save = () => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* ignorar */ } };

  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* Textos copiables del idioma actual */
  const texts = () => {
    const d = DATA[state.lang], u = UI[state.lang];
    return {
      headline: d.headline,
      about: d.about,
      expTitle: d.exp.title,
      expDesc: d.exp.hitos.map(h => `• ${h}`).join('\n'),
      profTitle: d.prof.title,
      profDesc: d.prof.desc,
      org: u.orgV,
      loc: u.locV,
      follow: d.follow
    };
  };

  /* Componentes */
  const copyBox = (key, label, text, big = false) => `
    <div class="field">
      ${label ? `<div class="field__label">${esc(label)}</div>` : ''}
      <div class="field__row">
        <div class="field__text${big ? ' field__text--big' : ''}">${esc(text)}</div>
        <button type="button" class="btn-copy" data-copy="${key}">${esc(UI[state.lang].copy)}</button>
      </div>
    </div>`;

  const fixedField = (label, value) => `
    <div class="field">
      <div class="field__label">${esc(label)}</div>
      <div class="field__text field__text--fixed">${esc(value)}</div>
    </div>`;

  const stepBody = (id) => {
    const u = UI[state.lang], tx = texts(), f = u.f;
    switch (id) {
      case 'cover': {
        const c = u.steps.cover, src = coverSrc(state.cover, state.grad);
        const file = src.split('/').pop();
        return `
        <figure class="cover-main">
          <img class="cover" id="coverMain" src="${src}" alt="${esc(COVERS[state.cover][state.lang])}" width="1584" height="396">
          <figcaption><strong>${esc(c.sel)}:</strong> <span id="coverName">${esc(COVERS[state.cover][state.lang])} · ${state.cover + 1} / ${COVERS.length}</span></figcaption>
        </figure>
        <div class="cover-actions">
          <a class="btn btn--primary" id="coverDl" href="${src}" download="${file}">⬇ ${esc(c.dl)}</a>
          <div class="seg seg--light" role="group" aria-label="${esc(c.gradAria)}">
            <button type="button" class="seg__btn" data-grad="1" aria-pressed="${state.grad}">${esc(c.grad)}</button>
            <button type="button" class="seg__btn" data-grad="0" aria-pressed="${!state.grad}">${esc(c.noGrad)}</button>
          </div>
        </div>
        <p class="gal__hint">${esc(c.pick)}</p>
        <div class="gal" role="radiogroup" aria-label="${esc(c.t)}">${COVERS.map((cv, k) => `
          <button type="button" class="thumb${k === state.cover ? ' is-on' : ''}" role="radio" aria-checked="${k === state.cover}" data-cover="${k}">
            <img src="${coverSrc(k, state.grad)}" alt="" loading="lazy" width="1584" height="396">
            <span>${k + 1}. ${esc(cv[state.lang])}</span>
          </button>`).join('')}
        </div>`;
      }
      case 'headline': return copyBox('headline', '', tx.headline);
      case 'about': return copyBox('about', '', tx.about, true);
      case 'exp': return copyBox('expTitle', f.title, tx.expTitle) + fixedField(f.type, f.typeV) + copyBox('org', f.org, tx.org) + copyBox('loc', f.loc, tx.loc) + copyBox('expDesc', f.desc, tx.expDesc, true);
      case 'prof': return copyBox('profTitle', f.title, tx.profTitle) + fixedField(f.type, f.typeV) + copyBox('org', f.org, tx.org) + copyBox('loc', f.loc, tx.loc) + copyBox('profDesc', f.desc, tx.profDesc, true);
      case 'skills': return `<ol class="chips">${DATA[state.lang].skills.map((s, i) => `
        <li><button type="button" class="chip${state.skills[i] ? ' is-done' : ''}" data-skill="${i}" aria-pressed="${!!state.skills[i]}"><span class="chip__n">${i + 1}</span>${esc(s)}</button></li>`).join('')}</ol>`;
      case 'team': {
        const c = u.steps.team, seen = TEAM.filter((m, i) => state.mates[i]).length;
        return `
        <p class="team__count" id="teamCount">${esc(c.count(seen, TEAM.length))}</p>
        <ul class="team">${TEAM.map((m, i) => {
          const w = m.n.split(' ');
          const ini = (w[0][0] + (w[2] ? w[2][0] : w[1] ? w[1][0] : '')).toUpperCase();
          return `
          <li class="mate${state.mates[i] ? ' is-done' : ''}">
            <span class="mate__ini" aria-hidden="true">${esc(ini)}</span>
            <span class="mate__tx"><b>${esc(m.n)}</b><small>${esc(RANK[state.lang][m.k])}</small></span>
            <a class="mate__btn" href="${esc(m.l)}" target="_blank" rel="noopener" data-mate="${i}">${esc(c.follow)} ↗</a>
          </li>`;
        }).join('')}
        </ul>`;
      }
      case 'follow': return `
        <a class="btn btn--primary" href="${UIFCE_URL}" target="_blank" rel="noopener">${esc(u.steps.follow.open)}</a>
        ${copyBox('follow', f.invite, tx.follow)}`;
    }
    return '';
  };

  const render = () => {
    const u = UI[state.lang];
    document.documentElement.lang = state.lang;
    $('#title').textContent = u.title;
    $('#kicker').textContent = u.kicker;
    $('#finishTitle').textContent = u.finishTitle;
    $('#finishText').textContent = u.finishText;
    $('#finishLink').textContent = u.finishLink;
    $('#finishLink').href = PROFILE_URL;
    $('#intro').textContent = u.intro;
    $('#openProfile').textContent = u.openProfile;
    $('#enNote').hidden = state.lang !== 'en';
    $('#enNote').textContent = u.enNote;
    $('#footerText').textContent = u.footer;
    $('#langSwitch').setAttribute('aria-label', u.langAria);
    document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === state.lang)));

    $('#steps').innerHTML = STEP_IDS.map((id, i) => {
      const s = u.steps[id], done = !!state.done[id];
      return `
      <li class="step${done ? ' is-done' : ''}" id="paso-${id}">
        <div class="step__head">
          <span class="step__num" aria-hidden="true">${done ? '✓' : i + 1}</span>
          <h2 class="step__title">${esc(s.t)}</h2>
          <label class="step__done"><input type="checkbox" data-done="${id}"${done ? ' checked' : ''}> ${esc(u.done)}</label>
        </div>
        <p class="step__where"><strong>${esc(u.where)}</strong> ${esc(s.w)}</p>
        <div class="step__body">${stepBody(id)}</div>
        <p class="step__tip"><span aria-hidden="true">💡</span> <span>${u.tip}</span></p>
      </li>`;
    }).join('');
    updateProgress();
  };

  const rerenderCover = () => {
    const body = document.querySelector('#paso-cover .step__body');
    const y = window.scrollY;
    body.innerHTML = stepBody('cover');
    window.scrollTo(0, y);
  };

  const updateProgress = () => {
    const n = STEP_IDS.filter(id => state.done[id]).length;
    $('#progressText').textContent = UI[state.lang].progress(n, STEP_IDS.length);
    $('#progressBar').style.width = `${(n / STEP_IDS.length) * 100}%`;
    const u = UI[state.lang], total = STEP_IDS.length;
    const idx = n === 0 ? -1 : n === total ? 4 : n <= 2 ? 1 : n <= 4 ? 2 : 3;
    $('#bubble').textContent = idx < 0 ? u.bubble : u.cheers[idx];
    $('#finish').hidden = n !== total;
  };

  /* Portapapeles */
  const writeClipboard = async (text) => {
    try { await navigator.clipboard.writeText(text); return true; } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      let ok = false; try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
      ta.remove(); return ok;
    }
  };

  let toastTimer;
  const toast = (msg, bad = false) => {
    const el = $('#toast');
    el.textContent = msg; el.classList.toggle('is-bad', bad); el.classList.add('is-on');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('is-on'), 2600);
  };

  const flash = (btn, label) => {
    const old = btn.innerHTML;
    btn.classList.add('is-copied'); btn.textContent = label;
    setTimeout(() => { btn.classList.remove('is-copied'); btn.innerHTML = old; }, 1600);
  };

  document.addEventListener('click', async (ev) => {
    const u = UI[state.lang];
    const langBtn = ev.target.closest('[data-lang]');
    if (langBtn) { state.lang = langBtn.dataset.lang; save(); render(); return; }

    const coverBtn = ev.target.closest('[data-cover]');
    if (coverBtn) { state.cover = Number(coverBtn.dataset.cover); save(); rerenderCover(); return; }
    const gradBtn = ev.target.closest('[data-grad]');
    if (gradBtn) { state.grad = gradBtn.dataset.grad === '1'; save(); rerenderCover(); return; }

    const copyBtn = ev.target.closest('[data-copy]');
    if (copyBtn) {
      const ok = await writeClipboard(texts()[copyBtn.dataset.copy]);
      if (ok) { flash(copyBtn, u.copied); toast(u.toast); } else toast(u.fail, true);
      return;
    }

    const mateLink = ev.target.closest('[data-mate]');
    if (mateLink) {
      state.mates[mateLink.dataset.mate] = true; save();
      mateLink.closest('.mate').classList.add('is-done');
      const seen = TEAM.filter((m, i) => state.mates[i]).length;
      $('#teamCount').textContent = u.steps.team.count(seen, TEAM.length);
      return;
    }

    const skillBtn = ev.target.closest('[data-skill]');
    if (skillBtn) {
      const i = Number(skillBtn.dataset.skill);
      const ok = await writeClipboard(DATA[state.lang].skills[i]);
      if (!ok) { toast(u.fail, true); return; }
      state.skills[i] = true; save();
      skillBtn.classList.add('is-done'); skillBtn.setAttribute('aria-pressed', 'true');
      toast(u.toast);
    }
  });

  document.addEventListener('change', (ev) => {
    const box = ev.target.closest('[data-done]');
    if (!box) return;
    state.done[box.dataset.done] = box.checked; save();
    const li = box.closest('.step');
    li.classList.toggle('is-done', box.checked);
    li.querySelector('.step__num').textContent = box.checked ? '✓' : STEP_IDS.indexOf(box.dataset.done) + 1;
    updateProgress();
    if (box.checked) {
      const n = STEP_IDS.filter(id => state.done[id]).length;
      toast(n === STEP_IDS.length ? UI[state.lang].finishTitle : UI[state.lang].cheers[Math.min(3, Math.floor(n / 2))]);
      if (n === STEP_IDS.length) $('#finish').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  $('#openProfile').href = PROFILE_URL;
  render();
})();
