const express = require('express');
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');

const router = express.Router();

const Notas = require('../models/AlunoNotas');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {

    const { id } = req.body;
    //const { disciplina_professor_id } = req.header;
    //const { aluno_matricula } = req.header;

    try{

        if(await Notas.findOne({ id }))
            return res.status(400).send({ error: 'Nota ja cadastrada' })

        const notas = await Faltas.create(req.body);

        return res.send({
            notas,
            token: generateToken({ id: notas.id }),
        });

    }catch(err){
        return res.status(400).send({ error: 'Erro ao cadastrar as notas' });
    }

});

module.exports = app => app.use('/notas', router);