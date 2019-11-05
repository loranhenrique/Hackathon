const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const mailer = require('../../modules/mailer');

const Responsavel = require('../models/Responsavel');
const Turma = require('../models/Turma');

const authConfig = require('../../config/auth');

const router = express.Router();

const Aluno = require('../models/Aluno');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {

    const { matricula, nome, telefone, email, dataNasc, senha, situacao } = req.body;
    const { responsavel_id } = req.body;
    const { turma_id } = req.body;

    const responsavel = await Responsavel.findById(responsavel_id);
    const turma = await Turma.findById(turma_id);

    try {

        if (!responsavel)
            return res.status(400).json({ error: 'Responsavel não existe' });

        if (!turma)
            return res.status(400).json({ error: 'Turma não existe' });

        if (await Aluno.findOne({ matricula }))
            return res.status(400).json({ error: 'Aluno ja existe' });

        const aluno = await Aluno.create({
            matricula,
            nome,
            telefone,
            email,
            dataNasc,
            senha,
            situacao,
            responsavel_id: responsavel_id,
            turma_id: turma_id,
        });

        return res.json({

            aluno,
            token: generateToken({ id: aluno.id }),

        });

    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: 'Erro o perfil do aluno' })
    }

});

router.post('/authenticate', async (req, res) => {
    const { matricula, senha } = req.body;

    const aluno = await Aluno.findOne({ matricula }).select('+senha');

    if (!aluno)
        return res.status(400).json({ error: 'Aluno nao encontrado' });

    if (!await bcrypt.compare(senha, aluno.senha))
        return res.status(400).json({ error: 'Senha invalida' });

    aluno.senha = undefined;

    res.json({
        aluno,
        token: generateToken({ id: aluno.id }),
    });
});

router.post('/forgot_password', async (req, res) => {
    const { email } = req.body;

    try {

        const aluno = await Aluno.findOne({ email });

        if (!aluno)
            return res.status(400).send({ error: 'Usuario nao encontrado' });

        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);

        await Aluno.findByIdAndUpdate(aluno.id, {
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
        }, (err) => {
            if (err)
                return res.status(400).send({ error: 'Cannot send forgot password email' });

            return res.send();
        })
    } catch (err) {
        res.status(400).send({ error: 'Erro ao esquecer a senha, tente novamente' });
    }
});

router.post('/reset_password', async (req, res) => {

    const { email, token, senha } = req.body;

    try {
        const aluno = await Aluno.findOne({ email })
            .select('+senhaResetToken senhaResetExpires');

        if (!aluno)
            return res.status(400).send({ error: 'Usuario nao existe' });

        if (token !== aluno.senhaResetToken)
            return res.status(400).send({ error: 'Token invalido' });

        const now = new Date();

        if (now > aluno.senhaResetExpires)
            return res.status(400).send({ error: 'Token expirado, gere um novo' });

        aluno.senha = senha;

        await aluno.save();

        res.send();

    } catch (err) {
        res.status(400).send({ error: 'não pode redefinir a senha, tente novamente' });
    }
});


router.get('/listAll', async (req, res) => {
    try {
        const resp = await Aluno.find({});
        return res.json(resp);
    } catch (err) {
        console.log(err);
    }
});
/*trocar o post por get, deixei assim pq não sei onde esta sendo usada */
    router.post('/listAluno', async(req,res) => {
        const { matricula } = req.body;

        try{           
            const aluno = await Aluno.findOne({ matricula }).populate('responsavel_id').populate('turma_id').populate('serie_id');
            return res.json(aluno);
        }catch(err){
            console.log(err);
        }
    });

    router.post('/listAlunoResponsavel', async(req,res) => {
        const { responsavel_id } = req.body;

        try{           
            const aluno = await Aluno.find({ responsavel_id });
            return res.json(aluno);
        }catch(err){
            console.log(err);
        }
    });

    router.get('/list', async(req,res) => {
        const { _id } = req.headers;

        try{           
            const aluno = await Aluno.findOne({ _id }).populate('responsavel_id').populate('turma_id');
            return res.json(aluno);
        }catch(err){
            console.log(err);
        }
    });

module.exports = app => app.use('/aluno', router);
