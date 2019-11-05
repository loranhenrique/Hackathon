import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LoginAluno from './pages/LoginAluno';
import LoginResponsavel from './pages/LoginResponsavel';
import LoginProfessor from './pages/LoginProfessor';
import LoginEscola from './pages/LoginEscola';
import Feed from './pages/Feed';
import FeedEscola from './pages/FeedEscola';
import FeedResponsavel from './pages/FeedResponsavel';
import CriarContaResponsavel from './pages/CriarContaResponsavel';
import CriarContaProfessor from './pages/CriarContaProfessor';
import CriarContaEscola from './pages/CriarContaEscola';
import CriarContaAluno from './pages/CriarContaAluno';
import RecuperarSenhaAluno from './pages/RecuperarSenhaAluno';
import RecuperarSenhaEscola from './pages/RecuperarSenhaEscola';
import RecuperarSenhaProfessor from './pages/RecuperarSenhaProfessor';
import RecuperarSenhaResponsavel from './pages/RecuperarSenhaResponsavel';
import ConfirmarSenhaAluno from './pages/ConfirmarSenhaAluno';
import ConfirmarSenhaEscola from './pages/ConfirmarSenhaEscola';
import ConfirmarSenhaResponsavel from './pages/ConfirmarSenhaResponsavel';
import ConfirmarSenhaProfessor from './pages/ConfirmarSenhaProfessor'; 
import AulasAluno from './pages/AulasAluno';
import Vacinas from './pages/Vacinas';
import feedResponsavel from './pages/FeedResponsavel';
import CalendarioAluno from './pages/CalendarioAluno';
import DadosAluno from './pages/DadosAluno';
import DadosEscola from './pages/DadosEscola';
import NotasAluno from './pages/NotasAluno';
import FeedProfessor from './pages/FeedProfessor';
import CadastrarFrequencia from './pages/cadastrarFrequencia';
import CadastrarNotas from './pages/cadastrarNotas';

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
                <Route path="/FeedEscola" component={FeedEscola} />
                <Route path="/FeedResponsavel" component={FeedResponsavel} />
                <Route path="/CriarContaResponsavel" component={CriarContaResponsavel} />
                <Route path="/CriarContaProfessor" component={CriarContaProfessor} />
                <Route path="/CriarContaEscola" component={CriarContaEscola} />
                <Route path="/CriarContaAluno" component={CriarContaAluno} />
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
                <Route path="/Vacinas" component={Vacinas} />
                <Route path="/DadosEscola" component={DadosEscola} />
                <Route path="/NotasAluno" component={NotasAluno} />
                <Route path="/FeedProfessor" component={FeedProfessor}/>
                <Route path="/feedResponsavel" component={feedResponsavel} />
                <Route path="/CadastrarFrequencia" component={CadastrarFrequencia}/>
                <Route path="/CadastrarNotas" component={CadastrarNotas}/>
            </Switch>
        </BrowserRouter>
    );
}