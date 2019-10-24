import { createAppContainer, createSwitchNavigator  } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

//Páginas
import Login from './pages/Login';
import Aluno from './pages/Perfis/Aluno';

//Menus
import Agenda from './pages/Menu/Agenda';
import Avisos from './pages/Menu/Avisos';
import DadosAlunos from './pages/Menu/DadosAluno';
import DadosEscola from './pages/Menu/DadosEscola';
import DadosResponsavel from './pages/Menu/DadosResponsavel';
import Extras from './pages/Menu/Extras';
import Faltas from './pages/Menu/Faltas';
import Fisico from './pages/Menu/Fisico';
import Notas from './pages/Menu/Notas';
import Vacinacao from './pages/Menu/Vacinacao';
export const menuAluno = createBottomTabNavigator({
    Notas,
    Faltas,
    Avisos,
    Agenda,
    Extras,
    DadosAlunos,
},
    {
        tabBarOptions: {
            activeTintColor: '#000',
            showIcon: false,
            labelStyle: {
                fontSize: 18,
            },
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
            activeTintColor: '#000',
            showIcon: false,
            labelStyle: {
                fontSize: 18,
            },
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
            activeTintColor: '#000',
            showIcon: false,
            labelStyle: {
                fontSize: 18,
            },
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
            activeTintColor: '#000',
            showIcon: false,
            labelStyle: {
                fontSize: 18,
            },
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

// screen: Notas,
//         navigationOptions: {
//             tabBarIcon: ({tintColor}) => (
//                 <Icon ios="ios-school" android="md-school" color={tintColor} size={90}/>
//             )
//         }
//     },