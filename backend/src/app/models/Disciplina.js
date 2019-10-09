const mongoose = require('mongoose');

//Modelo do usuário
const DisciplinaSchema = new mongoose.Schema({
    id: Number,
    nome: String,
});

//Exportar o modelo para o mongoose saber que este modelo será usado
module.exports = mongoose.model( 'Disciplina', DisciplinaSchema);