const express = require('express');
const jwt = require('jsonwebtoken');

const DisciplinaProfessor = require('../models/DisciplinaProfessor');
const Aluno = require('../models/Aluno');

const authConfig = require('../../config/auth');

const router = express.Router();

const Notas = require('../models/AlunoNotas');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {

    const { nota } = req.body;
    const { disciplinaProfessor_id } = req.body;
    const { aluno_id } = req.body;

    const disciplinaProfessor = await DisciplinaProfessor.findById(disciplinaProfessor_id);
    const aluno = await Aluno.findById(aluno_id);


    try {

        if (!disciplinaProfessor)
            return res.status(400).send({ error: 'Disciplina do professor inexistente' });

        if (!aluno)
            return res.status(400).send({ error: 'Aluno inexistente' });

        const notas = await Notas.create({            
            nota,
            disciplinaProfessor_id: disciplinaProfessor_id,
            aluno_matricula: aluno_id
        });

        return res.send({
            notas,
            token: generateToken({ id: notas.id }),
        });

    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao cadastrar as notas' });
    }

});

router.get('/listAll', async (req, res) => {
    try {
        const resp = await Notas.find({}).populate("disciplinaProfessor_id");
        return res.json(resp);
    } catch (err) {
        console.log(err);
    }
});

router.get('/notasAluno', async (req, res) => {
    try {
        const { aluno_id } = req.headers;
        const resp = await Notas.find({ aluno_matricula: aluno_id }).populate("disciplinaProfessor_id");
        console.log(resp);
        return res.json(resp);
    } catch (err) {
        console.log(err);
    }
});

router.get('/notasAlunoFilho', async (req, res) => {
    try {
        const { responsavel_id } = req.headers;
        let alunos = await Aluno.find({ responsavel_id });  
        console.log(alunos);     
        let notas = await Notas.find({ aluno_matricula: alunos._id});    
       
        return res.json(notas);
    } catch (err) {
        console.log(err);
    }
});

module.exports = app => app.use('/notas', router);