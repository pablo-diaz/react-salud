import React, { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast, ToastOptions } from "react-toastify";

import RegistrarseService from "../../servicios/registrarse/RegistrarseService";

type RegistrarseParams = {};

type RegistrarseState = {
    usuario: string,
    passwd: string,
    nombreCompleto: string
};

const obtenerEstadoPorDefecto = () : RegistrarseState => {
    return { usuario: "", passwd: "", nombreCompleto: "" };
};

const obtenerEstadoParaAtributo = (estadoAnterior: RegistrarseState, atributo: string, valorAtributo: any) : RegistrarseState => {
    const nuevoEstado = { ...estadoAnterior };
    (nuevoEstado as any)[atributo] = valorAtributo;
    return nuevoEstado;
};

const notificarExito = (callbackOnClose: () => void): void => {
    toast.success("Se ha agregado exitosamente a la base de datos de usuarios del sistema", {
        onClose: callbackOnClose
    });
};

const notificarError = (errores: string[]): void => {
    errores.forEach(error => toast.error(error));
};

const Registrarse = (_:RegistrarseParams): JSX.Element => {
    const [estado, setEstado] = useState<RegistrarseState>(obtenerEstadoPorDefecto());
    const router = useRouter();

    const handleInputChange = (evento: React.ChangeEvent<HTMLInputElement>): void => {
        setEstado(obtenerEstadoParaAtributo(estado, evento.target.name, (evento.target.value as any)));
    };

    const alRegistrarse = (evento: React.FormEvent<HTMLFormElement>): void => {
        evento.preventDefault();
        const resultadoRegistro = RegistrarseService.registrarse({ usuario: estado.usuario, passwd: estado.passwd, nombreCompleto: estado.nombreCompleto });
        if(resultadoRegistro.exitosa) {
            notificarExito(() => router.push("/"));
        }
        else {
            notificarError(resultadoRegistro.errores as string[]);
        }
    };

    const regresarALogin = (_:React.MouseEvent<HTMLButtonElement>) : void => {
        router.push("/");
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
        <ToastContainer />
        </>
    );
};

export default Registrarse;