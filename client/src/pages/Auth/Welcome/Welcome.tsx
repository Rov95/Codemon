import React, { useState } from 'react';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SIgnUp/SignUp';
import './styles.css';

interface WelcomeProps {
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Welcome: React.FC<WelcomeProps> = ({ setIsSignedIn }) => {
    const [showSignUp, setShowSignUp] = useState<boolean>(false);

    const toggleSignUp = () => {
        setShowSignUp(!showSignUp);
    };

    return (
        <div className='welcome-page'>
        <h1 className="welcome-title">
            Welcome to Codemon!
        </h1>
        {showSignUp ? (
            <SignUp toggleSignUp={toggleSignUp} />
        ) : (
            <>
            <SignIn setIsSignedIn={setIsSignedIn} />
            <p className="signup-prompt">
                Don't have an account?{' '}
                <span className='sign-up-option' onClick={toggleSignUp}>
                Sign up
                </span>
            </p>
            </>
        )}
        </div>
    );
};

export default Welcome;
