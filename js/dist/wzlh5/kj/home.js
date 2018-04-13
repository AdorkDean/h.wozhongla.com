define("wzlh5/kj/home", ["wzlh5/kj/jquery-2.1.1","handlebars/1.3.0/dist/cjs/handlebars","wzlh5/kj/iscroll-5.1.3", "wzlh5/kj/lotteryArgs","wzlh5/kj/areaArgs", "wzlh5/kj/lib","wzlh5/kj/action","wzlh5/1.0.0/ui"], function (require, exports, module) {
    var $ = require("wzlh5/kj/jquery-2.1.1");
    var hl = require("handlebars/1.3.0/dist/cjs/handlebars").default;
    var lib = require("wzlh5/kj/lib");
   //require("wzlh5/kj/iscroll-5.1.3");
    var wzlui = require("wzlh5/1.0.0/ui");
    var args = require("wzlh5/kj/lotteryArgs");
    var areas = require("wzlh5/kj/areaArgs");
    var ac = require("wzlh5/kj/action");

    var l = lib.log;
    var z = lib.z;
    var filterType = null;
    var filterVal = null;
    var title = null;
    var dialog = wzlui.dialog;

    function init() {
        //new IScroll('#jcwrapper');
        getByArea(35);
        sideBarHandle();
    }





    function getByArea(areaId){
        var ids = [];
        $.each(areas,function(key,val){
            if (areaId == val.id) ids = val.lotIds;
        })
        //console.log(ids);
        ac.getNewResult(ids, function(data){
            setList(data,ids);
        })
    }


    //写入到页面；
    function setList(data,ids) {
        if (!data) dialog('暂无定制！');

        var ids = ids || getAllIds(data);
        var o = lib.listToObject(data);
      //  $("#resultLIst").html(makeList(o, ids));

        var list = makeList(o,ids);
        var lt = hl.compile($("#resultLIstTemp").html());
        $("#resultLIst").html(lt({
            list: list
        }));
        $("#loading").hide()


    }
    //侧栏操作
    function sideBarHandle(){
        $("#floatingBtn").click(function () {
            $("#floating").show(100)
        })
        $("#floatingClose").click(function () {
            $("#floating").hide(100)
        })
        $("#filterBox a").click(function () {
            $("#filterBox a").removeClass("act");
            $(this).addClass("act");
            filterVal = $(this).data("val");
            if($(this).data('val')=='35'){
                console.log(111);
            }
            title = $(this).html();
        })

        $(".type-box").click(function () {
            filterType = $(this).data("box")
        })

        $("#floatingConfirm").click(function(){
            if (filterType === "area"){
                $("#resultLIst").html("");
                getByArea(filterVal)
                $("#loading").show()
            }else if (filterType === "week"){
                $("#resultLIst").html("");
                getByArea(filterVal)
                $("#loading").show()
            }

            $("#title").html(title+"开奖")
            $("#floating").hide(100)
        })
    }

    //获得列表中彩种的所有id
    function getAllIds(list) {
        var a = [];
        $.each(list, function (i) {
            if (list[i]) a.push(list[i].lotId);
        })
        return a;
    }


    //获取显示的彩种列表;
    function makeList(list, ids) {
        var a = [];
        $.each(ids, function (i, n) {
            if (list[n]) a.push(mergeData(list[n]));
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
            o.date = val.bonusTime.slice(5, -3);
        }else{
            o.date = val.bonusTime.slice(5, 11) + ' 周' + lib.getWeek(val.bonusTime);
        }
        o.ball = arg.lotteryType === 2 ? lib.makeZc(val.baseCode, id) : lib.makeBall(val.baseCode, id);
        if (arg.isSsc) {
            o.ball += '<span class="score-grey">' + lib.getDxds(val.baseCode.slice(-2, -1)) + ' | ' + lib.getDxds(val.baseCode.slice(-1)) + '</span>';
        }
        return o;
    }
    yindao();
    function yindao(){
        setTimeout(function(){
            $('#yindao').hide();
            $('#lscontent').show().animate({opacity:1},1000);

        },4000);
    }
    return {
        init: init
    }

});