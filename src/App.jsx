import React, { useState, useEffect, useRef } from 'react';
import { Play, ArrowRight, BrainCircuit, Gamepad2, Dumbbell, Laugh, Lightbulb, Users } from 'lucide-react';
import { questions, profilesData } from './data/questions';
import './index.css';

const IconMap = {
  BrainCircuit,
  Gamepad2,
  Dumbbell,
  Laugh
};

function App() {
  const [gameState, setGameState] = useState('start'); // start, playing, question_results, result
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Local state as fallback
  const [localScores, setLocalScores] = useState({
    Entretenimiento: 0,
    Gamer: 0,
    Fitness: 0,
    Nerd: 0
  });
  
  // Global collective scores from the server
  const [globalScores, setGlobalScores] = useState({
    Entretenimiento: 0,
    Gamer: 0,
    Fitness: 0,
    Nerd: 0
  });

  const [finalProfile, setFinalProfile] = useState(null);
  
  // To handle polling interval
  const pollInterval = useRef(null);

  useEffect(() => {
    // Cleanup polling on unmount
    return () => {
      if (pollInterval.current) clearInterval(pollInterval.current);
    };
  }, []);

  const fetchGlobalScores = async () => {
    try {
      const response = await fetch('/api/results');
      if (response.ok) {
        const data = await response.json();
        setGlobalScores(data);
        return data;
      }
    } catch (error) {
      console.warn("API no disponible, usando fallback local:", error);
    }
    return null;
  };

  const startPolling = () => {
    fetchGlobalScores(); // fetch immediate
    pollInterval.current = setInterval(() => {
      fetchGlobalScores();
    }, 2000); // Poll every 2 seconds for that "live" feel
  };

  const stopPolling = () => {
    if (pollInterval.current) {
      clearInterval(pollInterval.current);
    }
  };

  const startGame = () => {
    setGameState('playing');
    setCurrentQuestionIndex(0);
  };

  const handleOptionClick = async (profile) => {
    // 1. Optimistic local update (fallback)
    const newLocal = { ...localScores, [profile]: localScores[profile] + 1 };
    setLocalScores(newLocal);
    
    // Set our view to global scores (optimistic)
    setGlobalScores(prev => ({
      ...prev,
      [profile]: prev[profile] + 1
    }));

    // 2. Send to Vercel KV via API
    try {
      await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile })
      });
    } catch (e) {
      console.warn("No se pudo enviar el voto al servidor", e);
    }

    // 3. Move to live results view for this question
    setGameState('question_results');
    startPolling();
  };

  const goToNextQuestion = () => {
    stopPolling();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setGameState('playing');
    } else {
      calculateFinalResult();
    }
  };

  const calculateFinalResult = async () => {
    stopPolling();
    setGameState('calculating');
    
    // Fetch final definitive scores
    let finalScores = await fetchGlobalScores();
    
    if (!finalScores || Object.keys(finalScores).length === 0) {
      // Fallback to local if no API
      finalScores = localScores;
    }
    
    // Find highest global score
    let maxProfile = Object.keys(finalScores)[0] || "Entretenimiento";
    let maxScore = finalScores[maxProfile] || 0;
    
    for (const profile in finalScores) {
      if (finalScores[profile] > maxScore) {
        maxScore = finalScores[profile];
        maxProfile = profile;
      }
    }

    setFinalProfile(maxProfile);

    setTimeout(() => {
      setGameState('result');
    }, 2000);
  };

  // --- RENDERS ---

  const renderStartScreen = () => (
    <div className="glass-panel animate-fade-in" style={{ textAlign: 'center' }}>
      <div className="animate-float" style={{ marginBottom: '2rem' }}>
        <Users size={64} color="#fcd34d" style={{ margin: '0 auto' }} />
      </div>
      <h1>Votación Colectiva</h1>
      <p>Vota desde tu celular. Los resultados de toda la clase se actualizarán en vivo.</p>
      <button className="btn-primary animate-pulse-slow" onClick={startGame}>
        <Play size={24} />
        Comenzar Actividad
      </button>
    </div>
  );

  const renderQuestionScreen = () => {
    const question = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / questions.length) * 100;

    return (
      <div className="glass-panel animate-fade-in" key={question.id}>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <p style={{ textAlign: 'left', marginBottom: '0.5rem', fontWeight: 'bold', color: '#a78bfa' }}>
          Pregunta {currentQuestionIndex + 1} de {questions.length}
        </p>
        <h2 style={{ textAlign: 'left', fontSize: '1.75rem' }}>{question.question}</h2>
        <div className="options-grid">
          {question.options.map((option, index) => (
            <button
              key={index}
              className="option-btn"
              onClick={() => handleOptionClick(option.profile)}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderQuestionResults = () => {
    const totalVotes = Object.values(globalScores).reduce((a, b) => a + b, 0) || 1; // avoid / 0

    return (
      <div className="glass-panel animate-fade-in" style={{ width: '100%' }}>
        <h2 style={{ marginBottom: '2rem' }}>Resultados en Vivo</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {Object.keys(profilesData).map((profileKey) => {
            const profile = profilesData[profileKey];
            const score = globalScores[profileKey] || 0;
            const percentage = Math.round((score / totalVotes) * 100);
            
            return (
              <div key={profileKey} style={{ textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: '600' }}>{profile.title.replace('¡Usuario ', '').replace('!', '')}</span>
                  <span>{score} votos ({percentage}%)</span>
                </div>
                <div style={{ width: '100%', height: '24px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
                  <div 
                    style={{ 
                      height: '100%', 
                      width: `${percentage}%`, 
                      background: profile.color,
                      transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)' 
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        <button className="btn-primary" style={{ width: '100%' }} onClick={goToNextQuestion}>
          Siguiente <ArrowRight size={20} />
        </button>
      </div>
    );
  };

  const renderCalculatingScreen = () => (
    <div className="glass-panel animate-fade-in" style={{ textAlign: 'center' }}>
      <div className="animate-pulse-slow">
        <BrainCircuit size={80} color="#c084fc" style={{ margin: '0 auto 2rem auto' }} />
      </div>
      <h2>Calculando el perfil del aula...</h2>
      <p>Sumando los votos de todos los compañeros...</p>
    </div>
  );

  const renderResultScreen = () => {
    const profile = profilesData[finalProfile];
    const IconComponent = IconMap[profile.icon];

    return (
      <div className="glass-panel animate-fade-in" style={{ padding: '2rem' }}>
        <div 
          className="result-icon-container animate-float" 
          style={{ background: `linear-gradient(135deg, ${profile.color}, #ffffff)` }}
        >
          <IconComponent size={48} color="#1e1b4b" />
        </div>
        <p style={{ fontSize: '1.25rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>El perfil colectivo de la clase es:</p>
        <h1 style={{ background: 'none', WebkitTextFillColor: 'initial', color: profile.color }}>
          {profile.title}
        </h1>
        <p style={{ fontSize: '1.25rem' }}>{profile.description}</p>
        
        <div className="segmentation-box animate-fade-in" style={{ animationDelay: '1s', animationFillMode: 'both' }}>
          <h3><Lightbulb size={24} /> El poder de la Segmentación</h3>
          <p>
            ¿Qué acaba de pasar? Acabamos de agrupar a toda el aula. Al ver qué respuestas ganaron, 
            pudimos definir un <strong>PERFIL DE CLASE</strong>. En marketing, a esto le llamamos <strong>SEGMENTACIÓN</strong>. 
            Es la herramienta clave para saber a quién le estamos hablando y adaptar nuestro mensaje.
          </p>
        </div>

      </div>
    );
  };

  return (
    <>
      {gameState === 'start' && renderStartScreen()}
      {gameState === 'playing' && renderQuestionScreen()}
      {gameState === 'question_results' && renderQuestionResults()}
      {gameState === 'calculating' && renderCalculatingScreen()}
      {gameState === 'result' && renderResultScreen()}
    </>
  );
}

export default App;
