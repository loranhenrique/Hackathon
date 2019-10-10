const express = require('express');
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');

const router = express.Router();

const Avisos = require('../models/Aviso');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {

    const { id } = req.body;
    //const { escola_id } = req.header;


    try{

        if(await Avisos.findOne({ id }))
            return res.status(400).send({ error: 'Aviso ja cadastrado' })

        const avisos = await Avisos.create(req.body);

        return res.send({
            avisos,
            token: generateToken({ id: avisos.id }),
        });

    }catch(err){
        return res.status(400).send({ error: 'Erro ao cadastrar os avisos' });
    }

});

module.exports = app => app.use('/avisos', router);