/**
 * Created by hebo (razr409355439@gmail.com)on 15/1/7.
 */

define("wzlh5/1.0.0/ssq",["jquery/2.1.1/jquery","wzlh5/1.0.0/ac","handlebars/1.3.0/dist/cjs/handlebars",'wzlh5/1.0.0/until',"wzlh5/1.0.0/cp","wzlh5/1.0.0/ui"],function (require, exports, module) {
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
    var SSQ_CAR = [],
    //投注倍数
        SSQ_BEI = 1,
    //投注期次
        SSQ_QI = 1,
    //是否追加
        SSQ_ZJ = false,
    //中奖是否停止追加
        SSQ_ZJSTOP = false,
    //当前其次
        SSQ_NOWQI = null,
        CACHE_ID = 0,
        PlayTypeRule = cp.PlayTypeRule,
        CPCONFIG = cp.CONFIG,
        u_type = "dg",
        //停售控制
        stop_control = true;

    var routes = {
        "/dt": function () {
            ssqdt();
        },
        "/dg": function () {
            ssqdg();
        },
        "/car": function () {
            ssqcar();
        },
        "index": function () {
            ssqdg();
        },
        "init": function () {
            init();
        }
    }
    Router(routes);

    function init() {

        $('.wzl-nav-dropdown').click(function () {
            dropdownMask.toggle();
        })
//      $.wzlmore(function (d) {
//      });
		$('.navbar-header').on('click','.icon-more',function(){
                	
	                	$('.drop-down-more').toggle();
	        })
        $.wzlhistory("ssq", function (d) {
            SSQ_NOWQI = d.issue
        });

        //请求 userinfo 用于同步
        action.queryUserInfo({}, function (re) {
            console.log(re);
        })

        //查询是否停售
        action.getControl(function(re){
            if(re[1]===false){
                stop_control=false;
                dialog("该彩种已经停售!");
                return false;
            }
        })

    }

    function ssqcar() {
        $('#selectssq,.wzl-fixed').fadeOut(function () {
            $(".wzl-nav-bar").children().eq(1).hide()
            $(".wzl-cartext").removeClass("hidden") //removeClass("icon-dropdown-pink").removeClass("wzl-nav-dropdown").html('双色球-购物车').click(function(){return false;})
            $(".ball-status-bar").addClass("disabled").html("至少选择6个红球与1个蓝球")
            $('#car,#carfixed').fadeIn();
            renderCar();
        });

        function renderCar() {
            if (SSQ_CAR.length) {
                $("#car-no-select").addClass('hidden')
                var result = countCar();
                var listTemplate = Handlebars.compile($("#ball-select-item").html());
                $("#ball-select-group").html(listTemplate({
                    list: result.list
                }));
                var totalTemplate = Handlebars.compile($("#car-total-template").html());
                $('#car-total').html(totalTemplate(result.total))
                $("#ball-select-group  .ball-select-remove").on("click", function () {
                    var $id = $(this).parent().data("id");
                    result.remove($id)
                    renderCar();
                })
                $("#ssq_hm").unbind().bind("click", function () {
                    dialog('合买暂未开放！')
                });
                $('#ssq_buy').unbind().bind("click", function () {
                    $(this).attr("disabled");

                    //发送购买请求
                    postBuy(function (re) {
                        if (re.resultCode == "200") {
                            result.clear();
                            renderCar();
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
                $("#ssq_hm").unbind().bind("click", function () {
                    dialog('合买暂未开放！')
                });
                $('#ssq_buy').unbind().bind("click", function () {
                    dialog("购物车为空！")
                })
                $("#ssq_buy").addClass("disabled")
            }
            totalBoard(function (qi, bei, zjstop) {
                SSQ_BEI = bei;
                SSQ_QI = qi;
                SSQ_ZJSTOP = zjstop;
                renderCar();
            })
        }

        //统计最后数据 用于渲染
        function countCar() {
            var r = [],
                car_count = 0,
                car_price = 0,
                total;
            for (var i = 0; i < SSQ_CAR.length; i++) {
                var ritem = {}
                ritem.count = PlayTypeRule.count(SSQ_CAR[i]);
                ritem.price = ritem.count * CPCONFIG['SSQ'].UNIT_PRICE;
                if ($.isArray(SSQ_CAR[i].groups[0].dan)) {
                    ritem.redStr = SSQ_CAR[i].groups[0].dan.join(" ") + " " + SSQ_CAR[i].groups[0].tuo.join(" ")
                } else {
                    ritem.redStr = SSQ_CAR[i].groups[0].tuo.join(" ")
                }
                if ($.isArray(SSQ_CAR[i].groups[1].dan)) {
                    ritem.blueStr = SSQ_CAR[i].groups[1].dan.join(" ") + " " + SSQ_CAR[i].groups[1].tuo.join(" ")
                } else {
                    ritem.blueStr = SSQ_CAR[i].groups[1].tuo.join(" ")
                }
                ritem.groups = SSQ_CAR[i].groups
                ritem.type = type(SSQ_CAR[i].code)
                ritem.code = SSQ_CAR[i].code;
                ritem.id = SSQ_CAR[i].SSQ_ID
                car_count += ritem.count
                car_price += ritem.price
                r.push(ritem)
            }

            function type(t) {
                var r = '';
                switch (t) {
                    case "ssq_ds":
                        r = "单式投注";
                        break;
                    case "ssq_fs":
                        r = "复式投注";
                        break;
                    case "ssq_dt":
                        r = "胆拖投注";
                        break;
                }
                return r;
            }

            function remove(id) {
                for (var j = 0; j < SSQ_CAR.length; j++) {
                    if (SSQ_CAR[j].SSQ_ID == id) {
                        SSQ_CAR.splice(j, 1)
                    }
                }
            }

            total = {
                bei: SSQ_BEI,
                qi: SSQ_QI,
                count: car_count,
                price: car_price * SSQ_QI * SSQ_BEI,
                zjstop: SSQ_ZJSTOP,
                zj: SSQ_ZJ
            }

            function clear() {
                SSQ_CAR.length = 0;
                SSQ_BEI = 1
                SSQ_QI = 1
                SSQ_ZJ = false
                SSQ_ZJSTOP = false
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
            $(".buy-bar-qcminus").unbind().bind('click', function () {
                qi--;
                qi = qi < 1 ? 1 : qi;
                syanc();
            })
            //期次加
            $(".buy-bar-qcplus").unbind().bind('click', function () {
                qi++;
                qi = qi > 99 ? 99 : qi;
                syanc();
            })
            //倍数减
            $(".buy-bar-beiminus").unbind().bind('click', function () {
                bei--;
                bei = bei < 1 ? 1 : bei;
                syanc();
            })
            //倍数加
            $(".buy-bar-beiplus").unbind().bind('click', function () {
                bei++;
                bei = bei > 9999 ? 9999 : bei;
                syanc();
            })
            $($qiInput).unbind().bind("keyup", function () {
                var $val = $($qiInput).val();
                $val = $val.replace(/\D/g, "")
                $val = $val > 99 ? 99 : $val;
                if ($val < 1) $val = 1;
                $(this).val($val)
                qi = Number($val);
                syanc();
            })
            $($beiInput).unbind().bind('keyup', function () {
                var $val = $($beiInput).val();
                $val = $val.replace(/\D/g, "")
                $val = $val > 9999 ? 9999 : $val;
                if ($val < 1) $val = 1;
                $(this).val($val)
                bei = Number($val);
                syanc();
            })
            $('input#ball-zjstop').unbind().bind('click', function () {
                var $checked = $(this).prop('checked')
                zjstop = $checked;
                syanc();
            })

            function syanc() {
                setTimeout(function () {
                    $qiInput.val(qi)
                    $beiInput.val(bei)
                    fn && fn(qi, bei, zjstop)
                }, 100)
            }
        }

        //增加机选一注
        function getOneSsq() {
            var redNumber = cp.shuffle({
                min: 1,
                max: 33,
                padding: 1,
                sort: true,
                count: CPCONFIG.SSQ.RED_MIN
            })
            var blueNumber = cp.shuffle({
                min: 1,
                max: 16,
                padding: 1,
                sort: true,
                count: CPCONFIG.SSQ.BLUE_MIN
            })
            //随机红胆码个数
            var sn = [1, 2, 3, 4, 5],
                srd = sn.sort(function () {
                    return Math.random() - 0.5 > 0;
                }),
                srt = 7;
            var redDnumber = cp.shuffle({
                min: 1,
                max: 33,
                padding: 1,
                sort: true,
                count: srd[0]
            })
            var redTnumber = cp.shuffle({
                pool: uniqe(redDnumber),
                min: 1,
                max: 32,
                padding: 1,
                sort: true,
                count: srt - srd[0]
            })
            var ssq = {
                code: 'ssq_ds',
                groups: [
                    {
                        dan: null,
                        tuo: redNumber
                    },
                    {
                        dan: null,
                        tuo: blueNumber
                    }
                ]
            }

            ssq.SSQ_ID = ++CACHE_ID
            return ssq;

            function uniqe(arr) {
                var r = [],
                    f = 1;
                for (var n = 1; n <= 33; n++) {
                    r.push(n)
                }
                arr.sort(function (n1, n2) {
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

        $('#car-addhm').bind('click', function () {

            location.href = "#!/dg";


        })
        $("#car-addjx").unbind().bind('click', function () {
            var ssq = getOneSsq();
            SSQ_CAR.push(ssq)
            renderCar();
        })
        $(".glyphicon.icon-trash").unbind().bind("click", function () {
            var s = countCar();
            s.clear();
            renderCar();
        })
        /*投注成功*/
        function tzsuccess() {
            $("#car,#selectssq,#carfixed").hide();
            $("#tzsuccess").show();
        }




        /**
         * 用户购买数据整合
         * @returns {*}
         */
        function userBuyData() {
            var ssqCar = countCar()
            if (!ssqCar) return null;
            var d = {
                //证件类型  1身份证 2 军官证 3护照
                // carType:"",
                //彩票类型
                gameType: "001",
                format: "ajax",
                //需要支付金额
                needPay: "",
                //真实姓名
                // realName:"",
                //登录信息
                //tokenId:"",
                //用户名
                //userName:"",
                //用户id
                // userid:"",
                //投注串
                lotoGson: {}
            }
            //需要支付
            d.needPay = ssqCar.total.price;
            //
            d.lotoGson = mergeTZ();
            /**
             * 投注串 数据整合
             */
            function mergeTZ() {
                if (!ssqCar) return false;
                var need = {
                    //彩票类型
                    gameType: "001",
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
                    //关联ID
                    projectid: "0",
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
                need.totalSum = Number(ssqCar.total.price);
                need.isStop = ssqCar.total.zjstop ? 1 : 0;
                need.buyNumberArray = buyArrayGenerator(ssqCar.list)
                need.buyType = ssqCar.total.qi > 1 ? 1 : 0;
                need.title = ssqCar.total.qi > 1 ? "双色球" + SSQ_NOWQI + "期追号方案" : "双色球" + SSQ_NOWQI + "期追号方案";
                // xian ajax =
                return need;
            }

            //拆分胆拖
            function countDt(item) {
                var dm = item.groups[0].dan
                var tm = item.groups[0].tuo
                var bm = item.groups[1].tuo
                var re = []
                //组合
                var arr = c(tm, 6 - dm.length)
                for (var i = 0; i < arr.length; i++) {
                    //组合红球
                    var nn = dm.concat(arr[i]).sort();
                    //循环 蓝球
                    for (var n = 0; n < bm.length; n++) {
                        //[nn,[bm[n]]]
                        re.push({
                            blueStr: bm[n],
                            code: "ssq_ds",
                            count: 1,
                            price: 2,
                            redStr: nn.join(" "),
                            type: "单式投注"
                        })
                    }
                }
                return re;
                //置换
                function c(arr, num) {
                    var r = [];
                    (function f(t, a, n) {
                        if (n == 0) return r.push(t);
                        for (var i = 0, l = a.length - n; i <= l; i++) {
                            f(t.concat(a[i]), a.slice(i + 1), n - 1);
                        }
                    })([], arr, num);
                    return r;
                }

                //
                function pad(n) {
                    return n > 9 ? n : "0" + n;
                }
            }

            //投注号码串数据
            function buyArrayGenerator(list) {
                var r = [];
                $(list).each(function (index, item) {
                    if (!item) return;
                    var it;
                    if (item.code == "ssq_dt") {
                        var dtitem = countDt(item)
                        $(dtitem).each(function (index, item2) {
                            r.push(join(item2))
                        })
                    } else {
                        it = join(item)
                    }
                    it && r.push(it);
                })

                function join(item) {
                    var dataTmp = {
                        "buyNumber": "",
                        "typeId": "00",
                        "seleId": "01",
                        "sum": 0.0,
                        "multiple": 0,
                        "status": 0,
                        "num": 0,
                        "lastMatch": 0,
                        "hbcls": 0.0
                    };
                    if (!item || !item.count) return false;
                    var rs = item.redStr.split(" ").join(','),
                        bs = item.blueStr.split(" ").join(',')
                    dataTmp.buyNumber = rs + "#" + bs;
                    dataTmp.sum = CPCONFIG.SSQ.UNIT_PRICE;
                    dataTmp.num = item.count;
                    dataTmp.multiple = ssqCar.total.bei;
                    switch (item.code) {
                        case "ssq_ds":
                            dataTmp.seleId = "01"
                            break;
                        case "ssq_fs":
                            dataTmp.seleId = "02"
                            dataTmp.sum = item.count * CPCONFIG.SSQ.UNIT_PRICE;
                            break;
                        case "ssq_dt":
                            dataTmp.seleId = "03"
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
                    lottery: "SSQ",
                    issues: ssqCar.total.qi || SSQ_QI
                }, function (re) {
                    r = merge(re)
                    fn(r)
                })

                function merge(list) {
                    var r = [];
                    $(list).each(function (index, item) {
                        r.push({
                            issue: item.issue,
                            multiple: ssqCar.total.bei
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
            dialog("loading", "正在投注！");
            u.getIssue(function (r) {
                if (!r || !r.length) dialog("投注异常，请重试")
                udata.lotoGson.issueArray = r;
                udata.lotoGson = JSON.stringify(udata.lotoGson)
                //////////////console.log(udata)
                action.ssqTz(udata, function (re) {
                    TZ_INFO($.parseJSON(re), fn)
                })
            })
        }
    }

    function ssqdg() {

        //选择玩法后如果记录是显示的让他隐藏
         $('.history-list').hide();

        //号码选择事件等
        var red = cp.numberSelect({
            min: 1,
            max: 32,
            numberSelectAfter: function (f) {
                total();
            },
            numberUnSelectAfter: function (f) {
                total();
            },
            //dom 类
            selectStyle: ".red_balls",
            //
            containerId: "#dg"
        })
        var blue = cp.numberSelect({
            min: 1,
            max: 16,
            numberSelectAfter: function (f) {
                total()
            },
            numberUnSelectAfter: function (f) {
                total()
            },
            //dom 类
            selectStyle: ".blue_balls",
            //
            containerId: "#dg"
        })
        $('#dt,#car,#carfixed,#tzsuccess').fadeOut(function () {
            $('.wzl-nav-dropdown').text('双色球-代购').show();
            $(".wzl-cartext").addClass("hidden")
            $(".red_balls ,.blue_balls").removeClass("active")
            $("#buycarfixedbtn .ball-status-bar").addClass("disabled").html("至少选择6个红球与1个蓝球")
            $('#dg, #selectssq,#buycarfixedbtn').fadeIn()
            u_type = "dg"
        })
        //随机 机选球
        $('.redBalls .ballcon-js-n').randombox(function (n) {
            var number = cp.shuffle({
                min: 1,
                max: 32,
                padding: 1,
                count: n
            })
            red.clear().select(number)
        });
        $('.blueBalls .ballcon-js-n').randombox(function (n) {
            var number = cp.shuffle({
                min: 1,
                max: 16,
                padding: 1,
                count: n
            })
            blue.clear().select(number)
        });
        Y_Y(function () {
            red.clear()
            blue.clear()
            var number = cp.shuffle({
                min: 1,
                max: 33,
                padding: 1,
                count: 6
            })
            red.clear().select(number)
            var number = cp.shuffle({
                min: 1,
                max: 16,
                padding: 1,
                count: 1
            })
            blue.clear().select(number)
        })
        $(".ball-status-bar").unbind().bind('click', function () {
            var ssq = countSsq();
            if (ssq !== false) {
                var count = PlayTypeRule.count(ssq)
                var price = count * CPCONFIG.SSQ.UNIT_PRICE;
                if (price > CPCONFIG.SSQ.MAX_AMOUNT) {
                    dialog("单注投注不能超过20000元")
                    return false;
                }
                ssq.SSQ_ID = ++CACHE_ID
                SSQ_CAR.push(ssq);
                red.clear();
                blue.clear();
                location.href = "#!/car"
            } else {
                dialog("请至少选择" + "<span class='wzl-text-warning'>6</span>" + "个红球与" + "<span class='wzl-text-warning'>1</span>" + "个蓝球")
            }
        });
        $(".glyphicon.icon-trash").unbind().bind("click", function () {
            red.clear();
            blue.clear();
            total();
        })

        function total() {
            var ssq = countSsq(),
                count = 0;
            if (ssq !== false) {
                count = PlayTypeRule.count(ssq)
                var price = count * CPCONFIG.SSQ.UNIT_PRICE;
                $(".ball-status-bar").removeClass("disabled").html("共" + count + "注," + price + "元")
            } else {
                $(".ball-status-bar").addClass("disabled").html("至少选择6个红球与1个蓝球")
            }
        }

        function countSsq() {
            var redBall = red.getSelected();
            var blueBall = blue.getSelected();
            var SSQREQUIRE = CPCONFIG.SSQ;
            var code = "";
            //判断是否达到最低注数要求
            if (redBall.length < SSQREQUIRE.RED_MIN || blueBall.length < SSQREQUIRE.BLUE_MIN) {
                //不够一组双色球 不予计算
                return false;
            }
            if (redBall.length == SSQREQUIRE.RED_MIN && blueBall.length == SSQREQUIRE.BLUE_MIN) {
                //那么就是 单式
                code = 'ssq_ds'
            } else {
                //那么是复式
                code = "ssq_fs"
            }
            var groups = [
                {
                    dan: null,
                    tuo: redBall
                },
                {
                    dan: null,
                    tuo: blueBall
                }
            ]
            return {
                code: code,
                groups: groups
            }
        }
    }

    function ssqdt() {
        //选择玩法后如果记录是显示的让他隐藏

            $('.history-list').hide();

        //号码选择事件等
        //红胆码
        var redD = cp.numberSelect({
            min: 1,
            max: 32,
            numberSelectBefore: function (f) {
                var d = redD.getSelected();
                if (redD.isSelected(f)) {
                    return  true;
                }
                //匹配最大胆码数量
                if (d.length == CPCONFIG.SSQ.RED_D_MAX) {
                    dialog('胆码不能超过' + CPCONFIG.SSQ.RED_D_MAX + '个')
                    return false;
                }
                if (redT.isSelected(f)) {
                    dialog("已经选择了相同的胆码")
                    return false;
                }
            },
            numberSelectAfter: function (f) {
                total();
            },
            numberUnSelectAfter: function (f) {
                total();
            },
            //dom 类
            selectStyle: ".red_balls",
            //
            containerId: "#dt-red-d"
        })
        //红拖码
        var redT = cp.numberSelect({
            min: 1,
            max: 32,
            numberSelectBefore: function (f) {
                if (redD.isSelected(f)) {
                    dialog("已经选择了相同的胆码")
                    return false;
                }
                var d = redT.getSelected();
                if (redT.isSelected(f)) {
                    return  true;
                }
                //匹配最大胆码数量
                if (d.length == CPCONFIG.SSQ.RED_T_MAX) {
                    dialog('拖码不能超过' + CPCONFIG.SSQ.RED_T_MAX + '个')
                    return false;
                }
            },
            numberSelectAfter: function (f) {
                total();
            },
            numberUnSelectAfter: function (f) {
                total();
            },
            //dom 类
            selectStyle: ".red_balls",
            //
            containerId: "#dt-red-t"
        })
        //蓝球
        var blue = cp.numberSelect({
            min: 1,
            max: 16,
            numberSelectAfter: function (f) {
                total();
            },
            numberUnSelectAfter: function (f) {
            },
            //dom 类
            selectStyle: ".blue_balls",
            //
            containerId: "#dt-blue"
        })
        $('#dg,#car,#carfixed,#tzsuccess').fadeOut(function () {
            $('.wzl-nav-dropdown').text('双色球-胆拖').show();
            $(".wzl-cartext").addClass("hidden")
            $(".red_balls ,.blue_balls").removeClass("active")
            $("#buycarfixedbtn .ball-status-bar").addClass("disabled").html("至少选择6个红球与1个蓝球")
            $('#dt, #selectssq,#buycarfixedbtn').fadeIn();
            u_type = "dt"
        })
        //选择号码以后统计事件
        function total() {
            var ssq = countSsq(),
                count;
            if (ssq !== false) {
                count = PlayTypeRule.count(ssq)
                var price = count * CPCONFIG.SSQ.UNIT_PRICE;
                $(".ball-status-bar").removeClass("disabled").html("共" + count + "注," + price + "元")
            } else {
                $(".ball-status-bar").addClass("disabled").html("至少选择6个红球与1个蓝球")
            }
        }

        //统计双色球数据
        function countSsq() {
            var redDnumber = redD.getSelected(),
                redTnumber = redT.getSelected(),
                blueNumber = blue.getSelected();
            var SSQDTREQUIRE = CPCONFIG.SSQ;
            if (redDnumber.length > SSQDTREQUIRE.RED_D_MAX) {
                // dialog('胆码不能超过'+SSQDTREQUIRE.RED_D_MAX+'个')
                return false;
            }
            if (redTnumber.length < SSQDTREQUIRE.RED_T_MIN) {
                //dialog('拖码最少需要选择'+SSQDTREQUIRE.RED_D_MAX+'个')
                return false;
            }
            if (!blueNumber.length || (redDnumber.length + redTnumber.length) < 6) {
                return false;
            }
            var groups = [
                {
                    dan: redDnumber,
                    tuo: redTnumber
                },
                {
                    dan: null,
                    tuo: blueNumber
                }
            ]
            return {
                code: "ssq_dt",
                groups: groups
            }
        }

        $(".ball-status-bar").unbind().bind('click', function () {
            var ssq = countSsq();
            if (ssq !== false) {
                var count = PlayTypeRule.count(ssq)
                var price = count * CPCONFIG.SSQ.UNIT_PRICE;
                if (price > CPCONFIG.SSQ.MAX_AMOUNT) {
                    dialog("单注投注不能超过20000元")
                    return false;
                }
                ssq.SSQ_ID = ++CACHE_ID
                SSQ_CAR.push(ssq);
                redD.clear();
                redT.clear();
                blue.clear();
                location.href = "#!/car"
            } else {
                dialog("请至少选择" + "<span class='wzl-text-warning'>6</span>" + "个红球与" + "<span class='wzl-text-warning'>1</span>" + "个蓝球")
                return false;
            }
        });
        $(".glyphicon.icon-trash").unbind().bind("click", function () {
            redD.clear();
            redT.clear();
            blue.clear();
            total();
        })
        //摇一摇重置
        Y_Y(function () {
            total();
        })
    }


});