import React, { useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css';

export default function CriarContaResponsavel({ history }) {
    const [matricula, setMatricula] = useState('');
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');


    async function handleSubmit(event) {
        event.preventDefault();
        const escola_id = localStorage.getItem('escolas');

        await api.post('/professor/register', { matricula, nome, senha}, {
            headers: {escola_id}
        });

        history.push('/feedescola');
    }

    return (
        <>
            <div className="backLogin">
                <div className="contentCriarConta" align="center">
                    <div id="logoLogin"></div>

                    <form onSubmit={handleSubmit}>

                    <fieldset class="ConjuntodeCampos">
                    <legend class="escolha">Dados básicos de cadastro</legend>

                        <input type="text"
                            id="matricula"
                            placeholder="Matrícula"
                            value={matricula}
                            onChange={event => setMatricula(event.target.value)}
                        />
                        <input type="text"
                            id="nome"
                            placeholder="Nome"
                            value={nome}
                            onChange={event => setNome(event.target.value)}
                        />
                        <input type="password"
                            id="senha"
                            placeholder="Senha"
                            value={senha}
                            onChange={event => setSenha(event.target.value)}
                        />
                        <button type="submit" className="btnConfirmar">CONFIRMAR</button>
                        <Link to="/feedescola"><button type="submit" className="btnVoltar">VOLTAR</button></Link>
                        
                        </fieldset>
                    </form>
                </div>
                </div>
        </>
    );
}