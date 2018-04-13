define("wzlh5/kj/list", ["wzlh5/kj/jquery-2.1.1", "wzlh5/kj/handlebars-1.3.0","wzlh5/kj/lotteryArgs", "wzlh5/kj/lib", "wzlh5/kj/action"], function (require, exports, module) {
    var $ = require("wzlh5/kj/jquery-2.1.1");
    var hl = require("wzlh5/kj/handlebars-1.3.0").default;

    var lib = require("wzlh5/kj/lib");
    var ui = require("wzlh5/kj/ui");
    var args = require("wzlh5/kj/lotteryArgs");
    var l = lib.log;
    var z = lib.z;
    var ac = require("wzlh5/kj/action");


    function init() {
        var lotId = lib.href().lotId;
        $("#title").html(args[lotId].name+"开奖")
        ac.getResultList({lotId:lotId,startIssue:'',endIssue:''}, function(data){
            addToList(data,lotId);
        });

        var justIds = getIds();
        justIds.indexOf(lotId) > -1 ? $("#justOn").show() : $("#justOff").show()

        $("#justOn").click(function(){
            $("#justOff").show();
            $(this).hide();
            removeIds(lotId);
        })

        $("#justOff").click(function(){
            $("#justOn").show();
            $(this).hide();
            addIds(lotId);
        })
        gotoTrade(args[lotId]);
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
        console.log(wl);
        return wl.lotIds ? wl.lotIds.split(",") : [];
    }

    //取得彩种id
    function addIds(id) {
        var ids = getIds();
        $.each(ids,function(inx,n){
            if (id == n) return false;
        })
        ids.push(id)
        window.localStorage.lotIds = ids;
        return true;
    }

    //删除
    function removeIds(id) {
        var ids = getIds();
        var wl = window.localStorage;
        $.each(ids, function (inx, n) {
            if (id == n) ids.splice(inx, 1);
        })
        window.localStorage.lotIds = ids;
        return true;
    }
    //增加到列表
    function addToList(data,lotId) {
        var list = getList(data,lotId)
        var lt = hl.compile($("#resultLIstTemp").html());
        $("#resultLIst").html(lt({
            list: list
        }));
        $("#loading").hide()
    }




    //获取显示的彩种列表;
    function getList(list,id) {
        var a = [];
        $.each(list, function (i) {
            a.push(mergeData(list[i],id))
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


})
;