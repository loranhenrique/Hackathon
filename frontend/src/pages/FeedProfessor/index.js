import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import './styles.css';

export default function FeedProfessor() {
    return (
        <>
            <div className="corpo_pagina">
                <div className="menu">
                    <nav className="menu-navigation">
                        <Link to="/CadastrarFrequencia" className="menu-icon"><span>Cadastrar Notas</span></Link>                        
                        <Link to="/CadastrarFaltas" className="menu-icon"><span>Cadastrar Frequências</span></Link>                       
                      
                    </nav>
                </div>

            </div>
        </>
    );
}