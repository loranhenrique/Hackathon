const mongoose = require('mongoose');

//Modelo do usuário
const AvisoSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true,
    },
    mensagem: {
        type: String,
        require: true,
    },
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