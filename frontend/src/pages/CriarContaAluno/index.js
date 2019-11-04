import React, { useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';


import './styles.css';

export default function CriarContaResponsavel({ history }) {
    const [matricula, setMatricula] = useState('');
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [dataNasc, setDataNasc] = useState('');
    const [situacao, setSituacao] = useState('');
    const [responsavel, setResponsavel] = useState('');
    const [turma, setTurma] = useState('');


    async function handleSubmit(event) {
        event.preventDefault();

        const response = await api.post('/aluno/register', { matricula, nome, telefone, email, senha, dataNasc, situacao, responsavel_id: responsavel, turma_id: turma});

        console.log(response);

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
                        <input type="text"
                            id="telefone"
                            placeholder="Telefone"
                            value={telefone}
                            onChange={event => setTelefone(event.target.value)}
                        />
                        <input type="text"
                            id="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />
                        <input type="password"
                            id="senha"
                            placeholder="Senha"
                            value={senha}
                            onChange={event => setSenha(event.target.value)}
                        />
                          <input type="date"
                            id="confirmarsenha"
                            placeholder="MM/DD/YYYY"
                            value={dataNasc}
                            onChange={event => setDataNasc(event.target.value)}
                        />
                        <input type="text"
                            id="logradouro"
                            placeholder="Situação"
                            value={situacao}
                            onChange={event => setSituacao(event.target.value)}
                        />
                        <input type="text"
                            id="bairro"
                            placeholder="Responsavel id"
                            value={responsavel}
                            onChange={event => setResponsavel(event.target.value)}
                        />
                        <input type="text"
                            id="municipio"
                            placeholder="Turma id"
                            value={turma}
                            onChange={event => setTurma(event.target.value)}
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