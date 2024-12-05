const API_URL = 'https://85f1-181-32-12-10.ngrok-free.app/users';

interface SignUpData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

interface SignInCredentials {
    email: string;
    password: string;
}

export const signUp = async (userData: SignUpData): Promise<any> => {
    try {
        const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
        });
        if (!response.ok) {
        throw new Error('Failed to register, please try again');
        }
        return await response.json();
    } catch (error) {
        console.error('Error signing up: ', error);
        throw error;
    }
};

export const signIn = async (credentials: SignInCredentials): Promise<any> => {
    try {
        const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        });
        if (!response.ok) {
        throw new Error('Invalid email or password.');
        }
        return await response.json();
    } catch (error) {
        console.error('Error in SignIn: ', error);
        throw error;
    }
};

export const signOut = async (): Promise<any> => {
    try {
        const response = await fetch(`${API_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
        });
        if (!response.ok) {
        throw new Error('Error logging out, please try again.');
        }
        return await response.json();
    } catch (error) {
        console.error('Error signing out: ', error);
        throw error;
    }
};
