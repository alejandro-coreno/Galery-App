import { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import Swal from "sweetalert2";
import iconEditar from "../../assets/img/icon_edit.png"
import iconCerrar from "../../assets/img/icon_cerrar.png";
import iconUpdate from "../../assets/img/icon_update.png";
import "./user.css"

interface Props {
    id: string;
    usuario: string
    correo: string;
    role: string;
}

const User = ({usuario, correo, role, id}: Props) => {

    const [editar, setEditar] = useState<boolean>(false);
    const [editarUsuario, setEditarUsuario] = useState<string>(usuario);
    const [editarCorreo, setEditarCorreo] = useState<string>(correo)
    const [editarRole, setEditarRole] = useState<string>(role);

    const updateData = async (id: string) => {
        try {
            await updateDoc(doc(db, 'usuarios', id), {
                usuario: editarUsuario,
                correo: editarCorreo,
                role: editarRole
            });
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                width: 'auto',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: `¡Usuario: "${editarUsuario}" actualizado correctamente!`
              });
        }
        catch ( error ){
            console.log( error );
        }
       
        setEditar(!editar);
    }

    return (
       <>
          <td>
            {
                editar 
                ?
                    <input
                        className="label"
                        autoFocus
                        id="usuario" 
                        type="text" 
                        name="usuario" 
                        value={editarUsuario}
                        onChange={(e) => setEditarUsuario(e.target.value)}
                    />
                :
                usuario
            }
            
          </td>

          <td>
            {
                editar 
                ?
                    <input
                        className="label"
                        id="correo"
                        type="text" 
                        name="correo"
                        value={editarCorreo}
                        onChange={(e) => setEditarCorreo(e.target.value)}

                    />
                :
                correo
            }
            
          </td>

          <td>
            {
                editar 
                ?
                    <select 
                        name="role" 
                        id="role" 
                        className="label" 
                        onChange={(e) => setEditarRole(e.target.value)}>
                        <option defaultValue="" value="">Seleccione una Opción</option>
                        <option value="analista">Analista</option>
                        <option value="administrardor">Administrador</option>
                    </select>
                :
                
                role
            }
            
          </td>

          <td>
            {
                editar 
                ? 
                    <>
                        <img 
                            className="icon-users"
                            src={iconCerrar} 
                            alt="cerrar"  
                            onClick={() => setEditar(!editar)}
                        />

                        <img 
                            className="icon-users update"
                            src={iconUpdate} 
                            alt="update"
                            onClick={() => updateData(id)}
                        />
                    
                    </>
                    
                
                :
                    <img 
                        className="icon-users"
                        src={iconEditar} 
                        alt="editar"
                        onClick={() => setEditar(!editar)}
                    />
            }

          </td>

       </>
    )
}


export default User