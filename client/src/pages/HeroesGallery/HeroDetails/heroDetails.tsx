import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroStats from "./Herostats/herostats";
import Skills from "./skills/skills";
import TrapSkills from "./TrapSkills/trapSkills";
import PassiveSkills from "./PasiveSkills/pasiveSkills";
import SelectedSkills from "./SelectedSkills/selectedskills";
import SlotAvailable from "./AvailSlots/slots";
import Description from "./Description/description";
import { Skill } from "../../../interfaces/Skills";
// import { Hero } from "../../../interfaces/Hero";
import './styles.css'


interface HeroDetailsProps {
    hero: any;//type is Hero but it is complicating the implementation
    onReturn: () => void;
}

const HeroDetails: React.FC<HeroDetailsProps> = ({ hero, onReturn }) => {
    const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
    const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
    const [slotsAvailable, setSlotsAvailable] = useState<number>(5);

    const navigate = useNavigate();

    const handleSkillSelect = (skill: Skill) => {
        if (selectedSkills.length < 4 && slotsAvailable >= skill.slotRequired) {
            setSelectedSkills([...selectedSkills, skill]);
            setSlotsAvailable(slotsAvailable - skill.slotRequired);
        }
    };

    const handleSkillHover = (skill: Skill | null) => {
        setHoveredSkill(skill);
    };

    const handleSkillRemove = (index: number) => {
        const skillToRemove = selectedSkills[index];
        setSlotsAvailable(slotsAvailable + skillToRemove.slotRequired);
        setSelectedSkills(selectedSkills.filter((_, i) => i !== index));
    };

    const handleSelectForBattle = () => {
        navigate("/battle", { state: { hero } });
    };

    return (
        <div className="hero-details-container">
            <button onClick={onReturn} className="return-button">Return</button>
            <div className="main-section">
                <HeroStats hero={hero} />
                <Skills
                    skills={hero.defaultSkills ?? []}
                    onSkillSelect={handleSkillSelect}
                    onSkillHover={handleSkillHover}
                />
                <TrapSkills />
                <PassiveSkills />
            </div>
            <div className="bottom-section">
                <SelectedSkills
                    skills={selectedSkills}
                    onSkillRemove={handleSkillRemove}
                />
                <SlotAvailable slots={slotsAvailable} />
                <Description
                    skill={
                        hoveredSkill && hoveredSkill.description
                            ? { description: hoveredSkill.description }
                            : null
                    }
                />
                <button onClick={handleSelectForBattle} className="battle-button">
                    Select for Battle
                </button>
            </div>
        </div>
    );
};

export default HeroDetails;
