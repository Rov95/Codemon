import { useState } from 'react';
import './MainMenu.css';
import { Option } from '../../interfaces/Option';

const menuOptions: Option[] = [
  {
    title: 'Battle Arena',
    description: 'Engage in thrilling combat and prove your strength!',
  },
  {
    title: 'Training Grounds',
    description: 'Hone your skills and master your techniques here.',
  },
  {
    title: 'Heroes Gallery',
    description: 'Browse and select your legendary heroes for the battle.',
  },
  {
    title: 'Game Settings',
    description: 'Personalize your gaming experience just the way you like.',
  },
];

const MainMenu = () => {
  const [propDescription, setPropDescription] = useState('Hover over an option to see details.');

  return (
    <div id="main-container">
      {menuOptions.map((option, index) => (
        <button
          key={option.title}
          className={`menu-button button-${index + 1}`}
          onMouseEnter={() => setPropDescription(option.description)}
          onMouseLeave={() => setPropDescription('Hover over an option to see details.')}
        >
          {option.title}
        </button>
      ))}
      <div className="description-container">
        <p>{propDescription}</p>
      </div>
    </div>
  );
};

export default MainMenu;
