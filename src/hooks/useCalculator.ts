import { useState, useCallback, useEffect } from 'react';
import { CalculationService } from '../core/services/CalculationService';
import type { CalculatorState, HistoryItem } from '../types/calculator';

export const useCalculator = () => {
    const [state, setState] = useState<CalculatorState>({
        display: '0',
        previousOp: '',
        history: JSON.parse(localStorage.getItem('calc_history') || '[]'),
        theme: (localStorage.getItem('calc_theme') as 'dark' | 'light') || 'dark',
    });

    useEffect(() => {
        localStorage.setItem('calc_history', JSON.stringify(state.history.slice(0, 20)));
    }, [state.history]);

    useEffect(() => {
        localStorage.setItem('calc_theme', state.theme);
        document.body.className = `theme-${state.theme}`;
    }, [state.theme]);

    const handleInput = useCallback((char: string) => {
        setState((prev) => {
            const lastChar = prev.display.slice(-1);
            const isOperator = ['+', '-', '*', '/', '%', '^'].includes(char);
            const lastIsOperator = ['+', '-', '*', '/', '%', '^'].includes(lastChar);

            // Special handling for square root (prefixed)
            if (char === '√') {
                if (prev.display === '0') return { ...prev, display: '√' };
                if (lastIsOperator) return { ...prev, display: prev.display + '√' };
                return prev; // Don't allow √ after number without operator
            }

            if (prev.display === '0' && !isOperator && char !== '.') return { ...prev, display: char };
            if (prev.display === 'Erro') return { ...prev, display: char };

            if (isOperator && lastIsOperator) {
                return { ...prev, display: prev.display.slice(0, -1) + char };
            }

            return { ...prev, display: prev.display + char };
        });
    }, []);

    const calculate = useCallback(() => {
        setState((prev) => {
            const result = CalculationService.calculate(prev.display);
            const newHistoryItem: HistoryItem = {
                id: Math.random().toString(36).substr(2, 9),
                expression: prev.display,
                result,
                timestamp: Date.now(),
            };

            return {
                ...prev,
                previousOp: `${prev.display} =`,
                display: String(result),
                history: result !== 'Erro' ? [newHistoryItem, ...prev.history].slice(0, 20) : prev.history,
            };
        });
    }, []);

    const clear = useCallback(() => {
        setState((prev) => ({ ...prev, display: '0', previousOp: '' }));
    }, []);

    const invert = useCallback(() => {
        setState((prev) => {
            if (prev.display === '0' || prev.display === 'Erro') return prev;
            const display = prev.display.startsWith('-') ? prev.display.slice(1) : `-${prev.display}`;
            return { ...prev, display };
        });
    }, []);

    const backspace = useCallback(() => {
        setState((prev) => {
            const display = prev.display.length > 1 ? prev.display.slice(0, -1) : '0';
            return { ...prev, display };
        });
    }, []);

    const toggleTheme = useCallback(() => {
        setState((prev) => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' }));
    }, []);

    // Desktop Professionalism: Global Keyboard Support
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key;

            if (/^[0-9]$/.test(key)) handleInput(key);
            if (['+', '-', '*', '/', '.', '(', ')', '^', '%'].includes(key)) handleInput(key);
            if (key === 'Enter' || key === '=') {
                e.preventDefault();
                calculate();
            }
            if (key === 'Backspace') backspace();
            if (key === 'Escape') clear();
            if (key.toLowerCase() === 's') handleInput('√'); // 's' for square root
            if (key.toLowerCase() === 'i') invert(); // 'i' for invert
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleInput, calculate, clear, backspace, invert]);

    return {
        state,
        handleInput,
        calculate,
        clear,
        invert,
        backspace,
        toggleTheme,
        setFromHistory: (val: string) => setState(p => ({ ...p, display: val }))
    };
};
