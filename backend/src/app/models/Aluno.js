const mongoose = require('mongoose');

//Modelo do usuário
const AlunoSchema = new mongoose.Schema({
    matricula: Number,
    nome: String,
    telefone: String,
    email: String,
    dataNasc: Date,
    senha: String,
    situacao: String,
    responsavel_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Responsavel'
    },
    turma_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Turma'
    }
});

//Exportar o modelo para o mongoose saber que este modelo será usado
module.exports = mongoose.model('Aluno', AlunoSchema);