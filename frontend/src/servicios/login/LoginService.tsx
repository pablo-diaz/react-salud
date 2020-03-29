import axios from "axios";

import { ResultadoOperacion, crearResultadoParaExito, crearResultadoParaFalla } from "../../utils/SharedDTOs";

type LoginData = {
    usuario: string,
    passwd: string
};

const realizarLogin = async (loginData: LoginData) : Promise<ResultadoOperacion<string>> => {
    const url = `https://localhost:5001/seguridad/autenticarse`;
    try
    {
        const { data } = await axios.post<{ token: string }>(url, loginData);
        return crearResultadoParaExito(data.token);
    }
    catch(exception)
    {
        if(exception instanceof Error){
            const razon = (exception as Error).message;
            if(razon.includes("403"))
                return crearResultadoParaFalla(["Usuario / Password equivocados, intente nuevamente"]);
        }
    }
    return crearResultadoParaFalla(["Hubo un error inesperado. Intente nuevamente"]);
};

export default {
    realizarLogin
}