import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/UserProvider";
import { UsuarioContext } from "../../interfaces/usuario";
import "./navbar.css"

const Navbar = () => {

    const { userbd, salir } = useAuth() as UsuarioContext;

    const handleLogout = async () => {
        try {
            await salir();
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="navbar">

            <div className="container-img">
                <img src="" />
            </div>

            <div className="cont-option">
                <NavLink to="/">Inicio</NavLink>
            </div>

            <div className="cont-option">
                <NavLink to="/mostrar">Mostrar</NavLink>
            </div>

            <button type="button" onClick={handleLogout}>Salir</button>

            {
                userbd?.role === 'administrador' &&
                <>  
                    <div className="cont-option">
                        <NavLink to="/usuarios">Registro</NavLink>
                    </div>

                    <div className="cont-option">
                     <NavLink to="/users">Usuarios</NavLink>
                    </div>
                </>
            }
        </div>
    );
}

export default Navbar;