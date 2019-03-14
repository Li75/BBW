
$(function () {
  /*轮播图--------*/
  $.get("../json/index.json", function(a) {
    //循环遍历json
    var data = a.lunbo;
    for (var i = 0; i < data.length; i++) {
      var carouselImg = $("<div/>").addClass('carousel-img');
      var img = $("<img src="+data[i].img+"/>");//图片
      var smallTag = $("<div/>").addClass('small-tag');//图标
      carouselImg.append(img);
      $("#carousel-images").append(carouselImg);
      $('#carousel-tag').append(smallTag);
    }
    lunbo()
  });

  //获取cookie 登录后显示用户名
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
     })
   }

  /*性别年龄*/
  $('.nav-sex').hover(function () {
    $(this).find(".sex").css("display","block");
  }, function () {
    $(this).find(".sex").css("display","none");
  });

  /*联系客服mouseover*/
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

  /*关注===========*/
  $('.attention').hover(function () {
    $(this).find('a').css("background","white");
    $(this).find(".top-club").css("display","block")
  }, function () {
    $(this).find('a').css("background","#f4f4f4");
    $(this).find(".top-club").css("display","none")
  });

  //动态获取商品详情==============================================================
  $.get({
    "url":"../json/goods.json",
    "success":function(res){
      //console.log(res);
      //更新界面的回调函数
      callBack(res);
    }
  });
  function callBack(data){
    //data 是json里面的每一个单独对象
    $.each(data,function(index,data){
      var liNode = $("<li/>");
      var aNode = $("<a><div class='con-price'>￥"+data.price+"</div><img src="+data.img+"><p>"+data.num+"</p></a>").attr("href","../page/product-detailes.html?"+index);
      aNode.appendTo(liNode);
      $(".carousel-list").append(liNode);
    })
  }

  //动态获取detail内容==================================================
  $.get("../json/index.json", function(c) {
      var data3 =c.detail;
    for (var j = 0; j < data3.length; j++) {
      var detailCon = $("<div class='detail-con'><img src="+data3[j].img+"></div>");
      var countDown = $("<div class='countdown'><i class='clock'></i><span></span></div>");
      var intimate = $("<div class='intimate'><h3>"+data3[j].title+"</h3><span>"+data3[j].content+"</span></div>");
      var disCount = $("<div class='discount'><i class='dis-img'></i><span>"+data3[j].discount+"</span></div>");
      var disEnter = $("<div class='dis-enter'>"+data3[j].disBtn+"</div>");
        detailCon.append(countDown).append(intimate).append(disCount).append(disEnter);
      $(".detail").append(detailCon);
      }
    detail();
  });

//brand  今日优选   精彩预告=================================================
  $(".b-main li").mouseover(function () {
    var index = $(this).index()+1;
    $(this).closest(".brand").find(".b-good").css("display","none");
    $(".brand ul").eq(index).css("display","block");
  });

//热卖排行版=== 动态获取============================
  //tab切换
  $(".hot a").mouseover(function(){
    var index = $(this).index();
    $(this).closest(".hot").find(".h-clothes").css({
      "display":"none"
    });
    $(".h-clothes").eq(index).css("display","block");
  });

 // 动态获取    最后疯抢====================
  $.get("../json/index.json", function(d) {
    //循环遍历json
    var data =d.bottom;
    for (var j = 0; j < data.length; j++) {
      var bLi = $("<li  class='b-list'><img src="+data[j].img+"><small>"+data[j].discount+"</small><p>"+data[j].word+" <span><b>"+data[j].num+"</b>"+data[j].price+"</span></p><span> <i></i><span class='time'></span></span></li>")
      $(".b-content ul").append(bLi);
    }
    small();
  });
  
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

//倒计时=============================================================================================
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
    $(".b-list").find(".time").html("剩余："+(day<10?"0"+day:day) + "天" + (hour<10?"0"+hour:hour) + "时" + (min<10?"0"+min:min) + "分" + (sec<10?"0"+sec:sec)  + "秒");
    $(".countdown").find("span").html("剩余："+(day<10?"0"+day:day) + "天" + (hour<10?"0"+hour:hour) + "时" + (min<10?"0"+min:min) + "分" + (sec<10?"0"+sec:sec)  + "秒");
  }, 1000);


  //导航   固定========================================================================================
  var Height = 2800;
  $(window).scroll(function () {
    if($(document).scrollTop() >= 200){
      $(".sub-nav").addClass("fixednav").find("li:first").show();
      $(".nav-tomorrow").hide();
      $(".nav-world,.nav-sale").show();
    }else{
      $(".sub-nav").removeClass("fixednav").find("li:first").hide();
      $(".sub-nav").css("height","28");
      $(".nav-tomorrow").show();
      $(".nav-world,.nav-sale").hide();
    }
    if($(".detail-con").length <= 20){
      if($(document).scrollTop() >= Height) {
        var copyDiv = $(".detail-con").last().clone(true);
        Height += $(".detail-con").last().outerHeight();
        $(".detail-con").last().after(copyDiv);
      }
    }
  });

  //右侧小轮播图====================================================

  $.get("../json/index.json", function(a) {
    //循环遍历json
    var data = a.Lunbo2;
    for (var i = 0; i < data.length; i++) {
      var list = $("<ul id='list'></ul>");
      var li = $("<li><img src="+data[i].img+"/> <p><i></i>"+data[i].word+"</p></li>");
      list.append(li);
      $("boxLunbo").append(list);
    }
    boxLunbo()
  });








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
      var div2 = $('<div class="cart-con"> <p class="conDetail"><a href="#">'+arr[i].name+'</a></p> <p class="conSize">颜色：藕色 <span>尺码：110</span></p> </div>')
      var div3 = $('<div class="cart-price"> <p class="priceInt">￥<span>'+arr[i].price+'</span></p> <p class="priceNum">x <span>'+arr[i].num+'</span></p> </div>')
      cartLi.append(div1).append(div2).append(div3);
      $(".cart-list").append(cartLi);
    }
    var sumPrice = 0;
    //alert($(".cart .liGoodss").length);
    for(var n=0;n<$(".cart .liGoodss").length;n++){
      console.log($(".liGoodss").length);
      var liPrice =parseInt($(".priceInt span").eq(n).text());
      var liNum =parseInt($(".priceNum span").eq(n).text());
      sumPrice = sumPrice + (liPrice*liNum);
      console.log(sumPrice);
    }
    $(".accountPrice strong").html(sumPrice+".00");
  }



  
  


});

/*轮播图================================================================================================*/
var i = 0;
var timer;
function lunbo(){
  $('.carousel-img').eq(0).show().siblings().hide();
  $('.small-tag').eq(0).css("background","#ff637b");
  showTime();
  $(".small-tag").hover(function () {
    i = $(this).index();
    show();
    clearInterval(timer);
  }, function () {
    showTime();
  })
}
function show(){
  $('.carousel-img').eq(i).fadeIn(300).siblings().fadeOut(300);
  $('.small-tag').css("background","#c6c6c6").eq(i).css("background","#ff637b");
}
function showTime(){
  timer = setInterval(function () {
    i++;
    if(i == $('#carousel-images img').length){
      i = 0;
    }
    show();
  },2000);
}

/*================*///====================================右侧小轮播图

function boxLunbo(){
  var _list1 = $("#list");
  var _li1 = $("#list li");
  _li1.first().clone().appendTo(_list1);
  var size = $("#list li").length;
  var i = 0;
  var timer = setInterval(function(){
    i++;
    move();
  }, 3000);
  function move(){
    if (i < 0) {
      _list1.css("left", -(size-1)*240);
      i = size-2;
    }
    if (i >= size) {
      _list1.css("left", 0);
      i = 1;
    }
    _list1.stop().animate({left: -i*240}, 500);
  }

  $("#left").click(function(){
    i--;
    move();
  });
  $("#right").click(function(){
    i++;
    move();
  });
  $("#boxLunbo").hover(
      function(){
        clearInterval(timer);
      },
      function(){
        clearInterval(timer);
        timer = setInterval(function(){
          i++;
          move();
        }, 3000)

      })
}
//============================================================
//给商品内容添加hover事件，移入时能显示商品的全部内容
function detail(){
  $(".intimate span").hover(function () {
    $(this).addClass("active");
  }, function () {
    $(this).removeClass("active");
  });
  $(".detail-con").hover(function () {
    $(this).find(".dis-enter").css({
      "background-color":"#ff4965",
      "color":"white"
    })
  }, function () {
    $(this).find(".dis-enter").css({
      "background-color":"white",
      "color":"#ff4965"
    })
  });
  $(".detail img").hover(function () {
    $(this).animate({opacity:0.6},1000)
  }, function () {
    $(this).animate({opacity:1},1000)
  });

}
/*给bottom 列表  最后疯抢添加hover事件==============*/
function small(){
  $(".b-list").hover(function () {
    $(this).find("small").css("display","block");
    $(this).css("border","1px solid #ff4965")
  }, function () {
    $(this).find("small").css("display","none");
    $(this).css("border","1px solid #ccc")
  });
}

