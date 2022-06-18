//本コードには、抽選に関するボタンを押したときの挙動を記述
//マッチング結果を生成するアルゴリズムは、createMatching.jsに記載

//--↓「１回戦の抽選」ボタンを押した時の挙動-------------------------------------------------------------------
document.getElementById("lottery").addEventListener("click",function(){

  //名前の重複判定用の配列を生成
  let checkOverlap = new Array();

  //プレイヤー名に空欄や重複がないかどうかをチェック（問題があれば警告を表示）
  for(i=1;i<=player_N_check;i++){
    _alert2.innerHTML = "";
    val = "player" + i;
    //空欄を判定
    if(document.getElementById(val).value == ""){
      _alert2.innerHTML = "空欄の箇所があります";
      break;
    //重複を判定
    }else if(checkOverlap.includes(document.getElementById(val).value)){
      _alert2.innerHTML = "プレイヤー名の重複があります";
      console.log(checkOverlap);
      break;

    //問題が無ければ、プレイヤー名を配列に格納（問題が発生した時点でbreakし、処理がそこで止まる）
    }else{
      recordArray[i-1][1] = document.getElementById(val).value ;  //プレイヤー名を配列recordArrayの２番目に格納
      checkOverlap.push(document.getElementById(val).value);
    }
  }

  //問題がなければ、抽選に移行
   if(_alert2.innerHTML == ""){
     console.log("↓この内容で登録されました");
     console.log(recordArray);
     console.log("抽選を行います");

     //参加人数player_Nの数値を確定
     player_N = player_N_check;

     //ランダマイザ---------------------------------------------
       /** 重複チェック用配列 */
       //var randoms = []; ※ main.jsに移動
       /** 最小値と最大値 */
       var min = 1, max = player_N;

       /** 重複チェックしながら乱数作成 */
       for(i = min; i <= max; i++){
         while(true){
           var tmp = intRandom(min, max);
           if(!randoms.includes(tmp)){
             randoms.push(tmp);
             break;
           }
         }
       }

       /** min以上max以下の整数値の乱数を返す */
       function intRandom(min, max){
         return Math.floor( Math.random() * (max - min + 1)) + min;
       }
     //ランダマイザここまで---------------------------------------------
      console.log("↓一回目のランダム抽選結果の配列(randoms),0スタート配列")
      console.log(randoms);


     //参加者が奇数であれば、不戦勝が発生するので、_Byeをtrueにする
     if((player_N % 2) == 1){
       _Bye = true;

     }

    //一回目の抽選結果を生成する関数
    //createMatching.jsに記載
    create_Matching();
    }

  // １．空欄があれば警告する
  // ２．入力された内容をもとに、エントリーNo.,名前、試合数、勝利数、敗北数のクラスを生成
  // ３．参加者が奇数であればBye[不戦勝]を追加する
  // ４．全員一律にシャッフルし、別の画面で、対戦組み合わせを表示する。

},false);


//--↓「N回戦に進む」ボタンを押した時の挙動-------------------------------------------------------------------
document.getElementById("goToNextGame").addEventListener("click",function(){

  //現在の対戦組み合わせに基づき、配列 dejaVuListを更新する
  renew_dejaVuList();
  console.log("↓更新されたdejaVuList");
  console.log(dejaVuList);
  //

  //２試合目以降の抽選結果を生成する関数
  //初戦と同じく、createMatching.jsに記載
  create_NextMatching();

  

},false);


//--↓「再抽選」ボタンを押した時の挙動-------------------------------------------------------------------
document.getElementById("lotteryAgain").addEventListener("click",function(){
  //スイスドローをもう一度やり直す
  swithDraw();
  //ランダマイザの内容を初期化
  randoms = [];
  //ランダマイザに、スイスドローの法則に則って整列した、エントリー番号を格納
  randoms = rotation;
  //配列rotationを初期化
  rotation = [];

  //関数　renew_Matching を部分的に行う

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

    //console.log(playersNameId); //プレイヤー名を格納するテキスト欄のid
    // console.log(matchAndSide);

    //ランダマイザの数値に則り、プレイヤー名、勝利数、敗北数を取得
    let playersNo = recordArray[ramdomizerNumber -1][0];  //エントリーNo.
    let playersName = recordArray[ramdomizerNumber - 1][1]; //プレイヤー名
    let playersRound = recordArray[ramdomizerNumber - 1][2]; //試合数
    let playersWin = recordArray[ramdomizerNumber - 1][3];  //勝利数
    let playersLose = recordArray[ramdomizerNumber -1][4];  //敗北数

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

  //既に対戦済の組み合わせがあれば、警告を表示
  alert_dejaVu();

},false);
