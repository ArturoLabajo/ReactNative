import { configureStore } from '@reduxjs/toolkit'
import { excursiones } from './excursiones';
import { comentarios } from './comentarios';
import { cabeceras } from './cabeceras';
import { actividades } from './actividades';
import { favoritos } from './favoritos';

// Funcion responsable de crear el store de nuestro Redux y
// combinar los 4 reducers
// Tambien asociara a dicho store el middleware (Thunk)
export const ConfigureStore = () => {
    const store = configureStore({
        reducer: {
            excursiones: excursiones,
            comentarios: comentarios,
            cabeceras: cabeceras,
            actividades: actividades,
            favoritos: favoritos,
        },
    });

    return store;
}