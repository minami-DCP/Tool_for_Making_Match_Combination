// グローバル変数を格納するファイル


//プレイヤーの戦績情報を格納する配列、recordArrayを生成
var recordArray = new Array();

//対戦順を格納する配列、rotationを生成 //ひょっとしたら使わないかも
var rotation = new Array();

//現在のラウンド数を格納する変数（初期値１）
var roundCount = 1;


//プレイヤー人数を格納する変数、recordArrayを生成
var player_N ;

//ラウンド毎に発生する試合数
var matchCount ;

var _Bye = new Boolean(false);  //参加者が奇数かどうかを判断する変数。初期値は falseで、不戦勝(Bye)が発生する場合は、trueにする

//ランダマイザを格納するための配列
var randoms = [];

// dejaVuList：マッチングしたプレイヤーが、過去に対戦したことがあるかどうかのデータを格納する２次元配列
var dejaVuList = new Array();
