import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './styles.css';
//importando imagens que será usada no menu como logo
import home from '../../assets/home.png';
import calendario from '../../assets/calendario.png';
import notas from '../../assets/notas.png';
import aulas from '../../assets/aulas_quadro.png';
import person from '../../assets/person.png';
import escola_icon from '../../assets/escola.png';
//import colorido from '../../assets/house_colorida.png';

export default function CalendarioAluno() {
    const [notas, setNotas] = useState([]);
    const [disciplinaProfessor, setDisciplinaProfessor] = useState('');
    useEffect(() => {
        async function loadAvisos() {
            const aluno_id = localStorage.getItem('aluno');

            const response = await api.get('/notas/notasAluno', { headers: { aluno_id } });
            console.log(response.data);
            //fazer a parte que pega todos os nomes das cdiciplinas e colocar na tela de notas
            //const Disciplinas = await api.get('/disciplinaProfessor/list', { headers: { _id: response } });
//            console.log(Disciplinas);
            //fazer um for pra percorrer todas as posições do vetor de notas
            //para conseguirmos usar para colocar no tela de notas aluno

            setNotas(response.data);
           // setDisciplinaProfessor(Disciplinas.data);
        }
        loadAvisos();
    }, []);

    return (
        <>
            <div className="corpo_pagina">
                <div className="menu">
                    <nav className="menu-navigation-icons">
                        <Link to="/feed" className="menu-icon"><img className="" src={home} alt="home" /><span>Inicio</span></Link>
                        <Link to="/calendarioaluno" className="menu-icon"><img className="" src={calendario} /><span>Frequência</span></Link>
                        <Link to="/notasaluno" className="menu-icon"><img className="notas" src={notas} /><span></span>Notas</Link>
                        <Link to="/aulasaluno" className="menu-icon"><img className="aulas" src={aulas} /><span></span>Aulas</Link>
                        <Link to="/dadosaluno" className="menu-icon"><img className="person" src={person} /><span></span>Dados Pessoais</Link>
                        <Link to="/dadosescola" className="menu-icon"><img className="escola_icon" src={escola_icon} /><span></span>Dados Escola</Link>
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
                <div className="calendario">
                    <div className="posts">
                        <ul className="feed_post">


                        </ul>
                    </div>
                </div>

            </div>
        </>
    );



}