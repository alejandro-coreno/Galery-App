import { useEffect, useState } from "react";
import { useAuth } from "../../context/UserProvider";
import { UsuarioContext } from "../../interfaces/usuario";

const Home = () => {
    const { userbd, subirArchivo } = useAuth() as UsuarioContext;
    const [archivo, setArchivo] = useState<File | null>(null);
    const [carpeta, setCarpeta] = useState<string>('');


    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            await subirArchivo(archivo, carpeta);
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
        <>
            <h1>Home // ID Usuario: {userbd?.usuario} , Role: {userbd?.role} </h1>

            <form action="" onSubmit={ handleSubmit }>
                <input type="file" accept=".pdf" name="archivo" id="archivo" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setArchivo(e.target.files![0])} />
                <select name="carpeta" id="carpeta" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCarpeta(e.target.value)}>
                    <option value="Carpeta1">Carpeta 1</option>
                    <option value="Carpeta2">Carpeta 2</option>
                    <option value="Carpeta3">Carpeta 3</option>
                </select>
                <button type="submit">Subir Archivo</button>
            </form>
        </>
    );
}

export default Home;
