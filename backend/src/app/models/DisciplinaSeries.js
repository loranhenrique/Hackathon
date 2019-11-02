const mongoose = require('mongoose');

//Modelo do usuário
const DisciplinaSeriesSchema = new mongoose.Schema({
    disciplina_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Disciplina'
    },
    series_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Series'
    }
});

//Exportar o modelo para o mongoose saber que este modelo será usado
module.exports = mongoose.model('DisciplinaSeries', DisciplinaSeriesSchema);