import React, { useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css';

export default function RecuperarSenhaEscola({ history }) {
    const [email, setEmail] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

         await api.post('/aluno/authenticate', { email });

        history.push('/ConfirmarSenhaEscola'); 
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
                        <Link to="ConfirmarSenhaEscola"><button type="submit" className="btnConfirmEmail">CONFIRMAR</button></Link>
                        <Link to="/LoginEscola"><button type="submit" className="btnLinkVoltar">VOLTAR</button></Link>
                    </form>
                </div>
            </div>
        </>
    );
}