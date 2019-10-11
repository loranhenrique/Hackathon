const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const authConfig = require('../../config/auth');

const Escola = require('../models/Escola');

const router = express.Router();

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {
    const { matricula } = req.body;
    
    try{
        if(await Escola.findOne({ matricula }))
            return res.status(400).send({ error:'Escola ja existe' }); 

        const escola = await Escola.create(req.body);

        escola.senha = undefined;

        return res.send({
            escola,
            token: generateToken({ id: escola.id }),
        });
        
    }catch(err){
        console.log(err);
        return res.status(400).send({ error: 'cadastro falhou'});
    }
});

router.post('/authenticate', async (req,res) => {
    const { matricula, senha } = req.body;

    const escola = await Escola.findOne({ matricula }).select('+senha');

    if(!escola)
        return res.status(400).send({ error: 'Usuario nao encontrado' });
    
    if(!await bcrypt.compare(senha, escola.senha))
        return res.status(400).send({ error: 'Senha invalida'});
    
    escola.senha = undefined;

    res.send({
        escola,
        token: generateToken({ id: escola.id }),
    });
});

router.get('/listAll', async(req,res) => {
    try{           
    const resp = await Escola.find({});
return res.json(resp);
    }catch(err){
        console.log(err);
    }
});

module.exports = app => app.use('/escolas', router);