import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, FlatList, ImageBackground, Modal } from 'react-native';
import { Card, Text, Divider, IconButton, TextInput, Button } from 'react-native-paper';
import { baseUrl, colorGaztaroaOscuro, colorGaztaroaClaro } from '../comun/comun';
import { connect } from 'react-redux';
import { postFavorito, postComentario } from '../redux/ActionCreators';


const mapStateToProps = (state) => {
    return {
        excursiones: state.excursiones,
        comentarios: state.comentarios,
        favoritos: state.favoritos,
    };
};


const mapDispatchToProps = (dispatch) => ({
    postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
    postComentario: (excursionId, valoracion, autor, comentario) => dispatch(postComentario(excursionId, valoracion, autor, comentario))
});


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
                                : props.onPressFavorito()
                        }
                    />
                    <IconButton
                        icon="pencil"
                        size={28}
                        onPress={props.onPressComentario}
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

        this.state = {
            valoracion: 5,
            autor: '',
            comentario: '',
            showModal: false,
        };
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal,});
    }

    resetForm() {
        this.setState({
            valoracion: 5,
            autor: '',
            comentario: '',
            showModal: false,
        });
    }

    gestionarComentario(excursionId) {
    this.props.postComentario(
        excursionId,
        this.state.valoracion,
        this.state.autor,
        this.state.comentario
    );

        // En el siguiente paso aquí conectaremos Redux
        this.resetForm();
    }

    marcarFavorito(excursionId) {
        this.props.postFavorito(excursionId);
    }

    render() {
        const { excursionId } = this.props.route.params;

        const excursion =
            this.props.excursiones?.excursiones?.[+excursionId];

        const comentarios =
            this.props.comentarios?.comentarios?.filter(
                (comentario) => comentario.excursionId === excursionId
            ) || [];

        return (
            <>
                <ScrollView>
                    <RenderExcursion
                        excursion={excursion}
                        favorita={this.props.favoritos.favoritos.some(el => el === excursionId)}
                        onPressFavorito={() => this.marcarFavorito(excursionId)}
                        onPressComentario={() => this.toggleModal()}
                    />
                    <RenderComentario comentarios={comentarios} />
                </ScrollView>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}
                >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitulo}>Añadir comentario</Text>

                        <View style={styles.estrellasContainer}>
                            {[1, 2, 3, 4, 5].map((num) => (
                                <IconButton
                                    key={num}
                                    icon={this.state.valoracion >= num ? 'star' : 'star-outline'}
                                    iconColor="#f1c40f"
                                    size={28}
                                    onPress={() => this.setState({ valoracion: num })}
                                />
                            ))}
                        </View>

                        <Text style={styles.valoracionTexto}>
                            {this.state.valoracion === 1
                                ? 'Muy mala'
                                : this.state.valoracion === 2
                                    ? 'Mala'
                                    : this.state.valoracion === 3
                                        ? 'Normal'
                                        : this.state.valoracion === 4
                                            ? 'Buena'
                                            : 'Excelente'}
                        </Text>

                        <TextInput
                            mode="outlined"
                            label="Autor"
                            value={this.state.autor}
                            onChangeText={(text) => this.setState({ autor: text })}
                            style={styles.input}
                            left={<TextInput.Icon icon="account" />}
                        />

                        <TextInput
                            mode="outlined"
                            label="Comentario"
                            value={this.state.comentario}
                            onChangeText={(text) => this.setState({ comentario: text })}
                            style={styles.input}
                            left={<TextInput.Icon icon="comment" />}
                            multiline
                        />

                        <View style={styles.botonesContainer}>
                            <Button
                                mode="outlined"
                                onPress={() => this.resetForm()}
                                style={styles.boton}
                                icon="close"
                            >
                                Cancelar
                            </Button>

                            <Button
                                mode="contained"
                                buttonColor={colorGaztaroaOscuro}
                                onPress={() => this.gestionarComentario(excursionId)}
                                style={styles.boton}
                                icon="send"
                            >
                                Enviar
                            </Button>
                        </View>
                    </View>
                </Modal>
            </>
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
    modal: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        paddingTop: 50,
    },
    modalTitulo: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        color: colorGaztaroaOscuro,
    },
    estrellasContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    valoracionTexto: {
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        marginBottom: 14,
    },
    botonesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    boton: {
        flex: 1,
        marginHorizontal: 5,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);