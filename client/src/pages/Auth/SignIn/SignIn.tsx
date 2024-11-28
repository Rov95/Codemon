import React, { useState } from "react";
import { signIn } from '../../../services/authService';
import { Navigate } from 'react-router-dom';
import './styles.css';

interface SignInProps {
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignIn: React.FC<SignInProps> = ({ setIsSignedIn }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [redirect, setRedirect] = useState<boolean>(false);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
        const response = await signIn({ email, password });
        console.log('Sign in successful: ', response);
        setIsSignedIn(true);
        setRedirect(true);
        } catch (err: any) {
        setError(err.message);
        }
    };

    if (redirect) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <form onSubmit={handleSignIn} className="sign-in-form">
        <h2 className="form-title">Sign In</h2>
        <label>Email</label>
        <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        />
        <label>Password</label>
        <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        <button type="submit" className="form-button">Sign In</button>
        {error && <p className="error">{error}</p>}
        </form>
    );
};

export default SignIn;
