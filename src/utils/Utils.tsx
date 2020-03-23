export const obtenerUsuarioAutenticado = (): string | null =>
    localStorage.getItem("usuarioAutenticado");