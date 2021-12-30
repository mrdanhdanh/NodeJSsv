const { render } = require('ejs');
var express = require('express');
var app = express();

app.use(express.static("./public"));
app.set('view engine', 'ejs');
app.set('views', "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

io.on('connection', function(socket){

    console.log('co nguoi ket noi' + socket.id);

    socket.on('disconnect', function(){
        console.log(socket.id + 'ngat ket noi');
    });

    socket.on('Client-send-data', function(name, mess){
        socket.broadcast.emit('Server-send-data', name, mess);
    })

    socket.on('Color-data', function(color){
        io.sockets.emit('Server-send-color', color);
    })

    //chat box
    socket.on('Client-send-msg', function(mess){
       
        socket.broadcast.emit('Server-send-msg', username, mess);
    })
    var username;
    socket.on('Client-user-reg', function(user){
        username = user;
        io.sockets.emit('Server-send-online', socket.id, username);
    })
    socket.on('Client-up-online', function(user, forid){
        io.sockets.in(forid).emit('Server-send-up-onl', socket.id, user)
    })
    socket.on('Client-chat-logout', function(){
        io.sockets.emit('Server-logout-chat-info', socket.id);
    })


})

app.get("/", function(req, res){
    res.render("trangchu");
});