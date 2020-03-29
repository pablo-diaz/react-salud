import axios from "axios";

import { ResultadoOperacion, crearResultadoParaExito, crearResultadoParaFalla } from "../../utils/SharedDTOs";

type RegistrarseData = {
    usuario: string,
    passwd: string,
    nombreCompleto: string,
    edad: number,
    genero: string
};

const obtenerErroresDeValidacion = (data: RegistrarseData): string[] => {
    const errores = [];
    if(data.edad < 18) errores.push("Se necesita que seas mayor de edad");
    if(!data.nombreCompleto || data.nombreCompleto.length <= 3) errores.push("Escribe tu Nombre");
    if(!data.usuario || data.usuario.length <= 3) errores.push("Escribe tu Usuario");
    if(!data.passwd || data.passwd.length <= 3) errores.push("Escribe tu Password");
    if(!data.genero || data.genero.length <= 3) errores.push("Escribe tu Género");
    if(data.edad <= 0) errores.push("Escribe una Edad válida");
    return errores;
};

const registrarse = async (dataRegistro: RegistrarseData) : Promise<ResultadoOperacion<null>> => {
    const erroresDeValidacion = obtenerErroresDeValidacion(dataRegistro);
    if(erroresDeValidacion.length > 0) 
        return crearResultadoParaFalla(erroresDeValidacion);
    
    const url = `https://localhost:5001/seguridad/agregarUsuario`;
    let posibleError: string = "";

    try {
        await axios.post<string>(url, dataRegistro, { transformResponse: data => posibleError = data });
        return crearResultadoParaExito(null);
    }
    catch(exception) {
        if(posibleError.length > 0)
            return crearResultadoParaFalla([posibleError]);
        if(exception instanceof Error)
            return crearResultadoParaFalla([exception.message]);
    }
    return crearResultadoParaFalla(["Error general. Intente nuevamente"]);
};

export default {
    registrarse
};