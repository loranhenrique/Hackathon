const express = require('express');
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');

const router = express.Router();

const Faltas = require('../models/AlunoFaltas');

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

        if(await Faltas.findOne({ id }))
            return res.status(400).send({ error: 'Falta ja cadastrada' })

        const faltas = await Faltas.create(req.body);

        return res.send({
            faltas,
            token: generateToken({ id: faltas.id }),
        });

    }catch(err){
        return res.status(400).send({ error: 'Erro ao cadastrar as faltas' });
    }

});

module.exports = app => app.use('/faltas', router);