/**
 * Created by hebo (razr409355439@gmail.com)on 15/1/19.
 */
(function(exports){
    var INF_CONFIG = 'http://api.wozhongla.com/';
    var TZ_CONFIG = 'http://www.wozhongla.com/';
    var resultAPI =  TZ_CONFIG +
        "sp2/act/inter.info.action?wAgent=8848&" +
        "wPassword=888888&wReturnFmt=2&&wReturnFmt=2&" +
        "wAction=1012&wParam=areaId=35&format=jsonp&callback=?";

    var jchhAPI = TZ_CONFIG +
        "slttz/preissue?method=jcMatch&lotoId=305"
    var spAPI = TZ_CONFIG + 'slttz/preissue?method=jcOdds&lotoId='
    var issueAPI= TZ_CONFIG+'slttz/preissue'

    function getSp(id,fn) {
        //胜平负赔率
        $.ajax({
            url: spAPI+id,
            dataType: 'jsonp',
            success: function(re2) {
                var re = {}
                $(re2).each(function(index,item){
                    re[item.matchNo] = {
                        sp:item.sp
                    }
                })
                fn(re)
            },
            error: function() {
                fn({error:true})
            }
        })
    }
    function queuedo(array,callback,next){
        var i = -1;
        this.loop=function(){
            i++;
            if(i==array.length){
                next()
            } else{
                callback(array[i],this.loop)
            }
        }
        this.loop();
    }
    var Dialog = (function() {
        var _default = {
                /**
                 * 弹框类型：
                 *
                 * input 带有输入框的弹框，配备 ：{2个按钮 确认、取消} {标题} {输入框提示}
                 *
                 * tips  提示框，配备：{标题} {内容} {1个按钮 确认}
                 *
                 * loading 等待框  {标题||内容} {}
                 *
                 * select 选择框  配备：{2个按钮 确认、取消}  {标题} {内容}
                 *
                 * default 基础提示框  {标题}  {内容}
                 */
                type: "default",
                //默认显示内容
                message: "默认信息！",
                //默认显示标题
                title: "我中啦提示您：",
                //TODO
                //触发元素
                trigger: "",
                //动画时间
                duration: 120,
                //自动消失
                autoHide: false,
                //自动消失间隔
                autoHideDelay: 1000,
                //TODO
                //css前缀
                classPrefix: '',
                //背景遮罩层
                haskMask: true,
                // TODO
                maskClick: function() {},
                //TODO
                width: "",
                height: "",
                //TODO
                autoOpen: false,
                //按钮是否竖型显示 是则加class 'column'
                column: false,
                zindex: 999,
                //
                cancelText: "取消",
                //
                confirmText: "确定",
                //
                onConfirm: function() {},
                //
                onCancel: function() {},
                //
                afterHide: function() {},
                //
                afterShow: function() {},
                //select button 给用户3个选项
                //TODO
                select: [
                    ["是",
                        function() {}
                    ],
                    ["否",
                        function() {}
                    ],
                    ["取消",
                        function() {}
                    ]
                ],
                //如果是input input框的placehoder
                inputPlaceholder: "请输入",
                //如果是input input框的type
                inputType: "text"
            },
            _tpl = function(opts) {
                //select 处理
                var selectButton = function() {
                    var str = "";
                    for (var i = 0; i < opts.select.length; i++) {
                        str += '<div class="wzl-ui-dialog-confirm wzl-ui-dialog-operationitem"><a href="javascript:;" class="wzl-ui-dialog-button">' + opts.select[i][0] + '</a></div>'
                    }
                    return str;
                }();
                var wrapColumn = function() {
                    var str = opts.column ? '<div class="wzl-ui-dialog-operation column">' : '<div class="wzl-ui-dialog-operation">';
                    return str;
                }();
                var button2 = function() {
                    var str = wrapColumn + '<div class="wzl-ui-dialog-confirm wzl-ui-dialog-operationitem"><a href="javascript:;" class="wzl-ui-dialog-button">' + opts.cancelText + '</a>' + '</div><div class="wzl-ui-dialog-confirm wzl-ui-dialog-operationitem">' + '<a href="javascript:;" class="wzl-ui-dialog-button">' + opts.confirmText + '</a></div>' + '</div>';
                    return str;
                }();
                var button1 = function() {
                    var str = wrapColumn + '<div class="wzl-ui-dialog-confirm wzl-ui-dialog-operationitem"><a href="javascript:;" class="wzl-ui-dialog-button">' + opts.confirmText + '</a></div>' + '</div>';
                    return str;
                }();
                var input = function() {
                    var str = '<div class="wzl-ui-dialog-input"><input class="wzl-ui-dialog-inputcon" type="' + opts.inputType + '" placeholder="' + opts.inputPlaceholder + '"/></div>';
                    return str;
                }();
                return {
                    wrapStart: '<div class="wzl-ui-dialog"><div class="wzl-ui-dialog-content" data-role="content">',
                    wrapEnd: "</div></div>",
                    containerStart: '<div class="wzl-ui-dialog-container">',
                    containerEnd: '</div>',
                    title: '<div class="wzl-ui-dialog-title">' + opts.title + '</div>',
                    message: '<div class="wzl-ui-dialog-message">' + opts.message + '</div>',
                    loading: '<div class="wzl-ui-dialog-message"><img src="../imgs/ui/ui-loading.gif" class="ui-loading" alt=""/> <p>' + opts.message + '</p></div>',
                    input: input,
                    buttonWrapStart: wrapColumn,
                    buttonWrapEnd: '</div>',
                    button2: button2,
                    button1: button1,
                    selectButton: selectButton,
                    mask: '<div class="ui-mask" style="width:100%;height:100%;position:fixed;top:0;left:0;z-index:998"></div>'
                }
            },
            _timer = {},
            _lastDialog,
            _lastMask;

        function Dialog(opts) {
            this.opts = opts;
            this._type = "";
            this.tpls = _tpl(this.opts);
        }
        Dialog.prototype._init = function() {
            var me = this,
                opts = me.opts,
                tpls = me.tpls,
                html;
            html = "";
            html += tpls.wrapStart;
            /**
             * 弹框类型：
             *
             * input 带有输入框的弹框，配备 ：{2个按钮 确认、取消} {标题} {输入框提示}
             *
             * tips  提示框，配备：{标题} {内容} {1个按钮 确认}
             *
             * loading 等待框  {标题||内容} {}
             *
             * select 选择框  配备：{2个按钮 确认、取消}  {标题} {内容}
             *
             * default 基础提示框  {标题}  {内容}
             */
            switch (opts.type) {
                case "default":
                    html += tpls.title;
                    html += tpls.containerStart;
                    html += tpls.message;
                    html += tpls.containerEnd;
                    break;
                case "input":
                    html += tpls.title;
                    html += tpls.containerStart;
                    html += tpls.message;
                    html += tpls.input;
                    html += tpls.button2;
                    html += tpls.containerEnd;
                    break;
                case "loading":
                    html += tpls.title;
                    html += tpls.containerStart;
                    html += tpls.loading;
                    html += tpls.containerEnd;
                    break;
                case "tips":
                    html += tpls.title;
                    html += tpls.containerStart;
                    html += tpls.message;
                    html += tpls.button1;
                    html += tpls.containerEnd;
                    break;
                case "select":
                    html += tpls.title;
                    html += tpls.containerStart;
                    html += tpls.message;
                    html += tpls.button2;
                    html += tpls.containerEnd;
                    break;
                default:
                    html += tpls.title;
                    html += tpls.message;
                    me._type = "default";
                    break;
            }
            html += tpls.wrapEnd;
            if (opts.haskMask) me.$mask = $(tpls.mask).appendTo('body');
            me.$msg = $(html).appendTo('body');
            me.show();
            me._event();
            return me;
        }
        Dialog.prototype.show = function() {
            var me = this,
                opts = me.opts,
                $msg = me.$msg,
                $mask = me.$mask;
            var winW = $(window).width(),
                winH = $(window).height(),
                theW = $msg.outerWidth(),
                theH = $msg.outerHeight(),
                winScrollTop = $(window).scrollTop(),
                pos = {
                    left: opts.position && opts.position.left !== 'undefined' ? opts.position.left : (winW - theW) / 2,
                    top: opts.position && opts.position.top !== 'undefined' ? opts.position.top : (winH - theH) / 3 + winScrollTop
                };
            if (pos.left < 0) pos.left = 0;
            if (pos.top < 0) pos.top = 0;
            pos.zIndex = opts.zindex;
            $msg.css(pos);
            $mask.css({
                width: winW,
                height: winH
            })
            //
            if (_lastDialog) {
                _lastDialog.hide(function() {
                    _lastMask.remove();
                    _lastDialog.remove();
                    $msg.fadeIn(opts.duration);
                    _lastDialog = $msg;
                    _lastMask = $mask;
                })
            } else {
                _lastDialog = $msg;
                _lastMask = $mask;
                $msg.fadeIn(opts.duration);
            }
            //
            if (_timer) clearTimeout(_timer)
            if (opts.type == "default" || me._type == "default") {
                _timer = setTimeout(function() {
                    me.hide();
                }, opts.autoHideDelay || 3000)
            }
        }
        Dialog.prototype.hide = function(cb) {
            var me = this,
                opts = me.opts,
                $msg = me.$msg,
                $mask = me.$mask;
            if (_timer) clearTimeout(_timer);
            _timer = 0;
            $mask.hide();
            $msg.stop(!0, !0).fadeOut(opts.duration, function() {
                opts.afterHide.apply(me)
                $msg.remove();
                $mask.remove();
                cb && cb();
            })
        }
        Dialog.prototype._event = function() {
            var me = this,
                opts = me.opts;
            if (opts.type == "input") {
                var _onConfirm = opts.onConfirm
                opts.onConfirm = function() {
                    var $input = me.$msg.find('input.wzl-ui-dialog-inputcon');
                    _onConfirm(me, $input)
                }
            }
            if (opts.type == "loading") {
                me.ticket = function(v) {
                    me.$msg.find('.wzl-ui-dialog-message>p:first').html(v);
                }
            }
            if (opts.type == "tips") {
                opts.onCancel = opts.onConfirm
            }
            me.$msg.find('.wzl-ui-dialog-button').eq(0).on('click', function() {
                me.hide(opts.onCancel)
            })
            me.$msg.find('.wzl-ui-dialog-button').eq(1).on('click', function() {
                me.hide(opts.onConfirm)
            })
        }

        function extend(source, target) {
            if (source) {
                for (var key in source) {
                    var val = source[key];
                    if (typeof val !== "undefined") {
                        target[key] = val;
                    }
                }
            }
            return target;
        }
        /**
         *  //////alert
         *  show
         */
        var dialog = function() {
            var args = [],
                opts = {};
            for (var i = 0; i < arguments.length; i++) {
                args.push(arguments[i])
            }
            var a1 = args[0],
                a2 = args[1],
                a3 = args[2],
                a4 = args[3];
            switch (args.length) {
                case 1:
                    if (isObject(a1)) opts = a1;
                    else opts.message = a1;
                    break;
                case 2:
                    opts.type = a1;
                    opts.message = a2;
                    break;
            }
            return new Dialog(extend(opts, _default))._init();
        };

        function type(obj) {
            return obj == null ? String(obj) : Object.prototype.toString.call(obj) || "object";
        }

        function toString(object) {
            return Object.prototype.toString.call(object);
        }

        function isFunction(object) {
            return toString(object) === "[object Function]";
        }

        function isObject(object) {
            return toString(object) === "[object Object]";
        }
        return dialog;
    }())
    var TZ_INFO = function(info, fn) {
        var s = "投注异常",
            code = Number(info.resultCode)
        var dialog = Dialog
        switch (code) {
            case 200:
                s = "投注成功"
                success();
                break;
            case 300:
                s = "投注失败"
                commenError();
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
            case 312:
                s = "账户余额不足，充值请点击确认。"
                needCz();
                break;
            case 501:
                s = "投注异常"
                commenError(s)
                break;
            case 510:
                s = "投注失败，该彩种已停止投注"
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
                    ref("login", location.pathname )
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
            dialog({
                type: "tips",
                message: s,
                onConfirm: function() {
                    fn && fn(info)
                }
            })
        }
        var shref={
            'login':'/views/login.html',
            'index':'/index.html',
            'ucenter':'/views/ucenter.html',
            'paycenter':'/views/paycenter.html',
            'ssq':'/views/ssq.html',
            'dlt':'/views/dlt.html',
            'jc':'/views/jc.html',
            'jx11x5':'/views/jx11x5.html',
            'ahk3':'/views/ahk3.html',
            'fc3d':'/views/fc3d.html',
            'pl3':'/views/pl3.html',
            'ssc':'/views/ssc.html',
            'cqssc':'/views/cqssc.html',
            'pl5':'/views/pl5.html',
            'qxc':'/views/qxc.html',
            'qlc':'/views/qlc.html',
            'accountdetail':'/views/accountdetail.html',
            'bettingdetail':'/views/bettingdetail.html',
            'bettingRecord':'/views/bettingRecord.html',
            'bettingZH':'/views/bettingZH.html',
            'savingscard':'/views/savingscard.html'
        }
        var ref = function(url, backurl) {
            if(backurl){
                location.href = shref[url] + '?ref=' + matchflat(backurl)
            }else{
                location.href = url
            }

            function matchflat(u){
                var s = u.substring( u.lastIndexOf('/')+1, u.lastIndexOf('.') )
                return s;
            }
        };
    }
    exports.jchhggResoure = {
        fetchAll:function(cb){
            $.ajax({
                type: "GET",
                url: jchhAPI,
                dataType: 'jsonp',
                success: function(re1) {
                    var  re = {}
                    $(re1).each(function(index,item){
                        re[item.matchNo] = item;
                    });
                    getAllSP(re,getSp)
                },
                error: function() {
                    getAllSP({error:true})
                }
            })
            function getAllSP(re,getSp){
                if(!re.error){
                    queuedo(["301",'320','302','303','304'],function(item,next){
                        getSp(item,function(sp){
                            var name = '';
                            switch(item){
                                case "301":
                                    name='rqspf';
                                    break;
                                case "320":
                                    name='spf';
                                    break;
                                case "302":
                                    name='bf';
                                    break;
                                case "303":
                                    name='jqs';
                                    break;
                                case "304":
                                    name='sfbq';
                                    break;
                            }
                            for(var i in re){
                                if(sp[i]){
                                    re[i][name] = sp[i].sp
                                }else{
                                    re[i][name] = []
                                }
                            }
                            next();
                        })
                    },function(){
                        cb&&cb(re);
                    })
                }else{
                    cb&&cb([])
                }
            }
        }
    }
    var getIssue = function(bei,fn){
        var data = {}
        data.lotoId = 305;
        data.method = "preissuenew";
        data.issues = 1
        $.ajax({
            type: 'GET',
            url: issueAPI + "?callback=?",
            data: data,
            dataType: 'json',
            success: function(re) {
                var r = merge(re)
                fn && fn(r)
            },
            error: function(re) {
                fn && fn({status:false})
            }
        })
        function merge(list) {
            var r = [];
            $(list).each(function(index, item) {
                r.push({
                    issue: item.issue ,
                    multiple:bei
                })
            })
            return r;
        }
    }
    exports.jshhggPost = function(data,fn){
        var dialog = Dialog
        getIssue(data.bei,function(r) {
            if (!r || !r.length) return dialog("投注异常，请重试")
            data.lotoGson.issueArray = r;
            dialog("loading", "正在投注！")
            data.lotoGson = JSON.stringify(data.lotoGson)
            $.ajax({
                method: "POST",
                data: data,
                url: getTzurl("/sltdc/tz"),
                success: function(re) {
                    TZ_INFO($.parseJSON(re),function(){
                        fn&&fn({status:true})
                    })
                },
                error: function(re) {
                    TZ_INFO($.parseJSON(re),function(){
                        fn&&fn({status:false})
                    })
                }
            })
        })
        function getTzurl(url){
            try{
                return CarTz.getTzUrl(url);
            }catch(e){
                return url;
            }
        }
    }
})(window)