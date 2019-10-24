import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './style.css';
//importando imagens que será usada no menu como logo
import home from '../../assets/home.png';
import calendario from '../../assets/calendario.png';
export default function Feed() {
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
        <div >
            <nav className="menu-navigation-icons">
                <Link to="#" className="menu-icon"><img className="" src={home} alt="home"/><span>Inicio</span></Link>
                <Link to="#" className="menu-icon"><img className="" src={calendario}/><span></span></Link>
                <Link to="#" className="menu-icon"><i className=""></i><span></span></Link>
                <Link to="#" className="menu-icon"><i className=""></i><span></span></Link>
                <Link to="#" className="menu-icon"><i className=""></i><span></span></Link>
                <Link to="#" className="menu-icon"><i className=""></i><span></span></Link>
            </nav>
        </div>
        <div>
        <ul>
            {avisos.map(aviso => (
                <li key={aviso._id}>
                    {/*aviso.mensagem*/}
                    {/*escola.nome*/}
                </li>

            ))}
        </ul>
        </div>
        </>
    );
}