const obtenerUsuarioAutenticadoDesdeLocalStorage = (): string | null =>
    localStorage.getItem("usuarioAutenticado");

const validarUsuarioAutenticado = (usuarioNoAutenticadoCallBack: any) : string => {
    const usuarioAutenticado = obtenerUsuarioAutenticadoDesdeLocalStorage();
    if(!usuarioAutenticado) {
        usuarioNoAutenticadoCallBack();
        return "";
    }
    return usuarioAutenticado as string;
};

export default {
    validarUsuarioAutenticado
}