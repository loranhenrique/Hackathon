const mongoose = require('mongoose');

//Modelo do usuário
const AlunoFaltasSchema = new mongoose.Schema({
    dia: {
        type: Date,
        require: true,
    },
    disciplinaProfessor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DisciplinaProfessor'
    },
    professor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Professor'
    },
    aluno_matricula: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aluno'
    },
});

//Exportar o modelo para o mongoose saber que este modelo será usado
module.exports = mongoose.model('AlunoFaltas', AlunoFaltasSchema);