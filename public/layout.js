var socket = io("http://localhost:3000");

socket.on('Server-send-data', function(name, mess){
    
    $("#message").append("<p>"+ name + ": "+ mess +"</p>");
})
socket.on('Server-send-color', function(color){
    $("#content").css("background-color", color);
})

$("#mrA").click(function() {
        
        let name = $("#ten").val();
        let mess = $("#mes").val();
        
        if (name=='' || mess=='') {
            alert('vui long nhap ten va noi dung chat')
        } else {
            $("#message").append("<p class='right'>"+ mess +"<br></p>");
            socket.emit("Client-send-data", name, mess);
        }
        
})

function Doimau(color) {
    socket.emit("Color-data", color);
}

$(document).ready(function() {
    
    

    
})


//chat box
var username = [];
var id = [];
var uname;
var userStat = false;
function dangky(){
    uname = $('#usernameLogin').val();
    if (uname == '') {
        alert("vui lòng nhập tên");
    } else {
        $('#username').text(uname);
        $('#loginForm').toggle();
        $('#chatForm').toggle();
        userStat = true;
        socket.emit("Client-user-reg", uname);
        socket.emit('Client-username-send', uname);
    }
}
socket.on('Server-send-arr', function(data){
    $("#message").html('');
    data.forEach(function(user){
        $("#message").append("<p>"+ user +"</p>");
    })
})

function thoat() {
    $('#loginForm').toggle();
    $('#chatForm').toggle();
    userStat = false;
    username = [];
    id = [];
    $("#msgbox").html('');
    socket.emit('Client-chat-logout');
}

function sendMsg() {
    let mess = $("#msgText").val();
    
    if (mess=='') {
        alert('vui lòng nhập nội dung');
    } else {
        $("#msgbox").prepend("<p class='right'>"+ mess +"<br></p>");
        socket.emit("Client-send-msg", mess);

        $("#msgText").val('');
    }
}
$("#msgText").on('keydown', function(e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        $("#btnSend").click();
    }
})

socket.on('Server-send-msg', function(user, mess){
    if (userStat) {
        $("#msgbox").prepend("<p>"+ user + ": "+ mess +"</p>");
    }
})



function updateOnl() {
    $("#danhsach").html('');
    for (let i = 0; i<username.length; i++) {
        $("#danhsach").append("<p>"+ username[i] + "<br></p>");
    }
}
socket.on('Server-send-online', function (userid, user){
    if (userStat) {
        username.push(user);
        id.push(userid);
        updateOnl();
        if (socket.id != userid) {
            updateOnl();
            socket.emit('Client-up-online', uname, userid);
        }
    }
})
socket.on('Server-logout-chat-info', function(userid){
    if (userStat) {
        let i = id.indexOf(userid);
        if (i != -1) {
            username.splice(i,1);
            id.splice(i,1);
            updateOnl();
        }
    } 
})
socket.on('Server-send-up-onl', function(userid,user){
    username.push(user);
    id.push(userid);
    updateOnl();
})