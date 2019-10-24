import React, { useEffect, useState } from 'react';
import api from '../../services/api';

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
        <ul>
            {avisos.map(aviso => (
                <li key={aviso._id}>
                    {aviso.mensagem}
                    {escola.nome}
                </li>

            ))}
        </ul>
    );
}