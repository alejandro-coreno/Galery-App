import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { db, auth, storage, ref } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User, UserCredential } from "firebase/auth";
import { setDoc, doc, getDoc, DocumentData, onSnapshot, addDoc, collection } from "firebase/firestore";
import { UploadResult, uploadBytes, getDownloadURL } from "firebase/storage";
import { Usuario } from "../interfaces/usuario";
import UserContext from "./UserContext";

interface Props {
    children: JSX.Element | JSX.Element[];
}

// hook personalizado para poder usar el contexto
export const useAuth = () => {
    const context = useContext(UserContext);
    return context;
}

export const UserProveedor = ({ children }: Props) => {

    const [user, setUser] = useState<User | null>(null);
    const [userbd, setUserBd] = useState<DocumentData | null>(null);
    const [nuevaCuenta, setNuevaCuenta] = useState<Boolean>(true);
    const [bandera, setBandera] = useState<Boolean>(false);


    const login = async (email: string, password: string) =>  {
        const userCredencial: UserCredential = await signInWithEmailAndPassword(auth, email, password);
        setNuevaCuenta(true);
    }

    const obtenerDatosBd = async () => {

        if (!user) return;

        try {
            const docRef = doc(db, "usuarios", `${user?.uid}`);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userDataFromDb = docSnap.data();
                setUserBd(userDataFromDb)
            }
            else {
                console.log("¡El documento no existe!");
            }

        }
        catch ( error ) {
            console.log( error );
        }

    }

    const obtenerDatos = async () => {
        if (!user) return;

        onSnapshot(doc(db, 'usuarios', `${user?.uid}`), (doc) => {
            try {
                if (doc.exists()) {
                    const data = doc.data();
                    setUserBd(data);
                }
                else {
                    console.log("¡El documento no existe!");
                }
            }
            catch ( error ) {
                console.log(error);
            }
        });
    }

    const registro = async (email: string, password: string, role: string, user: string) => {
        const usuario: Usuario = {
            usuario: user,
            correo: email,
            password: password,
            role: role
        }
        // desestructuramos el id del metodo autenticación
        const { user: { uid } } = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'usuarios', uid), usuario);
    }

    const subirArchivo = async (file: File | null, carpeta: string) => {
        
        // Creamos la referencia del archivo 
        const storageRef = ref(storage, `${file?.name}`);
        const date = new Date();

        // metodo para poder subit el archivo a la nube 1.- se agrega la referencia 2.- archivo;
        const response: UploadResult = await uploadBytes(storageRef, file!);
        const getUrl: string = await getDownloadURL(response.ref);

        // Agregamos el documento a la coleccion archivos, referencia usuario
        const archivoRef = await addDoc(collection(db, `usuarios/${user?.uid}/archivos`), {
            usuario: userbd?.usuario,
            nombre: file?.name,
            url: getUrl,
            fecha: date
        });

        // Se agregan todos los archivos de manera general para el administrador
        await addDoc(collection(db, 'archivosGeneral'), {
            usuario: userbd?.usuario,
            nombre: file?.name,
            url: getUrl,
            fecha: date
        });
    }

    const salir = async () => {
        <Navigate to="/" />;
        await signOut(auth);
        setNuevaCuenta(false);
        sessionStorage.clear();
    };

    useEffect(() => {
        onAuthStateChanged(auth, (userCurrent) => {
            setUser(userCurrent);
        });
    }, []);

    useEffect(() => {
        // obtenerDatosBd();
        obtenerDatos();
    }, [user]);

    const data = {
        login,
        registro,
        salir,
        userbd,
        user,
        nuevaCuenta,
        subirArchivo
    }

    return <UserContext.Provider value={ data }>{ children }</UserContext.Provider>
}