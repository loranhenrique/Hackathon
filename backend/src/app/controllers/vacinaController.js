const express = require('express');
const jwt = require('jsonwebtoken');

const Aluno = require('../models/Aluno');

const authConfig = require('../../config/auth');

const router = express.Router();

const Vacina = require('../models/Vacina');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {

    const { nome, dataVacinacao } = req.body;
    const { aluno_id } = req.body;

    const aluno = await Aluno.findById(aluno_id);

    try{

        if(!aluno)
            return res.status(400).send({ error: 'Aluno não cadastrado' });

        const vacina = await Vacina.create({            
            nome,
            dataVacinacao,
            aluno_id: aluno_id
        });

        return res.send({
            vacina,            
            token: generateToken({ id: vacina.id }),
        });

    }catch(err){
        console.log(err);
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