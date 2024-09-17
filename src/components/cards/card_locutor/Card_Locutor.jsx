import React, { useState } from 'react'
import { Container_card_locutor } from "./CardStyles"
import { FaExpand, FaRegHeart, FaHeart  } from "react-icons/fa";
import SocialMidias from '../../socialMidea/SocialMidias';

const Card_Locutor = () => {

    const [like, setLike] = useState(false)

    return (
        <Container_card_locutor>
            <FaExpand className="expand" />
            <div className="card_left">

                { like === false ?
                    <FaRegHeart 
                        className="heart"
                        onClick={() => setLike(true)}
                    /> :
                    <FaHeart 
                        className="heart"
                        onClick={() => setLike(false)}
                    />
                }
                
                <img src="https://enlightenedaudio.com/wp-content/uploads/2023/03/Kate-1007x800.jpg" alt="Locutor" />
                
                <p>1000</p>

            </div>
            <div className="card_right">
                <div className="locutor">
                    <h3>Locutora</h3>
                    <p>Lorena Souza Silva</p>
                </div>
                <div className="programa">
                    <h3>Programa</h3>
                    <p>Fofocalizando</p>
                </div>
                <SocialMidias />
            </div>
        </Container_card_locutor>
    )
}

export default Card_Locutor