import React, { useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css';

export default function LoginAluno({ history }) {
    const [matricula, setMatricula] = useState('');
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [bairro, setBairro] = useState('');
    const [municipio, setMunicipio] = useState('');
    const [cidade, setCidade] = useState('');
    const [cep, setCep] = useState('');


    async function handleSubmit(event) {
        event.preventDefault();

        const response = await api.post('/escolas/authenticate', { matricula, nome, telefone, email, senha, logradouro, bairro, municipio, cidade, cep });

        const { _id } = response.data;

        localStorage.setItem('escolas', _id);

        history.push('/Escola');
    }

    return (
        <>
            <div className="backLogin">
                <div className="contentCriarConta" align="center">
                    <div id="logoLogin"></div>
                   
                    <p id="escolha">Escolha como deseja entrar:</p>
                    
                    <form onSubmit={handleSubmit}>
                        <input type="text"
                            id="matricula"
                            placeholder="Matricula"
                            value={matricula}
                            onChange={event => setMatricula(event.target.value)}
                        />
                        <input type="text"
                            id="nome"
                            placeholder="Nome"
                            value={nome}
                            onChange={event => setNome(event.target.value)}
                        />
                        <input type="number"
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
                        <input type="text"
                            id="logradouro"
                            placeholder="Logradouro"
                            value={logradouro}
                            onChange={event => setLogradouro(event.target.value)}
                        />
                        <input type="number"
                            id="bairro"
                            placeholder="Bairro"
                            value={bairro}
                            onChange={event => setBairro(event.target.value)}
                        />
                        <input type="text"
                            id="municipio"
                            placeholder="Municipio"
                            value={municipio}
                            onChange={event => setMunicipio(event.target.value)}
                        />
                        <input type="text"
                            id="cidade"
                            placeholder="Cidade"
                            value={cidade}
                            onChange={event => setCidade(event.target.value)}
                        />
                        <input type="number"
                            id="cep"
                            placeholder="Cep"
                            value={cep}
                            onChange={event => setCep(event.target.value)}
                        />
                        <button type="submit" className="btnCriar">CONFIRMAR</button>
                        <button type="submit" className="btnVoltar">Esqueceu a senha?</button>
                    </form>
                </div>
            </div>
        </>
    );
}