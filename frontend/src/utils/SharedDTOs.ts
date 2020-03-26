export type ResultadoOperacion<T> = {
    exitosa: boolean,
    errores: string[] | null,
    extraData: T | null
};

export const crearResultadoParaExito = <T>(extraData: T): ResultadoOperacion<T> => {
    return { exitosa: true, errores: null, extraData };
};

export const crearResultadoParaFalla = <T>(errores: string[]): ResultadoOperacion<T> => {
    return { exitosa: false, errores, extraData: null };
};