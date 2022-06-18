

//ページ冒頭で入力された、参加人数が適正かどうかを判断するファイル
//特に問題がなければ、参加人数(player_N)を確定させ、entry.js内の関数によって、エントリーフォームを生成する

//入力された人数が適正かどうかを判断する関数
JudgeNumber = function(N){
  let alertMessage = "入力値が不正です";
  if(Number.isInteger(N)){
    alertMessage = "";
  }
  if((N >= 2) && (N <= 16)){
    alertMessage = "";
  }
  return alertMessage;
}

//人数決定ボタンを押したときの挙動
document.getElementById("decideNumOfPlayer").addEventListener("click",function(){
  const val = document.getElementById("numOfPlayer");

  //冒頭の関数で数値をチェック(不正な値なら警告メッセージが出る)
  _alert.innerHTML = JudgeNumber(val.value);

  //戻り値が "" (=問題なし)なら、次の処理（エントリーフォーム作成）に進む
  if(_alert.innerHTML == ""){
    player_N_check = val.value;
    console.log(player_N_check);
    console.log("正常な数値なので、次の処理に進みます");

    //関数　player_Nの回数だけ、エントリーフォームを生成する
    CreateEntryForm(player_N_check);  //entry.js の内容

    //対戦済かどうかを管理する二次元配列を生成
    CreateDejaVuList(player_N_check); //dejavu.jsの内容

    //「一回戦の抽選」ボタンのhiddenを解除し、ブラウザに表示する
    var elem = document.getElementById("lottery");
    elem.hidden = false;
  }

},false);
