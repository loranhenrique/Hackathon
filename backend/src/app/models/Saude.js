const mongoose = require('mongoose')
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

//Modelo do usuário
const SaudeSchema = new mongoose.Schema({  
    altura: {
        type: SchemaTypes.Double
    },
    peso: {
        type: SchemaTypes.Double
    },
    medidaCintura: {
        type: SchemaTypes.Double
    },
    medidaQuadril: {
        type: SchemaTypes.Double
    },
    imc: {
        type: SchemaTypes.Double
    },
    aluno_matricula: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aluno'
    },
});

//Exportar o modelo para o mongoose saber que este modelo será usado
module.exports = mongoose.model('Saude', SaudeSchema);