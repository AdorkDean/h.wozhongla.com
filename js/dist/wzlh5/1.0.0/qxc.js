/**
 * Created by hebo (razr409355439@gmail.com)on 15/1/7.
 */

define("wzlh5/1.0.0/qxc",["jquery/2.1.1/jquery","wzlh5/1.0.0/ac","handlebars/1.3.0/dist/cjs/handlebars",'wzlh5/1.0.0/until',"wzlh5/1.0.0/cp","wzlh5/1.0.0/ui"],function (require, exports, module) {
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

    var Router = until.Router;


        var routes = {
            "/car": function() {
                qxccar();
            },
            "/dg":function(){
                index();
            },
            "index": function() {
                index()
            },
            "init": function() {
                init();
            }
        }
        Router(routes);

        var QXC_CAR = [],
        //投注倍数
            QXC_BEI = 1,
        //投注期次
            QXC_QI = 1,
        //是否追加
            QXC_ZJ = false,
        //中奖是否停止追加
            QXC_ZJSTOP = false,
            QXC_NOWQI = null,
            CACHE_ID = 0,
            PlayTypeRule = cp.PlayTypeRule,
            CPCONFIG = cp.CONFIG,
            stop_control = true;
        function init() {

            $('.wzl-nav-dropdown').click(function() {

                $("#wzl-dropdown a").click(function(){
                    /*var  h = $(this).prop("href")
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
                     return false;*/
                })
            })
//          $.wzlmore(function(d) {
//              $('.' + $(d).attr('class')).on('click', function() {
//              })
//          });
			$('.navbar-header').on('click','.icon-more',function(){
                	
                	$('.drop-down-more').toggle();
            })
            $.wzlhistory("qxc", function(d) {
                QXC_NOWQI = d.issue
            });

            $(".jc-match-i").on("click", function() {
                $("#selectjc,#jc-match").slideToggle();
            })
            //请求 userinfo 用于同步
            action.queryUserInfo({},function(){})

            //渲染遗漏
            action.yl('qxc',{},function (re){
                if(re.resultCode=='200'){
                    fomatYl(re.data);
                }else{

                }

            })

            function fomatYl(d){
                var allArr=d.split(",");

                for (i=8;i<=17;i++){
                    $('#yla em').eq(i-8).text(allArr[i])
                }

                for (i=18;i<=27;i++){
                    $('#ylb em').eq(i-18).text(allArr[i])
                }

                for (i=28;i<=37;i++){
                    $('#ylc em').eq(i-28).text(allArr[i])
                }

                for (i=38;i<=47;i++){
                    $('#yld em').eq(i-38).text(allArr[i])
                }

                for (i=48;i<=57;i++){
                    $('#yle em').eq(i-48).text(allArr[i])
                }

                for (i=58;i<=67;i++){
                    $('#ylf em').eq(i-58).text(allArr[i])
                }

                for (i=68;i<=77;i++){
                    $('#ylj em').eq(i-68).text(allArr[i])
                }

            }

            $('.ballcon-yilou').on('click', function (){
                $('.ballcon-right em').toggle()
            })

            //查询是否停售
            action.getControl(function(re){
                if(re[110]===false){
                    stop_control=false
                    dialog("该彩种已经停售!")
                }
            })
        }


        function qxcNumberSelect(containerId, total, before, multipleSelect) {
            return cp.numberSelect({
                min: 0,
                max: 9,
                ispad: false,
                numberSelectBefore: function(f) {
                    before && before(f);
                },
                numberSelectAfter: function(f) {
                    total()
                },
                numberUnSelectAfter: function(f) {
                    total()
                },
                //dom 类
                selectStyle: ".red_balls",
                //
                containerId: containerId,
                multipleSelect: !multipleSelect
            })
        }
        function index(){
            $('#f3dcar,#carfixed').fadeOut(function() {
                $(".wzl-cartext").addClass("hidden")
                $(".wzl-nav-dropdown").show();
                $('#selectqxc').fadeIn();
            });
            var qxc_1 = qxcNumberSelect("#selectqxc .qxc-1", total, function() {});
            var qxc_2 = qxcNumberSelect("#selectqxc .qxc-2", total, function() {});
            var qxc_3 = qxcNumberSelect("#selectqxc .qxc-3", total, function() {});
            var qxc_4 = qxcNumberSelect("#selectqxc .qxc-4", total, function() {});
            var qxc_5 = qxcNumberSelect("#selectqxc .qxc-5", total, function() {});
            var qxc_6 = qxcNumberSelect("#selectqxc .qxc-6", total, function() {});
            var qxc_7 = qxcNumberSelect("#selectqxc .qxc-7", total, function() {});
            function total(){
                var pl5c = countPl5()
                if (pl5c != false) {
                    var count = PlayTypeRule.count(pl5c)
                    var price = count * CPCONFIG.QXC.UNIT_PRICE;
                    $(".ball-status-bar").removeClass("disabled").html("共" + count + "注," + price + "元")
                } else {
                    $(".ball-status-bar").addClass("disabled").html("添加购物车")
                }
            }
            $(".ball-status-bar").unbind().bind('click', function() {
                var qxcc = countPl5();
                if (qxcc !== false) {
                    var count = PlayTypeRule.count(qxcc)
                    var price = count * CPCONFIG.QXC.UNIT_PRICE;
                    if(price>=CPCONFIG.QXC.MAX_AMOUNT){
                        dialog("单注投注不能超过"+CPCONFIG.QXC.MAX_AMOUNT+"元")
                        return false;
                    }
                    qxcc.QXC_ID = ++CACHE_ID
                    QXC_CAR.push(qxcc);
                    qxc_1.clear();
                    qxc_2.clear();
                    qxc_3.clear();
                    qxc_4.clear();
                    qxc_5.clear();
                    qxc_6.clear();
                    qxc_7.clear();
		 
                   // localStorage.setItem("QXC_CAR",JSON.stringify(QXC_CAR));
                    location.href = "#!/car"
                } else {
                    dialog("每位至少选择"+"<span class='wzl-text-warning'>1</span>"+"个号码")
                }
            });
            function countPl5(){
                var qxc1 = qxc_1.getSelected(),
                    qxc2 = qxc_2.getSelected(),
                    qxc3 = qxc_3.getSelected(),
                    qxc4 = qxc_4.getSelected(),
                    qxc5 = qxc_5.getSelected(),
                    qxc6 = qxc_6.getSelected(),
                    qxc7 = qxc_7.getSelected();
                var dsType = PlayTypeRule['qxc_ds'];
                if (!qxc1 || !qxc1.length || !qxc2 || !qxc2.length || !qxc3 || !qxc3.length ||
                    !qxc4 || !qxc4.length || !qxc5 || !qxc5.length||!qxc6 || !qxc6.length||!qxc7 || !qxc7.length) {
                    return false;
                }
                var type = 'qxc_fs';
                //如果长度吻合 单式
                if (qxc1.length == dsType.groupdef[0].required && qxc2.length == dsType.groupdef[1].required && qxc3.length == dsType.groupdef[2].required &&
                    qxc4.length == dsType.groupdef[3].required && qxc5.length == dsType.groupdef[4].required && qxc6.length == dsType.groupdef[5].required && qxc7.length == dsType.groupdef[6].required) {
                    type = "qxc_ds";
                }
                var groups = [{
                    dan: null,
                    tuo: qxc1
                }, {
                    dan: null,
                    tuo: qxc2
                }, {
                    dan: null,
                    tuo: qxc3
                }, {
                    dan: null,
                    tuo: qxc4
                }, {
                    dan: null,
                    tuo: qxc5
                }, {
                    dan: null,
                    tuo: qxc6
                }, {
                    dan: null,
                    tuo: qxc7
                }];
                return {
                    code: type,
                    groups: groups
                }
            }
            Y_Y(function() {

                qxc_1.clear()
                qxc_2.clear()
                qxc_3.clear()
                qxc_4.clear()
                qxc_5.clear()
                qxc_6.clear()
                qxc_7.clear()
                var n1 = cp.shuffle({
                    min: 0,
                    max: 9,
                    count: 1
                })
                qxc_1.clear().select(n1)
                var n1 = cp.shuffle({
                    min: 0,
                    max: 9,
                    count: 1
                })
                qxc_2.clear().select(n1)
                var n1 = cp.shuffle({
                    min: 0,
                    max: 9,
                    count: 1
                })
                qxc_3.clear().select(n1)
                var n1 = cp.shuffle({
                    min: 0,
                    max: 9,
                    count: 1
                })
                qxc_4.clear().select(n1)
                var n1 = cp.shuffle({
                    min: 0,
                    max: 9,
                    count: 1
                })
                qxc_5.clear().select(n1)
                var n1 = cp.shuffle({
                    min: 0,
                    max: 9,
                    count: 1
                })
                qxc_6.clear().select(n1)
                var n1 = cp.shuffle({
                    min: 0,
                    max: 9,
                    count: 1
                })
                qxc_7.clear().select(n1)
            })
            $(".glyphicon.icon-trash").on("click", function() {
                qxc_1.clear();
                qxc_2.clear();
                qxc_3.clear();
                qxc_4.clear();
                qxc_5.clear();
                qxc_6.clear();
                qxc_7.clear();
                total();
            })
        }

        function qxccar(){
            $('#selectqxc').fadeOut(function() {
                $('.wzl-nav-dropdown,#f3d-history').hide();
                $(".wzl-cartext").removeClass("hidden")
                $('#f3dcar, #carfixed').fadeIn();
                renderCar();
            });
            function countCar(){
                var r = [],
                    car_count = 0,
                    car_price = 0,
                    total;
		//var QXC_CAR = JSON.parse(localStorage.getItem("QXC_CAR"))||QXC_CAR;
		console.log(QXC_CAR)
                for (var i = 0; i < QXC_CAR.length; i++) {
                    var ritem = {}
                    ritem.count = PlayTypeRule.count(QXC_CAR[i]);
                    ritem.price = ritem.count * CPCONFIG['QXC'].UNIT_PRICE;
                    ritem.type = type(QXC_CAR[i].code)
                    ritem.code = (QXC_CAR[i].code)
                    ritem.id = QXC_CAR[i].QXC_ID
                    car_count += ritem.count
                    car_price += ritem.price
                    //全部是 红球字符串
                    ritem.redStr = strBtype(QXC_CAR[i].code, QXC_CAR[i])
                    ritem._redStr = strBtype(QXC_CAR[i].code, QXC_CAR[i], true)
                    r.push(ritem)
                }

                function strBtype(type, item, notext) {
                    var s = '',
                        _s = "";
                    s += item.groups[0].tuo.join(" ") + ","
                    s += item.groups[1].tuo.join(" ") + ","
                    s += item.groups[2].tuo.join(" ") + ","
                    s += item.groups[3].tuo.join(" ") + ","
                    s += item.groups[4].tuo.join(" ") + ","
                    s += item.groups[5].tuo.join(" ") + ","
                    s += item.groups[6].tuo.join(" ")
                    _s += item.groups[0].tuo.join(" ") + ","
                    _s += item.groups[1].tuo.join(" ") + ","
                    _s += item.groups[2].tuo.join(" ") + ","
                    _s += item.groups[3].tuo.join(" ") + ","
                    _s += item.groups[4].tuo.join(" ") + ","
                    _s += item.groups[5].tuo.join(" ") + ","
                    _s += item.groups[6].tuo.join(" ")

                    return notext ? _s : s;
                }

                function type(t) {
                    var r = '';
                    switch (t) {
                        case "qxc_fs":
                            r = "复式";
                            break;
                        case "qxc_ds":
                            r = "单式";
                            break;
                    }
                    return r;
                }

                function remove(id) {
                    for (var j = 0; j < QXC_CAR.length; j++) {
                        if (QXC_CAR[j].QXC_ID == id) {
                            QXC_CAR.splice(j, 1)
                        }
                    }
                }

                function clear() {
                    QXC_CAR = [],
                        QXC_BEI = 1,
                        QXC_QI = 1,
                        QXC_ZJ = false,
                        QXC_ZJSTOP = false;
                }
		 var money = localStorage.getItem("money");
console.log(money)
 		var b = (car_price * QXC_QI * QXC_BEI);
console.log(b)
		var fff =  (money-b)/2;
		var ff = fff.toString();
		var f =  ff.indexOf("-");
		if(f==0){
		       fff = 0;
		}else{
		       fff = fff;
		}
                total = {
                    bei: QXC_BEI,
                    qi: QXC_QI,
                    count: car_count,
                    price: car_price * QXC_QI * QXC_BEI,
		  money: fff,
                    zjstop: QXC_ZJSTOP,
                    zj: QXC_ZJ
                }
                return {
                    list: r,
                    count: car_count,
                    price: car_price,
                    clear: clear,
                    remove: remove,
                    total: total
                };
            }
            function renderCar(){
		//||localStorage.getItem("QXC_CAR")
                if (QXC_CAR.length) {
                    $("#car-no-select").addClass('hidden')
                    var result = countCar();
                    var listTemplate = Handlebars.compile($("#ball-select-item").html());
                    $("#ball-select-group").html(listTemplate({
                        list: result.list
                    }));

                    var totalTemplate = Handlebars.compile($("#car-total-template").html());
                    $('#car-total').html(totalTemplate(result.total))
		  //判断二维码是否使用，如果使用隐藏下面提示
	      	localStorage.getItem("bottomBox")==1?$("#oBalance").hide():'';
                    $('#f3dcar .ball-select-remove').unbind().bind('click', function() {
                        var $id = $(this).parent().data("id");
                        result.remove($id)
                        renderCar();
                    })
                    $("#ssq_hm").unbind().bind("click", function() {
                        dialog('合买暂未开放！')
                    });
                    $('#ssq_buy').unbind().bind("click", function() {
                        $(this).attr("disabled")
                        //发送购买请求
                        postBuy(function(re) {
                            if (re.resultCode == "200") {
                                result.clear();
                                renderCar()
                                tzsuccess();
                            }
                        });
                    })
                } else {
                    $("#ball-select-group").html('')
                    $("#car-no-select").removeClass('hidden')
                    var result = countCar();
                    var totalTemplate = Handlebars.compile($("#car-total-template").html());
                    $('#car-total').html(totalTemplate(result.total))
                    $("#ssq_buy").addClass("disabled")
                }
                totalBoard(function(qi, bei, zjstop) {
                    QXC_BEI = bei;
                    QXC_QI = qi;
                    QXC_ZJSTOP = zjstop;
                    renderCar();
                })
            }
            //统计面板事件 （期次 倍数 是否追号 等
            function totalBoard(fn) {
                var $qiInput = $("#ball-qc");
                var $beiInput = $("#ball-bei");
                var $zjInput = $('input#ball-zj');
                var $zjstopInput = $('input#ball-zjstop');
                var bei = $beiInput.val().trim(),
                    qi = $qiInput.val().trim(),
                    zj = $zjInput.prop('checked'),
                    zjstop = $zjstopInput.prop('checked');
                $(".buy-bar-qcminus").unbind().bind('click', function() {
                    qi--;
                    qi = qi < 1 ? 1 : qi;
                    syanc();
                })
                //期次加
                $(".buy-bar-qcplus").unbind().bind('click', function() {
                    qi++;
                    qi = qi > 99 ? 99 : qi;
                    syanc();
                })
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
                $($qiInput).unbind().bind("keyup", function() {
                    var $val = $($qiInput).val();
                    $val = $val.replace(/\D/g, "")
                    $val = $val > 99 ? 99 : $val;
                    if($val<1) $val=1;
                    $(this).val($val)
                    qi = Number($val);
                    syanc();
                })
                $($beiInput).unbind().bind('keyup', function() {
                    var $val = $($beiInput).val();
                    $val = $val.replace(/\D/g, "")
                    $val = $val > 9999 ? 9999 : $val;
                    if($val<1) $val=1;
                    $(this).val($val)
                    bei = Number($val);
                    syanc();
                })
                $('input#ball-zjstop').unbind().bind('click', function() {
                    var $checked = $(this).prop('checked')
                    zjstop = $checked;
                    syanc();
                })
                $('input#ball-zj').unbind().bind('click', function() {
                    var $checked = $(this).prop('checked')
                    zj = $checked
                    syanc();
                })

                function syanc() {
                    setTimeout(function() {
                        $qiInput.val(qi)
                        $beiInput.val(bei)
                        fn && fn(qi, bei, zjstop)
                    }, 100)
                }
            }
            //增加机选一注
            function getOneQXC() {
                var qxc_1 = cp.shuffle({
                    min: 0,
                    max: 9,
                    count: 1
                })
                var qxc_2 = cp.shuffle({
                    min: 0,
                    max: 9,
                    count: 1
                })
                var qxc_3 = cp.shuffle({
                    min: 0,
                    max: 9,
                    count: 1
                })
                var qxc_4 = cp.shuffle({
                    min: 0,
                    max: 9,
                    count: 1
                })
                var qxc_5 = cp.shuffle({
                    min: 0,
                    max: 9,
                    padding: false,
                    count: 1
                })
                var qxc_6 = cp.shuffle({
                    min: 0,
                    max: 9,
                    padding: false,
                    count: 1
                })
                var qxc_7 = cp.shuffle({
                    min: 0,
                    max: 9,
                    padding: false,
                    count: 1
                })
                var QXCc = {
                    code: 'qxc_ds',
                    groups: [{
                        dan: null,
                        tuo: qxc_1
                    }, {
                        dan: null,
                        tuo: qxc_2
                    }, {
                        dan: null,
                        tuo: qxc_3
                    }, {
                        dan: null,
                        tuo: qxc_4
                    }, {
                        dan: null,
                        tuo: qxc_5
                    }, {
                        dan: null,
                        tuo: qxc_6
                    }, {
                        dan: null,
                        tuo: qxc_7
                    }]
                }
                QXCc.QXC_ID = ++CACHE_ID
                return QXCc;
            }
            $('#car-addhm').bind('click', function() {
                //选择玩法后如果记录是显示的让他隐藏
                $('.history-list').hide();
                location.href = "#!/dg";
            })
            $("#car-addjx").unbind().bind('click', function() {
                var QXCc = getOneQXC();
                QXC_CAR.push(QXCc)
                renderCar();
            })
            $(".glyphicon.icon-trash").on("click", function() {
                var s = countCar();
                s.clear();
                renderCar();
            })

            function tzsuccess() {
                $("#car,#pl5plays,#carfixed,#f3dcar,#buycarfixedbtn").hide();
                $("#tzsuccess").show();
            }
            /**
             * 用户购买数据整合
             * @returns {*}
             */
            function userBuyData() {
                var sscCar = countCar()
                if (!sscCar) return null;
                var d = {
                    gameType: "110",
                    format: "ajax",
                    //需要支付金额
                    needPay: "",
                    //投注串
                    lotoGson: {}
                }
                //需要支付
                d.needPay = sscCar.total.price;
                //
                d.lotoGson = mergeTZ();
                console.log(d.lotoGson)
                /**
                 * 投注串 数据整合
                 */
                function mergeTZ() {
                    if (!sscCar) return false;
                    var need = {
                        //彩票类型
                        //gameType: "110",
                        //中奖是否停止 0、1
                        //isStop: "",
                        //投注类型 0 代购 1 追号 2 合买
                        //buyType: "0",
                        //票信息数组
                        //buyNumberArray: "",
                        //期次信息数组
                        //issueArray: [],
                        //方案标题
                        //title: "0",
                        //方案描述
                        //explain: "0",
                        //是否保密 1 公开 2相对保密 3完全保密
                        //secrecy: "1",
                        //是否上传方案 1 是  其他否  2是胜负彩过滤投注
                        //isUp:"0",
                        //splitAmount: "0",
                        //是否先发方案标识  0 常规合买  1 先发方案再上传号
                        //isUpload: "0",
                        //关联ID
                        //projectid: "0",
                        //buyAmount: 0,
                        //floorsAmount: "0",
                        //标识是否为竞彩专业版订单 0不是 1 是
                        //ishigh:"0",
                        //totalSum: "0",
                        //竞彩混合过关去除单一玩法
                        //qcdy: "0",
                        //多彩中和精彩混合过关联合id
                        //unoid: "0",
                        //中将佣金  0-10
                        //commision: "0",
                        //佣金类型  null 0 老佣金   1 新佣金
                        //commisiontype: "0"
                    	//二维码加密码
                        	qrCode: '',
                        	//是否购买二维码
                        	qrType: '',
                        	//哪里投注
                        	source: '6',
                            //彩票类型
                            lotoid: "110",
                            //中奖是否停止 0、1
                            winStop: "",
                            //投注类型 0 代购 1 追号 2 合买
                            bettype: "0",
                            //票信息数组
                            bet: "",
                            //期次信息数组
                            issue: [],
                            amount: "0"  
                    }
                    need.qrCode = getQrCode();//二维码加密
                    need.qrType = getQrType();//是否购买二维码
                    need.amount = Number(sscCar.total.price)
                    need.winStop = sscCar.total.zjstop ? 1 : 0;
                    need.bet = buyArrayGenerator(sscCar.list)
                    need.bettype = sscCar.total.qi > 1 ? 1 : 0;
                    //need.title = sscCar.total.qi > 1 ? "七星彩" + QXC_NOWQI + "期追号方案" : "七星彩" + QXC_NOWQI + "期追号方案";
                    // xian ajax =
                    return need;
                }
                //是否购买二微码qrType
                    function getQrCode(){
                    	return localStorage.getItem("qrCode")
                    }
                    
                    function getQrType(){
                    	return localStorage.getItem("qrType")
                    }
                //投注号码串数据
                function buyArrayGenerator(list) {
                    var r = [];
                    $(list).each(function(index, item) {
                        if (!item) return;
                        var it = join(item);
                        it && r.push(it);
                    })

                    function join(item) {
                        var dataTmp = {
                            "detail": "",
                            "typeId": "00",
                            "seleId": "01",
                            "multiple":1
                        };
                        if (!item || !item.count) return false;
                        var rs = item._redStr
                        dataTmp.detail = rs;
                        //dataTmp.sum = item.price;
                        //dataTmp.num = item.count;
                        //dataTmp.multiple = sscCar.total.bei;
                        switch (item.code) {
                            case "qxc_fs":
                                dataTmp.typeId = "00"
                                dataTmp.seleId = "02"
                                break;
                            case "qxc_ds":
                                dataTmp.typeId = "00"
                                dataTmp.seleId = "01"
                                break;
                        }
                        return dataTmp;
                    }
                    return r;
                }
                //整合期次信息
                function getIssues(fn) {
                    var r = []; //
                    action.getIssue({
                        lottery: "QXC",
                        issues: sscCar.total.qi || QXC_QI
                    }, function(re) {
                        r = merge(re)
                        fn(r)
                    })

                    function merge(list) {
                        var r = [];
                        $(list).each(function(index, item) {
                            if (item.issue >= QXC_NOWQI && r.length < QXC_QI) {
                                r.push({
                                    issue: item.issue,
                                    multiple: sscCar.total.bei
                                })
                            }
                        })
                        return r;
                    }
                }
                return {
                    d: d,
                    getIssue: getIssues
                };
            }

            function postBuy(fn) {
                var u = userBuyData();
                if (stop_control == false) return dialog("该彩种已经停售！");
                if (u == false) return dialog("购物车是空的！");
                var udata = u.d;
                //dialog("loading", "正在投注！")
                u.getIssue(function(r) {
                    if (!r || !r.length) return dialog({
                        message: "投注异常，请重试",
                        autoHideDelay: 1000})
                    udata.lotoGson.issue = r;
                    udata.lotoGson = JSON.stringify(udata.lotoGson)
					
                    action.pl3Tz(udata.lotoGson, function(re) {
                    	console.log(re)
                        TZ_INFO(re, fn)
		      //$("#oBalance").hide();
		     // localStorage.setItem("bottomBox",1)
                        if(re.status==5011||re.status==5012){
                        	$('.wzl-ui-dialog-operation div:eq(0)').unbind().bind("click", function() {
                    			localStorage.setItem('qrType',0)
		                        $(this).attr("disabled")
		                        
		                    })
                        	$('.wzl-ui-dialog-operation div:eq(1)').unbind().bind("click", function() {
                    			localStorage.setItem('qrType',0)
		                        $(this).attr("disabled")
		                        //发送购买请求
		                        
		                        postBuy(function(re) {
		                 
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
		                        postBuy(function(re) {
		                 
		                            if (re.resultCode == "200") {
		                            	
		                                result.clear();
		                                renderCar()
		                                tzsuccess();
		                            }
		                        });
		                    })
                        }
                    })
                })
            }
        }




});