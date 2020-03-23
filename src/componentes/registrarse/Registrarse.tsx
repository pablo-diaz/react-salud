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

    const alDigitarUsuario = (evento: React.ChangeEvent<HTMLInputElement>): void => {
        setEstado(obtenerEstadoParaUsuario(estado, evento.target.value));
    };

    const alDigitarPasswd = (evento: React.ChangeEvent<HTMLInputElement>): void => {
        setEstado(obtenerEstadoParaPasswd(estado, evento.target.value));
    };

    const alDigitarNombreCompleto = (evento: React.ChangeEvent<HTMLInputElement>): void => {
        setEstado(obtenerEstadoParaNombreCompleto(estado, evento.target.value));
    };

    const handleInputChange = (evento: React.ChangeEvent<HTMLInputElement>): void => { 

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
            <input type="text" name="usuario" onChange={alDigitarUsuario} placeholder="escriba su usuario aqui" />
            <br />
            <label htmlFor="passwd">Contraseña: </label>
            <input type="password" name="passwd" onChange={alDigitarPasswd} placeholder="escriba su contraseña aqui" />
            <br />
            <label htmlFor="nombre">Nombre completo: </label>
            <input type="text" name="nombreCompleto" onChange={alDigitarNombreCompleto} placeholder="escriba su nombre completo aqui" />
            <br />
            <input type="submit" value="Registrarse" />
        </form>
        <button onClick={regresarALogin}>Regresar a Login</button>
        </>
    );
};

export default Registrarse;