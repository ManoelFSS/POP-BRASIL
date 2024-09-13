import { Button } from "./Btn_iconStyles"

const Btn_icon = ({ icon, onClick }) => {

    return (
        <Button onClick={onClick}>
            <div className="icon">{icon}</div>
        </Button>
    )
}

export default Btn_icon