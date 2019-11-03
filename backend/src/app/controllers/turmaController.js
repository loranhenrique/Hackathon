const express = require('express');
const jwt = require('jsonwebtoken');

const Series = require('../models/Series');

const authConfig = require('../../config/auth');

const router = express.Router();

const Turma = require('../models/Turma');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {

    const { nome } = req.body;
    const { series_id } = req.body;

    const series = await Series.findById(series_id);

    try {

        if (!series)
            return res.status(400).send({ error: 'Serie não existe' });
    

        const turma = await Turma.create({            
            nome,
            series_id: series_id
        });

        return res.send({
            turma,
            token: generateToken({ id: turma.id }),
        });

    } catch (err) {
        return res.status(400).send({ error: 'Erro ao cadastrar a turma' });
    }

});
router.get('/listAll', async (req, res) => {
    try {
        const resp = await Turma.find({});
        return res.json(resp);
    } catch (err) {
        console.log(err);
    }
});

router.get('/list', async (req, res) => {
    try {
        const {_id} = req.body;
        const resp = await Turma.findOne({_id});
        return res.json(resp);
    } catch (err) {
        console.log(err);
    }
});

module.exports = app => app.use('/turma', router);