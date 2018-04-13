/**
 * Created by hebo (razr409355439@gmail.com)on 15/1/19.
 */
;(function () {

    var vueTouch = {}
    var Hammer = typeof require === 'function'
        ? require('hammerjs')
        : window.Hammer
    var gestures = ['tap', 'pan', 'pinch', 'press', 'rotate', 'swipe']
    var customeEvents = {}

    vueTouch.install = function (Vue) {

        Vue.directive('touch', {

            isFn: true,
            acceptStatement: true,

            bind: function () {
                if (!this.el.hammer) {
                    this.el.hammer = new Hammer.Manager(this.el)
                }
                var mc = this.mc = this.el.hammer
                // determine event type
                var event = this.arg
                var recognizerType, recognizer

                if (customeEvents[event]) { // custom event

                    var custom = customeEvents[event]
                    recognizerType = custom.type
                    recognizer = new Hammer[capitalize(recognizerType)](custom)
                    recognizer.recognizeWith(mc.recognizers)
                    mc.add(recognizer)

                } else { // built-in event

                    for (var i = 0; i < gestures.length; i++) {
                        if (event.indexOf(gestures[i]) === 0) {
                            recognizerType = gestures[i]
                            break
                        }
                    }
                    if (!recognizerType) {
                        console.warn('Invalid v-touch event: ' + event)
                        return
                    }
                    recognizer = mc.get(recognizerType)
                    if (!recognizer) {
                        // add recognizer
                        recognizer = new Hammer[capitalize(recognizerType)]()
                        // make sure multiple recognizers work together...
                        recognizer.recognizeWith(mc.recognizers)
                        mc.add(recognizer)
                    }

                }
            },

            update: function (fn) {
                var mc = this.mc
                var vm = this.vm
                var event = this.arg
                // teardown old handler
                if (this.handler) {
                    mc.off(event, this.handler)
                }
                // define new handler
                this.handler = function (e) {
                    e.targetVM = vm
                    fn.call(vm, e)
                }
                mc.on(event, this.handler)
            },

            unbind: function () {
                this.mc.off(this.arg, this.handler)
                if (!Object.keys(this.mc.handlers).length) {
                    this.mc.destroy()
                    this.el.hammer = null
                }
            }

        })
    }

    /**
     * Register a custom event.
     *
     * @param {String} event
     * @param {Object} options - a Hammer.js recognizer option object.
     *                           required fields:
     *                           - type: the base recognizer to use for this event
     */

    vueTouch.registerCustomEvent = function (event, options) {
        options.event = event
        customeEvents[event] = options
    }

    function capitalize (str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    if (typeof exports == "object") {
        module.exports = vueTouch
    } else if (typeof define == "function" && define.amd) {
        define([], function(){ return vueTouch })
    } else if (window.Vue) {
        window.VueTouch = vueTouch
        Vue.use(vueTouch)
    }

})()
;(function (exports) {
    Vue.config.debug = true;
    var jchhggResoure = exports.jchhggResoure;
    var jshhggPost = exports.jshhggPost;
    var router;
    if (!Array.isArray) {
        Array.isArray = function (vArg) {
            return Object.prototype.toString.call(vArg) === "[object Array]";
        };
    }
    var result = exports.app = new Vue({
        el: "#warp",
        data: {
            is_loading: true,
            is_index: false,
            is_match: false,
            is_car: false,
            is_bf: false,
            is_success:false,
            //dropdown
            dropdown: false,
            moredown: false,
            //toggleChuanBox
            is_chuan: false,
            //
            currentView: "",
            //统计联赛列表
            leagueId: 0,
            leagueData: {},
            leagueList: {},
            //过滤
            filterKey: [],
            matchData: [],
            //渲染数据 ，
            renderData: [],
            //处理过的完整数据，用于筛选
            currentData: [],
            //比分弹窗
            bf: {},
            bfCache:[],
            //car
            car: {},
            carTmpData: {},
            carTotal: {
                //投注倍数
                bei: 1,
                //game count
                gc: 0,
                //price count
                pc: 0,
                //game list
                gl: [],
                //注数 count
                nc: 0,
                //奖金
                bc: 0,
                //选择串信息
                chuan: {},
                //
                tuo: [],
                //
                dan: []
            },
            abc:[
                {hg:0},
                {hg:0},
                {hg:0}
            ],
            arr7:[]
        },
        created: function () {
            this.$watch("currentView", function (newValue, oldValue) {
                console.log("watch: %o", arguments)
            }, true)
        },
        filters: {
            filterLeague: function (value, key) {
                //console.log("do Filter:")
                var keys = this[key]
                if (Array.isArray(keys)) {
                    value = value.filter(function (item) {
                        if (!keys || keys == "all") return true;
                        return doFilter(item.matchName.substring(0, 4))
                    })
                    function doFilter(name) {
                        return keys.some(function (elem, index, arr) {
                            return name == elem
                        })
                    }
                } else {
                    value = value.filter(function (item) {
                        if (!keys || keys == "all") return true;
                        return item.filterType == keys ||
                            item.matchName.substring(0, 4) == keys
                    })
                }
                return value;
            },
            filterListLength: function (value, key) {
                var keys = this[key]
                if (Array.isArray(keys)) {
                    value = value.filter(function (item) {
                        if (!keys || keys == "all") return true;
                        return doFilter(item.matchName.substring(0, 4))
                    })
                    function doFilter(name) {
                        return keys.some(function (elem, index, arr) {
                            return name == elem
                        })
                    }
                } else {
                    value = value.filter(function (item) {
                        if (!keys || keys == "all") return true;
                        return item.filterType == keys ||
                            item.matchName.substring(0, 4) == keys
                    })
                }
                return value.length
            },
            filterMatchLength: function (value, key) {
                return value.length;
            },
            filterComityBall: function (comityBall) {
                var c = parseInt(comityBall || this.bf.comityBall)
                return c > 0 ? "+" + c : c;
            }
        },
        components: {
            "bfdialog": {
                inherit: true,
                //paramAttributes: ['bf',"car"],
                template: '#dialog-template',
                created: function () {
                },
                computed: {
                    comityBall: function () {
                        return this.comityBall > 0 ? "+" + this.comityBall : "-" + this.comityBall;
                    }
                },
                filters: {
                    filterComityBall: function (comityBall) {
                        var c = parseInt(comityBall || this.bf.comityBall)
                        return c > 0 ? "+" + c : c;
                    }
                },
                methods: {
                    cancel: function () {
                        this.is_bf = false;
                        for(var i=0;i<this.bfCache.length;i++){
                            this.bf.r[this.bfCache[i]]=false;
                        }
                    },
                    submit: function () {
                        this.is_bf = false;
                        this.bfCache=[]
                    }
                }
            }
        },
        computed: {},
        watch: {
            "car": "totalCar"
        },
        methods: {
            //请求首页数据
            fetch_index: function () {
                var self = this;

                if (self.renderData.length) {
                    self.is_index = !self.is_index
                    self.is_loading = !self.is_index
                    self.is_car = !self.is_car
                    self.is_match = false
                    return;
                }
                self.is_match = false
                self.is_car = false
                self.is_loading = true
                jchhggResoure.fetchAll(function (data) {
                    if (!data) {
                        alert("%>_<%暂无数据，请稍后再查看！")
                    } else {

                        self.matchData = self.matchIndexData(data)
                        self.is_index = !self.is_index
                        self.is_loading = false
                        //console.log(self.matchIndexData(data).length);
                        //过滤数据的存储
                        for (var i in self.leagueList) {
                            self.filterKey.push(i)
                        }
                        console.log(self.filterKey);
                        //console.log(data);

                        //初始化购物车base数据   用于匹配用户选择
                        for (var i = 0; i < self.matchData.length; i++) {
                            self.carTmpData[self.matchData[i].matchNo] = self.matchData[i]
                        }
                        //初始化比分弹窗数据
                        // self.bf = self.matchData[0]
                        //渲染数据
                        self.currentData = self.renderData = self.matchDate(self.matchIndexData(data))
                        self.doIscroll();


                    }
                })
            },
            //
            fetch_car: function () {
                var self = this
                self.is_index = false
                self.is_car = true
                self.is_loading = false
                self.is_match = false
                var myScroll2;
                myScroll2 = new IScroll('#carIscroll', {
                    scrollbars: true,
                    mouseWheel: true,
                    click: true,
                    interactiveScrollbars: true,
                    shrinkScrollbars: 'scale',
                    fadeScrollbars: true,
                    checkDOMChanges:true

                });
            },

            //处理比赛数据
            matchDate: function (d) {
                function seleteDate(re) {
                    var o = {},
                        r = [],
                        d = {};
                    for (var i = 0; i < re.length; i++) {
                        var d = re[i].matchNo.substring(0, 8);
                        if (o[d]) {
                            o[d].push(re[i])
                        } else {
                            o[d] = []
                            o[d].push(re[i])
                        }
                    }
                    for (var n in o) {
                        if (o[n].length) {
                            r.push({
                                date: o[n][0].date.replace(/-/g, ""),
                                list: o[n]
                            })
                        }
                    }

                    return addDis(r);
                    //标记改数据在matchData中的位置
                    function addDis(r) {
                        for (var j = 0; j < r.length; j++) {
                            for (var h = 0; h < r[j].list.length; h++) {
                                r[j].list[h].dis = "" + [j] + "-" + "list" + "-" + [h]
                            }
                        }
                        return r;
                    }
                }

                var r = seleteDate(d);
                return r;
            },
            matchIndexData: function (d) {
                var leagueList = this.leagueList;
                var leagueId = this.leagueId
                var re = [];
                for (var i in d) {
                    var game = {},
                        item = d[i];
                    game.r = {}
                    //用户选择结果存储
                    game.date = item.matchNo.substring(0, 4) + '-' + item.matchNo.substring(4, 6) + '-' + item.matchNo.substring(6, 8);
                    game.matchNo = item.matchNo;
                    game.matchHome = item.matchHome;
                    game.matchGuest = item.matchGuest;
                    game.matchName = item.matchName;
                    game.comityBall = item.comityBall;
                    game.stopSaleTime = item.stopSaleTime
                    game.endTime = item.endTime
                    game.weekday = getWeekDay(item.matchNo.substring(8, 9));
                    game.endtime = checkTime((item.stopSaleTime.substring(8, 12)));
                    game.leagueName = item.matchName.substring(0, 4)
                    game.changci = [item.matchNo.substring(8, 9)] + item.matchNo.substring(9);
                    game.changciStr = ["", "周一", "周二", "周三", "周四", "周五", "周六", "周日"][item.matchNo.substring(8, 9)] + item.matchNo.substring(9);
                    setSp(game, "Spf", item.spf)
                    setSp(game, "Jq", item.jqs)
                    setSp(game, "Bf", item.bf)
                    setSp(game, "Rqspf", item.rqspf)
                    setSp(game, "Bqc", item.sfbq)
                    matchType(item, game);
                    matchLeague(game);
                    re.push(game);

                }

                function setSp(origin, name, d) {
                    for (var i = 0; i < d.length; i++) {
                        origin["sp" + name + i] = d[i]
                        game.r["sp" + name + i] = false
                    }
                }

                function matchType(origin, d) {
                    //console.log(origin);
                    d.filterType = "";
                    switch (origin.matchName) {
                        case "英超":
                        case "法甲":
                        case "意甲":
                        case "德甲":
                        case "西甲":
                            d.filterType = "five";
                            break;
                    }
                    if (origin.spf[0] <= 1.6 || origin.spf[1] <= 1.6 || origin.spf[2] <= 1.6 ||
                        origin.rqspf[0] <= 1.6 || origin.rqspf[1] <= 1.6 || origin.rqspf[2] <= 1.6) {
                        d.filterType = "hight";

                    }


                }

                function matchLeague(origin) {
                    if (!leagueList[origin.matchName.substring(0, 4)]) {
                        var id = leagueId++
                        leagueList[origin.matchName.substring(0, 4)] = {};
                        leagueList[origin.matchName.substring(0, 4)].id = id;
                        leagueList[origin.matchName.substring(0, 4)].isShow = true;
                        origin.lid = leagueList[origin.matchName.substring(0, 4)].id
                    } else {
                        origin.lid = leagueList[origin.matchName.substring(0, 4)].id
                    }
                }

                function getWeekDay(n) {
                    var arr = ["", '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
                    return arr[n];
                };
                function checkTime(h) {
                    var d = new Date();
                    d.setHours(h.substring(0, 2), h.substring(2, 4), 0, 0)
                    var m = d.getTime()
                    var nm = m - 900000; //截止时间15分钟的时候不能投注
                    var d2 = new Date()
                    d2.setTime(nm);
                    var t = d2.getHours() + ":" + d2.getMinutes()
                    return t;
                }
                var arr2=[];
                var arr3=[];
                for(var i in re){
                    if(re[i].filterType == 'hight'){
                        arr2.push(re[i]);
                    }else if(re[i].filterType == 'five'){
                        arr3.push(re[i]);
                    }
                    //console.log(re[i].matchName);
                }
                //this.data.abc[0].hg=arr2.length;
                var fd = this.abc;
                //console.log(fd[0]);
                fd[0].hg='高中奖率('+arr2.length+')';
                fd[1].hg='全部赛事('+re.length+')';
                fd[2].hg='五大联赛('+arr3.length+')';
                $('#jchh ul li').eq(1).addClass('active');

                return re;
            },
            //点击title  折叠、显示比赛列表
            listToggle: function (index) {
                $(index.$el).find('ul').toggle();

            },
            filterabc:function(m,n){
                var fs= m.substring(0,4);
                   if(fs=='全部赛事'){
                       this.matchall(n);
                   }else if(fs=='高中奖率'){
                        this.filterHight(n);

                   }else if(fs=='五大联赛'){
                       this.filterFive(n)
                   }
            },

            //筛选5大联赛
            filterFive: function (index) {
                var self = this;
                    self.addMatchType("five");
                $(index.$el).addClass('active').siblings().removeClass('active');
                onCompletion ();
                function onCompletion () {
                    setTimeout(function () {
                        myScroll.refresh();
                        myScroll.scrollTo(0,0,0);
                    }, 0);
                };
            },
            //筛选高中奖率
            filterHight: function (index) {

                this.addMatchType("hight");

                $(index.$el).addClass('active').siblings().removeClass('active');
                onCompletion ();
                function onCompletion () {
                    setTimeout(function () {
                        myScroll.refresh();
                        myScroll.scrollTo(0,0,0);
                    }, 0);
                };
            },
            filterH:function(){
                console.log(this.filterKey);
            },
            //筛选某联赛
            filterLeague: function (league, me) {
                    this.leagueData[me.$key].isShow = !this.leagueData[me.$key].isShow;
                    this.addMatchType(league);
                //console.log($('.jc-gamelist li').length);
                //console.log(this.filterType);
            },
            //显示、隐藏 筛选区域
            toggleMatchBox: function () {
                this.leagueData = this.leagueList;
                this.is_index = !this.is_index;
                this.is_match = !this.is_match;
                //console.log(this.filterKey);
            },
            //选择所有联赛
            matchAll: function () {
                var self = this;
                var filterTmp = this.filterKey
                for (var i in self.leagueData) {
                    console.log(i);
                    if (filterTmp.indexOf(i) < 0) {
                        self.addMatchType(i)
                    }
                }
                //
            },
            matchall:function(index){
                //var target = ev.target;

                this.addMatchType("all");

                $(index.$el).addClass('active').siblings().removeClass('active');
                onCompletion ();
                function onCompletion () {
                    setTimeout(function () {
                        myScroll.refresh();
                        myScroll.scrollTo(0,0,0);
                    }, 0);
                };
            },
            //反选联赛
            matchReverse: function () {
                var self = this;
                for (var i in self.leagueData) {
                    self.addMatchType(i)
                }
            },
            //确定筛选
            doMatch: function () {
                this.is_index = !this.is_index
                this.is_match = !this.is_match;
               // $('.account-nav-group').hide();
                $('.account-nav-bar').hide();
                var lis=$('.league-list li');
                for(var i=0;i<$('.league-list li').length;i++){
                    if(lis[i].className=='active'){
                        $('.account-nav-bar').show();
                    }else{
                        $('.account-nav-bar').hide();
                    }
                }

                onCompletion ();
                function onCompletion () {
                    setTimeout(function () {
                        myScroll.refresh();
                        myScroll.scrollTo(0,0,0);
                    }, 0);
                };
            },
            //执行筛选
            addMatchType: function (n) {

                var filterTmp = this.filterKey;
                //if (!Array.isArray(filterTmp))  filterTmp = [];

                //console.log(filterTmp);
                var five = ["英超", "法甲", "意甲", "德甲", "西甲"];
                if(n == "five"){
                    filterTmp = five ;
                    for(var i in this.leagueData) {
                        this.leagueData[i].isShow = false;
                    }
                    for(var n=0;n<five.length;n++){
                        if(this.leagueData[five[n]])this.leagueData[five[n]].isShow = true;
                       // console.log(this.leagueData[five[n]]);
                    }


                }else if (n == "all"  || n == "hight") {
                   //filterTmp = ["亚冠", "欧冠", "苏超", "英冠", "解放者杯", "中北美冠", "欧罗巴"];

                    filterTmp=n;


                } else {
                    if (!Array.isArray(filterTmp))  filterTmp = [];
                    if (filterTmp.indexOf(n) < 0) {
                        filterTmp.push(n);
                        this.leagueData[n].isShow = true;

                    } else {
                        console.log(n);
                        filterTmp.splice(filterTmp.indexOf(n), 1);
                        this.leagueData[n].isShow = false;
                    }


                }
                this.filterKey = filterTmp;
                //this.filterKey='hight';
                //console.log(this.filterKey);




            },
            toggleSPdialog: function () {
                this.is_bf = !this.is_bf;
                this.bfCache=[]
            },
            toggleBFDialog: function (me) {
                //通过位置来 找到 renderData的数据，
                // 操作同一个数据源会让视图同步
                var pos = me.dis.split("-");
                var data = this.renderData[pos[0]][pos[1]][pos[2]]
                var el = me.$el
                this.is_bf = true
                this.bf = data
                if (this.is_bf) {
                    var $h = $(window).height(),
                        $w = $(window).width()
                    $("#bf-block").css({
                        height: $h - 100,
                        width: $w - 20
                    })
                    $("#bf-wrapper").css({
                        height: $h - 180,
                        width: 300,
                        left: ($w - 20 - 300) / 2
                    })
                    var bfScroll;
                    bfScroll = new IScroll('#bf-wrapper', {
                        scrollbars: false,
                        mouseWheel: false,
                        click: true,
                        interactiveScrollbars: true,
                        shrinkScrollbars: 'scale',
                        fadeScrollbars: true
                    });
                    //查看用户选择 手动添加/移除class
                    var r = data.r;
                    //先全部移除
                    $("#bf-block li").removeClass("active")
                    //再添加class
                    for (var i in r) {
                        if (r[i] == true) {
                            $("#bf-block li[data-spitem=" + i + "]").addClass("active")
                        }
                    }
                }
            },
            //点击列表 选择sp值
            toggleSP: function (ev, me) {
                var target = ev.target;
                var targetLi = findLi(target);
                me = me || this.bf;
                if ($(target).hasClass("jc-select-span") || targetLi) {
                    var spitem = $(target).data("spitem") || $(targetLi).data("spitem")

                    if(!me[spitem]) return
                    if (me.r[spitem]) me.r[spitem] = false
                    else me.r[spitem] = true
                    this.toggleCar(me.dis, spitem)
                    if(this.is_bf==true){
                        this.bfCache.push(spitem)
                    }
                }
                function findLi(d) {
                    if (!d || d.tagName.toLowerCase() == "ul" ||
                        d.tagName.toLowerCase() == "p" ||
                        d.tagName.toLowerCase() == "div")
                        return false

                    while (d.tagName.toLowerCase() != 'li') {
                        d = d.parentNode
                    }
                    return d;
                }
            },
            /*
             car
             */
            toggleCar: function (no, item) {
                var car = this.car
                if (car[no]) {
                    if (car[no][item]) delete car[no][item]
                    else car[no][item] = true
                } else {
                    car[no] = {}
                    car[no][item] = true
                }
                //统计购物车
                this.totalCar()
            },
            toggleCarList:function(ev){
                var self = this
                var target = ev.target
                var dis = ev.targetVM.dis
                var r = ev.targetVM.r
                if($(target).hasClass("game-bet-box")){
                    var spitem = $(target).data("spitem")
                    self.toggleCar(dis, spitem)
                    r[spitem] = false
                }

            },
            /**
             *  购物车 统计
             *
             *
             *  用户选择统计：
             *  {}
             */
            totalCar: function () {
                var car = this.car,
                    renderData = this.renderData,
                    carTotal = this.carTotal,
                    count = 0
                carTotal.gl = []
                for (var i in car) {
                    //根据数据位置 从元数据拿比赛
                    var pos = i.split("-")
                    var data = renderData[pos[0]][pos[1]][pos[2]]
                    if (!isEmpty(car[i])) {
                        count++
                        carTotal.gl.push(data)
                    } else {
                        delete car[i]
                    }
                }
                if(isEmpty(carTotal.chuan)&&carTotal.gl.length>1){
                    carTotal.chuan[carTotal.gl.length] = true;
                }
                carTotal.tuo = countTuo(carTotal.gl)
                carTotal.gc = count;
                var chuans = formatChuan(carTotal.chuan)
                var totalSum = this.countUserSelect(chuans, countTuo(carTotal.gl))
                carTotal.nc = totalSum.item
                carTotal.bc = (totalSum.maxWin*carTotal.bei).toFixed(2)
                //需要支付的金额
                carTotal.pc = carTotal.nc * carTotal.bei * 2

                function isEmpty(obj) {
                    var n
                    for (n in obj) {
                        return false
                    }
                    return true;
                }

                function countTuo(list) {
                    var tuo = [];
                    for (var i = 0; i < list.length; i++) {
                        var o = {}
                        o.n = list[i].dis;
                        o.sps = []
                        for (var n in list[i].r) {
                            if (list[i].r[n] === true) {
                                o.sps.push(list[i][n])
                            }
                        }
                        o.maxSp = Math.max.apply(null, o.sps)
                        o.minSp = Math.min.apply(null, o.sps)
                        o.num = o.sps.length
                        tuo.push([o])
                    }
                    return tuo;
                }

                function formatChuan(chuan) {
                    var r = []
                    for (var i in chuan) {
                        if (chuan[i]) {
                            r.push(i)
                        }
                    }
                    return r;
                }
            },
            //
            removeCar:function(){
                var car = this.car,
                    renderData = this.renderData
                for(var i in car){
                    var pos = i.split("-")
                    var data = renderData[pos[0]][pos[1]][pos[2]]
                    for(var n in data.r){
                        data.r[n]=false
                    }
                }
                this.car = {}
                this.totalCar()
            },
            //用户移除选择比赛
            removeSelect: function (index, r, dis) {
                var renderData = this.renderData
                var pos = dis.split("-")
                var data = renderData[pos[0]][pos[1]][pos[2]]
                for (var i in data.r) {
                    data.r[i] = false
                }
                this.carTotal.gl.splice(index, 1)
                delete this.car[dis]
                this.totalCar()
            },
            //计算用户选择情况
            countUserSelect: function (chuan, tuo) {
                //统计注数跟最大奖金
                function totalSum(dan, chuan, tuo) {
                    //console.log(arguments)
                    var count = 0; //数量
                    var maxPrice = 0; //最大奖金
                    var gg = chuan;
                    var tuo = tuo;
                    var dan = dan;
                    //单一玩法
                    var isShowhh = false;
                    //循环4串1 5串1 这样的
                    for (var i = 0; i < gg.length; i++) {
                        var chuanN = [gg[i]]
                        var fs = [chuanN[0]] //过关方式
                        var guoguan_num = chuanN[0]; //过关的数量(5串1,获得5)
                        var array = '',
                            arr = [];
                        var dan_lenth = dan.length;
                        if (dan_lenth > 0) { //有胆
                            var danArray = [];
                            if (dan_lenth == guoguan_num) { //全胆
                                array = eachArray(dan, guoguan_num);
                            } else {
                                var tuoTemp = eachArray(tuo, guoguan_num - dan_lenth); //得到托组合数
                                for (var cc = 0; cc < tuoTemp.length; cc++) {
                                    danArray.push(dan.concat(tuoTemp[cc])); //得到胆拖的组合数
                                }
                                array = danArray;
                            }
                        } else {
                            array = eachArray(tuo, guoguan_num);
                        }
                        for (var m = 0, l = array.length; m < l; m++) { //第一次过滤个从复
                            var v = cl(array[m]);
                            //if(obj.isShowhhgy){//不显示单一玩法
                            if (isShowhh) { //不显示单一玩法
                                for (var a = 0, aa = v.length; a < aa; a++) {
                                    var spf_num = 0,
                                        rqspf_num = 0,
                                        cbf_num = 0,
                                        jqs_num = 0,
                                        bqc_num = 0;
                                    for (var b = 0, bb = v[a].length; b < bb; b++) {
                                        var rq = v[a][b];
                                        if (rq.box == 0) {
                                            spf_num++;
                                        } else if (rq.box == 4) {
                                            rqspf_num++;
                                        } else if (rq.box == 1) {
                                            jqs_num++;
                                        } else if (rq.box == 2) {
                                            cbf_num++;
                                        } else if (rq.box == 3) {
                                            bqc_num++;
                                        }
                                        if (spf_num == guoguan_num || rqspf_num == guoguan_num || jqs_num == guoguan_num || cbf_num == guoguan_num || bqc_num == guoguan_num) {
                                            v[a] = [];
                                            break;
                                        }
                                    }
                                }
                            }
                            arr = arr.concat(v);
                        }
                        for (var j = 0, jj = fs.length; j < jj; j++) {
                            for (var k = 0, kk = arr.length; k < kk; k++) {
                                var len = eachArray(arr[k], fs[j]); //[["2=1:4.3", "3=1:3.29|3=0:2.7"]]
                                for (var n = 0, nn = len.length; n < nn; n++) {
                                    if (isShowhh) { //不显示单一玩法(多串须再次去从复)
                                        var a = 0,
                                            b = 0,
                                            c = 0,
                                            d = 0,
                                            e = 0;
                                        for (var m = 0, mm = len[n].length; m < mm; m++) {
                                            var ee = len[n][m];
                                            if (ee.box == 0) {
                                                a++;
                                            } else if (ee.box == 4) {
                                                e++;
                                            } else if (ee.box == 1) {
                                                b++;
                                            } else if (ee.box == 2) {
                                                c++;
                                            } else if (ee.box == 3) {
                                                d++;
                                            }
                                            if (a == fs[j] || b == fs[j] || c == fs[j] || d == fs[j] || e == fs[j]) {
                                                len[n] = [];
                                            }
                                        }
                                    }
                                    count += multiplyCount(len[n]); //注数
                                    maxPrice += multiplyCount(len[n], "0"); //计算最大奖金
                                }
                            }
                        }
                    }
                    var max = maxPrice * 2;
                    return {
                        "item": count, //注数
                        "maxWin": max //最大金额
                    };

                    function eachArray(arr, num) {
                        var t = [
                                []
                            ],
                            r = [];
                        for (var i = 0, n = arr.length; i < n; i++) {
                            for (var j = 0, k = t.length; j < k; j++) {
                                var ss = t[j].concat([arr[i]]);
                                ss.length < num ? t.push(ss) : r.push(ss);
                            }
                        }
                        return r;
                    }

                    function cl(a) {
                        var n = 0,
                            array = [],
                            code = [];
                        allArr(a, n)
                        function allArr(arr, n) {
                            if (n >= arr.length) {
                                array.push(code.slice());
                                code.length = n - 1;
                            } else {
                                for (var i = 0, j = arr[n].length; i < j; i++) {
                                    code.push(arr[n][i]);
                                    allArr(arr, n + 1);
                                }
                                if (n) {
                                    code.length = n - 1;
                                }
                            }
                        }

                        return array;
                    }

                    function multiplyCount(arr, flag) {
                        //console.log(arguments)
                        var a = 1;
                        if (arr.length == 0) return 0;
                        for (var i = 0, l = arr.length; i < l; i++) {
                            //var v = arr[i].split("_")
                            if (flag) {
                                a *= arr[i].maxSp; //价格
                            } else {
                                a *= arr[i].num; //注数
                            }
                        }
                        //console.log(a)
                        return a;
                    }
                }

                return totalSum([], chuan, tuo)
            },
            toggleChuanBox: function () {
                this.is_chuan = !this.is_chuan;
                var chuan = this.carTotal.chuan
                $("#jchhgg-gglx .car-order-type").removeClass('active')
                for(var i in chuan){
                    if(chuan[i]){
                        $("#jchhgg-gglx [data-v="+i+"]").addClass('active')
                    }
                }
            },
            toggleBei: function (flag) {
                if (flag === true) {
                    this.carTotal.bei++
                } else {
                    this.carTotal.bei--
                    if (this.carTotal.bei <= 0) {
                        this.carTotal.bei = 1
                    }
                }
                this.totalCar();
            },
            //用户选择窜的信息
            selectChuan: function (ev) {
                var target = ev.target
                if ($(target).hasClass("car-order-type")) {
                    var item = $(target).data("v")
                    if (this.carTotal.chuan[item]) {
                        $(target).removeClass("active")
                        this.carTotal.chuan[item] = false
                    } else {
                        $(target).addClass("active")
                        this.carTotal.chuan[item] = true;
                    }
                }
                this.totalCar();
            },
            sendBuyData: function () {
                var self = this;
                //数组映射
                var SP_MAP_ARRAY = [
                    //胜平负
                    ["胜", "平", "负"],
                    //比分
                    ["胜其他", "1:0", "2:0", "2:1", "3:0", "3:1", "3:2", "4:0", "4:1", "4:2", "5:0", "5:1", "5:2",
                        "平其他", "0:0", "1:1", "2:2", "3:3",
                        "负其他", "0:1", "0:2", "1:2", "0:3", "1:3", "2:3", "0:4", "1:4", "2:4", "0:5", "1:5", "2:5"
                    ],
                    //进球数
                    ["0", "1", "2", "3", "4", "5", "6", "7"],
                    //半全场
                    ["胜胜", "胜平", "胜负", "平胜", "平平", "平负", "负胜", "负平", "负负"],
                    //让球胜平负
                    ["胜", "平", "负"]
                ]
                //JSON映射
                var SP_MAP_JSON = {

                    "spSpf0": "4-0",
                    "spSpf1": "4-1",
                    "spSpf2": "4-2",

                    "spRqspf0": '0-0',
                    "spRqspf1": '0-1',
                    "spRqspf2": '0-2',

                    "spJq0": '2-0',
                    "spJq1": '2-1',
                    "spJq2": '2-2',
                    "spJq3": '2-3',
                    "spJq4": '2-4',
                    "spJq5": "2-5",
                    "spJq6": "2-6",
                    "spJq7": "2-7",
                    "spBf0": "1-0",
                    "spBf1": "1-1",
                    "spBf2": "1-2",
                    "spBf3": "1-3",
                    "spBf4": "1-4",
                    "spBf5": "1-5",
                    "spBf6": "1-6",
                    "spBf7": "1-7",
                    "spBf8": "1-8",
                    "spBf9": "1-9",
                    "spBf10": "1-10",
                    "spBf11": "1-11",
                    "spBf12": "1-12",
                    "spBf13": "1-13",
                    "spBf14": "1-14",
                    "spBf15": "1-15",
                    "spBf16": "1-16",
                    "spBf17": "1-17",
                    "spBf18": "1-18",
                    "spBf19": "1-19",
                    "spBf20": "1-20",
                    "spBf21": "1-21",
                    "spBf22": "1-22",
                    "spBf23": "1-23",
                    "spBf24": "1-24",
                    "spBf25": "1-25",
                    "spBf26": "1-26",
                    "spBf27": "1-27",
                    "spBf28": "1-28",
                    "spBf29": "1-29",
                    "spBf30": "1-30",

                    "spBqc0": "3-0",
                    "spBqc1": "3-1",
                    "spBqc2": "3-2",
                    "spBqc3": "3-3",
                    "spBqc4": "3-4",
                    "spBqc5": "3-5",
                    "spBqc6": "3-6",
                    "spBqc7": "3-7",
                    "spBqc8": "3-8"
                }
                //串信息映射
                var CHUAN_JSON = {
                    "2": "02",
                    "3": "03",
                    "4": "06",
                    "5": "11",
                    "6": "18",
                    "7": "28",
                    "8": "34"
                }

                var carTotal = this.carTotal;

                var lotoGson = {
                    "gameType": "305",

                    "isStop": 0,
                    "buyType": 0,
                    "buyNumberArray": [{
                        "buyNumber": "纽卡斯尔喷气机vs布里斯班狮吼,澳超,1:周五001-201502065001:[#1:0#0#胜胜#胜]:20150206164000,20150206164000," +
                        "0/奥厄vs莱比锡红牛,德乙,1:周五002-201502065002:[胜#2:0#0#胜平#胜]:20150207013000,20150206235900," +
                        "0|0-0",
                        "typeId": "02",
                        "seleId": "02",
                        "sum": 40
                    }],
                    "issueArray": [{"issue": "", "multiple": 1}],
                    "title": "",
                    "explain": "",
                    "secrecy": 1,
                    "commision": 0,
                    "commisiontype": 0,
                    "splitAmount": 0,
                    "buyAmount": 0,
                    "floorsAmount": 0,
                    "isUpload": 0,
                    "qcdy": 0,
                    "totalSum": 40
                }
                lotoGson.buyNumberArray = [
                    {
                        "buyNumber":creatBuyNumberArray(),
                        "typeId": "02",
                        "seleId": concatChuan(carTotal.chuan).join(","),
                        "sum": this.carTotal.pc
                    }
                ]
                lotoGson.totalSum =  carTotal.pc

                function creatBuyNumberArray(){
                    var gamelist = carTotal.gl
                    var r = []
                    for (var i = 0; i < gamelist.length; i++) {
                        var vs = gamelist[i]
                        var spstr = concatSP(vs.r)
                        var strArr = []
                        strArr.push(vs.matchHome + 'vs' + vs.matchGuest);
                        strArr.push(vs.matchName)
                        strArr.push(vs.comityBall + ':'
                        + vs.changciStr + '-' + vs.matchNo +
                        ':[' + spstr.join("#") + ']:' + vs.endTime);
                        strArr.push(vs.stopSaleTime);
                        //strArr.push(vs.comityBall);
                        strArr.push("0");

                        r.push(strArr.join(","))
                    }
                    return r.join("/")+"|0-0"
                }

                //buyNumber的sp结构组成

                //[ 让球胜平负 #比分,比分2  #进球数  #半全场 #   胜平负 ]
                function concatSP(sp) {
                    var r = [
                        //胜平负选择
                        [],
                        //比分选择
                        [],
                        //进球数选择
                        [],
                        //半全场选择
                        [],
                        //让球胜平负选择
                        []
                    ]
                    for (var i in sp) {
                        if (sp[i] === true) {
                            var pos = SP_MAP_JSON[i].split('-')
                            r[pos[0]].push(SP_MAP_ARRAY[pos[0]][pos[1]])
                        }
                    }
                    return r;
                }

                function concatChuan(chuan){
                    var re =[]
                    for(var i in chuan){
                        if(chuan[i]===true){
                             re.push(CHUAN_JSON[i])
                        }
                    }
                    return re;
                }
                var d = {
                    //彩票类型
                    gameType: "305",
                    format: "ajax",
                    //需要支付金额
                    needPay: "",
                    //投注串
                    lotoGson: {} ,
                    explain:"",
                    secrecy:1 ,
                    cooperateDoubleNum:1 ,
                    commisiontype:0  ,
                    commision:0 ,
                    splitAmount:"",
                    buyAmount: "",
                    floorsAmount:"",
                    agreement2:1 ,
                    isUpSum:8
                };
                d.needPay =  lotoGson.totalSum;
                d.lotoGson = lotoGson
                d.bei = carTotal.bei


                jshhggPost(d,function(re){
                    if(re.status) {
                        result.is_loading=false;
                        result.is_car=false;
                        result.is_index=false;
                        $("#tzsuccess").show()
                    }
                })
            },
            doIscroll: function () {
                //iscroll


                myScroll = new IScroll('#jcwrapper', {
                    scrollbars: true,
                    mouseWheel: true,
                    click: true,
                    interactiveScrollbars: true,
                    shrinkScrollbars: 'scale',
                    fadeScrollbars: true,
                    checkDOMChanges:true

                });


                document.addEventListener('touchmove', function (e) {
                    e.preventDefault();
                }, false);
            },
            //dropdown
            toggleDropDown: function () {
                this.dropdown = !this.dropdown
            },
            //更多选项
            toggleMore: function () {
                this.moredown = !this.moredown
            },
            resetUserSelect: function (ev) {
                console.log(ev)
                var target = $(ev.target)
                if(target.tagName.toUpperCase()=="A"){
                    if (confirm("将清空购买选择")) {
                        return true
                    } else {
                        return false
                    }
                }
            }
        }
    })

    //路由
    var routes = {
        "/index": function () {
            result.currentView = 'index'
            result.fetch_index();

        },
        '/car': function () {
            result.currentView = 'car'
            result.fetch_car();
            console.log(result.carTotal)
        } ,
        "/success":function(){
            result.is_loading=false;
            result.is_car=false;
            result.is_index=false;
            $("#tzsuccess").show()
        }
    };
    router = Router(routes);
    router.init("/index");
})(window)