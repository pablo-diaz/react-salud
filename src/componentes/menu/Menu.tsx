import React from "react";

type MenuProps = {};

const Menu = (_:MenuProps): JSX.Element => {
    const handleClick = (evento: React.MouseEvent<HTMLButtonElement>): void => {
        // TODO: mejorar la redireccion
        const paginaARedireccionar = (evento.target as HTMLButtonElement).name;
        (window as any).location = `/${paginaARedireccionar}`;
    };

    return (
        <>
        <h1>Este es el menu</h1>
        <h2>Bienvenido</h2>
        <button name="perfil" onClick={handleClick}>Perfil</button>
        <button name="enfermedades" onClick={handleClick}>Enfermedades</button>
        <button name="consultasmedicas" onClick={handleClick}>Consultas Médicas</button>
        <button name="planbienestar" onClick={handleClick}>Plan de Bienestar</button>
        </>
    );
};

export default Menu;