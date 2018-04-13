/**
 * Created by hebo (razr409355439@gmail.com)on 15/1/7.
 */

define("wzlh5/1.0.0/wzlindex",["jquery/2.1.1/jquery","wzlh5/1.0.0/ac","handlebars/1.3.0/dist/cjs/handlebars",'wzlh5/1.0.0/until',"wzlh5/1.0.0/cp","wzlh5/1.0.0/ui","swiper/2.7.0/dist/idangerous.swiper"],function (require, exports, module) {
    var $ = require("jquery/2.1.1/jquery")
    var until = require("wzlh5/1.0.0/until")
    var action = require("wzlh5/1.0.0/ac")
    var wzlui = require("wzlh5/1.0.0/ui")
    var cp = require("wzlh5/1.0.0/cp")
    var Handlebars = require("handlebars/1.3.0/dist/cjs/handlebars").default
    var swiper = require("swiper/2.7.0/dist/idangerous.swiper")
	var code = wzlui.dropdownMask.href();
	
	var qrCode = code.qrCode;
	var qrType = code.qrType;
	code.qrCode==undefined?'':localStorage.setItem('qrCode',qrCode);
	code.qrType==undefined?'':localStorage.setItem('qrType',qrType);
	
    var pops = wzlui.containerMask,
        iscrollPop = wzlui.iscrollPop,
        dialog = wzlui.dialog,
        containerMask = wzlui.containerMask,
        dropdownMask = wzlui.dropdownMask,
        Y_Y = until.Y_Y,
        TZ_INFO = until.TZ_INFO;
    //首页
    var wzlindex = function(ac) {
        switch (ac) {
            case 'index':
                index();
                break;
            case "index2":
                index2();
                break;
            case "fxb":
                fxb();
                break;
        }
        function index() {
            $('.morelotterybtn').on('click', function() {
                $(".morelotterylist").slideToggle();
            })
            var arr2 = ['imgs/index/index_1.jpg'
                /*'imgs/index/index_2.jpg',*/
                /*'imgs/index/index_3.jpg'*/];
            var myTemplate2 = Handlebars.compile($("#table-template2").html());
            $(".swiper-container .swiper-wrapper").html(myTemplate2({
                data: arr2
            }));
            var mySwiper = new swiper('.swiper-container', {
                pagination: '.pagination',
                loop: true,
                grabCursor: true,
                paginationClickable: true
            })
            $('.arrow-left').on('click', function(e) {
                e.preventDefault()
                mySwiper.swipePrev()
            })
            $('.arrow-right').on('click', function(e) {
                e.preventDefault()
                mySwiper.swipeNext()
            })
            $('.wzl-nav-user').on('click', function() {
                location.href = 'views/ucenter.html';
            });
            action.wzlindexWining({}, function(re) {
                var arr = [];

                for (var i = 0; i < re.length; i++) {
                    var str = '';
                    if (re[i].nickname == '') {
                        re[i].nickname = re[i].username;
                    };
                    str = '[' + re[i].nickname + ']' + re[i].lotName + '喜中' + re[i].winAmount + '元';
                    arr.push(str);
                }
                var myTemplate = Handlebars.compile($("#table-template1").html());
                $(".swiper-container2 .swiper-wrapper").html(myTemplate({
                    data: arr
                }));
                var mySwiper2 = new swiper('.swiper-container2', {
                    paginationClickable: true,
                    mode: 'vertical',
                    autoplay: 3000,
                    loop: true
                })
            })
        }
        function index2(){

            (function (){
		//二维码金额展示
		if(!localStorage.getItem("money")){
		//console.log(666)
		
	        	action.QrCode({qrCode:qrCode},function(data){
	              if(data.status=="200"){
			localStorage.setItem("money",data.desc.money)
			$("#money").text('您的二维码余额为'+data.desc.money+'元')

		         }else if(data.status=="5011"){
			$("#money").text('您的二维码已被使用')
		         }else if(data.status=="5011"){
			$("#money").text('您的二维码已过期')
		     }else if(data.status=="401"){
			$("#money").text('您的二维码不存在')
		     }

		    setTimeout(function(){$("#money").hide()},2000)

	        	})
		}else{
			$("#money").hide();		
		}	
                $('.swiper-wrapper').height('181');

                var list=[
//                    {src:'imgs/news/banner_1.png',href:"views/jc.html"},
                    {src:'imgs/news/banner_3.jpg',href:"views/dlt.html"}
//                    {src:'imgs/news/banner_2.jpg',href:"views/ucenter.html"}
                ]
                var myTemplate2 = Handlebars.compile($("#table-template2").html());
                $(".swiper-container .swiper-wrapper").html(myTemplate2({
                    data: list
                }));
                var mySwiper = new swiper('.swiper-container', {
                    pagination: '.pagination',
                    loop: true,
                    grabCursor: true,
                    paginationClickable: true
                })
            })()

            action.queryUserInfo({}, function(re) {
                if (re.resultCode == '200' && re.data.statusCode!='1') {
                    $('.header-r').html( '<a href="views/ucenter.html"><i class="icon-user"></i></a>' )
                }
            });


            action.getIssue({
                lottery: "DLT",
                issues: ''
            }, function(re) {
               // console.log(re[0].issue);

                $('.dlt-bet-title').html('20'+re[0].issue+'期销售中');
            });

            $.ajax({
                type: 'GET',
                url: 'http://issue.wozhongla.com/bonus/getBonus.vhtml?lotId=001&lotIssue=2015151',
                data: {},
                dataType: 'jsonp',
                jsonp:'callback',
                success: function(d) {
                    //console.log(formatMoeny(d.data.numberList[0].bonusBlance));
                    $('.conta').html(formatMoeny(d.data.numberList[0].bonusBlance));
                },
                error: function(re) {
                    fn && fn(re)
                }
            });
            function formatMoeny(num) {
                var sign, cents;
                num = num.toString().replace(/\$|\,/g, '');
                if (isNaN(num)) num = "0";
                sign = (num == (num = Math.abs(num)));
                num = Math.floor(num * 100 + 0.50000000001);
                cents = num % 100;
                num = Math.floor(num / 100).toString();
                if (cents < 10) cents = "0" + cents;
                for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
                return (((sign) ? '' : '-') + num);
            }


            function chang(){
              var dnumber = cp.shuffle({
                  min: 1,
                  max: 35,
                  padding: 1,
                  count: 5
              });

              var btnumber = cp.shuffle({
                  min: 1,
                  max: 12,
                  padding: 1,
                  count: 2
              });

              var list = dnumber.concat(btnumber);
               localStorage.setItem("dnumber",dnumber);
               localStorage.setItem("btnumber",btnumber);
               var lt = Handlebars.compile($("#table-template3").html());
               $("#bet-a").html(lt({list:list}));
                $('#bet-btn').click(function(){
                	var a = localStorage.getItem("dnumber");
                	var b = localStorage.getItem("btnumber");
                	
	             window.location.href='views/dlt.html?red='+a+'&blue='+b;
	                    //window.location.href='views/dlt.html?red='+dnumber+'&blue='+btnumber+'#!/car';
	                   
	            });
            }
           
           chang();
            var iht=true;
            $('.change').on('click',function(){
            	
                if(iht){
                    $('#bet-a').addClass('slideInDown');
                    chang();
                    $('#bet-a').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){

                        $('#bet-a').removeClass('slideInDown');
                        iht=true;
                    });

                    iht=false;
                }

            });



            action.wzlMobileHome({},function(re){
                re = eval( '('+re+')' );


                famatData(re)
            });

            function famatData(d){
                var info={},list=[];
                info.title = d[0].title
                info.percent=d[0].matchInfo.split('|')[2]
                info.issue=d[0].matchInfo.split('|')[0].split(',');
                info.win=d[0].matchInfo.split('|')[1].split(',')
                action.jcMatchData({}, function(re) {
                    if(!re.length){
                        $("#fxbli,#indexFxb").hide()
                        return ;
                    }

                    for(var i=0;i<re.length;i++){
                        for(var j=0;j<info.issue.length;j++){
                            var o={};
                            if(info.issue[j]==re[i].matchNo){
                                o.matchHome = re[i].matchHome
                                o.matchGuest = re[i].matchGuest
                                o.sp = result(info.win[j],re[i].sp)
                                list.push(o)
                            }
                        }
                    }
                    function result(win,sp){
                        var s='';
                        switch(win){
                            case '3':
                                s='胜'+ sp[0];
                                break;
                            case '1':
                                s='平'+ sp[1];
                                break;
                            case '0':
                                s='负'+ sp[2];
                                break;
                        }
                        return s;
                    }

                    if(!list.length){
                        return ;
                        list.push({
                            matchHome:re[0].matchHome,
                            matchGuest:re[0].matchGuest,
                            sp:result("3",re[0].sp)
                        })
                        list.push({
                            matchHome:re[1].matchHome,
                            matchGuest:re[1].matchGuest,
                            sp:result("3",re[0].sp)
                        })
                    }

                    console.log(list);
                    doRender(info,list)
                })
                function doRender(info,list){
                    var myTemplate = Handlebars.compile($("#table-template1").html());
                    $("#indexFxb").html(myTemplate({
                        info: info,
                        list:list
                    })).show();
                    $("#fxbli").show()
                }
            }
        }
        function fxb(){
            var untils = until;
            var U_SELECT = 0;
            var LEN = 0
            action.wzlMobileHome({},function(re){
                console.log(re)
                //var re = '[{"title":"风向标精选推荐","winTotal":"","matchInfo":"201603314002,201603314003,201603314004|3,3,1|80","body":\'帕尔梅vs里奥克，双方近期状态都不佳，主队主场优势有望赢球。桑托斯整体实力要强于客队许多，可对此前遭遇一波4连败，状态堪忧，看好主胜。<br /> \'},{"title":"风向标精选推荐","winTotal":"","matchInfo":"201603314002,201603314004|3,3|80","body":\'帕尔梅vs里奥克，双方近期状态都不佳，主队主场优势有望赢球。桑托斯整体实力要强于客队许多，可对此前遭遇一波4连败，状态堪忧，看好主胜。<br /> \'},{"title":"风向标精选推荐","winTotal":"","matchInfo":"201603314002|3|80","body":\'帕尔梅vs里奥克，双方近期状态都不佳，主队主场优势有望赢球。桑托斯整体实力要强于客队许多，可对此前遭遇一波4连败，状态堪忧，看好主胜。\'}]';
                re = eval( '('+re+')' )
                var slist = famatData(re);
                LEN = slist.length;
                getGameByNo(function(s){
                    var list = [];
                    for(var i=0;i<slist.length;i++){
                        var games = slist[i].games,re=[];
                        for(var n=0;n<games.length;n++){
                            if(s[games[n].matchNo]){
                                var obj = $.extend(s[games[n].matchNo],games[n])
                                obj.wstr = s[games[n].matchNo].wstr
                                re.push(obj)
                            }
                        }
                        if(re && re.length){
                            slist[i].games = re;
                            list.push(slist[i])
                        }
                    }
                    if(list.length==0){
                        var gamelist= []
                        for(var g in s){
                            s[g].wstr = ["", "周一", "周二", "周三", "周四", "周五", "周六", "周日"][s[g].matchNo.substring(8, 9)] + s[g].matchNo.substring(9);
                            if(re.length>3) break;
                            gamelist.push(s[g])
                        }
                        for(var i=0;i<slist.length;i++){
                            slist[i].games = gamelist.slice(i*2,2+(i*2));
                            list.push(slist[i])
                        }

                    }
                    getRendList(list,function(){
                        sendPost(list[U_SELECT])
                    })

                    sendPost(list[0])
                    inputEvent(function(){
                        var $money = $('#money'),
                            b = $(".fxb-input").val().trim()||1,
                            $backmoney = $('#backmoney').attr('v');
                        //$money
                        $('#money').html(b*2)
                        $("#backmoney").html(($backmoney* b).toFixed(2))
                    })
                    function sendPost(d){
                        var b = 1;
                        var price = countM(d.list).toFixed(2)
                        $(".fxb-input").val(1)
                        $('#money').html(b*2)
                        $("#backmoney").attr("v",price).html(price)
                        $("#fxbbuy").unbind().bind("click",function(){


                            var bei = $(".fxb-input").val().trim()||1 ;
                            var data = getPosData(d.list,bei);
                            console.log(data)
                            data.lotoGson = JSON.stringify(data.lotoGson);
                           // console.log(data)

                            dialog({
                                type: 'select',
                                message: '您确认投注吗？',
                                onConfirm: function() {
                                    //////alert(1)
                                    action.jcTz(data, function(re) {
                                        //console.log("sss")
                                        TZ_INFO($.parseJSON(re), function(){})
                                    })

                                },
                                onCancel: function() {
                                    //////alert(2)
                                }
                            })

                        })
                        function countM(d){
                            var tmp = [],s=2;
                            for(var i=0;i< d.length;i++){
                                var a =[d[i].s,d[i].p,d[i].f]
                                s *= Number(a[d[i].selected])
                            }
                            return s
                        }
                    }
                    var chuanList={
                        "1串1":"01","2串1":"02","3串1":"03","3串3":"04","3串4":"05","4串1":"06","4串4":"07","4串5":"08",
                        "4串6":"09","4串11":"10","5串1":"11","5串5":"12","5串6":"13",	"5串10":"14","5串16":"15","5串20":"16",
                        "5串26":"17","6串1":"18","6串6":"19","6串7":"20","6串15":"21","6串20":"22","6串22":"23","6串35":"24",
                        "6串42":"25","6串50":"26","6串57":"27","7串1":"28","7串7":"29","7串8":"30","7串21":"31","7串35":"32",
                        "7串120":"33","8串1":"34","8串8":"35","8串9":"36","8串28":"37","8串56":"38","8串70":"39","8串247":"40"
                    }
                    function getPosData(game,bei){

                        var len = game.length;

                        var gameType = len ===1 ?"321" :"320";
                        var seleId = chuanList[len+"串1"];
                        var typeId = len ===1 ?"01" :"02";

                        var d = {
                            //彩票类型
                            gameType: gameType,
                            format: "ajax",
                            //需要支付金额
                            needPay: "",
                            //投注串
                            lotoGson: {}
                        }
                        d.needPay = bei *2;
                        var lotoGson = {
                            "gameType":gameType,
                            "isStop":0,
                            "buyType":0,
                            "buyNumberArray":[],
                            "issueArray":[{"issue":" ","multiple":1}],
                            "title":"","explain":"",
                            "secrecy":1,"commision":0,
                            "commisiontype":0,
                            "splitAmount":0,
                            "buyAmount":0,
                            "floorsAmount":0,
                            "isUpload":0,
                            "qcdy":0,
                            "totalSum":2
                        }
                        lotoGson.totalSum = bei*2;
                        lotoGson.buyNumberArray = [
                            {
                                "buyNumber":buynumberarrayToStr(),
                                "typeId":typeId,
                                "seleId":seleId,
                                "sum":bei*2
                            }
                        ];
                        lotoGson.issueArray = [{"issue":" ","multiple":bei}]
                        d.lotoGson = lotoGson;
                        return  d
                        function buynumberarrayToStr(){
                            var s = ''
                            for(var i =0;i<game.length;i++){
                                var a = []
                                a.push(game[i].matchHome+"vs"+game[i].matchGuest)
                                a.push(game[i].matchName)
                                a.push("0:"+game[i].wstr+"-"+game[i].no+":["+game[i].r+"]:"+game[i].endTime)
                                a.push(game[i].stopTime);
                                a.push(game[i].comityBall);
                                s+= a.join(",")+"/"
                            }
                            s = s.slice(0, s.length-1)
                            s+="|0-0"
                            return s;
                        }
                    }
                });
            })
            function getGameByNo(fn){
                action.jcMatchData({}, function(s) {

                    var list = {}
                    for(var  i=0;i< s.length;i++){
                        s[i].wstr = ["", "周一", "周二", "周三", "周四", "周五", "周六", "周日"][s[i].matchNo.substring(8, 9)]
                        + s[i].matchNo.substring(9);

                        list[s[i].matchNo] = s[i]
                    }
                    fn&&fn(list)
                })
            }
            function famatData(re){
                var list = [];
                for(var i=0;i<re.length;i++){
                    var o = {};
                    o.games = replaceGame(re[i].matchInfo);

                    o.title = re[i].title;
                    o.body = re[i].body;
                    o.winTotal = re[i].winTotal;
                    list.push(o)
                }
                function replaceGame(s){
                    var t = s.split('|');
                    var matchNos = t[0].split(",");
                    var sp = t[1].split(",");
                    var re =[];
                    for(var i=0;i< matchNos.length;i++){
                        re.push({
                            matchNo:matchNos[i],
                            selected:sp[i]
                        })
                    }
                    return re;
                }
                return list;
            }
            function getRendList(d,fn){
                for(var i=0;i<d.length;i++){
                    d[i].list = [];
                    $.each(d[i].games,function(x,n){
                        d[i].list.push( mergeData(n))
                    })


                }
                function mergeData(gae){
                    var t1 = {};
                    t1.matchHome = gae.matchHome;

                    t1.matchGuest =gae.matchGuest;
                    t1.matchName = gae.matchName;
                    t1.s=gae.sp[0];
                    t1.p=gae.sp[1];
                    t1.f=gae.sp[2];
                    t1.issue = t1.matchNo= gae.matchNo.substring( gae.matchNo.length-4,gae.matchNo.length );
                    t1.selected = replaceIndex(gae.selected)
                    t1.sa = replaceIndex(gae.selected)==0?"active":"";
                    t1.pa = replaceIndex(gae.selected)==1?"active":"";
                    t1.fa = replaceIndex(gae.selected)==2?"active":"";
                    t1.stopSaleTime = checkTime( gae.stopSaleTime.substring(8, 12) );
                    t1.endTime = gae.endTime;
                    t1.no = gae.matchNo;
                    var r = ["胜","平","负"];
                    t1.r = r[replaceIndex(gae.selected)];
                    t1.stopTime = gae.stopSaleTime;
                    t1.comityBall = gae.comityBall;
                    t1.wstr = gae.wstr;
                    return t1
                }
                function replaceIndex(d){
                    var n=0
                    switch(d){
                        case '3':
                            n=0;
                            break;
                        case '1':
                            n=1;
                            break;
                        case '0':
                            n=2;
                            break;
                    }
                    return n
                }
                $('.wzl-nav-bar').html('<span class="glyphicon glyphicon-wzl-back"></span>'+d[0].title||"" )
                var myTemplate = Handlebars.compile($("#table-template1").html());
                $(".swiper-height").html(myTemplate({
                    data: d
                })).height( $('.fxb-container').height()+30 )

                var mySwiper = new swiper('.swiper-container2', {
                    pagination: '.pagination2',
                    loop: true,
                    grabCursor: true,
                    paginationClickable: true,
                    onTouchStart:function(){
                    },
                    onTouchEnd:function(){
                        U_SELECT = mySwiper.activeLoopIndex
                        fn&&fn()
                    }
                })
            }
            function inputEvent(fn){
                var $fxb = $('.fxb-input'),
                    $minus = $('.icon-minus'),
                    $plus = $('.icon-plus'),
                    $money = $('#money'),
                    $backmoney = $('#backmoney');

                $minus.unbind().bind('click',function(){
                    var fxb = $fxb.val()
                    fxb--;
                    if(fxb<=1){
                        fxb=1
                    }
                    $fxb.val( fxb )
                    fn&&fn()
                })

                $plus.unbind().bind('click',function(){
                    var fxb = $fxb.val()
                    fxb++;
                    if(fxb>=9999){
                        fxb=99
                    }
                    $fxb.val( fxb )
                    fn&&fn()
                })

                $fxb.unbind().bind('keyup',function() {
                    var $val = $fxb.val();
                    $val = $val.replace(/\D/g, "")
                    $val = $val > 20 ? 20 : $val;
                    fn&&fn()
                })
            }
            function checkTime(h) {
                var d = new Date();
                d.setHours(h.substring(0,2), h.substring(2,4), 0, 0)
                var m = d.getTime()
                var nm = m - 900000; //截止时间15分钟的时候不能投注
                var d2 = new Date()
                d2.setTime(nm);
                var t = d2.getHours() + ":" + d2.getMinutes()
                return t;
            }
        }

        function matchDomain(){
            var host = location.host||location.hostname;
            if(host =="pt.wozhongla.com"){
                $(".logo").addClass("ptlogo");
            }
        }
        matchDomain();

        //停售
        action.getControl(function(re){
           var opt3={
                   1:{
                       class:'.ssq'
                   },
                   18:{
                       class:'.cqssc'
                   },
                   113:{
                       class:'.dlt'
                   },
                   106:{
                       class:'.jx11x5'
                   },
                   6:{
                       class:'.jxssc'
                   },
                   108:{
                       class:'.pl3'
                   },
                   109:{
                       class:'.pl5'
                   },
                   110:{
                       class:'.qxc'
                   },
                   3:{
                       class:'.qlc'
                   },
                   2:{
                       class:'.fc3d'
                   },
                   104:{
                       class:'.gd11x5'
                   },
                   107:{
                       class:'.sd11x5'
                   }

            }

            for( var i in opt3){
                if(re[i]===false){
                    $('<i class="tingshou"></i>').appendTo(opt3[i].class);
                }
            }
        })


    }

    return {
        wzlindex : wzlindex
    }
});