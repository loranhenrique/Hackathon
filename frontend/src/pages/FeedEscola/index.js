import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import aulas from '../../assets/aulas_quadro.png';
import calendario from '../../assets/calendario.png';
import camera from '../../assets/camera.svg';
import escola_icon from '../../assets/escola.png';
import escola2 from '../../assets/escola2.png';

//importando imagens que será usada no menu como logo
import home from '../../assets/home2.png';
import notas from '../../assets/notas.png';
import api from '../../services/api';
import './styles.css';

export default function FeedEscola() {
    const [imgPost, setImgPost] = useState(null);
    const [avisos, setAvisos] = useState([]);
    const [escola, setEscola] = useState('');
    const [mensagem, setMensagem] = useState('');

    async function handleSubmit(){
        const data = new FormData();
        const escola_id = localStorage.getItem('escolas');

        data.append('image', imgPost);
        data.append('mensagem', mensagem);

            await api.post('/avisos/register', data, {
                headers: { escola_id}
            })
        
    }

    const preview = useMemo(() => {
        return imgPost ? URL.createObjectURL(imgPost) : null;
      }, [imgPost])

    useEffect(() => {
        async function loadAvisos() {
            const escola_id = localStorage.getItem('escolas');

            const response = await api.get('/avisos/AvisoEscola', { headers: { escola_id } });
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
                        <div className="corS"><Link to="/feedEscola" className="menu-icon"><img className="" src={home} alt="home" /><span>Inicio</span></Link></div>
                        <Link to="/criarContaProfessor" className="menu-icon"><img className="" src={calendario}  alt="calendario"/><span>Professores</span></Link>
                        <Link to="/criarcontaresponsavel" className="menu-icon"><img className="notas" src={notas} alt="notas" /><span>Responsaveis</span></Link>
                        <Link to="/criarcontaaluno" className="menu-icon"><img className="aulas" src={aulas} alt="aulas"/><span>Alunos</span></Link>
                    </nav>
                </div>
           
                <div className="campo-texto">
                    <div className="campo-texto2">
                    <img className="icon" src={escola2} alt= {escola.nome} />
                    {/*Começa o formulario para adicionar novo aviso*/}
                    <form onSubmit={handleSubmit}>
                    <input type="Text"
                            id="aviso_com_foto"
                            placeholder="Add a post"
                            value={mensagem}
                            onChange={event => setMensagem(event.target.value)}
                    />
                     <button className="novo-aviso">Publicar</button> 
                    <label 
                        id="foto" 
                        style={{ backgroundImage: `url(${preview})` }}
                        className={imgPost ? 'has-foto' : ''}
                    >
                              
                        <input type="file" onChange={event => setImgPost(event.target.files[0])} />
                        <img src={camera} alt="Select img" />
                    </label>
                    </form> 



                    </div>
                </div>                
                <div className="posts">
                    <ul className="feed_post">
                        {avisos.map(aviso => (
                            <li key={aviso._id}>
                                <img className="icon" src={escola2} alt= {escola.nome} />
                                <span> {escola.nome}</span>
                                 <h5>{aviso.mensagem}</h5>                               
                                <img style={{ backgroundImage: `url(${aviso.image})`}}></img>             
                            </li>

                        ))}
                    </ul>
                </div>          
            </div>
        </>
    );
}