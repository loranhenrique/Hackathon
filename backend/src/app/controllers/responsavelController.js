const express = require('express');
const jwt = require('jsonwebtoken');

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

module.exports = app => app.use('/responsavel', router);