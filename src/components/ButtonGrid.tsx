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
        <div className="buttons-grid" role="grid" aria-label="Calculator Keypad">
            {/* Row 1: Scientific Basics */}
            <button className="btn-spec" onClick={onClear} aria-label="All Clear">AC</button>
            <button className="btn-spec" onClick={() => onInput('√')} aria-label="Square Root">√</button>
            <button className="btn-spec" onClick={() => onInput('^')} aria-label="Exponent">^</button>
            <button className="btn-op" onClick={() => onInput('/')} aria-label="Divide">/</button>

            {/* Row 2: Logic & Power */}
            <button className="btn-spec" onClick={() => onInput('%')} aria-label="Modulo / Remainder">%</button>
            <button className="btn-spec" onClick={() => onInput('(')} aria-label="Open Parenthesis">(</button>
            <button className="btn-spec" onClick={() => onInput(')')} aria-label="Close Parenthesis">)</button>
            <button className="btn-op" onClick={() => onInput('*')} aria-label="Multiply">*</button>

            {/* Row 3: Numbers & Operators */}
            {[7, 8, 9].map(n => (
                <button key={n} className="btn-num" onClick={() => onInput(String(n))} aria-label={String(n)}>{n}</button>
            ))}
            <button className="btn-op" onClick={() => onInput('-')} aria-label="Subtract">-</button>

            {/* Row 4: Numbers & Operators */}
            {[4, 5, 6].map(n => (
                <button key={n} className="btn-num" onClick={() => onInput(String(n))} aria-label={String(n)}>{n}</button>
            ))}
            <button className="btn-op" onClick={() => onInput('+')} aria-label="Add">+</button>

            {/* Row 5: Final Block */}
            {[1, 2, 3].map(n => (
                <button key={n} className="btn-num" onClick={() => onInput(String(n))} aria-label={String(n)}>{n}</button>
            ))}
            <button className="btn-spec" onClick={onInvert} aria-label="Plus Minus Invert">±</button>

            {/* Row 6: Result Block */}
            <button className="btn-num" onClick={() => onInput('0')} aria-label="0">0</button>
            <button className="btn-num" onClick={() => onInput('.')} aria-label="Decimal">.</button>
            <button className="btn-equal" style={{ gridColumn: 'span 2' }} onClick={onCalculate} aria-label="Calculate Equal">=</button>
        </div>
    );
};
