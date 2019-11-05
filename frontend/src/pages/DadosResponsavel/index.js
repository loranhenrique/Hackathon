

import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
//import './styles.css';
//importando imagens que será usada no menu como logo
import home from '../../assets/home.png';
import calendario from '../../assets/calendario.png';
import notas from '../../assets/notas.png';
import aulas from '../../assets/aulas_quadro.png';    
import person from '../../assets/person2.png';
import escola_icon from '../../assets/escola.png';
import api from '../../services/api';



export default function DadosResponsavel(){

  
    const [dados,setDados] = useState([]);

    useEffect(() => {
        async function loadAvisos() {
            const responsavel_id = localStorage.getItem('responsavel');
            console.log(responsavel_id);
            const response = await api.get('/responsavel/list',{headers:{_id:responsavel_id}});         
         
            setDados(response.data[0]);
          
          
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
                        <Link to="/notasfilho" className="menu-icon"><img className="notas" src={notas} alt="notas" /><span>Notas filho</span></Link>
                        <Link to="/vacinas" className="menu-icon"><img className="aulas" src={aulas} alt="aulas"/><span>Vacinas</span></Link>
                        <Link to="/dadosresponsavel" className="menu-icon"><img className="person" src={person} alt="meus dados"/><span>Dados Pessoais</span></Link>
                    </nav>
            </div>
           
            <div className="dadosAluno">
            <fieldset class="ConjuntodeCampos">
                  
                <h3>Dados Pessoais</h3>
             
               <label>Nome:<span>{dados.nome}</span></label><br></br>
               <label>E-mail: <span>{dados.email}</span></label><br></br>
               <label>Telefone: <span>{dados.telefone}</span></label><br></br>
               <label>Logradouro: <span>{dados.logradouro}</span></label><br></br>
               <label>bairro: <span>{dados.bairro}</span></label><br></br>
               <label>Cidade: <span>{dados.cidade}</span></label><br></br>
               </fieldset>
            </div>
        
                      
        </div>
    </>
    );

    

}