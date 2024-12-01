import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainMenu.css';
import { Option } from '../../interfaces/Option';
import LogoutButton from '../main-menu/LogOutButton/logOut'; 

const menuOptions: Option[] = [
  {
    title: 'Battle Arena',
    description: 'Engage in thrilling combat and prove your strength!',
    route: '/battle-arena',
  },
  {
    title: 'Training Grounds',
    description: 'Hone your skills and master your techniques here.',
    route: '/training-grounds',
  },
  {
    title: 'Heroes Gallery',
    description: 'Browse and select your legendary heroes for the battle.',
    route: '/heroes-gallery',
  },
  {
    title: 'Game Settings',
    description: 'Personalize your gaming experience just the way you like.',
    route: '/settings',
  },
];

const MainMenu = () => {
  const [propDescription, setPropDescription] = useState('Hover over an option to see details.');
  const navigate = useNavigate();

  return (
    <div id="main-container">
      {menuOptions.map((option, index) => (
        <button
          key={option.title}
          className={`menu-button button-${index + 1}`}
          onMouseEnter={() => setPropDescription(option.description)}
          onMouseLeave={() => setPropDescription('Hover over an option to see details.')}
          onClick={() => navigate(option.route)} // Navigate to the corresponding route
        >
          {option.title}
        </button>
      ))}
      <div className="description-container">
        <p>{propDescription}</p>
      </div>
      <LogoutButton />
    </div>
  );
};

export default MainMenu;
