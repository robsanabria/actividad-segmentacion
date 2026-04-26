export const questions = [
  {
    id: 1,
    question: "¿Qué preferís ver en tu tiempo libre?",
    options: [
      { text: "Memes de michis y videos cortos", profile: "Entretenimiento" },
      { text: "Un speedrun de un juego retro", profile: "Gamer" },
      { text: "Tips para armar tu propia rutina", profile: "Fitness" },
      { text: "Un video sobre cómo funciona un microprocesador", profile: "Nerd" }
    ]
  },
  {
    id: 2,
    question: "Estás en una situación incómoda, ¿qué hacés?",
    options: [
      { text: "Tiro un chiste malo para aflojar la tensión", profile: "Entretenimiento" },
      { text: "Saco el celu y me pongo a farmear experiencia", profile: "Gamer" },
      { text: "Me voy a dar una vuelta corriendo para despejar", profile: "Fitness" },
      { text: "Analizo estadísticamente por qué la situación es incómoda", profile: "Nerd" }
    ]
  },
  {
    id: 3,
    question: "¿De qué preferís hablar en una juntada?",
    options: [
      { text: "Del último chisme o tendencia de TikTok", profile: "Entretenimiento" },
      { text: "De si es mejor teclado y ratón o joystick", profile: "Gamer" },
      { text: "De cuánta proteína tiene la picada", profile: "Fitness" },
      { text: "De si la IA nos va a reemplazar", profile: "Nerd" }
    ]
  }
];

export const profilesData = {
  "Entretenimiento": {
    title: "¡Usuario Entretenimiento!",
    description: "Lo tuyo es la diversión rápida, los memes y estar al día con lo que pasa en las redes. Eres el alma de la fiesta digital.",
    color: "#ff2a5f",
    icon: "Laugh"
  },
  "Gamer": {
    title: "¡Usuario Gamer!",
    description: "Tenés los reflejos al 100%. Te encantan los desafíos, las estrategias y exprimir al máximo cada aventura virtual.",
    color: "#00d0ff",
    icon: "Gamepad2"
  },
  "Fitness": {
    title: "¡Usuario Fitness!",
    description: "Tu cuerpo es tu templo. Buscas superarte constantemente, amas el movimiento y la vida activa. ¡Pura energía!",
    color: "#00e676",
    icon: "Dumbbell"
  },
  "Nerd": {
    title: "¡Usuario Nerd!",
    description: "Tu curiosidad no tiene límites. Te fascina entender cómo funcionan las cosas, los datos duros y la tecnología profunda.",
    color: "#9d00ff",
    icon: "BrainCircuit"
  }
};
