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

    

    const { id, dia } = req.body;
    const { professor_id } = req.headers;
    const { disciplinaProfessor_id } = req.headers;
    const { aluno_id } = req.headers;

    const professor = await Professor.findById(professor_id);


    const disciplinaProfessor = await DisciplinaProfessor.findById(disciplinaProfessor_id);

    

    const aluno = await Aluno.findById(aluno_id);

    try{

        if(!professor){
            return res.status(400).send({ error: 'Professor não existe!' })
        }

        if(!aluno){
            return res.status(400).send({ error: 'Aluno não existe!' })
        }

        if(await Faltas.findOne({ id }))
            return res.status(400).send({ error: 'Falta ja cadastrada' })

        const faltas = await Faltas.create({
            id,
            dia,
            professor: professor_id,
            disciplinaProfessor: disciplinaProfessor_id,
            aluno: aluno_id
        });

        return res.send({
            faltas,
            professor,
            disciplinaProfessor,
            aluno,
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

module.exports = app => app.use('/faltas', router);