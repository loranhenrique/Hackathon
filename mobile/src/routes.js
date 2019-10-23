import { createAppContainer, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';

import Login from './pages/Login';
import Aluno from './pages/Aluno';

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        Aluno,
    })
);

export default Routes;