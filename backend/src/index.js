const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname,'../../frontend/public')));
app.set('views',path.join(__dirname,'../../frontend/public'));
app.engine('html',require('ejs').renderFile);
app.set('view engine','html');
app.use('/chat',(req,res) =>{
    res.render('chat.html');
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/files', express.static(path.resolve(__dirname,'..','uploads')));
require('./app/controllers/index')(app);

let messages = [];
//criando a parte de conexão ponto a ponto com um novo cliente
io.on('connection',socket =>{

    console.log(`socket conectado ${socket.id}`);

    //pega todas as mensagens antigas e coloca no chat
    socket.emit('previousMessage',messages);

    socket.on('sendMessage',data =>{
        messages.push(data);
        socket.broadcast.emit('receivedMessage',data);
    });
});
server.listen(3000);