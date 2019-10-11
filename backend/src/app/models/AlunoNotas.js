const mongoose = require('mongoose')
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

//Modelo do usuário
const AlunoNotasSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true,
    },
    nota: {
        type: SchemaTypes.Double
    },
    disciplinaProfessor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DisciplinaProfessor'
    },
    aluno_matricula: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aluno'
    },
});

//Exportar o modelo para o mongoose saber que este modelo será usado
module.exports = mongoose.model('AlunoNotas', AlunoNotasSchema);