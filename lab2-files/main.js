let gameBoard = ["", "", "",
                 "", "", "",
                 "", "", ""];

let boardWins = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8],[3,6,9] [1,5,9], [3,5,7], ];
let gameOver = false;
let currentPlayer = "X";
var scoreX = 0;
var scoreO = 0;

var displayPlayer = document.getElementsByClassName("display_player");
var cells = document.getElementsByClassName("xo");


console.log(cells);

function cellClicked(cellNum) {
    console.log(displayPlayer)
    
    
    console.log("cell " + cellNum +" was clicked.");
    switchPlayer();



}
function switchPlayer() {
    currentPlayer = currentPlayer == "X" ? "0": "X";
    updateDisplayPlayer();
}
function updateDisplayPlayer() {
    displayPlayer.textContent = currentPlayer;
  }

function checkGameOver() { 
    for(var i = 0; i < gameBoard.length; i++) {
        if(gameBoard[i] == "") { // if theres still cells that are empty
            return false;
        }
        
        
    }
}
function newGame() {
    console.log("clicked new game")
    let gameBoard = ["", "", "",
                 "", "", "",
                 "", "", ""];

    let gameOver = false;
    let currentPlayer = "X";
}

function reset() {
    console.log("clicked reset")
    newGame();
    scoreX = 0;
    scoreO = 0;
}

