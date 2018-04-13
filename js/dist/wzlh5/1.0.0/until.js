/**
 * Created by hebo (razr409355439@gmail.com)on 15/1/6.
 */
define("wzlh5/1.0.0/until",["jquery/2.1.1/jquery","handlebars/1.3.0/dist/cjs/handlebars","wzlh5/1.0.0/ac"],function(require, exports, module){
    var $ = require("jquery/2.1.1/jquery");
    var action = require("wzlh5/1.0.0/ac");
    var wzlui = require("wzlh5/1.0.0/ui")
    var Handlebars = require("handlebars/1.3.0/dist/cjs/handlebars").default;
    var pops = wzlui.containerMask,
        iscrollPop = wzlui.iscrollPop,
        dialog = wzlui.dialog,
        containerMask = wzlui.containerMask,
        dropdownMask = wzlui.dropdownMask


    //正则规则
    var RULES = {
        MOBILE: /^(?:13[0-9]|14[57]|15[0-35-9]|170|18[0-9])\d{8}$/,
        EMAIL: /^\w+(?:[\._+\-]\w+)*@\w+(?:\.\w+)+$/
    }
    //项目根目录
   var oUrl = "";
    var len = function(s) { 
        var l = 0;
        var a = s.split("");
        for (var i = 0; i < a.length; i++) {
            if (a[i].charCodeAt(0) < 299) {
                l++
            } else {
                l += 2
            }
        }
        return l;
    };
    var getRequestParameter = function(a) {
        var b = document.location.search || document.location.hash;
        if (a == null) return b;
        if (b) {
            b = b.substring(1).split("&");
            for (var c = 0; c < b.length; c++)
                if (b[c].substring(0, b[c].indexOf("=")) == a) return b[c].substring(b[c].indexOf("=") + 1)
        }
        return ""
    };
    var _Base64 = (function() {
        /**
         *
         *  Base64 encode / decode
         *
         *  @author haitao.tu
         *  @date   2010-04-26
         *  @email  tuhaitao@foxmail.com
         *
         */
        function Base64() {
            // private property
            var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            // public method for encoding
            this.encode = function(input) {
                var output = "";
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                var i = 0;
                input = _utf8_encode(input);
                while (i < input.length) {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);
                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;
                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }
                    output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
                }
                return output;
            }
            // public method for decoding
            this.decode = function(input) {
                var output = "";
                var chr1, chr2, chr3;
                var enc1, enc2, enc3, enc4;
                var i = 0;
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                while (i < input.length) {
                    enc1 = _keyStr.indexOf(input.charAt(i++));
                    enc2 = _keyStr.indexOf(input.charAt(i++));
                    enc3 = _keyStr.indexOf(input.charAt(i++));
                    enc4 = _keyStr.indexOf(input.charAt(i++));
                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;
                    output = output + String.fromCharCode(chr1);
                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }
                }
                output = _utf8_decode(output);
                return output;
            }
            // private method for UTF-8 encoding
            _utf8_encode = function(string) {
                string = string.replace(/\r\n/g, "\n");
                var utftext = "";
                for (var n = 0; n < string.length; n++) {
                    var c = string.charCodeAt(n);
                    if (c < 128) {
                        utftext += String.fromCharCode(c);
                    } else if ((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128);
                    } else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }
                }
                return utftext;
            }
            // private method for UTF-8 decoding
            _utf8_decode = function(utftext) {
                var string = "";
                var i = 0;
                var c = c1 = c2 = 0;
                while (i < utftext.length) {
                    c = utftext.charCodeAt(i);
                    if (c < 128) {
                        string += String.fromCharCode(c);
                        i++;
                    } else if ((c > 191) && (c < 224)) {
                        c2 = utftext.charCodeAt(i + 1);
                        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                        i += 2;
                    } else {
                        c2 = utftext.charCodeAt(i + 1);
                        c3 = utftext.charCodeAt(i + 2);
                        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                        i += 3;
                    }
                }
                return string;
            }
        }
        return new Base64();
    })();
    var shref={
        'login':oUrl+'/views/login.html',
        'index':'/index.html',
        'ucenter':oUrl+'/views/ucenter.html',
        'paycenter':oUrl+'/views/paycenter.html',
        'ssq':oUrl+'/views/ssq.html',
        'dlt':oUrl+'/views/dlt.html',
        'jc':oUrl+'/views/jc.html',
        'jx11x5':oUrl+'/views/jx11x5.html',
		'ahk3':oUrl+'/views/ahk3.html',
        'fc3d':oUrl+'/views/fc3d.html',
        'pl3':oUrl+'/views/pl3.html',
        'ssc':oUrl+'/views/ssc.html',
        'cqssc':oUrl+'/views/cqssc.html',
        'pl5':oUrl+'/views/pl5.html',
        'qxc':oUrl+'/views/qxc.html',
        'qlc':oUrl+'/views/qlc.html',
        'accountdetail':oUrl+'/views/accountdetail.html',
        'bettingdetail':oUrl+'/views/bettingdetail.html',
        'bettingRecord':oUrl+'/views/bettingRecord.html',
        'bettingZH':oUrl+'/views/bettingZH.html',
        'savingscard':oUrl+'/views/savingscard.html'
    }
    var ref = function(url, backurl) {
	console.log(url+'=1');
	console.log(backurl+'=2')
        if(backurl){
        
          window.location.href = shref[url] + '?ref=' + matchflat(backurl)
        }else{
        	
        window.location.href = url
        }

        function matchflat(u){
            var s = u.substring( u.lastIndexOf('/')+1, u.lastIndexOf('.') )
            return s;
        }
    };
    var searchRef = function(u){
        (function mathRoot(){
            window.WzlRoot = location.hostname;
        })()
        return window.WzlRoot+shref[u]
    }
    /**
     * 扩展
     */
    $.fn.extend({
        /**
         * 随机选号扩展方法
         *
         */
        randombox: function(fn) {
            var n, bClick = false;
            var $this = $(this);
            var $ball = $this.parent().next('.ball-random-block');
            $this.unbind().bind('click', function() {
                var t = $this.parent().offset().top;
                var h = $this.outerHeight();
                var r = $(window).width() - ($this.offset().left + $this.outerWidth() + 10);
                $ball.css({
                    zIndex: 1000,
                    top: t + h + 10,
                    right: r,
                    position: 'absolute'
                });
                if (bClick) {
                    bClick = false;
                    $ball.hide();
                    $this.addClass('icon-dropdown-trans').removeClass('icon-dropup-trans');
                } else {
                    bClick = true;
                    $ball.show();
                    $this.removeClass('icon-dropdown-trans').addClass('icon-dropup-trans');
                };
                //$ball.fadeToggle();
                $this.parent().next('.ball-random-block ').find('li').unbind('click');
                $this.parent().next('.ball-random-block ').find('li').on('click', function() {
                    $(this).parent().parent().hide();
                    n = $(this).children().attr('num');
                    $(this).parent().parent().prev('.ballcon-jx-se').find('.ballcon-js-n').text(n + '个');
                    $this.prev().attr('num', n);
                    fn && fn(n);
                });
            });
            $this.prev().unbind().bind('click', function() {
                n = $(this).attr('num');
                fn && fn(n);
            });
        }
    })
    $.extend({
        wzlmore: function(fn) {
            $('.wzl-nav-more').click(function() {
                var $this = $(this);
                $('.drop-down-more').fadeToggle();
                var $d = $('.drop-down-more').find('ul').find('li');
                $d.unbind('click');
                $d.click(function() {
                    $('.drop-down-more').hide();
                });
                fn && fn($d);
            });
            $('body').click(function(e) {
                if (!$(e.target).hasClass("icon-more")) {
                    $('.drop-down-more').hide();
                }
            })
        },
        wzlhistory: function(type, fn) {
            var lottery = "";
            //初始化状态
            switch (type) {
                case 'ssq':
                    lottery = 'SSQ';
                    action.querySsq({
                        pageno: 1,
                        pagesize: 10
                    }, function(d) {
                        fomatIssue(d.lotolist,'ssq-history')
                    })
                    break;
                case 'ssc':
                    lottery = 'JXSSC';
                    break;
                case 'fc3d':
                    lottery = 'FC3D';
                    action.queryFc3d({
                        pageno: 1,
                        pagesize: 10
                    }, function(d) {
                        fomatIssue2(d.lotolist,'f3d-history')
                    })
                    break;
                case 'pl3':
                    lottery = 'PL3';
                    action.querypl3({
                        pageno: 1,
                        pagesize: 10
                    }, function(d) {
                        fomatIssue2(d.lotolist,'pl3-history')
                    })
                    break;
                case 'dlt':
                    lottery = 'DLT';
                    action.queryDlt({
                        pageno: 1,
                        pagesize: 10
                    }, function(d) {
                        fomatIssue(d.lotolist,'dlt-history')
                    })
                    break;
                case 'cqssc':
                    lottery = 'CQSSC';
                    break;
                case 'pl5':
                    lottery = 'PL5';
                    action.querypl5({
                        pageno: 1,
                        pagesize: 10
                    }, function(d) {
                        fomatIssue2(d.lotolist,'pl5-history')
                    })
                    break;
                case 'qxc':
                    lottery = 'QXC';
                    action.queryqxc({
                        pageno: 1,
                        pagesize: 10
                    }, function(d) {
                        fomatIssue2(d.lotolist,'qxc-history')
                    })
                    break;
                case 'qlc':
                    lottery = 'QLC';
                    action.queryqlc({
                        pageno: 1,
                        pagesize: 10
                    }, function(d) {
                        fomatIssue(d.lotolist,'qlc-history')
                    })
                    break;
                case 'jx11x5':
                    lottery = 'JX11X5';

                    break;
            }

            //加载其次数据
            action.getIssue({
                lottery: lottery
            }, function(d) {
                setIssue(d[0]);
            });

            function fomatIssue(d,name){
                var arr=[];
                for (var i = 0; i < d.length; i++) {
                    var obj={};
                    obj.issue = d[i].lotIssue;
                    obj.redball = d[i].kjCode.split('+')[0];
                    obj.blueball = d[i].kjCode.split('+')[1];
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

            //设置期次信息
            function setIssue(d) {
                //icon-dropdown-gray 暂时去掉下拉图标
                setCountDown(d.endTime)
                var timer = null;
                $(".history-bar").html(" <span>第" + d.issue + "期销售中</span><div class='pull-right history-bar-dropdown icon-dropdown-gray'> <span class='redballs'>00</span>时<span class='redballs'>00</span>分<span class='redballs'>00</span>秒</div>")

                function setCountDown(s) {
                    if (type == "ssc") {
                        s = s - 120;
                        if (s < 0) {
                            clearTimeout(timer)
                            d.endTime = 600;
                            s = 600;
                            d.issue++;
                            setIssue(d);
                        }
                    } else if (type == "cqssc") {
                        s = s - 90;
                        if (s < 0) {
                            clearTimeout(timer)
                            d.endTime = 600;
                            s = 600
                            d.issue++;
                            setIssue(d)
                        }
                    }
                    timer = setInterval(function() {
                        s--;
                        if (s == 0) {
                            clearTimeout(timer)
                            location.reload();
                            $('.history-bar .history-bar-dropdown').html("<span class='redballs'>已停止销售！</span>")
                        }
                        var v = formatSeconds(s)
                        $('.history-bar .history-bar-dropdown').html(v)
                    }, 1000)
                }

                function formatSeconds(value) {
                    var theTime = parseInt(value); // 秒
                    var theTime1 = 0; // 分
                    var theTime2 = 0; // 小时
                    // //////alert(theTime);
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
                var s = d.endTime
                if (type == "ssc") {
                    s = s - 120;
                    if (s < 0) {
                        d.issue++;
                    }
                } else if (type == "cqssc") {
                    s = s - 90;
                    if (s < 0) {
                        d.issue++;
                    }
                }
                fn && fn(d);
            }
        },
        yaoyiyao: function(fn) {
            var n = 0;
            if (window.DeviceMotionEvent) {
                var speed = 20;
                var x = y = z = lastX = lastY = lastZ = 0;
                window.addEventListener('devicemotion', function() {
                    var acceleration = event.accelerationIncludingGravity;
                    x = acceleration.x;
                    y = acceleration.y;
                    if (Math.abs(x - lastX) > speed || Math.abs(y - lastY) > speed) {
                        fn && fn();
                        var d = new Date();
                        var t = d.getTime();
                        if (t - n >= 3000) {
                            fn && fn();
                            n = t;
                        }
                    }
                    lastX = x;
                    lastY = y;
                }, false);
            }
        }//
    })
    (function(){
     var isTouch = ('ontouchstart' in document.documentElement) ? 'touchstart' : 'click', _on = $.fn.on;
     $.fn.on = function(){
     arguments[0] = (arguments[0] === 'click') ? isTouch: arguments[0];
     return _on.apply(this, arguments);
     };
     })
    var Y_Y = function(fn) {
        var n = 0,
            _fn = false;
        function deviceMotionHandler() {
            var speed = 15;
            var x = y = z = lastX = lastY = lastZ = 0;
            var acceleration = event.accelerationIncludingGravity;
            x = acceleration.x;
            y = acceleration.y;
            z = acceleration.z;
            if (Math.abs(x - lastX) > speed || Math.abs(y - lastY) > speed|| Math.abs(z - lastZ) > speed) {
                var d = new Date();
                var t = d.getTime();
                if (t - n >= 1500) {
                    fn && fn();
                    n = t;
                }
            }
            lastX = x;
            lastY = y;
            lastZ = z;
            _fn = true;
        }
        if (window.DeviceMotionEvent) {
            //$(window).on("devicemotion",deviceMotionHandler)
            window.removeEventListener('devicemotion',deviceMotionHandler, false);
            window.addEventListener('devicemotion', deviceMotionHandler, false);
        }
        $(".ball-yaoyiyao").unbind().bind('click',function(){
            fn&&fn()
        })
    }
    var TZ_INFO = function(info, fn) {
    	
        var s = "投注异常",
        code = Number(info.status)
        //code==5011||code==5012?localStorage.setItem('qrType',0):'';  
        console.log(code)
        switch (code) {
            case 200:
                s = "正在出票，请关注兑换记录"
                success();
                break;
            case 300:
                s = "用户未登录"
                needLogin();
                //commenError();
                break;
            case 301:
                s = "非法用户，投注信息已变更"
                commenError();
                break;
            case 302:
                s = "重复提交"
                commenError();
                break;
            case 303:
                s = "投注信息不完整"
                commenError();
                break;
            case 304:
                commenError();
                break;
            case 305:
                commenError();
                break;
            case 306:
                s = "单场上传内容为空"
                commenError();
                break;
            case 307:
                s = "投注期次未开售或已过期"
                commenError();
                break;
            case 308:
                s = "解析票错误"
                commenError();
                break;
            case 309:
                s = "用户未登录"
                needLogin();
                break;
            case 310:
                s = "购票异常"
                commenError();
                break;
            case 311:
                s = "用户信息不全，请补全。"
                needInfo();
                break;
            case 501:
                s = "账户余额不足，请重新扫描二维码。"
                //needCz();
                ewm_first();
                break; 
            case 5011:
                s = "该二维码已经使用，是否进行余额支付"
               	ewm();
                break;
            case 5012:
                s = "该二维码已过期，是否进行余额支付"
               	ewm();
                break;
            case 5013:
                s = "该二维码金额不足，是否进行余额支付"
               	ewm();
                break;
            case 510:
                s = "投注失败，该彩种已停止兑换"
                commenError()
                break;
            default:
                commenError()
        }
        //未登录
        function needLogin() {

            dialog({
                type: "tips",
                message: s,
                onConfirm: function() {
                   ref("login", location.pathname)
                }
            })
            //
        }

        function needCz() {
            dialog({
                type: "tips",
                message: s,
                onConfirm: function() {
                    ref("paycenter", location.pathname )
                },
                onCancel: function() {

                }
            })
        }
        //补全信息
        function needInfo() {
            dialog({
                type: "tips",
                message: s,
                onConfirm: function() {
                    ref("ucenter", location.pathname )
                }
            })
        }
        //
        function commenError() {
            dialog({
                type: "tips",
                message: s,
                onConfirm: function() {
                    location.reload();
                }
            })
        }

        function success() {
			$(".ui-mask").hide();
			$("#oBalance").hide();
			localStorage.setItem("bottomBox",1);
            dialog({
                type: "tips",
                message: s,
                onConfirm: function() {
                	//console.log(666)
                    fn && fn(info)
                }
            })
            
        }
       
        function ewm() {
            dialog({
                type: "select",
                message: s,
                onConfirm: function() {
                    fn && fn(info)
                }
            })
        }
        function ewm_first() {
            dialog({
                type: "tips",
                message: s,
                onConfirm: function() {
                    fn && fn(info)
                }
            })
        }
    }
    /**
     * 路由
     * */
    var Router
    Router = function(routes) {
        var win = window,
            ac = [],
            def = {
                type: "!"
            };
        if (!routes || typeof routes !== "object") return;
        else parseRouter(routes);

        function parseRouter(routes) {
            for (var i in routes) {
                if (typeof i == 'string' && typeof routes[i] == "function") ac.push({
                    path: i,
                    fn: routes[i]
                })
            }
        }

        function parseHash(url) {

            var ucache = url.replace(/^[^#]*/, ''),
                u;
            if (ucache[1] != def.type) {
                return '';
            }
            u = ucache.slice(2);


            return u;
        }
        $(win).bind('hashchange', function(ev) {
            var originEvent = ev.originalEvent,
                newUrl = originEvent.newURL,
                oldUrl = originEvent.oldURL;


            checkHash(newUrl)
        });

        function checkHash(url) {
            var hash = parseHash(url) || "index";
            $(ac).each(function(i, router) {
                if (router.path == hash) {
                    router.fn()
                }
            })
        }
        //初始化执行
        routes.init();
        checkHash(win.location.hash);
    }
    /**
     * localstorage 管理
     * @type {{set: set, get: get, remove: remove, clear: clear, each: each}}
     */

    var Ls = {
        /*_set: function(key, value) {
         //在iPhone/iPad上有时设置setItem()时会出现诡异的QUOTA_EXCEEDED_ERR错误
         //这时一般在setItem之前，先removeItem()就ok了
         if (this.get(key) !== null) this.remove(key);
         localStorage.setItem(key, value);
         },
         //查询不存在的key时，有的浏览器返回undefined，这里统一返回null
         _get: function(key) {
         var v = localStorage.getItem(key);
         return v === undefined ? null : v;
         },
         _remove: function(key) {
         localStorage.removeItem(key);
         },
         _clear: function() {
         localStorage.clear();
         },*/
        set: function (name, value){
            var Days = 3600;//十年
            var oDate=new Date();
            oDate.setDate(oDate.getDate()+Days*24*60*60*1000);
            document.cookie=name+'='+encodeURIComponent(value)+';expires='+oDate;
        },
        get: function (name){
            var arr=document.cookie.split('; ');

            for(var i=0,len=arr.length;i<len;i++){
                var arr2=arr[i].split('=');

                if(arr2[0]==name){
                    return decodeURIComponent(arr2[1]);
                }
            };
        },
        remove: function (name){
            Ls.set(name, null,-1);
        },
        clear:function (){
            var cookies = document.cookie.split(";");
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                var position = cookie.indexOf("=");
                var name = position > -1 ? cookie.substring(0, position) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
        },
        each: function(fn) {
            var n = localStorage.length,
                i = 0,
                fn = fn || function() {},
                key;
            for (; i < n; i++) {
                key = localStorage.key(i);
                if (fn.call(this, key, this.get(key)) === false) break;
                //如果内容被删除，则总长度和索引都同步减少
                if (localStorage.length < n) {
                    n--;
                    i--;
                }
            }
        }
    }


    return {
        RULES: RULES,
        len: len,
        Base64: _Base64,
        getRequestParameter: getRequestParameter,
        ref: ref,
        searchRef:searchRef,
        shref:shref,
        Router:Router,
        Ls:Ls,
        Y_Y:Y_Y,
        TZ_INFO:TZ_INFO

    }
})