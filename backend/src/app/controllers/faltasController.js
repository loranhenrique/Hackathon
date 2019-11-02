const express = require('express');
const jwt = require('jsonwebtoken');

const Professor = require('../models/Professor');
const DisciplinaProfessor = require('../models/DisciplinaProfessor');
const Aluno = require('../models/Aluno');

const authConfig = require('../../config/auth');

const router = express.Router();

const Faltas = require('../models/AlunoFaltas');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {
    const { dia } = req.body;
    const { professor_id } = req.headers;
    const { disciplinaProfessor_id } = req.body;
    const { aluno_id } = req.headers;

    const professor = await Professor.findById(professor_id);

    const disciplinaProfessor = await DisciplinaProfessor.findById(disciplinaProfessor_id);

    const aluno = await Aluno.findById(aluno_id);

    try{

        if(!disciplinaProfessor)
        return res.status(400).send({ error: 'Disciplina do professor não existe!' })

        if(!professor){
            return res.status(400).send({ error: 'Professor não existe!' })
        }

        if(!aluno){
            return res.status(400).send({ error: 'Aluno não existe!' })
        }    

        const faltas = await Faltas.create({           
            dia,
            professor_id: professor_id,
            disciplinaProfessor_id: disciplinaProfessor_id,
            aluno_matricula: aluno_id
        });

        return res.send({
            faltas,           
            token: generateToken({ id: faltas.id }),
        });

    }catch(err){
        console.log(err);
        return res.status(400).send({ error: 'Erro ao cadastrar as faltas' });
    }

});

router.get('/listAll', async(req,res) => {
    try{           
        const resp = await Faltas.find({});
        return res.json(resp);
    }catch(err){
        console.log(err);
    }
});

router.get('/faltasaluno', async(req,res) => {
    try{
        const { aluno_id } = req.headers;
        let faltas = await Faltas.find({ aluno_matricula: aluno_id});        
        return res.json(faltas);

    }catch(err){
        return res.status(400).send({ error: 'Erro ao buscar as faltas do aluno'});
    }
});

module.exports = app => app.use('/faltas', router);