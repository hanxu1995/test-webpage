export const Player = {
    X: 0,
    O: 1,
}
export const CellValue = {
    NONE: 0,
    X: 1,
    O: 2,
}
export const GameResult = {
    ONGOING: 0,
    TIE: 1,
    X: 2,
    O: 3,
}

export function Game(n) {
    this.board = Array(n);

    this.init_game = function () {
        for (let i = 0; i < this.board.length; ++i) {
            this.board[i] = Array(n).fill(CellValue.NONE);
        }
        this.num_moves = 0;
        this.result = GameResult.ONGOING;
    }

    this.init_game();

    this.determine_current_player = function () {
        return this.num_moves % 2 !== 0 ? Player.O : Player.X;
    }

    this.determine_end_after_play = function (pos) {
        const value = this.board[pos.x][pos.y];
        let result;
        if (value === CellValue.X) {
            result = GameResult.X;
        } else if (value === CellValue.O) {
            result = GameResult.O;
        } else {
            throw new Error("unexpected empty move");
        }

        // row
        let found_diff = false;
        for (let i = 0; i < n; ++i) {
            if (this.board[pos.x][i] !== value) {
                found_diff = true;
                break;
            }
        }
        if (!found_diff) {
            return result;
        }

        // column
        found_diff = false;
        for (let i = 0; i < n; ++i) {
            if (this.board[i][pos.y] !== value) {
                found_diff = true;
                break;
            }
        }
        if (!found_diff) {
            return result;
        }

        // diag1
        if (pos.x === pos.y) {
            found_diff = false;
            for (let i = 0; i < n; ++i) {
                if (this.board[i][i] !== value) {
                    found_diff = true;
                    break;
                }
            }
            if (!found_diff) {
                return result;
            }
        }

        // diag2
        if (pos.x + pos.y === n - 1) {
            found_diff = false;
            for (let i = 0; i < n; ++i) {
                if (this.board[i][n - 1 - i] !== value) {
                    found_diff = true;
                    break;
                }
            }
            if (!found_diff) {
                return result;
            }
        }

        return this.num_moves < n * n ? GameResult.ONGOING : GameResult.TIE;
    }

    this.play = function (pos) {
        if (this.board[pos.x][pos.y] !== CellValue.NONE) {
            throw new Error("cell is already occupied");
        }
        if (this.result !== GameResult.ONGOING) {
            throw new Error("game ended");
        }
        const current_player = this.determine_current_player();
        this.board[pos.x][pos.y] = current_player === Player.X ? CellValue.X : CellValue.O;
        ++this.num_moves;

        return this.determine_end_after_play(pos);
    }
}
