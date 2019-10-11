const express = require('express');
const jwt = require('jsonwebtoken');

const Disciplina = require('../models/Disciplina');
const Serie = require('../models/Series');

const authConfig = require('../../config/auth');

const router = express.Router();

const DisciplinaSeries = require('../models/DisciplinaSeries');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {

    const { id } = req.body;
    const { disciplina_id } = req.body;
    const { series_id } = req.body;

    const disciplina = await Disciplina.findById(disciplina_id);
    const series = await Serie.findById(series_id);

    try{

        if(!disciplina)
            return res.status(400).send({ error: 'Disciplina não existe' })
            
        if(!series)
            return res.status(400).send({ error: 'Series não existe' })

        if(await DisciplinaSeries.findOne({ id }))
            return res.status(400).send({ error: 'Disciplina dessa serie ja cadastrada' })

        const disciplinaSeries = await DisciplinaSeries.create({
            id,
            disciplina: disciplina_id,
            series: series_id
        });

        return res.send({
            disciplinaSeries,
            disciplina,
            series,
            token: generateToken({ id: disciplinaSeries.id }),
        });

    }catch(err){
        return res.status(400).send({ error: 'Erro ao cadastrar a disciplina dessa serie' });
    }

});
router.get('/listAll', async(req,res) => {
    try{           
    const resp = await DisciplinaSeries.find({});
return res.json(resp);
    }catch(err){
        console.log(err);
    }
});

module.exports = app => app.use('/disciplinaSeries', router);