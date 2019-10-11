const express = require('express');
const jwt = require('jsonwebtoken');

const Aluno = require('../models/Aluno');
const Professor = require('../models/Professor');

const authConfig = require('../../config/auth');

const router = express.Router();

const Agenda = require('../models/Agenda');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req,res) => {

    const { id, dia, assunto, tipo, arquivo } = req.body;
    const { aluno_id } = req.headers;
    const { professor_id } = req.headers; 

    const aluno = await Aluno.findById(aluno_id);
    const professor = await Professor.findById(professor_id);

    try{

        if(!aluno)
            return res.status(400).send({ error: 'Aluno não existe' });

        if(!professor)
            return res.status(400).send({ error: 'Professor não existe' });

        if(await Agenda.findOne({ id }))
            return res.status(400).send({ error:'Agenda ja existe' }); 

        const agenda = await Agenda.create({
            id,
            dia,
            assunto,
            tipo,
            arquivo,
            aluno: aluno_id,
            professor: professor_id
        });

        return res.send({

            agenda,
            aluno,
            professor,
            token: generateToken({ id: agenda.id }),

        });

    }catch(err){
        return res.status(400).send({ error: 'Erro ao criar a agenda' })
    }

});

module.exports = app => app.use('/agenda', router);