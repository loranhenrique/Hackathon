import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

//importando imagens que será usada no menu como logo
import home from '../../assets/home.png';
import calendario from '../../assets/calendario.png';
import notas from '../../assets/notas.png';
import aulas from '../../assets/aulas_quadro.png';
import person from '../../assets/person.png';
import escola_icon from '../../assets/escola.png';



export default function FeedResponsavel() {
    const [avisos, setAvisos] = useState([]);
    const [escola, setEscola] = useState('');

    useEffect(() => {
        async function loadAvisos() {
            const aluno_id = localStorage.getItem('aluno');

            const response = await api.get('/avisos/EscolaAviso', { headers: { aluno_id } });
            const escolaDoresponse = response.data[0].escola_id + "";

            const Escolas = await api.get('/escolas/list', { headers: { _id: escolaDoresponse } });

            setEscola(Escolas.data);
            setAvisos(response.data);
        }
        loadAvisos();
    }, []);

    return (
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
            
                <div className="posts">
                    <ul className="feed_post">
                        {avisos.map(aviso => (
                            <li key={aviso._id}>
                                 <h5>{aviso.mensagem}</h5>                                  
                                 {aviso.imgPost != undefined &&
                                  <img style={{ backgroundImage: `url(${aviso.image})`}}></img> 
                              }                                                              
                                <span>{escola.nome}</span>
                            </li>

                        ))}
                    </ul>
                </div>

            </div>
        </>
    );
}