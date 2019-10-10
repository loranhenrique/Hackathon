const express = require('express');
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');

const router = express.Router();

const Turma = require('../models/Turma');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {

    const { id } = req.body;
    //const { series_id } = req.header;

    try{

        if(await Turma.findOne({ id }))
            return res.status(400).send({ error: 'Turma ja cadastrada' })

        const turma = await Turma.create(req.body);

        return res.send({
            turma,
            token: generateToken({ id: turma.id }),
        });

    }catch(err){
        return res.status(400).send({ error: 'Erro ao cadastrar a turma' });
    }

});

module.exports = app => app.use('/turma', router);