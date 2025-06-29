let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

let count = 0;

boxes.forEach((bx) => {
  bx.addEventListener("click", () => {
    // console.log("Box was clicked");
    ++count;
    if (turnO === true) {
      bx.innerText = "O";
      turnO = false;
    } else {
      bx.innerText = "X";
      turnO = true;
    }
    bx.disabled = true;

    checkWinner();
  });
});

const checkWinner = () => {
  for (pattern of winPatterns) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        // console.log("Winner", pos1val);
        showWinner(pos1val);
        return;
      }
    }
  }
  if(count === 9){
    drawGame();
    }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner} !!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const drawGame = () => {
  msg.innerText = `The game is Draw !!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let bx of boxes) {
    bx.disabled = true;
  }
};

const enableBoxes = () => {
  for (let bx of boxes) {
    bx.disabled = false;
    bx.innerText = "";
  }
};

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  count = 0;
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
