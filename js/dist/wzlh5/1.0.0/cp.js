define("wzlh5/1.0.0/cp", ["jquery/2.1.1/jquery","tap/0.2.9/tap"], function(require, exports, module) {
    /**
     * Created by hebo (razr409355439@gmail.com)on 2014/9/5.
     */
    var $ = jQuery = require("jquery/2.1.1/jquery");
    require("tap/0.2.9/tap")($);
    //彩票判断流程
    //1   判断是否符合最低要求，(例如 红球最少6 蓝球1)      required
    //2   符合最低要求=》 判断 单复式                    length
    //3   单式 就是1注 ，  复式就需要计算 注数(count)     count()
    //4   计算好以后，渲染视图，判断总金额是否超过限定额度。
    /**
     * 玩法规则定义   统计注数定义
     * @type {{add: add, _counter: _counter, count: count}}
     */
    var PlayTypeRule = {
        /**
         * 增加玩法规则
         * @param code  玩法代码
         * @param name  改玩法类型名称
         * @param rule  规则
         * @param counter 私有统计规则
         * @param formatter 格式化规则
         */
        add: function(code, name, rule, counter, formatter) {
            var c = [];
            for (var e = 0, d = rule.length; e < d; e++) {
                var b = rule[e];
                c.push({
                    //至少几个
                    required: b[0],
                    //胆最多几个
                    dan_max: b[1],
                    //胆最少几个
                    dan_min: b[2],
                    //托最多几个
                    tuo_max: b[3],
                    //托最少几个
                    tuo_min: b[4]
                })
            }
            PlayTypeRule[code] = {};
            PlayTypeRule[code].groupdef = c;
            PlayTypeRule[code].viewname = name;
            PlayTypeRule[code].counter = counter;
            PlayTypeRule[code].formatter = formatter
        },
        /**
         * 统计注数
         * @param j
         * @returns {number}
         * @private
         */
        /**
         * @param j
         * {
       *  playType:'5001',
       *  groups:[{dan:[],tuo:[]},{dan:[],tuo:[]}]
       * }
         *
         *
         */
        _counter: function(j) {
            var f = 1;
            var b = PlayTypeRule[j.code].groupdef;
            for (var e = 0, c = b.length; e < c; e++) {
                var h = j.groups[e];
                var g = b[e].required;
                var d = h.dan ? h.dan.length : 0;
                var a = h.tuo.length;
                f *= Math.combine(a, g - d)
            }
            return f
        },
        count: function(a) {
            if (typeof(PlayTypeRule[a.code]) != "object") {
                return false
            }
            var b;
            if (typeof(PlayTypeRule[a.code].counter) == "function") {
                b = PlayTypeRule[a.code].counter(a)
            } else {
                b = PlayTypeRule._counter(a)
            }
            return b
        }
    }
    //
    //增加球类 玩法规则
    //
    //code  玩法代码
    //name  玩法名称
    //rule 玩法规则，数组格式
    //     required --至少几个球
    //     dan_max  --胆最多几个
    //     dan_min  --胆最少几个
    //     tuo_max  --拖最多几个
    //     tuo_min  --拖最少几个
    //count  该玩法的统计注数规则
    PlayTypeRule.add('ssq_ds', "双色球单式", [
        [6, 0, 0, 6, 6],
        [1, 0, 0, 1, 1]
    ])
    PlayTypeRule.add('ssq_fs', "双色球复式", [
        [6, 0, 0, 20, 6],
        [1, 0, 0, 16, 1]
    ])
    PlayTypeRule.add('fc1d_ds', "福彩1D单式", [
        [1, 0, 0, 1, 1],
        [1, 0, 0, 1, 1],
        [1, 0, 0, 1, 1]
    ])
    PlayTypeRule.add('fc1d_fs', "福彩1D复式", [
        [1, 0, 0, 10, 1],
        [1, 0, 0, 10, 1],
        [1, 0, 0, 10, 1]
    ])
    PlayTypeRule.add('ssq_dt', "双色球胆拖", [
        [6, 5, 1, 19, 1],
        [1, 0, 0, 16, 1]
    ])
    PlayTypeRule.add('dlt_ds', "大乐透单式", [
        [5, 0, 0, 5, 5],
        [2, 0, 0, 2, 2]
    ])
    PlayTypeRule.add('dlt_fs', "大乐透复式", [
        [5, 0, 0, 18, 5],
        [2, 0, 0, 12, 2]
    ])
    PlayTypeRule.add('dlt_dt', "大乐透胆拖", [
        // [5, 4, 1, 16, 2],
        [5, 4, 1, 16, 2], //前区胆+ 前区拖 至少6个（我中啦
        [2, 1, 1, 12, 2]
    ])
    PlayTypeRule.add('fc3d_ds', "福彩3d直选单式", [
        [1, 0, 0, 1, 1],
        [1, 0, 0, 1, 1],
        [1, 0, 0, 1, 1]
    ])
    PlayTypeRule.add('fc3d_fs', "福彩3d直选复式", [
        [1, 0, 0, 10, 1],
        [1, 0, 0, 10, 1],
        [1, 0, 0, 10, 1]
    ])
    PlayTypeRule.add('fc3d_hz', "福彩3d直选和值", [
        [1, 0, 0, 1, 1]
    ], function(c) {
        var f = 0;
        var b = c.groups[0].tuo;
        for (var e = 0; e < b.length; e++) {
            var d = b[e];
            if (a(d)) {
                f += a(d)
            }
        }

        function a(g) {
            switch (g) {
                case "0":
                case "27":
                    return 1;
                case "1":
                case "26":
                    return 3;
                case "2":
                case "25":
                    return 6;
                case "3":
                case "24":
                    return 10;
                case "4":
                case "23":
                    return 15;
                case "5":
                case "22":
                    return 21;
                case "6":
                case "21":
                    return 28;
                case "7":
                case "20":
                    return 36;
                case "8":
                case "19":
                    return 45;
                case "9":
                case "18":
                    return 55;
                case "10":
                case "17":
                    return 63;
                case "11":
                case "16":
                    return 69;
                case "12":
                case "15":
                    return 73;
                case "13":
                case "14":
                    return 75
            }
        }
        return f
    })
    PlayTypeRule.add('fc3d_z3ds', "福彩3d组三单式", [
        [1, 0, 0, 1, 1]
    ])
    PlayTypeRule.add('fc3d_z3fs', "福彩3d组三复式", [
        [2, 0, 0, 10, 2]
    ], function(b) {
        var a = b.groups[0].tuo;
        return Math.combine(a.length, 2) * 2
    })
    PlayTypeRule.add('fc3d_z6fs', "福彩3d组六复式", [
        [3, 0, 0, 10, 3]
    ], function(b) {
        var a = b.groups[0].tuo;
        return Math.combine(a.length, 3)
    })
    PlayTypeRule.add('pl3_ds', "排列三直选单式", [
        [1, 0, 0, 1, 1],
        [1, 0, 0, 1, 1],
        [1, 0, 0, 1, 1]
    ])
    PlayTypeRule.add('pl3_fs', "排列三直选复式", [
        [1, 0, 0, 10, 1],
        [1, 0, 0, 10, 1],
        [1, 0, 0, 10, 1]
    ])
    PlayTypeRule.add('pl3_hz', "排列三直选和值", [
        [1, 0, 0, 1, 1]
    ], function(c) {
        var f = 0;
        var b = c.groups[0].tuo;
        for (var e = 0; e < b.length; e++) {
            var d = b[e];
            if (a(d)) {
                f += a(d)
            }
        }

        function a(g) {
            switch (g) {
                case "0":
                case "27":
                    return 1;
                case "1":
                case "26":
                    return 3;
                case "2":
                case "25":
                    return 6;
                case "3":
                case "24":
                    return 10;
                case "4":
                case "23":
                    return 15;
                case "5":
                case "22":
                    return 21;
                case "6":
                case "21":
                    return 28;
                case "7":
                case "20":
                    return 36;
                case "8":
                case "19":
                    return 45;
                case "9":
                case "18":
                    return 55;
                case "10":
                case "17":
                    return 63;
                case "11":
                case "16":
                    return 69;
                case "12":
                case "15":
                    return 73;
                case "13":
                case "14":
                    return 75
            }
        }
        return f
    })
    PlayTypeRule.add('pl3_z3ds', "排列三组三单式", [
        [1, 0, 0, 1, 1]
    ])
    PlayTypeRule.add('pl3_z3fs', "排列三组三复式", [
        [2, 0, 0, 10, 2]
    ], function(b) {
        var a = b.groups[0].tuo;
        return Math.combine(a.length, 2) * 2
    })
    PlayTypeRule.add('pl3_z6ds', "排列三组六单式", [
        [3, 0, 0, 10, 3]
    ], function(b) {
        var a = b.groups[0].tuo;
        return Math.combine(a.length, 3)
    })
    PlayTypeRule.add('pl3_z6fs', "排列三组六复式", [
        [3, 0, 0, 10, 3]
    ], function(b) {
        var a = b.groups[0].tuo;
        return Math.combine(a.length, 3)
    })
    PlayTypeRule.add('ssc_yxzx', "时时彩一星直选", [
        [1, 0, 0, 10, 1]
    ])
    PlayTypeRule.add('ssc_exzx', "时时彩二星直选", [
        [1, 0, 0, 1, 1],
        [1, 0, 0, 1, 1]
    ])
    PlayTypeRule.add('ssc_exhz', "时时彩二星和值", [
        [1, 0, 0, 19, 1]
    ], function(c) {
        var f = 0;
        var b = c.groups[0].tuo;
        for (var e = 0; e < b.length; e++) {
            var d = b[e].element;
            if (a(d)) {
                f += a(d)
            }
        }

        function a(g) {
            switch (g) {
                case "0":
                case "18":
                    return 1;
                case "1":
                case "17":
                    return 2;
                case "2":
                case "16":
                    return 3;
                case "3":
                case "15":
                    return 4;
                case "4":
                case "14":
                    return 5;
                case "5":
                case "13":
                    return 6;
                case "6":
                case "12":
                    return 7;
                case "7":
                case "11":
                    return 8;
                case "8":
                case "10":
                    return 9;
                case "9":
                    return 10
            }
        }
        return f
    })
    PlayTypeRule.add('ssc_exfx', "时时彩二星直选复式", [
        [1, 0, 0, 10, 1],
        [1, 0, 0, 10, 1]
    ])
    PlayTypeRule.add('ssc_3xds', "时时彩三星单式", [
        [1, 0, 0, 1, 1],
        [1, 0, 0, 1, 1],
        [1, 0, 0, 1, 1]
    ]);
    PlayTypeRule.add('ssc_3xfs', "时时彩三星复式", [
        [1, 0, 0, 10, 1],
        [1, 0, 0, 10, 1],
        [1, 0, 0, 10, 1]
    ]);
    var hezhi_counter = function(c) {
        var f = 0;
        var b = c.groups[0].tuo;
        for (var e = 0; e < b.length; e++) {
            var d = b[e].element;
            if (a(d)) {
                f += a(d)
            }
        }

        function a(g) {
            switch (g) {
                case "0":
                case "27":
                    return 1;
                case "1":
                case "26":
                    return 3;
                case "2":
                case "25":
                    return 6;
                case "3":
                case "24":
                    return 10;
                case "4":
                case "23":
                    return 15;
                case "5":
                case "22":
                    return 21;
                case "6":
                case "21":
                    return 28;
                case "7":
                case "20":
                    return 36;
                case "8":
                case "19":
                    return 45;
                case "9":
                case "18":
                    return 55;
                case "10":
                case "17":
                    return 63;
                case "11":
                case "16":
                    return 69;
                case "12":
                case "15":
                    return 73;
                case "13":
                case "14":
                    return 75
            }
        }
        return f
    }
    PlayTypeRule.add('ssc_sxhz', "时时彩三星和值", [
        [1, 0, 0, 1, 1]
    ], hezhi_counter);
    PlayTypeRule.add('ssc_zsds', "时时彩组三单式", [
        [3, 0, 0, 3, 3]
    ]);
    //TODO
    PlayTypeRule.add('ssc_zsfs', "时时彩组三复式", [
        [3, 0, 0, 3, 3]
    ]);
    PlayTypeRule.add('ssc_5xds', "时时彩五星单式", [
        [1, 0, 0, 1, 1],
        [1, 0, 0, 1, 1],
        [1, 0, 0, 1, 1],
        [1, 0, 0, 1, 1],
        [1, 0, 0, 1, 1]
    ]);
    PlayTypeRule.add('ssc_5xfs', "时时彩五星复式", [
        [1, 0, 0, 10, 1],
        [1, 0, 0, 10, 1],
        [1, 0, 0, 10, 1],
        [1, 0, 0, 10, 1],
        [1, 0, 0, 10, 1]
    ]);
    //PlayTypeRule.add(PlayType.JXSSC_WXTXDS, "五星通选单式", [[1, 0, 0, 1, 1], [1, 0, 0, 1, 1], [1, 0, 0, 1, 1], [1, 0, 0, 1, 1], [1, 0, 0, 1, 1]]);
    PlayTypeRule.add('ssc_5xtx', "时时彩五星通选", [
        [1, 0, 0, 10, 1],
        [1, 0, 0, 10, 1],
        [1, 0, 0, 10, 1],
        [1, 0, 0, 10, 1],
        [1, 0, 0, 10, 1]
    ]);
    PlayTypeRule.add('ssc_4xds', "四星单式", [
        [1, 0, 0, 1, 1],
        [1, 0, 0, 1, 1],
        [1, 0, 0, 1, 1],
        [1, 0, 0, 1, 1]
    ]);
    PlayTypeRule.add('ssc_4xfs', "四星复式", [
        [1, 0, 0, 10, 1],
        [1, 0, 0, 10, 1],
        [1, 0, 0, 10, 1],
        [1, 0, 0, 10, 1]
    ]);
    var jxssc_r1_counter = function(a) {
        var d = 0;
        for (var c = 0, b = a.groups.length; c < b; c++) {
            var e = a.groups[c];
            var f = e.tuo.length;
            if (f == 1 && e.tuo[0] == C.PLANCONTENT.PLACEHOLDER) {
                continue
            }
            d += f
        }
        return d
    };
    PlayTypeRule.add('ssc_ryds', "任一单式", [
        [1, 0, 0, 1, 1],
        [1, 0, 0, 1, 1],
        [1, 0, 0, 1, 1],
        [1, 0, 0, 1, 1],
        [1, 0, 0, 1, 1]
    ], jxssc_r1_counter);
    PlayTypeRule.add('ssc_ryfs', "任一复式", [
        [1, 0, 0, 10, 1],
        [1, 0, 0, 10, 1],
        [1, 0, 0, 10, 1],
        [1, 0, 0, 10, 1],
        [1, 0, 0, 10, 1]
    ], jxssc_r1_counter);
    var jxssc_r2_counter = function(o) {
        var h = 0;
        var l = [];
        var n = [];
        for (var g = 0, d = o.groups.length; g < d; g++) {
            var k = o.groups[g];
            var c = k.tuo.length;
            if (c == 1 && k.tuo[0] == C.PLANCONTENT.PLACEHOLDER) {
                l.push(0);
                continue
            }
            l.push(c);
            n.push(g)
        }
        var f = Math.fullCombination(n, 2);
        for (var g = 0, d = f.length; g < d; g++) {
            var m = f[g];
            var b = 1;
            for (var e = 0, a = m.length; e < a; e++) {
                b *= l[m[e]]
            }
            h += b
        }
        return h
    };
    PlayTypeRule.add('ssc_reds', "任二单式", [
        [1, 0, 0, 1, 1],
        [1, 0, 0, 1, 1],
        [1, 0, 0, 1, 1],
        [1, 0, 0, 1, 1],
        [1, 0, 0, 1, 1]
    ], jxssc_r2_counter);
    PlayTypeRule.add('ssc_refs', "任二复式", [
        [1, 0, 0, 10, 1],
        [1, 0, 0, 10, 1],
        [1, 0, 0, 10, 1],
        [1, 0, 0, 10, 1],
        [1, 0, 0, 10, 1]
    ], jxssc_r2_counter);
    //排列五
    PlayTypeRule.add("pl5_ds", "单式", [
        [1, 0, 0, 1, 1], [1, 0, 0, 1, 1], [1, 0, 0, 1, 1], [1, 0, 0, 1, 1], [1, 0, 0, 1, 1]
    ]);
    PlayTypeRule.add("pl5_fs", "复式", [
        [1, 0, 0, 10, 1], [1, 0, 0, 10, 1], [1, 0, 0, 10, 1], [1, 0, 0, 10, 1], [1, 0, 0, 10, 1]
    ]);
    //11选五
    PlayTypeRule.add("11x5_q1ds", "前一单式", [[1, 0, 0, 1, 1]]);
    PlayTypeRule.add("11x5_q1fs", "前一复式", [[1, 0, 0, 11, 1]]);
    PlayTypeRule.add("11x5_r1ds", "任选一单式", [[1, 0, 0, 1, 1]]);
    PlayTypeRule.add("11x5_r1fs", "任选一复式", [[1, 0, 0, 11, 1]]);
    PlayTypeRule.add("11x5_r2ds", "任选二单式", [[2, 0, 0, 2, 2]]);
    PlayTypeRule.add("11x5_r2fs", "任选二复式", [[2, 0, 0, 11, 2]]);
    PlayTypeRule.add("11x5_r2dt", "任选二胆拖", [[2, 1, 1, 10, 1]]);
    PlayTypeRule.add("11x5_r3ds", "任选三单式", [[3, 0, 0, 3, 3]]);
    PlayTypeRule.add("11x5_r3fs", "任选三复式", [[3, 0, 0, 11, 3]]);
    PlayTypeRule.add("11x5_r3dt", "任选三胆拖", [[3, 2, 1, 10, 1]]);
    PlayTypeRule.add("11x5_r4ds", "任选四单式", [[4, 0, 0, 4, 4]]);
    PlayTypeRule.add("11x5_r4fs", "任选四复式", [[4, 0, 0, 11, 4]]);
    PlayTypeRule.add("11x5_r4dt", "任选四胆拖", [[4, 3, 1, 10, 1]]);
    PlayTypeRule.add("11x5_r5ds", "任选五单式", [[5, 0, 0, 5, 5]]);
    PlayTypeRule.add("11x5_r5fs", "任选五复式", [[5, 0, 0, 11, 5]]);
    PlayTypeRule.add("11x5_r6ds", "任选六单式", [[6,0,0,6,6]]);
    PlayTypeRule.add("11x5_r6fs", "任选六复式", [[6,0,0,11,6]]);
    PlayTypeRule.add("11x5_r6dt", "任选六胆拖", [[6, 5, 1, 10, 1]]);
    PlayTypeRule.add("11x5_r7ds", "任选七单式", [[7, 0, 0, 7, 7]]);
    PlayTypeRule.add("11x5_r7fs", "任选七复式", [[7, 0, 0, 11, 7]]);
    PlayTypeRule.add("11x5_r7dt", "任选七胆拖", [[7, 6, 1, 10, 1]]);
    PlayTypeRule.add("11x5_r8ds", "任选八单式", [[8, 0, 0, 8, 8]]);
    PlayTypeRule.add("11x5_r8fs", "任选八复式", [[8, 0, 0, 11, 8]]);
    PlayTypeRule.add("11x5_r8dt", "任选八胆拖", [[8, 7, 1, 10, 1]]);
    PlayTypeRule.add("11x5_q2ds", "前二直选单式", [[1, 0, 0, 1, 1], [1, 0, 0, 1, 1]], function (j) {
        var e = 0;
        var b = PlayTypeRule[j.code].groupdef;
        var g = j.groups[0].tuo;
        var c = j.groups[1].tuo;
        for (var h = 0; h < g.length; h++) {
            var a = g[h];
            for (var d = 0; d < c.length; d++) {
                var f = c[d];
                if (a == f) {
                    continue
                }
                e++
            }
        }
        return e
    });
    PlayTypeRule.add("11x5_q2fs", "前二直选复式", [[1, 0, 0, 10, 1], [1, 0, 0, 10, 1]], function (j) {
        var e = 0;
        var b = PlayTypeRule[j.code].groupdef;
        var g = j.groups[0].tuo;
        var c = j.groups[1].tuo;
        for (var h = 0; h < g.length; h++) {
            var a = g[h];
            for (var d = 0; d < c.length; d++) {
                var f = c[d];
                if (a == f) {
                    continue
                }
                e++
            }
        }
        return e
    });
    PlayTypeRule.add("11x5_q2zxds", "前二组选单式", [[2, 0, 0, 2, 2]]);
    PlayTypeRule.add("11x5_q2zxfs", "前二组选复式", [[2, 0, 0, 11, 2]]);
    PlayTypeRule.add("11x5_q3ds", "前三直选单式", [[1, 0, 0, 1, 1], [1, 0, 0, 1, 1], [1, 0, 0, 1, 1]], function (n) {
        var h = 0;
        var d = PlayTypeRule[n.code].groupdef;
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
                    h++
                }
            }
        }
        return h
    });
    PlayTypeRule.add("11x5_q3fs", "前三直选复式", [[1, 0, 0, 9, 1], [1, 0, 0, 9, 1], [1, 0, 0, 9, 1]], function (n) {
        var h = 0;
        var d = PlayTypeRule[n.code].groupdef;
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
                    h++
                }
            }
        }
        return h
    });
    PlayTypeRule.add("11x5_q3zxds", "前三组选单式", [[3, 0, 0, 3, 3]]);
    PlayTypeRule.add("11x5_q3zxfs", "前三组选复式", [[3, 0, 0, 11, 3]]);
    //七星彩
    PlayTypeRule.add("qxc_ds", "单式", [
        [1, 0, 0, 1, 1], [1, 0, 0, 1, 1], [1, 0, 0, 1, 1], [1, 0, 0, 1, 1], [1, 0, 0, 1, 1], [1, 0, 0, 1, 1], [1, 0, 0, 1, 1]
    ]);
    PlayTypeRule.add("qxc_fs", "复式", [
        [1, 0, 0, 10, 1], [1, 0, 0, 10, 1], [1, 0, 0, 10, 1], [1, 0, 0, 10, 1], [1, 0, 0, 10, 1], [1, 0, 0, 10, 1], [1, 0, 0, 10, 1]
    ]);
    //七乐彩
    PlayTypeRule.add("qlc_ds", "单式", [[7, 0, 0, 7, 7]]);
    PlayTypeRule.add("qlc_fs", "复式", [[7, 0, 0, 16, 7]]);
    PlayTypeRule.add("qlc_dt", "胆拖", [[7, 6, 1, 15, 1]]);
    //
    /**
     * 竞彩足球配置
     */
    var JC = {};
    JC.spf = {
        buyData: [
            ["3", "1", "0"],
            ["胜", "平", "负"]
        ],
        spmap: {
            s: "3",
            p: "1",
            f: "0"
        },
        playType: {
            "1_1":  ["3002", "单关"],
            "2_1":  ["3003", "2串1"],
            "3_1":  ["3004", "3串1"],
            "4_1":  ["3005", "4串1"],
            "5_1":  ["3006", "5串1"],
            "6_1":  ["3007", "6串1"],
            "7_1":  ["3008", "7串1"],
            "8_1":  ["3009", "8串1"],
            "9_1":  ["3010", "9串1"],
            "10_1": ["3011", "10串1"],
            "11_1": ["3012", "11串1"],
            "12_1": ["3013", "12串1"],
            "13_1": ["3014", "13串1"],
            "14_1": ["3015", "14串1"],
            "15_1": ["3016", "15串1"],
            "2_3":  ["3017", "2串3"],
            "3_4":  ["3018", "3串4"],
            "3_7":  ["3019", "3串7"],
            "4_5":  ["3020", "4串5"],
            "4_11": ["3021", "4串11"],
            "4_15": ["3022", "4串15"],
            "5_6":  ["3023", "5串6"],
            "5_16": ["3024", "5串16"],
            "5_26": ["3025", "5串26"],
            "5_31": ["3026", "5串31"],
            "6_7":  ["3027", "6串7"],
            "6_22": ["3028", "6串22"],
            "6_42": ["3029", "6串42"],
            "6_57": ["3030", "6串57"],
            "6_63": ["3031", "6串63"]
        },
        passTypeNameDecoder: {
            "2_3":  ["1_1", "2_1"],
            "3_4":  ["2_1", "3_1"],
            "3_7":  ["1_1", "2_1", "3_1"],
            "4_5":  ["3_1", "4_1"],
            "4_11": ["2_1", "3_1", "4_1"],
            "4_15": ["1_1", "2_1", "3_1", "4_1"],
            "5_6":  ["4_1", "5_1"],
            "5_16": ["3_1", "4_1", "5_1"],
            "5_26": ["2_1", "3_1", "4_1", "5_1"],
            "5_31": ["1_1", "2_1", "3_1", "4_1", "5_1"],
            "6_7":  ["5_1", "6_1"],
            "6_22": ["4_1", "5_1", "6_1"],
            "6_42": ["3_1", "4_1", "5_1", "6_1"],
            "6_57": ["2_1", "3_1", "4_1", "5_1", "6_1"],
            "6_63": ["1_1", "2_1", "3_1", "4_1", "5_1", "6_1"]
        }
    }
    /**
     * 生成指定类型的随机号码
     * @param type   生成号码类型 （ssq==双色球）
     * @param len    生成份数
     * @returns {{arr: Array, arrJoin: Array}}  返回2种类型的数据  arr 数组类型号码[16 ，08 ，15 ，25 ，13 ，26，06]  arrJoin 文字类型  "16 08 15 25 13 26#06"
     */
    function createNumber(type, len) {
        var r = [],
            rj = [];
        var a1 = arguments[1],
            a2 = arguments[2],
            a3 = arguments[3];

        function createBaseNumber(start, end, fill) {
            var r = [];
            for (var i = start; i <= end; i++) {
                if (fill) i = i < 10 ? '0' + i : String(i);
                r.push(String(i))
            }
            return r;
        }

        function getRandomNumer(arr, n) {
            arr.sort(function() {
                return 0.5 - Math.random()
            });
            return arr.slice(0, n);
        }

        function ssq() {
            var red = createBaseNumber(1, 33),
                blue = createBaseNumber(1, 16)
            var ar, ab;
            for (var i = 0; i < len; i++) {
                ar = getRandomNumer(red, 6)
                ab = getRandomNumer(blue, 1)
                rj.push(ar.join(' ') + '#' + ab);
                r.push(ar.concat(ab))
            }
            return r;
        }

        function dlt() {
            var red = createBaseNumber(1, 35),
                blue = createBaseNumber(1, 12)
            var ar, ab;
            for (var i = 0; i < len; i++) {
                ar = getRandomNumer(red, 5)
                ab = getRandomNumer(blue, 2)
                rj.push(ar.join(' ') + '#' + ab.join(' '));
                r.push(ar.concat(ab))
            }
            return r;
        }

        function t3p() {
            var nums = base3();
            if (len < 1000) {
                var dataNum = getRandomNumer(nums, len);
                var dataStr = merge3(dataNum);
                r = dataNum;
                rj = dataStr;
            } else {
                var b = Math.floor(len / 1000);
                var s = len % 1000;
                var dur = repeatMe(nums, b)
                r = dur.concat(nums.slice(0, s));
                rj = merge3(r)
            }
            return r;
        }

        function rssc() {
            var num = createBaseNumber(0, 9, false);
            var _len = 1 || a2;
            switch (a1) {
                case "2x":
                    num = num.concat(num)
                    _len = 2;
                    break;
                case "3x":
                    num = num.concat(num).concat(num)
                    _len = 3;
                    break;
            }
            var re = getRandomNumer(num, _len);
            return re;
        }

        function merge3(arr) {
            var re = [];
            for (var i = 0; i < len; i += 4) {
                var rea = '';
                switch (len - i) {
                    case 1:
                        rea = arr[i]
                        break;
                    case 2:
                        rea = arr[i] + ',' + (arr[i + 1])
                        break;
                    case 3:
                        rea = arr[i] + ',' + (arr[i + 1]) + ',' + (arr[i + 2])
                        break;
                    default:
                        rea = arr[i] + ',' + (arr[i + 1]) + ',' + (arr[i + 2]) + ',' + (arr[i + 3])
                }
                re.push(rea);
            }
            return re;
        }

        function base3() {
            var r = [];
            for (var i = 0; i < 1000; i++) {
                i = i < 100 ? (i < 10 ? '00' + i : '0' + i) : String(i);
                r.push(i)
            }
            return getRandomNumer(r, 1000);
        }

        function repeatMe(arr, n) {
            var r = [];
            for (var i = 0; i < n; i++) {
                r = r.concat(arr)
            }
            return r;
        }

        function random() {
            if (a1 > a2) {
                a1 = arguments[2]
                a2 = arguments[1]
            }
            var nr = createBaseNumber(a1, a2);
            var re = getRandomNumer(nr, a3);
            return re;
        }
        switch (type) {
            case 'ssq':
                return ssq();
                break;
            case 'dlt':
                return dlt();
                break;
            case 'f3d':
                return t3p();
                break;
            case 't3p':
                return t3p();
                break;
            case 'rssc':
                return rssc();
                break;
            case 'r':
            case 'random':
                return random();
                break;
            default:
        }
        //    return {
        //      arr: r,
        //      arrJoin: rj
        //    };
    }
    var numberGenerator = {
        ssq: function(len) {
            return createNumber('ssq', len)
        },
        dlt: function(len) {
            return createNumber('dlt', len)
        },
        ssc: function(len) {
            return createNumber('rssc', len)
        },
        r: function(start, end, len) {
            return createNumber('r', start, end, len)
        },
        rssc: function(type) {
            var re = createNumber('rssc', type)
            return re;
        }
    }
    /**
     * 号码选择器
     * @param uopts
     * @returns {NumberSelect}
     */

    function numberSelect(uopts) {
        var def = {
            min: 1,
            ispad: true,
            max: 33,
            //号码选择以前事件
            numberSelectBefore: undefined,
            //号码选择以后触发事件
            numberSelectAfter: undefined,
            //号码取消选择以后触发事件
            numberUnSelectAfter: undefined,
            //ball 选择器
            selectStyle: "",
            //父级id
            containerId: "",
            //view被选中以后的 class
            viewSelectedStyle: "active",
            //多选
            multipleSelect: true
        }
        var opts = $.extend(def, uopts)
        //dom 选择器
        var f = $(opts.containerId).find(opts.selectStyle);
        var me = new NumberSelect(f, opts)
        var u = [],
            m = {};
        for (var i = 0; i < f.length; i++) {
            u.push(i + 1);
        }
        f.each(function(index, dom) {
        	
            $(dom).on('tap', function() {
            	console.log(6666666666)
                var i;
                if (typeof(opts.numberSelectBefore) == "function") {
                    //2014-10-14 17:12:53  修改  old (index+1)
                    if (opts.min == 1) {
                        i = opts.numberSelectBefore(index + 1)
                    } else {
                        i = opts.numberSelectBefore(index)
                    }
                }
                if (i === false) {
                    return
                }
                var n = $(this).text()
                me.toggleSelect(n)
            })
        })
        me.values = u;
        return me;
    }
    //号码选择
    function NumberSelect(ele, opts) {
        this.opts = opts;
        this.elements = ele;
        this.selected = {};
        this.viewSelected = {};
    }
    NumberSelect.prototype = {
        getSelected: function() {
            var me = this;
            var u = [],
                u2 = [];
            for (var i in me.selected) {
                u2.push(i)
            }
            u2.sort(function(n1, n2) {
                return n1 - n2;
            })
            for (var n = 0; n < u2.length; n++) {
                if (me.opts.ispad) {
                    u.push(pad(u2[n]))
                } else {
                    u.push(u2[n])
                }
            }
            return u;
        },
        toggleSelect: function(v) {
            var me = this;
            v = parseInt(v, 10)
            if (me.selected[v]) {
                me.unselect(v)
            } else {
                me.select(v);
            }
        },
        select: function(n) {
            var me = this;
            if ($.isArray(n)) {
                for (var i = 0; i < n.length; i++) {
                    p(n[i])
                }
            } else {
                p(n)
            }

            function p(n) {
                var i;
                if (typeof(me.opts.numberSelectBefore) == "function") {
                    i = me.opts.numberSelectBefore(n)
                }
                if (i === false) {
                    return
                }
                n = parseInt(n, 10)
                //2014-10-14 17:14:22   增加是否多选选择判断
                if (me.opts.multipleSelect) {
                    me.viewSelect(n)
                    me.selected[n] = 1;
                } else {
                    me.clear();
                    me.viewSelect(n)
                    me.selected[n] = 1;
                }
            }
            var f;
            if (me.opts.ispad) {
                f = pad(n)
            } else {
                f = n;
            }
            if (typeof(this.opts.numberSelectAfter) == "function") {
                this.opts.numberSelectAfter(f)
            }
        },
        unselect: function(n) {
            var me = this;
            if ($.isArray(n)) {
                for (var i = 0; i < n.length; i++) {
                    p(n[i])
                }
            } else {
                p(n)
            }

            function p() {
                n = parseInt(n, 10)
                me.viewUnSelect(n)
                delete me.selected[n]
            }
            var f = pad(n)
            if (typeof(this.opts.numberUnSelectAfter) == "function") {
                this.opts.numberUnSelectAfter(f)
            }
        },
        clear: function() {
            var me = this;
            var u = [];
            for (var i in me.selected) {
                u.push(parseInt(i, 10))
            }
            me.unselect(u);
            me.viewClear(u)
            me.selected = {};
            return this;
        },
        isSelected: function(v) {
            var me = this;
            return me.selected[v] === 1;
        },
        /**
         * 视图选择    依赖 this.elements以及 this.opts.viewSelectedStyle
         * @param n
         */
        viewSelect: function(n) {
            var me = this;
            if ($.isArray(n)) {
                for (var i = 0; i < n.length; i++) {
                    p(n[i])
                }
            } else {
                p(n)
            }

            function p(n) {
                var i;
                if (typeof(me.opts.numberSelectBefore) == "function") {
                    i = me.opts.numberSelectBefore(n)
                }
                if (i === false) {
                    return
                }
                if (me.opts.min == 0) {
                    n = parseInt(n, 10)
                } else {
                    n = parseInt(n - 1, 10)
                }
                $(me.elements[n]).addClass(me.opts.viewSelectedStyle);
                me.viewSelected[n] = 1;
            }
        },
        viewUnSelect: function(n) {
            var me = this;
            if ($.isArray(n)) {
                for (var i = 0; i < n.length; i++) {
                    p(n[i])
                }
            } else {
                p(n)
            }

            function p(n) {
                if (me.opts.min == 0) {
                    n = parseInt(n, 10)
                } else {
                    n = parseInt(n - 1, 10)
                }
                $(me.elements[n]).removeClass(me.opts.viewSelectedStyle)
                delete me.viewSelected[n]
            }
        },
        viewClear: function() {
            var me = this;
            $(me.elements).removeClass(me.opts.viewSelectedStyle)
            me.viewSelected = {};
        }
    }
    //补位
    function pad(num, n) {
        var len = num.toString().length;
        n = n || 2;
        while (len < n) {
            num = "0" + num;
            len++;
        }
        return num;
    }
    /**
     *  洗牌，随机生成号码
     * @param opts    pool（牌池）  min 最小值  max最大值  count 选几个 padding 间隔 sort是否排序
     * @returns {Array}
     */
    function shuffle(opts) {
        var g = $.extend({
            pool: undefined,
            min: 1,
            max: 10,
            count: 5,
            padding: 0,
            sort: false
        }, opts);
        if (g.max < g.count) {
            return []
        }
        var f;
        if (g.pool) {
            f = g.pool
        } else {
            f = [];
            for (var e = g.min; e <= g.max; e++) {
                f.push(e)
            }
        }
        var b = [];
        var e = 0;
        while (e < g.count) {
            var c = parseInt((f.length - e) * Math.random(), 10);
            if (g.padding > 0) {
                b.push(pad(f[c].toString()))
            } else {
                b.push(f[c])
            }
            e++;
            var d = f[c];
            f[c] = f[f.length - e];
            f[f.length - e] = d
        }
        if (g.sort) {
            b = b.sort(function(j, i) {
                return parseInt(j, 10) - parseInt(i, 10)
            })
        }
        return b
    }
    /**
     * 扩展Math
     */
    $.extend(Math, {
        permute: function(d, a) {
            var b = 1;
            for (var c = 0; c < a; c++) {
                b *= (d - c)
            }
            return parseInt(b, 10)
        },
        combine: function(c, a) {
            var b = Math.permute(c, a);
            b /= Math.permute(a, a);
            return parseInt(b, 10)
        },
        fullCombination: function(j, b) {
            var d = [];
            var g = j.length;
            var e = [];
            for (var c = 0; c <= b; c++) {
                e.push(c - 1)
            }
            var h = b;
            var f = true;
            while (e[0] == -1) {
                if (f) {
                    var a = [];
                    for (var c = 1; c <= b; c++) {
                        a.push(j[e[c]])
                    }
                    d.push(a);
                    f = false
                }
                e[h]++;
                if (e[h] == g) {
                    e[h] = 0;
                    h--;
                    continue
                }
                if (h < b) {
                    h++;
                    e[h] = e[h - 1];
                    continue
                }
                if (h == b) {
                    f = true
                }
            }
            return d
        },
        fullCombinationDantuo: function(f, a, j) {
            var d = 0;
            if (a) {
                d = a.length
            }
            var c = j.length;
            if (d + c < f) {
                return false
            }
            var b = f - d;
            var h = Math.fullCombination(j, b);
            for (var e = 0, g = h.length; e < g; e++) {
                h[e] = h[e].concat(a)
            }
            return h
        },
        countCombinationDantuo: function(c, a, b) {
            a = (typeof(a) == "undefined") ? 0 : a;
            var d = c - a;
            return Math.combine(b, d)
        },
        arrayFullCombination: function(a) {
            var d = function(g, e) {
                var n = g;
                var l = [];
                while (e.length > 0) {
                    for (var j = 0; j < n.length; j++) {
                        var f = [e[0]];
                        for (var h = 0; h < n[j].length; h++) {
                            f.push(n[j][h])
                        }
                        l.push(f)
                    }
                    e = e.slice(1, e.length)
                }
                return l
            };
            var c = Math.fullCombination(a[0], 1);
            for (var b = 1; b < a.length; b++) {
                c = d(c, a[b])
            }
            return c
        },
        arrayIsPartRepeat: function(a, c) {
            var b = 0,
                e = {},
                d = c || 0;
            for (; b < a.length; b++) {
                if (e[a[b]] === undefined) {
                    e[a[b]] = 0
                } else {
                    if (++e[a[b]] > d) {
                        return false
                    }
                }
            }
            return true
        },
        arrayIsNoRepeat: function(a) {
            return Math.arrayIsPartRepeat(a, 0)
        },
        arrayIsHasPartRepeat: function(e, f) {
            var j = e.length;
            var b = [];
            var g = [];
            var h = [];
            var k = [];
            var a = 1;
            for (var d = 0; d < j; d++) {
                b[d] = e[d].length;
                a = a * b[d];
                g[d] = 0
            }
            for (var d = 0; d < a; d++) {
                h[d] = []
            }
            var c = 0;
            while (true) {
                for (var d = 0; d < j; d++) {
                    h[c][d] = (g[d] + 1);
                    k[d] = e[d][h[c][d] - 1]
                }
                if (Math.arrayIsPartRepeat(k, f)) {
                    return true
                }
                c++;
                for (var d = j - 1; d >= 0; d--) {
                    if (g[d] == b[d] - 1) {
                        g[d] = 0
                    } else {
                        break
                    }
                }
                if (d < 0) {
                    break
                }
                g[d]++
            }
            return false
        },
        arrayIsHasNoRepeat: function(a) {
            return Math.arrayIsHasPartRepeat(a, 0)
        }
    });
    var CPCONFIG = {
        SSQ: {
            BLUE_MAX: 16,
            BLUE_MIN: 1,
            RED_MAX: 33,
            RED_MIN: 6,
            MAX_AMOUNT: 20000,
            MAX_COUNT: 10000,
            UNIT_PRICE: 2,
            RED_D_MAX: 5,
            RED_T_MIN: 2 ,
            RED_T_MAX: 16
        },
        DLT: {
            BLUE_MAX: 12,
            BLUE_MIN: 2,
            RED_MAX: 35,
            RED_MIN: 5,
            MAX_AMOUNT: 20000,
            MAX_COUNT: 10000,
            UNIT_PRICE: 2,
            ADDITION_PRICE: 3
        },
        FC3D: {
            MAX_AMOUNT: 20000,
            MAX_COUNT: 10000,
            UNIT_PRICE: 2
        },
        PL3: {
            MAX_AMOUNT: 20000,
            MAX_COUNT: 10000,
            UNIT_PRICE: 2
        },
        PL5: {
            MAX_AMOUNT: 20000,
            MAX_COUNT: 10000,
            UNIT_PRICE: 2
        },
        JXSSC: {
            BASIC_EVEN: 4,
            BASIC_LARGE: 2,
            BASIC_MAX: 9,
            BASIC_MIN: 0,
            BASIC_ODD: 5,
            BASIC_SMALL: 1,
            DXDS: {
                LC1: "小",
                LC2: "大",
                LC4: "双",
                LC5: "单"
            },
            MAX_AMOUNT: 20000,
            MAX_COUNT: 10000,
            UNIT_PRICE: 2
        } ,
        CQSSC: {
            BASIC_EVEN: 4,
            BASIC_LARGE: 2,
            BASIC_MAX: 9,
            BASIC_MIN: 0,
            BASIC_ODD: 5,
            BASIC_SMALL: 1,
            DXDS: {
                LC1: "小",
                LC2: "大",
                LC4: "双",
                LC5: "单"
            },
            MAX_AMOUNT: 20000,
            MAX_COUNT: 10000,
            UNIT_PRICE: 2
        } ,
        QXC:{ UNIT_PRICE: 2, BASIC_MIN: 0, BASIC_MAX: 9, MAX_COUNT: 10000, MAX_AMOUNT: 20000},
        QLC:{MAX: 30,MAX_AMOUNT: 20000,MAX_COUNT: 10000,MIN: 1,RED_MIN:7,UNIT_PRICE: 2},
        GD11X5:{UNIT_PRICE: 2},
        JX11X5:{UNIT_PRICE: 2},
        SD11X5:{UNIT_PRICE: 2}
    }
    var CPID = {
        '001': {
            lottery_name: "双色球",
            lottery_type: "ssq",
            lottery_id: "51"
        },
        '002': {
            lottery_name: "福彩3D",
            lottery_type: "fc3d",
            lottery_id: "52"
        },
        '003': {
            lottery_name: "七彩乐",
            lottery_type: "qcl",
            lottery_id: "23528"
        },
        '004': {
            lottery_name: "东方6+1",
            lottery_type: "df61",
            lottery_id: "23531"
        },
        '005': {
            lottery_name: "15选5",
            lottery_type: "15x5",
            lottery_id: "21304"
        },
        '108': {
            lottery_name: "排列3",
            lottery_type: "pl3",
            lottery_id: "33"
        },
        '109': {
            lottery_name: "排列5",
            lottery_type: "pl5",
            lottery_id: "35"
        },
        '110': {
            lottery_name: "七星彩",
            lottery_type: "qxc",
            lottery_id: "10022"
        },
        '113': {
            lottery_name: "大乐透",
            lottery_type: "dlt",
            lottery_id: "23529"
        },
        '022': {
            lottery_name: "湖北快3",
            lottery_type: "hbk3",
            lottery_id: "23541"
        },
        '023': {
            lottery_name: "吉林快3",
            lottery_type: "jlk3",
            lottery_id: "23542"
        },
        '024': {
            lottery_name: "安徽快3",
            lottery_type: "ahk3",
            lottery_id: "23543"
        },
        '025': {
            lottery_name: "快乐十分",
            lottery_type: "kl10",
            lottery_id: "23545"
        },
        '006': {
            lottery_name: "江西时时彩",
            lottery_type: "jxssc",
            lottery_id: "13001"
        },
        '107': {
            lottery_name: "11选5",
            lottery_type: "kl10",
            lottery_id: "21406"
        },
        '106': {
            lottery_name: "多乐彩",
            lottery_type: "dlc",
            lottery_id: "23540"
        },
        '104': {
            lottery_name: "广东11选5",
            lottery_type: "gd115",
            lottery_id: "23544"
        },
        '111': {
            lottery_name: "黑龙江22选5",
            lottery_type: "22*5",
            lottery_id: "23536"
        },
        '112': {
            lottery_name: "黑龙江31选7",
            lottery_type: "31*7",
            lottery_id: "23537"
        },
        '105': {
            lottery_name: "黑龙江11选5",
            lottery_type: "hlj11x5",
            lottery_id: "23535"
        },
        '016': {
            lottery_name: "北京快乐8",
            lottery_type: "kl8",
            lottery_id: "20108"
        },
        '21505': {
            lottery_name: "黑龙江时时彩",
            lottery_type: "hljssc",
            lottery_id: "23537"
        },
        '017': {
            lottery_name: "pk10",
            lottery_type: "pk10",
            lottery_id: "20109"
        },
        '018': {
            lottery_name: "重庆时时彩",
            lottery_type: "cqssc",
            lottery_id: "10401"
        },
        '019': {
            lottery_name: "北京3D",
            lottery_type: "bj3d",
            lottery_id: "20105"
        },
        '020': {
            lottery_name: "群英会",
            lottery_type: "qyh",
            lottery_id: "21407"
        },
        '101': {
            lottery_name: "上海11选5",
            lottery_type: "sh115",
            lottery_id: "23546"
        },
        '102': {
            lottery_name: "新疆11选5",
            lottery_type: "xj115",
            lottery_id: "23547"
        },
        '027': {
            lottery_name: "江苏快三",
            lottery_type: "jsk3",
            lottery_id: "23548"
        },
        '115': {
            lottery_name: "半全场",
            lottery_type: "bj3d",
            lottery_id: "16"
        },
        '116': {
            lottery_name: "四场进球",
            lottery_type: "jqc",
            lottery_id: "18"
        },
        '117': {
            lottery_name: "任九场",
            lottery_type: "r9c",
            lottery_id: "19"
        },
        '019': {
            lottery_name: "胜负彩",
            lottery_type: "sfc",
            lottery_id: "11"
        },
        '201': {
            lottery_name: "竞彩足球",
            lottery_type: "jczq"
        },
        '301': {
            lottery_name: "竞彩足球让球胜平负",
            lottery_type: "jczqspf"
        },
        '302': {
            lottery_name: "竞彩足球比分",
            lottery_type: "jczqbf"
        },
        '303': {
            lottery_name: "竞彩足球总进球数",
            lottery_type: "jczqzjq"
        },
        '304': {
            lottery_name: "竞彩足球胜负半全",
            lottery_type: "jczqbqc"
        },
        '305': {
            lottery_name: "竞彩足球混合投注",
            lottery_type: "jczqsxds"
        },
        '306': {
            lottery_name: "竞彩篮彩让分胜负",
            lottery_type: "jclqrfsf"
        },
        '307': {
            lottery_name: "竞彩篮彩让分胜负",
            lottery_type: "jclqsf"
        },
        '308': {
            lottery_name: "竞彩篮彩胜分差",
            lottery_type: "jclqsfc"
        },
        '309': {
            lottery_name: "竞彩篮彩大小分",
            lottery_type: "jclqdxfc"
        },
        '311': {
            lottery_name: "竞彩足球让球胜平负(单关)",
            lottery_type: "jczqdgspf"
        },
        '312': {
            lottery_name: "竞彩足球比分(单关)",
            lottery_type: "jczqdgbf"
        },
        '313': {
            lottery_name: "竞彩足球总进球数(单关)",
            lottery_type: "jczqdgzjq"
        },
        '314': {
            lottery_name: "竞彩足球胜负半全(单关)",
            lottery_type: "jczqdgbqc"
        },
        '315': {
            lottery_name: "竞彩足球上下盘单双(单关)",
            lottery_type: "jczqdgsxds"
        },
        '316': {
            lottery_name: "竞彩篮球让分胜负(单关)",
            lottery_type: "jclqdgrfsf"
        },
        '317': {
            lottery_name: "竞彩篮球胜负(单关)",
            lottery_type: "jclqdgsf"
        },
        '318': {
            lottery_name: "竞彩篮球胜分差(单关)",
            lottery_type: "jclqdgsfc"
        },
        '319': {
            lottery_name: "竞彩篮球大小分(单关)",
            lottery_type: "jclqdgdxfc"
        },
        '320': {
            lottery_name: "竞彩胜平负",
            lottery_type: "jczq"
        },
        '321': {
            lottery_name: "竞彩胜平负",
            lottery_type: "jczq"
        }

    }
    var JCCP = {
        "01": "单关",
        "02": "2串1",
        "03": "3串1",
        "04": "3串3",
        "05": "3串4",
        "06": "4串1",
        "07": "4串4",
        "08": "4串5",
        "09": "4串6",
        "10": "4串11",
        "11": "5串1",
        "12": "5串5",
        "13": "5串6",
        "14": "5串10",
        "15": "5串16",
        "16": "5串20",
        "17": "5串26",
        "18": "6串1",
        "19": "6串6",
        "20": "6串7",
        "21": "6串15",
        "22": "6串20",
        "23": "6串22",
        "24": "6串35",
        "25": "6串42",
        "26": "6串50",
        "27": "6串57",
        "28": "7串1",
        "29": "7串7",
        "30": "7串8",
        "31": "7串21",
        "32": "7串35",
        "33": "7串120",
        "34": "8串1",
        "35": "8串8",
        "36": "8串9",
        "37": "8串28",
        "38": "8串56",
        "39": "8串70",
        "40": "8串247"
    }
    module.exports = {
        ng: numberGenerator,
        numberSelect: numberSelect,
        shuffle: shuffle,
        CONFIG: CPCONFIG,
        CPID: CPID,
        JC: JC,
        JCCP: JCCP,
        PlayTypeRule: PlayTypeRule
    }
});