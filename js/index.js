var oMoveTop=document.getElementById('moveTop');
var aLi=oMoveTop.getElementsByTagName('li');
var oHome_a=oMoveTop.getElementsByTagName('a')[0];
var oPersonality_a=oMoveTop.getElementsByTagName('a')[1];
var oWorks_a=oMoveTop.getElementsByTagName('a')[2];
var oConcat_a=oMoveTop.getElementsByTagName('a')[3];
var oHead=document.getElementById('head');
var oPersonality=document.getElementById('personality');
var oWorks=document.getElementById('works');
var oConcat=document.getElementById('concat');
var oMoveTop=document.getElementById('moveTop');
var oHlw=document.getElementById('hlw');
var bOk=false;
/*滚动条及头部运动*/
function move(obj,obj1){
	var oS=document.documentElement.scrollTop||document.body.scrollTop;
	var start=obj.offsetTop+oS;
	var Target=obj1.offsetTop-100;
	var dis=Target-start;
	var n=0;
	var count=Math.floor(1000/30);
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		var a=1-n/count;
		document.documentElement.scrollTop=document.body.scrollTop=start+dis*(1-a*a*a);
		if(n==count){
						bOk=false;
			clearInterval(obj.timer);

		}
	},30)
}
/*清空默认的class样式*/
function clear(){
	for(var i=0;i<aLi.length;i++){
		aLi[i].className='';
	}
}
window.onload=window.onscroll=window.onresize=function(){
	oHome_a.onclick=function(){
		if(bOk) return;
		bOk=true;
		move(oHome_a,oHead);
		clear();
		oHome_a.parentNode.className='active';
	}
	oPersonality_a.onclick=function(){
		if(bOk) return;
		bOk=true;
		move(oPersonality_a,oPersonality);
		clear();
		oPersonality_a.parentNode.className='active';
	}
	oWorks_a.onclick=function(){
		if(bOk) return;
		bOk=true;
		move(oWorks_a,oWorks);
		clear();
		oWorks_a.parentNode.className='active';
	}
	oConcat_a.onclick=function(){
		if(bOk) return;
		bOk=true;
		move(oConcat_a,oConcat);
		clear();
		oConcat_a.parentNode.className='active';
	}
	/*返回顶部*/
	oHlw.onclick=function(){
		if(bOk) return;
		bOk=true;
		move(oHlw,oHead);
		clear();
		oHome_a.parentNode.className='active';
	}

	var oScrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	var clientH=document.documentElement.clientHeight;
	console.log(oScrollTop);
	/*浏览器所有内容高度的总和，无兼容问题*/
	var oScrollHeight=document.documentElement.scrollHeight;
	if(oPersonality.offsetTop-oScrollTop<100){
		clear();
		oPersonality_a.parentNode.className='active';
	}
	if(oWorks.offsetTop-oScrollTop<110){
		clear();
		oWorks_a.parentNode.className='active';
	}
	if(oScrollTop==0){
		clear();
		oHome_a.parentNode.className='active';
	}
	/*当浏览器的可视区加上滚动距离等于所有内容的高度时候*/
	if(oScrollTop+clientH==oScrollHeight){
		clear();
		oConcat_a.parentNode.className='active';
	}
	
}
/*个人介绍*/
var oPersonality_square=document.getElementById('personality_square');
var oUl=oPersonality_square.children[0];
var oOl=oPersonality_square.children[1];
var aLi_o=oOl.children;
var aLi_p=oUl.children;
var iNow=0;
oUl.style.width=aLi_p[0].offsetWidth*aLi_p.length+'px';

for(var i=0;i<aLi_o.length;i++){
	(function(index){
		aLi_o[index].onclick=function(){
			clear_ol();
			this.className='round';
			movemax(oUl,{left:-index*aLi_p[0].offsetWidth})
		}
	})(i)
}
	

oUl.onmousedown=function(ev){
	var oEvent=ev||event;
	var disX=oEvent.clientX-oUl.offsetLeft;
	var oldX=oEvent.clientX;
	document.onmousemove=function(ev){
		var oEvent=ev||event;
		oUl.style.left=oEvent.clientX-disX+'px';
	}
	document.onmouseup=function(ev){
		var oEvent=ev||event;
		var dis=Math.abs(oEvent.clientX-oldX);
		if(dis>30){
			if(oEvent.clientX<oldX){
				iNow++;
				
				if(iNow==aLi_p.length){
					iNow=aLi_p.length-1;
				}
				clear_ol();
				aLi_o[iNow].className='round';
			}else{
				iNow--;
				if(iNow==-1){
					iNow=0;
				}
				clear_ol();
				aLi_o[iNow].className='round';
			}
			movemax(oUl,{left:-iNow*aLi_p[0].offsetWidth});
		}else{
			movemax(oUl,{left:-iNow*aLi_p[0].offsetWidth});
		}
		document.onmousemove=null;
		document.onmouseup=null;
		oUl.releaseCapture&&oUl.releaseCapture();
	};
	oUl.setCaptrue&&oUl.setCaptrue();
	return false;
}
function clear_ol(){
	for(var i=0;i<aLi_o.length;i++){
		aLi_o[i].className='';
	}
}


/**作品展示**/
var oBox=document.getElementById('box');
var oSpan=document.querySelector('.box_span');
var aLi2=oBox.children;
var timer=null;
var Num=2;
show();
function show(){
	clearInterval(timer);
	timer=setInterval(function(){
		Num++;
		arr.unshift(arr.pop());
		for(var i=0;i<arr.length;i++){
			aLi2[i].className=arr[i].aClass;
			aLi2[i].onclick=arr[i].fnClick;
		}
		if(Num>=Narr.length){
			Num=0;
		}
		oSpan.innerHTML=Narr[Num];
	},3000);
}

oBox.onmouseover=function(){
	clearInterval(timer);
}
oBox.onmouseout=show;

aLi2[1].onclick=function(){
	Num--;
	arr.push(arr.shift());
	for (var i=0; i<arr.length; i++){
		aLi2[i].className=arr[i].aClass;
		aLi2[i].onclick=arr[i].fnClick;
	}
	if(Num<0){
		Num=Narr.length-1;
	}
	oSpan.innerHTML=Narr[Num];
};

aLi2[3].onclick=function(){
	Num++;
	arr.unshift(arr.pop());
	for(var i=0;i<aLi2.length;i++){
		aLi2[i].className=arr[i].aClass;
		aLi2[i].onclick=arr[i].fnClick;
	}
	if(Num>=Narr.length){
		Num=0;
	}
	oSpan.innerHTML=Narr[Num];
};

var arr=[];
var Narr=['婚纱摄影','灵魂回响','美丽说','小米','oppo','5','6','7','8','9'];
for(var i=0; i<aLi2.length; i++){
	arr.push({
		aClass:aLi2[i].className,
		fnClick:aLi2[i].onclick
	});
}