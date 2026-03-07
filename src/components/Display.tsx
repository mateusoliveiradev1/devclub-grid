import React from 'react';

interface DisplayProps {
    current: string;
    previous: string;
}

export const Display: React.FC<DisplayProps> = ({ current, previous }) => {
    return (
        <div className="display-wrapper">
            <div className="previous-op">{previous}</div>
            <input
                className="display"
                value={current}
                readOnly
                type="text"
            />
        </div>
    );
};
