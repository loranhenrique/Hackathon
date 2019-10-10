const mongoose = require('mongoose');

//Modelo do usuário
const AlunoFaltasSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true,
    },
    dia: {
        type: Date,
        require: true,
    },
    disciplina_professor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DisciplinaProfessor'
    },
    aluno_matricula: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aluno'
    },
});

//Exportar o modelo para o mongoose saber que este modelo será usado
module.exports = mongoose.model('AlunoFaltas', AlunoFaltasSchema);