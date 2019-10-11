const mongoose = require('mongoose');

//Modelo do usuário
const VacinaSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true,
    },
    nome: {
        type: String,
        require: true,
    },
    dataVacinacao: {
        type: Date,
        require: true,
    },
    aluno_matricula: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aluno'
    },
});

//Exportar o modelo para o mongoose saber que este modelo será usado
module.exports = mongoose.model('Vacina', VacinaSchema);