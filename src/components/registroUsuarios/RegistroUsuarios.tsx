import { useState, useEffect } from "react";
import { UsuarioContext } from "../../interfaces/usuario";
import { useAuth } from "../../context/UserProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const RegistroUsuarios = () => {
    const { registro, salir, nuevaCuenta } = useAuth() as UsuarioContext;
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [nombre, setNombre] = useState<string>('');
    const [role, setRole] = useState<string>('');

    const navigate = useNavigate();

    const validacion = () => {
        const adm = sessionStorage.getItem('adm');
        if (!adm) return navigate('/');
    }

    const mensajeError = (error : any) => {
        if (error === 'auth/email-already-in-use') {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "error",
                title: "¡Cuenta existente!"
              });
            return
        }
    }

    const handleRegistrer = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email.trim() === '' || password.trim() === '' || nombre.trim() === '' || role === ''){
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "error",
                title: "¡Campos Vacios!"
              });
            return
        } 
        try {
            await registro(email, password, role, nombre);
            await salir();
            navigate('/');
        }
        catch (error: any) {
            mensajeError( error.code );
        }
        setEmail('');
        setPassword('');
        setRole('');
        setNombre('');
    }

    useEffect(() => {
        validacion();
    }, [nuevaCuenta]);


    return (
        <form action="" className="" onSubmit={handleRegistrer}>

            <h2 className="">Registro</h2>

            <div>
                <input type="text"
                    name="usuario"
                    id="usuario"
                    placeholder="Usuario"
                    value={nombre}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => setNombre(e.target.value)}
                />
            </div>

            <div>
                <input type="email"
                    name="correo"
                    id="correo"
                    placeholder="Correo Electronico"
                    value={email}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
            </div>

            <div>
                <input type="password"
                    name="password"
                    id="password"
                    placeholder="Contraseña ********"
                    value={password}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
            </div>

            <div>
                <select name="role" id="role" value={role} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRole(e.target.value)}>
                    <option value="" disabled defaultValue="">Seleccione un role</option>
                    <option value="administrador">Administrador</option>
                    <option value="analista">Analista</option>
                </select>
            </div>

            <div>
                <button type="submit">Crear Cuenta</button>
            </div>

        </form>
    );
}

export default RegistroUsuarios;
