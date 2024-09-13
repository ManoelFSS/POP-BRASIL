import { Container_card_locutor } from "./CardStyles"
import { FaFacebookF, FaInstagram, FaWhatsapp, FaExpand, FaRegHeart  } from "react-icons/fa";

const Card_Locutor = () => {
    return (
        <Container_card_locutor>
            <div className="card_left">
                <FaRegHeart className="heart" />
                <img src="https://enlightenedaudio.com/wp-content/uploads/2023/03/Kate-1007x800.jpg" alt="Locutor" />
                <div className="icones">
                    <FaFacebookF className="facebook" />
                    <FaInstagram className="instagram" />
                    <FaWhatsapp className="whatsapp" />
                </div>
                <div className="likes">
                    <h4>Curtidas</h4>
                    <p>1000</p>
                </div>
            </div>
            <div className="card_right">
                <FaExpand className="expand" />
                <div className="locutor">
                    <h3>Locutora</h3>
                    <p>Lorena Souza Silva</p>
                </div>
                <div className="programa">
                    <h3>Programa</h3>
                    <p>Fofocalizando</p>
                </div>
                <div className="descricao">
                    <h3>Descrisção</h3>
                    <p>
                        Fofocalizando é um programa de rádio que traz as principais notícias e polêmicas do mundo das celebridades. Com uma abordagem leve e envolvente,  e novidades do universo dos famosos.
                    </p>
                </div>

            </div>
        </Container_card_locutor>
    )
}

export default Card_Locutor