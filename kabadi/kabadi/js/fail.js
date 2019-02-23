var raidType = location.search;

function newGame(){
  raidType = raidType.substring(1);
  location.href = "game.html?"+raidType;
}
