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
let boardState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [, // Top row, // Middle row, // Bottom row, // Left column, // Middle column, // Right column, // Diagonal top-left to bottom-right
	[2, 4, 6]  // Diagonal top-right to bottom-left
];

submitBtn.addEventListener("click", () => {
	const p1Input = document.getElementById("player-1") || document.getElementById("player1");
	const p2Input = document.getElementById("player-2") || document.getElementById("player2");

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

		// Switch turn
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
		const [a, b, c] = winningConditions[i];
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
