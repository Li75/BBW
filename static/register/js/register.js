/**
 * Created by Administrator on 2016/9/29.
 */
window.onload  =function (){
   //手机号验证
    var flag=false;
    $("#phone-num").blur(function(){
        var parent=/^1[34578]\d{9}$/;
        var value=this.value.replace(/ /g, "");
        var istrue=parent.test(value);
        if(!istrue){
            $("#caution").css("display","block").find("#c-word").html("请输入11位正确的手机号码");
            flag = false;
        }else {
            $("#caution").css("display","none");
            flag = true;
        }
    });

    //随机数
    var randomNum=document.getElementById("randomNum");
    var str="";
    for(var i=0;i<4;i++){
        var isNum=parseInt(Math.random()*10);
        str +=isNum;
    }
    randomNum.innerHTML=str;
    //验证码匹配
    var codeInput=document.getElementById("codeInput");
    var text1=document.getElementById("text1");
    codeInput.onblur=function(){
        if(codeInput.value != randomNum.innerHTML){
            $("#caution").css("display","block").find("#c-word").html("验证码不一致！");
            flag = false;
        }else{
            $("#caution").css("display","none");
            flag = true;
        }
    };
    $("#randomNum").click(function(){
        var str="";
        for(var i=0;i<4;i++){
            var isNum=parseInt(Math.random()*10);
            str +=isNum;
        }
        randomNum.innerHTML=str;
    });

    //密码验证
    $("#password").blur(function(){
        var parent=/^[A-Za-z0-9.*]{6,16}$/;
        var value=this.valuereplace(/ /g, "");
        var istrue=parent.test(value);
        if(!istrue){
            $("#caution").css("display","block").find("#c-word").html("请输入6-16位字母、数字或符号");
            flag = false;
        }else {
            $("#caution").css("display","none");
            flag = true;
        }
    });
   //设置密码可见
    $(".person2").click(function () {
        if ($("#password").attr("type") == "password") {
            $("#password").attr("type", "text")
        }
        else {
            $("#password").attr("type", "password")
        }
    });
    //注册按钮
    $("#registerBtn").click(function(){
        //先获取之前保存在cookie中的用户
        var users = $.cookie("users") ? JSON.parse($.cookie("users")) : [];
        //遍历users数组, 判断是否存在该用户,如果存在则不能注册
        for(var i=0; i<users.length; i++) {
            if ( $("#phone-num").val() == users[i].name ) {
                alert("该用户已经存在, 不能注册!");
                return;
            }
        }
        if($(this).siblings("#phoneNum").find("#phone-num").val().length == 0){
            $("#caution").css("display","block").find("#c-word").html("输入不合法请重新输入！");
        }else {
            $("#caution").css("display","none");
            if(flag==true){
                var msg = {
                    name: $("#phone-num").val(), //用户名
                    pwd: $("#password").val() //密码
                }
                //存储当前登录的用户名，密码
                $.cookie("login",JSON.stringify(msg),{expires:null,path:"/"});
                $(this).find("a").attr("href","index.html");
            }else{
                alert("输入不合法，请重新输入！");
            }
        }


        //需要注册的用户(需要保存到cookie中的用户)
        var user = {
            name: $("#phone-num").val(), //用户名
            pwd: $("#password").val() //密码
        };
        users.push(user); //添加新用户

        //保存到cookie中
        $.cookie("users", JSON.stringify(users), {expires:30, path:"/"});
        console.log( $.cookie("users") );


        //保存用户名
       /* var loginUser = JSON.parse($.cookie("user"));
        var loginName = {
            name:loginUser[loginUser.length-1].name
        }
        $.cookie("loginUser",JSON.stringify(loginName),{expires:null,path:"/"})*/

    });

    //点击进入首页
    $(".logo-left").click(function () {
        console.log(0);
        location.href = "index.html";
    });
};

