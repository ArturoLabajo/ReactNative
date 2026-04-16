import { Component } from 'react';
import { ScrollView, View, StyleSheet, ImageBackground, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { EXCURSIONES } from '../comun/excursiones';
import { CABECERAS } from '../comun/cabeceras';
import { ACTIVIDADES } from '../comun/actividades';
import { baseUrl } from '../comun/comun';

function RenderItem({ item }) {
  if (!item) {
    return <View />;
  }

  return (
    <Card style={styles.card}>
      <ImageBackground
        source={{ uri: baseUrl + item.imagen }}
        style={styles.image}
      >
        <View style={styles.tituloContainer}>
          <Text style={styles.tituloSobreImagen}>
            {item.nombre}
          </Text>
        </View>
      </ImageBackground>

      <Card.Content>
        <Text style={styles.descripcion}>
          {item.descripcion}
        </Text>
      </Card.Content>
    </Card>
  );
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excursiones: EXCURSIONES,
      cabeceras: CABECERAS,
      actividades: ACTIVIDADES,
    };
  }

  render() {
    return (
      <ScrollView>
        <RenderItem item={this.state.cabeceras.filter((item) => item.destacado)[0]} />
        <RenderItem item={this.state.excursiones.filter((item) => item.destacado)[0]} />
        <RenderItem item={this.state.actividades.filter((item) => item.destacado)[0]} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
  },
  image: {
    height: 200,
    justifyContent: 'center',
  },
  descripcion: {
    marginTop: 20,
    marginBottom: 20,
  },
  titulo: {
    textAlign: 'center',
  },
  cardTitle: {
    alignItems: 'center',
  },
  tituloContainer: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)', 
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },

  tituloSobreImagen: {
    color: 'chocolate', 
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Home;