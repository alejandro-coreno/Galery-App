import { ImageUser } from "../../interfaces/ImageUser";
import "./imageCard.css"

interface Props {
    arrayImage: ImageUser[];
}

const ImageCard = ({arrayImage}: Props) => {
    return (
        <div className="conteiner-image">
            {   
            arrayImage.length > 0 
                ?
                arrayImage.map((image : ImageUser, index: number) => (
                    <div className="conteiner-card" key={index}>
                        <img src={image.url} alt={image.nombreImage} className="cont-image" />
                        <h5 className="title-image">Nombre de Imagen: <span className="md-title-image">{image.nombreImage}</span></h5>
                        <h5 className="title-image">Usuario: <span className="md-title-image">{image.usuario}</span></h5>
                    </div>
                ))
                :
                <div className="conteiner-na">
                    <h1 className="title-sin-image"> No hay Imagenes</h1>
                </div>
            }
        </div>
    );
}

export default ImageCard;