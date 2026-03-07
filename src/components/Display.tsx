import React from 'react';

interface DisplayProps {
    current: string;
    previous: string;
}

export const Display: React.FC<DisplayProps> = ({ current, previous }) => {
    return (
        <div className="display-wrapper" role="status" aria-live="polite" aria-atomic="true">
            <div className="previous-op" aria-label="Previous calculation sequence">{previous}</div>
            <input
                className="display"
                value={current}
                readOnly
                type="text"
                aria-label="Resulting calculation output"
            />
        </div>
    );
};
