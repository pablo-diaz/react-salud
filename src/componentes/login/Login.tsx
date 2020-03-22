import React, { useState } from "react";

import LoginService from "../../servicios/login/LoginService";

type LoginProps = { };

type LoginState = {
    usuario: string,
    passwd: string,
    isLoggedIn: boolean
};

const obtenerEstadoPorDefecto = () : LoginState => {
    return { usuario: "", passwd: "", isLoggedIn: false };
};

const obtenerEstadoParaUsuario = (estadoAnterior: LoginState, usuario: string) : LoginState => {
    return { usuario, passwd: estadoAnterior.passwd, isLoggedIn: estadoAnterior.isLoggedIn };
};

const obtenerEstadoParaPasswd = (estadoAnterior: LoginState, passwd: string) : LoginState => {
    return { usuario: estadoAnterior.usuario, passwd, isLoggedIn: estadoAnterior.isLoggedIn };
};

const obtenerEstadoParaLoggedIn = (estadoAnterior: LoginState, isLoggedIn: boolean) : LoginState => {
    return { usuario: estadoAnterior.usuario, passwd: estadoAnterior.passwd, isLoggedIn };
};

const Login = (_: LoginProps): JSX.Element => {
    const [estado, setEstado] = useState<LoginState>(obtenerEstadoPorDefecto());

    const alDigitarUsuario = (evento: React.ChangeEvent<HTMLInputElement>) => {
        setEstado(obtenerEstadoParaUsuario(estado, evento.target.value));
    };

    const alDigitarPasswd = (evento: React.ChangeEvent<HTMLInputElement>) => {
        setEstado(obtenerEstadoParaPasswd(estado, evento.target.value));
    };

    const alAutenticarse = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        const resultadoAutenticacion = LoginService.realizarLogin({ usuario: estado.usuario, passwd: estado.passwd });
        setEstado(obtenerEstadoParaLoggedIn(estado, resultadoAutenticacion));
    };

    const alSolicitarRegistrarse = () => {
        (window as any).location = "/registrarse";
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
        <button onClick={alSolicitarRegistrarse}>Registrarse</button>
        </>
    );
};

export default Login;