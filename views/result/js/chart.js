define("chart", ["lib/jquery-2.1.1.js", "lib/jquery.tap-0.2.9",  "lotteryArgs","ui", "tool", "action"], function (require, exports, module) {
    var $ = require("jquery");
    require("jquery.tap")($);
    var lib = require("tool");
    var args = require("lotteryArgs");
    var ac = require("action");
    var ui = require("ui");

    var l = lib.log;
    var z = lib.z;

    var lotId = id = lib.href().lotId || "001";
    var arg = args[id];
    var issue = lib.href().issue;



    function init() {
        ui.backbutton(function(){ui.toHref("list.html?lotId="+id)});
        $("#headerBack").attr("href","list.html?lotId="+id);
        ui.bindTap();//把A标签绑定tap
        $("#title").html(arg.name);
        $("#listLink").attr("href","list.html?lotId="+id)

        $("#detailLink").attr("href","detail.html?lotId="+id+"&issue="+issue);

        arg.isGp && $("#detailLink").parent().hide();
        $("#navBox").show();

        if (arg.lotteryType == 2 ) return $("#chart").html(ui.tip("暂无走势图信息","请稍后访问"));
        arg.model === "pl" ? getPl(id) : getLt(id);

        //制造走势图列表
        makeChatrList();
    }

    function makeChatrList(){
        var cId = arg.oldId ? arg.oldId : lotId;
        var typeName = ["基本走势", "高级走势", "K线图", "直方图", "遗漏统计", "跟随统计"];
        ac.getChartOld({lotId:cId}, function (data) {
            if (data.length < 200) return;
            var list = $(data).find("#lotContent").children();
            if (!list.length) return false;
            var btnList = makeList(list);

            setHtml(btnList);
        },true);

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
            function analyze(val){
                return val.split("(")[1].split(")")[0].split(",")[0];
            }
        }

        function setHtml(o){
            var h = '';
            $.each(o,function(key,val){
                h += '<div class="broken-line-bg" ><span>'+key+'</span></div>';
                h += '<ul class="type-group type-group-all">';
                var type = typeName.indexOf(key);
                h += make(val,type);
                h += '</ul>';
            })
            function make(o,type){
                var h="";
                $.each(o,function(key,val){
                        h += '<li data-val="'+val+'" data-type="'+type+'">'+key+'</li>';
                })
                return h;
            }
            $("#chartListOption").html(h);
            $("#chartListOption ul:first").prepend('<li class="action">基本走势图</li>');
            $("#chartListBtn").show().click(function () {
                $("#chartListOption").slideToggle(200)
            })
            $("#chartListOption li").click(function () {
                var val = $(this).data("val");
                var type = $(this).data("type");
                if (val) window.location.href = 'chartold.html?lotId='+lotId+'&chartId='+val+"&chartType="+type+'&issue='+issue;
            })
        }



    }
    function getPl(id){
        ui.loader("show");
        ac.getChartsPl(id, 100, function (data) {
            ui.loader("hide");
            if (!data.data || !data.data.hightLotteryChartApi || !data.data.hightLotteryChartApi.length) return $("#chart").html(ui.tip("暂无基本走势图","可以尝试其它走势图"));

            var val = data.data.hightLotteryChartApi.reverse();
            var o = val[0];
            var listLen = o.baseCode.split(",").length;
            var ballLen = o.locOmit.split("#")[0].split(",").length;
            var h = mergeHtmlPl(val,id,listLen,ballLen);
            $("#chart").html(h);


            //划线
            var lineBox = [];
            for (var i = 0; i<listLen; i++){
                //开始列 开始行 跨度 底部剩余行
                lineBox[i] = [ballLen*i+2,2,ballLen,0];
            }
            drawLine(lineBox);
        });
    }
    function getLt(id){
        ui.loader("show");

        ac.getChartsLt(id, 50, function (data) {
            ui.loader("hide");
            if (!data.data || !data.data.commList) return $("#chart").html(ui.tip("暂无基本走势图","可以尝试其它走势图"));
            var h = mergeHtmlLt(data.data.commList.reverse(),id);
            $("#chart").html(h);
            $("#detailLink").attr("href","detail.html?lotId="+id+"&issue="+data.data.commList[0].issueNum);

            if (id=="001") oZXZ.bind("chart").color("#5c9cc0").add(35,2,16,0);

        });
    }

    //画线
     function drawLine(lineBox){
         //开始列 开始行 跨度 底部剩余行
         lineBox = lineBox || [[2,2,10,0],[12,2,10,0],[22,2,10,0]]
         var colorList = ["#d52626","#fe6a3a","#c25300","#009966","#663366","#663333","#6843B4","#5c9cc0","#5c9cc0","#5c9cc0"]
         var obj = oZXZ.bind("chart");
         $.each(lineBox,function(i,o){
             obj.add.apply(obj.color(colorList[i]),o)
         })
        oZXZ.draw(true);
    }


    //重新画
    function redrawLine(){
        //oZXZ.redraw()
        oZXZ.clear();
        ct.draw();
    }
    //清除划线
    function clearLine(){
        oZXZ.clear();
    }
    //混合开奖数据
    function mergeHtmlPl(val, id,listLen,ballLen) {
        //表头
        var t = '';
        t +='<tr class="thead">';
        t +='<th rowspan="2" class="nr">期号</th>';
        t +='<th rowspan="2" class="nr">奖号</th>';
        var wl = args[id].listName || ["个位","十位","百位","千位","万位"];
        for (var i=0;i<listLen;i++){
            t +='<th colspan="'+ballLen+'"><span>'+wl[i];
            if (i===0) t +=' <span class="blueBalls">向左滑动查看更多</span>'
            t += '</span></th>';
        }
        t +='</tr>';
        t +='<tr class="thead">';
        var x = ballLen>10 ? 1 : 0;
        for (var i=0;i<listLen;i++){
            for (var n=0;n<ballLen;n++){

                t +='<th widht="25">'+(n+x)+'</th>';
            }

        }
        t +='</tr>';
        //表内容
        var h="";
        $.each(val, function(i,o){
            h += i%2 ? '<tr>' :'<tr class="gray-bj">';
            h += '<th>'+ formatIssue(o.issueNum) +'</th>';
            var baseCode = o.baseCode.split(",");
            h += '<td class="sd-red">'+ baseCode.join(",");+'</td>';
            list = o.locOmit.split("#");

            h += makeBall (list);

            h += '</tr>';

        })

        function makeBall (list){
            var h = '';
            for (var x=0; x<list.length; x++){
                arr = list[x].split(",");

                $.each(arr,function(i,n){
                    if (n === "0"){
                        h+='<td class="D_1"><span class="B_'+x+'">'+i+'</span></td>';

                    }else{
                        h+='<td>'+n+'</td>';
                    }
                })
            }
            return h;
        }

        return t+h;
    }


    //混合开奖数据乐透
    function mergeHtmlLt(val, id) {
        var o = val[0];
        var comOmit = o.comOmit.split("#");
        var ballLen1 = comOmit[0].split(",").length;
        var ballLen2 = comOmit[1] ?　comOmit[1].split(",").length:0;
        //表头
        var t = '';
        t +='<tr class="thead">';
        t +='<th rowspan="2" class="nr">期号</th>';
        t +='<th rowspan="2" class="nr">奖号</th>';

        if (ballLen2) {
            t +='<th colspan="'+ballLen1+'"  class="im-tl">　<span>红球';
            t +=' <span class="blueBalls">向左滑动查看更多</span>'
            t += '</span></th>';
            t +='<th colspan="'+ballLen2+'"  class="im-tl">　<span>篮球</span></th>';
        }else{
            t +='<th colspan="'+ballLen1+'">号码</th>';

        }

        t +='</tr>';
        t +='<tr class="thead">';
        for (var i=0;i<ballLen1;i++){
            t +='<th widht="25">'+(i+1)+'</th>';
        }
        for (var i=0;i<ballLen2;i++){
            t +='<th widht="25">'+(i+1)+'</th>';
        }
        t +='</tr>';
        //表内容
        var h="";
        $.each(val, function(i,o){
            h += '<tr>';
            h += '<th>'+ formatIssue(o.issueNum) +'</th>';
            var baseCode = o.baseCode.split(",");
            h += '<td class="sd-red">'+ baseCode.join(",");+'</td>';
            list = o.comOmit.split("#");
            h += makeBall (list);
            h += '</tr>';

        })

        function makeBall (list){
            var h = '';
            for (var x=0; x<list.length; x++){
                arr = list[x].split(",");
                $.each(arr,function(i,n){
                    if (n === "0"){
                        h+='<td><span class="B_1'+x+'">'+(i+1)+'</span></td>';

                    }else{
                        h+='<td>'+n+'</td>';
                    }
                })
            }
            return h;
        }
        return t+h;
    }
    function formatIssue(issue){
        return  issue.length > 6 ? issue.slice(4) : issue;
    }
    return {
        init: init
    }

});