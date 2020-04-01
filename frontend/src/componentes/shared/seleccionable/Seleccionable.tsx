import React from "react";

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';

import './seleccionable.css';

export type ItemAPintar = {
    id: number,
    nombre: string
};

type SeleccionableProps = {
    titulo: string,
    items: ItemAPintar[] | undefined,
    onItemClick?: (id: number) => void | undefined,
    textoBoton?: string | undefined
};

const pintarButtonToAction = (pintar: boolean, id: number, textoBoton: string | undefined, 
        alHacerClickEnItem: (id: number) => void): JSX.Element => {
    return !pintar ? <div></div> : (
        <>
        &nbsp;&nbsp;&nbsp;
        <Button variant="contained" color="default" size="small" onClick={() => alHacerClickEnItem(id)}>{textoBoton}</Button>
        </>
    );
};

export const Seleccionable = (props: SeleccionableProps) : JSX.Element => {
    const hayCallback = props.onItemClick ? true : false;

    const alHacerClickEnItem = (id: number): void => {
        if(props.onItemClick)
            props.onItemClick(id);
    };

    return (!props.items || props.items.length === 0) ? <div></div> : (
        <>
        <h1>{props.titulo}</h1>
        <GridList cellHeight={40} cols={8} style={{ maxWidth: 700}}>
        { props.items.map(item =>
            <Paper key={`P_${item.id}`} elevation={3} className="papel">
                <Typography className="titulo" color="textPrimary" gutterBottom={true} display="inline">
                    { item.nombre }
                </Typography>
                { pintarButtonToAction(hayCallback, item.id, props.textoBoton, alHacerClickEnItem) }
            </Paper>
        )}
        </GridList>
        </>
    );
};
