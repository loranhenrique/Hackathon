import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './styles.css';
//import Moment from 'moment';
//importando imagens que será usada no menu como logo
import home from '../../assets/home.png';
import calendario from '../../assets/calendario.png';
import notas from '../../assets/notas.png';
import aulas from '../../assets/aulas_quadro.png';    
import person from '../../assets/person.png';
import escola_icon from '../../assets/escola.png';

//import colorido from '../../assets/house_colorida.png';

export default function CalendarioAluno(){
    const [faltas, setFaltas] = useState([]);
    
    useEffect(() => {
        async function loadAvisos() {
            const aluno_id = localStorage.getItem('aluno');
           
            const response = await api.get('/faltas/faltasaluno', { headers: { aluno_id } });          
            setFaltas(response.data);
        }
        loadAvisos();
    }, []);

    return(
        <>
        <div className="corpo_pagina">
           
            <div className="menu">
                <nav className="menu-navigation-icons">
                    <Link to="/feed" className="menu-icon"><img className="" src={home} alt="home"/><span>Inicio</span></Link>
                    <Link to="/calendarioaluno" className="menu-icon"><img className="" src={calendario} alt="calendario"/><span>Frequência</span></Link>
                    <Link to="/notasaluno" className="menu-icon"><img className="notas" src={notas} alt="notas"/><span></span>Notas</Link>
                    <Link to="/aulasaluno" className="menu-icon"><img className="aulas"src={aulas} alt="aulasDoAluno"/><span></span>Aulas</Link>
                    <Link to="/dadosaluno" className="menu-icon"><img className="person" src={person} alt="dadosAluno"/><span></span>Dados Pessoais</Link>
                    <Link to="/dadosescola" className="menu-icon"><img className="escola_icon" src={escola_icon} alt="dadosEscola"/><span></span>Dados Escola</Link>
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
                 <h3>Faltas</h3>
                <ul>
                {faltas.map(falta => (
                            <li key={falta._id}>
                                <span>Dia:</span>                           
                               {/* <span>{Moment(falta.dia).format('DD/MM/YY')}</span>*/}
                           
                            </li>
                        ))}
                       
                </ul>
                      
                
       
         
        </div>
        </div>
        </>
    );



}