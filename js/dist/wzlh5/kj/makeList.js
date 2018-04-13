define("wzlh5/kj/home",["wzlh5/kj/jquery-2.1.1","wzlh5/kj/lotteryArgs","wzlh5/kj/lib","wzlh5/kj/ui"],function (require, exports, module) {
    var $ = require("wzlh5/kj/jquery-2.1.1");
	var lib = require("wzlh5/kj/lib");
	var ui = require("wzlh5/kj/ui");
    var args = require("wzlh5/kj/lotteryArgs");
	var l = lib.log;
	var z = lib.z;
	var url = 'http://www.wozhongla.com/sp2/act/inter.info.action?wAgent=8848&wPassword=888888&wReturnFmt=2&&wReturnFmt=2&wAction=1012&wParam=areaId=35&format=jsonp&callback=?';
	var lotoIds  = [51,52,23528,23529,10022,33,35]
	function init(){
		
		$.getJSON(url,function(data){
			l(data)
			var o = lib.listToObject(data);
			l(o)
			
			$("#resultLIst").html(ui.getList(o,lotoIds));
		})
	}
	
	
	
    return {
		init:init
	};

});