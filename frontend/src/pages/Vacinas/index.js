import React, { useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css';

export default function CriarContaResponsavel({ history }) {
    const [nome, setNome] = useState('');
    const [dataVacinacao, setDataVacinacao] = useState('');
    const [aluno, setAluno] = useState('');


    async function handleSubmit(event) {
        event.preventDefault();
        //const responsavel_id = localStorage.getItem('responsavel');

        await api.post('/vacina/register', { dataVacinacao, nome, aluno_id: aluno});

        history.push('/feedresponsavel');
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
                            placeholder="Nome"
                            value={nome}
                            onChange={event => setNome(event.target.value)}
                        />
                        <input type="date"
                            id="nome"
                            placeholder="Nome"
                            value={dataVacinacao}
                            onChange={event => setDataVacinacao(event.target.value)}
                        />
                        <input type="text"
                            id="senha"
                            placeholder="aluno_id"
                            value={aluno}
                            onChange={event => setAluno(event.target.value)}
                        />
                        <button type="submit" className="btnConfirmar">CONFIRMAR</button>
                        <Link to="/feedresponsavel"><button type="submit" className="btnVoltar">VOLTAR</button></Link>
                        
                        </fieldset>
                    </form>
                </div>
                </div>
        </>
    );
}