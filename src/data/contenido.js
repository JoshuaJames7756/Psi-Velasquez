// ============================================
// CONTENIDO CENTRALIZADO — Rebeca Velásquez, Psicóloga Clínica
// Fuente: material Canva provisto por el cliente (JVSoftware edita este
// archivo directamente; no hay CMS para copy — solo panel para fotos/videos)
// ============================================

export const perfil = {
  nombre: "Rebeca Velásquez",
  titulo: "Psicóloga Clínica",
  colegiatura: null, // PENDIENTE — cliente en espera
  fraseHero: "Un espacio profesional y humano para comprender tus emociones y transitar momentos difíciles con mayor claridad.",
  bioCorta:
    "Rebeca Velásquez es psicóloga clínica, con formación en Terapia Cognitivo-Conductual y especialización en Psicología Hospitalaria. Atiende a adolescentes y adultos que atraviesan ansiedad, depresión y dificultades emocionales asociadas a distintas etapas de la vida, así como a procesos de salud y enfermedad médica.",
  enfoque:
    "Su trabajo se caracteriza por un abordaje clínico ético, basado en evidencia científica y centrado en la construcción de un espacio terapéutico seguro, claro y colaborativo.",
};

export const formacion = [
  {
    titulo: "Terapia Cognitivo-Conductual",
    institucion: "Beck Institute",
  },
  {
    titulo: "Especialización en Psicología Hospitalaria",
    institucion: "Hospital Israelita Albert Einstein — São Paulo, Brasil",
  },
  {
    titulo: "Licenciatura en Psicología",
    institucion: "Universidad Católica Boliviana San Pablo",
  },
  {
    titulo: "Marriage and Family Studies",
    institucion: "Brigham Young University–Idaho",
    nota: "Aporta una mirada integral sobre las dinámicas relacionales, los vínculos y el contexto vital de cada paciente.",
  },
];

// NOTA IMPORTANTE: los campos queEs/sintomas/comoAyuda de cada especialidad
// son un BORRADOR de copywriting (redactado por JVSoftware para completar
// el sitio). Rebeca debe revisarlos y ajustarlos antes de publicar —
// es contenido de salud mental y su validación profesional es necesaria.
export const especialidades = [
  {
    id: "ansiedad",
    nombre: "Ansiedad",
    resumen: "Ansiedad y preocupación persistente",
    queEs:
      "La ansiedad es una respuesta natural del cuerpo ante el estrés, pero cuando se vuelve constante o desproporcionada, puede afectar tu día a día.",
    sintomas: [
      "Preocupación difícil de controlar",
      "Tensión física, inquietud o cansancio",
      "Dificultad para concentrarte o dormir",
      "Sensación de alerta constante",
    ],
    comoAyuda:
      "A través de la Terapia Cognitivo-Conductual, trabajamos juntas para identificar los pensamientos que alimentan la ansiedad y desarrollar herramientas prácticas que te ayuden a recuperar calma y control.",
  },
  {
    id: "depresion",
    nombre: "Depresión",
    resumen: "Síntomas depresivos y desmotivación",
    queEs:
      "La depresión va más allá de sentirse triste algunos días; puede manifestarse como una falta de energía o motivación persistente que afecta cómo te ves a ti misma/o y al mundo.",
    sintomas: [
      "Tristeza persistente o vacío emocional",
      "Pérdida de interés en actividades que antes disfrutabas",
      "Cambios en el sueño o el apetito",
      "Sensación de cansancio o desmotivación constante",
    ],
    comoAyuda:
      "En terapia exploramos con cuidado lo que estás viviendo, sin juicio, y construimos juntas un camino realista para recuperar bienestar, paso a paso.",
  },
  {
    id: "estres",
    nombre: "Manejo del estrés",
    resumen: "Dificultades para manejar el estrés",
    queEs:
      "El estrés acumulado, cuando no se gestiona, puede afectar tu salud física y emocional, tus relaciones y tu rendimiento diario.",
    sintomas: [
      "Sensación de estar sobrepasada/o",
      "Irritabilidad o cambios de humor",
      "Dificultad para desconectar o descansar",
      "Tensión física (dolores de cabeza, contracturas)",
    ],
    comoAyuda:
      "Trabajamos en identificar tus fuentes de estrés y desarrollar estrategias concretas de afrontamiento adaptadas a tu vida real, no fórmulas genéricas.",
  },
  {
    id: "procesos_salud",
    nombre: "Procesos de salud",
    resumen: "Malestar emocional asociado a procesos de salud",
    queEs:
      "Enfrentar un diagnóstico, una enfermedad crónica, un duelo o un proceso médico complejo tiene un impacto emocional profundo que muchas veces queda en segundo plano frente a lo médico.",
    sintomas: [
      "Angustia frente a un diagnóstico o tratamiento",
      "Duelo por pérdidas de salud o de un ser querido",
      "Dificultad para adaptarte a una nueva realidad de vida",
      "Sensación de soledad en el proceso",
    ],
    comoAyuda:
      "Gracias a mi especialización en Psicología Hospitalaria, te acompaño con un enfoque que entiende tanto lo emocional como el contexto clínico, trabajando en colaboración con tu equipo de salud cuando es necesario.",
  },
  {
    id: "adaptacion",
    nombre: "Adaptación a cambios vitales",
    resumen: "Adaptación a cambios vitales y transiciones personales",
    queEs:
      "Cambios como una mudanza, un nuevo trabajo, la maternidad/paternidad o cualquier transición importante pueden generar inseguridad, aunque sean cambios positivos.",
    sintomas: [
      "Sensación de desorientación o inseguridad",
      "Dificultad para tomar decisiones",
      "Resistencia al cambio o miedo a lo nuevo",
      "Necesidad de reconstruir una rutina o identidad",
    ],
    comoAyuda:
      "Te acompaño a procesar el cambio con claridad, fortaleciendo tus propios recursos para adaptarte con mayor seguridad y menos angustia.",
  },
  {
    id: "pareja",
    nombre: "Relación de pareja",
    resumen: "Dificultades en la relación de pareja",
    queEs:
      "Las dificultades de pareja —comunicación, conflictos recurrentes, distanciamiento— pueden abordarse desde un espacio individual que te ayude a entender tu propio rol en la dinámica.",
    sintomas: [
      "Conflictos que se repiten sin resolverse",
      "Dificultad para comunicar lo que sientes o necesitas",
      "Sensación de desconexión con tu pareja",
      "Dudas sobre cómo continuar la relación",
    ],
    comoAyuda:
      "Trabajamos desde tu propia perspectiva, con una mirada informada también por estudios en dinámicas familiares y de pareja, para que puedas relacionarte desde un lugar más consciente.",
  },
];

export const servicios = {
  titulo: "Servicios psicológicos",
  descripcion: "Atención psicológica para adolescentes y adultos que enfrentan:",
  colaboracion:
    "Trabajo en colaboración con profesionales de la salud cuando la situación clínica lo requiere, favoreciendo un abordaje interdisciplinario.",
};

export const faq = [
  {
    pregunta: "¿Cómo sé si necesito iniciar un proceso psicológico?",
    respuesta:
      "Iniciar un proceso psicológico puede ser útil cuando una persona experimenta malestar emocional persistente, dificultades para afrontar situaciones de la vida cotidiana, síntomas de ansiedad o depresión, o cuando atraviesa cambios vitales o situaciones de salud que generan impacto emocional.",
  },
  {
    pregunta: "¿Con qué frecuencia se realizan las sesiones?",
    respuesta:
      "La frecuencia de las sesiones se define de manera individual, de acuerdo con la evaluación clínica y las necesidades de cada persona.",
  },
  {
    pregunta: "¿La atención psicológica es presencial u online?",
    respuesta:
      "La atención psicológica se realiza tanto de manera presencial como online. La modalidad se define en función de la evaluación clínica, la disponibilidad del paciente y las características del proceso terapéutico.",
  },
];

export const avisoEtico = `La información contenida en este sitio web tiene fines informativos y no sustituye la atención psicológica profesional.

Los servicios ofrecidos se brindan dentro de un encuadre ético y profesional, respetando la confidencialidad, la autonomía del paciente y los lineamientos establecidos por los códigos deontológicos de la psicología.

La atención psicológica se realiza previa evaluación clínica y no reemplaza tratamientos médicos ni psiquiátricos cuando estos sean necesarios.`;

export const contacto = {
  direccion: "Parque Fidel Anze N° 200 esq. Pando, Edif. V&V NUR",
  ciudad: "Cochabamba, Bolivia",
  modalidad: "Atención presencial en Cochabamba - Bolivia · Atención online",
  celular: "60389762",
  whatsappUrl: "https://wa.me/59160389762", // PENDIENTE confirmar formato con cliente
  instagramUrl: null, // PENDIENTE — falta el link exacto del perfil
  linkedinUrl: null,  // CONFIRMADO que lo usará — falta el link exacto del perfil
  email: null,        // CONFIRMADO que lo tendrá — falta la dirección exacta
  horario: null,       // PENDIENTE — cliente en espera
};

export const seo = {
  ciudad: "Cochabamba",
  pais: "Bolivia",
  tituloBase: "Rebeca Velásquez | Psicóloga Clínica en Cochabamba",
  descripcionBase:
    "Psicóloga clínica en Cochabamba especializada en ansiedad, depresión y procesos de salud. Terapia Cognitivo-Conductual con enfoque humano. Atención presencial y online.",
  paginas: {
    inicio: {
      titulo: "Rebeca Velásquez | Psicóloga Clínica en Cochabamba",
      descripcion:
        "Psicóloga clínica en Cochabamba especializada en ansiedad, depresión y procesos de salud. Terapia Cognitivo-Conductual con enfoque humano. Reserva tu cita online.",
      ruta: "/",
    },
    sobreMi: {
      titulo: "Sobre mí | Rebeca Velásquez, Psicóloga en Cochabamba",
      descripcion:
        "Conoce la formación y trayectoria de Rebeca Velásquez: TCC (Beck Institute), Psicología Hospitalaria (Hospital Albert Einstein) y más.",
      ruta: "/sobre-mi",
    },
    especialidades: {
      titulo: "Especialidades | Psicóloga en Cochabamba — Rebeca Velásquez",
      descripcion:
        "Atención psicológica en Cochabamba para ansiedad, depresión, estrés, procesos de salud, adaptación a cambios vitales y relación de pareja.",
      ruta: "/especialidades",
    },
    reservarCita: {
      titulo: "Reservar Cita | Rebeca Velásquez, Psicóloga en Cochabamba",
      descripcion:
        "Agenda tu cita psicológica en Cochabamba de forma sencilla. Elige el horario que más te acomode y da el primer paso hacia tu bienestar.",
      ruta: "/reservar-cita",
    },
    videos: {
      titulo: "Videos | Rebeca Velásquez, Psicóloga en Cochabamba",
      descripcion: "Contenido educativo sobre salud mental: ansiedad, depresión y bienestar emocional.",
      ruta: "/videos",
    },
    contacto: {
      titulo: "Contacto | Rebeca Velásquez, Psicóloga en Cochabamba",
      descripcion:
        "Contáctanos para agendar tu consulta psicológica en Cochabamba, Bolivia. Atención presencial y online.",
      ruta: "/contacto",
    },
    avisoEtico: {
      titulo: "Aviso Ético | Rebeca Velásquez, Psicóloga Clínica",
      descripcion: "Información sobre el encuadre ético y profesional de los servicios psicológicos ofrecidos.",
      ruta: "/aviso-etico",
    },
  },
};

/**
 * Genera título/descripción/ruta SEO para la página de detalle de una
 * especialidad específica (SEO local + keyword de la especialidad).
 */
export function seoEspecialidad(especialidad) {
  return {
    titulo: `${especialidad.nombre} | Psicóloga en Cochabamba — Rebeca Velásquez`,
    descripcion: `${especialidad.queEs} Atención psicológica en Cochabamba con enfoque en Terapia Cognitivo-Conductual.`.slice(0, 155),
    ruta: `/especialidades/${especialidad.id}`,
  };
}
