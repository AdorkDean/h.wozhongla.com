define(function (require, exports, module) {
    var $ = require("jquery");
    require("jquery.tap")($);
    require("jquery.json")($);
    var hl = require("handlebars").default;
    var lib = require("tool");
    var cache = require("cache");
    var args = require("lotteryArgs");
    var areas = require("areaArgs");
    var ac = require("action");
    var ui = require("ui");
    var l = lib.log;
    var z = lib.z;
    var areaId = null;

    //初始化
    function init() {
        //cache.clear();
        //返回的时候返回到首页
        cache.set("goBack","home");
        ui.backbutton(ui.backExit);
        $("#footerNav li").click(function(){
            var href = $(this).data("href");
            if (href) location.href = href;
        })

        sideBarHandle();


      //检查版本
        setTimeout(getVersion,3000);


        //得到周几

        var data=new Date().getDay();
        if (!data) data = 7;
        $("#weekGroup li:eq("+(data-1)+")").html("今日");


        var inx = window.location.href.split("#")[1] || cache.get("homeTabInx",1000*60*5) || 0;
        $("#floatOption li:eq("+inx+")").click()
    }

    //30分钟检查一次版本
    function getVersion(){
        var cacheVersion = cache.get("version",1000*60*30);
        if (cacheVersion) return false;
        ac.getVersion(function(data){
            cache.set("version",data.version);
            checkVersion(data);
        });
    }

    //检查版本
    function checkVersion(data){
        if (data.version > VERSION){
            navigator.notification.confirm(
                data.msg.join("\r\n"),
                function (val) {
                    val == 1 && window.open(data.path);
                },
                "V"+data.version+"升级提示",
                ['马上升级', '残忍拒绝'])
        }
    }

    //按省份获得信息
    function getByArea(areaId){
        var ids = [];
        $.each(areas,function(key,val){
            if (areaId == val.id) ids = val.lotIds;
        })

        var cacheData = cache.get("areaId-"+areaId,1000*60*5);
        if (cacheData) return setList($.parseJSON(cacheData),ids,areaId);

        ui.loader("show");
        ac.getNewResult(ids, function(data){
        	//console.log(data)
            setList(data,ids,areaId);
            cache.set("areaId-"+areaId,$.toJSON(data));
            ui.loader("hide");
        })
    }


    //按类别获得信息
    function getByType(type){

        var ids = [];
        $.each(args,function(key,val){
            if (val.isGp){
                if (type){
                    if (val.name.indexOf(type)>-1) ids.push(key);
                }else{
                    if (
                        val.name.indexOf("11选5")===-1&&
                        val.name.indexOf("时时彩")===-1&&
                        val.name.indexOf("快三")===-1
                    ){
                        ids.push(key);
                    }
                }
            }
        })
        var cacheData = cache.get("typeId-"+type,1000*60*5);
        if (cacheData) return setList($.parseJSON(cacheData),ids);
        ui.loader("show");
        ac.getNewResult(ids, function(data){
            setList(data,ids);
            cache.set("typeId-"+type,$.toJSON(data));
            ui.loader("hide");
        })
    }

    //按周几获得信息
    function getByWeek(week){
        var ids = [];
        var week = parseInt(week,10);
        $.each(args,function(key,val){
            if (val.kjWeek){
                if (val.kjWeek.indexOf(week)>-1){
                    ids.push(key);
                }
            }
        })
        if (week){
            $.each(args,function(key,val){
                if (!val.kjWeek){
                    ids.push(key);
                }
            })
        }
        var cacheData = cache.get("weekId-"+week,1000*60*5);
        if (cacheData) return setList($.parseJSON(cacheData),ids);
        ui.loader("show");
        ac.getNewResult(ids, function(data){
            setList(data,ids);
            cache.set("weekId-"+week,$.toJSON(data));
            ui.loader("hide");
        })
    }

    //写入到页面
    function setList(data,ids,areaId) {
        var ids = ids || getAllIds(data);
        var o = lib.listToObject(data);
        var list = makeList(o,ids);
        if (!list.length){
            $("#resultLIst").html(ui.tip("暂时没有开奖信息","请选择其它选项"));
            return
        }
        var lt = hl.compile($("#resultLIstTemp").html());
        $("#resultLIst").html(lt({
            list: list
        }));
        
        
        ui.bindTap();//把A标签绑定tap
        $("#resultLIst").children().hide();
        $(".oLi").eq(1).show();
       
        $(".oLi").eq(3).show();
        $(".oLi").eq(4).show();
        $(".oLi").eq(5).show();
        $(".oLi").eq(7).show();
       	if (areaId == 35){$("#resultLIst li:eq(4)").before(lib.makecJcHtml());} 
    }

    //侧栏操作
    function sideBarHandle(){
        $("#floatingBtn").click(function () {
            $("#floatOption").slideToggle(200)
        })

        $("#floatOption li").click(function () {
            $("#resultLIst").html("");

            var type = $(this).data("box");
            var val = $(this).data("val");
            if (type == "type"){
                getByType($(this).data("val"));
            } else if(type == "week"){
                getByWeek($(this).data("val"));
            }else{
                getByArea($(this).data("val"));
            }

            $("#floatingBtn").html($(this).html())
            $("#floatOption").slideUp(200)
            $("#floatOption li").removeClass("action");
            $(this).addClass("action");
            var inx = $("#floatOption li").index($(this));
            window.location.href = window.location.href.split("#")[0] + "#"+inx;
            cache.set("homeTabInx",inx);

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
        //console.log(lib.getWeek(val.bonusTime));
        if (o.isGp){
            o.date = val.bonusTime.slice(5, -5);
        }else{
//      	 + ' 周' + lib.getWeek(val.bonusTime);
            o.date = val.bonusTime.slice(5, -5)
        }
        o.ball = arg.lotteryType === 2 ? lib.makeZc(val.baseCode, id) : lib.makeBall(val.baseCode, id);
        if (arg.isSsc) {
            var ball = val.baseCode.split(",")
            o.ball += '<span class="score-grey">' + lib.getDxds(ball[3]) + ' | ' + lib.getDxds(ball[4]) + '</span>';
        }
        if (parseInt(val.bonusBlance,10)&&arg.lotteryType!==2) {
            o.ball += '<span class="score-grey jc">奖池：'+lib.toYi(val.bonusBlance)+'</span>';
        }
       // console.log(o)
        return o;
    }
    return {
        init: init
    }
});