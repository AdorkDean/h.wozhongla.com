define("wzlh5/1.0.0/ac", ["jquery/2.1.1/jquery"], function(require, exports, module) {
    /**
     * Created by hebo (razr409355439@gmail.com)on 2014/8/12.
     */
   // ,"fastclick/1.0.2/fastclick"
    var $ = require("jquery/2.1.1/jquery")
    var CONFIG = require('wzlh5/1.0.0/config');
    var qastClick = require("fastclick/1.0.2/fastclick");
    var domain = "http://116.213.75.151:8083/"
    var host = domain+"bonus/";
    var callback = "&format=jsonp&callback=?";
    //线下测试环境
//  var abc = window.location.host;
//  if(abc.indexOf(':')!= -1){
//  	var f = abc.substring(0, abc.indexOf(':'))
//  }else{
//  	var f = abc;	
//  }
//	var INF_CONFIG ='http://'+f+':9988/';
//	var TZ_CONFIG = 'http://www.wozhongla.com/';
//	var CS_CONFIG = 'http://'+abc+'/PointsLottery/bet/dg'
    //线上环境
    var INF_CONFIG ='http://'+window.location.host+'/';
    var TZ_CONFIG = 'http://www.wozhongla.com/';
    var CS_CONFIG = 'http://'+window.location.host+'/PointsLottery/bet/dg'
    
    //版本号
    var version = "3.8.1";
    //是否使用jsonp方式
    var ISJSONP = true;
    //接口配置
    var REQUEST_CONFIG = {
        //登录
        login: INF_CONFIG + "wzlInterface/servicesAPI/mobile/login?",
        //1 wap 2 kjava 4Andriod 5 ios 6 weixin
        //注册
        register: INF_CONFIG + "wzlInterface/servicesAPI/mobile/userRegister?",
        //获取验证码
        getCode: INF_CONFIG + "wzlInterface/servicesAPI/mobile/getCode?",
        //验证验证码
        verifyCode: INF_CONFIG + "wzlInterface/servicesAPI/verifyCode?",
        //找回密码
        backPwd: INF_CONFIG + "wzlInterface/servicesAPI/backPassword?",
        //找回密码code
        backPwdCode: INF_CONFIG + "wzlInterface/servicesAPI/getCode?",
        //修改用户名
        uchangeName: INF_CONFIG + 'wzlInterface/servicesAPI/user/modifyUserName?',
        //修改密码
        updatePwd: INF_CONFIG + "wzlInterface/servicesAPI/mobile/modifyPassWord?",
        //提现
        draw: INF_CONFIG + "wzlInterface/servicesAPI/Draw?",
        //提现记录查询
        showDrawList: INF_CONFIG + "wzlInterface/servicesAPI/ShowDrawList?",
        //用户基本信息
        queryUserInfo: INF_CONFIG + "wzlInterface/servicesAPI/queryUserInfo?",
        //用户所有信息
        queryUserAllInfo: INF_CONFIG + "wzlInterface/servicesAPI/queryUserAllInfo?",
        //用户账户信息
        queyrUserAccount: INF_CONFIG + "wzlInterface/servicesAPI/queryAccountInfo?",
 

       //查询银行卡绑定信息
        queryBankInfo: INF_CONFIG + "wzlInterface/servicesAPI/queryBindInfo?",
        //订单详情
        showDetail: INF_CONFIG + "wzlInterface/servicesAPI/mobile/showDetail?",
        //账户明细 --全部
        queryAccountRefer: INF_CONFIG + "wzlInterface/servicesAPI/refer?",
        //账户明细 --充值记录
        queryAccountRecharge: INF_CONFIG + "wzlInterface/servicesAPI/recharge?",
        //账户明细 --提现记录查询
        queryAccountWithDraw: INF_CONFIG + "wzlInterface/servicesAPI/withdraw?",
        //账户明细 --彩金查询
        queryAccountPacket: INF_CONFIG + "wzlInterface/servicesAPI/packet?",
        //账户明细 --返奖查询
        queryAccountPrize: INF_CONFIG + "wzlInterface/servicesAPI/prize?",
        //投注明细
        bettingOrder: INF_CONFIG + "wzlInterface/servicesAPI/bettingOrder?",
        //投注记录
        allBetting: INF_CONFIG + "wzlInterface/servicesAPI/allBetting?",
        //追号记录
        showPreproject: INF_CONFIG +"wzlInterface/servicesAPI/mobile/showPreproject?",
        //账户投注查询     详细
        queryAccountBetting: INF_CONFIG + "wzlInterface/servicesAPI/betting?",
        //绑定银行卡
        bindBank: INF_CONFIG + "wzlInterface/servicesAPI/bindBank?",
        //绑定手机
        verifyMobile: INF_CONFIG + "wzlInterface/servicesAPI/mobile/verifyMobile?",
        //绑定身份信息
        modifyId: INF_CONFIG + "wzlInterface/servicesAPI/user/modify?",
        //删除绑定银行卡
        removeBank: INF_CONFIG + "wzlInterface/servicesAPI/removeBank",
        //获取银联支付
        getAccept: INF_CONFIG + "wzlInterface/servicesAPI/UpmpChargeAction/getAccept?",
        //银行卡支付
        doMobileCharge: INF_CONFIG + "wzlInterface/servicesAPI/umpay/pay.do?",
        //支付宝支付
//      doAlipayCharge: INF_CONFIG + "wzlInterface/servicesAPI/UpmpChargeAction/doAlipayCharge",
		
        //易宝支付
       // yibaoCharge: INF_CONFIG + "wzlInterface/servicesAPI/yeepay/doPay?",
        //微信支付
		weixinCharge: INF_CONFIG + "wzlInterface/servicesAPI/wxwap/pay.do?",
		//微信支付
		qqCharge: INF_CONFIG + "wzlInterface/servicesAPI/qqpay/pay.do?",
        //彩金卡支付
        wzlCardCharge: INF_CONFIG + "wzlInterface/servicesAPI/UpmpChargeAction/wzlCardCharge?",
        //退出登录
        logout: INF_CONFIG + "wzlInterface/servicesAPI/mobile/logout?",
        //双色球投注接口
        ssqTz: "/sltssq/tz",
        //竞彩
        jcTz: "/sltdc/tz",
        //获取彩种期次
        getIssue: TZ_CONFIG + "slttz/preissue",
        //jcMatch
        jcMatch: TZ_CONFIG + "slttz/preissue?method=jcMatch&lotoId=320",
        //jcOdds
        jcOdds: TZ_CONFIG + "slttz/preissue?method=jcOdds&lotoId=320",
        //wzlindex轮播数据
        wzlindexWining: TZ_CONFIG + "/sp2/act/inter.info.action?wAgent=8848&wPassword=888888&wReturnFmt=2&wAction=5003&wParam=lotId=0_amount=1000_limit=8&v=2784",
        //全国开奖
        result: TZ_CONFIG + "sp2/act/inter.info.action?wAgent=8848&wPassword=888888&wReturnFmt=2&&wReturnFmt=2&wAction=1012&wParam=areaId=35&",
        //竞彩足球开奖
        resultJczq: TZ_CONFIG + "sp2/act/data.jcmatchOne.htm?type=301&",
        //竞彩足球期次
        jczqIssue: TZ_CONFIG + "sp2/act/data.zcToptenIssue.htm?&type=301&",
        //双色球开奖
        resultSsq: TZ_CONFIG + "sp2/act/inter.info.action?wAgent=8848&wPassword=888888&wReturnFmt=2&&wAction=1014&",
        //大乐透开奖
        resultDlt: TZ_CONFIG + "sp2/act/inter.info.action?wAgent=8848&wPassword=888888&wReturnFmt=2&&wAction=1014&",
        //福彩3d
        resultFc3d: TZ_CONFIG + "sp2/act/inter.info.action?wAgent=8848&wPassword=888888&wReturnFmt=2&&wAction=1014&",
        //江西时时彩
        resultJxssc: TZ_CONFIG + "sp2/act/inter.info.action?wAgent=8848&wPassword=888888&wReturnFmt=2&&wAction=1014&",
        //根据彩种查开奖号
        issue2result: TZ_CONFIG + "sp2/act/inter.info.action?wAgent=8848&wPassword=888888&wReturnFmt=2&&wAction=1015&",
        //期次开奖
       issue2resultAll:TZ_CONFIG+'sp2/act/inter.info.action?wAgent=8848&wPassword=888888&wReturnFmt=2&&wAction=1014&',
        //
        wzlMobileHome:TZ_CONFIG+'news/API/JSON/wzlMobileHome.php?tid=896&callback=?',
        //遗漏
        yl: TZ_CONFIG+"sp2/act/chartmall.chart.htm?chart.type=",
        test: ""
    }
    //双色球  51
    //大乐透  23529
    //福彩3d  52
    //江西时时彩 13001
    //七乐彩  23528
    //七星彩  10022
    //排列3   33
    //彩种ID
    var LOTTERY = {
        SSQ: "001",
        FC3D: '002',
        PL3: '108',
        PL5: "109",
        QXC:"110",
        QLC:"003",
        DLT: '113',
        JXSSC: '006',
        CQSSC: "018",
        JCZQSPF: "320",
        JX11X5:"106",
		AHK3:"024",
        GD11X5:"104",
        SD11X5:'107'
    }
    //联盟id配置（注册）
    var UNIONUSER_ID = '27', //联盟号
        CHANNELID = '6'; //注册来源
    function baseAjax(method, url, data, fnSuccess, fnFaild, fill) {
    	
        var dataType = "text";
        if (ISJSONP) {
            dataType = 'json';
            url = url + 'format=jsonp&callback=?';
            
        } else {}
        $.ajax({
            type: method,
            cache: false,
            url: url,
            data: data,
            dataType: dataType,
            success: function(re) {
                fnSuccess && fnSuccess(re)
            },
            error: function(re) {
                fnFaild && fnFaild(re)
            }
        })
    }
    //获得投注接口 安卓
    function getTzurl(url){
        try{
            return CarTz.getTzUrl(url);
        }catch(e){
            return url;
        }
    }
    /*var ac = {};
     for(var i in REQUEST_CONFIG){
     ac[i] = function(){
     return baseAjax.apply(null,arguments);
     }()
     }
     return ac;*/
    //TODO 接口定义可简化 可配置  接口文档
    function login(data, fn) {
        baseAjax('GET', REQUEST_CONFIG.login, data, fn, fn)
    }

    function register(data, fn) {
        //data.UNIONUSER_ID = 1;
        data.unionUserId = data.unionUserId || UNIONUSER_ID;  //联盟号

        data.channelid = CHANNELID;
        var host = location.host||location.hostname;
        if(host =="pt.wozhongla.com"){
            data.unionUserId = "148";
        }
        baseAjax('GET', REQUEST_CONFIG.register, data, fn, fn)
    }

    function getCode(data, fn) {
        baseAjax('GET', REQUEST_CONFIG.getCode, data, fn, fn)
    }

    function verifyCode(data, fn) {
        baseAjax('GET', REQUEST_CONFIG.verifyCode, data, fn, fn)
    }

    function backPwdCode(data, fn) {
        baseAjax('GET', REQUEST_CONFIG.backPwdCode, data, fn, fn)
    }

    function backPwd(data, fn) {
        baseAjax('GET', REQUEST_CONFIG.backPwd, data, fn, fn)
    }

    function getAccept(data, fn) {
        baseAjax('GET', REQUEST_CONFIG.getAccept, data, fn, fn)
    }

    function updatePwd(data, fn) {
        baseAjax('GET', REQUEST_CONFIG.updatePwd, data, fn, fn)
    }

    function showDrawList(data, fn) {
        baseAjax('GET', REQUEST_CONFIG.showDrawList, data, fn, fn)
    }

    function showDetail(data, fn) {
        baseAjax('GET', REQUEST_CONFIG.showDetail, data, fn, fn)
    }

    function queryUserInfo(data, fn) {
        baseAjax('GET', REQUEST_CONFIG.queryUserInfo, data, fn, fn)
    }

    function queryUserAllInfo(data, fn) {
        baseAjax('GET', REQUEST_CONFIG.queryUserAllInfo, data, fn, fn)
    }

    function queyrUserAccount(data, fn) {
        baseAjax('GET', REQUEST_CONFIG.queyrUserAccount, data, fn, fn)
    }

    function bindBank(data, fn) {
        baseAjax('GET', REQUEST_CONFIG.bindBank, data, fn, fn)
    }

    function queryBankInfo(data, fn) {
        baseAjax('GET', REQUEST_CONFIG.queryBankInfo, data, fn, fn)
    }

    function draw(data, fn) {
        baseAjax('GET', REQUEST_CONFIG.draw, data, fn, fn)
    }

    function allBetting(data, fn) {
        baseAjax('GET', REQUEST_CONFIG.allBetting, data, fn, fn)
    }

    function showPreproject(data, fn) {
        baseAjax('GET', REQUEST_CONFIG.showPreproject, data, fn, fn)
    }

    function wzlindexWining(data, fn) {
        baseAjax('GET', REQUEST_CONFIG.wzlindexWining, data, fn, fn)
    }

    function uchangeName(data, fn) {
        baseAjax('GET', REQUEST_CONFIG.uchangeName, data, fn, fn)
    }

    function modifyId(data, fn) {
        baseAjax('GET', REQUEST_CONFIG.modifyId, data, fn, fn)
    }

    function verifyMobile(data, fn) {
        baseAjax('GET', REQUEST_CONFIG.verifyMobile, data, fn, fn)
    }

    function wzlMobileHome(data, fn){
        baseAjax('GET', REQUEST_CONFIG.wzlMobileHome, data, fn, fn)
    }

    function logout(data, fn) {
        baseAjax('GET', REQUEST_CONFIG.logout, data, fn, fn)
    }
    //获取期次
    function getIssue(data, fn) {
        data.lotoId = LOTTERY[data.lottery];
        data.method = "preissuenew";
        //console.log(REQUEST_CONFIG.getIssue + "?callback=?");
        //console.log(data)
        $.ajax({
            type: 'GET',
            //url: 'http://192.168.0.252/'+REQUEST_CONFIG.getIssue+"?callback=?",
            url: REQUEST_CONFIG.getIssue + "?callback=?",
            //url:"http://192.168.0.252/slttz/preissue?method=preissuenew&lotoId=110&issues=1&format=ajax",
            data: data,
            dataType: 'json',
            success: function(re) {
            	
                fn && fn(re)
            },
            error: function(re) {
                fn && fn(re || {
                    msg: "nothing"
                })
            }
        })
    }
    /**
     * 获取当前期次详情
     * @param data
     * @param fn
     */
    function getNowIssue(data, fn) {
        data.lotoId = LOTTERY[data.lottery];
        data.method = "preissuenew";
        data.issues = 1;
        //method=preissuenew 固定
        //lotoId=彩种
        //issues=获取多少期
        //format=ajax 固定
        $.ajax({
            type: 'GET',
            url: REQUEST_CONFIG.getIssue + "?callback=?",
            data: data,
            dataType: 'json',
            success: function(re) {
                fn && fn(re[0])
            },
            error: function(re) {
                fn && fn(re || {
                    msg: "nothing"
                })
            }
        })
    }
    //双色球投注接口
    function ssqTz(data, fn) {
    	
        $.ajax({
            method: "POST",
            data: {betJson:data},
            url: CS_CONFIG,
            datatype: "json",
            success: function(re) {
            	console.log('成功')
                fn && fn(re)
            },
            error: function(re) {
            	console.log('失败')
                fn && fn(re)
            }
        })
    }
    //二维码金额获取
    function QrCode(data, fn) {
    	
        $.ajax({
            method: "Get",
            url:'/PointsLottery/qrcode/query?code='+data.qrCode,
            datatype: "json",
            success: function(re) {
            	
                fn && fn(re)
            },
            error: function(re) {
            	
                fn && fn(re)
            }
        })
    }
    //大乐透投注
    function dltTz(data, fn) {
    	
        $.ajax({
            method: "POST",
            data: {betJson:data},
            url: CS_CONFIG,
            datatype: "json",
            success: function(re) {
                fn && fn(re)
            },
            error: function(re) {
            	console.log('失败')
                fn && fn(re)
            }
        })
    }
    function jcTz(data, fn) {
    	//console.log(data)
        $.ajax({
            method: "POST",
            data: {betJson:data},
            url: CS_CONFIG,
            datatype: "json",
            success: function(re) {
            	console.log(re)
                fn && fn(re)
            },
            error: function(re) {
            	console.log(re)
                fn && fn(re)
            }
        })
    }
//  function dltTz(data, fn) {
//      $.ajax({
//          method: "POST",
//          data: data,
//          url: getTzurl(REQUEST_CONFIG.ssqTz),
//          success: function(re) {
//              fn && fn(re)
//          },
//          error: function(re) {
//              fn && fn(re)
//          }
//      })
//  }
    //福彩3d投注
    function fc3dTz(data, fn) {
        $.ajax({
            method: "POST",
            data: data,
            url: getTzurl(REQUEST_CONFIG.ssqTz),
            success: function(re) {
                fn && fn(re)
            },
            error: function(re) {
                fn && fn(re)
            }
        })
    }
    //排列五投注
    function pl3Tz(data, fn) {
    	
        $.ajax({
            method: "POST",
            data: {betJson:data},
            url: CS_CONFIG,
            datatype: "json",
            success: function(re) {
            	console.log('成功')
                fn && fn(re)
            },
            error: function(re) {
            	console.log('失败')
                fn && fn(re)
            }
        })
    }
//  function pl3Tz(data, fn) {
//  	//console.log(getTzurl(REQUEST_CONFIG.ssqTz))
//      $.ajax({
//          method: "POST",
//          data: data,
//          url: getTzurl(REQUEST_CONFIG.ssqTz),
//          success: function(re) {
//              fn && fn(re)
//          },
//          error: function(re) {
//              fn && fn(re)
//          }
//      })
//  }
    //竞彩投注
//  function jcTz(data, fn) {
//      $.ajax({
//          method: "POST",
//          data: data,
//          url: getTzurl(REQUEST_CONFIG.jcTz),
//          success: function(re) {
//              fn && fn(re)
//          },
//          error: function(re) {
//              fn && fn(re)
//          }
//      })
//  }
    //全国开奖
    function queryResult(fn) {
        baseAjax('GET', REQUEST_CONFIG.result, {}, fn, fn)
    }
    //竞彩足球期次查询
    function queryJczqIssue(fn) {
        baseAjax('GET', REQUEST_CONFIG.jczqIssue, {}, fn, fn)
    }
    //竞彩足球开奖
    function queryJczq(data, fn) { //issueNumber
        baseAjax('GET', REQUEST_CONFIG.resultJczq, data, fn, fn)
    }
    //双色球  51
    //大乐透  23529
    //福彩3d  52
    //江西时时彩 13001
    //七乐彩  23528
    //七星彩  10022
    //排列3   33
    //双色球开奖
    function querySsq(data, fn) {
        //baseAjax('GET', REQUEST_CONFIG.resultSsq, data, fn, fn)
        if (!data) data = {
            pageno: 1,
            pagesize: 30
        }
        var wparamStr = 'wParam=lotId=51_pageno=' + data.pageno + "_pagesize=" + data.pagesize + "_startIssue=_endIssue=&";
        //wParam=lotId=51_pageno=1_pagesize=10
        $.ajax({
            type: 'GET',
            url: REQUEST_CONFIG.resultSsq + wparamStr + 'format=jsonp&callback=?',
            data: data,
            dataType: 'json',
            success: function(d) {
                fn && fn(d)
            },
            error: function(re) {
                fn && fn(re)
            }
        })
    }
    //大乐透
    function queryDlt(data, fn) {
        //baseAjax('GET', REQUEST_CONFIG.resultDlt, data, fn, fn)
        if (!data) data = {
            pageno: 1,
            pagesize: 30
        }
        var wparamStr = 'wParam=lotId=23529_pageno=' + data.pageno + "_pagesize=" + data.pagesize + "_startIssue=_endIssue=&";
        //wParam=lotId=51_pageno=1_pagesize=10
        $.ajax({
            type: 'GET',
            url: REQUEST_CONFIG.resultDlt + wparamStr + 'format=jsonp&callback=?',
            data: data,
            dataType: 'json',
            success: function(d) {
                fn && fn(d)
            },
            error: function(re) {
                fn && fn(re)
            }
        })
    }
    //福彩3d
    function queryFc3d(data, fn) {
        if (!data) data = {
            pageno: 1,
            pagesize: 30
        }
        var wparamStr = 'wParam=lotId=52_pageno=' + data.pageno + "_pagesize=" + data.pagesize + "_startIssue=_endIssue=&";
        //wParam=lotId=51_pageno=1_pagesize=10
        $.ajax({
            type: 'GET',
            url: REQUEST_CONFIG.resultDlt + wparamStr + 'format=jsonp&callback=?',
            data: data,
            dataType: 'json',
            success: function(d) {
                fn && fn(d)
            },
            error: function(re) {
                fn && fn(re)
            }
        })
    }
    //江西时时彩
    function queryJxssc(data, fn) {
        //baseAjax('GET', REQUEST_CONFIG.resultJxssc, data, fn, fn)
        if (!data) data = {
            pageno: 1,
            pagesize: 30
        }
        var wparamStr = 'wParam=lotId=13001_pageno=' + data.pageno + "_pagesize=" + data.pagesize + "_startIssue=_endIssue=&";
        //wParam=lotId=51_pageno=1_pagesize=10
        $.ajax({
            type: 'GET',
            url: REQUEST_CONFIG.resultDlt + wparamStr + 'format=jsonp&callback=?',
            data: data,
            dataType: 'json',
            success: function(d) {
                fn && fn(d)
            },
            error: function(re) {
                fn && fn(re)
            }
        })
    }

    //江西时时彩
    function queryCqssc(data, fn) {
        //baseAjax('GET', REQUEST_CONFIG.resultJxssc, data, fn, fn)
        if (!data) data = {
            pageno: 1,
            pagesize: 30
        }
        var wparamStr = 'wParam=lotId=10401_pageno=' + data.pageno + "_pagesize=" + data.pagesize + "_startIssue=_endIssue=&";
        //wParam=lotId=51_pageno=1_pagesize=10
        $.ajax({
            type: 'GET',
            url: REQUEST_CONFIG.resultDlt + wparamStr + 'format=jsonp&callback=?',
            data: data,
            dataType: 'json',
            success: function(d) {
                fn && fn(d)
            },
            error: function(re) {
                fn && fn(re)
            }
        })
    }

    //江西11选5
    function queryX115(data, fn) {
        if (!data) data = {
            pageno: 1,
            pagesize: 30
        }
        var wparamStr = 'wParam=lotId=23540_pageno=' + data.pageno + "_pagesize=" + data.pagesize + "_startIssue=_endIssue=&";
        //wParam=lotId=51_pageno=1_pagesize=10
        $.ajax({
            type: 'GET',
            url: REQUEST_CONFIG.resultDlt + wparamStr + 'format=jsonp&callback=?',
            data: data,
            dataType: 'json',
            success: function(d) {
                fn && fn(d)
            },
            error: function(re) {
                fn && fn(re)
            }
        })
    }
	
	//安徽快三
    function queryK3(data, fn) {
        if (!data) data = {
            pageno: 1,
            pagesize: 30
        }
        var wparamStr = 'wParam=lotId=23543_pageno=' + data.pageno + "_pagesize=" + data.pagesize + "_startIssue=_endIssue=&";
        //wParam=lotId=51_pageno=1_pagesize=10
        $.ajax({
            type: 'GET',
            url: REQUEST_CONFIG.resultDlt + wparamStr + 'format=jsonp&callback=?',
            data: data,
            dataType: 'json',
            success: function(d) {
                fn && fn(d)
            },
            error: function(re) {
                fn && fn(re)
            }
        })
    }
    //七星彩
    function queryqxc(data, fn) {
        if (!data) data = {
            pageno: 1,
            pagesize: 30
        }
        var wparamStr = 'wParam=lotId=10022_pageno=' + data.pageno + "_pagesize=" + data.pagesize + "_startIssue=_endIssue=&";
        //wParam=lotId=51_pageno=1_pagesize=10
        $.ajax({
            type: 'GET',
            url: REQUEST_CONFIG.resultDlt + wparamStr + 'format=jsonp&callback=?',
            data: data,
            dataType: 'json',
            success: function(d) {
                fn && fn(d)
            },
            error: function(re) {
                fn && fn(re)
            }
        })
    }

    //七乐彩
    function queryqlc(data, fn) {
        if (!data) data = {
            pageno: 1,
            pagesize: 30
        }
        var wparamStr = 'wParam=lotId=23528_pageno=' + data.pageno + "_pagesize=" + data.pagesize + "_startIssue=_endIssue=&";
        //wParam=lotId=51_pageno=1_pagesize=10
        $.ajax({
            type: 'GET',
            url: REQUEST_CONFIG.resultDlt + wparamStr + 'format=jsonp&callback=?',
            data: data,
            dataType: 'json',
            success: function(d) {
                fn && fn(d)
            },
            error: function(re) {
                fn && fn(re)
            }
        })
    }

    //排列3
    function querypl3(data, fn) {
        if (!data) data = {
            pageno: 1,
            pagesize: 30
        }
        var wparamStr = 'wParam=lotId=33_pageno=' + data.pageno + "_pagesize=" + data.pagesize + "_startIssue=_endIssue=&";
        //wParam=lotId=51_pageno=1_pagesize=10
        $.ajax({
            type: 'GET',
            url: REQUEST_CONFIG.resultDlt + wparamStr + 'format=jsonp&callback=?',
            data: data,
            dataType: 'json',
            success: function(d) {
                fn && fn(d)
            },
            error: function(re) {
                fn && fn(re)
            }
        })
    }

    //排列5
    function querypl5(data, fn) {
        if (!data) data = {
            pageno: 1,
            pagesize: 30
        }
        var wparamStr = 'wParam=lotId=35_pageno=' + data.pageno + "_pagesize=" + data.pagesize + "_startIssue=_endIssue=&";
        //wParam=lotId=51_pageno=1_pagesize=10
        $.ajax({
            type: 'GET',
            url: REQUEST_CONFIG.resultDlt + wparamStr + 'format=jsonp&callback=?',
            data: data,
            dataType: 'json',
            success: function(d) {
                fn && fn(d)
            },
            error: function(re) {
                fn && fn(re)
            }
        })
    }

    //快乐10分
    function queryklsf(data, fn) {
        if (!data) data = {
            pageno: 1,
            pagesize: 30
        }
        var wparamStr = 'wParam=lotId=23545_pageno=' + data.pageno + "_pagesize=" + data.pagesize + "_startIssue=_endIssue=&";
        //wParam=lotId=51_pageno=1_pagesize=10
        $.ajax({
            type: 'GET',
            url: REQUEST_CONFIG.resultDlt + wparamStr + 'format=jsonp&callback=?',
            data: data,
            dataType: 'json',
            success: function(d) {
                fn && fn(d)
            },
            error: function(re) {
                fn && fn(re)
            }
        })
    }

    //安徽快3
    function queryahks(data, fn) {
        if (!data) data = {
            pageno: 1,
            pagesize: 30
        }
        var wparamStr = 'wParam=lotId=23543_pageno=' + data.pageno + "_pagesize=" + data.pagesize + "_startIssue=_endIssue=&";
        //wParam=lotId=51_pageno=1_pagesize=10
        $.ajax({
            type: 'GET',
            url: REQUEST_CONFIG.resultDlt + wparamStr + 'format=jsonp&callback=?',
            data: data,
            dataType: 'json',
            success: function(d) {
                fn && fn(d)
            },
            error: function(re) {
                fn && fn(re)
            }
        })
    }

    //多乐彩  江西11选5
    function querydlc(data, fn) {
        if (!data) data = {
            pageno: 1,
            pagesize: 30
        }
        var wparamStr = 'wParam=lotId=23540_pageno=' + data.pageno + "_pagesize=" + data.pagesize + "_startIssue=_endIssue=&";
        //wParam=lotId=51_pageno=1_pagesize=10
        $.ajax({
            type: 'GET',
            url: REQUEST_CONFIG.resultDlt + wparamStr + 'format=jsonp&callback=?',
            data: data,
            dataType: 'json',
            success: function(d) {
                fn && fn(d)
            },
            error: function(re) {
                fn && fn(re)
            }
        })
    }

    //山东11选5
    function querysd11x5(data, fn) {
        if (!data) data = {
            pageno: 1,
            pagesize: 30
        }
        var wparamStr = 'wParam=lotId=21406_pageno=' + data.pageno + "_pagesize=" + data.pagesize + "_startIssue=_endIssue=&";
        //wParam=lotId=51_pageno=1_pagesize=10
        $.ajax({
            type: 'GET',
            url: REQUEST_CONFIG.resultDlt + wparamStr + 'format=jsonp&callback=?',
            data: data,
            dataType: 'json',
            success: function(d) {
                fn && fn(d)
            },
            error: function(re) {
                fn && fn(re)
            }
        })
    }

    //广东11选5
    function querygd115(data, fn) {
        if (!data) data = {
            pageno: 1,
            pagesize: 30
        }
        var wparamStr = 'wParam=lotId=23544_pageno=' + data.pageno + "_pagesize=" + data.pagesize + "_startIssue=_endIssue=&";
        //wParam=lotId=51_pageno=1_pagesize=10
        $.ajax({
            type: 'GET',
            url: REQUEST_CONFIG.resultDlt + wparamStr + 'format=jsonp&callback=?',
            data: data,
            dataType: 'json',
            success: function(d) {
                fn && fn(d)
            },
            error: function(re) {
                fn && fn(re)
            }
        })
    }

    //胜负彩
    function querysfc(data, fn) {
        if (!data) data = {
            pageno: 1,
            pagesize: 30
        }
        var wparamStr = 'wParam=lotId=11_pageno=' + data.pageno + "_pagesize=" + data.pagesize + "_startIssue=_endIssue=&";
        //wParam=lotId=51_pageno=1_pagesize=10
        $.ajax({
            type: 'GET',
            url: REQUEST_CONFIG.resultDlt + wparamStr + 'format=jsonp&callback=?',
            data: data,
            dataType: 'json',
            success: function(d) {
                fn && fn(d)
            },
            error: function(re) {
                fn && fn(re)
            }
        })
    }

    //群英会
    function queryqyh(data, fn) {
        if (!data) data = {
            pageno: 1,
            pagesize: 30
        }
        var wparamStr = 'wParam=lotId=21407_pageno=' + data.pageno + "_pagesize=" + data.pagesize + "_startIssue=_endIssue=&";
        //wParam=lotId=51_pageno=1_pagesize=10
        $.ajax({
            type: 'GET',
            url: REQUEST_CONFIG.resultDlt + wparamStr + 'format=jsonp&callback=?',
            data: data,
            dataType: 'json',
            success: function(d) {
                fn && fn(d)
            },
            error: function(re) {
                fn && fn(re)
            }
        })
    }

    //遗漏
    function yl(name, data, fn){
        var wparamStr = name+"_omission&chart.limit=200&v=7027&";
        $.ajax({
            type: 'GET',
            url: REQUEST_CONFIG.yl + wparamStr + 'format=jsonp&callback=?',
            data: data,
            dataType: 'json',
            success: function(d) {
                fn && fn(d)
            },
            error: function(re) {
                fn && fn(re)
            }
        })
    }

    function issue2result(data, fn) {
        var wparamStr = "wParam=lotId=" + data.lotId + "_lotIssue=" + data.issue + "&";
        //wParam=lotId=51_pageno=1_pagesize=10
        $.ajax({
            type: 'GET',
            url: REQUEST_CONFIG.issue2result + wparamStr + 'format=jsonp&callback=?',
            data: data,
            dataType: 'json',
            success: function(d) {
                fn && fn(d)
            },
            error: function(re) {
                fn && fn(re)
            }
        })
    }

    function issue2resultAll(data, fn) {
    	if(data.lotId == '21406'){
    		var wparamStr = "wParam=lotId=" + data.lotId +"_pageno=1_pagesize=300"+ "_startIssue=20" + data.startIssue + "_endIssue=20" + data.endIssue + "&";
    	}else{
    		var wparamStr = "wParam=lotId=" + data.lotId +"_pageno=1_pagesize=300"+ "_startIssue=" + data.startIssue + "_endIssue=" + data.endIssue + "&";
    	}
    	
        
        //console.log(wparamStr)
        //wParam=lotId=51_pageno=1_pagesize=10
        $.ajax({
            type: 'GET',
            url: REQUEST_CONFIG.issue2resultAll + wparamStr + 'format=jsonp&callback=?',
            data: data,
            dataType: 'json',
            success: function(d) {
            	
                fn && fn(d)
            },
            error: function(re) {
                fn && fn(re)
            }
        })
    }

    function queryAccountRefer(data, fn) {
        baseAjax('GET', REQUEST_CONFIG.queryAccountRefer, data, fn, fn)
    }

    function queryAccountRecharge(data, fn) {
        baseAjax('GET', REQUEST_CONFIG.queryAccountRecharge, data, fn, fn)
    }

    function queryAccountWithDraw(data, fn) {
        baseAjax('GET', REQUEST_CONFIG.queryAccountWithDraw, data, fn, fn)
    }

    function queryAccountPacket(data, fn) {
        baseAjax('GET', REQUEST_CONFIG.queryAccountPacket, data, fn, fn)
    }

    function queryAccountPrize(data, fn) {
        baseAjax('GET', REQUEST_CONFIG.queryAccountPrize, data, fn, fn)
    }

    function queryAccountBetting(data, fn) {
        baseAjax('GET', REQUEST_CONFIG.queryAccountBetting, data, fn, fn)
    }

    function bettingOrder(data, fn) {
        baseAjax('GET', REQUEST_CONFIG.bettingOrder, data, fn, fn)
    }

    function doAlipayCharge(data, fn) {
        baseAjax('GET', REQUEST_CONFIG.doAlipayCharge, data, fn, fn)
    }
    function yibaoCharge(data, fn) {
    	console.log(data)
        baseAjax('GET', REQUEST_CONFIG.yibaoCharge, data, fn, fn)
    }
	function weixinCharge(data, fn) {
		console.log(data)
        baseAjax('GET', REQUEST_CONFIG.weixinCharge, data, fn, fn)
    }
	function qqCharge(data, fn) {
		
        baseAjax('GET', REQUEST_CONFIG.qqCharge, data, fn, fn)
    }
    function wzlCardCharge(data, fn) {
        baseAjax('GET', REQUEST_CONFIG.wzlCardCharge, data, fn, fn)
    }

    function doMobileCharge(data, fn) {
        baseAjax('GET', REQUEST_CONFIG.doMobileCharge, data, fn, fn)
    }

    function jcMatchData(data, fn) {
        $.ajax({
            url: TZ_CONFIG + 'slttz/preissue?method=jcMatch&lotoId=320',
            dataType: 'jsonp',
            success: function(re1) {
                var r = {};
                for(var n=0;n<re1.length;n++){
                    r[re1[n].matchNo]=re1[n]
                }
                $.ajax({
                    url: TZ_CONFIG + 'slttz/preissue?method=jcOdds&lotoId=320',
                    dataType: 'jsonp',
                    success: function(re2) {
                        if (!re1.length || !re2.length) {
                            fn && fn({
                                resultCode: '500'
                            });
                        } else {
                            var re = []
                            for (var i = 0, len = re2.length; i < len; i++) {
                                if(r[re2[i].matchNo]){
                                    r[re2[i].matchNo].sp = re2[i].sp
                                    re.push(r[re2[i].matchNo]);
                                }
                            }
                            fn && fn(re);
                        }
                    },
                    error: function(re2) {
                    }
                });
            },
            error: function(re1) {
            }
        })
    }
    //竞彩胜平负
    function jcSpfMatch(data, fn) {
        $.ajax({
            url: TZ_CONFIG + 'slttz/preissue?method=jcMatch&lotoId=301',
            dataType: 'jsonp',
            success: function(re1) {
                var r = {};
                for(var n=0;n<re1.length;n++){
                    r[re1[n].matchNo]=re1[n]
                }
                $.ajax({
                    url: TZ_CONFIG + 'slttz/preissue?method=jcOdds&lotoId=301',
                    dataType: 'jsonp',
                    success: function(re2) {
                        if (!re1.length || !re2.length) {
                            fn && fn({
                                resultCode: '500'
                            });
                        } else {
                            var re=[];
                            for (var i = 0, len = re2.length; i < len; i++) {
                                if(r[re2[i].matchNo]){
                                    r[re2[i].matchNo].sp = re2[i].sp
                                    re.push(r[re2[i].matchNo]);
                                }
                            }
                            fn && fn(re);
                        }
                    },
                    error: function(re2) {
                    }
                });
            },
            error: function(re1) {
            }
        })
    }
    //竞彩比分
    function jcbfMatch(data, fn) {
        $.ajax({
            url: TZ_CONFIG + 'slttz/preissue?method=jcMatch&lotoId=302',
            dataType: 'jsonp',
            success: function(re1) {
                var r = {};
                for(var n=0;n<re1.length;n++){
                    r[re1[n].matchNo]=re1[n]
                }
                $.ajax({
                    url: TZ_CONFIG + 'slttz/preissue?method=jcOdds&lotoId=302',
                    dataType: 'jsonp',
                    success: function(re2) {
                        if (!re1.length || !re2.length) {
                            fn && fn({
                                resultCode: '500'
                            });
                        } else {
                            var re=[];
                            for (var i = 0, len = re2.length; i < len; i++) {
                                if(r[re2[i].matchNo]){
                                    r[re2[i].matchNo].sp = re2[i].sp
                                    re.push(r[re2[i].matchNo]);
                                }
                            }
                            fn && fn(re);
                        }
                    },
                    error: function(re2) {
                    }
                });
            },
            error: function(re1) {
            }
        })
    }
    //竞彩混合过关
    function jcHh(fn){
        $.ajax({
            url: TZ_CONFIG + 'slttz/preissue?method=jcMatch&lotoId=305',
            dataType: 'jsonp',
            success: function(re1) {
                var  re = {}
                $(re1).each(function(index,item){
                    re[item.matchNo] = item;
                });
                fn&&fn(re,getSp)
            },
            error: function(re1) {
                fn({error:true})
            }
        })



        function getSp(id,fn) {
            //胜平负赔率
            $.ajax({
                url: TZ_CONFIG + 'slttz/preissue?method=jcOdds&lotoId='+id,
                dataType: 'jsonp',
                success: function(re2) {
                    fn(re2)
                },
                error: function() {
                    fn({error:true})
                }
            })
        }
    }
    function apiTest(opt) {
        var def = {
            url: 'http://iyueyaos.duapp.com/api/food?',
            data: {
                'testApi': "testapi"
            },
            delay: 1000,
            triggerError: false,
            fnSuccess: function() {},
            fnError: function() {}
        }
        var opts = $.extend(def, opt)
        baseAjax('GET', opts.url, opts.data, function(d) {
            setTimeout(function() {
                if (opts.triggerError) opts.fnError(d)
                else opts.fnSuccess(d)
            }, opts.delay)
        }, function(d) {
            setTimeout(function() {
                opts.fnError(d)
            }, opts.delay)
        }, true)
    }
    //获取停售
    function getControl(fn){
        var dataType = "text";
        dataType = 'json';
        $.ajax({
            type: 'GET',
            cache: false,
            url: "http://api.wozhongla.com/issue/config?callback=?",
            dataType: dataType,
            success: function(re) {
                //console.log(re);
               //var rea = eval("("+re.replace(/\n|\s+/gi,"")+")");
                fn&&fn(re.sale);
            },
            error: function(re) {
            }
        })
    }

    //同时获取多个数字彩最新彩果信息
    function getNewResult(list, fn) {
        var ids = typeof(list)== "object" ? list.join(",") : list;
        var url = host + 'getNumberNewBonus.vhtml?lotId=' + ids + callback;
        $.getJSON(url, function (data) {
            if (!data.data || data.data.result !== "01001" || !data.data.numberList) return fn(false);
            var data = data.data.numberList;
            fn(data);
        })
    }

    //数字彩彩果详情查询
    function getResultList(obj, fn) {
        var lotId = obj.lotId || "001";
        var startIssue = obj.startIssue ? "&startIssue="+obj.startIssue : "";
        var endIssue = obj.endIssue ? "&endIssue="+obj.endIssue : "";
        var pageNo = obj.pageNo || 1;
        var pageNum = obj.pageNum || 30;
        var url = host + 'getBonusList.vhtml?lotId='+lotId + startIssue + endIssue +'&pageNo='+pageNo+'&pageNum=' + pageNum + callback;
        $.getJSON(url, function (data) {

            if (!data.data || data.data.result !== "01001" || !data.data.numberList) return fn(false);
            var data = data.data.numberList;
            fn(data);
        })
    }


    //数字彩彩果详情查询
    function getResultDetail(lotId,issue, fn) {
        var url = host + 'getBonus.vhtml?lotId='+lotId +'&lotIssue=' + issue + callback;
        $.getJSON(url, function (data) {
            console.log(data)
            if (!data.data || data.data.result !== "01001" || !data.data.numberList) return fn(false);
            var data = data.data.numberList[0];
            fn(data);
        })
    }


    //竞彩足球彩果查询
    function getJcResult(lotId, issue, fn) {
        var lotId = lotId || 301;
        var url = host + 'getBonusJCZQ.vhtml?lotId='+lotId+'&issueNum=' + issue + callback;
        $.getJSON(url, function (data) {
            if (!data.data || data.data.result !== "01001" || data.data.numberList) return false;
            var data = data.data.issueList;
            fn(data);
        })
    }
	//大乐透直接投注
    module.exports = {
        INF_CONFIG: INF_CONFIG,
        login: login,
        register: register,
        getCode: getCode,
        verifyCode: verifyCode,
        backPwd: backPwd,
        updatePwd: updatePwd,
        backPwdCode: backPwdCode,
        showDrawList: showDrawList,
        queyrUserAccount: queyrUserAccount,
        queryAccountRefer: queryAccountRefer,
        queryAccountRecharge: queryAccountRecharge,
        queryAccountWithDraw: queryAccountWithDraw,
        queryAccountPacket: queryAccountPacket,
        queryAccountPrize: queryAccountPrize,
        queryAccountBetting: queryAccountBetting,
        bettingOrder: bettingOrder,
        queryBankInfo: queryBankInfo,
        uchangeName: uchangeName,
        modifyId: modifyId,
        verifyMobile: verifyMobile,
        allBetting: allBetting,
        doAlipayCharge: doAlipayCharge,
        yibaoCharge:yibaoCharge,
        doMobileCharge: doMobileCharge,
        showPreproject:showPreproject,
        QrCode: QrCode,
        ssqTz: ssqTz,
        dltTz: dltTz,
        fc3dTz: fc3dTz,
        pl3Tz: pl3Tz,
        jcTz: jcTz,
        getIssue: getIssue,
        showDetail: showDetail,
        queryUserInfo: queryUserInfo,
        queryUserAllInfo:queryUserAllInfo,
        queryResult: queryResult,
        queryJczq: queryJczq,
        queryJczqIssue: queryJczqIssue,
        querySsq: querySsq,
        queryDlt: queryDlt,
        queryFc3d: queryFc3d,
        queryX115: queryX115,
        queryqxc: queryqxc,
        queryqlc: queryqlc,
		queryK3: queryK3,
        querypl3: querypl3,
        querypl5:querypl5,
        queryklsf:queryklsf,
        queryahks:queryahks,
        querydlc:querydlc,
        querysd11x5:querysd11x5,
        querygd115:querygd115,
        querysfc:querysfc,
        queryqyh:queryqyh,
        queryJxssc: queryJxssc,
        queryCqssc: queryCqssc,
        bindBank: bindBank,
        getAccept: getAccept,
        draw: draw,
        getNowIssue: getNowIssue,
        jcMatchData: jcMatchData,
        jcSpfMatch: jcSpfMatch,
        jcbfMatch: jcbfMatch,
        jcHh: jcHh,
        issue2result: issue2result,
        issue2resultAll: issue2resultAll,
        wzlindexWining: wzlindexWining,
        yl:yl,
        logout: logout,
        wzlCardCharge: wzlCardCharge,
        UNIONUSER_ID: UNIONUSER_ID,
        CHANNELID:CHANNELID,
        wzlMobileHome:wzlMobileHome,
        apiTest: apiTest,
        version:version,
        getControl:getControl,
        getNewResult: getNewResult,
        getResultDetail:getResultDetail,
        getResultList:getResultList,
        getJcResult: getJcResult,
		weixinCharge: weixinCharge,
		qqCharge: qqCharge
    }
});