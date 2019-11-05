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
    const [confirmarsenha, setConfirmarSenha] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [bairro, setBairro] = useState('');
    const [municipio, setMunicipio] = useState('');
    const [cidade, setCidade] = useState('');
    const [cep, setCep] = useState('');


    async function handleSubmit(event) {
        event.preventDefault();

        const response = await api.post('/responsavel/register', { matricula, nome, telefone, email, senha, logradouro, bairro, municipio, cidade, cep });

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
                        <div className="Meio">
                        <input type="text"
                            id="cidade"
                            placeholder="Cidade"
                            value={cidade}
                            onChange={event => setCidade(event.target.value)}
                        />
                        <input type="text"
                            id="cep"
                            placeholder="Cep"
                            value={cep}
                            onChange={event => setCep(event.target.value)}
                        />
                        </div>
                        
                        <button type="submit" className="btnConfirmar">CONFIRMAR</button>
                        <Link to="/feedescola"><button type="submit" className="btnVoltar">VOLTAR</button></Link>
                        
                        </fieldset>
                    </form>
                </div>
                </div>
        </>
    );
}