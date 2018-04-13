/**
 * Created by hebo (razr409355439@gmail.com)on 15/1/7.
 */

define("wzlh5/1.0.0/f3d",["jquery/2.1.1/jquery","wzlh5/1.0.0/ac","handlebars/1.3.0/dist/cjs/handlebars",'wzlh5/1.0.0/until',"wzlh5/1.0.0/cp","wzlh5/1.0.0/ui"],function (require, exports, module) {
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
        var F3D_CAR = [],
        //投注倍数
            F3D_BEI = 1,
        //投注期次
            F3D_QI = 1,
        //是否追加
            F3D_ZJ = false,
        //中奖是否停止追加
            F3D_ZJSTOP = false,
            F3D_NOWQI = null,
            CACHE_ID = 0,
            u_type = "zxfs",
            PlayTypeRule = cp.PlayTypeRule,
            CPCONFIG = cp.CONFIG,
            stop_control = true;
        var routes = {
            "/zxfs": function() {
                zxfs();
            },
            "/zxhz": function() {
                zxhz();
            },
            "/z3fs": function() {
                z3fs();
            },
            "/z3ds": function() {
                z3ds();
            },
            "/z6fs": function() {
                z6fs();
            },
            "/car": function() {
                f3dcar();
            },
            "index": function() {
                zxfs()
            },
            "init": function() {
                init();
            }
        }
        Router(routes);

        function init() {
            //$('.ballcon-right em,.ballcon-yilou').hide();

            $.wzlhistory("fc3d", function(d) {
                F3D_NOWQI = d.issue;
            });
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

            //渲染遗漏
            action.yl('sd',{},function (re){
                //////////console.log(re);
                if(re.resultCode=='200'){
                    fomatYl(re.data);
                }else{

                }

            })

            function fomatYl(d){
                var allArr=d.split(",");
                //////console.log(allArr);

                for (i=4;i<=13;i++){
                    $('#yla em').eq(i-4).text(allArr[i])
                }

                for (i=14;i<=23;i++){
                    $('#ylb em').eq(i-14).text(allArr[i])
                }

                for (i=24;i<=33;i++){
                    $('#ylc em').eq(i-24).text(allArr[i])
                }
            }

            $('.ballcon-yilou').on('click', function (){
                $('.ballcon-right em').toggle()
            })

            //查询是否停售
            action.getControl(function(re){
                if(re[2]===false){
                    stop_control=false
                    dialog("该彩种已经停售!")
                }
            })
        }
        /**
         * 视图切换类
         * @param v
         */
        function publicShow(v, title, fn) {
            $("#carfixed,#f3dcar,#tzsuccess").hide();
            $(".red_balls").removeClass("active")
            $(".wzl-cartext").addClass("hidden")
            $("#selectfc3d,#fc3dplays").show();
            $(".ball-status-bar").addClass("disabled").html("每位至少选择 1 个号码球")
            $("#fc3dplays>div,#f3dcar").not("#" + v).hide(function() {
                $('#' + v + ', #buycarfixedbtn').show();
                $('.wzl-nav-dropdown').text(title).show();
                fn && fn();
            })
        }
        /**
         * 福彩3d选好器
         * @param containerId  父级id
         * @param total
         * @returns {NumberSelect|*}
         */
        function fc3dNumberSelect(containerId, total, before) {
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
                containerId: containerId
            })
        }
        //直选复式
        function zxfs() {
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow('selectzxfs', '福彩3D-直选复式')
            u_type = "zxfs";
            //百位
            var bai = fc3dNumberSelect("#selectzxfs .fc3d-bai", total)
            //十位
            var shi = fc3dNumberSelect("#selectzxfs .fc3d-shi", total)
            //个位
            var ge = fc3dNumberSelect("#selectzxfs .fc3d-ge", total)

            function total() {
                var fc3d = countZxfs();
                if (fc3d != false) {
                    var count = PlayTypeRule.count(fc3d)
                    var price = count * CPCONFIG.FC3D.UNIT_PRICE;
                    $(".ball-status-bar").removeClass("disabled").html("共" + count + "注," + price + "元")
                } else {
                    $(".ball-status-bar").addClass("disabled").html("每位至少选择 1 个号码球")
                }
            }

            function countZxfs() {
                var baiN = bai.getSelected(),
                    shiN = shi.getSelected(),
                    geN = ge.getSelected();
                var type = PlayTypeRule['fc3d_fs'];
                var baiRequired = type.groupdef[0].required,
                    shiRequired = type.groupdef[1].required,
                    geRequired = type.groupdef[2].required;
                if (!baiN || !baiN.length || !shiN || !shiN.length || !geN || !geN.length) {
                    return false
                }
                if (baiN.length < baiRequired || shiN.length < shiRequired || geN.length < geRequired) {
                    return false
                }
                var fc3dtype;
                if (baiN.length == baiRequired && shiN.length == shiRequired && geN.length == geRequired) {
                    fc3dtype = 'fc3d_ds'
                } else {
                    fc3dtype = 'fc3d_fs'
                }
                var groups = [{
                    dan: null,
                    tuo: baiN
                }, {
                    dan: null,
                    tuo: shiN
                }, {
                    dan: null,
                    tuo: geN
                }]
                return {
                    code: fc3dtype,
                    groups: groups
                }
            }
            $('#buycarfixedbtn .ball-status-bar').unbind().bind('click', function() {
                var fc3d = countZxfs();
                if (fc3d != false) {
                    var count = PlayTypeRule.count(fc3d)
                    var price = count * CPCONFIG.FC3D.UNIT_PRICE;
                    if(price>CPCONFIG.FC3D.MAX_AMOUNT){
                        dialog("单注投注不能超过"+CPCONFIG.FC3D.MAX_AMOUNT+"元")
                        return false;
                    }
                    fc3d.F3D_ID = ++CACHE_ID;
                    F3D_CAR.push(fc3d)
                    bai.clear();
                    shi.clear();
                    ge.clear();
                    location.href = "#!/car"
                } else {
                    dialog("每位至少选择"+"<span class='wzl-text-warning'>1</span>"+"个号码")
                }
            });
            $(".glyphicon.icon-trash").unbind().bind("click", function() {
                bai.clear();
                shi.clear();
                ge.clear();
                total();
            })
            Y_Y(function() {
                bai.clear()
                shi.clear()
                ge.clear()
                var n1 = cp.shuffle({
                    min: 0,
                    max: 9,
                    count: 1
                })
                bai.clear().select(n1)
                var n2 = cp.shuffle({
                    min: 0,
                    max: 9,
                    count: 1
                })
                shi.clear().select(n2)
                var n3 = cp.shuffle({
                    min: 0,
                    max: 9,
                    count: 1
                })
                ge.clear().select(n3)

            })
        }
        /**
         * 直选和值
         */
        function zxhz() {
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow('selectzxhz', '福彩3D-直选和值')
            u_type = "zxhz"
            //百位
            var heizhi = cp.numberSelect({
                min: 0,
                max: 27,
                ispad: false,
                numberSelectBefore: function(f) {
                    heizhi.clear();
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
                containerId: "#selectzxhz .fc3d-hezhi"
            })

            function total() {
                var fc3d = countZxhz(),
                    count = 0;
                if (fc3d != false) {
                    count = PlayTypeRule.count(fc3d)
                    //////////////////////console.log(fc3d)
                    var price = count * CPCONFIG.FC3D.UNIT_PRICE;
                    $(".ball-status-bar").removeClass("disabled").html("共" + count + "注," + price + "元")
                } else {
                    $(".ball-status-bar").addClass("disabled").html("每位至少选择 1 个号码球")
                }
            }

            function countZxhz() {
                var hzN = heizhi.getSelected();
                var type = PlayTypeRule['fc3d_hz'];
                var hzRequired = type.groupdef[0].required
                if (!hzN || !hzN.length) {
                    return false
                }
                if (hzN.length < hzRequired) {
                    return false
                }
                var fc3dtype = 'fc3d_hz';
                var groups = [{
                    dan: null,
                    tuo: hzN
                }]
                return {
                    code: fc3dtype,
                    groups: groups
                }
            }
            $('#buycarfixedbtn .ball-status-bar').unbind().bind('click', function() {
                var fc3d = countZxhz();
                if (fc3d != false) {
                    var count = PlayTypeRule.count(fc3d)
                    var price = count * CPCONFIG.FC3D.UNIT_PRICE;
                    if(price>CPCONFIG.FC3D.MAX_AMOUNT){
                        dialog("单注投注不能超过"+CPCONFIG.FC3D.MAX_AMOUNT+"元")
                        return false;
                    }
                    fc3d.F3D_ID = ++CACHE_ID;
                    F3D_CAR.push(fc3d)
                    heizhi.clear();
                    location.href = "#!/car"
                } else {
                    dialog("每位至少选择"+"<span class='wzl-text-warning'>1</span>"+"个号码")
                }
            });
            $(".glyphicon.icon-trash").unbind().bind("click", function() {
                heizhi.clear();
                total();
            })
            Y_Y(function() {
                var n1 = cp.shuffle({
                    min: 1,
                    max: 27,
                    count: 1
                })
                heizhi.clear().select(n1)
            })
        }
        /**
         * 组三复式
         */
        function z3fs() {
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow('selectz3fs', '福彩3D-组三复式')
            u_type = "z3fs"
            //
            var bai = fc3dNumberSelect("#selectz3fs .fc3d-bai", total)

            function total() {
                var fc3d = countZ3fs();
                if (fc3d != false) {
                    var count = PlayTypeRule.count(fc3d)
                    //////////////////////console.log(count)
                    var price = count * CPCONFIG.FC3D.UNIT_PRICE;
                    $(".ball-status-bar").removeClass("disabled").html("共" + count + "注," + price + "元")
                } else {
                    $(".ball-status-bar").addClass("disabled").html("每位至少选择 1 个号码球")
                }
            }

            function countZ3fs() {
                var baiN = bai.getSelected();
                var type = PlayTypeRule['fc3d_z3fs'];
                var baiRequired = type.groupdef[0].required;
                if (!baiN || !baiN.length) {
                    return false
                }
                if (baiN.length < baiRequired) {
                    return false
                }
                var fc3dtype = 'fc3d_z3fs';
                var groups = [{
                    dan: null,
                    tuo: baiN
                }]
                return {
                    code: fc3dtype,
                    groups: groups
                }
            }
            $('#buycarfixedbtn .ball-status-bar').unbind().bind('click', function() {
                var fc3d = countZ3fs();
                if (fc3d != false) {
                    var count = PlayTypeRule.count(fc3d)
                    var price = count * CPCONFIG.FC3D.UNIT_PRICE;
                    if(price>CPCONFIG.FC3D.MAX_AMOUNT){
                        dialog("单注投注不能超过"+CPCONFIG.FC3D.MAX_AMOUNT+"元")
                        return false;
                    }
                    fc3d.F3D_ID = ++CACHE_ID;
                    F3D_CAR.push(fc3d)
                    bai.clear();
                    location.href = "#!/car"
                } else {
                    dialog("每位至少选择"+"<span class='wzl-text-warning'>1</span>"+"个号码")
                }
            });
            $(".glyphicon.icon-trash").unbind().bind("click", function() {
                bai.clear();
                total();
            })
            Y_Y(function() {
                var n1 = cp.shuffle({
                    min: 0,
                    max: 9,
                    count: 2
                })
                bai.clear().select(n1)
            })
        }
        /**
         * 组三单式
         */
        function z3ds() {
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow('selectz3ds', '福彩3D-组三单式')
            u_type = "z3ds"
            //重号
            //var chong = fc3dNumberSelect("#selectz3ds .fc3d-bai",total)
            //单号
            //var dan = fc3dNumberSelect("#selectz3ds .fc3d-shi",total)
            var chong = cp.numberSelect({
                min: 0,
                max: 9,
                ispad: false,
                numberSelectBefore: function(f) {
                    if (dan.isSelected(f)) {
                        dialog("单号和重号不能重复！")
                        return false
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
                containerId: "#selectz3ds .fc3d-bai",
                multipleSelect: false
            })
            var dan = cp.numberSelect({
                min: 0,
                max: 9,
                ispad: false,
                numberSelectBefore: function(f) {
                    if (chong.isSelected(f)) {
                        dialog("单号和重号不能重复！")
                        return false
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
                containerId: "#selectz3ds .fc3d-shi",
                multipleSelect: false
            })

            function total() {
                var fc3d = countZ3ds();
                if (fc3d != false) {
                    var count = PlayTypeRule.count(fc3d)
                    var price = count * CPCONFIG.FC3D.UNIT_PRICE;
                    $(".ball-status-bar").removeClass("disabled").html("共" + count + "注," + price + "元")
                } else {
                    $(".ball-status-bar").addClass("disabled").html("每位至少选择 1 个号码球")
                }
            }

            function countZ3ds() {
                var chongN = chong.getSelected(),
                    danN = dan.getSelected();
                var type = PlayTypeRule['fc3d_z3ds'];
                var baiRequired = type.groupdef[0].required;
                if (!chongN || !chongN.length || !danN || !danN.length) {
                    return false
                }
                if (chongN.length < baiRequired || danN.length < baiRequired) {
                    return false
                }
                var fc3dtype = 'fc3d_z3ds';
                var groups = [{
                    dan: chongN.concat(chongN),
                    tuo: danN
                }]
                return {
                    code: fc3dtype,
                    groups: groups
                }
            }
            $('#buycarfixedbtn .ball-status-bar').unbind().bind('click', function() {
                var fc3d = countZ3ds();
                if (fc3d != false) {
                    var count = PlayTypeRule.count(fc3d)
                    var price = count * CPCONFIG.FC3D.UNIT_PRICE;
                    if(price>CPCONFIG.FC3D.MAX_AMOUNT){
                        dialog("单注投注不能超过"+CPCONFIG.FC3D.MAX_AMOUNT+"元")
                        return false;
                    }
                    fc3d.F3D_ID = ++CACHE_ID;
                    F3D_CAR.push(fc3d)
                    chong.clear();
                    dan.clear();
                    location.href = "#!/car"
                } else {
                    dialog("每位至少选择"+"<span class='wzl-text-warning'>1</span>"+"个号码")
                }
            });
            $(".glyphicon.icon-trash").unbind().bind("click", function() {
                chong.clear();
                dan.clear();
                total();
            })
            Y_Y(function() {
                chong.clear()
                dan.clear()
                var n1 = cp.shuffle({
                    min: 0,
                    max: 9,
                    count: 1
                })
                chong.select(n1)
                var n2 = cp.shuffle({
                    pool:uniqe(n1),
                    min: 0,
                    max: 9,
                    count: 1
                })

                dan.select(n2)

                function uniqe(arr) {
                    var r = [],
                        f = 0;
                    for (var n = 0; n <= 9; n++) {
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
            })
        }
        /**
         * 组六复式
         */
        function z6fs() {
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow('selectz6fs', '福彩3D-组六复式')
            u_type = "z6fs"
            //号码
            var hao = fc3dNumberSelect("#selectz6fs .fc3d-bai", total)

            function total() {
                var fc3d = countZ6fs();
                if (fc3d != false) {
                    var count = PlayTypeRule.count(fc3d)
                    var price = count * CPCONFIG.FC3D.UNIT_PRICE;
                    $(".ball-status-bar").removeClass("disabled").html("共" + count + "注," + price + "元")
                } else {
                    $(".ball-status-bar").addClass("disabled").html("每位至少选择 1 个号码球")
                }
            }

            function countZ6fs() {
                var haoN = hao.getSelected();
                var type = PlayTypeRule['fc3d_z6fs'];
                var baiRequired = type.groupdef[0].required;
                if (!haoN || !haoN.length) {
                    return false
                }
                if (haoN.length < baiRequired) {
                    return false
                }
                var fc3dtype = 'fc3d_z6fs';
                var groups = [{
                    dan: null,
                    tuo: haoN
                }];
                return {
                    code: fc3dtype,
                    groups: groups
                }
            }
            $('#buycarfixedbtn .ball-status-bar').unbind().bind('click', function() {
                var fc3d = countZ6fs();
                if (fc3d != false) {
                    var count = PlayTypeRule.count(fc3d)
                    var price = count * CPCONFIG.FC3D.UNIT_PRICE;
                    if(price>CPCONFIG.FC3D.MAX_AMOUNT){
                        dialog("单注投注不能超过"+CPCONFIG.FC3D.MAX_AMOUNT+"元")
                        return false;
                    }
                    fc3d.F3D_ID = ++CACHE_ID;
                    F3D_CAR.push(fc3d)
                    hao.clear();
                    location.href = "#!/car"
                } else {
                    dialog("每位至少选择"+"<span class='wzl-text-warning'>1</span>"+"个号码")
                }
            });
            $(".glyphicon.icon-trash").unbind().bind("click", function() {
                hao.clear();
                total();
            })
            Y_Y(function() {
                var n1 = cp.shuffle({
                    min: 0,
                    max: 9,
                    count: 3
                })
                hao.clear().select(n1)

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
            })
        }
        /**
         * 购物车
         */
        function f3dcar() {
            $('#selectfc3d').fadeOut(function() {
                $('.wzl-nav-dropdown').hide();
                $(".wzl-cartext").removeClass("hidden")
                $('#f3dcar,#carfixed').fadeIn()
                renderCar();
            })

            function renderCar() {
                if (F3D_CAR.length) {
                    $("#car-no-select").addClass('hidden')
                    var result = countCar();
                    var listTemplate = Handlebars.compile($("#ball-select-item").html());
                    $("#ball-select-group").html(listTemplate({
                        list: result.list
                    }));
                    var totalTemplate = Handlebars.compile($("#car-total-template").html());
                    $('#car-total').html(totalTemplate(result.total))
                    $("#car").delegate('.ball-select-remove', 'click', function() {
                        var $id = $(this).parent().data("id");
                        result.remove($id)
                        renderCar();
                    })
                    $("#ssq_hm").unbind().bind("click", function() {
                        dialog('合买暂未开放！')
                    });
                    $('#ssq_buy').unbind().bind("click", function() {
                        //发送购买请求
                        postBuy(function(re) {
                            if (re.resultCode == "200") {
                                result.clear();
                                renderCar()
                                tzsuccess();
                            }
                        });
                    })
                    $("#ball-select-group  .ball-select-remove").unbind().bind("click", function() {
                        var $id = $(this).parent().data("id");
                        //////////////////////console.log($id)
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
                totalBoard(function(qi, bei, zjstop) {
                    F3D_BEI = bei;
                    F3D_QI = qi;
                    F3D_ZJSTOP = zjstop;
                    renderCar();
                })
            }

            function countCar() {
                var r = [],
                    car_count = 0,
                    car_price = 0,
                    total;
                for (var i = 0; i < F3D_CAR.length; i++) {
                    var ritem = {}
                    ritem.count = PlayTypeRule.count(F3D_CAR[i]);
                    ritem.price = ritem.count * CPCONFIG['FC3D'].UNIT_PRICE;
                    ritem.type = type(F3D_CAR[i].code)
                    ritem.code = F3D_CAR[i].code;
                    ritem.id = F3D_CAR[i].F3D_ID
                    car_count += ritem.count
                    car_price += ritem.price
                    //全部是 红球字符串
                    ritem.redStr = strBtype(F3D_CAR[i].code, F3D_CAR[i])
                    ritem._redStr = strBtype(F3D_CAR[i].code, F3D_CAR[i], true)
                    r.push(ritem)
                }

                function strBtype(type, item, notext) {
                    var s = '',
                        _s = "";
                    if (type == "fc3d_fs" || type == "fc3d_ds") {
                        s += "百位:" + item.groups[0].tuo.join(" ") + " "
                        s += "十位:" + item.groups[1].tuo.join(" ") + " "
                        s += "个位:" + item.groups[2].tuo.join(" ") + " "
                        _s += item.groups[0].tuo.join(" ") + ","
                        _s += item.groups[1].tuo.join(" ") + ","
                        _s += item.groups[2].tuo.join(" ")
                    }
                    if (type == "fc3d_hz") {
                        s += item.groups[0].tuo.join(" ")
                        _s += item.groups[0].tuo.join(" ")
                    }
                    if (type == "fc3d_z3ds") {
                        s += "重号:" + item.groups[0].dan[0]
                        s += "单号:" + item.groups[0].tuo.join(" ")
                        _s += item.groups[0].dan.join(" ") + " "
                        _s += item.groups[0].tuo.join(" ")
                    }
                    if (type == 'fc3d_z3fs') {
                        s += item.groups[0].tuo.join(" ")
                        _s += item.groups[0].tuo.join(" ")
                    }
                    if (type == "fc3d_z6fs") {
                        s += item.groups[0].tuo.join(" ")
                        _s += item.groups[0].tuo.join(" ")
                    }
                    return notext ? _s : s;
                }

                function type(t) {
                    var r = '';
                    switch (t) {
                        case "fc3d_hz":
                            r = "直选和值";
                            break;
                        case "fc3d_fs":
                            r = "直选复式";
                            break;
                        case "fc3d_ds":
                            r = "直选单式";
                            break;
                        case "fc3d_z3ds":
                            r = "组三单式";
                            break;
                        case "fc3d_z3fs":
                            r = "组三复式";
                            break;
                        case "fc3d_z6fs":
                            r = "组六复式";
                            break;
                    }
                    return r;
                }

                function remove(id) {
                    for (var j = 0; j < F3D_CAR.length; j++) {
                        if (F3D_CAR[j].F3D_ID == id) {
                            F3D_CAR.splice(j, 1)
                        }
                    }
                }

                function clear() {
                    F3D_CAR = [],
                        //投注倍数
                        F3D_BEI = 1,
                        //投注期次
                        F3D_QI = 1,
                        //是否追加
                        F3D_ZJ = false,
                        //中奖是否停止追加
                        F3D_ZJSTOP = false;
                }
                total = {
                    bei: F3D_BEI,
                    qi: F3D_QI,
                    count: car_count,
                    price: car_price * F3D_QI * F3D_BEI,
                    zjstop: F3D_ZJSTOP,
                    zj: F3D_ZJ
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
            function getOneF3d() {
                var bai = cp.shuffle({
                    min: 0,
                    max: 9,
                    count: 1
                })
                var shi = cp.shuffle({
                    min: 0,
                    max: 9,
                    count: 1
                })
                var ge = cp.shuffle({
                    min: 0,
                    max: 9,
                    count: 1
                })
                var hezhi = cp.shuffle({
                    min: 0,
                    max: 27,
                    count: 1
                })
                var z3fs = cp.shuffle({
                    min: 0,
                    max: 9,
                    count: 2
                })
                var z3dsc = cp.shuffle({
                    min: 0,
                    max: 9,
                    count: 1
                })
                var  a = uniqe(z3dsc)
                ////////////console.log(a)
                var z3dsd = cp.shuffle({
                    pool: uniqe(z3dsc),
                    min: 0,
                    max: 9,
                    count: 1
                })
                var z6fs = cp.shuffle({
                    min: 0,
                    max: 9,
                    count: 3
                })
                var fc3d;
                switch (u_type) {
                    case "zxfs":
                        fc3d = {
                            code: 'fc3d_ds',
                            groups: [{
                                dan: null,
                                tuo: bai
                            }, {
                                dan: null,
                                tuo: shi
                            }, {
                                dan: null,
                                tuo: ge
                            }]
                        }
                        break;
                    case "zxhz":
                        fc3d = {
                            code: 'fc3d_hz',
                            groups: [{
                                dan: null,
                                tuo: replaceHz(hezhi)
                            }]
                        }
                        break;
                    case "z3ds":
                        fc3d = {
                            code: 'fc3d_z3ds',
                            groups: [{
                                dan: z3dsc.concat(z3dsc),
                                tuo: z3dsd
                            }]
                        }
                        break;
                    case "z3fs":
                        fc3d = {
                            code: 'fc3d_z3fs',
                            groups: [{
                                dan: null,
                                tuo: z3fs
                            }]
                        }
                        break;
                    case "z6fs":
                        fc3d = {
                            code: 'fc3d_z6fs',
                            groups: [{
                                dan: null,
                                tuo: z6fs
                            }]
                        }
                        break;
                }
                fc3d.F3D_ID = ++CACHE_ID
                return fc3d;

                function uniqe(arr) {
                    var r = [],
                        f = 0;
                    for (var n = 0; n <= 9; n++) {
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
                function replaceHz(arr){
                    var re =[];
                    for(var i=0;i<arr.length;i++){
                        re.push(String(arr[i]))
                    }
                    return re;
                }
            }
            $('#car-addhm').bind('click', function() {
                location.href = "#!/zxfs"
            })
            $("#car-addjx").unbind().bind('click', function() {
                var fc3d = getOneF3d();
                F3D_CAR.push(fc3d)
                renderCar();
            })
            $(".glyphicon.icon-trash").unbind().bind("click", function() {
                var s = countCar()
                s.clear();
                renderCar();
            })
            /*投注成功*/
            function tzsuccess() {
                $("#car,#selectfc3d,#f3dcar,#carfixed,#buycarfixedbtn").hide();
                $("#tzsuccess").show();
            }
            /**
             * 用户购买数据整合
             * @returns {*}
             */
            function userBuyData() {
                var f3dCar = countCar()
                //////////////////////console.log(f3dCar)
                if (!f3dCar) return null;
                var d = {
                    //证件类型  1身份证 2 军官证 3护照
                    // carType:"",
                    //彩票类型
                    gameType: "002",
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
                d.needPay = f3dCar.total.price;
                //
                d.lotoGson = mergeTZ();
                /**
                 * 投注串 数据整合
                 */
                function mergeTZ() {
                    if (!f3dCar) return false;
                    var need = {
                        //彩票类型
                        gameType: "002",
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
                    need.totalSum = Number(f3dCar.total.price);
                    need.isStop = f3dCar.total.zjstop ? 1 : 0;
                    need.buyNumberArray = buyArrayGenerator(f3dCar.list)
                    need.buyType = f3dCar.total.qi > 1 ? 1 : 0;
                    need.title = f3dCar.total.qi > 1 ? "福彩3d" + F3D_NOWQI + "期追号方案" : "福彩3d" + F3D_NOWQI + "期追号方案";
                    // xian ajax =
                    return need;
                }
                //组三复式串 计算
                function countZ3fs(arr1) {
                    var re = []
                    var len = arr1.length;
                    for (var k = 0; k < len - 1; k++) {
                        for (var l = k + 1; l < len; l++) {
                            if (arr1[k] < arr1[l]) {
                                re.push({
                                    _redStr: arr1[k] + " " + arr1[k] + " " + arr1[l],
                                    code: "fc3d_z3ds",
                                    count: 1,
                                    price: 2,
                                    type: "组三单式"
                                });
                                re.push({
                                    _redStr: arr1[k] + " " + arr1[l] + " " + arr1[l],
                                    code: "fc3d_z3ds",
                                    count: 1,
                                    price: 2,
                                    type: "组三单式"
                                });
                            } else {
                                re.push({
                                    _redStr: arr1[l] + "," + arr1[k] + "," + arr1[k],
                                    code: "fc3d_z3ds",
                                    count: 1,
                                    price: 2,
                                    type: "组三单式"
                                });
                                re.push({
                                    _redStr: arr1[l] + "," + arr1[l] + "," + arr1[k],
                                    code: "fc3d_z3ds",
                                    count: 1,
                                    price: 2,
                                    type: "组三单式"
                                });
                            }
                        }
                    }
                    //re = re.slice(0,re.length-1)
                    return re;
                }
                //组六复式窜 计算
                function countZ6fs(arr1) {
                    var re = [];
                    var len = arr1.length;
                    for (var j = 0; j < len - 2; j++) {
                        for (var k = j + 1; k < len - 1; k++) {
                            for (var l = k + 1; l < len; l++) {
                                var arr2 = []
                                arr2.push(arr1[j]);
                                arr2.push(arr1[k]);
                                arr2.push(arr1[l]);
                                arr2 = sortA(arr2);
                                re.push({
                                    _redStr: arr2[0] + " " + arr2[1] + " " + arr2[2],
                                    code: "fc3d_z6ds",
                                    count: 1,
                                    price: 2,
                                    type: "组六"
                                });
                            }
                        }
                    }

                    function sortA(arr) {
                        return arr.sort(function(a, b) {
                            return a - b
                        })
                    }
                    return re;
                }
                //投注号码串数据
                function buyArrayGenerator(list) {
                    var r = [];
                    $(list).each(function(index, item) {
                        if (!item) return;
                        var it;
                        //组三复式处理规则
                        if (item.code == "fc3d_z3fs") {
                            var zxfsArr = countZ3fs(item.redStr.split(" "))
                            $(zxfsArr).each(function(index, item2) {
                                r.push(join(item2))
                            })
                        } else  if (item.code == "fc3d_z6fs") {
                            var z6fsArr = countZ6fs(item.redStr.split(" "))
                            $(z6fsArr).each(function(index, item2) {
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
                        var rs = item._redStr.split(" ").join(',')
                        dataTmp.buyNumber = rs;
                        dataTmp.sum = CPCONFIG.FC3D.UNIT_PRICE;
                        dataTmp.num = item.count;
                        dataTmp.multiple = f3dCar.total.bei;
                        switch (item.code) {
                            case "fc3d_fs":
                                dataTmp.typeId = "01"
                                dataTmp.seleId = "02"
                                dataTmp.sum = item.price;
                                dataTmp.buyNumber = item._redStr;
                                break;
                            case "fc3d_ds":
                                dataTmp.typeId = "01"
                                dataTmp.seleId = "01"
                                break;
                            case "fc3d_hz":
                                dataTmp.typeId = "01"
                                dataTmp.seleId = "04"
                                dataTmp.sum = item.price;
                                break;
                            case "fc3d_z3ds":
                                dataTmp.typeId = "02"
                                dataTmp.seleId = "01"
                                break;
                            case "fc3d_z3fs":
                                dataTmp.typeId = "02"
                                dataTmp.seleId = "02"
                                break;
                            case "fc3d_z6ds":
                                dataTmp.typeId = "03"
                                dataTmp.seleId = "01"
                                break;
                            case "fc3d_z6fs":
                                dataTmp.typeId = "03"
                                dataTmp.seleId = "02"
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
                        lottery: "FC3D",
                        issues: f3dCar.total.qi || F3D_QI
                    }, function(re) {
                        r = merge(re)
                        fn(r)
                    })

                    function merge(list) {
                        var r = [];
                        $(list).each(function(index, item) {
                            r.push({
                                issue: item.issue,
                                multiple: f3dCar.total.bei
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
                    if (!r || !r.length) return dialog("投注异常，请重试")
                    udata.lotoGson.issueArray = r;
                    udata.lotoGson = JSON.stringify(udata.lotoGson)
                    //////////////////////console.log(udata.lotoGson)
                    action.ssqTz(udata, function(re) {
                        TZ_INFO($.parseJSON(re), fn)
                    })
                })
            }
        }


});