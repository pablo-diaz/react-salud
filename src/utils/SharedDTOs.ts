export type ResultadoOperacion<T> = {
    exitosa: boolean,
    errores: string[] | null,
    extraData: T | null
};

export const crearResultadoParaExito = <T>(extraData: T): ResultadoOperacion<T> => {
    return { exitosa: true, errores: null, extraData };
};

export const crearResultadoParaFalla = (errores: string[]): ResultadoOperacion<null> => {
    return { exitosa: false, errores, extraData: null };
};