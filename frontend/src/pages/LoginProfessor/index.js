import React, { useState } from 'react';
import api from '../../services/api';

import './styles.css';

export default function LoginProfessor({ history }) {
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        const response = await api.post('/professor/authenticate', { matricula, senha });

        const { _id } = response.data;

        localStorage.setItem('professor', _id);

        history.push('/Professor');
    }

    return (
        <>
            <div className="backLogin">
                <div className="contenteProfessor" align="center">
                    <div id="logoLogin"></div>

                    <form onSubmit={handleSubmit}>
                        <input type="number"
                            id="matricula"
                            placeholder="Matricula"
                            value={matricula}
                            onChange={event => setMatricula(event.target.value)}
                        />
                        <input type="password"
                            id="senha"
                            placeholder="Password"
                            value={senha}
                            onChange={event => setSenha(event.target.value)}
                        />
                        <button type="submit" className="btnProfessor">CONFIRMAR</button>
                        <button type="submit" className="btnSenha">Esqueceu a senha?</button>
                        <button type="submit" className="btnCriarConta">CRIAR UMA CONTA</button>
                    </form>
                </div>
            </div>
        </>
    );
}