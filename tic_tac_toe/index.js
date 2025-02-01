import {Game, GameResult, Player} from "./game.js";

const n = 3;
const cell_size = "200px"

const board = document.querySelector(".board");
board.style.gridTemplateRows = `repeat(${n}, ${cell_size})`;
board.style.gridTemplateColumns = `repeat(${n}, ${cell_size})`;

const cell = document.createElement("div");
cell.className = "cell";
cell.style.fontSize = `calc(0.9 * ${cell_size})`;

let game = new Game(n);
let result = GameResult.ONGOING;
function play(x, y) {
    result = game.play({x: x, y: y});
    if (result === GameResult.X) {
        console.log("X win");
    } else if (result === GameResult.O) {
        console.log("O win");
    } else if (result === GameResult.TIE) {
        console.log("tie");
    }
}

for (let i = 0; i < n * n; i++) {
    const cellCopy = cell.cloneNode(true);
    cellCopy.addEventListener("click", () => {
        if (result !== GameResult.ONGOING) {
            console.log("game ended");
            return;
        }

        const player = game.determine_current_player()
        cellCopy.textContent = player === Player.X ? "X" : "O";

        const y = i % n;
        const x = (i - y) / n;
        play(x, y);
    })
    board.appendChild(cellCopy);
}
