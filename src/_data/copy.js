/**
 * PAGE COPY (Spanish, Puerto Rico)
 * ---------------------------------------------------------------------------
 * All visible text lives here. Edit the strings; the layout adapts.
 * Business facts (phone, email, address, hours) live in site.js.
 *
 * Accuracy rules for this file:
 *  - No founding dates, owners, reviews, certifications, prices, service areas,
 *    warranties or brand names unless the business has confirmed them.
 *  - No performance promises ("dura X años", "100% impermeable", etc.).
 *
 * {phone} and {email} inside a string are replaced with the values from site.js.
 */

export default {
  // Header and footer navigation. "header: false" keeps a link out of the top bar.
  nav: [
    { label: "Nosotros", href: "#nosotros" },
    { label: "Soluciones", href: "#soluciones" },
    { label: "Cómo funciona", href: "#sistema" },
    { label: "Preguntas", href: "#preguntas", header: false },
    { label: "Contacto", href: "#contacto" },
  ],

  cta: {
    info: "Solicitar información",
    call: "Llamar",
    callLong: "Llamar al {phone}",
  },

  hero: {
    eyebrow: "Techos e impermeabilización",
    // One entry per line of the headline. The last line is highlighted.
    title: ["Que el agua", "se quede", "afuera."],
    lede: "Lion Enterprises ofrece sistemas de impermeabilización y sellado de techos para hogares, negocios y contratistas. Desde Hatillo, Puerto Rico.",
    // Labels on the roof drawing.
    drawing: {
      parapet: "Pretil",
      membrane: "Membrana continua",
      heater: "Calentador solar",
      tank: "Cisterna",
      drain: "Desagüe",
    },
  },

  // The three customer groups under the hero. "filter" must match a key in solutions.filters.
  audiences: {
    label: "A quién servimos",
    items: [
      {
        filter: "hogar",
        title: "Para tu casa",
        text: "Sella el techo o atiende una filtración sabiendo qué opciones tienes.",
      },
      {
        filter: "contratistas",
        title: "Para contratistas",
        text: "Información de sistemas y productos para tus trabajos de impermeabilización.",
      },
      {
        filter: "negocios",
        title: "Para tu negocio",
        text: "Techos y estructuras comerciales, sea cual sea el tamaño del proyecto.",
      },
    ],
    linkLabel: "Ver soluciones",
  },

  about: {
    eyebrow: "Nosotros",
    title: "Empezamos como contratistas. Hoy pensamos en la estructura completa.",
    paragraphs: [
      "Lion Enterprises abrió sus puertas como contratista de impermeabilización. Con el tiempo vimos que hacía falta un producto superior y seguro para el ambiente, capaz de impermeabilizar toda la estructura.",
      "Por eso unimos fuerzas con el representante técnico de un fabricante y comenzamos a ofrecer sistemas de impermeabilización a nuestros clientes: dueños de hogar, contratistas y negocios.",
    ],
    statement: "Para nosotros no hay proyecto demasiado grande ni demasiado pequeño.",
    mission: {
      label: "Nuestra misión",
      text: "Brindar un servicio excelente y productos de impermeabilización de la más alta calidad.",
    },
    pillars: [
      {
        title: "Servicio",
        text: "Atender bien a cada cliente es parte de la misión, sin importar el tamaño del proyecto.",
      },
      {
        title: "Calidad",
        text: "Nos comprometemos a seguir ofreciendo sistemas de impermeabilización de la mejor calidad.",
      },
      {
        title: "Estructura completa",
        text: "Vemos la impermeabilización como protección para toda la estructura.",
      },
    ],
  },

  solutions: {
    eyebrow: "Productos y soluciones",
    title: "Empieza por lo que necesitas proteger.",
    intro:
      "Cada superficie y cada proyecto piden algo distinto. Busca tu caso, mira qué información conviene tener a la mano y solicita los detalles.",
    filterLabel: "Ver soluciones para",
    filters: [
      { key: "todos", label: "Todos" },
      { key: "hogar", label: "Hogar" },
      { key: "contratistas", label: "Contratistas" },
      { key: "negocios", label: "Negocios" },
    ],
    // {shown} and {total} are replaced with numbers. Read aloud by screen readers when the filter changes.
    countLabel: "Mostrando {shown} de {total} soluciones",
    haveLabel: "Ten a la mano",
    // icon: techo | gota | capas | estructura | envase | edificio
    // audiences: which filters show the card (keys from "filters" above, except "todos").
    items: [
      {
        id: "techos",
        icon: "techo",
        title: "Sellado de techos",
        text: "Sistemas de impermeabilización para techos. Cuál conviene depende del tipo de techo, de su condición y de lo que ya tenga aplicado.",
        have: ["Tipo de techo: hormigón, metal u otro", "Tamaño aproximado del área", "Si ya tiene algún sellado"],
        audiences: ["hogar", "contratistas", "negocios"],
      },
      {
        id: "filtraciones",
        icon: "gota",
        title: "Filtraciones y humedad",
        text: "Si ya entra agua, lo primero es entender por dónde. Fíjate dónde aparece la humedad y cuándo: ¿solo con aguaceros fuertes o cada vez que llueve?",
        have: ["Fotos del área, por dentro y por fuera", "Cuándo notaste el problema", "Arreglos que se hayan hecho antes"],
        audiences: ["hogar", "negocios"],
      },
      {
        id: "resellado",
        icon: "capas",
        title: "Techos ya sellados",
        text: "Antes de aplicar algo nuevo sobre un sellado existente conviene saber qué sistema tiene el techo y en qué condición está: no todos los productos son compatibles entre sí.",
        have: ["Qué producto se aplicó, si lo sabes", "Hace cuánto se selló", "Fotos de grietas, ampollas o áreas levantadas"],
        audiences: ["hogar", "negocios"],
      },
      {
        id: "estructura",
        icon: "estructura",
        title: "Más allá del techo",
        text: "La impermeabilización no termina en el techo. Si tienes otra superficie expuesta al agua o a la humedad, pregúntanos qué opciones hay para ese caso.",
        have: ["Qué superficie es y de qué material", "Si está en contacto constante con agua", "Fotos del área"],
        audiences: ["hogar", "contratistas", "negocios"],
      },
      {
        id: "contratistas",
        icon: "envase",
        title: "Productos para contratistas",
        text: "¿Tienes un trabajo de sellado o impermeabilización? Solicita información de sistemas y productos para tu proyecto.",
        have: ["Tipo de superficie y área aproximada", "Fecha estimada del trabajo", "Especificaciones del proyecto, si las hay"],
        audiences: ["contratistas"],
      },
      {
        id: "comercial",
        icon: "edificio",
        title: "Proyectos comerciales",
        text: "Para techos y estructuras de negocios y edificios comerciales. Cuéntanos el alcance del proyecto y te orientamos sobre el sistema.",
        have: ["Tipo de edificio y área aproximada", "Condición actual del techo", "Persona de contacto y mejor hora para llamar"],
        audiences: ["negocios"],
      },
    ],

    // CONFIRMED PRODUCT LINES ONLY. Leave empty until the business confirms what it currently carries.
    // When this list has entries, a "Líneas de producto" block appears under the solution cards.
    // Example entry:
    //   { name: "Nombre del producto", brand: "Marca", text: "Qué es y para qué se usa.", link: { label: "Ficha técnica", href: "https://…" } }
    // "brand" and "link" are optional.
    productLinesTitle: "Líneas de producto",
    productLines: [],

    note: {
      title: "Marcas y disponibilidad",
      text: "Los productos, las marcas y las especificaciones disponibles se confirman directamente con Lion Enterprises. Solicita información para recibir los detalles vigentes.",
    },
  },

  system: {
    eyebrow: "Cómo funciona",
    title: "Impermeabilizar es crear una barrera continua.",
    intro: [
      "El agua no necesita mucho espacio: una grieta fina, una junta abierta o un desagüe tapado le bastan para entrar.",
      "Un sistema de impermeabilización crea una barrera continua entre la estructura y el agua. No es una sola mano de producto: son varios pasos que trabajan juntos.",
    ],
    layersLabel: "El sistema, capa por capa",
    diagramLabel: "Diagrama de un sistema de impermeabilización separado en capas, de la superficie a la capa de acabado.",
    // Listed from the bottom layer up. kind sets how the layer is drawn: base | primer | mesh | membrane | finish
    layers: [
      {
        kind: "base",
        title: "La superficie",
        tag: "Preparación",
        text: "Todo empieza abajo. La superficie debe estar limpia, seca y firme, con las grietas y los daños reparados. Si queda polvo, humedad o material suelto, lo que se aplique encima no se adhiere como debe.",
      },
      {
        kind: "primer",
        title: "El primer",
        tag: "Adherencia",
        text: "Prepara la superficie para recibir el sistema y ayuda a que las capas siguientes se adhieran. No todos los sistemas ni todas las superficies lo requieren.",
      },
      {
        kind: "mesh",
        title: "El refuerzo de los detalles",
        tag: "Puntos críticos",
        text: "Juntas, grietas, esquinas, desagües, pretiles y bases de equipos son los puntos por donde el agua entra con más facilidad. Por eso se atienden primero y, según el sistema, se refuerzan con tela o malla.",
      },
      {
        kind: "membrane",
        title: "La membrana impermeable",
        tag: "Barrera",
        text: "Es la capa que detiene el agua. Debe quedar continua, sin interrupciones, y con el espesor que indica el fabricante; aplicar menos material del indicado puede comprometer el resultado.",
      },
      {
        kind: "finish",
        title: "La capa de acabado",
        tag: "Protección",
        text: "Protege el sistema del sol y del desgaste diario. En algunos sistemas es una capa aparte; en otros, la misma membrana cumple esa función.",
      },
    ],
    care: {
      title: "Después, mantenimiento",
      text: "Ningún sistema se cuida solo. Mantener los desagües limpios, evitar que el agua se quede empozada y revisar el techo de vez en cuando, sobre todo después de lluvias fuertes, ayuda a detectar problemas a tiempo.",
    },
    disclaimer:
      "Guía general. Cada sistema tiene sus propios pasos y requisitos; siempre mandan las instrucciones del fabricante.",
  },

  faq: {
    eyebrow: "Preguntas frecuentes",
    title: "Lo que más nos preguntan.",
    aside: "¿Tienes otra pregunta?",
    items: [
      {
        q: "¿Cómo sé si mi techo necesita atención?",
        a: "Hay señales comunes: manchas de humedad o pintura levantada en el interior, goteras cuando llueve, agua que se queda empozada en el techo, y grietas, ampollas o áreas levantadas en el sellado. Si notas alguna, conviene revisarlo antes de que el problema crezca.",
      },
      {
        q: "¿Sellar el techo es lo mismo que pintarlo?",
        a: "No. La pintura es un acabado. Un sistema de impermeabilización está formulado para detener el agua y se aplica siguiendo pasos y espesores específicos.",
      },
      {
        q: "¿Cuánto dura un sellado de techo?",
        a: "Depende del sistema, de la preparación de la superficie, de la aplicación, del clima y del mantenimiento. Por eso aquí no damos un número general. Al solicitar información, pregunta por las especificaciones del fabricante del sistema que te interese.",
      },
      {
        q: "¿Cuánto cuesta?",
        a: "Depende del tamaño del área, de la condición de la superficie y del sistema que se elija. Cuéntanos sobre tu proyecto y te orientamos.",
      },
      {
        q: "¿Qué información debo tener cuando llame?",
        a: "Ayuda saber el tipo de superficie, el tamaño aproximado del área, si tiene un sellado anterior y qué problema has notado. Si puedes, ten fotos a la mano.",
      },
      {
        q: "¿Trabajan con contratistas y proyectos comerciales?",
        a: "Sí. Trabajamos con dueños de hogar, contratistas y clientes comerciales. Para nosotros no hay proyecto demasiado grande ni demasiado pequeño.",
      },
    ],
  },

  contact: {
    eyebrow: "Contacto",
    title: "Cuéntanos qué quieres proteger.",
    intro:
      "Llama o envía tu solicitud. Dinos el tipo de superficie, el tamaño aproximado y qué has notado: mientras más detalles, mejor podremos orientarte.",
    labels: {
      phone: "Teléfono",
      email: "Correo electrónico",
      location: "Ubicación",
      address: "Dirección",
      hours: "Horario",
    },
    form: {
      title: "Solicitar información",
      requiredNote: "Los campos marcados con * son obligatorios.",
      optional: "opcional",
      name: "Nombre",
      phone: "Teléfono",
      email: "Correo electrónico",
      clientType: "Tipo de cliente",
      clientTypes: ["Hogar", "Contratista", "Negocio"],
      topic: "Tema",
      topicDefault: "Información general",
      message: "Mensaje",
      messageHint: "Tipo de superficie, tamaño aproximado y qué has notado.",

      // Shown when a form service is connected (site.form.endpoint is set).
      endpoint: {
        submit: "Solicitar información",
        sending: "Enviando…",
        successTitle: "Solicitud enviada.",
        successText: "Recibimos tu mensaje. Si es urgente, llámanos al {phone}.",
        error: "No se pudo enviar la solicitud. Inténtalo de nuevo o llámanos al {phone}.",
        // CONFIRM with the business before connecting a form service.
        privacy: "Usamos tus datos únicamente para responder a tu solicitud.",
      },

      // Shown when no form service is connected: the form hands the message to the visitor's email app.
      mailto: {
        notice:
          "Este formulario no envía la solicitud por sí solo. Al continuar se abrirá tu aplicación de correo con el mensaje listo para enviar a {email}.",
        submit: "Continuar en mi correo",
        handoffTitle: "Falta un paso: envía el correo.",
        handoffText:
          "Tu aplicación de correo debe haberse abierto con la solicitud lista. Oprime enviar allí para completarla. ¿No se abrió? Copia la solicitud y envíala a {email}, o llámanos al {phone}.",
        copy: "Copiar solicitud",
        copied: "Solicitud copiada",
        copyFailed: "No se pudo copiar. Selecciona el texto y cópialo.",
        previewLabel: "Texto de tu solicitud",
        edit: "Editar solicitud",
        privacy: "Este sitio no guarda tus datos: la solicitud sale desde tu propio correo.",
        noscript:
          "Este formulario necesita JavaScript. Para solicitar información, llámanos al {phone} o escribe a {email}.",
      },

      // Subject line and labels used in the message that reaches the business.
      subject: "Solicitud de información",
      signature: "Solicitud preparada desde el sitio web de Lion Enterprises.",

      errors: {
        summary: "Revisa los campos marcados para continuar.",
        name: "Escribe tu nombre.",
        phone: "Escribe un teléfono de 10 dígitos, con código de área.",
        email: "Revisa el correo electrónico: parece incompleto.",
        message: "Cuéntanos brevemente qué necesitas.",
      },
    },
  },

  footer: {
    tagline: "Sistemas de impermeabilización y sellado de techos.",
    navLabel: "Secciones",
    contactLabel: "Contacto",
    top: "Volver arriba",
    rights: "Todos los derechos reservados.",
  },

  notFound: {
    title: "Página no encontrada",
    text: "La página que buscas no existe o cambió de lugar.",
    link: "Volver al inicio",
  },

  a11y: {
    skip: "Saltar al contenido",
    mainNav: "Navegación principal",
    menu: "Menú",
    close: "Cerrar",
    closeMenu: "Cerrar menú",
    home: "Lion Enterprises, ir al inicio",
    quickActions: "Contacto rápido",
  },
};
