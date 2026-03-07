import React, { useState } from 'react';
import type { HistoryItem } from '../types/calculator';

interface HistoryProps {
    items: HistoryItem[];
    onSelect: (val: string) => void;
}

export const History: React.FC<HistoryProps> = ({ items, onSelect }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <>
            <button
                className="btn-spec history-toggle"
                style={{
                    marginTop: '10px',
                    background: 'transparent',
                    border: 'none',
                    fontSize: '9px',
                    letterSpacing: '0.4em',
                    cursor: 'pointer',
                    color: 'var(--color-text-dim)',
                    textTransform: 'uppercase',
                    width: '100%',
                    height: '48px',
                    fontWeight: 600,
                    transition: 'all 0.4s ease',
                    zIndex: 150
                }}
                onClick={() => setIsVisible(!isVisible)}
            >
                {isVisible ? 'Close System Trace' : 'Open System Trace'}
            </button>

            <aside className={`history-section ${isVisible ? 'visible' : ''}`}>
                <div className="history-header">
                    <h3>Calculated Trace</h3>
                    <button className="btn-clear" onClick={() => {
                        localStorage.removeItem('calc_history');
                        window.location.reload(); // Simple way to clear state for now
                    }}>
                        Purge Memory
                    </button>
                </div>
                <ul id="history-list">
                    {items.length === 0 ? (
                        <li className="history-item" style={{ justifyContent: 'center', opacity: 0.3, borderStyle: 'dashed' }}>
                            Void State
                        </li>
                    ) : (
                        items.map((item) => (
                            <li key={item.id} className="history-item" onClick={() => onSelect(String(item.result))}>
                                <span>{item.expression}</span>
                                <strong>{item.result}</strong>
                            </li>
                        ))
                    )}
                </ul>
            </aside>
        </>
    );
};
