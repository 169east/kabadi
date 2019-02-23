var p1, p2;
var p1controls = [38,39,40,37,16,32] //up,right,down,left,HIT (WDSAE)
//var p2controls = [73,76,75,74,85] //up,right,down,left,HIT (ILKJU)

//スコアと残り時間の初期化
var score = 0;
var raidTime = 30;

//各種フラグ
var courtFlag = false; //コートに入ったらtrue
var timeFlag = false; //時間カウントダウンが始まったらtrue
var jumpFlag = true; //バックジャンプ出来る状態ならtrue
var reachFlag = true; //手を伸ばせる状態ならtrue
var bonusFlag = false; //ボーナスが入ったらtrue
var touchFlag = false; //タッチが入ったらtrue

var cantFlag = true; //キャント表示用

//キャッチ判定
var doCatchnum = 0; //複数人タッチの判定

//コートの広さ
var coWidth = window.innerWidth*0.5;
var coDepth = coWidth*0.65;
//ハーフラインの位置
var liStart = coWidth*0.1;
//ボーク、ボーナスライン、ロビー
var borkDepth = coWidth*0.375;
var bonusDepth = coWidth*0.475;
var lobWidth = coWidth*0.1;
//入力されたレイダータイプ
var raidType = location.search;

//レイダーのパラメータ設定
var selectT;

var speedT = [0.007,0.06,0.05,0.15,0.25]; //移動速度、方向転換速度、リーチ、手の長さ、捕まりやすさ
var techT = [0.006,0.07,0.05,0.15,0.25];
var powerT = [0.0045,0.045,0.06,0.15,0.4];
var reachT = [0.0045,0.045,0.07,0.2,0.35];
var balanceT = [0.005,0.05,0.06,0.15,0.3];

var raidSpeed;
var raidTech;
var raidReach;
var raidHand;
var siCatch;
var doCatch;

//アンティのパラメータ設定
var untiReach = coWidth*0.06;
var duntiX = coWidth*0.5;
var duntiY = coDepth-bonusDepth-untiReach*0.3;


function setup() {

	/*if(window.innerWidth > 1000){
		coWidth = 1000;
	}*/
	//コートの作成
	createCanvas(coWidth,coDepth+liStart);
	//rectMode(CENTER);

	//レイダータイプの取得
	raidType=int(raidType.substring(1));

	switch (raidType) {
		case 1:
			selectT = speedT;
			break;
		case 2:
			selectT = techT;
			break;
		case 3:
			selectT = powerT;
			break;
		case 4:
			selectT = reachT;
			break;
		case 5:
			selectT = balanceT;
			break;
	}

	console.log(selectT);
	console.log(speedT);

	raidSpeed = coWidth*selectT[0];
	raidTech = selectT[1];
	raidReach = coWidth*selectT[2];
	raidHand = raidReach * selectT[3];
	doCatch = raidReach * selectT[4];
	siCatch = doCatch * 2;

	/*raider_img = loadImage('../media/raider.png');
	unti_img = loadImage('../media/unti.png');*/
	p1 = new raiderObj('red', raidReach, raidSpeed, p1controls) //レイダーの作成
	//アンティの作成
	p2 = new untiObj('blue', untiReach, duntiX-coWidth*0.3, duntiY+coWidth*0.01,1)
	p3 = new untiObj('blue', untiReach, duntiX-coWidth*0.2, duntiY-coWidth*0.01,2)
	p4 = new untiObj('blue', untiReach, duntiX-coWidth*0.1, duntiY-coWidth*0.015,3)
	pl5 = new untiObj('blue', untiReach, duntiX, duntiY-coWidth*0.02,4)
	p6 = new untiObj('blue', untiReach, duntiX+coWidth*0.1, duntiY-coWidth*0.015,5)
	p7 = new untiObj('blue', untiReach, duntiX+coWidth*0.2, duntiY-coWidth*0.01,6)
	p8 = new untiObj('blue', untiReach, duntiX+coWidth*0.3, duntiY+coWidth*0.01,7)

	scoreCount();
	//courtCount();

}

function draw(){
	background(255);

	//コートに色塗(青)
	fill(0,255,255);
	rect(0,0,coWidth,coDepth);
	//ロビーに色塗(赤)
	fill(255,102,153);
	rect(0,0,lobWidth,coDepth);
	rect(coWidth-lobWidth,0,coWidth,coDepth);

	//ロビーの開放(ロビーを青色に塗る)
	if(touchFlag == true){
		fill(0,255,255);
		rect(0,0,lobWidth,coDepth);
		rect(coWidth-lobWidth,0,coWidth,coDepth);
		stroke(0);
		line(lobWidth,0,lobWidth,coDepth);
		line(coWidth-lobWidth,0,coWidth-lobWidth,coDepth);
	}

	//コートラインを引く
	stroke(0);
	line(0,0,coWidth,0);
	line(0,0,0,coDepth);
	line(0,coDepth,coWidth,coDepth);
	line(coWidth,0,coWidth,coDepth);

	//ロビーラインを引く
	line(lobWidth,0,lobWidth,coDepth);
	line(coWidth-lobWidth,0,coWidth-lobWidth,coDepth);

	//ボークラインを引く
	line(lobWidth,coDepth-borkDepth,coWidth-lobWidth,coDepth-borkDepth);
	//ボーナスラインを引く
	line(lobWidth,coDepth-bonusDepth,coWidth-lobWidth,coDepth-bonusDepth);



	//レイダーとアンティを召喚
	p1.disp();
	p1.collide(p2);
	p1.collide(p3);
	p1.collide(p4);
	p1.collide(pl5);
	p1.collide(p6);
	p1.collide(p7);
	p1.collide(p8);

	if(courtFlag == true){
		if(cantFlag == true){
			text("カバディ", p1.x-20, p1.y-30);
		}
	}

	p2.disp();
	p2.collide(p1);
	p3.disp();
	p3.collide(p1);
	p4.disp();
	p4.collide(p1);
	pl5.disp();
	pl5.collide(p1);
	p6.disp();
	p6.collide(p1);
	p7.disp();
	p7.collide(p1);
	p8.disp();
	p8.collide(p1);
}

function raiderObj(color, sz, speed, controls){
	//レイダーの初期位置を決定
	this.x = coWidth/2
	this.y = liStart+coDepth-20

	this.angle = -1.55; //レイダーの初期姿勢を決定

	//手を記述するための変数
	this.linex;
	this.liney;
	this.linex2;
	this.liney2;
	//this.scalar = sz + raidHand; //手の長さを決定
	this.riHand = raidHand;
	this.leHand = raidHand;

	//各種パラメータの設定
	this.speed = speed; //移動速度
	this.swordSpeed = raidTech; //方向転換の速度
	this.d = sz; //大きさ
	this.color = color;
	//this.saveColor = color;


	//this.score = 0;
	this.hit = false
	this.gate = false;
	this.overlap = false;
	this.overlap2 = false;

	this.disp = function(){
			//move the player
			if(reachFlag == true){
				this.riHand = raidHand;
				this.leHand = raidHand;
			} //伸ばした手を元に戻す処理

			if( keyIsDown( controls[0] )){
				//上キーで向いている方に進む
				if(reachFlag == true){
					this.y += this.speed*sin(this.angle);
					this.x += this.speed*cos(this.angle);
					//console.log(sin(this.angle));
					//console.log(cos(this.angle));
				}//手を伸ばしている間は動けない
			}
			if( keyIsDown( controls[1] )){
				//右キーで右を向く
				//this.x += this.speed
				if(reachFlag == true){
					this.angle += this.swordSpeed ;
					//console.log(this.angle);
				}
			}
			if( keyIsDown( controls[2] )){
				//下キーでバックジャンプ
				//this.y += this.speed
				if(reachFlag == true){
					if(jumpFlag == true){
						this.y -= this.speed*sin(this.angle)*7;
						this.x -= this.speed*cos(this.angle)*7;
						jumpFlag = false;
						setTimeout(function(){
							jumpFlag = true;
						},500)
					}//連続使用不可の処理
				}
			}
			if( keyIsDown( controls[3] )){
			//左キーで左を向く
			//this.x -= this.speed
				if(reachFlag == true){
					this.angle -= this.swordSpeed ;
					//console.log(this.angle);
				}
			}
			if( keyIsDown( controls[4] )){
				//シフトキーで右タッチを入れる
				//score++; //デバッグ用
				if(reachFlag == true){
					this.riHand = raidHand * 4;
					reachFlag == false;
					setTimeout(function(){
						//this.scalar = sz + 3;
						reachFlag = true;
					},500)
				}
			}

			if( keyIsDown( controls[5] )){
				//スペースキーで左タッチを入れる
				//score++; //デバッグ用
				if(reachFlag == true){
					this.leHand = raidHand * 4;
					reachFlag == false;
					setTimeout(function(){
						//this.scalar = sz + 3;
						reachFlag = true;
					},500)
				}
			}

		/*//loop around the edges
		if(this.x < 0){
			this.x = width;
		}
		if(this.x > width){
			this.x = 0;
		}
		if(this.y < 0){
			this.y = height;
		}
		if (this.y > height){
			this.y = 0;
		}*/

		//draw the sword
		this.linex = this.x + cos(this.angle-0.6) * (sz +this.leHand);
		this.liney = this.y + sin(this.angle-0.6) * (sz +this.leHand);
		stroke(this.color);
		this.linex2 = this.x + cos(this.angle+0.6) * (sz +this.riHand);
		this.liney2 = this.y + sin(this.angle+0.6) * (sz +this.riHand);
		strokeWeight(1);
		stroke(this.color);
		line(this.x,this.y,this.linex,this.liney);
		line(this.x,this.y,this.linex2,this.liney2);

		//レイダーの記述
		noStroke();
		fill(this.color);
		ellipse(this.x,this.y,this.d,this.d);

		//ボーナスライン判定
		if(this.y < coDepth - bonusDepth + sz/3){
			if(bonusFlag == false){
				score++;
				scoreCount();
				bonusFlag = true;
			}
		}

		//コートイン判定
		if(this.y < liStart+coDepth-this.d){
				//console.log("start");
				if(timeFlag == false){
					timeFlag = true;
					setInterval(timeCount,1000);
				}
				courtFlag = true;
		}

		//コートアウト判定
		if(courtFlag==true){
			if(score > 0){
				if(this.y < this.d){
					location.href="failed.html?"+raidType;
				}else{
					if(this.y > liStart+coDepth-this.d){
						location.href="success.html?"+score+","+raidType;
					}
				}
			}else{
				if(this.y > liStart+coDepth-this.d || this.y < this.d){
					location.href="failed.html?"+raidType
				}
			}
			if(touchFlag == true){//タッチが入ったらロビーを開放
				if(this.x < this.d || this.x > coWidth-this.d){
					location.href="failed.html?"+raidType
				}
			}else{//タッチ無しならロビー侵入でアウト
				if(this.x < lobWidth+this.d || this.x > coWidth-lobWidth-this.d){
					location.href="failed.html?"+raidType
				}
			}
		}
		//draw the score
		//text(this.score,this.x-3,this.y-30)
	}

	//当たり判定の記述
	//捕まれたかを判定。得点の判定はアンティ側に記述
	this.collide = function(enemy){

		this.overlap = collideCircleCircle(this.x,this.y,this.d-siCatch,enemy.loc.x,enemy.loc.y,enemy.d) // are we overlapping with the enemy?
		this.overlap2 = collideCircleCircle(this.x,this.y,this.d-doCatch,enemy.loc.x,enemy.loc.y,enemy.d)

		if(this.overlap == true || doCatchnum > 1){
			location.href="failed.html?"+raidType;
		}

		if(this.overlap2 == false){
			doCatchnum = 0;
		}
	}

} // close raiderObj

function untiObj(color, sz, untiX, untiY, untiNum){
	this.x = untiX;
	this.y = untiY;
	this.num = untiNum;

	//アンティの動き用
	this.loc = createVector(this.x,this.y);
	var defPosi = createVector(untiX,untiY);
	var halfPosi = createVector(coWidth/2,untiY+Math.abs(untiX-coWidth/2));
	this.defFlag = true;

	/*this.linex;
	this.liney;
	this.speed = speed;
	this.swordSpeed = 0.05*/
	this.color = color;
	//this.saveColor = color;
	this.d = sz;
	this.angle = 0;
	//this.scalar = sz + 20;
	//this.score = 0;

	//当たり判定1
	this.gate = false;
	this.gate2 = false;
	this.overlap = false;
	this.overlap2 = false;
	this.hit = false;
	this.hit2 = false;

	this.disp = function(){
		//アンティの記述
		noStroke();
		fill(this.color);
		ellipse(this.loc.x,this.loc.y,this.d,this.d);

		//行動ロジック
		//レイダーが片側を攻めると反対側のアンティが真ん中に来る
		if(this.num < 4 && this.defFlag == true){
			if(p1.x > coWidth*0.6 && p1.y < coDepth/2){
				var halfDir = p5.Vector.sub(halfPosi, this.loc);
				var magn = p5.Vector.mag(halfDir);
				halfDir.normalize();
				this.loc.add(halfDir);
			}else{//元の守備位置に戻る
				var defDir = p5.Vector.sub(defPosi, this.loc);
				var magn = p5.Vector.mag(defDir);
				defDir.normalize();
				this.loc.add(defDir);
			}
		}
		if(this.num > 4 && this.defFlag == true){
				if(p1.x < coWidth*0.4 && p1.y < coDepth/2){
					var halfDir = p5.Vector.sub(halfPosi, this.loc);
					halfDir.normalize();
					this.loc.add(halfDir);
				}else{
					var defDir = p5.Vector.sub(defPosi, this.loc);
					defDir.normalize();
					this.loc.add(defDir);
				}
		}
		//触られたアンティはレイダーにただ向かっていく
		if(this.color == 'black'){
			this.defFlag = false;
			var raidloc = createVector(p1.x,p1.y);
			console.log(raidloc);
			var untiDir = p5.Vector.sub(raidloc, this.loc);
			untiDir.normalize();
			untiDir.mult(0.5);
			this.loc.add(untiDir);
		}
		//レイダーとの距離が近づくとアンティが向かってくる

		this.collide = function(enemy){
			this.overlap = collideCircleCircle(this.loc.x,this.loc.y,this.d,enemy.x,enemy.y,enemy.d) // are we overlapping with the enemy?
			this.overlap2 = collideCircleCircle(this.loc.x,this.loc.y,this.d,enemy.x,enemy.y,enemy.d-doCatch)
			this.hit = collideLineCircle(enemy.x, enemy.y, enemy.linex,enemy.liney,this.loc.x, this.loc.y, this.d);
			this.hit2 = collideLineCircle(enemy.x, enemy.y, enemy.linex2,enemy.liney2,this.loc.x, this.loc.y, this.d); //sword hitting the other player?
			if(this.gate == false){
				if(this.overlap == true || this.hit == true || this.hit2 == true){
					score++;
					scoreCount();
					this.color = 'black';
					this.gate = true;
					touchFlag = true;
				}
			}
			if(this.overlap2 == true){
				if(this.gate2 == false){
					doCatchnum += 1;
					this.gate2 = true;
				}
			}
			if(this.overlap2 == false){
				this.gate2 = false;
			}
		}
	}
} // close untiObj

function timeCount(){
	raidTime --;
	target = document.getElementById("timer");
	target.innerHTML = "残り時間:"+raidTime+"秒";
	if(raidTime == 0){
		if(score >= 1){
			if(this.y > liStart+coDepth-this.d){
				location.href="success.html?"+score+","+raidType;
			}else{
				location.href="failed.html?"+raidType
			}
		}else{
			location.href="failed.html?"+raidType
		}
	}
	//キャント表示用
	if(raidTime%2 == 0){
		cantFlag = true;
	}else{
		cantFlag = false;
	}
}

function scoreCount(){
	target = document.getElementById("scoreboard");
	target.innerHTML = "帰還時のスコア:"+score+"点";
}

/*function courtCount(){
	console.log(raiderObj.y);
	if(raiderObj.y == liStart+coDepth-raiderObj.raidReach){
		//if(countFlag == true){
			console.log(start);
			setInterval(timeCount,1000);
			courtFlag = true;
		//}
	}*/

//setInterval(timeCount,1000);
