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
		ctx.moveTo(left,base);
		ctx.quadraticCurveTo(left,top,left+(s/2),top);
		ctx.quadraticCurveTo(left+s,top,left+s,base);
		//Wavy things at the bottom
		ctx.quadraticCurveTo(tl-(inc*1),base+high,t1-(inc*2),base);
		ctx.quadraticCurveTo(tl-(inc*3),base+low,t1-(inc*4),base);
		ctx.quadraticCurveTo(tl-(inc*5),base+high,t1-(inc*6),base);
		ctx.quadraticCurveTo(tl-(inc*7),base+low,t1-(inc*8),base);
		ctx.quadraticCurveTo(tl-(inc*9),base+high,t1-(inc*10),base);
		ctx.closePath();
		ctx.fill();
		ctx.beginPath();
		ctx.fillStyle="#FFF";
		ctx.arc(left+6,top+6,s/6,0,300,false);
		ctx.arc((left+s)-6,top+6,s/6,0,300,false);
		ctx.closePath();
		ctx.fill();
		var f=s/12,off={};
		off[right]=[f,0];
		off[left]=[-f,0];
		off[up]=[0,-f];
		off[down]=[0,f];
		ctx.beginPath();
		ctx.fillStyle="#000";
		ctx.arc(left+6+off[direction][0],top+6+off[direction][1],s/15,0,300,false);
		ctx.arc((left+s)-6+off[direction][0],top+6+off[direction][1],s/15,0,300,false);
		ctx.closePath();
		ctx.fill();
	},
	pane=function(pos){
		if(pos.y===100&&pos.x>=190&&direction===right)
			return {"y":100,"x":-10};
		if(pos.y===100&&pos.x<=-10&&direction===left)
			return position={"y":100,"x":190};
		return false;
	},
	move=function(ctx){
		var oldPos=position,onGrid=onGridSquare(position),npos=null;
		if(due!==direction){
			npos=getNewCoord(due,position);
			if(onGrid&&map.isFloorSpace({"y":pointToCoord(nextSquare(npos.y,due)),"x":pointToCoord(nextSquare(npos.x,due))}))
				direction=due;
			else
				npos=null;
			if(npos===null)
				npos=getNewCoord(direction,position);
			if()
		}
	},
}
