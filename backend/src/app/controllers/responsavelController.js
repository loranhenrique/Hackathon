const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const authConfig = require('../../config/auth');

const Responsavel = require('../models/Responsavel');

const router = express.Router();

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {
    const { id } = req.body;

    try{

        if(await Responsavel.findOne({ id }))
            return res.status(400).send({ error: 'Responsavel ja existe' });

        const responsavel = await Responsavel.create(req.body);

        responsavel.senha = undefined;

        return res.send({

            responsavel,
            token: generateToken({ id: responsavel.id }),

        });

    }catch(err){
        return res.status(400).send({ error: 'Cadastro falhou' });
    }
});

router.post('/authenticate', async (req,res) => {
    const { matricula, senha } = req.body;

    const responsavel = await Responsavel.findOne({ matricula }).select('+senha');

    if(!responsavel)
        return res.status(400).send({ error: 'Usuario nao encontrado' });
    
    if(!await bcrypt.compare(senha, responsavel.senha))
        return res.status(400).send({ error: 'Senha invalida'});
    
    responsavel.senha = undefined;

    res.send({
        responsavel,
        token: generateToken({ id: responsavel.id }),
    });
});

module.exports = app => app.use('/responsavel', router);