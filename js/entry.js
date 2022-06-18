//エントリー画面を生成する関数を記載したファイル
//プレイヤー名を入力するテキストボックスを動的に生成する

CreateEntryForm = function(N){
  console.log("エントリー手続きを開始します");

  //参加プレイヤー人数の決定ボタンを無効にする
  document.getElementById("decideNumOfPlayer").setAttribute("disabled", true);
	document.getElementById("decideNumOfPlayer").style.color = "White";

  //参加プレイヤー人数の入力部を無効にする
  document.getElementById("numOfPlayer").setAttribute("disabled", true);
  document.getElementById("numOfPlayer").style.color = "gray";


  //プレイヤーの戦績情報を格納する配列、recordArrayに、
  //[エントリーNo,プレイヤー名,試合数,勝利数,敗北数]×プレイヤー数を追加し、２次元配列にする

  for (var i = 0; i < N; i++) {
    recordArray[i] = new Array(5);
    recordArray[i][0] = i + 1 ; //エントリーNo.を格納
    recordArray[i][2] = 0 ;     //試合数を格納（０で初期化）
    recordArray[i][3] = 0 ;     //勝利数を格納（０で初期化）
    recordArray[i][4] = 0 ;     //敗北数を格納（０で初期化）
  }

  const h2 = document.createElement("h2");
  const message = document.createTextNode("プレイヤー名を入力してください(全角20文字以内)");
  h2.appendChild(message);
  entryform.appendChild(h2);


  //人数の数だけ、エントリーフォームを生成
  for(i=1; i<=N; i++){
    const label_element = document.createElement("label");
    const text_element = document.createElement("input");
    const entryform = document.getElementById('entryform');

    label_element.textContent = "プレイヤー" + i + ": " ;
    text_element.id = "player" + i;
    text_element.name = "name" + i; //required minlength="1" maxlength="20" size="20"
    text_element.setAttribute("type","text");
    text_element.setAttribute("minLength","1");
    text_element.setAttribute("maxLength","20");
    text_element.setAttribute("size","35");

    //プレイヤーNo.と入力フォームを、htmlのarticle(id=entryform)に追加
    entryform.appendChild(label_element);
    entryform.appendChild(text_element);

    //改行をhtmlのarticle(id=entryform)に追加
    const p = document.createElement("p");
    entryform.appendChild(p);
  }



    //警告メッセージ欄をhtmlのarticle(id=entryform)に追加
    const p2 = document.createElement("p");
    p2.id = "_alert2";
    p2.style.color = "red";
    p2.innerHTML = "";
    entryform.appendChild(p2);

}
