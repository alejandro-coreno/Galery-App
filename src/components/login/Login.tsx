import { useState } from "react";
import { UsuarioContext } from "../../interfaces/usuario";
import { useAuth } from "../../context/UserProvider";
import Swal from 'sweetalert2'
import iconPrincipal from "../../assets/img/icon_users_login.png"
import iconUser  from "../../assets/img/Icon_user.png"
import iconPassword from "../../assets/img/icon_password.png"
import "./login.css"

const Login = () => {
    const { login  } = useAuth() as UsuarioContext;
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');


    const messageError = (error: any) =>  {
      if (error === 'auth/invalid-credential') {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          width: '25rem',
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
          title: "¡Correo o contraseña incorrecto!"
        });
        return
      }
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (password.trim() === '' || email.trim() === '') {
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
          title: "¡Completa los campos!"
        });
        return
      }

      try {
        await login(email, password);
      }
      catch (error: any) {
        messageError(error.code)
      }
      setEmail('');
      setPassword('');
    }

    return (
      <div className="conteiner-login">
        
        <div className="conteiner-info">
          <div className="item-info">
            <h1 className="title">¡Bienvenido!</h1>
            <p className="subtitle">Sistema para control de información</p>
          </div>
        </div>

        <form action="" className="forms" onSubmit={handleLogin}>

          <div className="img-users">
            <img src={iconPrincipal} alt="users" className="img"/>
          </div>

          <div className="item-input">
            <div className="conteiner-icon">
              <img src={iconUser} alt="icon-User" className="icon-login" />
            </div>
            <input type="email"
              className="input"
              name="usuario"
              id="usuario"
              placeholder="Usuario"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="item-input">
            <div className="conteiner-icon">
              <img src={iconPassword} alt="icon-password" className="icon-login" />
            </div>
            <input type="password"
              minLength={6}
              className="input"
              name="password"
              id="password"
              placeholder="Contraseña ******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="conteiner-btn-login">
            <button type="submit" className="btn-login">Entrar</button>
          </div>
        </form>
      </div>
    );
}

export default Login;
