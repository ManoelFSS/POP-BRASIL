import  { Install } from "./Btn_InstallStyles"

const Btn_Install_app = ({onClick}) => {
    return (
        <>
            <Install
                onClick={onClick}
            >
                Instalar Aplicativo
            </Install>
        </>
    )
}

export default Btn_Install_app