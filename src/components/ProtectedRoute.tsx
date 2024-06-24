import { Navigate, Outlet } from "react-router-dom";

interface Props {
    children?: JSX.Element | JSX.Element[];
}

// Componente que permite validar multiples rutas con el componente
export const ProtectedRoute = ({ children } : Props) => {
    
    const login = sessionStorage.getItem('login');

    if (!login) return <Navigate to="/"/>
    
    return children ? children : <Outlet />;
    
}
