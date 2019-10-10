const express = require('express');
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');

const router = express.Router();

const DisciplinaProfessor = require('../models/DisciplinaProfessor');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {

    const { id } = req.body;
    //const { disciplina_id } = req.header;
    //const { professor_matricula } = req.header;

    try{

        if(await DisciplinaProfessor.findOne({ id }))
            return res.status(400).send({ error: 'Disciplina do professor ja cadastrada' })

        const disciplinaProfessor = await DisciplinaProfessor.create(req.body);

        return res.send({
            disciplinaProfessor,
            token: generateToken({ id: disciplinaProfessor.id }),
        });

    }catch(err){
        return res.status(400).send({ error: 'Erro ao cadastrar a disciplina do professor' });
    }

});

module.exports = app => app.use('/disciplinaProfessor', router);