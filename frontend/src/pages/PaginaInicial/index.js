import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

export default function PaginaInicial(){
    return(
        <>
            <div className="contente">
                <Link to="/registrar"><button className="btnRegistro">Registrar-se</button></Link>
                <p>Como você deseja entrar: </p>
                <div className="acessos">
                    <li>
                    <Link to="/escola"><button className="btnLink">Escola</button></Link>
                    <Link to="/professor"><button className="btnLink">Professor</button></Link>
                    <Link to="/responsavel"><button className="btnLink">Responsável</button></Link>
                    <Link to="/LoginAluno"><button className="btnLink">Aluno</button></Link>
                    </li>
                </div>
            </div>
        </>
    );
}