function selectboxgraph() {
  target = document.getElementById("chara_status_graph");
  selindex = document.chara_select_form.chara_list.selectedIndex;
  switch (selindex) {
    case 0:
      target.innerHTML = '<img src="../media/speed_graph.png" width="420" height="270" alt="スピードタイプの能力値">';
      break;
    case 1:
      target.innerHTML = '<img src="../media/tech_graph.png" width="420" height="270" alt="テクニカルタイプの能力値">';
      break;
    case 2:
      target.innerHTML = '<img src="../media/power_graph.png" width="420" height="270" alt="パワータイプの能力値">';
      break;
    case 3:
      target.innerHTML = '<img src="../media/reach_graph.png" width="420" height="270" alt="リーチタイプの能力値">';
      break;
    case 4:
      target.innerHTML = '<img src="../media/balance_graph.png" width="420" height="270" alt="バランスタイプの能力値">';
      break;
  }
}
