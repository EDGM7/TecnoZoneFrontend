import React, { useState, useEffect } from 'react'; // Asegúrate de importar useEffect
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const IndexPage = ({ onLogin }) => { // Agrega onLogin como prop
  const [correo, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerMode, setRegisterMode] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: '',    lastName: '',
    correo: '',  password: '',  confirmPassword: ''
  });
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    // Validar el formato del correo electrónico
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(correo)) {
      setMessage('El formato del correo electrónico no es válido');
      return;
    }
  
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { correo, password });
      console.log(response.data.success,response.data.message);
      if (!response.data.success) {
        console.error('entro aquii');
        setMessage(response.data.message); // Esto establecerá el mensaje de error recibido desde el backend
        console.error('luego aquii');
        return;
      } else {
        setRegisterMode(true);
        onLogin();
        localStorage.setItem('usucorreo', correo);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setMessage('Error al iniciar sesión. Por favor, intenta nuevamente.');
      return;
    }
  };
  
  

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Registrando usuario...");
  
    if (registerData.password !== registerData.confirmPassword) {
      setMessage('Las contraseñas no coinciden');
      return;
    }
    // Validar el formato del correo electrónico
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(registerData.correo)) {
      setMessage('El formato del correo electrónico no es válido');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', registerData);
      console.log(response.data.message);
      
      if (!response.data.success) {
        setMessage(response.data.message); // Mostrar el mensaje de error al usuario
      } else {
        setMessage('Registro exitoso!! sera redirigido al login en 3 segundos');
        setRegisterData({
          name: '',
          lastName: '',
          correo: '',
          password: '',
          confirmPassword: ''
        });
        // Ocultar el formulario de registro después de un registro exitoso
        setTimeout(() => {
          setRegisterMode(false);
          window.location.reload(); // Recargar la página después de 2 segundos
        }, 2000); // Espera 2 segundos antes de ocultar el formulario
      }
    } catch (error) {
      //console.error('Error al registrar:', error);      
      setMessage('Error al registrar. Por favor, intenta nuevamente.');
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value
    });
  };

  const toggleForm = () => {
    setRegisterMode(!registerMode); // Alternar entre mostrar y ocultar el formulario de registro
  };

  // Muestra el mensaje de error en la interfaz de usuario
  useEffect(() => {
    if (message) {
      alert(message); // O utiliza otro método para mostrar el mensaje
      
    }
  }, [message]);

  return (
    <div>
      {!registerMode ? (
        <div className="container" style={{ maxWidth: '500px', margin: '50px auto', background: 'linear-gradient(to bottom right, #02371b, #009b10)', padding: '50px 20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)' }}>
          <h1 style={{ textAlign: 'center', color: 'white', marginBottom: '30px' }}>TecnoZone</h1>
          <form onSubmit={handleLogin} style={{ color: 'white' }}>
            <div className="mb-3">
              <label htmlFor="correo" className="form-label">Correo Electrónico</label>
              <input type="email" className="form-control" id="correo" name="correo" value={correo} onChange={(e) => setEmail(e.target.value)} required autoComplete="off" style={{ backgroundColor: '#2b2b2b', color: 'white', border: '1px solid #ff7e5f' }} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input type="password" className="form-control" id="password" name="password" value={password} autoComplete="off" onChange={(e) => setPassword(e.target.value)} required style={{ backgroundColor: '#2b2b2b', color: 'white', border: '1px solid #ff7e5f' }} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#c94301', borderColor: '#ff7e5f', width: '100%' }}>Ingresar</button>
          </form>
          <p style={{ color: 'white', marginTop: '20px', textAlign: 'center' }}><a href="#" onClick={toggleForm} style={{ color: 'white' }}>REGISTRATE</a> si aún no tienes una cuenta.</p>
        </div>
      ) : (
        <div className="container" style={{ maxWidth: '500px', margin: '50px auto', background: 'linear-gradient(to bottom right, #02371b, #009b10)', padding: '50px 20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)' }}>
          <form onSubmit={handleRegister} style={{ color: 'white' }}>
            <h2 style={{ textAlign: 'center', color: 'white', marginBottom: '20px' }}>Registro de Usuario</h2>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre</label>
              <input type="text" className="form-control" id="name" name="name" value={registerData.name} onChange={handleInputChange} required style={{ backgroundColor: '#2b2b2b', color: 'white', border: '1px solid #ff7e5f' }} />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Apellido</label>
              <input type="text" className="form-control" id="lastName" name="lastName" value={registerData.lastName} onChange={handleInputChange} required style={{ backgroundColor: '#2b2b2b', color: 'white', border: '1px solid #ff7e5f' }} />
            </div>
            <div className="mb-3">
              <label htmlFor="registerEmail" className="form-label">Correo Electrónico</label>
              <input type="email" className="form-control" id="registerEmail" name="correo" value={registerData.correo} onChange={handleInputChange} required pattern="[^\s@]+@[^\s@]+\.[^\s@]+" title="El formato del correo electrónico no es válido" autoComplete="off" style={{ backgroundColor: '#2b2b2b', color: 'white', border: '1px solid #ff7e5f' }} />
            </div>
            <div className="mb-3">
              <label htmlFor="registerPassword" className="form-label">Contraseña</label>
              <input type="password" className="form-control" id="registerPassword" name="password" value={registerData.password} autoComplete="off" onChange={handleInputChange} required style={{ backgroundColor: '#2b2b2b', color: 'white', border: '1px solid #ff7e5f' }} />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
              <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={registerData.confirmPassword} autoComplete="off" onChange={handleInputChange} required style={{ backgroundColor: '#2b2b2b', color: 'white', border: '1px solid #ff7e5f' }} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#c94301', borderColor: '#00ffbf', width: '100%' }}>Registrarse</button>
          </form>
          <br />
      
          {message && <div className="alert alert-danger">{message}</div>}

        </div>
      )}
    </div>
  );
};

export default IndexPage;
