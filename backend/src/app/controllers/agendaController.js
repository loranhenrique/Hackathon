const express = require('express');
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');

const router = express.Router();

const Agenda = require('../models/Agenda');

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

        if(await Agenda.findOne({ id }))
            return res.status(400).send({ error:'Agenda ja existe' }); 

        const agenda = await Agenda.create(req.body);

        return res.send({

            agenda,
            token: generateToken({ id: agenda.id }),

        });

    }catch(err){
        return res.status(400).send({ error: 'Erro ao criar a agenda' })
    }

});

module.exports = app => app.use('/agenda', router);