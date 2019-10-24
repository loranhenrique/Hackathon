import React,{useEffect,useState} from 'react';
import api from '../../services/api';

export default function Feed(){
    const [avisos,setAvisos] = useState([]);

    useEffect(()=>{
        async function loadAvisos(){
            const aluno_id = localStorage.getItem('aluno');
            console.log(aluno_id);
            const response = await api.get('/avisos/EscolaAviso',{headers:{aluno_id}});
            setAvisos(response.data);
        }
        loadAvisos();
    },[]);

    return (
        <>
        <ul>
           {avisos.map(aviso =>(
               <li>
                   <span>{aviso.mensagem}</span>
                   <span>{aviso.escola_id}</span>
               </li>
              
           ))} 
        </ul>
        </>
    );
}