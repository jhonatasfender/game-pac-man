 /***
  *	https://github.com/daleharvey/pacman/blob/master/pacman.js
  *	
  */
  
var nome = 4,up=3,left=2,down=1,right=11,waitting=5,
pause=6,playing=7,countdown=8,eaten_pause=9,dying=10,
pac={};
pac.fps=30;
pac.gHost=function(game,map,colour){
	var position=null,direction=null,eatable=null,
	eaten=null,due=null,
	getNewCoord=function (){
		var speed=isVunerable()?1:isHidden()?4:2,
		xSpeed=(dir===left&&-speed||dir===right&&speed||0),
		ySpeed=(dir===down&&speed||dir===up&&-speed||0);
		return{"x":addDounded(current.x,xSpeed),"y":addDounded(current.y,ySpeed)}
	},
	/* Collision detection (walls) is done when a ghost lands on an 
	 * exact block, make sure they dont skip over it
	 */
	addBounded=function (x1,x2){
		var rem=x1%10,result=rem+x2;
		if(rem!==0&&result>10)
			return x1+(10-rem);
		else if(rem>0&&result<0)
			return x1-rem;
		return x1+x2;
	},
	isVunerable=function(){return eatable!==null;},
	isDangerous=function(){eaten===null;},
	isHidden=function(){eatable==null&&eaten!==null;},
	getRandomDirection=function(){
		var moves=(direction===left||direction===right)?[up,down]:[left,right];
		return moves[Math.floor(Math.random()*2)];
	},
	reset=function(){
		eaten=null;
		eatable=null;
		position={"x":90,"y":80};
		direction=getRandomDirection();
		due=getRandomDirection();
	},
	onWholeSquare=function(x){return x%10===0;},
	oppositeDirection=function(dir){return dir===left&&right||dir===right&&left||dir===up&&down||up;},
	makeEatable=function(){
		direction=oppositeDirection(direction);
		eatable=game.getTick();
	},
	eat=function(){
		eatable=null;
		eaten=game.getTick();
	},
	pointToCoord=function(x){return Math.round(x/10);},
	nextSquare=function(x,dir){
		var rem=x%10;
		if(rem===0)
			return x;
		else if(dir===right||dir===down)
			return x+(10-rem);
		else
			return x-rem;
	},
	onDridSquare=function(pos){return onWholeSquare(pos.y)&&onWholeSquare(pos.x);},
	secondsAgo=function(tick){return (game.getTick()-tick)/pac.fps;},
	getColour=function(){
		if(eatable){
			if(secondsAgo(eatable)>5)
				return game.getTick()%20>10?"#FFFFFF":"#0000BB";
			else
				return "#0000BB";
		}else if(eaten)
			return "#222";
		return colour;
	},
	draw(ctx){
		var s=map.blockSize,top=(position.y/10)*s,left=(position.x/10)*s;
		if(eatable && secondsAgo(eatable)>8)
			eatable=null;
		if(eaten&&secondsAgo(eatable)>8)
			eatable=null;
		if(eaten&&secondsAgo(eaten)>3)
			eaten=null;
		var tl=left+s,base=top+s-3,inc=s/10,high=game.getTick()%10>5?3:-3,low=game.getTick()%10>5?-3:3;
		ctx.fillStyle=getColour();
		ctx.beginPath();
	},
}
