define(function (require, exports, module) {
    var $ = require("jquery");
    require("jquery.tap")($);
    var hl = require("handlebars").default;
    var lib = require("tool");
    var ui = require("ui");
    var args = require("lotteryArgs");
    var ac = require("action");
    var l = lib.log;
    var z = lib.z;
    var lotId = lib.href().lotId || "001";
    var issue = lib.href().issue || "2015102";
    var arg = args[lotId];
    var winItem = 0;
    var winName = [];
    var winMoney = [];
    var winBall0 = [];
    var winBall1 = [];
    var ball0 = [];
    var ball1 = [];

    function init() {
        $("#title").html(arg.name + "奖金计算");
        $(".name").html(arg.name);
        $(".issue").html(issue);
        $("#headerBack").attr("href", "detail.html?lotId=" + lotId + "&issue=" + issue);
        $("#select" + lotId).show();

        $(".ball-" + lotId + "-0 li").click(function () {
            var css = $(this).attr("class");
            if (css == "active") {
                $(this).removeClass("active")
            } else {
                $(this).addClass("active")
            }
            setHtml();
        })
        $(".ball-" + lotId + "-1 li").click(function () {
            var css = $(this).attr("class");
            if (css == "active") {
                $(this).removeClass("active")
            } else {
                $(this).addClass("active")
            }
            setHtml();
        })
        $("#tradeBtn").click(setWinList);
        ui.loader("show");
        ac.getResultDetail(lotId, issue, function (data) {
            ui.loader("hide");
            $("#selectBox").show()
            winName = data.winName.split(",");
            winMoney = data.winMoney.split(",");
            winBall0 = data.baseCode.split(",");
            winBall1 = data.specCode.split(",");
            $("#resultBall").html(lib.makeBall(data.baseCode + "#" + data.specCode))
        });
    }

    function setWinList() {
        if (!winItem) return ui.alert("您选择的号码不足1注");
        if (!winBall0.length) return ui.alert("当前网络无法获取信息，请稍后重试");
        $("#showBox").show();
        $("#selectBox").hide();
        var winItemList = {
            "001": countWin001(ball0.length,
                ball1.length,
                getIntersectLen(winBall0, ball0),
                getIntersectLen(winBall1, ball1)
            ), "113": countWin113(ball0.length,
                ball1.length,
                getIntersectLen(winBall0, ball0),
                getIntersectLen(winBall1, ball1)
            )
        }[lotId]
        var h = '';
        var tatal = 0
        $.each(winItemList, function (i, n) {
            var money = parseInt(winMoney[i], 10);
            if (money) {
                h += '<tr>';
                h += '<td><span class=" wzl-s-red geshu">' + n + '</span></td>';
                h += '<td class="jiangx">' + winName[i] + '</td>';

                h += '<td class="jiangx">' + lib.comma(money) + '</td>';
                h += '<td class="jine wzl-s-red wzl-s-red ">' + lib.comma(money * n) + '</td>';
                h += '</tr>';

                tatal += money * n;
            }
        })

        $("#winList").html(h)

        $("#tatal").html('中奖总额：<span class="wzl-s-red tb">' + lib.comma(tatal) + '</span> 元')

        $("#headerBack").attr("href", "javascript:").click(back);
        ui.backbutton(back);
        function back() {
            $("#showBox").hide();
            $("#selectBox").show();
            ui.backbutton(function(){
                location.href =  "detail.html?lotId=" + lotId + "&issue=" + issue
            });
            $("#headerBack").unbind("click").click(function () {
                setTimeout(function(){
                    $("#headerBack").attr("href", "detail.html?lotId=" + lotId + "&issue=" + issue);
                },1000)

            })
        }


    }

    function getIntersectLen(a, b) {
        var x = 0
        $.each(a, function (i, n) {
            if (b.indexOf(n) > -1) {
                x++
            }
        })
        return x
    }

    function getBall() {
        ball0 = [];
        $(".ball-" + lotId + "-0 li.active").each(function () {
            ball0.push($(this).html())
        })
        ball1 = [];
        $(".ball-" + lotId + "-1 li.active").each(function () {
            ball1.push($(this).html())
        })
    }

    function setHtml() {
        getBall()
        winItem = countItem(ball0, ball1, lotId)

        $("#item").html(winItem);
        $("#sum").html(winItem * 2);
        $("#ball0").html(ball0.join(" "));
        $("#ball1").html(ball1.join(" "));


    }

    function countItem(a, b, lotId) {
        return {
            "001": function () {
                return C(a.length, 6) * b.length;
            }(),
            "113": function () {
                return C(a.length, 5) * C(b.length, 2);
            }()
        }[lotId]


        function C(n, m, isRepeat) {
            if (isRepeat) {
                var c = 1;
                for (var i = n - m; i < n; c *= ++i);
                return c;

            } else {
                var n1 = 1, n2 = 1;
                for (var i = n, j = 1; j <= m; n1 *= i--, n2 *= j++);
                return n1 / n2;
            }
        }

    }


    function countWin001(red_num, blue_num, right_red_num, right_blue_num) {
        var p1 = 0, p2 = 0, p3 = 0, p4 = 0, p5 = 0, p6 = 0,
            v1 = Number(red_num),
            v2 = Number(blue_num),
            v3 = Number(right_red_num),
            v4 = Number(right_blue_num);
        if (v3 >= 6 && v4 == 1) p1 = 1;
        if (v3 >= 6 && v4 >= 0) p2 = Number(PaiLie(v2 - v4, 1));
        if (v3 >= 5 && v4 >= 1) p3 = Number(PaiLie(v3, 5)) * Number(PaiLie(v1 - v3, 1));
        if (v3 >= 5 && v4 >= 0) p4 = Number(PaiLie(v3, 5)) * Number(PaiLie(v2 - v4, 1)) * Number(PaiLie(v1 - v3, 1));
        if (v3 >= 4 && v4 >= 1) p4 = p4 + Number(PaiLie(v3, 4)) * Number(PaiLie(v1 - v3, 2));
        if (v3 >= 4 && v4 >= 0) p5 = Number(PaiLie(v3, 4)) * Number(PaiLie(v2 - v4, 1)) * Number(PaiLie(v1 - v3, 2));
        if (v3 >= 3 && v4 >= 1) p5 = p5 + Number(PaiLie(v3, 3)) * Number(PaiLie(v1 - v3, 3));
        if (v3 >= 2 && v4 >= 1) p6 = p6 + Number(PaiLie(v3, 2)) * Number(PaiLie(v1 - v3, 4));
        if (v3 >= 1 && v4 >= 1) p6 = p6 + Number(PaiLie(v3, 1)) * Number(PaiLie(v1 - v3, 5));
        if (v3 >= 0 && v4 >= 1) p6 = p6 + Number(PaiLie(v1 - v3, 6));
        return [p1, p2, p3, p4, p5, p6];
    }

    function countWin113(red_num, blue_num, right_red_num, right_blue_num) {
        var p1 = 0, p2 = 0, p3 = 0, p4 = 0, p5 = 0, p6 = 0,
            v1 = Number(red_num),
            v2 = Number(blue_num),
            v3 = Number(right_red_num),
            v4 = Number(right_blue_num);
            /*一等奖：投注号码与当期开奖号码全部相同(顺序不限，下同)，即中奖；
         　　二等奖：投注号码与当期开奖号码中的5个前区号码及任意1个后区号码相同，即中奖；
         　　三等奖：投注号码与当期开奖号码中的5个前区号码相同，或者任意4个前区号码及2个后区号码相同，即中奖；
         　　四等奖：投注号码与当期开奖号码中的任意4个前区号码及任意1个后区号码相同，或者任意3个前区号码及2个后区号码相同，即中奖；
         　　五等奖：投注号码与当期开奖号码中的任意4个前区号码相同，或者任意3个前区号码及1个后区号码相同，或者任意2个前区号码及2个后区号码相同，即中奖；
         　　六等奖：投注号码与当期开奖号码中的3个前区号码相同，或者任意1个前区号码及2个后区号码相同，或者任意2个前区号码及任意1个后区号码相同，或者2个后区号码相同，即中奖。*/
        if (v1 == 5 && v2 == 2) {
            if (v3 == 5 && v4 == 2) p1 = 1;
            if (v3 == 5 && v4 == 1) p2 = 1;
            if ((v3 == 5 && v4 == 0) || (v3 == 4 && v4 == 2)) p3 = 1;
            if ((v3 == 4 && v4 == 1) || (v3 == 3 && v4 == 2)) p4 = 1;
            if ((v3 == 4 && v4 == 0) || (v3 == 3 && v4 == 1) || (v3 == 2 && v4 == 2)) p5 = 1;
            if ((v3 == 3 && v4 == 0) || (v3 == 1 && v4 == 2) || (v3 == 2 && v4 == 1) || (v3 == 0 && v4 == 2)) p6 = 1;
        } else {
            if (v3 == 5 && v4 == 2) p1 = 1;
            if (v3 == 5 && v4 >= 1) p2 = Number(PaiLie(v4, 1)) * Number(PaiLie(v2 - v4, 1));
            if (v3 == 5 && v4 >= 0) p3 += Number(PaiLie(v2 - v4, 2));
            if (v3 >= 4 && v4 == 2) p3 += Number(PaiLie(v3, 4)) * Number(PaiLie(v1 - v3, 1));
            if (v3 >= 4 && v4 >= 1) p4 += Number(PaiLie(v3, 4)) * Number(PaiLie(v1 - v3, 1)) * Number(PaiLie(v4, 1)) * Number(PaiLie(v2 - v4, 1));
            if (v3 >= 3 && v4 >= 2) p4 += Number(PaiLie(v3, 3)) * Number(PaiLie(v1 - v3, 2));
            if (v3 >= 4 && v4 >= 0) p5 += Number(PaiLie(v3, 4)) * Number(PaiLie(v1 - v3, 1)) * Number(PaiLie(v2 - v4, 2));
            if (v3 >= 3 && v4 >= 1) p5 += Number(PaiLie(v3, 3)) * Number(PaiLie(v1 - v3, 2)) * Number(PaiLie(v4, 1)) * Number(PaiLie(v2 - v4, 1));
            if (v3 >= 2 && v4 >= 2) p5 += Number(PaiLie(v3, 2)) * Number(PaiLie(v1 - v3, 3));
            if (v3 >= 3 && v4 >= 0) p6 += Number(PaiLie(v3, 3)) * Number(PaiLie(v1 - v3, 2)) * Number(PaiLie(v2 - v4, 2));
            if (v3 >= 1 && v4 >= 2) p6 += Number(PaiLie(v3, 1)) * Number(PaiLie(v1 - v3, 4));
            if (v3 >= 2 && v4 >= 1) p6 += Number(PaiLie(v3, 2)) * Number(PaiLie(v1 - v3, 3)) * Number(PaiLie(v4, 1)) * Number(PaiLie(v2 - v4, 1));
            if (v3 >= 0 && v4 >= 2)p6 += Number(PaiLie(v1 - v3, 5))
        }
        return [p1, p2, p3, p4, p5, p6];
    }

    function PaiLie($, _) {
        var B = 1,
            A = 1;
        if ($ <= 0) return 0;
        if ($ < _) return 0;
        for (var C = $ - _ + 1; C < $ + 1; C++) B = B * C;
        for (C = 1; C < _ + 1; C++) A = A * C;
        return B / A
    }

    //混合开奖数据
    function mergeData(val, id) {

        var o

        return o;
    }


    return {
        init: init
    }

});