const express = require('express');
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');

const Escola = require('../models/Escola');

const router = express.Router();

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {
    const { id } = req.body;
    
    try{
        if(await Escola.findOne({ id }))
            return res.status(400).send({ error:'Escola ja existe' }); 

        const escola = await User.create(req.body);

        escola.senha = undefined;

        return res.send({
            escola,
            token: generateToken({ id: escola.id }),
        });
        
    }catch(err){
        return res.status(400).send({ error: 'cadastro falhou'});
    }
});

module.exports = app => app.use('/escola', router);