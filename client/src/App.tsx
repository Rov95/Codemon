import React, { useState, useEffect } from 'react';
import Welcome from './pages/Auth/Welcome/Welcome';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Dashboard from './pages/Dashboard/main/index';
import './App.css';

const App: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(() => {
    return JSON.parse(localStorage.getItem('isSignedIn') || 'false');
  });

  useEffect(() => {
    localStorage.setItem('isSignedIn', JSON.stringify(isSignedIn));
  }, [isSignedIn]);

  const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    return isSignedIn ? children : <Navigate to="/" />;
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<Welcome setIsSignedIn={setIsSignedIn} />} 
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <h1>You are logged in!</h1>
              {/* the main menu should be here */}
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

