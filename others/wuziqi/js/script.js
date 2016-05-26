var beginBtn = document.getElementById("beginPlay");
var boxSize = 15;
var playFirst = 1;
var level = 0;
var me = true;
beginBtn.onclick = function(){
	var selectBox = document.getElementById("selectbox");
	var play_screen = document.getElementById("play_screen");

	getSelectValue();
	selectbox.className="hidden";
	play_screen.className="show";
	drawChessBoard(boxSize);
	initWinsWay(boxSize);

	initChesssBoard();
	initCountWin();

	if(playFirst=="0"){
		oneStep(Math.floor(boxSize/2), Math.floor(boxSize/2), true);
		chessBoard[Math.floor(boxSize/2)][Math.floor(boxSize/2)] = 2;

		document.getElementById("playColor").className = "whiteColor";
		document.getElementById("comColor").className = "blackColor";
	}
};

var rePlayBtn = document.getElementById("rePlay");
rePlayBtn.onclick = function(){
	location.reload();
}

var getSelectValue = function(){
	var radioScale = document.getElementsByName("scale");  
    for (i=0; i<radioScale.length; i++) {  
        if (radioScale[i].checked) {  
            boxSize =  radioScale[i].value;
        }  
    }
    var radioPlay = document.getElementsByName("play_choice");  
    for (i=0; i<radioPlay.length; i++) {  
        if (radioPlay[i].checked) {  
            playFirst =  radioPlay[i].value;
        }  
    }
    var radioLevel = document.getElementsByName("level");  
    for (i=0; i<radioLevel.length; i++) {  
        if (radioLevel[i].checked) {  
            level =  radioLevel[i].value;
        }  
    } 
}

var chessbox = document.getElementById('chessbox');
var context = chessbox.getContext('2d');

// 画棋盘
var drawChessBoard = function(size){
	chessbox.width = size*30;
	chessbox.height = size*30;
	context.strokeStyle = '#BFBFBF';
	for (var i=0; i<size; i++){
		context.moveTo(15+i*30, 15);
		context.lineTo(15+i*30, size*30-15);
		context.stroke();
		context.moveTo(15, 15+i*30);
		context.lineTo(size*30-15, 15+i*30);
		context.stroke();
	}
}


var wins = [];// 赢法数组
var count=0;
var initWinsWay = function(size){
		for(var i=0; i<size; i++){
		wins[i] = [];
		for(var j=0; j<size; j++){
			wins[i][j] = [];
		}
	}
	// 横线
	for(var i=0; i<size; i++){
		for(var j=0; j<size-4; j++){
			for(var k=0; k<5; k++){
				wins[i][j+k][count] = true;
			}
			count++;
		}
	}
	// 竖线
	for(var i=0; i<size; i++){
		for(var j=0; j<size-4; j++){
			for(var k=0; k<5; k++){
				wins[j+k][i][count] = true;
			}
			count++;
		}
	}
	// 斜线
	for(var i=0; i<size-4; i++){
		for(var j=0; j<size-4; j++){
			for(var k=0; k<5; k++){
				wins[i+k][j+k][count] = true;
			}
			count++;
		}
	}
	// 反斜线
	for(var i=0; i<size-4; i++){
		for(var j=14; j>3; j--){
			for(var k=0; k<5; k++){
				wins[i+k][j-k][count] = true;
			}
			count++;
		}
	}
}

var chessBoard = []; // 记录落子情况
var initChesssBoard = function(){
	for(var i=0; i<boxSize; i++){
		chessBoard[i] = []
		for(var j=0; j<boxSize; j++)
			chessBoard[i][j] = 0;
	}
}

// 下棋统计数组
var myWin = [];
var computerWin = [];

var initCountWin = function(){
	for(var i=0; i<count; i++){
		myWin[i] = 0;
		computerWin[i] = 0;
	}
}

var over = false;


var tempX, tempY;

// 显示落子位置
var oneStep = function(i, j, black){
	context.beginPath();
	context.arc(15+i*30, 15+j*30, 13, 0, 2 *Math.PI);
	context.closePath();
	var gradient = context.createRadialGradient(15+i*30+2, 15+j*30-2, 13, 15+i*30+2, 15+j*30-2, 0);
	if(black){
		gradient.addColorStop(0, "#0A0A0A");
		gradient.addColorStop(1, "#636766");
	}else{
		gradient.addColorStop(0, "#D1D1D1");
		gradient.addColorStop(1, "#F9F9F9");
	}
	
	context.fillStyle = gradient;
	context.fill();
}

// 玩家下子
chessbox.onclick = function(e) {
	if(over || !me){
		return;
	}
	var x = e.offsetX;
	var y = e.offsetY;
	var i = Math.floor(x / 30);
	var j = Math.floor(y / 30);
	if(chessBoard[i][j] == 0){
		oneStep(i, j, (playFirst=="1"));
		chessBoard[i][j] = 1;
		for(var k=0; k<count; k++){
			if(wins[i][j][k]){
				myWin[k]++;
				computerWin[k] = 6;
				if(myWin[k]==5){
					window.alert("you win!");
					over = true;
				}
			}
		}
		if(!over){
			me = !me;
			setTimeout("computerAI()", 100);
			// computerAI();
		}
	}
}

// 电脑下子
var computerAI = function(){
	var myScore = [];
	var computerScore = [];

	var max = 0;
	var u = 0, v = 0;

	for(var i=0; i<boxSize; i++){
		myScore[i] = []
		computerScore[i] = []
		for(var j=0; j<boxSize; j++){
			myScore[i][j] = 0;
			computerScore[i][j] = 0;
		}
	}

	for(var i=0; i<boxSize; i++){
		for(var j=0; j<boxSize; j++){
			if(chessBoard[i][j] == 0){
				for(var k=0; k<count; k++){
					if(wins[i][j][k]){
						if(myWin[k] == 1){
							myScore[i][j] += 200;
						}else if(myWin[k] == 2){
							myScore[i][j] += 400;
						}else if(myWin[k] == 3){
							myScore[i][j] += 2000;
						}else if(myWin[k] == 4){
							myScore[i][j] += 10000;
						}

						if(computerWin[k] == 1){
							computerScore[i][j] += 200*2;
						}else if(computerWin[k] == 2){
							computerScore[i][j] += 400*2;
						}else if(computerWin[k] == 3){
							computerScore[i][j] += 2000*2;
						}else if(computerWin[k] == 4){
							computerScore[i][j] += 10000*2;
						}
					}
				}

				if(myScore[i][j] > max){
					max = myScore[i][j];
					u = i;
					v = j;
				}else if(myScore[i][j] == max){
					if(computerScore[i][j] > computerScore[u][v]){
						u = i;
						v = j;
					}
				}

				if(computerScore[i][j] > max){
					max = computerScore[i][j];
					u = i;
					v = j;
				}else if(computerScore[i][j] == max){
					if(myScore[i][j] > myScore[u][v]){
						u = i;
						v = j;
					}
				}
			}
		}
	}
	oneStep(u, v, (playFirst=="0"));
	chessBoard[u][v] = 2;
	for(var k=0; k<count; k++){
		if(wins[u][v][k]){
			computerWin[k]++;
			myWin[k] = 6;
			if(computerWin[k]==5){
				drawWinLine(k);
				// window.alert("you lose!");
				document.getElementById("showText").innerHTML="You Lose!";
				over = true;
			}
		}
	}
	if(!over){
		me = !me;
	}
}

var drawWinLine = function(cnt){
	winPosX=[]
	winPosY=[]
	for(var i=0; i<boxSize; i++){
		for(var j=0; j<boxSize; j++){
			if(wins[i][j][cnt]){
				winPosX.push(i);
				winPosY.push(j);
			}
		}
	}
	console.log(winPosX);
	console.log(winPosY);
	context.strokeStyle="#F00";
	context.beginPath();
	if(winPosX[0]==winPosX[1]){
		context.moveTo(winPosX[0]*30+15,winPosY[4]*30+15);
		context.lineTo(winPosX[0]*30+15,winPosY[0]*30+15);
	}else if(winPosY[0]==winPosY[1]){
		context.moveTo(winPosX[0]*30+15,winPosY[0]*30+15);
		context.lineTo(winPosX[4]*30+15,winPosY[0]*30+15);
	}else{
		context.moveTo(winPosX[0]*30+15,winPosY[0]*30+15);
		context.lineTo(winPosX[4]*30+15,winPosY[4]*30+15);
	}
	context.stroke();
	context.closePath();
}








