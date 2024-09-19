import { ContainerHeader } from "./HeaderStyles";
import { IoMenu } from "react-icons/io5";
import { useAuthContext } from "../../context/contextAuth/ContexAuth";
import Perfil from "../../../public/perfil.jpg";

const Header = () => {
    const { signInGoogle, auths } = useAuthContext();

    // Recupera e analisa os dados do localStorage
    const photo = JSON.parse(localStorage.getItem("photo"));
    const displayName = JSON.parse(localStorage.getItem("UserName"));

    // Verifica se displayName não é nulo ou undefined antes de tentar usar split
    const name = displayName ? displayName.split(' ')[0] : '';

    return (
        <ContainerHeader>
            <div className="header_area">
                <IoMenu className="menu_icon" />
                <div className="header_area_right">
                    {displayName ? (
                        <>
                            <div className="header_text">
                                <h3>Seja bem-vindo(a)</h3>
                                <p>{name}</p>
                            </div>
                            {/* <p className="login">Sair</p> */}
                        </>
                    ) : <p 
                            onClick={signInGoogle} 
                            className="login"
                            > Login</p>
                    }
                    
                    <img 
                        src={photo ? photo : Perfil} 
                        alt="foto do usuário"
                    />
                </div> 
            </div>
        </ContainerHeader>
    );
}

export default Header;