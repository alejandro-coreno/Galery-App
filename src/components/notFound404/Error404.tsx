import { useNavigate } from "react-router-dom"

const Error404 = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        return navigate('/');
    }

    return (
        <div>
            <h1>Not Found 404 </h1>
            <button onClick={handleClick}>Regresar al inicio</button>
        </div>
    );
}

export default Error404;
