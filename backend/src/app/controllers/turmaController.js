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

    const { id, nome } = req.body;
    const { series_id } = req.body;

    const series = await Series.findById(series_id);

    try {

        if (!series)
            return res.status(400).send({ error: 'Serie não existe' });

        if (await Turma.findOne({ id }))
            return res.status(400).send({ error: 'Turma ja cadastrada' })

        const turma = await Turma.create({
            id,
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

module.exports = app => app.use('/turma', router);