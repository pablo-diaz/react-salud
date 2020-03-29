import React, { useState } from "react";
import { useRouter } from "next/router";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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

    const autenticarUsuario = () => {
        LoginService.realizarLogin({ usuario: estado.usuario, passwd: estado.passwd })
        .then(resultadoAutenticacion => {
            if(resultadoAutenticacion.exitosa) {
                Utils.establecerUsuarioAutenticado(resultadoAutenticacion.extraData as string);
                router.push("/menu");
            }
            else
            {
                Utils.borrarUsuarioDesdeStorage();
                notificarError(resultadoAutenticacion.errores as string[]);
            }
        })
        .catch(razon => {
            Utils.borrarUsuarioDesdeStorage();
            notificarError([razon]);
        });
    };

    const alAutenticarse = (evento: React.MouseEvent<HTMLButtonElement>): void => {
        evento.preventDefault();
        autenticarUsuario();
    };

    const alHacerSubmit = (evento: React.FormEvent<HTMLFormElement>): void => {
        evento.preventDefault();
        autenticarUsuario();
    };

    const alSolicitarRegistrarse = (_:React.MouseEvent<HTMLButtonElement>): void => {
        router.push("/registrarse");
    };

    return (
        <>
        <form onSubmit={alHacerSubmit} autoComplete="off">
            <TextField type="text" onChange={alDigitarUsuario} placeholder="escriba su usuario aqui" label="Usuario" required={true} />
            <br /><br />
            <TextField type="password" onChange={alDigitarPasswd} placeholder="escriba su contraseña aqui" label="Contraseña" required={true} />
            <br /><br />
            <input type="submit" value="Listo" style={{ visibility: "hidden" }} />
        </form>
        <Button onClick={alAutenticarse} variant="contained">Autenticarse</Button>
        <Button onClick={alSolicitarRegistrarse} variant="contained">Registrarse</Button>
        <ToastContainer />
        </>
    );
};

export default Login;