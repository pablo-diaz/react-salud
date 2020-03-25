type LoginData = {
    usuario: string,
    passwd: string
};

type LoginResult = {
    exitosa: boolean,
    error: string | null
};

const crearResultadoParaExito = (): LoginResult => {
    return { exitosa: true, error: null };
};

const crearResultadoParaFalla = (error: string): LoginResult => {
    return { exitosa: false, error };
};

const realizarLogin = (data: LoginData) : LoginResult => {
    if(data.usuario === "pablo" && data.passwd === "nada")
        return crearResultadoParaExito();
    return crearResultadoParaFalla("Autenticacion fallida. Intente nuevamente");
};

export default {
    realizarLogin
}