/**
 * Created by hebo (razr409355439@gmail.com)on 15/1/12.
 */
define("wzlh5/1.0.0/jc",["jquery/2.1.1/jquery","wzlh5/1.0.0/ac","handlebars/1.3.0/dist/cjs/handlebars",'wzlh5/1.0.0/until',"wzlh5/1.0.0/cp","wzlh5/1.0.0/ui","wzlh5/1.0.0/wzlcopy"],function (require, exports, module) {
    var $ = require("jquery/2.1.1/jquery")
    var until = require("wzlh5/1.0.0/until")
    var action = require("wzlh5/1.0.0/ac")
    var wzlui = require("wzlh5/1.0.0/ui")
    var cp = require("wzlh5/1.0.0/cp")
    var wzlcopy = require("wzlh5/1.0.0/wzlcopy")
    var Handlebars = require("handlebars/1.3.0/dist/cjs/handlebars").default;

    var pops = wzlui.containerMask,
        iscrollPop = wzlui.iscrollPop,
        dialog = wzlui.dialog,
        arg = wzlui.jcData,
//      jcui = wzlcopy.containerJs,
        dropdownMask = wzlui.dropdownMask,
        Y_Y = until.Y_Y,
        TZ_INFO = until.TZ_INFO;
		
    var Router = until.Router;
		
    var jc = function(ac){
    	
        var loaded = {},
            JC_BEI = 1,
            JCCONFIG = cp.JC,
            leagueList = {
                id:0
            },
            stop_control = true
        var routes = {
            "/rqspf": function() {
                rqspf();
            },
            "/spf": function() {
                spf()
            },
            "/jc_bf": function() {
                jc_bf();
               
            },
            "/jcbqc": function() {
            	
                jcbqc()
            },
            "/car": function() {
                car();
            },
            "index": function() {
            	
                if(ac=="rqspf"){
                    rqspf()
                }else if(ac=="jc_bf"){
                	jc_bf()
                }else if(ac=="spf"){
                    spf();
                }else if(ac=="jcbqc"){
                    jcbqc();
                }
            },
            "init": function() {
                init();
            }
        }
        Router(routes)
        /**
         * 竞彩赛事选择器
         * @opts   data 赛事来源
         *        viewselector 选择器
         */
        var jcGameSelector = {
            init: function(opt) {
                var me = this;
                me.opt = opt;
                
                //赛事数据 没有无法继续。
                if (!opt.data) return me;
                me.dataStore = opt.data;
                me._dataStore = {};
                me.chuanguan = {};
                me.doms = $(opt.viewSelector);
                me.selected = {};
                me.doms.unbind().bind("click", function() {
                    var matchNo = $(this).parent().data("matchno")?$(this).parent().data("matchno"):$(this).data("matchno")
                    
                    var l;
                    $(this).toggleClass("active")
                    if (typeof(me.opt.selectAfter) == "function") {
                        l = me.opt.selectBefore(me,matchNo, $(this).index())
                        
                    }
                    if (l) {
                        me.add(matchNo, $(this).index())
                    }else{
                        me.remove(matchNo, $(this).index())
                    }
                })
				
                return me;

            },
            formateData: function() {
                var me = this,
                    re = {};
                for (var i = 0; i < me.dataStore.length; i++) {
                    var changci = me.dataStore[i].changci
                    re[changci] = me.dataStore[i]
                }
                return re;
            },
            add: function(matchNo, spf) {
                var me = this;
                if (!me.selected[matchNo]) me.selected[matchNo] = [];
                if (me.selected[matchNo][spf]) {
                    me.remove(matchNo, spf)
                } else {
                    me.selected[matchNo][spf] = true;
                }
                //每次增加比赛，清空串信息 重新计算
                me.chuanguan = {}
                if (typeof(me.opt.selectAfter) == "function") {
                    me.opt.selectAfter(me.getSelected())
                }
            },
            find: function(matchNo) {
                var me = this;
                for (var i = 0; i < me.selected.length; i++) {
                    if (me.selected[i] == matchNo) {
                        return me.dataStore[i]
                    }
                }
                return null;
            },
            remove: function(matchNo, spf) {
                var me = this;
                var args = [].slice.call(arguments);
               // console.log(args.length);
                switch (args.length) {
                    case 1:
                        delete me.selected[matchNo]
                        $(".m_"+matchNo +" .jc-select-span").removeClass("active")
                        break;
                    case 2:
                        delete me.selected[matchNo][spf]
                        $(".m_"+matchNo+"_"+spf).removeClass("active")
                        if ($.isEmptyObject(me.selected[matchNo])) {
                            delete me.selected[matchNo]
                            $(".m_"+matchNo +" .jc-select-span").removeClass("active")
                        }
                        break;
                }
                if (typeof(me.opt.selectAfter) == "function") {
                    me.opt.selectAfter(me.getSelected())
                }
            },
            getSelected: function() {
                var me = this,
                    re = [];
                for (var i in me.selected) {
                    re.push({
                        n: i,
                        spf: me.selected[i]
                    })
                }
                return re;
            },
            toggleChuanGuan: function(v) {
                var me = this;
                if (me.chuanguan[v]) {
                    me.removeChuanGuan(v)
                } else {
                	me.chuanguan = {}//过关类型变为单选添加代码
                    me.addChuanGuan(v)
                }
                console.log(me)
            },
            removeChuanGuan: function(v) {
                var me = this;
                if (me.chuanguan[v]) {
                    delete me.chuanguan[v]
                }
            },
            addChuanGuan: function(v) {
                var me = this;
                if (!v || v == 0) return;
                if (!me.chuanguan[v]) {
                    me.chuanguan[v] = {
                        n: v + "_1",
                        n_name: v + "串1"
                    }
                }
            },
            getChuan: function() {
                var me = this,
                    re = [];
                for (var i in me.chuanguan) {
                    re.push(i)
                }
                console.log(re)
                return re;
            },
            getChuanGuan: function() {
                var me = this,
                    re = [],
                    len = me.getSelected().length;
                me.chuanguan = me.chuanguan || {};
                if ($.isEmptyObject(me.chuanguan)) {
                    len = len > 8 ? 8 : len;
                    len = len < 1 ? 1 : len;
                    re = [{
                        n: len + "_1",
                        n_name: len + "串1"
                    }]
                    if (!len) return;
                    me.chuanguan[len] = {
                        n: len + "_1",
                        n_name: len + "串1"
                    }
                } else {
                    re = replaceChuan(me.chuanguan)
                }
                return re;

                function replaceChuan(d) {
                    var r = []
                    for (var i in d) {
                        r.push({
                            n: i + "_1",
                            n_name: i + "串1"
                        })
                    }
                    return r;
                }
            },
            viewAdd: function(dom) {},
            viewRemove: function() {},
            clear: function() {
                var me = this;
                me.doms && me.doms.removeClass("active")
                me.selected = {}
            },
            content: function() {
                var me = this,
                    group = {
                        dan: [],
                        tuo: []
                    },
                    chuan;
                var selected = me.getSelected(),
                    len = selected.length;

                for (var i = 0; i < len; i++) {
                    var getSp = getMaxSp(selected[i])
                    group.tuo.push([{
                        n: selected[i].n,
                        d: replace310(selected[i].spf),
                        maxSp: getSp.maxSp,
                        num: getSp.sum
                    }])
                }
                chuan = me.getChuanGuan()
                return {
                    chuan: chuan,
                    group: group
                };

                function replace310(arr) {
                    var b = [3, 1, 0],
                        r = [];
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i] == true) {
                            r.push(b[i])
                        }
                    }
                    return r;
                }

                function getMaxSp(n) {
                    var maxSp = 0,
                        sum = 0;
                    for (var i = 0; i < me.dataStore.length; i++) {
                        if (me.dataStore[i].changci == n.n) {
                            for (var j = 0; j < n.spf.length; j++) {
                                if (n.spf[j] == true) {
                                    sum++;
                                    maxSp =
                                        Math.max(maxSp, me.dataStore[i].sp[j])
                                }
                            }
                        }
                    }
                    return {
                        maxSp: maxSp,
                        sum: sum
                    };
                }
            },
            getSelectGame: function() {
                var me = this,
                    bdata = me.getReplaceData(),
                    re = [],
                    selected = me.getSelected();
                for (var i = 0; i < selected.length; i++) {
                    var o = replace310(bdata[selected[i].n], selected[i].spf)
                    re.push(o)
                }
                return re;

                function replace310(obj, arr) {
                    var b = ["spf_sa", "spf_pa", "spf_fa"],
                        r = [];
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i] == true) {
                            obj[b[i]] = "active"
                        } else {
                            obj[b[i]] = ""
                        }
                        if (me.opt.gameType == "320") {
                            obj.comityBallClass = "hidden"
                        }
                    }
                    return obj;
                }
            },
            getReplaceData: function() {
                var me = this,
                    re = {};
                if (!me.dataStore) return re;
                if (me.dataStore) {
                    for (var i = 0; i < me.dataStore.length; i++) {
                        var m = me.dataStore[i].changci
                        re[m] = me.dataStore[i]
                        re[m].spf_s = me.dataStore[i].sp[0]
                        re[m].spf_p = me.dataStore[i].sp[1]
                        re[m].spf_f = me.dataStore[i].sp[2]
                    }
                }
                return re;
            },
            refreshView: function() {
            },
            getPostData: function(total) {
            	//console.log(total)
                if (!total) return;
                var me = this;
                var _dataStore = me.formateData();
                var ba = [];
                for (var key in me.selected) {
                    ba.push(toVs(key));
                }
                var NumberArray = ba.join("/");
                //console.log(NumberArray)
               // var NumberArray = ba.join("/") + "|0-0";
				//console.log(NumberArray)
                function toVs(id) {
                  var vs = _dataStore[id];
                  var a = [];
//                  a.push(vs.matchHome + 'vs' + vs.matchGuest);
//                  a.push(vs.matchName);
                  var nb = me.selected[id];
                  var newNb = replace310(nb);
//                  a.push(vs.comityBall + ':'
//                  + vs.week + vs.changci.slice(-3) + '-' + vs.matchNo +
//                  ':[' + newNb.join(",") + ']:' + vs.endTime);
//                  a.push(vs.stopSaleTime);
//                  a.push(vs.comityBall);
					a.push(vs.matchNo +':[' + newNb.join(",") + ']');
					
                    return a.join(",");
                }
                var chuan = [],
                    chuan2 = [];
                var chuan2num = {
                    "1串1": "01",
                    "单关": "01",
                    "2串1": "02",
                    "3串1": "03",
                    "3串3": "04",
                    "3串4": "05",
                    "4串1": "06",
                    "4串4": "07",
                    "4串5": "08",
                    "4串6": "09",
                    "4串11": "10",
                    "5串1": "11",
                    "5串5": "12",
                    "5串6": "13",
                    "5串10": "14",
                    "5串16": "15",
                    "5串20": "16",
                    "5串26": "17",
                    "6串1": "18",
                    "6串6": "19",
                    "6串7": "20",
                    "6串15": "21",
                    "6串20": "22",
                    "6串22": "23",
                    "6串35": "24",
                    "6串42": "25",
                    "6串50": "26",
                    "6串57": "27",
                    "7串1": "28",
                    "7串7": "29",
                    "7串8": "30",
                    "7串21": "31",
                    "7串35": "32",
                    "7串120": "33",
                    "8串1": "34",
                    "8串8": "35",
                    "8串9": "36",
                    "8串28": "37",
                    "8串56": "38",
                    "8串70": "39",
                    "8串247": "40"
                }
                for (var n in me.chuanguan) {
                    chuan.push(chuan2num[me.chuanguan[n].n_name])
                }
                //总数据
                var d = {
                    //彩票类型
                    lotoid: me.opt.gameType,
                    format: "ajax",
                    //需要支付金额
                    needPay: "",
                    //投注串
                    lotoGson: {}
                }
                //需要支付
                d.needPay = total.price;
                
                //var chuanArr = chuan.join(',');//过关类型为多选
                var chuanArr = chuan //过关类型为单选
                var buyNumberArray = [{
                    "detail": NumberArray,
                    "typeId": "02",
                   // "seleId": chuanArr,//过关类型为多选
                    "seleId": chuanArr[0],//过关类型为单选
                    "multiple":1
                    //"sum": total.price
                }]
                
                var is = [{
                	"issue": handleArray(buyNumberArray[0].detail.split('/')),
                	"multiple":1
                }]
                //logGson
                var obj = {
//                  "gameType": me.opt.gameType,//彩票类型
//                  "isStop": 0,
//                  "buyType": 0,
//                  buyNumberArray: buyNumberArray,
//                  issueArray: "",
//                  "title": "",
//                  "explain": "",
//                  "secrecy": 1,
//                  "commision": 0,
//                  "commisiontype": 0,
//                  "splitAmount": 0,
//                  "buyAmount": 0,
//                  "floorsAmount": 0,
//                  "isUpload": 0,
//                  "qcdy": 0,
//                  "totalSum": total.price
                    
                    //二维码加密码
                    qrCode: '',
                    //是否购买二微码
                    qrType: "",
                    //彩票类型
                    lotoid: me.opt.gameType,
                    //投注来源
                    source: '6', 
                    //中奖是否停止 0、1
                    //winStop: 0,
                    //投注类型 0 代购 1 追号 2 合买
                    betType: 0,
                    //票信息数组
                    bet: buyNumberArray,
                    //期次信息数组
                    //投注金额
                    amount:total.price,
                    issue: is
                    /*
                     channelId: loads.channelId,
                     backURL: backURL.url(),
                     udid: loads.udid,
                     user_client: loads.user_client,
                     client_version: loads.client_version,
                     href: window.location.pathname*/
                }
                function handleArray(arr){
                	for(var i=0;i<arr.length;i++){
                		if(i===arr.length-1){
                			return arr[i].split(':')[0]
                		}
                	}
                }
                obj.qrCode = getQrCode();//二维码加密
                obj.qrType = getQrType();//是否购买二维码
                //是否购买二微码qrType
                function getQrCode(){
                    return localStorage.getItem("qrCode")
                }
                    
                function getQrType(){
                	return localStorage.getItem("qrType")
                }
                
                d.lotoGson = obj
                //  d.c = chuan2;
                return d;
                //筛选selectId
                function replace310(arr) {
                    var b = ["3", "1", "0"],
                        r = [];
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i] == true) {
                            r.push(b[i])
                        }
                    }
                    return r;
                }
            },
            filterLeague: function() {}
        }
        //init
        function leagueM(){
            //l_name
            var re = [],rea=[],m5re=[];
            for(var i in leagueList){
                if(i!=='id'){
                    re.push({id:leagueList[i].id,name:i})
                    //所有id
                    rea.push(".lid_"+leagueList[i].id)
                    switch (i) {
                        case "英超":
                        case "法甲":
                        case "意甲":
                        case "德甲":
                        case "西甲":
                            m5re.push(".lid_"+leagueList[i].id)
                            break;
                    }
                }
            }
            
            var jcTemplate = Handlebars.compile($("#jcmatch-match-item-handlebars").html());
            $('#jc-match .league-list').html(jcTemplate({
                list: re
            }));
            matchEvent(rea);
            function matchEvent(red) {
                var cls = red;
                
                $("#matchall").unbind().bind('click',function() {
                    cls = [];
                    $(".league-list li").each(function(index, item) {
                        var lid = $(this).data("league-id")
                        cls.push(".lid_" + lid)
                        $(this).addClass("active")
                    })
                })
                $("#matchno").unbind().bind('click',function() {
                    cls = [];
                    $(".league-list li").each(function(index, item) {
                        if ($(this).hasClass("active")) {
                            $(this).removeClass("active")
                        } else {
                            $(this).addClass('active')
                            var lid = $(this).data("league-id")
                            cls.push(".lid_" + lid)
                        }
                    })
                })
                $("#match5").unbind().bind('click',function() {
                    cls = m5re
                    var  ob = {}
                    for(var i=0;i<m5re.length;i++){
                        var id = m5re[i].split("_")[1]
                        ob[id]=true;
                    }
                    $(".league-list li").each(function(index, item) {
                        var lid = $(this).data("league-id")
                        if (!ob[lid]) {
                            $(this).removeClass("active")
                        } else {
                            $(this).addClass("active")
                        }
                    })
                })
                $(".league-list li").unbind().bind('click',function() {
                    var lid = $(this).data("league-id")
                    if ($(this).hasClass("active")) {
                        $(this).removeClass("active")
                        cls = removeCls(".lid_" + lid)
                    } else {
                        $(this).addClass("active")
                        cls.push(".lid_" + lid)
                    }
                    
                })
                
                $("#domatch").unbind().bind('click',function() {
                    var base = red;
                    doHideShow(base, true)   
                    doHideShow(cls)
                    $("#jc-match").hide();
                    $("#selectjc").show();
                    $(".jc-subtitle-len").each(function(index, item) {
                        var len = $(".jc-gamelist").eq(index).find('.match-total').length;
                        $(this).html(len)
                    })
                    $("#jc-spf .account-nav-group li,#jc-rqspf .account-nav-group li").each(function(index, item) {
                        var len = $(".jc-content-item").eq(index).find('.match-total').length;
                        var s = $(this).text().substring(0, 4)
                        $(this).html(s + "(" + len + ")")
                    })
                })
                function removeCls(c) {
                    var re = [];
                    for (var i = 0; i < cls.length; i++) {
                        if (cls[i] !== c) {
                            re.push(cls[i])
                        }
                    }
                    return re;
                }

                function doHideShow(c, hideOrShow) {
                	
                    $(c).each(function(index, item) {

                        if (hideOrShow) {
                        	console.log(1)
                            $(item).removeClass("match-total").hide();
                        } else {
                        	console.log(2)
                            $(item).show().addClass("match-total");
                        }
                    })
                }
            }
        }

        function init() {
            $('.wzl-nav-dropdown').click(function() {
				
                dropdownMask.toggle();
                $("#wzl-dropdown a").click(function(){
                    var  h = $(this).prop("href")
                    dialog({
                        type: "select",
                        message: "切换玩法将清空所选对阵",
                        onConfirm: function() {
                            location.href=h;
                        },
                        onCancel:function(){
                            setTimeout(function(){
                                dialog.remove();
                            },1000)
                        }
                    })
                    return false;
                })
            })
//          $.wzlmore(function(d) {
//              $('.' + $(d).attr('class')).on('click', function() {
//                  //////alert($(this).html())
//              })
//          });
			$('.navbar-header').on('click','.icon-more',function(){
                	
                	$('.drop-down-more').toggle();
            })
            $(".jc-match-i").on("click", function() {
                $("#selectjc,#jc-match").slideToggle();
            })
            //请求 userinfo 用于同步
            action.queryUserInfo({},function(){})
        }
        //
        function spf() {
            //查询是否停售
            action.getControl(function(re){
                if(re[320]===false){
                    stop_control=false
                    dialog("该玩法已经停售!")
                }
            })
            $("#jccar,#carfixed,#jc-rqspf,#jc-match").hide()   //.icon-dropdown-pink
            $("#selectjc,#buycarfixedbtn,.wzl-nav-dropdown,#jc-spf,.jc-match-i").show();
            $(".wzl-nav-dropdown .icon-dropdown-white").html("胜平负")
            $(".wzl-cartext").addClass("hidden")
            if (!loaded.spf) {
                action.jcMatchData({}, function(re) {
                    if (re.resultCode != '500' || re.length != 0) {
                        var r = matchData(re)
                        var jcTemplate = Handlebars.compile($("#jcmatch-item-handlebars").html());
                        $('#jcspf-gamelist-h').html(jcTemplate({
                            list: r.h
                        })).hide();
                        $('#jcspf-gamelist-all').html(jcTemplate({
                            list: r.all
                        })).show(); 
                        $('#jcspf-gamelist-l').html(jcTemplate({
                            list: r.l
                        })).hide();
                        jcGameSelector.init({
                            data: r.data,
                            gameType: "320",
                            viewSelector: ".jc-select-span",
                            selectBefore: function(me,matchNo,spf) {
                                var selected = me.getSelected();
                                if(me.selected[matchNo]) {
                                    if(me.selected[matchNo][spf]) {
                                        return false;
                                    }
                                    return true;
                                }
                        if(selected && selected.length == 8) {
                                    dialog("tips", "最多选择八场比赛");
                                    $(".m_"+matchNo+"_"+spf).removeClass("active");

                                    return false;
                                }
                                return true;
                            },
                            selectAfter: function(result) {
                                countCar(result)
                            }
                        })
                        renderTab("#jc-spf", r);
                        loaded.spf = true;
                        loaded.spfData = r.data;
                    } else {
                        dialog('暂无数据...');
                    }
                })
            } else {

                /*jcGameSelector.init({
                 data:  loaded.spfData,
                 gameType:"320",
                 viewSelector: ".jc-select-span",
                 selectBefore: function(me) {
                 var selected = me.getSelected();
                 if (selected && selected.length == 8) {
                 dialog("tips", "最多选择八场比赛")
                 return false;
                 }
                 return true;
                 },
                 selectAfter: function(result) {
                 countCar(result)
                 }
                 })*/
                countCar();
            }

            function countCar(re) {
                if (!re || !re.length || re.length < 2) {
                    $("#buycarfixedbtn a.ball-status-bar").addClass("disabled").html("已经选择了" + re.length + "场比赛")
                    $(".ball-status-bar").unbind().bind('click', function() {
                        dialog("请至少选择两场比赛")
                    });
                } else {
                    var slen = re.length;
                    $("#buycarfixedbtn a.ball-status-bar").removeClass("disabled").html("已经选择了" + slen + "场比赛")
                    $(".ball-status-bar").unbind().bind('click', function() {
                        location.href = "#!/car"
                    });
                }
            }
            $('.account-nav-group li').on('click', function() {
                var $this = $(this);
                var index = $('.account-nav-group li').index(this);
                $this.addClass('active').siblings().removeClass('active');
                $(".jc-content-item").hide().eq(index).show();
            })
            $(".glyphicon.icon-trash").on('click', function() {
                jcGameSelector.clear();
                countCar();
            })
        }
        //
        function rqspf() {
            action.getControl(function(re){
                if(re[301]===false){
                    stop_control=false
                    dialog("该玩法已经停售!")
                }
            })
            $("#jccar,#carfixed,#jc-spf,#jc-match").hide()
            $(".wzl-cartext").addClass("hidden")
            $("#selectjc,#buycarfixedbtn,#jc-rqspf,.wzl-nav-dropdown,.jc-match-i").show();
            $(".wzl-nav-dropdown.icon-dropdown-white").html("让球胜平负")
            $('.account-nav-group li').on('click', function() {
                var $this = $(this);
                var index = $('.account-nav-group li').index(this);
                $this.addClass('active').siblings().removeClass('active');
                $("ul.jc-spf-list").hide().eq(index).show();
                $('.jc-spf-list').show();
            })
            if (!loaded.rqspf) {
            	
                action.jcSpfMatch({},function(re) {
                    if (re.resultCode != '500' || re.length != 0) {
                        var r = matchData(re)
						
                        var jcTemplate = Handlebars.compile($("#jcmatch-rqspf-item-handlebars").html());
                        $('#jcrqspf-gamelist-h').html(jcTemplate({
                            list: r.h
                        })).hide();
                        $('#jcrqspf-gamelist-all').html(jcTemplate({
                            list: r.all
                        })).show();
                        $('#jcrqspf-gamelist-l').html(jcTemplate({
                            list: r.l
                        })).hide();
                        jcGameSelector.init({
                            data: r.data,
                            gameType: "301",
                            viewSelector: "#jc-rqspf .jc-select-span",
                            selectBefore: function(me,matchNo,spf) {
                                var selected = me.getSelected();
								
                                if(me.selected[matchNo]) {
                                    if(me.selected[matchNo][spf]) {
                                        return false;
                                    }
                                    return true;
                                }

                                if (selected && selected.length == 8) {
                                    dialog("tips", "最多选择八场比赛");
                                    $(".m_"+matchNo).find('span').removeClass("active");

                                    return false;
                                }
                                return true;
                            },
                            selectAfter: function(result) {
                                countCar(result)
                            }
                        })


                        renderTab("#jc-rqspf", r);
                        loaded.rqspf = true;
                        loaded.rqspfData = r.data;
                    } else {
                        dialog('暂无数据...');
                    }
                })
            } else {/*
             jcGameSelector.init({
             data: loaded.rqspfData,
             gameType:"301",
             viewSelector: "#jc-rqspf .jc-select-span",
             selectBefore: function(me) {
             var selected = me.getSelected();
             if (selected && selected.length == 8) {
             dialog("tips", "最多选择八场比赛")
             return false;
             }
             return true;
             },
             selectAfter: function(result) {
             countCar(result)
             }
             })*/
                countCar();
            }
            $('.account-nav-group li').on('click', function() {
                var $this = $(this);
                var index = $('.account-nav-group li').index(this);
                $this.addClass('active').siblings().removeClass('active');
                $(".jc-content-item").hide().eq(index).show();
            })
            function countCar(re) {
                if (!re || !re.length || re.length < 2) {
                    $("#buycarfixedbtn a.ball-status-bar").addClass("disabled").html("已经选择了" + re.length + "场比赛")
                    $(".ball-status-bar").unbind().bind('click', function() {
                        dialog("请至少选择2场比赛")
                    });
                } else {
                    var slen = re.length;
                    $("#buycarfixedbtn a.ball-status-bar").removeClass("disabled").html("已经选择了" + slen + "场比赛")
                    $(".ball-status-bar").unbind().bind('click', function() {
                        location.href = "#!/car"
                    });
                }
            }
            $(".glyphicon.icon-trash").on('click', function() {
                jcGameSelector.clear();
                countCar();
            })
        }
        //竞猜比分
		function jc_bf() {
			//查询是否停售
            action.getControl(function(re){
                if(re[302]===false){
                    stop_control=false
                    dialog("该玩法已经停售!")
                }
            })
            $('.account-nav-group li').on('click', function() {
                var $this = $(this);
                var index = $('.account-nav-group li').index(this);
                $this.addClass('active').siblings().removeClass('active');
                $(".jc-content-item").hide().eq(index).show();
            })
            
            if (!loaded.jc_bf) {
            
                action.jcbfMatch({}, function(re) {
                    if (re.resultCode != '500' || re.length != 0) {
                        var r = matchData(re)   
                        
                        var jcTemplate = Handlebars.compile($("#jcmatch-rqspf-item-handlebars").html());
                    
                        $('#jcbf-gamelist-h').html(jcTemplate({
                            list: r.h
                        }))
						
                        $('#jcbf-gamelist-all').html(jcTemplate({
                            list: r.all
                        }))
                        $('#jcbf-gamelist-l').html(jcTemplate({
                            list: r.l
                        }))
                        
                        //存储比分投注数据
                        localStorage.setItem("data",JSON.stringify(r.data))
                        //比分投注遮罩层
                       $(".nw-tz-btn").on('click',function(){
		            		$('.sheng').empty();
							$('.ping').empty();
							$('.fu').empty();
		            		var matchno = $(this).attr("data-matchno");
		            		var data = JSON.parse(localStorage.getItem("data"));
		            		var obj = {};
		            		$(data).each(function(){
		            			var str1 = '',str2 = '',str3 = '';
			            		if(this.changci == matchno){
			            			$(this.sp).each(function(index,item){
			            				if(index>=0&&index<13){
			            					str1 += '<span id="td_0_'+index+'" class="s" data-matchno="'+matchno+'">'
							                str1 += '<p>'+arg[302].numName[index]+'</p>'
							                str1 += '<p>'+item+'</p>'
							                str1 += '</span>'
			            				}else if(index>12&&index<18){
			            					str2 += '<span id="td_0_'+index+'" class="s" data-matchno="'+matchno+'">'
							                str2 += '<p>'+arg[302].numName[index]+'</p>'
							                str2 += '<p>'+item+'</p>'
							                str2 += '</span>'
			            				}else{
			            					str3 += '<span id="td_0_'+index+'" class="s" data-matchno="'+matchno+'">'
							                str3 += '<p>'+arg[302].numName[index]+'</p>'
							                str3 += '<p>'+item+'</p>'
							                str3 += '</span>'
			            				}
			            				
			            			})
									$('.sheng').append(str1);
									$('.ping').append(str2);
									$('.fu').append(str3);
									$("#nw-popup .s").click(function(){
										var id=$(this).attr("id");
										wzlcopy.clickEvent(id,1,302)
									})
									
			            		}
			            		
			            	})
					        $("#nw-popup").show();
					    })
		            	$('.nw-pop-text-fod').on('click','span:eq(0)',function(){
		            		$('#nw-popup').hide();
		            	})
                        renderTab("#jc-spf", r);
                        loaded.rqspf = true;
                        loaded.rqspfData = r.data;
                    } else {
                        dialog('暂无数据...');
                    }
                })
            }else{
            	
            	countCar();
            }
            $('.account-nav-group li').on('click', function() {
                var $this = $(this);
                var index = $('.account-nav-group li').index(this);
                $this.addClass('active').siblings().removeClass('active');
                $(".jc-content-item").hide().eq(index).show();
            })
            function countCar(re) {
                if (!re || !re.length || re.length < 2) {
                    $("#buycarfixedbtn a.ball-status-bar").addClass("disabled").html("已经选择了" + re.length + "场比赛")
                    $(".ball-status-bar").unbind().bind('click', function() {
                        dialog("请至少选择2场比赛")
                    });
                } else {
                    var slen = re.length;
                    $("#buycarfixedbtn a.ball-status-bar").removeClass("disabled").html("已经选择了" + slen + "场比赛")
                    $(".ball-status-bar").unbind().bind('click', function() {
                        location.href = "#!/car"
                    });
                }
            }
            $(".glyphicon.icon-trash").on('click', function() {
                jcGameSelector.clear();
                countCar();
            })
            function handleZhezhao(){
            	$(".nw-tz-btn").on('click',function(){
            		$('.sheng').empty();
					$('.ping').empty();
					$('.fu').empty();
            		var matchno = $(this).attr("data-matchno");
            		var data = JSON.parse(localStorage.getItem("data"));
            		var obj = {};
            		$(data).each(function(){
            			var str1 = '',str2 = '',str3 = '';
	            		if(this.changci == matchno){
	            			$(this.sp).each(function(index,item){
	            				if(index>=0&&index<13){
	            					str1 += '<span id="td_0_'+index+'" class="s jc-select-span">'
					                str1 += '<p>'+arg[302].numName[index]+'</p>'
					                str1 += '<p>'+item+'</p>'
					                str1 += '</span>'
	            				}else if(index>12&&index<18){
	            					str2 += '<span id="td_0_'+index+'" class="s jc-select-span">'
					                str2 += '<p>'+arg[302].numName[index]+'</p>'
					                str2 += '<p>'+item+'</p>'
					                str2 += '</span>'
	            				}else{
	            					str3 += '<span id="td_0_'+index+'" class="s jc-select-span">'
					                str3 += '<p>'+arg[302].numName[index]+'</p>'
					                str3 += '<p>'+item+'</p>'
					                str3 += '</span>'
	            				}
	            				
	            			})
							$('.sheng').append(str1);
							$('.ping').append(str2);
							$('.fu').append(str3);
	            		}
	            		
	            	})
			        $("#nw-popup").show();
			    })
            	$('.nw-pop-text-fod').on('click','span:eq(0)',function(){
            		$('#nw-popup').hide();
            	})
            }  
		}
		
        function car() {
            $("#selectjc,#buycarfixedbtn,#jc-match,.wzl-nav-dropdown,.jc-match-i").hide();
            $(".wzl-cartext").removeClass("hidden")
            $(".ball-status-bar").addClass("disabled").html("已经选择了0场比赛")
            $("#jccar,#carfixed").show(function() {
                renderCar();
            });
            /**
             * 计算 注数
             *
             */
            function countCar() {
                var car_count = 0,
                    car_price = 0,
                    car_maxwin = 0,
                    total = {},
                    list = [],
                    chuanAction = {};
                if (jcGameSelector) {
                	
                    list = jcGameSelector.getSelectGame()
                    console.log(list)
                    var r = jcGameSelector.content();
                    //console.log(r);
                    var gameTotal = totalSum(r.group.dan, r.chuan, r.group.tuo)
                   // console.log(gameTotal);
                    car_count = gameTotal.item;
                    car_price = gameTotal.item * 2;
//                  console.log(car_count);
//                  console.log(car_price);
//                 
                    car_maxwin = gameTotal.maxWin.toFixed(2);
                    //增加 移除 过关类型
                } else {
                    return false;
                }
                total.bei = JC_BEI;
                total.count = car_count;
                total.price = car_price * JC_BEI;
                total.car_count = car_count;
                total.car_maxwin = (car_maxwin * JC_BEI).toFixed(2);

                function clear() {
                    if (jcGameSelector) {
                        jcGameSelector.clear()
                    }
                    JC_BEI = 1;
                }

                function remove(id) {
                    if (jcGameSelector) {
                        jcGameSelector.remove(id)
                    }
                }
                //统计注数跟最大奖金
                function totalSum(dan, chuan, tuo) {
                    var count = 0; //数量
                    var maxPrice = 0; //最大奖金
                    var gg = chuan;
                    var tuo = tuo;
                    var dan = dan;
                  
                    //单一玩法
                    var isShowhh = false;
                    //循环4串1 5串1 这样的
                    for (var i = 0; i < gg.length; i++) {
                        var chuanN = gg[i].n.split("_")
                        
                        var fs = [chuanN[0]] //过关方式
                        
                        var guoguan_num = chuanN[0]; //过关的数量(5串1,获得5)
                        
                        var array = '',
                            arr = [];
                        var dan_lenth = dan.length;
                         
                        if (dan_lenth > 0) { //有胆
                            var danArray = [];
                            if (dan_lenth == guoguan_num) { //全胆
                                array = eachArray(dan, guoguan_num);
                            } else {
                                var tuoTemp = eachArray(tuo, guoguan_num - dan_lenth); //得到托组合数
                                for (var cc = 0; cc < tuoTemp.length; cc++) {
                                    danArray.push(dan.concat(tuoTemp[cc])); //得到胆拖的组合数
                                }
                                array = danArray;
                            }
                        } else {
//                      	console.log(tuo)
//                      	console.log(guoguan_num)
                            array = eachArray(tuo, guoguan_num);
                        }
                        for (var m = 0, l = array.length; m < l; m++) { //第一次过滤个从复
                            var v = cl(array[m]);
                            //if(obj.isShowhhgy){//不显示单一玩法
                            if (isShowhh) { //不显示单一玩法
                                for (var a = 0, aa = v.length; a < aa; a++) {
                                    var spf_num = 0,
                                        rqspf_num = 0,
                                        cbf_num = 0,
                                        jqs_num = 0,
                                        bqc_num = 0;
                                    for (var b = 0, bb = v[a].length; b < bb; b++) {
                                        var rq = v[a][b];
                                        if (rq.box == 0) {
                                            spf_num++;
                                        } else if (rq.box == 4) {
                                            rqspf_num++;
                                        } else if (rq.box == 1) {
                                            jqs_num++;
                                        } else if (rq.box == 2) {
                                            cbf_num++;
                                        } else if (rq.box == 3) {
                                            bqc_num++;
                                        }
                                        if (spf_num == guoguan_num || rqspf_num == guoguan_num || jqs_num == guoguan_num || cbf_num == guoguan_num || bqc_num == guoguan_num) {
                                            v[a] = [];
                                            break;
                                        }
                                    }
                                }
                            }
                            arr = arr.concat(v);
                        }
                        for (var j = 0, jj = fs.length; j < jj; j++) {
                            for (var k = 0, kk = arr.length; k < kk; k++) {
                                var len = eachArray(arr[k], fs[j]); //[["2=1:4.3", "3=1:3.29|3=0:2.7"]]
                                for (var n = 0, nn = len.length; n < nn; n++) {
                                    if (isShowhh) { //不显示单一玩法(多串须再次去从复)
                                        var a = 0,
                                            b = 0,
                                            c = 0,
                                            d = 0,
                                            e = 0;
                                        for (var m = 0, mm = len[n].length; m < mm; m++) {
                                            var ee = len[n][m];
                                            if (ee.box == 0) {
                                                a++;
                                            } else if (ee.box == 4) {
                                                e++;
                                            } else if (ee.box == 1) {
                                                b++;
                                            } else if (ee.box == 2) {
                                                c++;
                                            } else if (ee.box == 3) {
                                                d++;
                                            }
                                            if (a == fs[j] || b == fs[j] || c == fs[j] || d == fs[j] || e == fs[j]) {
                                                len[n] = [];
                                            }
                                        }
                                    }
                                    count += multiplyCount(len[n]); //注数
                                    maxPrice += multiplyCount(len[n], "0"); //计算最大奖金
                                }
                            }
                        }
                    }
                    var max = maxPrice * 2;
                    return {
                        "item": count, //注数
                        "maxWin": max //最大金额
                    };

                    function eachArray(arr, num) {
                        var t = [
                                []
                            ],
                            r = [];
                        for (var i = 0, n = arr.length; i < n; i++) {
                            for (var j = 0, k = t.length; j < k; j++) {
                                var ss = t[j].concat([arr[i]]);
                              
                                ss.length < num ? t.push(ss) : r.push(ss);
                            }
                        }
                      // console.log(r);
                       //console.log(t);
                        return r;
                    }

                    function cl(a) {
                        var n = 0,
                            array = [],
                            code = [];
                        allArr(a, n)
                        function allArr(arr, n) {
                            if (n >= arr.length) {
                                array.push(code.slice());
                                code.length = n - 1;
                            } else {
                                for (var i = 0, j = arr[n].length; i < j; i++) {
                                    code.push(arr[n][i]);
                                    allArr(arr, n + 1);
                                }
                                if (n) {
                                    code.length = n - 1;
                                }
                            }
                        }
                        return array;
                    }

                    function multiplyCount(arr, flag) {
                        //console.log(arguments)
                        var a = 1;
                        if (arr.length == 0) return 0;
                        for (var i = 0, l = arr.length; i < l; i++) {
                            //var v = arr[i].split("_")
                            if (flag) {
                                a *= arr[i].maxSp; //价格
                            } else {
                                a *= arr[i].num; //注数
                            }
                        }
                        //console.log(a)
                        return a;
                    }
                }
                return {
                    list: list,
                    count: car_count,
                    price: car_price,
                    remove: remove,
                    total: total,
                    clear: clear,
                    jcGameSelector: jcGameSelector
                };
            }

            function renderCar() {
                var s = countCar();
                if (s != false) {
                    renderList(s.list)
                    renderCarTotal();
                }
                renderCarTotal();
                function renderList(n) {
                    var list = n || countCar().list;
                    var jcTemplate = Handlebars.compile($("#jcspf-gamelist-template").html());
                    $('#ball-select-group').html(jcTemplate({
                        data: list
                    }));
                    
                    $(".game-bet-bd .jc-select-span").unbind().bind('click', function() {
                        var matchNo = $(this).parent().data("matchno")
                        var s= $(this).index()
                        if($(this).hasClass("active")){
                            $(this).removeClass("active")
                            $(".m_"+matchNo+"_"+s).removeClass("active")
                        }else{
                            $(this).addClass("active")
                            $(".m_"+matchNo+"_"+s).addClass("active")
                        }
                        jcGameSelector.add(matchNo, $(this).index())
                        renderCar();
                    })
                    $("#ball-select-group .glyphicon.icon-trash").unbind().bind('click', function() {
                        var matchNo = $(this).next('.game-bet-bd').data("matchno")
                       var oSize = $(".ball-select-group li").size()-2;
                       console.log(oSize)
                        $("#car-gglx .car-order-type").slice(oSize).hide();
                        $("#car-gglx").show();
                        
                        jcGameSelector.remove(matchNo)
                        renderCar()
                    })
                }

                function renderCarTotal() {
                	//console.log(666)
                    var car = countCar();
                    var data = car.total,
                        chuanAction = car.jcGameSelector;
                    var jcCarTemplate = Handlebars.compile($("#car-total-handlebars").html());
                    $("#car-total").html(jcCarTemplate(data))
                    $(".buy-bar-type").on("click", function() {
                        var chuan = chuanAction.getChuan()
                        $(chuan).each(function(n, item) {
                            $("#car-gglx .car-order-type").eq(item - 2).addClass("active");
                        })
                        $("#car-gglx .car-order-type").slice(s.list.length - 1).hide()
                        $("#car-gglx").show()
                    })
                    $("#car-gglx .car-order-type").unbind().bind("click", function() {
                        if ($(this).hasClass("active")) {
                            $(this).removeClass("active")
                        } else {
                        	//$(this).addClass("active")//原代码
                            $(this).addClass("active").siblings().removeClass('active');//过关类型变为单选添加代码
                        }
                       
                        var v = $(this).data("v")
                      
                        chuanAction.toggleChuanGuan(v)//过关类型变单选151行代码有更改
                        renderCarTotal();
                    })
                    $(".game-bet-encounter-green,.comform-box-cancel").unbind().bind("click", function() {
                        $("#car-gglx").hide()
                    })
                    if (!car || !car.list.length || car.list.length < 2) {
                        $('#ssq_buy').addClass("disabled")
                    }
                    $('#ssq_buy').unbind().bind("click", function() {
                        //发送购买请求
                       
                        var result = jcGameSelector.getPostData(data)
                       
                        postBuy(result, function(re) {
                            if (re.resultCode == "200") {
                                car.clear();
                                renderCar()
                                tzsuccess();
                            }
                        })
                    })
                    totalBoard(function(bei) {
                        JC_BEI = bei;
                        renderCar();
                    })
                }
            }
            /*投注成功*/
            function tzsuccess() {
                $("#selectjc,#jccar,#carfixed,.wzl-car,.jc-match-i").hide();
                $("#tzsuccess").show();
            }
            //统计面板事件 （期次 倍数 是否追号 等
            function totalBoard(fn) {
                var $beiInput = $("#ball-bei");
                var bei = $beiInput.val().trim();
                //倍数减
                $(".buy-bar-beiminus").unbind().bind('click', function() {
                    bei--;
                    bei = bei < 1 ? 1 : bei;
                    syanc();
                })
                //倍数加
                $(".buy-bar-beiplus").unbind().bind('click', function() {
                    bei++;
                    bei = bei > 9999 ? 9999 : bei;
                    syanc();
                })
                $($beiInput).blur(function() {
                    var $val = $($beiInput).val();
                    $val = $val.replace(/\D/g, "")
                    $val = $val > 20 ? 20 : $val;
                    $(this).val($val)
                    bei = Number($val);
                    syanc();
                })

                function syanc() {
                    setTimeout(function() {
                        $beiInput.val(bei)
                        fn && fn(bei)
                    }, 100)
                }
            }

            function postBuy(data, fn) {
                if (stop_control == false) return dialog("该彩种已经停售！");
                dialog("loading", "正在投注！")
                var udata = {};
//              getIssue(function(r) {
//                  if (!r || !r.length) return dialog("投注异常，请重试")
                    data.lotoGson.issue[0].multiple = JC_BEI;
                   
                    data.lotoGson = JSON.stringify(data.lotoGson)
                   console.log(data.lotoGson)
                    action.jcTz(data.lotoGson, function(re) {
                        TZ_INFO(re, fn)
                        if(re.status==5011||re.status==5012){
                        	$('.wzl-ui-dialog-operation div:eq(0)').unbind().bind("click", function() {
                    			localStorage.setItem('qrType',0)
		                        $(this).attr("disabled")
		                        
		                        
		                    })
                        	$('.wzl-ui-dialog-operation div:eq(1)').unbind().bind("click", function() {
                    			localStorage.setItem('qrType',0)
		                        $(this).attr("disabled");
		                       
		                        //发送购买请求
		                        var car = countCar();
                    			var data = car.total;
                    			
		                        var result = jcGameSelector.getPostData(data)
		                        postBuy(result, function(re) {
		                            if (re.resultCode == "200") {
		                            	
		                                result.clear();
		                                renderCar()
		                                tzsuccess();
		                                
		                            }
		                        });
		                    })
                        	
                        }else if(re.status==5013){
                        	$('.wzl-ui-dialog-operation div:eq(0)').unbind().bind("click", function() {
                    			localStorage.setItem('qrType',1)
		                        $(this).attr("disabled")
		                        //发送购买请求
		                       
		                    })
                        	$('.wzl-ui-dialog-operation div:eq(1)').unbind().bind("click", function() {
                    			localStorage.setItem('qrType',0)
		                        $(this).attr("disabled")
		                        //发送购买请qiu	      
		                        var car = countCar();
                    			var data = car.total;
		                        var result = jcGameSelector.getPostData(data)
		                        postBuy(result, function(re) {
		                 
		                            if (re.resultCode == "200") {
		                            	
		                                result.clear();
		                                renderCar()
		                                tzsuccess();
		                            }
		                        });
		                    })
                        }
                    })
//              })

                function getIssue(fn) {
                	
                    var r = []; //
                    action.getIssue({
                        lottery: "JCZQSPF",
                        issues: 1
                    }, function(re) {
                    	//console.log(re)
                        r = merge(re)
                        fn(r)
                    })

                    function merge(list) {
                        var r = [];
                        $(list).each(function(index, item) {
                            r.push({
                                issue: " " /*item.issue*/ ,
                                multiple: JC_BEI
                            })
                        })
                       
                        return r;
                    }
                }
            }
        }

        function matchData(d) {
        	
            var s = formatData(d)
            
            for (var i in s) {
                s[i] = seleteDate(s[i])
            }
            function seleteDate(re) {
                var o = {},
                    r = [],
                    d = {};
                for (var i = 0; i < re.length; i++) {
                    var d = re[i].matchNo.substring(0, 8);
                    if (o[d]) {
                        o[d].push(re[i])
                    } else {
                        o[d] = []
                        o[d].push(re[i])
                    }
                }
                for (var n in o) {
                    if (o[n].length) {
                        var str = o[n][0].date + " " + o[n][0].weekday + " <span class='jc-subtitle-len'>" + o[n].length + "</span>场比赛可投";
                        r.push({
                            list: o[n],
                            str: str
                        })
                    }
                }
                return r;
            }

            function totalList() {
                var re = []
                for (var i = 0; i < s.all.length; i++) {
                    re = re.concat(s.all[i].list)
                }
                return re;
            }
            s.data = totalList();
            return s;
        }

        function renderTab(id, result) {
            $(id + " .account-nav-group li").eq(0).html("<a href='javascript:;'>高中奖率(" + totalLength(result.h) + ")</a>")
            $(id + " .account-nav-group li").eq(1).html("<a href='javascript:;'>全部赛事(" + totalLength(result.all) + ")</a>")
            $(id + "  .account-nav-group li").eq(2).html("<a href='javascript:;'>五大联赛(" + totalLength(result.l) + ")</a>")
            $(".jc-subtitle").click(function() {
                $(this).next(".jc-gamelist").toggle();
            })

            function totalLength(s) {
                var n = 0;
                for (var i = 0; i < s.length; i++) {
                    n += s[i].list.length;
                }
                return n;
            }
        }

        function getWeekDay(n) {
            var arr = ["", '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
            return arr[n];
        };

        function formatData(re) {
            var h = [],
                l = [];
            for (var i = 0, len = re.length; i < len; i++) {
                re[i].date = re[i].date || '';
                re[i].win = re[i].win || '';
                re[i].equ = re[i].equ || '';
                re[i].lose = re[i].lose || '';
                re[i].number = re[i].number || '';
                re[i].changci = re[i].changci || '';
                re[i].endtime = re[i].endtime || '';
                re[i].number = len;
                re[i].date = re[i].matchNo.substring(0, 4) + '-' + re[i].matchNo.substring(4, 6) + '-' + re[i].matchNo.substring(6, 8);
                re[i].weekday = getWeekDay(re[i].matchNo.substring(8, 9));
                re[i].changci = [re[i].matchNo.substring(8, 9)] + re[i].matchNo.substring(9);
                re[i].changciStr = ["", "周一", "周二", "周三", "周四", "周五", "周六", "周日"][re[i].matchNo.substring(8, 9)] + re[i].matchNo.substring(9);
                re[i].endtime = checkTime((re[i].stopSaleTime.substring(8, 12)));
                re[i].win = re[i].sp[0];
                re[i].equ = re[i].sp[1];
                re[i].lose = re[i].sp[2];
                re[i].week = ["", "周一", "周二", "周三", "周四", "周五", "周六", "周日"][re[i].matchNo.substring(8, 9)]
                re[i].leagueName = re[i].matchName.substring(0, 4)
                // re[i].lid = matchLeague(re[i].matchName)
                //高中奖率筛选
                if (re[i].sp[0] <= 1.6 || re[i].sp[1] <= 1.6 || re[i].sp[2] <= 1.6) {
                    h.push(re[i])
                }
                switch (re[i].matchName) {
                    case "英超":
                    case "法甲":
                    case "意甲":
                    case "德甲":
                    case "西甲":
                        l.push(re[i])
                        break;
                }
                if(!leagueList[re[i].matchName.substring(0, 4)]){
                    var  id = leagueList.id++
                    leagueList[re[i].matchName.substring(0, 4)] = {};
                    leagueList[re[i].matchName.substring(0, 4)].id = id
                    re[i].lid = leagueList[re[i].matchName.substring(0, 4)].id
                }else{
                    re[i].lid = leagueList[re[i].matchName.substring(0, 4)].id
                }
            }
           
            leagueM();
           
            return {
                all: re, //所有赛事
                h: h, //高中奖率
                l: l, //5大联赛
                length: re.length
            };

            function checkTime(h) {
                var d = new Date();
                d.setHours(h.substring(0,2), h.substring(2,4), 0, 0)
                var m = d.getTime()
                var nm = m - 900000; //截止时间15分钟的时候不能投注
                var d2 = new Date()
                d2.setTime(nm);
                var t = d2.getHours() + ":" + d2.getMinutes()
                return t;
            }
        }
    }
	

    return {
       jc:jc
    }
});
