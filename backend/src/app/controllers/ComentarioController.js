const Comentario = require('../models/Comentario');
const Post = require('../models/Aviso');
const Aluno = require('../models/Aluno');
const Professor = require('../models/Professor');
const Escola = require('../models/Escola');
const Responsavel = require('../models/Responsavel');
const express = require('express');
const router = express.Router();

     /**
      * 
      * Criando um novo comentario
      */
    router.post('/register', async (req, res) => {
        const {comentario} = req.body;
        const {post_id} = req.headers;
        const {autor_id} = req.headers;
        const {tipoLogin} = req.body; // esse tipo de login será responsável para saber em qual usuario o comentario deva ser salvo

        const newComentario = await new Comentario({
            comentario,
            autor:autor_id,
            post : post_id,
        }).save();

        if(tipoLogin == "aluno"){
            //colocando o comentario na coleção da post referênciado
            await Post.findByIdAndUpdate({_id:post_id},{$push:{comentarios : newComentario.id}});
            //colocando o comentario na coleção do úsuario logado
            await Aluno.findByIdAndUpdate({_id:autor_id},{$push:{comentarios : newComentario.id}});
        }
        if(tipoLogin == "professor"){
            //colocando o comentario na coleção da post referênciado
            await Post.findByIdAndUpdate({_id:post_id},{$push:{comentarios : newComentario.id}});
            //colocando o comentario na coleção do úsuario logado
            await Professor.findByIdAndUpdate({_id:autor_id},{$push:{comentarios : newComentario.id}});
        }
        if(tipoLogin == "escola"){
             //colocando o comentario na coleção da post referênciado
             await Post.findByIdAndUpdate({_id:post_id},{$push:{comentarios : newComentario.id}});
             //colocando o comentario na coleção do úsuario logado
             await Responsavel.findByIdAndUpdate({_id:autor_id},{$push:{comentarios : newComentario.id}});
        }
       
        
        return res.json(newComentario);
    });

    router.delete('/deleteComentario', async (req,res) => {
        const {_id} = req.headers;
        const {tipoLogin} = req.body;
        const comentario = await Comentario.findByIdAndRemove(_id);

        if(tipoLogin == "aluno"){
            // Delete comentariorios da coleção usuario
            await Aluno.findByIdAndRemove(
                { _id: comentario.autor },
                { $pull: { comentarios: comentario.id } }
            );
            // Delete comentarios da coleção post
            await Post.findOneAndUpdate(
                { _id: comentario.post },
                { $pull: { comentarios: comentario.id } }
            );

        }
        if(tipoLogin == "professor"){
            // Delete comentariorios da coleção usuario
            await Professor.findByIdAndRemove(
                { _id: comentario.autor },
                { $pull: { comentarios: comentario.id } }
            );
            // Delete comentarios da coleção post
            await Post.findOneAndUpdate(
                { _id: comentario.post },
                { $pull: { comentarios: comentario.id } }
            );
      
        }
        if(tipoLogin == "escola"){
            // Delete comentariorios da coleção usuario
            await Escola.findByIdAndRemove(
                { _id: comentario.autor },
                { $pull: { comentarios: comentario.id } }
            );
            // Delete comentarios da coleção post
            await Post.findOneAndUpdate(
                { _id: comentario.post },
                { $pull: { comentarios: comentario.id } }
            );      
        }
       
        return  res.json(comentario);
      });

      router.post('/listaCometario', async (req,res) => {
        const coments = await Comentario.find({});
        return res.json(coments);
      });
    
      module.exports = app => app.use('/comentario', router);
