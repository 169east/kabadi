var score = location.search;
var scoreArray = ["",""];
var raidType = "0";

function scoreDisp(){
  scoreArray=score.substring(1).split(',');
  score = scoreArray[0];
  raidType = scoreArray[1];
  target = document.getElementById("score_notice");
  target.innerHTML ="レイド成功おめでとう！！"+score+"点獲得！！";
}

function newGame(){
  location.href = "game.html?"+raidType;
}
