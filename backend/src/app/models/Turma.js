const mongoose = require('mongoose');

//Modelo do usuário
const TurmaSchema = new mongoose.Schema({
    id: Number,
    nome: String,
    series_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Series'
    }
});

//Exportar o modelo para o mongoose saber que este modelo será usado
module.exports = mongoose.model('Turma', TurmaSchema);