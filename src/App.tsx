import React from 'react';
import { useCalculator } from './hooks/useCalculator';
import { Display } from './components/Display';
import { ButtonGrid } from './components/ButtonGrid';
import { History } from './components/History';
import './styles/global.css';

const App: React.FC = () => {
  const {
    state, handleInput, calculate, clear, invert, toggleTheme, setFromHistory
  } = useCalculator();

  return (
    <>
      <div className="atmosphere" />
      <div className="app-viewport" style={{ position: 'relative', width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        <div className="theme-controls">
          <button className="btn-theme" onClick={toggleTheme} title="Alternar Tema">
            {state.theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>

        <main className="calculator-container">
          <Display current={state.display} previous={state.previousOp} />
          <ButtonGrid
            onInput={handleInput}
            onClear={clear}
            onCalculate={calculate}
            onInvert={invert}
          />

          {/* Integrated History inside the main card container */}
          <History items={state.history} onSelect={setFromHistory} />
        </main>

      </div>
    </>
  );
};

export default App;
