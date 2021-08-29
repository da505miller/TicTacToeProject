
// Game variables to use later on 
const statusDisplay = document.querySelector('.game--status');
const enterNames = document.getElementById('submit-btn');
const form = document.getElementById('player-form'); 

// Game active variable to end game 
let gameActive = true;

// Store current player here to know whose turn it is
let currentPlayer = "X";

// Declare a current game state array for the 9 cells
let gameState = ["", "", "", "", "", "", "", "", ""];

// Declare messages as functions to use throughout the game
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

// Set inital message to let players know whose turn it is

statusDisplay.innerHTML = currentPlayerTurn();

function playerNameInput () {
  const playerX = document.getElementById('player1').value;
  const playerO = document.getElementById('player2').value;
  document.getElementById("message-board").innerHTML = playerX + " versus " + playerO;
}

function handleCellPlayed(clickedCell, clickedCellIndex) {

// Update internal game state to reflect the played move as well as update user interface to reflect played move

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
  
    if ( currentPlayer == "X" ) { 
        document.querySelectorAll('.cell')[clickedCellIndex].style.color = "blue";
    }else{
        document.querySelectorAll('.cell')[clickedCellIndex].style.color = "red";
  }
}
function handlePlayerChange() {
   currentPlayer = currentPlayer === "X" ? "O" : "X";
   statusDisplay.innerHTML = currentPlayerTurn();
}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleResultValidation() {
   let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

// Check if there are any values in game state array that are still not marked with player sign

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

// If we get to here we know that the no one won the game yet, 
// and that there are still moves to be played, so we continue by changing the current player.

    handlePlayerChange();
}
function handleCellClick(clickedCellEvent) {

// Save the clicked html element in a variable
   
    const clickedCell = clickedCellEvent.target;

// Grab the 'data-cell-index' attribute from clicked cell to identify where cell is in the grid. 
// The getAttribute will return a string value. Since we need actual number parse it to a number

    const clickedCellIndex = parseInt(
      clickedCell.getAttribute('data-cell-index')
    );

// Check if call has already been played or if game is paused. If either ignore the click.

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

// If all is good proceed with game flow
   
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

// Function to restart the game
function handleRestartGame() {
   gameActive = true;
   currentPlayer = "X";
   gameState = ["", "", "", "", "", "", "", "", ""];
   statusDisplay.innerHTML = currentPlayerTurn();
   document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
          
}

// Add event listeners to game cells, restart button, and player name button

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
form.addEventListener('submit', playerNameInput);