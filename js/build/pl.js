/*! wozhongla 2015-01-23 */
define("wzlh5/1.0.0/pl",["jquery/2.1.1/jquery","wzlh5/1.0.0/ac","handlebars/1.3.0/dist/cjs/handlebars","wzlh5/1.0.0/until","wzlh5/1.0.0/cp","wzlh5/1.0.0/ui"],function(require){function pl3(){function init(){function fomatYl(d){var allArr=d.split(",");for(i=4;13>=i;i++)$("#yla em").eq(i-4).text(allArr[i]);for(i=14;23>=i;i++)$("#ylb em").eq(i-14).text(allArr[i]);for(i=24;33>=i;i++)$("#ylc em").eq(i-24).text(allArr[i])}$.wzlhistory("pl3",function(d){PL3_NOWQI=d.issue}),$(".wzl-nav-dropdown").click(function(){dropdownMask.toggle()}),$.wzlmore(function(d){$("."+$(d).attr("class")).on("click",function(){})}),action.queryUserInfo({},function(){}),action.yl("pls",{},function(re){"200"==re.resultCode&&fomatYl(re.data)}),$(".ballcon-yilou").on("click",function(){$(".ballcon-right em").toggle()})}function publicShow(v,title,fn){$("#carfixed,#f3dcar,#tzsuccess").hide(),$(".wzl-cartext").addClass("hidden"),$("#fc3dplays").show(),$("#fc3dplays>div,#f3dcar").not("#"+v).hide(function(){$("#"+v+", #buycarfixedbtn").show(),$(".wzl-nav-dropdown").text(title).show(),fn&&fn()}),$(".ball-status-bar.icon-right").addClass("disabled").html("每位至少选择 1 个号码球")}function fc3dNumberSelect(containerId,total,before){return cp.numberSelect({min:0,max:9,ispad:!1,numberSelectBefore:function(f){before&&before(f)},numberSelectAfter:function(){total()},numberUnSelectAfter:function(){total()},selectStyle:".red_balls",containerId:containerId})}function zxfs(){function total(){var fc3d=countZxfs();if(0!=fc3d){var count=PlayTypeRule.count(fc3d),price=count*CPCONFIG.PL3.UNIT_PRICE;$(".ball-status-bar").removeClass("disabled").html("共"+count+"注,"+price+"元")}else $(".ball-status-bar").addClass("disabled").html("每位至少选择 1 个号码球")}function countZxfs(){var baiN=bai.getSelected(),shiN=shi.getSelected(),geN=ge.getSelected(),type=PlayTypeRule.pl3_fs,baiRequired=type.groupdef[0].required,shiRequired=type.groupdef[1].required,geRequired=type.groupdef[2].required;if(!(baiN&&baiN.length&&shiN&&shiN.length&&geN&&geN.length))return!1;if(baiN.length<baiRequired||shiN.length<shiRequired||geN.length<geRequired)return!1;var pl3type;pl3type=baiN.length==baiRequired&&shiN.length==shiRequired&&geN.length==geRequired?"pl3_ds":"pl3_fs";var groups=[{dan:null,tuo:baiN},{dan:null,tuo:shiN},{dan:null,tuo:geN}];return{code:pl3type,groups:groups}}publicShow("selectzxfs","排列三-直选复式"),u_type="zxfs";var bai=fc3dNumberSelect("#selectzxfs .fc3d-bai",total),shi=fc3dNumberSelect("#selectzxfs .fc3d-shi",total),ge=fc3dNumberSelect("#selectzxfs .fc3d-ge",total);$("#buycarfixedbtn .ball-status-bar").unbind().bind("click",function(){var pl3=countZxfs();0!=pl3?(pl3.PL3_ID=++CACHE_ID,PL3_CAR.push(pl3),bai.clear(),shi.clear(),ge.clear(),location.href="#!/car"):dialog("每位至少选择<span class='wzl-text-warning'>1</span>个号码")}),$(".glyphicon.icon-trash").on("click",function(){bai.clear(),shi.clear(),ge.clear(),total()}),Y_Y(function(){bai.clear(),shi.clear(),ge.clear();var n1=cp.shuffle({min:0,max:9,count:1});bai.clear().select(n1);var n1=cp.shuffle({min:0,max:9,count:1});shi.clear().select(n1);var n1=cp.shuffle({min:0,max:9,count:1});ge.clear().select(n1)})}function zxhz(){function total(){var fc3d=countZxhz(),count=0;if(0!=fc3d){count=PlayTypeRule.count(fc3d);var price=count*CPCONFIG.PL3.UNIT_PRICE;$(".ball-status-bar").removeClass("disabled").html("共"+count+"注,"+price+"元")}else $(".ball-status-bar").addClass("disabled").html("每位至少选择 1 个号码球")}function countZxhz(){var hzN=heizhi.getSelected(),type=PlayTypeRule.pl3_hz,hzRequired=type.groupdef[0].required;if(!hzN||!hzN.length)return!1;if(hzN.length<hzRequired)return!1;var fc3dtype="pl3_hz",groups=[{dan:null,tuo:hzN}];return{code:fc3dtype,groups:groups}}publicShow("selectzxhz","排列三-直选和值"),u_type="zxhz";var heizhi=cp.numberSelect({min:0,max:9,ispad:!1,numberSelectBefore:function(){},numberSelectAfter:function(){total()},numberUnSelectAfter:function(){total()},selectStyle:".red_balls",containerId:"#selectzxhz .fc3d-hezhi",multipleSelect:!1});$("#buycarfixedbtn .ball-status-bar").unbind().bind("click",function(){var pl3=countZxhz();0!=pl3?(pl3.PL3_ID=++CACHE_ID,PL3_CAR.push(pl3),heizhi.clear(),location.href="#!/car"):dialog("每位至少选择<span class='wzl-text-warning'>1</span>个号码")}),$(".glyphicon.icon-trash").on("click",function(){heizhi.clear(),total()}),Y_Y(function(){var n1=cp.shuffle({min:0,max:27,count:1});heizhi.clear().select(n1)})}function z3fs(){function total(){var fc3d=countZ3fs();if(0!=fc3d){var count=PlayTypeRule.count(fc3d),price=count*CPCONFIG.PL3.UNIT_PRICE;$(".ball-status-bar").removeClass("disabled").html("共"+count+"注,"+price+"元")}else $(".ball-status-bar").addClass("disabled").html("每位至少选择 1 个号码球")}function countZ3fs(){var baiN=bai.getSelected(),type=PlayTypeRule.pl3_z3fs,baiRequired=type.groupdef[0].required;if(!baiN||!baiN.length)return!1;if(baiN.length<baiRequired)return!1;var fc3dtype="pl3_z3fs",groups=[{dan:null,tuo:baiN}];return{code:fc3dtype,groups:groups}}publicShow("selectz3fs","排列三-组三复式"),u_type="z3fs";var bai=fc3dNumberSelect("#selectz3fs .fc3d-bai",total);$("#buycarfixedbtn .ball-status-bar").unbind().bind("click",function(){var pl3=countZ3fs();0!=pl3?(pl3.PL3_ID=++CACHE_ID,PL3_CAR.push(pl3),bai.clear(),location.href="#!/car"):dialog("每位至少选择<span class='wzl-text-warning'>1</span>个号码")}),$(".glyphicon.icon-trash").on("click",function(){bai.clear(),total()}),Y_Y(function(){var n1=cp.shuffle({min:0,max:9,count:2});bai.clear().select(n1)})}function z3ds(){function total(){var fc3d=countZ3ds();if(0!=fc3d){var count=PlayTypeRule.count(fc3d),price=count*CPCONFIG.PL3.UNIT_PRICE;$(".ball-status-bar").removeClass("disabled").html("共"+count+"注,"+price+"元")}else $(".ball-status-bar").addClass("disabled").html("每位至少选择 1 个号码球")}function countZ3ds(){var chongN=chong.getSelected(),danN=dan.getSelected(),type=PlayTypeRule.pl3_z3ds,baiRequired=type.groupdef[0].required;if(!(chongN&&chongN.length&&danN&&danN.length))return!1;if(chongN.length<baiRequired||danN.length<baiRequired)return!1;var fc3dtype="pl3_z3ds",groups=[{dan:chongN.concat(chongN),tuo:danN}];return{code:fc3dtype,groups:groups}}publicShow("selectz3ds","排列三-组三单式"),u_type="z3ds";var chong=cp.numberSelect({min:0,max:9,ispad:!1,numberSelectBefore:function(f){return dan.isSelected(f)?(dialog("已经选择了相同的单号"),!1):void 0},numberSelectAfter:function(){total()},numberUnSelectAfter:function(){total()},selectStyle:".red_balls",containerId:"#selectz3ds .fc3d-bai",multipleSelect:!1}),dan=cp.numberSelect({min:0,max:9,ispad:!1,numberSelectBefore:function(f){return chong.isSelected(f)?(dialog("已经选择了相同的重号"),!1):void 0},numberSelectAfter:function(){total()},numberUnSelectAfter:function(){total()},selectStyle:".red_balls",containerId:"#selectz3ds .fc3d-shi",multipleSelect:!1});$("#buycarfixedbtn .ball-status-bar").unbind().bind("click",function(){var pl3=countZ3ds();0!=pl3?(pl3.PL3_ID=++CACHE_ID,PL3_CAR.push(pl3),chong.clear(),dan.clear(),location.href="#!/car"):dialog("每位至少选择<span class='wzl-text-warning'>1</span>个号码")}),$(".glyphicon.icon-trash").on("click",function(){chong.clear(),dan.clear(),total()}),Y_Y(function(){chong.clear(),dan.clear();var n1=cp.shuffle({min:0,max:9,count:1});chong.clear().select(n1);var n1=cp.shuffle({min:0,max:9,count:1});dan.clear().select(n1)})}function z6fs(){function total(){var fc3d=countZ6fs();if(0!=fc3d){var count=PlayTypeRule.count(fc3d),price=count*CPCONFIG.PL3.UNIT_PRICE;$(".ball-status-bar").removeClass("disabled").html("共"+count+"注,"+price+"元")}else $(".ball-status-bar").addClass("disabled").html("每位至少选择 1 个号码球")}function countZ6fs(){var haoN=hao.getSelected(),type=PlayTypeRule.pl3_z6fs,baiRequired=type.groupdef[0].required;if(!haoN||!haoN.length)return!1;if(haoN.length<baiRequired)return!1;var fc3dtype="pl3_z6fs";haoN.length==baiRequired&&(fc3dtype="pl3_z6ds");var groups=[{dan:null,tuo:haoN}];return{code:fc3dtype,groups:groups}}publicShow("selectz6fs","排列三-组六复式"),u_type="z6fs";var hao=fc3dNumberSelect("#selectz6fs .fc3d-bai",total);$("#buycarfixedbtn .ball-status-bar").unbind().bind("click",function(){var pl3=countZ6fs();0!=pl3?(pl3.PL3_ID=++CACHE_ID,PL3_CAR.push(pl3),hao.clear(),location.href="#!/car"):dialog("每位至少选择<span class='wzl-text-warning'>1</span>个号码")}),$(".glyphicon.icon-trash").on("click",function(){hao.clear(),total()}),Y_Y(function(){var n1=cp.shuffle({min:0,max:9,count:3});hao.clear().select(n1)})}function PL3car(){function renderCar(){if(PL3_CAR.length){$("#car-no-select").addClass("hidden");var result=countCar(),listTemplate=Handlebars.compile($("#ball-select-item").html());$("#ball-select-group").html(listTemplate({list:result.list}));var totalTemplate=Handlebars.compile($("#car-total-template").html());$("#car-total").html(totalTemplate(result.total)),$("#f3dcar").delegate(".ball-select-remove","click",function(){var $id=$(this).parent().data("id");result.remove($id),renderCar()}),$("#ssq_hm").unbind().bind("click",function(){dialog("合买暂未开放！")}),$("#ssq_buy").unbind().bind("click",function(){$(this).attr("disabled"),postBuy(function(re){"200"==re.resultCode&&(result.clear(),renderCar(),tzsuccess())})})}else{$("#ball-select-group").html(""),$("#car-no-select").removeClass("hidden");var result=countCar(),totalTemplate=Handlebars.compile($("#car-total-template").html());$("#car-total").html(totalTemplate(result.total)),$("#ssq_buy").addClass("disabled")}totalBoard(function(qi,bei,zjstop){PL3_BEI=bei,PL3_QI=qi,PL3_ZJSTOP=zjstop,renderCar()})}function countCar(){function strBtype(type,item,notext){function pl3pad(r){for(var s=[],i=0;i<r.length;i++)s.push(r[i]<10?"0"+r[i]:r[i]);return s}var s="",_s="";return("pl3_fs"==type||"pl3_ds"==type)&&(s+="百位:"+item.groups[0].tuo.join(" ")+" ",s+="十位:"+item.groups[1].tuo.join(" ")+" ",s+="个位:"+item.groups[2].tuo.join(" ")+" ",_s+=item.groups[0].tuo.join(" ")+",",_s+=item.groups[1].tuo.join(" ")+",",_s+=item.groups[2].tuo.join(" ")),"pl3_hz"==type&&(s+=item.groups[0].tuo.join(" "),_s+=pl3pad(item.groups[0].tuo).join(" ")),"pl3_z3ds"==type&&(s+="重号:"+item.groups[0].dan.join(" "),s+="单号:"+item.groups[0].tuo.join(" "),_s+=item.groups[0].dan.join(" ")+" ",_s+=item.groups[0].tuo.join(" ")),"pl3_z3fs"==type&&(s+=item.groups[0].tuo.join(" "),_s+=item.groups[0].tuo.join(" ")),("pl3_z6fs"==type||"pl3_z6ds"==type)&&(s+=item.groups[0].tuo.join(" "),_s+=item.groups[0].tuo.join(" ")),notext?_s:s}function type(t){var r="";switch(t){case"pl3_hz":r="直选和值";break;case"pl3_fs":r="直选复式";break;case"pl3_ds":r="直选单式";break;case"pl3_z3ds":r="组三单式";break;case"pl3_z3fs":r="组三复式";break;case"pl3_z6fs":r="组六复式";break;case"pl3_z6ds":r="组六单式"}return r}function remove(id){for(var j=0;j<PL3_CAR.length;j++)PL3_CAR[j].PL3_ID==id&&PL3_CAR.splice(j,1)}function clear(){PL3_CAR=[],PL3_BEI=1,PL3_QI=1,PL3_ZJ=!1,PL3_ZJSTOP=!1}for(var total,r=[],car_count=0,car_price=0,i=0;i<PL3_CAR.length;i++){var ritem={};ritem.count=PlayTypeRule.count(PL3_CAR[i]),ritem.price=ritem.count*CPCONFIG.PL3.UNIT_PRICE,ritem.type=type(PL3_CAR[i].code),ritem.code=PL3_CAR[i].code,ritem.id=PL3_CAR[i].PL3_ID,car_count+=ritem.count,car_price+=ritem.price,ritem.redStr=strBtype(PL3_CAR[i].code,PL3_CAR[i]),ritem._redStr=strBtype(PL3_CAR[i].code,PL3_CAR[i],!0),r.push(ritem)}return total={bei:PL3_BEI,qi:PL3_QI,count:car_count,price:car_price*PL3_QI*PL3_BEI,zjstop:PL3_ZJSTOP,zj:PL3_ZJ},{list:r,count:car_count,price:car_price,remove:remove,clear:clear,total:total}}function totalBoard(fn){function syanc(){setTimeout(function(){$qiInput.val(qi),$beiInput.val(bei),fn&&fn(qi,bei,zjstop)},100)}var $qiInput=$("#ball-qc"),$beiInput=$("#ball-bei"),$zjInput=$("input#ball-zj"),$zjstopInput=$("input#ball-zjstop"),bei=$beiInput.val().trim(),qi=$qiInput.val().trim(),zj=$zjInput.prop("checked"),zjstop=$zjstopInput.prop("checked");$(".buy-bar-qcminus").unbind().bind("click",function(){qi--,qi=1>qi?1:qi,syanc()}),$(".buy-bar-qcplus").unbind().bind("click",function(){qi++,qi=qi>99?99:qi,syanc()}),$(".buy-bar-beiminus").unbind().bind("click",function(){bei--,bei=1>bei?1:bei,syanc()}),$(".buy-bar-beiplus").unbind().bind("click",function(){bei++,bei=bei>9999?9999:bei,syanc()}),$($qiInput).unbind().bind("keyup",function(){var $val=$($qiInput).val();$val=$val.replace(/\D/g,""),$val=$val>99?99:$val,1>$val&&($val=1),$(this).val($val),qi=Number($val),syanc()}),$($beiInput).unbind().bind("keyup",function(){var $val=$($beiInput).val();$val=$val.replace(/\D/g,""),$val=$val>9999?9999:$val,1>$val&&($val=1),$(this).val($val),bei=Number($val),syanc()}),$("input#ball-zjstop").unbind().bind("click",function(){var $checked=$(this).prop("checked");zjstop=$checked,syanc()}),$("input#ball-zj").unbind().bind("click",function(){var $checked=$(this).prop("checked");zj=$checked,syanc()})}function getOnePL3(){function uniqe(arr){for(var r=[],f=0,n=0;9>=n;n++)r.push(n);arr.sort(function(n1,n2){var s1=parseInt(n1,10),s2=parseInt(n2,10);return s1-s2});for(var i=0;i<arr.length;i++){var s=parseInt(arr[i],10);r.splice(s-f,1)&&f++}return r}function replaceHz(arr){for(var re=[],i=0;i<arr.length;i++)re.push(String(arr[i]));return re}var bai=cp.shuffle({min:0,max:9,count:1}),shi=cp.shuffle({min:0,max:9,count:1}),ge=cp.shuffle({min:0,max:9,count:1}),hezhi=(cp.shuffle({pool:uniqe(ge),min:0,max:9,count:1}),cp.shuffle({min:0,max:27,count:1})),z6fs=cp.shuffle({min:0,max:9,count:3}),pl3={code:"pl3_ds",groups:[{dan:null,tuo:bai},{dan:null,tuo:shi},{dan:null,tuo:ge}]};switch(u_type){case"zxfs":pl3={code:"pl3_ds",groups:[{dan:null,tuo:bai},{dan:null,tuo:shi},{dan:null,tuo:ge}]};break;case"zxhz":pl3={code:"pl3_hz",groups:[{dan:null,tuo:replaceHz(hezhi)}]};break;case"z3ds":pl3={code:"pl3_z3ds",groups:[{dan:ge.concat(ge),tuo:shi}]};break;case"z3fs":pl3={code:"pl3_z3fs",groups:[{dan:null,tuo:shi.concat(bai)}]};break;case"z6fs":pl3={code:"pl3_z6fs",groups:[{dan:null,tuo:z6fs}]}}return pl3.PL3_ID=++CACHE_ID,pl3}function tzsuccess(){$("#car,#selectfc3d,#f3dcar,#carfixed,#buycarfixedbtn").hide(),$("#tzsuccess").show()}function userBuyData(){function mergeTZ(){if(!pl3Car)return!1;var need={gameType:"108",isStop:"",buyType:"0",buyNumberArray:"",issueArray:[],title:"0",explain:"0",secrecy:"1",splitAmount:"0",isUpload:"0",projectid:"0",buyAmount:0,floorsAmount:"0",totalSum:"0",qcdy:"0",unoid:"0",commision:"0",commisiontype:"0"};return need.totalSum=Number(pl3Car.total.price),need.isStop=pl3Car.total.zjstop?1:0,need.buyNumberArray=buyArrayGenerator(pl3Car.list),need.buyType=pl3Car.total.qi>1?1:0,need.title=pl3Car.total.qi>1?"排列三"+PL3_NOWQI+"期追号方案":"排列三"+PL3_NOWQI+"期追号方案",need}function buyArrayGenerator(list){function join(item){var dataTmp={buyNumber:"",typeId:"00",seleId:"01",sum:0,multiple:0};if(!item||!item.count)return!1;var rs=item._redStr.split(" ").join(",");switch(dataTmp.buyNumber=rs,dataTmp.sum=CPCONFIG.PL3.UNIT_PRICE,dataTmp.multiple=pl3Car.total.bei,item.code){case"pl3_fs":dataTmp.typeId="01",dataTmp.seleId="02",dataTmp.sum=item.price,dataTmp.buyNumber=item._redStr;break;case"pl3_ds":dataTmp.typeId="01",dataTmp.seleId="01";break;case"pl3_hz":dataTmp.typeId="01",dataTmp.seleId="04",dataTmp.sum=item.price;break;case"pl3_z3ds":dataTmp.typeId="03",dataTmp.seleId="01";break;case"pl3_z3fs":dataTmp.typeId="03",dataTmp.seleId="02",dataTmp.sum=item.price;break;case"pl3_z6fs":dataTmp.typeId="04",dataTmp.seleId="02",dataTmp.sum=item.price;break;case"pl3_z6ds":dataTmp.typeId="04",dataTmp.seleId="01",dataTmp.sum=item.price}return dataTmp}var r=[];return $(list).each(function(index,item){if(item){var it;it=join(item),it&&r.push(it)}}),r}function getIssues(fn){function merge(list){var r=[];return $(list).each(function(index,item){r.push({issue:item.issue,multiple:pl3Car.total.bei})}),r}var r=[];action.getIssue({lottery:"PL3",issues:pl3Car.total.qi||PL3_QI},function(re){r=merge(re),fn(r)})}var pl3Car=countCar();if(!pl3Car)return null;var d={gameType:"108",format:"ajax",needPay:"",lotoGson:{}};return d.needPay=pl3Car.total.price,d.lotoGson=mergeTZ(),{d:d,getIssue:getIssues}}function postBuy(fn){var u=userBuyData();if(0==u)return dialog("购物车是空的！");var udata=u.d;dialog("loading","正在投注！"),u.getIssue(function(r){return r&&r.length?(udata.lotoGson.issueArray=r,udata.lotoGson=JSON.stringify(udata.lotoGson),void action.ssqTz(udata,function(re){TZ_INFO($.parseJSON(re),fn)})):dialog("投注异常，请重试")})}$("#fc3dplays,#pl3-history").fadeOut(function(){$(".wzl-nav-dropdown").hide(),$(".wzl-cartext").removeClass("hidden"),$("#f3dcar,#carfixed").fadeIn(),renderCar()}),$("#car-addhm").bind("click",function(){location.href="#!/zxfs"}),$("#car-addjx").unbind().bind("click",function(){var pl3=getOnePL3();PL3_CAR.push(pl3),renderCar()}),$(".glyphicon.icon-trash").on("click",function(){var s=countCar();s.clear(),renderCar()})}var PL3_CAR=[],PL3_BEI=1,PL3_QI=1,PL3_ZJ=!1,PL3_ZJSTOP=!1,PL3_NOWQI=null,CACHE_ID=0,u_type="zxfs",PlayTypeRule=cp.PlayTypeRule,CPCONFIG=cp.CONFIG,routes={"/zxfs":function(){zxfs()},"/zxhz":function(){zxhz()},"/z3fs":function(){z3fs()},"/z3ds":function(){z3ds()},"/z6fs":function(){z6fs()},"/car":function(){PL3car()},index:function(){zxfs()},init:function(){init()}};Router(routes)}function pl5(){function init(){function fomatYl(d){var allArr=d.split(",");for(i=6;15>=i;i++)$("#yla em").eq(i-6).text(allArr[i]);for(i=16;25>=i;i++)$("#ylb em").eq(i-16).text(allArr[i]);for(i=26;35>=i;i++)$("#ylc em").eq(i-26).text(allArr[i]);for(i=36;45>=i;i++)$("#yld em").eq(i-36).text(allArr[i]);for(i=46;55>=i;i++)$("#yle em").eq(i-46).text(allArr[i])}$.wzlmore(),$.wzlhistory("pl5",function(d){PL5_NOWQI=d.issue}),$(".jc-match-i").on("click",function(){$("#selectjc,#jc-match").slideToggle()}),action.queryUserInfo({},function(){}),action.yl("plw",{},function(re){"200"==re.resultCode&&fomatYl(re.data)}),$(".ballcon-yilou").on("click",function(){$(".ballcon-right em").toggle()})}function pl5NumberSelect(containerId,total,before,multipleSelect){return cp.numberSelect({min:0,max:9,ispad:!1,numberSelectBefore:function(f){before&&before(f)},numberSelectAfter:function(){total()},numberUnSelectAfter:function(){total()},selectStyle:".red_balls",containerId:containerId,multipleSelect:!multipleSelect})}function index(){function total(){var pl5c=countPl5();if(0!=pl5c){var count=PlayTypeRule.count(pl5c),price=count*CPCONFIG.PL5.UNIT_PRICE;$(".ball-status-bar").removeClass("disabled").html("共"+count+"注,"+price+"元")}else $(".ball-status-bar").addClass("disabled").html("每位至少选择 1 个号码")}function countPl5(){var wanN=wan.getSelected(),qianN=qian.getSelected(),baiN=bai.getSelected(),shiN=shi.getSelected(),geN=ge.getSelected(),dsType=PlayTypeRule.pl5_ds;if(!(wanN&&wanN.length&&qianN&&qianN.length&&baiN&&baiN.length&&shiN&&shiN.length&&geN&&geN.length))return!1;var type="pl5_fs";wanN.length==dsType.groupdef[0].required&&qianN.length==dsType.groupdef[1].required&&baiN.length==dsType.groupdef[2].required&&shiN.length==dsType.groupdef[3].required&&geN.length==dsType.groupdef[4].required&&(type="pl5_ds");var groups=[{dan:null,tuo:wanN},{dan:null,tuo:qianN},{dan:null,tuo:baiN},{dan:null,tuo:shiN},{dan:null,tuo:geN}];return{code:type,groups:groups}}$(".wzl-nav-dropdown,#pl5plays,#pl5-history").show(),$("#f3dcar, #carfixed").hide(),$(".wzl-cartext").addClass("hidden");var wan=pl5NumberSelect("#pl5plays .pl5-wan",total,function(){}),qian=pl5NumberSelect("#pl5plays .pl5-qian",total,function(){}),bai=pl5NumberSelect("#pl5plays .pl5-bai",total,function(){}),shi=pl5NumberSelect("#pl5plays .pl5-shi",total,function(){}),ge=pl5NumberSelect("#pl5plays .pl5-ge",total,function(){});$(".ball-status-bar").unbind().bind("click",function(){var pl5c=countPl5();if(pl5c!==!1){var count=PlayTypeRule.count(pl5c),price=count*CPCONFIG.PL5.UNIT_PRICE;if(price>CPCONFIG.PL5.MAX_AMOUNT)return dialog("单注投注不能超过"+CPCONFIG.PL5.MAX_AMOUNT+"元"),!1;pl5c.PL5_ID=++CACHE_ID,PL5_CAR.push(pl5c),wan.clear(),qian.clear(),bai.clear(),shi.clear(),ge.clear(),location.href="#!/car"}else dialog("每位至少选择<span class='wzl-text-warning'>1</span>个号码")}),Y_Y(function(){wan.clear(),qian.clear(),bai.clear(),shi.clear(),ge.clear();var n1=cp.shuffle({min:0,max:9,count:1});wan.clear().select(n1);var n1=cp.shuffle({min:0,max:9,count:1});qian.clear().select(n1);var n1=cp.shuffle({min:0,max:9,count:1});bai.clear().select(n1);var n1=cp.shuffle({min:0,max:9,count:1});shi.clear().select(n1);var n1=cp.shuffle({min:0,max:9,count:1});ge.clear().select(n1)}),$(".glyphicon.icon-trash").on("click",function(){wan.clear(),qian.clear(),bai.clear(),shi.clear(),ge.clear(),total()})}function PL5car(){function countCar(){function strBtype(type,item,notext){var s="",_s="";return s+=item.groups[0].tuo.join(" ")+",",s+=item.groups[1].tuo.join(" ")+",",s+=item.groups[2].tuo.join(" ")+",",s+=item.groups[3].tuo.join(" ")+",",s+=item.groups[4].tuo.join(" "),_s+=item.groups[0].tuo.join(" ")+",",_s+=item.groups[1].tuo.join(" ")+",",_s+=item.groups[2].tuo.join(" ")+",",_s+=item.groups[3].tuo.join(" ")+",",_s+=item.groups[4].tuo.join(" "),notext?_s:s}function type(t){var r="";switch(t){case"pl5_fs":r="复式";break;case"pl5_ds":r="单式"}return r}function remove(id){for(var j=0;j<PL5_CAR.length;j++)PL5_CAR[j].PL5_ID==id&&PL5_CAR.splice(j,1)}function clear(){PL5_CAR=[],PL5_BEI=1,PL5_QI=1,PL5_ZJ=!1,PL5_ZJSTOP=!1}for(var total,r=[],car_count=0,car_price=0,i=0;i<PL5_CAR.length;i++){var ritem={};ritem.count=PlayTypeRule.count(PL5_CAR[i]),ritem.price=ritem.count*CPCONFIG.PL5.UNIT_PRICE,ritem.type=type(PL5_CAR[i].code),ritem.code=PL5_CAR[i].code,ritem.id=PL5_CAR[i].PL5_ID,car_count+=ritem.count,car_price+=ritem.price,ritem.redStr=strBtype(PL5_CAR[i].code,PL5_CAR[i]),ritem._redStr=strBtype(PL5_CAR[i].code,PL5_CAR[i],!0),r.push(ritem)}return total={bei:PL5_BEI,qi:PL5_QI,count:car_count,price:car_price*PL5_QI*PL5_BEI,zjstop:PL5_ZJSTOP,zj:PL5_ZJ},{list:r,count:car_count,price:car_price,clear:clear,remove:remove,total:total}}function renderCar(){if(PL5_CAR.length){$("#car-no-select").addClass("hidden");var result=countCar(),listTemplate=Handlebars.compile($("#ball-select-item").html());$("#ball-select-group").html(listTemplate({list:result.list}));var totalTemplate=Handlebars.compile($("#car-total-template").html());$("#car-total").html(totalTemplate(result.total)),$("#f3dcar .ball-select-remove").unbind().bind("click",function(){var $id=$(this).parent().data("id");result.remove($id),renderCar()}),$("#ssq_hm").unbind().bind("click",function(){dialog("合买暂未开放！")}),$("#ssq_buy").unbind().bind("click",function(){$(this).attr("disabled"),postBuy(function(re){"200"==re.resultCode&&(result.clear(),renderCar(),tzsuccess())})})}else{$("#ball-select-group").html(""),$("#car-no-select").removeClass("hidden");var result=countCar(),totalTemplate=Handlebars.compile($("#car-total-template").html());$("#car-total").html(totalTemplate(result.total)),$("#ssq_buy").addClass("disabled")}totalBoard(function(qi,bei,zjstop){PL5_BEI=bei,PL5_QI=qi,PL5_ZJSTOP=zjstop,renderCar()})}function totalBoard(fn){function syanc(){setTimeout(function(){$qiInput.val(qi),$beiInput.val(bei),fn&&fn(qi,bei,zjstop)},100)}var $qiInput=$("#ball-qc"),$beiInput=$("#ball-bei"),$zjInput=$("input#ball-zj"),$zjstopInput=$("input#ball-zjstop"),bei=$beiInput.val().trim(),qi=$qiInput.val().trim(),zj=$zjInput.prop("checked"),zjstop=$zjstopInput.prop("checked");$(".buy-bar-qcminus").unbind().bind("click",function(){qi--,qi=1>qi?1:qi,syanc()}),$(".buy-bar-qcplus").unbind().bind("click",function(){qi++,qi=qi>99?99:qi,syanc()}),$(".buy-bar-beiminus").unbind().bind("click",function(){bei--,bei=1>bei?1:bei,syanc()}),$(".buy-bar-beiplus").unbind().bind("click",function(){bei++,bei=bei>9999?9999:bei,syanc()}),$($qiInput).unbind().bind("keyup",function(){var $val=$($qiInput).val();$val=$val.replace(/\D/g,""),$val=$val>99?99:$val,1>$val&&($val=1),$(this).val($val),qi=Number($val),syanc()}),$($beiInput).unbind().bind("keyup",function(){var $val=$($beiInput).val();$val=$val.replace(/\D/g,""),$val=$val>9999?9999:$val,1>$val&&($val=1),$(this).val($val),bei=Number($val),syanc()}),$("input#ball-zjstop").unbind().bind("click",function(){var $checked=$(this).prop("checked");zjstop=$checked,syanc()}),$("input#ball-zj").unbind().bind("click",function(){var $checked=$(this).prop("checked");zj=$checked,syanc()})}function getOnePL5(){var wan=cp.shuffle({min:0,max:9,count:1}),qian=cp.shuffle({min:0,max:9,count:1}),bai=cp.shuffle({min:0,max:9,count:1}),shi=cp.shuffle({min:0,max:9,count:1}),ge=cp.shuffle({min:0,max:9,padding:!1,count:1}),pl5c={code:"pl5_ds",groups:[{dan:null,tuo:ge},{dan:null,tuo:shi},{dan:null,tuo:bai},{dan:null,tuo:qian},{dan:null,tuo:wan}]};return pl5c.PL5_ID=++CACHE_ID,pl5c}function tzsuccess(){$("#car,#pl5plays,#carfixed,#f3dcar,#buycarfixedbtn").hide(),$("#tzsuccess").show()}function userBuyData(){function mergeTZ(){if(!sscCar)return!1;var need={gameType:"109",isStop:"",buyType:"0",buyNumberArray:"",issueArray:[],title:"0",explain:"0",secrecy:"1",splitAmount:"0",isUpload:"0",projectid:"0",buyAmount:0,floorsAmount:"0",totalSum:"0",qcdy:"0",unoid:"0",commision:"0",commisiontype:"0"};return need.totalSum=Number(sscCar.total.price),need.isStop=sscCar.total.zjstop?1:0,need.buyNumberArray=buyArrayGenerator(sscCar.list),need.buyType=sscCar.total.qi>1?1:0,need.title=sscCar.total.qi>1?"排列五"+PL5_NOWQI+"期追号方案":"排列五"+PL5_NOWQI+"期追号方案",need}function buyArrayGenerator(list){function join(item){var dataTmp={buyNumber:"",typeId:"00",seleId:"01",sum:0};if(!item||!item.count)return!1;var rs=item._redStr;switch(dataTmp.buyNumber=rs,dataTmp.sum=item.price,dataTmp.num=item.count,dataTmp.multiple=sscCar.total.bei,item.code){case"pl5_fs":dataTmp.typeId="00",dataTmp.seleId="02";break;case"pl5_ds":dataTmp.typeId="00",dataTmp.seleId="01"}return dataTmp}var r=[];return $(list).each(function(index,item){if(item){var it=join(item);it&&r.push(it)}}),r}function getIssues(fn){function merge(list){var r=[];return $(list).each(function(index,item){item.issue>=PL5_NOWQI&&r.length<PL5_QI&&r.push({issue:item.issue,multiple:sscCar.total.bei})}),r}var r=[];action.getIssue({lottery:"PL5",issues:sscCar.total.qi||PL5_QI},function(re){r=merge(re),fn(r)})}var sscCar=countCar();if(!sscCar)return null;var d={gameType:"109",format:"ajax",needPay:"",lotoGson:{}};return d.needPay=sscCar.total.price,d.lotoGson=mergeTZ(),{d:d,getIssue:getIssues}}function postBuy(fn){var u=userBuyData();if(0==u)return dialog("购物车是空的！");var udata=u.d;dialog("loading","正在投注！"),u.getIssue(function(r){return r&&r.length?(udata.lotoGson.issueArray=r,udata.lotoGson=JSON.stringify(udata.lotoGson),void action.pl3Tz(udata,function(re){TZ_INFO($.parseJSON(re),fn)})):dialog("投注异常，请重试")})}$("#pl5plays,#pl5-history").fadeOut(function(){$(".wzl-nav-dropdown,#f3d-history").hide(),$(".wzl-cartext").removeClass("hidden"),$("#f3dcar, #carfixed").fadeIn(),renderCar()}),$("#car-addhm").bind("click",function(){location.href="#!/dg"}),$("#car-addjx").unbind().bind("click",function(){var pl5c=getOnePL5();PL5_CAR.push(pl5c),renderCar()}),$(".glyphicon.icon-trash").on("click",function(){var s=countCar();s.clear(),renderCar()})}var routes={"/car":function(){PL5car()},"/dg":function(){index()},index:function(){index()},init:function(){init()}};Router(routes);var PL5_CAR=[],PL5_BEI=1,PL5_QI=1,PL5_ZJ=!1,PL5_ZJSTOP=!1,PL5_NOWQI=null,CACHE_ID=0,PlayTypeRule=cp.PlayTypeRule,CPCONFIG=cp.CONFIG}var $=require("jquery/2.1.1/jquery"),until=require("wzlh5/1.0.0/until"),action=require("wzlh5/1.0.0/ac"),wzlui=require("wzlh5/1.0.0/ui"),cp=require("wzlh5/1.0.0/cp"),Handlebars=require("handlebars/1.3.0/dist/cjs/handlebars").default,dialog=(wzlui.containerMask,wzlui.iscrollPop,wzlui.dialog),dropdownMask=(wzlui.containerMask,wzlui.dropdownMask),Y_Y=until.Y_Y,TZ_INFO=until.TZ_INFO,Router=until.Router;return{pl3:pl3,pl5:pl5}});