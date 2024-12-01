import React from 'react';

interface DescriptionProps {
    skill: {
        description: string;
    } | null; 
}

const Description: React.FC<DescriptionProps> = ({ skill }) => {
    return (
        <div className="description">
            <h3>Description</h3>
            {skill && skill.description ? (
                <p>{skill.description}</p>
            ) : (
                <p>Hover over a skill to see its description.</p>
            )}
        </div>
    );
};

export default Description;
