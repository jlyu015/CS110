
let gameBoard = ["", "", "",
                 "", "", "",
                 "", "", ""];

let gameOver = false;

let currentPlayer = "X";



displayPlayer = document.getElementsByClassName("display_player");
cells = document.getElementsByClassName("xo");


console.log(cells)

function cellClicked(cellNum) {
    console.log("cell " + cellNum +" was clicked.");
}
function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "0": "X";
}
