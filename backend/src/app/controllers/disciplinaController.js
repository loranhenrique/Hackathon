const express = require('express');
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');

const router = express.Router();

const Disciplina = require('../models/Disciplina');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {

    const { id } = req.body;

    try{

        if(await Disciplina.findOne({ id }))
            return res.status(400).send({ error: 'Disciplina ja cadastrada' })

        const disciplina = await Disciplina.create(req.body);

        return res.send({
            disciplina,
            token: generateToken({ id: disciplina.id }),
        });

    }catch(err){
        return res.status(400).send({ error: 'Erro ao cadastrar a disciplina' });
    }

});
router.get('/list', async(req,res)=>{
    try{
        const {disciplina_id} = req.headers;
        const resp = await Disciplina.findOne({_id : disciplina_id});
        return res.json(resp);

    }catch(err){
        console.log(err);
        return res.json(err);
    }
});
router.get('/listAll', async(req,res) => {
    try{           
    const resp = await Disciplina.find({});
return res.json(resp);
    }catch(err){
        console.log(err);
    }
});
module.exports = app => app.use('/disciplina', router);