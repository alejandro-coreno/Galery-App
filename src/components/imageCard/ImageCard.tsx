import { ImageUser } from "../../interfaces/ImageUser";
import "./imageCard.css"

interface Props {
    arrayImage: ImageUser[];
}

const ImageCard = ({arrayImage}: Props) => {
    return (
        <>
            {
                arrayImage.map((img: ImageUser) => {
                    <h1></h1>
                })
            }
        </>
    );
}

export default ImageCard;