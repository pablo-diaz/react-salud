import React, { useState } from "react";

type LoginProps = { };

type LoginState = {
    usuario: string,
    passwd: string
};

const obtenerEstadoPorDefecto = () : LoginState => {
    return { usuario: "", passwd: "" };
};

const obtenerEstadoParaUsuario = (estadoAnterior: LoginState, usuario: string) : LoginState => {
    return { usuario, passwd: estadoAnterior.passwd };
};

const obtenerEstadoParaPasswd = (estadoAnterior: LoginState, passwd: string) : LoginState => {
    return { usuario: estadoAnterior.usuario, passwd };
};

const Login = (props: LoginProps): JSX.Element => {
    const [estado, setEstado] = useState<LoginState>(obtenerEstadoPorDefecto());

    const alDigitarUsuario = (evento: React.ChangeEvent<HTMLInputElement>) => {
        setEstado(obtenerEstadoParaUsuario(estado, evento.target.value));
    };

    const alDigitarPasswd = (evento: React.ChangeEvent<HTMLInputElement>) => {
        setEstado(obtenerEstadoParaPasswd(estado, evento.target.value));
    };

    const alAutenticarse = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
    };

    return (
        <>
        <form onSubmit={alAutenticarse}>
            <label htmlFor="usuario">Usuario: </label>
            <input type="text" onChange={alDigitarUsuario} placeholder="escriba su usuario aqui" />
            <br />
            <label htmlFor="passwd">Contraseña: </label>
            <input type="password" onChange={alDigitarPasswd} placeholder="escriba su contraseña aqui" />
            <br />
            <input type="submit" value="Autenticarse" />
        </form>
        <button>Registrarse</button>
        </>
    );
};

export default Login;