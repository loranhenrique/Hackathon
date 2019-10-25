import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator, createTabNavigator } from 'react-navigation-tabs';
import React from 'react';

//Páginas
import Login from './pages/Login';
import Aluno from './pages/Perfis/Aluno';

//Menus
import Agenda from './pages/Menu/Agenda';
import Avisos from './pages/Menu/Avisos';
import DadosAluno from './pages/Menu/DadosAluno';
import DadosEscola from './pages/Menu/DadosEscola';
import DadosResponsavel from './pages/Menu/DadosResponsavel';
import Extras from './pages/Menu/Extras';
import Faltas from './pages/Menu/Faltas';
import Fisico from './pages/Menu/Fisico';
import Notas from './pages/Menu/Notas';
import Vacinacao from './pages/Menu/Vacinacao';

export const menuAluno = createBottomTabNavigator({
    DadosAluno: {
        screen: DadosAluno,
        navigationOptions: {
            title: 'Info',
            tabBarIcon: ({tintColor}) => {
                return <Icon name='ios-person' size={22} color={tintColor} />;
            }
        },
    },
    Notas: {
        screen: Notas,
        navigationOptions: {
            title: 'Notas',
            tabBarIcon: ({tintColor}) => {
                return <Icon name='ios-school' size={22} color={tintColor} />;
            }
        },
    },
    Faltas: {
        screen: Faltas,
        navigationOptions: {
            title: 'Faltas',
            tabBarIcon: ({tintColor}) => {
                return <Icon name='ios-podium' size={22} color={tintColor} />;
            }
        },
    },
    Avisos: {
        screen: Avisos,
        navigationOptions: {
            title: 'Avisos',
            tabBarIcon: ({tintColor}) => {
                return <Icon name='ios-volume-mute' size={32} color={tintColor} />;
            }
        },
    },
    Agenda: {
        screen: Agenda,
        navigationOptions: {
            title: 'Agenda',
            tabBarIcon: ({tintColor}) => {
                return <Icon name='ios-calendar' size={22} color={tintColor} />;
            }
        },
    },
    Extras: {
        screen: Extras,
        navigationOptions: {
            title: 'Extra',
            tabBarIcon: ({tintColor}) => {
                return <Icon name='ios-document' size={22} color={tintColor} />;
            }
        },
    },
},
    {
        tabBarOptions: {
            activeTintColor: '#c70000',
            inactiveTintColor: "#000",
            scrollEnabled: true,
            activeBackgroundColor: "#dbdbdb",
            inactiveBackgroundColor: "#FFF",
            showIcon: true,
            labelStyle: {
                fontSize: 18,
            },
            tabStyle:{
                borderRadius: 5,
            }
        }
    }
);

export const menuResponsavel = createBottomTabNavigator({
    Notas,
    Faltas,
    Agenda,
    Avisos,
    DadosEscola,
    DadosResponsavel,
    Vacinacao,
},
    {
        tabBarOptions: {
            activeTintColor: '#c70000',
            inactiveTintColor: "#000",
            scrollEnabled: true,
            activeBackgroundColor: "#dbdbdb",
            inactiveBackgroundColor: "#FFF",
            scrollEnabled: true,
            showIcon: true,
            labelStyle: {
                fontSize: 18,
            },
            tabStyle:{
                borderRadius: 5,
            }
        }
    }
);

export const menuProfessor = createBottomTabNavigator({
    Extras,
    Avisos,
    Fisico,
},
    {
        tabBarOptions: {
            activeTintColor: '#c70000',
            inactiveTintColor: "#000",
            scrollEnabled: true,
            activeBackgroundColor: "#dbdbdb",
            inactiveBackgroundColor: "#FFF",
            showIcon: true,
            labelStyle: {
                fontSize: 18,
            },
            tabStyle:{
                borderRadius: 5,
            }
        }
    }
);

export const menuEscola = createBottomTabNavigator({
    Aluno,
    Notas,
    Faltas,
    Agenda,
    Avisos,
},
    {
        tabBarOptions: {
            activeTintColor: '#c70000',
            inactiveTintColor: "#000",
            activeBackgroundColor: "#dbdbdb",
            inactiveBackgroundColor: "#FFF",    
            scrollEnabled: true,
            showIcon: true,
            labelStyle: {
                fontSize: 18,
            },
            tabStyle:{
                borderRadius: 5,
            }
        }
    }
);


const Routes = createAppContainer(
    createStackNavigator ({
        Login,
        Aluno,
        menuAluno,
        menuResponsavel,
        menuProfessor,
        menuEscola,
    },
        {
            initialRouteName: "menuAluno"
        })
);

export default Routes;