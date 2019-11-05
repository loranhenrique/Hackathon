import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './styles.css';
//importando imagens que será usada no menu como logo
import home from '../../assets/home.png';
import calendario from '../../assets/calendario.png';
import notasImg from '../../assets/notas2.png';
import aulas from '../../assets/aulas_quadro.png';
import person from '../../assets/person.png';


//import colorido from '../../assets/house_colorida.png';

export default function CalendarioAluno() {
    const [notas, setNotas] = useState([]);
    const [disciplinaProfessor, setDisciplinaProfessor] = useState('');
   
    useEffect(() => {
        async function loadAvisos() {
            const aluno_id = localStorage.getItem('aluno');

            const response = await api.get('/notas/notasAluno', { headers: { aluno_id } });
            const id_disciplina = response.data[0].disciplinaProfessor_id.disciplina_id;
            console.log(id_disciplina);
            const disciplina = await api.get('/disciplina/list',{headers:{disciplina_id:id_disciplina}});
            console.log(disciplina.data);
            setNotas(response.data);
           
        
          
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
                       <div className="corS"><Link to="/notasaluno" className="menu-icon"><img className="notas" src={notasImg} /><span>Notas</span></Link></div>
                        <Link to="/aulasaluno" className="menu-icon"><img className="aulas" src={aulas} /><span>Aulas</span></Link>
                        <Link to="/dadosaluno" className="menu-icon"><img className="person" src={person} /><span>Dados Pessoais</span></Link>        
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
                    
                        <h3>Dados Pessoais</h3>
                        <ul>
                            {notas.map(nota =>(
                                <li key={nota._id}>
                                    <span>{nota.nota}</span>
                                </li>
                            ))}

                        </ul>
                    
                </div>

            </div>
        </>
    );



}