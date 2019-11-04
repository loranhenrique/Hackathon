

import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
//importando imagens que será usada no menu como logo
import home from '../../assets/home.png';
import calendario from '../../assets/calendario.png';
import notas from '../../assets/notas.png';
import aulas from '../../assets/aulas_quadro.png';    
import person from '../../assets/person.png';
import escola_icon from '../../assets/escola.png';
import api from '../../services/api';



export default function CalendarioAluno(){

    const [dados, setDados] = useState([]);
    const [responsavel,setResponsavel] = useState([]);
    const [escola,setEscola] = useState([]);
    useEffect(() => {
        async function loadAvisos() {
            const aluno_id = localStorage.getItem('aluno');
           
            const response = await api.get('/aluno/list', {headers: { _id : aluno_id }});  
            
            const {turma_id} = response.data;
            const serie = await api.get('/series/listSerie',{headers:{_id:turma_id.series_id}});
          
                    
            setDados(response.data);
            setResponsavel(response.data.responsavel_id);
            setEscola(serie.data.escola_id);
        }
        loadAvisos();
    }, []);

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
            <div className="dadosAluno">
                <h3>Dados Pessoais</h3>
               <label>Matrícula: <span>{dados.matricula}</span></label><br></br>
               <label>Nome:<span>{dados.nome}</span></label><br></br>
               <label>E-mail: <span>{dados.email}</span></label><br></br>
               <label>Telefone: <span>{dados.telefone}</span></label><br></br>
              
               <h3>Dados do Responsável</h3>
               <label>Nome: <span>{responsavel.nome}</span></label><br></br>
               <label>Telefone:<span>{responsavel.telefone}</span></label><br></br>
               <label>E-mail: <span>{responsavel.email}</span></label><br></br>
               <label>Endereço: <span>{responsavel.logradouro + ", " + responsavel.cidade + " - " + responsavel.municipio}</span></label><br></br>
               
               <h3>Dados da Escola</h3>
               <label>Nome: <span>{responsavel.nome}</span></label><br></br>
               <label>Telefone:<span>{responsavel.telefone}</span></label><br></br>
               <label>Endereço: <span>{escola.endereco + ", "+  escola.bairro + " - " + escola.municipio}</span></label><br></br>
            </div>
         
        </div>
        </>
    );



}