import { Component } from 'react';
import Calendario from './CalendarioComponent';
import DetalleExcursion from './DetalleExcursionComponent';
import { EXCURSIONES } from '../comun/excursiones';
import { Platform, View } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './HomeComponent';
import Contacto from './ContactoComponent';
import QuienesSomos from './QuienesSomosComponent';

// creación de navegaciones
const Stack = createNativeStackNavigator(); // navegacion interna
const Drawer = createDrawerNavigator(); // menu lateral

class Campobase extends Component {
    constructor(props) {
        super(props);

        // estado global con los datos
        this.state = {
            excursiones: EXCURSIONES,
        };
    }

    // stack para Quienes Somos
    QuienesSomosNavegador = () => {
        return (
            <Stack.Navigator
                initialRouteName="QuienesSomos"
                screenOptions={{
                    headerTintColor: '#fff',
                    headerStyle: { backgroundColor: '#015afc' },
                    headerTitleStyle: { color: '#fff' },
                }}
            >
                <Stack.Screen
                    name="QuienesSomos"
                    component={QuienesSomos}
                    options={{
                        title: 'Quiénes somos',
                    }}
                />
            </Stack.Navigator>
        );
    };

    // stack para Contacto
    ContactoNavegador = () => {
        return (
            <Stack.Navigator
                initialRouteName="Contactomenu"
                screenOptions={{
                    headerTintColor: '#fff',
                    headerStyle: { backgroundColor: '#015afc' },
                    headerTitleStyle: { color: '#fff' },
                }}
            >
                <Stack.Screen
                    name="Contactomenu"
                    component={Contacto}
                    options={{
                        title: 'Contacto',
                    }}
                />
            </Stack.Navigator>
        );
    };

    // stack para el home
    HomeNavegador = () => {
        return (
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerTintColor: '#fff',
                    headerStyle: { backgroundColor: '#015afc' },
                    headerTitleStyle: { color: '#fff' },
                }}
            >
                <Stack.Screen
                    name="Home"
                    component={Home} // componente que se renderiza
                    options={{
                        title: 'Campo Base',
                    }}
                />
            </Stack.Navigator>
        );
    };

    // stack para calendario y detalle
    CalendarioNavegador = () => {
        return (
            <Stack.Navigator
                initialRouteName="Calendario"
                screenOptions={{
                    headerTintColor: '#fff',
                    headerStyle: { backgroundColor: '#015afc' },
                    headerTitleStyle: { color: '#fff' },
                }}
            >
                {/* Pantalla lista*/}
                <Stack.Screen
                    name="Calendario"
                    options={{
                        title: 'Calendario Gaztaroa',
                    }}
                >
                    {(props) => (
                        <Calendario
                            {...props} //navegacion
                            excursiones={this.state.excursiones} // datos
                        />
                    )}
                </Stack.Screen>

                {/*Pantalla detalle*/}
                <Stack.Screen
                    name="DetalleExcursion"
                    options={{
                        title: 'Detalle Excursión',
                        headerBackTitle: 'Calendario', // texto boton back
                    }}
                >
                    {(props) => (
                        <DetalleExcursion
                            {...props}
                            excursiones={this.state.excursiones}
                        />
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        );
    };

    // Drawer del menu lateral
    DrawerNavegador = () => {
        return (
            // Define el menu lateral y las diferentes opciones que te llevan a diferentes secciones
            <Drawer.Navigator
                initialRouteName="Campo base" // pantalla inicial
                screenOptions={{
                    headerShown: false, // activar cabecera extra sino desliza desde el borde para abrir el "menu"
                    drawerStyle: {
                        backgroundColor: '#c2d3da',
                    },
                }}
            >

                {/* Diferentes opciones */}
                <Drawer.Screen
                    name="Campo base"
                    component={this.HomeNavegador}
                />
                <Drawer.Screen
                    name="Quienes somos"
                    component={this.QuienesSomosNavegador}
                />
                <Drawer.Screen
                    name="Calendario Menu"
                    component={this.CalendarioNavegador}
                />
                <Drawer.Screen
                    name="Contacto"
                    component={this.ContactoNavegador}
                />

            </Drawer.Navigator>
        );
    };
    render() {
        return (
            <NavigationContainer>
                {/* Contenedor global de navegacion */}
                <View style={{
                    flex: 1, paddingTop: Platform.OS === 'ios' ? 0 :
                        Constants.statusBarHeight
                }}>
                    <this.DrawerNavegador />
                </View>
            </NavigationContainer>
        );
    }
}


export default Campobase;