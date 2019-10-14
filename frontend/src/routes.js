import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Aluno from './pages/Aluno';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/Aluno" component={Aluno} />
            </Switch>
        </BrowserRouter>
    );
}