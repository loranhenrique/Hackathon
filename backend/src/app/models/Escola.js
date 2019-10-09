const mongoose = require('mongoose');

//Modelo do usuário
const EscolaSchema = new mongoose.Schema({
    id: Number,
    nome: String,
    senha: String,
    endereco: String,
    bairro: String,
    municipio: String,
    municipio: String,
    estado: String,
    cep: String,
});

//Exportar o modelo para o mongoose saber que este modelo será usado
module.exports = mongoose.model('Escola', EscolaSchema);