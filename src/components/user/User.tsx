import { useState } from "react";
import iconEditar from "../../assets/img/icon_edit.png"
import iconCerrar from "../../assets/img/icon_cerrar.png";
import iconUpdate from "../../assets/img/icon_update.png";

interface Props {
    usuario: string
    correo: string;
    role: string;
}

const User = ({usuario, correo, role}: Props) => {

    const [editar, setEditar] = useState<boolean>(false);
    const [editarUsuario, setEditarUsuario] = useState<string>(usuario);
    const [editarCorreo, setEditarCorreo] = useState<string>(correo)
    const [editarRole, setEditarRole] = useState<string>(role);



    return (
       <>
          <td>
            {
                editar 
                ?
                    <input
                        className="label"
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
                    <input
                        className="label"
                        id="role"
                        type="text" 
                        name="role"
                        value={editarRole} 
                        onChange={(e) => setEditarRole(e.target.value)}
                    />
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
                            onClick={() => alert('Actualizar usuario')}
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