/**
 * Created by hebo (razr409355439@gmail.com)on 15/1/7.
 */

define("wzlh5/1.0.0/dlt",["jquery/2.1.1/jquery","wzlh5/1.0.0/ac","handlebars/1.3.0/dist/cjs/handlebars",'wzlh5/1.0.0/until',"wzlh5/1.0.0/cp","wzlh5/1.0.0/ui"],function (require, exports, module) {
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


        //购物车数据 全局通用
        var DLT_CAR = [],
        //投注倍数
            DLT_BEI = 1,
        //投注期次
            DLT_QI = 1,
        //是否追加
            DLT_ZJ = false,
        //中奖是否停止追加
            DLT_ZJSTOP = false,
            CACHE_ID = 0,
            DLT_NOWQI = null,
            PlayTypeRule = cp.PlayTypeRule,
            CPCONFIG = cp.CONFIG,
            u_type = "dg",
            stop_control = true;
        var routes = {
            "/dt": function() {
                dltdt();
            },
            "/dg": function() {
                dltdg();
            },
            "/car": function() {
                dltcar();
            },
            "index": function() {
                dltdg();
            },
            "init": function() {
                //////////////////////console.log("init")
                init();
            }
        }
        Router(routes);

        function init() {
            //历史开奖期次数据
            $.wzlhistory("dlt", function(d) {
                DLT_NOWQI = d.issue
            })
            $('.wzl-nav-dropdown').click(function() {
                dropdownMask.toggle();
            })
//          $.wzlmore(function(d) {
//              ////////////////////////console.log(d);
//              $('.' + $(d).attr('class')).on('click', function() {
//                  //////alert($(this).html())
//              })
//          });
			$('.navbar-header').on('click','.icon-more',function(){
                	
                	$('.drop-down-more').toggle();
            })
            //请求 userinfo 用于同步
            action.queryUserInfo({},function(){})
            //查询是否停售
            action.getControl(function(re){
                if(re[113]===false){
                    stop_control=false
                    dialog("该彩种已经停售!")
                }
            })
        }

        function dltcar() {
            $('#selectdlt,#dlt-fixed').fadeOut(function() {
                $('.wzl-nav-dropdown').hide();
                $(".wzl-cartext").removeClass("hidden")
                $('#car,#carfixed').fadeIn()
                renderCar();
            })

            function renderCar() {
                if (DLT_CAR.length) {
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
                    $("#car").delegate('.ball-select-remove', 'click', function() {
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
                                renderCar();
                                tzsuccess();
                            }
                        });
                    })
                    $("#ball-select-group  .ball-select-remove").unbind().bind("click", function() {
                        var $id = $(this).parent().data("id");
                        result.remove($id)
                        renderCar();
                    })
                } else {
                    $("#ball-select-group").html('')
                    $("#car-no-select").removeClass('hidden')
                    var result = countCar();
                    var totalTemplate = Handlebars.compile($("#car-total-template").html());
                    $('#car-total').html(totalTemplate(result.total))
                    $("#ssq_buy").addClass("disabled")
                }
                totalBoard(function(qi, bei, zj, zjstop) {
                	//console.log(zj)
                    DLT_BEI = bei;
                    DLT_QI = qi;
                    DLT_ZJ = zj;
                    DLT_ZJSTOP = zjstop;
                    renderCar();
                })
            }

            function countCar() {
                var r = [],
                    car_count = 0,
                    car_price = 0,
                    total,
                    UNIT_PRICE = CPCONFIG['DLT'].UNIT_PRICE;
                if (DLT_ZJ) {UNIT_PRICE = 3;}
                for (var i = 0; i < DLT_CAR.length; i++) {
                    var ritem = {}
                    ritem.count = PlayTypeRule.count(DLT_CAR[i]);
                    ritem.price = ritem.count * UNIT_PRICE;
                    ritem.redStr = type2Str(DLT_CAR[i].code, "r", DLT_CAR[i].groups)
                    ritem.blueStr = type2Str(DLT_CAR[i].code, "b", DLT_CAR[i].groups)
                    ritem.type = type(DLT_CAR[i].code)
                    ritem.code = (DLT_CAR[i].code)
                    ritem.id = DLT_CAR[i].DLT_ID
                    car_count += ritem.count
                    car_price += ritem.price
                    r.push(ritem)
                }

                function type2Str(t, redOrBlue, g) {
                    var s = '',
                        s1 = '';
                    if (t == "dlt_dt") {
                        s = DLT_CAR[i].groups[0].dan.join(" ") + "@" + DLT_CAR[i].groups[0].tuo.join(" ")
                        s1 = DLT_CAR[i].groups[1].dan.join(" ") + "@" + DLT_CAR[i].groups[1].tuo.join(" ")
                    }
                    if (t == "dlt_ds") {
                        s = DLT_CAR[i].groups[0].tuo.join(" ")
                        s1 = DLT_CAR[i].groups[1].tuo.join(" ")
                    }
                    if (t == "dlt_fs") {
                        s = DLT_CAR[i].groups[0].tuo.join(" ")
                        s1 = DLT_CAR[i].groups[1].tuo.join(" ")
                    }
                    return redOrBlue == "r" ? s : s1;
                }

                function type(t) {
                    var r = '';
                    switch (t) {
                        case "dlt_ds":
                            r = "单式投注";
                            break;
                        case "dlt_fs":
                            r = "复式投注";
                            break;
                        case "dlt_dt":
                            r = "胆拖投注";
                            break;
                    }
                    return r;
                }

                function remove(id) {
                    for (var j = 0; j < DLT_CAR.length; j++) {
                        if (DLT_CAR[j].DLT_ID == id) {
                            DLT_CAR.splice(j, 1)
                        }
                    }
                }
                 /*新加二维码显示*/
					var money = localStorage.getItem("money");
			 		var b = (car_price * DLT_QI * DLT_BEI);
					var fff =  (money-b)/2;
					var ff = fff.toString();
					var f =  ff.indexOf("-");
					if(f==0){
					       fff = 0;
					}else{
					       fff = fff;
					}
					console.log(0)
					 /*新加二维码显示*/
                total = {
                    bei: DLT_BEI,
                    qi: DLT_QI,
                    count: car_count,
                    price: car_price * DLT_QI * DLT_BEI,
                    money: fff,
                    zjstop: DLT_ZJSTOP,
                    zj: DLT_ZJ
                }

                function clear() {
                    DLT_CAR = [],
                        DLT_BEI = 1,
                        DLT_QI = 1,
                        DLT_ZJ = false,
                        DLT_ZJSTOP = false;
                        localStorage.setItem("DLT_CAR",JSON.stringify(DLT_CAR));
                        
                }
                return {
                    list: r,
                    count: car_count,
                    price: car_price,
                    remove: remove,
                    clear: clear,
                    total: total
                };
            }
            //统计面板事件 （期次 倍数 是否追号 等
            
            function totalBoard(fn) {
                var $qiInput = $("#ball-qc");
                var $beiInput = $("#ball-bei");
               var $zjInput = $('input#ball-zj');
               var $zjstopInput = $('input#ball-zjstop');
                var bei = $beiInput.val().trim(),
                    qi = $qiInput.val().trim();
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
                $('input#ball-zjstop').change(function(event){ 
                   event.stopPropagation();
                   var $checked = $(this).prop('checked');
                        zjstop = $checked;
                    syanc();
                })
               	$('input#ball-zj').change(function(event) {
               		event.stopPropagation();
                    var $checked = $(this).prop('checked');
                        zj = $checked
					syanc();
                  
            	})

                function syanc() {
                    setTimeout(function() {
                        $qiInput.val(qi)
                        $beiInput.val(bei)
                        //console.log(zjstop)
                        fn && fn(qi, bei,zj, zjstop)
                    }, 100)
                }
            }
            //增加机选一注
            function getOneDLT() {
                var redNumber = cp.shuffle({
                    min: 1,
                    max: 32,
                    padding: 1,
                    count: CPCONFIG.DLT.RED_MIN ,
                    sort:true
                })
                var blueNumber = cp.shuffle({
                    min: 1,
                    max: 12,
                    padding: 1,
                    count: CPCONFIG.DLT.BLUE_MIN,
                    sort:true
                })
                //随机红胆码个数
                var sn = [1, 2, 3, 4],
                    srd = sn.sort(function() {
                        return Math.random() - 0.5 > 0;
                    }),
                    srt = 7;
                //红拖码
                var redTNumber = cp.shuffle({
                    min: 1,
                    max: 32,
                    padding: 1,
                    count: srd[0] ,
                    sort:true
                })
                //红胆码
                var redDNumber = cp.shuffle({
                    pool: uniqe(redTNumber),
                    min: 1,
                    max: 32,
                    padding: 1,
                    count: srt - srd[0] ,
                    sort:true
                })
                var blueTNumber = cp.shuffle({
                    pool: uniqe(blueNumber),
                    min: 1,
                    max: 12,
                    padding: 2,
                    count: CPCONFIG.DLT.BLUE_MIN ,
                    sort:true
                })
                var dlt = {
                    code: 'dlt_ds',
                    groups: [{
                        dan: null,
                        tuo: redNumber
                    }, {
                        dan: null,
                        tuo: blueNumber
                    }]
                }

                dlt.DLT_ID = ++CACHE_ID
                return dlt;

                function uniqe(arr) {
                    var r = [],
                        f = 1;
                    for (var n = 1; n <= 32; n++) {
                        r.push(n)
                    }
                    arr.sort(function(n1, n2) {
                        var s1 = parseInt(n1, 10)
                        var s2 = parseInt(n2, 10)
                        return s1 - s2;
                    })
                    for (var i = 0; i < arr.length; i++) {
                        var s = parseInt(arr[i], 10)
                        if (r.splice(s - f, 1)) {
                            f++;
                        }
                    }
                    return r;
                }
            }
            $('#car-addhm').bind('click', function() {
                location.href = "#!/dg"
            })
            $('#car-addjx').unbind().bind('click', function() {
                var dlt = getOneDLT();
                //console.log(dlt);
                DLT_CAR.push(dlt)
                renderCar();
            })
            $(".glyphicon.icon-trash").unbind().bind("click", function() {
                var s = countCar();
                s.clear();
                renderCar()
            })
            /*投注成功*/
            function tzsuccess() {
                $("#car,#selectdlt,#carfixed").hide();
                $("#tzsuccess").show();
            }
            /**
             * 用户购买数据整合
             * @returns {*}
             */
            function userBuyData() {
                var dltCar = countCar()
                if (!dltCar) return null;
                var d = {
                    gameType: "113",
                    format: "ajax",
                    //需要支付金额
                    needPay: "",
                    lotoGson: {}
                }
                //需要支付
                d.needPay = dltCar.total.price;
                //
                d.lotoGson = mergeTZ();
                console.log(d.lotoGson)
                /**
                 * 投注串 数据整合
                 */
                //console.log(d.lotoGson);
                function mergeTZ() {
                    if (!dltCar) return false;
                    var need = {
                    		
                    		//二维码加密码
                        	qrCode: '',
                        	//是否购买二微码
                        	qrType: "",
                            //彩票类型
                            lotoid: "113",
                            //投注来源
                            source: '6',
                            //中奖是否停止 0、1
                            winStop: "",
                            //投注类型 0 代购 1 追号 2 合买
                            bettype: "",
                            //票信息数组
                            bet: "",
                            //期次信息数组
                            issue: [],
                            //投注金额
                            amount:"0"
                        //彩票类型
                        //gameType: "113",
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
                    }
                    need.qrCode = getQrCode();//二维码加密
                    need.qrType = getQrType();//是否购买二维码
                    need.amount = Number(dltCar.total.price).toFixed(1);
                    need.winStop = dltCar.total.zjstop ? 1 : 0;
                    need.bet = buyArrayGenerator(dltCar.list)
                    need.bettype = dltCar.total.qi > 1 ? 1 : 0;
                    
                    //need.title = dltCar.total.qi > 1 ? "大乐透" + DLT_NOWQI + "期追号方案" : "大乐透" + DLT_NOWQI + "期追号方案";
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
                            //"sum": 0.0,
                            "multiple": 1
                            //"status": 0,
                           // "num": 0,
                            //"lastMatch": 0,
                            //"hbcls": 0.0
                        };
                        if (!item || !item.count) return false;
                        var rs = item.redStr.split(" ").join(','),
                            bs = item.blueStr.split(" ").join(',')
                        var UNIT_PRICE = 2;
                        if(dltCar.total.zj) UNIT_PRICE=3;
                        dataTmp.detail = rs + "#" + bs;
                        //dataTmp.sum = CPCONFIG.DLT.UNIT_PRICE;
                        //dataTmp.num = item.count;
                        //dataTmp.multiple = dltCar.total.bei;
                        if (dltCar.total.zj) {
                            dataTmp.sum = 3;
                            dataTmp.typeId = "01"
                        }
                        switch (item.code) {
                            case "dlt_ds":
                                dataTmp.seleId = "01"
                                break;
                            case "dlt_fs":
                                dataTmp.seleId = "02"
                                dataTmp.sum = item.count * UNIT_PRICE;
                                break;
                            case "dlt_dt":
                                dataTmp.seleId = "03"
                                dataTmp.sum = item.count * UNIT_PRICE;
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
                        lottery: "DLT",
                        issues: dltCar.total.qi || DLT_QI
                    }, function(re) {
                        //console.log(re);
                        r = merge(re)
                        fn(r)
                    })

                    function merge(list) {
                        var r = [];
                        $(list).each(function(index, item) {
                            r.push({
                                issue: item.issue,
                                multiple: dltCar.total.bei
                            })
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
               // dialog("loading", "正在投注！")
                u.getIssue(function(r) {
                	
                    if (!r || !r.length) return dialog("投注异常，请重试")
                    
                    udata.lotoGson.issue = r;
                    udata.lotoGson = JSON.stringify(udata.lotoGson)
                    
                    action.dltTz(udata.lotoGson, function(re) {
                    	console.log(re)
                        TZ_INFO(re, fn)
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

        function dltdg() {
			console.log(111111)
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            //红球
            var red = cp.numberSelect({
                min: 1,
                max: 35,
                numberSelectAfter: function(f) {
                    total()
                },
                numberUnSelectAfter: function(f) {
                    total();
                },
                //dom 类
                selectStyle: ".red_balls",
                //
                containerId: "#dg"
            });
            //蓝球
            var blue = cp.numberSelect({
                min: 1,
                max: 12,
                numberSelectAfter: function(f) {
                    total()
                },
                numberUnSelectAfter: function(f) {
                    total();
                },
                //dom 类
                selectStyle: ".blue_balls",
                //
                containerId: "#dg"
            });


			if(window.location.href.substr(window.location.href.length-2,window.location.href.length)=='dg'){
                
			}else{
				var conta=window.location.href.split('=');
                var R1=conta[1].split('&');
                var R2=conta[2];
                
                red.clear().select(R1[0].split(','));
                blue.clear().select(R2.split(','));
			}




            $('#dt,#car, #carfixed,#tzsuccess').fadeOut(function() {
                $('.wzl-nav-dropdown').text('大乐透-代购').show();
                $(".wzl-cartext").addClass("hidden");
//              if(window.location.href.length!=67){
//                  $(".red_balls ,.blue_balls").removeClass("active")
//                  $(".ball-status-bar").addClass("disabled").html("至少选择5个红球与2个蓝球")
//              }

                $('#dg, #selectdlt ,#dlt-fixed').fadeIn();
                u_type = "dg"
            })
            //随机 机选球
            $('.redBalls .ballcon-js-n').randombox(function(n) {
                ////////////////////////console.log(n);
               
                var number = cp.shuffle({
                    min: 1,
                    max: 35,
                    count: n
                });
                console.log(number);
                red.clear().select(number);
                $('#ballcon-tips1').text('至少选择'+number.length+'个');


            });
            $('.blueBalls .ballcon-js-n').randombox(function(n) {
                var number = cp.shuffle({
                    min: 1,
                    max: 12,
                    count: n
                })
                blue.clear().select(number);
                $('#ballcon-tips2').text('至少选择'+number.length+'个');
            });



            Y_Y(function() {
                red.clear();
                blue.clear();
                var m=parseInt($('.redBalls .ballcon-js-n').text());
                var f=parseInt($('.blueBalls .ballcon-js-n').text());
                var dnumber = cp.shuffle({
                    min: 1,
                    max: 35,
                    padding: 1,
                    count: m
                })
                red.clear().select(dnumber)
                var btnumber = cp.shuffle({
                    min: 1,
                    max: 12,
                    padding: 1,
                    count: f
                })
                blue.clear().select(btnumber)
            })
            function total() {
                var dlt = countDlt(),
                    count = 0;
                if (dlt !== false) {
                    count = PlayTypeRule.count(dlt)
                    var price = count * CPCONFIG.DLT.UNIT_PRICE;
                    $(".ball-status-bar").removeClass("disabled").html("共" + count + "注," + price + "元")
                } else {
                    $(".ball-status-bar").addClass("disabled").html("至少选择5个红球与2个蓝球")
                }
            }
            function countDlt() {
                var redNumber = red.getSelected();
                var blueNumber = blue.getSelected();
                var DLTREQUIRE = CPCONFIG.DLT;
                var code = "";
                //判断是否达到最低注数要求
                if (redNumber.length < DLTREQUIRE.RED_MIN || blueNumber.length < DLTREQUIRE.BLUE_MIN) {
                    //不够一组球 不予计算
                    return false;
                }
                if (redNumber.length == DLTREQUIRE.RED_MIN && blueNumber.length == DLTREQUIRE.BLUE_MIN) {
                    //那么就是 单式
                    code = 'dlt_ds'
                } else {
                    //那么是复式
                    code = "dlt_fs"
                }
                var groups = [{
                    dan: null,
                    tuo: redNumber
                }, {
                    dan: null,
                    tuo: blueNumber
                }]
                return {
                    code: code,
                    groups: groups
                }
            }
            $(".ball-status-bar").unbind().bind('click', function() {
                var dlt = countDlt();
                
                if (dlt !== false) {
                    var count = PlayTypeRule.count(dlt)
                    var price = count * CPCONFIG.DLT.UNIT_PRICE;
                    if(price>CPCONFIG.DLT.MAX_AMOUNT){
                        dialog("单注投注不能超过"+CPCONFIG.DLT.MAX_AMOUNT+"元")
                        return false;
                    }
                    dlt.DLT_ID = ++CACHE_ID
                    DLT_CAR.push(dlt);
                    red.clear();
                    blue.clear();
                    location.href = "#!/car"
                } else {
                    dialog("请至少选择"+"<span class='wzl-text-warning'>5</span>"+"个红球与"+"<span class='wzl-text-warning'>2</span>"+"个蓝球")
                    return false;
                }
            });
            $(".glyphicon.icon-trash").unbind().bind("click", function() {
                red.clear();
                blue.clear();
                total();
            })
        }
        //胆拖
        function dltdt() {
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            //胆拖规则
            var playType = PlayTypeRule.dlt_dt;
            //前区
            var redD = cp.numberSelect({
                min: 1,
                max: 35,
                numberSelectBefore: function(f) {
                    var len = redD.getSelected().length;
                    if (redT.isSelected(f)) {
                        dialog('已经选择了相同的拖码')
                        return false;
                    }
                    if (redD.isSelected(f)) {
                        return true;
                    }
                    //前区胆码判断
                    if (len == playType.groupdef[0].dan_max) {
                        dialog("前区胆码不能多于" + playType.groupdef[0].dan_max + "个");
                        return false;
                    }
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
                containerId: "#dt .dlt-front-d"
            });
            var redT = cp.numberSelect({
                min: 1,
                max: 35,
                numberSelectBefore: function(f) {
                    var len = redT.getSelected().length;
                    if (redD.isSelected(f)) {
                        dialog('已经选择了相同的胆码')
                        return false;
                    }
                    if (redT.isSelected(f)) {
                        return true;
                    }
                    //前区拖码判断
                    if (len == playType.groupdef[0].tuo_max) {
                        dialog("前区拖码不能多于" + playType.groupdef[0].tuo_max + "个");
                        return false;
                    }
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
                containerId: "#dt .dlt-front-t"
            });
            //后区
            var blueD = cp.numberSelect({
                min: 1,
                max: 12,
                numberSelectBefore: function(f) {
                    var len = blueD.getSelected().length;
                    if (blueD.isSelected(f)) {
                        return true;
                    }
                    if (blueT.isSelected(f)) {
                        dialog("已经选择了相同的拖码")
                        return false;
                    }
                    //////////////////////console.log("blueD: %o", f)

                    if (len == playType.groupdef[1].dan_max) {
                        dialog("后区胆码不能超过" + playType.groupdef[1].dan_max + "个");
                        return false;
                    }
                },
                numberSelectAfter: function(f) {
                    total()
                },
                numberUnSelectAfter: function(f) {
                    total()
                },
                //dom 类
                selectStyle: ".blue_balls",
                //
                containerId: "#dt .dlt-back-d"
            });
            var blueT = cp.numberSelect({
                min: 1,
                max: 12,
                numberSelectBefore: function(f) {
                    var len = blueT.getSelected().length;
                    if (blueT.isSelected(f)) {
                        return true;
                    }
                    if (blueD.isSelected(f)) {
                        dialog("已经选择了相同的胆码")
                        return false;
                    }

                    //
                    if (len == playType.groupdef[1].tuo_max) {
                        dialog("后区拖码不能超过" + playType.groupdef[1].tuo_max + "个");
                        return false;
                    }
                },
                numberSelectAfter: function(f) {
                    total()
                },
                numberUnSelectAfter: function(f) {
                    total()
                },
                //dom 类
                selectStyle: ".blue_balls",
                //
                containerId: "#dt .dlt-back-t"
            });
            $('#dg,#car,#carfixed,#tzsuccess').fadeOut(function() {
                $('.wzl-nav-dropdown').text('大乐透-胆拖').show();
                $(".wzl-cartext").addClass("hidden")
                $(".red_balls ,.blue_balls").removeClass("active")
                $(".ball-status-bar").addClass("disabled").html("至少选择6个红球与3个蓝球")
                $('#dt, #selectdlt,#dlt-fixed').fadeIn()
                u_type = "dt"
                redD.clear();
                redT.clear();
            })

            function total() {
                var dltdt = countDLTDT();
                if (dltdt != false) {
                    var count = PlayTypeRule.count(dltdt);
                    //////////////////console.log(count)
                    var price = count * CPCONFIG.SSQ.UNIT_PRICE;
                    $(".ball-status-bar").removeClass("disabled").html("共" + count + "注," + price + "元")
                } else {
                    $(".ball-status-bar").addClass("disabled").html("至少选择6个红球与3个蓝球")
                }
            }

            function countDLTDT() {
                var redDNumber = redD.getSelected(),
                    redTNumber = redT.getSelected(),
                    blueDNumber = blueD.getSelected(),
                    blueTNumber = blueT.getSelected();
                //最低要求判断
                if (!redDNumber.length || !redTNumber.length || !blueDNumber.length || !blueTNumber.length || blueTNumber.length < 2) {
                    return false;
                }
                if ((redDNumber.length + redTNumber.length) < playType.groupdef[0].required || (blueDNumber.length + blueTNumber.length) < playType.groupdef[1].required) {
                    return false;
                }
                var dlt = [{
                    dan: redDNumber,
                    tuo: redTNumber
                }, {
                    dan: blueDNumber,
                    tuo: blueTNumber
                }];
                return {
                    code: "dlt_dt",
                    groups: dlt
                }
            }

            $(".ball-status-bar").unbind().bind('click', function() {
                var dlt = countDLTDT();
                if (dlt !== false) {
                    var count = PlayTypeRule.count(dlt)
                    var price = count * CPCONFIG.DLT.UNIT_PRICE;
                    if(price>CPCONFIG.DLT.MAX_AMOUNT){
                        dialog("单注投注不能超过"+CPCONFIG.DLT.MAX_AMOUNT+"元")
                        return false;
                    }
                    //console.log(price );
                    if(price==4){
                        dialog("胆拖，暂不支持该玩法");
                        return false;
                    }
                    dlt.DLT_ID = ++CACHE_ID;
                    DLT_CAR.push(dlt);
                    redD.clear();
                    redT.clear();
                    blueD.clear();
                    blueT.clear();
                    location.href = "#!/car"
                } else {
                    dialog("请至少从前区选择"+"<span class='wzl-text-warning'>6</span>"+"个红球，后区选择"+"<span class='wzl-text-warning'>3</span>"+"个蓝球")
                    return false;
                }
            });
            $(".glyphicon.icon-trash").unbind().bind("click", function() {
                redD.clear();
                redT.clear();
                blueD.clear();
                blueT.clear();
                total();
            })
            //摇一摇重置
            //摇一摇重置
            Y_Y(function(){
                total();
            })
        }

});