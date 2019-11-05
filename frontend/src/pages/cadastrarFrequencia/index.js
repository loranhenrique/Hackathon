import React, { useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';


//import './styles.css';

export default function CadastrarFrequencia({ history }) {
    const [dia, setDia] = useState('');
    const [professor, setProfessor] = useState('');
    const [disciplinaProfessor, setDisciplinaProfessor] = useState('');
    const [aluno, setAluno] = useState('');
   


    async function handleSubmit(event) {
        event.preventDefault();
        
    
        const response = await api.post('/faltas/register', { dia,disciplinaProfessor_id:disciplinaProfessor,headers : {professor_id:localStorage.getItem('professor'), aluno_id : aluno}});

        console.log(response);

        history.push('/FeedProfessor');
    }

    return (
        <>
            <div className="backCadastrarFaltas">
                <div className="contentCadastrarFrequencia" align="center">
                   

                    <form onSubmit={handleSubmit}>

                    <fieldset class="ConjuntodeCampos">
                    <legend class="escolha">Dados Para Cadastro de Faltas</legend>

                        <input type="text"
                            id="dia"
                            placeholder="Dia"
                            value={dia}
                            onChange={event => setDia(event.target.value)}
                        />
                        <input type="text"
                            id="disciplina"
                            placeholder="Disciplina"
                            value={disciplinaProfessor}
                            onChange={event => setDisciplinaProfessor(event.target.value)}
                        />
                        <input type="text"
                            id="Aluno"
                            placeholder="Id Aluno"
                            value={aluno}
                            onChange={event => setAluno(event.target.value)}
                        />
                                            
                        <button type="submit" className="btnConfirmar">CONFIRMAR</button>
                        <Link to="/FeedProfessor"><button type="submit" className="btnVoltar">VOLTAR</button></Link>
                        
                        </fieldset>
                    </form>
                </div>
                </div>
        </>
    );
}