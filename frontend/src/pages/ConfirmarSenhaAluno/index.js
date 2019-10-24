import React, { useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css';

export default function RecuperarSenha({ history }) {
    const [senha, setSenha] = useState('');
    const [confirmarsenha, setConfirmarSenha] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        const response = await api.post('/aluno/authenticate', { senha, confirmarsenha});

        const { _id } = response.data;

        localStorage.setItem('aluno', _id);

        history.push('/ConfirmarSenhaAluno'); 
    }

    return (
        <>
            <div className="backLogin">
                <div className="contentRecuperarSenha" align="center">
                    <div id="logoLogin"></div>

                    <p id="label">Escolha sua nova senha</p>
                    <form onSubmit={handleSubmit}>
                        <input type="password"
                            id="senha"
                            placeholder="Senha"
                            value={senha}
                            onChange={event => setSenha(event.target.value)}
                        />
                        <input type="password"
                            id="confirmarsenha"
                            placeholder="Confirme sua senha"
                            value={confirmarsenha}
                            onChange={event => setConfirmarSenha(event.target.value)}
                        />
                        <button type="submit" className="btnConfirmEmail">CONFIRMAR</button>
                        <Link to="/RecuperarSenhaAluno"><button type="submit" className="btnLinkVoltar">VOLTAR</button></Link>
                    </form>
                </div>
            </div>
        </>
    );
}