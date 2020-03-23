type RegistrarseData = {
    usuario: string,
    passwd: string,
    nombreCompleto: string
};

const registrarse = (data: RegistrarseData) : void => {
    console.log("Registrarse data", data);
};

export default {
    registrarse
};