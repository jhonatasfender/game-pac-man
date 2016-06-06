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
		
	},
}