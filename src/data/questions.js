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
  }
];

export const profilesData = {
  "Frutinovelas": {
    title: "¡Consumidor de Frutinovelas!",
    description: "El algoritmo ya te sacó la ficha de tu gusto culposo. Sabe que te re quedás viendo dramas falopa narrados por IA. ¡Te segmentó por tu tiempo de retención en el chisme!",
    color: "#ec4899", // Pink
    icon: "Ghost",
    gif: "https://media.tenor.com/HnK18XlH8_wAAAAC/dramatic-telenovela.gif" // Dramatic soap opera
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
