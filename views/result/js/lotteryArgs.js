/**
 * @所有彩种相关配置
 * 依赖 无
 * @author gaoliwei
 * 用法 name:彩种名称,  tradeId:采种Id, tradeRouter：购买路由，isTrade：是否能购买,
 * lotteryType:0,1,2,3| 福彩,体彩,足彩,竞彩,isGp:是否高频,isSsc:是不是时时彩，isZc：是不是足彩;,kjWeek:周几开奖；
 *
 **/
define({
    "001": {
        "name": "双色球",
        "tradeId": "001",
        "model": "lt",
        "oldId": "51",
        "tradeRouter": "/ssq/",
        "isTrade": false,
        "kjWeek": [2,4,7],
        "lotteryType": 0
    },
    "002": {
        "name": "福彩3D",
        "tradeId": "002",
        "model": "pl",
        "oldId": "52",
        "tradeRouter": "/lottery/3d/",
        "isTrade": false,
        "lotteryType": 0
    },
    "003": {
        "name": "七乐彩",
        "tradeId": "003",
        "oldId": "23528",
        "tradeRouter": "/lottery/qlc/",
        "isTrade": false,
        "model": "lt",
        "kjWeek": [1,3,5],
        "lotteryType": 0
    },
    "004": {
        "name": "东方6+1",
        "tradeId": "004",
        "oldId": "23531",
        "tradeRouter": "/lottery/df/",
        "isTrade": false,
        "kjWeek": [2,5,7],
        "lotteryType": 0
    },
    "005": {
        "name": "华东六省15选5",
        "tradeId": "005",
        "oldId": "21304",
        "tradeRouter": "/lottery/155/",
        "isTrade": false,
        "lotteryType": 0
    },
    "006": {
        "name": "江西时时彩",
        "tradeId": "006",
        "oldId": "13001",
        "tradeRouter": "/lottery/ssc/",
        "isTrade": false,
        "lotteryType": 0,
        "model": "pl",
        "isSsc": true,
        "isGp": true
    },
    "007": {
        "name": "上海时时乐",
        "tradeId": "007",
        "oldId": "10202",
        "isTrade": false,
        "model": "pl",
        "lotteryType": 0,
        "isGp": true
    },

    "008": {
        "name": "上海4D",
        "tradeId": "008",
        "oldId": "",
        "model": "pl",
        "lotteryType": 0,
    },


    "016": {
        "name": "快乐8",
        "tradeId": "016",
        "oldId": "20108",
        "tradeRouter": "/lottery/kl8/",
        "isTrade": true,
        "lotteryType": 0,
        "isGp": true
    },
    "017": {
        "name": "PK10",
        "tradeId": "017",
        "oldId": "20109",
        "tradeRouter": "/lottery/pk10/",
        "isTrade": false,
        "lotteryType": 0,
        "isGp": true
    },
    "018": {
        "name": "重庆时时彩",
        "tradeId": "018",
        "oldId": "10401",
        "tradeRouter": "/cqssc/",
        "isTrade": false,
        "lotteryType": 0,
        "model": "pl",
        "isSsc": true,
        "isGp": true
    },
    "019": {
        "name": "北京3D",
        "tradeId": "019",
        "oldId": "",
        "isTrade": true,
        "model": "pl",
        "lotteryType": 0,
    },
    "020": {
        "name": "山东群英会",
        "tradeId": "020",
        "oldId": "21407",
        "tradeRouter": "/lottery/qyh/",
        "isTrade": false,
        "model": "pl",
        "lotteryType": 0,
        "isGp": true
    },

    "021": {
        "name": "重庆幸运农场",
        "tradeId": "021",
        "oldId": "",
        "model": "pl",
        "lotteryType": 0,
        "isGp": true
    },

    "022": {
        "name": "湖北快三",
        "tradeId": "022",
        "oldId": "23541",
        "model": "pl",
        "lotteryType": 0,
        "isGp": true
    },
    "023": {
        "name": "吉林快三",
        "tradeId": "023",
        "oldId": "23542",
        "model": "pl",
        "lotteryType": 0,
        "isGp": true
    },

    "024": {
        "name": "安徽快三",
        "tradeId": "024",
        "oldId": "23543",
        "tradeRouter": "/lottery/ahk3/",
        "isTrade": false,
        "model": "pl",
        "lotteryType": 1,
        "isGp": true
    },

    "025": {
        "name": "广东快乐10分",
        "tradeId": "025",
        "oldId": "23545",
        "tradeRouter": "/lottery/kl10/",
        "isTrade": false,
        "model": "pl",
        "lotteryType": 0,
        "isGp": true
    },

    "027": {
        "name": "江苏快三",
        "tradeId": "027",
        "oldId": "23548",
        "model": "pl",
        "lotteryType": 0,
        "isGp": true
    },
    "028": {
        "name": "广西快三",
        "tradeId": "028",
        "oldId": "",
        "model": "pl",
        "lotteryType": 0,
        "isGp": true
    },


    "029": {
        "name": "北京快三",
        "tradeId": "029",
        "lotteryType": 0,
        "isGp": true
    },
    "030": {
        "name": "河南快三",
        "tradeId": "030",
        "oldId": "",
        "model": "pl",
        "lotteryType": 0,
        "isGp": true
    },
    "031": {
        "name": "福建快三",
        "tradeId": "031",
        "oldId": "",
        "model": "pl",
        "lotteryType": 0,
        "isGp": true
    },
    "032": {
        "name": "甘肃快三",
        "tradeId": "032",
        "oldId": "",
        "model": "pl",
        "lotteryType": 0,
        "isGp": true
    },
    "033": {
        "name": "河北快三",
        "tradeId": "033",
        "oldId": "",
        "model": "pl",
        "lotteryType": 0,
        "isGp": true
    },
    "034": {
        "name": "上海快三",
        "tradeId": "034",
        "oldId": "",
        "model": "pl",
        "lotteryType": 0,
        "isGp": true
    },
    "035": {
        "name": "青海快三",
        "tradeId": "035",
        "oldId": "",
        "model": "pl",
        "lotteryType": 0,
        "isGp": true
    },
    "036": {
        "name": "贵州快三",
        "tradeId": "036",
        "oldId": "",
        "model": "pl",
        "lotteryType": 0,
        "isGp": true
    },
    "037": {
        "name": "内蒙快三",
        "tradeId": "037",
        "oldId": "",
        "model": "pl",
        "lotteryType": 0,
        "isGp": true
    },


    "085": {
        "name": "天津11选5",
        "tradeId": "085",
        "oldId": "23555",
        "lotteryType": 1,
        "isGp": true
    },

    "086": {
        "name": "甘肃11选5",
        "tradeId": "086",
        "oldId": "23556",
        "lotteryType": 1,
        "isGp": true
    },

    "087": {
        "name": "河南11选5",
        "tradeId": "087",
        "oldId": "23557",
        "lotteryType": 1,
        "isGp": true
    },

    "088": {
        "name": "四川11选5",
        "tradeId": "088",
        "oldId": "23569",
        "lotteryType": 1,
        "isGp": true
    },

    "089": {
        "name": "山西11选5",
        "tradeId": "089",
        "oldId": "23558",
        "lotteryType": 1,
        "isGp": true
    },

    "090": {
        "name": "辽宁11选5",
        "tradeId": "090",
        "oldId": "23559",
        "lotteryType": 1,
        "isGp": true
    },
    "091": {
        "name": "吉林11选5",
        "tradeId": "091",
        "oldId": "23560",
        "lotteryType": 1,
        "isGp": true
    },

    "092": {
        "name": "贵州11选5",
        "tradeId": "092",
        "oldId": "23561",
        "lotteryType": 1,
        "isGp": true
    },

    "093": {
        "name": "重庆11选5",
        "tradeId": "093",
        "oldId": "23562",
        "lotteryType": 1,
        "isGp": true
    },
    "094": {
        "name": "安徽11选5",
        "tradeId": "094",
        "oldId": "23563",
        "lotteryType": 1,
        "isGp": true
    },
    "095": {
        "name": "福建11选5",
        "tradeId": "095",
        "oldId": "23564",
        "lotteryType": 1,
        "isGp": true
    },
    "096": {
        "name": "江苏11选5",
        "tradeId": "096",
        "oldId": "23565",
        "lotteryType": 1,
        "isGp": true
    },
    "097": {
        "name": "陕西11选5",
        "tradeId": "097",
        "oldId": "23566",
        "lotteryType": 1,
        "isGp": true
    },

    "098": {
        "name": "湖北11选5",
        "oldId": "23554",
        "tradeId": "098",
        "lotteryType": 0,
        "isGp": true
    },
    "099": {
        "name": "广西11选5",
        "oldId": "23551",
        "tradeId": "099",
        "lotteryType": 0,
        "isGp": true
    },

    "100": {
        "name": "浙江11选5",
        "tradeId": "100",
        "oldId": "23567",
        "lotteryType": 1,
        "isGp": true
    },
    "101": {
        "name": "上海11选5",
        "tradeId": "101",
        "oldId": "23553",
        "lotteryType": 1,
        "isGp": true
    },

    "102": {
        "name": "新疆11选5",
        "tradeId": "102",
        "oldId": "",
        "isTrade": true,
        "lotteryType": 1,
        "isGp": true
    },


    "103": {
        "name": "山东快乐扑克",
        "tradeId": "103",
        "oldId": "23547",
        "lotteryType": 1,
        "isGp": true
    },


    "104": {
        "name": "广东11选5",
        "tradeId": "104",
        "isTrade": true,
        "oldId": "23544",
        "lotteryType": 1,
        "isGp": true
    },
    "105": {
        "name": "黑龙江11选5",
        "tradeId": "105",
        "oldId": "23568",
        "lotteryType": 1,
        "isGp": true
    },
    "106": {
        "name": "江西11选5(多乐彩)",
        "tradeId": "106",
        "oldId": "23540",
        "tradeRouter": "/lottery/jx115/",
        "isTrade": false,
        "lotteryType": 1,
        "isGp": true
    },
    "107": {
        "name": "山东11选5",
        "tradeId": "107",
        "oldId": "21406",
        "tradeRouter": "/lottery/sd115/",
        "isTrade": true,
        "lotteryType": 1,
        "isGp": true
    },

    "110": {
        "name": "七星彩",
        "model": "pl",
        "tradeId": "110",
        "oldId": "10022",
        "tradeRouter": "/lottery/qxc/",
        "isTrade": true,
        "kjWeek": [2,5,7],
        "listName": ["第一位", "第二位", "第三位", "第四位", "第五位", "第六位", "第七位"],
        "lotteryType": 1
    },


    "108": {
        "name": "排列三",
        "tradeId": "108",
        "oldId": "33",
        "model": "pl",
        "tradeRouter": "/lottery/p3/",
        "isTrade": true,
        "lotteryType": 1
    },
    "109": {
        "name": "排列五",
        "tradeId": "109",
        "oldId": "35",
        "model": "pl",
        "tradeRouter": "/lottery/p5/",
        "isTrade": true,
        "lotteryType": 1
    },
    /*
     111	22选5
     112	31选7
     114	12选2
     */

    "113": {
        "name": "超级大乐透",
        "tradeId": "113",
        "oldId": "23529",
        "tradeRouter": "/dlt/",
        "isTrade": true,
        "model": "lt",
        "kjWeek": [1,3,6],
        "lotteryType": 1
    },

    "115": {
        "name": "六场半全场",
        "tradeId": "115",
        "oldId": "16",
        "tradeRouter": "/sfc/bqc/",
        "isTrade": true,
        "kjWeek": [0],
        "lotteryType": 2
    },
    "116": {
        "name": "四场进球",
        "tradeId": "116",
        "oldId": "18",
        "tradeRouter": "/sfc/jqc/",
        "isTrade": true,
        "kjWeek": [0],
        "lotteryType": 2
    },
    "117": {
        "name": "胜负彩",
        "oldId": "11",
        "tradeId": "117",
        "tradeRouter": "/sfc/",
        "isTrade": true,
        "kjWeek": [0],
        "lotteryType": 2
    },

    "118": {
        "name": "胜负彩任九",
        "tradeId": "118",
        "oldId": "19",
        "tradeRouter": "/sfc/r9/",
        "isTrade": true,
        "kjWeek": [0],
        "lotteryType": 2
    },

    "200": {
        "name": "竞彩足球",
        "lotteryType": 4
    },

    "23525": {
        "name": "体彩22选5",
        "lotteryType": 1
    },
    "23526": {
        "name": "体彩31选7",
        "kjWeek": [1,3,5,7],
        "lotteryType": 1
    },
    "23527": {
        "name": "泛珠三角36选7",
        "kjWeek": [1,3,5],
        "lotteryType": 1
    },

    "23530": {
        "name": "生肖乐",
        "lotteryType": 1
    },
    "20104": {
        "name": "北京两步彩（一步区）",
        "lotteryType": 0
    },
    "10201": {
        "name": "上海天天彩选4",
        "lotteryType": 0
    },


    "10016": {
        "name": "天津体彩6+1",
        "kjWeek": [2,5,7],
        "lotteryType": 1
    },
    "20303": {
        "name": "天津风采15选5",
        "lotteryType": 0
    },
    "10019": {
        "name": "浙江体彩6+1",
        "kjWeek": [2,5,7],
        "lotteryType": 1
    },
    "21302": {
        "name": "浙江体彩20选5",
        "lotteryType": 1
    },
    "23533": {
        "name": "浙江体彩31选7",
        "kjWeek": [1,3,5,7],
        "lotteryType": 1
    },
    "20701": {
        "name": "南粤风采26选5",
        "kjWeek": [2,4,7],
        "lotteryType": 0
    },
    "20703": {
        "name": "南粤风采36选7",
        "kjWeek": [1,3,5],
        "lotteryType": 0
    },
    "20704": {
        "name": "深圳风采35选7",
        "kjWeek": [1,3,6],
        "lotteryType": 0
    },
    "10013": {
        "name": "江苏体彩7位数",
        "lotteryType": 1
    },
    "10014": {
        "name": "江苏体彩5+1",
        "lotteryType": 1
    },

    "22204": {
        "name": "福建体彩22选5",
        "lotteryType": 1
    },
    "22205": {
        "name": "福建体彩31选7",
        "kjWeek": [1,3,5,7],
        "lotteryType": 1
    },
    "22206": {
        "name": "福建体彩36选7",
        "kjWeek": [1,3,5],
        "lotteryType": 1
    },
    "21902": {
        "name": "辽宁风采35选7",
        "kjWeek": [1,3,5],
        "lotteryType": 0
    },
    "21703": {
        "name": "燕赵风采20选5",
        "lotteryType": 0
    },
    "21603": {
        "name": "中原风采22选5",
        "lotteryType": 0
    },
    "21401": {
        "name": "齐鲁风采23选5",
        "lotteryType": 0
    },

    "22003": {
        "name": "三晋风采21选5",
        "lotteryType": 0
    },
    "22701": {
        "name": "楚天风采22选5",
        "lotteryType": 0
    },
    "10010": {
        "name": "黑龙江体彩6+1",
        "kjWeek": [2,5,7],
        "lotteryType": 1
    },
    "10025": {
        "name": "黑龙江福彩P62",
        "lotteryType": 0
    },
    "21502": {
        "name": "龙江风采22选5",
        "lotteryType": 0
    },
    "21504": {
        "name": "龙江风采36选7",
        "kjWeek": [1,3,5],
        "lotteryType": 0
    },
    "22104": {
        "name": "安徽福彩25选5",
        "lotteryType": 0
    },

    "23507": {
        "name": "云贵川福彩22选5",
        "lotteryType": 0
    },
    "10026": {
        "name": "海南体彩4+1",
        "lotteryType": 1
    },
    "22601": {
        "name": "新疆风采35选7",
        "kjWeek": [1,3,5],
        "lotteryType": 0
    },
    "22602": {
        "name": "新疆风采18选7",
        "lotteryType": 0
    },
    "22603": {
        "name": "新疆风采25选7",
        "lotteryType": 0
    },

    "23101": {
        "name": "湖南风采22选5",
        "lotteryType": 0
    },
    "20105": {
        "name": "北京3D",
        "model": "pl",
        "lotteryType": 0
    },
    "21505": {
        "name": "黑龙江时时彩",
        "lotteryType": 0,
        "isSsc": true,
        "isGp": true
    },
    "21706": {
        "name": "燕赵风采排列7",
        "kjWeek": [1,3,5],
        "model": "pl",
        "lotteryType": 0
    },
    "22604": {
        "name": "新疆风采偶数10选7",
        "lotteryType": 0
    }
    ,
    "23006": {
        "name": "江西风采15选5",
        "lotteryType": 0
    },
    "23009": {
        "name": "多乐彩",
        "lotteryType": 0,
        "isGp": true
    },
    "23534": {
        "name": "北京体彩33选7",
        "lotteryType": 0
    },
    "23539": {
        "name": "吉林11选5",
        "lotteryType": 0,
        "isGp": true
    },
    "21705": {
        "name": "燕赵风采排列5",
        "lotteryType": 0
    }
})