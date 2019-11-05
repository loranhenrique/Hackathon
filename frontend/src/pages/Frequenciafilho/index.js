import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './styles.css';

//importando imagens que será usada no menu como logo
import home from '../../assets/home.png';
import calendario from '../../assets/calendario2.png';
import notas from '../../assets/notas.png';
import aulas from '../../assets/aulas_quadro.png';    
import person from '../../assets/person.png';

//import colorido from '../../assets/house_colorida.png';

export default function FrequenciaFilho(){
    const [faltas, setFaltas] = useState([]);
    
    useEffect(() => {
        async function loadAvisos() {
           

           const responsavel_id = localStorage.getItem('responsavel');
         console.log(responsavel_id);

            const response = await api.get('/faltas/faltasalunopai', { headers: { responsavel_id }});          
            setFaltas(response.data);
        }
        loadAvisos();
    }, []);

    return(
        <>
        <div className="corpo_pagina">
        <div className="menu">
                     <nav className="menu-navigation-icons">
                        <Link to="/feedresponsavel" className="menu-icon"><img className="" src={home} alt="home" /><span>Inicio</span></Link>
                        <div className="corS"><Link to="/frequenciafilho" className="menu-icon"><img className="" src={calendario}  alt="calendario"/><span>Frequência filho</span></Link></div>
                        <Link to="/notasfilho" className="menu-icon"><img className="notas" src={notas} alt="notas" /><span>Notas filho</span></Link>
                        <Link to="/vacinas" className="menu-icon"><img className="aulas" src={aulas} alt="aulas"/><span>Vacinas</span></Link>
                        <Link to="/dadosresponsavel" className="menu-icon"><img className="person" src={person} alt="meus dados"/><span>Dados Pessoais</span></Link>
                    </nav>
                </div>
           
           
            <div className="calendario">
                 <h3>Faltas</h3>
                <ul>
                {faltas.map(falta => (
                            <li key={falta._id}>
                                <span>Dia:</span>                           
                                <span>{falta.dia}</span>

                            </li>
                        ))}
                       
                </ul>
                      
                
       
         
        </div>
        </div>
        </>
    );



}