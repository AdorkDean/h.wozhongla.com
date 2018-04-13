define("just", ["lib/jquery-2.1.1.js", "lib/handlebars-1.3.0.js","lib/cache-0.0.1.js", "lib/jquery.tap-0.2.9","lib/jquery.json-2.5.1", "lotteryArgs", "ui", "tool", "action"], function (require, exports, module) {
    var $ = require("jquery");
    require("jquery.tap")($);
    require("jquery.json")($);
    var hl = require("handlebars").default;
    var lib = require("tool");
    var cache = require("cache");
    var args = require("lotteryArgs");
    var ac = require("action");
    var ui = require("ui");
    var l = lib.log;
    var z = lib.z;

    function init() {
        ui.backbutton(ui.backExit);
        cache.set("goBack","just");
        $("#footerNav li").click(function(){
            var href = $(this).data("href");
            if (href) location.href = href;
        })
        var ids = getIds();
        if (!ids.length){
            $("#resultLIst").html('<div class="just-tip"><div class="h1">您尚未定制开奖信息</div><div class="h2">可以去开奖列表页定制</div></div>');
            $("#loading").hide()
           return
        }
        var lsKey = "just-" +ids.join("-");

        var cacheData = cache.get(lsKey,1000*60*5);
        if (cacheData) return setList($.parseJSON(cacheData),ids);



        ui.loader("show");
        ac.getNewResult(ids, function(data){
            setList(data,ids);
            cache.set(lsKey,$.toJSON(data));
            ui.loader("hide");
        })

    }

    //写入到页面；
    function setList(data,ids) {
        if (!data) alert("数据获取错误！");

        var ids = ids || getAllIds(data);
        var o = lib.listToObject(data);
        //  $("#resultLIst").html(makeList(o, ids));

        var list = makeList(o,ids);
        var lt = hl.compile($("#resultLIstTemp").html());
        $("#resultLIst").html(lt({
            list: list
        }));
        ui.bindTap();//把A标签绑定tap
    }
    //取得彩种id
    function getIds() {
        var wl = window.localStorage;
        return wl.justIds ? wl.justIds.split(",") : [] ;
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
            o.date = val.bonusTime.slice(5, -5);
        }else{
            o.date = val.bonusTime.slice(5, 11) + ' 周' + lib.getWeek(val.bonusTime);
        }
        o.ball = arg.lotteryType === 2 ? lib.makeZc(val.baseCode, id) : lib.makeBall(val.baseCode, id);
        if (arg.isSsc) {
            var ball = val.baseCode.split(",")
            o.ball += '<span class="score-grey">' + lib.getDxds(ball[3]) + ' | ' + lib.getDxds(ball[4]) + '</span>';
        }
        return o;
    }


    return {
        init: init
    }

});