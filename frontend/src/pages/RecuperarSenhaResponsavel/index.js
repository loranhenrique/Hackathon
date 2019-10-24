import React, { useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css';

export default function RecuperarSenha({ history }) {
    const [email, setEmail] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        const response = await api.post('/aluno/authenticate', { email });

        const { _id } = response.data;

        localStorage.setItem('aluno', _id);

        history.push('/ConfirmarSenhaAlumo'); 
    }

    return (
        <>
            <div className="backLogin">
                <div className="contentRecuperarSenha" align="center">
                    <div id="logoLogin"></div>

                    <p id="label">Recuperação de senha</p>
                    <form onSubmit={handleSubmit}>
                        <input type="text"
                            id="email"
                            placeholder="Digite seu E-mail"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />
                        <Link to="/ConfirmarSenhaAluno"><button type="submit" className="btnConfirmEmail2">CONFIRMAR</button></Link>
                        <Link to="/LoginAluno"><button type="submit" className="btnLinkVoltar2">VOLTAR</button></Link>
                    </form>
                </div>
            </div>
        </>
    );
}