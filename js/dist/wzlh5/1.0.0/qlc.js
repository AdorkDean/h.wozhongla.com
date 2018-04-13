/**
 * Created by hebo (razr409355439@gmail.com)on 15/1/7.
 */

define("wzlh5/1.0.0/qlc",["jquery/2.1.1/jquery","wzlh5/1.0.0/ac","handlebars/1.3.0/dist/cjs/handlebars",'wzlh5/1.0.0/until',"wzlh5/1.0.0/cp","wzlh5/1.0.0/ui"],function (require, exports, module) {
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


        var QLC_CAR = [],
        //投注倍数
            QLC_BEI = 1,
        //投注期次
            QLC_QI = 1,
        //是否追加
            QLC_ZJ = false,
        //中奖是否停止追加
            QLC_ZJSTOP = false,
            QLC_NOWQI = null,
            CACHE_ID = 0,
            u_type="fs",
            PlayTypeRule = cp.PlayTypeRule,
            CPCONFIG = cp.CONFIG,
            stop_control=true;
        var routes = {
            "/fs": function() {
                QLCfs();
            },
            "/dt": function() {
                QLCdt();
            },
            "/car": function() {
                QLCcar();
            },
            "index": function() {
                QLCfs();
            },
            "init": function() {
                init();
            }
        }
        Router(routes);
        function publicShow(v, title,barstr ,fn) {
            $("#carfixed,#car,#tzsuccess").hide();
            $("#selectzxhz,#qlcplays,#qlc-history").show();
            $(".wzl-cartext").addClass("hidden")
            $(".ball-status-bar").addClass("disabled").html(barstr)
            $("#qlcplays>div").not("#" + v).hide(function() {
                $('#' + v + ', #buycarfixedbtn').show();
                $('.wzl-nav-dropdown').text(title).show();
                fn && fn();
            })
        }

        function init() {
            $('.ballcon-right em,.ballcon-yilou').hide();
            $('.wzl-nav-dropdown').click(function() {
                dropdownMask.toggle();
                $("#wzl-dropdown a").click(function(){
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
            $.wzlhistory("qlc", function(d) {
                QLC_NOWQI = d.issue
            });

            $(".jc-match-i").on("click", function() {
                $("#selectjc,#jc-match").slideToggle();
            })
            //请求 userinfo 用于同步
            action.queryUserInfo({},function(){})
            //查询是否停售
            action.getControl(function(re){
                if(re[3]===false){
                    stop_control=false
                    dialog("该彩种已经停售!")
                }
            })
        }

        function QLCfs(){
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow("selectfs", '七乐彩-复式',"至少选择7个号码")
            u_type='fs';
            var red = cp.numberSelect({
                min: 1,
                max: 30,
                numberSelectAfter: function(f) {
                    total();
                },
                numberUnSelectAfter: function(f) {
                    total();
                },
                //dom 类
                selectStyle: ".red_balls",
                //
                containerId: "#selectfs"
            })
            $('.redBalls .ballcon-js-n').randombox(function(n) {
                var number = cp.shuffle({
                    min: 1,
                    max: 30,
                    padding: 1,
                    count: n
                })
                red.clear().select(number)
            });
            function total(){
                var s = countQLC()
                if(s!==false){
                    var count = PlayTypeRule.count(s)
                    var price = count * CPCONFIG.QLC.UNIT_PRICE;
                    $(".ball-status-bar").removeClass("disabled").html("共" + count + "注," + price + "元")
                } else {
                    $(".ball-status-bar").addClass("disabled").html("至少选择7个号码")
                }
            }
            function countQLC() {
                var redBall = red.getSelected();
                var QLCREQUIRE = CPCONFIG.QLC;
                var code = "qlc_ds";
                //判断是否达到最低注数要求
                if (redBall.length < QLCREQUIRE.RED_MIN ) {
                    //不够一组 不予计算
                    return false;
                }
                if (redBall.length == QLCREQUIRE.RED_MIN) {
                    //那么就是 单式
                    code = 'qlc_ds'
                } else {
                    //那么是复式
                    code = "qlc_fs"
                }
                var groups = [{
                    dan: null,
                    tuo: redBall
                }]
                return {
                    code: code,
                    groups: groups
                }
            }
            Y_Y(function() {
                red.clear()
                var number = cp.shuffle({
                    min: 1,
                    max: 30,
                    padding: 1,
                    count: 7
                })
                red.clear().select(number)
            })
            $(".glyphicon.icon-trash").unbind().bind("click", function() {
                red.clear();
                total();
            })

            $(".ball-status-bar").unbind().bind('click', function() {
                var QLCc = countQLC();
                if (QLCc !== false) {
                    var count = PlayTypeRule.count(QLCc)
                    var price = count * CPCONFIG.QLC.UNIT_PRICE;
                    if(price>CPCONFIG.QLC.MAX_AMOUNT){
                        dialog("单注投注不能超过"+CPCONFIG.QLC.MAX_AMOUNT+"元")
                        return false;
                    }
                    QLCc.QLC_ID = ++CACHE_ID
                    QLC_CAR.push(QLCc);
                    red.clear();
                    location.href = "#!/car"
                } else {
                    dialog("请至少选择"+"<span class='wzl-text-warning'>7</span>"+"个号码")
                    return false;
                }
            });
        }

        function QLCdt(){
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow("selectdt", '七乐彩-胆拖','至少选择8个号码')
            u_type='dt';
            var redD = cp.numberSelect({
                min: 1,
                max: 30,
                numberSelectBefore:function(f){
                    var d = redD.getSelected();
                    if (redD.isSelected(f)){
                        return true;
                    }
                    //匹配最大胆码数量
                    if (d.length==6) {
                        dialog('胆码不能超过'+"<span class='wzl-text-warning'>6</span>"+'个')
                        return false;
                    }
                    if (redT.isSelected(f)) {
                        dialog("已经选择了相同的拖码")
                        return false;
                    }
                },
                numberSelectAfter: function(f) {
                    total();
                },
                numberUnSelectAfter: function(f) {
                    total();
                },
                //dom 类
                selectStyle: ".red_balls",
                //
                containerId: "#dt-red-d"
            })
            var redT = cp.numberSelect({
                min: 1,
                max: 30,
                numberSelectBefore:function(f){
                    var d = redT.getSelected();

                    if (redD.isSelected(f)) {
                        dialog("已经选择了相同的胆码")

                        return false;
                    }
                },
                numberSelectAfter: function(f) {
                    total();
                },
                numberUnSelectAfter: function(f) {
                    total();
                },
                //dom 类
                selectStyle: ".red_balls",
                //
                containerId: "#dt-red-t"
            })
            function total(){
                var s = countQLC()
                if(s!==false){
                    var count = PlayTypeRule.count(s)
                    var price = count * CPCONFIG.QLC.UNIT_PRICE;
                    $(".ball-status-bar").removeClass("disabled").html("共" + count + "注," + price + "元")
                } else {
                    $(".ball-status-bar").addClass("disabled").html("至少选择8个号码")
                }
            }
            function countQLC() {
                var dN = redD.getSelected();
                var tN = redT.getSelected();
                var QLCREQUIRE = CPCONFIG.QLC;
                var code = "qlc_dt";
                //判断是否达到最低注数要求
                if (!dN||!tN||!dN.length||!tN.length||tN.length<2||(dN.length+tN.length)<7) {
                    //不够一组 不予计算
                    return false;
                }
                var groups = [{
                    dan: dN,
                    tuo: tN
                }]
                return {
                    code: code,
                    groups: groups
                }
            }
            $(".glyphicon.icon-trash").unbind().bind("click", function() {
                redD.clear();
                redT.clear();
                total();
            })

            $(".ball-status-bar").unbind().bind('click', function() {
                var QLCc = countQLC();
                if (QLCc !== false) {
                    var count = PlayTypeRule.count(QLCc)
                    var price = count * CPCONFIG.QLC.UNIT_PRICE;
                    if(price>CPCONFIG.QLC.MAX_AMOUNT){
                        dialog("单注投注不能超过"+CPCONFIG.QLC.MAX_AMOUNT+"元")
                        return false;
                    }
                    QLCc.QLC_ID = ++CACHE_ID
                    QLC_CAR.push(QLCc);
                    redD.clear();
                    redT.clear();
                    location.href = "#!/car"
                } else {
                    dialog("请至少选择"+"<span class='wzl-text-warning'>8</span>"+"个号码")
                    return false;
                }
            });
            //摇一摇重置
            Y_Y(function(){
                total();
            })
        }

        function QLCcar(){
            $('#qlcplays,#qlc-history,.wzl-fixed').fadeOut(function() {
                $(".wzl-nav-bar").children().eq(1).hide()
                $(".wzl-cartext").removeClass("hidden") //removeClass("icon-dropdown-pink").removeClass("wzl-nav-dropdown").html('双色球-购物车').click(function(){return false;})
                $(".ball-status-bar").addClass("disabled").html("至少选择7个号码")
                $('#car,#carfixed').fadeIn();
                renderCar();
            });

            function renderCar() {
                if (QLC_CAR.length) {
                    $("#car-no-select").addClass('hidden')
                    var result = countCar();
                    var listTemplate = Handlebars.compile($("#ball-select-item").html());
                    $("#ball-select-group").html(listTemplate({
                        list: result.list
                    }));
                    var totalTemplate = Handlebars.compile($("#car-total-template").html());
                    $('#car-total').html(totalTemplate(result.total))
                    $("#ball-select-group  .ball-select-remove").unbind().bind("click", function() {
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
                    $("#ssq_hm").unbind().bind("click", function() {
                        dialog('合买暂未开放！')
                    });
                    $('#ssq_buy').unbind().bind("click", function() {
                        dialog("购物车为空！")
                    })
                    $("#ssq_buy").addClass("disabled")
                }
                totalBoard(function(qi, bei, zjstop) {
                    QLC_BEI = bei;
                    QLC_QI = qi;
                    QLC_ZJSTOP = zjstop;
                    renderCar();
                })
            }
            //统计最后数据 用于渲染
            function countCar() {
                var r = [],
                    car_count = 0,
                    car_price = 0,
                    total;
                for (var i = 0; i < QLC_CAR.length; i++) {
                    var ritem = {}
                    ritem.count = PlayTypeRule.count(QLC_CAR[i]);
                    ritem.price = ritem.count * CPCONFIG['QLC'].UNIT_PRICE;
                    ritem.redStr= type2str(QLC_CAR[i].code,QLC_CAR[i])
                    ritem.groups = QLC_CAR[i].groups
                    ritem.type = type(QLC_CAR[i].code)
                    ritem.code = QLC_CAR[i].code;
                    ritem.id = QLC_CAR[i].QLC_ID
                    car_count += ritem.count
                    car_price += ritem.price
                    r.push(ritem)
                }
                function type2str(t,item,is){
                    var s = '';
                    if (t == "qlc_ds") {
                        s = item.groups[0].tuo.join(" ")
                    }
                    if (t == "qlc_fs") {
                        s = item.groups[0].tuo.join(" ")
                    }
                    if (t == "qlc_dt") {
                        s = item.groups[0].dan.join(" ")
                        s+= "@"+item.groups[0].tuo.join(" ")
                    }
                    return s;
                }
                function type(t) {
                    var r = '';
                    switch (t) {
                        case "qlc_ds":
                            r = "单式投注";
                            break;
                        case "qlc_fs":
                            r = "复式投注";
                            break;
                        case "qlc_dt":
                            r = "胆拖投注";
                            break;
                    }
                    return r;
                }

                function remove(id) {
                    for (var j = 0; j < QLC_CAR.length; j++) {
                        if (QLC_CAR[j].QLC_ID == id) {
                            QLC_CAR.splice(j, 1)
                        }
                    }
                }
                total = {
                    bei: QLC_BEI,
                    qi: QLC_QI,
                    count: car_count,
                    price: car_price * QLC_QI * QLC_BEI,
                    zjstop: QLC_ZJSTOP,
                    zj: QLC_ZJ
                }

                function clear() {
                    QLC_CAR.length = 0;
                    QLC_BEI = 1
                    QLC_QI = 1
                    QLC_ZJ = false
                    QLC_ZJSTOP = false
                }
                return {
                    list: r,
                    count: car_count,
                    price: car_price,
                    remove: remove,
                    total: total,
                    clear: clear
                };
            }
            //统计面板事件 （期次 倍数 是否追号 等
            function totalBoard(fn) {
                var $qiInput = $("#ball-qc");
                var $beiInput = $("#ball-bei");
                var $zjInput = $('input#ball-zj');
                var $zjstopInput = $('input#ball-zjstop');
                var bei = $beiInput.val().trim(),
                    qi = $qiInput.val().trim(),
                    zjstop = $zjstopInput.prop('checked');
                //期次减
                // $("#car-total").delegate(".buy-bar-qcminus",
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
                    if($val<1)$val=1;
                    $(this).val($val)
                    qi = Number($val);
                    syanc();
                })
                $($beiInput).unbind().bind('keyup', function() {
                    var $val = $($beiInput).val();
                    $val = $val.replace(/\D/g, "")
                    $val = $val > 9999 ? 9999 : $val;
                    if($val<1)$val=1;
                    $(this).val($val)
                    bei = Number($val);
                    syanc();
                })
                $('input#ball-zjstop').unbind().bind('click', function() {
                    var $checked = $(this).prop('checked')
                    zjstop = $checked;
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
            function getOneQLC() {
                var red = cp.shuffle({
                    min: 1,
                    max: 30,
                    padding: 1,
                    sort:true,
                    count: 7
                })
                //随机红胆码个数
                var sn = [1, 2, 3, 4, 5],
                    srd = sn.sort(function() {
                        return Math.random() - 0.5 > 0;
                    }),
                    srt = 8;
                var redDnumber = cp.shuffle({
                    min: 1,
                    max: 30,
                    padding: 1,
                    sort:true,
                    count: srd[0]
                })
                var redTnumber = cp.shuffle({
                    pool: uniqe(redDnumber),
                    min: 1,
                    max: 30,
                    padding: 1,
                    sort:true,
                    count: srt - srd[0]
                })
                var QLC = {
                    code: 'qlc_ds',
                    groups: [{
                        dan: null,
                        tuo: red
                    }]
                }

                QLC.QLC_ID = ++CACHE_ID
                return QLC;

                function uniqe(arr) {
                    var r = [],
                        f = 1;
                    for (var n = 1; n <= 33; n++) {
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
                location.href = "#!/fs"
            })
            $("#car-addjx").unbind().bind('click', function() {
                var QLC = getOneQLC();
                QLC_CAR.push(QLC)
                renderCar();
            })
            $(".glyphicon.icon-trash").unbind().bind("click", function() {
                var s = countCar();
                s.clear();
                renderCar();
            })
            /*投注成功*/
            function tzsuccess() {
                $("#car,#selectqlc,#carfixed").hide();
                $("#tzsuccess").show();
            }
            /**
             * 用户购买数据整合
             * @returns {*}
             */
            function userBuyData() {
                var QLCCar = countCar()
                if (!QLCCar) return null;
                var d = {
                    gameType: "003",
                    format: "ajax",
                    needPay: "",
                    lotoGson: {}
                }
                d.needPay = QLCCar.total.price;
                //
                d.lotoGson = mergeTZ();
                /**
                 * 投注串 数据整合
                 */
                function mergeTZ() {
                    if (!QLCCar) return false;
                    var need = {
                        //彩票类型
                        gameType: "003",
                        //中奖是否停止 0、1
                        isStop: "",
                        //投注类型 0 代购 1 追号 2 合买
                        buyType: "0",
                        //票信息数组
                        buyNumberArray: "",
                        //期次信息数组
                        issueArray: [],
                        //方案标题
                        title: "0",
                        //方案描述
                        explain: "0",
                        //是否保密 1 公开 2相对保密 3完全保密
                        secrecy: "1",
                        //是否上传方案 1 是  其他否  2是胜负彩过滤投注
                        //isUp:"0",
                        splitAmount: "0",
                        //是否先发方案标识  0 常规合买  1 先发方案再上传号
                        isUpload: "0",
                        buyAmount: 0,
                        floorsAmount: "0",
                        //标识是否为竞彩专业版订单 0不是 1 是
                        //ishigh:"0",
                        totalSum: "0",
                        //竞彩混合过关去除单一玩法
                        qcdy: "0",
                        //多彩中和精彩混合过关联合id
                        unoid: "0",
                        //中将佣金  0-10
                        commision: "0",
                        //佣金类型  null 0 老佣金   1 新佣金
                        commisiontype: "0"
                    }
                    need.totalSum = Number(QLCCar.total.price);
                    need.isStop = QLCCar.total.zjstop ? 1 : 0;
                    need.buyNumberArray = buyArrayGenerator(QLCCar.list)
                    need.buyType = QLCCar.total.qi > 1 ? 1 : 0;
                    need.title = QLCCar.total.qi > 1 ? "七乐彩" + QLC_NOWQI + "期追号方案" : "七乐彩" + QLC_NOWQI + "期追号方案";
                    // xian ajax =
                    return need;
                }
                //投注号码串数据
                function buyArrayGenerator(list) {
                    var r = [];
                    $(list).each(function(index, item) {
                        if (!item) return;
                        var it;
                        it = join(item)

                        it && r.push(it);
                    })

                    function join(item) {
                        var dataTmp = {
                            "buyNumber": "",
                            "typeId": "00",
                            "seleId": "01",
                            "sum": 0.0
                        };
                        if (!item || !item.count) return false;
                        var rs = item.redStr.split(" ").join(",")
                        dataTmp.buyNumber = rs ;
                        dataTmp.sum = CPCONFIG.QLC.UNIT_PRICE;
                        dataTmp.multiple = QLCCar.total.bei;
                        switch (item.code) {
                            case "qlc_ds":
                                dataTmp.seleId = "01"
                                dataTmp.sum = item.price;
                                break;
                            case "qlc_fs":
                                dataTmp.seleId = "02"
                                dataTmp.sum = item.price;
                                break;
                            case "qlc_dt":
                                dataTmp.seleId = "03"
                                dataTmp.buyNumber = rs ;
                                dataTmp.sum = item.price;
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
                        lottery: "QLC",
                        issues: QLCCar.total.qi || QLC_QI
                    }, function(re) {
                        r = merge(re)
                        fn(r)
                    })

                    function merge(list) {
                        var r = [];
                        $(list).each(function(index, item) {
                            r.push({
                                issue: item.issue,
                                multiple: QLCCar.total.bei
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
                dialog("loading", "正在投注！")
                u.getIssue(function(r) {
                    if (!r || !r.length) dialog("投注异常，请重试")
                    udata.lotoGson.issueArray = r;
                    udata.lotoGson = JSON.stringify(udata.lotoGson)
                    action.ssqTz(udata, function(re) {
                        TZ_INFO($.parseJSON(re), fn)
                    })
                })
            }
        }




});