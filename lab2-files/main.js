let gameBoard = ["", "", "",
                 "", "", "",
                 "", "", ""];

let boardWins = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8],[3,6,9] [1,5,9], [3,5,7] ];
let gameOver = false;
let currentPlayer = "X";
let scoreX = 0;
let scoreO = 0;
let XPieces = [];
let OPieces = [];
let enableAI = false;
let displayPlayer = document.getElementsByClassName("display_player");
let cells = document.getElementsByClassName("xo");
let scoreBoard = document.getElementsByClassName("score-board");
let timerDisplay = document.getElementById("timer");




document.addEventListener("DOMContentLoaded", function() {
    const cells = document.querySelectorAll('.game_board > .row > div');
    console.log(cells)

    AIcheck = document.getElementById('play-ai');
    AIcheck.addEventListener('change', function() {
        enableAI = AIcheck.checked;
        // console.log(enableAI);
    });


    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];


        cell.addEventListener('click', function() {
            if(cell.textContent == "" && !gameOver) {
                console.log(enableAI, currentPlayer)
                if(enableAI && currentPlayer == "O") {
                    // console.log("ai move")
                    // emptyCells = getEmptyCells(cells);
                    // move = Math.floor(Math.random() * emptyCells.length);
                    // aiCell = cells[move];
                    // xo = aiCell.querySelector('.xo');
                    // xo.textContent = currentPlayer;
                }
                else {
                    const xo = cell.querySelector('.xo');
                    xo.textContent = currentPlayer;
                }

                currPieces = currentPlayer == 'X' ? XPieces : OPieces;
                // console.log(currentPlayer + "lenght " + currPieces.length, currPieces);
                if(currPieces.length >= 4) {
                
                    oldIndex = currPieces[0];
                    currPieces.shift();
                    oldCell = cells[oldIndex];
                    clearCell(oldCell, oldIndex);
                    // console.log("after shift " + currPieces);
                }
                currPieces.push(i);
                updateBoard(i);
                if(checkGameWin()) {
                    gameOver = true;
                    currentPlayer == 'X' ? scoreX++ : scoreO++;
                    updateScoreBoard();
                    alert(currentPlayer + " has won");
                }
                else if(checkDraw()) {
                    alert("The game is a Draw!");
                }
                switchPlayer();
            }

            if(enableAI && currentPlayer == "O") {

            }
          });

    }
  });

function clearCell(cell, oldIndex) {
    // console.log("called clearCell")
    gameBoard[oldIndex] = "";
    cell.querySelector('.xo').textContent = "";
}
function getEmptyCells(cells) {
    empty = [];
    for(let i = 0; i < cells.length; i++) {
        tempCell = cells[i];
        const xo = tempCell.querySelector('.xo');
        if(xo.textContent == "") {
            empty.push(i);
        }
    }
    return empty;
}
function updateBoard(cellNum) {
    gameBoard[cellNum] = currentPlayer;
    console.log(gameBoard);
}

function switchPlayer() {
    currentPlayer = currentPlayer == "X" ? "O": "X";
    updateDisplayPlayer();
}
function updateDisplayPlayer() {
    display = displayPlayer[0]
    display.innerHTML = currentPlayer;
}
function updateScoreBoard() {
    score = scoreBoard[0]
    score.innerHTML = "X: " + scoreX + " O: " + scoreO;
}

function checkGameWin() {
    for (let i = 0; i < gameBoard.length; i += 3) {
      if (gameBoard[i] !== '' && gameBoard[i] === gameBoard[i+1] && gameBoard[i] === gameBoard[i+2]) {
        return true;
      }
    }
    for (let i = 0; i < 3; i++) {
      if (gameBoard[i] !== '' && gameBoard[i] === gameBoard[i+3] && gameBoard[i] === gameBoard[i+6]) {
        return true;
      }
    }  
    if (gameBoard[0] !== '' && gameBoard[0] === gameBoard[4] && gameBoard[0] === gameBoard[8]) {
      return true;
    }
    if (gameBoard[2] !== '' && gameBoard[2] === gameBoard[4] && gameBoard[2] === gameBoard[6]) {
      return true;
    }
  
    return false;
  }

function checkDraw() { 
    for(var i = 0; i < gameBoard.length; i++) {
        if(gameBoard[i] == "") { // if theres still cells that are empty
            return false;
        }
        
    }
    return true;
}
function newGame() {
    console.log("clicked new game")
    gameBoard = ["", "", "",
                 "", "", "",
                 "", "", ""];
        const cells = document.querySelectorAll('.game_board > .row > div');

    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        const xo = cell.querySelector('.xo');
        xo.textContent = '';
    }
    XPieces = [];
    OPieces = [];
    gameOver = false;
    currentPlayer = "X";
    updateDisplayPlayer();
}

function reset() {
    console.log("clicked reset")
    newGame();
    scoreX = 0;
    scoreO = 0;
    updateScoreBoard()
}