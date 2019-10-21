const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const authConfig = require('../../config/auth');

const Responsavel = require('../models/Responsavel');

const router = express.Router();

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {
    const { matricula } = req.body;

    try{

        if(await Responsavel.findOne({ matricula }))
            return res.status(400).send({ error: 'Responsavel ja existe' });

        const responsavel = await Responsavel.create(req.body);

        responsavel.senha = undefined;

        return res.send({

            responsavel,
            token: generateToken({ id: responsavel.id }),

        });

    }catch(err){
        return res.status(400).send({ error: 'Cadastro falhou' });
    }
});



router.post('/authenticate', async (req,res) => {
    const { matricula, senha } = req.body;

    const responsavel = await Responsavel.findOne({ matricula }).select('+senha');

    if(!responsavel)
        return res.status(400).json({ error: 'Usuario nao encontrado' });
    
    if(!await bcrypt.compare(senha, responsavel.senha))
        return res.status(400).json({ error: 'Senha invalida'});
    
    responsavel.senha = undefined;

    res.json({
        responsavel,
        token: generateToken({ id: responsavel.id }),
    });
});

router.post('/forgot_password', async (req, res) => {
    const { email } = req.body;

    try{

        const responsavel = await Responsavel.findOne({ email });

        if(!responsavel) 
            return res.status(400).send({ error: 'Usuario nao encontrado' });

        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);

        await Responsavel.findByIdAndUpdate(responsavel.id, {
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
        const responsavel = await Responsavel.findOne({ email })
        .select('+senhaResetToken senhaResetExpires');

        if(!responsavel)
            return res.status(400).send({ error: 'Usuario nao existe' });

        if(token !== responsavel.senhaResetToken)
            return res.status(400).send({ error: 'Token invalido' });

            const now = new Date();

        if( now > responsavel.senhaResetExpires)
            return res.status(400).send({ error: 'Token expirado, gere um novo' });

        responsavel.senha = senha;

        await responsavel.save();

        res.send();

    }catch(err){
        res.status(400).send({ error: 'não pode redefinir a senha, tente novamente' });
    }
});

router.get('/listAll', async(req,res) => {
    try{
        const resp = await Responsavel.find({});
        return res.json(resp);
    }catch(err){
        console.log(err);
    }
});


module.exports = app => app.use('/responsavel', router);