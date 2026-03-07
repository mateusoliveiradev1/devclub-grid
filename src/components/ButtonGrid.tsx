import React from 'react';

interface ButtonGridProps {
    onInput: (char: string) => void;
    onClear: () => void;
    onCalculate: () => void;
    onInvert: () => void;
}

export const ButtonGrid: React.FC<ButtonGridProps> = ({
    onInput, onClear, onCalculate, onInvert
}) => {
    return (
        <div className="buttons-grid">
            {/* Row 1: Scientific Basics */}
            <button className="btn-spec" onClick={onClear}>AC</button>
            <button className="btn-spec" onClick={() => onInput('√')}>√</button>
            <button className="btn-spec" onClick={() => onInput('^')}>^</button>
            <button className="btn-op" onClick={() => onInput('/')}>/</button>

            {/* Row 2: Logic & Power */}
            <button className="btn-spec" onClick={() => onInput('%')}>%</button>
            <button className="btn-spec" onClick={() => onInput('(')}>(</button>
            <button className="btn-spec" onClick={() => onInput(')')}>)</button>
            <button className="btn-op" onClick={() => onInput('*')}>*</button>

            {/* Row 3: Numbers & Operators */}
            {[7, 8, 9].map(n => (
                <button key={n} className="btn-num" onClick={() => onInput(String(n))}>{n}</button>
            ))}
            <button className="btn-op" onClick={() => onInput('-')}>-</button>

            {/* Row 4: Numbers & Operators */}
            {[4, 5, 6].map(n => (
                <button key={n} className="btn-num" onClick={() => onInput(String(n))}>{n}</button>
            ))}
            <button className="btn-op" onClick={() => onInput('+')}>+</button>

            {/* Row 5: Final Block */}
            {[1, 2, 3].map(n => (
                <button key={n} className="btn-num" onClick={() => onInput(String(n))}>{n}</button>
            ))}
            <button className="btn-spec" onClick={onInvert}>±</button>

            {/* Row 6: Result Block */}
            <button className="btn-num" onClick={() => onInput('0')}>0</button>
            <button className="btn-num" onClick={() => onInput('.')}>.</button>
            <button className="btn-equal" style={{ gridColumn: 'span 2' }} onClick={onCalculate}>=</button>
        </div>
    );
};
