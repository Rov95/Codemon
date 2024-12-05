import React from "react";
import './styless.css'

const EnemyInfo: React.FC<{ enemy: any }> = ({ enemy }) => (
    <div className="character-info enemy-info">
        <p className="character-name">{enemy.name}</p>
            <p>
                {enemy.currentHealth} / {enemy.maxHealth} HP
            </p>
    </div>
);

export default EnemyInfo;
