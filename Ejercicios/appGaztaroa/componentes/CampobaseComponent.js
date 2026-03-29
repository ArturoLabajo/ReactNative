import React, { Component } from 'react';
import Calendario from './CalendarioComponent';
import { EXCURSIONES } from '../comun/excursiones';
import DetalleExcursion from './DetalleExcursionComponent';
import { View } from 'react-native';

// componente de clase
class Campobase extends Component {
    constructor(props) {
        super(props);
        // recogida del parametro desde el JS con los datos
        this.state = {
            excursiones: EXCURSIONES,
            seleccionExcursion: null
        };
    }

    // para guarrdar la excursion seleccionada
    onSeleccionExcursion(ExcursionId) {
        this.setState({ seleccionExcursion: ExcursionId });
    }
    render() {

        return (
            <View style={{ flex: 1 }}>
                <DetalleExcursion excursion={this.state.excursiones.filter((excursion) => excursion.id === this.state.seleccionExcursion)[0]} />
                <Calendario excursiones={this.state.excursiones} onPress={(
                    excursionId) => this.onSeleccionExcursion(excursionId)} />
            </View>
        );
    }
}
export default Campobase; // retorno para que sea visible para otros componentes
