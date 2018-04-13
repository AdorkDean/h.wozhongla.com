define(function (require, exports, module) {
    var $ = require("jquery");
    var ui = require("ui");
    var domain = "http://issue.wozhongla.com";
    var host = domain + "/bonus/";
    var callback = "&format=jsonp&callback=?";
    var timeout = 30000;

    //处理错误
    function respondError(re) {
        ui.loader("hide");
       // ui.alert(re.statusText+","+re.status);
        if (re.statusText == "timeout") {
            ui.warning("数据请求超时", "请检查网络连接是否正常");
        } else {
            ui.warning("请求信息有误", "请稍后访问");
        }
    }

//获取数字彩开奖号码列表
    function getNewResult(list, fn) {
        var ids = typeof(list) == "object" ? list.join(",") : list;
        var url = host + 'getNumberNewBonus.vhtml?lotId=' + ids + callback;
        $.ajax({
        	
            url: url,
            timeout: timeout,
            dataType: 'jsonp',
            success: function (data) {
                if (!data.data || data.data.result !== "01001" || !data.data.numberList) return fn(false);
                var data = data.data.numberList;
                fn(data);
            },
            error: function (re) {
                respondError(re)
            }
        })
    }

//获取数字彩开奖号码列表
    function getResultList(obj, fn) {
        var lotId = obj.lotId || "001";
        var startIssue = obj.startIssue ? "&startIssue=" + obj.startIssue : "";
        var endIssue = obj.endIssue ? "&endIssue=" + obj.endIssue : "";
        var pageNo = obj.pageNo || 1;
        var pageNum = obj.pageNum || 30;
        var url = host + 'getBonusList.vhtml?lotId=' + lotId + startIssue + endIssue + '&pageNo=' + pageNo + '&pageNum=' + pageNum + callback;

        $.ajax({
            url: url,
            timeout: timeout,
            dataType: 'jsonp',
            success: function (data) {
                if (!data.data || data.data.result !== "01001" || !data.data.numberList) return fn(false);
                var data = data.data.numberList;
                fn(data);
            },
            error: function (re) {
                respondError(re)
            }
        })

    }


//获取数字彩开奖详情
    function getResultDetail(lotId, issue, fn) {
        var url = host + 'getBonus.vhtml?lotId=' + lotId + '&lotIssue=' + issue + callback;
        $.ajax({
            url: url,
            timeout: timeout,
            dataType: 'jsonp',
            success: function (data) {
                if (!data.data || data.data.result !== "01001" || !data.data.numberList) return fn(false);
                var data = data.data.numberList[0];
                fn(data);
            },
            error: function (re) {
                respondError(re)
            }
        })

    }


//获得足彩开奖对阵
    function getZcMatch(obj, fn) {
        var lotId = obj.lotId,
            lotIssue = obj.lotIssue;
        var url = domain + '/issue/getMatch.vhtml?lotId=' + lotId + '&matchNo=' + lotIssue + callback;
        $.ajax({
            url: url,
            timeout: timeout,
            dataType: 'jsonp',
            success: function (data) {
                if (!data.data || data.data.result !== "01001" || !data.data.matchList) return fn(false);
                var data = data.data.matchList;
                fn(data);
            },
            error: function (re) {
                respondError(re)
            }
        })
    }


//获取竞彩开奖号码列表
    function getJcResult(lotId, issue, fn) {
        var lotId = lotId || 301;
        var url = host + 'getBonusJCZQ.vhtml?lotId=' + lotId + '&issueNum=' + issue + callback;
        $.ajax({
            url: url,
            timeout: timeout,
            dataType: 'jsonp',
            success: function (data) {
                if (!data.data || data.data.result !== "01001" || data.data.numberList) return fn(false);
                var data = data.data.issueList;
                fn(data);
            },
            error: function (re) {
                respondError(re)
            }
        })
    }

//获取排列型彩种图表
    function getChartsPl(lotId, size, fn) {
        var lotId = lotId || 002;
        var size = size || 50;
        var url = domain + '/charts/getHighLotteryCharts.vhtml?lotId=' + lotId + '&size=' + size + callback


        $.ajax({
            url: url,
            timeout: timeout,
            dataType: 'jsonp',
            success: function (data) {
                fn && fn(data);
            },
            error: function (re) {
                respondError(re)
            }
        })
    }

//获取乐透型彩种图表
    function getChartsLt(lotId, size, fn) {
        var lotId = lotId || 001;
        var size = size || 50;
        var url = domain + '/charts/getCommonOmitList.vhtml?lotId=' + lotId + '&size=' + size + callback;
        $.ajax({
            url: url,
            timeout: timeout,
            dataType: 'jsonp',
            success: function (data) {
                fn && fn(data);
            },
            error: function (re) {
                respondError(re)
            }
        })
    }

//获得老版开奖信息
    function getChartOld(obj, fn,hideErrorInfo) {
        var LotID = obj.lotId || "51";
        var ChartID = obj.chartId || "20001";
        var IssueTop = obj.row || 30;
        var ChartType = obj.chartType || 0;
        var url = 'http://www.wozhongla.com/api/getChart.php?path=LotID='+LotID+'_ChartID='+ChartID+'_ChartType='+ChartType+'_IssueTop='+IssueTop + callback
        $.ajax({
            url: url,
            timeout: timeout,
            dataType: 'jsonp',
            success: function (data) {
                if (!data || !data.data) return fn(false);
                fn(data.data);
            },
            error: function (re) {
                if (!hideErrorInfo) respondError(re)
            }
        })
    }


//获取版本号
    function getVersion(fn) {

        var url = "http://www.wozhongla.com/api/jsonp.php?path=../app/LotteryResultVersion.html" + callback;
        $.ajax({
            url: url,
            timeout: timeout,
            dataType: 'jsonp',
            success: function (data) {
                if (!data || !data.version) return fn(false);
                fn(data);
            },
            error: function (re) {}
        })
    }


    return {
        getNewResult: getNewResult,
        getResultDetail: getResultDetail,
        getChartOld: getChartOld,
        getResultList: getResultList,
        getJcResult: getJcResult,
        getZcMatch: getZcMatch,
        getChartsPl: getChartsPl,
        getVersion: getVersion,
        getChartsLt: getChartsLt
    }

})