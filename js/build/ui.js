/*! wozhongla 2015-01-23 */
define("wzlh5/1.0.0/ui",["jquery/2.1.1/jquery","iscroll/5.1.2/iscroll","iscroll/5.1.2/iscroll-probe"],function(require,exports,module){var $=require("jquery/2.1.1/jquery"),IScroll=require("iscroll/5.1.2/iscroll"),IScrollProbe=require("iscroll/5.1.2/iscroll-probe"),iscrollPop=function(opts){function init(){"#wrapper"==me.opts.wrapper&&$("#wrapper").length>0?render():me.wrapElement.length>0?(me.wrapElement.empty().append(me.domStr).addClass("wzl-mask-pop"),render()):($("body").append('<div id="wrapper" style="display: none" class="wzl-mask-pop">'+me.domStr+"</div>"),render())}function render(){var value,val=me.opts.content,title=me.opts.title;try{value=$(val)}catch(e){value=[]}value[0]?$(me.opts.wrapper).find(".content:first").empty().append(value):$(me.opts.wrapper).find(".content:first").empty().html(val),$(me.opts.wrapper).find(".head h4:first").html(title)}function setPos(){var sp=me.opts.spacing,$win=$(window).width(),top=me.opts.top,ml=sp/2;$(me.opts.wrapper).css({left:ml,top:top,width:$win-sp})}function show(fn){setPos(),$(".wzl-mask").show(),$(me.opts.wrapper).show(),me.myScroll=new IScroll("#wrappcontent",{scrollX:!0,freeScroll:!0,click:!0}),fn&&fn(),$(".wzl-service-close").on("click",function(){hide(),me.close()})}function hide(){$(".wzl-mask").hide(),$(me.opts.wrapper).hide()}var me=this,deft={wrapper:"#wrapper",hasMask:!0,spacing:20,top:60,title:"我中啦提醒您:",onClose:function(){}};return me.opts=$.extend(deft,opts),me.opts.content?(me.wrapElement=$(me.opts.wrapper),me.titleElement=$(me.opts.wrapper).find(".head h4:first"),me.contentElement=$(me.opts.wrapper).find(".content:first"),me.closeElement=$(me.opts.wrapper).find(".wzl-service-close"),me.wrapperStr='<div id="wrapper" class="wzl-mask-pop"></div>',me.domStr='<div class="wzl-service"><div class="head"><h4>服务条款</h4><span class="glyphicon icon-close wzl-service-close" ></span></div><div id="wrappcontent"><div id="scroller"><div class="content"></div></div></div></div></div><div class="wzl-mask" style="display: none"></div>',me.close=function(){hide(),me.opts.onclose()},me.init=init,me.show=show,me.hide=hide(),me.test=function(){},me.init(),me):void 0},containerMask={tpl:'<div class="container-mask"></div>',show:function(){$(".container-mask").length>0?$(".container-mask").animate({opacity:1},100):$(".container").append(this.tpl)},hide:function(){$(".container-mask").animate({opacity:0},300)}},dropdownMask=function(){function show(){$(".wzl-dropdown-con").css({top:$(".wzl-navbar").height()}),$(".dropdown-con").css({top:$(".wzl-navbar").height()}),$("#wzl-dropdown").removeClass("dropdown-hide"),$(".wzl-nav-dropdown").addClass("icon-dropup-white").removeClass("icon-dropdown-white")}function hide(){$("#wzl-dropdown").addClass("dropdown-hide"),$(".wzl-nav-dropdown").removeClass("icon-dropup-white").addClass("icon-dropdown-white")}function toggle(){lock?(lock=!1,hide()):(lock=!0,show())}var lock=!1;return $(".wzl-dropdown-con a, .dropdown-con a").on("click",function(){lock=!1,$("#wzl-dropdown").addClass("dropdown-hide"),$(".wzl-nav-dropdown").removeClass("icon-dropup-white").addClass("icon-dropdown-white")}),$("#wzl-dropdown .wzl-dropdown-wrap").on("click",function(){lock=!1,$("#wzl-dropdown").addClass("dropdown-hide"),$(".wzl-nav-dropdown").addClass("icon-dropdown-white").removeClass("icon-dropup-white")}),{show:show,hide:hide,toggle:toggle}}(),Dialog=function(){function Dialog(opts){this.opts=opts,this._type="",this.tpls=_tpl(this.opts)}function extend(source,target){if(source)for(var key in source){var val=source[key];"undefined"!=typeof val&&(target[key]=val)}return target}function toString(object){return Object.prototype.toString.call(object)}function isObject(object){return"[object Object]"===toString(object)}var _lastDialog,_lastMask,_default={type:"default",message:"默认信息！",title:"我中啦提示您：",trigger:"",duration:120,autoHide:!1,autoHideDelay:1e3,classPrefix:"",haskMask:!0,maskClick:function(){},width:"",height:"",autoOpen:!1,column:!1,zindex:999,cancelText:"取消",confirmText:"确定",onConfirm:function(){},onCancel:function(){},afterHide:function(){},afterShow:function(){},select:[["是",function(){}],["否",function(){}],["取消",function(){}]],inputPlaceholder:"请输入",inputType:"text"},_tpl=function(opts){var selectButton=function(){for(var str="",i=0;i<opts.select.length;i++)str+='<div class="wzl-ui-dialog-confirm wzl-ui-dialog-operationitem"><a href="javascript:;" class="wzl-ui-dialog-button">'+opts.select[i][0]+"</a></div>";return str}(),wrapColumn=function(){var str=opts.column?'<div class="wzl-ui-dialog-operation column">':'<div class="wzl-ui-dialog-operation">';return str}(),button2=function(){var str=wrapColumn+'<div class="wzl-ui-dialog-confirm wzl-ui-dialog-operationitem"><a href="javascript:;" class="wzl-ui-dialog-button">'+opts.cancelText+'</a></div><div class="wzl-ui-dialog-confirm wzl-ui-dialog-operationitem"><a href="javascript:;" class="wzl-ui-dialog-button">'+opts.confirmText+"</a></div></div>";return str}(),button1=function(){var str=wrapColumn+'<div class="wzl-ui-dialog-confirm wzl-ui-dialog-operationitem"><a href="javascript:;" class="wzl-ui-dialog-button">'+opts.confirmText+"</a></div></div>";return str}(),input=function(){var str='<div class="wzl-ui-dialog-input"><input class="wzl-ui-dialog-inputcon" type="'+opts.inputType+'" placeholder="'+opts.inputPlaceholder+'"/></div>';return str}();return{wrapStart:'<div class="wzl-ui-dialog"><div class="wzl-ui-dialog-content" data-role="content">',wrapEnd:"</div></div>",containerStart:'<div class="wzl-ui-dialog-container">',containerEnd:"</div>",title:'<div class="wzl-ui-dialog-title">'+opts.title+"</div>",message:'<div class="wzl-ui-dialog-message">'+opts.message+"</div>",loading:'<div class="wzl-ui-dialog-message"><img src="../imgs/ui/ui-loading.gif" class="ui-loading" alt=""/> <p>'+opts.message+"</p></div>",input:input,buttonWrapStart:wrapColumn,buttonWrapEnd:"</div>",button2:button2,button1:button1,selectButton:selectButton,mask:'<div class="ui-mask" style="width:100%;height:100%;position:fixed;top:0;left:0;z-index:998"></div>'}},_timer={};Dialog.prototype._init=function(){var html,me=this,opts=me.opts,tpls=me.tpls;switch(html="",html+=tpls.wrapStart,opts.type){case"default":html+=tpls.title,html+=tpls.containerStart,html+=tpls.message,html+=tpls.containerEnd;break;case"input":html+=tpls.title,html+=tpls.containerStart,html+=tpls.message,html+=tpls.input,html+=tpls.button2,html+=tpls.containerEnd;break;case"loading":html+=tpls.title,html+=tpls.containerStart,html+=tpls.loading,html+=tpls.containerEnd;break;case"tips":html+=tpls.title,html+=tpls.containerStart,html+=tpls.message,html+=tpls.button1,html+=tpls.containerEnd;break;case"select":html+=tpls.title,html+=tpls.containerStart,html+=tpls.message,html+=tpls.button2,html+=tpls.containerEnd;break;default:html+=tpls.title,html+=tpls.message,me._type="default"}return html+=tpls.wrapEnd,opts.haskMask&&(me.$mask=$(tpls.mask).appendTo("body")),me.$msg=$(html).appendTo("body"),me.show(),me._event(),me},Dialog.prototype.show=function(){var me=this,opts=me.opts,$msg=me.$msg,$mask=me.$mask,winW=$(window).width(),winH=$(window).height(),theW=$msg.outerWidth(),theH=$msg.outerHeight(),winScrollTop=$(window).scrollTop(),pos={left:opts.position&&"undefined"!==opts.position.left?opts.position.left:(winW-theW)/2,top:opts.position&&"undefined"!==opts.position.top?opts.position.top:(winH-theH)/3+winScrollTop};pos.left<0&&(pos.left=0),pos.top<0&&(pos.top=0),pos.zIndex=opts.zindex,$msg.css(pos),$mask.css({width:winW,height:winH}),_lastDialog?_lastDialog.hide(function(){_lastMask.remove(),_lastDialog.remove(),$msg.fadeIn(opts.duration),_lastDialog=$msg,_lastMask=$mask}):(_lastDialog=$msg,_lastMask=$mask,$msg.fadeIn(opts.duration)),_timer&&clearTimeout(_timer),("default"==opts.type||"default"==me._type)&&(_timer=setTimeout(function(){me.hide()},opts.autoHideDelay||3e3))},Dialog.prototype.hide=function(cb){var me=this,opts=me.opts,$msg=me.$msg,$mask=me.$mask;_timer&&clearTimeout(_timer),_timer=0,$mask.hide(),$msg.stop(!0,!0).fadeOut(opts.duration,function(){opts.afterHide.apply(me),$msg.remove(),$mask.remove(),cb&&cb()})},Dialog.prototype._event=function(){var me=this,opts=me.opts;if("input"==opts.type){var _onConfirm=opts.onConfirm;opts.onConfirm=function(){var $input=me.$msg.find("input.wzl-ui-dialog-inputcon");_onConfirm(me,$input)}}"loading"==opts.type&&(me.ticket=function(v){me.$msg.find(".wzl-ui-dialog-message>p:first").html(v)}),"tips"==opts.type&&(opts.onCancel=opts.onConfirm),me.$msg.find(".wzl-ui-dialog-button").eq(0).on("click",function(){me.hide(opts.onCancel)}),me.$msg.find(".wzl-ui-dialog-button").eq(1).on("click",function(){me.hide(opts.onConfirm)})};var dialog=function(){for(var args=[],opts={},i=0;i<arguments.length;i++)args.push(arguments[i]);{var a1=args[0],a2=args[1];args[2],args[3]}switch(args.length){case 1:isObject(a1)?opts=a1:opts.message=a1;break;case 2:opts.type=a1,opts.message=a2}return new Dialog(extend(opts,_default))._init()};return dialog}(),iscrollLoadData=function(){function IScrollLoadData(wrapperEl,contentEl,dropTopAction,dropBottomAction,limit,dn,up){this.wrapper=wrapperEl,this.content=contentEl,this.pullDownEl=this.wrapper.querySelector(dn),this.pullUpEl=this.wrapper.querySelector(up),this.scrollerEl=this.wrapper.querySelector(".scroller"),this.dropTopAction=dropTopAction,this.dropBottomAction=dropBottomAction,this.limit=limit||30,this.clickTop_bind=this.clickTop.bind(this),this.clickBottom_bind=this.clickBottom.bind(this),this.IScroll=IScrollProbe,this.pullUpLabel_Text="上翻刷新...",this.pullDownLabel_Text="下拉刷新...",this.pullLoading_Text="正在加载中...",this.releaseLoading_Text="松开加载更多...",this.loading_top_flag=!1,this.loading_bottom_flag=!1,this.checkIScroll(!0),this.createIScroll()}return IScrollLoadData.IScroll=IScrollProbe,IScrollLoadData.prototype.refresh=function(){this.checkIScroll(),delete this.myScroll.waitLoadTop,this.myScroll.refresh()},IScrollLoadData.prototype.updateContentLen=function(direct){var children=this.content.children;children.len>this.limit},IScrollLoadData.prototype.checkIScroll=function(){var soh=this.content.offsetHeight+this.pullDownEl.offsetHeight+this.pullUpEl.offsetHeight,woh=this.wrapper.clientHeight,holder=this.scrollerEl.querySelector(".scroller-holder");if(woh>soh){if(!holder){var ul=document.createElement("ul");ul.className="scroller-holder",this.scrollerEl.appendChild(ul),holder=ul}holder.style.height=woh-soh+2+"px"}else holder&&this.scrollerEl.removeChild(holder)},IScrollLoadData.prototype.pullDownAction=function(){var self=this;this.dropTopAction?this.dropTopAction(function(out){var firstChild=self.content.querySelector(":first-child");firstChild?self.content.insertBefore(out,firstChild):self.content.appendChild(out),self.refresh("top")}):this.refresh("top")},IScrollLoadData.prototype.pullUpAction=function(){var self=this;this.dropBottomAction?this.dropBottomAction(function(out){self.content.appendChild(out),self.refresh("bottom")}):this.refresh("bottom")},IScrollLoadData.prototype.clickTop=function(){var self=this;this.dropTopAction&&this.dropTopAction(function(out){var firstChild=self.content.querySelector(":first-child");firstChild?self.content.insertBefore(out,firstChild):self.content.appendChild(out),self.initIScroll(!1)})},IScrollLoadData.prototype.clickBottom=function(){var self=this;this.dropBottomAction&&this.dropBottomAction(function(out){self.content.appendChild(out),self.initIScroll(!1)})},IScrollLoadData.prototype.initIScroll=function(flag){this.overflow_window||(this.scrollerEl.offsetHeight-this.pullDownEl.offsetHeight>=document.documentElement.clientHeight?(this.wrapper.style.bottom="0px",this.wrapper.style.top=-1*this.pullDownEl.offsetHeight+"px",this.pullUpEl.querySelector(".pullUpLabel").innerText=this.pullUpLabel_Text,this.pullDownEl.querySelector(".pullDownLabel").innerText=this.pullDownLabel_Text,this.pullUpEl.removeEventListener("click",this.clickBottom_bind),this.pullDownEl.removeEventListener("click",this.clickUp_bind),this.myScroll.refresh(),this.overflow_window=!0):(this.wrapper.style.bottom=document.documentElement.clientHeight-this.scrollerEl.offsetHeight+"px",this.pullUpEl.querySelector(".pullUpLabel").innerText="点击获取最近...",this.pullDownEl.querySelector(".pullDownLabel").innerText="点击获取最新...",flag&&(this.pullUpEl.addEventListener("click",this.clickBottom_bind),this.pullDownEl.addEventListener("click",this.clickTop_bind))))},IScrollLoadData.prototype.createIScroll=function(){var self=this;this.myScroll=new IScrollLoadData.IScroll(this.wrapper,{probeType:2,mouseWheel:!1,bindToWrapper:!0,scrollY:!0,click:!0}),this.myScroll.on("scroll",function(){this.y>50&&!self.pullDownEl.className.match("flip")&&!self.pullDownEl.className.match("loading")?(self.pullDownEl.className="flip",self.pullDownEl.querySelector(".pullDownLabel").innerHTML=self.releaseLoading_Text,this.waitLoadTop=self.pullDownEl.offsetHeight):this.y<50&&self.pullDownEl.className.match("flip")?(self.pullDownEl.className="",self.pullDownEl.querySelector(".pullDownLabel").innerHTML=self.pullDownLabel_Text,delete this.waitLoadTop):this.y<this.maxScrollY-5&&!self.pullUpEl.className.match("flip")&&!self.pullUpEl.className.match("loading")?(self.pullUpEl.className="flip",self.pullUpEl.querySelector(".pullUpLabel").innerHTML=self.releaseLoading_Text):this.y>this.maxScrollY+5&&self.pullUpEl.className.match("flip")&&(self.pullUpEl.className="",self.pullUpEl.querySelector(".pullUpLabel").innerHTML=self.pullUpLabel_Text)}),this.myScroll.on("scrollEnd",function(){self.pullDownEl.className.match("flip")?(self.pullDownEl.className="loading",self.pullDownEl.querySelector(".pullDownLabel").innerHTML=self.pullLoading_Text,self.pullDownAction()):self.pullUpEl.className.match("flip")&&(self.pullUpEl.className="loading",self.pullUpEl.querySelector(".pullUpLabel").innerHTML=self.pullLoading_Text,self.pullUpAction())}),this.myScroll.on("refresh",function(){self.pullDownEl.className.match("loading")?(self.pullDownEl.className="",self.pullDownEl.querySelector(".pullDownLabel").innerHTML=self.pullDownLabel_Text):self.pullUpEl.className.match("loading")&&(self.pullUpEl.className="",self.pullUpEl.querySelector(".pullUpLabel").innerHTML=self.pullUpLabel_Text)})},IScrollLoadData}();module.exports={iscrollPop:iscrollPop,containerMask:containerMask,dialog:Dialog,dropdownMask:dropdownMask,IscrollLoadData:iscrollLoadData}});