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
                        <Link to="/feed" className="menu-icon"><img className="" src={home} alt="home" /><span>Inicio</span></Link>
                        <Link to="/calendarioaluno" className="menu-icon"><img className="" src={calendario}  alt="calendario"/><span>Frequência</span></Link>
                        <Link to="/notasaluno" className="menu-icon"><img className="notas" src={notas} alt="notas" /><span>Notas</span></Link>
                        <Link to="/aulasaluno" className="menu-icon"><img className="aulas" src={aulas} alt="aulas"/><span>Aulas</span></Link>
                        <Link to="/dadosaluno" className="menu-icon"><img className="person" src={person} alt="meus dados"/><span>Dados Pessoais</span> </Link>
                     
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
            <div className="dados">
                <h1>Dados da escola</h1>
            </div>
         
        </div>
        </>
    );



}