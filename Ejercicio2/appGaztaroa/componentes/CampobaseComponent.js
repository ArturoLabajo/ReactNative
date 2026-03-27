import React, { Component } from 'react';
import Calendario from './CalendarioComponent';
import { EXCURSIONES } from '../comun/excursiones';

// componente de clase
class Campobase extends Component {
    constructor(props) {
        super(props);
        // recogida del parametro desde el JS con los datos
        this.state = {
            excursiones: EXCURSIONES
        };
    }
    render() {

        return (
            // llamada a la funcion calendario pasando un parametro (estado)
            <Calendario excursiones={this.state.excursiones} />
        );
    }
}
export default Campobase; // retorno para que sea visible para otros componentes
