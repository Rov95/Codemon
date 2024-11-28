import { useState } from 'react'
import './MainMenu.css'


interface Option {
  title: string,
  description: string,
}

const menuOptions : Option[] = [
  {
    title: 'Battle',
    description: 'Go to battle'
  },
  {
    title: 'Characters',
    description: 'Choose your character'
  },
  {
    title: 'Practice',
    description: 'Practice with your character'
  }
]

const MainMenu = () => {

  const [propDescription, setPropDescription] = useState('Description here');

  return (
    <>
      <div id="main-container">
        <div className='list-container'>
            {
              menuOptions.map(option => (
                <div className='menu-item' key={option.title} onMouseEnter={() => setPropDescription(option.description)}
                onMouseLeave={() => setPropDescription("Hover an option")}>
                  <p>{option.title}</p>
                </div>
              ))
            }
        </div>
        <div className='description-container'>
          <p>
            {propDescription}
          </p>
        </div>
      </div>
    </>
    
  )
}

export default MainMenu