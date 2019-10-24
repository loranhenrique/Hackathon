const express = require('express');
const jwt = require('jsonwebtoken');

const Escola = require('../models/Escola');

const authConfig = require('../../config/auth');

const router = express.Router();

const Series = require('../models/Series');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {

    const { id, nome, ano, semestre } = req.body;
    const { escola_id } = req.headers;

    const escola = await Escola.findById(escola_id);

    try{

        if(!escola)
            return res.status(400).send({ error: 'Escola não existe' });

        if(await Series.findOne({ id }))
            return res.status(400).send({ error: 'Serie ja cadastrada' })

        const series = await Series.create({
            id,
            nome,
            ano,
            semestre,
            escola_id: escola_id
        });

        return res.send({
            series,          
            token: generateToken({ id: series.id }),
        });

    }catch(err){
        return res.status(400).send({ error: 'Erro ao cadastrar a serie' });
    }

});

router.get('/listAll', async(req,res) => {
    try{
        const resp = await Series.find({});
        return res.json(resp);
    }catch(err){
        console.log(err);
    }
});

router.post('/listSerie', async(req,res) => {
    const { _id } = req.body;
    try{
        const resp = await Series.findOne({ _id }).populate('escola_id')
        return res.json(resp);
    }catch(err){
        console.log(err);
    }
});


module.exports = app => app.use('/series', router);