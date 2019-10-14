import React, { useState } from 'react';
import api from '../../services/api';

import './styles.css';

export default function LoginResponsavel({ history }){
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');
  
    async function handleSubmit(event){
      event.preventDefault();
  
      const response = await api.post('/responsavel/authenticate', {matricula, senha});
  
      const { _id } = response.data;

      localStorage.setItem('responsavel', _id);

      history.push('/Responsavel');
    }

    return(
        <>
        <div className="contenteAluno">
            <p>FamInSchool</p>

            <form onSubmit={handleSubmit}>
                <input type="number" 
                id="matricula" 
                placeholder="Matricula" 
                value={matricula} 
                onChange={ event => setMatricula(event.target.value)}
                />
                <input type="password"
                id="senha" 
                placeholder="Password" 
                value={senha} 
                onChange={ event => setSenha(event.target.value)}
                />
                <button type="submit" className="btn">CONFIRMAR</button>
                <button type="submit" className="btnSenha">Esqueceu a senha?</button>
            </form>
        </div>
        </>
    );
}