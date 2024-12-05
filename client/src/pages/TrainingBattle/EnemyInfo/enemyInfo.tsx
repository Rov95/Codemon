import React from "react";
import './styless.css'
import {Enemy} from "../../../classes/EnemyStats";

const EnemyInfo: React.FC<{ enemy: Enemy}> = ({ enemy }) => (
    <div className="character-info enemy-info">
        <p className="character-name">{enemy.name}</p>
            <p>
                {enemy.currentHealth} / {enemy.maxHealth} HP
            </p>
        {/* <div className="health-bar">
            <div
                className="health-bar-fill"
                style={{
                    width: `${(enemy.currentHealth / enemy.maxHealth) * 100}%`,
                }}
            ></div>
        </div> */}
    </div>
);

export default EnemyInfo;
