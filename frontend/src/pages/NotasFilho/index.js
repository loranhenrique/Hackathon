import React, {useState, useEffect} from 'react';
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

export default function NotasFilho(){
    const [notas, setNotas] = useState([]);
    
    useEffect(() => {
        async function loadAvisos() {
           

           const responsavel_id = localStorage.getItem('responsavel');
      //   console.log(responsavel_id);

            const response = await api.get('/notas/notasAlunoFilho', { headers: { responsavel_id }});         
            console.log(response); 
            setNotas(response.data);
        }
        loadAvisos();
    }, []);

    return(
        <>
        <div className="corpo_pagina">
        <div className="menu">
                    <nav className="menu-navigation-icons">
                        <Link to="/feedresponsavel" className="menu-icon"><img className="" src={home} alt="home" /><span>Inicio</span></Link>
                        <Link to="/frequenciafilho" className="menu-icon"><img className="" src={calendario}  alt="calendario"/><span>Frequência filho</span></Link>
                        <div className="corS"><Link to="/notasfilho" className="menu-icon"><img className="notas" src={notasImg} alt="notas" /><span>Notas filho</span></Link></div>
                        <Link to="/vacinas" className="menu-icon"><img className="aulas" src={aulas} alt="aulas"/><span>Vacinas</span></Link>
                        <Link to="/dadosresponsavel" className="menu-icon"><img className="person" src={person} alt="meus dados"/><span>Dados Pessoais</span></Link>
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
                 <h3>Notas</h3>
                <ul>
                {notas.map(nota => (
                            <li key={nota._id}>
                                <span>Nota:</span>                           
                                <span>{nota.nota}</span>

                            </li>
                        ))}
                       
                </ul>
                      
                
       
         
        </div>
        </div>
        </>
    );
}