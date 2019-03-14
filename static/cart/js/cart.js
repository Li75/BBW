$(function () {
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





//获取cookie
    var arr = $.cookie("cart");
    if (arr) {
        arr = JSON.parse(arr);
        for (var i=0; i<arr.length; i++) {
            var tr = $(" <tr class='entry item-entry'></tr>").attr("index",i);
            var td1 = $("<td class='cart-check'><input type='checkbox' checked class='checkBox2'></td>");
            var td2 = $('<td class="cart-info"> <a href="#" class="image"> <img class="cartImg" src='+arr[i].img+' alt=""></a> <a href="#" class="word">'+arr[i].name+'</a> </td>');
            var td3 = $('<td class="cart-color"> <p>颜色：浅丁香</p> <p>尺码：110</p> </td>');
            var td4 = $('<td class="cart-price"> <p class="rel-price"> '+arr[i].price+'</p> <p><del>200.00</del></p> </td>');
            var td5 = $('<td class="cart-num"> <div> <i class="del-num"></i> <input type="text" value='+arr[i].num+'> <i class="add-num"></i> </div> </td>')
            var td6 = $('<td class="cart-subtotal"> <span>'+arr[i].price*arr[i].num+'.00</span> </td>');
            var td7 = $('<td class="cart-del"> <a href="#">删除</a> </td>');
            tr.append(td1).append(td2).append(td3).append(td4).append(td5).append(td6).append(td7);
            $(".foot-entry").before(tr);
        }
        account();//刷新保存价格
        $(".form1").show();
        $(".form2").hide();
    }


    //删除事件============================
    $(".cart-del a").click(function(){
        //console.log(parseInt($(".cart-del a").parent().parent().index()));
        //获取商品的index的值(/tr的数量)
        var index =  parseInt($(this).parent().parent().index())-2;
        //重新获取cookie
        $(this).parent().parent().remove();
        arr = $.cookie("cart") ? JSON.parse( $.cookie("cart") ) : [];
        //删除该商品
        arr.splice(index,1);
        //删掉后重新覆盖cookie
        $.cookie("cart", JSON.stringify(arr), {expires:10, path:"/"});
        account($(this));
        if(arr.length==0){//判断购物车有无商品，界面切换
            $(".form1").hide();
            $(".form2").show();
        }
    })
    if(arr.length==0){
        $(".form1").hide();
        $(".form2").show();
    }
    //商品加减============================
    $(".del-num").click(function(){
        $count = parseInt($(this).parent().find("input").val());
        //console.log($count);
        if($count == 1){
            $(this).css("color","#AAA");
        }else{
            $(this).css("color","black");
            $(this).parent().find("input").val(--$count);
            $count = parseInt($(this).parent().find("input").val());
            if($count == 1) $(this).css("color","#AAA");
        }
        count($(this));
        account($(this));

        //界面刷新保存num price
        var goodsId = $(this).parents(".entry").attr("index");
        console.log(goodsId);
        var num = $(this).parent().find("input").val();
        console.log(num);
        var arr = $.cookie("cart") ? JSON.parse( $.cookie("cart") ) : [];
        arr[goodsId].num = num;
        $.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
        console.log(JSON.parse($.cookie("cart")));
    });
    //加
    $(".add-num").click(function(){
        $count = parseInt($(this).parent().find("input").val());
        $(this).parent().find("input").val(++$count);
        $(this).css("color","black");
        count($(this));
        account($(this))

        var goodsId = $(this).parents(".entry").attr("index");
        console.log(goodsId);
        var num = $(this).parent().find("input").val();
        console.log(num);
        var arr = $.cookie("cart") ? JSON.parse( $.cookie("cart") ) : [];
        arr[goodsId].num = num;
        $.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
    });

    //点击进入首页
    $(".logo-left").click(function () {
        location.href = "index.html";
    });

//checkedbox事件========全选===============================================================

    $(':checkbox').first().click(function(){
        var isCheck = $(this).prop("checked");  // 得到checked 的状态
        //第一个checkbox 有选择状态
        //$(':checkbox').not(':first'). checkbox 的集合 包含第一个
        //选中状态与第一个的选中状态一致
        $(':checkbox').prop("checked",$(this).prop("checked"));

        if(isCheck){
            $('body').addClass("selected");
            account();
        }else{
            $('body').removeClass("selected");
            $(".cart-summary b").html(0);
            $(".cart-payment b").html("0.00");
        }
    });
    $('.checkBox1').click(function(){
            var isCheck = $(this).prop("checked")  // 得到checked 的状态
            //第一个checkbox 有选择状态
            //$(':checkbox').not(':first'). checkbox 的集合 包含第一个
            //选中状态与第一个的选中状态一致
            $(':checkbox').prop("checked",$(this).prop("checked"));

            if(isCheck){
                $('body').addClass("selected");
                account();
            }else{
                $('body').removeClass("selected");
                $(".cart-summary b").html(0);
                $(".cart-payment b").html("0.00");
            }
    });


   /* function isChecked(){
        var isCheck = $(this).prop("checked")  // 得到checked 的状态
        //第一个checkbox 有选择状态
        //$(':checkbox').not(':first'). checkbox 的集合 包含第一个
        //选中状态与第一个的选中状态一致
        $(':checkbox').prop("checked",$(this).prop("checked"));

        if(isCheck){
            $('body').addClass("selected");
            account();
        }else{
            $('body').removeClass("selected");
            $(".cart-summary b").html(0);
            $(".cart-payment b").html("0.00");
        }
    }*/
    function money(){
        var $cart_price=$(".w122 span");
        //console.log($cart_price.length);
        var jinE=0.00;
        console.log($(".w122 span").html().replace("￥",""));
        for(var i=0;i<$cart_price.length;i++){
            //商品金额乘商品数量
            if($(".chec :checkbox").eq(i).prop("checked")){
                jinE +=parseInt($cart_price.eq(i).html().replace("￥",""));
            }
        }
        $(".jiesuan p span").html(jinE.toFixed()+"元");
    }















})

//小计
function count(sus){
    //console.log(sus.parent());
    if(sus){
        //console.log(sus.parents(".entry").find(".rel-price").html());
        //console.log(sus.parent().find("input").val());
        var $xiaoji=(parseInt(sus.parents(".entry").find(".rel-price").html()))*(parseInt(sus.parent().find("input").val()));
        /*console.log($xiaoji);*/
        sus.parents(".entry").find(".cart-subtotal span").html($xiaoji.toFixed(2));
    }
}
//总计
function account(){

    var delPrice = Math.abs($(".delPrice").html());
    var sumPrice = 0;
    var sumNum = 0;
    for(var n=0;n<$(".entry").length;n++){
        var trPrice =parseInt($(".entry").find($(".cart-subtotal span")).eq(n).text());
        var trNum = parseInt($(".cart-num input").eq(n).val());
       // console.log(trPrice);
        //console.log(trNum);
        sumPrice = sumPrice + trPrice;
        sumNum = sumNum+parseInt(trNum);
    }
    $(".countPrice").html(sumPrice + ".00");
    $(".account span").html(sumPrice - delPrice+".00");
    $(".cart-summary b").html(sumNum);
    $(".cart-payment b").html(sumPrice - delPrice+".00");
}

