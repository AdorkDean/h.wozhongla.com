define("wzlh5/kj/detail", ["wzlh5/kj/jquery-2.1.1", "handlebars/1.3.0/dist/cjs/handlebars", "wzlh5/kj/lotteryArgs", "wzlh5/kj/lib", "wzlh5/kj/action"], function (require, exports, module) {
    var $ = require("wzlh5/kj/jquery-2.1.1");
    var hl = require("handlebars/1.3.0/dist/cjs/handlebars").default;
    var lib = require("wzlh5/kj/lib");
    var args = require("wzlh5/kj/lotteryArgs");
    var ac = require("wzlh5/kj/action");
    var l = lib.log;
    var z = lib.z;


    function init() {
        var id = lib.href().lotId;
        var issue = lib.href().issue;
        var arg = args[id];
        $("#title").html(arg.name + "开奖详情")


        ac.getResultDetail(id, issue, function (data) {
            setDetail(data, id);
        });
        gotoTrade(arg);
    }

    function gotoTrade(arg) {
        if (arg.isTrade) {
            $("#gotoTrade").attr("href", arg.tradeRouter).html("投注" + arg.name);
            $("#gotoTradeBox").show();
        }
    }

    function setDetail(data, id) {
        var o = mergeData(data, id);
        var lt = hl.compile($("#detailTemp").html());
        $("#detail").html(lt(o));

        $("#loading").hide();

    }

//[{"lotteryId":"001","issueNum":"2015001","bonusTime":"2015-01-01 13:07:44.0","rewardTime":null,"baseCode":"01,07,09,16,20,23","specCode":"06","saleTotal":"389811558","winName":"一等奖,二等奖,三等奖,四等奖,五等奖,六等奖","winCount":"8,125,1915,88485,1603348,12661963","winMoney":"8455559,176444,3000,200,10,5","bonusBlance":"512536696"

    //混合开奖数据
    function mergeData(val, id) {
        if (!val) return {};
        var id = val.lotteryId
        var arg = args[id];


        var o = {};
        o.date = val.bonusTime.slice(5, 11) + ' 周' + lib.getWeek(val.bonusTime);

        o.ball = arg.lotteryType === 2 ? lib.makeZc(val.baseCode, id) : lib.makeBall(val.baseCode, id);


    o.id = id;
    o.name = arg.name;
    o.issue = val.issueNum;

    o.sale = lib.comma(val.saleTotal)
    o.bonusBalance = val.bonusBlance ? lib.comma(val.bonusBlance) : false;

    o.prizes = [];
    winName = val.winName.split(",");
    winCount = val.winCount.split(",");
    winMoney = val.winMoney.split(",");
    $.each(winName, function (inx) {


        o.prizes[inx] = {
            winName: winName[inx],
            winCount: lib.comma(winCount[inx]),
            winMoney: lib.comma(winMoney[inx])
        }

    })

        return o;
    }


    return {
        init: init
    }

});