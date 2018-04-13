define("about", ["lib/jquery-2.1.1.js","lib/jquery.tap-0.2.9","ui","action"], function (require, exports, module) {
    var $ = require("jquery");
    require("jquery.tap")($);
    var ui = require("ui");
    var ac = require("action");
    ui.backbutton(ui.backExit);
    function init() {
        $("#exitApp").tap(function(){
            ui.backExit();
        })

        $("#footerNav li").click(function(){
            var href = $(this).data("href");
            if (href) location.href = href;
        })
        if (navigator.userAgent.indexOf("4.0 Mobile Safari/5")>-1){
            $("#checkVersionGroup").hide();
        }
        $("#version").html(VERSION);
        $("#checkVersion").tap(function(){
            ui.loader("show");
            ac.getVersion(function(data){
                if (!data) ui.alert("获取版本信息出错！");
                ui.loader("hide");
                ui.checkVersion(data);
            });
        })


        $("#clearCache").tap(function(){
            window.localStorage.clear()
            ui.alert("缓存已经成功清除");
        })

    }

    return {
        init: init
    }
});