const express = require('express');
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');

const router = express.Router();

const Aluno = require('../models/Aluno');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req,res) => {

    const { id } = req.body;
    //const { aluno_matricula } = req.header;
    //const { professor_matricula } = req.header; 

    try{

        if(await Aluno.findOne({ id }))
            return res.status(400).send({ error:'Aluno ja existe' }); 

        const aluno = await Aluno.create(req.body);

        return res.send({

            aluno,
            token: generateToken({ id: aluno.id }),

        });

    }catch(err){
        return res.status(400).send({ error: 'Erro o perfil do aluno' })
    }

});

module.exports = app => app.use('/aluno', router);
