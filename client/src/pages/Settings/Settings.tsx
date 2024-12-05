
import { useNavigate } from 'react-router-dom'
import './Settings.css'


const Settings = () => {

  const navigate = useNavigate();
  return (
    <div className='settings-container'>
      <button onClick={()=>navigate("/")}>Back to main menu</button>
      <div className='player-info'>
        <h2>Player Info</h2>
      </div>
    </div>
  )
}

export default Settings