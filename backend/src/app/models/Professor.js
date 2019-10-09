const mongoose = require('mongoose');

//Modelo do usuário
const ProfessorSchema = new mongoose.Schema({
    id: Number,
    nome: String,
    senha: String,
});

//Exportar o modelo para o mongoose saber que este modelo será usado
module.exports = mongoose.model( 'Professor', ProfessorSchema);