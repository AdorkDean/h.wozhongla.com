define("wzlh5/kj/about", ["wzlh5/kj/iscroll-5.1.3"], function (require, exports, module) {
     require("wzlh5/kj/iscroll-5.1.3");
    function init() {
        new IScroll('#wrapper');
    }
    return {
        init: init
    }

});