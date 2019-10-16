import React, { useState } from 'react';
import api from '../../services/api';
import logo from '../../assets/teste1.png';


import './styles.css';

export default function LoginAluno({ history }){
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('');
  
    async function handleSubmit(event){
      event.preventDefault();
  
      const response = await api.post('/aluno/authenticate', {matricula, senha, tipoUsuario});
  
      const { _id } = response.data;

      localStorage.setItem('aluno', _id);

      history.push('/Aluno');
    }

    return(
        <>
        <div className="contentImg"></div>
        <div className="contentAluno">
            <img src={logo} alt="Logo da aplicação"></img>

            <p>FamInSchool</p>

            <form onSubmit={handleSubmit}>
                <input type="search" 
                id="tipoUsuario" 
                placeholder="Ex: aluno" 
                value={tipoUsuario} 
                onChange={ event => setTipoUsuario(event.target.value)}
                />
                 <input type="text" 
                id="matricula" 
                placeholder="matrícula" 
                value={matricula} 
                onChange={ event => setMatricula(event.target.value)}
                />
                <input type="password"
                id="senha" 
                placeholder="senha" 
                value={senha} 
                onChange={ event => setSenha(event.target.value)}
                />
                <button type="submit" className="btnAluno">ENTRAR</button>
                <button type="submit" className="btnSenhaAluno">Esqueceu a senha?</button>
                <button type="submit" className="btnRegistroAluno">CRIAR UMA CONTA</button>
            </form>
        </div>
        </>
    );
}