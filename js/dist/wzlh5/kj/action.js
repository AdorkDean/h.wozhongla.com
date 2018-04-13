define("wzlh5/kj/action", ["wzlh5/kj/jquery-2.1.1"], function (require, exports, module) {
    var $ = require("wzlh5/kj/jquery-2.1.1");
    var domain = "http://116.213.75.151:8083/"
    var host = domain+"bonus/";
    var callback = "&format=jsonp&callback=?";



    //获取数字彩开奖号码列表
    function getNewResult(list, fn) {
       var ids = typeof(list)== "object" ? list.join(",") : list;
        var url = host + 'getNumberNewBonus.vhtml?lotId=' + ids + callback;
        $.getJSON(url, function (data) {
            if (!data.data || data.data.result !== "01001" || !data.data.numberList) return fn(false);
            var data = data.data.numberList;
            fn(data);
        })
    }
    //获取数字彩开奖号码列表
    function getResultList(obj, fn) {
        var lotId = obj.lotId || "001";
        var startIssue = obj.startIssue ? "&startIssue="+obj.startIssue : "";
        var endIssue = obj.endIssue ? "&endIssue="+obj.endIssue : "";
        var pageNo = obj.pageNo || 1;
        var pageNum = obj.pageNum || 30;
        var url = host + 'getBonusList.vhtml?lotId='+lotId + startIssue + endIssue +'&pageNo='+pageNo+'&pageNum=' + pageNum + callback;
        $.getJSON(url, function (data) {

            if (!data.data || data.data.result !== "01001" || !data.data.numberList) return fn(false);
            var data = data.data.numberList;
            fn(data);
        })
    }


    //获取数字彩开奖号码列表
    function getResultDetail(lotId,issue, fn) {
        var url = host + 'getBonus.vhtml?lotId='+lotId +'&lotIssue=' + issue + callback;
        $.getJSON(url, function (data) {
            console.log(data)
            if (!data.data || data.data.result !== "01001" || !data.data.numberList) return fn(false);
            var data = data.data.numberList[0];
            fn(data);
        })
    }


    //获取竞彩开奖号码列表
    function getJcResult(lotId, issue, fn) {
        var lotId = lotId || 301;
        var url = host + 'getBonusJCZQ.vhtml?lotId='+lotId+'&issueNum=' + issue + callback;
        $.getJSON(url, function (data) {
            if (!data.data || data.data.result !== "01001" || data.data.numberList) return false;
            var data = data.data.issueList;
            fn(data);
        })
    }

    return {
        getNewResult: getNewResult,
        getResultDetail:getResultDetail,
        getResultList:getResultList,
        getJcResult: getJcResult
    }

});