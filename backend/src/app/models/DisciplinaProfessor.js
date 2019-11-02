const mongoose = require('mongoose');

//Modelo do usuário
const DisciplinaProfessorSchema = new mongoose.Schema({ 
    disciplina_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Disciplina'
    },
    professor_matricula: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Professor'
    }
});

//Exportar o modelo para o mongoose saber que este modelo será usado
module.exports = mongoose.model('DisciplinaProfessor', DisciplinaProfessorSchema);