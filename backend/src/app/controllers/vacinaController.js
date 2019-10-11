const express = require('express');
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');

const router = express.Router();

const Vacina = require('../models/Vacina');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {

    const { id } = req.body;
    //const { aluno_matricula } = req.header;

    try{

        if(await Vacina.findOne({ id }))
            return res.status(400).send({ error: 'Vacina ja cadastrada' })

        const vacina = await Vacina.create(req.body);

        return res.send({
            vacina,
            token: generateToken({ id: vacina.id }),
        });

    }catch(err){
        return res.status(400).send({ error: 'Erro ao cadastrar a vacina' });
    }

});

router.get('/listAll', async(req,res) => {
    try{
        const resp = await Vacina.find({});
        return res.json(resp);
    }catch(err){
        console.log(err);
    }
});


module.exports = app => app.use('/vacina', router);