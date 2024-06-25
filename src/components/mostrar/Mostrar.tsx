import { useEffect, useState } from "react";
import { collection, query, where , onSnapshot} from "firebase/firestore";
import { useAuth } from "../../context/UserProvider";
import { ImageUser } from "../../interfaces/ImageUser";
import { Usuario, UsuarioContext } from "../../interfaces/usuario";
import { db } from "../../firebase/firebaseConfig";
import Header from "../header/Header";
import ImageCard from "../imageCard/ImageCard";
import "./mostrar.css"

const Mostrar = () => {

    const [imagesUser, setImageUser] = useState<ImageUser[]>([]);
    const {userbd} = useAuth() as UsuarioContext
    const {usuario} = userbd as Usuario

    const obtenerImagenes = () => {
        const q = query(collection(db, 'archivosGeneral'), where('usuario', '==', usuario));
        onSnapshot(q, (snapshot) => {
            const arrayImages = snapshot.docs.map((documento) => {
            const data = documento.data() as ImageUser;
            
            return {
                    ...data
                }
            })
            setImageUser( arrayImages );
        });
    }

    useEffect(() => {
        obtenerImagenes()
    }, [])

    return (
       <div className="conteiner-mostrar">

        <Header />

        <ImageCard arrayImage={imagesUser}/>

       </div>
    );
}

export default Mostrar;