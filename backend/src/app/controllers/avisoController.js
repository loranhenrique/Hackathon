const express = require('express');
const UploadConfig = require('../../config/upload');
const Escola = require('../models/Escola');
const Turma = require('../models/Turma');
const Serie = require('../models/Series');
const Aluno = require('../models/Aluno');
const multer = require('multer');
const router = express.Router();
const upload = multer(UploadConfig);
const Avisos = require('../models/Aviso');

router.post('/registerSemImagem', async (req, res) => {
    const { mensagem } = req.body;
    const { escola_id } = req.body;

    const escola = await Escola.findById(escola_id);


    try {

        if (!escola) {
            return res.status(400).send({ error: 'Escola não existe!' })
        }

      

        const avisos = await Avisos.create({          
          
            mensagem,
            escola_id: escola_id

        });


        await avisos.populate('escola_id').execPopulate();
        await Escola.findByIdAndUpdate({_id : escola_id},{$push:{avisos : avisos.id}});
        return res.json(avisos);

    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao cadastrar os avisos' });
    }

});

router.post('/register',upload.single('image'), async (req, res) => {

    
    const { filename } = req.file;
    const { mensagem } = req.body;
    const { escola_id } = req.headers;

    const escola = await Escola.findById(escola_id);


    try {

        if (!escola) {
            return res.status(400).send({ error: 'Escola não existe!' })
        }

      

        const avisos = await Avisos.create({            
            imgPost: filename,
            mensagem,
            escola_id: escola_id

        });


        await avisos.populate('escola_id').execPopulate();
        await Escola.findByIdAndUpdate({_id : escola_id},{$push:{avisos : avisos.id}});
        return res.json(avisos);

    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao cadastrar os avisos' });
    }

});

    router.get('/listAll', async(req,res) => {
        try{          
        const resp = await Avisos.find({});
        return res.json(resp);
    } catch (err) {
        console.log(err);
    }
});

router.get('/EscolaAviso', async (req, res) => {
    const { aluno_id } = req.headers;
    let user = await Aluno.findOne({ _id: aluno_id });
    let turma = await Turma.findOne({ _id: user.turma_id });
    let serie = await Serie.findOne({ _id: turma.series_id });
    let escola = await Escola.findOne({ _id: serie.escola_id });
    let avisos = await Avisos.find({ escola_id: escola._id });

    return res.json(avisos);

});

router.get('/AvisoEscola', async (req, res) =>{
    const { escola_id } = req.headers;
    let avisos = await Avisos.find({ escola_id: escola_id});

    return res.json(avisos);
});

module.exports = app => app.use('/avisos', router);