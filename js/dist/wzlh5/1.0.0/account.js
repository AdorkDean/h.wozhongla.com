/**
 * Created by hebo (razr409355439@gmail.com)on 15/1/7.
 */

define("wzlh5/1.0.0/account",["jquery/2.1.1/jquery","wzlh5/1.0.0/ac","handlebars/1.3.0/dist/cjs/handlebars",'wzlh5/1.0.0/until',"wzlh5/1.0.0/cp","wzlh5/1.0.0/ui"],function (require, exports, module) {
    var $ = require("jquery/2.1.1/jquery")
    var until = require("wzlh5/1.0.0/until")
    var action = require("wzlh5/1.0.0/ac")
    var wzlui = require("wzlh5/1.0.0/ui")
    var cp = require("wzlh5/1.0.0/cp")
    var Handlebars = require("handlebars/1.3.0/dist/cjs/handlebars").default;

    var pops = wzlui.containerMask,
        iscrollPop = wzlui.iscrollPop,
        dialog = wzlui.dialog,
        containerMask = wzlui.containerMask,
        dropdownMask = wzlui.dropdownMask,
        Y_Y = until.Y_Y,
        TZ_INFO = until.TZ_INFO;
    //用户账户
    account = function(ac) {
        switch (ac) {
            case "accountdetail":
                accountdetail();
                break;
            case "bettingdetail":
                bettingdetail();
                break;
            case "orderdetail":
                orderdetail();
                break;
            case "bettingRecord":
                bettingRecord();
                break;
            case "bettingZH":
                bettingZH();
                break;
        }
        var IscrollLoadData = wzlui.IscrollLoadData;
        var untils = until;

        function loginJudge() {

            action.queryUserInfo({}, function(re) {
                if (re.resultCode == '200') {
                    if (re.data.message == "用户没有登录") {
                       // dialog('未登录!');
                        //location.href = "login.html?ref=" + location.href;
                        untils.ref('login',location.search);
                        //return false;
                    }
                }
            });
        }

        //账户明细
        function accountdetail() {
            loginJudge('accountdetail');

            var pageNo = [1,1,1,1,1];
            function queryAccountRefer(n){
                action.queryAccountRefer({
                    pageNo: n,
                    pageSize: 10
                },function(re){

                    var r = processData(re);
                    $('.pullUpLabel').text('点击加载更多');
                    var tableTemplate = Handlebars.compile($("#table-template1").html());
                    $('#account-list-group1').append(tableTemplate({
                        data: r.data
                    }));
                })
            }

            function queryAccountRecharge(n){
                action.queryAccountRecharge({
                    pageNo:n,
                    pageSize: 10
                },function(re){
                    var r = processData(re);
                    $('.pullUpLabel').text('点击加载更多')
                    var tableTemplate = Handlebars.compile($("#table-template2").html());
                    $('#account-list-group2').append(tableTemplate({
                        data: r.data
                    }));
                })
            }

            function queryAccountWithDraw(n){
                action.queryAccountWithDraw({
                    pageNo:n,
                    pageSize: 10
                },function(re){
                    var r = processData(re);
                    $('.pullUpLabel').text('点击加载更多')
                    var tableTemplate = Handlebars.compile($("#table-template3").html());
                    $('#account-list-group3').append(tableTemplate({
                        data: r.data
                    }));
                })
            }

            function queryAccountPrize(n){
                action.queryAccountPrize({
                    pageNo:n,
                    pageSize: 10
                },function(re){
                    console.log(re);
                    var r = processData(re);
                    $('.pullUpLabel').text('点击加载更多')
                    var tableTemplate = Handlebars.compile($("#table-template4").html());
                    $('#account-list-group4').append(tableTemplate({
                        data: r.data
                    }));
                })
            }

            function bettingOrder(n){
                action.bettingOrder({
                    pageNo:n,
                    pageSize: 10
                },function(re){
                    var r = processData(re);
                    $('.pullUpLabel').text('点击加载更多')
                    var tableTemplate = Handlebars.compile($("#table-template5").html());
                    $('#account-list-group5').append(tableTemplate({
                        data: r.data
                    }));
                })
            }

            queryAccountRefer(pageNo[0])
            queryAccountRecharge(pageNo[1])
            queryAccountWithDraw(pageNo[2])
            queryAccountPrize(pageNo[3])
            bettingOrder(pageNo[4])

            //帐户明细选项卡
            $('.account-nav-group li').click(function() {
                var $this = $(this);
                var index = $('.account-nav-group li').index(this);
                $this.addClass('active').siblings().removeClass('active');
                $('.bet-content .account-list').eq(index).show().siblings().hide();
            });

            $('#scroller-pullUp1').on('click', function(){
                pageNo[0]++;
                queryAccountRefer(pageNo[0])
            })

            $('#scroller-pullUp2').on('click', function(){
                pageNo[1]++;
                queryAccountRecharge(pageNo[1])
            })

            $('#scroller-pullUp3').on('click', function(){
                pageNo[2]++;
                queryAccountWithDraw(pageNo[2])
            })

            $('#scroller-pullUp4').on('click', function(){
                pageNo[3]++;
                queryAccountPrize(pageNo[3])
            })

            $('#scroller-pullUp5').on('click', function(){
                pageNo[4]++;
                bettingOrder(pageNo[4])
            })


            function time2Year(x) {
                function toDou(n) {
                    return n < 10 ? '0' + n : n;
                }
                var oDate = new Date(x);
               // oDate.setTime(x);
                console.log(oDate);
                var n = toDou(oDate.getFullYear()),
                    y = toDou(oDate.getMonth() + 1),
                    r = toDou(oDate.getDate()),
                    s = toDou(oDate.getHours()),
                    f = toDou(oDate.getMinutes()),
                    m = toDou(oDate.getSeconds())
                var s = n + '-' + y + '-' + r + ' ' + s + ':' + f + ':' + m;
                return s;
            }

            function processData(re) {
                if (!re.data) {
                    $('.pullUpLabel').text('账户暂无记录，请稍后再试...')
                    return '';
                } else {
                    for (var i = 0, len = re.data.length; i < len; i++) {
                        re.data[i].createDt = time2Year(re.data[i].createDt);
                        //console.log(re.data[i].createDt);
                        switch (re.data[i].accountType) {
                            case 1:
                                re.data[i].accountType = '现金';
                                break;
                            case 2:
                                re.data[i].accountType = '彩金';
                                break;
                            case 3:
                                re.data[i].accountType = '红包';
                                break;
                        }
                    }
                    return re;
                }
            }

            $.wzlmore(function(d) {
                $('.' + $(d).attr('class')).on('click', function() {
                    //////alert($(this).html())
                })
            });
        }

        //投注记录
        function bettingdetail() {
            loginJudge('bettingdetail');

            action.queryUserInfo({}, function(re) {
                if (re.resultCode == '200') {
                    if (re.data.message == "用户没有登录") {

                        //location.href='http://www.baidu.com';
                        location.href = "login.html?ref=" + location.href;

                    }
                }
            });
            var pageNo = [1,1,1,1];
            var pageFlag=[1,2,3,4];

            //帐户明细选项卡
            $('.account-nav-group li').click(function() {
                var $this = $(this);
                var index = $('.account-nav-group li').index(this);
                $this.addClass('active').siblings().removeClass('active');
                $('.bet-content .bets-list').eq(index).show().siblings().hide();
            });

            $('#scroller-pullUp'+pageFlag[0]+'').on('click', function (){
                pageNo[0]++;
                loadData( pageNo[0], pageFlag[0] )
            })

            $('#scroller-pullUp'+pageFlag[1]+'').on('click', function (){
                pageNo[1]++;
                loadData( pageNo[1], pageFlag[1] )
            })

            $('#scroller-pullUp'+pageFlag[2]+'').on('click', function (){
                pageNo[2]++;
                loadData( pageNo[2], pageFlag[2] )
            })

            $('#scroller-pullUp'+pageFlag[3]+'').on('click', function (){
                pageNo[3]++;
                loadData( pageNo[3], pageFlag[3] )
            })

            loadData(pageNo[0], pageFlag[0])
            loadData(pageNo[1], pageFlag[1])
            loadData(pageNo[2], pageFlag[2])
            loadData(pageNo[3], pageFlag[3])

            function loadData(n1, n2, fn){
                action.allBetting({
                    flag: n2,
                    pageNo: n1,
                    pageSize: 10
                }, function(re) {
                    var r = formatData(re.data);
                    console.log(re);
                    if(r){
                        $('.pullUpLabel').text('点击加载更多...')
                    }else{
                        $('#scroller-pullUp'+n2+' .pullUpLabel').text('没有更多数据...')
                    }

                    var jcTemplate = Handlebars.compile($("#table-template").html());
                    $('#bets-list-group'+n2+'').append(jcTemplate({
                        data: r
                    }));
                    fn && fn()

                })
            }

            function formatData(d) {
                if (d || d!='用户没有登入') {


                    var reg2 = /^(足球)[\u4e00-\u9fa5]{1,10}$/;
                    var arr = [];
                    for (var i = 0, len = d.length; i < len; i++) {
                        var obj = {};
                        //console.log(d[i]);
                        if (d[i].lototype == 'zh') {
                            obj.issue = d[i].lotoName;
                            if(d[i].lotoid=='107'){
                                obj.issue='山东11选5';
                            }else if(d[i].lotoid=='104'){
                                obj.issue='广东11选5';
                            }else if(d[i].lotoid=='106'){
                                obj.issue='江西11选5';
                            }
                            obj.bettingUrl = 'bettingZH.html?id=' + d[i].id
                        } else if(reg2.test(d[i].lotoName)){
                            obj.issue = '竞彩足球'
                            obj.bettingUrl = 'bettingRecord.html?orderid=' + d[i].id
                        }else {
                            obj.issue = d[i].issue+'期';
                            obj.bettingUrl = 'bettingRecord.html?orderid=' + d[i].id
                        }

                        obj.lotoName = d[i].lotoName;
                        obj.byType = d[i].byType;
                        obj.bonussum = d[i].bonussum;
                        if(d[i].createtime){
                            obj.createtime = d[i].createtime.substring(0, 16);
                        }

                        obj.totalsum = d[i].totalsum;
                        var s=mergebonusstatus(d[i])
                        obj.status = s.z;
                        obj.isWin = s.isWin;
                        obj.isZH = s.isZH;
                        obj.iconImg = mergeImg(d[i].lotoid);
						
                        //console.log(d[i].bonussum);
                        //接口数据显示名字不对处理
                        if(d[i].lotoid=='107'){
                            obj.lotoName='山东11选5';
                        }else if(d[i].lotoid=='104'){
                            obj.lotoName='广东11选5';
                        }else if(d[i].lotoid=='106'){
                            obj.lotoName='江西11选5';
                        }
                        //console.log(obj)
                        arr.push(obj);

                    }
                    return arr;
                } else {
                    location.href='login.html'
                }
            }

            function mergebonusstatus(d) {
                var status = {
                    "-1": "未付款",
                    "0": "待出票",
                    "1": "已发单",
                    "2": "部分流单",
                    "3": "出票失败",
                    "4": "订单取消",
                    "5": "中奖停止",
                    "6": "支付失败",
                    "7": "出票成功"
                };
                var bStatus = {
                    "0": "待开奖",
                    "1": "未中奖",
                    "2": "派奖中",
                    "3": "已派奖"
                };

                var s = status[d.status + ""];
                var bs = bStatus[d.bonusstatus];

                if ((d.status == 2 || d.status == 7) && bs) {
                    if (d.status == 2)
                        s = s + " " + bs;
                    else
                        s = bs;
                }

                var isWin = (d.bonusstatus == 2 || d.bonusstatus == 3) ? true : false;
                var isZH = ( d.lototype != 'zh' ) ? true : false;

                return {
                    z: s,
                    isWin: isWin,
                    isZH:isZH
                };
            }

            function mergeImg(d) {
                var s = '';
                switch (d) {
                    case '001':
                        s = 'icon-cp-ssq';
                        break;
                    case '113':
                        s = 'icon-cp-dlt';
                        break;
                    case '108':
                        s = 'icon-cp-pl3';
                        break;
                    case '107':
                        s = 'icon-cp-sd11';
                        break;

                    case '106':
                        s = 'icon-cp-jx115';
                        break;
                    case '109':
                        s = 'icon-cp-pl5';
                        break;
                    case '104':
                        s = 'icon-cp-gd115';
                        break;
                    case '002':
                        s = 'icon-cp-fc3d';
                        break;
                    case '003':
                        s = 'icon-cp-qlc';
                        break;
                    case '110':
                        s = 'icon-cp-qxc';
                        break;
                    case '201':
                    case '301':
                    case '302':
                    case '303':
                    case '304':
                    case '305':
                    case '306':
                    case '307':
                    case '308':
                    case '309':
                    case '310':
                    case '311':
                    case '312':
                    case '313':
                    case '314':
                    case '315':
                    case '316':
                    case '317':
                    case '318':
                    case '319':
                    case '320':
                    case '321':
                        s = 'icon-cp-jczq';
                        break;
                    case '006':
                        s = 'icon-cp-jxssc';
                        break;
                    case '018':
                        s = 'icon-cp-cqssc';
                        break;
                    case '102':
                    	s = 'icon-cp-xj115'
                    	break;
                    case '117':
                    	s = 'icon-cp-shengfu'
                    	break;
                    default:
                        s = 'icon-cp-default';
                        break;
                }
                return s;
            }
        }

        //投注明细
        function bettingRecord() {
            loginJudge('bettingRecord')

            var untils = until;
            action.showDetail({
                orderid: untils.getRequestParameter('orderid')
            }, function(re) {
                if (!re.data) {
                    $('#loading').text('暂无数据，请稍后加载...');
                } else {
                    if (re.resultCode == "400") {
                        return $("#loading").html(re.data)

                    }
                   // console.log(re.data);

                    switch (re.data.order.lotoid) {
                        case '201':
                        case '301':
                        case '302':
                        case '303':
                        case '304':
                        case '305':
                        case '306':
                        case '307':
                        case '308':
                        case '309':
                        case '310':
                        case '311':
                        case '312':
                        case '313':
                        case '314':
                        case '315':
                        case '316':
                        case '317':
                        case '318':
                        case '319':
                        case '320':
                        case '321':
                            fomatJc(re.data);
                            break;
                        default:
                            fomatSzc(re.data);
                    };

                }
            })

            function fomatJc(d){
                var obj={};

                obj.lotoName = d.danchangMatch[0].lotoName
                obj.orderno = d.order.orderno
                obj.createtime = fomatTime(d.order.createtime)

                obj.totalsum = d.order.totalsum
                obj.bonusstatus = formatStatus(d.order)
                obj.danchangMatch = []
                obj.orderDetail = []

                for(var i=0,len=d.danchangMatch.length;i<len;i++){
                    var o={};
                    o.week=n2Week( d.danchangMatch[i].issue.substring( d.danchangMatch[i].issue.length-4, d.danchangMatch[i].issue.length-3 ) )
                    o.matchNum =  d.danchangMatch[i].issue.substring( d.danchangMatch[i].issue.length-3,d.danchangMatch[i].issue.length)
                    o.matchm = d.danchangMatch[i].matchm
                    o.matchc = d.danchangMatch[i].matchc
                    o.lotoName = d.danchangMatch[i].lotoName
                    o.betcode = d.danchangMatch[i].betcode.split('#');
                    //彩果暂无
                    o.matchv = d.danchangMatch[i].matchv


                    console.log(o.betcode);
                    obj.danchangMatch.push(o)
                }

                for(var i=0,len=d.orderDetail.length;i<len;i++){
                    var o={};
                    o.num = i+1
                    o.betcode = fomatbetCode(d.orderDetail[i])
                    o.playName = d.orderDetail[i].playName
                    o.multi = d.orderDetail[i].multi
                    o.bonussum = d.orderDetail[i].bonussum

                    obj.orderDetail.push(o)
                }
                console.log(obj.danchangMatch);

                //页面渲染
                $('#jczq').show();
                $('#loading').hide();
                var jcTemplate = Handlebars.compile($("#jc-template").html());
                $('#jczq').html(jcTemplate({
                    data: obj
                }));
                //$("a#jx").attr("href", "jc.html");

                    if(obj.lotoName=='足球混合过关'){
                        $("a#jx").attr("href", "jchhgg.html");
                    }else if(obj.lotoName=='足球让球胜平负'){
                        $("a#jx").attr("href", "jcrqspf.html");
                    }else if(obj.lotoName=='足球胜平负'){
                        $("a#jx").attr("href", "jc.html");
                    }



                function n2Week(b) {
                    var arr = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
                    return arr[b-1];
                }

                function fomatbetCode(d){
                    var a1 = d.betcode.split('/');
                    var s='';

                    if(d.oddsinfo){
                        var a2 = d.oddsinfo.split('-');
                        for(var i=0;i<a1.length;i++){
                            s += (a1[i]+a2[i])
                        }
                    }else{
                        for(var i=0;i<a1.length;i++){
                            s += (a1[i])
                        }
                    }


                    return s;
                }

            }

            function fomatSzc(d){
                //console.log(d);
                var obj = {};
				console.log(d.order.lotoid)
                obj.lotoid = d.order.lotoid
                obj.lotoName =d.order.lotoName
                obj.issue =d.order.issue
                obj.orderno = d.order.orderno
                obj.bonussum = d.order.bonussum
                obj.createtime = fomatTime(d.order.createtime)
                obj.totalsum = d.order.totalsum
                obj.bonusstatus = formatStatus(d.order)
                obj.buycode=[];
                //接口数据显示名字不对处理
                if(d.order.lotoid=='107'){
                    obj.lotoName='山东11选5';
                }else if(d.order.lotoid=='104'){
                    obj.lotoName='广东11选5';
                }else if(d.order.lotoid=='106'){
                    obj.lotoName='江西11选5';
                }
                for(var i=0,len=d.orderDetail.length;i<len;i++){
                    var o={};
                    o.num=i+1;
                    o.betcode=d.orderDetail[i].betcode.replace(/\,/g,' ');
                    o.playName = d.orderDetail[i].playName;
                    o.multi = d.orderDetail[i].multi;
                    obj.buycode.push(o)
                }

                //处理投注跳转
                switch(obj.lotoid){
                    case '001':
                        obj.shref = 'ssq.html';
                        break;
                    case '002':
                        obj.shref = 'fc3d.html';
                        break;
                    case '113':
                        obj.shref = 'dlt.html';
                        break;
                    case '018':
                        obj.shref = 'cqssc.html';
                        break;
                    case '006':
                        obj.shref = 'ssc.html';
                        break;
                    case '108':
                        obj.shref = 'pl3.html';
                        break;
                    case '110':
                        obj.shref = 'qxc.html';
                        break;
                    case '108':
                        obj.shref = 'pl3.html';
                        break;
                    case '109':
                        obj.shref = 'pl5.html';
                        break;
                    case '003':
                        obj.shref = 'qlc.html';
                        break;
                    case '106':
                        obj.shref = 'jx11x5.html';
                        break;
                    case '107':
                        obj.shref = 'sd11x5.html';
                        break;
                    case '104':
                        obj.shref = 'gd11x5.html';
                        break;
                }
                //渲染页面
                $('#loading').hide();
                $('#szc').show();
                var szcTemplate = Handlebars.compile($("#szc-template").html());
                $('#szc').html(szcTemplate({
                    data: obj

                }));
                $("#jx").attr("href", obj.shref);
                //查询开奖 期次不统一 处理
                switch(obj.lotoid){
                    case '113':
                    case '110':
                    case '108':
                    case '109':
                    case '019':
                        obj.issue = '20'+obj.issue;
                        break;
                    case '006':
                        obj.issue = '2014'+obj.issue;
                        break;
                    case '107':
                        obj.issue = '20'+obj.issue;
                        break;
                    case '104':
                        obj.issue = '20'+obj.issue;
                        break;
                }
				
                action.issue2result({
                    lotId: cp.CPID[obj.lotoid].lottery_id,
                    issue: obj.issue
                }, function(s) {

                    switch (obj.lotoid) {
                        case '001':
                        case '003':
                        case '113':
                            formatKjcode1(s);
                            break;
                        case '110':
                        case '108':
                        case '006':
                        case '002':
                        case '018':
                        case '106':
                            formatKjcode2(s);
                            break;
                        case '107':
                            formatKjcode2(s);
                            break;
                        case '104':
                            formatKjcode2(s);
                            break;

                    }

                    function formatKjcode1(s){

                        if (!s) return '';
                        if(s.readyState== 4) return '';
						console.log(s)
                        var n1 = s.kjCode.split("+")[0],
                            n2 = s.kjCode.split("+")[1];
                        var ball = "<strong class='redBalls'>" + n1 + "</strong>"+' + '+"<strong class='blueBalls'>" + n2 + "</strong>";
                        $('.kjcode').html(ball)
                    }

                    function formatKjcode2(s){
                        if (!s) return '';
                        
                        if(s.readyState== 4) return '';

                        var ball = "<strong class='redBalls'>" + s.kjCode + "</strong>"
                        $('.kjcode').html(ball)

                    }
                })
            }

            function fomatTime(x) {
                function toDou(n) {
                    return n < 10 ? '0' + n : n;
                }
                var oDate = new Date();
                oDate.setTime(x);
                var n = toDou(oDate.getFullYear()),
                    y = toDou(oDate.getMonth() + 1),
                    r = toDou(oDate.getDate()),
                    s = toDou(oDate.getHours()),
                    f = toDou(oDate.getMinutes()),
                    m = toDou(oDate.getSeconds())
                var s = n + '-' + y + '-' + r + ' ' + s + ':' + f + ':' + m;
                return  s;
            }

            function formatStatus(order) {
                var status = {
                    "-1": "未付款",
                    "0": "待出票",
                    "1": "已发单",
                    "2": "部分流单",
                    "3": "出票失败",
                    "4": "订单取消",
                    "5": "中奖停止",
                    "6": "支付失败",
                    "7": "出票成功"
                };
                var bStatus = {
                    0: "待开奖",
                    1: "未中奖",
                    2: "中奖未派",
                    3: "已派奖"
                };


                var s = status[order.status + ""];
                var bs = bStatus[order.bonusstatus];

                if ((order.status == 2 || order.status == 7) && bs) {
                    if (order.status == 2)
                        s = s + " " + bs;
                    else
                        s = bs;
                }
                return s;
            }
        }

        //追号
        function bettingZH() {
            loginJudge('bettingZH')

            var untils = until;

            action.showPreproject({
                id: untils.getRequestParameter('id')
            }, function(re) {
            	
                if (re.resultCode == '200') {
                	
                    formatData(re.data);
                } else {

                }
            })

            function formatData(d) {
                var arr1 = [],
                    reg = /^20\d{5,8}$/,
                    obj = {};
				//console.log(d.preproject.lotoid);
                obj.lotoid = d.preproject.lotoid;
                obj.name = d.order[0].lotoName;
                obj.projectno = d.preproject.projectno;
                obj.createtime = time2Year(d.preproject.createtime);
                obj.totalsum = d.preproject.totalsum;
                obj.status = formatStatus(d.preproject.status);
                obj.betcode = '';
                if(obj.lotoid=='107'){
                    obj.name='山东11选5';
                }else if(obj.lotoid=='104'){
                    obj.name='广东11选5';
                }else if(obj.lotoid=='106'){
                    obj.name='江西11选5';
                }
                /*if(reg.test(d.preproject.startissue)){
                 obj.startIssue = d.preproject.startissue;
                 obj.endissue = d.preproject.endissue;
                 }else{
                 obj.startIssue = '20'+ d.preproject.startissue;
                 obj.endissue = '20'+d.preproject.endissue;
                 }*/

                switch(obj.lotoid){
                    case '113':
                    case '110':
                    case '108':
                    case '109':
                    case '019':
                        obj.startIssue = '20'+ d.preproject.startissue;
                        obj.endissue = '20'+d.preproject.endissue;
                        break;
                    case '006':
                        obj.startIssue = '2014'+ d.preproject.startissue;
                        obj.endissue = '2014'+d.preproject.endissue;
                        break;
                    default:
                        obj.startIssue = d.preproject.startissue;
                        obj.endissue = d.preproject.endissue;
                }

                for (var j = 0, len = d.orderDetail.length; j < len; j++) {
                    var obj2 = {};
                    obj2.betcode = d.orderDetail[j].betcode.replace(/,/g, ' ').replace(/#/g, '+');
                    obj2.playName = d.orderDetail[j].playName
                    obj2.zhu = 1
                    obj2.multi = d.orderDetail[j].multi
                    obj.betcode += (obj2.betcode+' '+obj2.playName+' '+obj2.zhu+' 注'+' '+obj2.multi+' 倍<br>');
                }

                for (var i = 0, len = d.order.length; i < len; i++) {
                    var obj1 = {};
                    obj1.ordernum = i + 1;
                    //查询开奖 期次不统一 处理
                    switch(d.order[i].lotoid){
                        case '113':
                        case '110':
                        case '108':
                        case '109':
                        case '019':
                            obj1.issue = '20'+d.order[i].issue;
                            break;
                        case '006':
                            obj1.issue = '2014'+d.order[i].issue;
                            break;
                        default:
                            obj1.issue = d.order[i].issue
                    }

                    var st = mergebonusstatus(d.order[i])
                    obj1.status = st.s
                    obj1.bonusstatus = st.b
                    obj1.lotoid = d.order[i].lotoid
                    obj1.betcode = obj.betcode

                    arr1.push(obj1)
                }
                obj.p1 = arr1;
				
                //处理投注跳转
                switch(obj.lotoid){
                    case '001':
                        obj.shref = 'ssq.html';
                        break;
                    case '002':
                        obj.shref = 'fc3d.html';
                        break;
                    case '113':
                        obj.shref = 'dlt.html';
                        break;
                    case '018':
                        obj.shref = 'cqssc.html';
                        break;
                    case '006':
                        obj.shref = 'ssc.html';
                        break;
                    case '108':
                        obj.shref = 'pl3.html';
                        break;
                    case '110':
                        obj.shref = 'qxc.html';
                        break;
                    case '108':
                        obj.shref = 'pl3.html';
                        break;
                    case '109':
                        obj.shref = 'pl5.html';
                        break;
                    case '003':
                        obj.shref = 'qlc.html';
                        break;
                    case '106':
                        obj.shref = 'jx11x5.html';
                        break;
                    case '107':
                        obj.shref = 'sd11x5.html';
                        break;
                    case '104':
                        obj.shref = 'gd11x5.html';
                        break;
                }

                var zhTemplate = Handlebars.compile($("#zh-template").html());
                $("#zh").html(zhTemplate({obj: obj}))
                $('#loading').hide();

                $('.lottory-detailrecord-list').click(function() {
                    $(this).parent().next().toggle();
                })

                $("#jx").attr("href", obj.shref);

                action.issue2resultAll({
                    lotId: cp.CPID[obj.lotoid].lottery_id,
                    startIssue: obj.startIssue,
                    endIssue: obj.endissue
                }, function (re){
                    console.log(re);
                    for(var k=0;k<re.lotolist.length;k++){
                    	if(re.lotolist[k].lotId == '21406'){
                    		$('.iss-'+ re.lotolist[k].lotIssue.substring(2)).append(re.lotolist[k].kjCode);
                    	}
                        $('.iss-'+ re.lotolist[k].lotIssue).append(re.lotolist[k].kjCode);
                    }

                })
            }

            function formatStatus(d) {
                switch (d) {
                    case -1:
                        d = '未付款';
                        break;
                    case 0:
                        d = '追号中';
                        break;
                    case 1:
                        d = '追号完成';
                        break;
                }
                return d;
            }

            function mergebonusstatus(d) {
                var s = '',
                    b = '';
                var sta = {
                    "-1": "未付款",
                    "0": "待出票",
                    "1": "已发单",
                    "2": "部分流单",
                    "3": "出票失败",
                    "4": "订单取消",
                    "5": "中奖停止",
                    "6": "支付失败",
                    "7": "出票成功"
                };
                var bsta = {
                    "0": "待开奖",
                    "1": "未中奖",
                    "2": "派奖中",
                    "3": "已派奖"
                };

                s = sta[d.status];
                b = bsta[d.bonusstatus];

                if(b=='派奖中' || b=='已派奖'){
                    b = '<span class="wzl-h-red">'+ d.bonussum +'元' +'</span>'
                }

                if(s!='出票成功' && s!='部分流单'){
                    b='--'
                }

                return {
                    s: s,
                    b: b
                };
            }

            function time2Year(x) {
                function toDou(n) {
                    return n < 10 ? '0' + n : n;
                }
                var oDate = new Date();
                oDate.setTime(x);
                var n = toDou(oDate.getFullYear()),
                    y = toDou(oDate.getMonth() + 1),
                    r = toDou(oDate.getDate()),
                    s = toDou(oDate.getHours()),
                    f = toDou(oDate.getMinutes()),
                    m = toDou(oDate.getSeconds())
                var s = n + '-' + y + '-' + r + ' ' + s + ':' + f + ':' + m;
                return s;
            }
        }

        function orderdetail() {
            function drawLoadingImg(n) {
                var canvas = document.getElementById('circle-percent-loading');
                var cxt = canvas.getContext('2d');
                cxt.strokeStyle = "white";
                cxt.stroke();
                cxt.closePath();
                cxt.beginPath();
                cxt.lineWidth = 3;
                cxt.arc(75, 75, 74, Math.PI / 2, Math.PI / 2 + Math.PI * n / 50, false);
                cxt.stroke();
                cxt.closePath();
            };
            drawLoadingImg(65);
        }
//
    }
    return {
        account : account
    }
});