import './styles.css';
import { signOut } from '../../../services/authService';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
        await signOut();
        localStorage.setItem('isSignedIn', JSON.stringify(false)); // Clear sign-in status
        alert('You have been logged out successfully.');
        navigate('/'); // Redirect to the welcome/sign-in page
        } catch (error) {
        alert('Error logging out, please try again.');
        }
    };

    return (
        <button className="logout-button" onClick={handleLogout}>
        Logout
        </button>
    );
};

export default LogoutButton;

