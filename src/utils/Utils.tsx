const obtenerUsuarioAutenticadoDesdeLocalStorage = (): string | null =>
    localStorage.getItem("usuarioAutenticado");

const validarUsuarioAutenticado = (usuarioNoAutenticadoCallBack: () => void, 
        usuarioAutenticadoCallBack: (usuarioAutenticado: string) => void) : void => {
    const usuarioAutenticado = obtenerUsuarioAutenticadoDesdeLocalStorage();
    if(!usuarioAutenticado) usuarioNoAutenticadoCallBack();
    else usuarioAutenticadoCallBack(usuarioAutenticado as string);
};

export default {
    validarUsuarioAutenticado
}