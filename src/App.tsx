import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/UserProvider';
import { ProtectedRoute } from './components/ProtectedRoute';
import { UsuarioContext } from './interfaces/usuario';
import Login from './components/login/Login';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import RegistroUsuarios from './components/registroUsuarios/RegistroUsuarios';
import Users from './components/users/Users';
import './App.css'
import HomePage from './pages/homePage/HomePage';


const App = () => {

  const { userbd, nuevaCuenta } = useAuth() as UsuarioContext;

  return (
    <div className={`container`}>
      
      <Routes>
        <Route path='/' element={ userbd && nuevaCuenta ? <HomePage /> : <Login /> } />
        <Route element={<ProtectedRoute />}>
          <Route path='/mostrar' element={<h1>Mostrar Images</h1>} />
        </Route>
        <Route path='/usuarios' element={<RegistroUsuarios />} />
        <Route path='/users' element={<Users />} />
        <Route path='*' element={ <Navigate to="/" />} />  
      </Routes>
    </div>
  );
}

export default App;
