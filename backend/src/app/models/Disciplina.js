const mongoose = require('mongoose');

//Modelo do usuário
const DisciplinaSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true,
    },
    nome: {
        type: String,
        require: true,
    },
});

//Exportar o modelo para o mongoose saber que este modelo será usado
module.exports = mongoose.model( 'Disciplina', DisciplinaSchema);