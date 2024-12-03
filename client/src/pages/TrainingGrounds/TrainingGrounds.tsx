
import { useState } from 'react';
import './TrainingGrounds.css'
import PlayerSettings from './PlayerSettings/PlayerSettings';
import OpponentSettings from './OpponentSettings/OpponentSettings';
import TrainingBattle from './TrainingBattle/TrainingBattle';
const TrainingGrounds = () => {

  const trainingSteps = ['playerSettings', 'opponentSettings' ,'trainingBattle']

  const [step, setStep] = useState('playerSettings');

  function handleStep (step: number) {
    setStep(trainingSteps[step]);
  }


  if (step === 'playerSettings') {
    return (
      <PlayerSettings handleStep={handleStep}/>
    )
  }

  if (step === 'opponentSettings') {
    return (
      <OpponentSettings handleStep={handleStep}/>
    )
  }

  return <TrainingBattle/>

  
}

export default TrainingGrounds