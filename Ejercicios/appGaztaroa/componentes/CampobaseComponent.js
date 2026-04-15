import { Component } from 'react';
import Calendario from './CalendarioComponent';
import DetalleExcursion from './DetalleExcursionComponent';
import { EXCURSIONES } from '../comun/excursiones';
import { Platform, View, StyleSheet, Image, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Home from './HomeComponent';
import Contacto from './ContactoComponent';
import QuienesSomos from './QuienesSomosComponent';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// creación de navegaciones
const Stack = createNativeStackNavigator(); // navegacion interna
const Drawer = createDrawerNavigator(); // menu lateral

// Boton hamburguesa que se esta en la cabecera
function BotonMenu(props) {
    return (
        <Pressable
            onPress={props.onPress}
            hitSlop={8}
        >
            <MaterialCommunityIcons
                name="menu"
                size={40}
                color={Platform.OS === 'ios' ? '#015afc' : 'white'}
            />
        </Pressable>
    );
}

// Contenido personalizado del drawer
function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <SafeAreaView style={styles.container} edges={['left', 'right',
                'bottom']}>
                {/* Cabecera del drawer con logo y nombre */}
                <View style={styles.drawerHeader}>
                    <View style={styles.drawerHeaderImageContainer}>
                        <Image
                            source={require('./imagenes/logo.png')}
                            style={styles.drawerImage}
                        />
                    </View>
                    <View style={styles.drawerHeaderTextContainer}>
                        <Text style={styles.drawerHeaderText}>Gaztaroa</Text>
                    </View>
                </View>
                {/* Lista automática de opciones del menú */}
                <DrawerItemList {...props} />
            </SafeAreaView>
        </DrawerContentScrollView>
    );
}


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
                initialRouteName="QuienesSomosScreen"
                screenOptions={{
                    headerTintColor: '#fff',
                    headerStyle: { backgroundColor: '#015afc' },
                    headerTitleStyle: { color: '#fff' },
                }}
            >
                <Stack.Screen
                    name="QuienesSomosScreen"
                    component={QuienesSomos}
                    options={({ navigation }) =>
                        this.menuHeaderOptions('Quiénes somos', navigation)
                    }
                />
            </Stack.Navigator>
        );
    };

    // stack para Contacto
    ContactoNavegador = () => {
        return (
            <Stack.Navigator
                initialRouteName="ContactoScreen"
                screenOptions={{
                    headerTintColor: '#fff',
                    headerStyle: { backgroundColor: '#015afc' },
                    headerTitleStyle: { color: '#fff' },
                }}
            >
                <Stack.Screen
                    name="ContactoScreen"
                    component={Contacto}
                    options={({ navigation }) =>
                        this.menuHeaderOptions('Contacto', navigation)
                    }
                />
            </Stack.Navigator>
        );
    };

    menuHeaderOptions = (title, navigation) => ({
        title,
        headerLeft: () => (
            <BotonMenu
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
        ),
    });

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
                    component={Home}
                    options={({ navigation }) =>
                        this.menuHeaderOptions('Campo Base', navigation)
                    }
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
                <Stack.Screen
                    name="Calendario"
                    options={({ navigation }) =>
                        this.menuHeaderOptions('Calendario Gaztaroa', navigation)
                    }
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

    // Drawer del menu lateral
    DrawerNavegador = () => {
        return (
            <Drawer.Navigator
                initialRouteName="Campo base"
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                screenOptions={{
                    headerShown: false,
                    drawerStyle: {
                        backgroundColor: '#c2d3da',
                    },
                }}
            >
                <Drawer.Screen
                    name="Campo base"
                    component={this.HomeNavegador}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name="home"
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />

                <Drawer.Screen
                    name="QuienesSomosMenu"
                    component={this.QuienesSomosNavegador}
                    options={{
                        title: 'Quiénes somos',
                        drawerIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name="information"
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />

                <Drawer.Screen
                    name="CalendarioMenu"
                    component={this.CalendarioNavegador}
                    options={{
                        title: 'Calendario',
                        drawerIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name="calendar"
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />

                <Drawer.Screen
                    name="Contacto"
                    component={this.ContactoNavegador}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name="card-account-phone"
                                color={color}
                                size={size}
                            />
                        ),
                    }}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#015afc',
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    drawerHeaderImageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    drawerHeaderTextContainer: {
        flex: 2,
        justifyContent: 'center',
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    drawerImage: {
        width: 80,
        height: 60,
        resizeMode: 'contain',
    },
});

export default Campobase;