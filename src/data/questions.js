import { Ghost, Smartphone, Briefcase, Eye } from 'lucide-react';

export const questions = [
  {
    id: 1,
    question: "Son las 2 de la mañana y no podés dormir. ¿Qué te tiene re atrapado en el celu?",
    options: [
      { text: "Un video de alguien cortando jabón mientras una voz robótica cuenta un chisme falopa", profile: "Frutinovelas" },
      { text: "Scrolleando en automático como zombie viendo memes que ya ni dan gracia", profile: "Doomscroller" },
      { text: "Un podcast de un chabón gritando que si no invertís en IA sos un fracasado", profile: "CEO" },
      { text: "Un hilo larguísimo explicando cómo tu celu te escucha hablar todo el día", profile: "Conspiranoico" }
    ]
  },
  {
    id: 2,
    question: "Te salta publicidad de un curso: 'Cómo dominar la IA'. ¿Qué hacés?",
    options: [
      { text: "Lo ignoro mal, estoy dándole like a una foto de Jesús hecho de camarones", profile: "Frutinovelas" },
      { text: "Ya perdí la capacidad de prestar atención más de 10 segundos, sigo bajando", profile: "Doomscroller" },
      { text: "Lo compro de una, necesito optimizar mi productividad para ser mi propio jefe", profile: "CEO" },
      { text: "Lo bloqueo, seguro es alta estafa para robarme los datos del celu", profile: "Conspiranoico" }
    ]
  },
  {
    id: 3,
    question: "¿Qué le pedirías a ChatGPT o a otra IA en este momento?",
    options: [
      { text: "Armame alta historia de venganza re dramática para subir a TikTok", profile: "Frutinovelas" },
      { text: "Resumime este audio de WhatsApp de 1 minuto porque me da paja escucharlo", profile: "Doomscroller" },
      { text: "Tirame los 5 prompts secretos para automatizar todo y hacerme millonario", profile: "CEO" },
      { text: "¿Cuánta info mía tenés guardada y cuándo nos van a dominar las máquinas?", profile: "Conspiranoico" }
    ]
  },
  {
    id: 4,
    question: "Estás en un asado el domingo y sacás el tema de la IA. ¿Qué aportás a la charla?",
    options: [
      { text: "Che, ¿vieron el video de Mirtha Legrand generado por IA cantando trap? Es una locura", profile: "Frutinovelas" },
      { text: "Ni idea, yo solo quiero que me resuma los audios de mi tía de 4 minutos", profile: "Doomscroller" },
      { text: "Les explico cómo estoy automatizando mi laburo en la ofi para trabajar 2 horas menos", profile: "CEO" },
      { text: "Les digo que dejen de usar Alexa porque nos están grabando hasta cuando masticamos el chori", profile: "Conspiranoico" }
    ]
  },
  {
    id: 5,
    question: "Año 2026, te llega un mail del banco diciendo que un bot de IA va a manejar tus ahorros. ¿Tu reacción?",
    options: [
      { text: "Lo borro sin leer, estoy viendo un reel de cómo hacer pan casero con un audio de fondo re bizarro", profile: "Frutinovelas" },
      { text: "Le doy 'Aceptar' a todo rápido para que desaparezca la notificación roja que me da ansiedad", profile: "Doomscroller" },
      { text: "¡Al fin! Le meto toda mi plata, los algoritmos predictivos nunca fallan y quiero jubilarme a los 35", profile: "CEO" },
      { text: "Saco toda la guita, la meto en el colchón y me voy a vivir al medio de las sierras en Córdoba", profile: "Conspiranoico" }
    ]
  },
  {
    id: 6,
    question: "Vas a buscar laburo y te dicen que la primera entrevista es con un avatar de IA. ¿Qué hacés?",
    options: [
      { text: "Trato de hacerle pisar el palito preguntándole cosas raras para ver si se buguea y subirlo a TikTok", profile: "Frutinovelas" },
      { text: "Me da muchísima paja conectarme a la compu, le pregunto si no le puedo mandar un mensajito de voz", profile: "Doomscroller" },
      { text: "Me preparo los mejores prompts de la historia y le hablo con jerga corporativa para hackear el algoritmo", profile: "CEO" },
      { text: "Cancelo la entrevista de una. Quieren escanearme las retinas y clonar mi voz, a mí no me van a agarrar", profile: "Conspiranoico" }
    ]
  }
];

export const profilesData = {
  "Frutinovelas": {
    title: "¡Consumidor de Frutinovelas!",
    description: "El algoritmo ya te sacó la ficha de tu gusto culposo. Sabe que te re quedás viendo dramas falopa narrados por IA. ¡Te segmentó por tu tiempo de retención en el chisme!",
    color: "#ec4899", // Pink
    icon: "Ghost",
    gif: "https://media.tenor.com/bZe6n1h7t0UAAAAC/drama.gif" // Dramatic soap opera
  },
  "Doomscroller": {
    title: "¡Doomscroller Crónico!",
    description: "El algoritmo sabe que tu cerebro necesita dopamina ya. Te tira videos cortos y memes infinitos porque sabe que no podés soltar el celu. ¡Te segmentó por tu falta de atención!",
    color: "#3b82f6", // Blue
    icon: "Smartphone",
    gif: "https://media.tenor.com/tH0-jYV12XAAAAAC/simpsons-homer.gif" // Homer staring
  },
  "CEO": {
    title: "¡Mentalidad de Tiburón!",
    description: "Te perfilaron como el 'Hustler'. Te llueven podcasts de cripto y herramientas de IA para ser más productivo y facturar. ¡Te segmentaron por tus búsquedas de éxito!",
    color: "#10b981", // Green
    icon: "Briefcase",
    gif: "https://media.tenor.com/eB9H8aI88J0AAAAC/wolf-of-wall-street-matthew-mcconaughey.gif" // Wolf of wall street / hype
  },
  "Conspiranoico": {
    title: "¡El Conspiranoico!",
    description: "El algoritmo sabe que dudás de todo. Para mantenerte enganchado (engagement), te tira teorías conspirativas, cosas de privacidad y el fin del mundo. ¡Te segmentó por tu nivel de paranoia!",
    color: "#8b5cf6", // Purple
    icon: "Eye",
    gif: "https://media.tenor.com/cE01D9qU3R8AAAAC/its-always-sunny-in-philadelphia-charlie-kelly.gif" // Charlie Day Pepe Silvia
  }
};
