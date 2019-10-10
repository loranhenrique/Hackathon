const mongoose = require('mongoose');

//Modelo do usuário
const AgendaSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true,
    },
    dia: {
        type: Date,
        require: true,
    },
    assunto: {
        type: String,
        require: true,
    },  
    tipo: {
        type: String,
    },
    arquivo: {
        type: String,
    },
    aluno_matricula: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aluno'
    },
    professor_matricula: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Professor'
    }
});

//Exportar o modelo para o mongoose saber que este modelo será usado
module.exports = mongoose.model('Agenda', AgendaSchema);