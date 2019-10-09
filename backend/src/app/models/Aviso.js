const mongoose = require('mongoose');

//Modelo do usuário
const AvisoSchema = new mongoose.Schema({
    id: Number,
    mensagem: String,
    diaCadastro: {
        type: Date,
        default: Date.now
    },
    escola_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Escola'
    }
});

//Exportar o modelo para o mongoose saber que este modelo será usado
module.exports = mongoose.model('Aviso', AvisoSchema);