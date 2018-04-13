define("moment/2.6.0/lang/lt",[],function(e,t,n){!function(r){"function"==typeof define&&define.amd?define(["moment"],r):"object"==typeof t?n.exports=r(e("moment/2.6.0/moment")):r(window.moment)}(function(e){function t(e,t,n,r){return t?"kelios sekundės":r?"kelių sekundžių":"kelias sekundes"}function n(e,t,n,r){return t?s(n)[0]:r?s(n)[1]:s(n)[2]}function r(e){return e%10===0||e>10&&20>e}function s(e){return o[e].split("_")}function a(e,t,a,i){var o=e+" ";return 1===e?o+n(e,t,a[0],i):t?o+(r(e)?s(a)[1]:s(a)[0]):i?o+s(a)[1]:o+(r(e)?s(a)[1]:s(a)[2])}function i(e,t){var n=-1===t.indexOf("dddd HH:mm"),r=u[e.weekday()];return n?r:r.substring(0,r.length-2)+"į"}var o={m:"minutė_minutės_minutę",mm:"minutės_minučių_minutes",h:"valanda_valandos_valandą",hh:"valandos_valandų_valandas",d:"diena_dienos_dieną",dd:"dienos_dienų_dienas",M:"mėnuo_mėnesio_mėnesį",MM:"mėnesiai_mėnesių_mėnesius",y:"metai_metų_metus",yy:"metai_metų_metus"},u="pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis_sekmadienis".split("_");return e.lang("lt",{months:"sausio_vasario_kovo_balandžio_gegužės_biržėlio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio".split("_"),monthsShort:"sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"),weekdays:i,weekdaysShort:"Sek_Pir_Ant_Tre_Ket_Pen_Šeš".split("_"),weekdaysMin:"S_P_A_T_K_Pn_Š".split("_"),longDateFormat:{LT:"HH:mm",L:"YYYY-MM-DD",LL:"YYYY [m.] MMMM D [d.]",LLL:"YYYY [m.] MMMM D [d.], LT [val.]",LLLL:"YYYY [m.] MMMM D [d.], dddd, LT [val.]",l:"YYYY-MM-DD",ll:"YYYY [m.] MMMM D [d.]",lll:"YYYY [m.] MMMM D [d.], LT [val.]",llll:"YYYY [m.] MMMM D [d.], ddd, LT [val.]"},calendar:{sameDay:"[Šiandien] LT",nextDay:"[Rytoj] LT",nextWeek:"dddd LT",lastDay:"[Vakar] LT",lastWeek:"[Praėjusį] dddd LT",sameElse:"L"},relativeTime:{future:"po %s",past:"prieš %s",s:t,m:n,mm:a,h:n,hh:a,d:n,dd:a,M:n,MM:a,y:n,yy:a},ordinal:function(e){return e+"-oji"},week:{dow:1,doy:4}})})}),define("moment/2.6.0/moment",[],function(e,t,n){(function(t){function r(e,t,n){switch(arguments.length){case 2:return null!=e?e:t;case 3:return null!=e?e:null!=t?t:n;default:throw new Error("Implement me")}}function s(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}}function a(e,t){function n(){ht.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+e)}var r=!0;return f(function(){return r&&(n(),r=!1),t.apply(this,arguments)},t)}function i(e,t){return function(n){return _(e.call(this,n),t)}}function o(e,t){return function(n){return this.lang().ordinal(e.call(this,n),t)}}function u(){}function d(e){S(e),f(this,e)}function c(e){var t=M(e),n=t.year||0,r=t.quarter||0,s=t.month||0,a=t.week||0,i=t.day||0,o=t.hour||0,u=t.minute||0,d=t.second||0,c=t.millisecond||0;this._milliseconds=+c+1e3*d+6e4*u+36e5*o,this._days=+i+7*a,this._months=+s+3*r+12*n,this._data={},this._bubble()}function f(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return t.hasOwnProperty("toString")&&(e.toString=t.toString),t.hasOwnProperty("valueOf")&&(e.valueOf=t.valueOf),e}function l(e){var t,n={};for(t in e)e.hasOwnProperty(t)&&St.hasOwnProperty(t)&&(n[t]=e[t]);return n}function h(e){return 0>e?Math.ceil(e):Math.floor(e)}function _(e,t,n){for(var r=""+Math.abs(e),s=e>=0;r.length<t;)r="0"+r;return(s?n?"+":"":"-")+r}function m(e,t,n,r){var s=t._milliseconds,a=t._days,i=t._months;r=null==r?!0:r,s&&e._d.setTime(+e._d+s*n),a&&ut(e,"Date",ot(e,"Date")+a*n),i&&it(e,ot(e,"Month")+i*n),r&&ht.updateOffset(e,a||i)}function y(e){return"[object Array]"===Object.prototype.toString.call(e)}function p(e){return"[object Date]"===Object.prototype.toString.call(e)||e instanceof Date}function g(e,t,n){var r,s=Math.min(e.length,t.length),a=Math.abs(e.length-t.length),i=0;for(r=0;s>r;r++)(n&&e[r]!==t[r]||!n&&D(e[r])!==D(t[r]))&&i++;return i+a}function Y(e){if(e){var t=e.toLowerCase().replace(/(.)s$/,"$1");e=nn[e]||rn[t]||t}return e}function M(e){var t,n,r={};for(n in e)e.hasOwnProperty(n)&&(t=Y(n),t&&(r[t]=e[n]));return r}function w(e){var n,r;if(0===e.indexOf("week"))n=7,r="day";else{if(0!==e.indexOf("month"))return;n=12,r="month"}ht[e]=function(s,a){var i,o,u=ht.fn._lang[e],d=[];if("number"==typeof s&&(a=s,s=t),o=function(e){var t=ht().utc().set(r,e);return u.call(ht.fn._lang,t,s||"")},null!=a)return o(a);for(i=0;n>i;i++)d.push(o(i));return d}}function D(e){var t=+e,n=0;return 0!==t&&isFinite(t)&&(n=t>=0?Math.floor(t):Math.ceil(t)),n}function k(e,t){return new Date(Date.UTC(e,t+1,0)).getUTCDate()}function v(e,t,n){return nt(ht([e,11,31+t-n]),t,n).week}function b(e){return T(e)?366:365}function T(e){return e%4===0&&e%100!==0||e%400===0}function S(e){var t;e._a&&-2===e._pf.overflow&&(t=e._a[Mt]<0||e._a[Mt]>11?Mt:e._a[wt]<1||e._a[wt]>k(e._a[Yt],e._a[Mt])?wt:e._a[Dt]<0||e._a[Dt]>23?Dt:e._a[kt]<0||e._a[kt]>59?kt:e._a[vt]<0||e._a[vt]>59?vt:e._a[bt]<0||e._a[bt]>999?bt:-1,e._pf._overflowDayOfYear&&(Yt>t||t>wt)&&(t=wt),e._pf.overflow=t)}function O(e){return null==e._isValid&&(e._isValid=!isNaN(e._d.getTime())&&e._pf.overflow<0&&!e._pf.empty&&!e._pf.invalidMonth&&!e._pf.nullInput&&!e._pf.invalidFormat&&!e._pf.userInvalidated,e._strict&&(e._isValid=e._isValid&&0===e._pf.charsLeftOver&&0===e._pf.unusedTokens.length)),e._isValid}function W(e){return e?e.toLowerCase().replace("_","-"):e}function L(e,t){return t._isUTC?ht(e).zone(t._offset||0):ht(e).local()}function G(e,t){return t.abbr=e,Tt[e]||(Tt[e]=new u),Tt[e].set(t),Tt[e]}function F(e){delete Tt[e]}function P(t){var n,r,s,a,i=0,o=function(t){if(!Tt[t]&&Ot)try{e("./lang/"+t)}catch(n){}return Tt[t]};if(!t)return ht.fn._lang;if(!y(t)){if(r=o(t))return r;t=[t]}for(;i<t.length;){for(a=W(t[i]).split("-"),n=a.length,s=W(t[i+1]),s=s?s.split("-"):null;n>0;){if(r=o(a.slice(0,n).join("-")))return r;if(s&&s.length>=n&&g(a,s,!0)>=n-1)break;n--}i++}return ht.fn._lang}function C(e){return e.match(/\[[\s\S]/)?e.replace(/^\[|\]$/g,""):e.replace(/\\/g,"")}function U(e){var t,n,r=e.match(Ft);for(t=0,n=r.length;n>t;t++)r[t]=un[r[t]]?un[r[t]]:C(r[t]);return function(s){var a="";for(t=0;n>t;t++)a+=r[t]instanceof Function?r[t].call(s,e):r[t];return a}}function z(e,t){return e.isValid()?(t=H(t,e.lang()),sn[t]||(sn[t]=U(t)),sn[t](e)):e.lang().invalidDate()}function H(e,t){function n(e){return t.longDateFormat(e)||e}var r=5;for(Pt.lastIndex=0;r>=0&&Pt.test(e);)e=e.replace(Pt,n),Pt.lastIndex=0,r-=1;return e}function x(e,t){var n,r=t._strict;switch(e){case"Q":return Nt;case"DDDD":return qt;case"YYYY":case"GGGG":case"gggg":return r?$t:zt;case"Y":case"G":case"g":return Qt;case"YYYYYY":case"YYYYY":case"GGGGG":case"ggggg":return r?Jt:Ht;case"S":if(r)return Nt;case"SS":if(r)return Vt;case"SSS":if(r)return qt;case"DDD":return Ut;case"MMM":case"MMMM":case"dd":case"ddd":case"dddd":return It;case"a":case"A":return P(t._l)._meridiemParse;case"X":return jt;case"Z":case"ZZ":return At;case"T":return Zt;case"SSSS":return xt;case"MM":case"DD":case"YY":case"GG":case"gg":case"HH":case"hh":case"mm":case"ss":case"ww":case"WW":return r?Vt:Ct;case"M":case"D":case"d":case"H":case"h":case"m":case"s":case"w":case"W":case"e":case"E":return Ct;case"Do":return Et;default:return n=new RegExp($(q(e.replace("\\","")),"i"))}}function I(e){e=e||"";var t=e.match(At)||[],n=t[t.length-1]||[],r=(n+"").match(en)||["-",0,0],s=+(60*r[1])+D(r[2]);return"+"===r[0]?-s:s}function A(e,t,n){var r,s=n._a;switch(e){case"Q":null!=t&&(s[Mt]=3*(D(t)-1));break;case"M":case"MM":null!=t&&(s[Mt]=D(t)-1);break;case"MMM":case"MMMM":r=P(n._l).monthsParse(t),null!=r?s[Mt]=r:n._pf.invalidMonth=t;break;case"D":case"DD":null!=t&&(s[wt]=D(t));break;case"Do":null!=t&&(s[wt]=D(parseInt(t,10)));break;case"DDD":case"DDDD":null!=t&&(n._dayOfYear=D(t));break;case"YY":s[Yt]=ht.parseTwoDigitYear(t);break;case"YYYY":case"YYYYY":case"YYYYYY":s[Yt]=D(t);break;case"a":case"A":n._isPm=P(n._l).isPM(t);break;case"H":case"HH":case"h":case"hh":s[Dt]=D(t);break;case"m":case"mm":s[kt]=D(t);break;case"s":case"ss":s[vt]=D(t);break;case"S":case"SS":case"SSS":case"SSSS":s[bt]=D(1e3*("0."+t));break;case"X":n._d=new Date(1e3*parseFloat(t));break;case"Z":case"ZZ":n._useUTC=!0,n._tzm=I(t);break;case"dd":case"ddd":case"dddd":r=P(n._l).weekdaysParse(t),null!=r?(n._w=n._w||{},n._w.d=r):n._pf.invalidWeekday=t;break;case"w":case"ww":case"W":case"WW":case"d":case"e":case"E":e=e.substr(0,1);case"gggg":case"GGGG":case"GGGGG":e=e.substr(0,2),t&&(n._w=n._w||{},n._w[e]=D(t));break;case"gg":case"GG":n._w=n._w||{},n._w[e]=ht.parseTwoDigitYear(t)}}function Z(e){var t,n,s,a,i,o,u,d;t=e._w,null!=t.GG||null!=t.W||null!=t.E?(i=1,o=4,n=r(t.GG,e._a[Yt],nt(ht(),1,4).year),s=r(t.W,1),a=r(t.E,1)):(d=P(e._l),i=d._week.dow,o=d._week.doy,n=r(t.gg,e._a[Yt],nt(ht(),i,o).year),s=r(t.w,1),null!=t.d?(a=t.d,i>a&&++s):a=null!=t.e?t.e+i:i),u=rt(n,s,a,o,i),e._a[Yt]=u.year,e._dayOfYear=u.dayOfYear}function j(e){var t,n,s,a,i=[];if(!e._d){for(s=N(e),e._w&&null==e._a[wt]&&null==e._a[Mt]&&Z(e),e._dayOfYear&&(a=r(e._a[Yt],s[Yt]),e._dayOfYear>b(a)&&(e._pf._overflowDayOfYear=!0),n=B(a,0,e._dayOfYear),e._a[Mt]=n.getUTCMonth(),e._a[wt]=n.getUTCDate()),t=0;3>t&&null==e._a[t];++t)e._a[t]=i[t]=s[t];for(;7>t;t++)e._a[t]=i[t]=null==e._a[t]?2===t?1:0:e._a[t];i[Dt]+=D((e._tzm||0)/60),i[kt]+=D((e._tzm||0)%60),e._d=(e._useUTC?B:X).apply(null,i)}}function E(e){var t;e._d||(t=M(e._i),e._a=[t.year,t.month,t.day,t.hour,t.minute,t.second,t.millisecond],j(e))}function N(e){var t=new Date;return e._useUTC?[t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate()]:[t.getFullYear(),t.getMonth(),t.getDate()]}function V(e){e._a=[],e._pf.empty=!0;var t,n,r,s,a,i=P(e._l),o=""+e._i,u=o.length,d=0;for(r=H(e._f,i).match(Ft)||[],t=0;t<r.length;t++)s=r[t],n=(o.match(x(s,e))||[])[0],n&&(a=o.substr(0,o.indexOf(n)),a.length>0&&e._pf.unusedInput.push(a),o=o.slice(o.indexOf(n)+n.length),d+=n.length),un[s]?(n?e._pf.empty=!1:e._pf.unusedTokens.push(s),A(s,n,e)):e._strict&&!n&&e._pf.unusedTokens.push(s);e._pf.charsLeftOver=u-d,o.length>0&&e._pf.unusedInput.push(o),e._isPm&&e._a[Dt]<12&&(e._a[Dt]+=12),e._isPm===!1&&12===e._a[Dt]&&(e._a[Dt]=0),j(e),S(e)}function q(e){return e.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(e,t,n,r,s){return t||n||r||s})}function $(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function J(e){var t,n,r,a,i;if(0===e._f.length)return e._pf.invalidFormat=!0,void(e._d=new Date(0/0));for(a=0;a<e._f.length;a++)i=0,t=f({},e),t._pf=s(),t._f=e._f[a],V(t),O(t)&&(i+=t._pf.charsLeftOver,i+=10*t._pf.unusedTokens.length,t._pf.score=i,(null==r||r>i)&&(r=i,n=t));f(e,n||t)}function Q(e){var t,n,r=e._i,s=Rt.exec(r);if(s){for(e._pf.iso=!0,t=0,n=Bt.length;n>t;t++)if(Bt[t][1].exec(r)){e._f=Bt[t][0]+(s[6]||" ");break}for(t=0,n=Kt.length;n>t;t++)if(Kt[t][1].exec(r)){e._f+=Kt[t][0];break}r.match(At)&&(e._f+="Z"),V(e)}else ht.createFromInputFallback(e)}function R(e){var n=e._i,r=Wt.exec(n);n===t?e._d=new Date:r?e._d=new Date(+r[1]):"string"==typeof n?Q(e):y(n)?(e._a=n.slice(0),j(e)):p(n)?e._d=new Date(+n):"object"==typeof n?E(e):"number"==typeof n?e._d=new Date(n):ht.createFromInputFallback(e)}function X(e,t,n,r,s,a,i){var o=new Date(e,t,n,r,s,a,i);return 1970>e&&o.setFullYear(e),o}function B(e){var t=new Date(Date.UTC.apply(null,arguments));return 1970>e&&t.setUTCFullYear(e),t}function K(e,t){if("string"==typeof e)if(isNaN(e)){if(e=t.weekdaysParse(e),"number"!=typeof e)return null}else e=parseInt(e,10);return e}function et(e,t,n,r,s){return s.relativeTime(t||1,!!n,e,r)}function tt(e,t,n){var r=gt(Math.abs(e)/1e3),s=gt(r/60),a=gt(s/60),i=gt(a/24),o=gt(i/365),u=45>r&&["s",r]||1===s&&["m"]||45>s&&["mm",s]||1===a&&["h"]||22>a&&["hh",a]||1===i&&["d"]||25>=i&&["dd",i]||45>=i&&["M"]||345>i&&["MM",gt(i/30)]||1===o&&["y"]||["yy",o];return u[2]=t,u[3]=e>0,u[4]=n,et.apply({},u)}function nt(e,t,n){var r,s=n-t,a=n-e.day();return a>s&&(a-=7),s-7>a&&(a+=7),r=ht(e).add("d",a),{week:Math.ceil(r.dayOfYear()/7),year:r.year()}}function rt(e,t,n,r,s){var a,i,o=B(e,0,1).getUTCDay();return o=0===o?7:o,n=null!=n?n:s,a=s-o+(o>r?7:0)-(s>o?7:0),i=7*(t-1)+(n-s)+a+1,{year:i>0?e:e-1,dayOfYear:i>0?i:b(e-1)+i}}function st(e){var n=e._i,r=e._f;return null===n||r===t&&""===n?ht.invalid({nullInput:!0}):("string"==typeof n&&(e._i=n=P().preparse(n)),ht.isMoment(n)?(e=l(n),e._d=new Date(+n._d)):r?y(r)?J(e):V(e):R(e),new d(e))}function at(e,t){var n,r;if(1===t.length&&y(t[0])&&(t=t[0]),!t.length)return ht();for(n=t[0],r=1;r<t.length;++r)t[r][e](n)&&(n=t[r]);return n}function it(e,t){var n;return"string"==typeof t&&(t=e.lang().monthsParse(t),"number"!=typeof t)?e:(n=Math.min(e.date(),k(e.year(),t)),e._d["set"+(e._isUTC?"UTC":"")+"Month"](t,n),e)}function ot(e,t){return e._d["get"+(e._isUTC?"UTC":"")+t]()}function ut(e,t,n){return"Month"===t?it(e,n):e._d["set"+(e._isUTC?"UTC":"")+t](n)}function dt(e,t){return function(n){return null!=n?(ut(this,e,n),ht.updateOffset(this,t),this):ot(this,e)}}function ct(e){ht.duration.fn[e]=function(){return this._data[e]}}function ft(e,t){ht.duration.fn["as"+e]=function(){return+this/t}}function lt(e){"undefined"==typeof ender&&(_t=pt.moment,pt.moment=e?a("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.",ht):ht)}for(var ht,_t,mt,yt="2.6.0",pt="undefined"!=typeof global?global:this,gt=Math.round,Yt=0,Mt=1,wt=2,Dt=3,kt=4,vt=5,bt=6,Tt={},St={_isAMomentObject:null,_i:null,_f:null,_l:null,_strict:null,_isUTC:null,_offset:null,_pf:null,_lang:null},Ot="undefined"!=typeof n&&n.exports,Wt=/^\/?Date\((\-?\d+)/i,Lt=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,Gt=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,Ft=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g,Pt=/(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,Ct=/\d\d?/,Ut=/\d{1,3}/,zt=/\d{1,4}/,Ht=/[+\-]?\d{1,6}/,xt=/\d+/,It=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,At=/Z|[\+\-]\d\d:?\d\d/gi,Zt=/T/i,jt=/[\+\-]?\d+(\.\d{1,3})?/,Et=/\d{1,2}/,Nt=/\d/,Vt=/\d\d/,qt=/\d{3}/,$t=/\d{4}/,Jt=/[+-]?\d{6}/,Qt=/[+-]?\d+/,Rt=/^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,Xt="YYYY-MM-DDTHH:mm:ssZ",Bt=[["YYYYYY-MM-DD",/[+-]\d{6}-\d{2}-\d{2}/],["YYYY-MM-DD",/\d{4}-\d{2}-\d{2}/],["GGGG-[W]WW-E",/\d{4}-W\d{2}-\d/],["GGGG-[W]WW",/\d{4}-W\d{2}/],["YYYY-DDD",/\d{4}-\d{3}/]],Kt=[["HH:mm:ss.SSSS",/(T| )\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],en=/([\+\-]|\d\d)/gi,tn=("Date|Hours|Minutes|Seconds|Milliseconds".split("|"),{Milliseconds:1,Seconds:1e3,Minutes:6e4,Hours:36e5,Days:864e5,Months:2592e6,Years:31536e6}),nn={ms:"millisecond",s:"second",m:"minute",h:"hour",d:"day",D:"date",w:"week",W:"isoWeek",M:"month",Q:"quarter",y:"year",DDD:"dayOfYear",e:"weekday",E:"isoWeekday",gg:"weekYear",GG:"isoWeekYear"},rn={dayofyear:"dayOfYear",isoweekday:"isoWeekday",isoweek:"isoWeek",weekyear:"weekYear",isoweekyear:"isoWeekYear"},sn={},an="DDD w W M D d".split(" "),on="M D H h m s w W".split(" "),un={M:function(){return this.month()+1},MMM:function(e){return this.lang().monthsShort(this,e)},MMMM:function(e){return this.lang().months(this,e)},D:function(){return this.date()},DDD:function(){return this.dayOfYear()},d:function(){return this.day()},dd:function(e){return this.lang().weekdaysMin(this,e)},ddd:function(e){return this.lang().weekdaysShort(this,e)},dddd:function(e){return this.lang().weekdays(this,e)},w:function(){return this.week()},W:function(){return this.isoWeek()},YY:function(){return _(this.year()%100,2)},YYYY:function(){return _(this.year(),4)},YYYYY:function(){return _(this.year(),5)},YYYYYY:function(){var e=this.year(),t=e>=0?"+":"-";return t+_(Math.abs(e),6)},gg:function(){return _(this.weekYear()%100,2)},gggg:function(){return _(this.weekYear(),4)},ggggg:function(){return _(this.weekYear(),5)},GG:function(){return _(this.isoWeekYear()%100,2)},GGGG:function(){return _(this.isoWeekYear(),4)},GGGGG:function(){return _(this.isoWeekYear(),5)},e:function(){return this.weekday()},E:function(){return this.isoWeekday()},a:function(){return this.lang().meridiem(this.hours(),this.minutes(),!0)},A:function(){return this.lang().meridiem(this.hours(),this.minutes(),!1)},H:function(){return this.hours()},h:function(){return this.hours()%12||12},m:function(){return this.minutes()},s:function(){return this.seconds()},S:function(){return D(this.milliseconds()/100)},SS:function(){return _(D(this.milliseconds()/10),2)},SSS:function(){return _(this.milliseconds(),3)},SSSS:function(){return _(this.milliseconds(),3)},Z:function(){var e=-this.zone(),t="+";return 0>e&&(e=-e,t="-"),t+_(D(e/60),2)+":"+_(D(e)%60,2)},ZZ:function(){var e=-this.zone(),t="+";return 0>e&&(e=-e,t="-"),t+_(D(e/60),2)+_(D(e)%60,2)},z:function(){return this.zoneAbbr()},zz:function(){return this.zoneName()},X:function(){return this.unix()},Q:function(){return this.quarter()}},dn=["months","monthsShort","weekdays","weekdaysShort","weekdaysMin"];an.length;)mt=an.pop(),un[mt+"o"]=o(un[mt],mt);for(;on.length;)mt=on.pop(),un[mt+mt]=i(un[mt],2);for(un.DDDD=i(un.DDD,3),f(u.prototype,{set:function(e){var t,n;for(n in e)t=e[n],"function"==typeof t?this[n]=t:this["_"+n]=t},_months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),months:function(e){return this._months[e.month()]},_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),monthsShort:function(e){return this._monthsShort[e.month()]},monthsParse:function(e){var t,n,r;for(this._monthsParse||(this._monthsParse=[]),t=0;12>t;t++)if(this._monthsParse[t]||(n=ht.utc([2e3,t]),r="^"+this.months(n,"")+"|^"+this.monthsShort(n,""),this._monthsParse[t]=new RegExp(r.replace(".",""),"i")),this._monthsParse[t].test(e))return t},_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdays:function(e){return this._weekdays[e.day()]},_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysShort:function(e){return this._weekdaysShort[e.day()]},_weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),weekdaysMin:function(e){return this._weekdaysMin[e.day()]},weekdaysParse:function(e){var t,n,r;for(this._weekdaysParse||(this._weekdaysParse=[]),t=0;7>t;t++)if(this._weekdaysParse[t]||(n=ht([2e3,1]).day(t),r="^"+this.weekdays(n,"")+"|^"+this.weekdaysShort(n,"")+"|^"+this.weekdaysMin(n,""),this._weekdaysParse[t]=new RegExp(r.replace(".",""),"i")),this._weekdaysParse[t].test(e))return t},_longDateFormat:{LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D YYYY",LLL:"MMMM D YYYY LT",LLLL:"dddd, MMMM D YYYY LT"},longDateFormat:function(e){var t=this._longDateFormat[e];return!t&&this._longDateFormat[e.toUpperCase()]&&(t=this._longDateFormat[e.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,function(e){return e.slice(1)}),this._longDateFormat[e]=t),t},isPM:function(e){return"p"===(e+"").toLowerCase().charAt(0)},_meridiemParse:/[ap]\.?m?\.?/i,meridiem:function(e,t,n){return e>11?n?"pm":"PM":n?"am":"AM"},_calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},calendar:function(e,t){var n=this._calendar[e];return"function"==typeof n?n.apply(t):n},_relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},relativeTime:function(e,t,n,r){var s=this._relativeTime[n];return"function"==typeof s?s(e,t,n,r):s.replace(/%d/i,e)},pastFuture:function(e,t){var n=this._relativeTime[e>0?"future":"past"];return"function"==typeof n?n(t):n.replace(/%s/i,t)},ordinal:function(e){return this._ordinal.replace("%d",e)},_ordinal:"%d",preparse:function(e){return e},postformat:function(e){return e},week:function(e){return nt(e,this._week.dow,this._week.doy).week},_week:{dow:0,doy:6},_invalidDate:"Invalid date",invalidDate:function(){return this._invalidDate}}),ht=function(e,n,r,a){var i;return"boolean"==typeof r&&(a=r,r=t),i={},i._isAMomentObject=!0,i._i=e,i._f=n,i._l=r,i._strict=a,i._isUTC=!1,i._pf=s(),st(i)},ht.suppressDeprecationWarnings=!1,ht.createFromInputFallback=a("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(e){e._d=new Date(e._i)}),ht.min=function(){var e=[].slice.call(arguments,0);return at("isBefore",e)},ht.max=function(){var e=[].slice.call(arguments,0);return at("isAfter",e)},ht.utc=function(e,n,r,a){var i;return"boolean"==typeof r&&(a=r,r=t),i={},i._isAMomentObject=!0,i._useUTC=!0,i._isUTC=!0,i._l=r,i._i=e,i._f=n,i._strict=a,i._pf=s(),st(i).utc()},ht.unix=function(e){return ht(1e3*e)},ht.duration=function(e,t){var n,r,s,a=e,i=null;return ht.isDuration(e)?a={ms:e._milliseconds,d:e._days,M:e._months}:"number"==typeof e?(a={},t?a[t]=e:a.milliseconds=e):(i=Lt.exec(e))?(n="-"===i[1]?-1:1,a={y:0,d:D(i[wt])*n,h:D(i[Dt])*n,m:D(i[kt])*n,s:D(i[vt])*n,ms:D(i[bt])*n}):(i=Gt.exec(e))&&(n="-"===i[1]?-1:1,s=function(e){var t=e&&parseFloat(e.replace(",","."));return(isNaN(t)?0:t)*n},a={y:s(i[2]),M:s(i[3]),d:s(i[4]),h:s(i[5]),m:s(i[6]),s:s(i[7]),w:s(i[8])}),r=new c(a),ht.isDuration(e)&&e.hasOwnProperty("_lang")&&(r._lang=e._lang),r},ht.version=yt,ht.defaultFormat=Xt,ht.momentProperties=St,ht.updateOffset=function(){},ht.lang=function(e,t){var n;return e?(t?G(W(e),t):null===t?(F(e),e="en"):Tt[e]||P(e),n=ht.duration.fn._lang=ht.fn._lang=P(e),n._abbr):ht.fn._lang._abbr},ht.langData=function(e){return e&&e._lang&&e._lang._abbr&&(e=e._lang._abbr),P(e)},ht.isMoment=function(e){return e instanceof d||null!=e&&e.hasOwnProperty("_isAMomentObject")},ht.isDuration=function(e){return e instanceof c},mt=dn.length-1;mt>=0;--mt)w(dn[mt]);ht.normalizeUnits=function(e){return Y(e)},ht.invalid=function(e){var t=ht.utc(0/0);return null!=e?f(t._pf,e):t._pf.userInvalidated=!0,t},ht.parseZone=function(){return ht.apply(null,arguments).parseZone()},ht.parseTwoDigitYear=function(e){return D(e)+(D(e)>68?1900:2e3)},f(ht.fn=d.prototype,{clone:function(){return ht(this)},valueOf:function(){return+this._d+6e4*(this._offset||0)},unix:function(){return Math.floor(+this/1e3)},toString:function(){return this.clone().lang("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},toDate:function(){return this._offset?new Date(+this):this._d},toISOString:function(){var e=ht(this).utc();return 0<e.year()&&e.year()<=9999?z(e,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):z(e,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")},toArray:function(){var e=this;return[e.year(),e.month(),e.date(),e.hours(),e.minutes(),e.seconds(),e.milliseconds()]},isValid:function(){return O(this)},isDSTShifted:function(){return this._a?this.isValid()&&g(this._a,(this._isUTC?ht.utc(this._a):ht(this._a)).toArray())>0:!1},parsingFlags:function(){return f({},this._pf)},invalidAt:function(){return this._pf.overflow},utc:function(){return this.zone(0)},local:function(){return this.zone(0),this._isUTC=!1,this},format:function(e){var t=z(this,e||ht.defaultFormat);return this.lang().postformat(t)},add:function(e,t){var n;return n="string"==typeof e?ht.duration(+t,e):ht.duration(e,t),m(this,n,1),this},subtract:function(e,t){var n;return n="string"==typeof e?ht.duration(+t,e):ht.duration(e,t),m(this,n,-1),this},diff:function(e,t,n){var r,s,a=L(e,this),i=6e4*(this.zone()-a.zone());return t=Y(t),"year"===t||"month"===t?(r=432e5*(this.daysInMonth()+a.daysInMonth()),s=12*(this.year()-a.year())+(this.month()-a.month()),s+=(this-ht(this).startOf("month")-(a-ht(a).startOf("month")))/r,s-=6e4*(this.zone()-ht(this).startOf("month").zone()-(a.zone()-ht(a).startOf("month").zone()))/r,"year"===t&&(s/=12)):(r=this-a,s="second"===t?r/1e3:"minute"===t?r/6e4:"hour"===t?r/36e5:"day"===t?(r-i)/864e5:"week"===t?(r-i)/6048e5:r),n?s:h(s)},from:function(e,t){return ht.duration(this.diff(e)).lang(this.lang()._abbr).humanize(!t)},fromNow:function(e){return this.from(ht(),e)},calendar:function(){var e=L(ht(),this).startOf("day"),t=this.diff(e,"days",!0),n=-6>t?"sameElse":-1>t?"lastWeek":0>t?"lastDay":1>t?"sameDay":2>t?"nextDay":7>t?"nextWeek":"sameElse";return this.format(this.lang().calendar(n,this))},isLeapYear:function(){return T(this.year())},isDST:function(){return this.zone()<this.clone().month(0).zone()||this.zone()<this.clone().month(5).zone()},day:function(e){var t=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=e?(e=K(e,this.lang()),this.add({d:e-t})):t},month:dt("Month",!0),startOf:function(e){switch(e=Y(e)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===e?this.weekday(0):"isoWeek"===e&&this.isoWeekday(1),"quarter"===e&&this.month(3*Math.floor(this.month()/3)),this},endOf:function(e){return e=Y(e),this.startOf(e).add("isoWeek"===e?"week":e,1).subtract("ms",1)},isAfter:function(e,t){return t="undefined"!=typeof t?t:"millisecond",+this.clone().startOf(t)>+ht(e).startOf(t)},isBefore:function(e,t){return t="undefined"!=typeof t?t:"millisecond",+this.clone().startOf(t)<+ht(e).startOf(t)},isSame:function(e,t){return t=t||"ms",+this.clone().startOf(t)===+L(e,this).startOf(t)},min:a("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",function(e){return e=ht.apply(null,arguments),this>e?this:e}),max:a("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",function(e){return e=ht.apply(null,arguments),e>this?this:e}),zone:function(e,t){var n=this._offset||0;return null==e?this._isUTC?n:this._d.getTimezoneOffset():("string"==typeof e&&(e=I(e)),Math.abs(e)<16&&(e=60*e),this._offset=e,this._isUTC=!0,n!==e&&(!t||this._changeInProgress?m(this,ht.duration(n-e,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,ht.updateOffset(this,!0),this._changeInProgress=null)),this)},zoneAbbr:function(){return this._isUTC?"UTC":""},zoneName:function(){return this._isUTC?"Coordinated Universal Time":""},parseZone:function(){return this._tzm?this.zone(this._tzm):"string"==typeof this._i&&this.zone(this._i),this},hasAlignedHourOffset:function(e){return e=e?ht(e).zone():0,(this.zone()-e)%60===0},daysInMonth:function(){return k(this.year(),this.month())},dayOfYear:function(e){var t=gt((ht(this).startOf("day")-ht(this).startOf("year"))/864e5)+1;return null==e?t:this.add("d",e-t)},quarter:function(e){return null==e?Math.ceil((this.month()+1)/3):this.month(3*(e-1)+this.month()%3)},weekYear:function(e){var t=nt(this,this.lang()._week.dow,this.lang()._week.doy).year;return null==e?t:this.add("y",e-t)},isoWeekYear:function(e){var t=nt(this,1,4).year;return null==e?t:this.add("y",e-t)},week:function(e){var t=this.lang().week(this);return null==e?t:this.add("d",7*(e-t))},isoWeek:function(e){var t=nt(this,1,4).week;return null==e?t:this.add("d",7*(e-t))},weekday:function(e){var t=(this.day()+7-this.lang()._week.dow)%7;return null==e?t:this.add("d",e-t)},isoWeekday:function(e){return null==e?this.day()||7:this.day(this.day()%7?e:e-7)},isoWeeksInYear:function(){return v(this.year(),1,4)},weeksInYear:function(){var e=this._lang._week;return v(this.year(),e.dow,e.doy)},get:function(e){return e=Y(e),this[e]()},set:function(e,t){return e=Y(e),"function"==typeof this[e]&&this[e](t),this},lang:function(e){return e===t?this._lang:(this._lang=P(e),this)}}),ht.fn.millisecond=ht.fn.milliseconds=dt("Milliseconds",!1),ht.fn.second=ht.fn.seconds=dt("Seconds",!1),ht.fn.minute=ht.fn.minutes=dt("Minutes",!1),ht.fn.hour=ht.fn.hours=dt("Hours",!0),ht.fn.date=dt("Date",!0),ht.fn.dates=a("dates accessor is deprecated. Use date instead.",dt("Date",!0)),ht.fn.year=dt("FullYear",!0),ht.fn.years=a("years accessor is deprecated. Use year instead.",dt("FullYear",!0)),ht.fn.days=ht.fn.day,ht.fn.months=ht.fn.month,ht.fn.weeks=ht.fn.week,ht.fn.isoWeeks=ht.fn.isoWeek,ht.fn.quarters=ht.fn.quarter,ht.fn.toJSON=ht.fn.toISOString,f(ht.duration.fn=c.prototype,{_bubble:function(){var e,t,n,r,s=this._milliseconds,a=this._days,i=this._months,o=this._data;o.milliseconds=s%1e3,e=h(s/1e3),o.seconds=e%60,t=h(e/60),o.minutes=t%60,n=h(t/60),o.hours=n%24,a+=h(n/24),o.days=a%30,i+=h(a/30),o.months=i%12,r=h(i/12),o.years=r},weeks:function(){return h(this.days()/7)},valueOf:function(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*D(this._months/12)},humanize:function(e){var t=+this,n=tt(t,!e,this.lang());return e&&(n=this.lang().pastFuture(t,n)),this.lang().postformat(n)},add:function(e,t){var n=ht.duration(e,t);return this._milliseconds+=n._milliseconds,this._days+=n._days,this._months+=n._months,this._bubble(),this},subtract:function(e,t){var n=ht.duration(e,t);return this._milliseconds-=n._milliseconds,this._days-=n._days,this._months-=n._months,this._bubble(),this},get:function(e){return e=Y(e),this[e.toLowerCase()+"s"]()},as:function(e){return e=Y(e),this["as"+e.charAt(0).toUpperCase()+e.slice(1)+"s"]()},lang:ht.fn.lang,toIsoString:function(){var e=Math.abs(this.years()),t=Math.abs(this.months()),n=Math.abs(this.days()),r=Math.abs(this.hours()),s=Math.abs(this.minutes()),a=Math.abs(this.seconds()+this.milliseconds()/1e3);return this.asSeconds()?(this.asSeconds()<0?"-":"")+"P"+(e?e+"Y":"")+(t?t+"M":"")+(n?n+"D":"")+(r||s||a?"T":"")+(r?r+"H":"")+(s?s+"M":"")+(a?a+"S":""):"P0D"}});for(mt in tn)tn.hasOwnProperty(mt)&&(ft(mt,tn[mt]),ct(mt.toLowerCase()));ft("Weeks",6048e5),ht.duration.fn.asMonths=function(){return(+this-31536e6*this.years())/2592e6+12*this.years()},ht.lang("en",{ordinal:function(e){var t=e%10,n=1===D(e%100/10)?"th":1===t?"st":2===t?"nd":3===t?"rd":"th";return e+n}}),Ot?n.exports=ht:"function"==typeof define&&define.amd?(define("moment",function(e,t,n){return n.config&&n.config()&&n.config().noGlobal===!0&&(pt.moment=_t),ht}),lt(!0)):lt()}).call(this)});