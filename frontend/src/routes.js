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
import CriarContaResponsavel from './pages/CriarContaResponsavel';
import CriarContaEscola from './pages/CriarContaEscola';

import RecuperarSenhaAluno from './pages/RecuperarSenhaAluno';
import RecuperarSenhaEscola from './pages/RecuperarSenhaEscola';
import RecuperarSenhaProfessor from './pages/RecuperarSenhaProfessor';
import RecuperarSenhaResponsavel from './pages/RecuperarSenhaResposavel';
import ConfirmarSenhaAluno from './pages/ConfirmarSenhaAluno';
import ConfirmarSenhaEscola from './pages/ConfirmarSenhaEscola';
import ConfirmarSenhaProfessor from './pages/ConfirmarSenhaProfessor';
import ConfirmarSenhaResponsavel from './pages/ConfirmarSenhaResponsavel';
import RecuperarSenha from './pages/RecuperarSenha';
import ConfirmarSenha from './pages/ConfirmarSenha';
import Feed from './pages/Feed';

export default function Routes() {
    return(
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
                <Route path="/CriarContaResponsavel" component={CriarContaResponsavel} />
                <Route path="/CriarContaEscola" component={CriarContaEscola} />
                <Route path="/RecuperarSenhaAluno" component={RecuperarSenhaAluno} />
                <Route path="/RecuperarSenhaEscola" component={RecuperarSenhaEscola} />
                <Route path="/RecuperarSenhaProfessor" component={RecuperarSenhaProfessor} />
                <Route path="/RecuperarSenhaResponsavel" component={RecuperarSenhaResponsavel} />
                <Route path="/ConfirmarSenhaAluno" component={ConfirmarSenhaAluno} />
                <Route path="/ConfirmarSenhaEscola" component={ConfirmarSenhaEscola} />
                <Route path="/ConfirmarSenhaProfessor" component={ConfirmarSenhaProfessor} />
                <Route path="/ConfirmarSenhaResponsavel" component={ConfirmarSenhaResponsavel} />
                <Route path="/RecuperarSenha" component={RecuperarSenha} />
                <Route path="/ConfirmarSenha" component={ConfirmarSenha} />
                <Route path="/Feed" component={Feed} />
            </Switch>
        </BrowserRouter>
    );
}