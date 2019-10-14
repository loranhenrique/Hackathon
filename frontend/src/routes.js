import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/PaginaInicial';
import LoginAluno from './pages/LoginAluno';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/LoginAluno" component={LoginAluno} />
            </Switch>
        </BrowserRouter>
    );
}