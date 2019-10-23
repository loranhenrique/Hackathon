import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/PaginaInicial';
import LoginAluno from './pages/LoginAluno';
import LoginResponsavel from './pages/LoginResponsavel';
import LoginProfessor from './pages/LoginProfessor';
import LoginEscola from './pages/LoginEscola';
import Aluno from './pages/Aluno';
import Responsavel from './pages/Responsavel';
import Professor from './pages/Professor';
import Escola from './pages/Escola';
import Feed from './pages/Feed';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/LoginAluno" component={LoginAluno} />
                <Route path="/LoginResponsavel" component={LoginResponsavel} />
                <Route path="/LoginProfessor" component={LoginProfessor} />
                <Route path="/LoginEscola" component={LoginEscola} />
                <Route path="/Aluno" component={Aluno} />
                <Route path="/Responsavel" component={Responsavel} />
                <Route path="/Professor" component={Professor} />
                <Route path="/Escola" component={Escola} />
                <Route path="/Feed" component={Feed} />
            </Switch>
        </BrowserRouter>
    );
}