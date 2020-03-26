import { ResultadoOperacion, crearResultadoParaExito, crearResultadoParaFalla } from "../../utils/SharedDTOs";

type RegistrarseData = {
    usuario: string,
    passwd: string,
    nombreCompleto: string
};

const obtenerErroresDeValudacion = (data: RegistrarseData): string[] => [];

const registrarse = (data: RegistrarseData) : ResultadoOperacion<null> => {
    const erroresDeValidacion = obtenerErroresDeValudacion(data);
    if(erroresDeValidacion.length === 0) return crearResultadoParaExito<null>(null);
    return crearResultadoParaFalla(erroresDeValidacion);
};

export default {
    registrarse
};