let gameBoard = ["", "", "",
                 "", "", "",
                 "", "", ""];

let gameOver = false;
let currentPlayer = "X";
var scoreX = 0;
var scoreO = 0;



displayPlayer = document.getElementsByClassName("display_player");
cells = document.getElementsByClassName("xo");


console.log(cells)

function cellClicked(cellNum) {
    console.log("cell " + cellNum +" was clicked.");
}
function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "0": "X";
}
