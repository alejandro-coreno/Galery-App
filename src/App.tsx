import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/UserProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { UsuarioContext } from "./interfaces/usuario";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import RegistroUsuarios from "./components/registroUsuarios/RegistroUsuarios";
import Users from "./components/users/Users";
import Mostrar from "./components/mostrar/Mostrar";
import "./App.css";

const App = () => {
  const { userbd, nuevaCuenta, user } = useAuth() as UsuarioContext;

  return (
    <div className={`container ${user && "conteiner-active"}`}>
      {user && nuevaCuenta && <Navbar />}


      <Routes>
        <Route
          path="/"
          element={userbd && nuevaCuenta ? <Home /> : <Login />}
        />
        <Route element={<ProtectedRoute />}>
          <Route path="/mostrar" element={<Mostrar />} />
        </Route>
        <Route path="/registro" element={<RegistroUsuarios />} />
        <Route path="/usuarios" element={<Users />} />
        <Route path="/salir" element={<Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
