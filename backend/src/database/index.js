const mongoose = require('mongoose');



mongoose.connect('mongodb+srv://teste_bd:testebd@hackthon-y3yoc.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);


module.exports = mongoose;

