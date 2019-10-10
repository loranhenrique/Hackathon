const express = require('express');
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');

const Professor = require('../models/Professor');

const router = express.Router();

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {
    const { id } = req.body;

    try{

        if(await Professor.findOne({ id }))
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

module.exports = app => app.use('/professor', router);