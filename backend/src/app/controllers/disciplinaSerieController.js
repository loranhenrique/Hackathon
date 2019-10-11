const express = require('express');
const jwt = require('jsonwebtoken');

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
    //const { disciplina_id } = req.header;
    //const { series_id } = req.header;

    try{

        if(await DisciplinaSeries.findOne({ id }))
            return res.status(400).send({ error: 'Disciplina dessa serie ja cadastrada' })

        const disciplinaSeries = await DisciplinaSeries.create(req.body);

        return res.send({
            disciplinaSeries,
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