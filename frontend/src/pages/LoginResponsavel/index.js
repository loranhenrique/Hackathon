import React, { useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css';

export default function LoginProfessor({ history }) {
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        const response = await api.post('/responsavel/authenticate', { matricula, senha });

        const { _id } = response.data;

        localStorage.setItem('responsavel', _id);

        history.push('/FeedResponsavel');
    }

    return (
        <>
            <div className="backLogin">
                <div className="contentAluno" align="center">
                    <div id="logoLogin"></div>

                    <p id="escolha">Escolha como deseja entrar:</p>
                    <div className="acessos">
                        <li>
                            <Link to="/LoginEscola"><button className="btnLink">Escola</button></Link>
                            <Link to="/LoginProfessor"><button className="btnLink">Professor</button></Link>
                            <Link to="/LoginResponsavel"><button className="btnLinkAluno">Responsável</button></Link>
                            <Link to="/LoginAluno"><button className="btnLink">Aluno</button></Link>
                        </li>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <input type="text"
                            id="matricula"
                            placeholder="Matrícula"
                            value={matricula}
                            onChange={event => setMatricula(event.target.value)}
                        />
                        <input type="password"
                            id="senha"
                            placeholder="Senha"
                            value={senha}
                            onChange={event => setSenha(event.target.value)}
                        />
                        <button type="submit" className="btnProfessor">CONFIRMAR</button>
                        <Link to="/RecuperarSenhaResponsavel"><button className="btnRecuperarSenha">Esqueceu a senha?</button></Link>
                        <Link to="/CriarContaResponsavel"><button className="btnCriarConta">CRIAR UMA CONTA</button></Link>
                    </form>
                </div>
            </div>
        </>
    );
}