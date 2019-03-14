
$(function () {
    //获取cookie 登录后显示用户名
    /*var $login = $.cookie("login") ? JSON.parse($.cookie("login")) : [];
    if($login.length != 0){
        $(".userss").show();
        $(".phoneNum").html($login.name);
        $("#nav-user").html("");

    }*/
    var $login = $.cookie("login");
    if($login){
        $login = JSON.parse($login);
        $(".userss").show();
        $(".phoneNum").html($login.name);
        $("#nav-user").html("");
        //退出用户名  点击  a  的退出事件
        $(".quit").click(function () {
            $.cookie("login","",{expires:0,path:"/"});
            window.history.go(0);
            $(this).attr("href","index.html");
        })
    }
    //头部购物车==================================================================
    $("#head-car").hover(function () {
        $(".main-logo").find(".headCart").show();
    }, function () {
        $(".main-logo").find(".headCart").hide();
    });

    $(".cart-box").hover(function () {
        console.log(0);
        $(".cart-box").find(".headCart").show();
    }, function () {
        $(".cart-box").find(".headCart").hide();
    })
    $(".accountGo").click(function () {
        location.href = "cart.html";
    });

//小购物车
    var arr = $.cookie("cart");
    if (arr) {
        arr = JSON.parse(arr);

        for (var i=0; i<arr.length; i++) {
            var cartLi = $('<li class="liGoodss"></li>')
            var div1 = $('<div class="cart-img"> <img src='+arr[i].img+'> </div>');
            var div2 = $('<div class="cart-con"> <p class="conDetail"><a href="#">'+arr[i].name+'</a></p> <p class="conSize">颜色：藕色 <span style="color: #888;font-weight: 400">尺码：110</span></p> </div>')
            var div3 = $('<div class="cart-price"> <p class="priceInt">￥<span style="color: #fe4a7a">'+arr[i].price+'</span></p> <p class="priceNum">x <span style="color: #fe4a7a">'+arr[i].num+'</span></p> </div>')
            cartLi.append(div1).append(div2).append(div3);
            $(".cart-list").append(cartLi);
        }
        var sumPrice = 0;
        //alert($(".cart .liGoodss").length);
        for(var n=0;n<$(".liGoodss").length;n++){
            console.log($(".liGoodss").length);
            var liPrice =parseInt($(".priceInt span").eq(n).text());
            var liNum =parseInt($(".priceNum span").eq(n).text());
            sumPrice = sumPrice + (liPrice*liNum);
            console.log(sumPrice);
        }
        $(".accountPrice strong").html(sumPrice+".00");
    }


    //动态获取商品详情=========================================================
    var goodIndex = location.search.replace("?","");
    if( goodIndex=="" ){
        alert("没有产品")
    }else{
        goodOp(goodIndex)
    }
    function goodOp(index){
        $.get({
            "url":"../json/goods.json",
            "success":function(res){
                callback(res[index]);
            }
        })
    }
    function callback(data) {
        //小图小区域
        var sImg = $("<img class='smallImg' src=" + data.img + ">");
        var sArea = $("<div class='smallArea' ></div>");
        $(".main-img").append(sImg).append(sArea);
        $("<img class='bigImg' src=" + data.img + ">").appendTo($(".bigArea"));
        //小小图
        for(var i = 0; i < data.image.length; i++){
            var liImg = $("<li><img src="+data.image[i].img+"></li>");
            $(".img-list").append(liImg);
        }
        //标题
        var h3 = $("<h3><span>"+data.today+"</span> <p>"+data.word+"</p></h3>");
        $(".word").append(h3);
        //价格
        var price = $("<b>"+data.price+".00</b>");
        $(".p-money").append(price);
        //图片切换
        var big = $(".smallImg");
        var li = $(".img-list li");
        for (var i = 0; i < li.length; i++) {
            li.eq(i).click(function () {
                    li.removeClass("iActive");
                    li.eq($(this).index()).addClass("iActive");
                    big.attr("src", $(this).find("img").attr("src"));
                    bigImg.attr("src", $(this).find("img").attr("src"));
                })
        }

        //放大镜===================================================================
        var smallImg = $('.main-img');//小图
        var smallArea = $('.smallArea');//小区域
        console.log(smallArea);
        var bigArea = $('.bigArea');//大区域
        var bigImg = $('.bigImg');//大图
        smallArea.width(bigArea.width() * smallImg.width() / bigImg.width());
        smallArea.height(bigArea.height() * smallImg.height() / bigImg.height());
        //放大系数/放大倍数
        var scale = bigImg.width() / smallImg.width();
        smallImg.mouseleave(function () {
            smallArea.hide(); //隐藏小区域
            bigArea.hide();
        });
        smallImg.mousemove(function (e) {
            smallArea.show();
            bigArea.show();
            var x = e.pageX - smallImg.offset().left - smallArea.width() / 2;
            var y = e.pageY - smallImg.offset().top - smallArea.height() / 2;
            if (x <= 0) {
                x = 0;
            } else if (x >= smallImg.width() - smallArea.width()) {
                x = smallImg.width() - smallArea.width()
            }
            if (y <= 0) {
                y = 0;
            } else if (y >= smallImg.height() - smallArea.height()) {
                y = smallImg.height() - smallArea.height()
            }
            smallArea.css({
                "left": x,
                "top": y
            });
            //====================
            bigImg.css({
                "left": -x * scale,
                "top": -y * scale
            })
        });


        //点击加入购物车事件=========================================
        $(".buyBar").click(function () {

            //判断有无登录
            var $login = $.cookie("login");
            if($login) {
                /* var   liNode = $(this).closest("meta-left").find(".smallImg");*/
                var   imgNode = $(this).closest(".meta-left").find(".smallImg");//当前的img
                //console.log(imgNode);
                var currentPos = imgNode.offset();//得到目标img 的位置
                var currentWidth = imgNode.width();
                var cyImg = imgNode.clone().css({//复制图片
                    "position"	:"absolute",
                    "top"		: currentPos.top,
                    "left"		: currentPos.left,
                    "width"		: currentWidth
                })
                $(".main-img").append(cyImg);
                //动画飞入购物车
                var cartNode =  $(".cart-box");
                //第一个参数  动画的目标 ，第2个参数时间， 三个function 动画结束的处理  回调
                cyImg.animate({
                    "top" 	: cartNode.offset().top + cartNode.outerHeight(),
                    "left"	: cartNode.offset().left,
                    "width"	: 0,
                    "opacity" : 0
                },1000,function(){
                    cyImg.remove();
                })

                //购物车数量
                var inputValue = $(this).siblings(".num").find("input").val();
                var cartValue = $(".cart-box b").val();
                $(".cart-box b").html(cartValue + inputValue);





                //要加入购物车的商品信息
                var goodsId = window.location.search.replace("?","");
                var goodsImg = $(this).parents(".meta-left").find(".smallImg").attr("src");
                //console.log(goodsImg);
                var goodsName = $(this).parents(".meta-left").find("h3").text();
                //console.log(goodsName);
                var goodsPrice = $(this).parents(".meta-left").find(".p-money b").html();
                //console.log(goodsPrice);
                var goodsNum = parseInt($(this).siblings(".num").find("input:text").val());
                console.log(goodsNum);
                //获取之前保存在cookie中的购物车信息
                var arr = $.cookie("cart") ? JSON.parse( $.cookie("cart") ) : [];
                //遍历查找是否之前的购物车cookie中存在即将添加的商品
                var isExist = false; //表示是否存在该商品
                for(var i=0; i<arr.length; i++) {
                    //如果存在该商品, 把数量增加
                    if (goodsId == arr[i].id) {
                        arr[i].num += goodsNum;
                        isExist = true; //表示存在该商品
                    }
                }
                //如果不存在, 则添加一个新商品
                if (!isExist) {
                    //商品对象
                    var goods = {
                        id:goodsId,
                        img: goodsImg,
                        name: goodsName,
                        price: goodsPrice,
                        num: goodsNum,
                        account:goodsPrice*goodsNum
                    }
                    arr.push(goods);
                }
                //保存到cookie中
                $.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
                console.log( $.cookie("cart") );
            }else {
                console.log(00);
                alert("请先注册后再加入购物车！");
            }



        });









    }
    //小图片轮播===================================================
    $(".lt").click(function(){
        console.log(0);
        if(parseInt($(".img-list").css("left"))==0){
            $(".img-list").css("left","0");
            $(this).hide();
            $(".gt").show();
        }
        if(parseInt($(".img-list").css("left"))<0){
            $(".img-list").animate({"left":"0"});
        }
    });
    $(".gt").click(function(){
        if(parseInt($(".img-list").css("left"))==0){
           var width = $(".m-smallImg").width();
            console.log(width);
            $(".img-list").animate({"left":-width});
            $(this).hide();
            $(".lt").show();
        }
        if(parseInt($(".img-list").css("left"))<0){
            $(".img-list").css("left","-width");
            $(this).hide();
        }
    });


    //联系客服mouseover=========================================================
    $('.contact-service').hover(function () {
        $(this).find('a:first').css({
            "background":"white",
            "border-top":"1px solid #999",
            "border-left":"1px solid #999",
            "border-right":"1px solid #999"
        });
        $(this).find(".top-help").css("display","block");
    }, function () {
        $(this).find('a:first').css({
            "background":"#f4f4f4",
            "border":"none"
        });
        $(this).find(".top-help").css("display","none");
    });

    //关注========================================================================
    $('.attention').hover(function () {
        $(this).find('a').css("background","white");
        $(this).find(".top-club").css("display","block")
    }, function () {
        $(this).find('a').css("background","#f4f4f4");
        $(this).find(".top-club").css("display","none")
    });
    //在售分类=======================================================================================
    $(".head-buy").hover(function () {
        $(this).find(".head-more").css("display","block");
    }, function () {
        $(this).find(".head-more").css("display","none");
    });
    $(".head-more").hover(function () {
        $(this).css("display","block");
    }, function () {
        $(this).css("display","none");
    });

    $(".h-thins li").mouseover(function () {
        var index = $(this).index();
        $(this).closest(".head-more").find(".h-concrete").css("display","none");
        $(".h-concrete").eq(index).css("display","block");
    });
//倒计时===================================================================================
    var date1 = new Date("2016-10-17 10:10:10");
    var now = new Date();
    var timeInterval = date1.getTime() - now.getTime();
    var timeSec = timeInterval/1000;
    setInterval(function(){
        timeSec--;
        var day = parseInt(timeSec/24/60/60); //天
        var hour = parseInt(timeSec/60/60) % 24; //时
        var min = parseInt(timeSec/60) % 60; //分
        var sec =  parseInt(timeSec % 60); //秒
        $(".time span").html("还剩："+(day<10?"0"+day:day) + "天" + (hour<10?"0"+hour:hour) + "时" + (min<10?"0"+min:min) + "分" + (sec<10?"0"+sec:sec)  + "秒");
    }, 1000);


    //右边固定小窗口的样式=====================================================================
    $(".phone-box").hover(function () {
        $(this).find(".code").css("display","block")
    }, function () {
        $(this).find(".code").css("display","none")
    });
    $(".people-box").hover(function () {
        $(this).find(".people").hide();
        $(this).find("span").css("display","block");
    }, function () {
        $(this).find(".people").show();
        $(this).find("span").css("display","none");
    });
    $(".back-box").hover(function () {
        $(this).find(".back").hide();
        $(this).find("span").css("display","block");
    }, function () {
        $(this).find(".back").show();
        $(this).find("span").css("display","none");
    });
    //回到顶部
    $(".back-box").click(function () {
        $("body").animate({scrollTop:0},500)

    });

    //商品详情---轮播图===========================================================
        var _list1 = $(".m-list");
        var _li1 = $(".m-list li");
        _li1.clone().appendTo(_list1);
        var size = $(".m-list li").length;
        var i = 0;
        function move(){
            if (i < 0) {
                _list1.css("left", -(size-1)*190);
                i = size-4;
            }
            if (i >= size-3) {
                _list1.css("left", 0);
                i = 1;
            }
            _list1.stop().animate({left: -i*190}, 500);
        }
        $(".m-prev").click(function(){
            i--;
            move();
        });
        $(".m-next").click(function(){
            i++;
            move();
        });



//导航固定============================================
    $(window).scroll(function () {
        if($(document).scrollTop() >= 1285){
            $(".main-nav").addClass("fixednav");
            $(".cart-duplication").show();
        }else{
            $(".main-nav").removeClass("fixednav");
            $(".cart-duplication").hide();
        }
    });
    //导航点击事件
    $(".goods-nav").click(function () {
        console.log($(this).index());
        /*$(this).find("i").css("background-position-y","-52px");*/
        $(this).siblings().removeClass("li-active");
        $(this).addClass("li-active");

        $(".goods-nav i").removeClass("nav-active");
        //$(this).find("i").removeClass("nav-active");
        $(this).find("i").addClass("nav-active");

        $("body").animate({scrollTop:$(".detail-info").eq($(this).index()).offset().top-60},500);

    });
    //导航楼梯效果
    $(window).scroll(function(){
        var currentTop = $(this).scrollTop();
        $(".detail-info").each(function(index,ele){
            if(currentTop>=$(this).offset().top &&  currentTop<= $(this).offset().top + $(this).outerHeight()){
                $(".goods-nav i").removeClass("nav-active");
                $(this).parents(".main-left").find(".goods-nav i").eq(index).addClass("nav-active");
                $(".goods-nav").removeClass("li-active");
                $(this).parents(".main-left").find(".goods-nav").eq(index).addClass("li-active");
            }
        })
    });

//颜色  点击事件============================================================================================
$(".color li").click(function () {
    console.log(0);
     $(this).siblings().removeClass("borderColor");
    $(this).addClass("borderColor");
});
    $(".size li").click(function () {
        console.log($(".color li").length);
        $(this).siblings().not("a").removeClass("borderColor");
        $(this).addClass("borderColor");
    });

//  +  -  点击事件===================================
    $(".del-num").click(function () {
        var inputValue = $(this).parents(".num").find("input").val();
        inputValue--;
        if(inputValue < 1){
            inputValue = 1;
        }
        $(this).parents(".num").find("input").val(inputValue);
    })
    $(".add-num").click(function () {
         var inputValue = $(this).parents(".num").find("input").val();
        inputValue++;
        $(this).parents(".num").find("input").val(inputValue);
    })
    
//点击进入购物车页面
    $(".cart-box").click(function () {
        location.href = "cart.html";
    })






















});