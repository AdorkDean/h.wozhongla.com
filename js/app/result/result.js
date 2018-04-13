/**
 * Created by hebo (razr409355439@gmail.com)on 15/1/12.
 */
(function(exports){
    Vue.config.debug = true ;
    var resultResoure = exports.resultResoure;
    var result = exports.app =  new Vue({
        el:"#result",
        data:{
            isLoading:true,
            title:"test",
            currentView:"",
            repeatData:"",
            currentData:[],
            indexResult:[],
            ssqResult:{
                page:1,
                data:[]
            }
        },
        created: function () {
            this.$watch("currentView",function(newValue,oldValue){
                console.log("watch: %o",arguments)
                this['fetch_'+newValue]()
            },true)
        },
        filters:{
            kjCode:function(v){
                return v.replace("+"," - ")
            }
        },
        components: {
            "index": {
                inherit: true,
                template: '#grid-template',
                created:function(){
                    console.log("index created")
                },
                components:{
                    "item":{
                        inherit: true,
                        template: '#item-template',
                        created:function(){
                            console.log("item created")
                        }
                    }
                }
            },
            'ssq':  {
                template: '#grid-template',
                inherit:true,
                created:function(){
                    console.log("ssq created")
                } ,
                method:{

                },
                components:{
                    "item":{
                        inherit: true,
                        template: '#item-template',
                        created:function(){
                            console.log("item created")
                        }
                    }
                }
            }
        },
        computed:{
            //计算 开奖首页 数据
            indexData:function(){
                var s = this.currentData.filter(function(item){
                    var r = false;
                    switch(item.lotId){
                        case 51:
                        case 52:
                        case 23529:
                        case 10022:
                        case 23528:
                        case 33:
                        case 11:
                            item.str = code2html(item.kjCode,item.lotId)
                            r= true
                            break;
                        default:
                            r=false
                    }
                    return r
                })
                function code2html(kjCode,id){
                    var n,str=''
                    if(id==23529){
                        n = kjCode.replace("+", " ").split(" ");
                        str = ""
                        for (var i = 0; i < n.length; i++) {
                            if (i >= n.length - 2) {
                                str += " <span class='blue_balls'>" + n[i] + "</span>"
                            } else {
                                str += " <span class='red_balls'>" + n[i] + "</span>"
                            }
                        }
                    }else if(id==23528 || id==51){
                        n = kjCode.replace("+", " ").split(" ");
                        str = "";
                        for (var i = 0; i < n.length; i++) {
                            if (i == n.length - 1) {
                                str += " <span class='blue_balls'>" + n[i] + "</span>"
                            } else {
                                str += " <span class='red_balls'>" + n[i] + "</span>"
                            }
                        }
                    }else if(id==11){
                        str += "   <div class='result-jc'><span class='result-jc-result'>" + kjCode + "</span></div>"
                    }
                    else{
                        n = kjCode.split("");
                        str = "";
                        for (var i = 0; i < n.length; i++) {
                            str += " <span class='red_balls'>" + n[i] + "</span>"
                        }
                    }
                    return str;
                }
                return s
            }
        },
        methods:{
            //请求首页数据
            fetch_index:function(){
                var self = this;
                resultResoure.fetchAll(function(data){
                    if(!data||!data.length) {
                        alert("%>_<%暂无开奖数据，请稍后再查看！")
                    }else{
                        self.currentData = self.matchIndexData(data)
                        self.isLoading = false
                    }
                })
            },
            //双色球
            fetch_ssq:function(){
                var self = this
                resultResoure.fetchSsq( {
                    pageno: 1,
                    pagesize: 30
                },function(data){
                    self.currentData = (data.lotolist)
                    self.isLoading = false
                    console.log(data)
                })
            },
            changeView:function(){
                this.currentView = 'posts'
            },
            matchIndexData:function(d){
                var r = []
                var indexId = [
                    //双色球
                    51,
                    //福彩3d
                    52,
                    //大乐透
                    23529,
                    //七星彩
                    10022,
                    //七乐彩
                    23528,
                    //排列三
                    33,
                    //胜负彩
                    11
                ]
                for(var i=0;i< d.length;i++){
                    for(var n= 0;n<indexId.length;n++){
                        if(d[i].lotId==indexId[n]){
                            d[i].time =  d[i].endTime.split(" ")[0]
                            r.push(d[i])
                        }
                    }
                }
                return r;
            }
        }
    })

    var routes = {
        "/index":function(){
            result.currentView = 'index'
        },
        '/ssq': function(){
            result.currentView = 'ssq'
        }
    };
    var router = Router(routes);
    router.init("/index");
})(window)