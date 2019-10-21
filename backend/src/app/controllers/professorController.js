const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const authConfig = require('../../config/auth');

const Professor = require('../models/Professor');

const router = express.Router();

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {
    const { matricula } = req.body;

    try{

        if(await Professor.findOne({ matricula }))
            return res.status(400).send({ error: 'Professor ja existente' });

        const professor = await Professor.create(req.body);

        professor.senha = undefined;

        return res.send({
            professor,
            token: generateToken({ id: professor.id }),
        });

    }catch(err){
        return res.status(400).send({ error: 'Cadastro falhou' });
    }
});

router.post('/authenticate', async (req,res) => {
    const { matricula, senha } = req.body;

    const professor = await Professor.findOne({ matricula }).select('+senha');

    if(!professor)
        return res.status(400).json({ error: 'Usuario nao encontrado' });
    
    if(!await bcrypt.compare(senha, professor.senha))
        return res.status(400).json({ error: 'Senha invalida'});
    
    professor.senha = undefined;

    res.json({
        professor,
        token: generateToken({ id: professor.id }),
    });
});

router.post('/forgot_password', async (req, res) => {
    const { email } = req.body;

    try{

        const professor = await Professor.findOne({ email });

        if(!professor) 
            return res.status(400).send({ error: 'Usuario nao encontrado' });

        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);

        await Professor.findByIdAndUpdate(professor.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        });

        mailer.sendMail({
            to: email,
            from: 'loran@gmail.com.br',
            template: 'auth/forgot_password',
            context: { token },
        }, (err) =>{
            if(err)
            return res.status(400).send({ error: 'Cannot send forgot password email' });

        return res.send();
        })
    }catch(err){
        res.status(400).send({ error: 'Erro ao esquecer a senha, tente novamente' });
    }
});

router.post('/reset_password', async (req, res) => {

    const { email, token, senha } = req.body;

    try{
        const professor = await Professor.findOne({ email })
        .select('+senhaResetToken senhaResetExpires');

        if(!professor)
            return res.status(400).send({ error: 'Usuario nao existe' });

        if(token !== professor.senhaResetToken)
            return res.status(400).send({ error: 'Token invalido' });

            const now = new Date();

        if( now > professor.senhaResetExpires)
            return res.status(400).send({ error: 'Token expirado, gere um novo' });

        professor.senha = senha;

        await professor.save();

        res.send();

    }catch(err){
        res.status(400).send({ error: 'não pode redefinir a senha, tente novamente' });
    }
});

router.get('/listAll', async(req,res) => {
    try{           
        const resp = await Professor.find({});
        return res.json(resp);
    }catch(err){
        console.log(err);
    }
});

module.exports = app => app.use('/professor', router);