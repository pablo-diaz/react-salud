const establecerUsuarioAutenticado = (token: string): void =>
    localStorage.setItem("token_seguridad", token);

const obtenerTokenDesdeLocalStorage = (): string | null =>
    localStorage.getItem("token_seguridad");

const borrarUsuarioDesdeStorage = (): void => {
    localStorage.removeItem("token_seguridad");
}

const validarUsuarioAutenticado = (): Promise<string> => 
    new Promise((exito: (usuario: string) => void, fallo: () => void) => {
        const token = obtenerTokenDesdeLocalStorage();
        if(token) exito(token);
        else fallo();
    });

export default {
    validarUsuarioAutenticado,
    establecerUsuarioAutenticado,
    borrarUsuarioDesdeStorage
}