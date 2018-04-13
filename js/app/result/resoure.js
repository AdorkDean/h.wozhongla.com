/**
 * Created by hebo (razr409355439@gmail.com)on 15/1/12.
 */
(function(exports){

    var INF_CONFIG = 'http://api.wozhongla.com/';
    var TZ_CONFIG = 'http://www.wozhongla.com/';
    var resultAPI =  TZ_CONFIG +
        "sp2/act/inter.info.action?wAgent=8848&" +
        "wPassword=888888&wReturnFmt=2&&wReturnFmt=2&" +
        "wAction=1012&wParam=areaId=35&format=jsonp&callback=?";

    var ssqAPI = TZ_CONFIG +
        "sp2/act/inter.info.action?wAgent=8848&" +
        "wPassword=888888&wReturnFmt=2&&wAction=1014&"

        exports.resultResoure = {
        fetchAll:function(cb){
            $.ajax({
                type: "GET",
                cache: false,
                url: resultAPI,
                dataType: 'json',
                success: function(re) {
                    cb&&cb(re)
                },
                error: function(re) {
                    cb&&cb([])
                }
            })
        },
        fetchSsq:function(data,cb){
            console.log(data)
            var wparamStr = 'wParam=lotId=51_pageno='
                + data.pageno + "_pagesize="
                + data.pagesize + "_startIssue=_endIssue=&";
            $.ajax({
                type: 'GET',
                url: ssqAPI + wparamStr + 'format=jsonp&callback=?',
                dataType: 'json',
                success: function(d) {
                    console.log(d)
                    cb && cb(d)
                },
                error: function(re) {
                    cb && cb([])
                }
            })
        },
        fetchDetail:function(id,cb){

        }
    }
})(window)
