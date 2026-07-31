/*
  チャッピー＆サリー
  私にもどる対話ナビ用スクリプト
*/


/* =========================
   タロット画像の場所
========================= */

const tarotImageBase =
  "https://raw.githubusercontent.com/Chappy-Sally/chappy-sally-images/main/tarot/";


/* =========================
   カード画像ファイル
========================= */

const cardFiles = [
  "00_The_Fool.png",
  "01_The_Magician.png",
  "02_The_High_Priestess.png",
  "03_The_Empress.png",
  "04_The_Emperor.png",
  "05_The_Hierophant.png",
  "06_The_Lovers.png",
  "07_The_Chariot.png",
  "08_Strength.png",
  "09_The_Hermit.png",
  "10_Wheel_of_Fortune.png",
  "11_Justice.png",
  "12_The_Hanged_Man.png",
  "13_Death.png",
  "14_Temperance.png",
  "15_The_Devil.png",
  "16_The_Tower.png",
  "17_The_Star.png",
  "18_The_Moon.png",
  "19_The_Sun.png",
  "20_Judgement.png",
  "21_The_World.png",
  "22_Compass.png"
];


/* =========================
   カード名
========================= */

const cardNames = {
  "00_The_Fool.png":
    "00 愚者（The Fool）",

  "01_The_Magician.png":
    "01 魔術師（The Magician）",

  "02_The_High_Priestess.png":
    "02 女教皇（The High Priestess）",

  "03_The_Empress.png":
    "03 女帝（The Empress）",

  "04_The_Emperor.png":
    "04 皇帝（The Emperor）",

  "05_The_Hierophant.png":
    "05 教皇（The Hierophant）",

  "06_The_Lovers.png":
    "06 恋人（The Lovers）",

  "07_The_Chariot.png":
    "07 戦車（The Chariot）",

  "08_Strength.png":
    "08 力（Strength）",

  "09_The_Hermit.png":
    "09 隠者（The Hermit）",

  "10_Wheel_of_Fortune.png":
    "10 運命の輪（Wheel of Fortune）",

  "11_Justice.png":
    "11 正義（Justice）",

  "12_The_Hanged_Man.png":
    "12 吊るされた男（The Hanged Man）",

  "13_Death.png":
    "13 死神（Death）",

  "14_Temperance.png":
    "14 節制（Temperance）",

  "15_The_Devil.png":
    "15 悪魔（The Devil）",

  "16_The_Tower.png":
    "16 塔（The Tower）",

  "17_The_Star.png":
    "17 星（The Star）",

  "18_The_Moon.png":
    "18 月（The Moon）",

  "19_The_Sun.png":
    "19 太陽（The Sun）",

  "20_Judgement.png":
    "20 審判（Judgement）",

  "21_The_World.png":
    "21 世界（The World）",

  "22_Compass.png":
    "22 コンパス（Compass）"
};


/* =========================
   現在の状態
========================= */

let currentRole = "";
let currentCategory = "";
let currentQuestion = "";
let currentCards = [];


/* =========================
   テーマを選ぶ
========================= */

function selectRole(){

  const roleSelect =
    document.getElementById("roleSelect");

  const subArea =
    document.getElementById("subCategoryArea");

  const questionBox =
    document.getElementById("questionBox");

  currentRole =
    roleSelect.value;

  currentCategory = "";
  currentQuestion = "";

  subArea.innerHTML = "";

  questionBox.textContent = "";
  questionBox.classList.add("hidden");

  clearDrawResult();

  if(!currentRole){
    updateDrawButtons();
    return;
  }

  if(
    typeof roleMap === "undefined" ||
    !roleMap[currentRole] ||
    !roleMap[currentRole].categories
  ){
    alert(
      "質問集を読み込めなかったよ😭\n" +
      "tarot-questions.jsが同じ場所にあるか確認してね。"
    );

    updateDrawButtons();
    return;
  }

  const categories =
    roleMap[currentRole].categories;

  Object
    .keys(categories)
    .forEach(category => {

      const button =
        document.createElement("button");

      button.type = "button";
      button.textContent = category;
      button.className = "btn-purple";

      button.addEventListener(
        "click",
        () => {
          selectCategory(
            category,
            button
          );
        }
      );

      subArea.appendChild(button);
    });

  updateDrawButtons();
}


/* =========================
   カテゴリーを選ぶ
========================= */

function selectCategory(
  category,
  clickedButton
){

  if(
    !currentRole ||
    typeof roleMap === "undefined" ||
    !roleMap[currentRole] ||
    !roleMap[currentRole].categories
  ){
    return;
  }

  document
    .querySelectorAll(
      "#subCategoryArea button"
    )
    .forEach(button => {

      button.classList.remove(
        "selected-sub"
      );

    });

  clickedButton.classList.add(
    "selected-sub"
  );

  currentCategory = category;

  const questions =
    roleMap[currentRole]
      .categories[category];

  if(
    !Array.isArray(questions) ||
    questions.length === 0
  ){
    alert(
      "このカテゴリーの質問が見つからなかったよ😭"
    );

    return;
  }

  currentQuestion =
    questions[
      Math.floor(
        Math.random() *
        questions.length
      )
    ];

  const questionBox =
    document.getElementById(
      "questionBox"
    );

  questionBox.textContent =
    currentQuestion;

  questionBox.classList.remove(
    "hidden"
  );

  clearDrawResult();
  updateDrawButtons();

  questionBox.scrollIntoView({
    behavior:"smooth",
    block:"center"
  });
}


/* =========================
   カードボタンを使える状態にする
========================= */

function enableDrawButtons(){

  const draw1 =
    document.getElementById("draw1");

  const draw3 =
    document.getElementById("draw3");

  if(draw1){
    draw1.disabled = false;
  }

  if(draw3){
    draw3.disabled = false;
  }
}


/* =========================
   カードボタンを使えない状態にする
========================= */

function disableDrawButtons(){

  const draw1 =
    document.getElementById("draw1");

  const draw3 =
    document.getElementById("draw3");

  if(draw1){
    draw1.disabled = true;
  }

  if(draw3){
    draw3.disabled = true;
  }
}


/* =========================
   質問があるか確認
========================= */

function updateDrawButtons(){

  const questionInput =
    document.getElementById(
      "questionInput"
    );

  const freeQuestion =
    questionInput
      ? questionInput.value.trim()
      : "";

  if(
    freeQuestion ||
    currentQuestion
  ){
    enableDrawButtons();
  }else{
    disableDrawButtons();
  }
}


/* =========================
   使用する質問を取得
========================= */

function getQuestion(){

  const questionInput =
    document.getElementById(
      "questionInput"
    );

  const freeQuestion =
    questionInput
      ? questionInput.value.trim()
      : "";

  if(freeQuestion){
    return freeQuestion;
  }

  if(currentQuestion){
    return currentQuestion;
  }

  return "（質問なし）";
}


/* =========================
   今の気持ちを取得
========================= */

function getFeeling(){

  const feelingSelect =
    document.getElementById(
      "feelingSelect"
    );

  if(!feelingSelect){
    return "（特になし）";
  }

  const selected =
    feelingSelect.value.trim();

  return selected || "（特になし）";
}


/* =========================
   テーマ名を取得
========================= */

function getRoleName(){

  const roleNames = {
    yasashiku:"安心に戻る",
    kizuki:"気づきをえる",
    modoru:"本来の私に戻る"
  };

  return (
    roleNames[currentRole] ||
    "自由質問"
  );
}


/* =========================
   カードを引く
========================= */

function drawCards(count){

  const question =
    getQuestion();

  if(question === "（質問なし）"){
    alert(
      "質問を書くか、テーマから質問を選んでね🐾"
    );

    return;
  }

  const cardsArea =
    document.getElementById(
      "cardsArea"
    );

  if(!cardsArea){
    alert(
      "カードを表示する場所が見つからなかったよ😭"
    );

    return;
  }

  cardsArea.innerHTML = "";
  currentCards = [];

  const selectedCards =
    shuffleArray([...cardFiles])
      .slice(0, count);

  selectedCards.forEach(file => {

    const reversed =
      Math.random() < 0.5;

    const card = {
      file:file,
      reversed:reversed
    };

    currentCards.push(card);

    const cardBox =
      document.createElement("div");

    cardBox.className =
      "card-box";

    const image =
      document.createElement("img");

    image.src =
      tarotImageBase + file;

    image.alt =
      cardNames[file] || file;

    image.loading = "eager";

    if(reversed){
      image.classList.add(
        "reversed"
      );
    }

    const cardName =
      document.createElement("div");

    cardName.className =
      "card-name";

    cardName.textContent =
      formatCard(card);

    cardBox.appendChild(image);
    cardBox.appendChild(cardName);

    cardsArea.appendChild(
      cardBox
    );
  });

  saveTarotData();

  const nextArea =
    document.getElementById(
      "nextArea"
    );

  const noticeArea =
    document.getElementById(
      "noticeArea"
    );

  if(nextArea){
    nextArea.classList.remove(
      "hidden"
    );
  }

  if(noticeArea){
    noticeArea.classList.remove(
      "hidden"
    );
  }

  cardsArea.scrollIntoView({
    behavior:"smooth",
    block:"center"
  });
}


/* =========================
   配列をシャッフル
========================= */

function shuffleArray(array){

  for(
    let i = array.length - 1;
    i > 0;
    i--
  ){

    const randomIndex =
      Math.floor(
        Math.random() *
        (i + 1)
      );

    [
      array[i],
      array[randomIndex]
    ] = [
      array[randomIndex],
      array[i]
    ];
  }

  return array;
}


/* =========================
   カード名を整える
========================= */

function formatCard(card){

  const cardName =
    cardNames[card.file] ||
    card.file.replace(
      ".png",
      ""
    );

  const position =
    card.reversed
      ? "逆位置"
      : "正位置";

  return `${cardName}・${position}`;
}


/* =========================
   カード結果を保存
========================= */

function saveTarotData(){

  if(currentCards.length === 0){
    return;
  }

  const cardsForSave =
    currentCards.map(card => {

      return {
        file:card.file,

        name:
          cardNames[card.file] ||
          card.file.replace(
            ".png",
            ""
          ),

        reversed:
          card.reversed,

        position:
          card.reversed
            ? "逆位置"
            : "正位置",

        text:
          formatCard(card),

        imageUrl:
          tarotImageBase +
          card.file
      };

    });

  const tarotData = {

    feeling:
      getFeeling(),

    role:
      currentRole,

    roleName:
      getRoleName(),

    category:
      currentCategory,

    question:
      getQuestion(),

    cards:
      cardsForSave,

    savedAt:
      new Date().toISOString()
  };

  try{

    localStorage.setItem(
      "chappySallyTarotData",
      JSON.stringify(tarotData)
    );

  }catch(error){

    console.error(
      "タロット結果を保存できませんでした。",
      error
    );

    alert(
      "カードの結果を保存できなかったよ😭"
    );
  }
}


/* =========================
   私にもどる質問へ進む
========================= */

function goToQuestions(){

  if(currentCards.length === 0){

    alert(
      "先にカードを引いてね🐾"
    );

    return;
  }

  saveTarotData();

  const params =
    new URLSearchParams(
      window.location.search
    );

  const from =
    params.get("from");

  if(from === "set"){

    location.href =
      "questions.html?from=set";

  }else{

    location.href =
      "questions.html";

  }
}


/* =========================
   カード結果の表示を消す
========================= */

function clearDrawResult(){

  currentCards = [];

  const cardsArea =
    document.getElementById(
      "cardsArea"
    );

  const nextArea =
    document.getElementById(
      "nextArea"
    );

  const noticeArea =
    document.getElementById(
      "noticeArea"
    );

  if(cardsArea){
    cardsArea.innerHTML = "";
  }

  if(nextArea){
    nextArea.classList.add(
      "hidden"
    );
  }

  if(noticeArea){
    noticeArea.classList.add(
      "hidden"
    );
  }

  localStorage.removeItem(
    "chappySallyTarotData"
  );
}


/* =========================
   メニューへ戻る
========================= */

function goBackMenu(){

  const params =
    new URLSearchParams(
      window.location.search
    );

  const from =
    params.get("from");

  if(from === "set"){

    location.href =
      "https://chappy-sally.github.io/chappy-sally-anshin-navi-set/";

  }else{

    location.href =
      "https://chappy-sally.github.io/chappy-sally-tarot-navi/";

  }
}


/* =========================
   ページを開いたとき
========================= */

window.addEventListener(
  "DOMContentLoaded",
  () => {

    const questionInput =
      document.getElementById(
        "questionInput"
      );

    const feelingSelect =
      document.getElementById(
        "feelingSelect"
      );

    if(questionInput){

      questionInput.addEventListener(
        "input",
        () => {

          clearDrawResult();
          updateDrawButtons();

        }
      );
    }

    if(feelingSelect){

      feelingSelect.addEventListener(
        "change",
        () => {

          if(currentCards.length > 0){
            saveTarotData();
          }

        }
      );
    }

    localStorage.removeItem(
      "chappySallyTarotData"
    );

    updateDrawButtons();
  }
);

