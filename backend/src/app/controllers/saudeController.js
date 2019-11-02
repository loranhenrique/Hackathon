const express = require('express');
const jwt = require('jsonwebtoken');

const Aluno = require('../models/Aluno');

const authConfig = require('../../config/auth');

const router = express.Router();

const Saude = require('../models/Saude');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {

    const { altura, peso, medidaCintura, medidaQuadril, imc } = req.body;
    const { aluno_id } = req.body;

    const aluno = await Aluno.findById(aluno_id);

    try{

        if(!aluno)
            return res.status(400).send({ error: 'Aluno não cadastrado' })

        const saude = await Saude.create({        
            altura,
            peso,
            medidaCintura,
            medidaQuadril,
            imc,
            aluno_id: aluno_id
        });

        return res.send({
            saude,
            token: generateToken({ id: saude.id }),
        });

    }catch(err){
        return res.status(400).send({ error: 'Erro ao cadastrar a saude' });
    }

});

router.get('/listAll', async(req,res) => {
    try{
        const resp = await Saude.find({});
        return res.json(resp);
    }catch(err){
        console.log(err);
    }
});


module.exports = app => app.use('/saude', router);