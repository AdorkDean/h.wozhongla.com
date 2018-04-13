define(function (require, exports, module) {
    var $ = require("jquery");
    var lib = require("tool");
    var args = require("lotteryArgs");
    var ac = require("action");
    var ui = require("ui");
    var issue = lib.href().issue;

    var l = lib.log;
    var z = lib.z;

    var lotId = lib.href().lotId || "001";

    var chartId = lib.href().chartId || "20001";
    var chartType = lib.href().chartType || "0";

    var arg = args[lotId];

    var cId = arg.oldId ? arg.oldId : lotId;
    var typeName = ["基本走势", "高级走势", "K线图", "直方图", "遗漏统计", "跟随统计"];

    function init() {
        ui.backbutton(function () {
            ui.toHref("list.html?lotId=" + lotId)
        });
        $("#headerBack").attr("href", "list.html?lotId=" + lotId);
        $("#title").html(arg.name);
        $("#listLink").attr("href", "list.html?lotId=" + lotId)
        var issue = lib.href().issue;
        $("#detailLink").attr("href", "detail.html?lotId=" + lotId + "&issue=" + issue);

        //增加列表
        ui.loader("show");
        ac.getChartOld({lotId: cId, chartId: chartId, chartType: chartType}, function (data) {
            $("#chart").html(data)
            ui.loader("hide");
            var list = $(data).find("#lotContent").children();
            var btnList = makeList(list);
            setHtml(btnList);


            //划线
            var lineInfo = $("#lineInfo").val();
            if (lineInfo) {
                drawLine(lineInfo.split("|"))
            }

        });


    }

    function setHtml(o) {
        var h = '';
        $.each(o, function (key, val) {
            h += '<div class="broken-line-bg" ><span>' + key + '</span></div>';
            h += '<ul class="type-group type-group-all">';
            var type = typeName.indexOf(key);
            h += make(val, type);
            h += '</ul>';
        })
        function make(o, type) {
            var h = "";

            $.each(o, function (key, val) {
                if (val == chartId && type == chartType) {
                    h += '<li class="action">' + key + '</li>';
                    $("#chartListBtn").html(key);
                } else {
                    h += '<li data-val="' + val + '" data-type="' + type + '">' + key + '</li>';
                }

            })
            return h;
        }

        $("#chartListOption").html(h);
        $("#chartListOption ul:first").prepend('<li data-herf="chart.html?lotId=' + lotId + '&issue=' + issue + '">基本走势图</li>');
        $("#chartListBtn").show().click(function () {
            $("#chartListOption").slideToggle(200)
        })
        $("#chartListOption li").click(function () {
            var herf = $(this).data("herf");
            if (herf)   window.location.href = herf;
            var val = $(this).data("val");
            var type = $(this).data("type");
            if (val) window.location.href = 'chartold.html?lotId=' + lotId + '&chartId=' + val + "&chartType=" + type + '&issue=' + issue;
        })
    }

    //画线
    function drawLine(lineBox) {
        //开始列 开始行 跨度 底部剩余行
        var lineColor = ["#009966", "#CC0000", "#0000FF", "#009966", "#663366", "#003333", "#663333", "#FF6944", "#6843B4", "#FF5024", "#FF8C40", "#666666", "#688E43"];
        $("#chartsTable tbody:first").attr("id", "chartsTbody");
        var obj = oZXZ.bind("chartsTbody");
        $.each(lineBox, function (i, o) {
            var o = toInt(o.split(","));
            var c = $("#chartsTbody tr:eq(" + (o[1] + 1) + ") td:eq(" + (o[0] + 1) + ")").attr("class").split("_")[1];
            if (c > 20) c = 1

            obj.add.apply(obj.color(lineColor[c]), o)
        })
        oZXZ.draw(true);

        function toInt(val) {
            $.each(val, function (i, n) {
                val[i] = parseInt(n, 10);
            })
            return val;
        }
    }


    //重新画
    function redrawLine() {
        //oZXZ.redraw()
        oZXZ.clear();
        ct.draw();
    }

    //清除划线
    function clearLine() {
        oZXZ.clear();
    }

    function makeList(list) {
        var btnList = {};

        $.each(list, function (i, d) {
            btnList[typeName[i]] = {};
            $(d).children("input").each(function () {
                    var val = $(this).val()
                    btnList[typeName[i]][val] = analyze($(this).attr("onClick"));
                }
            );
        })
        return btnList;
        function analyze(val) {
            return val.split("(")[1].split(")")[0].split(",")[0];
        }
    }

    return {
        init: init
    }

});