import { Ghost, Smartphone, Briefcase, Eye } from 'lucide-react';

export const questions = [
  {
    id: 1,
    question: "Son las 2 de la mañana y no puedes dormir. ¿Qué te tiene atrapado en el celular?",
    options: [
      { text: "Un video de alguien cortando jabón mientras una voz robótica narra un chisme inventado", profile: "Frutinovelas" },
      { text: "Scrolleando en automático, con la mirada perdida viendo memes que ya ni dan risa", profile: "Doomscroller" },
      { text: "Un podcast de un flaco gritando que si no estás invirtiendo en IA, estás perdiendo plata", profile: "CEO" },
      { text: "Un hilo larguísimo explicando cómo tu celular te escuchó hablar de colchones ayer", profile: "Conspiranoico" }
    ]
  },
  {
    id: 2,
    question: "Te aparece publicidad de un curso: 'Cómo dominar la IA'. ¿Cómo reaccionas?",
    options: [
      { text: "Lo ignoro, estoy dándole like a una foto de Jesús hecho de camarones con 2 millones de likes", profile: "Frutinovelas" },
      { text: "Ya perdí la capacidad de prestar atención a algo de más de 15 segundos, sigo bajando", profile: "Doomscroller" },
      { text: "Lo compro al instante, necesito optimizar mi productividad un 200% para ayer", profile: "CEO" },
      { text: "Lo bloqueo, seguro es una estafa para robarme los datos biométricos de la cara", profile: "Conspiranoico" }
    ]
  },
  {
    id: 3,
    question: "¿Qué le pedirías a una Inteligencia Artificial en este momento?",
    options: [
      { text: "Créame una historia de venganza súper dramática para subirla a TikTok con música triste", profile: "Frutinovelas" },
      { text: "Resume este audio de WhatsApp de 1 minuto porque no tengo la paciencia para escucharlo", profile: "Doomscroller" },
      { text: "¿Cuáles son los 5 prompts secretos para automatizar mi vida y hacerme millonario?", profile: "CEO" },
      { text: "¿Cuánta información mía tienes guardada y cuándo planeas dominar a la humanidad?", profile: "Conspiranoico" }
    ]
  }
];

export const profilesData = {
  "Frutinovelas": {
    title: "¡Consumidor de Frutinovelas!",
    description: "El algoritmo detectó tu gusto culposo. Sabe que te quedas atrapado viendo dramas absurdos narrados por IA y videos surrealistas. ¡Te segmentó por tu tiempo de retención en el chisme!",
    color: "#ec4899", // Pink
    icon: "Ghost"
  },
  "Doomscroller": {
    title: "¡Doomscroller Crónico!",
    description: "El algoritmo sabe que tu cerebro necesita dopamina rápida. Te muestra videos cortos y memes infinitos porque sabe que tu dedo no puede dejar de scrollear. ¡Te segmentó por tu falta de atención!",
    color: "#3b82f6", // Blue
    icon: "Smartphone"
  },
  "CEO": {
    title: "¡El CEO de las 5 AM!",
    description: "Te perfilaron como el 'Hustler'. Por eso te bombardean con podcasts de cripto, rutinas de estoicismo y herramientas de IA para ser más productivo. ¡Te segmentaron por tus búsquedas de éxito!",
    color: "#10b981", // Green
    icon: "Briefcase"
  },
  "Conspiranoico": {
    title: "¡El Conspiranoico!",
    description: "El algoritmo sabe que dudas de todo. Para mantenerte enganchado (engagement), te alimenta con teorías conspirativas, privacidad de datos y el fin del mundo por culpa de la IA. ¡Te segmentó por tu escepticismo!",
    color: "#8b5cf6", // Purple
    icon: "Eye"
  }
};
