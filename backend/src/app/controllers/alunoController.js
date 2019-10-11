const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Responsavel = require('../models/Responsavel');
const Turma = require('../models/Turma');

const authConfig = require('../../config/auth');

const router = express.Router();

const Aluno = require('../models/Aluno');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req,res) => {

    const { matricula, nome, telefone, email, dataNasc, senha, situacao } = req.body;
    const { responsavel_id } = req.headers;
    const { turma_id } = req.headers; 

    const responsavel = await Responsavel.findById(responsavel_id);
    const turma = await Turma.findById(turma_id);

    try{

        if(!responsavel)
            return res.status(400).send({ error: 'Responsavel não existe' });
            
        if(!turma)
        return res.status(400).send({ error: 'Turma não existe' });

        if(await Aluno.findOne({ matricula }))
            return res.status(400).send({ error:'Aluno ja existe' }); 

        const aluno = await Aluno.create({
            matricula,
            nome,
            telefone,
            email,
            dataNasc,
            senha,
            situacao,
            responsavel: responsavel_id,
            turma: turma_id
        });

        return res.send({

            aluno,
            responsavel,
            turma,
            token: generateToken({ id: aluno.id }),

        });

    }catch(err){
        console.log(err);
        return res.status(400).send({ error: 'Erro o perfil do aluno' })
    }

});

router.post('/authenticate', async (req,res) => {
    const { matricula, senha } = req.body;

    const aluno = await Aluno.findOne({ matricula }).select('+senha');

    if(!aluno)
        return res.status(400).send({ error: 'Aluno nao encontrado' });
    
    if(!await bcrypt.compare(senha, aluno.senha))
        return res.status(400).send({ error: 'Senha invalida'});
    
    aluno.senha = undefined;

    res.send({
        aluno,
        token: generateToken({ id: aluno.id }),
    });
});

    router.get('/listAll', async(req,res) => {
        try{           
        const resp = await Aluno.find({});
    return res.json(resp);
        }catch(err){
            console.log(err);
        }
    });

module.exports = app => app.use('/aluno', router);
