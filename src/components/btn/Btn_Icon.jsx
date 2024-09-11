import { Button } from "./Btn_iconStyles"

const Btn_icon = ({ icon, onClick }) => {

    return (
        <Button onClick={onClick}>
            {icon}
        </Button>
    )
}

export default Btn_icon