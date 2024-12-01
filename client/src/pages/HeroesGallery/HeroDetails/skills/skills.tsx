import React from 'react';

interface Skill {
    skillName: string;
    slotRequired: number; 
}

interface SkillsProps {
    skills: Skill[];
    onSkillSelect: (skill: Skill) => void;
    onSkillHover: (skill: Skill | null) => void; // Allow null to handle hover leave
}

const Skills: React.FC<SkillsProps> = ({ skills, onSkillSelect, onSkillHover }) => {
    return (
        <div className="skills">
            <h3>Skills</h3>
            {skills.map((skill, index) => (
                <button
                    key={index}
                    className="skill-button"
                    onClick={() => onSkillSelect(skill)}
                    onMouseEnter={() => onSkillHover(skill)}
                    onMouseLeave={() => onSkillHover(null)}
                >
                    {skill.skillName}
                </button>
            ))}
        </div>
    );
};

export default Skills;
