import { User} from "firebase/auth";
export interface Usuario {
    id?: string;
    correo: string;
    usuario?: string;
    password: string;
    role: string;
}

export interface UsuarioContext {
    user: User;
    userbd:  Usuario | null;
    nuevaCuenta: boolean;
    login: (email: string , password: string) => void;
    subirArchivo: (file: File | null) => void;
    registro: (email: string , password: string, role: string, user: string) => void;
    salir: () => Promise<void>;
}