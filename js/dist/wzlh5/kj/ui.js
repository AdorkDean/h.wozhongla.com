define("wzlh5/kj/ui", ["wzlh5/kj/jquery-2.1.1", "wzlh5/kj/lotteryArgs", "wzlh5/kj/lib"], function (require, exports, module) {
    var $ = require("wzlh5/kj/jquery-2.1.1");
    var lib = require("wzlh5/kj/lib");
    var args = require("wzlh5/kj/lotteryArgs");
    var l = lib.log;
    var z = lib.z;

    //获取显示的彩种列表;
    function getList(list, ids) {
        var h = '';
        $.each(ids, function (i, n) {
            h += groupList(list[n], n)
        })
        return h;
    }

    //组合开奖列表
    function groupList(o, id) {
        var arg = args[id];
        //if (arg.lotteryType===4) return makeJc(o);
        if (!o) return '';
        var h = '';
        h += '<li><a href="list.html?lotId='+id+'" class="result-group-item icon-right">';
        h += '<div class="result-item-title">';
        h += '<span class="result-item-name">' + o.lotName + '</span>';
        h += '<span class="result-item-qc">' + o.lotIssue + '期</span>';
        h += '<span class="result-item-time item-time-kj">' + o.endTime.slice(5, 11) + ' 周' + lib.getWeek(o.endTime) + '</span>';
        h += '</div>';
        h += '<div class="result-item-detail">';
        h += arg.lotteryType === 2 ? makeZc(o.kjCode, id) : makeBall(o.kjCode, id);
        if (arg.isSsc) {
            h += '<span class="score-grey">' + getDxds(o.kjCode.slice(-2, -1)) + ' | ' + getDxds(o.kjCode.slice(-1)) + '</span>';
        }
        h += '</div>';
        h += '</a>';
        h += '</li>';

        return h;
    }

    //获得大小单双
    function getDxds(val) {
        var val = parseInt(val, 10);
        var h = val < 5 ? "小" : "大";
        return h += val % 2 === 1 ? "单" : "双";
    }

    function makeZc(num) {
        var h = '<ul class="score-sfc">';
        var a = num.split("");
        $.each(a, function (i, n) {
            h += '<li>' + n + '</li>'
        })
        h += '</ul>';
        return h
    }


    //生成号码
    function makeBall(ball) {
        if (!ball) return "";

        var h = '';
        if (ball.indexOf("+") > -1) {
            var a = ball.split("+");
            var a0 = (a[0].indexOf(" ") > -1) ? a[0].split(" ") : a[0].split("");
            var a1 = a[1].split(" ");
            h += groupBall(a0, "red_balls");
            h += groupBall(a1, "blue_balls");
        } else {
            var a = (ball.indexOf(" ") > -1) ? ball.split(" ") : ball.split("");
            h += groupBall(a, "red_balls");
        }
        return h;
    }

    function groupBall(a, css) {
        var h = "";
        $.each(a, function (i, n) {
            h += '<span class="' + css + '">' + n + '</span>';
        })
        return h;
    }


    return {
        getList: getList,
        groupList: groupList
};

})

