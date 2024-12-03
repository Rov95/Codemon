import React, { useState, useEffect } from 'react';
import Welcome from './pages/Auth/Welcome/Welcome';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainMenu from './pages/main-menu/MainMenu';
import HeroesGallery from './pages/HeroesGallery/heroesGallery';
import BattleComponent from './pages/Battle/battle';
import './App.css';
import TrainingGrounds from './pages/TrainingGrounds/TrainingGrounds';

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
        {/* <Route 
          path="/" 
          element={<Welcome setIsSignedIn={setIsSignedIn} />} 
        /> */}
        <Route
          // path="/dashboard"
          path='/'//tenemos que eliminar esta linea una ves el back este listo 
          element={
              // <PrivateRoute>
                  <MainMenu />
              // </PrivateRoute> 
          }
        />
        <Route
          path="/heroes-gallery"
          element={
            // <PrivateRoute>
              <HeroesGallery />
            // </PrivateRoute> 
          }
        />
        <Route
          path="/battle-arena"
          element={
            // <PrivateRoute>
              <div>Battle Arena Page Coming Soon!</div> 
            // </PrivateRoute>
          }
        />
        <Route
          path="/training-grounds"
          element={
            // <PrivateRoute>
              <TrainingGrounds/> 
            // </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            // <PrivateRoute>
              <div>Settings Page Coming Soon!</div> 
            /* </PrivateRoute> */
          }
        />
        <Route
          path="/battle"
          element={
            // <PrivateRoute>
              <BattleComponent />
            /* </PrivateRoute> */
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

