
//游戏老鼠模型设置 
var Mouse = function(type){
	this.mouse = null;
	this.num = -1;
	this.hole = -1;
	this.init(type);
}
Mouse.prototype = {
	mousetype: {
		"good": "img/good.gif",
		"bad": "img/bad.gif",
		"goodkill":"img/goodkill.gif",
		"badkill":"img/badkill.gif"
	},
	init : function(type){
		type = type || 'good';
		var _this = this;
		
		this.mouse = document.createElement("div");
		this.mouse.mousetype = type;
		this.mouse.islive = true;
		this.mouse.style.cssText = 'width:75px;height:100px;background:url('+this.mousetype[type]+');left:0;top:20px;\
		position:relative;margin:auto;cursor:pointer;';
		
		this.mouse.onclick = function(e){_this.beat(e);};
	},
	beat : function(e){
		
		if(this.mouse.islive){
			
			this.mouse.islive = false;
			this.onbeat();
			this.mouse.style.background = "url("+this.mousetype[this.mouse.mousetype+"kill"]+")";
		}
	},
	animation : function(speed){
		
		speed = speed == 'fast'?20:speed == 'normal'?30:50;
		
		var obj = this.mouse,ost = obj.style,oTop = parseInt(ost.top,10),cut=5,_this = this;
		
		var show = function(top){
			
			top = top-cut;
			
			if(top >= -40){
				ost.top = top + 'px';
				setTimeout(function(){show(top);},speed);
			}
			else
			{
				setTimeout(function(){hide(-40);},speed*10);
			}
		}
		var hide = function(top){
			
			top = top+cut;
			
			if(top <= oTop){
				ost.top = top + 'px';
				setTimeout(function(){hide(top);},speed);
			}
			else {
				_this.reset();
			}
		}
		show(oTop);
	},
	reset : function(){
		
		this.mouse.islive =true;
		this.mouse.style.background = "url("+this.mousetype[this.mouse.mousetype]+")";
		
		this.onend();
	},
	onbeat : function(){},
	onend : function(){}
}
