import React, { Component } from 'react';
import { FlatList, View, Image, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, List, Divider } from 'react-native-paper';
import { ACTIVIDADES } from '../comun/actividades';
import { baseUrl } from '../comun/comun';

function Historia() {
    return (
        <Card style={styles.card}>
            <Card.Title
                title="Un poquito de historia"
                titleStyle={styles.titulo}
                style={styles.cardTitle}
            />
            <Card.Content>
                <Text style={styles.descripcion}>
                    El nacimiento del club de montaña Gaztaroa se remonta a la primavera de 1976
                    cuando jóvenes aficionados a la montaña y pertenecientes a un club juvenil
                    decidieron crear la sección montañera de dicho club. Fueron unos comienzos
                    duros debido sobre todo a la situación política de entonces. Gracias al esfuerzo
                    económico de sus socios y socias se logró alquilar una bajera. Gaztaroa ya tenía
                    su sede social.
                    Desde aquí queremos hacer llegar nuestro agradecimiento a todos los montañeros
                    y montañeras que alguna vez habéis pasado por el club aportando vuestro granito
                    de arena.
                    Gracias!
                </Text>
            </Card.Content>
        </Card>
    );
}

class QuienesSomos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actividades: ACTIVIDADES,
        };
    }

    render() {
        const renderActividadItem = ({ item }) => {
            return (
                <View>
                    <List.Item
                        title={item.nombre}
                        description={item.descripcion}
                        titleNumberOfLines={0}
                        descriptionNumberOfLines={8}
                        left={(props) => (
                            <Image
                                source={{ uri: baseUrl + item.imagen }}
                                style={[props.style, styles.imagen]}
                                resizeMode="cover"
                            />
                        )}
                        titleStyle={styles.tituloLista}
                        descriptionStyle={styles.descripcionLista}
                        contentStyle={styles.contenido}
                    />
                    <Divider />
                </View>
            );
        };

        return (
            <ScrollView>
                <Historia />

                <Card style={styles.card}>
                    <Card.Title
                        title="Actividades y recursos"
                        titleStyle={styles.titulo}
                        style={styles.cardTitle}
                    />
                    <Card.Content>
                        <FlatList
                            data={this.state.actividades}
                            renderItem={renderActividadItem}
                            keyExtractor={(item) => item.id.toString()}
                            scrollEnabled={false}
                        />
                    </Card.Content>
                </Card>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        margin: 8,
    },
    titulo: {
        textAlign: 'center',
    },
    descripcion: {
        marginTop: 10,
        marginBottom: 10,
        lineHeight: 20,
    },
    imagen: {
        width: 40,
        height: 40,
        alignSelf: 'center',
    },
    contenido: {
        paddingRight: 8,
    },
    tituloLista: {
        fontSize: 16,
    },
    descripcionLista: {
        fontSize: 14,
        lineHeight: 20,
    },
});

export default QuienesSomos;