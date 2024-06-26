import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/UserProvider.js";
import { UsuarioContext } from "../../interfaces/usuario.js";
import Header from "../header/Header.js";
import imageDefault from "../../assets/img/image-previuw.png";
import Swal from "sweetalert2";
import "./home.css";

const Home = () => {
  const { userbd, subirArchivo } = useAuth() as UsuarioContext;
  const [imagePreviuw, setimagePreviuw] = useState<string>("");
  const [archivo, setArchivo] = useState<File | null>(null);

  const navigate = useNavigate();

  const messageAlert = () => {
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
        icon: `${archivo ? 'success' : 'error'}`,
        title: `${archivo ? '¡Archivo subido correctamente!' : '¡Seleccione un archivo!'}`
      });
      return
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!archivo) {
      messageAlert();
      return;
    }
    try {
      await subirArchivo(archivo);
      await messageAlert();
    } 
    catch (error) {
      console.log("Error al subir archivo", error);
    }

    setArchivo(null);
    navigate('/mostrar');

  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setArchivo(e.target.files[0]);

      const url = URL.createObjectURL(e.target.files[0]);
      setimagePreviuw(url);
    }
  };

  useEffect(() => {
    sessionStorage.setItem("login", true.toString());
    if (userbd?.role === "administrador") {
      sessionStorage.setItem("adm", true.toString());
    } else {
      sessionStorage.removeItem("adm");
    }
  }, []);

  return (
    <div className="conteiner-home">
      <Header />

      <form action="" className="form" onSubmit={handleSubmit}>
        <div className="cont-image-file">
          {archivo ? (
            <img
              src={imagePreviuw}
              alt="image_previuw"
              className="image-previuw"
            />
          ) : (
            <img src={imageDefault} alt="default" />
          )}
        </div>

        <div className="column-input">
          <label htmlFor="archivo" className="label-previuw">
            Seleccione un Archivo
          </label>
          <input
            type="file"
            accept=""
            className="input-previuw"
            name="archivo"
            id="archivo"
            onChange={handleChange}
          />
        </div>

        <div className="column-input">
          {/* <button type="submit" className="md-btn-file">Subir Archivo</button> */}
          <input type="submit" className="md-btn-file" value="Subir Archivo" />
        </div>
      </form>
    </div>
  );
};

export default Home;
