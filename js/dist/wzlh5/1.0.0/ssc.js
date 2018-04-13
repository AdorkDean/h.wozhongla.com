/**
 * Created by hebo (razr409355439@gmail.com)on 15/1/7.
 */

define("wzlh5/1.0.0/ssc",["jquery/2.1.1/jquery","wzlh5/1.0.0/ac","handlebars/1.3.0/dist/cjs/handlebars",'wzlh5/1.0.0/until',"wzlh5/1.0.0/cp","wzlh5/1.0.0/ui"],function (require, exports, module) {
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
    function jxssc(){
        //购物车数据 全局通用
        var SSC_CAR = [],
        //投注倍数
            SSC_BEI = 1,
        //投注期次
            SSC_QI = 1,
        //是否追加
            SSC_ZJ = false,
        //中奖是否停止追加
            SSC_ZJSTOP = false,
            SSC_NOWQI = null,
            CACHE_ID = 0,
            u_type = "yxzx",
            PlayTypeRule = cp.PlayTypeRule,
            CPCONFIG = cp.CONFIG,
            untils = until,
            stop_control = true;
        var routes = {
            "/yxzx": function() {
                yxzx();
            },
            "/rx1": function() {
                rx1();
            },
            "/rx2": function() {
                rx2();
            },
            "/exzx": function() {
                exzx();
            },
            "/exfx": function() {
                exfx();
            },
            "/exhz": function() {
                exhz();
            },
            "/sanxzx": function() {
                sanxzx();
            },
            "/sanxfx": function() {
                sanxfx();
            },
            "/zsdx": function() {
                zsdx();
            },
            "/zsfx": function() {
                zsfx();
            },
            "/wxzx": function() {
                wxzx();
            },
            "/wxfx": function() {
                wxfx();
            },
            "/wxnx": function() {
                wxnx();
            },
            "/sixzx": function() {
                sixzx();
            },
            "/sixfx": function() {
                sixfx();
            },
            "/car": function() {
                ssccar();
            },
            "index": function() {
                //////////////////////console.log('index')
                yxzx();
            },
            "init": function() {
                init();
                //////////////////////console.log('INIT');
            }
        }
        Router(routes);

        function init() {

            kjdjs();
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
            //开奖倒计时
            function kjdjs() {
                var issueA = []
                var timer = null;
                issue();
                function issue() {
                    clearInterval(timer);
                    action.getIssue({
                        lottery: "JXSSC",
                        issues: 25
                    }, function(re) {
                        issueA = re;
                        if (re[0].endTime <= 120) re = re.slice(1);
                        setIssue(re[0])
                    })
                    //设置期次信息
                    function setIssue(d) {
                        //////////////////////console.log('set ISSUE')
                        //icon-dropdown-gray 暂时去掉下拉图标
                        SSC_NOWQI = d.issue;
                        setCountDown(d.endTime)
                        $(".history-bar").html(" <span>第" + d.issue + "期销售中</span><div class='pull-right history-bar-dropdown icon-dropdown-gray'> <span class='redballs'>00</span>时<span class='redballs'>00</span>分<span class='redballs'>00</span>秒</div>")
                        function setCountDown(s) {
                            timer = setInterval(function() {
                                s--;
                                if (s <= 120) {
                                    $('.history-bar').html("该其次已经截止,下一期预售中。")
                                    issue()
                                }
                                var v = formatSeconds(s - 120)
                                $('.history-bar .history-bar-dropdown').html(v)
                            }, 1000)
                        }
                        function formatSeconds(value) {
                            var theTime = parseInt(value); // 秒
                            var theTime1 = 0; // 分
                            var theTime2 = 0; // 小时
                            if (theTime > 60) {
                                theTime1 = parseInt(theTime / 60);
                                theTime = parseInt(theTime % 60);
                                // //////alert(theTime1+"-"+theTime);
                                if (theTime1 > 60) {
                                    theTime2 = parseInt(theTime1 / 60);
                                    theTime1 = parseInt(theTime1 % 60);
                                }
                            }
                            var result = "<span class='redballs'>" + pad(parseInt(theTime)) + "</span>秒";
                            if (theTime1 > 0) {
                                result = "<span class='redballs'>" + pad(parseInt(theTime1)) + "</span>分" + result;
                            }
                            if (theTime2 > 0) {
                                result = "<span class='redballs'>" + pad(parseInt(theTime2)) + "</span>时" + result;
                            }
                            function pad(n) {
                                return n < 10 ? "0" + n : n;
                            }
                            return result;
                        }
                    }
                }
            }

            action.queryJxssc({
                pageno: 1,
                pagesize: 10
            }, function(d) {
                //////console.log(d);
                fomatIssue2(d.lotolist,'ssc-history')

                function fomatIssue2(d,name){
                    //////////console.log(d);
                    var arr=[];
                    for (var i = 0; i < d.length; i++) {
                        //////////console.log(d[i]);
                        var obj={};
                        obj.issue = d[i].lotIssue;
                        obj.ball = d[i].kjCode;
                        arr.push(obj)
                    }
                    //////console.log(arr);
                    var myTemplate = Handlebars.compile($("#history-template").html());
                    $("#"+name+"").append(myTemplate({
                        data: arr
                    }));
                    //点击事件
                    $('.history-bar').undelegate()
                    $('.history-bar').delegate('.history-bar-dropdown','click', function() {
                        var $this = $(this);
                        $('.history-list').slideToggle(function() {
                            if ($('.history-bar-dropdown').hasClass('icon-dropdown-gray')) {
                                $this.addClass('icon-dropup-gray').removeClass('icon-dropdown-gray');
                            } else {
                                $this.removeClass('icon-dropup-gray').addClass('icon-dropdown-gray');
                            };
                        });
                    });
                }
            })

            //渲染遗漏
            action.yl('ssc',{},function (re){
                //////console.log(re);
                if(re.resultCode=='200'){
                    fomatYl(re.data);
                }else{

                }

            })

            function fomatYl(d){
                var allArr=d.split(",");
                //////////console.log(allArr);

                for (i=6;i<=15;i++){
                    $('.yla em').eq(i-6).text(allArr[i])
                    $('.yla2 em').eq(i-6).text(allArr[i])
                    $('.yla3 em').eq(i-6).text(allArr[i])
                    $('.yla4 em').eq(i-6).text(allArr[i])
                    $('.yla5 em').eq(i-6).text(allArr[i])
                }

                for (i=16;i<=25;i++){
                    $('.ylb em').eq(i-16).text(allArr[i])
                    $('.ylb2 em').eq(i-16).text(allArr[i])
                    $('.ylb3 em').eq(i-16).text(allArr[i])
                    $('.ylb4 em').eq(i-16).text(allArr[i])
                }

                for (i=26;i<=35;i++){
                    $('.ylc em').eq(i-26).text(allArr[i])
                    $('.ylc2 em').eq(i-26).text(allArr[i])
                    $('.ylc3 em').eq(i-26).text(allArr[i])
                }

                for (i=36;i<=45;i++){
                    $('.yld em').eq(i-36).text(allArr[i])
                    $('.yld2 em').eq(i-36).text(allArr[i])
                }

                for (i=46;i<=55;i++){
                    $('.yle em').eq(i-46).text(allArr[i])
                }

            }

            $('.ballcon-yilou').on('click', function (){
                $('.ballcon-right em').toggle()
            })

            //查询是否停售
            action.getControl(function(re){
                if(re[6]===false){
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
            $("#carfixed,#ssccar,#tzsuccess").hide();
            $("#selectssc,#sscplays").show();
            $(".wzl-cartext").addClass("hidden")
            $(".ball-status-bar").addClass("disabled").html("每位至少选择 1 个号码")
            $("#sscplays>div").not("#" + v).hide(function() {
                $('#' + v + ', #buycarfixedbtn').show();
                $('.wzl-nav-dropdown').text(title).show();
                fn && fn();
            })
        }
        /**
         * 时时彩 选号器
         * @param containerId
         * @param total
         * @param before
         * @returns {NumberSelect|*}
         */
        function sscNumberSelect(containerId, total, before, multipleSelect) {
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
        /**
         * 时时彩通用选择逻辑
         * @param ssc
         * @param fn
         */
        function sscSelect(ssc, fn) {
            if (ssc !== false) {
                var count = PlayTypeRule.count(ssc)
                var price = count * CPCONFIG.JXSSC.UNIT_PRICE;
                $(".ball-status-bar").removeClass("disabled").html("共" + count + "注," + price + "元")
            } else {
                $(".ball-status-bar").addClass("disabled").html("每位至少选择 1 个号码")
            }
        }
        /**
         * 加入购物车
         * @param fn
         */
        function sscAdd2Car(fn) {
            $("#buycarfixedbtn a.ball-status-bar").unbind().bind('click', function() {
                fn && fn();
                $(".ball-status-bar").addClass("disabled").html("每位至少选择 1 个号码球")
            });
        }
        /**
         * 一星直选
         */
        function yxzx() {
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow("selectyxzx", '江西时时彩-一星直选')
            u_type = "yxzx";
            var yx = sscNumberSelect("#selectyxzx .ballcon", total, function() {}, true);

            function total() {
                var yx = countYx();
                sscSelect(yx, function() {})
            }

            function countYx() {
                var yxN = yx.getSelected();
                if (!yxN || !yxN.length) {
                    return false;
                }
                var groups = [{
                    dan: null,
                    tuo: yxN
                }];
                return {
                    code: "ssc_yxzx",
                    groups: groups
                }
            }
            sscAdd2Car(function() {
                var ssc = countYx();
                if (ssc !== false) {
                    var count = PlayTypeRule.count(ssc)
                    var price = count * CPCONFIG.JXSSC.UNIT_PRICE;
                    if(price>CPCONFIG.JXSSC.MAX_AMOUNT){
                        dialog("单注投注不能超过"+CPCONFIG.JXSSC.MAX_AMOUNT+"元")
                        return false;
                    }
                    ssc.SSC_ID = ++CACHE_ID
                    SSC_CAR.push(ssc);
                    yx.clear();
                    location.href = "#!/car"
                } else {
                    dialog("每位至少选择"+"<span class='wzl-text-warning'>1</span>"+"个号码球")
                    return false;
                }
            })
            $(".glyphicon.icon-trash").on("click", function() {
                yx.clear();
                total();
            })
            Y_Y(function() {
                var n1 = cp.shuffle({
                    min: 0,
                    max: 9,
                    count: 1
                })
                yx.clear().select(n1)
            })
        }
        /**
         *
         */
        function rx1() {
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow("selectrx1", '江西时时彩-任选一')
        }
        /**
         *
         */
        function rx2() {
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow("selectrx2", '江西时时彩-任选二')
        }
        /**
         * 二星直选
         */
        function exzx() {
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow("selectexzx", '江西时时彩-二星直选')
            u_type = "exzx"
            var shi = sscNumberSelect("#selectexzx .ssc-shi", total, function() {});
            var ge = sscNumberSelect("#selectexzx .ssc-ge", total, function() {});

            function total() {
                var ex = countEx();
                //////////////////////console.log(ex)
                sscSelect(ex)
            }

            function countEx() {
                var shiN = shi.getSelected();
                var geN = ge.getSelected();
                if (!shiN || !shiN.length || !geN || !geN.length) {
                    return false;
                }
                var ssctype = "ssc_exfx";
                if (shiN.length == 1 && geN.length == 1) {
                    ssctype = "ssc_exzx"
                }
                var groups = [{
                    dan: null,
                    tuo: shiN
                }, {
                    dan: null,
                    tuo: geN
                }];
                return {
                    code: ssctype,
                    groups: groups
                }
            }
            sscAdd2Car(function() {
                var ssc = countEx();
                if (ssc !== false) {
                    var count = PlayTypeRule.count(ssc)
                    var price = count * CPCONFIG.JXSSC.UNIT_PRICE;
                    if(price>CPCONFIG.JXSSC.MAX_AMOUNT){
                        dialog("单注投注不能超过"+CPCONFIG.JXSSC.MAX_AMOUNT+"元")
                        return false;
                    }
                    ssc.SSC_ID = ++CACHE_ID
                    SSC_CAR.push(ssc);
                    shi.clear();
                    ge.clear();
                    location.href = "#!/car"
                } else {
                    dialog("每位至少选择"+"<span class='wzl-text-warning'>1</span>"+"个号码球")
                    return false;
                }
            })
            $(".glyphicon.icon-trash").on("click", function() {
                shi.clear();
                ge.clear();
                total();
            })
            Y_Y(function() {
                shi.clear()
                ge.clear()
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
         *
         */
        function exfx() {
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow("selectexfx", '江西时时彩-二星复选')
        }
        /**
         *
         */
        function exhz() {
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow("selectexhz", '江西时时彩-二星和值')
        }
        /**
         * 三星直选
         */
        function sanxzx() {
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow("selectsanxzx", '江西时时彩-三星直选')
            u_type = "3xzx"
            var bai = sscNumberSelect("#selectsanxzx .ssc-bai", total, function() {});
            var shi = sscNumberSelect("#selectsanxzx .ssc-shi", total, function() {});
            var ge = sscNumberSelect("#selectsanxzx .ssc-ge", total, function() {});

            function total() {
                var ex = countSx();
                //////////////////////console.log(ex)
                sscSelect(ex)
            }

            function countSx() {
                var baiN = bai.getSelected();
                var shiN = shi.getSelected();
                var geN = ge.getSelected();
                var dsType = PlayTypeRule['ssc_3xds'];
                if (!baiN || !baiN.length || !shiN || !shiN.length || !geN || !geN.length) {
                    return false;
                }
                var type = 'ssc_3xfs';
                //如果长度吻合 单式 就是 三星单式，否则是 三星复式
                if (baiN.length == dsType.groupdef[0].required && shiN.length == dsType.groupdef[1].required && geN.length == dsType.groupdef[2].required) {
                    type = "ssc_3xds"
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
                }];
                return {
                    code: type,
                    groups: groups
                }
            }
            sscAdd2Car(function() {
                var ssc = countSx();
                if (ssc !== false) {
                    var count = PlayTypeRule.count(ssc)
                    var price = count * CPCONFIG.JXSSC.UNIT_PRICE;
                    if(price>CPCONFIG.JXSSC.MAX_AMOUNT){
                        dialog("单注投注不能超过"+CPCONFIG.JXSSC.MAX_AMOUNT+"元")
                        return false;
                    }
                    ssc.SSC_ID = ++CACHE_ID
                    SSC_CAR.push(ssc);
                    bai.clear();
                    shi.clear();
                    ge.clear();
                    location.href = "#!/car"
                } else {
                    dialog("每位至少选择"+"<span class='wzl-text-warning'>1</span>"+"个号码球")
                    return false;
                }
            })
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
         *
         */
        function sanxfx() {
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow("selectsanxfx", '江西时时彩-三星复选')
        }
        /**
         *
         */
        function zsdx() {
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow("selectzsdx", '江西时时彩-组三单选')
        }
        /**
         *
         */
        function zsfx() {
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow("selectzsfx", '江西时时彩-组三复选')
        }
        /**
         *  五星直选
         */
        function wxzx() {
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow("selectwxzx", '江西时时彩-五星直选')
            u_type = "wxzx"
            var wan = sscNumberSelect("#selectwxzx .ssc-wan", total, function() {});
            var qian = sscNumberSelect("#selectwxzx .ssc-qian", total, function() {});
            var bai = sscNumberSelect("#selectwxzx .ssc-bai", total, function() {});
            var shi = sscNumberSelect("#selectwxzx .ssc-shi", total, function() {});
            var ge = sscNumberSelect("#selectwxzx .ssc-ge", total, function() {});

            function total() {
                var ex = count5x();
                sscSelect(ex)
            }

            function count5x() {
                var wanN = wan.getSelected();
                var qianN = qian.getSelected();
                var baiN = bai.getSelected();
                var shiN = shi.getSelected();
                var geN = ge.getSelected();
                var dsType = PlayTypeRule['ssc_5xds'];
                if (!wanN || !wanN.length || !qianN || !qianN.length || !baiN || !baiN.length || !shiN || !shiN.length || !geN || !geN.length) {
                    return false;
                }
                var type = 'ssc_5xfs';
                //如果长度吻合 单式 就是 四星单式，否则是 四星复式
                if (wanN.length == dsType.groupdef[0].required && qianN.length == dsType.groupdef[1].required && baiN.length == dsType.groupdef[2].required && shiN.length == dsType.groupdef[3].required && geN.length == dsType.groupdef[4].required) {
                    type = "ssc_5xds"
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
            sscAdd2Car(function() {
                var ssc = count5x();
                if (ssc !== false) {
                    var count = PlayTypeRule.count(ssc)
                    var price = count * CPCONFIG.JXSSC.UNIT_PRICE;
                    if(price>CPCONFIG.JXSSC.MAX_AMOUNT){
                        dialog("单注投注不能超过"+CPCONFIG.JXSSC.MAX_AMOUNT+"元")
                        return false;
                    }
                    ssc.SSC_ID = ++CACHE_ID
                    SSC_CAR.push(ssc);
                    wan.clear();
                    qian.clear();
                    bai.clear();
                    shi.clear();
                    ge.clear();
                    location.href = "#!/car"
                } else {
                    dialog("每位至少选择"+"<span class='wzl-text-warning'>1</span>"+"个号码球")
                    return false;
                }
            })
            $(".glyphicon.icon-trash").on("click", function() {
                wan.clear();
                qian.clear();
                bai.clear();
                shi.clear();
                ge.clear();
                total();
            })
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
        }
        /**
         *
         */
        function wxfx() {
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow("selectwxfx", '江西时时彩-五星复选')
        }
        /**
         *
         */
        function wxnx() {
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow("selectwxnx", '江西时时彩-五星通选')
        }
        /**
         *   四星直选
         */
        function sixzx() {
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow("selectsixzx", '江西时时彩-四星直选')
            u_type = "4xzx"
            var qian = sscNumberSelect("#selectsixzx .ssc-qian", total, function() {});
            var bai = sscNumberSelect("#selectsixzx .ssc-bai", total, function() {});
            var shi = sscNumberSelect("#selectsixzx .ssc-shi", total, function() {});
            var ge = sscNumberSelect("#selectsixzx .ssc-ge", total, function() {});

            function total() {
                var ex = count4x();
                //////////////////////console.log(ex)
                sscSelect(ex)
            }

            function count4x() {
                var qianN = qian.getSelected();
                var baiN = bai.getSelected();
                var shiN = shi.getSelected();
                var geN = ge.getSelected();
                var dsType = PlayTypeRule['ssc_4xds'];
                if (!qianN || !qianN.length || !baiN || !baiN.length || !shiN || !shiN.length || !geN || !geN.length) {
                    return false;
                }
                var type = 'ssc_4xfs';
                //如果长度吻合 单式 就是 四星单式，否则是 四星复式
                if (qianN.length == dsType.groupdef[0].required && baiN.length == dsType.groupdef[1].required && shiN.length == dsType.groupdef[2].required && geN.length == dsType.groupdef[3].required) {
                    type = "ssc_4xds"
                }
                var groups = [{
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
            sscAdd2Car(function() {
                var ssc = count4x();
                if (ssc !== false) {
                    var count = PlayTypeRule.count(ssc)
                    var price = count * CPCONFIG.JXSSC.UNIT_PRICE;
                    if(price>CPCONFIG.JXSSC.MAX_AMOUNT){
                        dialog("单注投注不能超过"+CPCONFIG.JXSSC.MAX_AMOUNT+"元")
                        return false;
                    }
                    ssc.SSC_ID = ++CACHE_ID
                    SSC_CAR.push(ssc);
                    qian.clear();
                    bai.clear();
                    shi.clear();
                    ge.clear();
                    location.href = "#!/car"
                } else {
                    dialog("每位至少选择"+"<span class='wzl-text-warning'>1</span>"+"个号码球")
                    return false;
                }
            })
            $(".glyphicon.icon-trash").on("click", function() {
                qian.clear();
                bai.clear();
                shi.clear();
                ge.clear();
                total();
            })
            Y_Y(function() {

                qian.clear()
                bai.clear()
                shi.clear()
                ge.clear()
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
        }
        /**
         *
         */
        function sixfx() {
            publicShow("selectsixfx", '江西时时彩-四星复选')
        }
        /**
         *
         *
         */
        function ssccar() {
            $('#selectssc').fadeOut(function() {
                $(".wzl-cartext").removeClass("hidden")
                $('.wzl-nav-dropdown').hide();
                $('#ssccar, #carfixed').fadeIn();
                renderCar();
            });

            function renderCar() {
                if (SSC_CAR.length) {
                    $("#car-no-select").addClass('hidden')
                    var result = countCar();
                    var listTemplate = Handlebars.compile($("#ball-select-item").html());
                    $("#ball-select-group").html(listTemplate({
                        list: result.list
                    }));
                    var totalTemplate = Handlebars.compile($("#car-total-template").html());
                    $('#car-total').html(totalTemplate(result.total))
                    $("#ssccar").delegate('.ball-select-remove', 'click', function() {
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
                    SSC_BEI = bei;
                    SSC_QI = qi;
                    SSC_ZJSTOP = zjstop;
                    renderCar();
                })
            }

            function countCar() {
                var r = [],
                    car_count = 0,
                    car_price = 0,
                    total;
                for (var i = 0; i < SSC_CAR.length; i++) {
                    var ritem = {}
                    ritem.count = PlayTypeRule.count(SSC_CAR[i]);
                    ritem.price = ritem.count * CPCONFIG['JXSSC'].UNIT_PRICE;
                    ritem.type = type(SSC_CAR[i].code)
                    ritem.code = (SSC_CAR[i].code)
                    ritem.id = SSC_CAR[i].SSC_ID
                    car_count += ritem.count
                    car_price += ritem.price
                    //全部是 红球字符串
                    ritem.redStr = strBtype(SSC_CAR[i].code, SSC_CAR[i])
                    ritem._redStr = strBtype(SSC_CAR[i].code, SSC_CAR[i], true)
                    r.push(ritem)
                }

                function strBtype(type, item, notext) {
                    var s = '',
                        _s = "";
                    if (type == "ssc_yxzx") {
                        s += item.groups[0].tuo.join(" ");
                        _s += "_,_,_,_," + item.groups[0].tuo.join(" ");
                    }
                    if (type == "ssc_exzx" || type == "ssc_exfx") {
                        s += item.groups[0].tuo.join(" ") + " "
                        s += item.groups[1].tuo.join(" ")
                        _s += "_,_,_," + item.groups[0].tuo.join(" ") + ",";
                        _s += item.groups[1].tuo.join(" ")
                    }
                    if (type == "ssc_3xds" || type == "ssc_3xfs") {
                        s += item.groups[0].tuo.join(" ") + " "
                        s += item.groups[1].tuo.join(" ") + " "
                        s += item.groups[2].tuo.join(" ")
                        _s += "_,_," + item.groups[0].tuo.join(" ") + ",";
                        _s += item.groups[1].tuo.join(" ") + ",";
                        _s += item.groups[2].tuo.join(" ");
                    }
                    if (type == "ssc_4xds" || type == "ssc_4xfs") {
                        s += item.groups[0].tuo.join(" ") + " "
                        s += item.groups[1].tuo.join(" ") + " "
                        s += item.groups[2].tuo.join(" ") + " "
                        s += item.groups[3].tuo.join(" ")
                        _s += "_," + item.groups[0].tuo.join(" ") + ","
                        _s += item.groups[1].tuo.join(" ") + ","
                        _s += item.groups[2].tuo.join(" ") + ","
                        _s += item.groups[3].tuo.join(" ")
                    }
                    if (type == "ssc_5xds" || type == "ssc_5xfs") {
                        s += item.groups[0].tuo.join(" ") + " "
                        s += item.groups[1].tuo.join(" ") + " "
                        s += item.groups[2].tuo.join(" ") + " "
                        s += item.groups[3].tuo.join(" ") + " "
                        s += item.groups[4].tuo.join(" ")
                        _s += item.groups[0].tuo.join(" ") + ","
                        _s += item.groups[1].tuo.join(" ") + ","
                        _s += item.groups[2].tuo.join(" ") + ","
                        _s += item.groups[3].tuo.join(" ") + ","
                        _s += item.groups[4].tuo.join(" ")
                    }
                    return notext ? _s : s;
                }

                function type(t) {
                    var r = '';
                    switch (t) {
                        case "ssc_yxzx":
                            r = "一星直选";
                            break;
                        case "ssc_exzx":
                            r = "二星直选";
                            break;
                        case "ssc_exfx":
                            r = "二星复选";
                            break;
                        case "ssc_3xds":
                            r = "三星单式";
                            break;
                        case "ssc_3xfs":
                            r = "三星复式";
                            break;
                        case "ssc_4xds":
                            r = "四星单式";
                            break;
                        case "ssc_4xfs":
                            r = "四星复式";
                            break;
                        case "ssc_5xds":
                            r = "五星单式";
                            break;
                        case "ssc_5xfs":
                            r = "五星复式";
                            break;
                    }
                    return r;
                }

                function remove(id) {
                    for (var j = 0; j < SSC_CAR.length; j++) {
                        if (SSC_CAR[j].SSC_ID == id) {
                            SSC_CAR.splice(j, 1)
                        }
                    }
                }

                function clear() {
                    SSC_CAR = [],
                        SSC_BEI = 1,
                        SSC_QI = 1,
                        SSC_ZJ = false,
                        SSC_ZJSTOP = false;
                }
                total = {
                    bei: SSC_BEI,
                    qi: SSC_QI,
                    count: car_count,
                    price: car_price * SSC_QI * SSC_BEI,
                    zjstop: SSC_ZJSTOP,
                    zj: SSC_ZJ
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
            function getOneSSC() {
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
                var ssc = {
                    code: 'ssc_yxzx',
                    groups: [{
                        dan: null,
                        tuo: ge
                    }]
                }
                switch (u_type) {
                    case "yxzx":
                        ssc = {
                            code: 'ssc_yxzx',
                            groups: [{
                                dan: null,
                                tuo: ge
                            }]
                        }
                        break;
                    case "exzx":
                        ssc = {
                            code: 'ssc_exzx',
                            groups: [{
                                dan: null,
                                tuo: ge
                            }, {
                                dan: null,
                                tuo: shi
                            }]
                        }
                        break;
                    case "3xzx":
                        ssc = {
                            code: 'ssc_3xds',
                            groups: [{
                                dan: null,
                                tuo: ge
                            }, {
                                dan: null,
                                tuo: shi
                            }, {
                                dan: null,
                                tuo: bai
                            }]
                        }
                        break;
                    case "4xzx":
                        ssc = {
                            code: 'ssc_4xds',
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
                            }]
                        }
                        break;
                    case "wxzx":
                        ssc = {
                            code: 'ssc_5xds',
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
                }
                ssc.SSC_ID = ++CACHE_ID
                return ssc;
            }
            $('#car-addhm').bind('click', function() {
                location.href = "#!/yxzx"
            })
            $("#car-addjx").unbind().bind('click', function() {
                var ssc = getOneSSC();
                SSC_CAR.push(ssc)
                renderCar();
            })
            $(".glyphicon.icon-trash").on("click", function() {
                var s = countCar();
                s.clear();
                renderCar();
            })

            function tzsuccess() {
                $("#car,#selectssc,#carfixed,#ssccar,#buycarfixedbtn").hide();
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
                    //证件类型  1身份证 2 军官证 3护照
                    // carType:"",
                    //彩票类型
                    gameType: "006",
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
                d.needPay = sscCar.total.price;
                //
                d.lotoGson = mergeTZ();
                /**
                 * 投注串 数据整合
                 */
                function mergeTZ() {
                    if (!sscCar) return false;
                    var need = {
                        //彩票类型
                        gameType: "006",
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
                    need.totalSum = Number(sscCar.total.price);
                    need.isStop = sscCar.total.zjstop ? 1 : 0;
                    need.buyNumberArray = buyArrayGenerator(sscCar.list)
                    need.buyType = sscCar.total.qi > 1 ? 1 : 0;
                    need.title = sscCar.total.qi > 1 ? "时时彩" + SSC_NOWQI + "期追号方案" : "时时彩" + SSC_NOWQI + "期追号方案";
                    // xian ajax =
                    return need;
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
                        var rs = item._redStr //.split(" ").join(',')
                        dataTmp.buyNumber = rs;
                        // dataTmp.sum = CPCONFIG.JXSSC.UNIT_PRICE;
                        dataTmp.sum = item.price;
                        dataTmp.num = item.count;
                        dataTmp.multiple = sscCar.total.bei;
                        //////////////////////console.log(item.code)
                        switch (item.code) {
                            case "ssc_yxzx":
                                dataTmp.typeId = "01"
                                dataTmp.seleId = "01"
                                break;
                            case "ssc_exzx":
                                dataTmp.typeId = "02"
                                dataTmp.seleId = "01"
                                break;
                            case "ssc_exfx":
                                dataTmp.typeId = "02"
                                dataTmp.seleId = "02"
                                break;
                            case "ssc_3xds":
                                dataTmp.typeId = "03"
                                dataTmp.seleId = "01"
                                break;
                            case "ssc_3xfs":
                                dataTmp.typeId = "03"
                                dataTmp.seleId = "02"
                                break;
                            case "ssc_4xds":
                                dataTmp.typeId = "04"
                                dataTmp.seleId = "01"
                                break;
                            case "ssc_4xfs":
                                dataTmp.typeId = "04"
                                dataTmp.seleId = "02"
                                break;
                            case "ssc_5xds":
                                dataTmp.typeId = "05"
                                dataTmp.seleId = "01"
                                break;
                            case "ssc_5xfs":
                                dataTmp.typeId = "05"
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
                        lottery: "JXSSC",
                        issues: (sscCar.total.qi+1) || (SSC_QI+1)
                    }, function(re) {
                        var rr= getRightIssue(SSC_NOWQI,re,sscCar.total.qi || SSC_QI)
                        r = merge(rr)
                        fn(r)
                    })
                    function getRightIssue(now,r,len){
                        var n=0;
                        var re=[];
                        for(var i=0;i< r.length;i++){
                            if(r[i].issue==now){
                                n=i;
                                for(var j=0;j<len;j++){
                                    re.push(r[n+j])
                                }
                            }
                        }
                        return re;
                    }
                    function merge(list) {
                        var r = [];
                        $(list).each(function(index, item) {
                            r.push({
                                issue: item.issue,
                                multiple: sscCar.total.bei
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
                    action.pl3Tz(udata, function(re) {
                        TZ_INFO($.parseJSON(re), fn)
                    })
                })
            }
        }
    }
    function cqssc(){

            //购物车数据 全局通用
            var SSC_CAR = [],
            //投注倍数
                SSC_BEI = 1,
            //投注期次
                SSC_QI = 1,
            //是否追加
                SSC_ZJ = false,
            //中奖是否停止追加
                SSC_ZJSTOP = false,
                SSC_NOWQI = null,
                CACHE_ID = 0,
                u_type = "yxzx",
                PlayTypeRule = cp.PlayTypeRule,
                CPCONFIG = cp.CONFIG,
                untils = until,
                stop_control = true
            var routes = {
                "/yxzx": function() {
                    yxzx();
                },
                "/rx1": function() {
                    rx1();
                },
                "/rx2": function() {
                    rx2();
                },
                "/exzx": function() {
                    exzx();
                },
                "/exfx": function() {
                    exfx();
                },
                "/exhz": function() {
                    exhz();
                },
                "/sanxzx": function() {
                    sanxzx();
                },
                "/sanxfx": function() {
                    sanxfx();
                },
                "/zsdx": function() {
                    zsdx();
                },
                "/zsfx": function() {
                    zsfx();
                },
                "/wxzx": function() {
                    wxzx();
                },
                "/wxfx": function() {
                    wxfx();
                },
                "/wxnx": function() {
                    wxnx();
                },
                "/sixzx": function() {
                    // sixzx();
                },
                "/sixfx": function() {
                    // sixfx();
                },
                "/car": function() {
                    ssccar();
                },
                "index": function() {
                    //////////////////////console.log('index')
                    yxzx();
                },
                "init": function() {
                    init();
                    //////////////////////console.log('INIT');
                }
            }
            Router(routes);

            function init() {
                kjdjs();
                $('.wzl-nav-dropdown').click(function() {
                    dropdownMask.toggle();
                })
                $.wzlmore(function(d) {});
                //请求 userinfo 用于同步
                action.queryUserInfo({},function(){})
                //开奖倒计时
                function kjdjs() {
                    var issueA = []
                    var timer = null;
                    issue();

                    function issue() {
                        clearInterval(timer);
                        action.getIssue({
                            lottery: "CQSSC",
                            issues: 25
                        }, function(re) {
                            issueA = re;
                            if (re[0].endTime <= 90) re = re.slice(1);
                            setIssue(re[0])
                        })
                        //设置期次信息
                        function setIssue(d) {
                            SSC_NOWQI = d.issue;
                            setCountDown(d.endTime)
                            $(".history-bar").html(" <span>第" + d.issue + "期销售中</span><div class='pull-right history-bar-dropdown icon-dropdown-gray'> <span class='redballs'>00</span>时<span class='redballs'>00</span>分<span class='redballs'>00</span>秒</div>")

                            function setCountDown(s) {
                                timer = setInterval(function() {
                                    s--;
                                    if (s <= 90) {
                                        $('.history-bar').html("该其次已经截止,下一期预售中。")
                                        issue()
                                    }
                                    var v = formatSeconds(s - 90)
                                    $('.history-bar .history-bar-dropdown').html(v)
                                }, 1000)
                            }

                            function formatSeconds(value) {
                                var theTime = parseInt(value); // 秒
                                var theTime1 = 0; // 分
                                var theTime2 = 0; // 小时
                                if (theTime > 60) {
                                    theTime1 = parseInt(theTime / 60);
                                    theTime = parseInt(theTime % 60);
                                    if (theTime1 > 60) {
                                        theTime2 = parseInt(theTime1 / 60);
                                        theTime1 = parseInt(theTime1 % 60);
                                    }
                                }
                                var result = "<span class='redballs'>" + pad(parseInt(theTime)) + "</span>秒";
                                if (theTime1 > 0) {
                                    result = "<span class='redballs'>" + pad(parseInt(theTime1)) + "</span>分" + result;
                                }
                                if (theTime2 > 0) {
                                    result = "<span class='redballs'>" + pad(parseInt(theTime2)) + "</span>时" + result;
                                }

                                function pad(n) {
                                    return n < 10 ? "0" + n : n;
                                }
                                return result;
                            }
                        }
                    }
                }

                action.queryCqssc({
                    pageno: 1,
                    pagesize: 10
                }, function(d) {
                    fomatIssue2(d.lotolist,'cqssc-history')

                    function fomatIssue2(d,name){
                        var arr=[];
                        for (var i = 0; i < d.length; i++) {
                            var obj={};
                            obj.issue = d[i].lotIssue;
                            obj.ball = d[i].kjCode;
                            arr.push(obj)
                        }
                        var myTemplate = Handlebars.compile($("#history-template").html());
                        $("#"+name+"").append(myTemplate({
                            data: arr
                        }));
                        //点击事件
                        $('.history-bar').undelegate()
                        $('.history-bar').delegate('.history-bar-dropdown','click', function() {
                            var $this = $(this);
                            $('.history-list').slideToggle(function() {
                                if ($('.history-bar-dropdown').hasClass('icon-dropdown-gray')) {
                                    $this.addClass('icon-dropup-gray').removeClass('icon-dropdown-gray');
                                } else {
                                    $this.removeClass('icon-dropup-gray').addClass('icon-dropdown-gray');
                                };
                            });
                        });
                    }
                })

                //渲染遗漏
                action.yl('cqssc',{},function (re){
                    if(re.resultCode=='200'){
                        fomatYl(re.data);
                    }
                })
                function fomatYl(d){
                    var allArr=d.split(",");
                    for (i=6;i<=15;i++){
                        $('.yla em').eq(i-6).text(allArr[i])
                        $('.yla2 em').eq(i-6).text(allArr[i])
                        $('.yla3 em').eq(i-6).text(allArr[i])
                        $('.yla4 em').eq(i-6).text(allArr[i])
                        $('.yla5 em').eq(i-6).text(allArr[i])
                    }

                    for (i=16;i<=25;i++){
                        $('.ylb em').eq(i-16).text(allArr[i])
                        $('.ylb2 em').eq(i-16).text(allArr[i])
                        $('.ylb3 em').eq(i-16).text(allArr[i])
                        $('.ylb4 em').eq(i-16).text(allArr[i])
                    }

                    for (i=26;i<=35;i++){
                        $('.ylc em').eq(i-26).text(allArr[i])
                        $('.ylc2 em').eq(i-26).text(allArr[i])
                        $('.ylc3 em').eq(i-26).text(allArr[i])
                    }

                    for (i=36;i<=45;i++){
                        $('.yld em').eq(i-36).text(allArr[i])
                        $('.yld2 em').eq(i-36).text(allArr[i])
                    }

                    for (i=46;i<=55;i++){
                        $('.yle em').eq(i-46).text(allArr[i])
                    }

                }

                $('.ballcon-yilou').on('click', function (){
                    $('.ballcon-right em').toggle()
                })

                //查询是否停售
                action.getControl(function(re){
                    if(re[18]===false){
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
                $("#carfixed,#ssccar,#tzsuccess").hide();
                $("#selectssc,#sscplays").show();
                $(".wzl-cartext").addClass("hidden")
                $(".ball-status-bar").addClass("disabled").html("每位至少选择 1 个号码")
                $("#sscplays>div").not("#" + v).hide(function() {
                    $('#' + v + ', #buycarfixedbtn').show();
                    $('.wzl-nav-dropdown').text(title).show();
                    fn && fn();
                })
            }
            /**
             * 时时彩 选号器
             * @param containerId
             * @param total
             * @param before
             * @returns {NumberSelect|*}
             */
            function sscNumberSelect(containerId, total, before, multipleSelect) {
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
            /**
             * 时时彩通用选择逻辑
             * @param ssc
             * @param fn
             */
            function sscSelect(ssc, fn) {
                if (ssc !== false) {
                    var count = PlayTypeRule.count(ssc)
                    var price = count * CPCONFIG.JXSSC.UNIT_PRICE;
                    $(".ball-status-bar").removeClass("disabled").html("共" + count + "注," + price + "元")
                } else {
                    $(".ball-status-bar").addClass("disabled").html("每位至少选择 1 个号码")
                }
            }
            /**
             * 加入购物车
             * @param fn
             */
            function sscAdd2Car(fn) {
                $("#buycarfixedbtn a.ball-status-bar").unbind().bind('click', function() {
                    fn && fn();
                    $(".ball-status-bar").addClass("disabled").html("每位至少选择 1 个号码球")
                });
            }
            /**
             * 一星直选
             */
            function yxzx() {
                //选择玩法后如果记录是显示的让他隐藏
                $('.history-list').hide();
                publicShow("selectyxzx", '重庆时时彩-一星直选')
                u_type = "yxzx"
                var yx = sscNumberSelect("#selectyxzx .ballcon", total, function() {}, true);

                function total() {
                    var yx = countYx();
                    sscSelect(yx, function() {})
                }

                function countYx() {
                    var yxN = yx.getSelected();
                    if (!yxN || !yxN.length) {
                        return false;
                    }
                    var groups = [{
                        dan: null,
                        tuo: yxN
                    }];
                    return {
                        code: "ssc_yxzx",
                        groups: groups
                    }
                }
                sscAdd2Car(function() {
                    var ssc = countYx();
                    if (ssc !== false) {
                        ssc.SSC_ID = ++CACHE_ID
                        SSC_CAR.push(ssc);
                        yx.clear();
                        location.href = "#!/car"
                    } else {
                        dialog("每位至少选择"+"<span class='wzl-text-warning'>1</span>"+"个号码球")
                        return false;
                    }
                })
                $(".glyphicon.icon-trash").on("click", function() {
                    yx.clear();
                    total();
                })
                Y_Y(function() {
                    var n1 = cp.shuffle({
                        min: 0,
                        max: 9,
                        count: 1
                    })
                    yx.clear().select(n1)
                })
            }
            /**
             *
             */
            function rx1() {
                //选择玩法后如果记录是显示的让他隐藏
                $('.history-list').hide();
                publicShow("selectrx1", '重庆时时彩-任选一')
            }
            /**
             *
             */
            function rx2() {
                //选择玩法后如果记录是显示的让他隐藏
                $('.history-list').hide();
                publicShow("selectrx2", '重庆时时彩-任选二')
            }
            /**
             * 二星直选
             */
            function exzx() {
                //选择玩法后如果记录是显示的让他隐藏
                $('.history-list').hide();
                publicShow("selectexzx", '重庆时时彩-二星直选')
                u_type = "exzx"
                var shi = sscNumberSelect("#selectexzx .ssc-shi", total, function() {});
                var ge = sscNumberSelect("#selectexzx .ssc-ge", total, function() {});

                function total() {
                    var ex = countEx();
                    sscSelect(ex)
                }

                function countEx() {
                    var shiN = shi.getSelected();
                    var geN = ge.getSelected();
                    if (!shiN || !shiN.length || !geN || !geN.length) {
                        return false;
                    }
                    var ssctype = "ssc_exfx";
                    if (shiN.length == 1 && geN.length == 1) {
                        ssctype = "ssc_exzx"
                    }
                    var groups = [{
                        dan: null,
                        tuo: shiN
                    }, {
                        dan: null,
                        tuo: geN
                    }];
                    return {
                        code: ssctype,
                        groups: groups
                    }
                }
                sscAdd2Car(function() {
                    var ssc = countEx();
                    if (ssc !== false) {
                        ssc.SSC_ID = ++CACHE_ID
                        SSC_CAR.push(ssc);
                        shi.clear();
                        ge.clear();
                        location.href = "#!/car"
                    } else {
                        dialog("每位至少选择"+"<span class='wzl-text-warning'>1</span>"+"个号码球")
                        return false;
                    }
                })
                $(".glyphicon.icon-trash").on("click", function() {
                    shi.clear();
                    ge.clear();
                    total();
                })
                Y_Y(function() {
                    shi.clear()
                    ge.clear()
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
             *
             */
            function exfx() {
                //选择玩法后如果记录是显示的让他隐藏
                $('.history-list').hide();
                publicShow("selectexfx", '重庆时时彩-二星复选')
            }
            /**
             *
             */
            function exhz() {
                //选择玩法后如果记录是显示的让他隐藏
                $('.history-list').hide();
                publicShow("selectexhz", '重庆时时彩-二星和值')
            }
            /**
             * 三星直选
             */
            function sanxzx() {
                //选择玩法后如果记录是显示的让他隐藏
                $('.history-list').hide();
                publicShow("selectsanxzx", '重庆时时彩-三星直选')
                u_type = "3xzx"
                var bai = sscNumberSelect("#selectsanxzx .ssc-bai", total, function() {});
                var shi = sscNumberSelect("#selectsanxzx .ssc-shi", total, function() {});
                var ge = sscNumberSelect("#selectsanxzx .ssc-ge", total, function() {});

                function total() {
                    var ex = countSx();
                    sscSelect(ex)
                }

                function countSx() {
                    var baiN = bai.getSelected();
                    var shiN = shi.getSelected();
                    var geN = ge.getSelected();
                    var dsType = PlayTypeRule['ssc_3xds'];
                    if (!baiN || !baiN.length || !shiN || !shiN.length || !geN || !geN.length) {
                        return false;
                    }
                    var type = 'ssc_3xfs';
                    //如果长度吻合 单式 就是 三星单式，否则是 三星复式
                    if (baiN.length == dsType.groupdef[0].required && shiN.length == dsType.groupdef[1].required && geN.length == dsType.groupdef[2].required) {
                        type = "ssc_3xds"
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
                    }];
                    return {
                        code: type,
                        groups: groups
                    }
                }
                sscAdd2Car(function() {
                    var ssc = countSx();
                    if (ssc !== false) {
                        ssc.SSC_ID = ++CACHE_ID
                        SSC_CAR.push(ssc);
                        bai.clear();
                        shi.clear();
                        ge.clear();
                        location.href = "#!/car"
                    } else {
                        dialog("每位至少选择"+"<span class='wzl-text-warning'>1</span>"+"个号码球")
                        return false;
                    }
                })
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
             *
             */
            function sanxfx() {
                //选择玩法后如果记录是显示的让他隐藏
                $('.history-list').hide();
                publicShow("selectsanxfx", '重庆时时彩-三星复选')
            }
            /**
             *
             */
            function zsdx() {
                //选择玩法后如果记录是显示的让他隐藏
                $('.history-list').hide();
                publicShow("selectzsdx", '重庆时时彩-组三单选')
            }
            /**
             *
             */
            function zsfx() {
                //选择玩法后如果记录是显示的让他隐藏
                $('.history-list').hide();
                publicShow("selectzsfx", '重庆时时彩-组三复选')
            }
            /**
             *  五星直选
             */
            function wxzx() {
                //选择玩法后如果记录是显示的让他隐藏
                $('.history-list').hide();
                publicShow("selectwxzx", '重庆时时彩-五星直选')
                u_type = "wxzx"
                var wan = sscNumberSelect("#selectwxzx .ssc-wan", total, function() {});
                var qian = sscNumberSelect("#selectwxzx .ssc-qian", total, function() {});
                var bai = sscNumberSelect("#selectwxzx .ssc-bai", total, function() {});
                var shi = sscNumberSelect("#selectwxzx .ssc-shi", total, function() {});
                var ge = sscNumberSelect("#selectwxzx .ssc-ge", total, function() {});

                function total() {
                    var ex = count5x();
                    sscSelect(ex)
                }

                function count5x() {
                    var wanN = wan.getSelected();
                    var qianN = qian.getSelected();
                    var baiN = bai.getSelected();
                    var shiN = shi.getSelected();
                    var geN = ge.getSelected();
                    var dsType = PlayTypeRule['ssc_5xds'];
                    if (!wanN || !wanN.length || !qianN || !qianN.length || !baiN || !baiN.length || !shiN || !shiN.length || !geN || !geN.length) {
                        return false;
                    }
                    var type = 'ssc_5xfs';
                    //如果长度吻合 单式 就是 四星单式，否则是 四星复式
                    if (wanN.length == dsType.groupdef[0].required && qianN.length == dsType.groupdef[1].required && baiN.length == dsType.groupdef[2].required && shiN.length == dsType.groupdef[3].required && geN.length == dsType.groupdef[4].required) {
                        type = "ssc_5xds"
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
                sscAdd2Car(function() {
                    var ssc = count5x();
                    if (ssc !== false) {
                        var count = PlayTypeRule.count(ssc)
                        var price = count * CPCONFIG.CQSSC.UNIT_PRICE;
                        if(price>CPCONFIG.CQSSC.MAX_AMOUNT){
                            dialog("单注投注不能超过"+CPCONFIG.CQSSC.MAX_AMOUNT+"元")
                            return false;
                        }
                        ssc.SSC_ID = ++CACHE_ID
                        SSC_CAR.push(ssc);
                        wan.clear();
                        qian.clear();
                        bai.clear();
                        shi.clear();
                        ge.clear();
                        location.href = "#!/car"
                    } else {
                        dialog("每位至少选择"+"<span class='wzl-text-warning'>1</span>"+"个号码球")
                        return false;
                    }
                })
                $(".glyphicon.icon-trash").on("click", function() {
                    wan.clear();
                    qian.clear();
                    bai.clear();
                    shi.clear();
                    ge.clear();
                    total();
                })
                Y_Y(function() {

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
            }
            /**
             *
             */
            function wxfx() {
                //选择玩法后如果记录是显示的让他隐藏
                $('.history-list').hide();
                publicShow("selectwxfx", '重庆时时彩-五星复选')
            }
            /**
             *
             */
            function wxnx() {
                //选择玩法后如果记录是显示的让他隐藏
                $('.history-list').hide();
                publicShow("selectwxnx", '重庆时时彩-五星通选')
            }
            /**
             *
             */
            function sixfx() {
                //选择玩法后如果记录是显示的让他隐藏
                $('.history-list').hide();
                publicShow("selectsixfx", '重庆时时彩-四星复选')
            }
            /**
             *
             *
             */
            function ssccar() {
                $('#selectssc').fadeOut(function() {
                    $('.wzl-nav-dropdown').hide();
                    $(".wzl-cartext").removeClass("hidden")
                    $('#ssccar, #carfixed').fadeIn();
                    renderCar();
                });

                function renderCar() {
                    if (SSC_CAR.length) {
                        $("#car-no-select").addClass('hidden')
                        var result = countCar();
                        var listTemplate = Handlebars.compile($("#ball-select-item").html());
                        $("#ball-select-group").html(listTemplate({
                            list: result.list
                        }));
                        var totalTemplate = Handlebars.compile($("#car-total-template").html());
                        $('#car-total').html(totalTemplate(result.total))
                        $('#ssccar .ball-select-remove').unbind().bind('click', function() {
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
                        SSC_BEI = bei;
                        SSC_QI = qi;
                        SSC_ZJSTOP = zjstop;
                        renderCar();
                    })
                }

                function countCar() {
                    var r = [],
                        car_count = 0,
                        car_price = 0,
                        total;
                    for (var i = 0; i < SSC_CAR.length; i++) {
                        var ritem = {}
                        ritem.count = PlayTypeRule.count(SSC_CAR[i]);
                        ritem.price = ritem.count * CPCONFIG['JXSSC'].UNIT_PRICE;
                        ritem.type = type(SSC_CAR[i].code)
                        ritem.code = (SSC_CAR[i].code)
                        ritem.id = SSC_CAR[i].SSC_ID
                        car_count += ritem.count
                        car_price += ritem.price
                        //全部是 红球字符串
                        ritem.redStr = strBtype(SSC_CAR[i].code, SSC_CAR[i])
                        ritem._redStr = strBtype(SSC_CAR[i].code, SSC_CAR[i], true)
                        r.push(ritem)
                    }

                    function strBtype(type, item, notext) {
                        var s = '',
                            _s = "";
                        if (type == "ssc_yxzx") {
                            s += item.groups[0].tuo.join(" ");
                            _s += "_,_,_,_," + item.groups[0].tuo.join(" ");
                        }
                        if (type == "ssc_exzx" || type == "ssc_exfx") {
                            s += item.groups[0].tuo.join(" ") + " "
                            s += item.groups[1].tuo.join(" ")
                            _s += "_,_,_," + item.groups[0].tuo.join(" ") + ",";
                            _s += item.groups[1].tuo.join(" ")
                        }
                        if (type == "ssc_3xds" || type == "ssc_3xfs") {
                            s += item.groups[0].tuo.join(" ") + " "
                            s += item.groups[1].tuo.join(" ") + " "
                            s += item.groups[2].tuo.join(" ")
                            _s += "_,_," + item.groups[0].tuo.join(" ") + ",";
                            _s += item.groups[1].tuo.join(" ") + ",";
                            _s += item.groups[2].tuo.join(" ");
                        }
                        if (type == "ssc_4xds" || type == "ssc_4xfs") {
                            s += item.groups[0].tuo.join(" ") + " "
                            s += item.groups[1].tuo.join(" ") + " "
                            s += item.groups[2].tuo.join(" ") + " "
                            s += item.groups[3].tuo.join(" ")
                            _s += "_," + item.groups[0].tuo.join(" ") + ","
                            _s += item.groups[1].tuo.join(" ") + ","
                            _s += item.groups[2].tuo.join(" ") + ","
                            _s += item.groups[3].tuo.join(" ")
                        }
                        if (type == "ssc_5xds" || type == "ssc_5xfs") {
                            s += item.groups[0].tuo.join(" ") + " "
                            s += item.groups[1].tuo.join(" ") + " "
                            s += item.groups[2].tuo.join(" ") + " "
                            s += item.groups[3].tuo.join(" ") + " "
                            s += item.groups[4].tuo.join(" ")
                            _s += item.groups[0].tuo.join(" ") + ","
                            _s += item.groups[1].tuo.join(" ") + ","
                            _s += item.groups[2].tuo.join(" ") + ","
                            _s += item.groups[3].tuo.join(" ") + ","
                            _s += item.groups[4].tuo.join(" ")
                        }
                        return notext ? _s : s;
                    }

                    function type(t) {
                        var r = '';
                        switch (t) {
                            case "ssc_yxzx":
                                r = "一星直选";
                                break;
                            case "ssc_exzx":
                                r = "二星直选";
                                break;
                            case "ssc_exfx":
                                r = "二星复选";
                                break;
                            case "ssc_3xds":
                                r = "三星单式";
                                break;
                            case "ssc_3xfs":
                                r = "三星复式";
                                break;
                            case "ssc_4xds":
                                r = "四星单式";
                                break;
                            case "ssc_4xfs":
                                r = "四星复式";
                                break;
                            case "ssc_5xds":
                                r = "五星单式";
                                break;
                            case "ssc_5xfs":
                                r = "五星复式";
                                break;
                        }
                        return r;
                    }

                    function remove(id) {
                        for (var j = 0; j < SSC_CAR.length; j++) {
                            if (SSC_CAR[j].SSC_ID == id) {
                                SSC_CAR.splice(j, 1)
                            }
                        }
                    }

                    function clear() {
                        SSC_CAR = [],
                            SSC_BEI = 1,
                            SSC_QI = 1,
                            SSC_ZJ = false,
                            SSC_ZJSTOP = false;
                    }
                    total = {
                        bei: SSC_BEI,
                        qi: SSC_QI,
                        count: car_count,
                        price: car_price * SSC_QI * SSC_BEI,
                        zjstop: SSC_ZJSTOP,
                        zj: SSC_ZJ
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
                function getOneSSC() {
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
                    var ssc = {
                        code: 'ssc_yxzx',
                        groups: [{
                            dan: null,
                            tuo: ge
                        }]
                    }
                    switch (u_type) {
                        case "yxzx":
                            ssc = {
                                code: 'ssc_yxzx',
                                groups: [{
                                    dan: null,
                                    tuo: ge
                                }]
                            }
                            break;
                        case "exzx":
                            ssc = {
                                code: 'ssc_exzx',
                                groups: [{
                                    dan: null,
                                    tuo: ge
                                }, {
                                    dan: null,
                                    tuo: shi
                                }]
                            }
                            break;
                        case "3xzx":
                            ssc = {
                                code: 'ssc_3xds',
                                groups: [{
                                    dan: null,
                                    tuo: ge
                                }, {
                                    dan: null,
                                    tuo: shi
                                }, {
                                    dan: null,
                                    tuo: bai
                                }]
                            }
                            break;
                        case "4xzx":
                            ssc = {
                                code: 'ssc_4xds',
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
                                }]
                            }
                            break;
                        case "wxzx":
                            ssc = {
                                code: 'ssc_5xds',
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
                    }
                    ssc.SSC_ID = ++CACHE_ID
                    return ssc;
                }
                $('#car-addhm').bind('click', function() {
                    location.href = "#!/yxzx"
                })
                $("#car-addjx").unbind().bind('click', function() {
                    var ssc = getOneSSC();
                    SSC_CAR.push(ssc)
                    renderCar();
                })
                $(".glyphicon.icon-trash").on("click", function() {
                    var s = countCar();
                    s.clear();
                    renderCar();
                })

                function tzsuccess() {
                    $("#car,#selectssc,#carfixed,#ssccar,#buycarfixedbtn").hide();
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
                        //证件类型  1身份证 2 军官证 3护照
                        // carType:"",
                        //彩票类型
                        gameType: "018",
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
                    d.needPay = sscCar.total.price;
                    //
                    d.lotoGson = mergeTZ();
                    /**
                     * 投注串 数据整合
                     */
                    function mergeTZ() {
                        if (!sscCar) return false;
                        var need = {
                            //彩票类型
                            gameType: "018",
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
                        need.totalSum = Number(sscCar.total.price)
                        need.isStop = sscCar.total.zjstop ? 1 : 0;
                        need.buyNumberArray = buyArrayGenerator(sscCar.list)
                        need.buyType = sscCar.total.qi > 1 ? 1 : 0;
                        need.title = sscCar.total.qi > 1 ? "重庆时时彩" + SSC_NOWQI + "期追号方案" : "重庆时时彩" + SSC_NOWQI + "期追号方案";
                        // xian ajax =
                        return need;
                    }                //投注号码串数据
                    function buyArrayGenerator(list) {
                        var r = [];
                        $(list).each(function(index, item) {
                            if (!item) return;
                            var it = join(item);
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
                            var rs = item._redStr //.split(" ").join(',')
                            dataTmp.buyNumber = rs;
                            // dataTmp.sum = CPCONFIG.JXSSC.UNIT_PRICE;
                            dataTmp.sum = item.price;
                            dataTmp.num = item.count;
                            dataTmp.multiple = sscCar.total.bei;
                            //////////////////////console.log(item.code)
                            switch (item.code) {
                                case "ssc_yxzx":
                                    dataTmp.typeId = "01"
                                    dataTmp.seleId = "01"
                                    break;
                                case "ssc_exzx":
                                    dataTmp.typeId = "02"
                                    dataTmp.seleId = "01"
                                    break;
                                case "ssc_exfx":
                                    dataTmp.typeId = "02"
                                    dataTmp.seleId = "02"
                                    break;
                                case "ssc_3xds":
                                    dataTmp.typeId = "03"
                                    dataTmp.seleId = "01"
                                    break;
                                case "ssc_3xfs":
                                    dataTmp.typeId = "03"
                                    dataTmp.seleId = "02"
                                    break;
                                case "ssc_4xds":
                                    dataTmp.typeId = "04"
                                    dataTmp.seleId = "01"
                                    break;
                                case "ssc_4xfs":
                                    dataTmp.typeId = "04"
                                    dataTmp.seleId = "02"
                                    break;
                                case "ssc_5xds":
                                    dataTmp.typeId = "05"
                                    dataTmp.seleId = "02"
                                    break;
                                case "ssc_5xfs":
                                    dataTmp.typeId = "05"
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
                            lottery: "CQSSC",
                            issues: sscCar.total.qi || SSC_QI
                        }, function(re) {
                            var rr= getRightIssue(SSC_NOWQI,re,sscCar.total.qi || SSC_QI)
                            r = merge(rr)
                            fn(r)
                        })
                        function getRightIssue(now,r,len){
                            var n=0;
                            var re=[];
                            for(var i=0;i< r.length;i++){
                                if(r[i].issue==now){
                                    n=i;
                                    for(var j=0;j<len;j++){
                                        re.push(r[n+j])
                                    }
                                }
                            }
                            return re;
                        }

                        function merge(list) {
                            var r = [];
                            $(list).each(function(index, item) {
                                if (item.issue >= SSC_NOWQI && r.length < SSC_QI) {
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
                   dialog("loading", "正在投注！");

                    u.getIssue(function(r) {
                        if (!r || !r.length) return dialog({
                            message: "投注异常，请重试",
                            autoHideDelay: 1000})
                        udata.lotoGson.issueArray = r;
                        udata.lotoGson = JSON.stringify(udata.lotoGson)
                        //////////////////////console.log(udata)
                        action.pl3Tz(udata, function(re) {
                            TZ_INFO($.parseJSON(re), fn)
                        })
                    })
                }
            }

    }

    return {
        jxssc : jxssc,
        cqssc : cqssc

    }

});