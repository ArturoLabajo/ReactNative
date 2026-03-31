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

// Creamos sistema de navegacion
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

class Campobase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            excursiones: EXCURSIONES,
        };
    }

    // home de la app donde nos puede redirigir el menu 
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
                    component={Home}
                    options={{
                        title: 'Campo Base',
                    }}
                />
            </Stack.Navigator>
        );
    };

    // calendario al que nos puede llevar el menu donde mostramos las excursiones
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
                <Stack.Screen
                    name="Calendario"
                    options={{
                        title: 'Calendario Gaztaroa',
                    }}
                >
                    {(props) => (
                        <Calendario
                            {...props}
                            excursiones={this.state.excursiones}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen
                    name="DetalleExcursion"
                    options={{
                        title: 'Detalle Excursión',
                        headerBackTitle: 'Calendario',
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
    DrawerNavegador = () => {
        return (
            // Define el menu lateral y las diferentes opciones que te llevan a diferentes secciones
            <Drawer.Navigator
                initialRouteName="Campo base"
                screenOptions={{
                    headerShown: false, // activar cabecera extra sino desliza desde el borde para abrir el "menu"
                    drawerStyle: {
                        backgroundColor: '#c2d3da',
                    },
                }}
            >
        
                <Drawer.Screen
                    name="Campo base"
                    component={this.HomeNavegador}
                />
                <Drawer.Screen
                    name="Calendario Menu"
                    component={this.CalendarioNavegador}
                />
            </Drawer.Navigator>
        );
    };
    render() {
        return (
            <NavigationContainer>
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