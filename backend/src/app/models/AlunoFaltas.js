const mongoose = require('mongoose');

//Modelo do usuário
const AlunoFaltasSchema = new mongoose.Schema({
    id: Number,
    dia: Date,
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