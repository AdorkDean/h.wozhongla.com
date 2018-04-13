define(function (require, exports, module) {
    var ls = window.localStorage;
    //get缓存
    function get(key, expire){
        var expire = expire || 1000 * 60;
        //console.log(key);
        var data = ls[key];
        //console.log(data);
        if (!data) return null;
        var lsTime = ls[key+'-time'];
        var nowTime = new Date().getTime();
//      if (nowTime - lsTime > expire){
//          remove(key);
//          return null;
//      }
        return data;
    }

    //写入缓存
    function set(key, val){
        ls[key] = val;
        ls[key+'-time'] = new Date().getTime();
    }

    //删除缓存
    function remove(key){
        ls.removeItem(key);
        ls.removeItem(key+'-time');
    }

    //清空缓存
    function clear(){
        ls.clear()
    }

    return {
        get: get,
        set:set,
	    remove:remove
     	clear:clear
    }
})

