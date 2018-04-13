define("wzlh5/1.0.0/ui", ["jquery/2.1.1/jquery", "iscroll/5.1.2/iscroll","iscroll/5.1.2/iscroll-probe"], function(require, exports, module) {
    /**
     * Created by hebo (razr409355439@gmail.com)on 2014/8/18.
     */
    var $ = require("jquery/2.1.1/jquery");
    var IScroll = require("iscroll/5.1.2/iscroll");
    var IScrollProbe = require("iscroll/5.1.2/iscroll-probe"); //require("iscroll/5.1.2/iscroll-probe");
  
   /**
     * iscroll 弹窗
     * @param opts
     * @returns {iscrollPop}
     */
    var iscrollPop = function(opts) {
        var me = this;
        //default settings
        var deft = {
            //
            wrapper: "#wrapper",
            hasMask: true,
            spacing: 20,
            top: 60,
            title: "提醒您:",
            onClose: function() {}
        }
        //merge
        me.opts = $.extend(deft, opts);
        if (!me.opts.content) return;
        me.wrapElement = $(me.opts.wrapper)
        me.titleElement = $(me.opts.wrapper).find('.head h4:first');
        me.contentElement = $(me.opts.wrapper).find('.content:first');
        me.closeElement = $(me.opts.wrapper).find('.wzl-service-close')
        //
        me.wrapperStr = '<div id="wrapper" class="wzl-mask-pop"></div>';
        me.domStr = '<div class="wzl-service">' + '<div class="head">' + '<h4>服务条款</h4>' + '<span class="glyphicon icon-close wzl-service-close" ></span>' + '</div>' + '<div id="wrappcontent">' + '<div id="scroller">' + '<div class="content">' + '</div>' + '</div>' + '</div>' + '</div>' + '</div>' + '<div class="wzl-mask" style="display: none">' + '</div>';

        function init() {
            if (me.opts.wrapper == "#wrapper" && $('#wrapper').length > 0) {
                render();
            } else if (me.wrapElement.length > 0) {
                me.wrapElement.empty().append(me.domStr).addClass('wzl-mask-pop');
                render();
            } else {
                $('body').append('<div id="wrapper" style="display: none" class="wzl-mask-pop">' + me.domStr + '</div>')
                render();
            }
        }

        function render() {
            var value, val = me.opts.content,
                title = me.opts.title;
            try {
                value = $(val);
            } catch (e) {
                value = [];
            }
            if (value[0]) {
                $(me.opts.wrapper).find('.content:first').empty().append(value);
            } else {
                $(me.opts.wrapper).find('.content:first').empty().html(val);
            }
            $(me.opts.wrapper).find('.head h4:first').html(title)
        }

        function setPos() {
            var sp = me.opts.spacing,
                $win = $(window).width(),
                top = me.opts.top;
            var ml = sp / 2;
            $(me.opts.wrapper).css({
                left: ml,
                top: top,
                width: $win - sp
            })
        }

        function show(fn) {
            setPos();
            $('.wzl-mask').show();
            $(me.opts.wrapper).show();
            me.myScroll = new IScroll('#wrappcontent', {
                scrollX: true,
                freeScroll: true,
                click: true
            })
            fn && fn();
            $('.wzl-service-close').on('click', function() {
                hide()
                me.close();
            })
        }

        function hide() {
            $('.wzl-mask').hide();
            $(me.opts.wrapper).hide();
        }
        me.close = function() {
            hide();
            me.opts.onclose()
        }
        me.init = init;
        me.show = show;
        me.hide = hide();
        me.test = function() {
        }
        me.init();
        return me;
    }
    /**
     * 内容层遮罩   * 用于初始化时 未加载内容前
     * @type {{tpl: string, show: show, hide: hide}}
     */
    var containerMask = {
        tpl: '<div class="container-mask"></div>',
        show: function() {
            if ($('.container-mask').length > 0) {
                $(".container-mask").animate({
                    opacity: 1
                }, 100)
            } else {
                $('.container').append(this.tpl)
            }
        },
        hide: function() {
            $(".container-mask").animate({
                opacity: 0
            }, 300)
        },
  
    }
	var jcData = {
		//竞彩足球让球胜平负
		301:{numType:[3,1,0],numName:["胜","平","负"]},
		
		//竞彩足球胜平负
		320:{numType:[3,1,0],numName:["胜","平","负"]},
		
		//竞彩足球比分
		302:{numType:[0,1,2,3,4,5,6,7,8,9,10,11,12,
					  13,14,15,16,17,
					  18,19,20,21,22,23,24,25,26,27,28,29,30],
			numName:["胜其他","1:0","2:0","2:1","3:0","3:1","3:2","4:0","4:1","4:2","5:0","5:1","5:2",
					 "平其他","0:0","1:1","2:2","3:3",
					 "负其他","0:1","0:2","1:2","0:3","1:3","2:3","0:4","1:4","2:4","0:5","1:5","2:5"]},
					 
		//竞彩足球总进球数
		303:{numType:[0,1,2,3,4,5,6,7],
			numName:["0","1","2","3","4","5","6","7"]},
			
		//竞彩足球半场胜平负
		304:{numType:[0,1,2,3,4,5,6,7,8],
			numName:["胜胜","胜平","胜负","平胜","平平","平负","负胜","负平","负负"]},
			
		//竞彩足球胜平负
		311:{numType:[3,1,0],numName:["胜","平","负"]},
		
		//竞彩足球胜平负
		321:{numType:[3,1,0],numName:["胜","平","负"]},
		
		//竞彩足球比分 
		312:{numType:[0,1,2,3,4,5,6,7,8,9,10,11,12,
					 13,14,15,16,17,
					 18,19,20,21,22,23,24,25,26,27,28,29,30],
			numName:["胜其他","1:0","2:0","2:1","3:0","3:1","3:2","4:0","4:1","4:2","5:0","5:1","5:2",
					 "平其他","0:0","1:1","2:2","3:3",
					 "负其他","0:1","0:2","1:2","0:3","1:3","2:3","0:4","1:4","2:4","0:5","1:5","2:5"]},
					 
		//竞彩足球总进球数
		313:{numType:[0,1,2,3,4,5,6,7],
			numName:["0","1","2","3","4","5","6","7"]},
			
		//竞彩足球半场胜平负
		314:{numType:[0,1,2,3,4,5,6,7,8],
			numName:["胜胜","胜平","胜负","平胜","平平","平负","负胜","负平","负负"]}

	}
    var dropdownMask = (function() {
    	 //url/对象互转
	    function href() {
	        var url = location.search;
	        json = {};
	        if (url.indexOf("?") === -1) return {};
	        var arr = url.substr(1).split("&");
	        for (var i = 0, len = arr.length; i < len; i++) {
	            json[arr[i].split("=")[0]] = unescape(arr[i].split("=")[1]);
	        }
	      
	        return json;
	    }
        function show() {
            $('.wzl-dropdown-con').css({'top': $('.wzl-navbar').height()})
            $('.dropdown-con').css({'top': $('.wzl-navbar').height()})
            $('#wzl-dropdown').removeClass('dropdown-hide')
            $('.wzl-nav-dropdown').addClass('icon-dropup-white').removeClass('icon-dropdown-white');
        }
        function hide() {
            $('#wzl-dropdown').addClass('dropdown-hide')
            $('.wzl-nav-dropdown').removeClass('icon-dropup-white').addClass('icon-dropdown-white');
        }
        var lock = false;
        function toggle() {
            if (lock) {
                lock = false;
                hide()
            } else {
                lock = true;
                show()
            }
        }
        $('.wzl-dropdown-con a, .dropdown-con a').on('click', function() {
            lock = false;
            $('#wzl-dropdown').addClass('dropdown-hide');
            $('.wzl-nav-dropdown').removeClass('icon-dropup-white').addClass('icon-dropdown-white');
        })

        $('#wzl-dropdown .wzl-dropdown-wrap').on('click', function() {
            lock = false;
            $('#wzl-dropdown').addClass('dropdown-hide');
            $('.wzl-nav-dropdown').addClass('icon-dropdown-white').removeClass('icon-dropup-white');
        })
        return {
        	href: href,
            show: show,
            hide: hide,
            toggle: toggle
        }
    })()
    //dialog
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
                title: "提示您：",
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
    var iscrollLoadData = (function() {
    	
        function IScrollLoadData(wrapperEl, contentEl, dropTopAction, dropBottomAction, limit, dn, up) {
            this.wrapper = wrapperEl;
            this.content = contentEl;
            this.pullDownEl = this.wrapper.querySelector(dn);
            this.pullUpEl = this.wrapper.querySelector(up);
            this.scrollerEl = this.wrapper.querySelector('.scroller');
            this.dropTopAction = dropTopAction;
            this.dropBottomAction = dropBottomAction;
            this.limit = limit || 30;
            this.clickTop_bind = this.clickTop.bind(this);
            this.clickBottom_bind = this.clickBottom.bind(this);
            this.IScroll = IScrollProbe
            this.pullUpLabel_Text = '上翻刷新...';
            this.pullDownLabel_Text = '下拉刷新...';
            this.pullLoading_Text = '正在加载中...';
            this.releaseLoading_Text = '松开加载更多...';
            this.loading_top_flag = false;
            this.loading_bottom_flag = false;
            this.checkIScroll(true);
            this.createIScroll();
        };
        IScrollLoadData.IScroll = IScrollProbe;
        IScrollLoadData.prototype.refresh = function(direct) {
            //this.updateContentLen(direct);
            this.checkIScroll();
            delete this.myScroll.waitLoadTop;
            this.myScroll.refresh();
        }
        IScrollLoadData.prototype.updateContentLen = function(direct) {
            var children = this.content.children;
            if (children.len > this.limit) {
                if (direct == 'bottom') {} else {}
            }
        }
        IScrollLoadData.prototype.checkIScroll = function(flag) {
            var soh = this.content.offsetHeight + this.pullDownEl.offsetHeight + this.pullUpEl.offsetHeight;
            var woh = this.wrapper.clientHeight;
            var holder = this.scrollerEl.querySelector('.scroller-holder');
            if (soh < woh) {
                if (!holder) {
                    var ul = document.createElement('ul');
                    ul.className = 'scroller-holder';
                    this.scrollerEl.appendChild(ul);
                    holder = ul;
                }
                holder.style.height = (woh - soh + 2) + 'px';
            } else if (holder) {
                this.scrollerEl.removeChild(holder);
            }
        }
        IScrollLoadData.prototype.pullDownAction = function() {
            var self = this;
            //this.myScroll.scrollTo(0,this.pullDownEl.offsetHeight);
            if (this.dropTopAction) {
                this.dropTopAction(function(out) {
                    var firstChild = self.content.querySelector(':first-child');
                    if (firstChild) self.content.insertBefore(out, firstChild);
                    else self.content.appendChild(out);
                    self.refresh('top');
                });
            } else {
                this.refresh('top');
            }
        };
        IScrollLoadData.prototype.pullUpAction = function() {
            var self = this;
            if (this.dropBottomAction) {
                this.dropBottomAction(function(out) {
                    self.content.appendChild(out);
                    self.refresh('bottom');
                });
            } else {
                this.refresh('bottom');
            }
        };
        IScrollLoadData.prototype.clickTop = function() {
            var self = this;
            if (this.dropTopAction) {
                this.dropTopAction(function(out) {
                    var firstChild = self.content.querySelector(':first-child');
                    if (firstChild) self.content.insertBefore(out, firstChild);
                    else self.content.appendChild(out);
                    self.initIScroll(false);
                });
            }
        };
        IScrollLoadData.prototype.clickBottom = function() {
            var self = this;
            if (this.dropBottomAction) {
                this.dropBottomAction(function(out) {
                    self.content.appendChild(out);
                    self.initIScroll(false);
                });
            }
        };
        IScrollLoadData.prototype.initIScroll = function(flag) {
            if (this.overflow_window) {
                return;
            }
            if (this.scrollerEl.offsetHeight - this.pullDownEl.offsetHeight >= document.documentElement.clientHeight) {
                this.wrapper.style.bottom = '0px';
                this.wrapper.style.top = ((-1) * this.pullDownEl.offsetHeight) + 'px';
                this.pullUpEl.querySelector('.pullUpLabel').innerText = this.pullUpLabel_Text;
                this.pullDownEl.querySelector('.pullDownLabel').innerText = this.pullDownLabel_Text;
                this.pullUpEl.removeEventListener('click', this.clickBottom_bind);
                this.pullDownEl.removeEventListener('click', this.clickUp_bind);
                this.myScroll.refresh();
                this.overflow_window = true;
            } else {
                this.wrapper.style.bottom = (document.documentElement.clientHeight - this.scrollerEl.offsetHeight) + 'px';
                this.pullUpEl.querySelector('.pullUpLabel').innerText = '点击获取最近...';
                this.pullDownEl.querySelector('.pullDownLabel').innerText = '点击获取最新...';
                if (flag) {
                    this.pullUpEl.addEventListener('click', this.clickBottom_bind);
                    this.pullDownEl.addEventListener('click', this.clickTop_bind);
                }
            }

        }
        IScrollLoadData.prototype.createIScroll = function() {
            var self = this;
            this.myScroll = new IScrollLoadData.IScroll(this.wrapper, {
                probeType: 2,
                mouseWheel: false,
                bindToWrapper: true,
                scrollY: true,
                click: true
            })
            this.myScroll.on('scroll', function() {
                if (this.y > 50 && (!self.pullDownEl.className.match('flip') && !self.pullDownEl.className.match('loading'))) {
                    self.pullDownEl.className = 'flip';
                    self.pullDownEl.querySelector('.pullDownLabel').innerHTML = self.releaseLoading_Text;
                    this.waitLoadTop = self.pullDownEl.offsetHeight;
                } else if (this.y < 50 && self.pullDownEl.className.match('flip')) {
                    self.pullDownEl.className = '';
                    self.pullDownEl.querySelector('.pullDownLabel').innerHTML = self.pullDownLabel_Text;
                    delete this.waitLoadTop;
                } else if (this.y < (this.maxScrollY - 5) && (!self.pullUpEl.className.match('flip') && !self.pullUpEl.className.match('loading'))) {
                    self.pullUpEl.className = 'flip';
                    self.pullUpEl.querySelector('.pullUpLabel').innerHTML = self.releaseLoading_Text;
                } else if (this.y > (this.maxScrollY + 5) && self.pullUpEl.className.match('flip')) {
                    self.pullUpEl.className = '';
                    self.pullUpEl.querySelector('.pullUpLabel').innerHTML = self.pullUpLabel_Text;
                }
            })
            this.myScroll.on('scrollEnd', function() {
                if (self.pullDownEl.className.match('flip')) {
                    self.pullDownEl.className = 'loading';
                    self.pullDownEl.querySelector('.pullDownLabel').innerHTML = self.pullLoading_Text;
                    self.pullDownAction(); // Execute custom function (ajax call?)
                } else if (self.pullUpEl.className.match('flip')) {
                    self.pullUpEl.className = 'loading';
                    self.pullUpEl.querySelector('.pullUpLabel').innerHTML = self.pullLoading_Text;
                    self.pullUpAction(); // Execute custom function (ajax call?)
                }
            })
            this.myScroll.on('refresh', function() {
                if (self.pullDownEl.className.match('loading')) {
                    self.pullDownEl.className = '';
                    self.pullDownEl.querySelector('.pullDownLabel').innerHTML = self.pullDownLabel_Text;
                } else if (self.pullUpEl.className.match('loading')) {
                    self.pullUpEl.className = '';
                    self.pullUpEl.querySelector('.pullUpLabel').innerHTML = self.pullUpLabel_Text;
                }
            });
        };
        return IScrollLoadData;
    })()
    module.exports = {
        iscrollPop: iscrollPop,
        containerMask: containerMask,
        dialog: Dialog,
        dropdownMask:dropdownMask,
        IscrollLoadData: iscrollLoadData,
        jcData: jcData
    };
});
