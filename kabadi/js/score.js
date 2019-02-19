var score = location.search;
var raidType = 0;

function scoreDisp(){
  score=score.substring(1).split(',');
  console.log(score);
  score = score[0];
  console.log(score);
  raidType = score[1];
  console.log(score[1]);
  target = document.getElementById("score_notice");
  target.innerHTML ="レイド成功おめでとう！！"+score+"点獲得！！";
}

function newGame(){
  location.href = "game.html?"+raidType;
}
