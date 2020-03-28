const establecerUsuarioAutenticado = (usuario: string): void =>
    localStorage.setItem("usuarioAutenticado", usuario);

const obtenerUsuarioAutenticadoDesdeLocalStorage = (): string | null =>
    localStorage.getItem("usuarioAutenticado");

const validarUsuarioAutenticado = (): Promise<string> => 
    new Promise((exito: (usuario: string) => void, fallo: () => void) => {
        const usuarioAutenticado = obtenerUsuarioAutenticadoDesdeLocalStorage();
        if(usuarioAutenticado) exito(usuarioAutenticado);
        else fallo();
    });

export default {
    validarUsuarioAutenticado,
    establecerUsuarioAutenticado
}