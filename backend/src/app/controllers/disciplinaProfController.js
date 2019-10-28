const express = require('express');
const jwt = require('jsonwebtoken');

const Disciplina = require('../models/Disciplina');
const Professor = require('../models/Professor');

const authConfig = require('../../config/auth');

const router = express.Router();

const DisciplinaProfessor = require('../models/DisciplinaProfessor');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {

    const { id } = req.body;
    const { disciplina_id } = req.headers;
    const { professor_id } = req.headers;

    const disciplina = await Disciplina.findById(disciplina_id);
    const professor = await Professor.findById(professor_id);

    try {

        if (!disciplina) {
            return res.status(400).send({ error: 'Disciplina não existe!' })
        }

        if (!professor) {
            return res.status(400).send({ error: 'professor não existe!' })
        }

        if (await DisciplinaProfessor.findOne({ id }))
            return res.status(400).send({ error: 'Disciplina do professor ja cadastrada' })

        const disciplinaProfessor = await DisciplinaProfessor.create({
            id,
            disciplina_id: disciplina_id,
            professor_matricula: professor_id
        });

        return res.send({
            disciplinaProfessor,
            token: generateToken({ id: disciplinaProfessor.id }),
        });

    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao cadastrar a disciplina do professor' });

    }

});
router.get('/listAll', async (req, res) => {
    try {
        const resp = await DisciplinaProfessor.find({});
        return res.json(resp);
    } catch (err) {
        console.log(err);
    }
});

module.exports = app => app.use('/disciplinaProfessor', router);