const express = require('express');
const jwt = require('jsonwebtoken');

const DisciplinaProfessor = require('../models/DisciplinaProfessor');
const Aluno = require('../models/Aluno');

const authConfig = require('../../config/auth');

const router = express.Router();

const Notas = require('../models/AlunoNotas');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {

    const { id, nota } = req.body;
    const { disciplinaProfessor_id } = req.body;
    const { aluno_id } = req.body;

    const disciplinaProfessor = await DisciplinaProfessor.findById(disciplinaProfessor_id);
    const aluno = await Aluno.findById(aluno_id);


    try{

        if(!disciplinaProfessor)
            return res.status(400).send({ error: 'Disciplina do professor inexistente' });

        if(!aluno)
            return res.status(400).send({ error: 'Aluno inexistente' });

        if(await Notas.findOne({ id }))
            return res.status(400).send({ error: 'Nota ja cadastrada' })

        const notas = await Notas.create({
            id,
            nota,
            disciplinaProfessor: disciplinaProfessor_id,
            aluno: aluno_id
        });

        return res.send({
            notas,
            disciplinaProfessor,
            aluno,
            token: generateToken({ id: notas.id }),
        });

    }catch(err){
        console.log(err);
        return res.status(400).send({ error: 'Erro ao cadastrar as notas' });
    }

});

router.get('/listAll', async(req,res) => {
    try{           
        const resp = await Notas.find({});
        return res.json(resp);
    }catch(err){
        console.log(err);
    }
});

module.exports = app => app.use('/notas', router);