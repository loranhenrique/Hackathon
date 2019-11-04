const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Modelo do usuário
const ProfessorSchema = new mongoose.Schema({
    matricula: {
        type: Number,
        require: true,
    },
    nome: {
        type: String,
        require: true,
    },
    senha: {
        type: String,
        require: true,
        select: false,
    },
    escola_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Escola'
    },
    senhaResetToken:{
        type: String,
        select: false,
    },
    senhaResetExpires: {
        type: Date,
        select: false,
    },
    comentarios :[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comentario',
    }],
    createdAt:{
        type: Date,
        default: Date.now,
    },
});

ProfessorSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;
    
    next();
});

//Exportar o modelo para o mongoose saber que este modelo será usado
module.exports = mongoose.model( 'Professor', ProfessorSchema);