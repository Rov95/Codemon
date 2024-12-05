import React from "react";
import './styless.css'

const BattleLog: React.FC<{ battleLog: string[] }> = ({ battleLog }) => (
    <div className="battle-log">
        <div className="log-content">
            {battleLog.map((log, index) => (
                <p key={index}>{log}</p>
            ))}
        </div>
    </div>
);

export default BattleLog;
