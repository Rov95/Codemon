import React from 'react';

interface SlotAvailableProps {
    slots: number;
}

const SlotAvailable: React.FC<SlotAvailableProps> = ({ slots }) => {
    return (
        <div className="slot-available">
            <h3>Slots Available</h3>
            <p>{slots}</p>
        </div>
    );
};

export default SlotAvailable;
