import React, { useState } from "react";

type RegistrarseParams = {};

type RegistrarseState = {
    usuario: string,
    passwd: string,
    nombreCompleto: string
};

const obtenerEstadoPorDefecto = () : RegistrarseState => {
    return { usuario: "", passwd: "", nombreCompleto: "" };
};

const obtenerEstadoParaUsuario = (estadoAnterior: RegistrarseState, usuario: string) : RegistrarseState => {
    return { ...estadoAnterior, usuario };
};

const obtenerEstadoParaPasswd = (estadoAnterior: RegistrarseState, passwd: string) : RegistrarseState => {
    return { ...estadoAnterior, passwd };
};

const obtenerEstadoParaNombreCompleto = (estadoAnterior: RegistrarseState, nombreCompleto: string) : RegistrarseState => {
    return { ...estadoAnterior, nombreCompleto };
};

const Registrarse = (_:RegistrarseParams): JSX.Element => {
    const [estado, setEstado] = useState<RegistrarseState>(obtenerEstadoPorDefecto());

    const handleInputChange = (evento: React.ChangeEvent<HTMLInputElement>): void => {
        const funcionesDeCambio = {
            usuario: obtenerEstadoParaUsuario,
            passwd: obtenerEstadoParaPasswd,
            nombreCompleto: obtenerEstadoParaNombreCompleto
        };
        const laFunctionDeNuevoEstado = (funcionesDeCambio as any)[evento.target.name];
        setEstado(laFunctionDeNuevoEstado(estado, evento.target.value));
    };

    const alRegistrarse = (evento: React.FormEvent<HTMLFormElement>): void => {
        evento.preventDefault();
    };

    const regresarALogin = (_:React.MouseEvent<HTMLButtonElement>) : void => {
        // TODO: hacer esta redireccion con la forma de React
        (window as any).location = "/";
    };

    return (
        <>
        <h1>Registrarse</h1>
        <form onSubmit={alRegistrarse}>
        <label htmlFor="usuario">Usuario: </label>
            <input type="text" name="usuario" onChange={handleInputChange} placeholder="escriba su usuario aqui" />
            <br />
            <label htmlFor="passwd">Contraseña: </label>
            <input type="password" name="passwd" onChange={handleInputChange} placeholder="escriba su contraseña aqui" />
            <br />
            <label htmlFor="nombre">Nombre completo: </label>
            <input type="text" name="nombreCompleto" onChange={handleInputChange} placeholder="escriba su nombre completo aqui" />
            <br />
            <input type="submit" value="Registrarse" />
        </form>
        <button onClick={regresarALogin}>Regresar a Login</button>
        </>
    );
};

export default Registrarse;