import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/UserProvider';
import { ProtectedRoute } from './components/ProtectedRoute';
import { UsuarioContext } from './interfaces/usuario';
import Login from './components/login/Login';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import Mostrar from './components/mostrar/Mostrar';
import RegistroUsuarios from './components/registroUsuarios/RegistroUsuarios';
import Users from './components/users/Users';
import './App.css'


const App = () => {

  const { userbd, nuevaCuenta } = useAuth() as UsuarioContext;

  return (
    <div className='container'>
       
      { userbd &&  nuevaCuenta && <Navbar /> }
      
      <Routes>
        <Route path='/' element={ userbd && nuevaCuenta ? <Home /> : <Login /> } />
        <Route element={<ProtectedRoute />}>
          <Route path='/mostrar' element={<Mostrar />} />
          <Route path='/about' element={<h2>Pagina About</h2>} />
        </Route>
        <Route path='/usuarios' element={<RegistroUsuarios />} />
        <Route path='/users' element={<Users />} />
        <Route path='*' element={ <Navigate to="/" />} />  
      </Routes>
    </div>
  );
}

export default App;
