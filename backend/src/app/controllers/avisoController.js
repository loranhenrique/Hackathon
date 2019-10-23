const express = require('express');
const jwt = require('jsonwebtoken');

const Escola = require('../models/Escola');

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
    const { mensagem } = req.body;
    const { escola_id } = req.headers;

    const escola = await Escola.findById(escola_id);


    try{

        if(!escola){
            return res.status(400).send({ error: 'Escola não existe!' })
        }

        if(await Avisos.findOne({ id }))
            return res.status(400).send({ error: 'Aviso ja cadastrado' })
            
        const avisos = await Avisos.create({
            id,
            mensagem,
            escola: escola_id
        });

        await Avisos.populate('escola_id').execPopulate();
        return res.send({
            avisos,
            escola,
            token: generateToken({ id: avisos.id }),
        });

    }catch(err){
        console.log(err);
        return res.status(400).send({ error: 'Erro ao cadastrar os avisos' });
    }

});

    router.get('/listAll', async(req,res) => {
        try{           
        const resp = await Avisos.find({});
        return res.json(resp);
        }catch(err){
            console.log(err);
        }
    });

module.exports = app => app.use('/avisos', router);