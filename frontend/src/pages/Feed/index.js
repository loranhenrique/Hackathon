import React,{useState,useEffect} from 'react';
import api from '../../services/api';
export default function Feed(){

    const [avisos,setAvisos] = useState([]);
    const [agendas,setAgenda] = useState([]);

    useEffect(()=>{
        async function carregaAvisos(){
        const response = await api.get('/avisos/listAll');
        //console.log(response);
        setAvisos(response.data);
        }
        carregaAvisos();
    },[]);

    useEffect(()=>{
        async function carregarAgenda(){
            const response = await api.get('agenda/listAll');
            setAgenda(response.data);
        }
        carregarAgenda();
    },[]);




    return(
        <>
        <ul className="aviso-list">
            {avisos.map(aviso => (
                <li key={aviso._id}>
                    <span>{aviso.mensagem}</span>
                    <span>{aviso.escola}</span>

                </li>
            ))}
        </ul>
        <ul className="agenda-list">
            {agendas.map(agenda => (
                <li key={agenda._id}>
                    <span>{agenda.assunto}</span>                   
                    
                </li>
            ))}
        </ul>
        </>
    )
}
