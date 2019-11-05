import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import './styles.css';

export default function FeedProfessor() {
    return (
        <>
                <div className="menu">
                        <Link to="/CadastrarFrequencia" className="Frequencia"><span>Cadastrar Frequências</span></Link>                        
                        <Link to="/CadastrarNotas" className="Notas"><span>Cadastrar Notas</span></Link>                       
                </div>
        </>
    );
}