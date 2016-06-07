/**
 * 王亮于2016年5月27日
 * 引用于@author floyd
 */
//游戏老鼠逻辑设置 
var Game = {
	time : 61,
	mouseMap : {
		1:'good',
		2:'bad',
		3:'good',
		4:'good',
		5:'bad',
		6:'good',
		7:'bad',
		8:'good',
		9:'good',
		10:'good'
	},
	allMouse : [],
	nowScore : 0,
	hasHole : {},
	hasMouse : {},
	lis : null,
	init : function(){

		this.lis = document.getElementById('panel').getElementsByTagName('li');
		_this = this;

		for(var i=1;i <=10;i++){
			var mouse = new Mouse(this.mouseMap[i]);
			mouse.onbeat = function(){
				Game.changeScore(100 * (this.mouse.mousetype=='good'?1:-1));
			}
			mouse.onend = function(){
				var li = _this.lis[this.hole];
				li.removeChild(li.mouse.mouse);
				li.mouse = null;
				
				_this.hasHole[this.hole] = null;
				_this.hasMouse[this.num] = null;
			}
			this.allMouse.push(mouse);
		}
	},
	changeScore : function(score){
		this.nowScore += score;
		document.getElementById('score').innerHTML = this.nowScore;
	},
	start : function(){
		
		if(this.time <= 0)return;
		
		var _this = this;
		
		var random = parseInt(Math.random()*9,10);
		
		while(this.hasHole[random]){
			random = parseInt(Math.random()*9,10);
		}

		var randomMouse = parseInt(Math.random()*10,10);
		
		while(this.hasMouse[randomMouse]){
			randomMouse = parseInt(Math.random()*10,10);
		}
		
		this.allMouse[randomMouse].hole = random;
		this.allMouse[randomMouse].num = randomMouse;
		this.lis[random].appendChild(this.allMouse[randomMouse].mouse);
		this.lis[random].mouse = this.allMouse[randomMouse];
		this.lis[random].mouse.animation('normal');
		
		this.hasHole[random] = 'true';
		this.hasMouse[randomMouse] = 'true';
		
		setTimeout(function(){_this.start();},250);
	},
	startTime : function(){
		
		this.time -= 1;
		var _this = this;
		
		document.getElementById('time').innerHTML = this.time;
		
		if(this.time > 0){
			setTimeout(function(){_this.startTime()},1000);
		}
	},
	reset : function(){
		this.time = 61;
		this.allMouse = [];
		this.nowScore = 0;
		this.hasHole = {};
		this.hasMouse = {};
		this.lis = null;
		
		this.changeScore(0);
	}
}

function GameStart(){
	
	if(Game.time > 0 && Game.time != 61){
		alert("游戏尚未结束，不能重新开始哦！");
		return;
	}

	Game.reset();
	Game.init();
	Game.start();
	Game.startTime();
}
