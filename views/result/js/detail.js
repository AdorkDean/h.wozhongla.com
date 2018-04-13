define("detail", ["lib/jquery-2.1.1.js", "lib/handlebars-1.3.0.js", "lib/jquery.tap-0.2.9", "lotteryArgs", "ui", "tool", "action"], function (require, exports, module) {
    var $ = require("jquery");
    require("jquery.tap")($);
    var ui = require("ui");
    var hl = require("handlebars").default;
    var lib = require("tool");
    var args = require("lotteryArgs");
    var ac = require("action");
    var l = lib.log;
    var z = lib.z;
    var id = lib.href().lotId || 001;
    var issue = lib.href().issue;
    var arg = args[id];
    var baseCode = "";
    ui.bindTap();//把A标签绑定tap

    function init() {
        ui.backbutton(function () {
            ui.toHref("list.html?lotId=" + id)
        });
        $("#headerBack").attr("href", "list.html?lotId=" + id);
        ui.loader("show")
        ac.getResultDetail(id, issue, function (data) {
            ui.loader("hide")
            setDetail(data, id);
            baseCode = data.baseCode.split(",")
        });

        $("#title").html(arg.name + "开奖详情");
        $("#chatrLink").attr("href", "chart.html?lotId=" + id + "&issue=" + issue);
        $("#listLink").attr("href", "list.html?lotId=" + id);

        if (id == "001" || id == "113") {
            $("#counter").show().click(function () {
                location.href = "counter.html?lotId=" + id + "&issue=" + issue;
            });
        }


        //if (arg.isTrade){
        //    var h = '<div class="foot-buy-btn"><a href="http://www.wozhongla.com/down/download.html" target="_blank">投注'+arg.name+'</a></div>';
        //    $("body").append(h);
        //
        //
        //}

    }

    function setDetail(data, id) {
        var o = mergeData(data, id);
        var lt = hl.compile($("#detailTemp").html());
        $("#detail").html(lt(o));

        //如果是传统足彩
        if (arg.lotteryType == 2){
            ac.getZcMatch(obj = {lotId : id,lotIssue : issue},setMatch )
        }

    }
    function setMatch(val){
        if (!val.length) return;
        var h = '';
        $.each(val,function(i,o){
            h +='<tr>';
            h +='<td>'+ o.num+'</td>';
            h +='<td>'+ o.matchHome+'</td>';

            if (id== "116"){
                h +='<td>主<span class="red tb">'+ baseCode[2*i]+'</span>, 客<span class="red tb">'+baseCode[2*i+1]+'</span></td>';
            }else if (id == "115") {
                h +='<td>半<span class="red tb">'+ baseCode[2*i]+'</span>, 全<span class="red tb">'+baseCode[2*i+1]+'</span></td>';
            }else{
                h +='<td class="red tb">'+ baseCode[i]+'</td>';
            }
            h +='<td>'+ o.matchGuest+'</td>';
            h +='</tr>';
        })
        $("#matchList").html(h);
        $("#matchList tr:odd").addClass("odd");
        $("#matchListGroup").show();
    }

    //混合开奖数据
    function mergeData(val, id) {
        if (!val) return {};
        var id = val.lotteryId
        var arg = args[id];

        val.baseCode = lib.formatBall(val.baseCode, val.specCode);
        var o = {};
       // + ' 周' + lib.getWeek(val.bonusTime);
        o.date = val.bonusTime.slice(5, -5) 

        o.ball = arg.lotteryType === 2 ? lib.makeZc(val.baseCode, id) : lib.makeBall(val.baseCode, id);
        if (arg.isSsc) {
            o.ball += '<span class="score-grey">' + lib.getDxds(val.baseCode.slice(-2, -1)) + ' | ' + lib.getDxds(val.baseCode.slice(-1)) + '</span>';
        }

        o.id = id;
        o.name = arg.name;
        o.issue = val.issueNum;

        o.sale = lib.comma(val.saleTotal)
        o.bonusBalance = parseInt(val.bonusBlance,10) ? lib.comma(val.bonusBlance) : false;


        o.prizes = [];
        winName = val.winName ? val.winName.split(",") : ["-"];
        winCount = val.winCount ? val.winCount.split(",") : ["-"];
        winMoney = val.winMoney ? val.winMoney.split(",") : ["-"];
        $.each(winName, function (inx) {
            if (parseInt(winMoney[inx],10)){
            o.prizes.push({
                winName: winName[inx],
                winCount: lib.comma(winCount[inx]),
                winMoney: lib.comma(winMoney[inx])
            })
            }

        })
        return o;

    }

    return {
        init: init
    }

});


