const mongoose = require('mongoose');

const ComentarioSchema  = new mongoose.Schema(
    {
        comentario : {
            type : String,
            required : true,
        },
        post : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Aviso',
        },
        autor : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Aluno',
        },
    },
    {
        timestamps : true
    },
    );

    module.exports = mongoose.model('Comentario',ComentarioSchema);