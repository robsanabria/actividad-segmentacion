import React, { useState, useEffect, useRef } from 'react';
import { Play, ArrowRight, BrainCircuit, Gamepad2, Dumbbell, Laugh, Lightbulb, Users, Settings, CheckCircle2 } from 'lucide-react';
import { questions, profilesData } from './data/questions';
import './index.css';

const IconMap = {
  BrainCircuit,
  Gamepad2,
  Dumbbell,
  Laugh
};

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Global synchronized state
  const [gameState, setGameState] = useState('start'); // start, playing, question_results, calculating, result
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Local state
  const [hasVoted, setHasVoted] = useState(false);

  // Global collective scores from the server
  const [globalProfiles, setGlobalProfiles] = useState({
    Entretenimiento: 0,
    Gamer: 0,
    Fitness: 0,
    Nerd: 0
  });

  const [questionScores, setQuestionScores] = useState({});

  const [finalProfile, setFinalProfile] = useState(null);
  
  // Polling intervals
  const scoresInterval = useRef(null);
  const stateInterval = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setIsAdmin(true);
    }

    startStatePolling();

    return () => {
      stopScoresPolling();
      stopStatePolling();
    };
  }, []);

  // Reset "hasVoted" automatically when the question changes globally
  useEffect(() => {
    setHasVoted(false);
  }, [currentQuestionIndex]);

  // --- API FUNCTIONS ---

  const fetchGlobalState = async () => {
    try {
      const response = await fetch('/api/state');
      if (response.ok) {
        const data = await response.json();
        
        setGameState((prev) => {
          if (prev !== data.gameState && data.gameState) return data.gameState;
          return prev;
        });
        
        setCurrentQuestionIndex((prev) => {
          if (data.currentQuestionIndex !== undefined && prev !== data.currentQuestionIndex) {
             return data.currentQuestionIndex;
          }
          return prev;
        });
      }
    } catch (e) {
      console.warn("Error fetching state");
    }
  };

  const updateGlobalState = async (newState, newIndex, reset = false) => {
    try {
      await fetch('/api/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          gameState: newState, 
          currentQuestionIndex: newIndex,
          resetVotes: reset
        })
      });
      setGameState(newState);
      setCurrentQuestionIndex(newIndex);
    } catch (e) {
      console.error("Error updating state", e);
    }
  };

  const fetchGlobalScores = async () => {
    try {
      const response = await fetch('/api/results');
      if (response.ok) {
        const data = await response.json();
        setGlobalProfiles(data.profiles || {});
        setQuestionScores(data.questions || {});
        return data;
      }
    } catch (error) {
      console.warn("API no disponible para scores:", error);
    }
    return null;
  };

  // --- POLLING CONTROLS ---

  const startStatePolling = () => {
    fetchGlobalState();
    if (!stateInterval.current) {
      stateInterval.current = setInterval(fetchGlobalState, 2000);
    }
  };

  const stopStatePolling = () => {
    if (stateInterval.current) {
      clearInterval(stateInterval.current);
      stateInterval.current = null;
    }
  };

  const startScoresPolling = () => {
    fetchGlobalScores();
    if (!scoresInterval.current) {
      scoresInterval.current = setInterval(fetchGlobalScores, 2000);
    }
  };

  const stopScoresPolling = () => {
    if (scoresInterval.current) {
      clearInterval(scoresInterval.current);
      scoresInterval.current = null;
    }
  };

  // Turn on score polling only when on result screens or calculating
  useEffect(() => {
    if (gameState === 'question_results' || gameState === 'calculating') {
      startScoresPolling();
    } else {
      stopScoresPolling();
    }
  }, [gameState]);

  // When calculating, calculate final profile
  useEffect(() => {
    if (gameState === 'calculating') {
      calculateFinalProfileLocally();
    }
  }, [gameState]);


  // --- USER ACTIONS ---

  const startAdminGame = () => {
    if (!isAdmin) return;
    updateGlobalState('playing', 0, true);
  };

  const handleOptionClick = async (profile, optionIndex) => {
    if (hasVoted) return;
    
    // Mark as voted locally so they can't spam
    setHasVoted(true);

    // Send vote to server with question and option info
    try {
      await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          profile, 
          questionIndex: currentQuestionIndex, 
          optionIndex 
        })
      });
    } catch (e) {
      console.warn("No se pudo enviar el voto");
    }
  };

  const showLiveResultsAdmin = () => {
    if (!isAdmin) return;
    // Changes global state to question_results so everyone sees the bars
    updateGlobalState('question_results', currentQuestionIndex);
  };

  const goToNextQuestionAdmin = () => {
    if (!isAdmin) return;
    
    if (currentQuestionIndex < questions.length - 1) {
      updateGlobalState('playing', currentQuestionIndex + 1);
    } else {
      updateGlobalState('calculating', currentQuestionIndex);
      setTimeout(() => {
        updateGlobalState('result', currentQuestionIndex);
      }, 3000);
    }
  };

  const calculateFinalProfileLocally = async () => {
    let data = await fetchGlobalScores();
    let finalScores = data ? data.profiles : globalProfiles;
    
    let maxProfile = Object.keys(finalScores)[0] || "Entretenimiento";
    let maxScore = finalScores[maxProfile] || 0;
    
    for (const profile in finalScores) {
      if (finalScores[profile] > maxScore) {
        maxScore = finalScores[profile];
        maxProfile = profile;
      }
    }
    setFinalProfile(maxProfile);
  };

  // --- RENDERS ---

  const renderStartScreen = () => (
    <div className="glass-panel animate-fade-in" style={{ textAlign: 'center' }}>
      <div className="animate-float" style={{ marginBottom: '2rem' }}>
        <Users size={64} color="#fcd34d" style={{ margin: '0 auto' }} />
      </div>
      <h1>Votación Colectiva</h1>
      <p>Espera a que el profesor inicie la partida...</p>
      
      {isAdmin && (
        <button className="btn-primary animate-pulse-slow" style={{ marginTop: '1rem' }} onClick={startAdminGame}>
          <Settings size={24} />
          Iniciar Clase (Admin)
        </button>
      )}
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
        <h2 style={{ textAlign: 'left', fontSize: '1.75rem', marginBottom: '2rem' }}>{question.question}</h2>
        
        {/* If student hasn't voted OR is Admin, show the options grid */}
        {(!hasVoted || isAdmin) && (
          <div className="options-grid" style={{ marginBottom: isAdmin ? '2rem' : '0' }}>
            {question.options.map((option, index) => (
              <button
                key={index}
                className="option-btn"
                onClick={() => handleOptionClick(option.profile, index)}
                disabled={hasVoted && !isAdmin}
                style={{ opacity: (hasVoted && !isAdmin) ? 0.5 : 1 }}
              >
                {option.text}
              </button>
            ))}
          </div>
        )}

        {/* If student HAS voted, show the waiting message */}
        {hasVoted && !isAdmin && (
          <div style={{ textAlign: 'center', padding: '2rem 0' }} className="animate-fade-in">
            <CheckCircle2 size={64} color="#10b981" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ color: '#10b981', marginBottom: '0.5rem' }}>¡Voto Registrado!</h3>
            <p style={{ color: '#cbd5e1' }}>Mira a la pantalla principal para ver los resultados.</p>
          </div>
        )}

        {/* Admin controls to show results */}
        {isAdmin && (
          <div style={{ textAlign: 'center', marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
            <p style={{ color: '#cbd5e1', marginBottom: '1rem' }}>Espera a que los alumnos voten...</p>
            <button className="btn-primary" style={{ width: '100%', background: 'linear-gradient(135deg, #10b981, #059669)' }} onClick={showLiveResultsAdmin}>
              Terminar y Mostrar Resultados <Users size={20} />
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderQuestionResults = () => {
    const question = questions[currentQuestionIndex];
    
    // Calculate total votes for this specific question
    let totalVotes = 0;
    question.options.forEach((_, index) => {
      totalVotes += parseInt(questionScores[`q${currentQuestionIndex}_opt${index}`] || 0);
    });
    
    if (totalVotes === 0) totalVotes = 1; // avoid divide by zero

    return (
      <div className="glass-panel animate-fade-in" style={{ width: '100%' }}>
        {isAdmin && (
           <h3 style={{ textAlign: 'left', color: '#cbd5e1', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{question.question}</h3>
        )}
        <h2 style={{ marginBottom: '2rem', textAlign: 'left' }}>Resultados en Vivo</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {question.options.map((option, index) => {
            const score = parseInt(questionScores[`q${currentQuestionIndex}_opt${index}`] || 0);
            const percentage = Math.round((score / totalVotes) * 100);
            
            // Generate a color based on the index to differentiate the bars
            const colors = ['#f43f5e', '#3b82f6', '#10b981', '#8b5cf6'];
            const barColor = colors[index % colors.length];
            
            return (
              <div key={index} style={{ textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: '600' }}>{option.text}</span>
                  <span>{score} votos ({percentage}%)</span>
                </div>
                <div style={{ width: '100%', height: '24px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
                  <div 
                    style={{ 
                      height: '100%', 
                      width: `${percentage}%`, 
                      background: barColor,
                      transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)' 
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {!isAdmin && (
          <p style={{ color: '#a78bfa', fontWeight: 'bold', animation: 'pulse 2s infinite', textAlign: 'center' }}>
            Siguiente pregunta en breve...
          </p>
        )}

        {isAdmin && (
          <button className="btn-primary" style={{ width: '100%' }} onClick={goToNextQuestionAdmin}>
            Siguiente Pregunta (Admin) <ArrowRight size={20} />
          </button>
        )}
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
    const safeProfile = finalProfile || "Entretenimiento";
    const profile = profilesData[safeProfile];
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

        {isAdmin && (
          <button 
            className="btn-primary" 
            style={{ marginTop: '2rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
            onClick={() => updateGlobalState('start', 0, true)}
          >
            Reiniciar Partida
          </button>
        )}
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
