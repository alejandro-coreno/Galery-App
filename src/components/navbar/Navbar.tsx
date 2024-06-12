import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/UserProvider";
import { UsuarioContext } from "../../interfaces/usuario";
import fondoHome from "../../assets/img/fondo-home.jpeg"
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
                <img src="" className="img" />
            </div>

            <div className="cont-option">
                <NavLink to="/" className="enlace">Inicio</NavLink>
            </div>

            <div className="cont-option">
                <NavLink to="/mostrar" className="enlace">Mostrar</NavLink>
            </div>

            {
                userbd?.role === 'administrador' &&
                <>  
                    <div className="cont-option">
                        <NavLink to="/usuarios" className="enlace">Registro</NavLink>
                    </div>

                    <div className="cont-option">
                     <NavLink to="/users" className="enlace">Usuarios</NavLink>
                    </div>
                </>
            }

            <div className="cont-option">
                <NavLink to="/salir" className="enlace" onClick={handleLogout}>Salir</NavLink>
            </div>
        </div>
    );
}

export default Navbar;  