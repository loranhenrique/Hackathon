import React, { useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';


import './styles.css';

export default function CriarContaEscola({ history }) {
    const [matricula, setMatricula] = useState('');
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarsenha, setConfirmarSenha] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [bairro, setBairro] = useState('');
    const [municipio, setMunicipio] = useState('');
    const [estado, setEstado] = useState('');
    const [cep, setCep] = useState('');


    async function handleSubmit(event) {
        event.preventDefault();

        await api.post('/escola/register', { matricula, nome, senha, logradouro, bairro, municipio, estado, cep });

        history.push('/LoginEscola');
    }

    return (
        <>
            <div className="backLogin">
                <div className="contentCriarContaEscola" align="center">
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
                          <input type="password"
                            id="confirmarsenha"
                            placeholder="Confirmar Senha"
                            value={confirmarsenha}
                            onChange={event => setConfirmarSenha(event.target.value)}
                        />
                        <input type="text"
                            id="logradouro"
                            placeholder="Logradouro"
                            value={logradouro}
                            onChange={event => setLogradouro(event.target.value)}
                        />
                        <input type="text"
                            id="bairro"
                            placeholder="Bairro"
                            value={bairro}
                            onChange={event => setBairro(event.target.value)}
                        />
                        <input type="text"
                            id="municipio"
                            placeholder="Município"
                            value={municipio}
                            onChange={event => setMunicipio(event.target.value)}
                        />                  
                        <input type="text"
                            id="estado"
                            placeholder="Estado"
                            value={estado}
                            onChange={event => setEstado(event.target.value)}
                        />
                        <input type="text"
                            id="cep"
                            placeholder="Cep"
                            value={cep}
                            onChange={event => setCep(event.target.value)}
                        />

                        <button type="submit" className="btnConfirmarEscola">CONFIRMAR</button>
                       <Link to="LoginAluno"><button type="submit" className="btnVoltarEscola">VOLTAR</button></Link>
                        </fieldset>
                    </form>
                </div>
                </div>
        </>
    );
}