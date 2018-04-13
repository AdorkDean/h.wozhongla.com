define(function (require, exports, module) {
    var $ = require("jquery");
    require("jquery.tap")($);
    var hl = require("handlebars").default;
    var lib = require("tool");
    var ui = require("ui");
    var args = require("lotteryArgs");
    var l = lib.log;
    var z = lib.z;
    var ac = require("action");
    var lotId = lib.href().lotId||"001";
    var arg = args[lotId];
    var pageNum = 30;
    var pageNo = 1;
    var isLoading = false; //是否正在加载
    var issueList = [];


    function init() {
        var href = window.localStorage.goBack == "just" ? "just.html" : "index.html";
        $("#headerBack").attr("href",href);
        ui.backbutton(function(){ui.toHref(href)});

        $("#title").html(arg.name+"开奖")
        $("#chatrLink").attr("href","chart.html?lotId="+lotId);
        arg.isGp && $("#detailLink").parent().hide();


        args[lotId].lotteryType ===2 && $("#navBar").hide();
        getData(function(data){
            var issue = data[0].issueNum;
            $("#detailLink").attr("href","detail.html?lotId="+lotId+"&issue="+issue);
            $("#chatrLink").attr("href","chart.html?lotId="+lotId+"&issue="+issue);
        })
        /*
        var justIds = getIds();
        justIds.indexOf(lotId) > -1 ? $("#justOn").show() : $("#justOff").show()


        //if (arg.isTrade){
        //    var h = '<div class="foot-buy-btn"><a href="http://www.wozhongla.com/down/download.html" target="_blank">投注'+arg.name+'</a></div>';
        //    $("body").append(h);
        //    $("#loading").addClass("foot-h50");
        //
        //
        //}




        $("#justOn").tap(function(){
            $("#justOff").show();
            $(this).hide();
            removeIds(lotId);
        })

        $("#justOff").tap(function(){
            $("#justOn").show();
            $(this).hide();
            addIds(lotId);
        })
        */
    }

    function getData(fn){

        ui.loader("show");
        $(document).unbind("scroll");
        if (isLoading) return;

        isLoading = true;
        ac.getResultList({lotId:lotId,pageNum:pageNum,pageNo:pageNo,startIssue:'',endIssue:''}, function(data){
            addToList(data,lotId);
            isLoading = false;
            pageNo++;
            $("#loading").hide()
            $(document).bind("scroll",onScroll);
            ui.loader("hide");
            if(fn) fn(data);
        });
    }

    function onScroll() {
        if (Math.abs(document.body.clientHeight - document.documentElement.clientHeight) <= (document.documentElement.scrollTop || document.body.scrollTop)) {
            //alert("到底了")}
            $("#loading").show()
            setTimeout(getData, 1500);
        }
    }

   function gotoTrade(arg){
        if (arg.isTrade){
            $("#gotoTrade").attr("href",arg.tradeRouter).html("投注"+arg.name);
            $("#gotoTradeBox").show();
        }
    }

    //取得彩种id
    function getIds() {
        var wl = window.localStorage;
        return wl.justIds ? wl.justIds.split(",") : [];
    }

    //添加彩种id
    function addIds(id) {
        var ids = getIds();
        $.each(ids,function(inx,n){
            if (id == n) return false;
        })
        ids.push(id)
        window.localStorage.justIds = ids;
        return true;
    }

    //删除
    function removeIds(id) {
        var ids = getIds();
        var wl = window.localStorage;
        $.each(ids, function (inx, n) {
            if (id == n) ids.splice(inx, 1);
        })
        window.localStorage.justIds = ids;
        return true;
    }
    //增加到列表
    function addToList(data,lotId) {
        var list = getList(data,lotId)
        var lt = hl.compile($("#resultLIstTemp").html());
        $("#resultLIst").append(lt({
            list: list
        }));
       // $(".analyse-detail:first").show();
        //ui.bindTap();//把A标签绑定tap
    }




    //获取显示的彩种列表;
    function getList(list,id) {
        var a = [];
        $.each(list, function (i,o) {
            var issue = o.issueNum;
            if (issueList.indexOf(issue)==-1){
                a.push(mergeData(o, id))
                issueList.push(issue);
            }
        })
        return a;
    }



    //混合开奖数据
    function mergeData(val) {
        var id = val.lotteryId
        var arg = args[id];
        //if (arg.lotteryType===4) return makeJc(o);
        var o = {};
        if (!val) return {};

        o.id = id;
        o.name = arg.name;
        o.issue = val.issueNum;
        o.isGp = arg.isGp;
        val.baseCode =  lib.formatBall(val.baseCode,val.specCode);

        if (o.isGp){
            o.date = val.bonusTime.slice(5, -5);
        }else{
        	//+ ' 周' + lib.getWeek(val.bonusTime);
            o.date = val.bonusTime.slice(5, -5) 
        }
        o.ball = arg.lotteryType === 2 ? lib.makeZc(val.baseCode, id) : lib.makeBall(val.baseCode, id);
        if (arg.isSsc) {
            var ball = val.baseCode.split(",")
            o.ball += '<span class="score-grey">' + lib.getDxds(ball[3]) + ' | ' + lib.getDxds(ball[4]) + '</span>';
        }
        if (parseInt(val.bonusBlance,10)&&arg.lotteryType!==2) {
            o.ball += '<span class="score-grey jc">奖池：'+lib.toYi(val.bonusBlance)+'</span>';
        }
        return o;
    }

    return {
        init: init
    }


})
;