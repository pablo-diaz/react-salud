import React, { useState, useRef } from "react";
import { useRouter } from "next/router";

import { ToastContainer, toast, ToastOptions } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import RegistrarseService from "../../servicios/registrarse/RegistrarseService";

type RegistrarseParams = {};

type RegistrarseState = {
    usuario: string,
    passwd: string,
    nombreCompleto: string,
    edad: string,
    genero: string
};

const obtenerEstadoPorDefecto = () : RegistrarseState => {
    return { usuario: "", passwd: "", nombreCompleto: "", edad: "", genero: "" };
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
    const submitRef = useRef(null);
    const router = useRouter();

    const handleInputChange = (evento: React.ChangeEvent<HTMLInputElement>): void => {
        setEstado(obtenerEstadoParaAtributo(estado, evento.target.name, (evento.target.value as any)));
    };

    const registrarse = (): void => {
        RegistrarseService.registrarse({ usuario: estado.usuario, passwd: estado.passwd, nombreCompleto: estado.nombreCompleto, edad: parseInt(estado.edad), genero: estado.genero })
        .then(resultadoRegistro => {
            if(resultadoRegistro.exitosa) {
                notificarExito(() => router.push("/"));
            }
            else {
                notificarError(resultadoRegistro.errores as string[]);
            }
        })
        .catch(razon => notificarError([razon]));
    };

    const alRegistrarse = (evento: React.FormEvent<HTMLFormElement>): void => {
        evento.preventDefault();
        registrarse();
    };

    const alPresionarRegistrarse = (evento: React.MouseEvent<HTMLButtonElement>): void => {
        evento.preventDefault();
        (submitRef.current as any).click();
    };

    const regresarALogin = (_:React.MouseEvent<HTMLButtonElement>) : void => {
        router.push("/");
    };

    return (
        <>
        <Grid container justify="center">
            <Grid item>
                <form onSubmit={alRegistrarse} autoComplete="off">
                    <h1>Registrarse</h1>
                    <TextField type="text" name="usuario" onChange={handleInputChange} placeholder="escriba su usuario aqui" label="Usuario" required={true} />
                    <br /><br />
                    <TextField type="password" name="passwd" onChange={handleInputChange} placeholder="escriba su contraseña aqui" label="Contraseña" required={true} />
                    <br /><br />
                    <TextField type="text" name="nombreCompleto" onChange={handleInputChange} placeholder="escriba su nombre completo aqui" label="Nombre completo" required={true} />
                    <br /><br />
                    <TextField type="text" name="edad" onChange={handleInputChange} placeholder="escriba su edad" label="Edad" required={true} />
                    <br /><br />
                    <TextField type="text" name="genero" onChange={handleInputChange} placeholder="escriba su género aqui" label="Género" required={true} />
                    <br /><br />
                    <input type="submit" value="Registrarse" style={{ visibility: "hidden" }} ref={submitRef} />
                </form>
                <Button onClick={alPresionarRegistrarse} variant="contained" color="primary">Registrarse</Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button onClick={regresarALogin} variant="contained">Regresar a Login</Button>
            </Grid>
        </Grid>
        <ToastContainer />
        </>
    );
};

export default Registrarse;