//本ファイルで、
//・対戦組み合わせを決定する関数　create_Matching()
//・対戦組み合わせの結果をもとに、ブラウザに表示する関数 renew_Matching()
//・戦績を更新する関数 updateRecordArray()
//・スイスドローに基づいて次の対戦組み合わせを決定する関数



//参加人数、および偶数か奇数かに応じて、最初の対戦の組み合わせを表示する
create_Matching = function(){

  //エントリーフォームを非表示にする
  var elem = document.getElementById("entryfield");
  elem.hidden = true;

  //対戦表を格納するフィールドを可視表示する
  var elem = document.getElementById("matchingArray");
  elem.hidden = false;

N = player_N;

//参加者が奇数なら、最後の一人をBye欄に振り分けるため、減算する。
if(_Bye == true){
  N = player_N - 1;
}

//人数の数だけラジオボタン、名前欄、戦績を生成、
//Nが奇数なら左側ラジオボタンと名前・戦績、
//Nが偶数なら"VS文字"、名前・戦績、右側ラジオボタンを生成
//ラジオボタンは、勝者側のボタンONにすることで、２戦目以降の成績管理、組み合わせ決定に用いる

//この時点でNは偶数
//必要な対戦カード数を可視表示する
  for(i=1; i<=(N/2); i++){
    var elem = document.getElementById("match" + i);
    elem.hidden = false;
  }

  //参加者が奇数なら、ブラウザの不戦勝者エリアを表示
  if(_Bye == true){
    var elem = document.getElementById("byePlayer");
    elem.hidden = false;
  }

  //ラジオボタンの説明文を表示
  var elem = document.getElementById("radioBottonExplain");
  elem.hidden = false;

  //戦績を更新する関数
  renew_Matching();
}


//html内に表示する戦績を更新する関数
renew_Matching = function(){
  //ex)player_N = 7のとき randoms = [3,2,6,5,7,1, 4] //N=7-1 → N=6(配列の最後はBye,不戦勝に振り分ける)

  //ランダマイザの内容を先頭から追っていき、数字に応じて、
  //プレイヤー名と戦績をしかるべき場所に格納する
  //1:match1_Aside
  //2:match1_Bside
  //3:match2_Aside
  //4:match2_Bside   ...

  //ランダマイザの内部の数字が i のとき、recordArray[i-1][1]がプレイヤー名,recordArray[i-1][3]が勝利数...
  //(i % 2)が 1 (つまり i が奇数)のとき、Aサイド　偶数のとき、Bサイド
  //(i / 2)の端数切り上げが、マッチ数  端数切り上げはMath.ceil(<数値>)なので、Math.ceil(i/2)

  //ランダマイザの値が３なら、格納先は"match" + Math.ceil(i/2) + "_" + X + "side" (Xはi%2が奇数なら"A"、偶数なら"B")
  //格納すべき内容は、recordArray[i-1][] となる

  //試合数は全員一律に roundCount-1 試合となる

  for(i=1;i<=N;i++){

    //ランダマイザ配列に格納されている番号を格納する変数 ramdomizerNumber を宣言
    let ramdomizerNumber = randoms[i-1];
    // console.log(ramdomizerNumber);

    //マッチ数を判断する変数を宣言
    matchCount = Math.ceil(i/2);

    let x;  //Aサイド or Bサイドを判定し、格納する変数
    if((i % 2) == 1){
      x = "A";
    }else if((i % 2) == 0){
      x = "B";
    }

    //プレイヤー名、戦績を含めた文字列を宣言（後で、同名のidを持つHTMLの要素内に、戦績が格納される）
    let matchAndSide = "match" + matchCount + "_" + x + "side";
    let nameid = matchAndSide + "_name";
    let winid = matchAndSide + "_win";
    let loseid = matchAndSide + "_lose";
    let noid = matchAndSide + "_no."; //No.のid という意味で "noid" ("id"という単語が予約語のため)
    let roundid = matchAndSide + "_totalRound";

    //     console.log(playersNameId); //プレイヤー名を格納するテキスト欄のid
    // console.log(matchAndSide);

    //ランダマイザの数値に則り、プレイヤー名、勝利数、敗北数を取得
    let playersNo = recordArray[ramdomizerNumber -1][0];  //エントリーNo.
    let playersName = recordArray[ramdomizerNumber - 1][1]; //プレイヤー名
    let playersRound = recordArray[ramdomizerNumber - 1][2]; //試合数
    let playersWin = recordArray[ramdomizerNumber - 1][3];  //勝利数
    let playersLose = recordArray[ramdomizerNumber -1][4];  //敗北数


    //console.log("name:" + playersName + ",win:" + playersWin + ",lose:" + playersLose);

    //結果を格納すべきHTML要素のidは、
    //match1_Aside_name
    //match1_Aside_win
    //match1_Aside_lose

    var elem = document.getElementById(nameid);
    elem.innerHTML = playersName;

    var elem = document.getElementById(winid);
    elem.innerHTML = playersWin;

    var elem = document.getElementById(loseid);
    elem.innerHTML = playersLose;

    var elem = document.getElementById(noid);
    elem.innerHTML = playersNo;

    var elem = document.getElementById(roundid);
    elem.innerHTML = playersRound;
  }



  //参加プレイヤーが奇数の場合、Bye（不戦勝）が発生するので、
  //配列 randomsの最後の要素を、Bye欄に格納する
  //randomsの最後の要素は、randoms[player_N - 1]

  if(_Bye == true){
    // console.log("player_N:" + player_N);
    let lastElement = randoms[player_N - 1]; //配列の最後の番号 lastElement を宣言

    let playersNo = recordArray[lastElement - 1][0];  //エントリーNo
    let playersName = recordArray[lastElement - 1][1]; //プレイヤー名
    let playersRound = recordArray[lastElement - 1][2]; //試合数
    let playersWin = recordArray[lastElement - 1][3];  //勝利数
    let playersLose = recordArray[lastElement - 1][4];  //敗北数


    // console.log("name:" + playersName + ",win:" + playersWin + ",lose:" + playersLose);

    var elem = document.getElementById("bye_player_name");
    elem.innerHTML = playersName;

    var elem = document.getElementById("bye_player_win");
    elem.innerHTML = playersWin;

    var elem = document.getElementById("bye_player_lose");
    elem.innerHTML = playersLose;

    var elem = document.getElementById("bye_no.");
    elem.innerHTML = playersNo;

    var elem = document.getElementById("bye_player_totalRound");
    elem.innerHTML = playersRound;
  }


  //試合のラウンド数を更新する
  var elem = document.getElementById("roundCount");
  elem.innerHTML = "Round " + roundCount ;

  //次の試合に進むボタンを表示する
  let nextGameCount = roundCount + 1; //次が何試合目かを格納する変数 nextGameCount を宣言
  var elem = document.getElementById("goToNextGame");
  elem.hidden = false;
  elem.innerHTML = nextGameCount + "回戦に進む";

  //再抽選ボタンを表示する
  var elem = document.getElementById("lotteryAgain");
  elem.hidden = false;

}

//メモ
// <input type="radio" name="match1" id="match1_Aside">
// <th id="match1_Aside_name">Asan</th><td>  (3戦2勝1敗)  </td><td name="virsus">VS<td>
// <th id="match1_Bside_name">Bsan</th><td>  (3戦1勝2敗)  </td>
// <input type="radio" name="match1" id="match1_Bside">

//=========================================================================================
//create_NextMatchingは、二回戦目以降の組み合わせを決定するための関数 (lottery.js から呼び出される)
  //試合の数だけ、for文を回す。
  //勝敗を示すラジオボタンが未記入の箇所があれば、警告を出す。
  //問題が無ければ次の処理に進む。

create_NextMatching = function(){
  //すべての試合で、勝敗を示すラジオボタンが点灯しているかを判断する変数。初期値０
  let radioBottonCheck = 0;

  for(i=1;i<=matchCount;i++){
    //ラジオボタンのnameidを取得 例：match2_Bside
    let botton_id;
    botton_id = "match" + i + "_" + "Aside";
    var elem_A = document.getElementById(botton_id);  //Aサイド
    var getChecked_A = elem_A.checked;

    botton_id = "match" + i + "_" + "Bside";
    var elem_B = document.getElementById(botton_id);  //Bサイド
    var getChecked_B = elem_B.checked;

    //Aサイド、Bサイド、いずれかのラジオボタンが点灯していればインクリメント
    if((getChecked_A) || (getChecked_B)){
      radioBottonCheck += 1;
    }
  }

  if(radioBottonCheck >= matchCount){
    //ラジオボタンの点灯数が、試合数以上であれば、警告文を消して、次の処理に進む
    _alert.innerHTML = "";
    console.log("次の試合に進みます")
    updateRecordArray();  //戦績を更新するための関数。後述

  }else{
    _alert.innerHTML = "勝敗が未記入の箇所が" + (matchCount - radioBottonCheck) + "箇所あります";
  }
}

//ラジオボタンの状況に応じて、戦績を更新する関数
updateRecordArray = function(){
  let playerNumber_Aside; //AサイドにいるプレイヤーのエントリーNoを格納する変数
  let playerNumber_Bside; //BサイドにいるプレイヤーのエントリーNoを格納する変数
  let playerNumber_Bye; //Bye欄にいるプレイヤーのエントリーNoを格納する変数

  //ラジオボタンの記入に問題がなければ、改めて試合の数だけ、for文を回す。
  //match1から順番に、Aside,BsideのエントリーNo欄に格納されている数字をチェックし、
  //Aサイドのラジオボタンの状況に応じて、各プレイヤーの勝利数、または敗北数をインクリメントする
  //その後、試合数を一律にインクリメントする。

  //Bye欄のプレイヤーは勝利扱いとし、勝利数、試合数をインクリメントする。

  for(i=1;i<=matchCount;i++){
    var elem_A = document.getElementById("match" + i + "_Aside_no.");
    var elem_B = document.getElementById("match" + i + "_Bside_no.");

    playerNumber_Aside = elem_A.innerHTML;
    playerNumber_Bside = elem_B.innerHTML;

    //Aサイドのボタン状況を確認
    botton_id = "match" + i + "_" + "Aside";
    var elem = document.getElementById(botton_id);
    var getChecked_A = elem.checked;

    //Aサイドにチェックが入っていたら、Aの勝ち。そうでなければ Bの勝ち
    if(getChecked_A){
      recordArray[playerNumber_Aside - 1][3] += 1 ; //Aサイドのプレイヤーの勝利数 +1
      recordArray[playerNumber_Bside - 1][4] += 1 ; //Bサイドのプレイヤーの敗北数 +1
    }else{
      recordArray[playerNumber_Aside - 1][4] += 1 ; //Aサイドのプレイヤーの敗北数 +1
      recordArray[playerNumber_Bside - 1][3] += 1 ; //Bサイドのプレイヤーの勝利数 +1
    }
    //その後、お互いの試合数を +1 する
    recordArray[playerNumber_Aside - 1][2] += 1 ; //Aサイドのプレイヤーの試合数 +1
    recordArray[playerNumber_Bside - 1][2] += 1 ; //Bサイドのプレイヤーの試合数 +1
  }

  //Byeが存在する場合は、そのプレイヤーのエントリー番号を抽出し、対戦数、勝利数をそれぞれ +1 する
  if(_Bye == true){
    var elem_Bye = document.getElementById("bye_no.");
    playerNumber_Bye = elem_Bye.innerHTML;
    recordArray[playerNumber_Bye - 1][2] += 1 ; //Byeプレイヤーの試合数 +1
    recordArray[playerNumber_Bye - 1][3] += 1 ; //Byeプレイヤーの試合数 +1
  }

  var elem = document.getElementById("match1_Bside_no.");
  //console.log("<デバッグ用>試合1のBサイドの人のエントリーNoは" + elem.innerHTML);
  var elem = document.getElementById("bye_no.");
  //console.log("<デバッグ用>Byeの人のエントリーNoは" + elem.innerHTML);

  console.log(recordArray);


  //次の試合の組み合わせを格納する配列、rotationの内容をクリア
  rotation = [];

  //スイスドロー抽選
  swithDraw();

  console.log(rotation);

  //ランダマイザの内容を初期化
  randoms = [];

  //ランダマイザに、スイスドローの法則に則って整列した、エントリー番号を格納
  randoms = rotation;

  //配列rotationを初期化
  rotation = [];
  //console.log(rotation);


  //先頭の２名から順番に、新たな対戦組み合わせとする。
  //まず、ラウンド数をインクリメント
  roundCount += 1;
  console.log("roundcount:" + roundCount);



  //既に対戦済の組み合わせがあれば、警告を表示
  alert_dejaVu();

  //ラジオボタンを空白の状態に戻す
  for(i=1;i<=matchCount;i++){
    //ラジオボタンのnameidを取得 例：match2_Bside
    let botton_id;
    botton_id = "match" + i + "_" + "Aside";
    var elem_A = document.getElementById(botton_id);  //Aサイド
    elem_A.checked = false;

    botton_id = "match" + i + "_" + "Bside";
    var elem_B = document.getElementById(botton_id);  //Bサイド
    elem_B.checked = false;
  }
}

//スイスドローに基づき、対戦順を決める関数。
swithDraw = function(){
  //勝利数の多いプレイヤーのエントリーNo.を抜き出して、それらをランダムにした配列を返し、
  //新しい配列の先頭から順番に格納していく
  //これを、試合の経過数だけ繰り返す。
  for (let i = roundCount; i >= 0; i--){
    //勝利数が i のプレイヤーのエントリー番号を抜き出し、ランダムにシャッフルして返す
    //console.log("↓勝利数が" + i + "のプレイヤーのエントリー番号一覧（シャッフル済）")
    let temp_array = (pickUpNumOfWin(i)) //配列 pickUpNumOfWin(i) を一時的に格納する変数 temp_array
    //console.log(temp_array);
    //console.log("その配列の要素数は" + pickUpNumOfWin(i).length); //上の配列の長さ

    for(let j=0;j<pickUpNumOfWin(i).length;j++){
      //console.log("push:" + temp_array[j])
      rotation.push(temp_array[j]); //配列 rotation の先頭から順番に格納
    }
  }
}


//勝利数がNのプレイヤーのエントリーNoを抽出し、シャッフルしたあと、配列として返す
function pickUpNumOfWin(N){
  let temp_random = [];

  for(i=0;i<player_N;i++){
    if(recordArray[i][3] == N){
      temp_random.push(recordArray[i][0]);
    }
    //temp_randomをシャッフル
    arrayShuffle(temp_random);
  }
  return temp_random;
}

//引数として渡した配列の内容をシャッフルする関数
function arrayShuffle(array) {
  for(var i = (array.length - 1); 0 < i; i--){

    // 0〜(i+1)の範囲で値を取得
    var r = Math.floor(Math.random() * (i + 1));

    // 要素の並び替えを実行
    var tmp = array[i];
    array[i] = array[r];
    array[r] = tmp;
  }
  return array;
}
