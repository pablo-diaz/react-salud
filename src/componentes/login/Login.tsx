import React, { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";

import LoginService from "../../servicios/login/LoginService";
import Utils from "../../utils/Utils";

type LoginProps = { };

type LoginState = {
    usuario: string,
    passwd: string
};

const obtenerEstadoPorDefecto = () : LoginState => {
    return { usuario: "", passwd: "" };
};

const obtenerEstadoParaUsuario = (estadoAnterior: LoginState, usuario: string) : LoginState => {
    return { ...estadoAnterior, usuario };
};

const obtenerEstadoParaPasswd = (estadoAnterior: LoginState, passwd: string) : LoginState => {
    return { ...estadoAnterior, passwd };
};

const notificarError = (errores: string[]): void => {
    errores.forEach(error => toast.error(error));
};

const Login = (_: LoginProps): JSX.Element => {
    const [estado, setEstado] = useState<LoginState>(obtenerEstadoPorDefecto());
    const router = useRouter();

    const alDigitarUsuario = (evento: React.ChangeEvent<HTMLInputElement>): void => {
        setEstado(obtenerEstadoParaUsuario(estado, evento.target.value));
    };

    const alDigitarPasswd = (evento: React.ChangeEvent<HTMLInputElement>): void => {
        setEstado(obtenerEstadoParaPasswd(estado, evento.target.value));
    };

    const alAutenticarse = (evento: React.FormEvent<HTMLFormElement>): void => {
        evento.preventDefault();
        const resultadoAutenticacion = LoginService.realizarLogin({ usuario: estado.usuario, passwd: estado.passwd });
        if(resultadoAutenticacion.exitosa){
            Utils.establecerUsuarioAutenticado(estado.usuario);
            router.push("/menu");
        }
        else {
            notificarError(resultadoAutenticacion.errores as string[]);
        }
    };

    const alSolicitarRegistrarse = (_:React.MouseEvent<HTMLButtonElement>): void => {
        router.push("/registrarse");
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
        <ToastContainer />
        </>
    );
};

export default Login;