import { Container_social} from "./SocialStyles";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";


const SocialMidias = () => {
    return (
        <Container_social>
            <FaFacebookF className="facebook" />
            <FaInstagram className="instagram" />
            <FaWhatsapp className="whatsapp" />
        </Container_social>
    )
}

export default SocialMidias