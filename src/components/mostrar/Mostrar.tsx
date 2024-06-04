import { useAuth } from "../../context/UserProvider";
import { UsuarioContext } from "../../interfaces/usuario";


const Mostrar = () => {
    const {userbd} = useAuth() as UsuarioContext
 
    return (
        <div>

            <h1>Bienvenid@ {userbd?.usuario}</h1>
            <h3>Componente Mostra</h3>
        </div>
    )
}


export default Mostrar;