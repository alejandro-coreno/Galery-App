import { useAuth } from "../../context/UserProvider";
import { UsuarioContext } from "../../interfaces/usuario";
import "./header.css"


const Header = () => {

  const { userbd } = useAuth() as UsuarioContext

  return (
    <div className="cabezera">
      <h1 className="title-home">Bienvenido {userbd?.usuario} </h1>
    </div>
  );
};

export default Header;
