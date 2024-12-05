
import { useNavigate } from 'react-router-dom'
import './Settings.css'


const Settings = () => {

  const navigate = useNavigate();


  return (
    <div className='settings-container'>
      <button className='back-menu-bttn' onClick={()=>navigate("/dashboard")}>Back to main menu</button>
      <div className='info-player'>
        <h2>Player Info</h2>
        <div className='info'>
          <p className='label'>Name</p>
          <p className='content'>Rodrigo</p>
        </div>
        <div className='info'>
          <p className='label'>Email</p>
          <p className='content'>test@test.com</p>
        </div>
      </div>
    </div>
  )
}

export default Settings