import React, { useState, useEffect } from 'react';
import IndexPage from './IndexPage';
import HomePage from './components/HomePage';
import Topbar from './components/Topbar';

const App = () => {
  // Estado de inicio de sesión
  const [loggedIn, setLoggedIn] = useState(false);

  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    // Establece el estado de inicio de sesión en verdadero
    setLoggedIn(true);
    // Almacena el estado de inicio de sesión en el almacenamiento local
    localStorage.setItem('isLoggedIn', true);
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    // Establece el estado de inicio de sesión en falso
    setLoggedIn(false);
    // Elimina el estado de inicio de sesión del almacenamiento local
    localStorage.removeItem('isLoggedIn');
  };

  // Verifica el estado de inicio de sesión al cargar la aplicación
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <div>
      {loggedIn && <Topbar onLogout={handleLogout} />}     
        <div>
          {loggedIn ? <HomePage /> : <IndexPage onLogin={handleLogin} />}
        </div>
      </div>
  
  );
};

export default App;
