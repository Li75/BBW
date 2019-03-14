
window.onload  =function (){
    $("#loginBtn").click(function(){
        //获取cookie中注册过的所有用户
        var users = $.cookie("users");
        if (users) {
            users = JSON.parse(users);
            //遍历查找是否有匹配的用户
            var isExist = false; //表示是否存在该用户
            for (var i=0; i<users.length; i++) {
                if ( $("#phone-num").val() == users[i].name && $("#phone-num").val() != 0 && $("#password").val() == users[i].pwd ) {
                    alert("登录成功!");

                    var msg = {
                        name: $("#phone-num").val(), //用户名
                        pwd: $("#password").val() //密码
                    }
                    //存储当前登录的用户名，密码
                    $.cookie("login",JSON.stringify(msg),{expires:null,path:"/"});


                    $(this).find("a").attr("href","index.html");

                    isExist = true; //表示存在该用户
                }
            }
            if (!isExist) {
                alert("用户名或密码错误!");
            }
        }
    })
    //点击进入首页
    $(".logo-left").click(function () {
        console.log(0);
        location.href = "index.html";
    });
};