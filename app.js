let lvl = document.querySelector(".level");
let sec = document.querySelector(".sec");
let pickedWord = document.querySelector(".pickedWord");
let startBtn = document.querySelector("button");
let input = document.querySelector("input");
let wordsList = document.querySelector(".words-list");
let left = document.querySelector(".left");
let score = document.querySelector(".score");
let total = document.querySelector(".total");
let gameOver = document.querySelector(".game-over");
let select = document.querySelector("select");

let words = [
  ["task", "deal"],
  [
    "country",
    "testing",
    // "youtube",
    // "linkedIn",
    // "twitter",
    // "github",
    // "leetcode",
    // "internet",
    // "styling",
    // "cascade",
    // "python",
    // "working",
    // "playing",
    // "Focus",
  ],
  [
    // "despendencies",
    // "documentation",
    // "destructring",
    // "programming",
    // "javascript",
    "paradigm",
  ],
];
let [a, b, c] = words;
let i = 0;

const lvls = {
  easy: 6,
  normal: 4,
  hard: 3,
};

sec.innerHTML = lvls[select.value];
left.innerHTML = lvls[select.value];
total.innerHTML = a.length;

function handelClick() {
  let defaultLvl = select.value;
  let defaultSec = lvls[defaultLvl];

  sec.innerHTML = defaultSec;
  left.innerHTML = defaultSec;

  if (select.value === "easy") {
    total.innerHTML = a.length;
  } else if (select.value === "normal") {
    total.innerHTML = b.length;
  } else if (select.value === "hard") {
    total.innerHTML = c.length;
  }
}
select.addEventListener("change", handelClick);
function setArray() {
  if (select.value === "easy") {
    showEls(a);
  } else if (select.value === "normal") {
    showEls(b);
  } else if (select.value === "hard") {
    showEls(c);
  }
}
startBtn.onclick = function () {
  this.remove();
  input.focus();
  setArray();
};

function showEls(arr) {
  if (!arr || !arr.length) {
    return;
  }
  let random = arr[Math.floor(Math.random() * arr.length)];

  arr.splice(arr.indexOf(random), 1);
  pickedWord.innerHTML = random;
  wordsList.innerHTML = "";

  for (let i = 0; i < arr.length; i++) {
    let div = document.createElement("div");
    div.innerHTML = arr[i];

    wordsList.appendChild(div);
  }

  startPlay(arr);
}

function startPlay(ar) {
  console.log(ar);
  if (ar[0]) {
    left.innerHTML = lvls[select.value] + 3;
  } else {
    left.innerHTML = lvls[select.value];
  }
  let counter = setInterval(() => {
    left.innerHTML--;
    if (left.innerHTML === "0") {
      clearInterval(counter);
      if (input.value.toLowerCase() === pickedWord.innerHTML.toLowerCase()) {
        input.value = "";
        score.innerHTML++;
        window.localStorage.setItem("ScoreVal", `${dateNow}`);
        console.log(score.innerHTML);
        if (ar.length > 0) {
          showEls(ar);
        } else {
          gameOver.innerHTML = "You won";
          let nextLevelBtn = document.createElement("button");
          nextLevelBtn.innerHTML = "Next Level";
          nextLevelBtn.className = "next";
          document.body.appendChild(nextLevelBtn);
          nextLevelBtn.onclick = function () {
            i++;
            select.options[i].selected = true;
            handelClick();
            score.innerHTML = 0;
            gameOver.innerHTML = "";
            input.focus();
            setArray();
            showEls();
          };
        }
      } else {
        gameOver.innerHTML = "Game Over";
      }
    }
  }, 1000);
}
