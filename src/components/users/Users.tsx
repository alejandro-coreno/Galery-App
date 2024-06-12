import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Usuario, UsuarioContext } from "../../interfaces/usuario";
import { useAuth } from "../../context/UserProvider";
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
            <div>
                <h1>Tabla de Usuarios</h1>
                <hr/>

                {
                    usuarios.length > 0 &&

                    usuarios.map((usuario) =>
                        <div key={usuario.id} style={{margin: '10px'}}>
                            
                            <h4>ID: {usuario.id}</h4>
                            <h5>Usuario: {usuario.usuario}</h5>
                            <h5>Correo: {usuario.correo}</h5>
                            <h5>Role: {usuario.role}</h5>
                            <h5>Password: {usuario.password}</h5>
                            <hr style={{ margin: '15px' }} />
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Users;