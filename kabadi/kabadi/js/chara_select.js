var type = 0;

function selectboxgraph() {
  target = document.getElementById("chara_status_graph");
  selindex = document.chara_select_form.chara_list.selectedIndex;
  switch (selindex) {
    case 0:
      target.innerHTML = '<img src="../media/speed_graph.png" width="420" height="270" alt="スピードタイプの能力値">';
      type = 1;
      break;
    case 1:
      target.innerHTML = '<img src="../media/tech_graph.png" width="420" height="270" alt="テクニカルタイプの能力値">';
      type = 2;
      break;
    case 2:
      target.innerHTML = '<img src="../media/power_graph.png" width="420" height="270" alt="パワータイプの能力値">';
      type = 3;
      break;
    case 3:
      target.innerHTML = '<img src="../media/reach_graph.png" width="420" height="270" alt="リーチタイプの能力値">';
      type = 4;
      break;
    case 4:
      target.innerHTML = '<img src="../media/balance_graph.png" width="420" height="270" alt="バランスタイプの能力値">';
      type = 5;
      break;
  }
}

function selectType(){
  if(type == 0){
    alert("プレイヤータイプを選択してください");
  }else{
    location.href="game.html?"+type;
  }
}
