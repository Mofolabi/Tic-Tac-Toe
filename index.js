const cells = document.querySelectorAll("td");
const resetButton = document.querySelector("#reset-button");
let player1 = prompt("Player 1, do you want to be X or O?").toUpperCase();
while (player1 !== "X" && player1 !== "O") {
  player1 = prompt("Invalid input. Please enter either X or O.").toUpperCase();
}
let player2 = player1 === "X" ? "O" : "X";

let xIsNext = true;

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", cellClicked);
}

resetButton.addEventListener("click", resetBoard);

function cellClicked() {
  if (this.textContent === "") {
    this.textContent = xIsNext ? player1 : player2;
    if (checkWinConditions()) {
      resetBoard();
    }
    xIsNext = !xIsNext;
  }
}
let currentPlayer = player1;

function cellClicked() {
  if (this.textContent === "") {
    this.textContent = currentPlayer;
    if (checkWinConditions()) {
      return;
    }
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }
}

function checkWinConditions() {
  // Array of all possible win combinations
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent &&
      cells[a].textContent !== ""
    ) {
      const event = new CustomEvent("gameOver", {
        detail: {
          result: cells[a].textContent === player1 ? "win" : "lose",
        },
      });
      document.dispatchEvent(event);
      return true;
    }
  }

  // check for a tie
  let emptyCells = 0;
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].textContent === "") {
      emptyCells++;
    }
  }
  if (emptyCells === 0) {
    const event = new CustomEvent("gameOver", {
      detail: {
        result: "tie",
      },
    });
    document.dispatchEvent(event);
    return true;
  }

  return false;
}
document.addEventListener("gameOver", function (event) {
  if (event.detail.result === "tie") {
    alert("Tie!");
  } else if (event.detail.result === "win") {
    alert(`Player 1 wins!`);
  } else if (event.detail.result === "lose") {
    alert(`Player 1 loses!`);
  }
});

function resetBoard() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = "";
  }
  xIsNext = player1 === "X";
}
let player1Score = 0;
let player2Score = 0;

document.addEventListener("gameOver", function (event) {
  if (event.detail.result === "tie") {
    alert("Tie!");
  } else if (event.detail.result === "win") {
    if (xIsNext) {
      player1Score += 1;
      alert("Player 1 wins!");
    } else {
      player2Score += 1;
      alert("Player 2 wins!");
    }
  } else if (event.detail.result === "lose") {
    if (xIsNext) {
      player2Score += 1;
      alert("Player 2 wins!");
    } else {
      player1Score += 1;
      alert("Player 1 wins!");
    }
  }

  // Update the score board
  document.querySelector("#player1-score").textContent = player1Score;
  document.querySelector("#player2-score").textContent = player2Score;
});
