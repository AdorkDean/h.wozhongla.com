var dc = dc||{};
var inc=dc;
console.log(111)
$('.jc-select-span').click(function(){
	console.log(666)
})
dc.arg={
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

dc.chuan2num={
	"单关":"01","2串1":"02","3串1":"03","3串3":"04","3串4":"05","4串1":"06","4串4":"07","4串5":"08",	
	"4串6":"09","4串11":"10","5串1":"11","5串5":"12","5串6":"13",	"5串10":"14","5串16":"15","5串20":"16",
	"5串26":"17","6串1":"18","6串6":"19","6串7":"20","6串15":"21","6串20":"22","6串22":"23","6串35":"24",
	"6串42":"25","6串50":"26","6串57":"27","7串1":"28","7串7":"29","7串8":"30","7串21":"31","7串35":"32",
	"7串120":"33","8串1":"34","8串8":"35","8串9":"36","8串28":"37","8串56":"38","8串70":"39","8串247":"40"	
}
dc.matchCss=[
	"其它","A3冠军","东亚四强赛","世界杯","世界俱乐部冠军杯","世界杯预选赛","世界青年足球锦标赛","中国甲级联赛",
	"中联杯","中国超级联赛","丹麦超级联赛","乌克兰甲级联赛","亚洲冠军联赛","亚洲锦标赛","亚洲锦标赛预选赛",
	"南美解放者杯","俄罗斯超级联赛","澳大利亚超级联赛","保利亚甲级联赛","匈牙利甲级联赛","杯赛","和平杯",
	"图图杯","塞尔维亚甲级联赛","摩西甲","奥地利乙级联赛","奥地利甲级联赛","女世界杯","威尔士超","巴西甲级联赛",
	"巴西杯","希腊甲级联赛--","德国乙级联赛","德北","德南","德国杯","德国甲级联赛","德联杯","意丙A","意丙B",
	"意大利乙级联赛","意大利杯","意大利超级杯","意大利甲级联赛","挪威甲级联赛","挪威超级联赛","挪威杯","捷克甲级联赛",
	"斯伐克甲级联赛","斯甲","日本职业联赛","日本乙级联赛","日本联赛杯","日本天皇杯","日本超级杯","智利甲级联赛",
	"欧洲冠军联赛","欧洲杯","比利时乙级联赛","比利时杯","比利时甲级联赛","法国乙级联赛","法国杯","法国超级杯",
	"法国甲级联赛","法国联赛杯","波兰甲级联赛","海湾杯","爱尔兰甲级联赛","爱尔兰超级联赛","瑞典甲级联赛","瑞典超级联赛",
	"瑞典杯","瑞士甲级联赛","瑞士超级联赛","皇家联赛杯","罗尼亚","美洲杯","美国职业大联盟","中北美金杯赛","老虎杯",
	"联合会","欧洲联盟杯","欧洲超级杯","芬兰超级联赛","苏格兰甲级联赛","苏格兰联赛杯","苏格兰超级联赛","苏格兰足总杯",
	"英格兰乙级联赛","英格兰冠军联赛","英格兰甲级联赛","英格兰联赛杯","英格兰社区盾杯","英格兰足总杯","英格兰超级联赛",
	"英非","荷兰乙级联赛","荷兰杯","荷兰超级杯","荷兰甲级联赛","葡萄牙乙级联赛","葡萄牙超级联赛","葡萄牙联赛杯",
	"葡萄牙杯","葡萄牙超级杯","西班牙乙级联赛","西班牙杯","西班牙超级杯","西班牙国王杯","西班牙甲级联赛","足协杯",
	"足总杯","阿根廷甲级联赛","青年欧","非洲国家杯","世界U20锦标赛","欧洲U21锦标赛","韩国职业联赛","国际赛",
	"国际足联联合会杯","俱乐部友谊赛","其它"
]
dc.getSpInfoUrl="/lottery/jcplaysp.action";

//获取对阵信息
//单场初始化
var projectType=0;
dc.init = function(lotId){
	gameType=lotId;
	dc.lotId=lotId;
	dc.nb={};//选择号码
	dc.nb.length=0;
	dc.chuan=[];//串信息
	dc.dan=[];//胆信息
	dc.matchInfo="";//对阵信息
	dc.itemTotal=0;//中注数
	dc.showStop=false;//是否显示停售场次
	dc.sp = {}; //sp值
	dc.spObj = {}; //sp值
	dc.sum=0;//总金额
	dc.bei=1;//倍数
	dc.hideNum=0;
	dc.hideIds=[];
	dc.matchEvents={};//赛事
	dc.isRang = [];  //让球
	dc.isNoRang = []; //不让
	dc.jzTime = {};
	dc.ksTime = {};
	dc.vs = {};
	dc.isStop=false;
	dc.isShowStop=true;//是否显示已经停售的期次
	
	dc.isEcho=false;//是否去重复
	dc.oldSp={}//存储sp值对比用
	
	$("#chuan span").hide();//隐藏串
	$("#boxbox").attr("class","conbox c_"+lotId);
	
	dc.fens={};//存储每场的剩余分钟数
	dc.matchNo ={}
	dc.nos={};//存储matchNo信息
	dc.ids={};//存储matchNo信息
	dc.getMatchInfo();//获取对阵信息
	
	//显示标题栏目
	if (dc.lotId == 320||dc.lotId == 321){
		$("#dcTitle_301").show();
		
	}else{
		$("#dcTitle_30"+dc.lotId.slice(2)).show();
	}
	

}

dc.getMatchInfo = function(){
	$.get("/slttz/preissue?method=jcMatch&lotoId="+dc.lotId+"&v="+J.r(),function(data){
		if (data.length==0) return;
		var obj = eval("("+ data +")");
		dc.matchInfo=obj;
		var arr=dc.matchInfo;
		for (var i=0;i<arr.length;i++){
			var matchNo=arr[i].matchNo;
			arr[i].matchId= ["","周一","周二","周三","周四","周五","周六","周日"][matchNo.substring(8,9)]
			arr[i].matchId += ""+matchNo.substring(9,12)
			dc.vs[arr[i].matchId] = arr[i]
		}
		dc.makeMatchInfo(arr);//写入信息
		
		dc.filterWin();//写入筛选
		dc.bindEvent();//绑定事件
		dc.getSpInfo();
		clearInterval(dc.spInterval);
		dc.spInterval = setInterval( "dc.getSpInfo()",30000 );//写入sp
		dc.setFen();
		
		dc.getSystemTime()
	})
}
//var d=new Date(2012,10,17,23,59).getTime();
//var e=new Date(2012,10,16,16,05).getTime();
//alert((d-e))
//写入距离结束还有多少分
dc.setFen = function (){
	
	for (var i in dc.fens){
		var fen=dc.fens[i]--;
		//z(fen)
	if (fen <= 14){
			$("#tr_"+i).remove()
			if (dc.lotId==302||dc.lotId==312){
				$("#tr_"+i+"_bf")
			}
			if (dc.nb[i]){
			delete dc.nb[i];
			dc.nb.length--;
			dc.countBox(i);
			}
		}
	}
	clearTimeout(dc.fenInterval);
	dc.fenInterval = setTimeout( "dc.setFen()",60000 );//写入距离结期时间
}
//时间加法
dc.timeJia = function (val){
	arr=val.split(":");
	if (arr[1]<59){
		arr[1]++;
		if (arr[1]<10) arr[1]="0"+parseFloat(arr[1])
	}else{
		arr[1]="00";
		arr[0]++;
	}
	
	if (arr[0]<10) arr[0]="0"+parseFloat(arr[0])
	if (arr[0]==60) arr[0]="00"
	
	return arr[0]+":"+arr[1]
}
//时间戳转日期
dc.sjcTorq= function(t){
	 var time = new Date(t) 
 		return time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()+" "+time.toLocaleTimeString();
}
dc.getSystemTime = function(){
	$.get("/slttz/preissue?method=nowdate&v="+J.r(),function(data){
		dc.sysHM=J.date.timeToSjc(data)
		dc.nowDate=data.split(" ")[0]
		dc.fenMiao=data.split(" ")[1];
		dc.systemTime=J.date.timeToSjc(data)
		//dc.palyTime()
		//clearInterval(dc.playTimeInterval);
		//dc.playTimeInterval = setInterval( "dc.palyTime()",30000 );//游戏开放
		
		clearInterval(dc.sysTimeInterval);
		dc.sysTimeInterval = setInterval( "dc.sysTime()",1000 );//系统时间
	})
}

dc.sysTime = function (){
	var newDate=new Date();
	newDate.setTime(dc.sysHM);
	//var newTime=newDate.toLocaleDateString()+" "+newDate.toLocaleTimeString();
	var newTime=newDate.getFullYear()+"年"+(newDate.getMonth()+1)+"月"+newDate.getDate()+"日 "+newDate.toLocaleTimeString();
	$("#nowTime").html(newTime)
	dc.sysHM+=1000;
}
dc.stopSn = function(i){
	$("#tr_"+i+" :checkbox").attr("checked",false)
			.attr("disabled","disabled").unbind();
			$("#tr_"+i+" .s").removeClass("xz").unbind();
			$("#tr_"+i+" .a").removeClass("xz").unbind();
			$("#tr_"+i).attr("class","mor_gr")
			if (dc.lotId==302||dc.lotId==312){
				$("#tr_"+i+"_bf :checkbox").attr("checked",false)
				.attr("disabled","disabled").unbind();
				$("#tr_"+i+"_bf .s").removeClass("xz").unbind();
				$("#tr_"+i+"_bf .a1").removeClass("xz").unbind();
				$("#tr_"+i+"_bf .a2").removeClass("xz").unbind();
				$("#tr_"+i+"_bf .a3").removeClass("xz").unbind();
			}
	
	
	
}
dc.palyTime = function(){
	dc.systemTime+=30000;
	var nowDay=new Date(dc.systemTime).getDay();
	if (nowDay==1||nowDay==2||nowDay==3||nowDay==4||nowDay==5){
		var playTime=J.date.timeToSjc(dc.nowDate+" 09:00:00");
		var stopTime=J.date.timeToSjc(dc.nowDate+" 23:40:00");
	}else if(nowDay==6||nowDay==0){
		var playTime=J.date.timeToSjc(dc.nowDate+" 09:00:00");
		var stopTime=J.date.timeToSjc(dc.nowDate+" 23:40:00")+1000*60*60;
	}

	//dc.systemTime =  J.date.timeToSjc("2012-07-02 23:39:00");
	//var playTime=J.date.timeToSjc(dc.nowDate+" 09:00:00");
	//var stopTime=J.date.timeToSjc(dc.nowDate+" 23:25:00")+3000*60*60;
	if ((dc.systemTime < stopTime && dc.systemTime > playTime)||((nowDay==1||nowDay==0)&&dc.fenMiao.slice(0,2)=="00"&&parseInt(dc.fenMiao.slice(3,5))<"40")){
		//a("能买")
		$(".qr_bot").removeClass("qr_bot_stop").attr("disabled",false)
		$("#cooperateBn").removeClass("qr_bot_stop").attr("disabled",false)
		$("#stop_ts").hide();
	}else{
		//a("不能买")
		$(".qr_bot").addClass("qr_bot_stop").attr("disabled",true)
		$("#cooperateBn").addClass("qr_bot_stop").attr("disabled",true)
		$("#stop_ts").show();
	}
}

//对阵信息组串dc.matchEvents
dc.makeMatchInfo = function(arr){
	var w=[];
	var dcTitle= dc.lotId == 320||dc.lotId == 321 ? "#dcTitle_301" : "#dcTitle_30"+dc.lotId.slice(2);
	$(dcTitle+" td").each(function(i){
		w.push($(this).attr("width"));
	});
	dc.idToI = {}
	
	var str="";
	var stopStr="";
	var rightBox="";
	//var footBox="";
	var nameArr=dc.arg[dc.lotId].numName;
	var oldTime=[];
	var xqNum=-1;
	var stopY=[];
	var stopN=[];
	//先遍历已经结期数组及存储sp值、场次信息
	var tqFen = dc.lotId==311 ? 5:15;
	for (var i=0;i<arr.length;i++){
		//dc.oldSp[arr[i].matchId]=arr[i].sp.split(" ");
		dc.nos[i]=arr[i].matchId; //期次编号
		dc.idToI[arr[i].matchId] = i
		dc.matchNo[i]=arr[i].matchNo; //场次
		dc.ids[arr[i].matchId]=i;
		
		var ksTime = tool.formatTime(arr[i].endTime);
		ksTime = J.date.timeToSjc(ksTime);
		ksTime = J.date.sjcToTime(ksTime);
		dc.ksTime[i] = ksTime;
		
		var jzTime = tool.formatTime(arr[i].stopSaleTime);
		//jzTime = J.date.timeToSjc(jzTime)-900000;
		
		jzTime = J.date.timeToSjc(jzTime)-tqFen*60000;
		arr[i].hmEndTime = jzTime - 30*60000;
		jzTime = J.date.sjcToTime(jzTime);
		dc.jzTime[i] = jzTime;
		
		
		(arr[i].comityBall == "0") ? dc.isNoRang.push(arr[i].matchId) : dc.isRang.push(arr[i].matchId);
		
		if (!dc.matchEvents[arr[i].matchName]){
			dc.matchEvents[arr[i].matchName]=[];
		}
		dc.matchEvents[arr[i].matchName].push(arr[i].matchId);
		dc.fens[i]=parseInt(arr[i].leftTime/60);
	}
	//生成尚未结期的
	for (var i=0;i<arr.length;i++){
		var index=i;
		var id=arr[index].matchNo.substring(3) ;
		var no = arr[index].matchNo
		var id=i;
		var endTime = tool.formatTime(arr[index].endTime);;
		var stopSaleTime = tool.formatTime(arr[index].stopSaleTime);
		stopSaleTime=stopSaleTime.split(" ")
		var newTime1=endTime
		endTime=endTime.split(" ");
		
		if ( parseFloat(endTime[1].split(":")[0]) < 12 ){
			var newArr=newTime1.split(" ");
			var newArr1=newArr[0].split("-");
			var newArr2=newArr[1].split(":");
			var newHM=new Date(newArr1[0],(parseFloat(newArr1[1])-1),newArr1[2],newArr2[0],newArr2[1],"00").getTime();
			var newDate=new Date();
			newDate.setTime(newHM-43200000+120000);
			var getMonthInfo = newDate.getMonth()+1
			getMonthInfo =getMonthInfo>9 ? getMonthInfo:"0"+getMonthInfo
			var getDateInfo = newDate.getDate();
			getDateInfo =getDateInfo>9 ? getDateInfo:"0"+getDateInfo
			var newTime=[newDate.getFullYear()+"-"+getMonthInfo+"-"+getDateInfo,newDate.toLocaleTimeString()];
		}else{
			var newTime=newTime1.split(" ");
		}
		if (xqNum == -1){
				xqNum++;
				str+='<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0"  class="hide_box" id="hide_box_'+xqNum+'">';
				var weekday=" 星期"+"日一二三四五六".charAt( new Date(newTime[0].replace(/-/g,"\/")).getDay());
				str+='<tr class="lf_font" id="hide_tr_'+xqNum+'">';
				str+='<td colspan="20" class="datetime">';
				var r = newTime[0].split("-")
				str+='<span class="tb">'+(r[0]+"年"+r[1]+"月"+r[2]+"日")+' '+weekday+'</span>';
				str+='<span class="tre2">( 12：00--次日12：00 共<span  id="xq_'+xqNum+'"></span>场  [<a href="javascript" class="hide_next" id="hide_'+xqNum+'">隐藏</a>] )</span>';
				 
				
				str+='</td>';
				str+='</tr>';
				oldTime=[newTime[0],newTime[1]];
		}else {
		if (newTime[0]!=oldTime[0]){
				xqNum++;
				str+='</table>';
				str+='<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0"  class="hide_box" id="hide_box_'+xqNum+'">';
				var weekday=" 星期"+"日一二三四五六".charAt( new Date(newTime[0].replace(/-/g,"\/")).getDay());
				str+='<tr class="lf_font" id="hide_tr_'+xqNum+'">';
				str+='<td colspan="20" class="datetime">';
				//str+='<img class="img1 hide_next" src="/img/v3/lot_jian.gif" border="0" id="hide1_'+xqNum+'"  align="absmiddle"/>';
				var r = newTime[0].split("-")
				str+='<span class="tb">'+(r[0]+"年"+r[1]+"月"+r[2]+"日")+' '+weekday+'</span>';
				str+='<span class="tre2">( 12：00--次日12：00 共<span  id="xq_'+xqNum+'"></span>场  [<a href="javascript" class="hide_next" id="hide_'+xqNum+'">隐藏</a>] )</span>';
				 
				
			//	str+='<img src="/img/v3/lot_jian.gif" class="hide_next" id="hide2_'+xqNum+'"  align="absmiddle"/>';
				str+='</td>';
				str+='</tr>';
				oldTime=[newTime[0],newTime[1]];
			}
		}
		var gS=J.arr.indexOf(dc.matchCss,arr[index].matchName)||113;
		if (gS==-1) gS=113
		if (dc.lotId==301||dc.lotId==311||dc.lotId == 320||dc.lotId == 321){//胜平负
			str+='<tr class="mor_tr" id="tr_'+id+'" show="1" i="'+index+'"  xq="xq_'+xqNum+'" >  ';
			str+='<td class="show" id="show_'+id+'" width="'+w[0]+'" height="35"><div><span>'+arr[index].matchId+'</span><s class="del" title="隐藏">隐藏</s></div></td>';
			str+='  <td class="z g'+gS+'" width="'+w[1]+'" title="'+arr[index].matchName+'">'+arr[index].matchName.substring(0,4)+'</td>';
			
			str+='  <td width="'+w[2]+'"><span class="jz_time">'+dc.jzTime[index].substring(5,16)+'</span><span class="ks_time dn">'+dc.ksTime[index].substring(5,16)+'</span></td>';
			str+='  <td width="'+w[3]+'" class="blue">'+arr[index].matchHome.substring(0,5)+'</td>';
				var comityBall=parseInt(arr[index].comityBall);
				if (comityBall>0) {
					comityBall='<span class="tre tb ts">'+comityBall+'</span>'
				}else if (comityBall<0) {
					comityBall='<span class="tgreen tb ts">'+comityBall+'</span>'
				}
				str+='  <td class="tgr1" width="'+w[4]+'">'+comityBall+'</td>';
			str+='  <td width="'+w[5]+'" class="blue">'+arr[index].matchGuest.substring(0,5)+'</td>';
			for(var n=0; n<nameArr.length; n++){
				str+=' <td class="s" id="td_'+id+'_'+n+'" width="'+parseInt(w[(6+n)])+'"><div class="tl"><input type="checkbox">';
				str+='<span id="sp_'+no+'_'+n+'" class="sp"></span></div> ';
				str+='  </td>';
			}
			str+='  <td class="a" id="all_'+id+'" width="'+w[9]+'"><input type="checkbox"></td>';
			str+='</tr>';
			
		}else if (dc.lotId==320||dc.lotId==321){//胜平负
			str+='<tr class="mor_tr" id="tr_'+id+'" show="1" i="'+index+'"  xq="xq_'+xqNum+'" >  ';
			str+='<td class="show" id="show_'+id+'" width="'+w[0]+'" height="35"><div><span>'+arr[index].matchId+'</span><s class="del" title="隐藏">隐藏</s></div></td>';
			str+='  <td class="z g'+gS+'" width="'+w[1]+'" title="'+arr[index].matchName+'">'+arr[index].matchName.substring(0,4)+'</td>';
			
			str+='  <td width="'+w[2]+'"><span class="jz_time">'+dc.jzTime[index].substring(5,16)+'</span><span class="ks_time dn">'+dc.ksTime[index].substring(5,16)+'</span></td>';
			str+='  <td width="'+w[3]+'" class="blue">'+arr[index].matchHome.substring(0,5)+'</td>';
			
			str+='  <td class="tgr" width="'+w[4]+'" id="pk_'+arr[index].matchNo+'"></td>';
			str+='  <td width="'+w[5]+'" class="blue">'+arr[index].matchGuest.substring(0,5)+'</td>';
			for(var n=0; n<nameArr.length; n++){
				str+=' <td class="s" id="td_'+id+'_'+n+'" width="'+parseInt(w[(6+n)])+'"><div class="tl"><input type="checkbox">';
				str+='<span id="sp_'+no+'_'+n+'" class="sp"></span></div> ';
				str+='  </td>';
			}
			str+='  <td class="a" id="all_'+id+'" width="'+w[9]+'"><input type="checkbox"></td>';
			str+='</tr>';
		}else if(dc.lotId==302||dc.lotId==312){//比分
			str+='<tr class="mor_tr" id="tr_'+id+'" show="1" i="'+index+'"  xq="xq_'+xqNum+'" >  ';
			str+='<td class="show" id="show_'+id+'" width="'+w[0]+'" height="35"><div><span>'+arr[index].matchId+'</span><s class="del" title="隐藏">隐藏</s></div></td>';
			str+='  <td class="z g'+gS+'" width="'+w[1]+'">'+arr[index].matchName.substring(0,4)+'</td>';
			str+='  <td width="'+w[2]+'"><span class="jz_time">'+dc.jzTime[index].substring(5,16)+'</span><span class="ks_time dn">'+dc.ksTime[index].substring(5,16)+'</span></td>';
			str+='  <td width="'+w[3]+'" class="blue">'+arr[index].matchHome.substring(0,5)+'</td>';
			str+='  <td width="'+w[4]+'" class="blue">'+arr[index].matchGuest.substring(0,5)+'</td>';

			str+='  <td width="'+w[5]+'"><input class="t11 sp_kg" value="显示比分" type="button" /></td>';
			str+='</tr>';
			str+='<tr id="tr_'+id+'_bf" l="bf"  style="display:none"><td colspan="9">';
			str+='<table width="100%" border="0" cellpadding="0" cellspacing="0" class="table_bf">';
			
			str+='<tr>';
			str+='<td width="4%" height="40">主胜</td>';
			str+='<td width="9%" class="s" id="td_'+id+'_'+0+'"><input type="checkbox" /><span class="tb">胜其他</span>';
			str+='<span id="sp_'+no+'_0" class="s"></span> ';
			str+='  </td>';
			var numName=dc.arg[dc.lotId].numName;		
			for(var n=1; n < 13 ; n++){
				str+='<td width="7%" class="s" id="td_'+id+'_'+n+'"><input type="checkbox" /><span class="tb">'+numName[n]+'</span>';
				str+='<span id="sp_'+no+'_'+n+'" class="sp"></span> ';
				str+='  </td>';
			}
			//str+='  <td class="a1" id="all1_'+id+'"><input type="checkbox"></td>';
			str+='</tr>';
			
			
			str+='<tr>';
			str+='<td width="4%" height="40">平局</td>';
			str+='<td width="9%" class="s" id="td_'+id+'_'+n+'"><input type="checkbox" /><span class="tb">平其他</span>';
			str+='<span id="sp_'+no+'_'+n+'" class="sp"></span> ';
			str+='  </td>';
			var numName=dc.arg[dc.lotId].numName;		
			for(var n=14; n < 18 ; n++){
				str+='<td width="7%" class="s" id="td_'+id+'_'+n+'"><input type="checkbox" /><span class="tb">'+numName[n]+'</span>';
				str+='<span id="sp_'+no+'_'+n+'" class="sp"></span> ';
				str+='  </td>';
			}
			for(var j=0; j < 8 ; j++){
				str+='<td> </td>';
			}
			//str+='  <td class="a2" id="all2_'+id+'"><input type="checkbox"></td>';
			str+='</tr>';
			
			
			
			str+='<tr>';
			str+='<td width="4%" height="40">客胜</td>';
			str+='<td width="9%" class="s" id="td_'+id+'_'+n+'"><input type="checkbox" /><span class="tb">负其他</span>';
			str+='<span id="sp_'+no+'_'+n+'" class="sp"></span> ';
			str+='  </td>';
			var numName=dc.arg[dc.lotId].numName;		
			for(var n=19; n < 31 ; n++){
				str+='<td width="7%" class="s" id="td_'+id+'_'+n+'"><input type="checkbox" /><span class="tb">'+numName[n]+'</span>';
				str+='<span id="sp_'+no+'_'+n+'" class="sp"></span> ';
				str+='  </td>';
			}
			//str+='  <td class="a3" id="all3_'+id+'"><input type="checkbox"></td>';
			str+='</tr>';
			
			
			str+='</table></td>';
			str+='</tr>';
			
		
		}else if(dc.lotId==303||dc.lotId==313){
			str+='<tr class="mor_tr" id="tr_'+id+'" show="1" i="'+index+'"  xq="xq_'+xqNum+'">  ';
			str+='<td class="show" id="show_'+id+'" height="35" width="'+w[0]+'"><div><span>'+arr[index].matchId+'</span><s class="del" title="隐藏">隐藏</s></div></td>';
			str+='  <td class="z g'+gS+'" width="'+w[1]+'" title="'+arr[index].matchName+'">'+arr[index].matchName.substring(0,4)+'</td>';
			str+='  <td width="'+w[2]+'"><span class="jz_time">'+dc.jzTime[index].substring(5,16)+'</span><span class="ks_time dn">'+dc.ksTime[index].substring(5,16)+'</span></td>';
			str+='  <td width="'+w[3]+'" class="blue">'+arr[index].matchHome.substring(0,5)+'</td>';
			str+='  <td width="'+w[4]+'" class="blue">'+arr[index].matchGuest.substring(0,5)+'</td>';

			for(var n=0; n<nameArr.length; n++){
				str+='  <td class="s" id="td_'+id+'_'+n+'" width="'+w[(5+n)]+'"><input type="checkbox">';
				str+='<span id="sp_'+no+'_'+n+'" class="sp"></span> ';
				str+='  </td>';
			}
			str+='  <td class="a" id="all_'+id+'" width="'+w[13]+'"><input type="checkbox"></td>';
			str+='</tr>';
		}else if(dc.lotId==304||dc.lotId==314){
			str+='<tr class="mor_tr" id="tr_'+id+'" show="1" i="'+index+'"  xq="xq_'+xqNum+'" >  ';
			str+='<td class="show" id="show_'+id+'" height="35" width="'+w[0]+'"><div><span>'+arr[index].matchId+'</span><s class="del" title="隐藏">隐藏</s></div></td>';
			str+='  <td class="z g'+gS+'" width="'+w[1]+'" title="'+arr[index].matchName+'">'+arr[index].matchName.substring(0,4)+'</td>';
			str+='  <td width="'+w[2]+'"><span class="jz_time">'+dc.jzTime[index].substring(5,16)+'</span><span class="ks_time dn">'+dc.ksTime[index].substring(5,16)+'</span></td>';
			str+='  <td width="'+w[3]+'" class="blue">'+arr[index].matchHome.substring(0,5)+'</td>';
			str+='  <td width="'+w[4]+'" class="blue">'+arr[index].matchGuest.substring(0,5)+'</td>';

			for(var n=0; n<nameArr.length; n++){
				str+='<td class="s" id="td_'+id+'_'+n+'" width="'+w[(5+n)]+'"><input type="checkbox">';
				str+='<span id="sp_'+no+'_'+n+'" class="sp"></span> ';
				str+='  </td>';
			}
			str+='  <td class="a" id="all_'+id+'" width="'+w[14]+'"><input type="checkbox"></td>';
			str+='</tr>';
		}
		
		//没结期的生成右浮动和下框
		rightBox+='<tr id="right_'+id+'" style="display:none"></tr>';
		//footBox+='<tr id="foot_'+id+'" style="display:none"></tr>';
	}
	 str+='</table>';
	$("#dcc").html(str);
	str=""
		//alert(xq)
	//写入星期几有多少场次
	for (var i=0;i<=xqNum;i++){
		if (dc.lotId!=302&&dc.lotId!=312){
			$("#xq_"+i).text($("#dcc tr[xq='xq_"+i+"']").length);
		}else{
			$("#xq_"+i).text($("#dcc tr[xq='xq_"+i+"']").length);	
		}
	}
	$("#rightBox").html(rightBox);
	
	if (dc.lotId==301||dc.lotId==311||dc.lotId==320||dc.lotId==321) dc.setPkInfo()
	//$("#footBox").html(footBox);
	
}

//写入盘口信息
dc.setPkInfo = function(){
	$.get("/slttz/preissue?method=comityball&lotoId=301&v="+J.r(),function(data){
		try{
			var obj = eval("("+data+")")
	 	}catch (e){
			return ; 
		}
		for (var i in obj){
			var o = obj[i];
			if (o.vst!=="1"&&o.comityBall!=="0") o.comityBall="-"+o.comityBall
			$("#pk_"+i).html(o.comityBall)
		}
		
	})
	
	
}

//绑定选号事件
dc.bindEvent = function(){
	//点击选号
	$("#dcc .s").mousedown(function(){
		var id=$(this).attr("id");
			dc.clickEvent(id,1);
	})
	//禁止用户自己打钩
	$("#dcc :checkbox").toggle(function(){
		$(this).attr("checked","checked")
	},function(){
		$(this).attr("checked",false)
	})
	//点击全
	$("#dcc .a").mousedown(function(){
		var id=$(this).attr("id");
			dc.allClickEvent($(this).attr("id"));
	})
	$("#dcc .a1").mousedown(function(){
		var id=$(this).attr("id");
			dc.allClickEventBf($(this),1);
	})
	$("#dcc .a2").mousedown(function(){
		var id=$(this).attr("id");
			dc.allClickEventBf($(this),2);
	})
	$("#dcc .a3").mousedown(function(){
		var id=$(this).attr("id");
			dc.allClickEventBf($(this),3);
	})
	//点击眼睛隐藏行
	$("#dcc .show").click(function(){
		dc.delTrNb($(this).attr("id"));
		dc.countBox($(this).attr("id"));
	})
	if ($.browser.version=="6.0"){
		$("#dcc .show").mouseover(function(){
			$(this).find("span").hide();
		})
		$("#dcc .show").mouseout(function(){
			$(this).find("span").show();
		})
	}
	if (dc.lotId==302||dc.lotId==312){
		$(".sp_kg").toggle(function(){
			$(this).parent().parent().next().show();
			$(this).val("隐藏比分");
		},function(){
			$(this).parent().parent().next().hide();
			$(this).val("显示比分");
		})
		//$(".sp_kg:first").click();
	}
	$(".hide_next").toggle(function(){
		var id = $(this).attr("id").split("_")[1]
			//$("#hide1_"+id).attr("src","/img/v3/lot_jiaa.gif")
			//$("#hide2_"+id).attr("src","/img/v3/lot_jiaa.gif")
			$(this).text("显示");
			$("#hide_tr_"+id).nextAll(".mor_tr").hide()
			$("#showHide").text($(".mor_tr:hidden").length)
		},function(){
			var id = $(this).attr("id").split("_")[1]
			//$("#hide1_"+id).attr("src","/img/v3/lot_jian.gif")
			//$("#hide2_"+id).attr("src","/img/v3/lot_jian.gif")
			$(this).text("隐藏");
			$("#hide_tr_"+id).nextAll(".mor_tr").show()
			$("#showHide").text($(".mor_tr:hidden").length)
		}
	)
	//tr事件
	$("#dcc tr.mor_tr").mouseover(function(){
		$(this).addClass("dc_tr1")
	})
	$("#dcc tr.mor_tr").mouseout(function(){
		$(this).removeClass("dc_tr1")
	})
	$("#rightBox tr").mouseover(function(){
		$(this).addClass("dc_tr1")
	})
	$("#rightBox tr").mouseout(function(){
		$(this).removeClass("dc_tr1")
	})
	
	
	
	if (dc.lotId==301){
		$("#isLaterUpBn").show();
	}
	
	
	//$("#footBox tr").mouseover(function(){
	//	$(this).addClass("dc_tr1")
	//})
	//$("#footBox tr").mouseout(function(){
	//	$(this).removeClass("dc_tr1")
	//})
}
//删除对应行的号码
dc.delTrNb = function(id){
	var id=id.split("_")[1];
	if (dc.nb[id]){
		delete dc.nb[id];
		$("#tr_"+id+" .s").attr("class","s");
		$("#tr_"+id+" .a").attr("class","a");
		$("#tr_"+id+"  :checkbox").attr("checked",false);
		dc.nb.length--;
		dc.setFloatWin(id);//浮动框信息
		//dc.setFootWin(id); //下部窗口
	}
	dc.hideNum++;
	$("#tr_"+id).hide();
	if (dc.lotId==302||dc.lotId==312){
		$("#tr_"+id).next().hide();
		$("#tr_"+id+" .sp_kg").removeClass("sp_kg1");
		$("#tr_"+id+" .sp_kg").html("<span>展开sp值</span>");
		$("#tr_"+id+"_bf td").removeClass("xz");
		$("#tr_"+id).removeClass("mor_ye");
		$("#tr_"+id+"_bf  :checkbox").attr("checked",false);
	}
	$("#showHide").text($(".mor_tr:hidden").length)
}

dc.delTrNb1 = function(id){
	var id=id.split("_")[1];
	delete dc.nb[id];
	dc.nb.length--;
	if (dc.lotId!=302&&dc.lotId!=312){
		$("#tr_"+id+" .s").attr("class","s");
		$("#tr_"+id+" .a").attr("class","a");
		$("#tr_"+id+"  :checkbox").attr("checked",false);
	}else{
		$("#tr_"+id+"_bf td").removeClass("xz");
		$("#tr_"+id).removeClass("mor_ye");
		$("#tr_"+id+"_bf  :checkbox").attr("checked",false);
	}
	dc.setFloatWin(id);//浮动框信息
	//dc.setFootWin(id); //下部窗口
}
//获取sp信息
dc.getSpInfo = function(){
	$.get("/slttz/preissue?method=jcOdds&lotoId="+dc.lotId+"&v="+J.r(),function(data){
		var arr = eval("("+ data +")");
		for (var i = 0; i<arr.length; i++){
			dc.spObj[arr[i].matchNo] = arr[i]
		}
		dc.setSp(arr);//获取sp
	})
}
//写入sp信息
dc.setSp = function(arr){
	for (var i=0;i<arr.length;i++){
		if (!arr[i].sp||!arr[i].sp.length) continue;
		var no = arr[i].matchNo
		if (!dc.oldSp[i]){
			
			for (var n=0;n<arr[i].sp.length;n++){
				if (dc.lotId==301||dc.lotId==311||dc.lotId==320||dc.lotId==321){
					$("#sp_"+no+"_"+n).html(arr[i].sp[n]);
				}else{
					$("#sp_"+no+"_"+n).html('<br />'+arr[i].sp[n]);
				}
			}
		}else{
			for (var n=0;n<arr[i].sp.length;n++){
				var str="";
				var objN=arr[i].sp[n];
				var objN1=parseFloat(objN);
				if (objN&&dc.oldSp[i]){
					if (objN1 > dc.oldSp[i].sp[n]){
						if (dc.lotId==301||dc.lotId==311||dc.lotId==320||dc.lotId==321){
						str=objN+'<span class="tre ts1 t12">↑</span>'
						}else{
						str='<br />'+objN+'<span class="tre ts1">↑</span>'	
						}
					}else if(objN1 < dc.oldSp[i].sp[n]){
						if (dc.lotId==301||dc.lotId==311||dc.lotId==320||dc.lotId==321){
							str=objN+'<span class="tgreen ts2">↓</span>'
						}else{
							str='<br />'+objN+'<span class="tgreen ts2">↓</span>'
						}
					}else{
						if (dc.lotId==301||dc.lotId==311||dc.lotId==320||dc.lotId==321){
							str=objN;
						}else{
							str='<br />'+objN;
						}
					}
				}
				$("#sp_"+no+"_"+n).html(str);
			}
		}
	}
	dc.oldSp=dc.oldSp||{}
	dc.sp = dc.oldSp;
	dc.extend(dc.oldSp,arr);
}
//显示停售按钮
$("#isShowStop").click(function(){
	if ($(this).attr("checked")){
		dc.isShowStop=true;
		$("#dcc tr[show=0]").show();
	}else{
		dc.isShowStop=false;
		$("#dcc tr[show=0]").hide();
	}

})

/*
//是否去重按钮
$("#isEcho").click(function(){
	if ($(this).attr("checked")){
		dc.isEcho=true;
	}else{
		dc.isEcho=false;
	}
	dc.countBox();
})
*/

//批量显示隐藏行
dc.batchShow = function(arr,show){
	var len = arr.length;
	if (show){
		dc.hideNum-=len;
	}else{
		dc.hideNum+=len;	
	}
	if (dc.hideNum<0) dc.hideNum=0
	$("#showHide").html(dc.hideNum);
	
	for (var i=0;i<len;i++){
		var no=dc.ids[arr[i]];
		
		if (!show){
			$("#tr_"+no).hide();
		}else{
			if (dc.isShowStop){
				$("#tr_"+no).show();
			}else{
				$("#tr_"+no+"[show=1]").show();
			}
		}
	}
}

//赛事筛选
dc.filterWin = function(){
	var str="";
	for (var i in dc.matchEvents){
		var css=J.arr.indexOf(dc.matchCss,i)||113;
		if (css==-1) css=113
		
		str+='<label class="match"><input name="match" type="checkbox" value="'+dc.matchEvents[i]+'" checked><span class="g'+css+'">'+i.substring(0,4)+'</span>['+dc.matchEvents[i].length+']</label>';
	}
	
	/*
	
	<label class="match"><input name="match" type="checkbox" value="0"><span class="g0">英超</span>[1]</label>
	
	<input type="button" name="matchAllBn" class="bn52" id="matchAllBn" value="全选">
								<input type="button" name="matchReverseBn" class="bn52" id="matchReverseBn" value="反选">
								<input type="button" name="matchSubmitBn" class="bn52" id="matchSubmitBn" value="确定">
								<input type="button" name="matchCloseBn" class="bn52" id="matchCloseBn" value="关闭">
	*/
	$("#matchs").html(str)
	//点击选框
	$("#matchs input").unbind().click(function(){
		var arr = $(this).val().split(",");
		var show = $(this).attr("checked")?1:0;
		dc.batchShow(arr,show);
	})
	//关闭筛选
	$("#matchSubmitBn,#matchCloseBn").unbind().click(function(){
		$("#matchList").hide();
	})
	
	//筛选按钮
	$("#matchBn").unbind().click(function(){
		$("#matchList").toggle();
	})
	
	//全选
	$("#matchAllBn").unbind().click(function(){
		var arr=[];
		$("#matchs input:not(:checked)").each(function(){
			$(this).attr("checked",true)
			arr.push($(this).val());
		});
		dc.batchShow(arr.join(",").split(","),1);
	})
	//反选
	$("#matchReverseBn").unbind().click(function(){
		var arr=[];
		$("#matchs :checkbox").each(function(){
			if ($(this).attr("checked")){
				$(this).attr("checked",false)
				dc.batchShow($(this).val().split(","),0);
			}else{
				$(this).attr("checked",true)
				dc.batchShow($(this).val().split(","),1);
			}
		});
	})
		//显示全部
	$("#showHideAll").unbind().mousedown(function(){
		dc.hideNum=0;
		$("#showHide").html(0);
		$("#matchs input").attr("checked",true)
		$("#rangBn").attr("checked",true)
		$("#noRangBn").attr("checked",true)
		if (dc.lotId!=302&&dc.lotId!=312){
			if (dc.isShowStop){
					$("#dcc tr").show();
				}else{
					$("#dcc tr[show=1]").show();
			}
		}else{
			if (dc.isShowStop){
				$("#dcc tr[l!=bf]").show();
			}else{
				$("#dcc tr[l!=bf][show=1]").show();
			}
			$(".sp_kg").unbind();
		$(".sp_kg").toggle(function(){
			$(this).parent().next().show();
			$(this).addClass("sp_kg1");
			$(this).html("<span>收起sp值</span>");
		},function(){
			$(this).parent().next().hide();
			$(this).removeClass("sp_kg1");
			$(this).html("<span>展开sp值</span>");
		})
		}
		$("#filterWin :checkbox").attr("checked","checked");
		$(".show").mouseout();
	})
}
//计算钱数集合
dc.countBox = function(id){
		

	if (dc.nb.length == 0){
		$("#qrfaManu").attr("disabled","disabled").removeClass("qrfa_manu");
	}else if (dc.nb.length == 1){
		$("#qrfaManu").attr("disabled",false).addClass("qrfa_manu");
	}
	if (id||id===0){
		dc.setFloatWin(id);//浮动框信息
		dc.showChuanFn(dc.nb.length);//显示隐藏串
	}
	dc.getChuan();
	dc.getDan();
	dc.danAndChuan();//串和胆的显示
	dc.getChuan();
	dc.getDan();
	
	dc.countItems();//算注数
}
dc.bfTr = function(id){
	if (dc.nb[id]){
		$("#tr_"+id).addClass("mor_ye");
	}else{
		$("#tr_"+id).removeClass("mor_ye");
	}
}
dc.asc =function (a, b) {    
			return a - b;
		}
//处理选号事件处理
dc.clickEvent = function(id,out){
	var arr=id.split("_");
	var s=+arr[1]+"_"+arr[2];
	var tdId="#td_"+s;
	var allId="#all_"+arr[1];
	var val=dc.arg[dc.lotId].numType[arr[2]];
	//a(id)
	if ($(tdId).attr("class")=="s"){
		$(tdId).attr("class","s xz");
		$(tdId+" :checkbox").attr("checked","checked");
		if (!dc.nb[arr[1]]){
			dc.nb[arr[1]]=[];
			dc.nb.length++;
		}
		dc.nb[arr[1]].push(val);
		dc.nb[arr[1]].sort(dc.asc);
		console.log(dc.nb)
		if (dc.lotId==301||dc.lotId==311||dc.lotId==320||dc.lotId==321) dc.nb[arr[1]].reverse();
		//选号
	}else{
		$(tdId).attr("class","s");
		$(tdId+" :checkbox").attr("checked",false);
		
		var indexof=J.arr.indexOf(dc.nb[arr[1]],val);
		dc.nb[arr[1]].splice(indexof,1);
		if (!dc.nb[arr[1]].length) {
			delete dc.nb[arr[1]];
			dc.nb.length--;
		}
	}
	//全的效果
	if (dc.nb[arr[1]]){
		if (dc.lotId!=302&&dc.lotId!=312){
			if (dc.nb[arr[1]].length==dc.arg[dc.lotId].numType.length){
				$(allId).addClass("xz");
				$(allId+" :checkbox").attr("checked","checked");
			}else{
				$(allId).removeClass("xz");
				$(allId+" :checkbox").attr("checked",false);
			}
		}else{
			var id=arr[2];
			if (id < 13){
				var allId1="#all1_"+arr[1];
				var len=$(allId1).siblings(".xz").length;
				if (len == 13 ){
					$(allId1).addClass("xz");
					$(allId1+" :checkbox").attr("checked","checked");
				}else{
					$(allId1).removeClass("xz");
					$(allId1+" :checkbox").attr("checked",false);
				}
			}else if (id >= 13 && id<=17){
				var allId2="#all2_"+arr[1];
					var len=$(allId2).siblings(".xz").length;
				if (len == 5 ){
					$(allId2).addClass("xz");
					$(allId2+" :checkbox").attr("checked","checked");
				}else{
					$(allId2).removeClass("xz");
					$(allId2+" :checkbox").attr("checked",false);
				}
			}else{
				var allId3="#all3_"+arr[1];
				var len=$(allId3).siblings(".xz").length;
				if (len == 13 ){
					$(allId3).addClass("xz");
					$(allId3+" :checkbox").attr("checked","checked");
				}else{
					$(allId3).removeClass("xz");
					$(allId3+" :checkbox").attr("checked",false);
				}
			}
		}
	}
	//延迟执行
	if (out){
		var countBoxTime=setTimeout("dc.countBox("+arr[1]+")",100);
	}else{
		dc.countBox(arr[1]);//函数集合
	}

}


//点击全
dc.allClickEvent = function(id){
// td_1_1_1  1:场次 2:index 3:td
	var arr=id.split("_");
	var trId="#tr_"+arr[1];
	var allId="#all_"+arr[1];
	var val=dc.arg[dc.lotId].numType.join(",").split(",");
	if ($(allId).attr("class")=="a"){
		if (!dc.nb[arr[1]]){
			dc.nb[arr[1]]=[];
			dc.nb.length++;
		}
		dc.nb[arr[1]] = val;
		$(trId+" .s").attr("class","s xz");
		$(trId+" :checkbox").attr("checked","checked");
		$(allId).attr("class","a xz");
		$(allId+" :checkbox").attr("checked","checked");
	}else{
		$(trId+" .s").attr("class","s");
		$(trId+" :checkbox").attr("checked",false);
		$(allId).attr("class","a");
		$(allId+" :checkbox").attr("checked",false);
		delete dc.nb[arr[1]];
		dc.nb.length--;
	}
	dc.countBox(arr[1]);//函数集合
}
//
dc.addArray=function(arr1,arr2){
	return dc.delRepeat($.merge(arr1,arr2))
	}
dc.delRepeat=function(arr){  
	var newArray=[];  
	var provisionalTable = {};  
	for (var i = 0, item; (item= arr[i]) != null; i++) {  
		if (!provisionalTable[item]) {  
			newArray.push(item);  
			provisionalTable[item] = true;  
		}  
	}  
return newArray;  
} 
//比分点全
dc.allClickEventBf = function(ts,box){
	var id=ts.attr("id")
	var arr=id.split("_");
	var trId="#tr_"+arr[1]+"bf";
	var allId="#all"+box+"_"+arr[1];
	var arg={1:[0,1,2,3,4,5,6,7,8,9,10,11,12],2:[13,14,15,16,17],3:[18,19,20,21,22,23,24,25,26,27,28,29,30]}
	var val=arg[box];
	if ($(allId).attr("class")=="a"+box){
		if (!dc.nb[arr[1]]){
			dc.nb[arr[1]]=[];
			dc.nb.length++;
		}
		dc.nb[arr[1]] = dc.addArray(dc.nb[arr[1]],val);
		dc.nb[arr[1]].sort(numberAsc);
		ts.prevAll(".s").addClass("xz");
		ts.prevAll().children("input").attr("checked","checked");
		ts.addClass("xz");
		ts.children("input").attr("checked","checked");
	}else{
		if (box==1) dc.nb[arr[1]]=$.grep( dc.nb[arr[1]], function(n,i){ return n < 13; }, true);
		if (box==2) dc.nb[arr[1]]=$.grep( dc.nb[arr[1]], function(n,i){ return n>=13 && n < 18; }, true);
		if (box==3) dc.nb[arr[1]]=$.grep( dc.nb[arr[1]], function(n,i){ return n > 17; }, true);
		ts.prevAll(".s").removeClass("xz");
		ts.prevAll().children("input").attr("checked",false);
		ts.children("input").attr("checked",false);
		ts.removeClass("xz");
		if (dc.nb[arr[1]].length==0){
			delete dc.nb[arr[1]];
			dc.nb.length--;
		}
	}
	dc.countBox(arr[1]);//函数集合
}




//生成并绑定右选框
dc.setFloatWin = function (id){
	var arr=[];
	var str=""
	if (dc.nb[id]){
		//var obj=dc.matchInfo[dc.getMatchIndex(id)]
		var obj=dc.matchInfo[id]
		str+='';
		str+='<td class="rxling" height="30"><span class="show" id="r_'+id+'" class="xling" height="30"><img src="/img/v5/jc/x2.gif"  align="absmiddle"/></span> '+obj.matchId+'</td>';
		str+='<td class="rxling">'+obj.matchHome.substring(0,3)+'</td>';
		str+='<td class="s" bgcolor="#FFFFFF">';
		var val=dc.nb[id];
		for (var n=0;n<val.length;n++){
			var indexof=J.arr.indexOf(dc.arg[dc.lotId].numType,val[n]);
			str+='<a href="javascript:void(0)" class="n" id="n_'+id+'_'+indexof+'">'+dc.arg[dc.lotId].numName[indexof]+'</a> ';
		}
		str+='</td>';
		if (dc.isDG){
			str+='<td>&nbsp;</td>';
		}else{
				
			var checkbox=J.arr.indexOf(dc.dan,id)!=-1?"checked":"";
			str+='<td><input type="checkbox" class="d" id="d_'+id+'" value="'+id+'" '+checkbox+'></td>';	
		}
		$("#right_"+id).html(str).show();
	
		$("#right_"+id+" .n").mousedown(function(){
			//$(this).hide();
			dc.clickEvent($(this).attr("id"),0);
		})
		//点击胆
		$("#right_"+id+" .d").click(function(){
			var len=$("#rightBox :checked").length
			dc.setMinMaxDan({tsMin:len,tsMax:len,maxDan:len,minDan:len,danLen:len});
			dc.countBox();
		})
		//点击差号
		$("#right_"+id+" .show").mousedown(function(){
			dc.delTrNb1($(this).attr("id"));
			dc.countBox(id);
		})
	}else{
		$("#right_"+id).html("").hide();
	}
	
	
}



dc.setMinMaxDan = function (obj){
		var obj=obj||{}
		if (obj.tsMax) {
			if (minDan > obj.tsMax)  minDan=obj.tsMax;
		}
		var minDan=obj.minDan||dc.dan.length;
		var maxDan=obj.maxDan||dc.dan.length;
		var tsMin=parseInt(obj.tsMin||$("#minDanLen").val()||minDan);
		var tsMax=parseInt(obj.tsMax||$("#maxDanLen").val()||maxDan);
		var danLen = obj.danLen || dc.dan.length;
		
		if ( dc.nb.length-danLen < maxDan - tsMin ) {
			maxDan = parseInt(tsMin) + (dc.nb.length-danLen)
		}
		if (minDan > maxDan)  minDan=maxDan;
		if (maxDan > danLen)  maxDan=danLen;
		if (minDan > danLen)  minDan=danLen;
		
		if (tsMax > maxDan) tsMax = maxDan;
		if (tsMin > minDan) tsMin = minDan;
		
		
	var h='';
		for (var i=1; i<= minDan; i++){
			var selected = (i == tsMin ) ? "selected" : "";
			h+='<option value="'+i+'" '+selected+'>'+ i +'</option>'
		}
	$("#minDanLen").html(h);
	
	var h='';
		for (var i=tsMin; i<= maxDan; i++){
			var selected = (i == tsMax ) ? "selected" : "";
			h+='<option value="'+i+'" '+selected+'>'+i+'</option>'
		}
	$("#maxDanLen").html(h);
	
	
}
//串 < 最小命中+(总场次 - 胆场次 )

//最大命中 - 最小命中 = 总场次 - 胆场次

//胆或者串
dc.danAndChuan = function(){
	
	var nbLen = dc.nb.length
	var danLen = dc.dan.length;
	var chuanLen = dc.chuan.length;
	if (dc.isDG){ //如果是单关的时候
		$("#rightBox :checkbox").attr("disabled","disabled").attr("checked",false);
		return;
	}

	
	//显示胆区间
	if (danLen) {
		$("#danLenShow").show() 
	}else{
		$("#danLenShow").hide();
		$("#minDanLen").html("");
		$("#maxDanLen").html("");
	};
	
	
	var minDanLen=parseInt($("#minDanLen").val())||0;
	var maxDanLen=parseInt($("#maxDanLen").val())||0
	
	
	
	$("#chuan input").attr("disabled",false);
	
	
	
	var minChuan = danLen;
	$("#chuan .dbx:lt("+(minDanLen-1)+")").each(function(i) {
		$(this).children().children("input").attr("disabled",true).attr("checked",false);
	});
	
	$("#chuan .dbx:gt("+(minDanLen+dc.nb.length-dc.dan.length-1)+")").each(function(i) {
		$(this).children().children("input").attr("disabled",true).attr("checked",false);
	});


	/*
	$("#rightBox input:disabled").attr("disabled",false);
	$("#chuan input:disabled").attr("disabled",false);
	if (dc.dan.length){
		$("#chuan label:not(.c1)").hide();
		$("#chuan label:not(.c1) :checked").attr("checked",false);
	}else{
		$("#chuan label").show();
	}
	var dom=$("#chuan span:lt("+dc.dan.length+") :checkbox");
	dom.attr("checked",false);
	dom.attr("disabled","disabled");
	
	if (dc.minChuan){//已经选了串了
		if ((dc.minChuan-1) == (danLen)){  //胆数等于 最小的 串数 -1
			$("#rightBox input:not(:checked)").attr("disabled","disabled");	
		}else if (dc.minChuanNum==1 && nbLen==dc.minChuan){ //场数等于最小串数切为串1
			$("#rightBox :checkbox").attr("disabled","disabled").attr("checked",false);
			$("#chuan input:disabled").attr("disabled",false);
		}
	}else if (danLen>=nbLen-1){ //胆数 等于 场数 -1
		$("#rightBox input:not(:checked)").attr("disabled","disabled");
		return;
	}else if ((dc.minChuan-1) == (danLen)){ //最小串数-1 等于胆数
		$("#rightBox input:not(:checked)").attr("disabled","disabled");	
	}
	*/
}
//获取当前场次在数组里的索引数
dc.getMatchIndex = function(id){
	for (var i=0;i<dc.matchInfo.length;i++){
		if (dc.matchInfo[i].matchId==id) return i;
	}
}

//显示选号方式
dc.showChuanFn=function(len){
	var n=len;
	if (dc.lotId == "304"||dc.lotId == "302"||dc.lotId == "314"||dc.lotId == "312"){
		if (n>4) n=4;
	}else if (dc.lotId == "303"||dc.lotId == "313"){
		if (n>6) n=6;	
	}else{
		if (n>8) n=8;		
	}
	$("#chuan span:lt("+n+")").show();
	$("#chuan span:gt("+(n-1)+")").hide();
	$("#chuan span:gt("+(n-1)+") :checkbox").attr("checked",false);
	if (n==0&&!dc.isDG){
		$("#chuan span").hide();
		$("#chuan span :checkbox").attr("checked",false);
	}
}
//获取串信息
dc.getChuan = function(){
	dc.chuan=[];
	$("#chuan :checked").each(function(i){
 		 dc.chuan.push($(this).val());
	}); 
	var val=$("#chuan :checked").val();
	if (val){
		if (val == "单关"){
			val=1;
		}else{
			var arr=val.split("串");
			val = arr[0];
			dc.minChuanNum = arr[1];
		}
	}
	dc.minChuan=val;
}
//获取胆信息
dc.getDan = function(){
	dc.dan=[];
	$("#rightBox :checked").each(function(i){
 		 dc.dan.push($(this).val());
	}); 
}




//计算钱数
dc.countItems = function(){
	var nbLen=dc.nb.length;
	
	if (nbLen&&dc.chuan.length){
		var minDanLen=parseInt($("#minDanLen").val())||0;
		var maxDanLen=parseInt($("#maxDanLen").val())||0
		dc.itemTotal=jc.getItemTotal(dc.nb,dc.chuan,dc.dan,minDanLen,maxDanLen);
		dc.sum=dc.itemTotal*dc.bei*2;
		buySum=dc.itemTotal*2;
		$("#buyTotalItems").text(dc.itemTotal);
		$("#buyTotalNum").text(dc.sum);
		var arr=[]
	for (var i in dc.nb){
		if (i!="length"){
			arr.push(dc.fens[i])
		}
	}

	}else{
		$("#buyTotalItems").text(0);
		$("#buyTotalNum").text(0);
		$("#maxWin").text(0)
		$("#txBox").hide();
	}
	
	if (dc.nb.length > 8 ){
		$("#maxWinBox").hide();
	}else if (dc.sum == 0 ){
		$("#winTotal").html("0元")
		if (!dc.isDG) $("#maxWinBox").show();
	}else{
		var maxWinTotal=Math.round(jc.getWinTotal(dc.nb,dc.chuan,dc.dan,minDanLen,maxDanLen,dc.spObj,1) * dc.bei * 2 *100) /100;
		$("#winTotal").html(maxWinTotal+"元")
		if (!dc.isDG) $("#maxWinBox").show();
	}
	
	$("#buyDoubleNum").text(dc.bei);
	$("#allChang").text(nbLen);
	$("#allDan").text(dc.dan.length);
}

//深复制对象
dc.extend = function(destination,source){
	for(var p in source){
		if(dc.getType(source[p])=="array"||dc.getType(source[p])=="object"){
			destination[p]=dc.getType(source[p])=="array"?[]:{};
			arguments.callee(destination[p],source[p]);
		}else{
			destination[p]=source[p];
		}
	}
}
dc.getType=function(o){
	var _t; 
	return ((_t = typeof(o)) == "object" ? o==null && "null" || Object.prototype.toString.call(o).slice(8,-1):_t).toLowerCase();
}
dc.resetInfo=function(){
	dc.nb={};//选择号码
	dc.nb.length=0;
	dc.chuan=[];//串信息
	dc.dan=[];//胆信息
	dc.sum=0;//总金额
	dc.bei=1;//倍数
	$("#rightBox tr").html("");
	//$("#footBox tr").html("");
	$("#dcc .xz").attr("class","s");
	$("#dcc :checked").attr("checked",false);
	dc.showChuanFn()
	dc.countBox();
}
//检测倍数
dc.checkBei = function (obj,n) {
	var val = obj.val();
	if (val!==""){
		val = parseInt(val);
		if (!val){
			obj.val(1);
		}else if (val > 10000) {
			alert("最多不能超过10000倍！")
			obj.val(10000);
			dc.bei=10000;
			dc.countBox();
		} else if (val <= 0){
			obj.val(1);
		} else{
			obj.val(val);
		}
	}
	obj.change();
}

dc.affirmBuy = function(){
	var info=dc.getBuyInfo();
	//if (info) window.open("buy_affirm.jsp?value="+ encodeURIComponent(info));
	var url='../jc_buy_affirm.jsp'
	if (info){
		$("#lotteryData").val(encodeURIComponent(info));
		$("#affForm").attr("action",url+'?value='+ encodeURIComponent(info))
		$("#affForm").submit();
	}
	
	
}
dc.cooperateBuy = function(){
	var info=dc.getBuyInfo();
	var url='../jc_cooperate_affirm.jsp'
	if (info){
	$("#lotteryData").val(encodeURIComponent(info));
	$("#affForm").attr("action",url+'?value='+ encodeURIComponent(info))
	$("#affForm").submit();
	}
}
/*
dc.getBuyInfo = function (){
	if (!dc.nb.length){
		return alert("请选择投注场次！");
	} else if (!dc.chuan.length){
		return alert("请选择过关方式！")
	} else if (!$("#userAgreement").attr("checked")){
		return alert("您必须选择“我已阅读了 《用户合买代购协议》 并同意其中条款。”才能继续投注！")
	} 
	var arr=[]
	for (var i in dc.nb){
		if (i!="length"){
			arr.push(dc.fens[i])
		}
	}
	var minFen=J.arr.min(arr);
	//if (dc.itemTotal >= 1000 && minFen < 60){
	//	return alert( "您的投注单数量过大，为确保投注成功，请您减少投注场次或过关方式。")
	//}
	
	dc.nbbak={};
	for (var i in dc.nb){
		if (i != "length"){
			var arr=dc.nb[i];
			var bakArr=[];
			for (var n=0;n<arr.length;n++){
				var index=J.arr.indexOf(dc.arg[dc.lotId].numType,arr[n])
				bakArr.push(dc.arg[dc.lotId].numName[index]);
			}
			dc.nbbak[i]	= bakArr;
		}
		
	}
	
	
	var arr=[];
	arr.push(dc.lotId);//彩种
	arr.push(0);//写死
	arr.push(dc.chuan.join(",").replace(/\串/g,"x"));//串
	var ids=[];
	for (var i in dc.nb){
		if (i!="length"){
			ids.push(i)
		}
	}
	ids.sort();
	var nbs=[];
	var nums=0;
	for (var i=0; i<ids.length; i++){
		var str = "";
		str += ids[i] + ":" 
		str += dc.nos[ids[i]] + ":" 
		str += "["+dc.nbbak[ids[i]].join(",")+"]"
		nums+= dc.nb[ids[i]].length;
		
		nbs.push(str);
	}
	arr.push(nbs.join("/"));//投注号码
	arr.push(dc.itemTotal);//总注数
	arr.push(dc.bei);//倍数
	arr.push(dc.sum);//总费用
	arr.push(dc.nb.length);//场数
	arr.push(nums);//一共多少个号码
	arr.push(J.arr.min(ids));//开始期
	arr.push(J.arr.max(ids));//结束期
	if (dc.dan.length>0){
		arr.push(dc.dan.join(","));//胆
	}else{
		arr.push(0);//胆
	}
	
	str=arr.join("^")
	
	
	str+="|";
	dzArr=[];
	for (var i=0; i<ids.length; i++){
			var obj=dc.matchInfo[dc.getMatchIndex(ids[i])];
			var _str=obj.matchId+'~'+obj.matchGuest+' VS '+obj.matchHome+'~'+obj.comityBall+'~';
			_str+=dc.nbbak[ids[i]].join(" ")+'~';
			var dan=J.arr.isIn(dc.dan,ids[i])!=-1?1:0;
			_str+=dan;
			dzArr.push(_str);
	}
	str+=dzArr.join("/");	
	return str;
	}
*/
$(function(){
dc.lots=[320,301,302,303,304,321,311,312,313,314];
	var lotteryId=(J.url().lottery||lotId||dc.lots[0]).toString();
	var index=J.arr.indexOf(dc.lots,lotteryId);
	
	(lotteryId=="312"||lotteryId=="302") ? $("#isDgBn a").html("单关固定投注") : $("#isDgBn a").html("单关固定投注")
	
	
	//if (lotteryId=="312") window.location.href = "/lottery/dc/dcbf.shtml" 
	
	
	
	
	if (index>4) {
		//var qbhost = "qianbao666.wozhongla.com";
		//var qbhost2 = "www.qianbao666.com";
		//if(location.href.indexOf(qbhost)>-1||location.href.indexOf(qbhost2)>-1){
		//	$("#buyBn,#cooperateBn").hide();
		//}

		index-=5;
		//$("#lots a").each(function(i){
		//	$(this).attr("href","?lottery=31"+(i+1))
		//})
		
		dc.isDG=true;
		$("#maxWinBox").hide();
		$("#isDgBn").addClass("bj2")
		$("#isDG input").attr("disabled",true).attr("checked",true);
		$("#DDBn").attr("href","")
		$("#isGG").hide();
		$("#winMoreBox").hide();//算奖
		$("#optDiv").hide();//智能倍投
		
		//$("#cooperateBn").hide();
	}else{
		////$("#lots a").each(function(i){
		//	$(this).attr("herf","?lottery=30"+(i+1))
		//})
		dc.isDG=false;
		
		$("#isGgBn").addClass("bj2")
		$("#isDG").hide();
	}
	//$("#lots a:eq(7)").attr("href","/hemai/index_list"+lotteryId+".shtml")
	//$("#isDgBn a").attr("href","?lottery=31"+lotteryId.substring(2,3))
	//$("#isGgBn a").attr("href","?lottery=30"+lotteryId.substring(2,3))
	$("#lots li").attr("class","")
	$("#lots li:eq("+index+")").attr("class","hover")
	dc.init(lotteryId);
	//点击串
	$("#chuan :checkbox").click(function(){
		var val;
		
		if ($(this).attr("checked")){
			val=$(this).val();
			if (val == "单关") {
				val =1
			}else {
				val = $(this).val().split("串")[1];	
			}
			dc.countBox(null,val);
		} else {
			dc.countBox();
		}
		
	})
//切换截止时间于开赛时间
	$(".showTime").change(function(){
		if ($(this).val()==1){
			$(".ks_time").show();
			$(".jz_time").hide();
		}else{
			$(".ks_time").hide();
			$(".jz_time").show();
		}
		
	})

	$("#buyBei").keyup(function(){
		dc.checkBei($(this));
	})
	$("#buyBei").blur(function(){
		obj=$(this);
		var val = obj.val();
		if (val === "" || !val){
			obj.val(1);
			dc.bei=1;
		}else{
			dc.bei=val;
		}
		dc.bei=$(this).val();
		dc.countBox();
	})
	$("#resetInfo").click(function(){
		if(confirm('是否确认清空选号信息?')){
			dc.resetInfo();
		}
	})
	$("#affirmBuy").click(function(){
		dc.affirmBuy();
	})
	$("#cooperateBuy").click(function(){
		dc.cooperateBuy();
	})
	
	$("#minDanLen").unbind().change(function (){
		dc.setMinMaxDan ({tsMin:$(this).val()})
		dc.isSelectMinMaxDan = true;
		dc.countBox();//函数集合
	})
	$("#maxDanLen").unbind().change(function (){
		dc.setMinMaxDan ({tsMax:$(this).val()})
		dc.isSelectMinMaxDan = true;
		dc.countBox();//函数集合
	})

	var checkMoney=function (fn){

		var MAXSIZE = {
			MAX1 : 200000,
			MAX2 : 500000,
			MAX3 : 1000000
		};
		var MONEY = parseFloat($('#winTotal').text());

		var SELECTREGP = [{"uc":"2串1","um":"MAX1"},{"uc":"3串1","um":"MAX1"},{"uc":"3串3","um":"MAX1"},{"uc":"3串4","um":"MAX1"},{"uc":"4串1","um":"MAX2"},{"uc":"4串4","um":"MAX2"},{"uc":"4串5","um":"MAX2"},{"uc":"4串6","um":"MAX2"},{"uc":"4串11","um":"MAX2"},{"uc":"5串1","um":"MAX2"},{"uc":"5串5","um":"MAX2"},{"uc":"5串6","um":"MAX2"},{"uc":"5串10","um":"MAX2"},{"uc":"5串16","um":"MAX2"},{"uc":"5串20","um":"MAX2"},{"uc":"5串26","um":"MAX2"},{"uc":"6串1","um":"MAX3"},{"uc":"6串6","um":"MAX3"},{"uc":"6串7","um":"MAX3"},{"uc":"6串15","um":"MAX3"},{"uc":"6串20","um":"MAX3"},{"uc":"6串22","um":"MAX3"},{"uc":"6串35","um":"MAX3"},{"uc":"6串42","um":"MAX3"},{"uc":"6串50","um":"MAX3"},{"uc":"6串57","um":"MAX3"}] ;
		var slen = SELECTREGP.length ;

		var max = 'MAX1';
		for(var i=0;i<dc.chuan.length;i++){
			for(var j=0;j<slen;j++){
				if(dc.chuan[i] === SELECTREGP[j].uc){
					max = SELECTREGP[j].um ;
				}
			}
		}
		state = parseFloat(MAXSIZE[max]-MONEY)>0 ? true:false ;
		
		/*if( (parseFloat(MAXSIZE[max]-MONEY)>0) && dc.bei==1 ){
			var state = true;
		}else{
			var state = false;
		}*/

		fn&&fn( state, MAXSIZE[max] );

	};

	var fnCooperate=function (state, max){

		var cop=function (){
			if (buyType==2){
					buyType=0;
					$("#buyType0").show();
					$("#buyType1").hide();
					$("#buyType2").hide();
					$(".buy_tab a:eq(0)").click();
			}else{
					buyType=2;
					$("#buyType0").hide();
					$("#buyType1").hide();
					$("#buyType2").show();
					$(".buy_tab a:eq(2)").click();
					$("#cooperateDoubleNum").val($("#buyDoubleNum").val())	
			}
		};

		if(state){
			//alert('aaaaaaa');	
			cop();
			sumFn();
		}else {
			//alert('bbbbbbbb');
			if(dc.bei==1){
				alert('理论最大奖金不超过'+max+'元，请您重新选择！');
				return;
			}else{
				cop();
			};
		};
	};

	$("#cooperateBn").unbind().click(function(){
		checkMoney(fnCooperate);
		$('#cooperateTotalItems').text( $('#buyTotalItems').text() );
		$('#cooperateTotalNum').text( $('#buyTotalNum').text() );
	})
	
	

//跳转到奖金详情
$("#winMore").click(function(){
	if (!dc.nb.length){
		return alert("请选择投注场次！");
	}else if (dc.nb.length<2){
		return alert("过关玩法需要选择至少两场比赛！");
	}else if (dc.nb.length>8){
		return alert("奖金预测最多支持8场比赛！");
	}else if (dc.itemTotal>20000){
		return alert("奖金预测最多支持投注不超过10000注！");
	} else if (!dc.chuan.length){
		return alert("请选择过关方式！")
	} else {
		
		window.open("/jc/winCount.shtml?info="+ encodeURIComponent(dc.getWinMore()));
	}
})

//奖金详情
dc.getWinMore = function(){
	/*
	{"base":[
	{"minItem":"1.92","sceneId":"周五001","item":"胜(1.92),平(3.4)","match":"纽卡斯尔喷气机vs阿德莱德联","maxItem":"3.4","matchTime":"2012-02-24 16:59:00"},
	{"minItem":"1.76","sceneId":"周五002","item":"胜(1.76),平(3.55)","match":"日本vs冰岛","maxItem":"3.55","matchTime":"2012-02-24 18:19:00"}],
	
	
	"chuan":"2串1,3串1,3串3,3串4,4串1,4串4,5串5",
	"multiple":"1",
	"money":"5534"}

	*/
	
	var info={};
	
	info.vs=[];
	
	
	for (var i in dc.nb){
		if (i!="length"){
			var _arr=[];
			var _nbArr=[];
			var nbArr=[];
			var sp=[];
			for (var n = 0; n<dc.nb[i].length; n++){
				var nb=dc.nb[i][n];
				var indexof=J.arr.indexOf(dc.arg[dc.lotId].numType,dc.nb[i][n]);
				
				
				var o = dc.matchInfo[i];
				
				
				_nbArr.push(dc.arg[dc.lotId].numName[indexof]+"("+dc.spObj[o.matchNo].sp[indexof]+")");
				sp.push(dc.spObj[o.matchNo].sp[indexof]);
			}
			var index=$("#tr_"+i).attr("i");
			
			var endTime=dc.matchInfo[index].endTime;
			
			var endTime=endTime.substring(0,4)+"-"+endTime.substring(4,6)+"-"+endTime.substring(6,8)+" "
						+endTime.substring(8,10)+":"+endTime.substring(10,12)+":"+endTime.substring(12,14)
			
			
			var dan=J.arr.indexOf(dc.dan,i)!=-1?1:0; //胆
			
			info.vs.push(
			/*
				{
					id:dc.matchInfo[index].matchId,
					vs:dc.matchInfo[index].matchHome +"vs"+ dc.matchInfo[index].matchGuest,
					nb:_nbArr.join(","),
					minSp:J.arr.min(sp),
					maxSp:J.arr.max(sp),
					time:endTime,
					dan:dan
				}
				*/
					dc.matchInfo[index].matchId+"/"+
					dc.matchInfo[index].matchHome.substring(0,3)  +"vs"+ dc.matchInfo[index].matchGuest.substring(0,3)+"/"+
					_nbArr.join(",")+"/"+
					J.arr.min(sp)+"/"+
					J.arr.max(sp)+"/"+
					endTime+"/"+
					dan
			)
		}
	}
	
	info.chuan=dc.chuan.join(",");
	info.bei=$("#buyDoubleNum").val();
	info.blurDan = ($("#minDanLen").val()||0) +"-"+ ($("#maxDanLen").val()||0);
	info.sum = dc.sum;
	
	return J.obj.toJson(info);
}

	var fnBuy= function (state, max){

		var cop=function (){
			if (!dc.isLaterUp){
			  if (!dc.nb.length){
				  buySum=0
				  return alert("请至少选择2场比赛进行投注！");
			  } else if (!dc.isDG&&dc.nb.length<2){
				  return alert("过关玩法需要选择至少两场比赛！");
			  }else if (!dc.chuan.length){
				  buySum=0
				  return alert("请选择过关方式！")
			  }
				//if (dc.bei<50){
				 //return alert("请至少选择50倍！")
			//}
			};

			dc.nbbak={};
			for (var i in dc.nb){
				if (i != "length"){
					var arr=dc.nb[i];
					var bakArr=[];
					for (var n=0;n<arr.length;n++){
						var index=J.arr.indexOf(dc.arg[dc.lotId].numType,arr[n])
						bakArr.push(dc.arg[dc.lotId].numName[index]);
					}
					dc.nbbak[i]	= bakArr;
				}
			}
			var ids=[];
			for (var i in dc.nb){
				if (i!="length"){
					ids.push(i)
				}
			}
			ids.sort();
			var nbs=[];
			for (var i=0; i<ids.length; i++){
				var str = "";
				str += dc.matchInfo[ids[i]].matchHome + "vs" + dc.matchInfo[ids[i]].matchGuest + "," 
				str += dc.matchInfo[ids[i]].matchName + "," 
				str += dc.matchInfo[ids[i]].comityBall + ":" 
				str += dc.nos[ids[i]] + "-" 
				str += dc.matchNo[ids[i]] + ":" 
				str += "["+dc.nbbak[ids[i]].join(",")+"]:"
				str += dc.matchInfo[ids[i]].endTime
				str += ","+dc.matchInfo[ids[i]].stopSaleTime
				str += ","+ ((J.arr.indexOf(dc.dan,ids[i])!=-1)?1:0); //胆
				nbs.push(str);
			}
			var str =nbs.join("/")
			str +="|"+ ($("#minDanLen").val()||0) +"-"+ ($("#maxDanLen").val()||0);
			//arr.push(nbs.join("/"));//投注号码
			var chuanArr=[];
			for (var i=0; i < dc.chuan.length;i++){
				chuanArr.push(dc.chuan2num[dc.chuan[i]]);
			}

			sumFn()
			buyNumberArray[0]=[];
			var s=dc.isDG?"01":"02";
			if (dc.isLaterUp){
				totalSum = $("#isUpSum").val()*$("#cooperateDoubleNum").val()
			} else if (buyType==2){
				totalSum = dc.itemTotal*2*$("#cooperateDoubleNum").val()
			}else{
				totalSum = dc.itemTotal*2*dc.bei
			}
			buyNumberArray[0]=[str,,,dc.itemTotal,chuanArr.join(),s];
			//alert('b');
			$('#iForm').submit();
		};

		if(state){
			//alert('a');
			cop();
		}else {
			if(dc.bei==1){
				alert('理论最大奖金不超过'+max+'元，请您重新选择！');
				return;
			}else{
				cop();
			}
		}

	};

	$("#buyBn, #buyBn1").click(function(){
		checkMoney(fnBuy);
	});


	
})

	


$(function(){
if (dc.lotId==301) $(".jjxx1").show();


})