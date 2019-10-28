const mongoose = require('mongoose');

//Modelo do usuário
const AvisoSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true,
    },
    imgPost: {
        type: String,
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
        ref: 'Escola',
        require: true,
    }
});

AvisoSchema.virtual('imgPost_url').get(function () {
    return `http://localhost:3000/files/${this.imgPost}`
})

//Exportar o modelo para o mongoose saber que este modelo será usado
module.exports = mongoose.model('Aviso', AvisoSchema);