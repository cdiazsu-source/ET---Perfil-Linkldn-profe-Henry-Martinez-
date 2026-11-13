/* ==========================================================================
   LinkedIn Studio · Henry Martínez Sarmiento (UIFCE - UNAL)
   Motor bilingüe ES / EN · JavaScript ES6+ vainilla
   ========================================================================== */
(() => {
  'use strict';

  const STORAGE_KEY = 'hms-linkedin-studio-v1';
  const PROFILE_URL = 'https://www.linkedin.com/in/henry-mart%C3%ADnez-sarmiento-aab963144/';

  /* ------------------------------------------------------------------
     1. VARIABLES EDITABLES (compartidas entre ES y EN)
     ------------------------------------------------------------------ */
  const DEFAULT_VARS = {
    years: '15',
    courses: '+X',
    students: 'X',
    reduction: 'X%',
    users: '+N',
    uptime: 'X%',
    trained: 'N'
  };

  const VAR_META = {
    years:     { es: 'Años de experiencia',                  en: 'Years of experience',              useEs: 'Acerca de',            useEn: 'About' },
    courses:   { es: 'Cursos virtualizados',                 en: 'Courses virtualized',              useEs: 'Hito 1 · Publicación 3', useEn: 'Milestone 1 · Post 3' },
    students:  { es: 'Estudiantes impactados',               en: 'Learners reached',                 useEs: 'Hito 1',               useEn: 'Milestone 1' },
    reduction: { es: 'Reducción en tiempos de entrega',      en: 'Turnaround time reduction',        useEs: 'Hito 2',               useEn: 'Milestone 2' },
    users:     { es: 'Usuarios del aplicativo de certificados', en: 'Certificate platform users',    useEs: 'Hito 2',               useEn: 'Milestone 2' },
    uptime:    { es: 'Disponibilidad de plataformas (uptime)', en: 'Platform availability (uptime)', useEs: 'Hito 3',               useEn: 'Milestone 3' },
    trained:   { es: 'Profesionales y estudiantes formados', en: 'Professionals & students trained', useEs: 'Hito 4',               useEn: 'Milestone 4' }
  };

  /* ------------------------------------------------------------------
     2. DICCIONARIO DE INTERFAZ (i18n)
     ------------------------------------------------------------------ */
  const UI = {
    es: {
      skip: 'Saltar al contenido',
      navAria: 'Secciones',
      'nav.diag': 'Diagnóstico', 'nav.header': 'Cabecera', 'nav.about': 'Acerca de',
      'nav.exp': 'Experiencia', 'nav.skills': 'Aptitudes', 'nav.plan': 'Plan de acción',
      progress: 'Perfil',
      progressTitle: 'Completitud del perfil: {n} de {t} acciones',
      'hero.eyebrow': 'Estrategia de marca personal · SEO internacional',
      'hero.title': 'Optimización estratégica del perfil de LinkedIn de Henry Martínez Sarmiento',
      'hero.lead': 'Director de la Unidad de Informática de la Facultad de Ciencias Económicas (UIFCE) de la Universidad Nacional de Colombia. Simula, edita y copia cada bloque listo para LinkedIn en español e inglés.',
      'hero.open': 'Abrir perfil en LinkedIn ↗',
      'hero.statsAria': 'Indicadores',
      'hero.statYears': 'años de trayectoria', 'hero.statConn': 'contactos actuales',
      'hero.statSkills': 'aptitudes estratégicas', 'hero.statLangs': 'idiomas de perfil',
      'actions.export': 'Exportar Guía Bilingüe (.md)',
      'actions.reset': 'Restaurar valores',
      'diag.title': 'Diagnóstico actual vs. objetivo',
      'diag.sub': 'Dónde está el perfil hoy y hacia dónde debe posicionarse.',
      'diag.beforeTag': 'Antes', 'diag.afterTag': 'Después',
      'diag.beforeTitle': 'Estado actual detectado', 'diag.afterTitle': 'Posicionamiento objetivo',
      'diag.audience': 'Audiencia objetivo',
      'diag.tableCaption': 'Comparativo antes y después por elemento del perfil',
      'diag.colElement': 'Elemento', 'diag.colBefore': 'Antes', 'diag.colAfter': 'Después',
      'sim.title': 'Simulador visual de cabecera',
      'sim.sub': 'Banner + foto + titular, tal como se verá en LinkedIn.',
      'sim.viewAria': 'Vista del simulador',
      'sim.viewBefore': 'Perfil actual', 'sim.viewAfter': 'Perfil optimizado',
      'sim.location': 'Bogotá, D.C., Colombia', 'sim.contact': 'Información de contacto',
      'sim.connections': '167 contactos', 'sim.org': 'Universidad Nacional de Colombia',
      'sim.btnConnect': 'Conectar', 'sim.btnMessage': 'Enviar mensaje', 'sim.btnMore': 'Más',
      'sim.bannerSpecs': 'Especificaciones del banner (Canva / Figma)',
      'sim.motto': 'Lema del banner', 'sim.paletteAria': 'Paleta de color',
      'sim.c1': 'Azul UNAL', 'sim.c2': 'Teal digital', 'sim.c3': 'Acento', 'sim.c4': 'Superficie',
      'sim.headlineTitle': 'Selector de titular (headline)',
      'sim.headlineSub': 'Elige una variante: se aplica al simulador y a la exportación. Límite de LinkedIn: 220 caracteres.',
      'about.title': 'Sección «Acerca de»',
      'about.sub': 'Los campos resaltados son editables y se sincronizan entre español e inglés.',
      'about.cardTitle': 'Acerca de',
      'exp.title': 'Experiencia, roles y proyectos de impacto',
      'exp.sub': 'Completa las métricas pendientes: se actualizan en ambas versiones lingüísticas.',
      'exp.metricsTitle': 'Métricas editables',
      'exp.rolesTitle': 'Trayectoria y roles directivos (UNAL)',
      'exp.alliancesTitle': 'Alianzas y proyectos interinstitucionales',
      'exp.usedIn': 'Se usa en',
      'skills.title': 'Matriz de aptitudes y stack técnico',
      'skills.sub': '12 aptitudes con su equivalente exacto en español e inglés.',
      'skills.filterAria': 'Filtrar por categoría',
      'skills.caption': 'Aptitudes en español e inglés',
      'skills.colEs': 'Español', 'skills.colEn': 'English', 'skills.colCat': 'Categoría', 'skills.colCopy': 'Copiar',
      'skills.all': 'Todas', 'skills.copyLang': 'Copiar visibles (ES)', 'skills.copyBoth': 'Copiar ES + EN',
      'skills.stackTitle': 'Stack tecnológico',
      'cat.ped': 'Pedagogía & Enablement', 'cat.gov': 'Gestión & Gobierno TI', 'cat.arch': 'Arquitectura & Cloud',
      'plan.title': 'Plan de acción: recomendaciones y contenido',
      'plan.sub': 'Nivel 2 · Ejecución y crecimiento de la red.',
      'plan.stepsTitle': 'Pasos de implementación',
      'plan.recsTitle': 'Gestor de recomendaciones',
      'plan.recsSub': 'Marca cada solicitud enviada. Elige el idioma del mensaje por contacto.',
      'plan.matrixTitle': 'Matriz de contenidos · 1 a 2 publicaciones por semana',
      'plan.postsTitle': 'Plantillas de publicaciones',
      'plan.recPending': 'Pendiente de solicitar', 'plan.recDone': 'Solicitud enviada',
      'plan.recPreview': 'Ver mensaje', 'plan.recLang': 'Idioma del mensaje',
      'plan.copyInvite': 'Copiar mensaje de invitación',
      'plan.postMeta': 'Director UIFCE · UNAL',
      'plan.ideas': 'Ideas',
      'cta.title': 'Guía bilingüe lista para publicar',
      'cta.sub': 'Descarga un Markdown limpio con ambas versiones (ES / EN) para usar con «Agregar perfil en otro idioma».',
      footer: 'Unidad de Informática · Facultad de Ciencias Económicas · Universidad Nacional de Colombia. Los cambios se guardan automáticamente en este navegador.',
      copy: 'Copiar texto', copied: '¡Copiado!',
      chars: '{n} / {max} caracteres',
      recommended: 'Recomendada', selected: 'Seleccionada',
      pendingN: '{n} métricas pendientes', pending1: '1 métrica pendiente', pendingNone: 'Métricas completas',
      stepsOf: '{n} de {t}', recsOf: '{n} de {t} enviadas',
      'toast.copied': 'Texto copiado al portapapeles',
      'toast.copiedPending': 'Copiado. Atención: aún hay métricas pendientes (X / N)',
      'toast.copyFail': 'No se pudo copiar. Selecciona el texto manualmente.',
      'toast.lang': 'Idioma cambiado a Español',
      'toast.exported': 'Guía bilingüe exportada (.md)',
      'toast.reset': 'Valores restaurados',
      'toast.storage': 'El navegador no permite guardar cambios: se perderán al cerrar.',
      confirmReset: '¿Restaurar todos los valores? Se borrarán métricas, selección de titular y checklists guardados.'
    },
    en: {
      skip: 'Skip to content',
      navAria: 'Sections',
      'nav.diag': 'Diagnosis', 'nav.header': 'Header', 'nav.about': 'About',
      'nav.exp': 'Experience', 'nav.skills': 'Skills', 'nav.plan': 'Action plan',
      progress: 'Profile',
      progressTitle: 'Profile completeness: {n} of {t} actions',
      'hero.eyebrow': 'Personal branding · International SEO',
      'hero.title': 'Strategic LinkedIn profile optimization for Henry Martínez Sarmiento',
      'hero.lead': 'Director of the IT Unit at the School of Economic Sciences (UIFCE), National University of Colombia. Preview, edit and copy every LinkedIn-ready block in Spanish and English.',
      'hero.open': 'Open LinkedIn profile ↗',
      'hero.statsAria': 'Key figures',
      'hero.statYears': 'years of experience', 'hero.statConn': 'current connections',
      'hero.statSkills': 'strategic skills', 'hero.statLangs': 'profile languages',
      'actions.export': 'Export Bilingual Guide (.md)',
      'actions.reset': 'Reset values',
      'diag.title': 'Current diagnosis vs. target',
      'diag.sub': 'Where the profile stands today and where it should be positioned.',
      'diag.beforeTag': 'Before', 'diag.afterTag': 'After',
      'diag.beforeTitle': 'Current state', 'diag.afterTitle': 'Target positioning',
      'diag.audience': 'Target audience',
      'diag.tableCaption': 'Before and after comparison by profile element',
      'diag.colElement': 'Element', 'diag.colBefore': 'Before', 'diag.colAfter': 'After',
      'sim.title': 'Profile header simulator',
      'sim.sub': 'Cover banner + photo + headline, exactly as it will appear on LinkedIn.',
      'sim.viewAria': 'Simulator view',
      'sim.viewBefore': 'Current profile', 'sim.viewAfter': 'Optimized profile',
      'sim.location': 'Bogotá, D.C., Colombia', 'sim.contact': 'Contact info',
      'sim.connections': '167 connections', 'sim.org': 'National University of Colombia',
      'sim.btnConnect': 'Connect', 'sim.btnMessage': 'Message', 'sim.btnMore': 'More',
      'sim.bannerSpecs': 'Cover banner specs (Canva / Figma)',
      'sim.motto': 'Banner tagline', 'sim.paletteAria': 'Color palette',
      'sim.c1': 'UNAL blue', 'sim.c2': 'Digital teal', 'sim.c3': 'Accent', 'sim.c4': 'Surface',
      'sim.headlineTitle': 'Headline selector',
      'sim.headlineSub': 'Pick a variant: it is applied to the simulator and the export. LinkedIn limit: 220 characters.',
      'about.title': '“About” section',
      'about.sub': 'Highlighted fields are editable and stay in sync between Spanish and English.',
      'about.cardTitle': 'About',
      'exp.title': 'Experience, roles & impact projects',
      'exp.sub': 'Fill in pending metrics: they update both language versions.',
      'exp.metricsTitle': 'Editable metrics',
      'exp.rolesTitle': 'Leadership track record (UNAL)',
      'exp.alliancesTitle': 'Inter-institutional partnerships & projects',
      'exp.usedIn': 'Used in',
      'skills.title': 'Skills matrix & tech stack',
      'skills.sub': '12 skills with their exact Spanish and English equivalents.',
      'skills.filterAria': 'Filter by category',
      'skills.caption': 'Skills in Spanish and English',
      'skills.colEs': 'Español', 'skills.colEn': 'English', 'skills.colCat': 'Category', 'skills.colCopy': 'Copy',
      'skills.all': 'All', 'skills.copyLang': 'Copy visible (EN)', 'skills.copyBoth': 'Copy ES + EN',
      'skills.stackTitle': 'Tech stack',
      'cat.ped': 'Pedagogy & Enablement', 'cat.gov': 'IT Management & Governance', 'cat.arch': 'Architecture & Cloud',
      'plan.title': 'Action plan: recommendations & content',
      'plan.sub': 'Level 2 · Execution and network growth.',
      'plan.stepsTitle': 'Implementation steps',
      'plan.recsTitle': 'Recommendation request manager',
      'plan.recsSub': 'Check each request once sent. Choose the message language per contact.',
      'plan.matrixTitle': 'Content matrix · 1–2 posts per week',
      'plan.postsTitle': 'Post templates',
      'plan.recPending': 'Not requested yet', 'plan.recDone': 'Request sent',
      'plan.recPreview': 'View message', 'plan.recLang': 'Message language',
      'plan.copyInvite': 'Copy invitation message',
      'plan.postMeta': 'IT Unit Director · UNAL',
      'plan.ideas': 'Ideas',
      'cta.title': 'Bilingual guide, ready to publish',
      'cta.sub': 'Download a clean Markdown file with both versions (ES / EN) for LinkedIn’s “Add profile in another language”.',
      footer: 'IT Unit · School of Economic Sciences · National University of Colombia. Changes are saved automatically in this browser.',
      copy: 'Copy text', copied: 'Copied!',
      chars: '{n} / {max} characters',
      recommended: 'Recommended', selected: 'Selected',
      pendingN: '{n} metrics pending', pending1: '1 metric pending', pendingNone: 'All metrics complete',
      stepsOf: '{n} of {t}', recsOf: '{n} of {t} sent',
      'toast.copied': 'Text copied to clipboard',
      'toast.copiedPending': 'Copied. Heads up: some metrics are still pending (X / N)',
      'toast.copyFail': 'Copy failed. Please select the text manually.',
      'toast.lang': 'Language switched to English',
      'toast.exported': 'Bilingual guide exported (.md)',
      'toast.reset': 'Values restored',
      'toast.storage': 'This browser blocks saving: changes will be lost on close.',
      confirmReset: 'Reset all values? Saved metrics, headline choice and checklists will be cleared.'
    }
  };

  /* ------------------------------------------------------------------
     3. CONTENIDO ESTRATÉGICO BILINGÜE
     ------------------------------------------------------------------ */
  const CONTENT = {
    es: {
      diag: {
        current: 'Perfil con alto potencial, pero sin señales claras de liderazgo tecnológico para buscadores y reclutadores.',
        currentList: [
          'Titular genérico: «Docente de gestión en Universidad Nacional de Colombia».',
          'Banner gris predeterminado, vacío.',
          'Red de 167 contactos con alto potencial de crecimiento.',
          'Logros clave de gestión TI y virtualización subexpuestos.'
        ],
        target: 'Referente en Gobierno de TI, Transformación Digital Educativa, Cloud, IA, Analítica de Datos y Enablement Engineering (escalar la autonomía tecnológica de equipos y organizaciones).',
        audience: ['Gerentes', 'Reclutadores de TI', 'Clientes corporativos', 'Desarrolladores', 'Pares de la industria', 'Comunidad universitaria', 'Aliados académicos'],
        table: [
          ['Titular', 'Genérico, sin palabras clave', 'Cargo + Gobierno de TI, Cloud, IA y Analítica'],
          ['Banner', 'Gris predeterminado, vacío', 'Banner 1584×396 con lema de transformación digital'],
          ['Acerca de', 'Sin narrativa de valor', 'Gancho + Enablement Engineering + hitos + llamado a la acción'],
          ['Experiencia', 'Logros de gestión TI subexpuestos', 'Hitos cuantificados: cursos, % de reducción, uptime'],
          ['Aptitudes', 'No alineadas al posicionamiento', '12 aptitudes en 3 categorías + stack técnico'],
          ['Red', '167 contactos', 'Crecimiento con contenido semanal y 5 recomendaciones'],
          ['Idiomas', 'Solo español', 'Perfil secundario en inglés para alcance internacional']
        ]
      },
      banner: 'Transformación Digital, Gobierno de TI y Enablement Engineering | UIFCE - Universidad Nacional de Colombia',
      oldHeadline: 'Docente de gestión en Universidad Nacional de Colombia',
      headlines: [
        { title: 'Opción 1 · Institucional', badge: 'recommended', text: 'Director de la Unidad de Informática de la Facultad de Ciencias Económicas de la Universidad Nacional de Colombia.' },
        { title: 'Opción 2 · Optimizada SEO (máximo alcance)', text: 'Director Unidad de Informática FCE - Universidad Nacional de Colombia | Gobierno de TI, Cloud, IA y Analítica de Datos | Transformación Digital Educativa & Enablement Engineering' },
        { title: 'Opción 3 · Liderazgo y autonomía tech', text: 'Director de Informática UIFCE (UNAL) | Estrategia TI, Ecosistemas e-Learning & Arquitectura Cloud | Escalando la autonomía tecnológica en educación y organizaciones' }
      ],
      about:
`¿Tu equipo técnico o educativo sigue dependiendo de consultores para resolver sus bloqueos del día a día? El verdadero cuello de botella organizativo no es la falta de talento, sino la falta de autonomía: cuando las personas reciben respuestas prefabricadas en lugar de desarrollar la capacidad de resolver problemas de forma independiente, la escalabilidad de tu organización se detiene.

A lo largo de más de {{years}} años en la intersección entre ingeniería de software, gestión de infraestructura y pedagogía técnica (Enablement Engineering), me he dedicado a transformar equipos altamente dependientes en células autosuficientes mediante metodologías de aprendizaje activo (Aprendizaje Basado en Indagación y ABP) e ingeniería de plataformas de autoservicio.

Como Director de la Unidad de Informática de la Facultad de Ciencias Económicas (UIFCE) de la Universidad Nacional de Colombia, lidero la gobernanza de TI, la continuidad operativa, la ciberseguridad y la adopción de tecnologías emergentes (Cloud, Analítica de Datos e Inteligencia Artificial) al servicio de la docencia, la investigación y la extensión.

**Hitos destacados:**
• Creación e implementación integral del Área de Virtualización y e-Learning con ecosistemas LMS escalables.
• Liderazgo técnico y virtualización de proyectos interinstitucionales para entidades como DIAN, Ministerio de Salud y Protección Social, SENA, INPEC, CORTOLIMA y Facultad de Derecho.
• Optimización de procesos administrativos y migración a la nube de servicios institucionales de alta demanda.

¿Listo para escalar la tecnología y la autonomía digital de tu entorno académico o empresarial sin fricción? Conectemos.`,
      exp: {
        title: 'Director de la Unidad de Informática (UIFCE)',
        org: 'Facultad de Ciencias Económicas · Universidad Nacional de Colombia · Bogotá',
        hitos: [
          { t: 'Virtualización y e-Learning', d: 'Creación e implementación integral del Área de Virtualización Académica y e-Learning, con un ecosistema LMS escalable (Moodle / Canvas) proyectado hacia programas de posgrado: {{courses}} cursos virtualizados y {{students}} estudiantes impactados.' },
          { t: 'Cloud y automatización', d: 'Optimización de los tiempos de respuesta en procesos digitales mediante migración a la nube, destacando el aplicativo de solicitudes y certificados para cursos libres: reducción del {{reduction}} en tiempos de entrega para {{users}} usuarios.' },
          { t: 'Infraestructura y uptime', d: 'Aseguramiento de alta disponibilidad ({{uptime}} de uptime), ciberseguridad y rendimiento de plataformas académicas y administrativas críticas, incluyendo gestión de licenciamiento y soporte continuo.' },
          { t: 'Enablement Engineering', d: 'Formación de {{trained}} profesionales y estudiantes bajo metodologías de indagación y ABP («aprender a pescar»), reduciendo la dependencia de terceros en proyectos de desarrollo.' }
        ]
      },
      roles: [
        ['Director de Informática Nivel Bogotá', 'Universidad Nacional de Colombia'],
        ['Dirección de Escuela', 'Facultad de Ciencias Económicas, UNAL'],
        ['Dirección de Carrera de Administración de Empresas', 'Facultad de Ciencias Económicas, UNAL'],
        ['Docente de Gestión y Tecnología', 'Universidad Nacional de Colombia']
      ],
      alliancesIntro: 'Prueba social: proyectos de virtualización, extensión e interventoría liderados desde la UIFCE.',
      alliances: [
        ['DIAN', 'Virtualización de formación para la Dirección de Impuestos y Aduanas Nacionales.'],
        ['Ministerio de Salud y Protección Social', 'Virtualización y extensión de programas formativos.'],
        ['SENA', 'Proyectos de virtualización e interventoría al SENA.'],
        ['INPEC', 'Virtualización de procesos formativos institucionales.'],
        ['CORTOLIMA', 'Proyecto interinstitucional de extensión y virtualización.'],
        ['Facultad de Derecho (UNAL)', 'Virtualización de cursos y apoyo tecnológico académico.'],
        ['Eventos y microtalleres UIFCE', 'Espacios de formación tecnológica para la comunidad universitaria.']
      ],
      stack: ['Python', 'Java', 'Microservicios', 'PostgreSQL', 'MySQL', 'Integración LMS'],
      rec: (name) =>
`Hola ${name}, ¡espero que estés muy bien!

Estoy fortaleciendo mi perfil profesional en LinkedIn para reflejar con mayor claridad el trabajo que hemos impulsado desde la Unidad de Informática de la Facultad de Ciencias Económicas (UIFCE) de la Universidad Nacional de Colombia.

Valoro mucho tu criterio y la experiencia que hemos compartido. ¿Te animarías a escribirme una breve recomendación? Si te resulta útil, podrías destacar alguno de estos aspectos:
• Liderazgo en gobierno de TI y transformación digital.
• La creación del Área de Virtualización y e-Learning.
• El enfoque de formar equipos autónomos («enseñar a pescar»).

Con gusto puedo corresponder con una recomendación para ti. ¡Muchas gracias de antemano!

Un abrazo,
Henry Martínez Sarmiento`,
      steps: [
        ['photo', 'Foto profesional en alta resolución', 'Fondo neutro, encuadre de hombros, mínimo 400 × 400 px.'],
        ['banner', 'Banner 1584 × 396 publicado', 'Lema bilingüe y paleta institucional.'],
        ['headline', 'Titular optimizado aplicado', 'Usa la variante seleccionada en el simulador.'],
        ['about', '«Acerca de» publicado', 'Con años de experiencia confirmados.'],
        ['exp', 'Experiencia UIFCE con 4 hitos', 'Sin métricas pendientes (X / N).'],
        ['roles', 'Roles directivos y alianzas registrados', 'Informática Nivel Bogotá, Escuela, Carrera y proyectos.'],
        ['skills', '12 aptitudes cargadas', 'Fija las 3 principales: Gobierno de TI, Transformación Digital y Cloud.'],
        ['english', 'Perfil secundario en inglés', 'Perfil → «Agregar perfil en otro idioma» → English.'],
        ['url', 'URL pública personalizada', 'Ej.: linkedin.com/in/henrymartinezsarmiento'],
        ['post', 'Primera publicación de la matriz', 'Usa una de las 3 plantillas listas.']
      ],
      pillars: [
        { icon: '🤖', c: '#4f46e5', name: 'Inteligencia Artificial en Educación', desc: 'IA generativa como aliada del aprendizaje activo y la autonomía.', ideas: ['IA como tutor socrático', 'Políticas de uso responsable', 'Casos en el aula UNAL'] },
        { icon: '📊', c: '#0f766e', name: 'Ciencia y Analítica de Datos', desc: 'Decisiones institucionales basadas en datos y gobierno del dato.', ideas: ['Tableros de gestión académica', 'Calidad y gobierno del dato', 'Indicadores que cambian decisiones'] },
        { icon: '🧭', c: '#0b2a5b', name: 'Sistemas de Información Gerencial', desc: 'Gobierno de TI (ITIL / COBIT) alineado a la estrategia institucional.', ideas: ['Proceso antes que herramienta', 'Continuidad operativa', 'Arquitectura empresarial'] },
        { icon: '🦾', c: '#a3540b', name: 'Robótica y Tecnologías Emergentes', desc: 'Tendencias y su impacto en la educación superior y las empresas.', ideas: ['Cloud e hiperautomatización', 'Microtalleres UIFCE', 'Lecturas recomendadas'] },
        { icon: '🎓', c: '#0d9488', name: 'e-Learning / Enablement Engineering', desc: 'Formar equipos autosuficientes y ecosistemas LMS escalables.', ideas: ['Lecciones de virtualización', '«Enseñar a pescar» en TI', 'Diseño instruccional'] }
      ],
      posts: [
        { pillar: 'Inteligencia Artificial en Educación', text:
`La Inteligencia Artificial no debería darles la respuesta a nuestros estudiantes. Debería ayudarles a formular mejores preguntas.

En la Unidad de Informática de la Facultad de Ciencias Económicas de la Universidad Nacional de Colombia vemos la IA generativa como una aliada del aprendizaje activo, no como un atajo. La diferencia está en el diseño pedagógico:

• Usarla como «tutor socrático» que repregunta, en lugar de entregar soluciones.
• Pedir a los estudiantes que documenten su razonamiento y contrasten lo que propone el modelo.
• Evaluar el proceso (metacognición) y no solo el resultado final.

La meta no es que dependan de una nueva herramienta, sino que desarrollen autonomía para resolver problemas que todavía no existen.

¿Cómo están integrando la IA en sus aulas o equipos sin sacrificar el pensamiento crítico?

#InteligenciaArtificial #EducaciónSuperior #TransformaciónDigital #EnablementEngineering #UNAL` },
        { pillar: 'Ciencia y Analítica de Datos · SIG', text:
`Una facultad genera miles de datos cada semestre: inscripciones, uso de plataformas, solicitudes, certificados y tickets de soporte. La pregunta no es cuántos datos tenemos, sino cuántas decisiones tomamos con ellos.

Tres principios que aplicamos desde la gestión de TI:

• Un dato sin responsable no es un activo: cada indicador necesita un dueño y una pregunta de negocio.
• Primero el proceso, después el tablero: automatizar un flujo deficiente solo produce errores más rápido.
• Los Sistemas de Información Gerencial deben servir a la docencia, la investigación y la extensión, no al revés.

Cuando la analítica se integra al gobierno de TI, deja de ser un reporte y se convierte en ventaja estratégica.

¿Qué indicador cambió una decisión importante en tu organización este año?

#AnalíticaDeDatos #CienciaDeDatos #GobiernoDeTI #SistemasDeInformación #EducaciónSuperior` },
        { pillar: 'e-Learning / Enablement Engineering', text:
`Virtualizar un curso no es subir archivos PDF a una plataforma.

Tras liderar proyectos de virtualización y extensión con entidades como DIAN, Ministerio de Salud y Protección Social, SENA, INPEC y CORTOLIMA, estas son tres lecciones que aplico en cada proyecto:

1. El diseño instruccional va antes que la tecnología: el LMS (Moodle / Canvas) es el medio, no el fin.
2. La escalabilidad nace en la infraestructura: disponibilidad, seguridad y soporte se planean desde el día uno.
3. El mayor indicador de éxito es la autonomía: equipos capaces de mantener y mejorar sus cursos sin depender de terceros.

Eso es Enablement Engineering: no entregar el pescado, sino enseñar a pescar. Hoy el Área de Virtualización y e-Learning de la UIFCE suma {{courses}} cursos virtualizados.

¿Cuál ha sido tu mayor aprendizaje llevando la formación a entornos digitales?

#eLearning #DiseñoInstruccional #Moodle #EnablementEngineering #TransformaciónDigital` }
      ]
    },

    en: {
      diag: {
        current: 'A high-potential profile that still lacks clear technology-leadership signals for search and recruiters.',
        currentList: [
          'Generic headline: “Management Lecturer at National University of Colombia”.',
          'Default empty gray cover banner.',
          '167-connection network with high growth potential.',
          'Underexposed IT management and e-learning achievements.'
        ],
        target: 'Authority in IT Governance, Educational Digital Transformation, Cloud, AI, Data Analytics, and Enablement Engineering (scaling technological autonomy across teams and organizations).',
        audience: ['Executives & managers', 'IT recruiters', 'Corporate clients', 'Software developers', 'Industry peers', 'University community', 'Academic partners'],
        table: [
          ['Headline', 'Generic, no keywords', 'Title + IT Governance, Cloud, AI & Data Analytics'],
          ['Cover banner', 'Default empty gray', '1584×396 banner with digital transformation tagline'],
          ['About', 'No value narrative', 'Hook + Enablement Engineering + highlights + call to action'],
          ['Experience', 'Underexposed IT achievements', 'Quantified milestones: courses, % reduction, uptime'],
          ['Skills', 'Not aligned with positioning', '12 skills across 3 categories + tech stack'],
          ['Network', '167 connections', 'Growth through weekly content and 5 recommendations'],
          ['Languages', 'Spanish only', 'Secondary English profile for international reach']
        ]
      },
      banner: 'Digital Transformation, IT Governance & Enablement Engineering | UIFCE - National University of Colombia',
      oldHeadline: 'Management Lecturer at National University of Colombia',
      headlines: [
        { title: 'Option 1 · Institutional', badge: 'recommended', text: 'Director of the IT Unit at the School of Economic Sciences, National University of Colombia.' },
        { title: 'Option 2 · SEO-optimized (maximum reach)', text: 'IT Unit Director, School of Economic Sciences - National University of Colombia | IT Governance, Cloud, AI & Data Analytics | Higher Ed Digital Transformation & Enablement Engineering' },
        { title: 'Option 3 · Leadership & tech autonomy', text: 'IT Director UIFCE (UNAL) | IT Strategy, e-Learning Ecosystems & Cloud Architecture | Scaling Technological Autonomy in Higher Education & Enterprises' }
      ],
      about:
`Does your technical or academic team still rely on external consultants to resolve day-to-day bottlenecks? The real organizational bottleneck isn't a lack of talent—it's a lack of autonomy. When people are handed pre-packaged answers instead of developing the capability to solve problems independently, organizational scalability stalls.

For more than {{years}} years at the intersection of software engineering, infrastructure management, and technical pedagogy (Enablement Engineering), I have focused on transforming high-dependency teams into self-sufficient units through active learning methodologies (Inquiry-Based Learning and PBL) and self-service platform engineering.

As Director of the IT Unit at the School of Economic Sciences (UIFCE), National University of Colombia, I lead IT governance, operational continuity, cybersecurity, and the adoption of emerging technologies (Cloud, Data Analytics, and Artificial Intelligence) to empower teaching, research, and institutional outreach.

**Key Highlights:**
• End-to-end creation and deployment of the Academic Virtualization & e-Learning Unit featuring scalable LMS ecosystems.
• Technical leadership and course virtualization for major inter-institutional projects with DIAN, Ministry of Health and Social Protection, SENA, INPEC, CORTOLIMA, and the School of Law.
• Administrative workflow optimization and cloud migration for high-demand institutional services.

Ready to scale technology and digital autonomy across your academic or enterprise ecosystem without friction? Let's connect.`,
      exp: {
        title: 'IT Unit Director (UIFCE)',
        org: 'School of Economic Sciences · National University of Colombia · Bogotá',
        hitos: [
          { t: 'Virtualization & e-Learning', d: 'Built and launched the Academic Virtualization & e-Learning Unit end to end, with a scalable LMS ecosystem (Moodle / Canvas) designed to support graduate programs: {{courses}} courses virtualized and {{students}} learners reached.' },
          { t: 'Cloud & automation', d: 'Cut digital process response times through cloud migration—most notably the request and certificate platform for open courses: {{reduction}} faster turnaround for {{users}} users.' },
          { t: 'Infrastructure & uptime', d: 'Ensured high availability ({{uptime}} uptime), cybersecurity, and performance for mission-critical academic and administrative platforms, including license management and continuous support.' },
          { t: 'Enablement Engineering', d: 'Trained {{trained}} professionals and students through inquiry-based learning and PBL (“teach them to fish”), reducing reliance on third parties in software development projects.' }
        ]
      },
      roles: [
        ['Bogotá Campus IT Director', 'National University of Colombia'],
        ['School Director', 'School of Economic Sciences, UNAL'],
        ['Director of the Business Administration Program', 'School of Economic Sciences, UNAL'],
        ['Management & Technology Lecturer', 'National University of Colombia']
      ],
      alliancesIntro: 'Social proof: virtualization, outreach, and project oversight initiatives led from UIFCE.',
      alliances: [
        ['DIAN', 'Training virtualization for Colombia’s National Tax and Customs Authority.'],
        ['Ministry of Health and Social Protection', 'Virtualization and outreach of training programs.'],
        ['SENA', 'Virtualization projects and project oversight (interventoría) for SENA.'],
        ['INPEC', 'Virtualization of institutional training processes.'],
        ['CORTOLIMA', 'Inter-institutional outreach and virtualization project.'],
        ['School of Law (UNAL)', 'Course virtualization and academic technology support.'],
        ['UIFCE events & micro-workshops', 'Technology training sessions for the university community.']
      ],
      stack: ['Python', 'Java', 'Microservices Architecture', 'PostgreSQL', 'MySQL', 'LMS Integration'],
      rec: (name) =>
`Hi ${name}, I hope you're doing well!

I'm strengthening my LinkedIn profile to better reflect the work we've driven at the IT Unit of the School of Economic Sciences (UIFCE), National University of Colombia.

I truly value your perspective and the experience we've shared. Would you be open to writing a brief recommendation? If helpful, you could highlight any of these areas:
• Leadership in IT governance and digital transformation.
• Building the Virtualization & e-Learning Unit.
• The focus on developing autonomous teams (“teach them to fish”).

I'd be glad to return the favor with a recommendation for you. Thank you in advance!

Best regards,
Henry Martínez Sarmiento`,
      steps: [
        ['photo', 'High-resolution professional photo', 'Neutral background, head-and-shoulders, at least 400 × 400 px.'],
        ['banner', '1584 × 396 cover banner published', 'Bilingual tagline and institutional palette.'],
        ['headline', 'Optimized headline applied', 'Use the variant selected in the simulator.'],
        ['about', '“About” section published', 'With confirmed years of experience.'],
        ['exp', 'UIFCE experience with 4 milestones', 'No pending metrics (X / N).'],
        ['roles', 'Leadership roles & partnerships added', 'Bogotá Campus IT, School, Program and projects.'],
        ['skills', '12 skills added', 'Pin top 3: IT Governance, Digital Transformation, Cloud.'],
        ['english', 'Secondary English profile', 'Profile → “Add profile in another language” → English.'],
        ['url', 'Custom public URL', 'e.g., linkedin.com/in/henrymartinezsarmiento'],
        ['post', 'First content-matrix post', 'Use one of the 3 ready-made templates.']
      ],
      pillars: [
        { icon: '🤖', c: '#4f46e5', name: 'AI in Education', desc: 'Generative AI as an ally of active learning and autonomy.', ideas: ['AI as a Socratic tutor', 'Responsible-use policies', 'Classroom cases at UNAL'] },
        { icon: '📊', c: '#0f766e', name: 'Data Science & Analytics', desc: 'Data-driven institutional decisions and data governance.', ideas: ['Academic management dashboards', 'Data quality & governance', 'Metrics that change decisions'] },
        { icon: '🧭', c: '#0b2a5b', name: 'Management Information Systems', desc: 'IT governance (ITIL / COBIT) aligned with institutional strategy.', ideas: ['Process before tools', 'Business continuity', 'Enterprise architecture'] },
        { icon: '🦾', c: '#a3540b', name: 'Robotics & Emerging Tech', desc: 'Trends and their impact on higher education and enterprises.', ideas: ['Cloud & hyperautomation', 'UIFCE micro-workshops', 'Recommended reads'] },
        { icon: '🎓', c: '#0d9488', name: 'e-Learning / Enablement Engineering', desc: 'Building self-sufficient teams and scalable LMS ecosystems.', ideas: ['Virtualization lessons learned', '“Teach them to fish” in IT', 'Instructional design'] }
      ],
      posts: [
        { pillar: 'AI in Education', text:
`AI shouldn't hand our students the answer. It should help them ask better questions.

At the IT Unit of the School of Economic Sciences, National University of Colombia, we see generative AI as an ally of active learning—not a shortcut. The difference lies in pedagogical design:

• Use it as a “Socratic tutor” that asks follow-up questions instead of delivering solutions.
• Ask students to document their reasoning and challenge what the model proposes.
• Assess the process (metacognition), not just the final output.

The goal isn't dependence on yet another tool—it's building the autonomy to solve problems that don't exist yet.

How are you bringing AI into your classrooms or teams without sacrificing critical thinking?

#ArtificialIntelligence #HigherEducation #DigitalTransformation #EnablementEngineering #EdTech` },
        { pillar: 'Data Science & Analytics · MIS', text:
`A university school generates thousands of data points every semester: enrollments, platform usage, requests, certificates, and support tickets. The question isn't how much data we have—it's how many decisions we make with it.

Three principles we apply in IT management:

• Data without an owner isn't an asset: every metric needs an accountable owner and a business question.
• Process first, dashboard second: automating a broken workflow only produces errors faster.
• Management Information Systems must serve teaching, research, and outreach—not the other way around.

When analytics is embedded in IT governance, it stops being a report and becomes a strategic advantage.

Which metric changed a key decision in your organization this year?

#DataAnalytics #DataScience #ITGovernance #InformationSystems #HigherEducation` },
        { pillar: 'e-Learning / Enablement Engineering', text:
`Virtualizing a course isn't uploading PDFs to a platform.

After leading virtualization and outreach projects with organizations such as DIAN, Colombia's Ministry of Health and Social Protection, SENA, INPEC, and CORTOLIMA, here are three lessons I apply to every project:

1. Instructional design comes before technology: the LMS (Moodle / Canvas) is the means, not the end.
2. Scalability starts with infrastructure: availability, security, and support are planned from day one.
3. The ultimate success metric is autonomy: teams able to maintain and improve their courses without relying on third parties.

That's Enablement Engineering: don't hand out the fish—teach people to fish. Today, the UIFCE Virtualization & e-Learning Unit has {{courses}} courses virtualized.

What has been your biggest lesson in taking learning to digital environments?

#eLearning #InstructionalDesign #Moodle #EnablementEngineering #DigitalTransformation` }
      ]
    }
  };

  const SKILLS = [
    { cat: 'ped',  es: 'Aprendizaje Basado en Problemas (ABP) y Proyectos (ABPro)', en: 'Problem-Based Learning (PBL) & Project-Based Learning' },
    { cat: 'ped',  es: 'Diseño Instruccional y Creación de Entornos Virtuales (E-learning)', en: 'Instructional Design & Virtual Learning Environments (e-Learning)' },
    { cat: 'ped',  es: 'Desarrollo de Autonomía y Metacognición en Estudiantes', en: 'Learner Autonomy & Metacognition Development' },
    { cat: 'ped',  es: 'Formación de Formadores (Train the Trainers)', en: 'Train the Trainer & Technical Enablement' },
    { cat: 'ped',  es: 'Método Socrático y Facilitación del Aprendizaje', en: 'Socratic Method & Inquiry-Based Facilitation' },
    { cat: 'ped',  es: 'Evaluación por Competencias y Coevaluación', en: 'Competency-Based Assessment & Peer Evaluation' },
    { cat: 'gov',  es: 'Gestión y Gobierno de TI (ITIL / COBIT)', en: 'IT Governance & Service Management (ITIL / COBIT)' },
    { cat: 'gov',  es: 'Transformación Digital e Institucional', en: 'Enterprise & Higher Ed Digital Transformation' },
    { cat: 'arch', es: 'Arquitectura de Infraestructura Cloud y On-Premise (AWS / Azure)', en: 'Cloud & Hybrid Infrastructure Architecture (AWS / Azure)' },
    { cat: 'arch', es: 'Implementación y Gestión de Ecosistemas LMS (Moodle / Canvas)', en: 'LMS Ecosystem Implementation & Administration (Moodle / Canvas)' },
    { cat: 'arch', es: 'Ciberseguridad y Continuidad Operativa (Uptime)', en: 'Cybersecurity & Business Continuity (High Availability / Uptime)' },
    { cat: 'gov',  es: 'Optimización de Procesos y Eliminación de Cuellos de Botella', en: 'Process Optimization & Bottleneck Elimination' }
  ];

  const CONTACTS = [
    { id: 'carlos-rodriguez', name: 'Carlos Rodríguez' },
    { id: 'jair-duque', name: 'Jair Duque' },
    { id: 'orlando-villabona', name: 'Orlando Villabona' },
    { id: 'alejandro-rodriguez', name: 'Alejandro Rodríguez' },
    { id: 'cesar-mendoza', name: 'César Mendoza' }
  ];

  /* ------------------------------------------------------------------
     4. ESTADO + PERSISTENCIA
     ------------------------------------------------------------------ */
  const defaultState = () => ({
    lang: 'es',
    vars: { ...DEFAULT_VARS },
    headline: 0,
    simView: 'after',
    skillFilter: 'all',
    steps: {},
    recs: {},
    recLang: {}
  });

  let storageOk = true;
  const load = () => {
    const base = defaultState();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return base;
      const saved = JSON.parse(raw);
      return {
        ...base,
        ...saved,
        lang: saved.lang === 'en' ? 'en' : 'es',
        vars: { ...base.vars, ...(saved.vars || {}) },
        headline: [0, 1, 2].includes(saved.headline) ? saved.headline : 0,
        steps: saved.steps || {},
        recs: saved.recs || {},
        recLang: saved.recLang || {}
      };
    } catch (e) {
      storageOk = false;
      return base;
    }
  };

  let state = load();
  let saveTimer = 0;
  const save = () => {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
      catch (e) {
        if (storageOk) { storageOk = false; toast(t('toast.storage'), 'warn'); }
      }
    }, 150);
  };

  /* ------------------------------------------------------------------
     5. UTILIDADES
     ------------------------------------------------------------------ */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const C = () => CONTENT[state.lang];
  const other = () => (state.lang === 'es' ? 'en' : 'es');

  const t = (key, params) => {
    let s = (UI[state.lang] && UI[state.lang][key]) ?? UI.es[key] ?? key;
    if (params) Object.keys(params).forEach(k => { s = s.replace(`{${k}}`, params[k]); });
    return s;
  };

  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const isPending = (v) => !/\d/.test(String(v || ''));
  const initials = (name) => name.split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
  const usesPending = (tpl) => {
    const keys = (tpl.match(/\{\{(\w+)\}\}/g) || []).map(m => m.slice(2, -2));
    return keys.some(k => isPending(state.vars[k]));
  };

  /** Texto plano para LinkedIn (sustituye variables, quita marcas Markdown). */
  const plain = (tpl) => tpl
    .replace(/\{\{(\w+)\}\}/g, (m, k) => state.vars[k] ?? '')
    .replace(/\*\*(.+?)\*\*/g, '$1');

  /** Texto Markdown (sustituye variables, conserva negritas). */
  const md = (tpl) => tpl.replace(/\{\{(\w+)\}\}/g, (m, k) => state.vars[k] ?? '');

  const varInput = (k) => {
    const v = state.vars[k] ?? '';
    const label = VAR_META[k] ? VAR_META[k][state.lang] : k;
    return `<input type="text" class="var${isPending(v) ? ' is-pending' : ''}" data-var="${k}" value="${esc(v)}" size="${Math.max(String(v).length, 2)}" aria-label="${esc(label)}" spellcheck="false" autocomplete="off">`;
  };

  const inline = (s) => esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\{\{(\w+)\}\}/g, (m, k) => varInput(k));

  /** Convierte una plantilla en HTML con párrafos, viñetas y campos editables. */
  const richHTML = (tpl) => tpl.split(/\n{2,}/).map(block => {
    const lines = block.split('\n');
    let html = '', para = [], list = [];
    const flushP = () => { if (para.length) { html += `<p>${para.map(inline).join('<br>')}</p>`; para = []; } };
    const flushL = () => { if (list.length) { html += `<ul class="bullets">${list.map(l => `<li>${inline(l)}</li>`).join('')}</ul>`; list = []; } };
    lines.forEach(l => {
      if (/^•\s/.test(l)) { flushP(); list.push(l.replace(/^•\s*/, '')); }
      else { flushL(); para.push(l); }
    });
    flushP(); flushL();
    return html;
  }).join('');

  const ICON_COPY = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/></svg>';
  const ICON_CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';

  /* ------------------------------------------------------------------
     6. TOASTS
     ------------------------------------------------------------------ */
  const toast = (msg, type = 'ok') => {
    const box = $('#toasts');
    const el = document.createElement('div');
    el.className = `toast${type === 'warn' ? ' toast--warn' : type === 'error' ? ' toast--error' : ''}`;
    el.textContent = msg;
    box.appendChild(el);
    while (box.children.length > 3) box.firstElementChild.remove();
    setTimeout(() => {
      el.classList.add('is-leaving');
      el.addEventListener('animationend', () => el.remove(), { once: true });
      setTimeout(() => el.remove(), 400);
    }, 2600);
  };

  /* ------------------------------------------------------------------
     7. PORTAPAPELES
     ------------------------------------------------------------------ */
  const copyGetters = {};
  const registerCopy = (id, fn, tplFn) => { copyGetters[id] = { fn, tplFn }; };

  const writeClipboard = async (text) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (e) { /* se intenta el método alternativo */ }
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none;';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    ta.remove();
    return ok;
  };

  const paintCopyButton = (btn) => {
    if (btn.classList.contains('is-copied')) return;
    const label = t(btn.dataset.labelKey || 'copy');
    if (btn.classList.contains('btn-copy--icon')) {
      btn.innerHTML = `${ICON_COPY}<span class="sr-only">${esc(label)}</span>`;
    } else if (btn.classList.contains('btn-copy')) {
      btn.innerHTML = `${ICON_COPY}<span class="lbl">${esc(label)}</span>`;
    } else {
      btn.innerHTML = `<span class="lbl">${esc(label)}</span>`;
    }
  };
  const paintCopyButtons = () => $$('[data-copy]').forEach(paintCopyButton);

  const handleCopy = async (btn) => {
    const entry = copyGetters[btn.dataset.copy];
    if (!entry) return;
    const text = entry.fn();
    const ok = await writeClipboard(text);
    if (!ok) { toast(t('toast.copyFail'), 'error'); return; }
    const pending = entry.tplFn ? usesPending(entry.tplFn()) : false;
    toast(pending ? t('toast.copiedPending') : t('toast.copied'), pending ? 'warn' : 'ok');
    btn.classList.add('is-copied');
    const icon = (btn.classList.contains('btn-copy')) ? ICON_CHECK : '';
    btn.innerHTML = btn.classList.contains('btn-copy--icon')
      ? `${ICON_CHECK}<span class="sr-only">${esc(t('copied'))}</span>`
      : `${icon}<span class="lbl">${esc(t('copied'))}</span>`;
    clearTimeout(btn._timer);
    btn._timer = setTimeout(() => { btn.classList.remove('is-copied'); paintCopyButton(btn); }, 1600);
  };

  /* ------------------------------------------------------------------
     8. RENDERIZADO
     ------------------------------------------------------------------ */
  const renderStatic = () => {
    document.documentElement.lang = state.lang;
    $$('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
    $$('.langswitch__btn').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === state.lang)));
    $('#statYears').textContent = state.vars.years || '—';
  };

  const renderDiag = () => {
    const d = C().diag;
    $('#diagCurrent').textContent = d.current;
    $('#diagCurrentList').innerHTML = d.currentList.map(i => `<li>${esc(i)}</li>`).join('');
    $('#diagTarget').textContent = d.target;
    $('#diagAudience').innerHTML = d.audience.map(a => `<li>${esc(a)}</li>`).join('');
    $('#diagTable').innerHTML = d.table.map(r => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td><td>${esc(r[2])}</td></tr>`).join('');
  };

  const bannerSpecs = (lang) => {
    const motto = CONTENT[lang].banner;
    return lang === 'es'
? `FORMATO
• Dimensiones: 1584 × 396 px (relación 4:1)
• Exportar: PNG o JPG, máx. 8 MB, perfil de color sRGB

ZONA SEGURA
• La foto de perfil cubre la esquina inferior izquierda (≈ 0–560 px en X / 200–396 px en Y)
• Ubicar el lema en los dos tercios derechos, alineado a la derecha
• Margen interno mínimo: 60 px · En móvil se recortan ~10 % por lado

TIPOGRAFÍA
• Lema: Plus Jakarta Sans ExtraBold, 44–52 px, #FFFFFF
• Etiqueta «UIFCE · UNAL»: Plus Jakarta Sans Bold, 18 px, espaciado 18 %, #7EE8D8

COLOR Y GRÁFICOS
• Degradado 120°: #061733 → #0B2A5B (45 %) → #0F766E
• Retícula técnica: líneas #FFFFFF al 5 %, cada 28 px
• Nodos de red: círculos #14B8A6 con resplandor suave

LEMA
"${motto}"`
: `FORMAT
• Size: 1584 × 396 px (4:1 ratio)
• Export: PNG or JPG, max 8 MB, sRGB color profile

SAFE ZONE
• Profile photo covers the bottom-left corner (≈ 0–560 px on X / 200–396 px on Y)
• Place the tagline across the right two-thirds, right-aligned
• Minimum inner margin: 60 px · Mobile crops ~10% per side

TYPOGRAPHY
• Tagline: Plus Jakarta Sans ExtraBold, 44–52 px, #FFFFFF
• “UIFCE · UNAL” label: Plus Jakarta Sans Bold, 18 px, 18% tracking, #7EE8D8

COLOR & GRAPHICS
• 120° gradient: #061733 → #0B2A5B (45%) → #0F766E
• Tech grid: #FFFFFF lines at 5% opacity, every 28 px
• Network nodes: #14B8A6 circles with a soft glow

TAGLINE
"${motto}"`;
  };

  const renderSim = () => {
    const c = C();
    const before = state.simView === 'before';
    $('#liCard').classList.toggle('is-before', before);
    $$('.seg__btn').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.sim === state.simView)));
    $('#bannerMotto').textContent = c.banner;
    $('#liHeadline').textContent = before ? c.oldHeadline : c.headlines[state.headline].text;
    $('#bannerSpecs').textContent = bannerSpecs(state.lang);
    $('#bannerMottoText').textContent = c.banner;
  };

  const renderHeadlines = () => {
    const c = C();
    $('#headlines').innerHTML = c.headlines.map((h, i) => {
      const len = h.text.length;
      const sel = i === state.headline;
      return `
        <label class="headline${sel ? ' is-selected' : ''}">
          <input type="radio" name="headline" value="${i}" ${sel ? 'checked' : ''}>
          <div>
            <div class="headline__label">
              <strong>${esc(h.title)}</strong>
              ${h.badge ? `<span class="tag tag--ok">${esc(t('recommended'))}</span>` : ''}
              ${sel ? `<span class="tag">${esc(t('selected'))}</span>` : ''}
            </div>
            <p class="headline__text">${esc(h.text)}</p>
          </div>
          <div class="headline__side">
            <span class="counter${len > 220 ? ' is-over' : ''}">${esc(t('chars', { n: len, max: 220 }))}</span>
            <button type="button" class="btn-copy" data-copy="headline-${i}"></button>
          </div>
        </label>`;
    }).join('');
    c.headlines.forEach((h, i) => registerCopy(`headline-${i}`, () => C().headlines[i].text));
  };

  const renderAbout = () => {
    $('#aboutText').innerHTML = richHTML(C().about);
  };

  const renderVarsPanel = () => {
    const lang = state.lang;
    $('#varsPanel').innerHTML = Object.keys(VAR_META).map(k => {
      const m = VAR_META[k];
      const id = `var-${k}`;
      const v = state.vars[k] ?? '';
      return `
        <div class="metric">
          <label for="${id}">${esc(m[lang])}<small>${esc(t('exp.usedIn'))}: ${esc(lang === 'es' ? m.useEs : m.useEn)} · ${esc(m[other()])}</small></label>
          <input type="text" id="${id}" class="var${isPending(v) ? ' is-pending' : ''}" data-var="${k}" value="${esc(v)}" spellcheck="false" autocomplete="off">
        </div>`;
    }).join('');
    updatePendingTag();
  };

  const updatePendingTag = () => {
    const n = Object.keys(VAR_META).filter(k => isPending(state.vars[k])).length;
    const tag = $('#pendingTag');
    tag.className = `tag ${n ? 'tag--warn' : 'tag--ok'}`;
    tag.textContent = n === 0 ? t('pendingNone') : n === 1 ? t('pending1') : t('pendingN', { n });
  };

  const renderExp = () => {
    const e = C().exp;
    $('#expTitle').textContent = e.title;
    $('#expOrg').textContent = e.org;
    $('#expHitos').innerHTML = e.hitos.map(h => `<li><h4>${esc(h.t)}</h4><p>${inline(h.d)}</p></li>`).join('');
    $('#rolesList').innerHTML = C().roles.map(r => `<li><div><strong>${esc(r[0])}</strong><span>${esc(r[1])}</span></div></li>`).join('');
    $('#alliancesIntro').textContent = C().alliancesIntro;
    $('#alliancesList').innerHTML = C().alliances.map(a => `<li><strong>${esc(a[0])}</strong><span>${esc(a[1])}</span></li>`).join('');
  };

  const visibleSkills = () => SKILLS.filter(s => state.skillFilter === 'all' || s.cat === state.skillFilter);

  const renderSkills = () => {
    const cats = ['all', 'ped', 'gov', 'arch'];
    $('#skillFilters').innerHTML = cats.map(c => {
      const count = c === 'all' ? SKILLS.length : SKILLS.filter(s => s.cat === c).length;
      return `<button type="button" class="filter" data-filter="${c}" aria-pressed="${state.skillFilter === c}">${esc(c === 'all' ? t('skills.all') : t('cat.' + c))}<span class="count">${count}</span></button>`;
    }).join('');
    $('#skillsBody').innerHTML = SKILLS.map((s, i) => `
      <tr class="${state.skillFilter === 'all' || state.skillFilter === s.cat ? '' : 'is-hidden'}">
        <td>${String(i + 1).padStart(2, '0')}</td>
        <td lang="es">${esc(s.es)}</td>
        <td lang="en">${esc(s.en)}</td>
        <td><span class="cat cat--${s.cat}">${esc(t('cat.' + s.cat))}</span></td>
        <td><button type="button" class="btn-copy btn-copy--icon" data-copy="skill-${i}" title="${esc(s[state.lang])}"></button></td>
      </tr>`).join('');
    SKILLS.forEach((s, i) => registerCopy(`skill-${i}`, () => s[state.lang]));
    $('#stackList').innerHTML = C().stack.map(s => `<li>${esc(s)}</li>`).join('');
  };

  const renderSteps = () => {
    const steps = C().steps;
    $('#stepsList').innerHTML = steps.map(([id, title, hint]) => {
      const done = !!state.steps[id];
      return `<li class="step${done ? ' is-done' : ''}"><label><input type="checkbox" data-step="${id}" ${done ? 'checked' : ''}><span class="step__txt"><strong>${esc(title)}</strong><span>${esc(hint)}</span></span></label></li>`;
    }).join('');
    $('#stepsTag').textContent = t('stepsOf', { n: steps.filter(s => state.steps[s[0]]).length, t: steps.length });
  };

  const recLangOf = (id) => state.recLang[id] || state.lang;

  const renderRecs = () => {
    $('#recsList').innerHTML = CONTACTS.map(c => {
      const done = !!state.recs[c.id];
      const rl = recLangOf(c.id);
      const cb = `rec-${c.id}`;
      return `
        <li class="rec${done ? ' is-done' : ''}">
          <div class="rec__row">
            <input type="checkbox" id="${cb}" data-rec="${c.id}" ${done ? 'checked' : ''}>
            <label class="rec__name" for="${cb}">
              <span class="rec__avatar" aria-hidden="true">${esc(initials(c.name))}</span>
              <span>${esc(c.name)}<span class="rec__status">${esc(done ? t('plan.recDone') : t('plan.recPending'))}</span></span>
            </label>
            <span class="mini-lang" role="group" aria-label="${esc(t('plan.recLang'))}: ${esc(c.name)}">
              <button type="button" data-reclang="es" data-id="${c.id}" aria-pressed="${rl === 'es'}">ES</button>
              <button type="button" data-reclang="en" data-id="${c.id}" aria-pressed="${rl === 'en'}">EN</button>
            </span>
            <button type="button" class="btn-copy" data-copy="rec-${c.id}" data-label-key="plan.copyInvite"></button>
          </div>
          <details>
            <summary>${esc(t('plan.recPreview'))} (${rl.toUpperCase()})</summary>
            <pre lang="${rl}">${esc(CONTENT[rl].rec(c.name.split(' ')[0]))}</pre>
          </details>
        </li>`;
    }).join('');
    CONTACTS.forEach(c => registerCopy(`rec-${c.id}`, () => CONTENT[recLangOf(c.id)].rec(c.name.split(' ')[0])));
    const n = CONTACTS.filter(c => state.recs[c.id]).length;
    const tag = $('#recsTag');
    tag.className = `tag ${n === CONTACTS.length ? 'tag--ok' : ''}`;
    tag.textContent = t('recsOf', { n, t: CONTACTS.length });
  };

  const renderContent = () => {
    $('#pillars').innerHTML = C().pillars.map(p => `
      <article class="pillar" style="--c:${p.c}">
        <span class="pillar__icon" aria-hidden="true">${p.icon}</span>
        <h4>${esc(p.name)}</h4>
        <p>${esc(p.desc)}</p>
        <ul aria-label="${esc(t('plan.ideas'))}">${p.ideas.map(i => `<li>${esc(i)}</li>`).join('')}</ul>
      </article>`).join('');

    $('#posts').innerHTML = C().posts.map((p, i) => `
      <article class="post">
        <div class="post__head">
          <span class="post__avatar" aria-hidden="true">HM</span>
          <div class="post__who"><strong>Henry Martínez Sarmiento</strong><span>${esc(t('plan.postMeta'))}</span></div>
        </div>
        <div class="post__body rich">${richHTML(p.text)}</div>
        <div class="post__foot">
          <span class="tag tag--ok">${esc(p.pillar)}</span>
          <span class="counter" data-count="post-${i}" data-limit="3000"></span>
          <button type="button" class="btn-copy" data-copy="post-${i}"></button>
        </div>
      </article>`).join('');
    C().posts.forEach((p, i) => registerCopy(`post-${i}`, () => plain(C().posts[i].text), () => C().posts[i].text));
  };

  /* Contadores de caracteres */
  const counterSources = {
    about: () => plain(C().about)
  };
  const updateCounters = () => {
    $$('[data-count]').forEach(el => {
      const key = el.dataset.count;
      let text = '';
      if (counterSources[key]) text = counterSources[key]();
      else if (key.startsWith('post-')) text = plain(C().posts[+key.slice(5)].text);
      const max = +el.dataset.limit;
      el.textContent = t('chars', { n: text.length, max });
      el.classList.toggle('is-over', text.length > max);
    });
  };

  /* Progreso del perfil */
  const updateProgress = () => {
    const stepIds = CONTENT.es.steps.map(s => s[0]);
    const done = stepIds.filter(id => state.steps[id]).length + CONTACTS.filter(c => state.recs[c.id]).length;
    const total = stepIds.length + CONTACTS.length;
    const pct = Math.round((done / total) * 100);
    $('#progressFill').style.width = `${pct}%`;
    $('#progressValue').textContent = `${pct}%`;
    const bar = $('#progressBar');
    bar.setAttribute('aria-valuenow', String(pct));
    bar.setAttribute('aria-label', t('progressTitle', { n: done, t: total }));
    $('#progressWrap').title = t('progressTitle', { n: done, t: total });
  };

  const renderAll = () => {
    renderStatic();
    renderDiag();
    renderSim();
    renderHeadlines();
    renderAbout();
    renderVarsPanel();
    renderExp();
    renderSkills();
    renderSteps();
    renderRecs();
    renderContent();
    paintCopyButtons();
    updateCounters();
    updateProgress();
  };

  /* ------------------------------------------------------------------
     9. TEXTOS PARA COPIAR (estáticos)
     ------------------------------------------------------------------ */
  const expPlain = (lang) => {
    const e = CONTENT[lang].exp;
    return `${e.title}\n${e.org}\n\n${e.hitos.map(h => `• ${h.t}: ${plain(h.d)}`).join('\n')}`;
  };
  const rolesPlain = (lang) => CONTENT[lang].roles.map(r => `• ${r[0]} — ${r[1]}`).join('\n');
  const alliancesPlain = (lang) => `${CONTENT[lang].alliancesIntro}\n\n${CONTENT[lang].alliances.map(a => `• ${a[0]}: ${a[1]}`).join('\n')}`;

  registerCopy('bannerSpecs', () => bannerSpecs(state.lang));
  registerCopy('bannerMotto', () => C().banner);
  registerCopy('about', () => plain(C().about), () => C().about);
  registerCopy('exp', () => expPlain(state.lang), () => C().exp.hitos.map(h => h.d).join(' '));
  registerCopy('roles', () => rolesPlain(state.lang));
  registerCopy('alliances', () => alliancesPlain(state.lang));
  registerCopy('stack', () => C().stack.join(' · '));
  registerCopy('skillsLang', () => visibleSkills().map(s => s[state.lang]).join('\n'));
  registerCopy('skillsBoth', () => visibleSkills().map(s => `${s.es} | ${s.en}`).join('\n'));

  /* ------------------------------------------------------------------
     10. EXPORTACIÓN MARKDOWN BILINGÜE
     ------------------------------------------------------------------ */
  const buildMarkdown = () => {
    const today = new Date().toISOString().slice(0, 10);
    const L = (lang) => {
      const c = CONTENT[lang];
      const es = lang === 'es';
      const h = es
        ? { title: '🇪🇸 Versión en Español', banner: 'Lema del banner', head: 'Titulares', sel: 'seleccionado', about: 'Acerca de', exp: 'Experiencia', roles: 'Trayectoria y roles directivos', all: 'Alianzas y proyectos interinstitucionales', skills: 'Aptitudes', stack: 'Stack tecnológico', rec: 'Mensaje de solicitud de recomendación', posts: 'Plantillas de publicaciones', pillar: 'Pilar' }
        : { title: '🇺🇸 English Version', banner: 'Cover banner tagline', head: 'Headlines', sel: 'selected', about: 'About', exp: 'Experience', roles: 'Leadership track record', all: 'Inter-institutional partnerships & projects', skills: 'Skills', stack: 'Tech stack', rec: 'Recommendation request message', posts: 'Post templates', pillar: 'Pillar' };
      return [
        `## ${h.title}`,
        `### ${h.banner}`, `> ${c.banner}`,
        `### ${h.head}`,
        c.headlines.map((x, i) => `${i + 1}. **${x.title}**${i === state.headline ? ` _(${h.sel})_` : ''}\n   ${x.text}`).join('\n'),
        `### ${h.about}`, md(c.about),
        `### ${h.exp}`,
        `**${c.exp.title}** — ${c.exp.org}\n\n${c.exp.hitos.map(x => `- **${x.t}:** ${md(x.d)}`).join('\n')}`,
        `### ${h.roles}`, c.roles.map(r => `- **${r[0]}** — ${r[1]}`).join('\n'),
        `### ${h.all}`, `${c.alliancesIntro}\n\n${c.alliances.map(a => `- **${a[0]}:** ${a[1]}`).join('\n')}`,
        `### ${h.skills}`, SKILLS.map((s, i) => `${i + 1}. ${s[lang]}`).join('\n'),
        `### ${h.stack}`, c.stack.join(' · '),
        `### ${h.rec}`, '```text\n' + c.rec(es ? '[Nombre]' : '[Name]') + '\n```',
        `### ${h.posts}`,
        c.posts.map((p, i) => `#### ${i + 1}. ${h.pillar}: ${p.pillar}\n\n${md(p.text)}`).join('\n\n---\n\n')
      ].join('\n\n');
    };

    const pendingList = Object.keys(VAR_META).filter(k => isPending(state.vars[k]));
    const metrics = Object.keys(VAR_META).map(k => `| ${VAR_META[k].es} / ${VAR_META[k].en} | ${state.vars[k] || '—'}${isPending(state.vars[k]) ? ' ⚠️' : ''} |`).join('\n');

    return [
      '# Guía Bilingüe de LinkedIn · Bilingual LinkedIn Guide',
      '**Henry Martínez Sarmiento** — Director UIFCE · Universidad Nacional de Colombia',
      `Perfil / Profile: ${PROFILE_URL}  \nGenerado / Generated: ${today}`,
      '## Métricas / Metrics',
      `| Variable | Valor / Value |\n|---|---|\n${metrics}`,
      pendingList.length ? `> ⚠️ ${pendingList.length} métricas pendientes / pending metrics. Complétalas antes de publicar.` : '> ✅ Todas las métricas completas / All metrics complete.',
      '---',
      L('es'),
      '---',
      L('en'),
      '---',
      '_Tip: LinkedIn → Perfil → «Agregar perfil en otro idioma» / Profile → “Add profile in another language”._'
    ].join('\n\n') + '\n';
  };

  const exportMarkdown = () => {
    const blob = new Blob([buildMarkdown()], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Guia-LinkedIn-Henry-Martinez-Sarmiento-ES-EN.md';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast(t('toast.exported'));
  };

  /* ------------------------------------------------------------------
     11. EVENTOS
     ------------------------------------------------------------------ */
  const setLang = (lang) => {
    if (lang === state.lang) return;
    state.lang = lang;
    save();
    renderAll();
    toast(t('toast.lang'));
  };

  document.addEventListener('click', (e) => {
    const target = e.target;
    const langBtn = target.closest('.langswitch__btn');
    if (langBtn) { setLang(langBtn.dataset.lang); return; }

    const copyBtn = target.closest('[data-copy]');
    if (copyBtn) { e.preventDefault(); handleCopy(copyBtn); return; }

    const simBtn = target.closest('[data-sim]');
    if (simBtn) { state.simView = simBtn.dataset.sim; save(); renderSim(); return; }

    const filterBtn = target.closest('[data-filter]');
    if (filterBtn) {
      state.skillFilter = filterBtn.dataset.filter;
      save();
      renderSkills();
      paintCopyButtons();
      return;
    }

    const recLangBtn = target.closest('[data-reclang]');
    if (recLangBtn) {
      state.recLang[recLangBtn.dataset.id] = recLangBtn.dataset.reclang;
      save();
      const openIds = $$('.rec details[open]').map(d => d.closest('.rec').querySelector('[data-rec]').dataset.rec);
      renderRecs();
      paintCopyButtons();
      openIds.forEach(id => { const cb = $(`[data-rec="${id}"]`); if (cb) cb.closest('.rec').querySelector('details').open = true; });
      return;
    }

    const action = target.closest('[data-action]');
    if (action) {
      if (action.dataset.action === 'export') exportMarkdown();
      if (action.dataset.action === 'reset') {
        if (!window.confirm(t('confirmReset'))) return;
        const lang = state.lang;
        state = defaultState();
        state.lang = lang;
        save();
        renderAll();
        toast(t('toast.reset'));
      }
    }
  });

  document.addEventListener('change', (e) => {
    const el = e.target;
    if (el.name === 'headline') {
      state.headline = +el.value;
      save();
      renderHeadlines();
      paintCopyButtons();
      renderSim();
      const radio = $(`input[name="headline"][value="${state.headline}"]`);
      if (radio) radio.focus();
    } else if (el.dataset.step) {
      state.steps[el.dataset.step] = el.checked;
      save();
      el.closest('.step').classList.toggle('is-done', el.checked);
      $('#stepsTag').textContent = t('stepsOf', { n: C().steps.filter(s => state.steps[s[0]]).length, t: C().steps.length });
      updateProgress();
    } else if (el.dataset.rec) {
      state.recs[el.dataset.rec] = el.checked;
      save();
      const li = el.closest('.rec');
      li.classList.toggle('is-done', el.checked);
      li.querySelector('.rec__status').textContent = el.checked ? t('plan.recDone') : t('plan.recPending');
      const n = CONTACTS.filter(c => state.recs[c.id]).length;
      const tag = $('#recsTag');
      tag.className = `tag ${n === CONTACTS.length ? 'tag--ok' : ''}`;
      tag.textContent = t('recsOf', { n, t: CONTACTS.length });
      updateProgress();
    }
  });

  /* Sincronización en tiempo real de variables entre todas las vistas e idiomas */
  document.addEventListener('input', (e) => {
    const el = e.target;
    if (!el.matches('input.var')) return;
    const k = el.dataset.var;
    const v = el.value;
    state.vars[k] = v;
    $$(`input.var[data-var="${k}"]`).forEach(i => {
      if (i !== el) i.value = v;
      if (!i.closest('.metric')) i.size = Math.max(v.length, 2);
      i.classList.toggle('is-pending', isPending(v));
    });
    if (k === 'years') $('#statYears').textContent = v || '—';
    updatePendingTag();
    updateCounters();
    save();
  });

  /* Enter dentro de un campo inline confirma (evita saltos de línea accidentales) */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.matches('input.var')) { e.preventDefault(); e.target.blur(); }
  });

  /* Navegación activa según la sección visible */
  const initScrollSpy = () => {
    if (!('IntersectionObserver' in window)) return;
    const links = $$('.mainnav a');
    const map = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          links.forEach(a => { a.classList.remove('is-active'); a.removeAttribute('aria-current'); });
          const a = map.get(en.target.id);
          if (a) { a.classList.add('is-active'); a.setAttribute('aria-current', 'true'); }
        }
      });
    }, { rootMargin: '-35% 0px -60% 0px' });
    map.forEach((a, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  };

  /* ------------------------------------------------------------------
     12. INICIO
     ------------------------------------------------------------------ */
  const init = () => {
    $('[data-copy="skillsLang"]').dataset.labelKey = 'skills.copyLang';
    $('[data-copy="skillsBoth"]').dataset.labelKey = 'skills.copyBoth';
    renderAll();
    initScrollSpy();
    try { localStorage.setItem(STORAGE_KEY + ':probe', '1'); localStorage.removeItem(STORAGE_KEY + ':probe'); }
    catch (e) { storageOk = false; }
    if (!storageOk) toast(t('toast.storage'), 'warn');
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
