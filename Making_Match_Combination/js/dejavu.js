//このファイルでは、マッチングした組み合わせが、対戦済かどうかを判断する関数を記述

//対戦済かどうかを判断する二次元配列 dejaVuList の内容を、初期設定する関数
CreateDejaVuList = function(N){
  for (var i = 0; i < N; i++) {
    dejaVuList[i] = new Array();
    for(var j = 0; j < N; j++){
      //初期値は"0"　（マッチングしたら、その都度 "1"に更新する）
      dejaVuList[i].push("0");
    }
  }

  //エントリーNo.が同じプレイヤー同士は、マッチングしようが無いので、初期値を"X"とする
  for (var k = 0; k < N; k++) {
    dejaVuList[k][k] = "X";
  }

  //console.log(dejaVuList);
}


//対戦済の組み合わせに応じて、配列 dejaVuList の内容を更新する関数
renew_dejaVuList = function(){
  //マッチ i のAサイド、BサイドのプレイヤーのエントリーNo.を取得し、
  //AサイドのエントリーNo.が　"3"、BサイドのエントリーNo.が "6" だった場合、
  //dejaVuList[2][5],dejaVuList[5][2]の内容を "1"にする
  //一般化すると、
  //AサイドのエントリーNo.が　"x"、BサイドのエントリーNo.が "y" だった場合、
  //dejaVuList[x-1][y-1],dejaVuList[y-1][x-1]の内容を"1"にする

  for(i=1;i<=matchCount;i++){
    //プレイヤーのエントリーnoのidを取得 例：match8_Aside_no.
    let player_no_id;
    player_no_id = "match" + i + "_" + "Aside_no.";
    var elem_A = document.getElementById(player_no_id);  //Aサイド
    let player_no_A = elem_A.innerHTML;

    player_no_id = "match" + i + "_" + "Bside_no.";
    var elem_B = document.getElementById(player_no_id);  //Bサイド
    let player_no_B = elem_B.innerHTML;

    dejaVuList[player_no_A - 1][player_no_B - 1] = "1" ;
    dejaVuList[player_no_B - 1][player_no_A - 1] = "1" ;
  }
}


//マッチングした際、もしも過去に対戦履歴があった場合、注意喚起を行う
alert_dejaVu = function(){
  //マッチ i のAサイド、BサイドのプレイヤーのエントリーNo.を取得する
  //AサイドのエントリーNo.が　"x"、BサイドのエントリーNo.が "y" のとき、
  //もし、dejaVuList[x-1][y-1]の内容が "1"であれば、
  //idが"match" + i + "_played"のHTMLを "！対戦済み！"にする。
  //そうでなければ、空欄 "" にする。

  for(i=1;i<=matchCount;i++){
    //プレイヤーのエントリーnoのidを取得 例：match8_Aside_no.
    let player_no_id;
    player_no_id = "match" + i + "_" + "Aside_no.";
    let deja_A = document.getElementById(player_no_id);  //Aサイド
    let player_no_A = deja_A.innerHTML;

    player_no_id = "match" + i + "_" + "Bside_no.";
    let deja_B = document.getElementById(player_no_id);  //Bサイド
    let player_no_B = deja_B.innerHTML;

    let match_played_id = "match" + i + "_played";
    let matchAlert = document.getElementById(match_played_id);  //マッチ1の警告欄

    let dejaVu_Point = dejaVuList[player_no_A - 1][player_no_B - 1];

    //console.log("AサイドのプレイヤーNo.は" + player_no_A + "、BサイドのプレイヤーNo.は" + player_no_B);
    //console.log("dejaVuList配列に格納されている値は、"+ dejaVu_Point);

    if(dejaVu_Point == "1"){
      matchAlert.innerHTML = "！対戦済み！";
      //console.log(player_no_A + "と" + player_no_B + "は、対戦済み");
    }else if(dejaVu_Point == "0"){
      matchAlert.innerHTML = "";
      //console.log(player_no_A + "と" + player_no_B + "は、未対戦");
    }
  }
}
