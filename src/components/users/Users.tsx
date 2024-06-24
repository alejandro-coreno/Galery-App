import { useDebugValue, useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Usuario, UsuarioContext } from "../../interfaces/usuario";
import { useAuth } from "../../context/UserProvider";
import User from "../user/User";
import Header from "../header/Header";
import "./users.css"

const Users = () => {
    const { nuevaCuenta } = useAuth() as UsuarioContext
    const [ usuarios, setUsuarios ] = useState<Usuario[]>([]);

    const navigate = useNavigate();

    const validacion = () => {
        const adm = sessionStorage.getItem('adm');
        if (!adm) return navigate('/');
    }

    useEffect(() => {

        validacion();
        // Obtenemos todos los documentos de la colección usuarios
        onSnapshot(collection(db, 'usuarios'), (snapshot) => {
            const arregloUsuarios: Usuario[] = snapshot.docs.map((documento) => {
                const data = documento.data();
                return {
                    id: documento.id,
                    usuario: data.usuario,
                    correo: data.correo,
                    role: data.role,
                    password: data.password
                };
            });

            setUsuarios(arregloUsuarios);
        });
    }, [nuevaCuenta]);


    return (
        <div className="conteiner-usuarios">
            <Header />
            <div className="conteiner-users">
                <h2 className="title-users">Tabla de Usuarios</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Correo</th>
                            <th>Role</th>
                            <th>Accion</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            usuarios.length > 0 && usuarios.map((user, index) => 
                            
                                <tr key={index}>
                                    <User 
                                        usuario={user.usuario !}
                                        correo={user.correo}
                                        role={user.role}
                                    /> 
                                </tr>
                            
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;