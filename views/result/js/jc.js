define("jc", ["lib/jquery-2.1.1.js", "lib/handlebars-1.3.0.js", "lib/jquery.tap-0.2.9","lib/jquery.json-2.5.1", "lib/cache-0.0.1.js", "lotteryArgs", "ui", "tool", "action"], function (require, exports, module) {
    var $ = require("jquery");
    require("jquery.tap")($);
    require("jquery.json")($);
    var hl = require("handlebars").default;
    var lib = require("tool");
    var cache = require("cache");
    var ui = require("ui");
    var l = lib.log;
    var z = lib.z;
    var ac = require("action");
    var ui = require("ui");
    var lotId = lib.href().lotId || "301";
    var dayList = getDayList(30);
    var issue = lib.href().issue || dayList[0];

    var arg = {
        "301": {"name": "让球胜平负"},
        "320": {"name": "胜平负"},
        "302": {"name": "比分"},
        "303": {"name": "进球数"},
        "304": {"name": "半全场"}
    }


    function init() {
        ui.backbutton(ui.backExit);

       // cache.clear()
        //ui.bindTap();//把A标签绑定tap

        $("#footerNav li").click(function(){
            var href = $(this).data("href");
            if (href) location.href = href;
        })


        setDay(dayList);
        setLottery();
        setList();
        $("#dayOptionBtn").click(function () {
            $("#lotOption").hide();
            $("#dayOption").slideToggle(200)
        })

        $("#lotOptionBtn").click(function () {
            $("#dayOption").hide();
            $("#lotOption").slideToggle(200)
        })
    }

    //写入到页面
    function setList() {
        if (issue == dayList[0]) {
            var cacheData = cache.get("jc-" + lotId + "-" + issue, 1000 * 60 * 5);
            if (cacheData){
                return addToList($.parseJSON(cacheData));
            }
        }

        ui.loader("show");
        ac.getJcResult(lotId, issue, function (data) {
            ui.loader("hide");
            if (!data) return $("#jcResult").html(ui.tip(issueToDay(issue)+"暂无比赛数据", "请选择其他日期查看"))
            if (issue == dayList[0]) cache.set("jc-" + lotId + "-" + issue, $.toJSON(data));
            addToList(data);
        })

    }

    function setDay(dayList) {
        var h = "";
        var yesterday = getDay(-1);
        $.each(dayList, function (i, n) {
            var day = n == yesterday ? "昨日" : formatDay(n);
            if (n == issue) {
                h += '<li class="action">' + day + '</li>';
                $("#dayOptionBtn").html(day);
            } else {
                h += '<li data-href="jc.html?lotId=' + lotId + '&issue=' + n + '">' + day + '</li>';
            }
        })


        $("#dayList").html(h);
        $("#dayList li").click(function () {
            var href = $(this).data("href");
            if (href) window.location.href = href
        })
    }

    function formatDay(day) {
        return day.slice(4, 6) + "-" + day.slice(-2)
    }

    function issueToDay(issue) {
        return issue.slice(4, 6) + "月" + parseInt(issue.slice(-2))+"日";
    }

    function setLottery() {
        var h = '';
        $.each(arg, function (i, o) {
            if (i == lotId) {
                h += '<li class="action">' + o.name + '</li>';
                $("#lotOptionBtn").html(o.name);
            } else {
                h += '<li data-href="jc.html?lotId=' + i + '&issue=' + issue + '">' + o.name + '</li>';
            }
        })

        $("#lotList").html(h);
        $("#lotList li").click(function () {
            var href = $(this).data("href");
            if (href) window.location.href = href
        })
    }


    function getDayList(val) {
        var arr = [];
        for (var i = -1; i > -1 * (val + 1); i--) {
            arr.push(getDay(i));
        }
        return arr;
    }

    // -1昨天，0今天， 1明天 2后天

    function getDay(val) {
        var val = val || 0
        var data = new Date();
        data.setDate(data.getDate() + val);
        var y = data.getFullYear().toString();
        var m = lib.pad(data.getMonth() + 1);
        var d = lib.pad(data.getDate());
        return y + m + d;
    }


    //增加到列表
    function addToList(data) {
        var list = getList(data);
        var lt = hl.compile($("#jcResultSp").html());
        $("#jcResult").html(lt({
            list: list
        }));
    }

    //获取显示的彩种列表;
    function getList(list) {
        var a = [];
        $.each(list, function (inx, n) {
            var obj = mergeData(n);
            if (obj) a.push(obj);
        })
        return a;
    }


    //混合开奖数据
    function mergeData(o) {
        if (!o) return false;
        if (!o.matchHalf && !o.matchAll ) return false;
        var id = lotId;
        var sceneId = o.sceneId + "";
        o.matchHome = o.matchHome.slice(0, 4)
        if (id == "301") {
            o.matchHome = '<div class="rqspf">' + o.matchHome.slice(0, 4);
            var matchBall = parseInt(o.matchBall, 10) > 0 ? 3 : 0;
            o.matchHome += '<br /><span class="ball-' + matchBall + '">(' + o.matchBall + ')</span></div>';
        }
        o.matchGuest = o.matchGuest.slice(0, 4)
        o.wook = "周" + ["", "一", "二", "三", "四", "五", "六", "日"][sceneId.slice(-4, -3)];
        o.no = sceneId.slice(-3);
        o.matchResult = getResult(o);
        return o;

        //{"spf":"","spfNumber":null,"matchAll":"平","bfNumber":"平","sceneId":"201509056025","matchBall":"-2","endTime":"2015-09-06 01:00:00.0","zjqNumber":"","lotterySortId":"LOT_JCZQ","matchEvents":"欧预赛","matchHome":"黑山","matchGuest":"列支敦士登","issueNumber":"20150905","matchHalf":"平","bqcNumber":"","sizePoint":null,"winsGap":null},
        function getResult(o) {
            var h = '';

            var matchHalf = o.matchHalf && o.matchHalf.replace(/:/, " ：");
            var matchAll = o.matchAll && o.matchAll.replace(/:/, " ：");
            if (matchAll == "cancel") matchAll="取消";
            if (id == "301" || id == "320") {
                h += '<div class="result-' + (o.spfNumber || null) + ' nobg">' + (spf(o.spfNumber) || "&nbsp;") + '</div>'
                h += '<div class="result-' +( o.spfNumber || null) + '">' + (matchAll || "&nbsp;") + '</div>'
            }
            if (id == "302") {
                h += '<div class="mt result-' + (o.spfNumber || null) + '">' + (matchAll || "&nbsp;") + '</div>'
            }
            if (id == "303") {
                h += '<div class="result-' + (o.spfNumber || null) + ' nobg">' + (o.zjqNumber || "&nbsp;") + '</div>'
                h += '<div class="result-' + (o.spfNumber || null) + '">' + (matchAll || "&nbsp;") + '</div>'
            }
            if (id == "304") {
                var bqc = o.bqcNumber.split("-");
                h += '<div class="result-' + (bqc[0] || null) + '">' + (matchHalf || "&nbsp;") + ' ' + spf(bqc[0]) + '</div>'
                h += '<div class="result-' + (bqc[1] || null) + '">' + (matchAll || "&nbsp;") + ' ' + spf(bqc[1]) + '</div>'
            }
            return h;
        }
    }

    function spf(o) {
        if (o===null) return "-"
        var m = '';
        if (o == 1) {
            m = '平';
        } else if (o == 3) {
            m = '胜';
        } else if (o == 0) {
            m = '负';
        }
        return m;
    }

    return {
        init: init
    }


})
;