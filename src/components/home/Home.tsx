import { useEffect, useState } from "react";
import { useAuth } from "../../context/UserProvider.js";
import { UsuarioContext } from "../../interfaces/usuario.js";
import Header from "../header/Header.js"
import "./home.css"

const Home = () => {
    const { userbd, subirArchivo } = useAuth() as UsuarioContext;
    const [archivo, setArchivo] = useState<File | null>(null);


    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            await subirArchivo(archivo , '');
            console.log('Archivo Subido Correctamente');  
            
        }
        catch ( error ) {
            console.log('Error al subir archivo', error);
        }

        setArchivo(null);
    }


    useEffect(() => {
        sessionStorage.setItem('login', true.toString());
        if (userbd?.role === 'administrador') {
            sessionStorage.setItem('adm', true.toString());
        }
        else {
            sessionStorage.removeItem('adm');
        }
    }, []);


    return (
        <div className="conteiner-home">

            <Header />
            
            <form action="" className="form" onSubmit={ handleSubmit }>
                <div className="cont-image-file">
                    
                </div>

                <div className="column-input">
                    <label htmlFor="archivo" className="label-previuw">Seleccione un Archivo</label>
                    <input 
                        type="file" 
                        accept=".pdf" 
                        className="input-previuw"
                        name="archivo" 
                        id="archivo" 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setArchivo(e.target.files![0])} 
                    />
                </div>
                
                <div className="column-input">
                    <button type="submit" className="md-btn-file">Subir Archivo</button>
                </div>
            </form>
        </div>
    );
}

export default Home;
