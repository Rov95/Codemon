export interface Skill {
    skillName: string;
    slotRequired: number;
    description?: string; 
}

export interface PassiveSkill extends Skill {
    isPassive: boolean;
}

export interface TrapSkill extends Skill {
    trapEffect: string; 
}

export interface HeroStatsProps {
    image: string
    characterName: string;
    baseHealth: number;
    basePower: number;
    baseSpeed: number;
    baseDefense: number;
    defaultSkills: Skill[];
    passiveSkill: PassiveSkill | null;
    trapSkills: TrapSkill[];
    availablePoints: number;
}

export class HeroStats {
    image!: string;
    characterName: string;
    baseHealth: number;
    basePower: number;
    baseSpeed: number;
    baseDefense: number;

    currentHealth: number;
    currentPower: number;
    currentSpeed: number;
    currentDefense: number;

    activeHealthBar: number;
    defaultSkills: Skill[];
    passiveSkill: PassiveSkill | null;
    trapSkills: (TrapSkill | null)[];
    availablePoints: number;

    constructor({
        characterName,
        baseHealth,
        basePower,
        baseSpeed,
        baseDefense,
        defaultSkills,
        passiveSkill = null,
        trapSkills = [],
        availablePoints = 5,
    }: HeroStatsProps) {
        this.characterName = characterName;
        this.baseHealth = baseHealth;
        this.basePower = basePower;
        this.baseSpeed = baseSpeed;
        this.baseDefense = baseDefense;

        this.currentHealth = baseHealth;
        this.currentPower = basePower;
        this.currentSpeed = baseSpeed;
        this.currentDefense = baseDefense;

        this.activeHealthBar = 1;
        this.defaultSkills = defaultSkills;
        this.passiveSkill = passiveSkill;
        this.trapSkills = new Array(5).fill(null);
        this.availablePoints = availablePoints;

        trapSkills.forEach((skill, index) => {
            if (index < 5) this.trapSkills[index] = skill;
        });
    }

    initialize() {
        this.currentHealth = this.baseHealth;
        this.currentPower = this.basePower;
        this.currentSpeed = this.baseSpeed;
        this.currentDefense = this.baseDefense;
        this.activeHealthBar = 1;
    }

    updateStatsOnHealthBarChange() {
        switch (this.activeHealthBar) {
            case 1:
                this.currentPower = this.basePower;
                this.currentDefense = this.baseDefense;
                break;
            case 2:
                this.currentPower = this.basePower + 5;
                this.currentDefense = this.baseDefense - 5;
                break;
            case 3:
                this.currentPower = this.basePower + 10;
                this.currentDefense = this.baseDefense - 10;
                break;
            default:
                console.warn(`${this.characterName} is out of health bars!`);
                break;
        }
    }

    takeDamage(damage: number): boolean {
        this.currentHealth -= damage;

    if (this.currentHealth <= 0 && this.activeHealthBar < 3) {
        this.activeHealthBar++;
        this.currentHealth = this.baseHealth;
        this.updateStatsOnHealthBarChange();
        return true;
    }

        return this.currentHealth > 0;
    }

    heal(amount: number) {
    if (this.currentHealth + amount <= this.baseHealth) {
        this.currentHealth += amount;
    } else {
        const overflowHealing = this.currentHealth + amount - this.baseHealth;
        this.currentHealth = this.baseHealth;

        if (this.activeHealthBar < 3) {
            this.activeHealthBar++;
            this.currentHealth =
            overflowHealing > this.baseHealth ? this.baseHealth : overflowHealing;
        } else {
            console.warn("Healing exceeds max health across all bars!");
            }
        }
    }

    modifyStat(stat: "currentSpeed" | "currentPower" | "currentDefense", amount: number) {
        this[stat] += amount;
    }

    addTrapSkill(skill: TrapSkill): boolean {
    if (skill.slotRequired <= this.availablePoints) {
        const emptySlot = this.trapSkills.findIndex((s) => s === null);
        if (emptySlot !== -1) {
            this.trapSkills[emptySlot] = skill;
            this.availablePoints -= skill.slotRequired;
            console.log(`${skill.skillName} added! Points left: ${this.availablePoints}`);
            return true;
        }
    } else {
        console.warn("Not enough points to add this skill.");
        }
        return false;
    }

    removeTrapSkill(index: number) {
        if (index >= 0 && index < this.trapSkills.length && this.trapSkills[index] !== null) {
        this.availablePoints += this.trapSkills[index]!.slotRequired;
        this.trapSkills[index] = null;
        console.log(`Trap skill removed! Points left: ${this.availablePoints}`);
        }
    }

    addPassiveSkill(skill: PassiveSkill): boolean {
        if (skill.isPassive) {
        this.passiveSkill = skill;
        console.log(`${skill.skillName} added as passive skill.`);
        return true;
        } else {
        console.error("This skill cannot be assigned as a passive skill.");
        return false;
        }
    }
}
