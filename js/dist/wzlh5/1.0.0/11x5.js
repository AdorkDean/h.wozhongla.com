/**
 * Created by hebo (razr409355439@gmail.com)on 15/1/7.
 */

define("wzlh5/1.0.0/11x5",["jquery/2.1.1/jquery","wzlh5/1.0.0/ac","handlebars/1.3.0/dist/cjs/handlebars",'wzlh5/1.0.0/until',"wzlh5/1.0.0/cp","wzlh5/1.0.0/ui"],function (require, exports, module) {
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

    var Router = until.Router;

    //江西
    function jx11x5(){

           var X115_CAR = [],
           //投注倍数
               X115_BEI = 1,
           //投注期次
               X115_QI = 1,
           //是否追加
               X115_ZJ = false,
           //中奖是否停止追加
               X115_ZJSTOP = false,
               X115_NOWQI = null,
               CACHE_ID = 0,
               u_type="rx3",
               PlayTypeRule = cp.PlayTypeRule,
               CPCONFIG = cp.CONFIG,
               stop_control = true;
           var routes = {
               "/rx1": function() {
                   rx1();
               },
               "/rx2": function() {
                   rx2();
               },
               "/rx3": function() {
                   rx3();
               },
               "/rx4": function() {
                   rx4();
               },
               "/rx5": function() {
                   rx5();
               },
               "/rx6": function() {
                   rx6();
               },
               "/rx7": function() {
                   rx7();
               },
               "/rx8": function() {
                   rx8();
               },
               "/q2": function() {
                   q2();
               },
               "/q3": function() {
                   q3();
               },
               "/car": function() {
                   car();
               },
               "index": function() {
                   rx3();
               },
               "init": function() {
                   init();
               }
           }
           Router(routes);
           function publicNmuberSelector(containerId, total, before) {
               return cp.numberSelect({
                   min: 1,
                   max: 11,
                   ispad: true,
                   numberSelectBefore: function(f) {
                       before && before(f);
                   },
                   numberSelectAfter: function(f) {
                       total()
                   },
                   numberUnSelectAfter: function(f) {
                       total()
                   },
                   //dom 类
                   selectStyle: ".red_balls",
                   //
                   containerId: containerId
               })
           }
           function publicShow(v, title, type, text, fn) {
               $("#carfixed,#f3dcar,#tzsuccess").hide();
               $("#selectfc3d,#x115dplays,#jx11x5-history").show();
               $(".wzl-cartext").addClass("hidden")
               $(".ball-status-bar").addClass("disabled").html(text||"请选择号码")
               $("#x115dplays>div").not("#" + v).hide(function() {
                   $('#' + v + ', #buycarfixedbtn').show();
                   $('#' + v +" .red_balls").removeClass("active");
                   $('.wzl-nav-dropdown').text("江西"+title).show();
                   fn && fn();
               })
               u_type = type;
           }
           function publicTotal(number,type){
               var select = number.getSelected();
               var dstype = "11x5_"+type+"ds";
               var rule = PlayTypeRule[dstype]
               if(select && select.length && select.length>= type[1]){
                   var len = select.length,
                       count = 0,
                       price = 0;
                   var lottery = formatLottery(select,dstype)
                   if(len > rule.groupdef[0].required){
                       dstype = "11x5_"+type+"fs";
                       rule = PlayTypeRule[dstype]
                       lottery = formatLottery(select,dstype)
                   }
                   if(len <rule.groupdef[0].required){
                       $(".ball-status-bar").addClass("disabled").html("至少选择"+rule.groupdef[0].required+"个号码")
                       return ;
                   }
                   count = PlayTypeRule.count(lottery)
                   price = count * CPCONFIG.JX11X5.UNIT_PRICE;
                   $(".ball-status-bar").removeClass("disabled").html("共" + count + "注," + price + "元")
                   $(".ball-status-bar").unbind().bind('click', function() {
                       lottery.X115_ID = ++CACHE_ID
                       X115_CAR.push(lottery);
                       number.clear();
                       location.href = "#!/car";
                       var tst='江西';
                       $('.wzl-cartext').html(tst+'11选5-购物车');
                   });
               }else{
                   //不够一注
                   $(".ball-status-bar").addClass("disabled").html("至少选择"+rule.groupdef[0].required+"个号码")
                   $(".ball-status-bar").unbind().bind('click', function() {
                       //dialog("请至少选择"+rule.groupdef[0].required+"个号码")
                       return false;
                   });
               }
               $(".glyphicon.icon-trash").unbind().bind("click", function() {
                   number.clear();
                   publicTotal(number,type)
               })
               //增加自选号码  清除一下上一次的
               $('#car-addhm').unbind().bind('click',function(){
                   number.clear();
               });
               $('.x115nav a').unbind().bind('click',function(){
                   number.clear();
               });
               function  formatLottery(number,type){
                   var groups = [{
                       dan: null,
                       tuo: number
                   }]
                   return {
                       code: type,
                       groups: groups
                   }
               }
           }
           function init() {
               $('.wzl-nav-dropdown').unbind().bind("click", function() {
                   dropdownMask.toggle();
               })
	            $('.navbar-header').on('click','.icon-more',function(){
                	
	                	$('.drop-down-more').toggle();
	            })
               $(".jc-match-i").unbind().bind("click", function() {
                   $("#selectjc,#jc-match").slideToggle();
               })

               kjdjs();
               //开奖倒计时
               function kjdjs() {
                   var issueA = []
                   var timer = null;
                   issue();
                   function issue() {
                       clearInterval(timer);
                       action.getIssue({
                           lottery: "JX11X5",
                           issues: 25
                       }, function(re) {
                           issueA = re;
                           if (re[0].endTime <= 150) re = re.slice(1);
                           setIssue(re[0])
                       })
                       //设置期次信息
                       function setIssue(d) {
                           X115_NOWQI = d.issue;
                           setCountDown(d.endTime)
                           $(".history-bar").html(" <span>第" + d.issue + "期销售中</span><div class='pull-right history-bar-dropdown icon-dropdown-gray'> <span class='redballs'>00</span>时<span class='redballs'>00</span>分<span class='redballs'>00</span>秒</div>")

                           function setCountDown(s) {
                               timer = setInterval(function() {
                                   s--;
                                   if (s <= 150) {
                                       $('.history-bar').html("该其次已经截止,下一期预售中。")
                                       issue()
                                   }
                                   var v = formatSeconds(s - 150)
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
                       }
                   }
               }
               //请求 userinfo 用于同步
               action.queryUserInfo({},function(){})


               action.queryX115({
                   pageno: 1,
                   pagesize: 10
               }, function(d) {
                   fomatIssue2(d.lotolist,'jx11x5-history')

                   function fomatIssue2(d,name){
                       var arr=[];
                       for (var i = 0; i < d.length; i++) {
                           //////////console.log(d[i]);
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

               })

               //渲染遗漏
               action.yl('dlc',{},function (re){
                   if(re.resultCode=='200'){
                       fomatYl(re.data);
                   }else{

                   }

               })
               function fomatYl(d){
                   var allArr=d.split(",");
                   ////////console.log(allArr);
                   for (var i=6;i<=16;i++){
                       $('.yla em').eq(i-6).text(allArr[i])
                       $('.yla2 em').eq(i-6).text(allArr[i])
                       $('.yla3 em').eq(i-6).text(allArr[i])
                       $('.yla4 em').eq(i-6).text(allArr[i])
                       $('.yla5 em').eq(i-6).text(allArr[i])
                       $('.yla6 em').eq(i-6).text(allArr[i])
                       $('.yla7 em').eq(i-6).text(allArr[i])
                       $('.yla8 em').eq(i-6).text(allArr[i])
                   }

               }

               $('.ballcon-yilou').unbind().bind('click', function (){
                   $('.ballcon-right em').toggle()
               })

               //查询是否停售
               action.getControl(function(re){
                   if(re[106]===false){
                       stop_control=false
                       dialog("该彩种已经停售!")
                   }
               })
           }

           function rx1(){
               //选择玩法后如果记录是显示的让他隐藏
               $('.history-list').hide();
               publicShow("selectrx1", '11选5-任选一','rx1', "至少选择1个号码")
               var rx1N = publicNmuberSelector("#selectrx1",function(){
                   publicTotal(rx1N,"r1")
               })
               Y_Y(function() {
                   var n1 = cp.shuffle({
                       min: 1,
                       max: 11,
                       count: 1
                   })
                   rx1N.clear().select(n1)

               })
           }

           function rx2(){
               //选择玩法后如果记录是显示的让他隐藏
               $('.history-list').hide();
               publicShow("selectrx2", '11选5-任选二','rx2', "至少选择2个号码")
               var rx2N = publicNmuberSelector("#selectrx2",function(){
                   publicTotal(rx2N,"r2")
               })
               Y_Y(function() {
                   var n1 = cp.shuffle({
                       min: 1,
                       max: 11,
                       count: 2
                   })
                   rx2N.clear().select(n1)

               })
           }

           function rx3(){
               //选择玩法后如果记录是显示的让他隐藏
               $('.history-list').hide();
               publicShow("selectrx3", '11选5-任选三','rx3', "至少选择3个号码")
               var rx3N = publicNmuberSelector("#selectrx3",function(){
                   publicTotal(rx3N,"r3")
               })
               Y_Y(function() {
                   var n1 = cp.shuffle({
                       min: 1,
                       max: 11,
                       count: 3
                   })
                   rx3N.clear().select(n1)

               })
           }

           function rx4(){
               //选择玩法后如果记录是显示的让他隐藏
               $('.history-list').hide();
               publicShow("selectrx4", '11选5-任选四','rx4', "至少选择4个号码")
               var rx4N = publicNmuberSelector("#selectrx4",function(){
                   publicTotal(rx4N,"r4")
               })
               Y_Y(function() {
                   var n1 = cp.shuffle({
                       min: 1,
                       max: 11,
                       count: 4
                   })
                   rx4N.clear().select(n1)

               })

           }

           function rx5(){
               //选择玩法后如果记录是显示的让他隐藏
               $('.history-list').hide();
               publicShow("selectrx5", '11选5-任选五','rx5', "至少选择5个号码")
               var rx5N = publicNmuberSelector("#selectrx5",function(){
                   publicTotal(rx5N,"r5")
               })
               Y_Y(function() {
                   var n1 = cp.shuffle({
                       min: 1,
                       max: 11,
                       count: 5
                   })
                   rx5N.clear().select(n1)

               })
           }

           function rx6(){
               //选择玩法后如果记录是显示的让他隐藏
               $('.history-list').hide();
               publicShow("selectrx6", '11选5-任选六','rx6', "至少选择6个号码")
               var rx6N = publicNmuberSelector("#selectrx6",function(){
                   publicTotal(rx6N,"r6")
               })
               Y_Y(function() {
                   var n1 = cp.shuffle({
                       min: 1,
                       max: 11,
                       count: 6
                   })
                   rx6N.clear().select(n1)

               })
           }

           function rx7(){
               //选择玩法后如果记录是显示的让他隐藏
               $('.history-list').hide();
               publicShow("selectrx7", '11选5-任选七','rx7', "至少选择7个号码")
               var rx7N = publicNmuberSelector("#selectrx7",function(){
                   publicTotal(rx7N,"r7")
               })
               Y_Y(function() {
                   var n1 = cp.shuffle({
                       min: 1,
                       max: 11,
                       count: 7
                   })
                   rx7N.clear().select(n1)

               })
           }

           function rx8(){
               //选择玩法后如果记录是显示的让他隐藏
               $('.history-list').hide();
               publicShow("selectrx8", '11选5-任选八','rx8', "至少选择8个号码")
               var rx8N = publicNmuberSelector("#selectrx8",function(){
                   publicTotal(rx8N,"r8")
               })
               Y_Y(function() {
                   var n1 = cp.shuffle({
                       min: 1,
                       max: 11,
                       count: 8
                   })
                   rx8N.clear().select(n1)

               })
           }

           function q2(){
               //选择玩法后如果记录是显示的让他隐藏
               $('.history-list').hide();
               publicShow("selectq2", '11选5-前二','q2', "至少选择2个号码")
               var q2N1 = cp.numberSelect({
                   min: 1,
                   max: 11,
                   ispad: true,
                   numberSelectBefore: function(f) {
                       if(q2N1.isSelected(f)){
                           return true;
                       }
                       if(q2N2.isSelected(f)){
                           if(!$('.ui-mask').length){
                               dialog("相同号码不能组成有效注数！")
                           }
                           return false;
                       }
                   },
                   numberSelectAfter: function(f) {
                       total()
                   },
                   numberUnSelectAfter: function(f) {
                       total()
                   },
                   //dom 类
                   selectStyle: ".red_balls",
                   //
                   containerId: "#selectq2 .q2-1"
               })
               var q2N2 = cp.numberSelect({
                   min: 1,
                   max: 11,
                   ispad: true,
                   numberSelectBefore: function(f) {
                       if(q2N2.isSelected(f)){
                           return true;
                       }
                       if(q2N1.isSelected(f)){
                           if(!$('.ui-mask').length){
                               dialog("相同号码不能组成有效注数！")
                           }
                           return false;
                       }
                   },
                   numberSelectAfter: function(f) {
                       total()
                   },
                   numberUnSelectAfter: function(f) {
                       total()
                   },
                   //dom 类
                   selectStyle: ".red_balls",
                   //
                   containerId:"#selectq2 .q2-2"
               })

               function countNmuber(){
                   var q2select1 = q2N1.getSelected();
                   var q2select2 = q2N2.getSelected();
                   var dstype = "11x5_q2ds";
                   var rule = PlayTypeRule[dstype];
                   if(!q2select1||!q2select2||!q2select1.length||!q2select2.length) {
                       return false;
                   }
                   if(q2select1.length>1||q2select2.length>1){
                       dstype =  "11x5_q2fs";
                   }
                   var groups = [{
                       dan: null,
                       tuo: q2select1
                   },{
                       dan: null,
                       tuo: q2select2
                   }]
                   return {
                       code: dstype,
                       groups: groups
                   }
               }
               function total(){
                   var  n = countNmuber();
                   if(n!=false){
                       var count = PlayTypeRule.count(n),
                           price = count * CPCONFIG.JX11X5.UNIT_PRICE;
                       $(".ball-status-bar").removeClass("disabled").html("共" + count + "注," + price + "元")
                       $(".ball-status-bar").unbind().bind('click', function() {
                           n.X115_ID = ++CACHE_ID
                           X115_CAR.push(n);
                           q2N1.clear();
                           q2N2.clear();
                           location.href = "#!/car"
                       });
                   }else{
                       $(".ball-status-bar").addClass("disabled").html("至少选择2个号码")
                       $(".ball-status-bar").unbind().bind('click', function() {
                           //dialog("请至少选择2个号码")
                           return false;
                       });
                   }
               }
               $(".glyphicon.icon-trash").unbind().bind("click", function() {
                   q2N1.clear();
                   q2N2.clear();
               })

               $('#car-addhm').unbind().bind('click',function(){
                   q2N1.clear();
                   q2N2.clear();
               });
               $('.x115nav a').unbind().bind('click',function(){
                   q2N1.clear();
                   q2N2.clear();
               });
               Y_Y(function() {
                   var n1 = cp.shuffle({
                       min: 1,
                       max: 11,
                       count: 1
                   })
                   q2N1.clear().select(n1)
                   var n1 = cp.shuffle({
                       min: 1,
                       max: 11,
                       count: 1
                   })
                   q2N2.clear().select(n1)

               })
           }

           function q3(){
               //选择玩法后如果记录是显示的让他隐藏
               $('.history-list').hide();
               publicShow("selectq3", '11选5-前三','q3', "至少选择3个号码")
               var q3N1 = cp.numberSelect({
                   min: 1,
                   max: 11,
                   ispad: true,
                   numberSelectBefore: function(f) {
                       if(q3N1.isSelected(f)){
                           return true;
                       }
                       if(q3N2.isSelected(f)||q3N3.isSelected(f)){
                           if(!$('.ui-mask').length){
                               dialog("相同号码不能组成有效注数！")
                           }
                           return false;
                       }
                   },
                   numberSelectAfter: function(f) {
                       total()
                   },
                   numberUnSelectAfter: function(f) {
                       total()
                   },
                   //dom 类
                   selectStyle: ".red_balls",
                   //
                   containerId: "#selectq3 .q3-1"
               })
               var q3N2 = cp.numberSelect({
                   min: 1,
                   max: 11,
                   ispad: true,
                   numberSelectBefore: function(f) {
                       if(q3N2.isSelected(f)){
                           return true;
                       }
                       if(q3N1.isSelected(f)||q3N3.isSelected(f)){
                           if(!$('.ui-mask').length){
                               dialog("相同号码不能组成有效注数！")
                           }
                           return false;
                       }
                   },
                   numberSelectAfter: function(f) {
                       total()
                   },
                   numberUnSelectAfter: function(f) {
                       total()
                   },
                   //dom 类
                   selectStyle: ".red_balls",
                   //
                   containerId:"#selectq3 .q3-2"
               })
               var q3N3 = cp.numberSelect({
                   min: 1,
                   max: 11,
                   ispad: true,
                   numberSelectBefore: function(f) {
                       if(q3N3.isSelected(f)){
                           return true;
                       }
                       if(q3N2.isSelected(f)||q3N1.isSelected(f)){
                           if(!$('.ui-mask').length){
                               dialog("相同号码不能组成有效注数！")
                           }
                           return false;
                       }
                   },
                   numberSelectAfter: function(f) {
                       total()
                   },
                   numberUnSelectAfter: function(f) {
                       total()
                   },
                   //dom 类
                   selectStyle: ".red_balls",
                   //
                   containerId: "#selectq3 .q3-3"
               })
               function countNmuber(){
                   var q3select1 = q3N1.getSelected();
                   var q3select2 = q3N2.getSelected();
                   var q3select3 = q3N3.getSelected();
                   var dstype = "11x5_q3ds";
                   var rule = PlayTypeRule[dstype];
                   if(!q3select1||!q3select2||!q3select3||!q3select1.length||!q3select2.length||!q3select3.length) {
                       return false;
                   }
                   if(q3select1.length>1||q3select2.length>1||q3select3.length>1){
                       dstype =  "11x5_q3fs";
                   }
                   var groups = [{
                       dan: null,
                       tuo: q3select1
                   },{
                       dan: null,
                       tuo: q3select2
                   },{
                       dan: null,
                       tuo: q3select3
                   }]
                   return {
                       code: dstype,
                       groups: groups
                   }
               }
               function total(){
                   var  n = countNmuber();
                   if(n!=false){
                       var count = PlayTypeRule.count(n),
                           price = count * CPCONFIG.JX11X5.UNIT_PRICE;
                       $(".ball-status-bar").removeClass("disabled").html("共" + count + "注," + price + "元")
                       $(".ball-status-bar").unbind().bind('click', function() {

                           n.X115_ID = ++CACHE_ID
                           X115_CAR.push(n);
                           q3N1.clear();
                           q3N2.clear();
                           q3N3.clear();
                           location.href = "#!/car"
                       });
                   }else{
                       $(".ball-status-bar").addClass("disabled").html("至少选择3个号码")
                       $(".ball-status-bar").unbind().bind('click', function() {
                           //dialog("请至少选择3个号码")
                           return false;
                       });
                   }
               }
               $(".glyphicon.icon-trash").unbind().bind("click", function() {
                   q3N1.clear();
                   q3N2.clear();
                   q3N3.clear();
               })

               $('#car-addhm').unbind().bind('click',function(){
                   q3N1.clear();
                   q3N2.clear();
                   q3N3.clear()
               });
               $('.x115nav a').unbind().bind('click',function(){
                   q3N1.clear();
                   q3N2.clear();
                   q3N3.clear()
               });

               Y_Y(function() {
                   var n1 = cp.shuffle({
                       min: 1,
                       max: 11,
                       count: 1
                   })
                   q3N1.clear().select(n1)
                   var n1 = cp.shuffle({
                       min: 1,
                       max: 11,
                       count: 1
                   })
                   q3N2.clear().select(n1)
                   var n1 = cp.shuffle({
                       min: 1,
                       max: 11,
                       count: 1
                   })
                   q3N3.clear().select(n1)

               })
           }

           function car(){
               $('#selectfc3d,#jx11x5-history,.wzl-fixed').hide(function() {
                   $(".wzl-nav-bar").children().eq(1).hide()
                   $(".wzl-cartext").removeClass("hidden") //removeClass("icon-dropdown-pink").removeClass("wzl-nav-dropdown").html('双色球-购物车').click(function(){return false;})
                   $(".ball-status-bar").addClass("disabled").html("请选择号码")
                   $('#f3dcar,#carfixed').fadeIn();
                   renderCar();
               });

               function renderCar() {
                   if (X115_CAR.length) {
                       $("#car-no-select").addClass('hidden')
                       var result = countCar();
                       var listTemplate = Handlebars.compile($("#ball-select-item").html());
                       $("#ball-select-group").html(listTemplate({
                           list: result.list
                       }));
                       var totalTemplate = Handlebars.compile($("#car-total-template").html());
                       $('#car-total').html(totalTemplate(result.total))
                       $("#ssq_hm").unbind().bind("click", function() {
                           dialog('合买暂未开放！')
                       });
                       $('#ssq_buy').unbind().bind("click", function() {
                           $(this).attr("disabled")
                           //发送购买请求
                           postBuy(function(re) {
                               if (re.resultCode == "200") {
                                   result.clear();
                                   renderCar()
                                   tzsuccess();
                               }
                           });
                       })
                       $("#ball-select-group  .ball-select-remove").unbind().bind("click", function() {
                           var $id = $(this).parent().data("id");
                           result.remove($id)
                           renderCar();
                       })

                   } else {
                       $("#ball-select-group").html('')
                       $("#car-no-select").removeClass('hidden')
                       var result = countCar();
                       var totalTemplate = Handlebars.compile($("#car-total-template").html());
                       $('#car-total').html(totalTemplate(result.total))
                       $("#ssq_hm").unbind().bind("click", function() {
                           dialog('合买暂未开放！')
                       });
                       $('#ssq_buy').unbind().bind("click", function() {
                           dialog("购物车为空！")
                       }).addClass("disabled")
                   }
                   totalBoard(function(qi, bei, zjstop) {
                       X115_BEI = bei;
                       X115_QI = qi;
                       X115_ZJSTOP = zjstop;
                       renderCar();
                   })
               }
               //统计最后数据 用于渲染
               function countCar() {
                   var r = [],
                       car_count = 0,
                       car_price = 0,
                       total;
                   for (var i = 0; i < X115_CAR.length; i++) {
                       var ritem = {}
                       ritem.count = PlayTypeRule.count(X115_CAR[i]);
                       ritem.price = ritem.count * CPCONFIG['JX11X5'].UNIT_PRICE;
                       ritem.redStr = type2str(X115_CAR[i].code,X115_CAR[i])
                       ritem.groups = X115_CAR[i].groups
                       ritem.type = type(X115_CAR[i].code)
                       ritem.code = X115_CAR[i].code;
                       ritem.id = X115_CAR[i].X115_ID
                       car_count += ritem.count
                       car_price += ritem.price
                       r.push(ritem)
                   }
                   function type2str(t,item,is){
                       var s = '';
                       //
                       s = item.groups[0].tuo.join(",")
                       if(t=="11x5_q2ds"){
                           s = item.groups[0].tuo.join(",")+","
                           s += item.groups[1].tuo.join(",")
                       }
                       if(t=="11x5_q3ds"){
                           s = item.groups[0].tuo.join(",")+","
                           s += item.groups[1].tuo.join(",")+","
                           s += item.groups[2].tuo.join(",")
                       }
                       if(t=="11x5_q2fs"){
                           s = item.groups[0].tuo.join(",")+ " | "
                           s += item.groups[1].tuo.join(",")
                       }
                       if(t=="11x5_q3fs"){
                           s = item.groups[0].tuo.join(",")+ " | "
                           s += item.groups[1].tuo.join(",")+ " | "
                           s += item.groups[2].tuo.join(",")
                       }
                       return s;
                   }
                   function type(t) {
                       var r = '';
                       switch (t) {
                           case "11x5_q1ds":
                               r = "前一单式";
                               break;
                           case "11x5_q1fs":
                               r = "前一复式";
                               break;
                           case "11x5_r1ds":
                               r = "任选一单式";
                               break;
                           case "11x5_r1fs":
                               r = "任选一复式";
                               break;
                           case "11x5_r2ds":
                               r = "任选二单式";
                               break;
                           case "11x5_r2fs":
                               r = "任选二复式";
                               break;
                           case "11x5_r2dt":
                               r = "任选二胆拖";
                               break;
                           case "11x5_r3ds":
                               r = "任选三单式";
                               break;
                           case "11x5_r3fs":
                               r = "任选三复式";
                               break;
                           case "11x5_r3dt":
                               r = "任选三胆拖";
                               break;
                           case "11x5_r4ds":
                               r = "任选四单式";
                               break;
                           case "11x5_r4fs":
                               r = "任选四复式";
                               break;
                           case "11x5_r4dt":
                               r = "任选四胆拖";
                               break;
                           case "11x5_r5ds":
                               r = "任选五单式";
                               break;
                           case "11x5_r5fs":
                               r = "任选五复式";
                               break;
                           case "11x5_r5dt":
                               r = "任选五胆拖";
                               break;
                           case "11x5_r6ds":
                               r = "任选六单式";
                               break;
                           case "11x5_r6fs":
                               r = "任选六复式";
                               break;
                           case "11x5_r6dt":
                               r = "任选六胆拖";
                               break;
                           case "11x5_r7ds":
                               r = "任选七单式";
                               break;
                           case "11x5_r7fs":
                               r = "任选七复式";
                               break;
                           case "11x5_r7dt":
                               r = "任选七胆拖";
                               break;
                           case "11x5_r8ds":
                               r = "任选八单式";
                               break;
                           case "11x5_r8fs":
                               r = "任选八复式";
                               break;
                           case "11x5_r8dt":
                               r = "任选八胆拖";
                               break;
                           case "11x5_q2ds":
                               r = "前二单式";
                               break;
                           case "11x5_q2fs":
                               r = "前二复式";
                               break;
                           case "11x5_q2zxds":
                               r = "前二组选单式";
                               break;
                           case "11x5_q2zxfs":
                               r = "前二组选复式";
                               break;
                           case "11x5_q3ds":
                               r = "前三单式";
                               break;
                           case "11x5_q3fs":
                               r = "前三复式";
                               break;
                           case "11x5_q3zxds":
                               r = "前三组选单式";
                               break;
                           case "11x5_q3zxfs":
                               r = "前三组选复式";
                               break;
                       }
                       return r;
                   }
                   function remove(id) {
                       for (var j = 0; j < X115_CAR.length; j++) {
                           if (X115_CAR[j].X115_ID == id) {
                               X115_CAR.splice(j, 1)
                           }
                       }
                   }
                   total = {
                       bei: X115_BEI,
                       qi: X115_QI,
                       count: car_count,
                       price: car_price * X115_QI * X115_BEI,
                       zjstop: X115_ZJSTOP,
                       zj: X115_ZJ
                   }
                   function clear() {
                       X115_CAR.length = 0;
                       X115_BEI = 1
                       X115_QI = 1
                       X115_ZJ = false
                       X115_ZJSTOP = false
                   }
                   return {
                       list: r,
                       count: car_count,
                       price: car_price,
                       remove: remove,
                       total: total,
                       clear: clear
                   };
               }
               //统计面板事件 （期次 倍数 是否追号 等
               function totalBoard(fn) {
                   var $qiInput = $("#ball-qc");
                   var $beiInput = $("#ball-bei");
                   var $zjInput = $('input#ball-zj');
                   var $zjstopInput = $('input#ball-zjstop');
                   var bei = $beiInput.val().trim(),
                       qi = $qiInput.val().trim(),
                       zjstop = $zjstopInput.prop('checked');
                   //期次减
                   // $("#car-total").delegate(".buy-bar-qcminus",
                   $(".buy-bar-qcminus").unbind().bind('click', function() {
                       qi--;
                       qi = qi < 1 ? 1 : qi;
                       syanc();
                   })
                   //期次加
                   $(".buy-bar-qcplus").unbind().bind('click', function() {
                       qi++;
                       qi = qi > 99 ? 99 : qi;
                       syanc();
                   })
                   //倍数减
                   $(".buy-bar-beiminus").unbind().bind('click', function() {
                       bei--;
                       bei = bei < 1 ? 1 : bei;
                       syanc();
                   })
                   //倍数加
                   $(".buy-bar-beiplus").unbind().bind('click', function() {
                       bei++;
                       bei = bei > 9999 ? 9999 : bei;
                       syanc();
                   })
                   $($qiInput).unbind().bind("keyup", function() {
                       var $val = $($qiInput).val();
                       $val = $val.replace(/\D/g, "")
                       $val = $val > 20 ? 20 : $val;
                       $(this).val($val)
                       qi = Number($val);
                       syanc();
                   })
                   $($beiInput).unbind().bind('keyup', function() {
                       var $val = $($beiInput).val();
                       $val = $val.replace(/\D/g, "")
                       $val = $val > 20 ? 20 : $val;
                       $(this).val($val)
                       bei = Number($val);
                       syanc();
                   })
                   $('input#ball-zjstop').unbind().bind('click', function() {
                       var $checked = $(this).prop('checked')
                       zjstop = $checked;
                       syanc();
                   })

                   function syanc() {
                       setTimeout(function() {
                           $qiInput.val(qi)
                           $beiInput.val(bei)
                           fn && fn(qi, bei, zjstop)
                       }, 100)
                   }
               }
               //增加机选一注
               function getOneX115() {

                   var X115={},count,type="",groups=[];
                   switch(u_type){
                       case "rx1":
                           type="11x5_r1ds";
                           groups = [{
                               dan: null,
                               tuo: reNumber(1)
                           }]
                           break;
                       case "rx2":
                           type="11x5_r2ds";
                           groups = [{
                               dan: null,
                               tuo: reNumber(2)
                           }]
                           break;
                       case "rx3":
                           type="11x5_r3ds"
                           groups = [{
                               dan: null,
                               tuo: reNumber(3)
                           }]
                           break;
                       case "rx4":
                           type="11x5_r4ds"
                           groups = [{
                               dan: null,
                               tuo: reNumber(4)
                           }]
                           break;
                       case "rx5":
                           type="11x5_r5ds"
                           groups = [{
                               dan: null,
                               tuo: reNumber(5)
                           }]
                           break;
                       case "rx6":
                           type="11x5_r6ds"
                           groups = [{
                               dan: null,
                               tuo: reNumber(6)
                           }]
                           break;
                       case "rx7":
                           type="11x5_r7ds"
                           groups = [{
                               dan: null,
                               tuo: reNumber(7)
                           }]
                           break;
                       case "rx8":
                           type="11x5_r8ds"
                           groups = [{
                               dan: null,
                               tuo: reNumber(8)
                           }]
                           break;
                       case "q2":
                           type="11x5_q2ds"
                           groups = [{
                               dan: null,
                               tuo: reNumber(1)
                           },{
                               dan: null,
                               tuo: reNumber(1)
                           }]
                           break;
                       case "q3":
                           type="11x5_q3ds"
                           groups = [{
                               dan: null,
                               tuo: reNumber(1)
                           },{
                               dan: null,
                               tuo: reNumber(1)
                           },{
                               dan: null,
                               tuo: reNumber(1)
                           }]
                           break;
                       default:
                           type = "11x5_r3ds"
                           groups = [{
                               dan: null,
                               tuo: reNumber(3)
                           }]
                   }
                   X115.code =  type;
                   X115.groups = groups;
                   X115.X115_ID = ++CACHE_ID
                   return X115;
                   function reNumber(n){
                       return cp.shuffle({
                           min: 1,
                           max: 11,
                           padding: 1,
                           sort:true,
                           count: n
                       })
                   }
               }
               $('#car-addhm').unbind().bind('click', function() {
                   location.href = "#!/rx3"
                   //history.go(-1);
               })
               $("#car-addjx").unbind().bind('click', function() {
                   var X115 = getOneX115();
                   X115_CAR.push(X115)
                   renderCar();
               })
               $(".glyphicon.icon-trash").unbind().bind("click", function() {
                   var s = countCar();
                   s.clear();
                   renderCar();
               })
               /*投注成功*/
               function tzsuccess() {
                   $("#f3dcar,#selectX115,#carfixed").hide();
                   $("#tzsuccess").show();
               }
               /**
                * 用户购买数据整合
                * @returns {*}
                */
               function userBuyData() {
                   var X115Car = countCar()
                   if (!X115Car) return null;
                   var d = {
                       gameType: "106",
                       format: "ajax",
                       needPay: "",
                       lotoGson: {}
                   }
                   d.needPay = X115Car.total.price;
                   //
                   d.lotoGson = mergeTZ();
                   /**
                    * 投注串 数据整合
                    */
                   function mergeTZ() {
                       if (!X115Car) return false;
                       var need = {
                           //彩票类型
                           gameType: "106",
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
                       need.totalSum = Number(X115Car.total.price);
                       need.isStop = X115Car.total.zjstop ? 1 : 0;
                       need.buyNumberArray = buyArrayGenerator(X115Car.list)
                       need.buyType = X115Car.total.qi > 1 ? 1 : 0;
                       need.title = X115Car.total.qi > 1 ? "江西11选5" + X115_NOWQI + "期追号方案" : "江西11选5" + X115_NOWQI + "期追号方案";
                       // xian ajax =
                       return need;
                   }
                   function countQ2(j){
                       var r = [];
                       var g = j.groups[0].tuo;
                       var c = j.groups[1].tuo;
                       for (var h = 0; h < g.length; h++) {
                           var a = g[h];
                           for (var d = 0; d < c.length; d++) {
                               var f = c[d];
                               if (a == f) {
                                   continue
                               }
                               var n = [a,f]
                               r.push({
                                   code: "11x5_q2ds",
                                   count: 1,
                                   price: 2,
                                   redStr: n.join(","),
                                   type: "前2单式"
                               })
                           }
                       }
                       return r;
                   }
                   function countQ3(n){
                       var r = [];
                       var l = n.groups[0].tuo;
                       var e = n.groups[1].tuo;
                       var c = n.groups[2].tuo;
                       for (var m = 0; m < l.length; m++) {
                           var b = l[m];
                           for (var g = 0; g < e.length; g++) {
                               var k = e[g];
                               if (b === k) {
                                   continue
                               }
                               for (var f = 0; f < c.length; f++) {
                                   var a = c[f];
                                   if (b === a || k === a) {
                                       continue
                                   }
                                   var n = [b,k,a]
                                   r.push({
                                       code: "11x5_q3ds",
                                       count: 1,
                                       price: 2,
                                       redStr: n.join(","),
                                       type: "前3单式"
                                   })
                               }
                           }
                       }
                       return r;
                   }
                   //投注号码串数据
                   function buyArrayGenerator(list) {
                       var r = [];
                       $(list).each(function(index, item) {
                           if (!item) return;
                           var it;
                           if(item.code=="11x5_q2fs"){
                               var rr = countQ2(item)
                               $(rr).each(function(index, item2) {
                                   r.push(join(item2))
                               })
                           }else if(item.code=="11x5_q3fs"){
                               var rr = countQ3(item)
                               $(rr).each(function(index, item2) {
                                   r.push(join(item2))
                               })
                           }else{
                               it = join(item)
                           }
                           it && r.push(it);
                       })

                       function join(item) {
                           var dataTmp = {
                               "buyNumber": "",
                               "typeId": "00",
                               "seleId": "01",
                               "sum": 0.0
                           };
                           if (!item || !item.count) return false;
                           var rs = item.redStr.split(" ").join(",")
                           dataTmp.buyNumber = rs ;
                           dataTmp.sum = item.price;
                           dataTmp.multiple = X115Car.total.bei;
                           switch (item.code) {
                               case "11x5_r1ds":
                                   dataTmp.typeId = "01" ;
                                   dataTmp.seleId = "01" ;
                                   break;
                               case "11x5_r1fs":
                                   dataTmp.typeId = "01" ;
                                   dataTmp.seleId = "02" ;
                                   break;
                               case "11x5_r2ds":
                                   dataTmp.typeId = "02" ;
                                   dataTmp.seleId = "01" ;
                                   break;
                               case "11x5_r2fs":
                                   dataTmp.typeId = "02" ;
                                   dataTmp.seleId = "02" ;
                                   break;
                               case "11x5_r2dt":
                                   dataTmp.typeId = "02" ;
                                   dataTmp.seleId = "03" ;
                                   break;
                               case "11x5_r3ds":
                                   dataTmp.typeId = "03" ;
                                   dataTmp.seleId = "01" ;
                                   break;
                               case "11x5_r3fs":
                                   dataTmp.typeId = "03" ;
                                   dataTmp.seleId = "02" ;
                                   break;
                               case "11x5_r3dt":
                                   dataTmp.typeId = "03" ;
                                   dataTmp.seleId = "03" ;
                                   break;
                               case "11x5_r4ds":
                                   dataTmp.typeId = "04" ;
                                   dataTmp.seleId = "01" ;
                                   break;
                               case "11x5_r4fs":
                                   dataTmp.typeId = "04" ;
                                   dataTmp.seleId = "02" ;
                                   break;
                               case "11x5_r4dt":
                                   dataTmp.typeId = "04" ;
                                   dataTmp.seleId = "03" ;
                                   break;
                               case "11x5_r5ds":
                                   dataTmp.typeId = "05" ;
                                   dataTmp.seleId = "01" ;
                                   break;
                               case "11x5_r5fs":
                                   dataTmp.typeId = "05" ;
                                   dataTmp.seleId = "02" ;
                                   break;
                               case "11x5_r5dt":
                                   dataTmp.typeId = "05" ;
                                   dataTmp.seleId = "03" ;
                                   break;
                               case "11x5_r6ds":
                                   dataTmp.typeId = "06" ;
                                   dataTmp.seleId = "01" ;
                                   break;
                               case "11x5_r6fs":
                                   dataTmp.typeId = "06" ;
                                   dataTmp.seleId = "02" ;
                                   break;
                               case "11x5_r6dt":
                                   dataTmp.typeId = "06" ;
                                   dataTmp.seleId = "03" ;
                                   break;
                               case "11x5_r7ds":
                                   dataTmp.typeId = "07" ;
                                   dataTmp.seleId = "01" ;
                                   break;
                               case "11x5_r7fs":
                                   dataTmp.typeId = "07" ;
                                   dataTmp.seleId = "02" ;
                                   break;
                               case "11x5_r7dt":
                                   dataTmp.typeId = "07" ;
                                   dataTmp.seleId = "03" ;
                                   break;
                               case "11x5_r8ds":
                                   dataTmp.typeId = "08" ;
                                   dataTmp.seleId = "01" ;
                                   break;
                               case "11x5_r8fs":
                                   dataTmp.typeId = "08" ;
                                   dataTmp.seleId = "02" ;
                                   break;
                               case "11x5_r8dt":
                                   dataTmp.typeId = "08" ;
                                   dataTmp.seleId = "03" ;
                                   break;
                               case "11x5_q2ds":
                                   dataTmp.typeId = "09" ;
                                   dataTmp.seleId = "01" ;
                                   break;
                               case "11x5_q2fs":
                                   dataTmp.typeId = "09" ;
                                   dataTmp.seleId = "02" ;
                                   break;
                               case "11x5_q2zxds":
                                   dataTmp.typeId = "11" ;
                                   dataTmp.seleId = "01" ;
                                   break;
                               case "11x5_q2zxfs":
                                   dataTmp.typeId = "11" ;
                                   dataTmp.seleId = "02" ;
                                   break;
                               case "11x5_q3ds":
                                   dataTmp.typeId = "10" ;
                                   dataTmp.seleId = "01" ;
                                   break;
                               case "11x5_q3fs":
                                   dataTmp.typeId = "10" ;
                                   dataTmp.seleId = "10" ;
                                   break;
                               case "11x5_q3zxds":
                                   dataTmp.typeId = "12" ;
                                   dataTmp.seleId = "01" ;
                                   break;
                               case "11x5_q3zxfs":
                                   dataTmp.typeId = "12" ;
                                   dataTmp.seleId = "02" ;
                                   break;
                           }

                           return dataTmp;
                       }
                       return r;
                   }
                   //整合期次信息
                   function getIssues(fn) {
                       var r = []; //
                       action.getIssue({
                           lottery: "JX11X5",
                           issues: (X115Car.total.qi+1) || (X115_QI+1)
                       }, function(re) {
                           var rr = getRightIssue(X115_NOWQI,re,X115Car.total.qi || X115_QI)
                           r = merge(rr)
                           fn(r)
                       })
                       function getRightIssue(now,r,len){
                           var n=0;
                           var re=[];
                           for(var i=0;i< r.length;i++){
                               if(r[i].issue==now){
                                   n=i;
                                   for(var j=0;j<len;j++){
                                       re.push(r[n+j])
                                   }
                               }
                           }
                           return re;
                       }
                       function merge(list) {
                           var r = [];
                           $(list).each(function(index, item) {
                               r.push({
                                   issue: item.issue,
                                   multiple: X115Car.total.bei
                               })
                           })
                           return r;
                       }
                   }
                   return {
                       d: d,
                       getIssue: getIssues
                   };
               }

               function postBuy(fn) {
                   var u = userBuyData();
                   if (stop_control == false) return dialog("该彩种已经停售！");
                   if (stop_control == false) return dialog("该彩种已经停售！");
                   if (u == false) return dialog("购物车是空的！");
                   var udata = u.d;
                   dialog("loading", "正在投注！")
                   u.getIssue(function(r) {
                       if (!r || !r.length) dialog({
                           message: "投注异常，请重试",
                           autoHideDelay: 1000});
                       udata.lotoGson.issueArray = r;
                       udata.lotoGson = JSON.stringify(udata.lotoGson)
                       action.ssqTz(udata, function(re) {
                           TZ_INFO($.parseJSON(re), fn)
                       })
                   })
               }
           }

   }
    //广东
    var gd115 = function (){
        var X115_CAR = [],
        //投注倍数
            X115_BEI = 1,
        //投注期次
            X115_QI = 1,
        //是否追加
            X115_ZJ = false,
        //中奖是否停止追加
            X115_ZJSTOP = false,
            X115_NOWQI = null,
            CACHE_ID = 0,
            u_type="rx3",
            PlayTypeRule = cp.PlayTypeRule,
            CPCONFIG = cp.CONFIG,
            stop_control=true;
        var routes = {
            "/rx1": function() {
                rx1();
            },
            "/rx2": function() {
                rx2();
            },
            "/rx3": function() {
                rx3();
            },
            "/rx4": function() {
                rx4();
            },
            "/rx5": function() {
                rx5();
            },
            "/rx6": function() {
                rx6();
            },
            "/rx7": function() {
                rx7();
            },
            "/rx8": function() {
                rx8();
            },
            "/q2": function() {
                q2();
            },
            "/q3": function() {
                q3();
            },
            "/car": function() {
                car();
            },
            "index": function() {
                rx3();
            },
            "init": function() {
                init();
            }
        }
        Router(routes);
        function publicNmuberSelector(containerId, total, before) {
            return cp.numberSelect({
                min: 1,
                max: 11,
                ispad: true,
                numberSelectBefore: function(f) {
                    before && before(f);
                },
                numberSelectAfter: function(f) {
                    total()
                },
                numberUnSelectAfter: function(f) {
                    total()
                },
                //dom 类
                selectStyle: ".red_balls",
                //
                containerId: containerId
            })
        }
        function publicShow(v, title, type, text, fn) {
            $("#carfixed,#f3dcar,#tzsuccess").hide();
            $("#selectfc3d,#x115dplays,#jx11x5-history").show();
            $(".wzl-cartext").addClass("hidden")
            $(".ball-status-bar").addClass("disabled").html(text||"请选择号码")
            $("#x115dplays>div").not("#" + v).hide(function() {
                $('#' + v + ', #buycarfixedbtn').show();
                $('#' + v +" .red_balls").removeClass("active");
                $('.wzl-nav-dropdown').text("广东"+title).show();
                fn && fn();
            })
            u_type = type;
        }
        function publicTotal(number,type){
            var select = number.getSelected();
            var dstype = "11x5_"+type+"ds";
            var rule = PlayTypeRule[dstype]
            if(select && select.length && select.length>= type[1] ){
                var len = select.length,
                    count = 0,
                    price = 0;
                var lottery = formatLottery(select,dstype)
                if(len > rule.groupdef[0].required){
                    dstype = "11x5_"+type+"fs";
                    rule = PlayTypeRule[dstype]
                    lottery = formatLottery(select,dstype)
                }
                if(len <rule.groupdef[0].required){
                    $(".ball-status-bar").addClass("disabled").html("至少选择"+rule.groupdef[0].required+"个号码")
                    return ;
                }
                count = PlayTypeRule.count(lottery)
                price = count * CPCONFIG.GD11X5.UNIT_PRICE;
                $(".ball-status-bar").removeClass("disabled").html("共" + count + "注," + price + "元")
                $(".ball-status-bar").unbind().bind('click', function() {
                    number.clear();
                    lottery.X115_ID = ++CACHE_ID
                    X115_CAR.push(lottery);

                    location.href = "#!/car"
                });
            }else{
                //不够一注
                $(".ball-status-bar").addClass("disabled").html("至少选择"+rule.groupdef[0].required+"个号码")
                $(".ball-status-bar").unbind().bind('click', function() {
                   // dialog("请至少选择"+rule.groupdef[0].required+"个号码")
                    return false;
                });
            }
            $(".glyphicon.icon-trash").unbind().bind("click", function() {

                number.clear();
                publicTotal(number,type)
            })

            //增加自选号码  清除一下上一次的
            $('#car-addhm').unbind().bind('click',function(){
                number.clear();
            });
            $('.x115nav a').unbind().bind('click',function(){
                number.clear();
            });
            function  formatLottery(number,type){
                var groups = [{
                    dan: null,
                    tuo: number
                }]
                return {
                    code: type,
                    groups: groups
                }
            }
        }
        function init() {
            $('.wzl-nav-dropdown').unbind().bind("click", function() {
                dropdownMask.toggle();
            });
			$('.navbar-header').on('click','.icon-more',function(){
                	$('.drop-down-more').show();
            })
            $(".jc-match-i").unbind().bind("click", function() {
                $("#selectjc,#jc-match").slideToggle();
            });

            kjdjs();
            //开奖倒计时
            function kjdjs() {
                var issueA = []
                var timer = null;
                issue();
                function issue() {
                    clearInterval(timer);
                    action.getIssue({
                        lottery: "GD11X5",
                        issues: 25
                    }, function(re) {
                        //console.log(re);
                        issueA = re;
                        if (re[0].endTime <= 150) re = re.slice(1);
                        setIssue(re[0])
                    })
                    //设置期次信息
                    function setIssue(d) {
                        X115_NOWQI = d.issue;
                        setCountDown(d.endTime)
                        $(".history-bar").html(" <span>第" + d.issue + "期销售中</span><div class='pull-right history-bar-dropdown icon-dropdown-gray'> <span class='redballs'>00</span>时<span class='redballs'>00</span>分<span class='redballs'>00</span>秒</div>")

                        function setCountDown(s) {
                            timer = setInterval(function() {
                                s--;
                                if (s <= 150) {
                                    $('.history-bar').html("该其次已经截止,下一期预售中。")
                                    issue()
                                }
                                var v = formatSeconds(s - 150)
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
                    }
                }
            }
            //请求 userinfo 用于同步
            action.queryUserInfo({},function(){})


            action.querygd115({
                pageno: 1,
                pagesize: 10
            }, function(d) {
                // console.log(d);
                fomatIssue2(d.lotolist,'jx11x5-history')

                function fomatIssue2(d,name){
                    var arr=[];
                    for (var i = 0; i < d.length; i++) {
                        //////////console.log(d[i]);
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

            })

            //渲染遗漏
            action.yl('gd115',{},function (re){
                if(re.resultCode=='200'){
                    fomatYl(re.data);
                }else{

                }

            })
            function fomatYl(d){
                var allArr=d.split(",");
                ////////console.log(allArr);
                for (var i=6;i<=16;i++){
                    $('.yla em').eq(i-6).text(allArr[i])
                    $('.yla2 em').eq(i-6).text(allArr[i])
                    $('.yla3 em').eq(i-6).text(allArr[i])
                    $('.yla4 em').eq(i-6).text(allArr[i])
                    $('.yla5 em').eq(i-6).text(allArr[i])
                    $('.yla6 em').eq(i-6).text(allArr[i])
                    $('.yla7 em').eq(i-6).text(allArr[i])
                    $('.yla8 em').eq(i-6).text(allArr[i])
                }

            }

            $('.ballcon-yilou').unbind().bind('click', function (){
                $('.ballcon-right em').toggle()
            })
            //查询是否停售
            action.getControl(function(re){
                if(re[104]===false){
                    stop_control=false
                    dialog("该彩种已经停售!")
                }
            })
        }

        function rx1(){
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow("selectrx1", '11选5-任选一','rx1', "至少选择1个号码")
            var rx1N = publicNmuberSelector("#selectrx1",function(){
                publicTotal(rx1N,"r1")
            })
            Y_Y(function() {
                var n1 = cp.shuffle({
                    min: 1,
                    max: 11,
                    count: 1
                })
                rx1N.clear().select(n1)

            })
        }

        function rx2(){
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow("selectrx2", '11选5-任选二','rx2', "至少选择2个号码")
            var rx2N = publicNmuberSelector("#selectrx2",function(){
                publicTotal(rx2N,"r2")
            })
            Y_Y(function() {
                var n1 = cp.shuffle({
                    min: 1,
                    max: 11,
                    count: 2
                })
                rx2N.clear().select(n1)

            })
        }

        function rx3(){
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow("selectrx3", '11选5-任选三','rx3', "至少选择3个号码")
            var rx3N = publicNmuberSelector("#selectrx3",function(){
                publicTotal(rx3N,"r3")
            })
            Y_Y(function() {
                var n1 = cp.shuffle({
                    min: 1,
                    max: 11,
                    count: 3
                })
                rx3N.clear().select(n1)

            })
        }

        function rx4(){
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow("selectrx4", '11选5-任选四','rx4', "至少选择4个号码")
            var rx4N = publicNmuberSelector("#selectrx4",function(){
                publicTotal(rx4N,"r4")
            })
            Y_Y(function() {
                var n1 = cp.shuffle({
                    min: 1,
                    max: 11,
                    count: 4
                })
                rx4N.clear().select(n1)

            })

        }

        function rx5(){
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow("selectrx5", '11选5-任选五','rx5', "至少选择5个号码")
            var rx5N = publicNmuberSelector("#selectrx5",function(){
                publicTotal(rx5N,"r5")
            })
            Y_Y(function() {
                var n1 = cp.shuffle({
                    min: 1,
                    max: 11,
                    count: 5
                })
                rx5N.clear().select(n1)

            })
        }

        function rx6(){
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow("selectrx6", '11选5-任选六','rx6', "至少选择6个号码")
            var rx6N = publicNmuberSelector("#selectrx6",function(){
                publicTotal(rx6N,"r6")
            })
            Y_Y(function() {
                var n1 = cp.shuffle({
                    min: 1,
                    max: 11,
                    count: 6
                })
                rx6N.clear().select(n1)

            })
        }

        function rx7(){
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow("selectrx7", '11选5-任选七','rx7', "至少选择7个号码")
            var rx7N = publicNmuberSelector("#selectrx7",function(){
                publicTotal(rx7N,"r7")
            })
            Y_Y(function() {
                var n1 = cp.shuffle({
                    min: 1,
                    max: 11,
                    count: 7
                })
                rx7N.clear().select(n1)

            })
        }

        function rx8(){
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow("selectrx8", '11选5-任选八','rx8', "至少选择8个号码")
            var rx8N = publicNmuberSelector("#selectrx8",function(){
                publicTotal(rx8N,"r8")
            })
            Y_Y(function() {
                var n1 = cp.shuffle({
                    min: 1,
                    max: 11,
                    count: 8
                })
                rx8N.clear().select(n1)

            })
        }

        function q2(){
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow("selectq2", '11选5-前二','q2', "至少选择2个号码")
            //var q2N1 = publicNmuberSelector("#selectq2 .q2-1",total)
            //var q2N2 = publicNmuberSelector("#selectq2 .q2-2",total)
            var q2N1 = cp.numberSelect({
                min: 1,
                max: 11,
                ispad: true,
                numberSelectBefore: function(f) {
                    if(q2N1.isSelected(f)){
                        return true;
                    }
                    if(q2N2.isSelected(f)){
                        if(!$('.ui-mask').length){
                            dialog("相同号码不能组成有效注数！")
                        }
                        return false;
                    }
                },
                numberSelectAfter: function(f) {
                    total()
                },
                numberUnSelectAfter: function(f) {
                    total()
                },
                //dom 类
                selectStyle: ".red_balls",
                //
                containerId: "#selectq2 .q2-1"
            })
            var q2N2 = cp.numberSelect({
                min: 1,
                max: 11,
                ispad: true,
                numberSelectBefore: function(f) {
                    if(q2N2.isSelected(f)){
                        return true;
                    }
                    if(q2N1.isSelected(f)){
                        if(!$('.ui-mask').length){
                            dialog("相同号码不能组成有效注数！")
                        }
                        return false;
                    }
                },
                numberSelectAfter: function(f) {
                    total()
                },
                numberUnSelectAfter: function(f) {
                    total()
                },
                //dom 类
                selectStyle: ".red_balls",
                //
                containerId: "#selectq2 .q2-2"
            })
            function countNmuber(){
                var q2select1 = q2N1.getSelected();
                var q2select2 = q2N2.getSelected();
                var dstype = "11x5_q2ds";
                var rule = PlayTypeRule[dstype];

                if(!q2select1||!q2select2||!q2select1.length||!q2select2.length) {
                    return false;
                }
                if(q2select1.length>1||q2select2.length>1){
                    dstype =  "11x5_q2fs";
                }
                var groups = [{
                    dan: null,
                    tuo: q2select1
                },{
                    dan: null,
                    tuo: q2select2
                }]
                return {
                    code: dstype,
                    groups: groups
                }
            }
            function total(){
                var  n = countNmuber();
                if(n!=false){
                    var count = PlayTypeRule.count(n),
                        price = count * CPCONFIG.GD11X5.UNIT_PRICE;
                    $(".ball-status-bar").removeClass("disabled").html("共" + count + "注," + price + "元")
                    $(".ball-status-bar").unbind().bind('click', function() {
                        n.X115_ID = ++CACHE_ID
                        X115_CAR.push(n);
                        q2N1.clear();
                        q2N2.clear();
                        location.href = "#!/car"
                    });
                }else{
                    $(".ball-status-bar").addClass("disabled").html("至少选择2个号码")
                    $(".ball-status-bar").unbind().bind('click', function() {
                        //dialog("请至少选择2个号码")
                        return false;
                    });
                }
            }
            $(".glyphicon.icon-trash").unbind().bind("click", function() {
                q2N1.clear();
                q2N2.clear();
            })

            $('#car-addhm').unbind().bind('click',function(){
                q2N1.clear();
                q2N2.clear();
            });
            $('.x115nav a').unbind().bind('click',function(){
                q2N1.clear();
                q2N2.clear();
            });
            Y_Y(function() {
                var n1 = cp.shuffle({
                    min: 1,
                    max: 11,
                    count: 1
                })
                q2N1.clear().select(n1)
                var n1 = cp.shuffle({
                    min: 1,
                    max: 11,
                    count: 1
                })
                q2N2.clear().select(n1)

            })
        }

        function q3(){
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow("selectq3", '11选5-前三','q3', "至少选择3个号码")
            var q3N1 = cp.numberSelect({
                min: 1,
                max: 11,
                ispad: true,
                numberSelectBefore: function(f) {
                    if(q3N1.isSelected(f)){
                        return true;
                    }
                    if(q3N2.isSelected(f)||q3N3.isSelected(f)){
                        if(!$('.ui-mask').length){
                            dialog("相同号码不能组成有效注数！")
                        }
                        return false;
                    }
                },
                numberSelectAfter: function(f) {
                    total()
                },
                numberUnSelectAfter: function(f) {
                    total()
                },
                //dom 类
                selectStyle: ".red_balls",
                //
                containerId: "#selectq3 .q3-1"
            })
            var q3N2 = cp.numberSelect({
                min: 1,
                max: 11,
                ispad: true,
                numberSelectBefore: function(f) {
                    if(q3N2.isSelected(f)){
                        return true;
                    }
                    if(q3N1.isSelected(f)||q3N3.isSelected(f)){
                        if(!$('.ui-mask').length){
                            dialog("相同号码不能组成有效注数！")
                        }
                        return false;
                    }
                },
                numberSelectAfter: function(f) {
                    total()
                },
                numberUnSelectAfter: function(f) {
                    total()
                },
                //dom 类
                selectStyle: ".red_balls",
                //
                containerId:"#selectq3 .q3-2"
            })
            var q3N3 = cp.numberSelect({
                min: 1,
                max: 11,
                ispad: true,
                numberSelectBefore: function(f) {
                    if(q3N3.isSelected(f)){
                        return true;
                    }
                    if(q3N2.isSelected(f)||q3N1.isSelected(f)){
                        if(!$('.ui-mask').length){
                            dialog("相同号码不能组成有效注数！")
                        }
                        return false;
                    }
                },
                numberSelectAfter: function(f) {
                    total()
                },
                numberUnSelectAfter: function(f) {
                    total()
                },
                //dom 类
                selectStyle: ".red_balls",
                //
                containerId: "#selectq3 .q3-3"
            })
            function countNmuber(){
                var q3select1 = q3N1.getSelected();
                var q3select2 = q3N2.getSelected();
                var q3select3 = q3N3.getSelected();
                var dstype = "11x5_q3ds";
                var rule = PlayTypeRule[dstype];
                if(!q3select1||!q3select2||!q3select3||!q3select1.length||!q3select2.length||!q3select3.length) {
                    return false;
                }
                if(q3select1.length>1||q3select2.length>1||q3select3.length>1){
                    dstype =  "11x5_q3fs";
                }
                var groups = [{
                    dan: null,
                    tuo: q3select1
                },{
                    dan: null,
                    tuo: q3select2
                },{
                    dan: null,
                    tuo: q3select3
                }]
                return {
                    code: dstype,
                    groups: groups
                }
            }
            function total(){
                var  n = countNmuber();
                if(n!=false){
                    var count = PlayTypeRule.count(n),
                        price = count * CPCONFIG.GD11X5.UNIT_PRICE;
                    $(".ball-status-bar").removeClass("disabled").html("共" + count + "注," + price + "元")
                    $(".ball-status-bar").unbind().bind('click', function() {

                        n.X115_ID = ++CACHE_ID
                        X115_CAR.push(n);
                        q3N1.clear();
                        q3N2.clear();
                        q3N3.clear();
                        location.href = "#!/car"
                    });
                }else{
                    $(".ball-status-bar").addClass("disabled").html("至少选择3个号码")
                    $(".ball-status-bar").unbind().bind('click', function() {
                        //dialog("请至少选择3个号码")
                        return false;
                    });
                }
            }
            $(".glyphicon.icon-trash").unbind().bind("click", function() {
                q3N1.clear();
                q3N2.clear();
                q3N3.clear();
            })

            $('#car-addhm').unbind().bind('click',function(){
                q3N1.clear();
                q3N2.clear();
                q3N3.clear();
            });
            //选择任意玩法  清除一下上一次的
            $('.x115nav a').unbind().bind('click',function(){
                q3N1.clear();
                q3N2.clear();
                q3N3.clear();
            });
            Y_Y(function() {
                var n1 = cp.shuffle({
                    min: 1,
                    max: 11,
                    count: 1
                })
                q3N1.clear().select(n1)
                var n1 = cp.shuffle({
                    min: 1,
                    max: 11,
                    count: 1
                })
                q3N2.clear().select(n1)
                var n1 = cp.shuffle({
                    min: 1,
                    max: 11,
                    count: 1
                })
                q3N3.clear().select(n1)
            })

        }

        function car(){
            $('#selectfc3d,#jx11x5-history,.wzl-fixed').hide(function() {
                $(".wzl-nav-bar").children().eq(1).hide()
                $(".wzl-cartext").removeClass("hidden") //removeClass("icon-dropdown-pink").removeClass("wzl-nav-dropdown").html('双色球-购物车').click(function(){return false;})
                $(".ball-status-bar").addClass("disabled").html("请选择号码")
                $('#f3dcar,#carfixed').fadeIn();
                renderCar();
            });

            function renderCar() {
                if (X115_CAR.length) {
                    $("#car-no-select").addClass('hidden')
                    var result = countCar();
                    var listTemplate = Handlebars.compile($("#ball-select-item").html());
                    $("#ball-select-group").html(listTemplate({
                        list: result.list
                    }));
                    var totalTemplate = Handlebars.compile($("#car-total-template").html());
                    $('#car-total').html(totalTemplate(result.total))
                    $("#ssq_hm").unbind().bind("click", function() {
                        dialog('合买暂未开放！')
                    });
                    $('#ssq_buy').unbind().bind("click", function() {
                        $(this).attr("disabled")
                        //发送购买请求
                        postBuy(function(re) {
                            if (re.resultCode == "200") {
                                result.clear();
                                renderCar()
                                tzsuccess();
                            }
                        });
                    })
                    $("#ball-select-group  .ball-select-remove").unbind().bind("click", function() {
                        var $id = $(this).parent().data("id");
                        result.remove($id)
                        renderCar();
                    })

                } else {
                    $("#ball-select-group").html('')
                    $("#car-no-select").removeClass('hidden')
                    var result = countCar();
                    var totalTemplate = Handlebars.compile($("#car-total-template").html());
                    $('#car-total').html(totalTemplate(result.total))
                    $("#ssq_hm").unbind().bind("click", function() {
                        dialog('合买暂未开放！')
                    });
                    $('#ssq_buy').unbind().bind("click", function() {
                        dialog("购物车为空！")
                    }).addClass("disabled")
                }
                totalBoard(function(qi, bei, zjstop) {
                    X115_BEI = bei;
                    X115_QI = qi;
                    X115_ZJSTOP = zjstop;
                    renderCar();
                })
            }
            //统计最后数据 用于渲染
            function countCar() {
                var r = [],
                    car_count = 0,
                    car_price = 0,
                    total;
                for (var i = 0; i < X115_CAR.length; i++) {
                    var ritem = {}
                    ritem.count = PlayTypeRule.count(X115_CAR[i]);
                    ritem.price = ritem.count * CPCONFIG['GD11X5'].UNIT_PRICE;
                    ritem.redStr = type2str(X115_CAR[i].code,X115_CAR[i])
                    ritem.groups = X115_CAR[i].groups
                    ritem.type = type(X115_CAR[i].code)
                    ritem.code = X115_CAR[i].code;
                    ritem.id = X115_CAR[i].X115_ID
                    car_count += ritem.count
                    car_price += ritem.price
                    r.push(ritem)
                }
                function type2str(t,item,is){
                    var s = '';
                    //
                    s = item.groups[0].tuo.join(",")
                    if(t=="11x5_q2ds"){
                        s = item.groups[0].tuo.join(",")+","
                        s += item.groups[1].tuo.join(",")
                    }
                    if(t=="11x5_q3ds"){
                        s = item.groups[0].tuo.join(",")+","
                        s += item.groups[1].tuo.join(",")+","
                        s += item.groups[2].tuo.join(",")
                    }
                    if(t=="11x5_q2fs"){
                        s = item.groups[0].tuo.join(",")+ " | "
                        s += item.groups[1].tuo.join(",")
                    }
                    if(t=="11x5_q3fs"){
                        s = item.groups[0].tuo.join(",")+ " | "
                        s += item.groups[1].tuo.join(",")+ " | "
                        s += item.groups[2].tuo.join(",")
                    }
                    return s;
                }
                function type(t) {
                    var r = '';
                    switch (t) {
                        case "11x5_q1ds":
                            r = "前一单式";
                            break;
                        case "11x5_q1fs":
                            r = "前一复式";
                            break;
                        case "11x5_r1ds":
                            r = "任选一单式";
                            break;
                        case "11x5_r1fs":
                            r = "任选一复式";
                            break;
                        case "11x5_r2ds":
                            r = "任选二单式";
                            break;
                        case "11x5_r2fs":
                            r = "任选二复式";
                            break;
                        case "11x5_r2dt":
                            r = "任选二胆拖";
                            break;
                        case "11x5_r3ds":
                            r = "任选三单式";
                            break;
                        case "11x5_r3fs":
                            r = "任选三复式";
                            break;
                        case "11x5_r3dt":
                            r = "任选三胆拖";
                            break;
                        case "11x5_r4ds":
                            r = "任选四单式";
                            break;
                        case "11x5_r4fs":
                            r = "任选四复式";
                            break;
                        case "11x5_r4dt":
                            r = "任选四胆拖";
                            break;
                        case "11x5_r5ds":
                            r = "任选五单式";
                            break;
                        case "11x5_r5fs":
                            r = "任选五复式";
                            break;
                        case "11x5_r5dt":
                            r = "任选五胆拖";
                            break;
                        case "11x5_r6ds":
                            r = "任选六单式";
                            break;
                        case "11x5_r6fs":
                            r = "任选六复式";
                            break;
                        case "11x5_r6dt":
                            r = "任选六胆拖";
                            break;
                        case "11x5_r7ds":
                            r = "任选七单式";
                            break;
                        case "11x5_r7fs":
                            r = "任选七复式";
                            break;
                        case "11x5_r7dt":
                            r = "任选七胆拖";
                            break;
                        case "11x5_r8ds":
                            r = "任选八单式";
                            break;
                        case "11x5_r8fs":
                            r = "任选八复式";
                            break;
                        case "11x5_r8dt":
                            r = "任选八胆拖";
                            break;
                        case "11x5_q2ds":
                            r = "前二单式";
                            break;
                        case "11x5_q2fs":
                            r = "前二复式";
                            break;
                        case "11x5_q2zxds":
                            r = "前二组选单式";
                            break;
                        case "11x5_q2zxfs":
                            r = "前二组选复式";
                            break;
                        case "11x5_q3ds":
                            r = "前三单式";
                            break;
                        case "11x5_q3fs":
                            r = "前三复式";
                            break;
                        case "11x5_q3zxds":
                            r = "前三组选单式";
                            break;
                        case "11x5_q3zxfs":
                            r = "前三组选复式";
                            break;
                    }
                    return r;
                }
                function remove(id) {
                    for (var j = 0; j < X115_CAR.length; j++) {
                        if (X115_CAR[j].X115_ID == id) {
                            X115_CAR.splice(j, 1)
                        }
                    }
                }
                total = {
                    bei: X115_BEI,
                    qi: X115_QI,
                    count: car_count,
                    price: car_price * X115_QI * X115_BEI,
                    zjstop: X115_ZJSTOP,
                    zj: X115_ZJ
                }
                function clear() {
                    X115_CAR.length = 0;
                    X115_BEI = 1
                    X115_QI = 1
                    X115_ZJ = false
                    X115_ZJSTOP = false
                }
                return {
                    list: r,
                    count: car_count,
                    price: car_price,
                    remove: remove,
                    total: total,
                    clear: clear
                };
            }
            //统计面板事件 （期次 倍数 是否追号 等
            function totalBoard(fn) {
                var $qiInput = $("#ball-qc");
                var $beiInput = $("#ball-bei");
                var $zjInput = $('input#ball-zj');
                var $zjstopInput = $('input#ball-zjstop');
                var bei = $beiInput.val().trim(),
                    qi = $qiInput.val().trim(),
                    zjstop = $zjstopInput.prop('checked');
                //期次减
                // $("#car-total").delegate(".buy-bar-qcminus",
                $(".buy-bar-qcminus").unbind().bind('click', function() {
                    qi--;
                    qi = qi < 1 ? 1 : qi;
                    syanc();
                })
                //期次加
                $(".buy-bar-qcplus").unbind().bind('click', function() {
                    qi++;
                    qi = qi > 99 ? 99 : qi;
                    syanc();
                })
                //倍数减
                $(".buy-bar-beiminus").unbind().bind('click', function() {
                    bei--;
                    bei = bei < 1 ? 1 : bei;
                    syanc();
                })
                //倍数加
                $(".buy-bar-beiplus").unbind().bind('click', function() {
                    bei++;
                    bei = bei > 9999 ? 9999 : bei;
                    syanc();
                })
                $($qiInput).unbind().bind("keyup", function() {
                    var $val = $($qiInput).val();
                    $val = $val.replace(/\D/g, "")
                    $val = $val > 20 ? 20 : $val;
                    $(this).val($val)
                    qi = Number($val);
                    syanc();
                })
                $($beiInput).unbind().bind('keyup', function() {
                    var $val = $($beiInput).val();
                    $val = $val.replace(/\D/g, "")
                    $val = $val > 20 ? 20 : $val;
                    $(this).val($val)
                    bei = Number($val);
                    syanc();
                })
                $('input#ball-zjstop').unbind().bind('click', function() {
                    var $checked = $(this).prop('checked')
                    zjstop = $checked;
                    syanc();
                })

                function syanc() {
                    setTimeout(function() {
                        $qiInput.val(qi)
                        $beiInput.val(bei)
                        fn && fn(qi, bei, zjstop)
                    }, 100)
                }
            }
            //增加机选一注
            function getOneX115() {

                var X115={},count,type="",groups=[];
                switch(u_type){
                    case "rx1":
                        type="11x5_r1ds";
                        groups = [{
                            dan: null,
                            tuo: reNumber(1)
                        }]
                        break;
                    case "rx2":
                        type="11x5_r2ds";
                        groups = [{
                            dan: null,
                            tuo: reNumber(2)
                        }]
                        break;
                    case "rx3":
                        type="11x5_r3ds"
                        groups = [{
                            dan: null,
                            tuo: reNumber(3)
                        }]
                        break;
                    case "rx4":
                        type="11x5_r4ds"
                        groups = [{
                            dan: null,
                            tuo: reNumber(4)
                        }]
                        break;
                    case "rx5":
                        type="11x5_r5ds"
                        groups = [{
                            dan: null,
                            tuo: reNumber(5)
                        }]
                        break;
                    case "rx6":
                        type="11x5_r6ds"
                        groups = [{
                            dan: null,
                            tuo: reNumber(6)
                        }]
                        break;
                    case "rx7":
                        type="11x5_r7ds"
                        groups = [{
                            dan: null,
                            tuo: reNumber(7)
                        }]
                        break;
                    case "rx8":
                        type="11x5_r8ds"
                        groups = [{
                            dan: null,
                            tuo: reNumber(8)
                        }]
                        break;
                    case "q2":
                        type="11x5_q2ds"
                        groups = [{
                            dan: null,
                            tuo: reNumber(1)
                        },{
                            dan: null,
                            tuo: reNumber(1)
                        }]
                        break;
                    case "q3":
                        type="11x5_q3ds"
                        groups = [{
                            dan: null,
                            tuo: reNumber(1)
                        },{
                            dan: null,
                            tuo: reNumber(1)
                        },{
                            dan: null,
                            tuo: reNumber(1)
                        }]
                        break;
                    default:
                        type = "11x5_r3ds"
                        groups = [{
                            dan: null,
                            tuo: reNumber(3)
                        }]
                }
                X115.code =  type;
                X115.groups = groups;
                X115.X115_ID = ++CACHE_ID
                return X115;
                function reNumber(n){
                    return cp.shuffle({
                        min: 1,
                        max: 11,
                        padding: 1,
                        sort:true,
                        count: n
                    })
                }
            }
            $('#car-addhm').unbind().bind('click', function() {
                location.href = "#!/rx3"
                //history.go(-1);
            })
            $("#car-addjx").unbind().bind('click', function() {
                var X115 = getOneX115();
                X115_CAR.push(X115)
                renderCar();
            })
            $(".glyphicon.icon-trash").unbind().bind("click", function() {
                var s = countCar();
                s.clear();
                renderCar();
            })
            /*投注成功*/
            function tzsuccess() {
                $("#f3dcar,#selectX115,#carfixed").hide();
                $("#tzsuccess").show();
            }
            /**
             * 用户购买数据整合
             * @returns {*}
             */
            function userBuyData() {
                var X115Car = countCar()
                if (!X115Car) return null;
                var d = {
                    gameType: "104",
                    format: "ajax",
                    needPay: "",
                    lotoGson: {}
                }
                d.needPay = X115Car.total.price;
                //
                d.lotoGson = mergeTZ();
                /**
                 * 投注串 数据整合
                 */
                function mergeTZ() {
                    if (!X115Car) return false;
                    var need = {
                        //彩票类型
                        gameType: "104",
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
                    need.totalSum = Number(X115Car.total.price);
                    need.isStop = X115Car.total.zjstop ? 1 : 0;
                    need.buyNumberArray = buyArrayGenerator(X115Car.list)
                    need.buyType = X115Car.total.qi > 1 ? 1 : 0;
                    need.title = X115Car.total.qi > 1 ? "广东11选5" + X115_NOWQI + "期追号方案" : "广东11选5" + X115_NOWQI + "期追号方案";
                    // xian ajax =
                    return need;
                }
                function countQ2(j){
                    var r = [];
                    var g = j.groups[0].tuo;
                    var c = j.groups[1].tuo;
                    for (var h = 0; h < g.length; h++) {
                        var a = g[h];
                        for (var d = 0; d < c.length; d++) {
                            var f = c[d];
                            if (a == f) {
                                continue
                            }
                            var n = [a,f]
                            r.push({
                                code: "11x5_q2ds",
                                count: 1,
                                price: 2,
                                redStr: n.join(","),
                                type: "前2单式"
                            })
                        }
                    }
                    return r;
                }
                function countQ3(n){
                    var r = [];
                    var l = n.groups[0].tuo;
                    var e = n.groups[1].tuo;
                    var c = n.groups[2].tuo;
                    for (var m = 0; m < l.length; m++) {
                        var b = l[m];
                        for (var g = 0; g < e.length; g++) {
                            var k = e[g];
                            if (b === k) {
                                continue
                            }
                            for (var f = 0; f < c.length; f++) {
                                var a = c[f];
                                if (b === a || k === a) {
                                    continue
                                }
                                var n = [b,k,a]
                                r.push({
                                    code: "11x5_q3ds",
                                    count: 1,
                                    price: 2,
                                    redStr: n.join(","),
                                    type: "前3单式"
                                })
                            }
                        }
                    }
                    return r;
                }
                //投注号码串数据
                function buyArrayGenerator(list) {
                    var r = [];
                    $(list).each(function(index, item) {
                        if (!item) return;
                        var it;
                        if(item.code=="11x5_q2fs"){
                            var rr = countQ2(item)
                            $(rr).each(function(index, item2) {
                                r.push(join(item2))
                            })
                        }else if(item.code=="11x5_q3fs"){
                            var rr = countQ3(item)
                            $(rr).each(function(index, item2) {
                                r.push(join(item2))
                            })
                        }else{
                            it = join(item)
                        }
                        it && r.push(it);
                    })

                    function join(item) {
                        var dataTmp = {
                            "buyNumber": "",
                            "typeId": "00",
                            "seleId": "01",
                            "sum": 0.0
                        };
                        if (!item || !item.count) return false;
                        var rs = item.redStr.split(" ").join(",")
                        dataTmp.buyNumber = rs ;
                        dataTmp.sum = item.price;
                        dataTmp.multiple = X115Car.total.bei;
                        switch (item.code) {
                            case "11x5_r1ds":
                                dataTmp.typeId = "01" ;
                                dataTmp.seleId = "01" ;
                                break;
                            case "11x5_r1fs":
                                dataTmp.typeId = "01" ;
                                dataTmp.seleId = "02" ;
                                break;
                            case "11x5_r2ds":
                                dataTmp.typeId = "02" ;
                                dataTmp.seleId = "01" ;
                                break;
                            case "11x5_r2fs":
                                dataTmp.typeId = "02" ;
                                dataTmp.seleId = "02" ;
                                break;
                            case "11x5_r2dt":
                                dataTmp.typeId = "02" ;
                                dataTmp.seleId = "03" ;
                                break;
                            case "11x5_r3ds":
                                dataTmp.typeId = "03" ;
                                dataTmp.seleId = "01" ;
                                break;
                            case "11x5_r3fs":
                                dataTmp.typeId = "03" ;
                                dataTmp.seleId = "02" ;
                                break;
                            case "11x5_r3dt":
                                dataTmp.typeId = "03" ;
                                dataTmp.seleId = "03" ;
                                break;
                            case "11x5_r4ds":
                                dataTmp.typeId = "04" ;
                                dataTmp.seleId = "01" ;
                                break;
                            case "11x5_r4fs":
                                dataTmp.typeId = "04" ;
                                dataTmp.seleId = "02" ;
                                break;
                            case "11x5_r4dt":
                                dataTmp.typeId = "04" ;
                                dataTmp.seleId = "03" ;
                                break;
                            case "11x5_r5ds":
                                dataTmp.typeId = "05" ;
                                dataTmp.seleId = "01" ;
                                break;
                            case "11x5_r5fs":
                                dataTmp.typeId = "05" ;
                                dataTmp.seleId = "02" ;
                                break;
                            case "11x5_r5dt":
                                dataTmp.typeId = "05" ;
                                dataTmp.seleId = "03" ;
                                break;
                            case "11x5_r6ds":
                                dataTmp.typeId = "06" ;
                                dataTmp.seleId = "01" ;
                                break;
                            case "11x5_r6fs":
                                dataTmp.typeId = "06" ;
                                dataTmp.seleId = "02" ;
                                break;
                            case "11x5_r6dt":
                                dataTmp.typeId = "06" ;
                                dataTmp.seleId = "03" ;
                                break;
                            case "11x5_r7ds":
                                dataTmp.typeId = "07" ;
                                dataTmp.seleId = "01" ;
                                break;
                            case "11x5_r7fs":
                                dataTmp.typeId = "07" ;
                                dataTmp.seleId = "02" ;
                                break;
                            case "11x5_r7dt":
                                dataTmp.typeId = "07" ;
                                dataTmp.seleId = "03" ;
                                break;
                            case "11x5_r8ds":
                                dataTmp.typeId = "08" ;
                                dataTmp.seleId = "01" ;
                                break;
                            case "11x5_r8fs":
                                dataTmp.typeId = "08" ;
                                dataTmp.seleId = "02" ;
                                break;
                            case "11x5_r8dt":
                                dataTmp.typeId = "08" ;
                                dataTmp.seleId = "03" ;
                                break;
                            case "11x5_q2ds":
                                dataTmp.typeId = "09" ;
                                dataTmp.seleId = "01" ;
                                break;
                            case "11x5_q2fs":
                                dataTmp.typeId = "09" ;
                                dataTmp.seleId = "02" ;
                                break;
                            case "11x5_q2zxds":
                                dataTmp.typeId = "11" ;
                                dataTmp.seleId = "01" ;
                                break;
                            case "11x5_q2zxfs":
                                dataTmp.typeId = "11" ;
                                dataTmp.seleId = "02" ;
                                break;
                            case "11x5_q3ds":
                                dataTmp.typeId = "10" ;
                                dataTmp.seleId = "01" ;
                                break;
                            case "11x5_q3fs":
                                dataTmp.typeId = "10" ;
                                dataTmp.seleId = "10" ;
                                break;
                            case "11x5_q3zxds":
                                dataTmp.typeId = "12" ;
                                dataTmp.seleId = "01" ;
                                break;
                            case "11x5_q3zxfs":
                                dataTmp.typeId = "12" ;
                                dataTmp.seleId = "02" ;
                                break;
                        }

                        return dataTmp;
                    }
                    return r;
                }
                //整合期次信息
                function getIssues(fn) {
                    var r = []; //
                    action.getIssue({
                        lottery: "GD11X5",
                        issues: (X115Car.total.qi+1) || (X115_QI+1)
                    }, function(re) {
                        var rr = getRightIssue(X115_NOWQI,re,X115Car.total.qi || X115_QI)
                        r = merge(rr)
                        fn(r)
                    })
                    function getRightIssue(now,r,len){
                        var n=0;
                        var re=[];
                        for(var i=0;i< r.length;i++){
                            if(r[i].issue==now){
                                n=i;
                                for(var j=0;j<len;j++){
                                    re.push(r[n+j])
                                }
                            }
                        }
                        return re;
                    }
                    function merge(list) {
                        var r = [];
                        $(list).each(function(index, item) {
                            r.push({
                                issue: item.issue,
                                multiple: X115Car.total.bei
                            })
                        })
                        return r;
                    }
                }
                return {
                    d: d,
                    getIssue: getIssues
                };
            }

            function postBuy(fn) {
                var u = userBuyData();

                if (stop_control == false) return dialog("该彩种已经停售！");
                if (u == false) return dialog("购物车是空的！");
                var udata = u.d;
                dialog("loading", "正在投注！")
                u.getIssue(function(r) {
                    if (!r || !r.length) dialog("投注异常，请重试")
                    udata.lotoGson.issueArray = r;
                    udata.lotoGson = JSON.stringify(udata.lotoGson)
                    action.ssqTz(udata, function(re) {
                        TZ_INFO($.parseJSON(re), fn)
                    })
                })
            }
        }
    }
    //山东
    var sd115 = function (){
        var X115_CAR = [],
        //投注倍数
            X115_BEI = 1,
        //投注期次
            X115_QI = 1,
        //是否追加
            X115_ZJ = false,
        //中奖是否停止追加
            X115_ZJSTOP = false,
            X115_NOWQI = null,
            CACHE_ID = 0,
            u_type="rx3",
            PlayTypeRule = cp.PlayTypeRule,
            CPCONFIG = cp.CONFIG,
            stop_control=true;
        var routes = {
            "/rx1": function() {
                rx1();
            },
            "/rx2": function() {
                rx2();
            },
            "/rx3": function() {
                rx3();
            },
            "/rx4": function() {
                rx4();
            },
            "/rx5": function() {
                rx5();
            },
            "/rx6": function() {
                rx6();
            },
            "/rx7": function() {
                rx7();
            },
            "/rx8": function() {
                rx8();
            },
            "/q2": function() {
                q2();
            },
            "/q3": function() {
                q3();
            },
            "/car": function() {
                car();
            },
            "index": function() {
                rx3();
            },
            "init": function() {
                init();
            }
        }
        Router(routes);
        function publicNmuberSelector(containerId, total, before) {
            return cp.numberSelect({
                min: 1,
                max: 11,
                ispad: true,
                numberSelectBefore: function(f) {
                    before && before(f);
                },
                numberSelectAfter: function(f) {
                    total()
                },
                numberUnSelectAfter: function(f) {
                    total()
                },
                //dom 类
                selectStyle: ".red_balls",
                //
                containerId: containerId
            })
        }

        function publicShow(v, title, type, text, fn) {
            $("#carfixed,#f3dcar,#tzsuccess").hide();
            $("#selectfc3d,#x115dplays,#jx11x5-history").show();
            $(".wzl-cartext").addClass("hidden")
            $(".ball-status-bar").addClass("disabled").html(text||"请选择号码")
            $("#x115dplays>div").not("#" + v).hide(function() {
                $('#' + v + ', #buycarfixedbtn').show();
                $('#' + v +" .red_balls").removeClass("active");
                $('.wzl-nav-dropdown').text("山东"+title).show();
                fn && fn();
            })
            u_type = type;
        }
        function publicTotal(number,type){
            var select = number.getSelected();
            var dstype = "11x5_"+type+"ds";
            var rule = PlayTypeRule[dstype]
            if(select && select.length && select.length>=type[1]){
                var len = select.length,
                    count = 0,
                    price = 0;
                var lottery = formatLottery(select,dstype)
                if(len > rule.groupdef[0].required){
                    dstype = "11x5_"+type+"fs";
                    rule = PlayTypeRule[dstype]
                    lottery = formatLottery(select,dstype)
                }
                if(len <rule.groupdef[0].required){
                    $(".ball-status-bar").addClass("disabled").html("至少选择"+rule.groupdef[0].required+"个号码")
                    return ;
                }
                count = PlayTypeRule.count(lottery)
                price = count * CPCONFIG.GD11X5.UNIT_PRICE;
                $(".ball-status-bar").removeClass("disabled").html("共" + count + "注," + price + "元")
                $(".ball-status-bar").unbind().bind('click', function() {
                    lottery.X115_ID = ++CACHE_ID
                    X115_CAR.push(lottery);
                    number.clear();
                    location.href = "#!/car"
                });


            }else{
                //不够一注

                //number.clear();
                $(".ball-status-bar").addClass("disabled").html("至少选择"+rule.groupdef[0].required+"个号码")
                $(".ball-status-bar").unbind().bind('click', function() {
                    //dialog("请至少选择"+rule.groupdef[0].required+"个号码")
                    //number.clear();

                    return false;
                });
            }
            $(".glyphicon.icon-trash").unbind().bind("click", function() {
                number.clear();
                publicTotal(number,type)
            })
            //增加自选号码  清除一下上一次的
            $('#car-addhm').unbind().bind('click',function(){
                number.clear();
            });
            //选择任意玩法  清除一下上一次的
            $('.x115nav a').unbind().bind('click',function(){
                number.clear();
            });

            function  formatLottery(number,type){
                var groups = [{
                    dan: null,
                    tuo: number
                }]
                return {
                    code: type,
                    groups: groups
                }
            }
        }
        function init() {
            $('.wzl-nav-dropdown').unbind().bind("click", function() {
                dropdownMask.toggle();
            });
			$('.navbar-header').on('click','.icon-more',function(){
                	$('.drop-down-more').toggle();
            })
            $(".jc-match-i").unbind().bind("click", function() {
                $("#selectjc,#jc-match").slideToggle();
            });

            kjdjs();
            //开奖倒计时
            function kjdjs() {
                var issueA = []
                var timer = null;
                issue();
                function issue() {
                    clearInterval(timer);
                    action.getIssue({
                        lottery: "SD11X5",
                        issues: 25
                    }, function(re) {
                        //console.log(re);
                        issueA = re;
                        if (re[0].endTime <= 150) re = re.slice(1);
                        setIssue(re[0])
                    })
                    //设置期次信息
                    function setIssue(d) {
                        X115_NOWQI = d.issue;
                        setCountDown(d.endTime)
                        $(".history-bar").html(" <span>第" + d.issue + "期销售中</span><div class='pull-right history-bar-dropdown icon-dropdown-gray'> <span class='redballs'>00</span>时<span class='redballs'>00</span>分<span class='redballs'>00</span>秒</div>")

                        function setCountDown(s) {
                            timer = setInterval(function() {
                                s--;
                                if (s <= 150) {
                                    $('.history-bar').html("该其次已经截止,下一期预售中。")
                                    issue()
                                }
                                var v = formatSeconds(s - 150)
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
                    }
                }
            }
            //请求 userinfo 用于同步
            action.queryUserInfo({},function(){})


            action.querysd11x5({
                pageno: 1,
                pagesize: 10
            }, function(d) {
                // console.log(d);
                fomatIssue2(d.lotolist,'jx11x5-history')

                function fomatIssue2(d,name){
                    var arr=[];
                    for (var i = 0; i < d.length; i++) {
                        //////////console.log(d[i]);
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

            })

            //渲染遗漏
            action.yl('sd11x5',{},function (re){
                if(re.resultCode=='200'){
                    fomatYl(re.data);
                }else{

                }

            })
            function fomatYl(d){
                var allArr=d.split(",");
                ////////console.log(allArr);
                for (var i=6;i<=16;i++){
                    $('.yla em').eq(i-6).text(allArr[i])
                    $('.yla2 em').eq(i-6).text(allArr[i])
                    $('.yla3 em').eq(i-6).text(allArr[i])
                    $('.yla4 em').eq(i-6).text(allArr[i])
                    $('.yla5 em').eq(i-6).text(allArr[i])
                    $('.yla6 em').eq(i-6).text(allArr[i])
                    $('.yla7 em').eq(i-6).text(allArr[i])
                    $('.yla8 em').eq(i-6).text(allArr[i])
                }

            }

            $('.ballcon-yilou').unbind().bind('click', function (){
                $('.ballcon-right em').toggle()
            })
            //查询是否停售
            action.getControl(function(re){
                if(re[107]===false){
                    stop_control=false
                    dialog("该彩种已经停售!")
                }
            })
        }

        function rx1(){
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow("selectrx1", '11选5-任选一','rx1', "至少选择1个号码");
           // var select = rx1N.getSelected();
            //alert(select);
            var rx1N = publicNmuberSelector("#selectrx1",function(){
                publicTotal(rx1N,"r1");

            })
            Y_Y(function() {
                var n1 = cp.shuffle({
                    min: 1,
                    max: 11,
                    count: 1
                })
                rx1N.clear().select(n1)
            })
        }

        function rx2(){
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow("selectrx2", '11选5-任选二','rx2', "至少选择2个号码")
            var rx2N = publicNmuberSelector("#selectrx2",function(){
                publicTotal(rx2N,"r2")
            })
            Y_Y(function() {
                var n1 = cp.shuffle({
                    min: 1,
                    max: 11,
                    count: 2
                })
                rx2N.clear().select(n1);

            })
        }

        function rx3(){
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow("selectrx3", '11选5-任选三','rx3', "至少选择3个号码")
            var rx3N = publicNmuberSelector("#selectrx3",function(){
                publicTotal(rx3N,"r3")
            })
            Y_Y(function() {
                var n1 = cp.shuffle({
                    min: 1,
                    max: 11,
                    count: 3
                })
                rx3N.clear().select(n1);

            })
        }

        function rx4(){
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow("selectrx4", '11选5-任选四','rx4', "至少选择4个号码")
            var rx4N = publicNmuberSelector("#selectrx4",function(){
                publicTotal(rx4N,"r4")
            })
            Y_Y(function() {
                var n1 = cp.shuffle({
                    min: 1,
                    max: 11,
                    count: 4
                })
                rx4N.clear().select(n1);

            })

        }

        function rx5(){
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow("selectrx5", '11选5-任选五','rx5', "至少选择5个号码")
            var rx5N = publicNmuberSelector("#selectrx5",function(){
                publicTotal(rx5N,"r5")
            })
            Y_Y(function() {
                var n1 = cp.shuffle({
                    min: 1,
                    max: 11,
                    count: 5
                })
                rx5N.clear().select(n1);

            })
        }

        function rx6(){
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow("selectrx6", '11选5-任选六','rx6', "至少选择6个号码")
            var rx6N = publicNmuberSelector("#selectrx6",function(){
                publicTotal(rx6N,"r6")
            })
            Y_Y(function() {
                var n1 = cp.shuffle({
                    min: 1,
                    max: 11,
                    count: 6
                })
                rx6N.clear().select(n1);

            })
        }

        function rx7(){
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow("selectrx7", '11选5-任选七','rx7', "至少选择7个号码")
            var rx7N = publicNmuberSelector("#selectrx7",function(){
                publicTotal(rx7N,"r7")
            })
            Y_Y(function() {
                var n1 = cp.shuffle({
                    min: 1,
                    max: 11,
                    count: 7
                })
                rx7N.clear().select(n1);

            })
        }

        function rx8(){
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow("selectrx8", '11选5-任选八','rx8', "至少选择8个号码")
            var rx8N = publicNmuberSelector("#selectrx8",function(){
                publicTotal(rx8N,"r8")
            })
            Y_Y(function() {
                var n1 = cp.shuffle({
                    min: 1,
                    max: 11,
                    count: 8
                })
                rx8N.clear().select(n1);

            })
        }

        function q2(){
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow("selectq2", '11选5-前二','q2', "至少选择2个号码")

            var q2N1 = cp.numberSelect({
                min: 1,
                max: 11,
                ispad: true,
                numberSelectBefore: function(f) {
                    if(q2N1.isSelected(f)){
                        return true;
                    }
                    if(q2N2.isSelected(f)){
                        //避免选增加自选号码 弹窗出现两个
                        if(!$('.ui-mask').length){
                            dialog("相同号码不能组成有效注数！")
                        }
                        return false;
                    }
                },
                numberSelectAfter: function(f) {
                    total()
                },
                numberUnSelectAfter: function(f) {
                    total()
                },
                //dom 类
                selectStyle: ".red_balls",
                //
                containerId: "#selectq2 .q2-1"
            })
            var q2N2 = cp.numberSelect({
                min: 1,
                max: 11,
                ispad: true,
                numberSelectBefore: function(f) {
                    if(q2N2.isSelected(f)){
                        return true;
                    }
                    if(q2N1.isSelected(f)){
                        if(!$('.ui-mask').length){
                        dialog("相同号码不能组成有效注数！")
                        }
                        return false;
                    }
                },
                numberSelectAfter: function(f) {
                    total()
                },
                numberUnSelectAfter: function(f) {
                    total()
                },
                //dom 类
                selectStyle: ".red_balls",
                //
                containerId: "#selectq2 .q2-2"
            })
//            var q2N2 = publicNmuberSelector("#selectq2 .q2-2",total,function(f){
//                if(q2N2.isSelected(f)){
//                    return true;
//                }
//                if(q2N1.isSelected(f)){
//                    //dialog("相同号码不能组成有效注数！")
//                    //alert(1);
//                    return false;
//                }
//            })
            function countNmuber(){
                var q2select1 = q2N1.getSelected();
                var q2select2 = q2N2.getSelected();
                var dstype = "11x5_q2ds";
                var rule = PlayTypeRule[dstype];

                if(!q2select1||!q2select2||!q2select1.length||!q2select2.length) {
                    return false;
                }
                if(q2select1.length>1||q2select2.length>1){
                    dstype =  "11x5_q2fs";
                }
                var groups = [{
                    dan: null,
                    tuo: q2select1
                },{
                    dan: null,
                    tuo: q2select2
                }]
                return {
                    code: dstype,
                    groups: groups
                }
            }
            function total(){
                var  n = countNmuber();
                if(n!=false){
                    var count = PlayTypeRule.count(n),
                        price = count * CPCONFIG.GD11X5.UNIT_PRICE;
                    $(".ball-status-bar").removeClass("disabled").html("共" + count + "注," + price + "元")
                    $(".ball-status-bar").unbind().bind('click', function() {
                        n.X115_ID = ++CACHE_ID
                        X115_CAR.push(n);
                        q2N1.clear();
                        q2N2.clear();
                        location.href = "#!/car"
                    });
                }else{
                    $(".ball-status-bar").addClass("disabled").html("至少选择2个号码")
                    $(".ball-status-bar").unbind().bind('click', function() {
                        //dialog("请至少选择2个号码");
                        return false;
                    });
                }
            }
            $(".glyphicon.icon-trash").unbind().bind("click", function() {
                q2N1.clear();
                q2N2.clear();
            })

            $('#car-addhm').unbind().bind('click',function(){
                q2N1.clear();
                q2N2.clear();

            });
            //选择任意玩法  清除一下上一次的
            $('.x115nav a').unbind().bind('click',function(){
                q2N1.clear();
                q2N2.clear();
            });
            Y_Y(function() {
                var n1 = cp.shuffle({
                    min: 1,
                    max: 11,
                    count: 1
                })
                q2N1.clear().select(n1);
                var n1 = cp.shuffle({
                    min: 1,
                    max: 11,
                    count: 1
                })
                q2N2.clear().select(n1);

            })
        }

        function q3(){
            //选择玩法后如果记录是显示的让他隐藏
            $('.history-list').hide();
            publicShow("selectq3", '11选5-前三','q3', "至少选择3个号码")
            var q3N1 = cp.numberSelect({
                min: 1,
                max: 11,
                ispad: true,
                numberSelectBefore: function(f) {
                    if(q3N1.isSelected(f)){
                        return true;
                    }
                    if(q3N2.isSelected(f)||q3N3.isSelected(f)){
                        if(!$('.ui-mask').length){
                            dialog("相同号码不能组成有效注数！")
                        }
                        return false;
                    }
                },
                numberSelectAfter: function(f) {
                    total()
                },
                numberUnSelectAfter: function(f) {
                    total()
                },
                //dom 类
                selectStyle: ".red_balls",
                //
                containerId: "#selectq3 .q3-1"
            })
            var q3N2 = cp.numberSelect({
                min: 1,
                max: 11,
                ispad: true,
                numberSelectBefore: function(f) {
                    if(q3N2.isSelected(f)){
                        return true;
                    }
                    if(q3N1.isSelected(f)||q3N3.isSelected(f)){
                        if(!$('.ui-mask').length){
                            dialog("相同号码不能组成有效注数！")
                        }
                        return false;
                    }
                },
                numberSelectAfter: function(f) {
                    total()
                },
                numberUnSelectAfter: function(f) {
                    total()
                },
                //dom 类
                selectStyle: ".red_balls",
                //
                containerId:"#selectq3 .q3-2"
            })
            var q3N3 = cp.numberSelect({
                min: 1,
                max: 11,
                ispad: true,
                numberSelectBefore: function(f) {
                    if(q3N3.isSelected(f)){
                        return true;
                    }
                    if(q3N2.isSelected(f)||q3N1.isSelected(f)){
                        if(!$('.ui-mask').length){
                            dialog("相同号码不能组成有效注数！")
                        }
                        return false;
                    }
                },
                numberSelectAfter: function(f) {
                    total()
                },
                numberUnSelectAfter: function(f) {
                    total()
                },
                //dom 类
                selectStyle: ".red_balls",
                //
                containerId: "#selectq3 .q3-3"
            })
            function countNmuber(){
                var q3select1 = q3N1.getSelected();
                var q3select2 = q3N2.getSelected();
                var q3select3 = q3N3.getSelected();
                var dstype = "11x5_q3ds";
                var rule = PlayTypeRule[dstype];
                if(!q3select1||!q3select2||!q3select3||!q3select1.length||!q3select2.length||!q3select3.length) {
                    return false;
                }
                if(q3select1.length>1||q3select2.length>1||q3select3.length>1){
                    dstype =  "11x5_q3fs";
                }
                var groups = [{
                    dan: null,
                    tuo: q3select1
                },{
                    dan: null,
                    tuo: q3select2
                },{
                    dan: null,
                    tuo: q3select3
                }]
                return {
                    code: dstype,
                    groups: groups
                }
            }
            function total(){
                var  n = countNmuber();
                if(n!=false){
                    var count = PlayTypeRule.count(n),
                        price = count * CPCONFIG.GD11X5.UNIT_PRICE;
                    $(".ball-status-bar").removeClass("disabled").html("共" + count + "注," + price + "元")
                    $(".ball-status-bar").unbind().bind('click', function() {

                        n.X115_ID = ++CACHE_ID
                        X115_CAR.push(n);
                        q3N1.clear();
                        q3N2.clear();
                        q3N3.clear();
                        location.href = "#!/car"
                    });
                }else{
                    $(".ball-status-bar").addClass("disabled").html("至少选择3个号码")
                    $(".ball-status-bar").unbind().bind('click', function() {
                        //dialog("请至少选择3个号码")
                        return false;
                    });
                }
            }
            $(".glyphicon.icon-trash").unbind().bind("click", function() {
                q3N1.clear();
                q3N2.clear();
                q3N3.clear();
            })

            $('#car-addhm').unbind().bind('click',function(){
                q3N1.clear();
                q3N2.clear();
                q3N3.clear();
            });
            //选择任意玩法  清除一下上一次的
            $('.x115nav a').unbind().bind('click',function(){
                q3N1.clear();
                q3N2.clear();
                q3N3.clear();
            });
            Y_Y(function() {
                var n1 = cp.shuffle({
                    min: 1,
                    max: 11,
                    count: 1
                })
                q3N1.clear().select(n1);
                var n1 = cp.shuffle({
                    min: 1,
                    max: 11,
                    count: 1
                })
                q3N2.clear().select(n1);
                var n1 = cp.shuffle({
                    min: 1,
                    max: 11,
                    count: 1
                })
                q3N3.clear().select(n1);

            })

        }

        function car(){
            $('#selectfc3d,#jx11x5-history,.wzl-fixed').hide(function() {
                $(".wzl-nav-bar").children().eq(1).hide()
                $(".wzl-cartext").removeClass("hidden") //removeClass("icon-dropdown-pink").removeClass("wzl-nav-dropdown").html('双色球-购物车').click(function(){return false;})
                $(".ball-status-bar").addClass("disabled").html("请选择号码")
                $('#f3dcar,#carfixed').fadeIn();
                renderCar();
            });

            function renderCar() {
                if (X115_CAR.length) {
                    $("#car-no-select").addClass('hidden')
                    var result = countCar();
                    var listTemplate = Handlebars.compile($("#ball-select-item").html());
                    $("#ball-select-group").html(listTemplate({
                        list: result.list
                    }));
                    var totalTemplate = Handlebars.compile($("#car-total-template").html());
                    $('#car-total').html(totalTemplate(result.total))
                    $("#ssq_hm").unbind().bind("click", function() {
                        dialog('合买暂未开放！')
                    });
                    $('#ssq_buy').unbind().bind("click", function() {
                        $(this).attr("disabled")
                        //发送购买请求
                        postBuy(function(re) {
                            if (re.resultCode == "200") {
                                result.clear();
                                renderCar()
                                tzsuccess();
                            }
                        });
                    })
                    $("#ball-select-group  .ball-select-remove").unbind().bind("click", function() {
                        var $id = $(this).parent().data("id");
                        result.remove($id)
                        renderCar();
                    })

                } else {
                    $("#ball-select-group").html('')
                    $("#car-no-select").removeClass('hidden')
                    var result = countCar();
                    var totalTemplate = Handlebars.compile($("#car-total-template").html());
                    $('#car-total').html(totalTemplate(result.total))
                    $("#ssq_hm").unbind().bind("click", function() {
                        dialog('合买暂未开放！')
                    });
                    $('#ssq_buy').unbind().bind("click", function() {
                        dialog("购物车为空！")
                    }).addClass("disabled")
                }
                totalBoard(function(qi, bei, zjstop) {
                    X115_BEI = bei;
                    X115_QI = qi;
                    X115_ZJSTOP = zjstop;
                    renderCar();
                })
            }
            //统计最后数据 用于渲染
            function countCar() {
                var r = [],
                    car_count = 0,
                    car_price = 0,
                    total;
                for (var i = 0; i < X115_CAR.length; i++) {
                    var ritem = {}
                    ritem.count = PlayTypeRule.count(X115_CAR[i]);
                    ritem.price = ritem.count * CPCONFIG['GD11X5'].UNIT_PRICE;
                    ritem.redStr = type2str(X115_CAR[i].code,X115_CAR[i])
                    ritem.groups = X115_CAR[i].groups
                    ritem.type = type(X115_CAR[i].code)
                    ritem.code = X115_CAR[i].code;
                    ritem.id = X115_CAR[i].X115_ID
                    car_count += ritem.count
                    car_price += ritem.price
                    r.push(ritem)
                }
                function type2str(t,item,is){
                    var s = '';
                    //
                    s = item.groups[0].tuo.join(",")
                    if(t=="11x5_q2ds"){
                        s = item.groups[0].tuo.join(",")+","
                        s += item.groups[1].tuo.join(",")
                    }
                    if(t=="11x5_q3ds"){
                        s = item.groups[0].tuo.join(",")+","
                        s += item.groups[1].tuo.join(",")+","
                        s += item.groups[2].tuo.join(",")
                    }
                    if(t=="11x5_q2fs"){
                        s = item.groups[0].tuo.join(",")+ " | "
                        s += item.groups[1].tuo.join(",")
                    }
                    if(t=="11x5_q3fs"){
                        s = item.groups[0].tuo.join(",")+ " | "
                        s += item.groups[1].tuo.join(",")+ " | "
                        s += item.groups[2].tuo.join(",")
                    }
                    return s;
                }
                function type(t) {
                    var r = '';
                    switch (t) {
                        case "11x5_q1ds":
                            r = "前一单式";
                            break;
                        case "11x5_q1fs":
                            r = "前一复式";
                            break;
                        case "11x5_r1ds":
                            r = "任选一单式";
                            break;
                        case "11x5_r1fs":
                            r = "任选一复式";
                            break;
                        case "11x5_r2ds":
                            r = "任选二单式";
                            break;
                        case "11x5_r2fs":
                            r = "任选二复式";
                            break;
                        case "11x5_r2dt":
                            r = "任选二胆拖";
                            break;
                        case "11x5_r3ds":
                            r = "任选三单式";
                            break;
                        case "11x5_r3fs":
                            r = "任选三复式";
                            break;
                        case "11x5_r3dt":
                            r = "任选三胆拖";
                            break;
                        case "11x5_r4ds":
                            r = "任选四单式";
                            break;
                        case "11x5_r4fs":
                            r = "任选四复式";
                            break;
                        case "11x5_r4dt":
                            r = "任选四胆拖";
                            break;
                        case "11x5_r5ds":
                            r = "任选五单式";
                            break;
                        case "11x5_r5fs":
                            r = "任选五复式";
                            break;
                        case "11x5_r5dt":
                            r = "任选五胆拖";
                            break;
                        case "11x5_r6ds":
                            r = "任选六单式";
                            break;
                        case "11x5_r6fs":
                            r = "任选六复式";
                            break;
                        case "11x5_r6dt":
                            r = "任选六胆拖";
                            break;
                        case "11x5_r7ds":
                            r = "任选七单式";
                            break;
                        case "11x5_r7fs":
                            r = "任选七复式";
                            break;
                        case "11x5_r7dt":
                            r = "任选七胆拖";
                            break;
                        case "11x5_r8ds":
                            r = "任选八单式";
                            break;
                        case "11x5_r8fs":
                            r = "任选八复式";
                            break;
                        case "11x5_r8dt":
                            r = "任选八胆拖";
                            break;
                        case "11x5_q2ds":
                            r = "前二单式";
                            break;
                        case "11x5_q2fs":
                            r = "前二复式";
                            break;
                        case "11x5_q2zxds":
                            r = "前二组选单式";
                            break;
                        case "11x5_q2zxfs":
                            r = "前二组选复式";
                            break;
                        case "11x5_q3ds":
                            r = "前三单式";
                            break;
                        case "11x5_q3fs":
                            r = "前三复式";
                            break;
                        case "11x5_q3zxds":
                            r = "前三组选单式";
                            break;
                        case "11x5_q3zxfs":
                            r = "前三组选复式";
                            break;
                    }
                    return r;
                }
                function remove(id) {
                    for (var j = 0; j < X115_CAR.length; j++) {
                        if (X115_CAR[j].X115_ID == id) {
                            X115_CAR.splice(j, 1)
                        }
                    }
                }
                total = {
                    bei: X115_BEI,
                    qi: X115_QI,
                    count: car_count,
                    price: car_price * X115_QI * X115_BEI,
                    zjstop: X115_ZJSTOP,
                    zj: X115_ZJ
                }
                function clear() {
                    X115_CAR.length = 0;
                    X115_BEI = 1
                    X115_QI = 1
                    X115_ZJ = false
                    X115_ZJSTOP = false
                }
                return {
                    list: r,
                    count: car_count,
                    price: car_price,
                    remove: remove,
                    total: total,
                    clear: clear
                };
            }
            //统计面板事件 （期次 倍数 是否追号 等
            function totalBoard(fn) {
                var $qiInput = $("#ball-qc");
                var $beiInput = $("#ball-bei");
                var $zjInput = $('input#ball-zj');
                var $zjstopInput = $('input#ball-zjstop');
                var bei = $beiInput.val().trim(),
                    qi = $qiInput.val().trim(),
                    zjstop = $zjstopInput.prop('checked');
                //期次减
                // $("#car-total").delegate(".buy-bar-qcminus",
                $(".buy-bar-qcminus").unbind().bind('click', function() {
                    qi--;
                    qi = qi < 1 ? 1 : qi;
                    syanc();
                })
                //期次加
                $(".buy-bar-qcplus").unbind().bind('click', function() {
                    qi++;
                    qi = qi > 99 ? 99 : qi;
                    syanc();
                })
                //倍数减
                $(".buy-bar-beiminus").unbind().bind('click', function() {
                    bei--;
                    bei = bei < 1 ? 1 : bei;
                    syanc();
                })
                //倍数加
                $(".buy-bar-beiplus").unbind().bind('click', function() {
                    bei++;
                    bei = bei > 9999 ? 9999 : bei;
                    syanc();
                })
                $($qiInput).unbind().bind("keyup", function() {
                    var $val = $($qiInput).val();
                    $val = $val.replace(/\D/g, "")
                    $val = $val > 20 ? 20 : $val;
                    $(this).val($val)
                    qi = Number($val);
                    syanc();
                })
                $($beiInput).unbind().bind('keyup', function() {
                    var $val = $($beiInput).val();
                    $val = $val.replace(/\D/g, "")
                    $val = $val > 20 ? 20 : $val;
                    $(this).val($val)
                    bei = Number($val);
                    syanc();
                })
                $('input#ball-zjstop').unbind().bind('click', function() {
                    var $checked = $(this).prop('checked')
                    zjstop = $checked;
                    syanc();
                })

                function syanc() {
                    setTimeout(function() {
                        $qiInput.val(qi)
                        $beiInput.val(bei)
                        fn && fn(qi, bei, zjstop)
                    }, 100)
                }
            }
            //增加机选一注
            function getOneX115() {

                var X115={},count,type="",groups=[];
                switch(u_type){
                    case "rx1":
                        type="11x5_r1ds";
                        groups = [{
                            dan: null,
                            tuo: reNumber(1)
                        }]
                        break;
                    case "rx2":
                        type="11x5_r2ds";
                        groups = [{
                            dan: null,
                            tuo: reNumber(2)
                        }]
                        break;
                    case "rx3":
                        type="11x5_r3ds"
                        groups = [{
                            dan: null,
                            tuo: reNumber(3)
                        }]
                        break;
                    case "rx4":
                        type="11x5_r4ds"
                        groups = [{
                            dan: null,
                            tuo: reNumber(4)
                        }]
                        break;
                    case "rx5":
                        type="11x5_r5ds"
                        groups = [{
                            dan: null,
                            tuo: reNumber(5)
                        }]
                        break;
                    case "rx6":
                        type="11x5_r6ds"
                        groups = [{
                            dan: null,
                            tuo: reNumber(6)
                        }]
                        break;
                    case "rx7":
                        type="11x5_r7ds"
                        groups = [{
                            dan: null,
                            tuo: reNumber(7)
                        }]
                        break;
                    case "rx8":
                        type="11x5_r8ds"
                        groups = [{
                            dan: null,
                            tuo: reNumber(8)
                        }]
                        break;
                    case "q2":
                        type="11x5_q2ds"
                        groups = [{
                            dan: null,
                            tuo: reNumber(1)
                        },{
                            dan: null,
                            tuo: reNumber(1)
                        }]
                        break;
                    case "q3":
                        type="11x5_q3ds"
                        groups = [{
                            dan: null,
                            tuo: reNumber(1)
                        },{
                            dan: null,
                            tuo: reNumber(1)
                        },{
                            dan: null,
                            tuo: reNumber(1)
                        }]
                        break;
                    default:
                        type = "11x5_r3ds"
                        groups = [{
                            dan: null,
                            tuo: reNumber(3)
                        }]
                }
                X115.code =  type;
                X115.groups = groups;
                X115.X115_ID = ++CACHE_ID
                return X115;
                function reNumber(n){
                    return cp.shuffle({
                        min: 1,
                        max: 11,
                        padding: 1,
                        sort:true,
                        count: n
                    })
                }
            }
            $('#car-addhm').unbind().bind('click', function() {
                window.location.href = "#!/rx3";



                //history.go(-1);
                //location.reload();
                //opener.location.reload();
            })
            $("#car-addjx").unbind().bind('click', function() {
                var X115 = getOneX115();
                X115_CAR.push(X115)
                renderCar();
            })
            $(".glyphicon.icon-trash").unbind().bind("click", function() {
                var s = countCar();
                s.clear();
                renderCar();
            })
            /*投注成功*/
            function tzsuccess() {
                $("#f3dcar,#selectX115,#carfixed").hide();
                $("#tzsuccess").show();
            }
            /**
             * 用户购买数据整合
             * @returns {*}
             */
            function userBuyData() {
                var X115Car = countCar()
                if (!X115Car) return null;
                var d = {
                    gameType: "107",
                    format: "ajax",
                    needPay: "",
                    lotoGson: {}
                }
                d.needPay = X115Car.total.price;
                //
                d.lotoGson = mergeTZ();
                /**
                 * 投注串 数据整合
                 */
                function mergeTZ() {
                    if (!X115Car) return false;
                    var need = {
                        //彩票类型
                        gameType: "107",
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
                    need.totalSum = Number(X115Car.total.price);
                    need.isStop = X115Car.total.zjstop ? 1 : 0;
                    need.buyNumberArray = buyArrayGenerator(X115Car.list)
                    need.buyType = X115Car.total.qi > 1 ? 1 : 0;
                    need.title = X115Car.total.qi > 1 ? "山东11选5" + X115_NOWQI + "期追号方案" : "山东11选5" + X115_NOWQI + "期追号方案";
                    // xian ajax =
                    return need;
                }
                function countQ2(j){
                    var r = [];
                    var g = j.groups[0].tuo;
                    var c = j.groups[1].tuo;
                    for (var h = 0; h < g.length; h++) {
                        var a = g[h];
                        for (var d = 0; d < c.length; d++) {
                            var f = c[d];
                            if (a == f) {
                                continue
                            }
                            var n = [a,f]
                            r.push({
                                code: "11x5_q2ds",
                                count: 1,
                                price: 2,
                                redStr: n.join(","),
                                type: "前2单式"
                            })
                        }
                    }
                    return r;
                }
                function countQ3(n){
                    var r = [];
                    var l = n.groups[0].tuo;
                    var e = n.groups[1].tuo;
                    var c = n.groups[2].tuo;
                    for (var m = 0; m < l.length; m++) {
                        var b = l[m];
                        for (var g = 0; g < e.length; g++) {
                            var k = e[g];
                            if (b === k) {
                                continue
                            }
                            for (var f = 0; f < c.length; f++) {
                                var a = c[f];
                                if (b === a || k === a) {
                                    continue
                                }
                                var n = [b,k,a]
                                r.push({
                                    code: "11x5_q3ds",
                                    count: 1,
                                    price: 2,
                                    redStr: n.join(","),
                                    type: "前3单式"
                                })
                            }
                        }
                    }
                    return r;
                }
                //投注号码串数据
                function buyArrayGenerator(list) {
                    var r = [];
                    $(list).each(function(index, item) {
                        if (!item) return;
                        var it;
                        if(item.code=="11x5_q2fs"){
                            var rr = countQ2(item)
                            $(rr).each(function(index, item2) {
                                r.push(join(item2))
                            })
                        }else if(item.code=="11x5_q3fs"){
                            var rr = countQ3(item)
                            $(rr).each(function(index, item2) {
                                r.push(join(item2))
                            })
                        }else{
                            it = join(item)
                        }
                        it && r.push(it);
                    })

                    function join(item) {
                        var dataTmp = {
                            "buyNumber": "",
                            "typeId": "00",
                            "seleId": "01",
                            "sum": 0.0
                        };
                        if (!item || !item.count) return false;
                        var rs = item.redStr.split(" ").join(",")
                        dataTmp.buyNumber = rs ;
                        dataTmp.sum = item.price;
                        dataTmp.multiple = X115Car.total.bei;
                        switch (item.code) {
                            case "11x5_r1ds":
                                dataTmp.typeId = "01" ;
                                dataTmp.seleId = "01" ;
                                break;
                            case "11x5_r1fs":
                                dataTmp.typeId = "01" ;
                                dataTmp.seleId = "02" ;
                                break;
                            case "11x5_r2ds":
                                dataTmp.typeId = "02" ;
                                dataTmp.seleId = "01" ;
                                break;
                            case "11x5_r2fs":
                                dataTmp.typeId = "02" ;
                                dataTmp.seleId = "02" ;
                                break;
                            case "11x5_r2dt":
                                dataTmp.typeId = "02" ;
                                dataTmp.seleId = "03" ;
                                break;
                            case "11x5_r3ds":
                                dataTmp.typeId = "03" ;
                                dataTmp.seleId = "01" ;
                                break;
                            case "11x5_r3fs":
                                dataTmp.typeId = "03" ;
                                dataTmp.seleId = "02" ;
                                break;
                            case "11x5_r3dt":
                                dataTmp.typeId = "03" ;
                                dataTmp.seleId = "03" ;
                                break;
                            case "11x5_r4ds":
                                dataTmp.typeId = "04" ;
                                dataTmp.seleId = "01" ;
                                break;
                            case "11x5_r4fs":
                                dataTmp.typeId = "04" ;
                                dataTmp.seleId = "02" ;
                                break;
                            case "11x5_r4dt":
                                dataTmp.typeId = "04" ;
                                dataTmp.seleId = "03" ;
                                break;
                            case "11x5_r5ds":
                                dataTmp.typeId = "05" ;
                                dataTmp.seleId = "01" ;
                                break;
                            case "11x5_r5fs":
                                dataTmp.typeId = "05" ;
                                dataTmp.seleId = "02" ;
                                break;
                            case "11x5_r5dt":
                                dataTmp.typeId = "05" ;
                                dataTmp.seleId = "03" ;
                                break;
                            case "11x5_r6ds":
                                dataTmp.typeId = "06" ;
                                dataTmp.seleId = "01" ;
                                break;
                            case "11x5_r6fs":
                                dataTmp.typeId = "06" ;
                                dataTmp.seleId = "02" ;
                                break;
                            case "11x5_r6dt":
                                dataTmp.typeId = "06" ;
                                dataTmp.seleId = "03" ;
                                break;
                            case "11x5_r7ds":
                                dataTmp.typeId = "07" ;
                                dataTmp.seleId = "01" ;
                                break;
                            case "11x5_r7fs":
                                dataTmp.typeId = "07" ;
                                dataTmp.seleId = "02" ;
                                break;
                            case "11x5_r7dt":
                                dataTmp.typeId = "07" ;
                                dataTmp.seleId = "03" ;
                                break;
                            case "11x5_r8ds":
                                dataTmp.typeId = "08" ;
                                dataTmp.seleId = "01" ;
                                break;
                            case "11x5_r8fs":
                                dataTmp.typeId = "08" ;
                                dataTmp.seleId = "02" ;
                                break;
                            case "11x5_r8dt":
                                dataTmp.typeId = "08" ;
                                dataTmp.seleId = "03" ;
                                break;
                            case "11x5_q2ds":
                                dataTmp.typeId = "09" ;
                                dataTmp.seleId = "01" ;
                                break;
                            case "11x5_q2fs":
                                dataTmp.typeId = "09" ;
                                dataTmp.seleId = "02" ;
                                break;
                            case "11x5_q2zxds":
                                dataTmp.typeId = "11" ;
                                dataTmp.seleId = "01" ;
                                break;
                            case "11x5_q2zxfs":
                                dataTmp.typeId = "11" ;
                                dataTmp.seleId = "02" ;
                                break;
                            case "11x5_q3ds":
                                dataTmp.typeId = "10" ;
                                dataTmp.seleId = "01" ;
                                break;
                            case "11x5_q3fs":
                                dataTmp.typeId = "10" ;
                                dataTmp.seleId = "10" ;
                                break;
                            case "11x5_q3zxds":
                                dataTmp.typeId = "12" ;
                                dataTmp.seleId = "01" ;
                                break;
                            case "11x5_q3zxfs":
                                dataTmp.typeId = "12" ;
                                dataTmp.seleId = "02" ;
                                break;
                        }

                        return dataTmp;
                    }
                    return r;
                }
                //整合期次信息
                function getIssues(fn) {
                    var r = []; //
                    action.getIssue({
                        lottery: "SD11X5",
                        issues: (X115Car.total.qi+1) || (X115_QI+1)
                    }, function(re) {
                        var rr = getRightIssue(X115_NOWQI,re,X115Car.total.qi || X115_QI)
                        r = merge(rr)
                        fn(r)
                    })
                    function getRightIssue(now,r,len){
                        var n=0;
                        var re=[];
                        for(var i=0;i< r.length;i++){
                            if(r[i].issue==now){
                                n=i;
                                for(var j=0;j<len;j++){
                                    re.push(r[n+j])
                                }
                            }
                        }
                        return re;
                    }
                    function merge(list) {
                        var r = [];
                        $(list).each(function(index, item) {
                            r.push({
                                issue: item.issue,
                                multiple: X115Car.total.bei
                            })
                        })
                        return r;
                    }
                }
                return {
                    d: d,
                    getIssue: getIssues
                };
            }

            function postBuy(fn) {
                var u = userBuyData();
                if (stop_control == false) return dialog("该彩种已经停售！");
                if (u == false) return dialog("购物车是空的！");
                var udata = u.d;
                dialog("loading", "正在投注！")
                u.getIssue(function(r) {
                    if (!r || !r.length) dialog("投注异常，请重试")
                    udata.lotoGson.issueArray = r;
                    udata.lotoGson = JSON.stringify(udata.lotoGson)
                    action.ssqTz(udata, function(re) {
                        TZ_INFO($.parseJSON(re), fn)
                    })
                })
            }
        }
    }

    return {
        jx11x5 : jx11x5,
        gd115  : gd115,
        sd115  : sd115

    }

});