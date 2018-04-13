define("wzlh5/kj/just", ["wzlh5/kj/jquery-2.1.1", "wzlh5/kj/handlebars-1.3.0", "wzlh5/kj/lotteryArgs", "wzlh5/kj/lib", "wzlh5/kj/action","wzlh5/1.0.0/ui"], function (require, exports, module) {
    var $ = require("wzlh5/kj/jquery-2.1.1");
    var hl = require("wzlh5/kj/handlebars-1.3.0").default;
    var lib = require("wzlh5/kj/lib");
    var args = require("wzlh5/kj/lotteryArgs");
    var ac = require("wzlh5/kj/action");
    var wzlui = require("wzlh5/1.0.0/ui")
    var l = lib.log;
    var z = lib.z;
    var dialog = wzlui.dialog;



    function init() {
        var ids = getIds();

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
    //取得彩种id
    function getIds() {
        var wl = window.localStorage;
        return wl.lotIds ? wl.lotIds.split(",") : [];
    }

    //写入彩种id
    function setIds(val) {
        window.localStorage.lotIds = val;
        return val;
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


    return {
        init: init
    }

});