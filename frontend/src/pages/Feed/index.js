import React, { useEffect, useState } from 'react';
import api from '../../services/api';

export default function Feed() {

    const [avisos, setAvisos] = useState([]);
    useEffect(() => {
        async function loadAvisos() {
            const response = await api.get('/avisos/listAll');
            setAvisos(response.data);
        }
        loadAvisos();

    }, []);

    return (
        <>
            <ul className="">
                {avisos.map(aviso => (
                    <li key={aviso._id}>
                        <span>{aviso.mensagem}</span>
                    </li>
                ))}
            </ul>
        </>
    );
}