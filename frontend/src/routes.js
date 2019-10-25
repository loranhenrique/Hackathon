import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LoginAluno from './pages/LoginAluno';
import LoginResponsavel from './pages/LoginResponsavel';
import LoginProfessor from './pages/LoginProfessor';
import LoginEscola from './pages/LoginEscola';
import Feed from './pages/Feed';
import CriarContaResponsavel from './pages/CriarContaResponsavel';
import CriarContaEscola from './pages/CriarContaEscola';
import RecuperarSenhaAluno from './pages/RecuperarSenhaAluno';
import RecuperarSenhaEscola from './pages/RecuperarSenhaEscola';
import RecuperarSenhaProfessor from './pages/RecuperarSenhaProfessor';
import RecuperarSenhaResponsavel from './pages/RecuperarSenhaResponsavel';
import ConfirmarSenhaAluno from './pages/ConfirmarSenhaAluno';
import ConfirmarSenhaEscola from './pages/ConfirmarSenhaEscola';
import ConfirmarSenhaResponsavel from './pages/ConfirmarSenhaResponsavel';
import ConfirmarSenhaProfessor from './pages/ConfirmarSenhaProfessor'; 
import AulasAluno from './pages/AulasAluno';
import CalendarioAluno from './pages/CalendarioAluno';
import DadosAluno from './pages/DadosAluno';
import DadosEscola from './pages/DadosEscola';
import NotasAluno from './pages/NotasAluno';



export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={LoginAluno} />
                <Route path="/LoginAluno" component={LoginAluno} />
                <Route path="/LoginResponsavel" component={LoginResponsavel} />
                <Route path="/LoginProfessor" component={LoginProfessor} />
                <Route path="/LoginEscola" component={LoginEscola} />
                <Route path="/Feed" component={Feed} />
                <Route path="/CriarContaResponsavel" component={CriarContaResponsavel} />
                <Route path="/CriarContaEscola" component={CriarContaEscola} />
                <Route path="/RecuperarSenhaAluno" component={RecuperarSenhaAluno} />
                <Route path="/RecuperarSenhaEscola" component={RecuperarSenhaEscola} />
                <Route path="/RecuperarSenhaProfessor" component={RecuperarSenhaProfessor }/>
                <Route path="/RecuperarSenhaResponsavel" component={RecuperarSenhaResponsavel} />
                <Route path="/ConfirmarSenhaAluno" component={ConfirmarSenhaAluno} />
                <Route path="/ConfirmarSenhaEscola" component={ConfirmarSenhaEscola} />
                <Route path="/ConfirmarSenhaResponsavel" component={ConfirmarSenhaResponsavel} />
                <Route path="/ConfirmarSenhaProfessor" component={ConfirmarSenhaProfessor} />
                <Route path="/AulasAluno" component={AulasAluno} />
                <Route path="/CalendarioAluno" component={CalendarioAluno} />
                <Route path="/DadosAluno" component={DadosAluno} />
                <Route path="/DadosEscola" component={DadosEscola} />
                <Route path="/NotasAluno" component={NotasAluno} />
                
            </Switch>
        </BrowserRouter>
    );
}