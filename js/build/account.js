/*! wozhongla 2015-01-23 */
define("wzlh5/1.0.0/account",["jquery/2.1.1/jquery","wzlh5/1.0.0/ac","handlebars/1.3.0/dist/cjs/handlebars","wzlh5/1.0.0/until","wzlh5/1.0.0/cp","wzlh5/1.0.0/ui"],function(require){{var $=require("jquery/2.1.1/jquery"),until=require("wzlh5/1.0.0/until"),action=require("wzlh5/1.0.0/ac"),wzlui=require("wzlh5/1.0.0/ui"),cp=require("wzlh5/1.0.0/cp"),Handlebars=require("handlebars/1.3.0/dist/cjs/handlebars").default;wzlui.containerMask,wzlui.iscrollPop,wzlui.dialog,wzlui.containerMask,wzlui.dropdownMask,until.Y_Y,until.TZ_INFO}return account=function(ac){function loginJudge(){action.queryUserInfo({},function(re){return"200"==re.resultCode&&"用户没有登录"==re.data.message?void untils.ref("login",location.search):void 0})}function accountdetail(){function queryAccountRefer(n){action.queryAccountRefer({pageNo:n,pageSize:10},function(re){var r=processData(re);$(".pullUpLabel").text("点击加载更多");var tableTemplate=Handlebars.compile($("#table-template1").html());$("#account-list-group1").append(tableTemplate({data:r.data}))})}function queryAccountRecharge(n){action.queryAccountRecharge({pageNo:n,pageSize:10},function(re){var r=processData(re);$(".pullUpLabel").text("点击加载更多");var tableTemplate=Handlebars.compile($("#table-template2").html());$("#account-list-group2").append(tableTemplate({data:r.data}))})}function queryAccountWithDraw(n){action.queryAccountWithDraw({pageNo:n,pageSize:10},function(re){var r=processData(re);$(".pullUpLabel").text("点击加载更多");var tableTemplate=Handlebars.compile($("#table-template3").html());$("#account-list-group3").append(tableTemplate({data:r.data}))})}function queryAccountPrize(n){action.queryAccountPrize({pageNo:n,pageSize:10},function(re){var r=processData(re);$(".pullUpLabel").text("点击加载更多");var tableTemplate=Handlebars.compile($("#table-template4").html());$("#account-list-group4").append(tableTemplate({data:r.data}))})}function bettingOrder(n){action.bettingOrder({pageNo:n,pageSize:10},function(re){var r=processData(re);$(".pullUpLabel").text("点击加载更多");var tableTemplate=Handlebars.compile($("#table-template5").html());$("#account-list-group5").append(tableTemplate({data:r.data}))})}function time2Year(x){function toDou(n){return 10>n?"0"+n:n}var oDate=new Date;oDate.setTime(x);var n=toDou(oDate.getFullYear()),y=toDou(oDate.getMonth()+1),r=toDou(oDate.getDate()),s=toDou(oDate.getHours()),f=toDou(oDate.getMinutes()),m=toDou(oDate.getSeconds()),s=n+"-"+y+"-"+r+" "+s+":"+f+":"+m;return s}function processData(re){if(re.data){for(var i=0,len=re.data.length;len>i;i++)switch(re.data[i].createDt=time2Year(re.data[i].createDt),re.data[i].accountType){case 1:re.data[i].accountType="现金";break;case 2:re.data[i].accountType="彩金";break;case 3:re.data[i].accountType="红包"}return re}return $(".pullUpLabel").text("账户暂无记录，请稍后再试..."),""}loginJudge("accountdetail");var pageNo=[1,1,1,1,1];queryAccountRefer(pageNo[0]),queryAccountRecharge(pageNo[1]),queryAccountWithDraw(pageNo[2]),queryAccountPrize(pageNo[3]),bettingOrder(pageNo[4]),$(".account-nav-group li").click(function(){var $this=$(this),index=$(".account-nav-group li").index(this);$this.addClass("active").siblings().removeClass("active"),$(".bet-content .account-list").eq(index).show().siblings().hide()}),$("#scroller-pullUp1").on("click",function(){pageNo[0]++,queryAccountRefer(pageNo[0])}),$("#scroller-pullUp2").on("click",function(){pageNo[1]++,queryAccountRecharge(pageNo[1])}),$("#scroller-pullUp3").on("click",function(){pageNo[2]++,queryAccountWithDraw(pageNo[2])}),$("#scroller-pullUp4").on("click",function(){pageNo[3]++,queryAccountPrize(pageNo[3])}),$("#scroller-pullUp5").on("click",function(){pageNo[4]++,bettingOrder(pageNo[4])}),$.wzlmore(function(d){$("."+$(d).attr("class")).on("click",function(){})})}function bettingdetail(){function loadData(n1,n2,fn){action.allBetting({flag:n2,pageNo:n1,pageSize:10},function(re){var r=formatData(re.data);r?$(".pullUpLabel").text("点击加载更多..."):$("#scroller-pullUp"+n2+" .pullUpLabel").text("没有更多数据...");var jcTemplate=Handlebars.compile($("#table-template").html());$("#bets-list-group"+n2).append(jcTemplate({data:r})),fn&&fn()})}function formatData(d){if(d||"用户没有登入"!=d){for(var reg2=/^(足球)[\u4e00-\u9fa5]{1,10}$/,arr=[],i=0,len=d.length;len>i;i++){var obj={};"zh"==d[i].lototype?(obj.issue=d[i].lotoName,obj.bettingUrl="bettingZH.html?id="+d[i].id):reg2.test(d[i].lotoName)?(obj.issue="竞彩足球",obj.bettingUrl="bettingRecord.html?orderid="+d[i].id):(obj.issue=d[i].issue+"期",obj.bettingUrl="bettingRecord.html?orderid="+d[i].id),obj.lotoName=d[i].lotoName,obj.byType=d[i].byType,obj.bonussum=d[i].bonussum,obj.createtime=d[i].createtime.substring(0,16),obj.totalsum=d[i].totalsum;var s=mergebonusstatus(d[i]);obj.status=s.z,obj.isWin=s.isWin,obj.isZH=s.isZH,obj.iconImg=mergeImg(d[i].lotoid),"107"==d[i].lotoid?obj.lotoName="山东11选5":"104"==d[i].lotoid&&(obj.lotoName="广东11选5"),arr.push(obj)}return arr}location.href="login.html"}function mergebonusstatus(d){var status={"-1":"未付款",0:"待出票",1:"已发单",2:"部分流单",3:"出票失败",4:"订单取消",5:"中奖停止",6:"支付失败",7:"出票成功"},bStatus={0:"待开奖",1:"未中奖",2:"派奖中",3:"已派奖"},s=status[d.status+""],bs=bStatus[d.bonusstatus];2!=d.status&&7!=d.status||!bs||(s=2==d.status?s+" "+bs:bs);var isWin=2==d.bonusstatus||3==d.bonusstatus?!0:!1,isZH="zh"!=d.lototype?!0:!1;return{z:s,isWin:isWin,isZH:isZH}}function mergeImg(d){var s="";switch(d){case"001":s="icon-cp-ssq";break;case"113":s="icon-cp-dlt";break;case"108":s="icon-cp-pl3";break;case"107":s="icon-cp-gd115";break;case"106":s="icon-cp-jx115";break;case"109":s="icon-cp-pl5";break;case"104":s="icon-cp-sd11";break;case"002":s="icon-cp-fc3d";break;case"003":s="icon-cp-qlc";break;case"110":s="icon-cp-qxc";break;case"201":case"301":case"302":case"303":case"304":case"305":case"306":case"307":case"308":case"309":case"310":case"311":case"312":case"313":case"314":case"315":case"316":case"317":case"318":case"319":case"320":case"321":s="icon-cp-jczq";break;case"006":s="icon-cp-jxssc";break;case"018":s="icon-cp-cqssc";break;default:s="icon-cp-default"}return s}loginJudge("bettingdetail");var pageNo=[1,1,1,1],pageFlag=[1,2,3,4];$(".account-nav-group li").click(function(){var $this=$(this),index=$(".account-nav-group li").index(this);$this.addClass("active").siblings().removeClass("active"),$(".bet-content .bets-list").eq(index).show().siblings().hide()}),$("#scroller-pullUp"+pageFlag[0]).on("click",function(){pageNo[0]++,loadData(pageNo[0],pageFlag[0])}),$("#scroller-pullUp"+pageFlag[1]).on("click",function(){pageNo[1]++,loadData(pageNo[1],pageFlag[1])}),$("#scroller-pullUp"+pageFlag[2]).on("click",function(){pageNo[2]++,loadData(pageNo[2],pageFlag[2])}),$("#scroller-pullUp"+pageFlag[3]).on("click",function(){pageNo[3]++,loadData(pageNo[3],pageFlag[3])}),loadData(pageNo[0],pageFlag[0]),loadData(pageNo[1],pageFlag[1]),loadData(pageNo[2],pageFlag[2]),loadData(pageNo[3],pageFlag[3])}function bettingRecord(){function fomatJc(d){function n2Week(b){var arr=["周一","周二","周三","周四","周五","周六","周日"];return arr[b-1]}function fomatbetCode(d){for(var a1=d.betcode.split("/"),a2=d.oddsinfo.split("-"),s="",i=0;i<a1.length;i++)s+=a1[i]+a2[i];return s}var obj={};obj.lotoName=d.danchangMatch[0].lotoName,obj.orderno=d.order.orderno,obj.createtime=fomatTime(d.order.createtime),obj.totalsum=d.order.totalsum,obj.bonusstatus=formatStatus(d.order),obj.danchangMatch=[],obj.orderDetail=[];for(var i=0,len=d.danchangMatch.length;len>i;i++){var o={};o.week=n2Week(d.danchangMatch[i].issue.substring(d.danchangMatch[i].issue.length-4,d.danchangMatch[i].issue.length-3)),o.matchNum=d.danchangMatch[i].issue.substring(d.danchangMatch[i].issue.length-3,d.danchangMatch[i].issue.length),o.matchm=d.danchangMatch[i].matchm,o.matchc=d.danchangMatch[i].matchc,o.lotoName=d.danchangMatch[i].lotoName,o.betcode=d.danchangMatch[i].betcode,o.matchv=d.danchangMatch[i].matchv,obj.danchangMatch.push(o)}for(var i=0,len=d.orderDetail.length;len>i;i++){var o={};o.num=i+1,o.betcode=fomatbetCode(d.orderDetail[i]),o.playName=d.orderDetail[i].playName,o.multi=d.orderDetail[i].multi,o.bonussum=d.orderDetail[i].bonussum,obj.orderDetail.push(o)}$("#jczq").show(),$("#loading").hide();var jcTemplate=Handlebars.compile($("#jc-template").html());$("#jczq").html(jcTemplate({data:obj})),$("a#jx").attr("href","jc.html")}function fomatSzc(d){var obj={};obj.lotoid=d.order.lotoid,obj.lotoName=d.order.lotoName,obj.issue=d.order.issue,obj.orderno=d.order.orderno,obj.bonussum=d.order.bonussum,obj.createtime=fomatTime(d.order.createtime),obj.totalsum=d.order.totalsum,obj.bonusstatus=formatStatus(d.order),obj.buycode=[],"107"==d.order.lotoid?obj.lotoName="山东11选5":"104"==d.order.lotoid&&(obj.lotoName="广东11选5");for(var i=0,len=d.orderDetail.length;len>i;i++){var o={};o.num=i+1,o.betcode=d.orderDetail[i].betcode.replace(/\,/g," "),o.playName=d.orderDetail[i].playName,o.multi=d.orderDetail[i].multi,obj.buycode.push(o)}switch(obj.lotoid){case"001":obj.shref="ssq.html";break;case"002":obj.shref="fc3d.html";break;case"113":obj.shref="dlt.html";break;case"018":obj.shref="cqssc.html";break;case"006":obj.shref="ssc.html";break;case"108":obj.shref="pl3.html";break;case"110":obj.shref="qxc.html";break;case"108":obj.shref="pl3.html";break;case"109":obj.shref="pl5.html";break;case"003":obj.shref="qlc.html";break;case"106":obj.shref="jx11x5.html";break;case"107":obj.shref="sd11x5.html";break;case"104":obj.shref="gd11x5.html"}$("#loading").hide(),$("#szc").show();var szcTemplate=Handlebars.compile($("#szc-template").html());switch($("#szc").html(szcTemplate({data:obj})),$("#jx").attr("href",obj.shref),obj.lotoid){case"113":case"110":case"108":case"109":case"019":obj.issue="20"+obj.issue;break;case"006":obj.issue="2014"+obj.issue}action.issue2result({lotId:cp.CPID[obj.lotoid].lottery_id,issue:obj.issue},function(s){function formatKjcode1(s){if(!s)return"";if(4==s.readyState)return"";var n1=s.kjCode.split("+")[0],n2=s.kjCode.split("+")[1],ball="<strong class='redBalls'>"+n1+"</strong> + <strong class='blueBalls'>"+n2+"</strong>";$(".kjcode").html(ball)}function formatKjcode2(s){if(!s)return"";if(4==s.readyState)return"";var ball="<strong class='redBalls'>"+s.kjCode+"</strong>";$(".kjcode").html(ball)}switch(obj.lotoid){case"001":case"003":case"113":formatKjcode1(s);break;case"110":case"108":case"006":case"002":case"018":case"106":formatKjcode2(s)}})}function fomatTime(x){function toDou(n){return 10>n?"0"+n:n}var oDate=new Date;oDate.setTime(x);var n=toDou(oDate.getFullYear()),y=toDou(oDate.getMonth()+1),r=toDou(oDate.getDate()),s=toDou(oDate.getHours()),f=toDou(oDate.getMinutes()),m=toDou(oDate.getSeconds()),s=n+"-"+y+"-"+r+" "+s+":"+f+":"+m;return s}function formatStatus(order){var status={"-1":"未付款",0:"待出票",1:"已发单",2:"部分流单",3:"出票失败",4:"订单取消",5:"中奖停止",6:"支付失败",7:"出票成功"},bStatus={0:"待开奖",1:"未中奖",2:"中奖未派",3:"已派奖"},s=status[order.status+""],bs=bStatus[order.bonusstatus];return 2!=order.status&&7!=order.status||!bs||(s=2==order.status?s+" "+bs:bs),s}loginJudge("bettingRecord");var untils=until;action.showDetail({orderid:untils.getRequestParameter("orderid")},function(re){if(re.data){if("400"==re.resultCode)return $("#loading").html(re.data);switch(re.data.order.lotoid){case"201":case"301":case"302":case"303":case"304":case"305":case"306":case"307":case"308":case"309":case"310":case"311":case"312":case"313":case"314":case"315":case"316":case"317":case"318":case"319":case"320":case"321":fomatJc(re.data);break;default:fomatSzc(re.data)}}else $("#loading").text("暂无数据，请稍后加载...")})}function bettingZH(){function formatData(d){var arr1=[],obj={};switch(obj.lotoid=d.preproject.lotoid,obj.name=d.order[0].lotoName,obj.projectno=d.preproject.projectno,obj.createtime=time2Year(d.preproject.createtime),obj.totalsum=d.preproject.totalsum,obj.status=formatStatus(d.preproject.status),obj.betcode="",obj.lotoid){case"113":case"110":case"108":case"109":case"019":obj.startIssue="20"+d.preproject.startissue,obj.endissue="20"+d.preproject.endissue;break;case"006":obj.startIssue="2014"+d.preproject.startissue,obj.endissue="2014"+d.preproject.endissue;break;default:obj.startIssue=d.preproject.startissue,obj.endissue=d.preproject.endissue}for(var j=0,len=d.orderDetail.length;len>j;j++){var obj2={};obj2.betcode=d.orderDetail[j].betcode.replace(/,/g," ").replace(/#/g,"+"),obj2.playName=d.orderDetail[j].playName,obj2.zhu=1,obj2.multi=d.orderDetail[j].multi,obj.betcode+=obj2.betcode+" "+obj2.playName+" "+obj2.zhu+" 注 "+obj2.multi+" 倍<br>"}for(var i=0,len=d.order.length;len>i;i++){var obj1={};switch(obj1.ordernum=i+1,d.order[i].lotoid){case"113":case"110":case"108":case"109":case"019":obj1.issue="20"+d.order[i].issue;break;case"006":obj1.issue="2014"+d.order[i].issue;break;default:obj1.issue=d.order[i].issue}var st=mergebonusstatus(d.order[i]);obj1.status=st.s,obj1.bonusstatus=st.b,obj1.lotoid=d.order[i].lotoid,obj1.betcode=obj.betcode,arr1.push(obj1)}switch(obj.p1=arr1,obj.lotoid){case"001":obj.shref="ssq.html";break;case"002":obj.shref="fc3d.html";break;case"113":obj.shref="dlt.html";break;case"018":obj.shref="cqssc.html";break;case"006":obj.shref="ssc.html";break;case"108":obj.shref="pl3.html";break;case"110":obj.shref="qxc.html";break;case"108":obj.shref="pl3.html";break;case"109":obj.shref="pl5.html";break;case"003":obj.shref="qlc.html";break;case"106":obj.shref="jx11x5.html";break;case"107":obj.shref="sd11x5.html";break;case"104":obj.shref="gd11x5.html"}var zhTemplate=Handlebars.compile($("#zh-template").html());$("#zh").html(zhTemplate({obj:obj})),$("#loading").hide(),$(".lottory-detailrecord-list").click(function(){$(this).parent().next().toggle()}),$("#jx").attr("href",obj.shref),action.issue2resultAll({lotId:cp.CPID[obj.lotoid].lottery_id,startIssue:obj.startIssue,endIssue:obj.endissue},function(re){for(var k=0;k<re.lotolist.length;k++)$(".iss-"+re.lotolist[k].lotIssue).append(re.lotolist[k].kjCode)})}function formatStatus(d){switch(d){case-1:d="未付款";break;case 0:d="追号中";break;case 1:d="追号完成"}return d}function mergebonusstatus(d){var s="",b="",sta={"-1":"未付款",0:"待出票",1:"已发单",2:"部分流单",3:"出票失败",4:"订单取消",5:"中奖停止",6:"支付失败",7:"出票成功"},bsta={0:"待开奖",1:"未中奖",2:"派奖中",3:"已派奖"};return s=sta[d.status],b=bsta[d.bonusstatus],("派奖中"==b||"已派奖"==b)&&(b='<span class="wzl-h-red">'+d.bonussum+"元</span>"),"出票成功"!=s&&"部分流单"!=s&&(b="--"),{s:s,b:b}}function time2Year(x){function toDou(n){return 10>n?"0"+n:n}var oDate=new Date;oDate.setTime(x);var n=toDou(oDate.getFullYear()),y=toDou(oDate.getMonth()+1),r=toDou(oDate.getDate()),s=toDou(oDate.getHours()),f=toDou(oDate.getMinutes()),m=toDou(oDate.getSeconds()),s=n+"-"+y+"-"+r+" "+s+":"+f+":"+m;return s}loginJudge("bettingZH");var untils=until;action.showPreproject({id:untils.getRequestParameter("id")},function(re){"200"==re.resultCode&&formatData(re.data)})}function orderdetail(){function drawLoadingImg(n){var canvas=document.getElementById("circle-percent-loading"),cxt=canvas.getContext("2d");cxt.strokeStyle="white",cxt.stroke(),cxt.closePath(),cxt.beginPath(),cxt.lineWidth=3,cxt.arc(75,75,74,Math.PI/2,Math.PI/2+Math.PI*n/50,!1),cxt.stroke(),cxt.closePath()}drawLoadingImg(65)}switch(ac){case"accountdetail":accountdetail();break;case"bettingdetail":bettingdetail();break;case"orderdetail":orderdetail();break;case"bettingRecord":bettingRecord();break;case"bettingZH":bettingZH()}var untils=(wzlui.IscrollLoadData,until)},{account:account}});