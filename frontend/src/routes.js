import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LoginAluno from './pages/LoginAluno';
import LoginResponsavel from './pages/LoginResponsavel';
import LoginProfessor from './pages/LoginProfessor';
import LoginEscola from './pages/LoginEscola';
import Aluno from './pages/Aluno';
import Responsavel from './pages/Responsavel';
import Professor from './pages/Professor';
import Escola from './pages/Escola';
import Feed from './pages/Feed';
import CriarContaResponsavel from './pages/CriarContaResponsavel';
import CriarContaEscola from './pages/CriarContaEscola';
import RecuperarSenha from './pages/RecuperarSenha';
import ConfirmarSenha from './pages/ConfirmarSenha';



export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={LoginAluno} />
                <Route path="/LoginAluno" component={LoginAluno} />
                <Route path="/LoginResponsavel" component={LoginResponsavel} />
                <Route path="/LoginProfessor" component={LoginProfessor} />
                <Route path="/LoginEscola" component={LoginEscola} />
                <Route path="/Aluno" component={Aluno} />
                <Route path="/Responsavel" component={Responsavel} />
                <Route path="/Professor" component={Professor} />
                <Route path="/Escola" component={Escola} />
                <Route path="/Feed" component={Feed} />
                <Route path="/CriarContaResponsavel" component={CriarContaResponsavel} />
                <Route path="/CriarContaEscola" component={CriarContaEscola} />
                <Route path="/RecuperarSenha" component={RecuperarSenha} />
                <Route path="/ConfirmarSenha" component={ConfirmarSenha} />
            </Switch>
        </BrowserRouter>
    );
}