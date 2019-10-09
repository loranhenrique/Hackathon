const mongoose = require('mongoose');

//Modelo do usuário
const SeriesSchema = new mongoose.Schema({
    id: Number,
    nome: String,
    ano: Number,
    semestre: Number,
    escola_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Escola'
    }
});

//Exportar o modelo para o mongoose saber que este modelo será usado
module.exports = mongoose.model('Series', SeriesSchema);