const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const authConfig = require('../../config/auth');

const Professor = require('../models/Professor');

const router = express.Router();

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {
    const { matricula } = req.body;

    try{

        if(await Professor.findOne({ matricula }))
            return res.status(400).send({ error: 'Professor ja existente' });

        const professor = await Professor.create(req.body);

        professor.senha = undefined;

        return res.send({
            professor,
            token: generateToken({ id: professor.id }),
        });

    }catch(err){
        return res.status(400).send({ error: 'Cadastro falhou' });
    }
});

router.post('/authenticate', async (req,res) => {
    const { matricula, senha } = req.body;

    const professor = await Professor.findOne({ matricula }).select('+senha');

    if(!professor)
        return res.status(400).send({ error: 'Usuario nao encontrado' });
    
    if(!await bcrypt.compare(senha, professor.senha))
        return res.status(400).send({ error: 'Senha invalida'});
    
    professor.senha = undefined;

    res.send({
        professor,
        token: generateToken({ id: professor.id }),
    });
});

module.exports = app => app.use('/professor', router);