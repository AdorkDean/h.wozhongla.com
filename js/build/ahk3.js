/*! wozhongla 2015-01-23 */
define("wzlh5/1.0.0/ahk3",["jquery/2.1.1/jquery","wzlh5/1.0.0/ac","wzlh5/1.0.0/ui","wzlh5/1.0.0/until","tap/0.2.9/tap"],function(require){function init(){$("#k3-hz li").unbind().tap(function(){ball=parseInt($(this).data("ball"),10),win=parseInt($(this).data("win"),10),addBall(ball,win,$(this)),setSum(),setWin(),$(this).addClass("hover")}),$("#clearBtn").unbind().click(clearBall),$("#valueList li").unbind().tap(function(){nowRate=parseInt($(this).data("value"),10),$("#valueList li").removeClass("hover"),$(this).addClass("hover")}),$("#runPay").unbind().bind("click",function(){$(this).attr("disabled"),postBuy(function(re){"200"==re.resultCode&&tzsuccess()})}),$("#randomBtn").unbind().bind("click",randomSelect),Y_Y(randomSelect),setResult(),setInterval(setResult,3e4),kjdjs()}function setResult(){action.queryK3({pageno:1,pagesize:10},function(d){var h=makeResult(d.lotolist);$("#historyResult").html(h)})}function makeResult(list){var obj=list[0],ball=obj.kjCode,issue=obj.lotIssue,h="";h+='<h3 class="tc">'+issue.slice(-3)+"期开奖："+ball+"</h3>",h+='<div class="tc game-kj oh">',h+='<ul class="dl result-list">';var arr=ball.split("");return $.each(arr,function(i,n){h+='<li class="result-list-'+n+'"></li>'}),h+="</ul>",h+='<span class="glyphicon-kj dr dn"><img src="../imgs/ui/k3/ks_p7.png" height="11"/></span>',h+="</div>"}function addBall(ball,win,$ts){balls[ball]?(balls[ball].value+=nowRate,balls[ball].win+=win*nowRate/2,balls[ball].icoCount++):(balls[ball]={},balls[ball].value=nowRate,balls[ball].ball=ball,balls[ball].win=win*nowRate/2,balls[ball].icoCount=0);var icoCount=balls[ball].icoCount,startOffset=$("#valueList .hover").offset();document.getElementById("flyAudio").play();var x=parseInt(startOffset.left,10)+10,y=parseInt(startOffset.top,10)-40,translateX=parseInt($ts.offset().left+$ts.width(),10)-x-25,translateY=parseInt($ts.offset().top-$ts.height(),10)-y+3;icoRoll({x:x,y:y,translateX:translateX,translateY:translateY-2*icoCount})}function randomSelect(){$("#diceTollBox").show(),clearBall(),document.getElementById("diceAudio").play(),setTimeout(function(){$("#k3-hz li:eq("+randomNumber(0,17)+")").tap(),$("#diceTollBox").hide()},1200)}function randomNumber(min,max){return null==max&&(max=min,min=0),max=max||min,min+Math.floor(Math.random()*(max-min+1))}function icoRoll(offset){var id=getIcoId(),h='<div class="ico-roll-box-'+id+'"></div>';h+="<style>",h+=".ico-roll-box-"+id+"{",h+="position:absolute;",h+="z-index:159;",h+="left:"+offset.x+"px;",h+="top:"+offset.y+"px;",h+="height:24px;",h+="width:24px;",h+="background:url(../imgs/ui/k3/ks_value_"+nowRate+".png) no-repeat;",h+="background-size:100% 100%;",h+="-webkit-animation:ico-roll-"+id+" .5s 0 ease both;",h+="-moz-animation:ico-roll-"+id+" .5s 0 ease both;",h+="}",h+="@-webkit-keyframes ico-roll-"+id+"{",h+="100%{-webkit-transform:translateX("+offset.translateX+"px) translateY("+offset.translateY+"px)}",h+="}",h+="@-moz-keyframes ico-roll-"+id+"{",h+="100%{-moz-transform:translateX("+offset.translateX+"px) translateY("+offset.translateY+"px)}",h+="}",h+="</style>",$("#icoBox").append(h)}function clearBall(){$("#k3-hz li").removeClass("hover"),balls={},$("#sum").html(0),$("#expectWin").html("0元"),$("#icoBox").html("")}function countSum(){var sum=0;for(var key in balls)sum+=balls[key].value;return sum}function setSum(){sum=countSum(),$("#sum").html(sum)}function setWin(){var winArr=[];for(var key in balls)winArr.push(balls[key].win);var minWin=Math.min.apply({},winArr),maxWin=Math.max.apply({},winArr),txt="";txt=minWin===maxWin?minWin:minWin+"至"+maxWin,txt+="元",$("#expectWin").html(txt)}function kjdjs(){function issue(){function setIssue(d){function setCountDown(s){timer=setInterval(function(){s--,120>=s&&($("#playEndTime").html('<h3 class="tc">该期次已截止</h3><h2 class="tc font-led" id="playEndTimeLeft">预售中</h2>'),issue());var v=formatSeconds(s-120);$("#playEndTimeLeft").html(v)},1e3)}function formatSeconds(value){function pad(n){return 10>n?"0"+n:n}var theTime=parseInt(value),theTime1=0;theTime>60&&(theTime1=parseInt(theTime/60),theTime=parseInt(theTime%60));var result=pad(parseInt(theTime1))+":"+pad(parseInt(theTime));return result}setCountDown(d.endTime),nowIssue=d.issue,$("#playEndTime").html('<h3 class="tc">距'+d.issue.slice(-3)+'期截止</h3><h2 class="tc font-led" id="playEndTimeLeft">00:00</h2>')}clearInterval(timer),action.getIssue({lottery:"AHK3",issues:25},function(re){issueA=re,re[0].endTime<=120&&(re=re.slice(1)),setIssue(re[0])})}var issueA=[],timer=null;issue()}function tzsuccess(){$("#f3dcar,#selectX115,#carfixed").hide(),$("#tzsuccess").show()}function postBuy(fn){var u=userBuyData();if(0==u)return dialog("您还没有选择号码！");var udata=u.d;dialog("loading","订单提交中…"),udata.lotoGson=JSON.stringify(udata.lotoGson),action.ssqTz(udata,function(re){TZ_INFO($.parseJSON(re),fn)})}function userBuyData(){function mergeTZ(){if(!sum)return!1;var need={gameType:"032",isStop:"",buyType:"0",buyNumberArray:"",issueArray:[],title:"0",explain:"0",secrecy:"1",splitAmount:"0",isUpload:"0",buyAmount:0,floorsAmount:"0",totalSum:"0",qcdy:"0",unoid:"0",commision:"0",commisiontype:"0"};return need.totalSum=Number(sum),need.isStop=0,need.buyNumberArray=buyArrayGenerator(),need.issueArray=[{issue:nowIssue,multiple:1}],need.buyType=0,need.title="",need}function buyArrayGenerator(){function join(item){var dataTmp={buyNumber:"",typeId:"00",seleId:"01",sum:0};if(!item||!item.value)return!1;var rs=item.ball;return dataTmp.buyNumber=rs,dataTmp.sum=item.value,dataTmp.multiple=item.value/2,dataTmp.typeId="01",dataTmp.seleId="01",dataTmp}var r=[];for(var i in balls){var item=balls[i];if(!item)return;var it=join(item);it&&r.push(it)}return r}if(!sum)return!1;var d={gameType:"032",format:"ajax",needPay:"",lotoGson:{}};return d.needPay=1,d.lotoGson=mergeTZ(),{d:d,getIssue:[nowIssue,2]}}var $=jQuery=require("jquery/2.1.1/jquery");require("tap/0.2.9/tap")($);var action=require("wzlh5/1.0.0/ac"),until=require("wzlh5/1.0.0/until"),wzlui=require("wzlh5/1.0.0/ui"),balls={},Y_Y=until.Y_Y,TZ_INFO=until.TZ_INFO;dialog=wzlui.dialog,nowRate=2,nowIssue=null,sum=0;var getIcoId=function(){var id=0;return function(){return id++}}();return{init:init}});