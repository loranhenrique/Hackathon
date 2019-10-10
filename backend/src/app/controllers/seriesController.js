const express = require('express');
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');

const router = express.Router();

const Series = require('../models/Series');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {

    const { id } = req.body;
    //const { escola_id } = req.header;

    try{

        if(await Series.findOne({ id }))
            return res.status(400).send({ error: 'Serie ja cadastrada' })

        const series = await Series.create(req.body);

        return res.send({
            series,
            token: generateToken({ id: series.id }),
        });

    }catch(err){
        return res.status(400).send({ error: 'Erro ao cadastrar a serie' });
    }

});

module.exports = app => app.use('/series', router);