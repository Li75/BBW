/**
 * Created by Administrator on 2016/9/29.
 */
// $(function () {
//
//    //手机号验证
//     var flag=false;
//     $("#phone-num").blur(function(){
//         var parent=/^1[34578]\d{9}$/;
//         var value=this.value.replace(/ /g, "");
//         var istrue=parent.test(value);
//         if(!istrue){
//             $("#caution").css("display","block").find("#c-word").html("请输入11位正确的手机号码");
//             flag = false;
//         }else {
//             $("#caution").css("display","none");
//             flag = true;
//         }
//     });
//
//     $('#password').blur(function () {
//             alert('hhh')
//             var reg = /^[a-zA-Z\d_]{6}$/
//             if (reg.test($(this).val())){
//                 $('#pwdNum span').html('密码可以使用').removeClass('err').addClass('success')
//             } else {
//                 $('#pwdNum span').html('请输入正确的密码!').removeClass('success').addClass('err')
//             }
//         })
//
//
//
//
//     //密码验证
//     // $("#password").blur(function(){
//     //     var parent=/^[A-Za-z0-9.*]{6,16}$/;
//     //     var value=this.value.replace(/ /g, "");
//     //     var istrue=parent.test(value);
//     //     if(!istrue){
//     //         $("#caution").css("display","block").find("#c-word").html("请输入6-16位字母、数字或符号");
//     //         flag = false;
//     //     }else {
//     //         $("#caution").css("display","none");
//     //         flag = true;
//     //     }
//     // });
//
//     //注册按钮
//     $("#registerBtn").click(function(){
//         //先获取之前保存在cookie中的用户
//         var users = $.cookie("users") ? JSON.parse($.cookie("users")) : [];
//         //遍历users数组, 判断是否存在该用户,如果存在则不能注册
//         for(var i=0; i<users.length; i++) {
//             if ( $("#phone-num").val() == users[i].name ) {
//                 alert("该用户已经存在, 不能注册!");
//                 return;
//             }
//         }
//         if($(this).siblings("#phoneNum").find("#phone-num").val().length == 0){
//             $("#caution").css("display","block").find("#c-word").html("输入不合法请重新输入！");
//         }else {
//             $("#caution").css("display","none");
//             if(flag==true){
//                 var msg = {
//                     name: $("#phone-num").val(), //用户名
//                     pwd: $("#password").val() //密码
//                 }
//                 //存储当前登录的用户名，密码
//                 $.cookie("login",JSON.stringify(msg),{expires:null,path:"/"});
//                 $(this).find("a").attr("href","index.html");
//             }else{
//                 alert("输入不合法，请重新输入！");
//             }
//         }
//
//
//         //需要注册的用户(需要保存到cookie中的用户)
//         var user = {
//             name: $("#phone-num").val(), //用户名
//             pwd: $("#password").val() //密码
//         };
//         users.push(user); //添加新用户
//
//         //保存到cookie中
//         $.cookie("users", JSON.stringify(users), {expires:30, path:"/"});
//         console.log( $.cookie("users") );
//
//
//         //保存用户名
//        /* var loginUser = JSON.parse($.cookie("user"));
//         var loginName = {
//             name:loginUser[loginUser.length-1].name
//         }
//         $.cookie("loginUser",JSON.stringify(loginName),{expires:null,path:"/"})*/
//
//     });
//
//     //点击进入首页
//     $(".logo-left").click(function () {
//         console.log(0);
//         location.href = "index.html";
//     });
// })



$(function () {
	$('#phoneNum input').blur(function () {
		var reg = /^(\+?0?86\-?)?1[345789]\d{9}$/

		if (reg.test($(this).val())){
			$('#phoneNum>p').html('手机号可以使用').removeClass('err').addClass('success')
		}else {
			$('#phoneNum>p').html('请输入正确的手机号!').removeClass('success').addClass('err')
		}
	})
	$('#pwdNum input').blur(function () {
		var reg = /^[a-zA-Z\d_]{6}$/
		if (reg.test($(this).val())){
			$('#pwdNum>p').html('密码可以使用').removeClass('err').addClass('success')
		} else {
			$('#pwdNum>p').html('请输入正确的密码!').removeClass('success').addClass('err')
		}
	})

	$('#name input').blur(function () {

		if ($(this).val().length>=3 && $(this).val().length<=10){
			$('#name>p').html('用户名可以使用').removeClass('err').addClass('success')
		} else {
			$('#name>p').html('请输入正确的用户名!').removeClass('success').addClass('err')
		}
	})



	$('#Register').click(function () {
		var isregister = true

		$('.register').each(function () {
			if (!$(this).hasClass('success')){
				isregister = false
			}
		})
		console.log(isregister)

		if (isregister){
			$('#Register').submit()
		}
	})

});




