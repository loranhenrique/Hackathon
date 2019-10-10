const express = require('express');
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');

const router = express.Router();

const Saude = require('../models/Saude');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {

    const { id } = req.body;
    //const { aluno_matricula } = req.header;

    try{

        if(await Saude.findOne({ id }))
            return res.status(400).send({ error: 'Saude ja cadastrada' })

        const saude = await Saude.create(req.body);

        return res.send({
            saude,
            token: generateToken({ id: saude.id }),
        });

    }catch(err){
        return res.status(400).send({ error: 'Erro ao cadastrar a saude' });
    }

});

module.exports = app => app.use('/saude', router);