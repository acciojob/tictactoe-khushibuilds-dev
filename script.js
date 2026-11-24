const submitBtn = document.getElementById("submit");
const playerForm = document.getElementById("player-form");
const gameBoard = document.getElementById("game-board");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "x";
let gameActive = true;
let boardState = new Array(9).fill("");

const winningConditions = new Array(
  new Array(0, 1, 2),
  new Array(3, 4, 5),
  new Array(6, 7, 8),
  new Array(0, 3, 6),
  new Array(1, 4, 7),
  new Array(2, 5, 8),
  new Array(0, 4, 8),
  new Array(2, 4, 6)
);

submitBtn.addEventListener("click", () => {
  const p1Input = document.getElementById("player1") || document.getElementById("player-1");
  const p2Input = document.getElementById("player2") || document.getElementById("player-2");

  player1 = p1Input.value.trim();
  player2 = p2Input.value.trim();

  if (player1 === "" || player2 === "") {
    alert("Please enter names for both players.");
    return;
  }

  currentPlayer = player1;
  currentSymbol = "x";
  messageDiv.textContent = `${currentPlayer}, you're up`;

  playerForm.style.display = "none";
  gameBoard.style.display = "block";
});

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    const index = Number(cell.id) - 1;

    if (boardState[index] !== "" || !gameActive) {
      return;
    }

    boardState[index] = currentSymbol;
    cell.textContent = currentSymbol;

    if (checkWin()) {
      messageDiv.textContent = `${currentPlayer} congratulations you won!`;
      gameActive = false;
      return;
    }

    if (!boardState.includes("")) {
      messageDiv.textContent = "It's a draw!";
      gameActive = false;
      return;
    }

    if (currentPlayer === player1) {
      currentPlayer = player2;
      currentSymbol = "o";
    } else {
      currentPlayer = player1;
      currentSymbol = "x";
    }

    messageDiv.textContent = `${currentPlayer}, you're up`;
  });
});

function checkWin() {
  for (let i = 0; i < winningConditions.length; i++) {
    const condition = winningConditions[i];
    const a = condition[0];
    const b = condition[1];
    const c = condition[2];

    if (
      boardState[a] !== "" &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      document.getElementById(String(a + 1)).style.backgroundColor = "#800080";
      document.getElementById(String(b + 1)).style.backgroundColor = "#800080";
      document.getElementById(String(c + 1)).style.backgroundColor = "#800080";
      return true;
    }
  }
  return false;
}
