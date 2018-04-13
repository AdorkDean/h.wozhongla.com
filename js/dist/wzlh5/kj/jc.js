define("wzlh5/kj/jc", ["wzlh5/kj/jquery-2.1.1", "handlebars/1.3.0/dist/cjs/handlebars","wzlh5/kj/iscroll-5.1.3","wzlh5/kj/lotteryArgs", "wzlh5/kj/lib", "wzlh5/kj/action"], function (require, exports, module) {
    var $ = require("wzlh5/kj/jquery-2.1.1");
    var hl = require("handlebars/1.3.0/dist/cjs/handlebars").default;
     require("wzlh5/kj/iscroll-5.1.3");

    var lib = require("wzlh5/kj/lib");
    var ui = require("wzlh5/kj/ui");
    var args = require("wzlh5/kj/lotteryArgs");
    var l = lib.log;
    var z = lib.z;
    var ac = require("wzlh5/kj/action");


    function init() {
        var lotId = lib.href().lotId||"301";


        lib.router({
            "":function(data){
                alert(data);
            },
            "r1":function(data){
                alert(data);
            },
            "/r2":function(){
                alert(2);
            },
            "init": function() {
                alert("int");
            }

        });
        var arrDate=[1,3,5,7,8,10,12];
        var myDate=new Date();
        var myYear=myDate.getFullYear().toString();
        var myMonth=myDate.getMonth()+1;
        var myDay=myDate.getDate()-1;

        var issu=myYear+addZero(myMonth)+addZero(myDay);

        //console.log(issu);
        //$('.nowdate').text(myYear+'-'+addZero(myMonth)+'-'+addZero(myDay));

        ac.getJcResult("301",issu,function(data){
            addToList(data)
        })
       // gotoTrade(args[lotId]);

        var str='';
        //2015-04-24


        for(var i=0;i<10;i++){

            if(myDay<1){
                if(arrDate.indexOf(myMonth)>0){
                    myDay=31;
                }else if(myMonth==2){
                    if(myYear%4!=0){
                        myDay=29;
                    }else{
                        myDay=28;
                    }
                }
                myDay=30;
                myMonth=myMonth-1;
            }
            if(myMonth<1){
                myYear=myYear-1;
            }
            str=myYear+'-'+addZero(myMonth)+'-'+addZero(myDay);
            myDay--;
            $('.histroy-date').append($('<span>'+str+'</span>'));
            //console.log( str);
        }
        var ist=true;
        var istr=true;
        $('.histroy-date').on('click','span',function(){
            var mg=$(this).text();
            var ma=mg.replace(/-/g,'');
            $('.nowdate').text(mg);
            //nowLi.parentNode.insertBefore( nowLi , prevLi );
            $(this).insertBefore($(this).parent().find('span').eq(0));
            $('.kj-bf').insertBefore($('.play-type').find('span').eq(0));
            //$('.nowdate').insertBefore($('.histroy-date span').eq(0));
            ac.getJcResult("301",ma,function(data){

                var list = getList(data);
                //l(list);
                //console.log(list);

                var lt = hl.compile($("#jcResultTemp").html());
                $("#jcResult").hide();
                $("#jcResulta").show();
                $("#jcResultSpf").hide();
                $("#jcResultBqc").hide();
                $("#jcResultRqs").hide();
                $("#jcResulta").html(lt({
                    list: list
                }));

                $("#loading").hide()

            })
            $('.play-type').animate({height:20});
            istr=true;
            $('.histroy-date').animate({height:20});;
            ist=true;
        });

        $('.kj-bf').unbind().bind('click',function(){
            var nowD=$('.histroy-date span').eq(0).text();
            var maa=nowD.replace(/-/g,'');
            console.log(maa);
            $(this).insertBefore($(this).parent().find('span').eq(0));
            ac.getJcResult("301",maa,function(data){

                var list = getList(data);
                l(list);
                //console.log(list);

                var lt = hl.compile($("#jcResultBf").html());
                $("#jcResult").hide();
                $("#jcResulta").hide();
                $("#jcResultSpf").hide();
                $("#jcResultBqc").hide();
                $("#jcResultRqs").hide();
                $("#jcResultBfs").show();
                $("#jcResultBfs").html(lt({
                    list: list
                }));

                $("#loading").hide()

            })
            $('.play-type').animate({height:20});
            istr=true;
            $('.histroy-date').animate({height:20});;
            ist=true;
        });
        $('.kj-spf').unbind().bind('click',function(){
            var nowD=$('.histroy-date span').eq(0).text();
            var maa=nowD.replace(/-/g,'');
            console.log(maa);
            $(this).insertBefore($(this).parent().find('span').eq(0));
            ac.getJcResult("301",maa,function(data){

                var list = getList(data);
                l(list);
                //console.log(list);

                var lt = hl.compile($("#jcResultSp").html());
                $("#jcResult").hide();
                $("#jcResulta").hide();
                $("#jcResultSpf").show();
                $("#jcResultBqc").hide();
                $("#jcResultRqs").hide();
                $('#jcResultBfs').hide();
                $("#jcResultSpf").html(lt({
                    list: list
                }));

                $("#loading").hide()

            })
            $('.play-type').animate({height:20});
            istr=true;
            $('.histroy-date').animate({height:20});;
            ist=true;
        });

        $('.kj-bqc').unbind().bind('click',function(){
            var nowD=$('.histroy-date span').eq(0).text();
            var maa=nowD.replace(/-/g,'');
            $(this).insertBefore($(this).parent().find('span').eq(0));
            ac.getJcResult("301",maa,function(data){

                var list = getList(data);
                l(list);
                //console.log(list);

                var lt = hl.compile($("#jcResultBq").html());
                $("#jcResult").hide();
                $("#jcResulta").hide();
                $("#jcResultSpf").hide();
                $('#jcResultBfs').hide();
                $("#jcResultRqs").hide();
                $("#jcResultBqc").show();
                $("#jcResultBqc").html(lt({
                    list: list
                }));

                $("#loading").hide()

            })
            $('.play-type').animate({height:20});
            istr=true;
            $('.histroy-date').animate({height:20});;
            ist=true;
        });

        $('.kj-rqs').unbind().bind('click',function(){
            var nowD=$('.histroy-date span').eq(0).text();
            var maa=nowD.replace(/-/g,'');
            $(this).insertBefore($(this).parent().find('span').eq(0));
            ac.getJcResult("301",maa,function(data){

                var list = getList(data);
                l(list);
                //console.log(list);

                var lt = hl.compile($("#jcResultRq").html());
                $("#jcResult").hide();
                $("#jcResulta").hide();
                $("#jcResultSpf").hide();
                $("#jcResultBqc").hide();
                $('#jcResultBfs').hide();
                $("#jcResultRqs").show();
                $("#jcResultRqs").html(lt({
                    list: list
                }));

                $("#loading").hide()

            })
            $('.play-type').animate({height:20});
            istr=true;
            $('.histroy-date').animate({height:20});;
            ist=true;
        });
        $('.glyphicon-menu-down-2').unbind().bind('click',function(){
            if(ist){
                $('.histroy-date').animate({height:200});
                ist=false;
            }else{
                $('.histroy-date').animate({height:20});;
                ist=true;
            }

        });
        $('.glyphicon-menu-down-1').unbind().bind('click',function(){
            if(istr){
                $('.play-type').animate({height:80});
                istr=false;
            }else{
                $('.play-type').animate({height:20});
                istr=true;
            }

        });

    }
    function addZero(n){
       return n<10?'0' + n:'' + n;
    }


/*"spf":"0:2","spfNumber":null,"matchAll":"0:2","bfNumber":"0:2","sceneId":"201504061001","matchBall":"1","endTime":"2015-04-06 14:46:00.0","zjqNumber":"0:2","lotterySortId":"LOT_JCZQ","matchEvents":"澳超","matchHome":"纽卡斯尔喷气机","matchGuest":"珀斯光荣","issueNumber":"20150406","matchHalf":"0:0","bqcNumber":"0:2","sizePoint":null,"winsGap":null*/

    //增加到列表
    function addToList(data) {
        var list = getList(data);
        l(list);
        var lt = hl.compile($("#jcResultTemp").html());
        $("#jcResult").html(lt({
            list: list
        }));
        $("#loading").hide()
    }

    //获取显示的彩种列表;
    function getList(list) {
        var a = [];
        $.each(list,function(inx,n){
            a.push(mergeData(n));
        })
        return a;
    }


    //混合开奖数据
    function mergeData(o) {

        if (!o) return {};
        var bf = o.matchAll;
        var sceneId = o.sceneId+"";
        o.matchHome = o.matchHome.slice(0,4)
        o.matchGuest = o.matchGuest.slice(0,4)
        o.wook = "周"+["","一","二","三","四","五","六","日"][sceneId.slice(-4,-3)];
        o.no = sceneId.slice(-3);
        o.sp=sp(o.spf);
        o.sf=matchHalf(o.matchHalf);

        //console.log( o.sf);
        return o;
    }

    function sp(o){
        var m='';
        if(o==1){
            m='平';
        }else if(o==3){
            m='胜';
        }else if(o==0){
            m='负';
        }
        return m;
    }

    function matchHalf(o){
        var m='';
        var arr=o.split(':');
        var a= Number(arr[0]);
        var b= Number(arr[1]);
        //console.log(a-b);
        var g=a-b;
        if(g==0){
            m='平';
        }else if(g>0){
            m='胜';
        }else if(g<0){
            m='负';
        }
        return m;
    }


    return {
        init: init
    }


})
;