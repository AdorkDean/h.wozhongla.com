define(function (require, exports, module) {
    var $ = require("jquery");

    function tip(a,b){
        var b = b || ""
        return '<div class="no-data"><div class="h1">'+a+'</div><div class="h2">'+b+'</div></div>';
    }

    function warning(a,b){
        var b = b || ""
        $("header").after('<div class="warning"><div class="h1">'+a+'</div><div class="h2">'+b+'</div></div>');
    }

    function loader (val){
        $("#loader").remove();
        if (!val||val=="hide") return false;
        h ='<div class="loader" id="loader">加载中</div>';
        $("body").prepend(h);
        return false;
    }

    //把A标签绑定tap
    function bindTap(){
        $('a').on('click', function() {
            return false;
        }).tap(function(){
            location.href =$(this).attr("href");
            $(this).attr("href","javascript:")
        })
    }

    //foot

    function ready(fn){
        document.addEventListener("deviceready", fn, false);
    }
    //按下安卓下的返回按钮
    function backbutton(fn) {
        document.addEventListener("deviceready", function () {
            document.addEventListener("backbutton", fn, false);
        }, false);
    }



    //退出
    function backExit() {
        navigator.notification.confirm(
            '确认退出开奖大全？',
            function (val) {
                val == 2 && navigator.app.exitApp();
            },
            '退出提示',
            ['不退出', '退出']
        );
    }
    //返回到指定页面
    function toHref(href) {
        var href = href || "index.html";
        location.href = href;
    }

    //检查版本
    function checkVersion(data){
        if (data.version <= VERSION){
            alert(
                "恭喜您使用的是最新版本。",
                function(){},
                "版本检查",
                "知道了"
            );
        }else{
            navigator.notification.confirm(
                data.msg.join("\r\n"),
                function (val) {
                    val == 1 && window.open(data.path);
                },
                "V"+data.version+"升级提示",
                ['马上升级', '残忍拒绝']
            );

        }
    }
    function alert(a,b,c,d){
        if (navigator.notification && navigator.notification.alert){
            var b = b || function(){};
            var c = c || "信息提示"
            var d= d || "知道了";
            return navigator.notification.alert(a,b,c,d);
        }
        window.alert(a);
    }




    return {
        backExit: backExit,
        tip:tip,
        loader:loader,
        bindTap:bindTap,
        warning:warning,
        alert:alert,
        checkVersion:checkVersion,
        toHref:toHref,
        ready:ready,
        backbutton: backbutton
    };
})

