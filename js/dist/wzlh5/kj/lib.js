define("wzlh5/kj/lib", ["wzlh5/kj/jquery-2.1.1"], function (require, exports, module) {
    var $ = require("wzlh5/kj/jquery-2.1.1");

    function log(obj) {
        if (window.console && console.log) {
            console.log(obj);
        }
    }

    //弹出对象的各个属性
    function z(val, n) {
        if (typeof val !== "object") return alert(val);
        var arr = [];
        for (var key in val) arr.push(key + " = " + val[key]);
        return alert(arr.join(n || "\n\r"));
    }

    function listToObject(list) {
        var o = {}
        for (var i = 0; i < list.length; i++) {
            if (list[i] && list[i].lotteryId) o[list[i].lotteryId] = list[i];
        }
        return o;
    }

    //得到日期及星期，val是否取得星期
    function getWeek(val) {
        var data = val ? new Date(val) : new Date();
        return "日一二三四五六".charAt(data.getDay());
    }

    //url/对象互转
    function href() {
        var url = location.search;
        json = {};
        if (url.indexOf("?") === -1) return {};
        var arr = url.substr(1).split("&");
        for (var i = 0, len = arr.length; i < len; i++) {
            json[arr[i].split("=")[0]] = unescape(arr[i].split("=")[1]);
        }
        return json;
    }

    //获得大小单双
    function getDxds(val) {
        var val = parseInt(val, 10);
        var h = val < 5 ? "小" : "大";
        return h += val % 2 === 1 ? "单" : "双";
    }


    //格式化号码
    function formatBall(a,b){
        if (a.indexOf(" ") > -1){
            a = a.split(" ").join(",")
            if (b) b = b.split(" ").join(",")
        }else if(a.indexOf(",") >-1){
            a = a
        }else {
            a = a.split("").join(",");
            if (b) b = b.split("").join(",")
        }
        return b ? a+"#"+b : a;
    }


    //生成号码
    function makeBall(ball) {
        if (!ball) return "";

        var h = '';
        if (ball.indexOf("#") > -1) {
            var a = ball.split("#");
            var a0 = (a[0].indexOf(",") > -1) ? a[0].split(",") : a[0].split("");
            var a1 = a[1].split(",");
            h += groupBall(a0, "red_balls");
            h += groupBall(a1, "blue_balls");
        } else {
            var a = (ball.indexOf(",") > -1) ? ball.split(",") : ball.split("");
            h += groupBall(a, "red_balls");
        }
        return h;
    }


    //足彩开奖号码
    function makeZc(num) {
        var h = '<ul class="score-sfc">';
        var a = num.split(",");
        $.each(a, function (i, n) {
            h += '<li>' + n + '</li>'
        })
        h += '</ul>';
        return h
    }

    function groupBall(a, css) {
        var h = "";
        $.each(a, function (i, n) {
            h += '<span class="' + css + '">' + n + '</span>';
        })
        return h;
    }

    function comma (val, length) {
        var length = length || 3;
        val = String(val).split(".");
        val[0] = val[0].replace(new RegExp('(\\d)(?=(\\d{'+length+'})+$)','ig'),"$1,");
        return val.join(".");
    }


    /**
     * 路由
     * */
    function router(routes) {
        var win = window,
            ac = [],
            def = {
                type: "!"
            };
        if (!routes || typeof routes !== "object") return;
        else parseRouter(routes);

        function parseRouter(routes) {
            for (var i in routes) {
                if (typeof i == 'string' && typeof routes[i] == "function") ac.push({
                    path: i,
                    fn: routes[i]
                })
            }
        }

        function parseHash(url) {
            var ucache = url.replace(/^[^#]*/, ''),
                u;
            if (ucache[1] != def.type) {
                return '';
            }
            u = ucache.slice(2);
            return u;
        }
        $(win).bind('hashchange', function(ev) {
            var originEvent = ev.originalEvent,
                newUrl = originEvent.newURL,
                oldUrl = originEvent.oldURL;
            checkHash(newUrl)
        });

        function checkHash(url) {
            var hash = parseHash(url) || "index";
            $(ac).each(function(i, router) {
                if (router.path == hash) {
                    router.fn()
                }
            })
        }

        checkHash(win.location.hash);
    }

    return {
        log: log,
        z: alert,
        getWeek: getWeek,
        formatBall:formatBall,
        listToObject: listToObject,
        href: href,
        router:router,
        getDxds: getDxds,
        makeZc: makeZc,
        comma:comma,
        makeBall: makeBall
    }
})

