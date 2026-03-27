import React from 'react';
import { FlatList, View, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { List, Divider } from 'react-native-paper';

// componente funcional que no tiene estado que recibe parametros
// List.Item: se usa para representar un elemento de una lista
function Calendario({ excursiones }) {
    const renderCalendarioItem = ({ item }) => {
        return (
            <View>
                <List.Item
                    title={item.nombre}
                    description={item.descripcion}
                    titleNumberOfLines={0}
                    descriptionNumberOfLines={6}
                    left={(props) => (
                        <Image
                            source={require('./imagenes/40Años.png')}
                            style={[props.style, styles.imagen]}
                            resizeMode="cover"
                        />
                    )}
                    titleStyle={styles.titulo}
                    descriptionStyle={styles.descripcion}
                    contentStyle={styles.contenido}
                />
                <Divider />
            </View>
        );
    };
    // FlatList: componente para manejar listas largas de forma optimizada
    // solo renderiza elementos visible
    return (
        <SafeAreaView style={styles.container}>
            
            <FlatList
                data={excursiones}
                renderItem={renderCalendarioItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imagen: {
        width: 40,
        height: 40,
        alignSelf: 'center',
    },
    contenido: {
        paddingRight: 8,
    },
    titulo: {
        fontSize: 16,
    },
    descripcion: {
        fontSize: 14,
        lineHeight: 20,
    },
});
export default Calendario; 
