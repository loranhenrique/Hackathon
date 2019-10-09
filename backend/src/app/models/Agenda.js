const mongoose = require('mongoose');

//Modelo do usuário
const AgendaSchema = new mongoose.Schema({
    id: Number,
    dia: Date,
    assunto: String,
    tipo: String,
    arquivo: String,
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