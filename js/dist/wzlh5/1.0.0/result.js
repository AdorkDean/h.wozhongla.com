/**
 * Created by hebo (razr409355439@gmail.com)on 15/1/7.
 */

define("wzlh5/1.0.0/result",["jquery/2.1.1/jquery","wzlh5/1.0.0/ac","handlebars/1.3.0/dist/cjs/handlebars",'wzlh5/1.0.0/until',"wzlh5/1.0.0/cp","wzlh5/1.0.0/ui"],function (require, exports, module) {
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
    result = function(ac) {
        switch (ac) {
            case "index":
                index();
                break;
            case "ssq":
                ssq(1);
                break;
            case "jczq":
                jczq(1)
                break;
            case "dlt":
                dlt(1)
                break;
            case "fc3d":
                fc3d(1)
                break;
            case "jxssc":
                jxssc(1)
                break;
            case "X115":
                X115(1);
                break;
            case "pl3":
                pl3(1);
                break;
            case "qxc":
                qxc(1);
                break;
            case "qlc":
                qlc(1);
                break;
            case "cqssc":
                cqssc(1);
                break;
            case "pl5":
                pl5(1);
                break;

            case "klsf":
                klsf(1);
                break;
            case "ahks":
                ahks(1);
                break;
            case "dlc"://江西11选5
                dlc(1);
                break;
            case "gd115":
                gd115(1);
                break;
            case "sd115":
                sd115(1);
                break;
            case "qyh":
                qyh(1);
                break;
            case "sfc":
                sfc(1);
                break;
        }
        //首页
        function index() {
            action.queryResult(function(d) {
                var s = mergeData(d);
                console.log(d);
                render(s)
            });
var arr=["001", "113", "002", "108", "117", "109", "003", "110", "115", "116", "23525", "23527"];
            action.getNewResult(arr, function(data){
               console.log(data);
            })

            function render(s) {
                if (!s || !s.length) {
                    $(".container-mask .tips").html('  暂无开奖数据 %>_<% 请稍后再试')
                    //$(".container-mask").hide();
                } else {
                    $(".container-mask").hide();
                    var listTemplate = Handlebars.compile($("#result-list-temp").html());
                    $("#result-group").html(listTemplate({
                        list: s
                    }));
                }
            }

            function mergeData(d) {
                if (!d) return [];
                var s = formatData(d);
                var ssq = machResult('51', s, function(s) {
                    var n = s.kjCode.replace("+", " ").split(" ");
                    var str = "";
                    for (var i = 0; i < n.length; i++) {
                        if (i == n.length - 1) {
                            str += "<span class='blue_balls'>" + n[i] + "</span>"
                        } else {
                            str += "<span class='red_balls'>" + n[i] + "</span>"
                        }
                    }
                    s.str = str;
                    s.href = 'resultssq.html'
                    return s
                })
                var fc3d = machResult("52", s, function(s) {
                    var n = s.kjCode.split("");
                    var str = "";
                    for (var i = 0; i < n.length; i++) {
                        str += " <span class='red_balls'>" + n[i] + "</span>"
                    }
                    s.str = str;
                    s.href = 'resultfc3d.html'
                    return s
                })
                var dlt = machResult("23529", s, function(s) {
                    var n = s.kjCode.replace("+", " ").split(" ");
                    var str = ""
                    for (var i = 0; i < n.length; i++) {
                        if (i >= n.length - 2) {
                            str += " <span class='blue_balls'>" + n[i] + "</span>"
                        } else {
                            str += " <span class='red_balls'>" + n[i] + "</span>"
                        }
                    }
                    s.str = str;
                    s.href = 'resultdlt.html'
                    return s
                })
                //七星彩
                var qxc = machResult("10022", s, function(s) {
                    var n = s.kjCode.split("");
                    var str = "";
                    for (var i = 0; i < n.length; i++) {
                        str += " <span class='red_balls'>" + n[i] + "</span>"
                    }
                    s.str = str;
                    s.href = 'resultqxc.html'
                    return s
                })
                //七乐彩
                var X115 = machResult("23528", s, function(s) {
                    var n = s.kjCode.replace("+", " ").split(" ");
                    var str = "";
                    for (var i = 0; i < n.length; i++) {
                        if (i == n.length - 1) {
                            str += " <span class='blue_balls'>" + n[i] + "</span>"
                        } else {
                            str += " <span class='red_balls'>" + n[i] + "</span>"
                        }
                    }
                    s.str = str;
                    s.href = 'resultqlc.html'
                    return s
                })
                //jx11x5
//                var jx11x5 = machResult("23528", s, function(s) {
//                    var n = s.kjCode.replace("+", " ").split(" ");
//                    var str = "";
//                    for (var i = 0; i < n.length; i++) {
//                        if (i == n.length - 1) {
//                            str += " <span class='blue_balls'>" + n[i] + "</span>"
//                        } else {
//                            str += " <span class='red_balls'>" + n[i] + "</span>"
//                        }
//                    }
//                    s.str = str;
//                    s.href = 'resultqlc.html'
//                    return s
//                })
                //体彩排列三
                var pl3 = machResult("33", s, function(s) {
                    var n = s.kjCode.split("");
                    var str = "";
                    for (var i = 0; i < n.length; i++) {
                        str += " <span class='red_balls'>" + n[i] + "</span>"
                    }
                    s.str = str;
                    s.href = 'resultpl3.html'
                    return s
                })
                //胜负彩
                var sfc = machResult('11', s, function(s) {
                    var str = "";
                    str += "   <div class='result-jc'><span class='result-jc-result'>" + s.kjCode + "</span></div>"
                    s.str = str;
                    s.href = 'resultjczq.html'
                    return s;
                })
                return [
                    ssq,
                    dlt,
                    fc3d,
                    qxc,
                    X115,
                    pl3
                    //jx11x5
                    //sfc
                ];
            }

            function formatData(d) {
                var r = [];
                for (var i = 0; i < d.length; i++) {
                    r.push({
                        lotName: d[i].lotName,
                        kjCode: d[i].kjCode,
                        lotIssue: d[i].lotIssue,
                        endTime: d[i].endTime,
                        lotId: d[i].lotId
                    })
                }
                return r;
            }

            function machResult(id, d, fn) {
                var r = {};
                for (var i = 0; i < d.length; i++) {
                    if (d[i].lotId == id) {
                        r = d[i]
                        r.time = d[i].endTime.split(" ")[0]
                    }
                }
                return fn && fn(r) || r;
            }
        }
        //
        function jczq() {
            //先查询期次
            action.queryJczqIssue(function(d) {
                if (!d || !d.length) {
                    $(".container-mask .tips").html('  暂无开奖数据 %>_<% 请稍后再试')
                } else {
                    render(d)
                }
            })

            function render(s) {
                //渲染issue期次
                var issue = formatIssue(s)
                renderIssue(issue)
                //再查询该期次的开奖数据
                resultListView(s[0])

                function resultListView(d) {
                    action.queryJczq(d, function(d2) {
                        renderList(d2)
                    })
                }

                function renderIssue(list) {
                    $('#issue').html(list[0].dstr + "<span class='caret'></span>").on('click', function() {
                        $("#jczqissue").toggle()
                    })
                    var s = ""
                    for (var i = 0; i < list.length; i++) {
                        s += "<li><a href='javacript:;' issue=" + list[i].issueNumber + ">" + list[i].dstr + "</a></li>"
                    }
                    $("#jczqissue").html(s).delegate("a", "click", function() {
                        var issue = $(this).attr("issue")
                        resultListView({
                            issueNumber: issue
                        })
                        $("#jczqissue").hide();
                    })
                }

                function renderList(list) {
                    list = formatData(list)
                    if (!s || !s.length) {
                        $("#result-group li:first").html('  暂无开奖数据 %>_<% 请稍后再试')
                        //$(".container-mask").hide();
                    } else {
                        $(".container-mask").hide();
                        var listTemplate = Handlebars.compile($("#jc-list-temp").html());
                        $("#result-group").html(listTemplate({
                            list: list
                        }));
                    }
                }

                function formatIssue(issue) {
                    var r = [];
                    for (var i = 0; i < issue.length; i++) {
                        var d = issue[i].issueNumber.toString() //.split("")
                        var s = d.slice(0, 4) + "-" + d.slice(4, 6) + "-" + d.slice(6)
                        issue[i].dstr = s;
                    }
                    return issue;
                }
            }
            //整合数据
            function formatData(s) {
                for (var i = 0; i < s.length; i++) {
                    var dateArr = s[i].creationTime.split(" ")[0].split("-")
                    var date = new Date();
                    date.setDate(dateArr[0])
                    date.setDate(dateArr[1], dateArr[2])
                    s[i].week = replaceWeek(date.getDay())
                    //筛选 结果
                    if (s[i].matchAll) {
                        var sr = s[i].matchAll.split("-");
                        s[i].result = sr[0] > sr[1] ? "胜" : "负"
                    } else {
                        //没有赛果
                        s[i].result = "无"
                        s[i].matchAll = "无"
                    }
                    //序号
                    s[i].n = i >= 10 ? "0" + (i + 1) : "00" + (i + 1);
                }

                function replaceWeek(w) {
                    var week = ""
                    switch (w) {
                        case 0:
                            week = "周日"
                            break;
                        case 1:
                            week = "周一"
                            break;
                        case 2:
                            week = "周二"
                            break;
                        case 3:
                            week = "周三"
                            break;
                        case 4:
                            week = "周四"
                            break;
                        case 5:
                            week = "周五"
                            break;
                        case 6:
                            week = "周六"
                            break;
                    }
                    return week;
                }
                return s
            }
        }

        function ssq(n) {

            function loadssq(fn){
                action.querySsq({
                    pageno: n,
                    pagesize: 20
                }, function(d) {
                    $('.add-more-data').text('点击我加载更多...')
                    listView(d);
                    fn && fn();
                })
            }

            loadssq(function (){
                $(".account-nav-group li").eq(1).click();
            })

            $(".account-nav-group li").on("click", function() {
                var index = $(this).index()
                if (index == 0) {
                    $(".account-nav-group li").removeClass("active").eq(index).addClass("active")
                    $("#result-detail").show();
                    $("#issue-detail").hide();
                } else {
                    var d = $("#result-group li:first").data("code")
                    detailView(d)
                }
            })

            function formatSsqData(d) {
                for (var i = 0; i < d.length; i++) {
                    var dstr = d[i].endTime.split(' ')[0]
                    var codeStr = concatNum(d[i].kjCode.replace("+", " ").split(" "))
                    var kjdata = concatKj(d[i].winCount, d[i].winMoney, d[i].winName)
                    //时间
                    d[i].dstr = dstr;
                    //
                    d[i].codeStr = codeStr;
                    d[i].kjdata = kjdata;
                    //奖池
                    d[i].tj = formatMoeny(d[i].bonusBalance)
                    //销量
                    d[i].xl = formatMoeny(d[i].sale)
                    //500注数
                    d[i].wb = Math.floor(d[i].bonusBalance / 5000000)
                    //
                    var json = {
                        lotIssue: d[i].lotIssue,
                        dstr: d[i].dstr,
                        codeStr: d[i].codeStr,
                        kjdata: d[i].kjdata,
                        xl: d[i].xl,
                        tj: d[i].tj,
                        wb: d[i].wb
                    }
                    d[i].json = JSON.stringify(json)
                }

                function concatNum(n) {
                    var str = ""
                    for (var i = 0; i < n.length; i++) {
                        if (i == n.length - 1) {
                            str += "<span class='blue_balls'>" + n[i] + "</span>"
                        } else {
                            str += "<span class='red_balls'>" + n[i] + "</span>"
                        }
                    }
                    return str;
                }

                function concatKj(n1, n2, n3) {
                    var r = [];
                    n1 = n1.split(',')
                    n2 = n2.split(',')
                    n3 = n3.split(',')
                    /*{
                     name:"",
                     count:"",
                     price:""
                     }*/
                    //注数
                    for (var i = 0; i < n1.length; i++) {
                        r.push({
                            n: "",
                            c: n1[i],
                            p: ""
                        })
                    }
                    //奖金
                    for (var j = 0; j < n2.length; j++) {
                        r[j].p = formatMoeny(n2[j])
                    }
                    //name
                    for (var k = 0; k < n3.length; k++) {
                        r[k].n = n3[k]
                    }
                    return r;
                }

                function formatMoeny(num) {
                    var sign, cents;
                    num = num.toString().replace(/\$|\,/g, '');
                    if (isNaN(num)) num = "0";
                    sign = (num == (num = Math.abs(num)));
                    num = Math.floor(num * 100 + 0.50000000001);
                    cents = num % 100;
                    num = Math.floor(num / 100).toString();
                    if (cents < 10) cents = "0" + cents;
                    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
                    return (((sign) ? '' : '-') + num);
                }
                return d;
            }

            function listView(s) {
                var d = formatSsqData(s.lotolist)
                render(d);
                function render(s) {
                    if (!s || !s.length) {
                        $(".container-mask .tips").html('  暂无开奖数据 %>_<% 请稍后再试')
                        //$(".container-mask").hide();
                    } else {
                        $("#issue-detail,.container-mask").hide();
                        var listTemplate = Handlebars.compile($("#result-list-temp").html());
                        $("#result-group").append(listTemplate({
                            list: s
                        })).delegate("li", "click", function() {
                            var json = ($(this).data("code"))
                            detailView(json)
                        });
                    }
                }
            }

            function detailView(d) {
                $(".account-nav-group li:first").removeClass("active").next().addClass("active")
                $("#result-detail").hide();
                $("#issue-detail").show();
                var listTemplate = Handlebars.compile($("#issue-detail-temp").html());
                $("#issue-detail").html(listTemplate(d));
            }

            $('.add-more-data').click(function (){
                $(this).text('正在加载加载更多...')
                n++;
                loadssq();
            })
        }

        function dlt(n) {

            function loaddlt(fn){
                action.queryDlt({
                    pageno: n,
                    pagesize: 20
                }, function(d) {
                    $('.add-more-data').text('点击我加载更多...')
                    listView(d);
                    fn && fn();
                })
            }

            loaddlt(function (){
                $(".account-nav-group li").eq(1).click();
            })

            $(".account-nav-group li").on("click", function() {
                var index = $(this).index()
                if (index == 0) {
                    $(".account-nav-group li").removeClass("active").eq(index).addClass("active")
                    $("#result-detail").show();
                    $("#issue-detail").hide();
                } else {
                    var d = $("#result-group li:first").data("code")
                    detailView(d)
                }
            })

            function formatDltData(d) {
                for (var i = 0; i < d.length; i++) {
                    var dstr = d[i].endTime.split(' ')[0]
                    var codeStr = concatNum(d[i].kjCode.replace("+", " ").split(" "))
                    var kjdata = concatKj(d[i].winCount, d[i].winMoney, d[i].winName)
                    //时间
                    d[i].dstr = dstr;
                    //
                    d[i].codeStr = codeStr;
                    d[i].kjdata = kjdata;
                    //奖池
                    d[i].tj = formatMoeny(d[i].bonusBalance)
                    //销量
                    d[i].xl = formatMoeny(d[i].sale)
                    //500注数
                    d[i].wb = Math.floor(d[i].bonusBalance / 5000000)
                    //
                    var json = {
                        lotIssue: d[i].lotIssue,
                        dstr: d[i].dstr,
                        codeStr: d[i].codeStr,
                        kjdata: d[i].kjdata,
                        xl: d[i].xl,
                        tj: d[i].tj,
                        wb: d[i].wb
                    }
                    d[i].json = JSON.stringify(json)
                }

                function concatNum(n) {
                    var str = ""
                    for (var i = 0; i < n.length; i++) {
                        if (i >= n.length - 2) {
                            str += "<span class='blue_balls'>" + n[i] + "</span>"
                        } else {
                            str += "<span class='red_balls'>" + n[i] + "</span>"
                        }
                    }
                    return str;
                }

                function concatKj(n1, n2, n3) {
                    var r = [];
                    n1 = n1.split(',')
                    n2 = n2.split(',')
                    n3 = n3.split(',')
                    /*{
                     name:"",
                     count:"",
                     price:""
                     }*/
                    //注数
                    for (var i = 0; i < n1.length; i++) {
                        r.push({
                            n: "",
                            c: n1[i],
                            p: ""
                        })
                    }
                    //奖金
                    for (var j = 0; j < n2.length; j++) {
                        r[j].p = formatMoeny(n2[j])
                    }
                    //name
                    for (var k = 0; k < n3.length; k++) {
                        r[k].n = n3[k]
                    }
                    return r;
                }

                function formatMoeny(num) {
                    var sign, cents;
                    num = num.toString().replace(/\$|\,/g, '');
                    if (isNaN(num)) num = "0";
                    sign = (num == (num = Math.abs(num)));
                    num = Math.floor(num * 100 + 0.50000000001);
                    cents = num % 100;
                    num = Math.floor(num / 100).toString();
                    if (cents < 10) cents = "0" + cents;
                    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
                    return (((sign) ? '' : '-') + num);
                }
                return d;
            }

            function listView(s) {
                var d = formatDltData(s.lotolist)
                render(d);
                function render(s) {
                    if (!s || !s.length) {
                        $(".container-mask .tips").html('  暂无开奖数据 %>_<% 请稍后再试')
                        //$(".container-mask").hide();
                    } else {
                        $("#issue-detail,.container-mask").hide();
                        var listTemplate = Handlebars.compile($("#result-list-temp").html());
                        $("#result-group").append(listTemplate({
                            list: s
                        })).delegate("li", "click", function() {
                            var json = ($(this).data("code"))
                            detailView(json)
                        });
                    }
                }
            }

            function detailView(d) {
                $(".account-nav-group li:first").removeClass("active").next().addClass("active")
                $("#result-detail").hide();
                $("#issue-detail").show();
                var listTemplate = Handlebars.compile($("#issue-detail-temp").html());
                $("#issue-detail").html(listTemplate(d));
            }

            $('.add-more-data').click(function (){
                $(this).text('正在加载加载更多...')
                n++;
                loaddlt();
            })
        }

        function fc3d(n) {

            function loadfc3d(fn){
                action.queryFc3d({
                    pageno: n,
                    pagesize: 20
                }, function(re) {
                    $('.add-more-data').text('点击我加载更多...')
                    listView(re)
                    fn && fn()
                })
            }

            loadfc3d(function (){
                $(".account-nav-group li").eq(1).click();
            })

            $(".account-nav-group li").on("click", function() {
                var index = $(this).index()
                if (index == 0) {
                    $(".account-nav-group li").removeClass("active").eq(index).addClass("active")
                    $("#result-detail").show();
                    $("#issue-detail").hide();
                } else {
                    var d = $("#result-group li:first").data("code")
                    detailView(d)
                }
            })

            function formatFc3dData(d) {
                /**
                 * bonusBalance: 207035236
                 * endTime: "2014-08-14 13:07:44"
                 * kjCode: "02 08 09 10 20 29+05"
                 * lotId: 51
                 * lotIssue: "2014093"
                 * sale: 361310882
                 * startTime: "1900-01-01 00:00:00"
                 * winCount: "23,205,3824,152903,2158812,17864162"
                 * winMoney: "5209398,29366,3000,200,10,5"
                 * winName: "一等奖,二等奖,三等奖,四等奖,五等奖,六等奖"
                 */
                for (var i = 0; i < d.length; i++) {
                    var dstr = d[i].endTime.split(' ')[0]
                    var codeStr = concatNum(d[i].kjCode.split(""))
                    var kjdata = concatKj(d[i].winCount, d[i].winMoney, d[i].winName)
                    //时间
                    d[i].dstr = dstr;
                    //
                    d[i].codeStr = codeStr;
                    d[i].kjdata = kjdata;
                    //奖池
                    d[i].tj = formatMoeny(d[i].bonusBalance)
                    //销量
                    d[i].xl = formatMoeny(d[i].sale)
                    //500注数
                    d[i].wb = Math.floor(d[i].bonusBalance / 5000000)
                    //
                    var json = {
                        lotIssue: d[i].lotIssue,
                        dstr: d[i].dstr,
                        codeStr: d[i].codeStr,
                        kjdata: d[i].kjdata,
                        xl: d[i].xl,
                        tj: d[i].tj,
                        wb: d[i].wb
                    }
                    d[i].json = JSON.stringify(json)
                }

                function concatNum(n) {
                    var str = ""
                    for (var i = 0; i < n.length; i++) {
                        str += "<span class='red_balls'>" + n[i] + "</span>"
                    }
                    return str;
                }

                function concatKj(n1, n2, n3) {
                    var r = [];
                    n1 = n1.split(',')
                    n2 = n2.split(',')
                    n3 = n3.split(',')
                    /*{
                     name:"",
                     count:"",
                     price:""
                     }*/
                    //注数
                    for (var i = 0; i < n1.length; i++) {
                        r.push({
                            n: "",
                            c: n1[i],
                            p: ""
                        })
                    }
                    //奖金
                    for (var j = 0; j < n2.length; j++) {
                        r[j].p = formatMoeny(n2[j])
                    }
                    //name
                    for (var k = 0; k < n3.length; k++) {
                        r[k].n = n3[k]
                    }
                    return r;
                }

                function formatMoeny(num) {
                    var sign, cents;
                    num = num.toString().replace(/\$|\,/g, '');
                    if (isNaN(num)) num = "0";
                    sign = (num == (num = Math.abs(num)));
                    num = Math.floor(num * 100 + 0.50000000001);
                    cents = num % 100;
                    num = Math.floor(num / 100).toString();
                    if (cents < 10) cents = "0" + cents;
                    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
                    return (((sign) ? '' : '-') + num);
                }
                return d;
            }

            function listView(s) {
                var d = formatFc3dData(s.lotolist)
                render(d);

                function render(s) {
                    if (!s || !s.length) {
                        $(".container-mask .tips").html('  暂无开奖数据 %>_<% 请稍后再试')
                        //$(".container-mask").hide();
                    } else {
                        $("#issue-detail,.container-mask").hide();
                        var listTemplate = Handlebars.compile($("#result-list-temp").html());
                        $("#result-group").append(listTemplate({
                            list: s
                        })).delegate("li", "click", function() {
                            var json = ($(this).data("code"))
                            detailView(json)
                        });
                    }
                }
            }

            function detailView(d) {
                $(".account-nav-group li:first").removeClass("active").next().addClass("active")
                $("#result-detail").hide();
                $("#issue-detail").show();
                var listTemplate = Handlebars.compile($("#issue-detail-temp").html());
                $("#issue-detail").html(listTemplate(d));
            }

            $('.add-more-data').click(function (){
                $(this).text('正在加载加载更多...')
                n++;
                loadfc3d();
            })
        }

        function jxssc(n) {

            function loadjxssc(fn){
                action.queryJxssc({
                    pageno: n,
                    pagesize: 20
                }, function(re) {
                    $('.add-more-data').text('点击我加载更多...')
                    listView(re)
                    fn && fn()
                })
            }

            loadjxssc(function (){
                $(".account-nav-group li").eq(1).click();
            })


            function formatJxsscData(d) {
                /**
                 * bonusBalance: 207035236
                 * endTime: "2014-08-14 13:07:44"
                 * kjCode: "02 08 09 10 20 29+05"
                 * lotId: 51
                 * lotIssue: "2014093"
                 * sale: 361310882
                 * startTime: "1900-01-01 00:00:00"
                 * winCount: "23,205,3824,152903,2158812,17864162"
                 * winMoney: "5209398,29366,3000,200,10,5"
                 * winName: "一等奖,二等奖,三等奖,四等奖,五等奖,六等奖"
                 */
                for (var i = 0; i < d.length; i++) {
                    var dstr = d[i].endTime.split(' ')[0]
                    var codeStr = concatNum(d[i].kjCode.split(""))
                    // var kjdata = concatKj(d[i].winCount, d[i].winMoney, d[i].winName)
                    //时间
                    d[i].dstr = dstr;
                    //
                    d[i].codeStr = codeStr;
                    // d[i].kjdata = kjdata;
                    //奖池
                    d[i].tj = formatMoeny(d[i].bonusBalance)
                    //销量
                    d[i].xl = formatMoeny(d[i].sale)
                    //500注数
                    d[i].wb = Math.floor(d[i].bonusBalance / 5000000)
                    //
                    var json = {
                        lotIssue: d[i].lotIssue,
                        dstr: d[i].dstr,
                        codeStr: d[i].codeStr,
                        kjdata: d[i].kjdata,
                        xl: d[i].xl,
                        tj: d[i].tj,
                        wb: d[i].wb
                    }
                    d[i].json = JSON.stringify(json)
                }

                function concatNum(n) {
                    var str = ""
                    for (var i = 0; i < n.length; i++) {
                        str += "<span class='red_balls'>" + n[i] + "</span>"
                    }
                    return str;
                }

                function concatKj(n1, n2, n3) {
                    var r = [];
                    n1 = n1.split(',')
                    n2 = n2.split(',')
                    n3 = n3.split(',')
                    /*{
                     name:"",
                     count:"",
                     price:""
                     }*/
                    //注数
                    for (var i = 0; i < n1.length; i++) {
                        r.push({
                            n: "",
                            c: n1[i],
                            p: ""
                        })
                    }
                    //奖金
                    for (var j = 0; j < n2.length; j++) {
                        r[j].p = formatMoeny(n2[j])
                    }
                    //name
                    for (var k = 0; k < n3.length; k++) {
                        r[k].n = n3[k]
                    }
                    return r;
                }

                function formatMoeny(num) {
                    var sign, cents;
                    num = num.toString().replace(/\$|\,/g, '');
                    if (isNaN(num)) num = "0";
                    sign = (num == (num = Math.abs(num)));
                    num = Math.floor(num * 100 + 0.50000000001);
                    cents = num % 100;
                    num = Math.floor(num / 100).toString();
                    if (cents < 10) cents = "0" + cents;
                    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
                    return (((sign) ? '' : '-') + num);
                }
                return d;
            }

            function listView(s) {
                var d = formatJxsscData(s.lotolist)
                render(d);
                function render(s) {
                    if (!s || !s.length) {
                        $(".container-mask .tips").html('  暂无开奖数据 %>_<% 请稍后再试')
                        //$(".container-mask").hide();
                    } else {
                        $("#issue-detail,.container-mask").hide();
                        var listTemplate = Handlebars.compile($("#result-list-temp").html());
                        $("#result-group").append(listTemplate({
                            list: s
                        })).delegate("li", "click", function() {
                            var json = ($(this).data("code"))
                            detailView(json)
                        });
                    }
                }
            }

            $('.add-more-data').click(function (){
                $(this).text('正在加载加载更多...')
                n++;
                loadjxssc();
            })
        }

        function cqssc(n) {
            function loadcqssc(fn){
                action.queryCqssc({
                    pageno: n,
                    pagesize: 20
                }, function(re) {

                    $('.add-more-data').text('点击我加载更多...')
                    listView(re)
                    fn && fn()
                })
            }

            loadcqssc(function (){
                $(".account-nav-group li").eq(1).click();
            })


            function formatJxsscData(d) {
                /**
                 * bonusBalance: 207035236
                 * endTime: "2014-08-14 13:07:44"
                 * kjCode: "02 08 09 10 20 29+05"
                 * lotId: 51
                 * lotIssue: "2014093"
                 * sale: 361310882
                 * startTime: "1900-01-01 00:00:00"
                 * winCount: "23,205,3824,152903,2158812,17864162"
                 * winMoney: "5209398,29366,3000,200,10,5"
                 * winName: "一等奖,二等奖,三等奖,四等奖,五等奖,六等奖"
                 */
                for (var i = 0; i < d.length; i++) {
                    var dstr = d[i].endTime.split(' ')[0]
                    var codeStr = concatNum(d[i].kjCode.split(""))
                    // var kjdata = concatKj(d[i].winCount, d[i].winMoney, d[i].winName)
                    //时间
                    d[i].dstr = dstr;
                    //
                    d[i].codeStr = codeStr;
                    // d[i].kjdata = kjdata;
                    //奖池
                    d[i].tj = formatMoeny(d[i].bonusBalance)
                    //销量
                    d[i].xl = formatMoeny(d[i].sale)
                    //500注数
                    d[i].wb = Math.floor(d[i].bonusBalance / 5000000)
                    //
                    var json = {
                        lotIssue: d[i].lotIssue,
                        dstr: d[i].dstr,
                        codeStr: d[i].codeStr,
                        kjdata: d[i].kjdata,
                        xl: d[i].xl,
                        tj: d[i].tj,
                        wb: d[i].wb
                    }
                    d[i].json = JSON.stringify(json)
                }

                function concatNum(n) {
                    var str = ""
                    for (var i = 0; i < n.length; i++) {
                        str += "<span class='red_balls'>" + n[i] + "</span>"
                    }
                    return str;
                }

                function concatKj(n1, n2, n3) {
                    var r = [];
                    n1 = n1.split(',')
                    n2 = n2.split(',')
                    n3 = n3.split(',')
                    /*{
                     name:"",
                     count:"",
                     price:""
                     }*/
                    //注数
                    for (var i = 0; i < n1.length; i++) {
                        r.push({
                            n: "",
                            c: n1[i],
                            p: ""
                        })
                    }
                    //奖金
                    for (var j = 0; j < n2.length; j++) {
                        r[j].p = formatMoeny(n2[j])
                    }
                    //name
                    for (var k = 0; k < n3.length; k++) {
                        r[k].n = n3[k]
                    }
                    return r;
                }

                function formatMoeny(num) {
                    var sign, cents;
                    num = num.toString().replace(/\$|\,/g, '');
                    if (isNaN(num)) num = "0";
                    sign = (num == (num = Math.abs(num)));
                    num = Math.floor(num * 100 + 0.50000000001);
                    cents = num % 100;
                    num = Math.floor(num / 100).toString();
                    if (cents < 10) cents = "0" + cents;
                    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
                    return (((sign) ? '' : '-') + num);
                }
                return d;
            }

            function listView(s) {
                var d = formatJxsscData(s.lotolist)
                render(d);
                function render(s) {
                    if (!s || !s.length) {
                        $(".container-mask .tips").html('  暂无开奖数据 %>_<% 请稍后再试')
                        //$(".container-mask").hide();
                    } else {
                        $("#issue-detail,.container-mask").hide();
                        var listTemplate = Handlebars.compile($("#result-list-temp").html());
                        $("#result-group").append(listTemplate({
                            list: s
                        })).delegate("li", "click", function() {
                            var json = ($(this).data("code"))
                            detailView(json)
                        });
                    }
                }
            }

            $('.add-more-data').click(function (){
                $(this).text('正在加载加载更多...')
                n++;
                loadcqssc();
            })
        }

        function X115(n) {
            function loadX115(fn){
                action.queryX115({
                    pageno: n,
                    pagesize: 20
                }, function(re) {

                    $('.add-more-data').text('点击我加载更多...')
                    listView(re)
                    fn && fn()
                })
            }

            loadX115(function (){
                $(".account-nav-group li").eq(1).click();
            })

            $(".account-nav-group li").on("click", function() {
                var index = $(this).index()
                if (index == 0) {
                    $(".account-nav-group li").removeClass("active").eq(index).addClass("active")
                    $("#result-detail").show();
                    $("#issue-detail").hide();
                } else {
                    var d = $("#result-group li:first").data("code")
                    detailView(d)
                }
            })

            function formatX115(d) {
                /**
                 * bonusBalance: 207035236
                 * endTime: "2014-08-14 13:07:44"
                 * kjCode: "02 08 09 10 20 29+05"
                 * lotId: 51
                 * lotIssue: "2014093"
                 * sale: 361310882
                 * startTime: "1900-01-01 00:00:00"
                 * winCount: "23,205,3824,152903,2158812,17864162"
                 * winMoney: "5209398,29366,3000,200,10,5"
                 * winName: "一等奖,二等奖,三等奖,四等奖,五等奖,六等奖"
                 */
                for (var i = 0; i < d.length; i++) {
                    var dstr = d[i].endTime.split(' ')[0]
                    var codeStr = concatNum(d[i].kjCode.split("+")[0].split(' ').concat(d[i].kjCode.split("+")[1]))
                    var kjdata = concatKj(d[i].winCount, d[i].winMoney, d[i].winName)
                    //时间
                    d[i].dstr = dstr;
                    //
                    d[i].codeStr = codeStr;
                    d[i].kjdata = kjdata;
                    //奖池
                    d[i].tj = formatMoeny(d[i].bonusBalance)
                    //销量
                    d[i].xl = formatMoeny(d[i].sale)
                    //500注数
                    d[i].wb = Math.floor(d[i].bonusBalance / 5000000)
                    //
                    var json = {
                        lotIssue: d[i].lotIssue,
                        dstr: d[i].dstr,
                        codeStr: d[i].codeStr,
                        kjdata: d[i].kjdata,
                        xl: d[i].xl,
                        tj: d[i].tj,
                        wb: d[i].wb
                    }
                    d[i].json = JSON.stringify(json)
                }

                function concatNum(n) {
                    var str = ""
                    for (var i = 0; i < n.length; i++) {
                        if (i == n.length - 1) {
                            str += " <span class='blue_balls'>" + n[i] + "</span>"
                        } else {
                            str += "<span class='red_balls'>" + n[i] + "</span>"
                        }
                    }
                    return str;
                }

                function concatKj(n1, n2, n3) {
                    var r = [];
                    n1 = n1.split(',')
                    n2 = n2.split(',')
                    n3 = n3.split(',')
                    /*{
                     name:"",
                     count:"",
                     price:""
                     }*/
                    //注数
                    for (var i = 0; i < n1.length; i++) {
                        r.push({
                            n: "",
                            c: n1[i],
                            p: ""
                        })
                    }
                    //奖金
                    for (var j = 0; j < n2.length; j++) {
                        r[j].p = formatMoeny(n2[j])
                    }
                    //name
                    for (var k = 0; k < n3.length; k++) {
                        r[k].n = n3[k]
                    }
                    return r;
                }

                function formatMoeny(num) {
                    var sign, cents;
                    num = num.toString().replace(/\$|\,/g, '');
                    if (isNaN(num)) num = "0";
                    sign = (num == (num = Math.abs(num)));
                    num = Math.floor(num * 100 + 0.50000000001);
                    cents = num % 100;
                    num = Math.floor(num / 100).toString();
                    if (cents < 10) cents = "0" + cents;
                    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
                    return (((sign) ? '' : '-') + num);
                }
                return d;
            }

            function listView(s) {
                var d = formatX115(s.lotolist)
                render(d);

                function render(s) {
                    if (!s || !s.length) {
                        $(".container-mask .tips").html('  暂无开奖数据 %>_<% 请稍后再试')
                        //$(".container-mask").hide();
                    } else {
                        $("#issue-detail,.container-mask").hide();
                        var listTemplate = Handlebars.compile($("#result-list-temp").html());
                        $("#result-group").append(listTemplate({
                            list: s
                        })).delegate("li", "click", function() {
                            var json = ($(this).data("code"))
                            detailView(json)
                        });
                    }
                }
            }

            function detailView(d) {
                $(".account-nav-group li:first").removeClass("active").next().addClass("active")
                $("#result-detail").hide();
                $("#issue-detail").show();
                var listTemplate = Handlebars.compile($("#issue-detail-temp").html());
                $("#issue-detail").html(listTemplate(d));
            }

            $('.add-more-data').click(function (){
                $(this).text('正在加载加载更多...')
                n++;
                loadX115();
            })
        }

        function qxc(n) {
            ////////alert(111);
            function loadqxc(fn){
                action.queryqxc({
                    pageno: n,
                    pagesize: 20
                }, function(re) {

                    $('.add-more-data').text('点击我加载更多...')
                    listView(re)
                    fn && fn()
                })
            }

            loadqxc(function (){
                $(".account-nav-group li").eq(1).click();
            })

            $(".account-nav-group li").on("click", function() {
                var index = $(this).index()
                if (index == 0) {
                    $(".account-nav-group li").removeClass("active").eq(index).addClass("active")
                    $("#result-detail").show();
                    $("#issue-detail").hide();
                } else {
                    var d = $("#result-group li:first").data("code")
                    detailView(d)
                }
            })

            function formatQxc(d) {
                /**
                 * bonusBalance: 207035236
                 * endTime: "2014-08-14 13:07:44"
                 * kjCode: "02 08 09 10 20 29+05"
                 * lotId: 51
                 * lotIssue: "2014093"
                 * sale: 361310882
                 * startTime: "1900-01-01 00:00:00"
                 * winCount: "23,205,3824,152903,2158812,17864162"
                 * winMoney: "5209398,29366,3000,200,10,5"
                 * winName: "一等奖,二等奖,三等奖,四等奖,五等奖,六等奖"
                 */
                for (var i = 0; i < d.length; i++) {
                    var dstr = d[i].endTime.split(' ')[0]
                    var codeStr = concatNum(d[i].kjCode.split(''))
                    var kjdata = concatKj(d[i].winCount, d[i].winMoney, d[i].winName)
                    //时间
                    d[i].dstr = dstr;
                    //
                    d[i].codeStr = codeStr;
                    d[i].kjdata = kjdata;
                    //奖池
                    d[i].tj = formatMoeny(d[i].bonusBalance)
                    //销量
                    d[i].xl = formatMoeny(d[i].sale)
                    //500注数
                    d[i].wb = Math.floor(d[i].bonusBalance / 5000000)
                    //
                    var json = {
                        lotIssue: d[i].lotIssue,
                        dstr: d[i].dstr,
                        codeStr: d[i].codeStr,
                        kjdata: d[i].kjdata,
                        xl: d[i].xl,
                        tj: d[i].tj,
                        wb: d[i].wb
                    }
                    d[i].json = JSON.stringify(json)
                }

                function concatNum(n) {
                    var str = ""
                    for (var i = 0; i < n.length; i++) {
                        str += "<span class='red_balls'>" + n[i] + "</span>"
                    }
                    return str;
                }

                function concatKj(n1, n2, n3) {
                    var r = [];
                    n1 = n1.split(',')
                    n2 = n2.split(',')
                    n3 = n3.split(',')
                    /*{
                     name:"",
                     count:"",
                     price:""
                     }*/
                    //注数
                    for (var i = 0; i < n1.length; i++) {
                        r.push({
                            n: "",
                            c: n1[i],
                            p: ""
                        })
                    }
                    //奖金
                    for (var j = 0; j < n2.length; j++) {
                        r[j].p = formatMoeny(n2[j])
                    }
                    //name
                    for (var k = 0; k < n3.length; k++) {
                        r[k].n = n3[k]
                    }
                    return r;
                }

                function formatMoeny(num) {
                    var sign, cents;
                    num = num.toString().replace(/\$|\,/g, '');
                    if (isNaN(num)) num = "0";
                    sign = (num == (num = Math.abs(num)));
                    num = Math.floor(num * 100 + 0.50000000001);
                    cents = num % 100;
                    num = Math.floor(num / 100).toString();
                    if (cents < 10) cents = "0" + cents;
                    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
                    return (((sign) ? '' : '-') + num);
                }
                return d;
            }

            function listView(s) {
                var d = formatQxc(s.lotolist)
                render(d);

                function render(s) {
                    if (!s || !s.length) {
                        $(".container-mask .tips").html('  暂无开奖数据 %>_<% 请稍后再试')
                        //$(".container-mask").hide();
                    } else {
                        $("#issue-detail,.container-mask").hide();
                        var listTemplate = Handlebars.compile($("#result-list-temp").html());
                        $("#result-group").append(listTemplate({
                            list: s
                        })).delegate("li", "click", function() {
                            var json = ($(this).data("code"))
                            detailView(json)
                        });
                    }
                }
            }

            function detailView(d) {
                $(".account-nav-group li:first").removeClass("active").next().addClass("active")
                $("#result-detail").hide();
                $("#issue-detail").show();
                var listTemplate = Handlebars.compile($("#issue-detail-temp").html());
                $("#issue-detail").html(listTemplate(d));
            }

            $('.add-more-data').click(function (){
                $(this).text('正在加载加载更多...')
                n++;
                loadqxc();
            })
        }

        function qlc(n) {
            ////alert(111);

            function loadqlc(fn){
                action.queryqlc({
                    pageno: n,
                    pagesize: 20
                }, function(re) {

                    $('.add-more-data').text('点击我加载更多...')
                    listView(re)
                    fn && fn()
                })
            }

            loadqlc(function (){
                $(".account-nav-group li").eq(1).click();
            })

            $(".account-nav-group li").on("click", function() {
                var index = $(this).index()
                if (index == 0) {
                    $(".account-nav-group li").removeClass("active").eq(index).addClass("active")
                    $("#result-detail").show();
                    $("#issue-detail").hide();
                } else {
                    var d = $("#result-group li:first").data("code")
                    detailView(d)
                }
            })

            function formatQlc(d) {
                /**
                 * bonusBalance: 207035236
                 * endTime: "2014-08-14 13:07:44"
                 * kjCode: "02 08 09 10 20 29+05"
                 * lotId: 51
                 * lotIssue: "2014093"
                 * sale: 361310882
                 * startTime: "1900-01-01 00:00:00"
                 * winCount: "23,205,3824,152903,2158812,17864162"
                 * winMoney: "5209398,29366,3000,200,10,5"
                 * winName: "一等奖,二等奖,三等奖,四等奖,五等奖,六等奖"
                 */
                for (var i = 0; i < d.length; i++) {
                    var dstr = d[i].endTime.split(' ')[0]
                    var codeStr = concatNum(d[i].kjCode.split('+')[0].split(' '))
                    var kjdata = concatKj(d[i].winCount, d[i].winMoney, d[i].winName)
                    //时间
                    d[i].dstr = dstr;
                    //
                    d[i].codeStr = codeStr;
                    d[i].kjdata = kjdata;
                    //奖池
                    d[i].tj = formatMoeny(d[i].bonusBalance)
                    //销量
                    d[i].xl = formatMoeny(d[i].sale)
                    //500注数
                    d[i].wb = Math.floor(d[i].bonusBalance / 5000000)
                    //
                    var json = {
                        lotIssue: d[i].lotIssue,
                        dstr: d[i].dstr,
                        codeStr: d[i].codeStr,
                        kjdata: d[i].kjdata,
                        xl: d[i].xl,
                        tj: d[i].tj,
                        wb: d[i].wb
                    }
                    d[i].json = JSON.stringify(json)
                }

                function concatNum(n) {
                    var str = ""
                    for (var i = 0; i < n.length; i++) {
                        if (i == n.length - 1) {
                            str += "<span class='blue_balls'>" + n[i] + "</span>"
                        } else {
                            str += "<span class='red_balls'>" + n[i] + "</span>"
                        }
                    }
                    return str;
                }

                function concatKj(n1, n2, n3) {
                    var r = [];
                    n1 = n1.split(',')
                    n2 = n2.split(',')
                    n3 = n3.split(',')
                    /*{
                     name:"",
                     count:"",
                     price:""
                     }*/
                    //注数
                    for (var i = 0; i < n1.length; i++) {
                        r.push({
                            n: "",
                            c: n1[i],
                            p: ""
                        })
                    }
                    //奖金
                    for (var j = 0; j < n2.length; j++) {
                        r[j].p = formatMoeny(n2[j])
                    }
                    //name
                    for (var k = 0; k < n3.length; k++) {
                        r[k].n = n3[k]
                    }
                    return r;
                }

                function formatMoeny(num) {
                    var sign, cents;
                    num = num.toString().replace(/\$|\,/g, '');
                    if (isNaN(num)) num = "0";
                    sign = (num == (num = Math.abs(num)));
                    num = Math.floor(num * 100 + 0.50000000001);
                    cents = num % 100;
                    num = Math.floor(num / 100).toString();
                    if (cents < 10) cents = "0" + cents;
                    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
                    return (((sign) ? '' : '-') + num);
                }
                return d;
            }

            function listView(s) {
                var d = formatQlc(s.lotolist)
                render(d);

                function render(s) {
                    if (!s || !s.length) {
                        $(".container-mask .tips").html('  暂无开奖数据 %>_<% 请稍后再试')
                        //$(".container-mask").hide();
                    } else {
                        $("#issue-detail,.container-mask").hide();
                        var listTemplate = Handlebars.compile($("#result-list-temp").html());
                        $("#result-group").append(listTemplate({
                            list: s
                        })).delegate("li", "click", function() {
                            var json = ($(this).data("code"))
                            detailView(json)
                        });
                    }
                }
            }

            function detailView(d) {
                $(".account-nav-group li:first").removeClass("active").next().addClass("active")
                $("#result-detail").hide();
                $("#issue-detail").show();
                var listTemplate = Handlebars.compile($("#issue-detail-temp").html());
                $("#issue-detail").html(listTemplate(d));
            }

            $('.add-more-data').click(function (){
                $(this).text('正在加载加载更多...')
                n++;
                loadqlc();
            })
        }

        function pl3(n) {

            function loadpl3(fn){
                action.querypl3({
                    pageno: n,
                    pagesize: 20
                }, function(re) {

                    $('.add-more-data').text('点击我加载更多...')
                    listView(re)
                    fn && fn()
                })
            }

            loadpl3(function (){
                $(".account-nav-group li").eq(1).click();
            })


            $(".account-nav-group li").on("click", function() {
                var index = $(this).index()
                if (index == 0) {
                    $(".account-nav-group li").removeClass("active").eq(index).addClass("active")
                    $("#result-detail").show();
                    $("#issue-detail").hide();
                } else {
                    var d = $("#result-group li:first").data("code")
                    detailView(d)
                }
            })

            function formatFc3dData(d) {
                /**
                 * bonusBalance: 207035236
                 * endTime: "2014-08-14 13:07:44"
                 * kjCode: "02 08 09 10 20 29+05"
                 * lotId: 51
                 * lotIssue: "2014093"
                 * sale: 361310882
                 * startTime: "1900-01-01 00:00:00"
                 * winCount: "23,205,3824,152903,2158812,17864162"
                 * winMoney: "5209398,29366,3000,200,10,5"
                 * winName: "一等奖,二等奖,三等奖,四等奖,五等奖,六等奖"
                 */
                for (var i = 0; i < d.length; i++) {
                    var dstr = d[i].endTime.split(' ')[0]
                    var codeStr = concatNum(d[i].kjCode.split(""))
                    var kjdata = concatKj(d[i].winCount, d[i].winMoney, d[i].winName)
                    //时间
                    d[i].dstr = dstr;
                    //
                    d[i].codeStr = codeStr;
                    d[i].kjdata = kjdata;
                    //奖池
                    d[i].tj = formatMoeny(d[i].bonusBalance)
                    //销量
                    d[i].xl = formatMoeny(d[i].sale)
                    //500注数
                    d[i].wb = Math.floor(d[i].bonusBalance / 5000000)
                    //
                    var json = {
                        lotIssue: d[i].lotIssue,
                        dstr: d[i].dstr,
                        codeStr: d[i].codeStr,
                        kjdata: d[i].kjdata,
                        xl: d[i].xl,
                        tj: d[i].tj,
                        wb: d[i].wb
                    }
                    d[i].json = JSON.stringify(json)
                }

                function concatNum(n) {
                    var str = ""
                    for (var i = 0; i < n.length; i++) {
                        str += "<span class='red_balls'>" + n[i] + "</span>"
                    }
                    return str;
                }

                function concatKj(n1, n2, n3) {
                	
                    var r = [];
                    n1 = n1.split(',')
                    n2 = n2.split(',')
                    n3 = n3.split(',')
                    if(n1.length==1){
                    	n1.push('--','--');
                    };
                    console.log(n1);
                    console.log(n3);
                    /*{
                     name:"",
                     count:"",
                     price:""
                     }*/
                    //注数
                    for (var i = 0; i < n1.length; i++) {
                        r.push({
                            n: "",
                            c: n1[i],
                            p: ""
                        })
                        
                    }
                   
                    //奖金
                    for (var j = 0; j < n2.length; j++) {
                        r[j].p = formatMoeny(n2[j])
                    }
                   
                    //name
                    
					//console.log(n3.length)
					for (var k = 0; k < n3.length; k++) {
						 //console.log(n3[k])
						r[k].n = n3[k];
                        
                    }
                   
                    return r;
                }

                function formatMoeny(num) {
                    var sign, cents;
                    num = num.toString().replace(/\$|\,/g, '');
                    if (isNaN(num)) num = "0";
                    sign = (num == (num = Math.abs(num)));
                    num = Math.floor(num * 100 + 0.50000000001);
                    cents = num % 100;
                    num = Math.floor(num / 100).toString();
                    if (cents < 10) cents = "0" + cents;
                    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
                    return (((sign) ? '' : '-') + num);
                }
                return d;
            }

            function listView(s) {
                var d = formatFc3dData(s.lotolist)
                render(d);
                function render(s) {
                    if (!s || !s.length) {
                        $(".container-mask .tips").html('  暂无开奖数据 %>_<% 请稍后再试')
                        //$(".container-mask").hide();
                    } else {
                    	
                        $("#issue-detail,.container-mask").hide();
                        var listTemplate = Handlebars.compile($("#result-list-temp").html());
                        $("#result-group").append(listTemplate({
                            list: s
                        })).delegate("li", "click", function() {
                            var json = ($(this).data("code"))
                            detailView(json)
                        });
                    }
                }
            }

            function detailView(d) {
                $(".account-nav-group li:first").removeClass("active").next().addClass("active")
                $("#result-detail").hide();
                $("#issue-detail").show();
                var listTemplate = Handlebars.compile($("#issue-detail-temp").html());
                $("#issue-detail").html(listTemplate(d));
            }

            $('.add-more-data').click(function (){
                $(this).text('正在加载加载更多...')
                n++;
                loadpl3();
            })
        }

        function pl5(n) {

            function loadpl5(fn){
                action.querypl5({
                    pageno: n,
                    pagesize: 20
                }, function(re) {

                    $('.add-more-data').text('点击我加载更多...')
                    listView(re)
                    fn && fn()
                })
            }

            loadpl5(function (){
                $(".account-nav-group li").eq(1).click();
            })


            $(".account-nav-group li").on("click", function() {
                var index = $(this).index()
                if (index == 0) {
                    $(".account-nav-group li").removeClass("active").eq(index).addClass("active")
                    $("#result-detail").show();
                    $("#issue-detail").hide();
                } else {
                    var d = $("#result-group li:first").data("code")
                    detailView(d)
                }
            })

            function formatPl5Data(d) {
                /**
                 * bonusBalance: 207035236
                 * endTime: "2014-08-14 13:07:44"
                 * kjCode: "02 08 09 10 20 29+05"
                 * lotId: 51
                 * lotIssue: "2014093"
                 * sale: 361310882
                 * startTime: "1900-01-01 00:00:00"
                 * winCount: "23,205,3824,152903,2158812,17864162"
                 * winMoney: "5209398,29366,3000,200,10,5"
                 * winName: "一等奖,二等奖,三等奖,四等奖,五等奖,六等奖"
                 */
                for (var i = 0; i < d.length; i++) {
                    var dstr = d[i].endTime.split(' ')[0]
                    var codeStr = concatNum(d[i].kjCode.split(""))
                    var kjdata = concatKj(d[i].winCount, d[i].winMoney, d[i].winName)
                    //时间
                    d[i].dstr = dstr;
                    //
                    d[i].codeStr = codeStr;
                    d[i].kjdata = kjdata;
                    //奖池
                    d[i].tj = formatMoeny(d[i].bonusBalance)
                    //销量
                    d[i].xl = formatMoeny(d[i].sale)
                    //500注数
                    d[i].wb = Math.floor(d[i].bonusBalance / 5000000)
                    //
                    var json = {
                        lotIssue: d[i].lotIssue,
                        dstr: d[i].dstr,
                        codeStr: d[i].codeStr,
                        kjdata: d[i].kjdata,
                        xl: d[i].xl,
                        tj: d[i].tj,
                        wb: d[i].wb
                    }
                    d[i].json = JSON.stringify(json)
                }

                function concatNum(n) {
                    var str = ""
                    for (var i = 0; i < n.length; i++) {
                        str += "<span class='red_balls'>" + n[i] + "</span>"
                    }
                    return str;
                }

                function concatKj(n1, n2, n3) {
                    var r = [];
                    n1 = n1.split(',')
                    n2 = n2.split(',')
                    n3 = n3.split(',')
                    
                    /*{
                     name:"",
                     count:"",
                     price:""
                     }*/
                    //注数
                    for (var i = 0; i < n1.length; i++) {
                        r.push({
                            n: "",
                            c: n1[i],
                            p: ""
                        })
                    }
                    //奖金
                    for (var j = 0; j < n2.length; j++) {
                        r[j].p = formatMoeny(n2[j])
                    }
                    //name
                    for (var k = 0; k < n3.length; k++) {
                        r[k].n = n3[k]
                    }
                    return r;
                }

                function formatMoeny(num) {
                    var sign, cents;
                    num = num.toString().replace(/\$|\,/g, '');
                    if (isNaN(num)) num = "0";
                    sign = (num == (num = Math.abs(num)));
                    num = Math.floor(num * 100 + 0.50000000001);
                    cents = num % 100;
                    num = Math.floor(num / 100).toString();
                    if (cents < 10) cents = "0" + cents;
                    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
                    return (((sign) ? '' : '-') + num);
                }
                return d;
            }

            function listView(s) {
                var d = formatPl5Data(s.lotolist)
                render(d);
                function render(s) {
                    if (!s || !s.length) {
                        $(".container-mask .tips").html('  暂无开奖数据 %>_<% 请稍后再试')
                        //$(".container-mask").hide();
                    } else {
                        $("#issue-detail,.container-mask").hide();
                        var listTemplate = Handlebars.compile($("#result-list-temp").html());
                        $("#result-group").append(listTemplate({
                            list: s
                        })).delegate("li", "click", function() {
                            var json = ($(this).data("code"))
                            detailView(json)
                        });
                    }
                }
            }

            function detailView(d) {
                $(".account-nav-group li:first").removeClass("active").next().addClass("active")
                $("#result-detail").hide();
                $("#issue-detail").show();
                var listTemplate = Handlebars.compile($("#issue-detail-temp").html());
                $("#issue-detail").html(listTemplate(d));
            }

            $('.add-more-data').click(function (){
                $(this).text('正在加载加载更多...')
                n++;
                loadpl5();
            })
        }

        function klsf(n){
            function loadklsf(fn){
                action.queryklsf({
                    pageno: n,
                    pagesize: 20
                }, function(re) {
                    //////console.log(re);
                    $('.add-more-data').text('点击我加载更多...')
                    listView(re)
                    fn && fn()
                })
            }

            loadklsf(function (){
                $(".account-nav-group li").eq(1).click();
            })

            function formatKlsfData(d) {
                for (var i = 0; i < d.length; i++) {
                    var dstr = d[i].endTime.split(' ')[0]
                    var codeStr = concatNum(d[i].kjCode.split(" "))
                    //时间
                    d[i].dstr = dstr;
                    //
                    d[i].codeStr = codeStr;
                    //奖池
                    d[i].tj = formatMoeny(d[i].bonusBalance)
                    //销量
                    d[i].xl = formatMoeny(d[i].sale)
                    //500注数
                    d[i].wb = Math.floor(d[i].bonusBalance / 5000000)
                    //
                    var json = {
                        lotIssue: d[i].lotIssue,
                        dstr: d[i].dstr,
                        codeStr: d[i].codeStr,
                        //kjdata: d[i].kjdata,
                        xl: d[i].xl,
                        tj: d[i].tj,
                        wb: d[i].wb
                    }
                    d[i].json = JSON.stringify(json)
                }

                function concatNum(n) {
                    var str = ""
                    for (var i = 0; i < n.length; i++) {
                        str += "<span class='red_balls'>" + n[i] + "</span>"
                    }
                    return str;
                }

                function concatKj(n1, n2, n3) {
                    ////console.log(n1);
                    ////console.log(n2);
                    ////console.log(n3);
                    var r = [];
                    n1 = n1.split(',')
                    n2 = n2.split(',')
                    n3 = n3.split(',')
                    /*{
                     name:"",
                     count:"",
                     price:""
                     }*/
                    //注数
                    for (var i = 0; i < n1.length; i++) {
                        r.push({
                            n: "",
                            c: n1[i],
                            p: ""
                        })
                    }
                    //奖金
                    for (var j = 0; j < n2.length; j++) {
                        r[j].p = formatMoeny(n2[j])
                    }
                    //name
                    for (var k = 0; k < n3.length; k++) {
                        r[k].n = n3[k]
                    }
                    return r;
                }

                function formatMoeny(num) {
                    var sign, cents;
                    num = num.toString().replace(/\$|\,/g, '');
                    if (isNaN(num)) num = "0";
                    sign = (num == (num = Math.abs(num)));
                    num = Math.floor(num * 100 + 0.50000000001);
                    cents = num % 100;
                    num = Math.floor(num / 100).toString();
                    if (cents < 10) cents = "0" + cents;
                    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
                    return (((sign) ? '' : '-') + num);
                }
                return d;
            }

            function listView(s) {
                var d = formatKlsfData(s.lotolist)
                render(d);
                function render(s) {
                    if (!s || !s.length) {
                        $(".container-mask .tips").html('  暂无开奖数据 %>_<% 请稍后再试')
                        //$(".container-mask").hide();
                    } else {
                        $("#issue-detail,.container-mask").hide();
                        var listTemplate = Handlebars.compile($("#result-list-temp").html());
                        $("#result-group").append(listTemplate({
                            list: s
                        })).delegate("li", "click", function() {
                            var json = ($(this).data("code"))
                        });
                    }
                }
            }

            $('.add-more-data').click(function (){
                $(this).text('正在加载加载更多...')
                n++;
                loadklsf();
            })
        }

        function ahks(n){
            function loadahks(fn){
                action.queryahks({
                    pageno: n,
                    pagesize: 20
                }, function(re) {
                    //////console.log(re);
                    $('.add-more-data').text('点击我加载更多...')
                    listView(re)
                    fn && fn()
                })
            }

            loadahks(function (){
                $(".account-nav-group li").eq(1).click();
            })

            function formatAhksData(d) {
                for (var i = 0; i < d.length; i++) {
                    var dstr = d[i].endTime.split(' ')[0]
                    var codeStr = concatNum(d[i].kjCode.split(""))
                    //时间
                    d[i].dstr = dstr;
                    //
                    d[i].codeStr = codeStr;
                    //奖池
                    d[i].tj = formatMoeny(d[i].bonusBalance)
                    //销量
                    d[i].xl = formatMoeny(d[i].sale)
                    //500注数
                    d[i].wb = Math.floor(d[i].bonusBalance / 5000000)
                    //
                    var json = {
                        lotIssue: d[i].lotIssue,
                        dstr: d[i].dstr,
                        codeStr: d[i].codeStr,
                        //kjdata: d[i].kjdata,
                        xl: d[i].xl,
                        tj: d[i].tj,
                        wb: d[i].wb
                    }
                    d[i].json = JSON.stringify(json)
                }

                function concatNum(n) {
                    var str = ""
                    for (var i = 0; i < n.length; i++) {
                        str += "<span class='red_balls'>" + n[i] + "</span>"
                    }
                    return str;
                }

                function concatKj(n1, n2, n3) {
                    var r = [];
                    n1 = n1.split(',')
                    n2 = n2.split(',')
                    n3 = n3.split(',')
                    /*{
                     name:"",
                     count:"",
                     price:""
                     }*/
                    //注数
                    for (var i = 0; i < n1.length; i++) {
                        r.push({
                            n: "",
                            c: n1[i],
                            p: ""
                        })
                    }
                    //奖金
                    for (var j = 0; j < n2.length; j++) {
                        r[j].p = formatMoeny(n2[j])
                    }
                    //name
                    for (var k = 0; k < n3.length; k++) {
                        r[k].n = n3[k]
                    }
                    return r;
                }

                function formatMoeny(num) {
                    var sign, cents;
                    num = num.toString().replace(/\$|\,/g, '');
                    if (isNaN(num)) num = "0";
                    sign = (num == (num = Math.abs(num)));
                    num = Math.floor(num * 100 + 0.50000000001);
                    cents = num % 100;
                    num = Math.floor(num / 100).toString();
                    if (cents < 10) cents = "0" + cents;
                    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
                    return (((sign) ? '' : '-') + num);
                }
                return d;
            }

            function listView(s) {
                var d = formatAhksData(s.lotolist)
                render(d);
                function render(s) {
                    if (!s || !s.length) {
                        $(".container-mask .tips").html('  暂无开奖数据 %>_<% 请稍后再试')
                        //$(".container-mask").hide();
                    } else {
                        $("#issue-detail,.container-mask").hide();
                        var listTemplate = Handlebars.compile($("#result-list-temp").html());
                        $("#result-group").append(listTemplate({
                            list: s
                        })).delegate("li", "click", function() {
                            var json = ($(this).data("code"))
                        });
                    }
                }
            }

            $('.add-more-data').click(function (){
                $(this).text('正在加载加载更多...')
                n++;
                loadahks();
            })
        }

        function dlc(n){
            function loaddlc(fn){
                action.querydlc({
                    pageno: n,
                    pagesize: 20
                }, function(re) {
                    ////console.log(re);
                    $('.add-more-data').text('点击我加载更多...')
                    listView(re)
                    fn && fn()
                })
            }

            loaddlc(function (){
                $(".account-nav-group li").eq(1).click();
            })

            function formatDlcData(d) {
                for (var i = 0; i < d.length; i++) {
                    var dstr = d[i].endTime.split(' ')[0]
                    var codeStr = concatNum(d[i].kjCode.split(" "))
                    //时间
                    d[i].dstr = dstr;
                    //
                    d[i].codeStr = codeStr;
                    //奖池
                    d[i].tj = formatMoeny(d[i].bonusBalance)
                    //销量
                    d[i].xl = formatMoeny(d[i].sale)
                    //500注数
                    d[i].wb = Math.floor(d[i].bonusBalance / 5000000)
                    //
                    var json = {
                        lotIssue: d[i].lotIssue,
                        dstr: d[i].dstr,
                        codeStr: d[i].codeStr,
                        //kjdata: d[i].kjdata,
                        xl: d[i].xl,
                        tj: d[i].tj,
                        wb: d[i].wb
                    }
                    d[i].json = JSON.stringify(json)
                }

                function concatNum(n) {
                    var str = ""
                    for (var i = 0; i < n.length; i++) {
                        str += "<span class='red_balls'>" + n[i] + "</span>"
                    }
                    return str;
                }

                function concatKj(n1, n2, n3) {
                    ////console.log(n1);
                    ////console.log(n2);
                    ////console.log(n3);
                    var r = [];
                    n1 = n1.split(',')
                    n2 = n2.split(',')
                    n3 = n3.split(',')
                    /*{
                     name:"",
                     count:"",
                     price:""
                     }*/
                    //注数
                    for (var i = 0; i < n1.length; i++) {
                        r.push({
                            n: "",
                            c: n1[i],
                            p: ""
                        })
                    }
                    //奖金
                    for (var j = 0; j < n2.length; j++) {
                        r[j].p = formatMoeny(n2[j])
                    }
                    //name
                    for (var k = 0; k < n3.length; k++) {
                        r[k].n = n3[k]
                    }
                    return r;
                }

                function formatMoeny(num) {
                    var sign, cents;
                    num = num.toString().replace(/\$|\,/g, '');
                    if (isNaN(num)) num = "0";
                    sign = (num == (num = Math.abs(num)));
                    num = Math.floor(num * 100 + 0.50000000001);
                    cents = num % 100;
                    num = Math.floor(num / 100).toString();
                    if (cents < 10) cents = "0" + cents;
                    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
                    return (((sign) ? '' : '-') + num);
                }
                return d;
            }

            function listView(s) {
                var d = formatDlcData(s.lotolist)
                render(d);
                function render(s) {
                    if (!s || !s.length) {
                        $(".container-mask .tips").html('  暂无开奖数据 %>_<% 请稍后再试')
                        //$(".container-mask").hide();
                    } else {
                        $("#issue-detail,.container-mask").hide();
                        var listTemplate = Handlebars.compile($("#result-list-temp").html());
                        $("#result-group").append(listTemplate({
                            list: s
                        })).delegate("li", "click", function() {
                            var json = ($(this).data("code"))
                        });
                    }
                }
            }

            $('.add-more-data').click(function (){
                $(this).text('正在加载加载更多...')
                n++;
                loaddlc();
            })
        }

        function gd115(n){
            function loadgd115(fn){
                action.querygd115({
                    pageno: n,
                    pagesize: 20
                }, function(re) {
                    //////console.log(re);
                    $('.add-more-data').text('点击我加载更多...')
                    listView(re)
                    fn && fn()
                })
            }

            loadgd115(function (){
                $(".account-nav-group li").eq(1).click();
            })


            $(".account-nav-group li").on("click", function() {
                var index = $(this).index()
                if (index == 0) {
                    $(".account-nav-group li").removeClass("active").eq(index).addClass("active")
                    $("#result-detail").show();
                    $("#issue-detail").hide();
                } else {
                    var d = $("#result-group li:first").data("code")
                    detailView(d)
                }
            })

            function formatGd115Data(d) {
                for (var i = 0; i < d.length; i++) {
                    var dstr = d[i].endTime.split(' ')[0]
                    var codeStr = concatNum(d[i].kjCode.split(" "))
                    //时间
                    d[i].dstr = dstr;
                    //
                    d[i].codeStr = codeStr;
                    //奖池
                    d[i].tj = formatMoeny(d[i].bonusBalance)
                    //销量
                    d[i].xl = formatMoeny(d[i].sale)
                    //500注数
                    d[i].wb = Math.floor(d[i].bonusBalance / 5000000)
                    //
                    var json = {
                        lotIssue: d[i].lotIssue,
                        dstr: d[i].dstr,
                        codeStr: d[i].codeStr,
                        //kjdata: d[i].kjdata,
                        xl: d[i].xl,
                        tj: d[i].tj,
                        wb: d[i].wb
                    }
                    d[i].json = JSON.stringify(json)
                }

                function concatNum(n) {
                    var str = ""
                    for (var i = 0; i < n.length; i++) {
                        str += "<span class='red_balls'>" + n[i] + "</span>"
                    }
                    return str;
                }

                function concatKj(n1, n2, n3) {
                    var r = [];
                    n1 = n1.split(',')
                    n2 = n2.split(',')
                    n3 = n3.split(',')
                    //注数
                    for (var i = 0; i < n1.length; i++) {
                        r.push({
                            n: "",
                            c: n1[i],
                            p: ""
                        })
                    }
                    //奖金
                    for (var j = 0; j < n2.length; j++) {
                        r[j].p = formatMoeny(n2[j])
                    }
                    //name
                    for (var k = 0; k < n3.length; k++) {
                        r[k].n = n3[k]
                    }
                    return r;
                }

                function formatMoeny(num) {
                    var sign, cents;
                    num = num.toString().replace(/\$|\,/g, '');
                    if (isNaN(num)) num = "0";
                    sign = (num == (num = Math.abs(num)));
                    num = Math.floor(num * 100 + 0.50000000001);
                    cents = num % 100;
                    num = Math.floor(num / 100).toString();
                    if (cents < 10) cents = "0" + cents;
                    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
                    return (((sign) ? '' : '-') + num);
                }
                return d;
            }

            function listView(s) {
                var d = formatGd115Data(s.lotolist)
                render(d);
                function render(s) {
                    if (!s || !s.length) {
                        $(".container-mask .tips").html('  暂无开奖数据 %>_<% 请稍后再试')
                        //$(".container-mask").hide();
                    } else {
                        $("#issue-detail,.container-mask").hide();
                        var listTemplate = Handlebars.compile($("#result-list-temp").html());
                        $("#result-group").append(listTemplate({
                            list: s
                        })).delegate("li", "click", function() {
                            var json = ($(this).data("code"))
                            detailView(json)
                        });
                    }
                }
            }

            function detailView(d) {
                $(".account-nav-group li:first").removeClass("active").next().addClass("active")
                $("#result-detail").hide();
                $("#issue-detail").show();
                var listTemplate = Handlebars.compile($("#issue-detail-temp").html());
                $("#issue-detail").html(listTemplate(d));
            }

            $('.add-more-data').click(function (){
                $(this).text('正在加载加载更多...')
                n++;
                loadgd115();
            })
        }

        function sd115(n){
            function loadsd115(fn){
                action.querysd11x5({
                    pageno: n,
                    pagesize: 20
                }, function(re) {
                    $('.add-more-data').text('点击我加载更多...')
                    listView(re)
                    fn && fn()
                })
            }

            loadsd115(function (){
                $(".account-nav-group li").eq(1).click();
            })

            function formatSd115Data(d) {
                for (var i = 0; i < d.length; i++) {
                    var dstr = d[i].endTime.split(' ')[0]
                    var codeStr = concatNum(d[i].kjCode.split(" "))
                    //时间
                    d[i].dstr = dstr;
                    //
                    d[i].codeStr = codeStr;
                    //奖池
                    d[i].tj = formatMoeny(d[i].bonusBalance)
                    //销量
                    d[i].xl = formatMoeny(d[i].sale)
                    //500注数
                    d[i].wb = Math.floor(d[i].bonusBalance / 5000000)
                    //
                    var json = {
                        lotIssue: d[i].lotIssue,
                        dstr: d[i].dstr,
                        codeStr: d[i].codeStr,
                        //kjdata: d[i].kjdata,
                        xl: d[i].xl,
                        tj: d[i].tj,
                        wb: d[i].wb
                    }
                    d[i].json = JSON.stringify(json)
                }

                function concatNum(n) {
                    var str = ""
                    for (var i = 0; i < n.length; i++) {
                        str += "<span class='red_balls'>" + n[i] + "</span>"
                    }
                    return str;
                }

                function concatKj(n1, n2, n3) {
                    var r = [];
                    n1 = n1.split(',')
                    n2 = n2.split(',')
                    n3 = n3.split(',')
                    //注数
                    for (var i = 0; i < n1.length; i++) {
                        r.push({
                            n: "",
                            c: n1[i],
                            p: ""
                        })
                    }
                    //奖金
                    for (var j = 0; j < n2.length; j++) {
                        r[j].p = formatMoeny(n2[j])
                    }
                    //name
                    for (var k = 0; k < n3.length; k++) {
                        r[k].n = n3[k]
                    }
                    return r;
                }

                function formatMoeny(num) {
                    var sign, cents;
                    num = num.toString().replace(/\$|\,/g, '');
                    if (isNaN(num)) num = "0";
                    sign = (num == (num = Math.abs(num)));
                    num = Math.floor(num * 100 + 0.50000000001);
                    cents = num % 100;
                    num = Math.floor(num / 100).toString();
                    if (cents < 10) cents = "0" + cents;
                    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
                    return (((sign) ? '' : '-') + num);
                }
                return d;
            }

            function listView(s) {
                var d = formatSd115Data(s.lotolist)
                render(d);
                function render(s) {
                    if (!s || !s.length) {
                        $(".container-mask .tips").html('  暂无开奖数据 %>_<% 请稍后再试')
                        //$(".container-mask").hide();
                    } else {
                        $("#issue-detail,.container-mask").hide();
                        var listTemplate = Handlebars.compile($("#result-list-temp").html());
                        $("#result-group").append(listTemplate({
                            list: s
                        })).delegate("li", "click", function() {
                            var json = ($(this).data("code"))
                        });
                    }
                }
            }

            $('.add-more-data').click(function (){
                $(this).text('正在加载加载更多...')
                n++;
                loadsd115();
            })
        }

        function qyh(n){
            function loadqyh(fn){
                action.queryqyh({
                    pageno: n,
                    pagesize: 20
                }, function(re) {
                    $('.add-more-data').text('点击我加载更多...')
                    listView(re)
                    fn && fn()
                })
            }

            loadqyh(function (){
                $(".account-nav-group li").eq(1).click();
            })

            function formatQyhData(d) {
                for (var i = 0; i < d.length; i++) {
                    var dstr = d[i].endTime.split(' ')[0]
                    var codeStr = concatNum(d[i].kjCode.split(" "))
                    //时间
                    d[i].dstr = dstr;
                    //
                    d[i].codeStr = codeStr;
                    //奖池
                    d[i].tj = formatMoeny(d[i].bonusBalance)
                    //销量
                    d[i].xl = formatMoeny(d[i].sale)
                    //500注数
                    d[i].wb = Math.floor(d[i].bonusBalance / 5000000)
                    //
                    var json = {
                        lotIssue: d[i].lotIssue,
                        dstr: d[i].dstr,
                        codeStr: d[i].codeStr,
                        //kjdata: d[i].kjdata,
                        xl: d[i].xl,
                        tj: d[i].tj,
                        wb: d[i].wb
                    }
                    d[i].json = JSON.stringify(json)
                }

                function concatNum(n) {
                    var str = ""
                    for (var i = 0; i < n.length; i++) {
                        str += "<span class='red_balls'>" + n[i] + "</span>"
                    }
                    return str;
                }

                function concatKj(n1, n2, n3) {
                    var r = [];
                    n1 = n1.split(',')
                    n2 = n2.split(',')
                    n3 = n3.split(',')
                    //注数
                    for (var i = 0; i < n1.length; i++) {
                        r.push({
                            n: "",
                            c: n1[i],
                            p: ""
                        })
                    }
                    //奖金
                    for (var j = 0; j < n2.length; j++) {
                        r[j].p = formatMoeny(n2[j])
                    }
                    //name
                    for (var k = 0; k < n3.length; k++) {
                        r[k].n = n3[k]
                    }
                    return r;
                }

                function formatMoeny(num) {
                    var sign, cents;
                    num = num.toString().replace(/\$|\,/g, '');
                    if (isNaN(num)) num = "0";
                    sign = (num == (num = Math.abs(num)));
                    num = Math.floor(num * 100 + 0.50000000001);
                    cents = num % 100;
                    num = Math.floor(num / 100).toString();
                    if (cents < 10) cents = "0" + cents;
                    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
                    return (((sign) ? '' : '-') + num);
                }
                return d;
            }

            function listView(s) {
                var d = formatQyhData(s.lotolist)
                render(d);
                function render(s) {
                    if (!s || !s.length) {
                        $(".container-mask .tips").html('  暂无开奖数据 %>_<% 请稍后再试')
                        //$(".container-mask").hide();
                    } else {
                        $("#issue-detail,.container-mask").hide();
                        var listTemplate = Handlebars.compile($("#result-list-temp").html());
                        $("#result-group").append(listTemplate({
                            list: s
                        })).delegate("li", "click", function() {
                            var json = ($(this).data("code"))
                        });
                    }
                }
            }

            $('.add-more-data').click(function (){
                $(this).text('正在加载加载更多...')
                n++;
                loadqyh();
            })
        }

        function sfc(n){
            function loadsfc(fn){
                action.querysfc({
                    pageno: n,
                    pagesize: 20
                }, function(re) {
                    $('.add-more-data').text('点击我加载更多...')
                    listView(re)
                    fn && fn()
                })
            }

            loadsfc(function (){
                $(".account-nav-group li").eq(1).click();
            })

            function formatSfcData(d) {
                for (var i = 0; i < d.length; i++) {
                    var dstr = d[i].endTime.split(' ')[0]
                    var codeStr = concatNum(d[i].kjCode)
                    //时间
                    d[i].dstr = dstr;
                    //
                    d[i].codeStr = codeStr;
                    //奖池
                    d[i].tj = formatMoeny(d[i].bonusBalance)
                    //销量
                    d[i].xl = formatMoeny(d[i].sale)
                    //500注数
                    d[i].wb = Math.floor(d[i].bonusBalance / 5000000)
                    //
                    var json = {
                        lotIssue: d[i].lotIssue,
                        dstr: d[i].dstr,
                        codeStr: d[i].codeStr,
                        //kjdata: d[i].kjdata,
                        xl: d[i].xl,
                        tj: d[i].tj,
                        wb: d[i].wb
                    }
                    d[i].json = JSON.stringify(json)
                }

                function concatNum(n) {
                    var str='';

                    str += "<span class='result-jc-result'>" +n+ "</span>"

                    return str;
                }

                function concatKj(n1, n2, n3) {

                    var r = [];
                    n1 = n1.split(',')
                    n2 = n2.split(',')
                    n3 = n3.split(',')
                    /*{
                     name:"",
                     count:"",
                     price:""
                     }*/
                    //注数
                    for (var i = 0; i < n1.length; i++) {
                        r.push({
                            n: "",
                            c: n1[i],
                            p: ""
                        })
                    }
                    //奖金
                    for (var j = 0; j < n2.length; j++) {
                        r[j].p = formatMoeny(n2[j])
                    }
                    //name
                    for (var k = 0; k < n3.length; k++) {
                        r[k].n = n3[k]
                    }
                    return r;
                }

                function formatMoeny(num) {
                    var sign, cents;
                    num = num.toString().replace(/\$|\,/g, '');
                    if (isNaN(num)) num = "0";
                    sign = (num == (num = Math.abs(num)));
                    num = Math.floor(num * 100 + 0.50000000001);
                    cents = num % 100;
                    num = Math.floor(num / 100).toString();
                    if (cents < 10) cents = "0" + cents;
                    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
                    return (((sign) ? '' : '-') + num);
                }
                return d;
            }

            function listView(s) {
                var d = formatSfcData(s.lotolist)
                render(d);
                function render(s) {
                    if (!s || !s.length) {
                        $(".container-mask .tips").html('  暂无开奖数据 %>_<% 请稍后再试')
                        //$(".container-mask").hide();
                    } else {
                        $("#issue-detail,.container-mask").hide();
                        var listTemplate = Handlebars.compile($("#result-list-temp").html());
                        $("#result-group").append(listTemplate({
                            list: s
                        })).delegate("li", "click", function() {
                            var json = ($(this).data("code"))
                        });
                    }
                }
            }

            $('.add-more-data').click(function (){
                $(this).text('正在加载加载更多...')
                n++;
                loadsfc();
            })
        }

    }
    return {
        result : result
    }
});