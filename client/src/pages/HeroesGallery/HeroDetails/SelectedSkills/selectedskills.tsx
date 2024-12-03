import React from 'react';

interface Skill {
    skillName: string;
    slotRequired: number; 
}

interface SelectedSkillsProps {
    skills: Skill[];
    onSkillRemove: (index: number) => void;
}

const SelectedSkills: React.FC<SelectedSkillsProps> = ({ skills, onSkillRemove }) => {
    return (
        <div className="selected-skills">
            <h3>Selected Skills</h3>
            {skills.map((skill, index) => (
                <div key={index} className="selected-skill">
                    <p>{skill.skillName}</p>
                    <button onClick={() => onSkillRemove(index)}>Remove</button>
                </div>
            ))}
        </div>
    );
};

export default SelectedSkills;
