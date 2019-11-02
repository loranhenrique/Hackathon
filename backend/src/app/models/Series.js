const mongoose = require('mongoose');

//Modelo do usuário
const SeriesSchema = new mongoose.Schema({ 
    nome: {
        type: String,
        require: true,
    },
    ano: {
        type: Number,
        require: true,
    },
    semestre: {
        type: Number,
        require: true,
    },
    escola_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Escola'
    }
});

//Exportar o modelo para o mongoose saber que este modelo será usado
module.exports = mongoose.model('Series', SeriesSchema);