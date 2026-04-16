import { Component } from 'react';
import { View, StyleSheet, ScrollView, FlatList, ImageBackground } from 'react-native';
import { Card, Text, Divider, IconButton } from 'react-native-paper';
import { EXCURSIONES } from '../comun/excursiones';
import { COMENTARIOS } from '../comun/comentarios';
import { baseUrl } from '../comun/comun';

function RenderExcursion(props) {

    const excursion = props.excursion;

    if (excursion != null) {
        return (
            <Card style={styles.card}>
                <ImageBackground
                    source={{ uri: baseUrl + excursion.imagen }}
                    style={styles.image}
                >
                    <View style={styles.tituloContainer}>
                        <Text style={styles.tituloSobreImagen}>
                            {excursion.nombre}
                        </Text>
                    </View>
                </ImageBackground>
                <Card.Content>
                    <Text style={styles.descripcion}>
                        {excursion.descripcion}
                    </Text>
                </Card.Content>
                <View style={styles.iconoContainer}>
                    <IconButton
                        icon={props.favorita ? 'heart' : 'heart-outline'}
                        size={28}
                        onPress={() =>
                            props.favorita
                                ? console.log('La excursión ya se encuentra entre las favoritas')
                                : props.onPress()
                        }
                    />
                </View>
            </Card>
        );
    } else {
        return <View />;
    }
}

// Funcion para mostrar los comentarios
function RenderComentario(props) {

    // Recibimos el array de comentarios
    const comentarios = props.comentarios;

    if (comentarios != null) {
        return (
            <Card style={styles.card}>
                <Card.Title
                    title="Comentarios"
                    titleStyle={styles.titulo}
                    style={styles.cardTitle}
                />
                <Card.Content>
                    {/* Recorremos el array de comentarios y pintamos cada uno */}
                    {comentarios.map((item) => (
                        <View key={item.id} style={styles.comentarioContainer}>
                            {/* Texto principal del comentario */}
                            <Text style={styles.comentarioTexto}>{item.comentario}</Text>

                            {/* Valoración en estrellas */}
                            <Text>{item.valoracion} estrellas</Text>

                            {/* Autor y fecha formateada */}
                            <Text style={styles.autor}>
                                -- {item.autor},{' '}
                                {new Date(item.dia.replace(/ /g, '')).toLocaleDateString('es-ES', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })},{' '}
                                {new Date(item.dia.replace(/ /g, '')).toLocaleTimeString('es-ES')}
                            </Text>

                            {/* Separador visual entre comentarios */}
                            <Divider style={styles.divider} />
                        </View>
                    ))}
                </Card.Content>
            </Card>
        );
    } else {
        return <View />;
    }
}

class DetalleExcursion extends Component {
    constructor(props) {
        super(props);

        // Estado local
        this.state = {
            excursiones: EXCURSIONES,
            comentarios: COMENTARIOS,
            favoritos: [],
        };
    }

    // Funcion para marcar una excursion como favortia
    marcarFavorito(excursionId) {
        this.setState({
            // Anadimos el id al array de favortios
            favoritos: this.state.favoritos.concat(excursionId)
        });
    }

    render() {
        const { excursionId } = this.props.route.params; // Recepcion del parametro enviado

        return (
            <ScrollView>
                <RenderExcursion
                    excursion={this.state.excursiones[+excursionId]}
                    favorita={this.state.favoritos.some(el => el === excursionId)}
                    onPress={() => this.marcarFavorito(excursionId)}
                />
                <RenderComentario
                    // Filtramos solo los comentarios de la exctusion actual
                    comentarios={this.state.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
                />
            </ScrollView>
        );
    }



}

const styles = StyleSheet.create({
    card: {
        margin: 8,
    },
    image: {
        height: 220,
        justifyContent: 'center',
    },
    descripcion: {
        marginTop: 20,
        marginBottom: 20,
    },
    titulo: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardTitle: {
        alignItems: 'center',
    },
    iconoContainer: {
        alignItems: 'center',
        marginBottom: 8,
    },
    comentarioTexto: {
        fontSize: 17,
        marginBottom: 4,
    },
    tituloContainer: {
        alignSelf: 'center', 
        backgroundColor: 'rgba(0,0,0,0.4)', 
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },

    tituloSobreImagen: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default DetalleExcursion;