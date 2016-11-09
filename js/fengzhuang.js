//随机数
function rnd(n,m){
	return Math.floor(Math.random()*(m-n)+n);  //向下取整，提高性能
};
//补0
function toDou(n){
	return n<10?'0'+n:''+n;  //三目写法
	/*
		正常写法
		if(n<10){
			return '0'+n;	
		}else{
			return ''+n;
		}
	*/
}; 
//检查是否重复
function findInArr(arr,n){  	
	for(var i=0;i<arr.length;i++){
		if(arr[i]==n){
			return true;
		}
	}
	return false;
}

//获取非行间样式
function getStyle(obj,name){
	if(obj.currentStyle){
		return obj.currentStyle[name];
	}else{
		return getComputedStyle(obj,false)[name];
	}
}
/*
	获取非行间样式的另一种写法
	 function getStyle(obj,name){
        return (obj.currentStyle || getComputedStyle(obj,false))[name];
    }
*/
//DOMReady当页面加载完成执行  代码加载完成
function DOMReady(fn){
	if(document.addEventListener){
		//兼容火狐，谷歌，ie10、9
		document.addEventListener('DOMContentLoaded',function(){
			fn&&fn();
		},false)
	}else{
		//完全兼容模拟从文件加	载到解析完毕的全部过程
		document.attachEvent('readystatechange',function(){
			if(document.readyState=='complete'){
				fn&&fn();
			}
		});
	}
}
//move运动封装  需要getStyle
function movemax(obj,json,options){
    var options=options||{};                            //当有options的时候就运行options，当没有options的时候就创建一个空的json
    var duration=options.duration||1000;                    //定义一个总的时间，当没有定义的时候默认为1000毫秒
    var easing=options.easing||'linear';
    var star={};                                        //定义一个空的json数组来保存从非行间里获取的样式
    var dis={};                                         //定义一个空的json数组来保存参数中传进来的样式
    for(var name in json){                              //循环获取样式并保存到star和dis空数组中
        star[name]=parseFloat(getStyle(obj,name));      //获取非行间样式来进行保存。   开始的位置
        dis[name]=json[name]-star[name];                //获取传进来的参数的样式       结束的位置
    }
    var count=Math.ceil(duration/30);                       //运动的次数   总时间/30毫秒运动一次
    var n=0;                                                //定义一个变量来计算次数
    clearInterval(obj.timer);                               //停止一下定时器
    obj.timer=setInterval(function(){                       //给obj定义一个自定义属性里面保存着定时器
        n++;                                                //计时器每运行一次次数+1
        for(var name in json){                              // for in循环从json中取值
            switch (easing){                                //用switch循环来判断提取的内容，在json数组中存储着键为easing它分别有3种值为linear(匀速)、ease-out(减速)、ease-in(加速)
                case 'linear':                              //匀速
                    var a= n/count;                         //假如说count次数为10那么他每次运动的就是10分之一的
                    var cur=star[name]+dis[name]*a;         //总路程*10分之1  把总路程分成10份来运动
                    break;
                case 'ease-out':                            //减速
                    var a= 1-n/count;                       //总路程*10分之1  1-1/10=0.9
                    var cur=star[name]+dis[name]*(1-a*a*a); //假设总路程为100   100*1-0.9*0.9*0.9=80.271     100*1-0.8*0.8*0.8=63.488运动的距离会越来越少
                    break;
                case 'ease-in':                             //加速
                    var a= n/count;                         //假如说count次数为10那么他每次运动的就是10分之一的
                    var cur=star[name]+dis[name]*a*a*a;     //假设总路程为100   100*0.1*0.1*0.1=0.1     100*0.2*0.2*0.2=0.8运动的距离会越来越多
                    break;
            }
            if(name=='opacity'){                            //如果json中需要设置opacity值那么name设置了opacity就会执行
                obj.style.opacity=star[name]+n*dis[name]/count; //star 1  dis -1    1+1*-1/10=0.9   1+2*-1/10=0.8  10次运动过后就为0
            }else{
                obj.style[name]=cur+'px';                   //当没有opacity值的时候就运行这句代码  宽、高、left、top...  cur根据switch循环中取得
            }
        }
        if(n==count){                                       //判断如果运行的次数和运动的次数一致的时候
            clearInterval(obj.timer);                       //清除定时器
            options.complete && options.complete();         //如果在options中有为complete的键 那么就运行complete    &&相当于一个判断
        }
    },30)
}

//获取Class并进行操作
function getByClass(oParent,sClass){
		if(oParent.getElementsByClassName){
			return oParent.getElementsByClassName(sClass); //不兼容IE8-- ,提高性能
		}else{
			var aEle = oParent.getElementsByTagName('*');	//全兼容.
			var arr = [];
			for(var i = 0; i < aEle.length; i++){
				var tmp = aEle[i].className.split(' ');
				if(findInArr(sClass,tmp)){
					arr.push(aEle[i]);	
				}	
			}	
			return arr;
		}
	}
/*
获取class名字然后改变样式
var aBlue = getByClass(document,'red');
console.log(getByClass(document,'red'));
for(var j = 0; j < aBlue.length; j++){
	aBlue[j].style.background = 'red';	
}
*/
//实参求和
function sum(){
	var res=0;
 	for(var i=0;i<arguments.length;i++){
 		res+=arguments[i];
 	}
 	return res;
}
/*
	实参求和使用方法
	alert(sum(1,2,3,4,5,6))
*/
//取绝对定位的值
function getPos(obj){
	var l=0;
	var t=0;
	while(obj){
		l+=obj.offsetLeft;
		t+=obj.offsetTop;
		obj=obj.offsetParent;
	}
	return {left:l,top:t};
}
//滚轮方向
/*
	alert(getPos(oDiv).left) 
*/
function addEvent(obj,sEv,fn)
{
	if(obj.addEventListener){
		obj.addEventListener(sEv,fn,false);
	}else{
		obj.attachEvent('on'+sEv,fn);
	}
}

/*
** addWheel 		添加滚轮事件
** params
** 		obj	[object] 		哪个元素加
** 		fn 	[funtion] 		执行什么函数
** 		fn(bDir)	bDir [boolean] 	滚动方向
*/
function addWheel(obj,fn){
	//2.判断滚轮滚动方向
	function fnDir(ev){
		//保存方向  下true  上false
		var bDir = true;
		var oEvent = ev||event;
		//判断浏览器用什么属性
		
		bDir = oEvent.wheelDelta?oEvent.wheelDelta<0:oEvent.detail>0;
		
		//执行函数,不一定有。要判断
		fn&&fn(bDir);
		//阻止默认事件
		//addEventListener用不了return false；
		oEvent.preventDefault&&oEvent.preventDefault();
		return false;
	}
	//1.判断浏览器是否是火狐
	if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
		addEvent(obj,'DOMMouseScroll',fnDir);
	}else{
		addEvent(obj,'mousewheel',fnDir);
	}
}
