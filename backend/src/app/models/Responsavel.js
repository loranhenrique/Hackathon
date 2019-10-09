const mongoose = require('mongoose');

//Modelo do usuário
const ResponsavelSchema = new mongoose.Schema({
    id: Number,
    nome: String,
    telefone: String,
    email: String,
    senha: String,
    logradouro: String,
    bairro: String,
    municipio: String,
    cidade: String,
    cep: String,
});

//Exportar o modelo para o mongoose saber que este modelo será usado
module.exports = mongoose.model('Responsavel', ResponsavelSchema);