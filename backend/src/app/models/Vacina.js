const mongoose = require('mongoose');

//Modelo do usuário
const VacinaSchema = new mongoose.Schema({
    id: Number,
    nome: String,
    dataVacinacao: Date,
    aluno_matricula: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aluno'
    }
});

//Exportar o modelo para o mongoose saber que este modelo será usado
module.exports = mongoose.model('Vacina', VacinaSchema);