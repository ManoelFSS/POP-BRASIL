import { Container_home } from "./HomeStyles"
import  Player from "../../components/player/Player"

const Home = () => {

     const audioSrc = "https://s03.transmissaodigital.com:6694/stream"

    return (
        <Container_home>
            <Player audioSrc={audioSrc} albumCover={"https://img.radios.com.br/radio/lg/radio34301_1719839328.png"} />
        </Container_home>
    )
}

export default Home