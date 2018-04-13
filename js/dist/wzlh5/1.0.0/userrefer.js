/**
 * Created by hebo (razr409355439@gmail.com)on 15/1/7.
 */

define("wzlh5/1.0.0/userrefer",["jquery/2.1.1/jquery","wzlh5/1.0.0/ac","handlebars/1.3.0/dist/cjs/handlebars",'wzlh5/1.0.0/until',"wzlh5/1.0.0/cp","wzlh5/1.0.0/ui"],function (require, exports, module) {
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
    var Ls = until.Ls;
    /**
     * localstorage 管理
     * @type {{set: set, get: get, remove: remove, clear: clear, each: each}}
     */
//    var Ls = {
//        /*_set: function(key, value) {
//         //在iPhone/iPad上有时设置setItem()时会出现诡异的QUOTA_EXCEEDED_ERR错误
//         //这时一般在setItem之前，先removeItem()就ok了
//         if (this.get(key) !== null) this.remove(key);
//         localStorage.setItem(key, value);
//         },
//         //查询不存在的key时，有的浏览器返回undefined，这里统一返回null
//         _get: function(key) {
//         var v = localStorage.getItem(key);
//         return v === undefined ? null : v;
//         },
//         _remove: function(key) {
//         localStorage.removeItem(key);
//         },
//         _clear: function() {
//         localStorage.clear();
//         },*/
//        set: function (name, value){
//            var Days = 3600;//十年
//            var oDate=new Date();
//            oDate.setDate(oDate.getDate()+Days*24*60*60*1000);
//            document.cookie=name+'='+encodeURIComponent(value)+';expires='+oDate;
//        },
//        get: function (name){
//            var arr=document.cookie.split('; ');
//
//            for(var i=0,len=arr.length;i<len;i++){
//                var arr2=arr[i].split('=');
//
//                if(arr2[0]==name){
//                    return decodeURIComponent(arr2[1]);
//                }
//            };
//        },
//        remove: function (name){
//            Ls.set(name, null,-1);
//        },
//        clear:function (){
//            var cookies = document.cookie.split(";");
//            for (var i = 0; i < cookies.length; i++) {
//                var cookie = cookies[i];
//                var position = cookie.indexOf("=");
//                var name = position > -1 ? cookie.substring(0, position) : cookie;
//                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
//            }
//        },
//        each: function(fn) {
//            var n = localStorage.length,
//                i = 0,
//                fn = fn || function() {},
//                key;
//            for (; i < n; i++) {
//                key = localStorage.key(i);
//                if (fn.call(this, key, this.get(key)) === false) break;
//                //如果内容被删除，则总长度和索引都同步减少
//                if (localStorage.length < n) {
//                    n--;
//                    i--;
//                }
//            }
//        }
//    }
    //验证码
    verify = function() {
        var $phoneBlock = $('.wzl-verifyphone-block'),
            $imgBlock = $('.wzl-verifyimg-block'),
            $imgCode = $('.wzl-verify-code'),
            $refresh = $('.wzl-verify-refresh'),
            $phoneCode = $('.wzl-getverify-phone');

        function toSwitch(str) {
            str == 'phone' ? $imgBlock.animate({
                "right": "120"
            }, 300) && $phoneBlock.animate({
                "right": "0"
            }, 300) : $phoneBlock.animate({
                "right": "120"
            }, 300) && $imgBlock.animate({
                "right": "0"
            }, 300);
        }

        function show() {
            refreshImg()
            $('.wzl-verifycode-block').show();
        }

        function refreshImg() {
            $('.wzl-verify-code').attr('src', action.INF_CONFIG + 'wzlInterface/servicesAPI/mobile/getCode?' + Math.random())
        }

        function hide() {
            $('.wzl-verifycode-block').hide();
        }

        function result() {
            var $val = $('.wzl-verify-input').val().trim();
            return $val;
        }

        function _action(fn) {
            $refresh.on('click', function() {
                //$('.wzl-verify-code').attr('src','http://192.168.0.244:9988/wzlInterface/servicesAPI/register/getCode?'+r)
                $imgCode.attr('src', action.INF_CONFIG + 'wzlInterface/servicesAPI/mobile/getCode?' + Math.random())
            })
            fn($refresh, $phoneCode, $imgCode, result);
        }
        return {
            toSwitch: toSwitch,
            show: show,
            hide: hide,
            result: result,
            action: _action,
            refreshImg: refreshImg
        }
    }
    //注册
    function register(ac){

            var actions = action,
                untils = until,
                rules = untils.RULES,
                verifyCode = verify();
            switch (ac) {
                case 'registerok':
                    registerok();
                    break;
            }

            $('input[name="username"]').focus();

            //密码显示隐藏
            $('#glyphicon-wzl-eye').on('click', function() {
                if ($('#password').attr('type') == 'text') {
                    $('#password').attr('type', 'password');
                } else {
                    $('#password').attr('type', 'text');
                }
            });
            //阻止form
            $('form').submit(function() {
                return false;
            });

            //键盘事件
            $(document).keydown(function(e){
                var $val = $(this).val().trim();
                //$('.wzl-nav-bar').text(e.keyCode)
                if(e.keyCode=='13'){
                    if (rules.MOBILE.test($val)) {
                        //如果是手机号
                        verifyCode.toSwitch('phone');
                        register('usermobile');
                    } else if (rules.EMAIL.test($val)) {
                        verifyCode.toSwitch('img')
                        register('useremail');
                    } else {
                        //非手机号
                        verifyCode.toSwitch('img');
                        register('username');
                    }
                }
            });
            //type username usermobile
            //
            function dialog(a,b){
                return alert(b)
            }
        function getUrl(){

                var url = location.search;
                json = {};
                if (url.indexOf("?") === -1) return {};
                var arr = url.substr(1).split("&");
                for(var i = 0, len = arr.length; i < len; i ++) {
                    json[arr[i].split("=")[0]]=unescape(arr[i].split("=")[1]);
                }
                return json;
        }

        function register(type) {
                $('#reg').unbind('click');
                $('#reg').on('click', function(e) {
                    var $uname = $('input[name="username"]').val(),
                        $upwd = $('input[name="password"]').val(),
                        $code = $('#code').val().toLowerCase();
                    var re = /^\w+$/;
                    var re2 =/^[\w+]{6,15}/;
                    var re3=/^[\u4e00-\u9fa5]+$/i;

                    if(re3.test($uname) && $uname.length>7){
                        dialog('tips','用户名过长(中文最多7位)');
                        return false;
                    }
                    if($uname== $upwd){
                        dialog('tips','密码不能和用户名一样');
                        return false;
                    }
                   if(!$uname){
                        dialog('tips','请输入用户名');
                        return false;
                    }else if(!re2.test($upwd)){
                        dialog('tips','密码6—15位，请重新输入');
                        return false;
                    }

                    if (!$('#reg-check').prop('checked')) {
                        dialog('tips','请您先同意用户协议和法律声明后再试！');
                        return false;
                    } else {
                        if (!$uname) {
                            dialog('tips','账号错误，请正确填写');
                            return false;
                        } else if (!$upwd) {
                            dialog('tips','密码错误，请正确填写');
                            return false;
                        } else if (!$code) {
                            dialog('tips','验证码不能为空');
                            return false;
                        }

                        var data;
                        if (type == 'usermobile') {
                            data = {
                                usermobile: $uname,
                                password: $upwd,
                                code: $code
                                //channelId:
                            }
                        }else {
                            data = {
                                username: $uname,
                                password: $upwd,
                                code: $code
                            }

                            var refer = getUrl().refer
                            if(refer){
                                data.refer = refer;
                            }
                            data.unionUserId = 167;
                            //console.log(data)

                           // ac.UNIONUSER_ID = 167

                        };
                        actions.register(data, function(re) {
                            if (re.resultCode == '200') {
                                Ls.clear();
                                Ls.set('balance',0);
                                Ls.set('username',re.data.userName);
                                alert("恭喜您，注册成功，请下载客户端");
                                window.location.href = "http://www.wozhongla.com/down/zlzh.html";
                            } else {
                                setTimeout(function (){
                                    dialog('tips',re.data);
                                },2000);
                            }
                        });
                    }
                });
            }
            //检测是否手机号码。


            $('input[name="username"]').on('blur', function() {
                var $val = $(this).val().trim();
                verifyCode.show();
                $('.register-tips').hide();
                //if (rules.MOBILE.test($val)) {
                //    //如果是手机号
                //    verifyCode.toSwitch('phone');
                //    register('usermobile');
                //    //verifyCode.toSwitch('img')
                //} else if (rules.EMAIL.test($val)) {
                //    verifyCode.toSwitch('img')
                //    register('useremail');
                //} else {
                    //非手机号
                    verifyCode.toSwitch('img');
                    register('username');
               // }
            })
            //验证码事件
            verifyCode.action(function(refresh, phoneCode, imgCode) {
                refresh.on('click', function() {

                    verifyCode.refreshImg('phone');
                    $('#code').val('');
                })
                phoneCode.on('click', function() {

                    $('#code').val('');

                    var $uphone = $('input[name="username"]').val().trim(),
                        i = 60,
                        timer = null;
                    if (rules.MOBILE.test($uphone)) {
                        //再次校验是否 手机号码
                        timer = setInterval(function() {
                            i--;
                            phoneCode.addClass('disabled');
                            phoneCode.html('再次获取(' + i + ')秒');
                            if (i == 0) {
                                clearInterval(timer)
                                phoneCode.removeClass('disabled');
                                phoneCode.html('再次获取');
                            }
                        }, 1000)
                    }
                        //请求验证码
                        actions.getCode({
                            userMobile: $uphone,
                            mess: 'userRegister'
                        }, function(re) {

                            if (re.resultCode == '200') {

                                dialog("发送验证码成功")
                                //location.href='ucenter.html'
                            } else {
                                dialog("tips","抱歉,验证码发送失败...")
                            }
                        })
                    return false;
                })
            })
//        var aca=$('.wzl-getverify-phone');
//        verifyCode.action(function(refresh,aca, imgCode){
//
//        });
            function registerok() {
                $('#username').text(decodeURIComponent(untils.getRequestParameter('userName')));
                if (untils.getRequestParameter('userMobile') != 'null') {
                    $('#isPhone').removeClass('wzl-text-warning').text(untils.getRequestParameter('userMobile'));
                    $('#verify-btn').remove();
                } else {
                    $('#changeuser').remove();
                };
                $('#registerok').on('click', function() {
                    location.href = 'ucenter.html';
                });
            }
            var serverPop = iscrollPop({
                title: "用户协议 和 法律声明",
                content: $('.yhxy').html(),
                onclose: function() {
                }
            });
            $('.wzl-server-a').click(function() {
                serverPop.show();
            })

    }

    //登陆
    function login(){
            var actions = action,
                untils = until,
                rules = untils.RULES,
                verifyCode = verify();
            var ref = untils.getRequestParameter('ref');
            verifyCode.show();
            verifyCode.toSwitch('img')
            //验证码事件
            verifyCode.action(function(refresh, phoneCode, imgCode) {
                refresh.on('click', function() {
                    verifyCode.refreshImg();
                    $('input[name="vercode"]').val('');
                })
                phoneCode.on('click', function() {
                    var $uphone = $('input[name="username"]').val().trim(),
                        i = 60,
                        timer = null;
                    if (rules.MOBILE.test($uphone)) {
                        //再次校验是否 手机号码
                        timer = setInterval(function() {
                            i--;
                            phoneCode.addClass('disabled');
                            phoneCode.html('再次获取(' + i + ')秒');
                            if (i == 0) {
                                clearInterval(timer)
                                phoneCode.removeClass('disabled');
                                phoneCode.html('再次获取');
                                i = 60;
                            }
                        }, 1000)
                    }
                    return false;
                })
            })
            $("#login").on('click', function() {
                var $uname = $('input[name="username"]').val(),
                    $upwd = $('input[name="password"]').val(),
                    $vercode = $('input[name="vercode"]').val().toLowerCase();
                if (!$uname) {
                    dialog("tips","用户名不能为空")
                    return false;
                } else if (!$upwd) {
                    dialog("tips","密码不能为空")
                    return false;
                } else if (!$vercode) {
                    dialog("tips","验证码不能为空")
                    return false;
                }  else {
                    actions.login({
                        userName: $uname,
                        passWord: $upwd,
                        code: $vercode
                    }, function(re) {
                        if (re.resultCode == '200') {
                            var h = untils.shref[ref];
                            untils.ref( h || 'ucenter.html')
                        } else {
                            if(re.resultCode=="500")
                                re.data = "账号或密码错误，请重试。"

                            setTimeout(function(){
                                dialog('tips',re.data||'账号或密码错误，请重试。');
                            },100)
                        }
                    })
                }
            })
            //联合登录
            $(".Oauth_login a").on("click", function() {
                dialog("tips", "暂未开通联合登录，敬请期待")
            })

    }
    //用户
    function userA(ac){

            var actions = action,
                untils = until,
                rules = untils.RULES,
                verifyCode = verify();
            switch (ac) {
                case 'verifyPhone':
                    verifyPhone();
                    break;
                case 'completeInfo':
                    completeInfo();
                    break;
                case 'findpwd':
                    findpwd();
                    break;
                case 'modifypwd':
                    modifypwd();
                    break;
                case 'udata':
                    udata();
                    break;
                case 'udataname':
                    udataName();
                    break;
                case 'udataid':
                    udataId();
                    break;
                default:
                    ucenter();
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
            //验证手机
            function verifyPhone() {
                loginJudge('ucenter');
                $('input[name="phone"]').on('focusout', function() {
                    var $val = $(this).val().trim();
                    if (rules.MOBILE.test($val)) {
                        //如果是手机号
                        verifyCode.toSwitch('phone');
                    } else {
                        //dialog("tips","非手机号码,请重新填写！")
                    }
                })
                var $phoneCode = $('.wzl-getverify-phone'),
                    $vercode = $('input[name="phone"]').val();
                var timei = 60,
                    timer = null;
                //验证码事件
                $phoneCode.on('click', function() {
                    var $vercode = $('#phone').val().trim();
                    //dialog("验证码已经发送，请查收")

                    timer = setInterval(function() {
                        timei--;
                        $phoneCode.addClass('disabled');
                        $phoneCode.html('再次获取(' + timei + ')秒');
                        if (timei <= 0) {
                            clearInterval(timer);
                            timei = 60;
                            $phoneCode.removeClass('disabled');
                            $phoneCode.html('再次获取');
                        }
                    }, 1000)
                    actions.getCode({
                        userMobile: $vercode,
                        mess: 'bindMobile'
                    }, function(re) {

                        if (re.resultCode == '200') {

                            dialog("发送验证码成功")
                            //location.href='ucenter.html'
                        } else {
                            dialog("tips","抱歉,验证手机失败...")
                        }
                    })
                })
                //验证按钮
                $("#verifyPhone").click(function() {
                    var $up = $('#phone').val().trim(),
                        $code = $('#vercode').val().trim();
                    if (!$up) {
                        dialog('tips','请输入正确的手机号')
                        return;
                    }
                    if (!rules.MOBILE.test($up)) {
                        dialog('tips','请输入正确的手机号')
                        return;
                    }

                    if (!$code) {
                        dialog('tips','请输入正确验证码')
                        return;
                    }
                    if (rules.MOBILE.test($up) && $code) {
                        actions.verifyMobile({
                            userMobile: $up,
                            code: $code
                        }, function(re) {
                            if (re.resultCode == '200') {
                                dialog('恭喜您绑定手机成功');
                                setTimeout(function() {
                                    //Ls里手机状态更新
                                    location.href = 'ucenter.html';
                                }, 3000)
                            } else {
                                dialog('tips',re.data);
                            }
                        })
                    }
                })
            }

            function completeInfo() {

                //手机号码
                var $phone = $('#phone'),
                //发送验证码按钮
                    $checkbtn = $("#checkphone"),
                //新用户绑定按钮
                    $bindbtn1 = $("#bind1"),
                //老用户绑定按钮
                    $bindbtn2 = $("#bind2");
                //STEP1 发送验证码请求
                $checkbtn.on("click", function() {
                    var $up = $phone.val().trim();
                    if (rules.MOBILE.test($up)) {
                        userComplete($up);
                    } else {
                        //验证未通过
                        dialog("手机号码有误！")
                    }
                })
                //查证用户状态  并 设置对应UI
                function userComplete(uphone) {
                    //模拟
                    var r = Math.random() > 0.5;
                    if (r) {
                        step2();
                    } else {
                        step3();
                    }
                }
                //STEP2
                function step2() {
                    $('#complete-info-step1').animate({
                        opacity: "0",
                        height: "0"
                    }, 500, function() {
                        $("#complete-info-step1").hide();
                    });
                    $('#complete-info-step2').animate(600).show();
                    var $phoneCode = $('.wzl-getverify-phone');
                    var timei = 60,
                        timer = null;
                    //验证码事件
                    $phoneCode.on('click', function() {
                        //发起请求 发送验证码
                        timer = setInterval(function() {
                            timei--;
                            $phoneCode.addClass('disabled');
                            $phoneCode.html('再次获取(' + timei + ')秒');
                            if (timei == 0) {
                                clearInterval(timer)
                                $phoneCode.removeClass('disabled');
                                $phoneCode.html('再次获取');
                            }
                        }, 1000)
                    })
                    $('#bind1').on('click', function() {
                        var $code = $('.wzl-verify-input').val().trim(),
                            $pwd = $('#password1').val().trim();
                        if (!$code) {
                            dialog("请输入验证码")
                        } else if (!$pwd || $pwd.length < 6) {
                            dialog('密码格式有误')
                        } else {
                            //发起ajax请求
                            dialog('loading', "完善信息中...")
                            setTimeout(function() {
                                dialog("完善成功！")
                                //完善成功去往哪里？
                                //location.href=""
                            }, 4000)
                        }
                    })
                }
                //STEP3
                function step3() {
                    $('#complete-info-step1').animate({
                        opacity: "0",
                        height: "0"
                    }, 500, function() {
                        $("#complete-info-step1").hide();
                    });
                    $('#complete-info-step3').animate(600).show();
                    $('#bind2').on('click', function() {
                        var $up2 = $('#phone1').val().trim();
                        if (rules.MOBILE.test($up2)) {
                            //手机正确 执行请求
                            dialog('loading', "正在绑定");
                            setTimeout(function() {
                                dialog({
                                    type: "tips",
                                    message: "绑定失败，请重试"
                                });
                            }, 2000)
                        } else {
                            dialog("手机号码有误");
                        }
                    })
                }
            }
            //找回密码 设定新密码
            function findpwd() {
                /*verifycode
                 uname
                 wzl-getverify*/
                /*verifyphone*/
                $('#glyphicon-wzl-eye').on('click', function() {
                    if ($('#oldpwd').attr('type') == 'text') {
                        $('#oldpwd,#newpwd').attr('type', 'password');
                    } else {
                        $('#oldpwd,#newpwd').attr('type', 'text');
                    }
                });
                var $phoneCode = $('.wzl-getverify-phone'),
                    $uname = $('#uname'),
                    $code = $('#verifycode');
                var timei = 60,
                    timer = null;
                //获取验证码


                $phoneCode.on('click', function() {
                    if(!$uname.val()){
                        return false;
                    }else{

                        actions.backPwdCode({
                            userMobile: $uname.val()
                        }, function(re) {
                            if (re.resultCode == '200') {
                                dialog('验证成功');
                                timer = setInterval(function() {
                                    timei--;
                                    $phoneCode.addClass('disabled');
                                    $phoneCode.html('再次获取(' + timei + ')秒');
                                    if (timei <= 0) {
                                        clearInterval(timer)
                                        $phoneCode.removeClass('disabled');
                                        $phoneCode.html('再次获取');
                                        timei = 60;
                                    }
                                }, 1000)
                            } else {
                                dialog(re.data)
                            }
                        })
                    }

                })
                //验证
                $('#verifyphone').on("click", function() {
                    var $un = $uname.val().trim(),
                        $co = $code.val().trim();
                    if (!$un || !$co) {
                        dialog('tips', '手机号或验证码不能为空')
                    } else {
                        //数据不为空， 校验开始，
                        //校验成功 进入下一步
                        actions.verifyCode({
                            userMobile: $un,
                            code: $co
                        }, function(re) {
                            if (re.resultCode == '200') {
                                setPwd();
                            } else {
                                dialog(re.data);
                                return false;
                            }
                        })
                    }
                })

                function setPwd() {
                    $('#findstep1').animate({
                        opacity: 0,
                        height: 0
                    }, 500, function() {
                        $('#findstep1').hide()
                    });
                    $("#findstep2").animate(600).show();
                    $('#checkok').click(function() {
                        var $old = $('#oldpwd').val().trim(),
                            $new = $('#newpwd').val().trim(),
                            $uname = $('#uname').val().trim(),
                            $verifycode = $('#verifycode').val().trim();
                            var re2 =/^[\w+]{6,15}/;
                        if (!$old || !$new) {
                            dialog("tips","请填写完整！");
                        } else if ($old !== $new) {
                            dialog('tips','重复密码错误');
                        } else if(!re2.test($old) || !re2.test($new)){
                            dialog("tips","密码不符合规范！");
                        }else {
                            actions.backPwd({
                                userMobile: $uname,
                                nPass: $new,
                                code: $verifycode
                            }, function(re) {
                                if (re.resultCode == '200') {
                                    dialog('恭喜您修改成功.2秒后跳转登录页.');
                                    //跳回用户中心
                                    setTimeout(function() {
                                        location.href = 'login.html';
                                    }, 2000)
                                } else {
                                    dialog(re.data);
                                }
                            })
                        }

                        function checklen(v) {
                            return v.length > 5;
                        }

                        function checknew(newpwd, repwd) {
                            return (checklen(newpwd) && checklen(repwd)) && newpwd == repwd;
                        }
                    })
                }
            }
            //修改密码
            function modifypwd() {
                loginJudge('ucenter');
                //密码显示隐藏
                $('#glyphicon-wzl-eye').on('click', function() {
                    if ($('#newpwd').attr('type') == 'password') {
                        $('#newpwd').attr('type', 'text');
                        $('#repwd').attr('type', 'text');
                    } else {
                        $('#newpwd').attr('type', 'password');
                        $('#repwd').attr('type', 'password');
                    }
                });
                $("#newpwd,#oldpwd,#repwd").on('keyup focusout', function() {
                    var $val1 = $('#oldpwd').val().trim();
                    var $val2 = $('#newpwd').val().trim();
                    var $val = $('#repwd').val().trim();

                    if (checklen($val) && checklen($val1) && checklen($val2) && checknew($val2, $val)) {
                        $('#modifybtn').removeClass('disabled')
                    } else {
                        $('#modifybtn').addClass('disabled')
                    }

                    function checklen(v) {
                        return v.length > 5;
                    }

                    function checknew(newpwd, repwd) {
                        return (checklen(newpwd) && checklen(repwd)) && newpwd == repwd;
                    }
                })
                $('#modifybtn').on('click', function() {
                    ////////alert(111111)
                    var $old = $('#oldpwd').val().trim(),
                        $new = $('#newpwd').val().trim(),
                        $re = $('#repwd').val().trim();

                    if ($old == $new) {
                        dialog('tips','新旧密码不能一致');
                        return false;
                    };
                    if (!$old || !$new || !$re) {
                        dialog('tips',"请填写完整！");
                    } else if ($new !== $re) {
                        dialog('tips','重复密码错误');
                    } else {
                        //发送请求
                        var dia = dialog("loading", '发送改密码请求');
                        action.updatePwd({
                            userMobile: Ls.get('username'),
                            oPass: $old,
                            nPass: $new
                        }, function(re) {
                            if (re.resultCode == '200') {
                                dia.hide();
                                setTimeout(function() {
                                    dialog('恭喜您修改密码成功！');
                                }, 300)
                                setTimeout(function() {
                                    //Ls.set('userName', $new);
                                    location.href = 'ucenter.html';
                                }, 3000)
                            } else {
                                dia.hide();
                                setTimeout(function() {
                                    dialog('tips', re.data);
                                }, 2000)
                                /*setTimeout(function() {
                                 dialog(re.data);
                                 }, 500)*/
                            }
                        })
                    }
                })
            }
            //用户中心
            function ucenter() {
                //请求到数据 渲染 然后显示

                setTimeout(function() {
                    $('.container-mask').hide();
                    $('.container').removeClass('hidden')
                }, 500)

                action.queryUserAllInfo({},function (re){
                    if(re.resultCode == '200' && re.data != '用户没有登录'){
                        $('.ubar').text('您好，' + re.data.userinfo.username);

                        //绑定手机状态显示
                        if (re.data.userinfo.mobile == null) {
                            $('#bondPhone').show();
                            $('#bondPhone').parent().attr('href', 'verifyphone.html')
                        } else {
                            $('#bondPhone').text('绑定号为 ' + re.data.userinfo.mobile);
                        }
                        //身份状态显示
                        if (re.data.userinfo.idcard == null) {
                            $('#bondIdcard').show();
                        } else {
                            $('#bondIdcard').remove();
                        }

                        //绑定银行卡显示
                        if(!re.data.bindInfo.length){
                            $('#bondBankcard').show()
                        }else{
                            $('#bondBankcard').hide()
                        }

                        //现金彩金渲染
                        re.data.u_xj = re.data.accountInfo[0]['balance'];
                        re.data.u_cj = parseInt(re.data.accountInfo[1]['balance']) + parseInt(re.data.accountInfo[2]['balance']) + '';

                        var moneyTemplate = Handlebars.compile($("#money-template").html());
                        $("#money_info_block").html(moneyTemplate({
                            data: re.data
                        }));
                        $('#paycenter').on('click', function() {
                            location.href = 'paycenter.html';
                        })
                        $('#cashcenter').on('click', function() {
                            location.href = 'cashcenter.html';
                        })
                    }else{
                        location.href='login.html'
                    }
                })

                /*action.queryUserInfo({}, function(re) {
                 //////////console.log(re.data);
                 if (re.resultCode == '200' && re.data.statusCode == '0') {
                 $('.ubar').text('您好，' + re.data.userinfo.username);

                 //绑定手机状态显示
                 if (re.data.userinfo.mobile == null) {
                 $('#bondPhone').show();
                 $('#bondPhone').parent().attr('href', 'verifyphone.html')
                 } else {
                 $('#bondPhone').text('绑定号为 ' + re.data.userinfo.mobile);
                 }
                 //绑定银行卡状态显示
                 if (re.data.userinfo.idcard == null) {
                 $('#bondIdcard').show();
                 } else {
                 $('#bondIdcard').remove();
                 }
                 } else {
                 //location.href = 'login.html?ref=' + location.href;
                 }
                 })*/

                /*actions.queyrUserAccount({}, function(re) {
                 //////////console.log(re);
                 if (re.resultCode == '200') {
                 if (re.data.message == "用户没有登录") {
                 //dialog('未登录!');
                 location.href = "login.html?ref=" + location.href;
                 return false;
                 }

                 re.data.u_xj = re.data.accountInfo[0]['balance'];
                 re.data.u_cj = parseInt(re.data.accountInfo[1]['balance']) + parseInt(re.data.accountInfo[2]['balance']) + '';

                 var moneyTemplate = Handlebars.compile($("#money-template").html());
                 $("#money_info_block").html(moneyTemplate({
                 data: re.data
                 }));
                 $('#paycenter').on('click', function() {
                 location.href = 'paycenter.html?usename=' + re.data.username + '&balance=' + re.data.u_xj;
                 })
                 $('#cashcenter').on('click', function() {
                 location.href = 'cashcenter.html?usename=' + re.data.username + '&balance=' + re.data.u_xj;
                 })
                 } else {
                 dialog('暂无数据');
                 }
                 });*/

                /*actions.queryBankInfo({}, function(re) {
                 //////////////console.log(re);
                 if (re.resultCode == '200' && re.data.statusCode == '0') {
                 //Ls.set('userBankcard', true);
                 $('#bondBankcard').hide()
                 } else {
                 //Ls.set('userBankcard', false);
                 $('#bondBankcard').show()
                 }
                 });*/

                /*Ls.get('userMobile')=='false' ? $('#bondPhone').show() : $('#bondPhone').hide();
                 Ls.get('userIdCard')=='false' ? $('#bondIdcard').show() : $('#bondIdcard').hide();
                 */
                $('#logout').on('click', function() {
                    ////////alert(1);
                    dialog({
                        type: 'select',
                        message: '您确认退出吗？',
                        onConfirm: function() {
                            //////alert(1)
                            action.logout({}, function(re) {
                                if (re.resultCode == '200') {
                                    location.href = 'login.html';
                                } else {}
                            })
                        },
                        onCancel: function() {
                            //////alert(2)
                        }
                    })
                })
            }
            //用户数据
            function udata() {
                //请求用户数据

                action.queryUserInfo({}, function(re) {

                    if(re.resultCode=='200' && re.data.statusCode=='0'){

                        if(re.data.userinfo.realName){
                            Ls.set('realname', re.data.userinfo.realName);
                        }

                        if(re.data.userinfo.idcard){
                            Ls.set('idcard',re.data.userinfo.idcard);
                        }

                        if(re.data.userinfo.address){
                            Ls.set('address',re.data.userinfo.address);
                        }

                        var reg = /wzl/;

                        if (re.data.userinfo.mobile != null && reg.test(re.data.userinfo.username)) {
                            $('#motifyusername').removeClass('hidden');
                        } else {
                            $('#motifyusername').remove();
                        }
                        $('.udatam-uname').html(re.data.userinfo.username);
                        if (re.data.userinfo.idcard == null) {
                            $('#motifyid').removeClass('hidden');
                        } else {
                            //$('#motifyid').remove();
                            $('#motifyid').removeClass('hidden');
                            $('.udatam-uidname').html(re.data.userinfo.realName)
                            $('.udatam-uid').html(re.data.userinfo.idcard)
                            $('.udatam-address').html(re.data.userinfo.address)
                        }
                    } else {
                        dialog('tips', '暂无数据显示');
                        location.href('login.html');
                    }
                })

                loginJudge('ucenter');

                //判断用户名修改按钮
                //$('.udatam-uname').html(Ls.get('u_n'));
                /*$('.udatam-uname').html("小何")
                 $('.udatam-uidname').html("何波")
                 $('.udatam-uid').html("140511125156984562")
                 $('.udatam-address').html("北京国家体育馆")*/
                //请求到数据 渲染 然后显示
                setTimeout(function() {
                    $('.container-mask').hide();
                    $('.container').removeClass('hidden')
                }, 1000)
            }
            //改用户名
            function udataName() {
                loginJudge('ucenter');
                var $un = $('input[name="username"]')
                $("#udata-name").on("click", function() {
                    var $unv = $un.val().trim();
                    if (!$unv) {
                        dialog('请填写用户名')
                    } else {
                        //发送请求
                        dialog("保存信息中");
                        actions.uchangeName({
                            username: encodeURIComponent($unv)
                        }, function(re) {
                            ////////////////////console.log(re);
                            if (re.resultCode == '200') {
                                dialog('tips','恭喜您修改用户名成功');
                                setTimeout(function() {
                                    //Ls里手机状态更新
                                    //Ls.set('userName', $unv);
                                    location.href = 'ucenter.html';
                                }, 3000)
                            } else {
                                dialog(re.data);
                            }
                        });
                    }
                })
            }
            //改身份资料
            function udataId() {
                loginJudge('ucenter')

                /*if (Ls.get('idcard') != null) {
                 //////alert(2)
                 $('#idcard').attr('disabled', 'disabled').val(Ls.get('idcard'))
                 }
                 if (Ls.get('realname') != null) {
                 //////alert(3)
                 $('#realname').attr('disabled', 'disabled').val(Ls.get('realname'))
                 }
                 if (Ls.get('address') != null) {
                 //////alert(4)
                 $('#address').val(Ls.get('address'))
                 }*/

                action.queryUserInfo({}, function(re){
                    ////////////////console.log(re);
                    if(re.resultCode=='200' && re.data.statusCode=='0'){
                        var relname = re.data.userinfo.realName,
                            idcard = re.data.userinfo.idcard,
                            address = re.data.userinfo.address;
                        if(relname!=null){
                            $('#realname').attr('disabled', 'disabled').val( relname )
                        }

                        if(idcard!=null){
                            $('#idcard').attr('disabled', 'disabled').val( idcard )
                        }

                        if(address!=null){
                            $('#address').val( address )
                        }

                    }else{
                        dialog('tips','暂未查到您的身份信息，可能导致修改资料失败...')
                    }
                })

                var $un = $('input[name="username"]'),
                    $ud = $('input[name="useraddress"]'),
                    $uid = $('input[name="userid"]');
                $("#udata-id").on('click', function() {
                    //var reg = /^\d{17}\w{1}$/;
                    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                    var $unv = $un.val().trim(),
                        $udv = $ud.val().trim(),
                        $uidv = $uid.val().trim();
                    if (!reg.test($uidv)) {
                        dialog('请输入正确的身份证号!')
                        return;
                    }
                    if (!$unv || !$uidv) {
                        dialog('请填写完整信息')
                        return;
                    } else {
                        //发送ajax请求
                        actions.modifyId({
                            realname: encodeURIComponent($unv),
                            idcard: $uidv,
                            address: encodeURIComponent($udv)
                        }, function(re) {
                            //////////////console.log(re);
                            if (re.resultCode == '200') {

                                dialog('tips','恭喜您绑定资料成功');
                                setTimeout(function (){
                                    location.href = 'udatamanage.html';
                                },2000)

                                /*setTimeout(function() {
                                 //Ls里资料更新
                                 location.href = 'ucenter.html';
                                 }, 3000)*/
                            } else {
                                if(re.resultCode == '400'){
                                    dialog('tips',re.data);
                                }else{
                                    dialog('tips','绑定资料失败，请重试...');
                                }
                            }
                        });
                    }
                })
            }//

    }

   return {
       register : register,
       login    :login,
       userA     :userA
   }

});