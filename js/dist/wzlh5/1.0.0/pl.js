/**
 * Created by hebo (razr409355439@gmail.com)on 15/1/7.
 */

define("wzlh5/1.0.0/pl",["jquery/2.1.1/jquery","wzlh5/1.0.0/ac","handlebars/1.3.0/dist/cjs/handlebars",'wzlh5/1.0.0/until',"wzlh5/1.0.0/cp","wzlh5/1.0.0/ui"],function (require, exports, module) {
    var $ = require("jquery/2.1.1/jquery")
    var until = require("wzlh5/1.0.0/until")
    var action = require("wzlh5/1.0.0/ac")
    var wzlui = require("wzlh5/1.0.0/ui")
    var cp = require("wzlh5/1.0.0/cp")
    var Handlebars = require("handlebars/1.3.0/dist/cjs/handlebars").default;
//	var qrCode = href().qrCode;
//	var qrType = href().qrType;
    var pops = wzlui.containerMask,
        iscrollPop = wzlui.iscrollPop,
        dialog = wzlui.dialog,
        containerMask = wzlui.containerMask,
        dropdownMask = wzlui.dropdownMask,
        Y_Y = until.Y_Y,
        TZ_INFO = until.TZ_INFO;
        
    

    var Router = until.Router;
    function pl3(){
			$('.navbar-header').on('click','.icon-more',function(){	
                $('.drop-down-more').toggle();
            })
            //购物车数据 全局通用
            var PL3_CAR = [],
            //投注倍数
                PL3_BEI = 1,
            //投注期次
                PL3_QI = 1,
            //是否追加
                PL3_ZJ = false,
            //中奖是否停止追加
                PL3_ZJSTOP = false,
                PL3_NOWQI = null,
                CACHE_ID = 0,
                u_type = "zxfs",
                PlayTypeRule = cp.PlayTypeRule,
                CPCONFIG = cp.CONFIG,
                untils = until,
                stop_control=true;
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
                    PL3car();
                },
                "index": function() {
                    zxfs()
                },
                "init": function() {
                    init();
                }//
            }
            Router(routes);

            function init() {
            	
                $.wzlhistory("pl3", function(d) {
                    PL3_NOWQI = d.issue;
                });
                $('.wzl-nav-dropdown').click(function() {
                    dropdownMask.toggle();
                })
               
                	
                
//              $.wzlmore(function(d) {
//                  $('.' + $(d).attr('class')).on('click', function() {
//                  })
//              });
                //请求 userinfo 用于同步
                action.queryUserInfo({},function(){})

                //渲染遗漏
                action.yl('pls',{},function (re){
                    if(re.resultCode=='200'){
                        fomatYl(re.data);
                    }else{

                    }
                })

                function fomatYl(d){
                    var allArr=d.split(",");

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
                	console.log(666)
                    $('.ballcon-right em').toggle()
                })
                //查询是否停售
                action.getControl(function(re){
                    if(re[108]===false){
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
                $(".wzl-cartext").addClass("hidden")
                $("#fc3dplays").show();
                $("#fc3dplays>div,#f3dcar").not("#" + v).hide(function() {
                    $('#' + v + ', #buycarfixedbtn').show();
                    $('.wzl-nav-dropdown').text(title).show();
                    fn && fn();
                })
                $(".ball-status-bar.icon-right").addClass("disabled").html("添加购物车")
            }
            /**
             * 排列3选好器
             * @param containerId  父级id
             * @param total
             * @returns {NumberSelect|*}
             */
            function fc3dNumberSelect(containerId, total, before,ispad) {
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
                publicShow('selectzxfs', '排列三-直选复式')
                u_type = "zxfs"
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
                        var price = count * CPCONFIG.PL3.UNIT_PRICE;
                        $(".ball-status-bar").removeClass("disabled").html("共" + count + "注," + price + "元")
                    } else {
                        $(".ball-status-bar").addClass("disabled").html("添加购物车")
                    }
                }

                function countZxfs() {
                    var baiN = bai.getSelected(),
                        shiN = shi.getSelected(),
                        geN = ge.getSelected();
                    var type = PlayTypeRule['pl3_fs'];
                    var baiRequired = type.groupdef[0].required,
                        shiRequired = type.groupdef[1].required,
                        geRequired = type.groupdef[2].required;
                    if (!baiN || !baiN.length || !shiN || !shiN.length || !geN || !geN.length) {
                        return false
                    }
                    if (baiN.length < baiRequired || shiN.length < shiRequired || geN.length < geRequired) {
                        return false
                    }
                    var pl3type;
                    if (baiN.length == baiRequired && shiN.length == shiRequired && geN.length == geRequired) {
                        pl3type = 'pl3_ds'
                    } else {
                        pl3type = 'pl3_fs'
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
                        code: pl3type,
                        groups: groups
                    }
                }
                $('#buycarfixedbtn .ball-status-bar').unbind().bind('click', function() {
                	
                    var pl3 = countZxfs();
                    if (pl3 != false) {
                        pl3.PL3_ID = ++CACHE_ID;
                        PL3_CAR.push(pl3)
                        bai.clear();
                        shi.clear();
                        ge.clear();
		  
                   // localStorage.setItem("PL3_CAR",JSON.stringify(PL3_CAR));

                        location.href = "#!/car"
                    } else {
                        dialog("每位至少选择"+"<span class='wzl-text-warning'>1</span>"+"个号码")
                    }
                });
                $(".glyphicon.icon-trash").on("click", function() {
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
                    var n1 = cp.shuffle({
                        min: 0,
                        max: 9,
                        count: 1
                    })
                    shi.clear().select(n1)
                    var n1 = cp.shuffle({
                        min: 0,
                        max: 9,
                        count: 1
                    })
                    ge.clear().select(n1)
                })
            }
            /**
             * 直选和值
             */
            function zxhz() {
                //选择玩法后如果记录是显示的让他隐藏
                $('.history-list').hide();
                publicShow('selectzxhz', '排列三-直选和值')
                u_type = "zxhz"
                //百位
                var heizhi = cp.numberSelect({
                    min: 0,
                    max: 9,
                    ispad:false,
                    numberSelectBefore: function(f) {},
                    numberSelectAfter: function(f) {
                        total()
                    },
                    numberUnSelectAfter: function(f) {
                        total()
                    },
                    //dom 类
                    selectStyle: ".red_balls",
                    //
                    containerId: "#selectzxhz .fc3d-hezhi" ,
                    //多选
                    multipleSelect: false
                })

                function total() {
                    var fc3d = countZxhz(),
                        count = 0;
                    if (fc3d != false) {
                        count = PlayTypeRule.count(fc3d)
                        var price = count * CPCONFIG.PL3.UNIT_PRICE;
                        $(".ball-status-bar").removeClass("disabled").html("共" + count + "注," + price + "元")
                    } else {
                        $(".ball-status-bar").addClass("disabled").html("添加购物车")
                    }
                }

                function countZxhz() {
                    var hzN = heizhi.getSelected();
                    var type = PlayTypeRule['pl3_hz'];
                    var hzRequired = type.groupdef[0].required
                    if (!hzN || !hzN.length) {
                        return false
                    }
                    if (hzN.length < hzRequired) {
                        return false
                    }
                    var fc3dtype = 'pl3_hz';
                    var groups = [{
                        dan: null,
                        tuo: (hzN)
                    }]
                    return {
                        code: fc3dtype,
                        groups: groups
                    }
                }
                $('#buycarfixedbtn .ball-status-bar').unbind().bind('click', function() {
                    var pl3 = countZxhz();
                    if (pl3 != false) {
                        pl3.PL3_ID = ++CACHE_ID;
                        PL3_CAR.push(pl3)
                        heizhi.clear();
                        location.href = "#!/car"
                    } else {
                        dialog("每位至少选择"+"<span class='wzl-text-warning'>1</span>"+"个号码")
                    }
                });
                $(".glyphicon.icon-trash").on("click", function() {
                    heizhi.clear();
                    total();
                })
                Y_Y(function() {
                    var n1 = cp.shuffle({
                        min: 0,
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
                publicShow('selectz3fs', '排列三-组三复式')
                u_type = "z3fs"
                //
                var bai = fc3dNumberSelect("#selectz3fs .fc3d-bai", total)

                function total() {
                    var fc3d = countZ3fs();
                    if (fc3d != false) {
                        var count = PlayTypeRule.count(fc3d)
                        var price = count * CPCONFIG.PL3.UNIT_PRICE;
                        $(".ball-status-bar").removeClass("disabled").html("共" + count + "注," + price + "元")
                    } else {
                        $(".ball-status-bar").addClass("disabled").html("添加购物车")
                    }
                }

                function countZ3fs() {
                    var baiN = bai.getSelected();
                    var type = PlayTypeRule['pl3_z3fs'];
                    var baiRequired = type.groupdef[0].required;
                    if (!baiN || !baiN.length) {
                        return false
                    }
                    if (baiN.length < baiRequired) {
                        return false
                    }
                    var fc3dtype = 'pl3_z3fs';
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
                    var pl3 = countZ3fs();
                    if (pl3 != false) {
                        pl3.PL3_ID = ++CACHE_ID;
                        PL3_CAR.push(pl3)
                        bai.clear();
                        location.href = "#!/car"
                    } else {
                        dialog("每位至少选择"+"<span class='wzl-text-warning'>1</span>"+"个号码")
                    }
                });
                $(".glyphicon.icon-trash").on("click", function() {
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
                publicShow('selectz3ds', '排列三-组三单式')
                u_type = "z3ds"
                var chong = cp.numberSelect({
                    min: 0,
                    max: 9,
                    ispad: false,
                    numberSelectBefore: function(f) {
                        if(dan.isSelected(f)){
                            dialog('已经选择了相同的单号')
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
                    containerId: "#selectz3ds .fc3d-bai",
                    multipleSelect: false
                })
                var dan = cp.numberSelect({
                    min: 0,
                    max: 9,
                    ispad: false,
                    numberSelectBefore: function(f) {
                        if(chong.isSelected(f)){
                            dialog('已经选择了相同的重号')
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
                    containerId: "#selectz3ds .fc3d-shi",
                    multipleSelect: false
                })

                function total() {
                    var fc3d = countZ3ds();
                    if (fc3d != false) {
                        var count = PlayTypeRule.count(fc3d)
                        var price = count * CPCONFIG.PL3.UNIT_PRICE;
                        $(".ball-status-bar").removeClass("disabled").html("共" + count + "注," + price + "元")
                    } else {
                        $(".ball-status-bar").addClass("disabled").html("添加购物车")
                    }
                }

                function countZ3ds() {
                    var chongN = chong.getSelected(),
                        danN = dan.getSelected();
                    var type = PlayTypeRule['pl3_z3ds'];
                    var baiRequired = type.groupdef[0].required;
                    if (!chongN || !chongN.length || !danN || !danN.length) {
                        return false
                    }
                    if (chongN.length < baiRequired || danN.length < baiRequired) {
                        return false
                    }
                    var fc3dtype = 'pl3_z3ds';
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
                    var pl3 = countZ3ds();
                    if (pl3 != false) {
                        pl3.PL3_ID = ++CACHE_ID;
                        PL3_CAR.push(pl3)
                        chong.clear();
                        dan.clear();
                        location.href = "#!/car"
                    } else {
                        dialog("每位至少选择"+"<span class='wzl-text-warning'>1</span>"+"个号码")
                    }
                });
                $(".glyphicon.icon-trash").on("click", function() {
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
                    chong.clear().select(n1)
                    var n1 = cp.shuffle({
                        min: 0,
                        max: 9,
                        count: 1
                    })
                    dan.clear().select(n1)
                })
            }
            /**
             * 组六复式
             */
            function z6fs() {
                //选择玩法后如果记录是显示的让他隐藏
                $('.history-list').hide();
                publicShow('selectz6fs', '排列三-组六复式')
                u_type = "z6fs"
                //号码
                var hao = fc3dNumberSelect("#selectz6fs .fc3d-bai", total)

                function total() {
                    var fc3d = countZ6fs();
                    if (fc3d != false) {
                        var count = PlayTypeRule.count(fc3d)
                        var price = count * CPCONFIG.PL3.UNIT_PRICE;
                        $(".ball-status-bar").removeClass("disabled").html("共" + count + "注," + price + "元")
                    } else {
                        $(".ball-status-bar").addClass("disabled").html("添加购物车")
                    }
                }

                function countZ6fs() {
                    var haoN = hao.getSelected();
                    var type = PlayTypeRule['pl3_z6fs'];
                    var baiRequired = type.groupdef[0].required;
                    if (!haoN || !haoN.length) {
                        return false
                    }
                    if (haoN.length < baiRequired) {
                        return false
                    }
                    var fc3dtype = 'pl3_z6fs';
                    if(haoN.length==baiRequired){
                        fc3dtype = 'pl3_z6ds';
                    }
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
                    var pl3 = countZ6fs();
                    if (pl3 != false) {
                        pl3.PL3_ID = ++CACHE_ID;
                        PL3_CAR.push(pl3)
                        hao.clear();
                        location.href = "#!/car"
                    } else {
                        dialog("每位至少选择"+"<span class='wzl-text-warning'>1</span>"+"个号码")
                    }
                });
                $(".glyphicon.icon-trash").on("click", function() {
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
                })
            }
            /**
             * 购物车
             */
            function PL3car() {
                $('#fc3dplays,#pl3-history').fadeOut(function() {
                    $('.wzl-nav-dropdown').hide();
                    $(".wzl-cartext").removeClass("hidden");
                    $('#f3dcar,#carfixed').fadeIn()
                    renderCar();
                })
                function renderCar() {
			//||localStorage.getItem("PL3_CAR")
                    if (PL3_CAR.length) {
                        $("#car-no-select").addClass('hidden')
                        var result = countCar();
                        var listTemplate = Handlebars.compile($("#ball-select-item").html());
                        $("#ball-select-group").html(listTemplate({
                            list: result.list
                        }));
                        var totalTemplate = Handlebars.compile($("#car-total-template").html());
                        $('#car-total').html(totalTemplate(result.total));
		      //判断二维码是否使用，如果使用隐藏下面提示
	      		localStorage.getItem("bottomBox")==1?$("#oBalance").hide():'';
                        $("#f3dcar").delegate('.ball-select-remove', 'click', function() {
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
                        PL3_BEI = bei;
                        PL3_QI = qi;
                        PL3_ZJSTOP = zjstop;
                        renderCar();
                    })
                }

                function countCar() {
                    var r = [],
                        car_count = 0,
                        car_price = 0,
                        total;
		//var PL3_CAR = JSON.parse(localStorage.getItem("PL3_CAR"))||PL3_CAR;
                    for (var i = 0; i < PL3_CAR.length; i++) {
                        var ritem = {}
                        ritem.count = PlayTypeRule.count(PL3_CAR[i]);
                        ritem.price = ritem.count * CPCONFIG['PL3'].UNIT_PRICE;
                        ritem.type = type(PL3_CAR[i].code)
                        ritem.code = (PL3_CAR[i].code)
                        ritem.id = PL3_CAR[i].PL3_ID
                        car_count += ritem.count
                        car_price += ritem.price
                        //全部是 红球字符串
                        ritem.redStr = strBtype(PL3_CAR[i].code, PL3_CAR[i])
                        ritem._redStr = strBtype(PL3_CAR[i].code, PL3_CAR[i], true)
                        r.push(ritem)
                    }

                    function strBtype(type, item, notext) {
                        var s = '',
                            _s = "";
                        if (type == "pl3_fs" || type == "pl3_ds") {
                            s += "百位:" + item.groups[0].tuo.join(" ") + " "
                            s += "十位:" + item.groups[1].tuo.join(" ") + " "
                            s += "个位:" + item.groups[2].tuo.join(" ") + " "
                            _s += item.groups[0].tuo.join(" ") + ","
                            _s += item.groups[1].tuo.join(" ") + ","
                            _s += item.groups[2].tuo.join(" ")
                        }
                        if (type == "pl3_hz") {
                            s += item.groups[0].tuo.join(" ")
                            _s += pl3pad(item.groups[0].tuo).join(" ")
                        }
                        if (type == "pl3_z3ds") {
                            s += "重号:" + item.groups[0].dan.join(" ")
                            s += "单号:" + item.groups[0].tuo.join(" ")
                            _s += item.groups[0].dan.join(" ") + " "
                            _s += item.groups[0].tuo.join(" ")
                        }
                        if (type == 'pl3_z3fs') {
                            s += item.groups[0].tuo.join(" ")
                            _s += item.groups[0].tuo.join(" ")
                        }
                        if (type == "pl3_z6fs"||type == "pl3_z6ds") {
                            s += item.groups[0].tuo.join(" ")
                            _s += item.groups[0].tuo.join(" ")
                        }
                        function pl3pad(r){
                            var s = []
                            for(var i=0;i< r.length;i++){
                                if(r[i]<10){
                                    s.push("0"+r[i])
                                }else{
                                    s.push(r[i])
                                }
                            }
                            return s;
                        }
                        return notext ? _s : s;
                    }

                    function type(t) {
                        var r = '';
                        switch (t) {
                            case "pl3_hz":
                                r = "直选和值";
                                break;
                            case "pl3_fs":
                                r = "直选复式";
                                break;
                            case "pl3_ds":
                                r = "直选单式";
                                break;
                            case "pl3_z3ds":
                                r = "组三单式";
                                break;
                            case "pl3_z3fs":
                                r = "组三复式";
                                break;
                            case "pl3_z6fs":
                                r = "组六复式";
                                break;
                            case "pl3_z6ds":
                                r = "组六单式";
                                break;
                        }
                        return r;
                    }

                    function remove(id) {
                        for (var j = 0; j < PL3_CAR.length; j++) {
                            if (PL3_CAR[j].PL3_ID == id) {
                                PL3_CAR.splice(j, 1)
                            }
                        }
                    }

                    function clear() {
                        PL3_CAR = [],
                            //投注倍数
                            PL3_BEI = 1,
                            //投注期次
                            PL3_QI = 1,
                            //是否追加
                            PL3_ZJ = false,
                            //中奖是否停止追加
                            PL3_ZJSTOP = false;
                    }
                    function pad(arr){
                        var r =[];
                        for(var i=0;i<arr.length;i++){
                            r.push('0'+arr[i])
                        }
                        return r;
                    }
		var money = localStorage.getItem("money");
 		var b = (car_price * PL3_QI * PL3_BEI);
		var fff =  (money-b)/2;
		var ff = fff.toString();
		var f =  ff.indexOf("-");
		if(f==0){
		       fff = 0;
		}else{
		       fff = fff;
		}

                    total = {
                        bei: PL3_BEI,
                        qi: PL3_QI,
                        count: car_count,
                        price: car_price * PL3_QI * PL3_BEI,
		          money: fff,
                        zjstop: PL3_ZJSTOP,
                        zj: PL3_ZJ
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
                function getOnePL3() {
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
                    var z3ds =  cp.shuffle({
                        pool:uniqe(ge),
                        min: 0,
                        max: 9,
                        count: 1
                    })
                    var hezhi = cp.shuffle({
                        min: 0,
                        max: 27,
                        count: 1
                    })
                    var z6fs = cp.shuffle({
                        min: 0,
                        max: 9,
                        count: 3
                    })
                    var pl3 = {
                        code: 'pl3_ds',
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
                    //zxfs   u_type="zxhz"     u_type="z3fs"   u_type="z6fs"
                    switch (u_type) {
                        case "zxfs":
                            pl3 = {
                                code: 'pl3_ds',
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
                            pl3 = {
                                code: 'pl3_hz',
                                groups: [{
                                    dan: null,
                                    tuo: replaceHz(hezhi)
                                }]
                            }
                            break;
                        case "z3ds":
                            pl3 = {
                                code: 'pl3_z3ds',
                                groups: [{
                                    dan: ge.concat(ge),
                                    tuo: shi
                                }]
                            }
                            break;
                        case "z3fs":
                            pl3 = {
                                code: 'pl3_z3fs',
                                groups: [{
                                    dan: null,
                                    tuo: shi.concat(bai)
                                }]
                            }
                            break;
                        case "z6fs":
                            pl3 = {
                                code: 'pl3_z6fs',
                                groups: [{
                                    dan: null,
                                    tuo: z6fs
                                }]
                            }
                            break;
                    }
                    pl3.PL3_ID = ++CACHE_ID
                    return pl3;
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
                        //////////////////////console.log(r)
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
                    var pl3 = getOnePL3();
                    PL3_CAR.push(pl3)
                    renderCar();
                })
                $(".glyphicon.icon-trash").on("click", function() {
                    var s = countCar();
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
                    var pl3Car = countCar();
                   
                    if (!pl3Car) return null;
                    var d = {
                        //证件类型  1身份证 2 军官证 3护照
                        // carType:"",
                        //彩票类型
                        gameType: "108",
                        format: "ajax",
                        //需要支付金额
                        needPay: "",
                        //投注串
                        lotoGson:{
                        	
                        }
                    }
                    //需要支付
                    d.needPay = pl3Car.total.price;
                    //
                    d.lotoGson = mergeTZ();
                    console.log(d.lotoGson);
                    /**
                     * 投注串 数据整合
                     */
                    function mergeTZ() {
                        if (!pl3Car) return false;
                        var need = {
                        	//二维码加密码
                        	qrCode: '',
                        	//是否购买二微码
                        	qrType: "",
                            //彩票类型
                            lotoid: "108",
                            //投注来源
                            source: '6',
                            //中奖是否停止 0、1
                            winStop: "",
                            //投注类型 0 代购 1 追号 2 合买
                            bettype: "0",
                            //票信息数组
                            bet: "",
                            //期次信息数组
                            issue: [],
                            //方案标题
                            //title: "0",
                            //方案描述
                           // explain: "0",
                            //是否保密 1 公开 2相对保密 3完全保密
                           // secrecy: "1",
                            //是否上传方案 1 是  其他否  2是胜负彩过滤投注
                            //isUp:"0",
                           // splitAmount: "0",
                            //是否先发方案标识  0 常规合买  1 先发方案再上传号
                            //isUpload: "0",
                            //关联ID
                           // projectid: "0",
                            //buyAmount: 0,
                            //floorsAmount: "0",
                            //标识是否为竞彩专业版订单 0不是 1 是
                            //ishigh:"0",
                            amount: "0"
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
                        need.amount = Number(pl3Car.total.price)//amount订单金额
                        need.winStop = pl3Car.total.zjstop ? 1 : 0;    2017/12/05
                        need.bet = buyArrayGenerator(pl3Car.list)
                        need.bettype = pl3Car.total.qi > 1 ? 1 : 0;    2017/12/05
                       // need.title = pl3Car.total.qi > 1 ? "排列三" + PL3_NOWQI + "期追号方案" : "排列三" + PL3_NOWQI + "期追号方案";
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
                                        code: "pl3_z3ds",
                                        count: 1,
                                        price: 2,
                                        type: "组三单式"
                                    });
                                    re.push({
                                        _redStr: arr1[k] + " " + arr1[l] + " " + arr1[l],
                                        code: "pl3_z3ds",
                                        count: 1,
                                        price: 2,
                                        type: "组三单式"
                                    });
                                } else {
                                    re.push({
                                        _redStr: arr1[l] + "," + arr1[k] + "," + arr1[k],
                                        code: "pl3_z3ds",
                                        count: 1,
                                        price: 2,
                                        type: "组三单式"
                                    });
                                    re.push({
                                        _redStr: arr1[l] + "," + arr1[l] + "," + arr1[k],
                                        code: "pl3_z3ds",
                                        count: 1,
                                        price: 2,
                                        type: "组三单式"
                                    });
                                }
                            }
                        }
                        return re;
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
                            var it;
                            //组三复式处理规则

                            it = join(item)

                            it && r.push(it);
                        })
                        function join(item) {
                            var dataTmp = {
                                "detail": "",
                                "typeId": "00",
                                "seleId": "01",
                                "multiple": 1
                            };
                            if (!item || !item.count) return false;
                            var rs = item._redStr.split(" ").join(',')
                            dataTmp.detail = rs;
                            //dataTmp.sum = CPCONFIG.PL3.UNIT_PRICE;
                            //dataTmp.multiple = pl3Car.total.bei;
                            switch (item.code) {
                                case "pl3_fs":
                                    dataTmp.typeId = "01"
                                    dataTmp.seleId = "02"
                                    dataTmp.sum = item.price;
                                    dataTmp.detail = item._redStr;
                                    break;
                                case "pl3_ds":
                                    dataTmp.typeId = "01"
                                    dataTmp.seleId = "01"
                                    break;
                                case "pl3_hz":
                                    dataTmp.typeId = "01"
                                    dataTmp.seleId = "04"
                                    dataTmp.sum = item.price;
                                    break;
                                case "pl3_z3ds":
                                    dataTmp.typeId = "03"
                                    dataTmp.seleId = "01"
                                    break;
                                case "pl3_z3fs":
                                    dataTmp.typeId = "03"
                                    dataTmp.seleId = "02"
                                    dataTmp.sum = item.price;
                                    break;
                                case "pl3_z6fs":
                                    dataTmp.typeId = "04"
                                    dataTmp.seleId = "02"
                                    dataTmp.sum = item.price;
                                    break;
                                case "pl3_z6ds":
                                    dataTmp.typeId = "04"
                                    dataTmp.seleId = "01"
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
                            lottery: "PL3",
                            issues: pl3Car.total.qi || PL3_QI
                        }, function(re) {
                            r = merge(re)
                            fn(r)
                        })

                        function merge(list) {
                            var r = [];
                            $(list).each(function(index, item) {
                                r.push({
                                    issue: item.issue,
                                    multiple: pl3Car.total.bei
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
                    
                    //dialog("loading", "正在投注！")
                   
                    u.getIssue(function(r) {
                    	 
                        if (!r || !r.length) return dialog("投注异常，请重试")
                        udata.lotoGson.issue = r;
                        
                        udata.lotoGson =JSON.stringify(udata.lotoGson);
                   
                        action.ssqTz(udata.lotoGson , function(re) {
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

    }

    function pl5(){
			$('.navbar-header').on('click','.icon-more',function(){
                	
                	$('.drop-down-more').toggle();
            })
            var routes = {
                "/car": function() {
                    PL5car()
                },
                "/dg": function() {
                    index()
                },
                "index": function() {
                    index()
                },
                "init": function() {
                    init();
                }
            }
            Router(routes);
            var PL5_CAR = [],
            //投注倍数
                PL5_BEI = 1,
            //投注期次
                PL5_QI = 1,
            //是否追加
                PL5_ZJ = false,
            //中奖是否停止追加
                PL5_ZJSTOP = false,
                PL5_NOWQI = null,
                CACHE_ID = 0,
                PlayTypeRule = cp.PlayTypeRule,
                CPCONFIG = cp.CONFIG,
                stop_control=true;

            function init() {
                //$.wzlmore();
                $.wzlhistory("pl5", function(d) {
                    PL5_NOWQI = d.issue
                });
                $(".jc-match-i").on("click", function() {
                    $("#selectjc,#jc-match").slideToggle();
                })
                //请求 userinfo 用于同步
                action.queryUserInfo({},function(){})
                //渲染遗漏
                action.yl('plw',{},function (re){
                    if(re.resultCode=='200'){
                        fomatYl(re.data);
                    }else{

                    }
                })
                function fomatYl(d){
                    var allArr=d.split(",");
                    //////////console.log(allArr);

                    for (i=6;i<=15;i++){
                        $('#yla em').eq(i-6).text(allArr[i])
                    }

                    for (i=16;i<=25;i++){
                        $('#ylb em').eq(i-16).text(allArr[i])
                    }

                    for (i=26;i<=35;i++){
                        $('#ylc em').eq(i-26).text(allArr[i])
                    }

                    for (i=36;i<=45;i++){
                        $('#yld em').eq(i-36).text(allArr[i])
                    }

                    for (i=46;i<=55;i++){
                        $('#yle em').eq(i-46).text(allArr[i])
                    }

                }

                $('.ballcon-yilou').on('click', function (){
                    $('.ballcon-right em').toggle()
                });
                //查询是否停售
                action.getControl(function(re){
                    if(re[109]===false){
                        stop_control=false
                        dialog("该彩种已经停售!")
                    }
                })

            }
            function pl5NumberSelect(containerId, total, before, multipleSelect) {
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
                $('.wzl-nav-dropdown,#pl5plays,#pl5-history').show();
                $('#f3dcar, #carfixed').hide();
                $(".wzl-cartext").addClass("hidden")
                var wan = pl5NumberSelect("#pl5plays .pl5-wan", total, function() {});
                var qian = pl5NumberSelect("#pl5plays .pl5-qian", total, function() {});
                var bai = pl5NumberSelect("#pl5plays .pl5-bai", total, function() {});
                var shi = pl5NumberSelect("#pl5plays .pl5-shi", total, function() {});
                var ge = pl5NumberSelect("#pl5plays .pl5-ge", total, function() {});
                function total(){
                    var pl5c = countPl5()
                    if (pl5c != false) {
                        var count = PlayTypeRule.count(pl5c)
                        var price = count * CPCONFIG.PL5.UNIT_PRICE;
                        $(".ball-status-bar").removeClass("disabled").html("共" + count + "注," + price + "元")
                    } else {
                        $(".ball-status-bar").addClass("disabled").html("每位至少选择 1 个号码")
                    }
                }
                $(".ball-status-bar").unbind().bind('click', function() {
                    var pl5c = countPl5();
                    if (pl5c !== false) {
                        var count = PlayTypeRule.count(pl5c)
                        var price = count * CPCONFIG.PL5.UNIT_PRICE;
                        if(price>CPCONFIG.PL5.MAX_AMOUNT){
                            dialog("单注投注不能超过"+CPCONFIG.PL5.MAX_AMOUNT+"元")
                            return false;
                        }
                        pl5c.PL5_ID = ++CACHE_ID
                        PL5_CAR.push(pl5c);
                        
                        wan.clear();
                        qian.clear();
                        bai.clear();
                        shi.clear();
                        ge.clear();
		     // localStorage.setItem("PL5_CAR",JSON.stringify(PL5_CAR));
                        location.href = "#!/car"
                    } else {
                        dialog("每位至少选择"+"<span class='wzl-text-warning'>1</span>"+"个号码")
                    }
                });
                function countPl5(){
                    var wanN = wan.getSelected(),
                        qianN = qian.getSelected(),
                        baiN = bai.getSelected(),
                        shiN = shi.getSelected(),
                        geN = ge.getSelected();
                    var dsType = PlayTypeRule['pl5_ds'];
                    if (!wanN || !wanN.length || !qianN || !qianN.length || !baiN || !baiN.length || !shiN || !shiN.length || !geN || !geN.length) {
                        return false;
                    }
                    var type = 'pl5_fs';
                    //如果长度吻合 单式 就是 四星单式，否则是 四星复式
                    if (wanN.length == dsType.groupdef[0].required && qianN.length == dsType.groupdef[1].required && baiN.length == dsType.groupdef[2].required && shiN.length == dsType.groupdef[3].required && geN.length == dsType.groupdef[4].required) {
                        type = "pl5_ds"
                    }
                    var groups = [{
                        dan: null,
                        tuo: wanN
                    }, {
                        dan: null,
                        tuo: qianN
                    }, {
                        dan: null,
                        tuo: baiN
                    }, {
                        dan: null,
                        tuo: shiN
                    }, {
                        dan: null,
                        tuo: geN
                    }];
                    return {
                        code: type,
                        groups: groups
                    }
                }
                Y_Y(function() {

                    wan.clear()
                    qian.clear()
                    bai.clear()
                    shi.clear()
                    ge.clear()
                    var n1 = cp.shuffle({
                        min: 0,
                        max: 9,
                        count: 1
                    })
                    wan.clear().select(n1)
                    var n1 = cp.shuffle({
                        min: 0,
                        max: 9,
                        count: 1
                    })
                    qian.clear().select(n1)
                    var n1 = cp.shuffle({
                        min: 0,
                        max: 9,
                        count: 1
                    })
                    bai.clear().select(n1)
                    var n1 = cp.shuffle({
                        min: 0,
                        max: 9,
                        count: 1
                    })
                    shi.clear().select(n1)
                    var n1 = cp.shuffle({
                        min: 0,
                        max: 9,
                        count: 1
                    })
                    ge.clear().select(n1)
                })
                $(".glyphicon.icon-trash").on("click", function() {
                    wan.clear();
                    qian.clear();
                    bai.clear();
                    shi.clear();
                    ge.clear();
                    total();
                })
            }

            function PL5car(){
                $('#pl5plays,#pl5-history').fadeOut(function() {
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
		//var PL5_CAR = JSON.parse(localStorage.getItem("PL5_CAR"))||PL5_CAR;
                    for (var i = 0; i < PL5_CAR.length; i++) {
                        var ritem = {}
                        ritem.count = PlayTypeRule.count(PL5_CAR[i]);
                        ritem.price = ritem.count * CPCONFIG['PL5'].UNIT_PRICE;
                        ritem.type = type(PL5_CAR[i].code)
                        ritem.code = (PL5_CAR[i].code)
                        ritem.id = PL5_CAR[i].PL5_ID
                        car_count += ritem.count
                        car_price += ritem.price
                        //全部是 红球字符串
                        ritem.redStr = strBtype(PL5_CAR[i].code, PL5_CAR[i])
                        ritem._redStr = strBtype(PL5_CAR[i].code, PL5_CAR[i], true)
                        r.push(ritem)
                    }

                    function strBtype(type, item, notext) {
                        var s = '',
                            _s = "";
                        s += item.groups[0].tuo.join(" ") + ","
                        s += item.groups[1].tuo.join(" ") + ","
                        s += item.groups[2].tuo.join(" ") + ","
                        s += item.groups[3].tuo.join(" ") + ","
                        s += item.groups[4].tuo.join(" ")
                        _s += item.groups[0].tuo.join(" ") + ","
                        _s += item.groups[1].tuo.join(" ") + ","
                        _s += item.groups[2].tuo.join(" ") + ","
                        _s += item.groups[3].tuo.join(" ") + ","
                        _s += item.groups[4].tuo.join(" ")

                        return notext ? _s : s;
                    }

                    function type(t) {
                        var r = '';
                        switch (t) {
                            case "pl5_fs":
                                r = "复式";
                                break;
                            case "pl5_ds":
                                r = "单式";
                                break;
                        }
                        return r;
                    }

                    function remove(id) {
                        for (var j = 0; j < PL5_CAR.length; j++) {
                            if (PL5_CAR[j].PL5_ID == id) {
                                PL5_CAR.splice(j, 1)
                            }
                        }
                    }

                    function clear() {
                        PL5_CAR = [],
                            PL5_BEI = 1,
                            PL5_QI = 1,
                            PL5_ZJ = false,
                            PL5_ZJSTOP = false;
                    }
		var money = localStorage.getItem("money");
 		var b = (car_price * PL5_QI * PL5_BEI);
		var fff =  (money-b)/2;
		var ff = fff.toString();
		var f =  ff.indexOf("-");
		if(f==0){
		       fff = 0;
		}else{
		       fff = fff;
		}

                    total = {
                        bei: PL5_BEI,
                        qi: PL5_QI,
                        count: car_count,
                        price: car_price * PL5_QI * PL5_BEI,
		          money: fff,
                        zjstop: PL5_ZJSTOP,
                        zj: PL5_ZJ
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
		//||localStorage.getItem("PL5_CAR")
                    if (PL5_CAR.length) {
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
                        PL5_BEI = bei;
                        PL5_QI = qi;
                        PL5_ZJSTOP = zjstop;
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
                function getOnePL5() {
                    var wan = cp.shuffle({
                        min: 0,
                        max: 9,
                        count: 1
                    })
                    var qian = cp.shuffle({
                        min: 0,
                        max: 9,
                        count: 1
                    })
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
                        padding: false,
                        count: 1
                    })
                    var pl5c = {
                        code: 'pl5_ds',
                        groups: [{
                            dan: null,
                            tuo: ge
                        }, {
                            dan: null,
                            tuo: shi
                        }, {
                            dan: null,
                            tuo: bai
                        }, {
                            dan: null,
                            tuo: qian
                        }, {
                            dan: null,
                            tuo: wan
                        }]
                    }
                    pl5c.PL5_ID = ++CACHE_ID
                    return pl5c;
                }
                $('#car-addhm').bind('click', function() {
                    location.href = "#!/dg"
                })
                $("#car-addjx").unbind().bind('click', function() {
                    var pl5c = getOnePL5();
                    PL5_CAR.push(pl5c)
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
                        gameType: "109",
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
                        	//二维码加密码
                        	qrCode: '',
                        	//是否购买二维码
                        	qrType: '',
                        	//哪里投注
                        	source: '6',
                            //彩票类型
                            lotoid: "109",
                            //中奖是否停止 0、1
                            winStop: "",
                            //投注类型 0 代购 1 追号 2 合买
                            bettype: "0",
                            //票信息数组
                            bet: "",
                            //期次信息数组
                            issue: [],
                            amount: "0"
                            //方案标题
                            //title: "0",
                            //方案描述
                           // explain: "0",
                            //是否保密 1 公开 2相对保密 3完全保密
                            //secrecy: "1",
                            //是否上传方案 1 是  其他否  2是胜负彩过滤投注
                            //isUp:"0",
                           // splitAmount: "0",
                            //是否先发方案标识  0 常规合买  1 先发方案再上传号
                           // isUpload: "0",
                            //关联ID
                           // projectid: "0",
                            //buyAmount: 0,
                            //floorsAmount: "0",
                            //标识是否为竞彩专业版订单 0不是 1 是
                            //ishigh:"0",
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
                        need.amount = Number(sscCar.total.price)
                        need.winStop = sscCar.total.zjstop ? 1 : 0;
                        need.bet = buyArrayGenerator(sscCar.list)
                        need.bettype = sscCar.total.qi > 1 ? 1 : 0;
                       // need.title = sscCar.total.qi > 1 ? "排列五" + PL5_NOWQI + "期追号方案" : "排列五" + PL5_NOWQI + "期追号方案";
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
                                "multiple": "1"
                            };
                            if (!item || !item.count) return false;
                            var rs = item._redStr ;
                            dataTmp.detail = rs;
                            //dataTmp.sum = item.price;
                            //dataTmp.num = item.count;
                            //dataTmp.multiple = sscCar.total.bei;
                            switch (item.code) {
                                case "pl5_fs":
                                    dataTmp.typeId = "00"
                                    dataTmp.seleId = "02"
                                    break;
                                case "pl5_ds":
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
                            lottery: "PL5",
                            issues: sscCar.total.qi || PL5_QI
                        }, function(re) {
                            r = merge(re)
                            fn(r)
                        })

                        function merge(list) {
                            var r = [];
                            $(list).each(function(index, item) {
                                if (item.issue >= PL5_NOWQI && r.length < PL5_QI) {
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
                    
                    if (u == false) return dialog("购物车是空的！");
                    var udata = u.d;
                    //dialog("loading", "正在投注！")
                    u.getIssue(function(r) {
                        if (!r || !r.length) return dialog({
                            message: "投注异常，请重试",
                            autoHideDelay: 1000})
                        udata.lotoGson.issue = r;
                        udata.lotoGson = JSON.stringify(udata.lotoGson)
                        ;
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


    }


    return {
        pl3 : pl3,
        pl5 : pl5

    }

});