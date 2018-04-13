
/* 连线类  --------------------------------------------------------------------*/
JoinLine=function(color,size){
    this.color=color||"#000000";
    this.size=size||1;
    this.lines=[];
    this.tmpDom=null;
    this.visible=true;

    var cenbox=document.getElementById('container');//for center div
    this.box=document.body;
    if(cenbox){//兼容居中div
        this.wrap=cenbox.getElementsByTagName('DIV')[0];
        if(this.wrap){
            this.box=this.wrap
            this.wrap.style.position='relative';
        }
    };
};
JoinLine.prototype={
    show:function(yes){
        for(var i=0;i<this.lines.length;i++)
            this.lines[i].style.visibility=yes?"visible":"hidden";
    },
    remove:function(){
        for(var i=0;i<this.lines.length;i++)
            this.lines[i].parentNode.removeChild(this.lines[i]);
        this.lines=[];
    },
    join:function(objArray,hide,fn){
        this.remove();
        this.visible=hide?"visible":"hidden";
        this.tmpDom=document.createDocumentFragment();
        for(var i=0;i<objArray.length-1;i++){
            var a=this.pos(objArray[i]);
            var b=this.pos(objArray[i+1]);
            /* 通过比对两个值来决策绘制与否 */
            if(fn&&fn(a,b)===false)continue;
            if(document.all){
                this.IELine(a.x,a.y,b.x,b.y)

            }else{
                this.FFLine(a.x,a.y,b.x,b.y)
            };
        };
        this.box.appendChild(this.tmpDom);
    },
    pos:function(obj){
        if(obj.nodeType==undefined)return obj;// input {x:x,y:y} return;
        var pos={x:0,y:0},a=obj;
        for(;a;a=a.offsetParent){pos.x+=a.offsetLeft;pos.y+=a.offsetTop;if(this.wrap&&a.offsetParent===this.wrap)break};// 兼容居中div
        pos.x+=parseInt(obj.offsetWidth/2);
        pos.y+=parseInt(obj.offsetHeight/2);
        return pos;
    },
    _oldDot:function (x,y,color,size){
        var dot=document.createElement("DIV");
        dot.style.cssText="position: absolute; left: "+x+"px; top: "+y+"px;background: "+color+";width:"+size+"px;height:"+size+"px;font-size:1px;overflow:hidden";
        dot.style.visibility=this.visible;
        this.lines.push(this.tmpDom.appendChild(dot));
    },
    _oldLine:function(x1,y1,x2,y2){
        var r=Math.floor(Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)));
        var theta=Math.atan((x2-x1)/(y2-y1));
        if(((y2-y1)<0&&(x2-x1)>0)||((y2-y1)<0&&(x2-x1)<0))	theta=Math.PI+theta;
        var dx=Math.sin(theta),dy=Math.cos(theta),i=0;
        do{this.FFDot(x1+i*dx,y1+i*dy,this.color,this.size)}while(i++<r);
    },
    FFLine:function(x1,y1,x2,y2){
        if(Math.abs(y1-y2)<(JoinLine.indent*2)&&x1==x2)return;//自动确定同列的是否连线
        var np=this.nPos(x1,y1,x2,y2,JoinLine.indent);//两端缩减函数（防止覆盖球）
        x1=np[0];y1=np[1];x2=np[2];	y2=np[3];
        var cvs=document.createElement("canvas");
        cvs.style.position="absolute";
        cvs.style.visibility=this.visible;
        cvs.width=Math.abs(x1-x2)||this.size;
        cvs.height=Math.abs(y1-y2)||this.size;
        var newY=Math.min(y1,y2);
        var newX=Math.min(x1,x2);
        cvs.style.top=newY+"px";
        cvs.style.left=newX+"px";
        var FG=cvs.getContext("2d");
        FG.save();//缓存历史设置
        FG.strokeStyle=this.color;
        FG.lineWidth=this.size;
        //FG.globalAlpha=0.5;//透明度；
        FG.beginPath();
        FG.moveTo(x1-newX,y1-newY);
        FG.lineTo(x2-newX,y2-newY);
        FG.closePath();
        FG.stroke();
        FG.restore();//恢复历史设置
        this.lines.push(cvs);
        this.tmpDom.appendChild(cvs);
    },
    IELine:function(x1,y1,x2,y2){
        if(Math.abs(y1-y2)<(JoinLine.indent*2)&&x1==x2)return;//自动确定同列的是否连线
        var np=this.nPos(x1,y1,x2,y2,JoinLine.indent);//两端缩减函数（防止覆盖球）
        x1=np[0];y1=np[1];x2=np[2];	y2=np[3];
        var line = document .createElement( "<esun:line></esun:line>" );
        line.from=x1+","+y1;
        line.to=x2+","+y2;
        line.strokeColor=this.color;
        line.strokeWeight=this.size+"px";
        line.style.cssText="position:absolute;z-index:999;top:0;left:0";
        line.style.visibility=this.visible;
        line.coordOrigin="0,0";
        this.lines.push(line);
        this.tmpDom.appendChild(line);
    },
    nPos:function(x1, y1, x2, y2, r){
        var a = x1 - x2, b = y1 - y2;
        var c = Math.round(Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)));
        var x3, y3, x4, y4;
        var _a = Math.round((a * r)/c);
        var _b = Math.round((b * r)/c);
        return [x2 + _a, y2 + _b, x1 - _a, y1 - _b];
    }
};

JoinLine.indent=8;

/* 过滤搜索连线操纵类 --------------------------------------------------------------------*/
LG=function(table,_x,_y,width,margin_bottom,fn_check){
    var rect={x:_x||0,y:_y||0,w:width||0,oh:margin_bottom||0};
    var trs=document.getElementById(table).rows;
    var row_start=rect.y<0?(trs.length+rect.y):rect.y;
    var row_end=trs.length-rect.oh;
    var col_start=rect.x<0?(trs[row_start].cells.length+rect.x):rect.x;
    var col_end=col_start+rect.w;
    if(col_end>trs[row_start].cells.length)col_end=trs[row_start].cells.length;
    if(rect.w==0)col_end=trs[row_start].cells.length;
    this.g=[];
    //alert([row_start,row_end,col_start,col_end])
    for(var i=row_start;i<row_end;i++){/* each and grouping */
            var tr=trs[i].cells;
            for(var j=col_start;j<col_end;j++){
            var td=tr[j];
            /* 检测器返回绝对真时，单元格才被添加到组 */
            if(td){
                if(fn_check(td,j,i)===true)this.g.push(td);
            }
        };
    };
    if(LG.autoDraw)this.draw();
};
LG.color='#E4A8A8';
LG.size=2;
LG.autoDraw=true;/* 默认自动绘线 */
LG.isShow=true;
LG.filter=function(){};
LG.prototype={
    draw:function(color,size,fn){
        this.line=new JoinLine(color||LG.color,size||LG.size);
        if(!fn)fn=LG.filter;
        this.line.join(this.g,LG.isShow,fn);
    },
    clear:function(){
        this.line.remove();
    },
    show:function(yes){this.line.show(yes)}
}

/* 批量绘线对象 -----------------------------------------------------------------------------------
 设置表格；
 设置开关；
 设置检测函数；
 添加块；x坐标从0开始
 显示；
 修改模式；
 添加；
 再显示；
 error:如果检测函数第一次显示无效，第二次会被覆盖掉
 */
oZXZ={
    vg:[],
    lg:[],
    _vg:[],
    _lg:[],
    table:false,
    check:function(td){
        return /^(B_|D_|cbg)/i.test(td.className);
    },
    on_off:true,
    _on:true,/* 开关反作用 */
    novl:false,/* 忽略垂直线 */
    bind:function(tid,_on_off){
        this.table=tid;
        this.on_off=_on_off;
        return this;
    },
    color:function(c){
        LG.color=c;
        return this;
    },
    newCheck:function(fn){
        this.check=fn;
        return this;
    },
    draw:function(yes){
        if(!this.table)return;
        if(yes){
            var qL=this.vg.length;
            for(var i=0;i<qL;i++){
                var it=this.vg[i];
                LG.color=it.color;
                JoinLine.indent=it.indent;
                this.novl=it.novl;
                if(this.novl)LG.filter=function(a,b){return !(a.x==b.x)};
                this.lg.push(new LG(this.table,it[0],it[1],it[2],it[3],this.check));
            }
        }
        if(this.on_off){
            var _this=this;
            $$=document.getElementById(this.on_off);
            if($$)$$.onclick=function(){
                var yes=_this._on?this.checked:!this.checked;
                _this.show(yes);
            };
        }
        /* 转移与清空历史记录，等待下一次添加 */
        this._vg=this._vg.concat(this.vg);
        this.vg=[];
        this._lg=this._lg.concat(this.lg);
        this.lg=[];
        //alert(this._vg.length)
        return this;
    },
    show:function(yes){
        /* 如果没有线则重绘一次 */
        if(this._lg.length==0)this.redraw();
        var qL=this._lg.length;
        for(var i=0;i<qL;i++){this._lg[i].show(yes)};
    },
    /*
     x,y,w,-bottom
     */
    add:function(x,y,w,mb){//把每一块封成组加上属性
        this.vg.push([x,y,w,mb]);
        /* 记录本组缩进与颜色 */
        this.vg[this.vg.length-1].color=LG.color;
        this.vg[this.vg.length-1].indent=JoinLine.indent;
        this.vg[this.vg.length-1].novl=this.novl;
        return this;
    },
    clear:function(){
        for(var i=0;i<this._lg.length;i++)
            this._lg[i].clear();
        return this;
    },
    redraw:function(){
        this.clear();
        this.vg=this.vg.concat(this._vg);
        this._vg=[];
        this.draw(true);
    },
    newCheck:function(fn){
        this.check=fn;
        return this;
    },
    setvl:function(v){
        this.novl=v;
        return this;
    },
    indent:function(v){
        JoinLine.indent=v;
        return this;
    }
}

/* 遗漏组对象 -----------------------------------------------------------------------------------*/
oYL={
    oSG:[],
    table:false,
    check:function(td,x,y){
        if(td&&td.className.indexOf("M_")!=-1){
            this.gYL.push(td);
            td._bgColor=ESUNChart.CSS(td,"backgroundColor");
            if(td._bgColor=="transparent")td._bgColor="#F3F2F2";
            td._color=ESUNChart.CSS(td,"color");
            td.value=td.innerHTML;
        }
        return false;
    },
    on_off:false,
    bind:function(tid,_on_off){
        this.table=tid;
        this.on_off=_on_off;
        return this;
    },
    newCheck:function(fn){
        this.check=fn;
        return this;
    },
    add:function(x,y,w,mb){
        this.oSG.push(new SG(this.table,x,y,w,mb,this.check));
        /* 闭包以维持多次添加遗漏区 */
        (function(kg,sg){
            document.getElementById(kg).onclick=function(){
                for(var i=0;i<sg.length;i++)
                    sg[i].show("gYL",this.checked);
            }})(this.on_off,this.oSG);
        return this;
    }
};

/* 预选组对象 -----------------------------------------------------------------------------------*/
/*
 oPV.bind("chartsTable")//锁定目标
 .newCSS('B_4')	//插入新样式
 .add(3,-11,19,6,0)//(x,y,width,bottom,offsetValue)
 .setMap([])//把自然数列翻译为数组内容,内容为空时清除原有字典
 //如果一个区域有多个样式，建议划分成多区域，即样式优先划分。
 */
oPV={
    oSG:false,
    table:false,
    offset:0,
    map:[],
    balls:[],
    css:"B_1",
    getCode:function(codeSplitPos){
        var code=[];
        for(var i=0;i<this.balls.length;++i){
            var row=this.balls[i],tmp=[];
            if(row){
                for(var j=0;j<row.length;++j){
                    var isBoll=row[j]&&/ball/i.test(row[j].className);
                    tmp.push(isBoll?row[j].number:'_')
                };
            }
            if(tmp.length)code.push(tmp);
        };
        return code;//2d array
    },
    clear:function(){
        for(var i=0;i<this.balls.length;++i){
            var row=this.balls[i];
            if(row){
                for(var j=0;j<row.length;++j){
                    var o=row[j];
                    if(!o||o.number==0)continue;
                    o.innerHTML="&nbsp;";
                    o.className=o.className.replace(/( |^)chart\w+$/ig,'');
                }
            }
        }
    },
    check:function(td,x,y){
        td.parentNode.onmousedown=function(e){
            ESUNChart.stop(e||window.event);// stop draw line
        };
        td.number=x-oPV.offset;
        var i=td.number;
        /* 如果有CSS数组，就用CSS数组 */
        if(oPV.wxCss)oPV.css=oPV.wxCss[i];
        if(ESUNChart.ini.map.length>0){//把自然数映射为码表
            td.number=ESUNChart.ini.map[td.number];
        }
        //this.addClick(td,oPV.css);
        //by cell pos push Array
        var rowId=td.parentNode.rowIndex;
        if(oPV.balls[rowId]==undefined)oPV.balls[rowId]=[];
        oPV.balls[rowId][td.cellIndex]=td;
        return false;
    },
    setMap:function(arr){ESUNChart.ini.map=arr||[];return this},
    bind:function(tid){
        this.table=tid;
        return this;
    },
    /* x,y,width,margin-bottom,offsetNumber; table is need */
    add:function(x,y,w,mb,offsetNumber){
        this.offset=offsetNumber||0;
        this.oSG=new SG(this.table,x,y,w,mb,this.check);
        return this;
    },
    newCSS:function(v){
        this.css=v;
        return this;
    }
}

/* 块排序 -------------------------------------------------------------------------------------- */
BSort=function(table,_x,_y,width,margin_bottom){
    this.map=[];
    this.w=0;
    this.h=0;
    this.newSort=[];
    this.init(table,_x,_y,width,margin_bottom);
};
BSort.prototype={
    init:function(table,_x,_y,width,margin_bottom){/* 支持top与left的负值 */
        var rect={x:_x||0,y:_y||0,w:width||0,oh:margin_bottom||0};
        var trs=document.getElementById(table).rows;
        var row_start=rect.y<0?(trs.length+rect.y):rect.y;
        var row_end=trs.length-rect.oh;
        var col_start=rect.x<0?(trs[row_start].cells.length+rect.x):rect.x;
        var col_end=col_start+rect.w;
        if(col_end>trs[row_start].cells.length-1)col_end=trs[row_start].cells.length-1;
        if(rect.w==0)col_end=trs[row_start].cells.length;
        /* to 2D array */
        var _x=_y=0;
        for(var i=row_start;i<row_end;i++){/* each and grouping */
            var tr=trs[i].cells;
            this.map[_y]=[];_x=0;
            for(var j=col_start;j<=col_end;j++){
                if(!tr[j])continue;
                this.map[_y][_x]=tr[j];
                tr[j].index=_x++;
            }
            _y++;
        };
        this.w=_x;this.h=_y;
        var lastRow=[];
        /* get last row's cell array */
        for(var i=0;i<this.w;i++){lastRow.push(this.map[this.h-1][i])}
        /* last row sort of value */
        lastRow.sort(function(a,b){
            if(a.className.indexOf('B_')!=-1)return -1;
            if(b.className.indexOf('B_')!=-1)return -1;
            return parseInt(a.innerHTML)>parseInt(b.innerHTML)?-1:1;
        });
        var ball2back=[],ball=[];
        for(var i=0;i<lastRow.length;i++){
            if(lastRow[i].className.indexOf('B_')==-1)ball2back.push(lastRow[i]);
            else{ ball.push(lastRow[i])};
        }
        ball2back=ball2back.concat(ball)
        /* get new sort of index */
        for(var i=0;i<ball2back.length;i++){this.newSort.push(ball2back[i].index)};
    },
    sort:function(yes){
        var sort=yes?this.newSort:[];
        for(var i=0;i<this.h;i++)
        {
            /* get last cell */
            this.map.lastCell=this.map[i][this.w-1];
            for(var j=0;j<this.w;j++){
                var _this=this.map[i][j];
                var _j=sort.length>0?sort[j]:j;
                this.map.lastCell=ESUNChart.insertAfter(this.map[i][_j],this.map.lastCell);
            };
        };
    }
};

Cookie={
    trim:function (str){
        return str.replace(/^\s*|\s*$/g,'');
    },
    each: function(fn) {
        var s = document.cookie;
        if (s == '' || !fn) return;
        var ss = s.split(';');
        for (var i = 0; i < ss.length; ++i) {
            var a = ss[i].split('='),
                r = fn.call(this, this.trim(a[0]), decodeURIComponent(a[1]), i);
            if (r !== undefined) return r;
        };
    },
    add: function(Id, val, opts) {
        opts = opts || {};
        var c = this.trim(Id) + "=" + encodeURIComponent(val);
        var live = (new Date()).getTime() + (opts.day || 1) * (1000 * 60 * 60 * 24);
        if (opts.day) c += ";expires=" + new Date(live).toUTCString();
        if (opts.path) c += ";path=" + opts.path;
        if (opts.domain) c += "; domain=" + opts.domain;
        if (opts.secure) c += ";secure";
        document.cookie = c;
        return this;
    },
    del: function(key) {
        this.each(function(id) {
            if (id == key || key === undefined) {
                this.add(id, 0, {
                    day: -1
                });
            };
        });
    }
};

/*

 遗漏柱状标亮器
 Object yl_Histogram

 PHP:
 <script>
 //设置柱状图的当前期号与起始方向
 Histogram_expect=<?=$expect?>;
 Histogram_sort=<?=$ssort?>;
 </script>

 */

yl_Histogram={
    list:[]
    ,ini:{
        table:null,
        checkBox:null,
        expect:0,
        sort:0,
        left:5,
        right:0,
        beginLine:0,
        defaultShow:false
    }
    ,bind:function(ini){
        for(var k in ini||{})this.ini[k]=ini[k];
        var ctrl=document.getElementById(this.ini.checkBox);
        if(ctrl){
            this.ini.defaultShow=!!ctrl.checked;
            ctrl.onclick=function(){
                yl_Histogram.hide(!this.checked)
            }
        }
        this.show(this.ini);
    }
    ,show:function(ini){
        // 如果没有参数,直接从缓存中检索td操作。
        if(!ini)return this.hide(false);
        if(!ini.expect)return;
        this.Map=document.getElementById(ini.table);
        var curLine=ini.beginLine;
        // get current line
        for (var i=0;i<this.Map.rows.length;i++) {
            try{var J=this.Map.rows[i].cells[1].innerHTML.replace(/(^\s+)|(\s+$)/g,'');}catch(e){continue;};
            if(J==ini.expect){
                curLine=i;
                break;
            }
        }
        try{cells=this.Map.rows[curLine].cells;}catch(e){return};
        // draw
        for (var i=ini.left;i<cells.length-ini.right;i++ ){
            if(!/cbg|B_/i.test(cells[i].className))
                this.setColor(cells[i],ini.sort||-1)
        }
    }
    ,hide:function(isHide){
        for(var i=0;i<this.list.length;i++){
            var $$=this.list[i];
            $$.className=isHide===false?$$.newClass:$$.oldClass;
        }
    }
    ,getVCell:function(table,cell,dir){
        try{
            var vcell=table.rows[cell.parentNode.rowIndex+dir].cells[cell.cellIndex];
            if(undefined==vcell) return this.getVCell(table,cell,dir*2);
            return table.rows[cell.parentNode.rowIndex+dir].cells[cell.cellIndex]
        }catch(e){
            return null;
        }
    }

    ,getClassName:function(cell){
        var n=parseInt(cell.innerHTML);
        if(n>16)return ' cbg7';
        if(n>5)return ' cbg6';
        return ' cbg5';
    }

    ,setColor:function(cell,dir){
        var s=this.getClassName(cell)
            ,nextCell=cell;
        try{
            do{
                if(nextCell.innerHTML!=''){
                    nextCell.oldClass=nextCell.className;
                    nextCell.newClass=nextCell.oldClass+s;
                    if(this.ini.defaultShow)
                        nextCell.className=nextCell.newClass;
                }
                this.list.push(nextCell);
                nextCell=this.getVCell(this.Map,nextCell,dir);
            }while(
            !/B_|cbg/i.test(nextCell.className)&&
            (/M_|tdbck/.test(nextCell.className))
                )
        }catch(e){}
    }

}

/*
 help: yl_Histogram.show(表格ID,当前期号,排序方式(1为向下,0为向上));
 yl_Histogram.show('chartsTable',expect,1);
 */

/*
 分隔线
 */

SplitLine={
    bind:function(table){

    }
}

var drawRect=function(from,color){
    JoinLine.indent=0;
    var size=window.ActiveXObject?2:4;
    var box=ESUNChart.hotBox||new JoinLine('#00A0FC',size);
    var p1=box.pos(from);
    p1.x=0;
    p1.y-=80;
    p2={x:p1.x+from.offsetWidth,y:p1.y};
    p3={x:p2.x,y:p2.y+from.offsetHeight};
    p4={x:p1.x,y:p3.y};
    box.join([p1,p2,p3,p4,p1],true);
    box.show(true);
    ESUNChart.hotBox=box;
    var hl=document.getElementById('help_line');
    if(hl)ESUNChart.on(hl,'click',function(){
        setTimeout(function(){
            var ls=box.lines;
            var ref=document.getElementById('selLine0');
            var Y=2,hide=true,IE=!!window.ActiveXObject;
            //Y=IE?2:5;
            if(ref){
                if(ref.style.display!='none')hide=false;
                if(hide)	ref.style.display=IE?'block':'table-cell';
                var a=ref;
                for(;a;a=a.offsetParent){Y+=a.offsetTop;};
                if(hide)	ref.style.display='none';
            };
            var diff = Y-ls[0].offsetTop+size;
            for(var i=0;i<ls.length;i++)
                ls[i].style.top = parseInt(ls[i].style.top)+diff+'px';
        },100);

    })
};


var drawRectCenter=function(from,color){
    JoinLine.indent=0;
    var size=window.ActiveXObject?2:4;
    var box=ESUNChart.hotBox||new JoinLine('#00A0FC',size);
    var p1=box.pos(from);
    p1.x=0;
    p1.y-=80;//-19
    p2={x:p1.x+from.offsetWidth,y:p1.y};
    p3={x:p2.x,y:p2.y+from.offsetHeight};
    p4={x:p1.x,y:p3.y};
    box.join([p1,p2,p3,p4,p1],true);
    box.show(true);
    ESUNChart.hotBox=box;
    var hl=document.getElementById('help_line');
    if(hl)ESUNChart.on(hl,'click',function(){
        setTimeout(function(){
            var ls=box.lines;
            var ref=document.getElementById('selLine0');
            var Y=2,hide=true,IE=!!window.ActiveXObject;
            alert(IE=!!window.ActiveXObject);
            //Y=IE?2:5;
            if(ref){
                if(ref.style.display!='none')hide=false;
                if(hide)	ref.style.display=IE?'block':'table-cell';
                var a=ref;
                for(;a;a=a.offsetParent){Y+=a.offsetTop;};
                if(hide)	ref.style.display='none';
            };
            var diff = Y-ls[0].offsetTop+size;
            for(var i=0;i<ls.length;i++)
                ls[i].style.top = parseInt(ls[i].style.top)+diff+'px';
        },100);

    })
};

/*
 支持用户绘线(双击清除)
 userLine.init(开关ID,颜色列表ID);
 */

userLine={
    stop:true,
    color:'red',
    init:function(checkBox,colorList){
        this.draw=this[/*@cc_on 'IE'||@*/'FF'];
        /*if((this.check=document.getElementById(checkBox))==null)
         return alert('not find checkbox!');*/
        this.lines=[];
        var Canvas=document.body;
        if(colorList){
            this.colorList=document.getElementById(colorList)
            this.colorList.onmousedown=function (e){
                e=e||event;
                if(/*@cc_on !@*/0){this.setCapture();e.cancelBubble=true;e.returnValue = false
                }else{e.preventDefault();e.stopPropagation()}
            }
        };
        Canvas.onmousedown=function(){
            if(userLine.stop)return;
            userLine.begin=true;
            this.style.cursor="crosshair";
            var d=document.body,oX=d.scrollLeft
                ,oY=Math.max(d.scrollTop,document.documentElement.scrollTop);
            userLine.x=event.clientX+oX;
            userLine.y=event.clientY+oY;
        };
        Canvas.onmouseup=function (){
            userLine.Line=userLine.begin=false;
            if(/*@cc_on !@*/0){this.onlosecapture=null;this.releaseCapture();
            }else{window.onblur=null}
            this.style.cursor="";
        };
        Canvas.onmousemove=function (e){
            if(!userLine.begin)return;
            var d=document.body,oX=d.scrollLeft
                ,oY=Math.max(d.scrollTop,document.documentElement.scrollTop);
            var x=event.clientX+oX;
            var y=event.clientY+oY;
            if(!userLine.Line)userLine.draw(userLine.x,userLine.y,x,y);
            e=e||event;
            userLine.Line.to=x+'px,'+y+'px';
            if(/*@cc_on !@*/false){this.setCapture();e.cancelBubble=true;e.returnValue = false
            }else{e.preventDefault();e.stopPropagation()}
            window.getSelection && window.getSelection().removeAllRanges();
        };
        Canvas.ondblclick=function(){/* 双击回退一步，按ctrl清除所有 */
            event.ctrlKey?
                userLine.clear():
                userLine.back();/* 回退 */
            userLine.stop=false;
        };
    }
    ,IE:function(x1,y1,x2,y2){
        var D=document,Line=D.body.appendChild(D.createElement('<esun:line style="z-index:99;position:absolute;left:0;top:0"><esun:Stroke dashstyle="shortdot" endarrow="classic" /></esun:line>' ));
        with(this.Line=Line){
            from=x1+","+y1;
            to=x2+","+y2;
            strokeColor=this.color;//this.colorList&&this.colorList.value||"red";
            strokeWeight=2;
        };
        this.lines.push(Line);
    }
    ,FF:function(){}
    ,clear:function(){
        for(var i=0;i<this.lines.length;i++)
            this.lines[i].parentNode.removeChild(this.lines[i]);
    }
    ,back:function(){/* 清除刚才的 */
        var prev=this.lines.pop();
        if(prev!=undefined){
            prev.parentNode.removeChild(prev);
        }
    }
};

if(window.attachEvent){
    window.attachEvent('onload',function(){userLine.init()});
    document.attachEvent('onkeyup',function(){/* 按下包含选色操作 */
        var J=event.keyCode;
        if(J<49||J>56)return;
        userLine.color=[
            '#FF0000',
            '#FF6600',
            '#BD5151',
            '#499495',
            '#91ABE1',
            '#1C74AA',
            '#FF00FF',
            '#666666'
        ][J-49];
    })
};

