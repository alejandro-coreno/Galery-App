import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/UserProvider";
import { UsuarioContext } from "../../interfaces/usuario";


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
        <>
            <NavLink to="/">Inicio</NavLink>
            <NavLink to="/mostrar">Mostrar</NavLink>
            <NavLink to="/about">About</NavLink>
            <button type="button" onClick={handleLogout}>Salir</button>

            {
                userbd?.role === 'administrador' &&
                <>
                    <NavLink to="/usuarios">Usuarios</NavLink>
                    <NavLink to="/users">Users</NavLink>
                </>
            }
        </>
    );
}

export default Navbar;