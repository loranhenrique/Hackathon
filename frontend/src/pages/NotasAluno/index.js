

import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
//importando imagens que será usada no menu como logo
import home from '../../assets/home.png';
import calendario from '../../assets/calendario.png';
import notas from '../../assets/notas.png';
import aulas from '../../assets/aulas_quadro.png';    
import person from '../../assets/person.png';
import escola_icon from '../../assets/escola.png';

export default function CalendarioAluno(){

    return(
        <>
        <div className="corpo_pagina">
            <div className="menu">
                <nav className="menu-navigation-icons">
                    <Link to="/feed" className="menu-icon"><img className="" src={home} alt="home"/><span>Inicio</span></Link>
                    <Link to="/calendarioaluno" className="menu-icon"><img className="" src={calendario}/><span>Frequência</span></Link>
                    <Link to="/notasaluno" className="menu-icon"><img className="notas" src={notas}/><span></span>Notas</Link>
                    <Link to="/aulasaluno" className="menu-icon"><img className="aulas"src={aulas}/><span></span>Aulas</Link>
                    <Link to="/dadosaluno" className="menu-icon"><img className="person" src={person}/><span></span>Dados Pessoais</Link>
                    <Link to="/dadosescola" className="menu-icon"><img className="escola_icon" src={escola_icon}/><span></span>Dados Escola</Link>
                </nav>
            </div>
            <div className="tarefas">
            {/*Aqui será listada todas as tarefas que o aluno administrar */}
                <ul>
                    <li>
                    <h4>
                        PROVAS
                    </h4>
                    <span>
                        5
                    </span>
                    </li>
                    <li>
                    <h4>
                        PROVAS
                    </h4>
                    <span>
                        5
                    </span>
                    </li>
                </ul>
            </div>
            <div className="notas">
                <h1>Notas</h1>
            </div>
         
        </div>
        </>
    );



}