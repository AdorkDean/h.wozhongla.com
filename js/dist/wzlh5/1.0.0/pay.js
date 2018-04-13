/**
 * Created by hebo (razr409355439@gmail.com)on 15/1/7.
 */

define("wzlh5/1.0.0/pay",["jquery/2.1.1/jquery","wzlh5/1.0.0/ac","handlebars/1.3.0/dist/cjs/handlebars",'wzlh5/1.0.0/until',"wzlh5/1.0.0/cp","wzlh5/1.0.0/ui"],function (require, exports, module) {
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
    //验证码
    var pay = function(ac) {
        var actions = action,
            untils = until,
            rules = untils.RULES;
        switch (ac) {
            case "acz":
                alipayCz();
                break;
            case "yibao":
                yibaoCz();
                break;
            case "qq":
                qqCz();
                break;
            case "unioncz":
                unioncallcz();
                break;
            case "unionpay":
                unionpay();
                break;
            case "ubankcrads":
                ubankcrads();
                break;
            case "bindalipay":
                bindalipay();
                break;
            case "card2cash":
                card2cash();
                break;
            case "alipay2cash":
                alipay2cash();
                break;
            case "telecom":
                telecom();
                break;
            case "bindbank":
                bindbank();
                break;
            case "binkpay":
                binkpay();
                break;
            case "cashcenter":
                cashcenter();
                break;
            case "cjcard":
                cjcard();
                break;
            default:
                paycenter()
        }

        function loginJudge() {
            action.queryUserInfo({}, function(re) {
                if (re.resultCode == '200') {
                    if (re.data.message == "用户没有登录") {
                        //dialog('未登录!');
                        //location.href = "login.html?ref=" + location.href;
                        untils.ref('login',location.search)
                        return;
                    }
                }
            });
        }
        /**
         * 支付宝充值
         */
        function alipayCz() {
            $('.alipay-cz').on('keyup', function() {
                var $val = $(this).val().trim();
                $(this).val($val.replace(/\D/g, ""))
            })
            $('#alipaycz').on('click', function() {

                var dig = dialog("loading", '正在发起支付请求，请稍等片刻...');
                var $money = $(".alipay-cz").val().trim();
                if (!$money || $money<1) {
                    dialog('tips',"请输入正确充值金额！");
                    return false;
                } else {
                    //发起充值请求
                    actions.queyrUserAccount({}, function(re) {
                        //////////////////////console.log(re);
                        if (re.resultCode != '200') {
                            location.href = 'login.html';
                        } else {
                            actions.doAlipayCharge({
                                amount: $money
                            }, function(re) {
                                console.log(re);
                                if (re.status) {
                                    ////////alert(111111);
                                    document.write(re.data);
                                    window.location.href=re.data;
                                } else {
                                    dig.hide();
                                    setTimeout(function() {
                                        dialog({
                                            type: 'select',
                                            message: re.data,
                                            onConfirm: function() {
                                                location.href = 'login.html';
                                            }
                                        })
                                    }, 500)
                                }
                            })
                        }
                    });
                }
            })
        }
        /**
         * 易宝充值变成微信支付
         */
        function yibaoCz() {
            $('.alipay-cz').on('keyup', function() {
                var $val = $(this).val().trim();
                $(this).val($val.replace(/\D/g, ""))
            })
            $('#alipaycz').on('click', function() {

                var dig = dialog("loading", '正在发起支付请求，请稍等片刻...');
                var $money = $(".alipay-cz").val().trim();
                if (!$money || $money<1) {
                    dialog('tips',"请输入正确充值金额！");
                    return false;
                } else {
                    //发起充值请求
                    actions.queyrUserAccount({}, function(re) {
                        //////////////////////console.log(re);
                        if (re.resultCode != '200') {
                            location.href = 'login.html';
                        } else {
                            actions.weixinCharge({
                                amount: $money,
                                deviceInfo: "iOS_WAP",
                                appName: "我中啦",
                                appId: "h.wozhongla.com",
                                couponId: 0,
								isAgree: 0

                            }, function(re) {
                                console.log(re);
                                if (re.status) {
                                    ////////alert(111111);
                                    //document.write(re.data);
                                    window.location.href=re.payInfo;
                                } else {
                                    dig.hide();
                                    setTimeout(function() {
                                        dialog({
                                            type: 'select',
                                            message: re.data,
                                            onConfirm: function() {
                                                location.href = 'login.html';
                                            }
                                        })
                                    }, 500)
                                }
                            })
                        }
                    });
                }
            })
        }
        
        /**
         * QQ充值
         */
        function qqCz() {
        	//console.log(666)
            $('.alipay-cz').on('keyup', function() {
                var $val = $(this).val().trim();
                $(this).val($val.replace(/\D/g, ""))
            })
            $('#aliPaycz').on('click', function() {
				
                var dig = dialog("loading", '正在发起支付请求，请稍等片刻...');
                var $money = $(".alipay-cz").val().trim();
                if (!$money || $money<1) {
                    dialog('tips',"请输入正确充值金额！");
                    return false;
                } else {
                    //发起充值请求
                    actions.queyrUserAccount({}, function(re) {
                        
                        if (re.resultCode != '200') {
                            location.href = 'login.html';
                        } else {
                        	
                            actions.qqCharge({
                                amount: $money,
//                              deviceInfo: "iOS_WAP",
//                              appName: "我中啦",
//                              appId: "h.wozhongla.com",
                                couponId: 0,
								isAgree: 0
                            }, function(re) {  
                            	console.log(re)
                                if (re.status) {
                                    console.log(re);
                                    //document.write(re.data);
                                    window.location.href=re.data;
                                } else {
                                	console.log(666)
                                    dig.hide();
                                    setTimeout(function() {
                                        dialog({
                                            type: 'select',
                                            message: re.data,
                                            onConfirm: function() {
                                                location.href = 'login.html';
                                            }
                                        })
                                    }, 500)
                                }
                            })
                        }
                    });
                }
            })
        }
        /**
         * 微信充值
         */
        function weixinCz() {
            $('.weixin-cz').on('keyup', function() {
                var $val = $(this).val().trim();
                $(this).val($val.replace(/\D/g, ""))
            })
            $('#weixincz').on('click', function() {
                var $money = $(".weixin-cz").val().trim();
                if (!$money) {
                    dialog("请输入充值金额！")
                } else {
                    //发起充值请求
                    dialog("loading", "正在跳转至微信...")
                }
            })
        }

        /**
         * 彩金卡充值
         */
        function cjcard(){
            $('#alipaycz').on('click',function (){
                $(this).attr('disabled','disabled')
                var card = $('#charge-username').val().trim(),
                    pass = $('#charge-password').val().trim();
                if(!card){
                    dialog('tips','请填写正确的卡号！')
                    $(this).removeAttr('disabled')
                    return false;
                }else if(!pass){
                    dialog('tips','请填写正确的密码！')
                    $(this).removeAttr('disabled')
                    return false;
                }else{
                    actions.wzlCardCharge({
                        cardNumber: card,
                        cardPassword: pass
                    },function (re){
                        $('#alipaycz').removeAttr('disabled')
                        dialog('tips',re.data)
                        if(re.data=='用户未登录'){
                            setTimeout(function (){
                                location.href='login.html'
                            },2000)
                        }
                    })
                }
            })

        }

        function unioncallcz() {
            var $phone = $('.union-call-phone'),
                $money = $('.unicon-pay'),
                $bank = $('input[name="u-crads"]:checked')
            $('#unicon-cz').on("click", function() {
                var $p = $phone.val().trim(),
                    $m = $money.val(),
                    $b = $bank.val().trim();
                if (rules.MOBILE.test($p)) {
                    //手机号码正确。 发送请求
                    //////////////////////console.log($p)
                    //////////////////////console.log($m)
                    //////////////////////console.log($b)
                    dialog('loading', '正在提交！')
                } else {
                    dialog('请填写完整信息！')
                }
            })
            $('.pay-addcard').on("click", function() {})
        }

        function unionpay() {
            loginJudge('savingscard')
            var $cash = $('#cash')
            $pay = $('#pay');
            $pay.on('click', function() {
                ////////alert(222222)
                var dia = dialog("loading", '正在跳转银联支付，请稍等片刻...');
                $cashval = $cash.val();

                if(!$cashval){
                    dialog('tips', '请输入正确的充值金额...')
                    return false;
                }
                actions.queyrUserAccount({}, function(re) {
                    //////////////////////console.log(re);
                    dia.hide();
                    if (re.resultCode != '200') {
                        location.href = 'login.html';
                    } else {
                        actions.doMobileCharge({
                            amount: $cashval,
                            deviceInfo: "iOS_WAP",
                            appName: "我中啦",
                            appId: "h.wozhongla.com",
                            couponId: 0,
							isAgree: 0
                        }, function(re) {
                            dia.hide();
                            console.log(re);
                            if (re.status) {
                                ////////alert(111111);
                                $('#warp').fadeOut();
                                $('#warp2').fadeIn();
                                //////alert(re.data);
                                $("#payurl").attr('href', 'uppay://uppayservice/?style=token&paydata=' + re.data);
                            } else {
                                dia.hide();
                            }
                        });
                    }
                });
            });
        }
        /**
         * 银联充值
         */
        function ubankcrads() {
            ////////////////////////console.log(allBankData);
            allBankData = eval('(' + allBankData + ')');
            actions.queryBankInfo({}, function(re) {
                //////////////////////console.log(re);
                ////////////////////////console.log(re.data.bindInfo[0].accounts==null);
                if (re.resultCode == '200') {
                    if (re.data.statusCode == '3' || re.data.bindInfo[0].accounts == null) {
                        //dialog(re.data.message);
                        $('.banks-nobind').removeClass('hidden');
                        $('#tocash').show();
                    }
                    if (re.data.statusCode == '0' && re.data.bindInfo[0].accounts != null) {
                        $('.banks-bind').removeClass('hidden');
                        $('#tocash').show();
                        ////////////////////////console.log(re.data.bindInfo[0]);
                        $('.pay-items-subtitie').text('尾号' + re.data.bindInfo[0].accounts.substring(re.data.bindInfo[0].accounts.length - 4, re.data.bindInfo[0].accounts.length));
                    }
                } else {
                    dialog({
                        type: 'select',
                        message: '查询出现异常，确认进入首页',
                        onConfirm: function() {
                            location.href = '../index.html';
                        },
                        onCancel: function() {}
                    });
                }
            })
            var pop = iscrollPop({
                title: "添加银行卡",
                content: $('#add-crads-temp').html(),
                onclose: function() {
                    //////////////////////console.log("close")
                }
            })
            //添加银行卡
            $('#pay-addcard').on('click', function() {
                //////////////////////console.log('-0')

                actions.queryUserInfo({},function(re){
                    var relname = re.data.userinfo.realName;
                    var idCard = re.data.userinfo.idcard;
                    //console.log(idCard);
                    //console.log(sa);
                    if(!relname && !idCard){
                        dialog('tips','请先完善资料!')
                    }else{
                        pop.show(function() {

                            $('#add-crads-temp').html('');
                            $('#provinceinfo').on('change', function() {
                                ////////alert($(this).val());
                                ////////alert(11)
                                var val = $(this).val();
                                $('#cityinfo').html('<option value="-1" selected="selected">请选择市</option>');
                                //["tj"]
                                //////////////////////console.log(allBankData.data.link[val]);
                                var s = allBankData.data.link[val];
                                ////////////////////////console.log(s);
                                for (var i = 0, len = s.length; i < len; i++) {
                                    var str = '';
                                    str += '<option value="' + allBankData.data.def[s[i]] + '">' + allBankData.data.def[s[i]] + '</option>';
                                    $('#cityinfo').append(str);
                                };

                            });
                            $('#userna').val(relname).attr("disabled","disabled");

                            $('#idcards').val(idCard).attr("disabled","disabled");
                            $('#addcard').click(function() {

                                var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                                var reg2 = /^\d{16,19}$/;
                                var s = $('#provinceinfo').val();
                                var pro = allBankData.data.def[s];
                                var city = $('#cityinfo').val();
                                var obank = $('#bankinfo').val();
                                var account = $('#account').val();
                                var opass = $('#pass').val();
                                var useN=$('input[name="username"]');
                                var sa=$('#userna').val();

                                if(obank=='-1'){
                                    dialog('tips','请选择银行！');
                                    return false;
                                }
                                if(s=='-1'){
                                    dialog('tips','请选择银行所在省份');
                                    return false;
                                }

                                if(city=='-1'){
                                    dialog('tips','请选择银行所在市');
                                    return false;
                                }
                                if (!reg2.test(account)) {
                                    dialog('tips','请输入正确的银行卡号!')
                                    return false;
                                }else{
                                        if (!opass) {
                                            dialog('tips','密码不能为空');
                                            return false;
                                        }
                                }

//                        if (!pro) {
//                            dialog('tips','请填写省份');
//                            return false;
//                        } else if (!city) {
//                            dialog('tips','请填写市区');
//                            return false;
//                        } else if (!opass) {
//                            dialog('tips','密码不能为空');
//                            return false;
//                        } else if (!account) {
//                            dialog('tips','银行卡号不能为空');
//                            return false;
//                        }
                                /* var dia=dialog({
                                 message:'正在发送请求...',
                                 autoHideDelay: 2000,
                                 type: "default"
                                 })*/

                                action.bindBank({
                                    openBank: obank,
                                    accounts: account,
                                    password: opass,
                                    province: pro,
                                    city: city
                                }, function(re) {
                                    //console.log(re);
                                    if (re.resultCode == '200') {
                                        //dia.hide();
                                        setTimeout(function() {
                                            dialog(re.data);
                                            location.reload();
                                        }, 2000);
                                    }
                                    if (re.resultCode == '15') {
                                        //dia.hide();
                                        setTimeout(function() {
                                            dialog({
                                                type: "tips",
                                                message: re.data
                                            })
                                        }, 500);
                                    }
                                    /*setTimeout(function (){
                                     dialog(re.data);
                                     //location.reload();
                                     },2000);*/
                                });
                            });
                            //////////////////////console.log($("#bankinfo"))
                        });
                    }

                })

            })
        }

        function bindbank() {
            $('#submit-btn').on('click', function() {
                var $ubank = $('#bankname').val().trim(),
                    $uprov = $('#chose-province').val().trim(),
                    $ucity = $('#chose-city').val().trim(),
                    $wzlAccount = $('#wzl-account').val().trim(),
                    $realname = $('#realname').val().trim(),
                    $bankcard = $('#bankcard').val().trim(),
                    $password = $('#password').val().trim();
                if ($ubank == "default") {
                    dialog('请您选择银行');
                    return false;
                }
                if ($uprov == "default") {
                    dialog('请您选择省份');
                    return false;
                }
                if ($ucity == "default") {
                    dialog('请您选择市');
                    return false;
                }
                if (!$wzlAccount) {
                    dialog('我中啦账号不能为空');
                    return false;
                } else if (!$realname) {
                    dialog('请填写您的真实姓名');
                    return false;
                } else if (!$bankcard) {
                    dialog('请您填写正确的银行卡号');
                    return false;
                } else if (!$password) {
                    dialog('请您填写正确的密码');
                    return false;
                };
                ////////alert('a')
                dialog('loading', "正在发送提现请求");
            });
        }


        function paycenter() {
            ////////////////////////console.log("paycenter");
            function isWeixinBrowser() {
                var ua = navigator.userAgent.toLowerCase();
                return (/micromessenger/.test(ua)) ? true : false;
            }
            if (isWeixinBrowser()) {
                $('.list-group').removeClass('hidden')
            };



            actions.queyrUserAccount({}, function(re) {
                if (re.resultCode == '200') {
                    if (re.data.message == "用户没有登录") {
                        //dialog('未登录!');
                        //location.href = "login.html?ref=" + location.href;
                        untils.ref('login','ucenter')
                        return false;
                    }

                    $('.uname').text( re.data.username );
                    var pricea=parseFloat(re.data.accountInfo[0].balance)+parseFloat(re.data.accountInfo[1].balance);

                    $('#balance').text('余额:' +pricea.toFixed(2) + '元');
                    $('#balancea').text('余额:' +parseFloat(re.data.accountInfo[0].balance) + '元');

                    $('#getmoney').on('click', function(){
                        location.href='cards2cash.html?balance='+ parseFloat(re.data.accountInfo[0].balance);
                    })



                    var cd = re.data.accountInfo[0].createDt;

                    console.log(cd)

                    if (cd > 1459353600000){

                        $("#payList").html('<li class="tre tb" style="color: #c61414">抱歉，网站停售，暂不能充值，感谢您的支持和理解。</li>')
                    }
                    $("#payList").show()

                } else {
                    dialog('暂无数据');
                }
            });
        }
        //绑定支付宝
        function bindalipay() {
            //判断是否是登录状态
            var isLoad = Math.random() > 0.5;
            if (isLoad) { //显示绑定页
                $('.accomplish-block').show();
                $('.input-block').hide();
                //显示获取的用户名
                $('#alipay-name').text();
                //显示获取的卡号
                $('#alipay-card2').text();
                $('#submit-bind2').on('click', function() {
                    ////////alert('2');
                    var alipayUsername = $('#alipay-username2').val().trim();
                    var password = $('#password2').val().trim();
                    if (!alipayUsername) {
                        dialog('支付宝账号不能为空，请您进行完善。');
                    } else if (!password) {
                        dialog('密码不能为空，请您进行完善。');
                    };
                    dialog('loading', "正在发送提现请求");
                });
            } else { //显示填写页
                $('.accomplish-block').hide();
                $('.input-block').show();
                $('#submit-bind1').on('click', function() {
                    ////////alert('1');
                    var alipayUsername = $('#alipay-username1').val().trim();
                    var alipayName = $('#alipay-name1').val().trim();
                    var alipayCard = $('#alipay-card1').val().trim();
                    var password = $('#password1').val().trim();
                    if (!alipayUsername) {
                        dialog('支付宝账号不能为空，请您进行完善。');
                    } else if (!alipayName) {
                        dialog('姓名不能为空，请您进行完善。');
                    } else if (!alipayCard) {
                        dialog('卡号不能为空，请您进行完善。');
                    } else if (!password) {
                        dialog('密码不能为空，请您进行完善。');
                    }
                    dialog('loading', "正在发送提现请求");
                });
            };
        }
        /**
         * 银行卡提现
         *
         */
        function card2cash() {
            ////////alert(allBankData);
            /*openBank 开户行
             Accounts 账号
             Province 省
             City 市*/
            loginJudge('ucenter')
            actions.queryBankInfo({}, function(re) {
                //////console.log(re);
                ////////////////////////console.log(re.data.accounts==null);
                if (re.resultCode == '200' && re.data.statusCode == '0' && re.data.bindInfo[0].accounts != null) {
                    $('.banks-bind').removeClass('hidden');
                    $('.pay-items-subtitie').text('尾号' + re.data.bindInfo[0].accounts.substring(re.data.bindInfo[0].accounts.length - 4, re.data.bindInfo[0].accounts.length));
                    //////////////////////console.log(re.data.bindInfo[0]);
                    var openBank = re.data.bindInfo[0]['openbank'],
                        Accounts = re.data.bindInfo[0]['accounts'],
                        Province = re.data.bindInfo[0]['province'],
                        City = re.data.bindInfo[0]['city'];

                    $("#tocash").on('click', function() {
                        var $bank = $("input[name='bankcrad']:checked");
                        var $money = parseInt($input.val().trim()),
                            $bankcrad = $bank.val();
                        if (!$money) {
                            dialog('tips','请填写提现金额');
                            return false;
                        }

                        if(parseInt(untils.getRequestParameter('balance'))<$money){
                            dialog('tips','账户余额不足，请重新填写');
                            return false;
                        }

                        if ($money <= 5) {
                            dialog('tips','最低金额为'+"<span class='wzl-text-warning'>5</span>"+'元，请重新填写金额...');
                            return false;
                        } else if ($money > 5 && $money < 20000) {
                            dialog({
                                type: "select",
                                message: '提现手续费为'+"<span class='wzl-text-warning'>2</span>"+'元，确认继续提现...',
                                onCancel: function() {
                                    return;
                                },
                                onConfirm: function() {
                                    $('#tocash').attr('disabled','disabled');
                                    draw();
//                                    actions.verifyMobile({}, function(re) {
//                                        console.log(re);
//                                        if (re.resultCode == '202') {
//
//                                            draw();
//                                        } else {
//                                            alert('请帮订手机');
//                                        }
//                                    })

                                }
                            });
                        } else if ($money >= 20000 && $money < 50000) {
                            dialog({
                                type: "select",
                                message: '提现手续费为'+"<span class='wzl-text-warning'>5</span>"+'元，确认继续提现...',
                                onCancel: function() {
                                    return;
                                },
                                onConfirm: function() {
                                    $('#tocash').attr('disabled','disabled');
                                    draw();
                                }
                            });
                        } else if ($money >= 50000 && $money < 500000) {
                            dialog({
                                type: "select",
                                message: '提现手续费为'+"<span class='wzl-text-warning'>15</span>"+'元，确认继续提现...',
                                onCancel: function() {
                                    return;
                                },
                                onConfirm: function() {
                                    $('#tocash').attr('disabled','disabled');
                                    draw();
                                }
                            });
                        } else if ($money >= 500000 && $money < 1000000) {
                            dialog({
                                type: "select",
                                message: '提现手续费为'+"<span class='wzl-text-warning'>20</span>"+'元，确认继续提现...',
                                onCancel: function() {
                                    return;
                                },
                                onConfirm: function() {
                                    $('#tocash').attr('disabled','disabled');
                                    draw();
                                }
                            });
                        } else {
                            dialog({
                                type: "select",
                                message: '提现手续费以实际为准，确认继续...',
                                onCancel: function() {
                                    return;
                                },
                                onConfirm: function() {
                                    $('#tocash').attr('disabled','disabled');
                                    draw();

                                }
                            });
                        }

                        function draw() {
                            var dig = dialog('loading', "正在发送提现请求");

                            actions.draw({
                                cash: $money,
                                openBank: openBank,
                                Accounts: Accounts,
                                Province: Province,
                                City: City
                            }, function(re) {
                                //////////////////////console.log(re);
                                if (re.resultCode == '0') {
                                    dig.hide();
                                    setTimeout(function() {
                                        dialog({
                                            type: 'tips',
                                            message: re.data,
                                            onConfirm: function() {
                                                location.href = 'ucenter.html';
                                            }
                                        });
                                    }, 2000)
                                } else {
                                    dig.hide();
                                    setTimeout(function() {
                                        dialog({
                                            type: 'tips',
                                            message: re.data,
                                            onConfirm: function() {}
                                        });
                                    }, 2000)
                                }
                            });
                        }
                    })
                } else {
                    $('.banks-nobind').removeClass('hidden');
                }
            });
            allBankData = eval('(' + allBankData + ')');
            ////////////////////////console.log(allBankData.data);
            var $input = $("input[name='tocash']");
            $input.on('keyup', function() {
                var $val = $(this).val().trim();
                $(this).val($val.replace(/\D/g, ""))
            })
            var pop = iscrollPop({
                title: "添加银行卡",
                content: $('#add-crads-temp').html(),
                onclose: function() {
                    //////////////////////console.log("close")
                }
            })
            //添加银行卡
            $('#pay-addcard').on('click', function() {
                //////////////////////console.log('-0')

                pop.show(function() {
                    $('#add-crads-temp').html('');
                    $('#provinceinfo').on('change', function() {
                        ////////alert($(this).val());
                        ////////alert(11)
                        var val = $(this).val();
                        $('#cityinfo').html('<option value="-1" selected="selected">请选择市</option>');
                        //["tj"]
                        ////////////////////////console.log( allBankData.data.link[val]  );
                        var s = allBankData.data.link[val];
                        ////////////////////////console.log(s);
                        for (var i = 0, len = s.length; i < len; i++) {
                            var str = '';
                            str += '<option value="' + allBankData.data.def[s[i]] + '">' + allBankData.data.def[s[i]] + '</option>';
                            $('#cityinfo').append(str);
                        };
                    });
                    $('#addcard').click(function() {
                        var reg = /^\d{17}\w{1}$/;
                        var reg2 = /^\d{16,19}$/;
                        var s = $('#provinceinfo').val();
                        var pro = allBankData.data.def[s];
                        var city = $('#cityinfo').val();
                        var obank = $('#bankinfo').val();
                        var account = $('#account').val();
                        var opass = $('#pass').val();

                        if (!reg2.test(account)) {
                            dialog('tips','请输入正确的银行卡号!')
                            return false;
                        }

                        if (!reg.test($('#idcards').val().trim())) {
                            dialog('tips','请输入正确的18位身份证号!')
                            return false;
                        }

                        if($('#bankinfo').val()=='-1'){
                            dialog('tips','请选择银行！');
                            return false;
                        }

                        if($('#provinceinfo').val()=='-1'){
                            dialog('tips','请选择银行所在省份');
                            return false;
                        }

                        if($('#cityinfo').val()=='-1'){
                            dialog('tips','请选择银行所在市');
                            return false;
                        }

                        if (!pro) {
                            dialog('请填写省份');
                            return;
                        } else if (!city) {
                            dialog('请填写市区');
                            return;
                        } else if (!opass) {
                            dialog('密码不能为空');
                            return;
                        } else if (!account) {
                            dialog('银行卡号不能为空');
                            return;
                        }
                        action.bindBank({
                            openBank: obank,
                            accounts: account,
                            password: opass,
                            province: pro,
                            city: city
                        }, function(re) {
                            //////////////////////console.log(re);
                            if (re.resultCode == '200') {
                                //dia.hide();
                                location.reload();

                            }
                            if (re.resultCode == '15') {
                                //dia.hide();
                                setTimeout(function() {
                                    dialog({
                                        type: "tips",
                                        message: re.data
                                    })
                                }, 500);
                            }
                        });
                    });
                    //////////////////////console.log($("#bankinfo"))
                });
            })
        }
        /**
         * 支付宝提现
         */
        function alipay2cash() {
            var $input = $("input[name='tocash']");
            $input.on('keyup', function() {
                var $val = $(this).val().trim();
                $(this).val($val.replace(/\D/g, ""))
            })
            $("#tocash").on('click', function() {
                var $alipay = $('input[name="alipayaccount"]:checked');
                var $money = $input.val().trim(),
                    $alipayAccount = $alipay.val();
                if (!$money) {
                    dialog('请填写提现金额');
                    return;
                }
                if (!$alipayAccount) {
                    dialog("请选择支付宝账号或者绑定支付宝账号！")
                    return;
                }
                //发送求情
            })
            var pop = iscrollPop({
                title: "添加支付宝账号",
                content: $('#add-alipay-temp').html(),
                onclose: function() {
                    //////////////////////console.log("close")
                }
            })
            //添加支付宝
            $('.alipay-add').on('click', function() {
                //////////////////////console.log('-0')
                pop.show();
            })
        }
        //电信运营商卡充值
        function telecom() {
            var operator = 0;
            $('.icon-operators').on("click", function() {
                $(this).addClass('onselect').siblings().removeClass('onselect')
                operator = $(this).data("name");
            })
            $('#submit-btn').click(function() {
                var money = $('#money').val();
                var card = $('#cardNumber').val();
                var password = $('#cardPass').val();
                //////////////////////console.log(operator)
                if (!operator) {
                    dialog('请您选择运营商。')
                } else if (!card) {
                    dialog('请您输入正确的充值卡号。')
                } else if (!password) {
                    dialog('请您输入正确的充值卡密码。')
                }
            });
        }
    }
    //返回
    window.backAction = function(){
        try{
            rechargeAct.actFinish(-1);
        }catch(e){
            window.history.back(-1);
        }
    }
    return {
        pay : pay
    }
});