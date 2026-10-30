export const site = {
  name: "La Vendimia",
  tagline: "El gusto de compartir",
  url: "https://example.com", // TODO(cliente): dominio real
  showPrices: false, // Catálogo de consulta: cotización por WhatsApp.
  indexable: false, // TODO(cliente): activar al aprobar la publicación
  whatsapp: "51936416623",
  phoneDisplay: "+51 936 416 623",
  address: ["Dirección de ejemplo 123", "Ica, Perú"], // TODO(cliente)
  logo: "../assets/brand/lavendimia-imagotipo.svg",
  logoHeader: "../assets/brand/lavendimia-logotipo.svg",
  logoSymbol: "../assets/brand/lavendimia-isotipo.svg",
  shipping: "Envíos a todo el Perú",
  ageNotice: "Solo para mayores de 18 años. Disfruta con responsabilidad.",
  description:
    "Vinos, piscos, cremas y macerados desde Ica. Descubre tu favorito y consulta sus presentaciones por WhatsApp. Envíos a todo el Perú.",
  generalMessage:
    "¡Hola, La Vendimia! Vi su catálogo y me gustaría conocer más sobre sus productos.",
};
export const categories = {
  vinos: {
    label: "Vinos",
    short: "Vinos",
    phrase: "Para quedarse un poco más.",
  },
  especiales: {
    label: "Especiales",
    short: "Especiales",
    phrase: "Un vino para una ocasión especial.",
  },
  piscos: {
    label: "Piscos",
    short: "Piscos",
    phrase: "Un brindis muy nuestro.",
  },
  cremas: {
    label: "Cremas de pisco",
    short: "Cremas",
    phrase: "Un pequeño gusto, un gran momento.",
  },
  macerados: {
    label: "Macerados",
    short: "Macerados",
    phrase: "Atrévete a probar algo distinto.",
  },
} as const;
export const copy = {
  ui: {
    referenceImage: "Imagen referencial",
    demoImageNote: "Imagen referencial para la demo; la etiqueta y el envase pueden variar.",
    seccion01NuestraColeccion: "01 / NUESTRA COLECCIÓN",
    comoTeGusta: "¿Cómo te gusta ",
    brindar: "brindar?",
    deLosClasicosDeSiempre: "De los clásicos de siempre",
    aTuProximoGranDescubrimiento: "a tu próximo gran descubrimiento.",
    seccion03SiempreHayUnMotivo: "03 / SIEMPRE HAY UN MOTIVO",
    elMomentoLoPonesTu: "El momento lo pones tú.",
    laCopaLaEncontramosJuntos: "La copa, la encontramos juntos.",
    vinosPiscosCremasYMacerados: "Vinos, piscos, cremas y macerados.",
    desdeIca: "DESDE ICA",
    conGusto: "CON GUSTO",
    nbspExploraATuGusto: "↓  EXPLORA A TU GUSTO",
    vinosPiscosCremasMaceradosDesdeIca:
      "VINOS · PISCOS · CREMAS · MACERADOS · DESDE ICA · ",
    descubrir: "Descubrir ↗",
    desdeIcaPeru: "Desde Ica, Perú.",
    explora: "EXPLORA",
    laColeccion: "La colección",
    nuestraEsencia: "Nuestra esencia",
    paraCadaMomento: "Para cada momento",
    conversemos: "CONVERSEMOS",
    navegacionDelPie: "Navegación del pie",
    volverAlInicio: "Volver al inicio",
    eligeTuPresentacion: "Elige tu presentación",
    consultaElPrecioYLaDisponibilidad:
      "Consulta el precio y la disponibilidad por WhatsApp.",
    consultarEsteProducto: "Consultar esta presentación",
    presentationLabel: "Presentación",
    capacityLabel: "Capacidad por envase",
    quantityLabel: "Cantidad incluida",
    quantityHelp:
      "¿Necesitas varias cajas o unidades? Cuéntanos cuántas por WhatsApp y te cotizamos.",
    cerrarDetalleDelProducto: "Cerrar detalle del producto",
    lasBuenasConversacionesEmpiezanConUn:
      "LAS BUENAS CONVERSACIONES EMPIEZAN CON UN HOLA.",
    brindamosPor: "¿Brindamos por ",
    algoBueno: "algo bueno?",
    cuentanosQueTeGustaTeAyudamos:
      "Cuéntanos qué te gusta. Te ayudamos a encontrarlo.",
    hablemosPorWhatsapp: "Hablemos por WhatsApp",
    atencionDirecta: "Atención directa",
    diferentesPresentaciones: "Diferentes presentaciones",
    escribenosPorWhatsapp: "Escríbenos por WhatsApp",
    eligeDescubreDisfruta: "ELIGE. DESCUBRE. DISFRUTA.",
    tuProxima: "Tu próxima ",
    buenaCopa: "buena copa.",
    aTuGustoATuMedida: "A tu gusto, a tu medida.",
    todaLaColeccion: "Toda la colección",
    buscarEnElCatalogo: "Buscar en el catálogo",
    consultaPresentacionesYPreciosPorWhatsapp:
      "Consulta presentaciones y precios por WhatsApp",
    tuFavoritoPuedeEstarAUna: "Tu favorito puede estar a una búsqueda.",
    limpiarFiltros: "Limpiar filtros",
    verMas: "Ver más",
    filtrarPorCategoria: "Filtrar por categoría",
    queTeProvoca: "¿Qué te provoca?",
    escribenos: "Escríbenos",
    abrirMenu: "Abrir menú",
    navegacionPrincipal: "Navegación principal",
    seccion02NuestraEsencia: "02 / NUESTRA ESENCIA",
    masQueUnaCopa: "Más que una copa.",
    loQueCompartimos: "Lo que compartimos.",
    nosEncantaraConocerte: "Nos encantará conocerte",
  },
  announcement: "DESDE ICA, CON MUCHO GUSTO.",
  hero: {
    eyebrow: "EL GUSTO DE COMPARTIR",
    title: "Los buenos momentos se sirven",
    italic: "en copa.",
    description:
      "Un vino que reúne. Un pisco que celebra. Un sabor que se queda contigo.",
    cta: "Encuentra tu favorito",
    caption: "Una invitación a disfrutar.",
    note: "Muchas formas de brindar. Una sola Vendimia.",
  },
  essence: [
    "Nos gustan las mesas largas, las conversaciones sin prisa y esos encuentros que merecen repetirse.",
    "En La Vendimia reunimos vinos, piscos, cremas y macerados para acompañar tu manera de celebrar. Desde Ica, hasta donde estés en el Perú.",
  ],
  moments: [
    {
      title: "Una mesa compartida.",
      text: "La conversación pone el ambiente. Tú eliges el vino.",
      cta: "Encuentra tu vino",
      category: "vinos",
    },
    {
      title: "Un brindis especial.",
      text: "Por lo que celebras hoy y lo bueno que está por venir.",
      cta: "Descubre los piscos",
      category: "piscos",
    },
    {
      title: "Un detalle con gusto.",
      text: "Para sorprender a alguien. O para darte ese gusto.",
      cta: "Explora las cremas",
      category: "cremas",
    },
  ],
};
export const whatsappUrl = (message: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
export type Variant = {
  capacity: string | null;
  presentation: string;
  price?: number;
};
/** Explica las unidades sin inferir el tipo de envase a partir de su capacidad. */
export const presentationDetails = (variant: Variant) => {
  const box = /^Caja\s*x\s*(\d+)$/i.exec(variant.presentation.trim());
  const count = box ? Number(box[1]) : null;
  const presentation =
    count !== null
      ? `Caja de ${count} ${count === 1 ? "unidad" : "unidades"}`
      : variant.presentation;
  const capacity = variant.capacity ?? "Por confirmar";
  const quantity =
    count !== null
      ? `${count} ${count === 1 ? "envase" : "envases"} por caja`
      : /^(Unidad|Bidón)$/i.test(variant.presentation)
        ? "1 envase"
        : "Por confirmar";
  const label = variant.capacity
    ? `${presentation} · ${capacity}${count !== null ? " cada unidad" : ""}`
    : `${presentation} · capacidad por confirmar`;
  return { presentation, capacity, quantity, label };
};
export const productMessage = (name: string, variant: Variant) =>
  `¡Hola, ${site.name}! Me interesa ${name}, presentación ${presentationDetails(variant).label}. ¿Me comparten ${site.showPrices && variant.price !== undefined ? "la disponibilidad" : "el precio y la disponibilidad"}?`;
export const capacityValue = (capacity: string | null) => {
  const number = Number(capacity?.match(/[\d.,]+/)?.[0].replace(",", ".") ?? 0);
  return number * (/lt|litro|\bl\b/i.test(capacity ?? "") ? 1000 : 1);
};
export const productTitle = (name: string) =>
  name.replace(/^(Vino |Crema de |Macerado de )/i, "");
