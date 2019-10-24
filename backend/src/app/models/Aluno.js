const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Modelo do usuário
const AlunoSchema = new mongoose.Schema({
    matricula: {
        type: Number,
        require: true,
    },
    nome: {
        type: String,
        require: true,
    },
    telefone: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    dataNasc: {
        type: Date,
        require:true,
    },
    senha: {
        type: String,
        require: true,
        select: false,
    },
    situacao: {
        type: String,
    },
    senhaResetToken:{
        type: String,
        select: false,
    },
    senhaResetExpires: {
        type: Date,
        select: false,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    responsavel_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Responsavel',
        required: true,
    },
    turma_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Turma',
        required: true,
    }
});

AlunoSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;
    
    next();
});

//Exportar o modelo para o mongoose saber que este modelo será usado
module.exports = mongoose.model('Aluno', AlunoSchema);