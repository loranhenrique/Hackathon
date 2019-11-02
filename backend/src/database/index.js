const mongoose = require('mongoose');



mongoose.connect('mongodb+srv://hackasenai:hackasenai@cluster0-xsrgs.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);


module.exports = mongoose;

