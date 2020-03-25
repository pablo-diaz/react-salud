import { ResultadoOperacion, crearResultadoParaExito, crearResultadoParaFalla } from "../../utils/SharedDTOs";

type LoginData = {
    usuario: string,
    passwd: string
};

const realizarLogin = (data: LoginData) : ResultadoOperacion<null> => {
    if(data.usuario === "pablo" && data.passwd === "nada")
        return crearResultadoParaExito<null>(null);
    return crearResultadoParaFalla(["Autenticacion fallida. Intente nuevamente"]);
};

export default {
    realizarLogin
}