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

    const { dia, assunto, tipo, arquivo } = req.body;
    const { aluno_matricula } = req.headers;
    const { professor_id } = req.headers; 

    const aluno = await Aluno.findById(aluno_matricula);
    const professor = await Professor.findById(professor_id);

    try{

        if(!aluno)
            return res.status(400).send({ error: 'Aluno não existe' });

        if(!professor)
            return res.status(400).send({ error: 'Professor não existe' });

        const agenda = await Agenda.create({            
            dia,
            assunto,
            tipo,
            arquivo,
            aluno_matricula: aluno_matricula,
            professor_id: professor_id
        });

        return res.send({

            agenda,           
            token: generateToken({ id: agenda.id }),

        });

    }catch(err){
        return res.status(400).send({ error: 'Erro ao criar a agenda' })
    }

});
//rota para buscar todos os dados da agenda controller
router.get('/listAll', async(req,res) => {
    try{           
      const resp = await Agenda.find({});
        return res.json(resp);
    }catch(err){
        console.log(err);
    }
});

router.get('/agendaAluno', async(req,res) => {
    try{
        const { aluno_matricula } = req.headers;
        let agenda = await Agenda.find({ aluno_matricula: aluno_matricula});        
        return res.json(agenda);

    }catch(err){
        return res.status(400).send({ error: 'Erro ao buscar a agenda do aluno'});
    }
});

module.exports = app => app.use('/agenda', router);