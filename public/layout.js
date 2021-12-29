var user;
var userStat = fasle;
function dangky(){
    user = $('#usernameLogin').val();
    if (user == '') {
        alert("vui lòng nhập tên");
    } else {
        $('#username').text(user);
        $('#loginForm').toggle();
        $('#chatForm').toggle();
        userStat = true;
    }
}

function thoat() {
    $('#loginForm').toggle();
    $('#chatForm').toggle();
    userStat = false;
}