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
let emptyCells = getEmptyCells(cells);
const secondsTimer = 2;
let secondsLeft = secondsTimer; // Set the timer to run for 5 seconds
let timeDraw = 0;


document.addEventListener("DOMContentLoaded", function() {
    cells = document.querySelectorAll('.game_board > .row > div');
    console.log(cells)

    AIcheck = document.getElementById('play-ai');
    AIcheck.addEventListener('change', function() {
        enableAI = AIcheck.checked;
        console.log("enableAI",enableAI);
        newGame();
        // if(this.checked){
        //     stopTimer();
        // }
        // else{
            clearInterval(intervalId);
            startTimer();
        // }
        // if(enableAI && currentPlayer == 'O'){
        //     console.log("ai move");
        //     emptyCells = getEmptyCells(cells);
        //     move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        //     console.log("emptyCells",emptyCells);
        //     console.log("move", move);
        //     aiCell = cells[move];   
        //     console.log("aiCell", aiCell.querySelector('.xo'));
        //     const xo2 = aiCell.querySelector('.xo');
        //     xo2.textContent = currentPlayer;
        //     // console.log(currentPlayer);
        //     currPieces = currentPlayer == 'X' ? XPieces : OPieces;
        //     // console.log(currentPlayer + "lenght " + currPieces.length, currPieces);
        //     if(currPieces.length >= 4) {
            
        //         oldIndex = currPieces[0];
        //         currPieces.shift();
        //         oldCell = cells[oldIndex];
        //         clearCell(oldCell, oldIndex);
        //         // console.log("after shift " + currPieces);
        //     }
        //     currPieces.push(move);
        //     updateBoard(move);
        //     if(checkGameWin()) {
        //         gameOver = true;
        //         currentPlayer == 'X' ? scoreX++ : scoreO++;
        //         updateScoreBoard();
        //         updateBoard(move);
        //         setTimeout(function() {
        //             alert(currentPlayer + " has won");
        //         }, 10); 
        //         clearInterval(intervalId)
        //         return;
        //     }
        //     else if(checkDraw()) {
        //         alert("The game is a Draw!");
        //         return;
        //     }
        //     switchPlayer();
        //     emptyCells = getEmptyCells(cells);
        //     console.log("empty cells");
        //     console.log(emptyCells);
        // }
        // document.getElementById('play-ai').disabled = true;
    });
    updateDisplayPlayer();

    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];


        cell.addEventListener('click', function() {
            if(cell.textContent == "" && !gameOver) {
                secondsLeft = secondsTimer;
                console.log(enableAI, currentPlayer)
                const xo = cell.querySelector('.xo');
                xo.textContent = currentPlayer;

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
                if (checkGameWin()) {
                    gameOver = true;
                    currentPlayer == 'X' ? scoreX++ : scoreO++;
                    updateScoreBoard();
                    updateBoard(i);
                    setTimeout(function() {
                        alert(currentPlayer + " has won");
                    }, 10); 
                    clearInterval(intervalId);
                    return;
                }
                
                else if(checkDraw()) {
                    alert("The game is a Draw!");
                    return;
                }
                // console.log(currentPlayer);
                // startTimer();
                switchPlayer();
                // console.log(currentPlayer);

                

                console.log("cells");
                console.log(cells);


                console.log("player change", currentPlayer);
                console.log(enableAI, currentPlayer);

                if(enableAI && currentPlayer == "O") {
                    console.log("ai move");
                    emptyCells = getEmptyCells(cells);
                    move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                    console.log("emptyCells",emptyCells);
                    console.log("move", move);
                    aiCell = cells[move];   
                    console.log("aiCell", aiCell.querySelector('.xo'));
                    const xo2 = aiCell.querySelector('.xo');
                    xo2.textContent = currentPlayer;
                    // console.log(currentPlayer);
                    currPieces = currentPlayer == 'X' ? XPieces : OPieces;
                    // console.log(currentPlayer + "lenght " + currPieces.length, currPieces);
                    if(currPieces.length >= 4) {
                    
                        oldIndex = currPieces[0];
                        currPieces.shift();
                        oldCell = cells[oldIndex];
                        clearCell(oldCell, oldIndex);
                        // console.log("after shift " + currPieces);
                    }
                    currPieces.push(move);
                    updateBoard(move);
                    if(checkGameWin()) {
                        gameOver = true;
                        currentPlayer == 'X' ? scoreX++ : scoreO++;
                        updateScoreBoard();
                        updateBoard(move);
                        setTimeout(function() {
                            alert(currentPlayer + " has won");
                        }, 10); 
                        clearInterval(intervalId)
                        return;
                    }
                    else if(checkDraw()) {
                        alert("The game is a Draw!");
                        return;
                    }
                    switchPlayer();
                    emptyCells = getEmptyCells(cells);
                    console.log("empty cells");
                    console.log(emptyCells);
                }
            }

            
          });
          console.log(enableAI);
          
        // if(enableAI && currentPlayer == "O") {
        //     console.log("ai move")
        //     emptyCells = getEmptyCells(cells);
        //     move = Math.floor(Math.random() * emptyCells.length);
        //     aiCell = cells[move];
        //     xo = aiCell.querySelector('.xo');
        //     xo.textContent = currentPlayer;
        // }

    }
});

function startTimer() {
    let timerElement = document.getElementById('timer');
    intervalId = setInterval(function() {
        timerElement.textContent = `Seconds left: ` + secondsLeft;
        //   if(moved == 1){
        //     clearInterval(intervalId);
        //     moved = 0;
        //   }
        if(timeDraw == 120){
            alert("It was a draw"); 
            newGame();
        }
        if (secondsLeft <= 0) {
            clearInterval(intervalId);
            switchPlayer();
            updateDisplayPlayer();
            secondsLeft = secondsTimer;
            startTimer();
            updateDisplayPlayer();
            
            // switchPlayer();
            timerElement.textContent = 'Time is up!';
            if(enableAI && currentPlayer == 'O'){
                console.log("ai move");
                emptyCells = getEmptyCells(cells);
                move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                console.log("emptyCells",emptyCells);
                console.log("move", move);
                aiCell = cells[move];   
                console.log("aiCell", aiCell.querySelector('.xo'));
                const xo2 = aiCell.querySelector('.xo');
                xo2.textContent = currentPlayer;
                // console.log(currentPlayer);
                currPieces = currentPlayer == 'X' ? XPieces : OPieces;
                // console.log(currentPlayer + "lenght " + currPieces.length, currPieces);
                if(currPieces.length >= 4) {
                
                    oldIndex = currPieces[0];
                    currPieces.shift();
                    oldCell = cells[oldIndex];
                    clearCell(oldCell, oldIndex);
                    // console.log("after shift " + currPieces);
                }
                currPieces.push(move);
                updateBoard(move);
                if(checkGameWin()) {
                    gameOver = true;
                    currentPlayer == 'X' ? scoreX++ : scoreO++;
                    updateScoreBoard();
                    updateBoard(move);
                    setTimeout(function() {
                        alert(currentPlayer + " has won");
                    }, 10); 
                    clearInterval(intervalId)
                    return;
                }
                else if(checkDraw()) {
                    alert("The game is a Draw!");
                    return;
                }
                switchPlayer();
                emptyCells = getEmptyCells(cells);
                console.log("empty cells");
                console.log(emptyCells);
            }
        }
        else{
            timeDraw++;
            secondsLeft--;
        }
        
    }, 1000); // Update the timer every second (1000 milliseconds)
    
}

function stopTimer(){
    let timerElement = document.getElementById('timer');
    timerElement.textContent = 'Playing against AI';
    clearInterval(intervalId);
}

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
        console.log("xo", i);
        console.log(xo.textContent);
        if(xo.textContent == '') {
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
    secondsLeft = secondsTimer;
    console.log("newgame reset player", currentPlayer); 
    // document.getElementById('play-ai').disabled = false;
    updateDisplayPlayer();
    // if(!enableAI){
        clearInterval(intervalId);
        startTimer();
    // }
    // else stopTimer();
    timeDraw = 0;
    // startTimer();
}

function reset() {
    console.log("clicked reset")
    newGame();
    scoreX = 0;
    scoreO = 0;
    updateScoreBoard()
}
