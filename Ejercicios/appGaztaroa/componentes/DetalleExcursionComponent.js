import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
function RenderExcursion(props) {
    const excursion = props.excursion;
    if (excursion != null) {
        // Card es ua componente que se muestra como una "tarjeta" visual
        // agrupa la info y la muestra en una especie de ficha
        return (
            // Card crea la tarjeta
            // title pone el nombre para cabecera
            // cover contiene la imagen a mostrar en grande
            // content contiene el texto principal
            <Card style={styles.card}>
                <Card.Title title={excursion.nombre} />
                <Card.Cover
                    source={require('./imagenes/40Años.png')}
                    style={styles.image}
                />
                <Card.Content>
                    <Text style={styles.descripcion}>
                        {excursion.descripcion}
                    </Text>
                </Card.Content>
            </Card>
        );
    } else {
        return <View />;
    }
}

// excurson aqui viaja como una prop que se recive y se reenvia
function DetalleExcursion(props) {
    return <RenderExcursion excursion={props.excursion} />;
}
const styles = StyleSheet.create({
    card: {
        margin: 8,
    },
    image: {
        marginHorizontal: 0,
    },
    descripcion: {
        marginTop: 20,
        marginBottom: 20,
    },
});
export default DetalleExcursion; 