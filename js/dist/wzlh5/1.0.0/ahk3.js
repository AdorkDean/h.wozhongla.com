/**
 * Created by hebo (razr409355439@gmail.com)on 15/1/7.
 */
define("wzlh5/1.0.0/ahk3",["jquery/2.1.1/jquery","wzlh5/1.0.0/ac","wzlh5/1.0.0/ui","wzlh5/1.0.0/until","tap/0.2.9/tap"],function (require, exports, module) {
    var $ = jQuery = require("jquery/2.1.1/jquery");
		require("tap/0.2.9/tap")($);
		
	var action = require("wzlh5/1.0.0/ac");
	 var until = require("wzlh5/1.0.0/until")
	var wzlui = require("wzlh5/1.0.0/ui");
	var balls = {},
		Y_Y = until.Y_Y,
		TZ_INFO = until.TZ_INFO;
		dialog = wzlui.dialog,
		nowRate = 2,
		nowIssue = null,
		sum = 0;
	function init(){
		$("#k3-hz li").tap(function(){
			ball = parseInt($(this).data("ball"),10);
			win = parseInt($(this).data("win"),10);
			addBall (ball,win,$(this));
			setSum ();
			setWin ();
			$(this).addClass("hover");
			
		})
		
		$(".reset-btn").tap(function(){
			reload()
		})
		
		$("#clearBtn").click(clearBall);
		//切换面额
		$("#valueList li").unbind().tap(function(){
			nowRate = parseInt($(this).data("value"),10);
			$("#valueList li").removeClass("hover");
			$(this).addClass("hover");
		})
		
		$('#buyConfirmBtn').unbind().bind("click", function() {
               $(this).attr("disabled")
               //发送购买请求
			   postBuy(function(re) {
				   if (re.resultCode == "200") {
					   tzsuccess();
				   }
			   });
        })
		
		$('#runPay').unbind().bind("click", function() {
			if (!sum)  return dialog("您还没有选择号码！");
			 $("#confirmSum").html(sum)
			  $("#confirmIssue").html(nowIssue.slice(-3))
			 
			   $("#confirmItem").html(sum/2)
               $("#buyConfirm").show();
			   $("#selectNamber").hide();
			  
			   
               
        })
		
		
		
		$("#randomBtn").unbind().bind("click", randomSelect)
		$("#randomBtn").click();
		Y_Y(randomSelect)
		setResult();
		setInterval(setResult,30000);
		kjdjs();
		document.getElementById("flyAudio").load();
		document.getElementById("diceAudio").load();
		
	}
	//历史开奖
	function setResult(){
		action.queryK3({pageno: 1, pagesize: 10}, 
		function(d) {
			var h =  makeResult(d.lotolist); 
			$("#historyResult").html(h);  
		})
	}
	//组装开奖号码
	function makeResult(list){
		var obj = list[0];
		var ball = obj.kjCode;
		var issue = obj.lotIssue;
		var h = "";
		h += '<h3 class="tc">'+issue.slice(-3)+'期开奖：'+ball+'</h3>';
		h += '<div class="tc game-kj oh">';
		h += '<ul class="dl result-list">';
		var arr = ball.split("");
		$.each(arr,function(i,n){
			h += '<li class="result-list-'+n+'"></li>';
		})
		h += '</ul>';
		h += '<span class="glyphicon-kj dr dn"><img src="../imgs/ui/k3/ks_p7.png" height="11"/></span>';
		h += '</div>';
		return h
	}
	//点击号码
	function addBall (ball,win,$ts){
		if (! balls[ball]){
			balls[ball] ={};
			balls[ball].value = nowRate;
			balls[ball].ball = ball;
			balls[ball].win = win*nowRate/2;
			balls[ball].icoCount = 0;
		}else{
			balls[ball].value += nowRate;
			balls[ball].win += win*nowRate/2;
			balls[ball].icoCount++;
		}
		var icoCount = balls[ball].icoCount;
		var startOffset =  $("#valueList .hover").offset();
		
		 document.getElementById("flyAudio").play();
		var x = parseInt(startOffset.left,10)+10,
			y = parseInt(startOffset.top,10)-40,
			translateX = parseInt($ts.offset().left+$ts.width(),10)-x-25,
			translateY = parseInt($ts.offset().top-$ts.height(),10)-y+3;
		
		icoRoll({
			x :x,
			y :y,
			translateX : translateX,
			translateY : translateY-icoCount*2
		})
	}
	
	var getIcoId = (function(){
		var id = 0;
		return function(){
			return id++;
		}
	})();
	//机选号码
	function randomSelect(){
		$("#diceTollBox").show();
		clearBall ();
		document.getElementById("diceAudio").play();
		setTimeout(function(){
			$("#k3-hz li:eq("+randomNumber(0,17)+")").tap()
			$("#diceTollBox").hide();
		},1200)
	}
	//机选
	function randomNumber( min, max ){
	if (max == null) {
		max = min;
		min = 0;
	}
	max = max || min;
	return min + Math.floor(Math.random() * (max - min + 1));
}
	//筹码移动动画
	function icoRoll(offset){
		var id=getIcoId();
		var h = '<div class="ico-roll-box-'+id+'"></div>';
		h+='<style>';
		h+='.ico-roll-box-'+id+'{';
		h+='position:absolute;';
		h+='z-index:159;';
		h+='left:'+offset.x+'px;';
		h+='top:'+offset.y+'px;';
		h+='height:24px;';
		h+='width:24px;';
		h+='background:url(../imgs/ui/k3/ks_value_'+nowRate+'.png) no-repeat;';
		h+='background-size:100% 100%;';
		h+='-webkit-animation:ico-roll-'+id+' .5s 0 ease both;';
		h+='-moz-animation:ico-roll-'+id+' .5s 0 ease both;';
		h+='}';
		h+='@-webkit-keyframes ico-roll-'+id+'{';
		h+='100%{-webkit-transform:translateX('+offset.translateX+'px) translateY('+offset.translateY+'px)}';
		h+='}';
		h+='@-moz-keyframes ico-roll-'+id+'{';
		h+='100%{-moz-transform:translateX('+offset.translateX+'px) translateY('+offset.translateY+'px)}';
		h+='}';
		h+='</style>';
		$("#icoBox").append(h);
		
	}


	//清除号码
	function clearBall (){
		$("#k3-hz li").removeClass("hover");
		balls = {};
		$("#sum").html(0);
		sum = 0;
		$("#expectWin").html("0元");
		$("#icoBox").html("");
	}
	//计算需要花费的总额
	function countSum (){
		var sum = 0;
		for (var key in balls){
			sum +=balls[key].value;
		}
		return sum;
	}
	//写入总额
	function setSum (){
		sum = countSum ();
		$("#sum").html(sum);
	}
	
	//写入总额
	function setWin (){
		var winArr = [];
		for (var key in balls){
			winArr.push(balls[key].win) ;
		}
		var minWin = Math.min.apply({},winArr);
		var maxWin = Math.max.apply({},winArr);
		var txt = "";
		if (minWin === maxWin){
			txt = minWin;
		}else{
			txt = minWin+"至"+maxWin;
		}
		txt +="元";
		$("#expectWin").html(txt);
	}
	
	
   //开奖倒计时
   function kjdjs() {
	   var issueA = []
	   var timer = null;
	   issue();
	   function issue() {
		   clearInterval(timer);
		   action.getIssue({
			   lottery: "AHK3",
			   issues: 25
		   }, function(re) {
			   issueA = re;
			   if (re[0].endTime <= 120) re = re.slice(1);
			   setIssue(re[0])
		   })
		   //设置期次信息
		   function setIssue(d) {
			   setCountDown(d.endTime)
			   nowIssue = d.issue;
			   $("#playEndTime").html('<h3 class="tc">距'+d.issue.slice(-3)+'期截止</h3><h2 class="tc font-led" id="playEndTimeLeft">00:00</h2>')

			   function setCountDown(s) {
				   timer = setInterval(function() {
					   s--;
					   if (s <= 120) {
						   $('#playEndTime').html('<h3 class="tc">该期次已截止</h3><h2 class="tc font-led" id="playEndTimeLeft">预售中</h2>')
						   issue()
					   }
					   var v = formatSeconds(s - 120)
					   $('#playEndTimeLeft').html(v)
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

				   }
				   var result =  pad(parseInt(theTime1)) + ":" + pad(parseInt(theTime));

				   function pad(n) {
					   return n < 10 ? "0" + n : n;
				   }
				   return result;
			   }
		   }
	   }
   }
	
	/*投注成功*/
	function tzsuccess() {
		$("#f3dcar,#selectX115,#carfixed").hide();
		$("#tzsuccess").show();
	}
	//提交投注	
	function postBuy(fn) {
	   var u = userBuyData();
	   if (u == false) return dialog("您还没有选择号码！");
	   var udata = u.d;
	   dialog("loading", "订单提交中…")
	 //  u.getIssue(function(r) {
		//   if (!r || !r.length) dialog("投注异常，请重试")
		   udata.lotoGson = JSON.stringify(udata.lotoGson)
		   action.ssqTz(udata, function(re) {
			   TZ_INFO($.parseJSON(re), fn)
		   })
	  // })
    }
	/**
	 * 用户购买数据整合
	 * @returns {*}
	 */
	function userBuyData() {
		if (!sum) return false;
		var d = {
			gameType: "032",
			format: "ajax",
			needPay: "",
			lotoGson: {}
		}
		d.needPay = 1;
		//
		d.lotoGson = mergeTZ();
	/**
	 * 投注串 数据整合
	 */
	function mergeTZ() {
		if (!sum) return false;
		var need = {
			//彩票类型
			gameType: "032",
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
		need.totalSum = Number(sum);
		need.isStop = 0;
		need.buyNumberArray = buyArrayGenerator();
		need.issueArray= [{"issue":nowIssue,"multiple":1}];
		need.buyType =  0;
		need.title = "";
		return need;
	}
			//投注号码串数据
			function buyArrayGenerator() {
				var r = [];
				for (var i in balls){
					var item = balls[i];
					if (!item) return;
					var it = join(item);
					it && r.push(it);
				}


				function join(item) {
					var dataTmp = {
						"buyNumber": "",
						"typeId": "00",
						"seleId": "01",
						"sum": 0.0
					};
					if (!item || !item.value) return false;
					var rs = item.ball
					dataTmp.buyNumber = rs ;
					dataTmp.sum = item.value;
					dataTmp.multiple = item.value/2;
					dataTmp.typeId = "01" ;
					dataTmp.seleId = "01" ;
					return dataTmp;
				}
				return r;
				}
                return {
                    d: d,
                    getIssue: [nowIssue,2]
                };
            }

	
	//弹出对象的各个属性
		function z(obj,n){
			if (typeof obj !== "object") return alert(obj);
			var arr = [];
			for (var i in obj) arr.push(i+" = "+obj[i]);
			return alert(arr.join(n||"\n\r"));
		}
		//弹出对象的各个属性
		function l(obj){
			if (window.console && console.log) {
				console.log(obj);
			}
		}
	
    return {
        init : init
    }

});